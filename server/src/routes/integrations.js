import express from 'express';
import Platform from '../models/Platform.js';
import { authRequired, attachUser } from '../middleware/auth.js';
import { setTelegramWebhook } from '../services/telegramService.js';

const router = express.Router();

const cleanBaseUrl = (baseUrl = '') => baseUrl.replace(/\/+$/, '');

// Instagram Business Login OAuth redirect target
// This endpoint is used only as a redirect landing page so the
// login flow can complete. You can later extend this to exchange
// the code for tokens and persist them.
router.get('/instagram/callback', async (req, res) => {
  try {
    const { code, state, error, error_description } = req.query || {};

    if (error) {
      return res.status(400).send(`Instagram login error: ${error_description || error}`);
    }

    if (!code) {
      return res.status(400).send('Missing authorization code.');
    }

    console.log('[instagram] business login callback received:', { code, state });

    // Minimal success page. Replace with a redirect to your web app if needed.
    res.status(200).send(
      '<html><body style="font-family: sans-serif">' +
        '<h2>Instagram connected</h2>' +
        '<p>You can close this window. Code received.</p>' +
      '</body></html>'
    );
  } catch (e) {
    console.error('[instagram] callback error:', e);
    res.status(500).send('Server error processing Instagram callback');
  }
});

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

    const result = await setTelegramWebhook(platform._id, platform.token);

    if (!result.ok) {
      return res.status(502).json({
        error: result.error,
        detail: result.detail,
      });
    }

    res.json({ ok: true, webhookUrl: result.webhookUrl });
  } catch (error) {
    console.error('[telegram] setWebhook error:', error);
    res.status(500).json({ error: 'Server error saat set webhook Telegram' });
  }
});

export default router;
