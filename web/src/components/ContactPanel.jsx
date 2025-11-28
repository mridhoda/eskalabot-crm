import React, { useEffect, useState } from 'react'
import api from '../api'

export default function ContactPanel({ selected, onUpdate, onDeleteChat }) {
  const [tags, setTags] = useState([])
  const [notes, setNotes] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)

  const contact = selected?.contactId

  useEffect(() => {
    if (contact) {
      setTags(contact.tags || [])
      setNotes(contact.notes || '')
    } else {
      setTags([])
      setNotes('')
    }
  }, [contact])

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Copied!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const save = async () => {
    if (!contact) return
    setSaving(true)
    try {
      const r = await api.put(`/contacts/${contact._id}`, { tags, notes })
      onUpdate?.(r.data)
    } catch (err) {
      console.error('Failed to save contact details', err)
      alert('Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const [activeTab, setActiveTab] = useState('info')
  const [showSessionHistory, setShowSessionHistory] = useState(false)

  if (!selected || !contact) {
    return (
      <div className='contact-modern-panel' style={{ alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
        No Contact Selected
      </div>
    )
  }

  return (
    <div className='contact-modern-panel'>
      {/* Tabs */}
      <div className='contact-tabs'>
        <button
          className={`contact-tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Info
        </button>
        <button
          className={`contact-tab ${activeTab === 'ticket' ? 'active' : ''}`}
          onClick={() => setActiveTab('ticket')}
        >
          Ticket
        </button>
        <button
          className={`contact-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {/* Content */}
      <div className='contact-content'>
        {/* Profile Header */}
        <div className='contact-profile-header'>
          <div className='contact-name'>{contact.name}</div>
          <div className='contact-platform-id'>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {contact.platformAccountId || contact.phone || 'No ID'}
            <button
              onClick={() => copy(contact.platformAccountId)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#CBD5E1' }}
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Pipeline Status */}
        <div className='contact-section'>
          <div className='contact-section-title' style={{ marginBottom: 8 }}>Select Pipeline Status</div>
          <select className='contact-select'>
            <option>Active</option>
            <option>Pending</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>

        {/* Labels */}
        <div className='contact-section'>
          <div className='contact-section-header'>
            <div className='contact-section-title'>Labels</div>
            <button className='contact-add-btn' onClick={addTag}>+ Add Label</button>
          </div>

          <div className='contact-label-container'>
            {tags.length === 0 && <div style={{ fontSize: 12, color: '#94A3B8' }}>No labels yet</div>}
            {tags.map((tag) => (
              <div key={tag} className='contact-label'>
                {tag}
                <span className='contact-label-remove' onClick={() => removeTag(tag)}>×</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 8 }}>
            <input
              className='contact-select'
              style={{ padding: '6px 12px', fontSize: 12 }}
              placeholder='Type label and press Enter...'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
            />
          </div>
        </div>

        {/* Session History */}
        <div className='contact-section'>
          <div
            className='contact-section-header'
            style={{ cursor: 'pointer' }}
            onClick={() => setShowSessionHistory(!showSessionHistory)}
          >
            <div className='contact-section-title'>Session History</div>
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ transform: showSessionHistory ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {showSessionHistory && (
            <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 8 }}>
              No sessions available
            </div>
          )}
        </div>

        {/* Handled By */}
        <div className='contact-section'>
          <div className='contact-section-title' style={{ marginBottom: 8 }}>Handled By</div>
          <div className='contact-select' style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#64748B' }}>
              {(selected.agentId?.name || 'A')[0]}
            </div>
            {selected.agentId?.name || 'Super Admin IT Core'}
          </div>
        </div>

        {/* Collaborators */}
        <div className='contact-section'>
          <div className='contact-section-header'>
            <div className='contact-section-title'>Collaborators</div>
            <button className='contact-add-btn' style={{ background: 'white', color: '#F97316' }}>+ Add Collaborator</button>
          </div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 8 }}>
            No collaborators yet
          </div>
        </div>

        {/* Notes */}
        <div className='contact-section'>
          <div className='contact-section-title' style={{ marginBottom: 8 }}>Notes</div>
          <textarea
            className='contact-textarea'
            placeholder='Add a note...'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            className='contact-add-btn'
            style={{ marginTop: 8, width: '100%', textAlign: 'center' }}
            onClick={save}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Details'}
          </button>
        </div>
      </div>
    </div>
  )
}
