import Fuse from 'fuse.js';
import { openaiClient, geminiClient } from './aiClient.js';

import Chat from '../models/Chat.js';
import Contact from '../models/Contact.js';
import Knowledge from '../models/Knowledge.js';

export async function generateAIReply({ system, prompt, message, knowledge, agent, chat, history = [] }) {
  // Fallback echo
  if (!openaiClient && !geminiClient) {
    return `Echo: ${message}`;
  }

  // --- 1. Q&A Check ---
  if (knowledge && knowledge.length > 0) {
    const qnaKnowledge = knowledge.filter(k => k.kind === 'qna');
    if (qnaKnowledge.length > 0) {
      const fuse = new Fuse(qnaKnowledge, {
        keys: ['question'],
        includeScore: true,
        threshold: 0.4,
      });
      const results = fuse.search(message);
      if (results.length > 0 && results[0].score < 0.4) {
        console.log('Q&A match found:', results[0].item.question);
        return results[0].item.answer;
      }
    }
  }

  // --- 2. Normal Reply Generation ---
  const contact = await Contact.findOne({ _id: chat.contactId });
  const contactName = contact?.name ? ` The user's name is ${contact.name}.` : '';

  let knowledgeContent = '';
  if (knowledge && knowledge.length > 0) {
    knowledgeContent = knowledge.map(k => {
      if (k.kind === 'url') {
        return `URL: ${k.value}`;
      } else if (k.kind === 'text') {
        return `Text: ${k.value}`;
      } else if (k.kind === 'file') {
        // Exclude file knowledge from the main prompt to let the file checker handle it
        return '';
      } else if (k.kind === 'qna') {
        return `Q: ${k.question}\nA: ${k.answer}`;
      }
    }).join('\n');
  }

  try {
    let reply = '';
    // Prioritize OpenAI if available
    if (openaiClient) {
      try {
        const resp = await openaiClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: (system || 'You are a helpful assistant.') + contactName },
            { role: 'user', content: `${prompt || ''}\n\nKnowledge:\n${knowledgeContent}\n\nUser: ${message}` },
          ],
          temperature: 0.6,
        });
        reply = resp.choices?.[0]?.message?.content || '...';
        console.log('OpenAI reply:', reply);
      } catch (e) {
        console.error('OpenAI error:', e.message);
      }
    }

    // Fallback to Gemini if OpenAI fails or is not available
    if (geminiClient && !reply) {
      try {
        const model = geminiClient.getGenerativeModel({ model: 'gemini-pro' });

        // Use agent behavior as system instruction for Gemini
        const systemInstruction = (system || 'You are a helpful assistant.') + contactName;

        const geminiHistory = [
          { role: 'user', parts: [{ text: systemInstruction }] },
          { role: 'model', parts: [{ text: 'Baik, saya mengerti. Saya akan menjadi asisten yang profesional dan efisien dan tidak akan mengarang pesan pengiriman file.' }] },
          ...history.map(msg => ({
            role: msg.from === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          }))
        ];

        const chatSession = model.startChat({
          history: geminiHistory,
          generationConfig: {
            temperature: 0.5,
          }
        });

        const fullPrompt = `${prompt || ''}\n\nKnowledge:\n${knowledgeContent}\n\nUser: ${message}`;
        const result = await chatSession.sendMessage(fullPrompt);
        reply = result.response.text();
        console.log('Gemini AI reply:', reply);
      } catch (e) {
        console.error('Gemini AI error:', e.message);
      }
    }

    // Check for follow-up triggers
    if (agent && agent.followUps && agent.followUps.length > 0 && chat && !chat.state?.followUp) {
      const followUp = agent.followUps[0]; // Take the first follow-up
      if (followUp) {
        await Chat.updateOne({ _id: chat._id }, { $set: { 'state.followUp': { prompt: followUp.prompt, delay: followUp.delay, triggeredAt: new Date() } } });
      }
    }

    // Save name
    if (!contact.name) {
      const namePrompt = `Does the user reveal their name in this message? If so, what is it? If not, say "NO_NAME".\n\nUser: ${message}`;
      const model = geminiClient.getGenerativeModel({ model: 'gemini-pro' });
      const resp = await model.generateContent(namePrompt);
      const name = resp.response.text();
      if (name && name.trim().toUpperCase() !== 'NO_NAME') {
        await Contact.updateOne({ _id: chat.contactId }, { $set: { name: name.trim() } });
      }
    }

    return reply;
  } catch (e) {
    console.error('AI error:', e.message);
  }

  return `Echo: ${message}`;
}

export async function findAndSendFile({ agent, message, openaiClient, geminiClient }) {
  try {
    if (agent.database && agent.database.length > 0 && agent.prompt) {
      const instructions = agent.prompt.split('jika').slice(1);

      for (const instruction of instructions) {
        const match = instruction.match(/(.*?) maka kirim (.*)/);
        if (match) {
          const condition = match[1].trim();
          const fileId = match[2].trim();

          const prompt = `You are a helpful assistant. The user's message is: "${message}". The condition for sending a file is: "${condition}". Does the user's message match the condition? Please answer with "yes" or "no".`;

          let answer = 'no';
          if (openaiClient) {
            const resp = await openaiClient.chat.completions.create({
              model: 'gpt-4o-mini',
              messages: [{ role: 'user', content: prompt }],
              temperature: 0,
            });
            answer = resp.choices?.[0]?.message?.content || 'no';
          } else if (geminiClient) {
            const model = geminiClient.getGenerativeModel({ model: 'gemini-pro' });
            const result = await model.generateContent(prompt);
            answer = result.response.text();
          }

          if (answer.toLowerCase().includes('yes')) {
            const file = agent.database.find(f => f.id.includes(fileId));
            if (file) {
              console.log(`File found for user message based on prompt:`, file.originalName);
              const serverUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:5000';
              return {
                text: `Tentu, ini file ${file.originalName} yang Anda minta.`,
                attachment: {
                  url: `${serverUrl}/files/${file.storedName}`,
                  filename: file.originalName,
                  storedName: file.storedName,
                }
              };
            }
          }
        }
      }
    }
  } catch (e) {
    console.error('File request from prompt check failed:', e.message);
  }

  return null;
}
