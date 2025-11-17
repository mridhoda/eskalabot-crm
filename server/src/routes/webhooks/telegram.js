import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import Platform from '../../models/Platform.js';
import Agent from '../../models/Agent.js';
import Chat from '../../models/Chat.js';
import Message from '../../models/Message.js';
import Contact from '../../models/Contact.js';
import { generateAIReply, findAndSendFile } from '../../services/ai.js';
import { openaiClient, geminiClient } from '../../services/aiClient.js';
import {
  tgSend,
  tgSendDocument,
  tgSendSticker,
} from '../../services/sender.js';

const router = express.Router();

function decodeRef(value = '') {
  try {
    return decodeURIComponent(value);
  } catch (err) {
    return value;
  }
}

function findDatabaseFileMention(text, agent) {
  if (!text || !agent?.database?.length) return null;
  const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const altText = (match[1] || '').trim();
    const rawRef = (match[2] || '').trim();
    if (!rawRef) continue;
    const decodedRef = decodeRef(rawRef);
    const normalizedTargets = [rawRef, decodedRef].map((val) =>
      (val || '').toLowerCase(),
    );
    const candidate = agent.database.find((file) => {
      const aliases = [
        file.storedName,
        file.originalName,
        file.id,
      ]
        .filter(Boolean)
        .map((val) => val.toLowerCase());
      return aliases.some((alias) =>
        normalizedTargets.some((target) => target === alias || target.includes(alias)),
      );
    });
    if (candidate) {
      return { file: candidate, token: match[0], altText };
    }
  }
  return null;
}

async function fetchTelegramFilePath(token, fileId) {
  const resp = await fetch(
    `https://api.telegram.org/bot${token}/getFile?file_id=${encodeURIComponent(fileId)}`,
  );
  const data = await resp.json();
  if (!data.ok) {
    throw new Error(`Telegram getFile failed: ${JSON.stringify(data)}`);
  }
  return data.result?.file_path;
}

