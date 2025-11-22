import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import api from '../api'
import ChatPanel from '../components/ChatPanel'
import QuickActions from '../components/QuickActions'
import BrandIcon from '../components/BrandIcon'
import ContactPanel from '../components/ContactPanel'
import FilterPopup from '../components/FilterPopup'
import Platforms from './Platforms'
import * as XLSX from 'xlsx'
import { Line, Pie, Bar } from 'react-chartjs-2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSliders, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js'
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
)

function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('user') || 'null')
    } catch {
      return null
    }
  })
  return { user, setUser }
}

/* ========================= INBOX ========================= */
function Inbox() {
  const [chats, setChats] = useState([])
  const [agents, setAgents] = useState([])
  const [selected, setSelected] = useState(null)

  // Filter state
  const [showFilterPopup, setShowFilterPopup] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [filters, setFilters] = useState({
    agentId: '',
    search: '',
    from: '',
    to: '',
    tags: [],
    unreadOnly: false,
    assignment: 'all',
  })
  const panelHeight = 'calc(100vh - 58px - 20px)'
  const hasAdvancedFilters = Boolean(filters.from || filters.to || filters.tags.length)
  const searchActive = Boolean(showSearch || filters.search)

  // Load agents for filter dropdown
  useEffect(() => {
    api.get('/agents').then((r) => setAgents(r.data))
  }, [])

  const load = useCallback(async () => {
    const params = {
      ...filters,
      search: filters.search.trim() || undefined,
      tags: filters.tags.length ? filters.tags.join(',') : undefined,
    }

    if (!filters.assignment || filters.assignment === 'all') {
      delete params.assignment
    }
    if (!filters.agentId) delete params.agentId
    if (!filters.from) delete params.from
    if (!filters.to) delete params.to
    if (!filters.unreadOnly) delete params.unreadOnly

    const r = await api.get('/chats', { params })
    setChats(r.data)
    setSelected((prev) => {
      if (!prev?._id) return prev
      const updated = r.data.find((chat) => chat._id === prev._id)
      return updated || prev
    })
  }, [filters])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const interval = setInterval(() => {
      load()
    }, 4000)
    return () => clearInterval(interval)
  }, [load])

  useEffect(() => {
    const handleFocus = () => load()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [load])

  const handleContactUpdate = (updatedContact) => {
    const newChats = chats.map((c) => {
      if (c.contactId?._id === updatedContact._id) {
        return { ...c, contactId: updatedContact }
      }
      return c
    })
    setChats(newChats)
    if (selected?.contactId?._id === updatedContact._id) {
      setSelected((prev) => ({ ...prev, contactId: updatedContact }))
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleChatUpdate = (updatedChat) => {
    const newChats = chats.map((c) =>
      c._id === updatedChat._id ? updatedChat : c
    )
    setChats(newChats)
    setSelected(updatedChat)
  }

  const handleDeleteChat = async (chatId) => {
    if (!chatId) return
    if (!window.confirm('Delete this chat and all of its messages?')) return
    try {
      await api.delete(`/chats/${chatId}`)
      setChats((prev) => prev.filter((c) => c._id !== chatId))
      setSelected((prev) => (prev?._id === chatId ? null : prev))
    } catch (error) {
      console.error('Failed to delete chat', error)
      alert('Failed to delete chat.')
    }
  }


  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr 280px',
          gap: 16,
          alignItems: 'stretch',
          height: panelHeight,
        }}
      >
        {/* Left Column */}
        <div className='col' style={{ minHeight: 0 }}>
          <div
            className='card col inbox-panel'
            style={{
              height: '100%',
              gap: 12,
              overflow: 'hidden',
              minHeight: 0,
            }}
          >
            <div style={{ fontWeight: 700 }}>Inbox</div>

            {/* New Filters */}
            <div
              className='row'
              style={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 8,
                alignItems: 'center',
              }}
            >
              <select
                className='select'
                style={{ flex: 1, minWidth: 140 }}
                value={filters.agentId}
                onChange={(e) => handleFilterChange({ agentId: e.target.value })}
              >
                <option value=''>All Agents</option>
                {agents.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.name}
                  </option>
                ))}
              </select>

              <div className='row' style={{ gap: 8 }}>
                <button
                  className={`icon-btn ${filters.unreadOnly ? 'active' : ''}`}
                  onClick={() =>
                    handleFilterChange({ unreadOnly: !filters.unreadOnly })
                  }
                  title='Show unread only'
                >
                  <FontAwesomeIcon icon={faEnvelopeOpen} />
                </button>
                <button
                  className={`icon-btn ${hasAdvancedFilters ? 'active' : ''}`}
                  onClick={() => setShowFilterPopup(true)}
                  title='Advanced filters'
                >
                  <FontAwesomeIcon icon={faSliders} />
                </button>
                <button
                  className={`icon-btn ${searchActive ? 'active' : ''}`}
                  onClick={() => setShowSearch((prev) => !prev)}
                  title='Search conversations'
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
            {showSearch && (
              <div className='searchbox'>
                <input
                  className='input'
                  placeholder='Search messages'
                  value={filters.search}
                  onChange={(e) =>
                    handleFilterChange({ search: e.target.value })
                  }
                />
              </div>
            )}

            <div
              className='list inbox-scroll'
              style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}
            >
              {chats.map((c) => (
                <div
                  key={c._id}
                  className={`rowi ${selected?._id === c._id ? 'unread' : ''}`}
                  onClick={() => {
                    setSelected(c)
                    if (c.unread > 0) {
                      const newChats = chats.map((chat) =>
                        chat._id === c._id ? { ...chat, unread: 0 } : chat
                      )
                      setChats(newChats)
                    }
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div>{c.contactId?.name || `Chat #${c._id.slice(-6)}`}</div>
                    <div style={{ fontSize: 12, color: '#666' }}>
                      {c.lastMessage?.slice(0, 30)}...
                    </div>
                    <div
                      className='row'
                      style={{ alignItems: 'center', gap: 4, marginTop: 4 }}
                    >
                      <BrandIcon type={c.platformType} size={12} />
                      <div style={{ fontSize: 12, color: '#666' }}>
                        {c.agentId?.name}
                      </div>
                    </div>
                  </div>
                  <div
                    className='col'
                    style={{ alignItems: 'flex-end', gap: 4 }}
                  >
                    <div
                      className='row'
                      style={{ alignItems: 'center', gap: 8 }}
                    >
                      {c.unread > 0 && (
                        <div
                          className='badge'
                          style={{ background: 'var(--brand)', color: 'white' }}
                        >
                          {c.unread}
                        </div>
                      )}
                      <div className='badge'>
                        {new Date(c.lastMessageAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                    <div
                      className='badge'
                      style={
                        c.takeoverBy
                          ? {
                            color: '#007bff',
                            backgroundColor: 'rgba(0, 123, 255, 0.25)',
                            border: '1px solid rgba(0, 123, 255, 0.25)',
                          }
                          : {
                            color: '#ffc107',
                            backgroundColor: 'rgba(255, 193, 7, 0.25)',
                            border: '1px solid rgba(255, 193, 7, 0.25)',
                          }
                      }
                    >
                      {c.takeoverBy ? 'assign' : 'open'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div style={{ flex: 1, height: panelHeight }}>
          {selected ? (
            <ChatPanel
              selected={selected}
              reload={load}
              onChatUpdate={handleChatUpdate}
            />
          ) : (
            <div
              className='card'
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                Selamat datang di Chatbot AI
              </div>
              <QuickActions />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ height: '100%', display: 'flex' }}>
          <ContactPanel
            selected={selected}
            onUpdate={handleContactUpdate}
            onDeleteChat={handleDeleteChat}
          />
        </div>
      </div>

      {showFilterPopup && (
        <FilterPopup
          onClose={() => setShowFilterPopup(false)}
          onApply={(newFilters) => {
            handleFilterChange(newFilters)
            setShowFilterPopup(false)
          }}
          currentFilters={filters}
        />
      )}
    </>
  )
}

/* ========================= ANALYTICS ========================= */

function AnalyticsPage() {
  const [traffic, setTraffic] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [agents, setAgents] = useState([])
  const [chatsByDay, setChatsByDay] = useState([])

  useEffect(() => {
    api.get('/analytics/traffic?groupBy=day').then((r) => setTraffic(r.data))
    api.get('/analytics/platforms').then((r) => setPlatforms(r.data))
    api.get('/analytics/agents').then((r) => setAgents(r.data))
    api.get('/analytics/chats-by-day').then((r) => setChatsByDay(r.data))
  }, [])

  const trafficData = {
    labels: traffic.map(
      (r) =>
        `${r._id.y}-${String(r._id.m).padStart(2, '0')}-${String(r._id.d).padStart(2, '0')}`
    ),
    datasets: [
      {
        label: 'Messages per day',
        data: traffic.map((r) => r.count),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const platformData = {
    labels: platforms.map((p) => p._id),
    datasets: [
      {
        label: 'Messages per platform',
        data: platforms.map((p) => p.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const agentData = {
    labels: agents.map((a) => a._id),
    datasets: [
      {
        label: 'Messages per agent',
        data: agents.map((a) => a.count),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const chatsByDayData = {
    labels: chatsByDay.labels,
    datasets: [
      {
        label: 'Chats per day',
        data: chatsByDay.data,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
    >
      <div className='card'>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Traffic</div>
        <Line data={trafficData} />
      </div>
      <div className='card'>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Chats by Day</div>
        <Bar data={chatsByDayData} />
      </div>
      <div className='card'>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>
          Messages by Platform
        </div>
        <Pie data={platformData} />
      </div>
      <div className='card'>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>
          Messages by Agent
        </div>
        <Bar data={agentData} />
      </div>
    </div>
  )
}

/* ========================= CONTACTS ========================= */
function Contacts() {
  const [contacts, setContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    api.get('/contacts').then((r) => setContacts(r.data))
  }, [])

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedContacts(contacts.map((c) => c._id))
    } else {
      setSelectedContacts([])
    }
  }

  const handleSelect = (e, id) => {
    if (e.target.checked) {
      setSelectedContacts([...selectedContacts, id])
    } else {
      setSelectedContacts(selectedContacts.filter((cId) => cId !== id))
    }
  }

  const handleExport = async () => {
    const dataToExport =
      selectedContacts.length > 0
        ? contacts.filter((c) => selectedContacts.includes(c._id))
        : contacts
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts')
    XLSX.writeFile(workbook, 'contacts.xlsx')
  }

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = contacts.slice(indexOfFirstRow, indexOfLastRow)

  const totalPages = Math.ceil(contacts.length / rowsPerPage)

  return (
    <>
      <div className='card'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <div style={{ fontWeight: 700 }}>Contacts</div>
          <button className='btn' onClick={handleExport}>
            Export to Excel
          </button>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>
                <input type='checkbox' onChange={handleSelectAll} />
              </th>
              <th>Client Name</th>
              <th>Agent Name</th>
              <th>ID/Phone Number</th>
              <th>First Chat Date</th>
              <th>First Message</th>
              <th>Last Message Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((c) => (
              <tr key={c._id}>
                <td>
                  <input
                    type='checkbox'
                    checked={selectedContacts.includes(c._id)}
                    onChange={(e) => handleSelect(e, c._id)}
                  />
                </td>
                <td>{c.name}</td>
                <td>{c.agentName}</td>
                <td>{c.platformAccountId}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                <td>{c.firstMessage}</td>
                <td>{new Date(c.lastMessageAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{' '}
      <div
        className='main pagination-container'
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <div>Total Contacts: {contacts.length}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className='btn ghost'
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div style={{ margin: '0 10px' }}>
              Page {currentPage} of {totalPages}
            </div>
            <button
              className='btn ghost'
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div>
            <select
              className='select'
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

/* ========================= AGENTS (grid + platform icon + settings) ========================= */
function Agents() {
  const [rows, setRows] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [q, setQ] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const navigate = useNavigate()

  // form create
  const [name, setName] = useState('')
  const [platformId, setPlatformId] = useState('')
  const [prompt, setPrompt] = useState(
    'Kamu adalah bot yang siap membantu pelanggan.'
  )
  const [behavior, setBehavior] = useState('You are a helpful assistant.')
  const [welcomeMessage, setWelcomeMessage] = useState(
    'Halo! Ada yang bisa saya bantu?'
  )
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const ps = await api.get('/platforms')
    setPlatforms(ps.data)
    const r = await api.get('/agents')
    setRows(r.data)
  }
  useEffect(() => {
    load()
  }, [])

  const filtered = rows.filter(
    (a) =>
      a.name.toLowerCase().includes(q.toLowerCase()) ||
      (a.prompt || '').toLowerCase().includes(q.toLowerCase())
  )
  const initials = (s = '') =>
    s
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((x) => x[0]?.toUpperCase() || '')
      .join('') || 'AI'

  const del = async (id) => {
    if (!confirm('Hapus agent ini?')) return
    await api.delete(`/agents/${id}`)
    setRows(rows.filter((r) => r._id !== id))
  }
  const copy = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt)
      alert('Copied!')
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const openCreate = () => {
    setName('')
    setPlatformId('')
    setPrompt('Kamu adalah bot yang siap membantu pelanggan.')
    setBehavior('You are a helpful assistant.')
    setWelcomeMessage('Halo! Ada yang bisa saya bantu?')
    setShowCreate(true)
  }

  const create = async (e) => {
    e?.preventDefault?.()
    if (!name) return alert('Nama wajib diisi')
    setSaving(true)
    try {
      const r = await api.post('/agents', {
        name,
        platformId: platformId || null,
        prompt,
        behavior,
        welcomeMessage,
        knowledge: [],
      })
      setShowCreate(false)
      setRows([r.data, ...rows])
    } finally {
      setSaving(false)
    }
  }

  const pfById = {}
  platforms.forEach((p) => (pfById[p._id] = p))

  return (
    <div style={{ maxWidth: 1150, margin: '0 auto' }}>
      <div
        className='row'
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>AI Agents</h2>
        <div className='searchbox'>
          <input
            className='input'
            placeholder='Search AI agents…'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className='search-ico'></div>
        </div>
      </div>

      <div className='agent-grid'>
        {filtered.map((a) => (
          <div key={a._id} className='agent-card'>
            <div className='agent-avatar'>{initials(a.name)}</div>
            <div className='agent-name'>{a.name}</div>
            <div className='agent-sub'>
              {(a.prompt || a.welcomeMessage || '-').slice(0, 60) || '-'}
            </div>

            {/* platform icon jika ada */}
            {a.platformId && pfById[a.platformId] && (
              <div className='row' style={{ gap: 6, alignItems: 'center' }}>
                <BrandIcon type={pfById[a.platformId].type} size={16} />
                <span className='badge'>{pfById[a.platformId].type}</span>
              </div>
            )}

            <div className='agent-actions'>
              <button
                className='btn ghost'
                onClick={() => navigate(`/app/agents/${a._id}`)}
              >
                Settings
              </button>
              <button
                className='btn ghost'
                title='Copy ID'
                onClick={() => copy(a._id)}
              >
                📋
              </button>
              <button
                className='btn ghost'
                title='Delete'
                onClick={() => del(a._id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
        {/* Create New */}
        <div className='agent-card create' onClick={openCreate}>
          <div className='plus'>＋</div>
          <div className='agent-name'>Create New</div>
        </div>
      </div>

      {/* Modal Create */}
      {showCreate && (
        <div className='modal'>
          <div className='modal-card'>
            <div
              className='row'
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h3 style={{ margin: 0 }}>Create AI Agent</h3>
              <button
                className='btn ghost'
                onClick={() => setShowCreate(false)}
              >
                Close
              </button>
            </div>
            <form className='col' onSubmit={create}>
              <input
                className='input'
                placeholder='Nama agent'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className='row' style={{ gap: 8, alignItems: 'center' }}>
                <BrandIcon
                  type={pfById[platformId]?.type || 'custom'}
                  size={18}
                />
                <select
                  className='select'
                  value={platformId}
                  onChange={(e) => setPlatformId(e.target.value)}
                >
                  <option value=''>Pilih Platform (opsional)</option>
                  {platforms.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.label} ({p.type})
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                className='textarea'
                rows={3}
                placeholder='Prompt AI'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <textarea
                className='textarea'
                rows={3}
                placeholder='Agent Behavior (system)'
                value={behavior}
                onChange={(e) => setBehavior(e.target.value)}
              />
              <input
                className='input'
                placeholder='Welcome Message'
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
              />
              <div
                className='row'
                style={{ justifyContent: 'flex-end', gap: 8 }}
              >
                <button
                  type='button'
                  className='btn ghost'
                  onClick={() => setShowCreate(false)}
                >
                  Batal
                </button>
                <button className='btn' disabled={saving}>
                  {saving ? 'Menyimpan…' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/* ========================= HUMAN AGENTS ========================= */
function Humans() {
  const { user: currentUser } = useAuth() // For role checking
  const [rows, setRows] = useState([])
  const [q, setQ] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const navigate = useNavigate()

  // form create
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('agent')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try {
      const r = await api.get('/users')
      setRows(r.data)
    } catch (error) {
      console.error('Failed to load users', error)
    }
  }
  useEffect(() => {
    load()
  }, [])

  const filtered = rows.filter(
    (u) =>
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase())
  )
  const initials = (s = '') =>
    s
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((x) => x[0]?.toUpperCase() || '')
      .join('') || 'U'

  const del = async (id) => {
    if (!confirm('Hapus pengguna ini?')) return
    try {
      await api.delete(`/users/${id}`)
      setRows(rows.filter((r) => r._id !== id))
    } catch (err) {
      alert(err.response?.data?.error || 'Gagal menghapus pengguna')
    }
  }

  const openCreate = () => {
    setName('')
    setEmail('')
    setPassword('')
    setRole('agent')
    setShowCreate(true)
  }

  const create = async (e) => {
    e?.preventDefault?.()
    if (!name || !email || !password)
      return alert('Nama, Email, dan Password wajib diisi')
    setSaving(true)
    try {
      await api.post('/users/human', { name, email, password, role })
      setShowCreate(false)
      load() // Reload the list
      alert(`Pengguna baru (${email}) telah berhasil dibuat!`)
    } catch (err) {
      alert(err.response?.data?.error || 'Gagal membuat pengguna')
    } finally {
      setSaving(false)
    }
  }

  const canManage =
    currentUser?.role === 'owner' || currentUser?.role === 'super'

  return (
    <div style={{ maxWidth: 1150, margin: '0 auto', height: '100%', overflowY: 'auto', width: '100%', padding: '0 20px' }}>
      <div
        className='row'
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Human Agents</h2>
        <div className='searchbox'>
          <input
            className='input'
            placeholder='Search by name or email…'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className='search-ico'></div>
        </div>
      </div>

      <div className='agent-grid-vertical'>
        {filtered.map((u) => (
          <div key={u._id} className='agent-card'>
            <div className='agent-avatar'>{initials(u.name)}</div>
            <div className='agent-name'>{u.name}</div>
            <div className='agent-sub'>{u.email}</div>
            <div className='row' style={{ gap: 6, alignItems: 'center' }}>
              <span className='badge'>{u.role}</span>
            </div>

            <div className='agent-actions'>
              <button
                className='btn ghost'
                title='Delete'
                onClick={() => del(u._id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
        {canManage && (
          <div className='agent-card create' onClick={openCreate}>
            <div className='plus'>＋</div>
            <div className='agent-name'>Create New</div>
          </div>
        )}
      </div>

      {showCreate && (
        <div className='modal'>
          <div className='modal-card'>
            <div
              className='row'
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h3 style={{ margin: 0 }}>Create Human Agent</h3>
              <button
                className='btn ghost'
                onClick={() => setShowCreate(false)}
              >
                Close
              </button>
            </div>
            <form className='col' onSubmit={create}>
              <input
                className='input'
                placeholder='Nama Lengkap'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type='email'
                className='input'
                placeholder='Alamat Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                className='input'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                className='select'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value='agent'>Agent (Admin)</option>
                <option value='super'>Super Admin</option>
              </select>
              <div
                className='row'
                style={{ justifyContent: 'flex-end', gap: 8 }}
              >
                <button
                  type='button'
                  className='btn ghost'
                  onClick={() => setShowCreate(false)}
                >
                  Batal
                </button>
                <button className='btn' disabled={saving}>
                  {saving ? 'Menyimpan…' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/* ========================= SETTINGS/BILLING/PROFILE ========================= */
function Settings() {
  return <div className='card'>Pengaturan umum (placeholder).</div>
}
function Billing() {
  const [data, setData] = useState(null)
  useEffect(() => {
    api.get('/billing').then((r) => setData(r.data))
  }, [])
  return (
    <div className='card'>
      <div style={{ fontWeight: 700 }}>Info Paket</div>
      <div className='badge'>Plan: {data?.plan}</div>
      <div className='badge'>Maks Agent: {data?.limits?.maxAgents}</div>
      <div className='badge'>
        Berlaku sampai:{' '}
        {data?.expiry ? new Date(data.expiry).toLocaleDateString() : '-'}
      </div>
    </div>
  )
}
function Profile() {
  return <div className='card'>Atur profil & Sign out.</div>
}

import FileInput from '../components/FileInput'

/* ========================= AGENT DETAIL ========================= */
function AgentDetail() {
  const { id, tab = 'general' } = useParams()
  const localDbStorageKey = useMemo(() => `agent-db-${id}`, [id])
  const navigate = useNavigate()

  const setTab = (newTab) => {
    navigate(`/app/agents/${id}/${newTab}`);
  };
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [platforms, setPlatforms] = useState([])

  const [agent, setAgent] = useState(null)
  const [name, setName] = useState('')
  const [platformId, setPlatformId] = useState('')
  const [behavior, setBehavior] = useState('')
  const [prompt, setPrompt] = useState('')
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [stickerUrl, setStickerUrl] = useState('')
  const [knowledge, setKnowledge] = useState([])
  const [followUps, setFollowUps] = useState([])
  const [database, setDatabase] = useState([])
  const [knowledgeTab, setKnowledgeTab] = useState('url')
  const [localDatabase, setLocalDatabase] = useState([])
  const [databaseCustomId, setDatabaseCustomId] = useState('')
  const [dbUploadStatus, setDbUploadStatus] = useState({
    status: 'idle',
    message: '',
  })
  const [activeLinkId, setActiveLinkId] = useState(null)

  const [messages, setMessages] = useState([])
  const [testMsg, setTestMsg] = useState('')
  const [testing, setTesting] = useState(false)
  const combinedDatabase = useMemo(
    () => [
      ...database.map((f) => ({ ...f, source: 'remote' })),
      ...localDatabase.map((f) => ({ ...f, source: 'local' })),
    ],
    [database, localDatabase]
  )

  const getFileLink = (file) => {
    if (file.source === 'remote' && file.storedName) {
      return `${api.defaults.baseURL}/files/${file.storedName}`
    }
    if (file.source === 'local' && file.dataUrl) {
      return file.dataUrl
    }
    return ''
  }

  const toggleLinkPanel = (fileKey, file) => {
    const link = getFileLink(file)
    if (!link) {
      alert('Link tidak tersedia untuk file ini.')
      return
    }
    setActiveLinkId((prev) => (prev === fileKey ? null : fileKey))
  }

  const copyLink = async (link) => {
    if (!link) return
    try {
      await navigator.clipboard.writeText(link)
    } catch (error) {
      console.error('Failed to copy link:', error)
      alert('Gagal menyalin link.')
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) return
    try {
      const raw = window.localStorage.getItem(localDbStorageKey)
      setLocalDatabase(raw ? JSON.parse(raw) : [])
    } catch (error) {
      console.error('Failed to load local database files:', error)
      setLocalDatabase([])
    }
  }, [localDbStorageKey])

  const persistLocalDatabase = (updater) => {
    setLocalDatabase((prev) => {
      const next =
        typeof updater === 'function'
          ? updater(prev)
          : Array.isArray(updater)
            ? updater
            : prev
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem(localDbStorageKey, JSON.stringify(next))
        } catch (error) {
          console.error('Failed to persist local database files:', error)
        }
      }
      return next
    })
  }

  const readFileAsDataUrl = (file, entryId) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const entry = {
          id: entryId,
          originalName: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          dataUrl: reader.result,
        }
        persistLocalDatabase((prev) => {
          const filtered = prev.filter((item) => item.id !== entryId)
          return [...filtered, entry]
        })
        resolve(entry)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const generateLocalId = () =>
    typeof window !== 'undefined' &&
      window.crypto &&
      typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  useEffect(() => {
    ; (async () => {
      try {
        const [a, p] = await Promise.all([
          api.get(`/agents/${id}`),
          api.get('/platforms'),
        ])
        setAgent(a.data)
        setName(a.data.name || '')
        setPlatformId(a.data.platformId || '')
        setBehavior(a.data.behavior || '')
        setPrompt(a.data.prompt || '')
        setWelcomeMessage(a.data.welcomeMessage || '')
        setStickerUrl(a.data.stickerUrl || '')
        setKnowledge(Array.isArray(a.data.knowledge) ? a.data.knowledge : [])
        setFollowUps(Array.isArray(a.data.followUps) ? a.data.followUps : [])
        setDatabase(Array.isArray(a.data.database) ? a.data.database : [])
        setPlatforms(p.data)
      } catch (error) {
        console.error('Error fetching agent data:', error)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const save = async () => {
    setSaving(true)
    try {
      const payload = {
        name,
        platformId: platformId || null,
        behavior,
        prompt,
        welcomeMessage,
        stickerUrl,
        knowledge,
        followUps,
        database,
      }
      const r = await api.put(`/agents/${id}`, payload)
      setAgent(r.data)
    } finally {
      setSaving(false)
    }
  }

  const addKnowledge = (k = { kind: 'url', value: '' }) =>
    setKnowledge([...knowledge, k])
  const updKnowledge = (i, patch) => {
    const arr = [...knowledge]
    arr[i] = { ...arr[i], ...patch }
    setKnowledge(arr)
  }
  const delKnowledge = (i) =>
    setKnowledge(knowledge.filter((_, idx) => idx !== i))

  const addFollowUp = () =>
    setFollowUps([...followUps, { prompt: '', delay: 60 }])
  const updFollowUp = (i, patch) => {
    const arr = [...followUps]
    arr[i] = { ...arr[i], ...patch }
    setFollowUps(arr)
  }
  const delFollowUp = (i) =>
    setFollowUps(followUps.filter((_, idx) => idx !== i))

  const handleStickerSelect = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await api.post('/agents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setStickerUrl(response.data.filePath)
    } catch (error) {
      console.error('Sticker upload error:', error)
      alert('Sticker upload failed.')
    }
  }

  const handleFileSelect = async (file, i) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await api.post('/agents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const { filePath, originalName } = response.data;
      updKnowledge(i, { value: filePath, originalName: originalName });
    } catch (error) {
      console.error('File upload error:', error)
      alert('File upload failed.')
    }
  }

  const handleDatabaseFileSelect = async (file) => {
    if (!file) return
    const customId = databaseCustomId.trim()
    const entryId = customId || generateLocalId()
    setDbUploadStatus({
      status: 'loading',
      message: `Processing ${file.name}...`,
    })
    try {
      await readFileAsDataUrl(file, entryId)
      setDbUploadStatus({
        status: 'loading',
        message: 'Stored locally. Uploading to server...',
      })
    } catch (error) {
      console.error('Failed to store database file locally:', error)
      setDbUploadStatus({
        status: 'error',
        message: 'Cannot store file locally. Please try another file.',
      })
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    if (customId) {
      formData.append('id', customId)
    }
    try {
      const response = await api.post(`/agents/${id}/database`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setDatabase((prev) => [...prev, response.data])
      persistLocalDatabase((prev) => prev.filter((item) => item.id !== entryId))
      setDbUploadStatus({
        status: 'success',
        message: `${file.name} uploaded successfully.`,
      })
      setDatabaseCustomId('')
    } catch (error) {
      console.error('Database file upload error:', error)
      setDbUploadStatus({
        status: 'error',
        message: 'Upload failed, file saved locally on this device.',
      })
    }
  }

  const deleteDatabaseFile = async (file) => {
    if (!confirm('Are you sure you want to delete this file?')) return
    if (file.source === 'local') {
      persistLocalDatabase((prev) => prev.filter((f) => f.id !== file.id))
      setDbUploadStatus({
        status: 'idle',
        message: '',
      })
      return
    }
    try {
      await api.delete(`/agents/${id}/database/${file.id}`)
      setDatabase((prev) => prev.filter((f) => f.id !== file.id))
    } catch (error) {
      console.error('Database file delete error:', error)
      alert('Database file delete failed.')
    }
  }

  const sendTest = async () => {
    if (!testMsg.trim()) return
    setTesting(true)

    const historyPayload = messages
      .filter((m) => typeof m.text === 'string' && m.text.trim().length > 0)
      .slice(-10)
      .map((m) => ({ from: m.from, text: m.text }));

    const userMessage = { from: 'user', text: testMsg }
    let newMessages = [...messages, userMessage]

    if (messages.length === 0) {
      // First message from user
      const welcomeMsg = { from: 'ai', text: welcomeMessage || 'Halo!' }
      newMessages.push(welcomeMsg)
      if (stickerUrl) {
        const stickerMsg = { from: 'ai', sticker: stickerUrl }
        newMessages.push(stickerMsg)
      }
    }

    setMessages(newMessages)
    setTestMsg('')

    try {

      const r = await api.post(`/agents/${id}/test`, { message: testMsg, history: historyPayload })

      const reply = r.data.reply;

      if (typeof reply === 'object' && reply.attachment) {

        setMessages((prev) => [...prev, { from: 'ai', text: reply.text, attachment: reply.attachment }])

      } else {

        setMessages((prev) => [...prev, { from: 'ai', text: reply }])

      }

    } finally {

      setTesting(false)

    }

  }



  if (loading) return <div className='card'>Loading…</div>

  if (!agent) return <div className='card'>Agent tidak ditemukan</div>



  return (

    <div className='detail-wrap'>

      <div

        className='row'

        style={{

          alignItems: 'center',

          justifyContent: 'space-between',

          marginBottom: 10,

        }}

      >

        <div className='row' style={{ alignItems: 'center', gap: 8 }}>

          <button className='btn ghost' onClick={() => navigate(-1)}>

            ← Back

          </button>

          <h2 style={{ margin: 0 }}>{name || agent.name}</h2>

        </div>

        <div className='row' style={{ gap: 8 }}>

          <button

            className='btn ghost'

            onClick={() => window.location.reload()}

          >

            ↻

          </button>

          <button className='btn' disabled={saving} onClick={save}>

            {saving ? 'Saving…' : 'Save'}

          </button>

        </div>

      </div>



      <div className='tabs'>

        {[

          'general',

          'knowledge',

          'integrations',

          'followups',

          'evaluation',

          'database',

        ].map((t) => (

          <div

            key={t}

            className={`tab ${tab === t ? 'active' : ''}`}

            onClick={() => setTab(t)}

          >

            {t[0].toUpperCase() + t.slice(1)}

          </div>

        ))}

      </div>



      <div className='split'>

        {/* LEFT */}

        <div className='left col'>

          {tab === 'general' && (

            <div className='col'>

              <div className='muted'>AI Agent Behavior</div>

              <textarea

                className='textarea'

                rows={6}

                value={behavior}

                onChange={(e) => setBehavior(e.target.value)}

              />



              <div className='muted'>Welcome Message</div>

              <div

                className='muted'

                style={{ color: 'blue', cursor: 'pointer' }}

                onClick={() => document.getElementById('sticker-input').click()}

              >

                upload gambar

              </div>

              <input

                type='file'

                id='sticker-input'

                style={{ display: 'none' }}

                onChange={(e) => handleStickerSelect(e.target.files[0])}

                accept='image/*'

              />

              {stickerUrl && (

                <div className='row' style={{ gap: 8, alignItems: 'center' }}>

                  <img

                    src={`${api.defaults.baseURL}${stickerUrl}`}

                    alt='sticker'

                    style={{ width: 50, height: 50 }}

                  />

                  <button

                    className='btn ghost'

                    onClick={() => setStickerUrl('')}

                  >

                    Remove

                  </button>

                </div>

              )}

              <textarea

                className='textarea'

                rows={3}

                placeholder="Welcome message. You can use {{name}} to insert the user's name."

                value={welcomeMessage}

                onChange={(e) => setWelcomeMessage(e.target.value)}

              />



              <div className='muted'>Prompt AI</div>

              <textarea

                className='textarea'

                rows={4}

                value={prompt}

                onChange={(e) => setPrompt(e.target.value)}

              />

            </div>

          )}



          {tab === 'knowledge' && (



            <div className='col'>



              <div className='tabs'>



                <div className={`tab ${knowledgeTab === 'url' ? 'active' : ''}`} onClick={() => setKnowledgeTab('url')}>URL</div>



                <div className={`tab ${knowledgeTab === 'text' ? 'active' : ''}`} onClick={() => setKnowledgeTab('text')}>Text</div>



                <div className={`tab ${knowledgeTab === 'file' ? 'active' : ''}`} onClick={() => setKnowledgeTab('file')}>File</div>



                <div className={`tab ${knowledgeTab === 'qna' ? 'active' : ''}`} onClick={() => setKnowledgeTab('qna')}>Q&A</div>



              </div>







              <div



                className='row'



                style={{



                  justifyContent: 'space-between',



                  alignItems: 'center',



                  paddingTop: '16px'



                }}



              >



                <h3 style={{ margin: 0 }}>



                  Knowledge Sources: {knowledgeTab.toUpperCase()}



                </h3>



                <button



                  className='btn ghost'



                  onClick={() => addKnowledge(knowledgeTab === 'qna' ? { kind: 'qna', question: '', answer: '' } : { kind: knowledgeTab, value: '' })}



                >



                  + Add



                </button>



              </div>







              <div className='list'>



                {knowledge



                  .map((k, i) => ({ ...k, originalIndex: i })) // Keep original index



                  .filter((k) => k.kind === knowledgeTab)



                  .map((k) => (



                    <div key={k.originalIndex} className='rowi'>



                      <div className='col' style={{ gap: 8, flex: 1 }}>



                        {k.kind === 'qna' ? (



                          <div className='col' style={{ gap: 8, flex: 1 }}>



                            <input



                              className='input'



                              placeholder='Question'



                              value={k.question}



                              onChange={(e) =>



                                updKnowledge(k.originalIndex, { question: e.target.value })



                              }



                            />



                            <textarea



                              className='textarea'



                              placeholder='Answer'



                              value={k.answer}



                              onChange={(e) =>



                                updKnowledge(k.originalIndex, { answer: e.target.value })



                              }



                            />



                          </div>



                        ) : k.kind === 'file' ? (



                          k.value ? (



                            <div



                              className='row'



                              style={{ gap: 8, alignItems: 'center' }}



                            >



                              <span>{k.originalName || k.value.split('/').pop()}</span>



                              <a



                                href={`${api.defaults.baseURL}${k.value}`}



                                target='_blank'



                                rel='noreferrer'



                              >



                                Open



                              </a>



                              <button



                                className='btn ghost'



                                onClick={() => updKnowledge(k.originalIndex, { value: '' })}



                              >



                                Remove



                              </button>



                            </div>



                          ) : (



                            <FileInput



                              onFileSelect={(file) => handleFileSelect(file, k.originalIndex)}



                            />



                          )



                        ) : (



                          <textarea



                            className='textarea'



                            placeholder={



                              k.kind === 'text'



                                ? 'Enter text…'



                                : 'Paste URL or file path…'



                            }



                            value={k.value}



                            onChange={(e) =>



                              updKnowledge(k.originalIndex, { value: e.target.value })



                            }



                          />



                        )}



                      </div>



                      <button



                        className='btn ghost'



                        onClick={() => delKnowledge(k.originalIndex)}



                      >



                        🗑️



                      </button>



                    </div>



                  ))}



                {!knowledge.filter((k) => k.kind === knowledgeTab).length && (



                  <div className='muted'>Belum ada sumber pengetahuan.</div>



                )}



              </div>



            </div>



          )}



          {tab === 'integrations' && (

            <div className='col'>

              <h3>Integrations</h3>

              <div className='muted'>

                Hubungkan agent ke platform yang sudah terdaftar.

              </div>

              <div className='row' style={{ gap: 8, alignItems: 'center' }}>

                <BrandIcon

                  type={

                    platforms.find((p) => p._id === platformId)?.type ||

                    'custom'

                  }

                  size={18}

                />

                <select

                  className='select'

                  value={platformId || ''}

                  onChange={(e) => setPlatformId(e.target.value)}

                >

                  <option value=''> (Tidak terhubung)</option>

                  {platforms.map((p) => (

                    <option key={p._id} value={p._id}>

                      {p.label} ({p.type})

                    </option>

                  ))}

                </select>

              </div>

              <div className='muted' style={{ marginTop: 6 }}>

                Webhook URL umum: c

                <code>{`<PUBLIC_BASE_URL>/webhook/<platform>`}</code>

              </div>

            </div>

          )}



          {tab === 'followups' && (

            <div className='col'>

              <div

                className='row'

                style={{

                  justifyContent: 'space-between',

                  alignItems: 'center',

                }}

              >

                <h3 style={{ margin: 0 }}>Follow-ups</h3>

                <button className='btn ghost' onClick={addFollowUp}>

                  + Add

                </button>

              </div>

              <div className='list'>

                {followUps.map((f, i) => (

                  <div key={i} className='rowi'>

                    <div className='col' style={{ gap: 8, flex: 1 }}>

                      <textarea

                        className='textarea'

                        placeholder='Follow-up instruction'

                        value={f.prompt}

                        onChange={(e) =>

                          updFollowUp(i, { prompt: e.target.value })

                        }

                      />

                      <div

                        className='row'

                        style={{ gap: 8, alignItems: 'center' }}

                      >

                        <input

                          type='number'

                          className='input'

                          style={{ width: 100 }}

                          value={f.delay}

                          onChange={(e) =>

                            updFollowUp(i, { delay: e.target.value })

                          }

                        />

                        <div className='muted'>minutes after trigger</div>

                      </div>

                    </div>

                    <button

                      className='btn ghost'

                      onClick={() => delFollowUp(i)}

                    >

                      🗑️

                    </button>

                  </div>

                ))}

                {!followUps.length && (

                  <div className='muted'>No follow-ups configured.</div>

                )}

              </div>

            </div>

          )}



          {tab === 'evaluation' && (

            <div className='col'>

              <h3>Evaluation</h3>

              <div className='muted'>Placeholder metrik evaluasi.</div>

            </div>

          )}



          {tab === 'database' && (
            <div className='col'>
              <div
                className='row'
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <h3 style={{ margin: 0 }}>Database Files</h3>
                <div
                  className='col'
                  style={{
                    gap: 8,
                    minWidth: 260,
                    maxWidth: 340,
                    flex: '0 0 auto',
                  }}
                >
                  <input
                    id='custom-file-id'
                    className='input'
                    placeholder='Custom file ID (optional)'
                    value={databaseCustomId}
                    onChange={(e) => setDatabaseCustomId(e.target.value)}
                  />
                  <FileInput onFileSelect={handleDatabaseFileSelect} />
                  {dbUploadStatus.status !== 'idle' && (
                    <div className={`upload-status ${dbUploadStatus.status}`}>
                      {dbUploadStatus.message}
                    </div>
                  )}
                </div>
              </div>

              <div className='list'>
                {combinedDatabase.map((f, i) => {
                  const fileKey = f.id || f.storedName || `${f.originalName}-${i}`
                  const link = getFileLink(f)
                  return (
                    <div key={fileKey} className='rowi' style={{ flexDirection: 'column', gap: 8 }}>
                      <div className='row' style={{ width: '100%', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <div className='col' style={{ gap: 4, flex: 1 }}>
                          <div
                            className='row'
                            style={{
                              gap: 8,
                              alignItems: 'center',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span>{f.originalName}</span>
                            {f.source === 'remote' && f.storedName ? (
                              <a
                                href={`${api.defaults.baseURL}/files/${f.storedName}`}
                                target='_blank'
                                rel='noreferrer'
                              >
                                Open
                              </a>
                            ) : (
                              f.dataUrl && (
                                <a href={f.dataUrl} download={f.originalName}>
                                  Download
                                </a>
                              )
                            )}
                            <span
                              className='badge'
                              style={{
                                background:
                                  f.source === 'remote' ? '#ecfdf3' : '#e0f2fe',
                                color:
                                  f.source === 'remote' ? '#047857' : '#0369a1',
                              }}
                            >
                              {f.source === 'remote' ? 'Server' : 'Local only'}
                            </span>
                          </div>
                          {f.size && (
                            <div className='muted' style={{ fontSize: 12 }}>
                              {(f.size / 1024).toFixed(1)} KB
                            </div>
                          )}
                        </div>

                        <div className='row' style={{ gap: 6 }}>
                          <button className='btn ghost' onClick={() => alert(f.id)}>
                            ID
                          </button>
                          <button
                            className='btn ghost'
                            onClick={() => toggleLinkPanel(fileKey, f)}
                          >
                            Link
                          </button>
                          <button
                            className='btn ghost'
                            onClick={() => deleteDatabaseFile(f)}
                          >
                            ???
                          </button>
                        </div>
                      </div>

                      {activeLinkId === fileKey && link && (
                        <div
                          className='row'
                          style={{
                            width: '100%',
                            gap: 8,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                          }}
                        >
                          <input
                            className='input'
                            readOnly
                            value={link}
                            style={{ flex: 1 }}
                            onFocus={(e) => e.target.select()}
                          />
                          <button
                            className='btn ghost'
                            title='Copy link'
                            onClick={() => copyLink(link)}
                          >
                            📋
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}

                {!combinedDatabase.length && (
                  <div className='muted'>No database files yet.</div>
                )}
              </div>
            </div>
          )}

        </div>



        {/* RIGHT */}

        {tab === 'general' ? (

          <div className='right'>

            <div className='card testbox'>

              <div className='testhead'>

                <div className='avatar'>AI</div>

                <div style={{ fontWeight: 700 }}>{name || agent.name}</div>

                <button

                  className='btn ghost'

                  style={{ marginLeft: 'auto' }}

                  onClick={() => setMessages([])}

                >

                  ↻

                </button>

              </div>

              <div className='testmsgs'>

                {messages.map((m, idx) => (

                  <div key={idx} className={`bbl ${m.from}`}>

                    {m.text}

                    {m.sticker && (

                      <img

                        src={`${api.defaults.baseURL}${m.sticker}`}

                        alt='sticker'

                        style={{ width: 100, height: 100 }}

                      />

                    )}

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

                ))}

              </div>

              <div className='row'>

                <input

                  className='input'

                  placeholder='Ketik pesan uji…'

                  value={testMsg}

                  onChange={(e) => setTestMsg(e.target.value)}

                  onKeyDown={(e) => e.key === 'Enter' && sendTest()}

                />

                <button className='btn' onClick={sendTest} disabled={testing}>

                  {testing ? '...' : 'Kirim'}

                </button>

              </div>

              <div className='muted' style={{ marginTop: 6 }}>

                Tanpa API key, balasan akan berupa “Echo: &lt;pesan&gt;”.

              </div>

            </div>

          </div>

        ) : (

          <div className='right'></div>

        )}

      </div>

    </div>
  )
}

/* ========================= MAIN LAYOUT ========================= */
export default function Dashboard() {
  const { user } = useAuth()
  const [plan, setPlan] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
    api
      .get('/billing')
      .then((r) => setPlan(r.data))
      .catch((error) => console.error('Error fetching billing info:', error))
  }, [user, navigate])

  return (
    <div className='dashboard-layout'>
      <div className='sidebar-container'>
        <Sidebar />
      </div>
      <Navbar authed user={user} plan={plan} />
      <div className='main'>
        <div className='main-body'>
          <Routes>
            <Route index element={<Inbox />} />
            <Route path='analytics' element={<AnalyticsPage />} />
            <Route path='contacts' element={<Contacts />} />
            <Route path='platforms' element={<Platforms />} />
            <Route path='agents' element={<Agents />} />
            <Route path='/agents/:id' element={<Navigate to='general' replace />} />
            <Route path='/agents/:id/:tab' element={<AgentDetail />} />
            <Route path='humans' element={<Humans />} />
            <Route path='settings' element={<Settings />} />
            <Route path='billing' element={<Billing />} />
            <Route path='profile' element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
