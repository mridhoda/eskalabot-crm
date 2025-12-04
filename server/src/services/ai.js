import Fuse from 'fuse.js';
import { promises as fs } from 'fs';
import path from 'path';
import { openaiClient, geminiClient } from './aiClient.js';

import Chat from '../models/Chat.js';
import Contact from '../models/Contact.js';
import Knowledge from '../models/Knowledge.js';

// Helper to get MIME type from filename
function getMimeType(filename = '') {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.heic')) return 'image/heic';
  if (lower.endsWith('.heif')) return 'image/heif';
  // Audio types
  if (lower.endsWith('.mp3')) return 'audio/mp3';
  if (lower.endsWith('.wav')) return 'audio/wav';
  if (lower.endsWith('.ogg')) return 'audio/ogg';
  if (lower.endsWith('.m4a')) return 'audio/m4a';
  // Default for safety, though Gemini supports various types
  return 'image/jpeg';
}

export async function generateAIReply({ system, prompt, message, knowledge, agent, chat, history = [] }) {
  const currentMessageText = message.text || (message.attachment ? '[Attachment]' : '');

  // Fallback echo
  if (!openaiClient && !geminiClient) {
    return `Echo: ${currentMessageText}`;
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
      const results = fuse.search(currentMessageText);
      if (results.length > 0 && results[0].score < 0.4) {
        console.log('Q&A match found:', results[0].item.question);
        return results[0].item.answer;
      }
    }
  }

  // --- 2. Normal Reply Generation ---
  const contactId = chat?.contactId;
  const contact = contactId ? await Contact.findOne({ _id: contactId }) : null;
  const contactName = contact?.name ? ` The user's name is ${contact.name}.` : '';

  let knowledgeContent = '';
  if (knowledge && knowledge.length > 0) {
    knowledgeContent = knowledge.map(k => {
      if (k.kind === 'url') {
        return `URL: ${k.value}`;
      } else if (k.kind === 'text') {
        return `Text: ${k.value}`;
      } else if (k.kind === 'file') {
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
      // TODO: Add multimodal support for OpenAI
      try {
        const resp = await openaiClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: (system || 'You are a helpful assistant.') + contactName },
            { role: 'user', content: `${prompt || ''}\n\nKnowledge:\n${knowledgeContent}\n\nUser: ${currentMessageText}` },
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
        const model = geminiClient.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const escalationInstruction = `
        IMPORTANT: You are a smart assistant.
        1. If the user EXPLICITLY asks to speak with a human agent, customer service, admin, or a real person (e.g., "bisa bicara dengan orang?", "mana adminnya?", "hubungkan ke CS"), you MUST reply with exactly: "ESCALATE_TO_HUMAN".
        2. If the user just says "halo", "hi", "selamat pagi", or asks general questions, DO NOT escalate. Answer them politely.
        3. If the user asks a specific question about the business/product that is NOT in your knowledge base, you MAY escalate by replying "ESCALATE_TO_HUMAN", but try to be helpful first if possible.
        4. Do not add any other text if you decide to escalate.
        `;

        const systemInstruction = (system || 'You are a helpful assistant.') + contactName + escalationInstruction;

        const geminiHistory = [
          { role: 'user', parts: [{ text: systemInstruction }] },
          { role: 'model', parts: [{ text: 'Baik, saya mengerti.' }] },
        ];

        // Process history asynchronously to avoid blocking
        for (const msg of history) {
          const role = msg.from === 'user' ? 'user' : 'model';
          const parts = [];

          if (msg.text) {
            parts.push({ text: msg.text });
          }

          if (msg.attachment?.url) {
            const storedName = msg.attachment.url.split('/files/')[1];
            if (storedName) {
              // Only add inlineData (images) for USER messages. Model cannot have inlineData.
              if (role === 'user') {
                try {
                  const filePath = path.resolve('uploads', storedName);
                  await fs.access(filePath); // Check if file exists
                  const mimeType = getMimeType(msg.attachment.filename);
                  const data = await fs.readFile(filePath, 'base64');
                  parts.push({ inlineData: { mimeType, data } });
                } catch (e) {
                  console.warn('[AI] History attachment not found or unreadable: ', storedName);
                  parts.push({ text: '[Attachment unreadable]' });
                }
              } else {
                // For model, just mention it sent a file
                parts.push({ text: `[System: Assistant previously sent ${msg.attachment.filename || 'a file'}]` });
              }
            }
          }

          if (parts.length > 0) {
            geminiHistory.push({ role, parts });
          }
        }

        const chatSession = model.startChat({
          history: geminiHistory,
          generationConfig: {
            temperature: 0.5,
          }
        });

        const promptText = `${prompt || ''}\n\nKnowledge:\n${knowledgeContent}\n\nUser: ${currentMessageText}`;
        const promptParts = [{ text: promptText }];

        if (message.attachment?.url) {
          const storedName = message.attachment.url.split('/files/')[1];
          if (storedName) {
            try {
              const filePath = path.resolve('uploads', storedName);
              await fs.access(filePath);
              const mimeType = getMimeType(message.attachment.filename);
              const data = await fs.readFile(filePath, 'base64');
              promptParts.push({ inlineData: { mimeType, data } });
              console.log(`[AI] Attached image ${filePath} to prompt.`);
            } catch (e) {
              console.error(`[AI] Failed to read attachment for prompt: ${storedName}`, e);
              promptParts[0].text += '\n[System note: Failed to load attachment.]';
            }
          }
        }

        const result = await chatSession.sendMessage(promptParts);
        reply = result.response.text();
        console.log('Gemini AI reply:', reply);

        // Check for escalation
        if (reply.includes('ESCALATE_TO_HUMAN')) {
          console.log('[AI] Escalation triggered for chat:', chat._id);
          await Chat.updateOne({ _id: chat._id }, { $set: { isEscalated: true } });
          return 'Baik, mohon tunggu sebentar, saya akan menyambungkan Anda dengan staf kami.';
        }

      } catch (e) {
        console.error('Gemini AI error:', e.message);
      }
    }

    if (contactId && !contact?.name) {
      const namePrompt = `Does the user reveal their name in this message? If so, what is it? If not, say "NO_NAME".\n\nUser: ${currentMessageText}`;
      const model = geminiClient.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const resp = await model.generateContent(namePrompt);
      const name = resp.response.text();
      if (name && name.trim().toUpperCase() !== 'NO_NAME') {
        await Contact.updateOne({ _id: contactId }, { $set: { name: name.trim() } });
      }
    }

    return reply;
  } catch (e) {
    console.error('AI error:', e.message);
  }

  return `Echo: ${currentMessageText}`;
}

