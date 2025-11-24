import Platform from '../models/Platform.js';

const cleanBaseUrl = (baseUrl = '') => baseUrl.replace(/\/+$/, '');

export async function setTelegramWebhook(platformId, token) {
  if (!token) {
    console.warn(`[telegramService] setTelegramWebhook: No token provided for platform ${platformId}`);
    return { ok: false, error: 'No token provided' };
  }

  if (!process.env.PUBLIC_BASE_URL) {
    console.error('[telegramService] setTelegramWebhook: PUBLIC_BASE_URL is not set in backend');
    return { ok: false, error: 'PUBLIC_BASE_URL not set' };
  }

  const baseUrl = cleanBaseUrl(process.env.PUBLIC_BASE_URL);
  const webhookUrl = `${baseUrl}/webhook/telegram`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        drop_pending_updates: true,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error(`[telegramService] Failed to set Telegram webhook for platform ${platformId}:`, result);
      return { ok: false, error: 'Failed to set webhook', detail: result };
    }

    console.log(`[telegramService] Telegram webhook set successfully for platform ${platformId}:`, webhookUrl);
    return { ok: true, webhookUrl };
  } catch (error) {
    console.error(`[telegramService] Server error while setting Telegram webhook for platform ${platformId}:`, error);
    return { ok: false, error: 'Server error while setting webhook', detail: error.message };
  }
}
