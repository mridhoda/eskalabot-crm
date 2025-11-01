import express from 'express';
import path from 'path';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import { authRequired, attachUser } from '../middleware/auth.js';
import { tgSend, waSend, tgSendDocument, waSendDocument } from '../services/sender.js';

const router = express.Router();

router.get('/', authRequired, attachUser, async (req, res) => {
  const { unreadOnly } = req.query;

  const queryFilter = { workspaceId: req.me.workspaceId };
  if (unreadOnly === 'true') {
    queryFilter.unread = { $gt: 0 };
  }

  const rows = await Chat.find(queryFilter)
    .populate('contactId')
    .populate('agentId')
    .sort({ lastMessageAt: -1 })
    .limit(200);
  
  const populatedRows = await Promise.all(rows.map(async (chat) => {
    const lastMessage = await Message.findOne({ chatId: chat._id }).sort({ createdAt: -1 });
    return {
      ...chat.toObject(),
      lastMessage: lastMessage?.text,
      platformType: chat.contactId?.platformType,
    };
  }));

  res.json(populatedRows);
});

router.get('/:chatId/messages', authRequired, attachUser, async (req, res) => {
  const { chatId } = req.params;
  await Chat.updateOne({ _id: chatId, workspaceId: req.me.workspaceId }, { $set: { unread: 0 } });
  const chat = await Chat.findOne({ _id: chatId, workspaceId: req.me.workspaceId });
  if (!chat) {
    return res.status(404).json({ error: 'Chat not found or access denied' });
  }
  const rows = await Message.find({ chatId }).sort({ createdAt: 1 }).limit(500);
  res.json(rows);
});

router.post('/:chatId/send', authRequired, attachUser, async (req, res) => {
  const { chatId } = req.params;
  const { text, attachment } = req.body;
  if (!text && !attachment) return res.status(400).json({ error: 'Text or attachment required' });

  const chat = await Chat.findOne({ _id: chatId, workspaceId: req.me.workspaceId }).populate('contactId').populate('platformId');
  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  // as human
  const msg = await Message.create({ 
    chatId, 
    from: 'human', 
    text: text || '', 
    attachment: attachment || null,
    workspaceId: req.me.workspaceId 
  });
  await Chat.updateOne({ _id: chatId }, { $set: { lastMessageAt: new Date() } });

  // Send to client
  if (chat.platformId && chat.contactId) {
    if (chat.platformType === 'telegram') {
      try {
        if (attachment && attachment.url) {
          const filename = path.basename(attachment.url);
          const localFilePath = path.resolve('uploads', filename);
          await tgSendDocument(chat.platformId.token, chat.contactId.platformAccountId, localFilePath, text || '');
        } else if (text) {
          await tgSend(chat.platformId.token, chat.contactId.platformAccountId, text);
        }
      } catch (e) {
        console.error('Failed to send message to Telegram:', e);
      }
    } else if (chat.platformType === 'whatsapp') {
      // WhatsApp still needs a public URL
      try {
        const serverUrl = process.env.PUBLIC_BASE_URL || `http://${req.headers.host}`;
        if (attachment && attachment.url) {
          const fullUrl = attachment.url.startsWith('http') ? attachment.url : `${serverUrl}${attachment.url}`;
          await waSendDocument(chat.platformId.token, chat.platformId.phoneNumberId, chat.contactId.platformAccountId, fullUrl, attachment.filename);
          if (text) { // WA doesn't support caption with document, send separately
            await waSend(chat.platformId.token, chat.platformId.phoneNumberId, chat.contactId.platformAccountId, text);
          }
        } else if (text) {
          await waSend(chat.platformId.token, chat.platformId.phoneNumberId, chat.contactId.platformAccountId, text);
        }
      } catch (e) {
        console.error('Failed to send message to WhatsApp:', e);
      }
    }
  }

  res.json(msg);
});

router.post('/:chatId/takeover', authRequired, attachUser, async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findOneAndUpdate(
    { _id: chatId, workspaceId: req.me.workspaceId },
    { $set: { takeoverBy: req.me._id } },
    { new: true }
  ).populate('contactId').populate('agentId');
  res.json(chat);
});

router.post('/:chatId/resolve', authRequired, attachUser, async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findOneAndUpdate(
    { _id: chatId, workspaceId: req.me.workspaceId },
    { $set: { takeoverBy: null } },
    { new: true }
  ).populate('contactId').populate('agentId');
  res.json(chat);
});

export default router;