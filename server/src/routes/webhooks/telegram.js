import express from 'express';
import path from 'path';
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

    const text =
      update.message?.text ||
      update.edited_message?.text ||
      update.callback_query?.data ||
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

    if (text) {
      await Message.create({
        chatId: chat._id,
        workspaceId: platform.workspaceId,
        from: 'user',
        text,
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

      const replyText = typeof reply === 'string' ? reply : reply.text;
      const attachment =
        typeof reply === 'object' && reply.attachment ? reply.attachment : null;

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
