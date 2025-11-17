import React, { useEffect, useState, useRef, useCallback } from 'react'
import api from '../api'

function MessageFooter({ message, selected, user }) {
  const isUser = message.from === 'user'
  const agentName = isUser
    ? selected.contactId?.name
    : selected.takeoverBy
      ? user?.name
      : selected.agentId?.name
  const agentType = isUser ? 'client' : selected.takeoverBy ? 'human' : 'ai'

  return (
    <div style={{ fontSize: 10, color: '#999', marginTop: 4 }}>
      Deliver by {agentName} ({agentType}) -{' '}
      {new Date(message.createdAt).toLocaleString()}
    </div>
  )
}

export default function ChatPanel({ selected, reload, onChatUpdate }) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null);
  const endRef = useRef(null)

  const [user] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('user') || 'null')
    } catch {
      return null
    }
  })

  const selectedId = selected?._id;

  const loadMessages = useCallback(async () => {
    if (!selectedId) return;
    const r = await api.get(`/chats/${selectedId}/messages`);
    setMessages(r.data);
  }, [selectedId]);

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (!selectedId) return
    const interval = setInterval(() => {
      loadMessages()
    }, 4000)
    return () => clearInterval(interval)
  }, [selectedId, loadMessages])

  const send = async () => {
    if (!selectedId || !text) return
    await api.post(`/chats/${selectedId}/send`, { text })
    setText('')
    loadMessages();
    reload?.()
  }

  const handleFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedId) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1. Upload the file to get a URL
      const uploadResponse = await api.post('/agents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { filePath, originalName } = uploadResponse.data;

      // 2. Send the message with the attachment URL
      await api.post(`/chats/${selectedId}/send`, {
        text: `File: ${originalName}`,
        attachment: {
          url: filePath,
          filename: originalName,
        },
      });

      // 3. Refresh messages
      loadMessages();
      reload?.();
    } catch (error) {
      console.error('File sending failed:', error);
      alert('Failed to send file.');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const takeover = async () => {
    if (!selectedId) return
    setIsSubmitting(true)
    try {
      const r = await api.post(`/chats/${selectedId}/takeover`)
      onChatUpdate(r.data)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resolve = async () => {
    if (!selectedId) return
    setIsSubmitting(true)
    try {
      const r = await api.post(`/chats/${selectedId}/resolve`)
      onChatUpdate(r.data)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!selected)
    return (
      <div
        className='card'
        style={{ display: 'grid', placeItems: 'center', height: '100%' }}
      >
        Pilih chat di kiri…
      </div>
    )

  const initials = (s = '') =>
    s
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((x) => x[0]?.toUpperCase() || '')
      .join('') || '?'

  return (
    <div
      className='card col'
      style={{ height: 'calc(100vh - 58px - 20px)', gap: 8 }}
    >
      {/* Header */}
      <div
        className='testhead'
        style={{ paddingBottom: 8, borderBottom: '1px solid var(--border)' }}
      >
        <div className='avatar'>{initials(selected.contactId?.name)}</div>
        <div style={{ fontWeight: 700 }}>
          {selected.contactId?.name || 'User'}
        </div>
        {selected.takeoverBy && (
          <button
            className='btn'
            style={{ marginLeft: 'auto' }}
            onClick={resolve}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : 'Resolve'}
          </button>
        )}
        <button
          className='btn ghost'
          style={{ marginLeft: selected.takeoverBy ? '8px' : 'auto' }}
          onClick={loadMessages}
        >
          ↻
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {messages.map((m, idx) => (
          <div
            key={m._id}
            className={`msg-wrap ${m.from}`}
            ref={idx === messages.length - 1 ? endRef : null}
          >
            <div className={`bbl ${m.from}`}>
              {m.text}
              {m.attachment && (
                <div style={{ marginTop: 8 }}>
                  {(() => {
                    const filename = m.attachment.filename || '';
                    const url =
                      m.attachment.url && (m.attachment.url.startsWith('http://') || m.attachment.url.startsWith('https://'))
                        ? m.attachment.url
                        : `${api.defaults.baseURL}${m.attachment.url || ''}`;
                    const isImage = /\.(png|jpe?g|gif|webp)$/i.test(filename);
                    if (isImage) {
                      return (
                        <img
                          src={url}
                          alt={filename || 'attachment'}
                          style={{ maxWidth: 220, borderRadius: 8, display: 'block' }}
                        />
                      );
                    }
                    return (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='btn ghost'
                      >
                        Download {filename || 'file'}
                      </a>
                    );
                  })()}
                </div>
              )}
            </div>
            <MessageFooter message={m} selected={selected} user={user} />
          </div>
        ))}
      </div>

      {/* Input */}
      {selected.takeoverBy ? (
        <div className='row'>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelected}
          />
          <button 
            className='btn ghost' 
            onClick={() => fileInputRef.current.click()}
            disabled={isUploading}
          >
            {isUploading ? '...' : '📎'}
          </button>
          <input
            className='input'
            placeholder='Ketik pesan…'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button className='btn' onClick={send}>
            Kirim
          </button>
        </div>
      ) : (
        <div className='row' style={{ justifyContent: 'center' }}>
          <button className='btn' onClick={takeover} disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Takeover Chat'}
          </button>
        </div>
      )}
    </div>
  )
}
