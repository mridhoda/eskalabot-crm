import express from 'express';
import Platform from '../../models/Platform.js';
import Agent from '../../models/Agent.js';
import Chat from '../../models/Chat.js';
import Message from '../../models/Message.js';
import Contact from '../../models/Contact.js';
import { generateAIReply } from '../../services/ai.js';
import {
  igGetUserProfile,
  igSend,
  igSendDocument,
  waSend,
  waSendDocument,
  waGetMediaUrl,
} from '../../services/sender.js';

const router = express.Router();

router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];

  console.log('[meta] verification request:', req.query);
  console.log('[meta] server verify token:', process.env.META_VERIFY_TOKEN);

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

router.post('/', async (req, res) => {
  res.sendStatus(200);

  try {
    const data = req.body;
    console.log('[meta] webhook received:', JSON.stringify(data, null, 2));

    if (data.object === 'whatsapp_business_account') {
      await handleWhatsapp(data);
    } else if (data.object === 'instagram') {
      await handleInstagram(data);
    }
  } catch (err) {
    console.error('Webhook /meta error:', err);
  }
});

async function handleWhatsapp(data) {
  for (const entry of data.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== 'messages') continue;

      const value = change.value;
      if (!value?.messages?.length) continue;

      const fromPhoneNumberId = value.metadata?.phone_number_id;
      const platformAccountId = entry.id;
      const platform = await Platform.findOne({
        accountId: platformAccountId,
        type: 'whatsapp',
      });

      if (!platform) {
        console.warn(
          '[meta] whatsapp platform not found for accountId:',
          platformAccountId,
        );
        continue;
      }

      let agent = await Agent.findOne({ platformId: platform._id });
      if (!agent) {
        agent = await Agent.findOne({
          workspaceId: platform.workspaceId,
        }).sort({ createdAt: 1 });
      }
      const system = agent?.behavior || 'You are a helpful assistant.';
      const prompt = agent?.prompt || '';
      const welcome = agent?.welcomeMessage || 'Halo! Ada yang bisa saya bantu?';

      for (const message of value.messages) {
        // MODIFICATION START: Handle different message types
        let text = '';
        let attachment = null;

        if (message.type === 'text') {
          text = message.text?.body ?? '';
        } else if (message.type === 'image') {
          text = message.image?.caption ?? ''; // Caption for the image
          if (platform.token && message.image?.id) {
            try {
              const imageUrl = await waGetMediaUrl(message.image.id, platform.token);
              attachment = { url: imageUrl, filename: 'whatsapp_image.jpg' };
              console.log(`[meta] received image from whatsapp: ${imageUrl}`);
            } catch(e) {
              console.error('[meta] failed to get whatsapp media url:', e);
            }
          }
        } else {
          // Optional: handle other message types or ignore
          console.log(`[meta] skipping whatsapp message of type ${message.type}`);
          continue;
        }

        const from = message.from;
        // MODIFICATION END

        let contact = await Contact.findOne({
          userId: platform.userId,
          platformAccountId: from,
        });
        if (!contact) {
          const name = value.contacts?.[0]?.profile?.name || from;
          contact = await Contact.create({
            userId: platform.userId,
            workspaceId: platform.workspaceId,
            name,
            platformType: 'whatsapp',
            platformAccountId: from,
            handle: from,
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
            platformType: 'whatsapp',
            contactId: contact._id,
            agentId: agent?._id || null,
            lastMessageAt: new Date(),
          });
        } else if (agent && String(chat.agentId) !== String(agent._id)) {
          chat.agentId = agent._id;
          await chat.save();
        }

        await Message.create({
          chatId: chat._id,
          workspaceId: platform.workspaceId,
          from: 'user',
          text,
          attachment, // Save attachment URL to DB
          createdAt: new Date(),
        });
        await Chat.updateOne(
          { _id: chat._id },
          { $set: { lastMessageAt: new Date() }, $inc: { unread: 1 } },
        );

        if (chat.takeoverBy) {
          console.log(
            `[meta] chat ${chat._id} is handled by human, skipping AI reply.`,
          );
          continue;
        }

        if (isNewChat) {
          const processedWelcome = welcome.replace('{{name}}', contact.name);
          await waSend(platform.token, fromPhoneNumberId, from, processedWelcome);
          await Message.create({
            chatId: chat._id,
            workspaceId: platform.workspaceId,
            from: 'ai',
            text: processedWelcome,
            createdAt: new Date(),
          });
        }
        
        // Let AI reply if there is text OR an attachment
        if (text || attachment) {
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
              attachment, // Pass attachment to AI
              knowledge: agent?.knowledge,
              agent,
              chat,
              history,
            });
          } catch (e) {
            console.error('[meta] AI error:', e);
            reply = { text: `Echo: ${text}` };
          }

          const replyText = typeof reply === 'string' ? reply : reply.text;
          const replyAttachment =
            typeof reply === 'object' && reply.attachment
              ? reply.attachment
              : null;

          if (replyAttachment && replyAttachment.url) {
            await waSendDocument(
              platform.token,
              fromPhoneNumberId,
              from,
              replyAttachment.url,
              replyAttachment.filename,
            );
            if (replyText) {
              await waSend(platform.token, fromPhoneNumberId, from, replyText);
            }
          } else if (replyText) { // Ensure replyText is not empty
            await waSend(platform.token, fromPhoneNumberId, from, replyText);
          }

          await Message.create({
            chatId: chat._id,
            workspaceId: platform.workspaceId,
            from: 'ai',
            text: replyText,
            attachment: replyAttachment,
            createdAt: new Date(),
          });
        }
      }
    }
  }
}

