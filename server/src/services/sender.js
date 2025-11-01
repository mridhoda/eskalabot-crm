import { promises as fs } from 'fs';
import path from 'path';

export async function tgSend(token, chatId, text) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`
  const body = { chat_id: chatId, text }
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const j = await r.json()
  if (!j.ok) throw new Error(`Telegram sendMessage failed: ${JSON.stringify(j)}`)
  return j
}

export async function waSend(token, fromPhoneNumberId, to, text) {
  const url = `https://graph.facebook.com/v19.0/${fromPhoneNumberId}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to,
    text: { body: text },
  };
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (j.error) throw new Error(`WhatsApp sendMessage failed: ${JSON.stringify(j.error)}`);
  return j;
}

export async function waSendDocument(token, fromPhoneNumberId, to, documentUrl, filename) {
  const url = `https://graph.facebook.com/v19.0/${fromPhoneNumberId}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to,
    type: 'document',
    document: {
      link: documentUrl,
      filename: filename,
    },
  };
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (j.error) throw new Error(`WhatsApp sendDocument failed: ${JSON.stringify(j.error)}`);
  return j;
}

export async function igSend(token, recipientId, text) {
  console.log('[meta] igSend token:', token); // Add this log
  const url = `https://graph.facebook.com/v19.0/me/messages`;
  const body = {
    recipient: { id: recipientId },
    message: { text },
    messaging_type: 'RESPONSE'
  };
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (j.error) throw new Error(`Instagram sendMessage failed: ${JSON.stringify(j.error)}`);
  return j;
}

export async function igSendDocument(token, recipientId, documentUrl, caption) {
  const url = `https://graph.facebook.com/v19.0/me/messages`;
  
  // Send the document
  const docBody = {
    recipient: { id: recipientId },
    message: {
      attachment: {
        type: 'file',
        payload: {
          url: documentUrl,
        },
      },
    },
    messaging_type: 'RESPONSE'
  };

  const rDoc = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(docBody),
  });

  const jDoc = await rDoc.json();
  if (jDoc.error) throw new Error(`Instagram sendDocument failed: ${JSON.stringify(jDoc.error)}`);

  // If there's a caption, send it as a separate text message
  if (caption) {
    await igSend(token, recipientId, caption);
  }

  return jDoc;
}

export async function igGetUserProfile(userId, token) {
  const url = `https://graph.facebook.com/v19.0/${userId}?fields=name,profile_pic&access_token=${token}`;
  const r = await fetch(url);
  const j = await r.json();
  if (j.error) throw new Error(`Instagram getUserProfile failed: ${JSON.stringify(j.error)}`);
  return j;
}

export async function tgSendSticker(token, chatId, stickerUrl) {
  const url = `https://api.telegram.org/bot${token}/sendSticker`;
  const body = { chat_id: chatId, sticker: stickerUrl };
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(`Telegram sendSticker failed: ${JSON.stringify(j)}`);
  return j;
}

export async function tgSendDocument(token, chatId, localFilePath, caption) {
  const url = `https://api.telegram.org/bot${token}/sendDocument`;
  
  const fileContent = await fs.readFile(localFilePath);
  const filename = path.basename(localFilePath);
  const fileBlob = new Blob([fileContent]);

  const formData = new FormData();
  formData.append('chat_id', String(chatId));
  if (caption) {
    formData.append('caption', caption);
  }
  formData.append('document', fileBlob, filename);

  const r = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const j = await r.json();
  if (!j.ok) throw new Error(`Telegram sendDocument failed: ${JSON.stringify(j)}`);
  return j;
}
