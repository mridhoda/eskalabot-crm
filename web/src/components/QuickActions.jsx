import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function QuickActions() {
  const nav = useNavigate()
  const items = [
    ['Hubungkan Platform', '/app/platforms'],
    ['Buat AI Agent', '/app/agents'],
    ['Undang Agen Manusia', '/app/humans'],
    ['Tambahkan AI Agent ke Inbox', '/app/agents'],
  ]
  return (
    <div className='quick'>
      {items.map(([title, href]) => (
        <div key={href} className='card' onClick={() => nav(href)}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
          <div className='badge'>Quick Action</div>
        </div>
      ))}
    </div>
  )
}