async function saveTelegramFileLocally({
  token,
  fileId,
  preferredName = '',
}) {
  const filePath = await fetchTelegramFilePath(token, fileId);
  if (!filePath) throw new Error('Telegram file_path missing');
  const fileUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;
  const downloadResp = await fetch(fileUrl);
  if (!downloadResp.ok) {
    throw new Error(`Download failed: ${downloadResp.status} ${downloadResp.statusText}`);
  }
  const buffer = Buffer.from(await downloadResp.arrayBuffer());
  const originalBase =
    preferredName ||
    path.basename(filePath) ||
    `telegram_file_${Date.now()}`;
  const safeOriginal = originalBase.replace(/[\\/:*?"<>|]+/g, '_');
  await fs.mkdir('uploads', { recursive: true });
  const storedName = `${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 8)}_${safeOriginal}`;
  const storedPath = path.resolve('uploads', storedName);
  await fs.writeFile(storedPath, buffer);
  return { storedName, originalName: safeOriginal };
}

router.post('/', async (req, res) => {
  res.sendStatus(200);

  try {
    const update = req.body || {};
    console.log('[telegram] update:', JSON.stringify(update));

    const msgObj =
      update.message ||
      update.edited_message ||
      (update.callback_query && update.callback_query.message);

    if (!msgObj) {
      console.warn('[telegram] update without message, skipping');
      return;
    }

    let text =
      update.message?.text ||
      update.edited_message?.text ||
      update.callback_query?.data ||
      msgObj.caption ||
      '';

    const chatId = msgObj?.chat?.id;
    if (!chatId) return;

    const platform = await Platform.findOne({
      type: 'telegram',
      token: { $exists: true, $ne: '' },
    }).sort({ createdAt: -1 });

    if (!platform) {
      console.warn('[telegram] no platform/token found');
      return;
    }

    let incomingAttachment = null;
    if (Array.isArray(msgObj.photo) && msgObj.photo.length > 0) {
      const largestPhoto = msgObj.photo[msgObj.photo.length - 1];
      try {
        const saved = await saveTelegramFileLocally({
          token: platform.token,
          fileId: largestPhoto.file_id,
          preferredName: `photo_${largestPhoto.file_unique_id || Date.now()}.jpg`,
        });
        incomingAttachment = {
          url: `/files/${saved.storedName}`,
          filename: saved.originalName,
          storedName: saved.storedName,
        };
        if (!text) {
          text = '[Foto dikirim]';
        }
      } catch (e) {
        console.error('[telegram] Failed to store incoming photo:', e);
      }
    } else if (msgObj.document) {
      try {
        const saved = await saveTelegramFileLocally({
          token: platform.token,
          fileId: msgObj.document.file_id,
          preferredName: msgObj.document.file_name || '',
        });
        incomingAttachment = {
          url: `/files/${saved.storedName}`,
          filename: saved.originalName,
          storedName: saved.storedName,
        };
        if (!text) {
          text = '[Dokumen dikirim]';
        }
      } catch (e) {
        console.error('[telegram] Failed to store incoming document:', e);
      }
    }

    let agent = await Agent.findOne({ platformId: platform._id });
    if (!agent) {
      agent = await Agent.findOne({ workspaceId: platform.workspaceId }).sort({
        createdAt: 1,
      });
    }
    const system = agent?.behavior || 'You are a helpful assistant.';
    const prompt = agent?.prompt || '';
    const welcome = agent?.welcomeMessage || 'Halo! Ada yang bisa saya bantu?';

    let contact = await Contact.findOne({
      userId: platform.userId,
      platformAccountId: String(chatId),
    });
    if (!contact) {
      const from = msgObj?.chat || {};
      const name =
        [from.first_name, from.last_name].filter(Boolean).join(' ') ||
        from.username ||
        `User ${chatId}`;
      contact = await Contact.create({
        userId: platform.userId,
        workspaceId: platform.workspaceId,
        name,
        platformType: 'telegram',
        platformAccountId: String(chatId),
        handle: from.username ? `@${from.username}` : '',
        lastSeen: new Date(),
      });
    }

    let chat = await Chat.findOne({
      userId: platform.userId,
      platformId: platform._id,
      contactId: contact._id,
    });
    const isNewChat = !chat;
    if (!chat) {
      chat = await Chat.create({
        userId: platform.userId,
        workspaceId: platform.workspaceId,
        platformId: platform._id,
        platformType: 'telegram',
        contactId: contact._id,
        agentId: agent?._id || null,
        lastMessageAt: new Date(),
      });
    } else if (!chat.agentId && agent) {
      chat.agentId = agent._id;
      await chat.save();
    }

    if (text || incomingAttachment) {
      await Message.create({
        chatId: chat._id,
        workspaceId: platform.workspaceId,
        from: 'user',
        text: text || '[Attachment]',
        attachment: incomingAttachment,
        createdAt: new Date(),
      });
      await Chat.updateOne(
        { _id: chat._id },
        { $set: { lastMessageAt: new Date() }, $inc: { unread: 1 } },
      );
    }

    if (chat.takeoverBy) {
      console.log(
        `[telegram] chat ${chat._id} is handled by human, skipping AI reply.`,
      );
      return;
    }

    if (isNewChat) {
      const processedWelcome = welcome.replace('{{name}}', contact.name);
      try {
        await tgSend(platform.token, chatId, processedWelcome);
      } catch (e) {
        console.error('[telegram] Failed to send welcome message:', e);
      }
      await Message.create({
        chatId: chat._id,
        workspaceId: platform.workspaceId,
        from: 'ai',
        text: processedWelcome,
        createdAt: new Date(),
      });

      if (agent && agent.stickerUrl) {
        try {
          const stickerUrl = `${process.env.PUBLIC_BASE_URL}${agent.stickerUrl}`;
          await tgSendSticker(platform.token, chatId, stickerUrl);
        } catch (e) {
          console.error('[telegram] Sticker error:', e);
        }
      }
    }

    if (text && (!isNewChat || text !== '/start')) {
      const fileResponse = await findAndSendFile({
        agent,
        message: text,
        openaiClient,
        geminiClient,
      });

      if (fileResponse) {
        const { text: replyText, attachment } = fileResponse;
        if (attachment && attachment.storedName) {
          const localFilePath = path.resolve('uploads', attachment.storedName);
          try {
            await tgSendDocument(
              platform.token,
              chatId,
              localFilePath,
              replyText,
            );
          } catch (e) {
            console.error(
              '[telegram] Failed to send document from fileResponse:',
              e,
            );
          }
        } else {
          try {
            await tgSend(platform.token, chatId, replyText);
          } catch (e) {
            console.error(
              '[telegram] Failed to send text from fileResponse:',
              e,
            );
          }
        }
        await Message.create({
          chatId: chat._id,
          workspaceId: platform.workspaceId,
          from: 'ai',
          text: replyText,
          attachment: fileResponse.attachment || null,
          createdAt: new Date(),
        });
        return;
      }

      let reply;
      try {
        const history = await Message.find({ chatId: chat._id })
          .sort({ createdAt: -1 })
          .limit(10);
        history.reverse();
        reply = await generateAIReply({
          system,
          prompt,
          message: text,
          knowledge: agent?.knowledge,
          agent,
          chat,
          history,
        });
      } catch (e) {
        console.error('[telegram] AI error:', e);
        reply = { text: `Echo: ${text}` };
      }

      let replyText = typeof reply === 'string' ? reply : reply.text;
      const attachment =
        typeof reply === 'object' && reply.attachment ? reply.attachment : null;

      const mention = findDatabaseFileMention(replyText, agent);
      if (mention && mention.file?.storedName) {
        const { file, token, altText } = mention;
        const cleanedText = (replyText || '')
          .replace(token, altText || '')
          .trim();
        const caption = cleanedText || altText || '';
        const localFilePath = path.resolve('uploads', file.storedName);
        let documentSent = false;
        try {
          await tgSendDocument(
            platform.token,
            chatId,
            localFilePath,
            caption || undefined,
          );
          documentSent = true;
        } catch (e) {
          console.error(
            '[telegram] Failed to send document from markdown mention:',
            e,
          );
          if (replyText) {
            try {
              await tgSend(platform.token, chatId, replyText);
            } catch (innerError) {
              console.error(
                '[telegram] Fallback text send failed after markdown mention:',
                innerError,
              );
            }
          }
        }

        const savedText =
          cleanedText || altText || replyText || 'Lampiran terkirim.';
        await Message.create({
          chatId: chat._id,
          workspaceId: platform.workspaceId,
          from: 'ai',
          text: savedText,
          attachment: documentSent
            ? {
                url: `/files/${file.storedName}`,
                filename: file.originalName || file.storedName,
              }
            : null,
          createdAt: new Date(),
        });

        if (documentSent) return;
      }

      if (attachment && attachment.storedName) {
        const localFilePath = path.resolve('uploads', attachment.storedName);
        try {
          await tgSendDocument(platform.token, chatId, localFilePath, replyText);
        } catch (e) {
          console.error('[telegram] Failed to send document reply:', e);
        }
      } else if (replyText) {
        try {
          await tgSend(platform.token, chatId, replyText);
        } catch (e) {
          console.error('[telegram] Failed to send text reply:', e);
        }
      }

      await Message.create({
        chatId: chat._id,
        workspaceId: platform.workspaceId,
        from: 'ai',
        text: replyText,
        attachment,
        createdAt: new Date(),
      });
    }
  } catch (err) {
    console.error('Webhook /telegram error:', err);
  }
});

export default router;
