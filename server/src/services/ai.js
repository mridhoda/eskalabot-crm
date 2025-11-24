import Fuse from 'fuse.js';
import { openaiClient, geminiClient } from './aiClient.js';

import Chat from '../models/Chat.js';
import Contact from '../models/Contact.js';
import Knowledge from '../models/Knowledge.js';

// Helper function to fetch a URL and convert it to a Gemini Part.
async function urlToGenerativePart(url, mimeType) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return {
    inlineData: {
      data: Buffer.from(buffer).toString("base64"),
      mimeType
    },
  };
}


export async function generateAIReply({ system, prompt, message, attachment, knowledge, agent, chat, history = [] }) {
  // Fallback echo
  if (!openaiClient && !geminiClient) {
    // To support multi-message replies, we wrap the echo in the new format.
    return { replies: [`Echo: ${message}`] };
  }

  // --- 1. Q&A Check ---
  if (message && knowledge && knowledge.length > 0) {
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
        return { replies: [results[0].item.answer] };
      }
    }
  }

  // --- 2. Normal Reply Generation ---
  const contact = await Contact.findOne({ _id: chat.contactId });
  const contactName = contact?.name ? ` The user's name is ${contact.name}.` : '';

  const naturalResponseInstruction = `
    Your primary goal is to answer the user's question accurately and naturally. If there is an image, your goal is to describe or analyze the image based on the user's question.

    1.  **Stay on Topic:** Your response MUST be directly related to the user's most recent message and/or image. Do not include irrelevant information from the general prompt unless specifically asked.
    2.  **Natural Message Splitting:**
        *   Keep a single, coherent thought or paragraph in ONE message bubble. Do not split every sentence.
        *   You should only split your response into multiple messages if you are performing distinct, separate actions. For example:
            - Greeting the user, then asking a question.
            - Answering a question, then sending a file.
            - Answering a question about one topic, then transitioning to a completely different topic.
    3.  **JSON Output Format:** Your FINAL output MUST be a single, valid JSON object with one key: "replies". The "replies" key must hold an array of strings. Each string is a separate chat message.

    ---
    **Good Example (Coherent thought in one message):**
    User asks: "What are your business hours?"
    AI Response:
    {
      "replies": [
        "Toko kami buka dari jam 9 pagi sampai jam 5 sore, dari hari Senin sampai Jumat. Kalau weekend kami libur ya."
      ]
    }

    **Good Example (Splitting for distinct actions):**
    User asks: "Can I see the latest promo brochure?"
    AI Response:
    {
      "replies": [
        "Tentu, ini brosur promo terbaru kami.",
        "![Brosur Promo](promo_q4_2025.pdf)",
        "Ada lagi yang bisa dibantu?"
      ]
    }

    **Bad Example (Splitting one thought unnecessarily):**
    {
      "replies": [
        "Toko kami buka dari jam 9 pagi sampai jam 5 sore.",
        "Dari hari Senin sampai Jumat.",
        "Kalau weekend kami libur ya."
      ]
    }
    ---
  `;

  let knowledgeContent = '';
  if (knowledge && knowledge.length > 0) {
    knowledgeContent = knowledge.map(k => {
      if (k.kind === 'url') return `URL: ${k.value}`;
      if (k.kind === 'text') return `Text: ${k.value}`;
      if (k.kind === 'file') return '';
      if (k.kind === 'qna') return `Q: ${k.question}\nA: ${k.answer}`;
    }).join('\n');
  }

  let rawReply = '';
  const errors = [];
  const baseSystem = system || 'You are a helpful assistant.';
  const fullSystemInstruction = `${naturalResponseInstruction}\n\n${baseSystem}${contactName}`;

  // Prioritize Gemini if available
  if (geminiClient) {
    try {
      let model;
      if (attachment) {
        // Vision model for image analysis. It may not strictly enforce JSON output,
        // but the prompt guides it to produce JSON.
        model = geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
      } else {
        // Text model for chat, which can be configured for JSON output.
        model = geminiClient.getGenerativeModel({
          model: 'gemini-pro',
          generationConfig: { responseMimeType: 'application/json' },
        });
      }

      // Convert history to Gemini format, handling attachments
      const geminiHistory = [
        { role: 'user', parts: [{ text: 'You are a helpful assistant.' }] },
        { role: 'model', parts: [{ text: '{"replies": ["Baik, saya mengerti. Saya akan membalas dalam format JSON yang diminta dan memecah pesan jika perlu agar terdengar alami."]}' }] },
        ...history.map(msg => {
          const parts = [];
          if (msg.text) parts.push({ text: msg.text });
          // Note: Gemini history doesn't easily support remote URLs. 
          // For simplicity, we are not including past images in the history for Gemini.
          return {
            role: msg.from === 'user' ? 'user' : 'model',
            parts: parts,
          };
        })
      ];

      const chatSession = model.startChat({ history: geminiHistory });

      // Construct the prompt with image if available
      const promptParts = [
        `System instruction: ${fullSystemInstruction}\n\nKnowledge:\n${knowledgeContent}\n\nUser: ${message}`
      ];
      if (attachment && attachment.url) {
        console.log('[ai-gemini] processing image attachment:', attachment.url);
        // Assuming JPEG for now. A more robust solution would check the mime type.
        const imagePart = await urlToGenerativePart(attachment.url, "image/jpeg");
        promptParts.unshift(imagePart);
      }
      
      const result = await chatSession.sendMessage(promptParts);
      rawReply = result.response.text();
      console.log('Gemini AI reply:', rawReply);
    } catch (e) {
      const errorMsg = `Gemini AI error: ${e.message}`;
      console.error(errorMsg);
      errors.push(errorMsg);
    }
  }

  // Fallback to OpenAI if Gemini fails or is not available
  if (openaiClient && !rawReply) {
    if (errors.length > 0) console.log('Falling back to OpenAI...');
    try {
      // Construct the user message with image if available
      const userMessageContent = [];
      if (message) {
        userMessageContent.push({ type: 'text', text: `${prompt || ''}\n\nKnowledge:\n${knowledgeContent}\n\nUser: ${message}` });
      }
      if (attachment && attachment.url) {
        console.log('[ai-openai] processing image attachment:', attachment.url);
        userMessageContent.push({ type: 'image_url', image_url: { url: attachment.url } });
      }
      
      // Convert history to OpenAI format
      const openAIHistory = history.map(msg => {
        const content = [];
        if (msg.text) content.push({ type: 'text', text: msg.text });
        if (msg.attachment?.url) content.push({ type: 'image_url', image_url: { url: msg.attachment.url } });
        
        return {
          role: msg.from === 'user' ? 'user' : 'assistant',
          content: content.length > 0 ? content : 'empty message', // API requires non-empty content
        };
      });

      const resp = await openaiClient.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: fullSystemInstruction },
          ...openAIHistory,
          { role: 'user', content: userMessageContent },
        ],
        temperature: 0.6,
        response_format: { type: 'json_object' },
      });
      rawReply = resp.choices?.[0]?.message?.content || '';
      console.log('OpenAI reply:', rawReply);
    } catch (e) {
      const errorMsg = `OpenAI error: ${e.message}`;
      console.error(errorMsg);
      errors.push(errorMsg);
    }
  }

  if (!rawReply) {
    if (errors.length > 0) {
      throw new Error(`All AI providers failed. Collected errors: ${errors.join('; ')}`);
    }
    throw new Error('AI reply was empty, but no specific error was caught.');
  }

  // --- Parse reply and handle post-generation logic ---
  try {
    const parsedReply = JSON.parse(rawReply);
    if (!parsedReply.replies || !Array.isArray(parsedReply.replies)) {
      // If JSON is malformed but we got a response, wrap it to prevent crash
      return { replies: [rawReply] };
    }

    // --- Post-generation logic (only runs if AI reply was successful) ---
    try {
      if (agent && agent.followUps?.length > 0 && chat && !chat.state?.followUp) {
        const followUp = agent.followUps[0];
        if (followUp) {
          await Chat.updateOne({ _id: chat._id }, { $set: { 'state.followUp': { prompt: followUp.prompt, delay: followUp.delay, triggeredAt: new Date() } } });
        }
      }
      if (!contact.name && message) {
        const namePrompt = `Does the user reveal their name in this message? If so, what is it? If not, say "NO_NAME".\n\nUser: ${message}`;
        const model = geminiClient.getGenerativeModel({ model: 'gemini-pro' });
        const resp = await model.generateContent(namePrompt);
        const name = resp.response.text();
        if (name && name.trim().toUpperCase() !== 'NO_NAME') {
          await Contact.updateOne({ _id: chat.contactId }, { $set: { name: name.trim() } });
        }
      }
    } catch (e) {
      console.error('Error in post-reply logic (follow-up/save-name):', e.message);
    }

    return parsedReply; // Return the full object e.g., { replies: ["msg1", "msg2"] }

  } catch (e) {
    console.error('Failed to parse AI JSON response:', e.message, 'Raw reply:', rawReply);
    // Fallback for non-JSON responses
    return { replies: [rawReply] };
  }
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
          if (geminiClient) {
            try {
              const model = geminiClient.getGenerativeModel({ model: 'gemini-pro' });
              const result = await model.generateContent(prompt);
              answer = result.response.text();
            } catch (e) {
              console.error('Gemini error in findAndSendFile:', e.message);
              console.log('Falling back to OpenAI for file search check...');
            }
          }

          if (openaiClient && answer.toLowerCase().includes('no')) {
            try {
              const resp = await openaiClient.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0,
              });
              answer = resp.choices?.[0]?.message?.content || 'no';
            } catch (e) {
              console.error('OpenAI error in findAndSendFile:', e.message);
            }
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