async function handleInstagram(data) {
  for (const entry of data.entry ?? []) {
    const rawMessages = [];

    if (Array.isArray(entry.messaging)) {
      rawMessages.push(...entry.messaging);
    }

    if (Array.isArray(entry.changes)) {
      for (const change of entry.changes) {
        if (change?.field !== 'messages') continue;
        const value = change.value || {};
        if (Array.isArray(value.messaging)) {
          rawMessages.push(...value.messaging);
        } else if (value.message || value.sender) {
          rawMessages.push({
            sender: value.sender,
            recipient: value.recipient,
            message: value.message,
          });
        }
      }
    }

    if (!rawMessages.length) {
      console.warn(
        '[meta] instagram webhook entry without messages payload:',
        entry,
      );
      continue;
    }

    for (const message of rawMessages) {
      if (!message?.message) {
        console.log(
          '[meta] skipping instagram event without message payload:',
          message,
        );
        continue;
      }

      // MODIFICATION START: Handle image attachments
      const text = message.message?.text ?? '';
      let attachment = null;

      if (message.message?.attachments) {
        for (const att of message.message.attachments) {
          if (att.type === 'image' && att.payload?.url) {
            attachment = { url: att.payload.url, filename: 'instagram_image.jpg' };
            console.log(`[meta] received image from instagram: ${attachment.url}`);
            // Typically, Instagram sends one image attachment per message, so we break after finding one.
            break;
          }
        }
      }
      // MODIFICATION END

      const from = message.sender?.id;
      if (!from) {
        console.warn(
          '[meta] instagram message missing sender id:',
          message,
        );
        continue;
      }

      const platformAccountId =
        message.recipient?.id ||
        entry?.changes?.[0]?.value?.recipient?.id ||
        entry.id;

      console.log(`[meta] instagram message from ${from}: ${text}`);

      const platform = await Platform.findOne({
        accountId: platformAccountId,
        type: 'instagram',
      });

      if (!platform) {
        console.warn(
          `[meta] instagram platform not found for accountId: ${platformAccountId}`,
        );
        continue;
      }

      let agent = await Agent.findOne({ platformId: platform._id });
      if (!agent) {
        agent = await Agent.findOne({
          workspaceId: platform.workspaceId,
        }).sort({ createdAt: 1 });
      }
      const system = agent?.behavior || 'You are a helpful assistant.';
      const prompt = agent?.prompt || '';
      const welcome = agent?.welcomeMessage || 'Halo! Ada yang bisa saya bantu?';

      const hasToken = Boolean(platform.token);
      let contact = await Contact.findOne({
        userId: platform.userId,
        platformAccountId: from,
      });

      if (!contact) {
        let name = `Instagram User ${from}`;
        if (hasToken && (text || attachment)) { // Check token if there is any content
          try {
            const profile = await igGetUserProfile(from, platform.token);
            if (profile?.name) {
              name = profile.name;
            }
          } catch (e) {
            console.error('[meta] failed to fetch instagram profile:', e);
          }
        }

        contact = await Contact.create({
          userId: platform.userId,
          workspaceId: platform.workspaceId,
          name,
          platformType: 'instagram',
          platformAccountId: from,
          handle: from,
          lastSeen: new Date(),
        });
      } else if (hasToken && contact.name.startsWith('Instagram User')) {
        try {
          const profile = await igGetUserProfile(from, platform.token);
          if (profile?.name) {
            contact.name = profile.name;
            await contact.save();
          }
        } catch (e) {
          console.error('[meta] failed to update instagram profile:', e);
        }
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
          platformType: 'instagram',
          contactId: contact._id,
          agentId: agent?._id || null,
          lastMessageAt: new Date(),
        });
      } else if (agent && String(chat.agentId) !== String(agent._id)) {
        chat.agentId = agent._id;
        await chat.save();
      }

      if (text || attachment) { // Save message if there's text OR an attachment
        await Message.create({
          chatId: chat._id,
          workspaceId: platform.workspaceId,
          from: 'user',
          text,
          attachment,
          createdAt: new Date(),
        });
        await Chat.updateOne(
          { _id: chat._id },
          { $set: { lastMessageAt: new Date() }, $inc: { unread: 1 } },
        );
      }

      if (chat.takeoverBy) {
        console.log(
          `[meta] chat ${chat._id} is handled by human, skipping AI reply.`,
        );
        continue;
      }

      if (isNewChat && (text || attachment)) { // Send welcome on first contentful message
        const processedWelcome = welcome.replace('{{name}}', contact.name);
        await igSend(
          platform.token,
          from,
          processedWelcome,
        );
        await Message.create({
          chatId: chat._id,
          workspaceId: platform.workspaceId,
          from: 'ai',
          text: processedWelcome,
          createdAt: new Date(),
        });
      }

      if ((text || attachment) && (!isNewChat || text.toLowerCase() !== '/start')) {
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
            attachment, // Pass attachment to AI
            knowledge: agent?.knowledge,
            agent,
            chat,
            history,
          });
        } catch (e) {
          console.error('[meta] instagram AI error:', e);
          reply = { text: `Echo: ${text}` };
        }

        const replyText = typeof reply === 'string' ? reply : reply.text;
        const replyAttachment =
          typeof reply === 'object' && reply.attachment
            ? reply.attachment
            : null;

        if (replyAttachment && replyAttachment.url) {
          await igSendDocument(
            platform.token,
            from,
            replyAttachment.url,
            replyText,
          );
        } else if (replyText) {
          await igSend(
            platform.token,
            from,
            replyText,
          );
        }

        await Message.create({
          chatId: chat._id,
          workspaceId: platform.workspaceId,
          from: 'ai',
          text: replyText,
          attachment: replyAttachment,
          createdAt: new Date(),
        });
      }
    }
  }
}

export default router;
