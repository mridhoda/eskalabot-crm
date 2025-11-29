import React, { useEffect, useState, useRef, useCallback } from 'react';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPaperPlane, faSync, faUserShield, faCheckCircle, faRobot, faSmile, faImage } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';

function MessageFooter({ message, selected, user }) {
  // The sender is directly available in the message object
  const senderType = message.from; // 'user', 'ai', or 'human'

  // We only want to show the badge for our own agents (AI or Human)
  if (senderType === 'user') {
    return (
      <div className="chat-message-time">
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    );
  }

  const isHuman = senderType === 'human';

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 6px',
    borderRadius: '6px',
    fontSize: '10px',
    fontWeight: '600',
    lineHeight: '1.2',
    color: isHuman ? '#4338CA' : '#CC5800', // text-indigo-800, text-orange-700
    backgroundColor: isHuman ? '#E0E7FF' : '#FFEDD5', // bg-indigo-100, bg-orange-100
  };

  return (
    <div className="chat-message-time" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
      <div style={badgeStyle}>
        <FontAwesomeIcon icon={isHuman ? faUserShield : faRobot} />
        <span>{isHuman ? 'Human Agent' : 'AI Agent'}</span>
      </div>
      <span>
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}

export default function ChatPanel({ selected, reload, onChatUpdate }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const endRef = useRef(null);
  const hasScrolledRef = useRef(false);
  const shouldScrollRef = useRef(false);

  const [user] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });

  const selectedId = selected?._id;

  const loadMessages = useCallback(async () => {
    if (!selectedId) return;
    try {
      const r = await api.get(`/chats/${selectedId}/messages`);
      setMessages(r.data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  }, [selectedId]);

  useEffect(() => {
    loadMessages();
    // Reset scroll flag when chat changes
    hasScrolledRef.current = false;
    shouldScrollRef.current = true;
  }, [loadMessages]);

  useEffect(() => {
    // Only auto-scroll if:
    // 1. Haven't scrolled yet (initial load), OR
    // 2. User just sent a message (shouldScrollRef is true)
    if (!hasScrolledRef.current || shouldScrollRef.current) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      hasScrolledRef.current = true;
      shouldScrollRef.current = false;
    }
  }, [messages]);

  useEffect(() => {
    if (!selectedId) return;
    const interval = setInterval(loadMessages, 4000);
    return () => clearInterval(interval);
  }, [selectedId, loadMessages]);

  const send = async () => {
    if (!selectedId || !text.trim()) return;
    setIsSubmitting(true);
    try {
      await api.post(`/chats/${selectedId}/send`, { text });
      setText('');
      shouldScrollRef.current = true; // Trigger scroll after sending
      await loadMessages();
      reload?.();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedId) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await api.post('/agents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { filePath, originalName } = uploadResponse.data;

      await api.post(`/chats/${selectedId}/send`, {
        text: `File: ${originalName}`,
        attachment: { url: filePath, filename: originalName },
      });

      shouldScrollRef.current = true; // Trigger scroll after sending file
      await loadMessages();
      reload?.();
    } catch (error) {
      console.error('File sending failed:', error);
      alert('Failed to send file.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const takeover = async () => {
    if (!selectedId) return;
    setIsSubmitting(true);
    try {
      const r = await api.post(`/chats/${selectedId}/takeover`);
      onChatUpdate(r.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resolve = async () => {
    if (!selectedId) return;
    setIsSubmitting(true);
    try {
      const r = await api.post(`/chats/${selectedId}/resolve`);
      onChatUpdate(r.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setText((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  if (!selected) return null; // The parent component now handles the empty state

  const getInitials = (s = '') => s.trim().split(/\s+/).slice(0, 2).map(x => x[0]?.toUpperCase() || '').join('') || '?';

  // Determine message sender type for CSS class
  const getSenderType = (message) => {
    return message.from === 'user' ? 'user' : 'agent';
  };

  // Format date for separator
  const formatDateSeparator = (date) => {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time to compare only dates
    const resetTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const msgDate = resetTime(messageDate);
    const todayDate = resetTime(today);
    const yesterdayDate = resetTime(yesterday);

    if (msgDate.getTime() === todayDate.getTime()) {
      return 'Hari Ini';
    } else if (msgDate.getTime() === yesterdayDate.getTime()) {
      return 'Kemarin';
    } else {
      // Format: "25 November 2025"
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return messageDate.toLocaleDateString('id-ID', options);
    }
  };

  // Check if we need to show date separator
  const shouldShowDateSeparator = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;

    const currentDate = new Date(currentMessage.createdAt);
    const previousDate = new Date(previousMessage.createdAt);

    return currentDate.toDateString() !== previousDate.toDateString();
  };

  // Detect takeover event - check if there's a transition from AI to human agent
  const shouldShowTakeoverMessage = (currentMessage, previousMessage) => {
    if (!previousMessage) return false;

    // Check if current message is from human and previous was from AI
    if (currentMessage.from === 'human' && previousMessage.from === 'ai') {
      return true;
    }

    return false;
  };

  // Format time for system messages
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Get agent name from selected chat data
  const getAgentName = () => {
    // If we have takeoverBy populated with user data
    if (selected.takeoverBy && typeof selected.takeoverBy === 'object') {
      return selected.takeoverBy.name || 'Human Agent';
    }
    // Fallback
    return user?.name || 'Human Agent';
  };

  return (
    <div className="chat-modern-container">
      {/* Header */}
      <div className="chat-modern-header">
        <div className="chat-header-info">
          <div className="chat-header-avatar">
            {getInitials(selected.contactId?.name)}
          </div>
          <div className="chat-header-details">
            <h2>{selected.contactId?.name || 'User'}</h2>
            <div className="chat-header-platform">
              via {selected.platform}
            </div>
          </div>
        </div>
        <div className="chat-header-actions">
          {selected.takeoverBy && (
            <button className="chat-resolve-btn" onClick={resolve} disabled={isSubmitting} title="Resolve Chat">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Resolve Chat</span>
            </button>
          )}
          <button className="chat-icon-btn" onClick={loadMessages} title="Refresh">
            <FontAwesomeIcon icon={faSync} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages-area">
        {messages.map((m, index) => (
          <React.Fragment key={m._id}>
            {shouldShowDateSeparator(m, messages[index - 1]) && (
              <div className="chat-date-separator">
                <span className="chat-date-separator-text">
                  {formatDateSeparator(m.createdAt)}
                </span>
              </div>
            )}
            {shouldShowTakeoverMessage(m, messages[index - 1]) && (
              <div className="chat-system-message">
                <div className="chat-system-message-content">
                  <FontAwesomeIcon icon={faUserShield} className="chat-system-message-icon" />
                  <span className="chat-system-message-text">
                    <strong>{getAgentName()}</strong> self assigned to this conversation
                  </span>
                  <span className="chat-system-message-time">{formatTime(m.createdAt)}</span>
                </div>
              </div>
            )}
            <div className={`chat-message-wrapper ${getSenderType(m)}`} ref={index === messages.length - 1 ? endRef : null}>
              <div className="chat-message-content">
                <div className="chat-message-bubble">
                  {m.text}
                  {m.attachment && (
                    <div style={{ marginTop: 8 }}>
                      {(() => {
                        const filename = m.attachment.filename || '';
                        const url = m.attachment.url?.startsWith('http') ? m.attachment.url : `${api.defaults.baseURL}${m.attachment.url || ''}`;
                        const isImage = /\.(png|jpe?g|gif|webp)$/i.test(filename);
                        if (isImage) {
                          return <img src={url} alt={filename} style={{ maxWidth: 220, borderRadius: 8, display: 'block' }} />;
                        }
                        return (
                          <a href={url} target="_blank" rel="noopener noreferrer" className='btn ghost'>
                            Download {filename || 'file'}
                          </a>
                        );
                      })()}
                    </div>
                  )}
                </div>
                <MessageFooter message={m} selected={selected} user={user} />
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input-area">
        {selected.status !== 'resolved' ? (
          selected.takeoverBy ? (
            <div className="chat-input-container-modern">
              {/* Hidden file inputs */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelected}
              />
              <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileSelected}
              />

              {/* Plus button for attachments */}
              <button
                className="chat-input-icon-btn"
                onClick={() => fileInputRef.current.click()}
                disabled={isUploading}
                title="Attach File"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>

              {/* Text input */}
              <textarea
                className="chat-input-field-modern"
                placeholder="Type your message…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
              />

              {/* Right side icons */}
              <div className="chat-input-icons-right" style={{ position: 'relative' }}>
                <button
                  className="chat-input-icon-btn"
                  onClick={() => imageInputRef.current.click()}
                  disabled={isUploading}
                  title="Send Image"
                >
                  <FontAwesomeIcon icon={faImage} />
                </button>
                <button
                  className="chat-input-icon-btn"
                  title="Add Emoji"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <FontAwesomeIcon icon={faSmile} />
                </button>

                {showEmojiPicker && (
                  <div style={{ position: 'absolute', bottom: '50px', right: '0', zIndex: 1000 }}>
                    <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
                  </div>
                )}
              </div>

              {/* Send button */}
              <button
                className="chat-send-btn-modern"
                onClick={send}
                disabled={isSubmitting || !text.trim()}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="chat-takeover-btn" onClick={takeover} disabled={isSubmitting}>
                <div className='chat-takeover-icon'><FontAwesomeIcon icon={faUserShield} /></div>
                <div className='chat-takeover-text'>
                  <div className='chat-takeover-title'>{isSubmitting ? 'Loading...' : 'Takeover Chat'}</div>
                  <div className='chat-takeover-subtitle'>Switch from AI to human agent</div>
                </div>
              </button>
            </div>
          )
        ) : (
          <div style={{ textAlign: 'center', color: '#94A3B8', padding: '10px' }}>
            This conversation has been resolved.
          </div>
        )}
      </div>
    </div>
  );
}
