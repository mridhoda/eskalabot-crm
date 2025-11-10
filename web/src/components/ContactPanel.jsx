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

  if (!selected || !contact) {
    return (
      <div
        className='card col'
        style={{
          width: 320,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className='muted'>No Contact Selected</div>
      </div>
    )
  }

  return (
    <div
      className='card col'
      style={{ width: 320, gap: 16, height: 'fit-content' }}
    >
      <div className='col' style={{ gap: 4 }}>
        <div className='muted'>Client Name</div>
        <div style={{ fontWeight: 700 }}>{contact.name}</div>
      </div>

      <div className='col' style={{ gap: 4 }}>
        <div className='muted'>Client ID</div>
        <div className='row' style={{ alignItems: 'center', gap: 8 }}>
          <div className='badge'>{contact.platformAccountId}</div>
          <button
            className='btn ghost'
            onClick={() => copy(contact.platformAccountId)}
          >
            Copy
          </button>
        </div>
      </div>

      <div className='col' style={{ gap: 4 }}>
        <div className='muted'>Platform</div>
        <div className='badge'>{contact.platformType}</div>
      </div>

      <div className='col' style={{ gap: 4 }}>
        <div className='muted'>Handled By</div>
        <div style={{ fontWeight: 700 }}>{selected.agentId?.name || 'N/A'}</div>
      </div>

      <div className='col' style={{ gap: 8 }}>
        <div className='muted'>Labels</div>
        <div className='row' style={{ flexWrap: 'wrap', gap: 6 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              className='badge row'
              style={{ alignItems: 'center', gap: 4 }}
            >
              <span>{tag}</span>
              <span
                onClick={() => removeTag(tag)}
                style={{ cursor: 'pointer', fontSize: 14 }}
              >
                ×
              </span>
            </div>
          ))}
        </div>
        <div className='row'>
          <input
            className='input'
            placeholder='Add a label...'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
          />
          <button className='btn' onClick={addTag}>
            Add
          </button>
        </div>
      </div>

      <div className='col' style={{ gap: 4 }}>
        <div className='muted'>Notes</div>
        <textarea
          className='textarea'
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder='Add notes about this client...'
        />
      </div>

      <div className='col' style={{ gap: 8 }}>
        <button className='btn' onClick={save} disabled={saving}>
          {saving ? 'Saving...' : 'Save Details'}
        </button>
        <button
          className='btn ghost'
          style={{ borderColor: '#ef4444', color: '#ef4444' }}
          onClick={() => onDeleteChat?.(selected?._id)}
        >
          Delete Chat
        </button>
      </div>
    </div>
  )
}
