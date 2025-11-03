import express from 'express';
import Platform from '../models/Platform.js';
import { authRequired, attachUser } from '../middleware/auth.js';

const router = express.Router();

const cleanBaseUrl = (baseUrl = '') => baseUrl.replace(/\/+$/, '');

router.post('/telegram/:id/setWebhook', authRequired, attachUser, async (req, res) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findOne({
      _id: id,
      workspaceId: req.me.workspaceId,
      type: 'telegram',
    });

    if (!platform) {
      return res.status(404).json({ error: 'Platform telegram tidak ditemukan' });
    }

    if (!platform.token) {
      return res.status(400).json({ error: 'Token Telegram belum diset' });
    }

    if (!process.env.PUBLIC_BASE_URL) {
      return res.status(400).json({ error: 'PUBLIC_BASE_URL belum diset di backend' });
    }

    const baseUrl = cleanBaseUrl(process.env.PUBLIC_BASE_URL);
    const webhookUrl = `${baseUrl}/webhook/telegram`;

    const response = await fetch(`https://api.telegram.org/bot${platform.token}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        drop_pending_updates: true,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      return res.status(502).json({
        error: 'Gagal set webhook Telegram',
        detail: result,
      });
    }

    res.json({ ok: true, webhookUrl });
  } catch (error) {
    console.error('[telegram] setWebhook error:', error);
    res.status(500).json({ error: 'Server error saat set webhook Telegram' });
  }
});

export default router;