export async function findAndSendFile({ agent, message, openaiClient, geminiClient }) {
  const messageText = typeof message === 'string' ? message : message.text || '';
  if (!messageText) return null;

  try {
    if (agent.database && agent.database.length > 0) {
      if (agent.prompt) {
        const instructions = agent.prompt.split(/jika/i).slice(1);

        for (const instruction of instructions) {
          const match = instruction.match(/(.*?) maka kirim (.*)/i);
          if (match) {
            const condition = match[1].trim();
            const fileId = match[2].trim();

            const prompt = `You are a helpful assistant. The user's message is: "${messageText}". The condition for sending a file is: "${condition}". Does the user's message match the condition? Please answer with "yes" or "no".`;

            let answer = 'no';
            if (openaiClient) {
              const resp = await openaiClient.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0,
              });
              answer = resp.choices?.[0]?.message?.content || 'no';
            } else if (geminiClient) {
              const model = geminiClient.getGenerativeModel({ model: 'gemini-2.5-flash' });
              const result = await model.generateContent(prompt);
              answer = result.response.text();
            }

            if (answer.toLowerCase().includes('yes')) {
              const file = agent.database.find(f => f.id.includes(fileId));
              if (file) {
                console.log('File found for user message based on prompt:', file.originalName);
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

      const lowerMsg = messageText.toLowerCase();
      const simpleMatch = agent.database.find(file => {
        const name = (file.originalName || '').toLowerCase();
        const base = name.replace(/\.[^.]+$/, '');
        return (
          (name && lowerMsg.includes(name)) ||
          (base && lowerMsg.includes(base)) ||
          (file.id && lowerMsg.includes(file.id.toLowerCase()))
        );
      });

      if (simpleMatch) {
        console.log('Simple keyword match found for:', simpleMatch.originalName);
        const serverUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:5000';
        return {
          text: `Tentu, ini file ${simpleMatch.originalName} yang Anda minta.`,
          attachment: {
            url: `${serverUrl}/files/${simpleMatch.storedName}`,
            filename: simpleMatch.originalName,
            storedName: simpleMatch.storedName,
          },
        };
      }
    }
  } catch (e) {
    console.error('File request from prompt check failed:', e.message);
  }

  return null;
}