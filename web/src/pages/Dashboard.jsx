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
import {
  faMagnifyingGlass,
  faSliders,
  faEnvelopeOpen,
  faBookOpen,
  faPlug,
  faClock,
  faDatabase,
  faChartPie,
  faBrain,
  faChevronRight,
  faPenToSquare,
  faCheck,
  faRotateRight,
  faFingerprint,
  faWandMagicSparkles,
  faMessage,
  faCloudArrowUp,
  faXmark,
  faLink,
  faFileLines,
  faFolderOpen,
  faComments,
  faGlobe,
  faPlus,
  faTrashCan,
  faFileArrowUp,
  faFilePdf,
  faPen,
  faChevronDown,
  faCopy,
  faHourglass,
  faFolderPlus,
  faFileWord,
  faEye,
  faRobot,
  faEllipsisVertical,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
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
    <div style={{ maxWidth: 1150, margin: '0 auto' }}>
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

      <div className='agent-grid'>
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
    ;(async () => {
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

          const r = await api.post(`/agents/${id}/test`, { message: testMsg })

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

              <div class="max-w-7xl mx-auto">

                <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

                                  <div>

                                      <div class="flex items-center text-sm text-slate-500 mb-1">

                                          <span

                                              class="hover:text-orange-500 cursor-pointer transition"

                                              onClick={() => navigate(-1)}

                                          >

                                              My Bots

                                          </span>

                                          <i class="fa-solid fa-chevron-right text-xs mx-2"></i>

                                          <span class="text-slate-800 font-semibold">Editing</span>

                                      </div>

                                      <div class="flex items-center gap-3 group">

                                          <input

                                              type="text"

                                              id="bot-name-input"

                                              value={name}

                                              onChange={(e) => setName(e.target.value)}

                                              class="text-3xl font-bold bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-orange-500 focus:outline-none bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 w-full md:w-auto transition-colors"

                                          />

                                          <i class="fa-solid fa-pen-to-square text-slate-300 group-hover:text-orange-400 transition cursor-pointer"></i>

                                      </div>

                                  </div>

                                    <div class="flex items-center gap-3">

                                        <span id="auto-save-indicator"

                                            class="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 transition-opacity duration-500">

                                            <i class="fa-solid fa-check mr-1"></i> Auto-saved

                                        </span>

                                        <button

                                            onClick={() => window.location.reload()}

                                            class="bg-white text-slate-600 px-5 py-2.5 rounded-full font-semibold text-sm border border-slate-200 shadow-sm hover:bg-slate-50 transition">

                                            <i class="fa-solid fa-rotate-right mr-2"></i> Reset

                                        </button>

                                        <button

                                            onClick={save}

                                            disabled={saving}

                                            class="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:scale-[1.02] transition-all active:scale-95">

                                            {saving ? 'Saving…' : 'Save Changes'}

                                        </button>

                                    </div>

                      </header>

            

                      <nav class="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar" id="tab-container">

                        {[

                          {tabs.map((t) => (

                            <button

                              key={t.key}

                              data-tab={t.key}

                              className={`tab-btn flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm min-w-max transition-all ${

                                tab === t.key

                                  ? 'active bg-white text-slate-900 shadow-md border border-slate-100'

                                  : 'bg-transparent text-slate-500 hover:bg-white hover:text-slate-700'

                              }`}

                              onClick={() => setTab(t.key)}

                            >

                              {t.icon} {t.label}

                            </button>

                          ))}

          </div>

    

  const tabs = [
    { key: 'general', label: 'General', icon: <FontAwesomeIcon icon={faSliders} className='text-orange-500' /> },
    { key: 'knowledge', label: 'Knowledge', icon: <FontAwesomeIcon icon={faBookOpen} className='opacity-50' /> },
    { key: 'integrations', label: 'Integrations', icon: <FontAwesomeIcon icon={faPlug} className='opacity-50' /> },
    { key: 'followups', label: 'Follow-ups', icon: <FontAwesomeIcon icon={faClock} className='opacity-50' /> },
    { key: 'database', label: 'Database', icon: <FontAwesomeIcon icon={faDatabase} className='opacity-50' /> },
    { key: 'analytics', label: 'Analytics', icon: <FontAwesomeIcon icon={faChartPie} className='opacity-50' /> },
    { key: 'evaluation', label: 'Evaluation', icon: <FontAwesomeIcon icon={faBrain} className='opacity-50' /> }, // Using brain icon for now
  ];

            {/* LEFT */}

            <div className='left col'>

                              <div id="content-general" class="flex flex-col gap-6 tab-content">

                    <div
                        class="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 transition hover:shadow-2xl hover:shadow-slate-200/80">
                        <div class="flex justify-between items-center mb-4">
                            <label
                                class="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-fingerprint text-orange-400"></i> AI Agent Persona
                            </label>
                            <span
                                class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">System
                                Prompt</span>
                        </div>

                        <div class="relative group">
                            <textarea
                                id="input-persona"
                                class="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition resize-none leading-relaxed"
                                placeholder="Describe precisely how the AI should behave..."
                                value={behavior}
                                onChange={(e) => setBehavior(e.target.value)}
                            ></textarea>
                            <button
                                // onclick="generatePersona()"
                                class="absolute bottom-3 right-3 bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition flex items-center gap-2 group/btn">
                                <i class="fa-solid fa-wand-magic-sparkles group-hover/btn:animate-pulse"></i> Improve
                                with AI
                            </button>
                        </div>
                    </div>

    

                    <div class="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100">
                        <label
                            class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 block flex items-center gap-2">
                            <i class="fa-regular fa-message text-orange-400"></i> Welcome Message
                        </label>

                        {/* Image Upload Zone */}
                        <input
                            type="file"
                            id="image-upload-input"
                            class="hidden"
                            accept="image/*"
                            onChange={(e) => handleStickerSelect(e.target.files[0])}
                        />
                        <div
                            onClick={() => document.getElementById('image-upload-input').click()}
                            id="drop-zone"
                            class="mb-4 border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-orange-300 transition group relative overflow-hidden"
                        >
                            {stickerUrl ? (
                                <div className="relative w-full h-24 flex items-center justify-center">
                                    <img
                                        src={`${api.defaults.baseURL}${stickerUrl}`}
                                        alt='sticker'
                                        className="max-h-full max-w-full object-contain"
                                    />
                                    <button
                                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md text-red-500 hover:scale-110 transition"
                                        onClick={(e) => { e.stopPropagation(); setStickerUrl(''); }}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div
                                        class="bg-orange-50 text-orange-500 p-3 rounded-full mb-2 group-hover:scale-110 transition z-10"
                                    >
                                        <i class="fa-solid fa-cloud-arrow-up text-xl"></i>
                                    </div>
                                    <p id="upload-text" class="text-sm font-medium text-slate-700 z-10">
                                        Click to upload an image
                                    </p>
                                    <p id="upload-subtext" class="text-xs text-slate-400 mt-1 z-10">
                                        SVG, PNG, JPG or GIF (max. 3MB)
                                    </p>
                                </>
                            )}
                        </div>

                        <div class="relative">
                            <textarea
                                id="input-welcome"
                                class="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition resize-none leading-relaxed"
                                placeholder="Welcome message. You can use {{name}} to insert the user's name."
                                value={welcomeMessage}
                                onChange={(e) => setWelcomeMessage(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

    

                    <div
                        class="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 opacity-90 hover:opacity-100 transition">
                        <label
                            class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 block flex items-center gap-2">
                            <i class="fa-solid fa-brain text-orange-400"></i> Knowledge Context
                        </label>
                        <div class="relative">
                            <textarea
                                class="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition resize-none leading-relaxed"
                                placeholder="Our latest products include the Phone 14, Laptop Pro, and Earbuds X..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                </div>

              )}

    

                                          {tab === 'knowledge' && (

    

                  <div id="content-knowledge" class="tab-content hidden flex flex-col gap-6">

    

                                                                  <div class="bg-white rounded-xl p-1.5 flex gap-1 w-max shadow-sm border border-slate-100">

    

                                                                      <button onClick={() => setKnowledgeTab('url')} id="sub-tab-url"

    

                                                                          class={`knowledge-sub-tab ${knowledgeTab === 'url' ? 'active bg-slate-100 text-slate-900 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition hover:bg-slate-200' : 'text-slate-500 px-4 py-1.5 rounded-lg text-sm font-medium transition hover:bg-slate-50 hover:text-slate-700'}`}>

    

                                                                          <i class="fa-solid fa-link text-orange-500 mr-1.5"></i> URL

    

                                                                      </button>

    

                                                                      <button onClick={() => setKnowledgeTab('text')} id="sub-tab-text"

    

                                                                          class={`knowledge-sub-tab ${knowledgeTab === 'text' ? 'active bg-slate-100 text-slate-900 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition hover:bg-slate-200' : 'text-slate-500 px-4 py-1.5 rounded-lg text-sm font-medium transition hover:bg-slate-50 hover:text-slate-700'}`}>

    

                                                                          <i class="fa-regular fa-file-lines mr-1.5"></i> Text

    

                                                                      </button>

    

                                                                      <button onClick={() => setKnowledgeTab('file')} id="sub-tab-file"

    

                                                                          class={`knowledge-sub-tab ${knowledgeTab === 'file' ? 'active bg-slate-100 text-slate-900 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition hover:bg-slate-200' : 'text-slate-500 px-4 py-1.5 rounded-lg text-sm font-medium transition hover:bg-slate-50 hover:text-slate-700'}`}>

    

                                                                          <i class="fa-regular fa-folder-open mr-1.5"></i> File

    

                                                                      </button>

    

                                                                      <button onClick={() => setKnowledgeTab('qna')} id="sub-tab-qa"

    

                                                                          class={`knowledge-sub-tab ${knowledgeTab === 'qna' ? 'active bg-slate-100 text-slate-900 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition hover:bg-slate-200' : 'text-slate-500 px-4 py-1.5 rounded-lg text-sm font-medium transition hover:bg-slate-50 hover:text-slate-700'}`}>

    

                                                                          <i class="fa-regular fa-comments mr-1.5"></i> Q&A

    

                                                                      </button>

    

                                                                  </div>

    

                            

    

                                                                  <div class="flex justify-between items-center mb-8">

    

                            

    

                                                                      <div>

    

                            

    

                                                                          <h2 class="text-xl font-bold text-slate-800">Website Sources</h2>

    

                            

    

                                                                          <p class="text-sm text-slate-500 mt-1">Train your bot on specific websites.</p>

    

                            

    

                                                                      </div>

    

                            

    

                                                                      <button

    

                            

    

                                                                          class="bg-gradient-to-r from-orange-500 to-pink-500 text-white pl-4 pr-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition flex items-center gap-2"

    

                            

    

                                                                          onClick={() => addKnowledge(knowledgeTab === 'qna' ? { kind: 'qna', question: '', answer: '' } : { kind: knowledgeTab, value: '' })}>

    

                            

    

                                                                          <i class="fa-solid fa-plus"></i> Add Source

    

                            

    

                                                                      </button>

    

                            

    

                                                                  </div>

    

                            

    

                                                                  {knowledgeTab === 'url' && (

    

                            

    

                                                                      <div id="knowledge-sub-url"

    

                            

    

                                                                          class="knowledge-sub-content bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 min-h-[400px]">

    

                            

    

                                              

    

                            

    

                                                                          <div class="flex gap-3 mb-8">

    

                            

    

                                                                              <input type="text" placeholder="https://example.com/pricing"

    

                            

    

                                                                                  class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition"

    

                            

    

                                                                                  value={knowledge.filter(k => k.kind === 'url')[0]?.value || ''}

    

                            

    

                                                                                  onChange={(e) => {

    

                            

    

                                                                                      const urlIndex = knowledge.findIndex(k => k.kind === 'url');

    

                            

    

                                                                                      if (urlIndex > -1) {

    

                            

    

                                                                                          updKnowledge(urlIndex, { value: e.target.value });

    

                            

    

                                                                                      } else {

    

                            

    

                                                                                          addKnowledge({ kind: 'url', value: e.target.value });

    

                            

    

                                                                                      }

    

                            

    

                                                                                  }}

    

                            

    

                                                                              />

    

                            

    

                                                                              <button

    

                            

    

                                                                                  class="bg-white border border-slate-200 text-slate-700 font-semibold px-6 rounded-xl hover:bg-slate-50 transition">Crawl</button>

    

                            

    

                                                                          </div>

    

                            

    

                                              

    

                            

    

                                                                          <div class="space-y-3">

    

                            

    

                                                                              {knowledge.filter(k => k.kind === 'url').map((k, i) => (

    

                            

    

                                                                                  <div key={i}

    

                            

    

                                                                                      class="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-orange-200 hover:shadow-md transition cursor-pointer">

    

                            

    

                                                                                      <div class="flex items-center gap-4">

    

                            

    

                                                                                          <div

    

                            

    

                                                                                              class="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">

    

                            

    

                                                                                              <i class="fa-solid fa-globe"></i>

    

                            

    

                                                                                          </div>

    

                            

    

                                                                                          <div>

    

                            

    

                                                                                              <h4 class="text-sm font-bold text-slate-800">

    

                            

    

                                                                                                  {k.value.length > 50 ? k.value.substring(0, 50) + '...' : k.value}

    

                            

    

                                                                                              </h4>

    

                            

    

                                                                                              <p class="text-xs text-slate-400">URL Source • Last synced 2m ago</p>

    

                            

    

                                                                                          </div>

    

                            

    

                                                                                      </div>

    

                            

    

                                                                                      <div class="flex items-center gap-3">

    

                            

    

                                                                                          <span

    

                            

    

                                                                                              class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 uppercase tracking-wide">Active</span>

    

                            

    

                                                                                          <button

    

                            

    

                                                                                              class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition"

    

                            

    

                                                                                              onClick={() => delKnowledge(knowledge.indexOf(k))}>

    

                            

    

                                                                                              <i class="fa-regular fa-trash-can"></i>

    

                            

    

                                                                                          </button>

    

                            

    

                                                                                      </div>

    

                            

    

                                                                                  </div>

    

                            

    

                                                                              ))}

    

                            

    

                                                                              {!knowledge.filter(k => k.kind === 'url').length && (

    

                            

    

                                                                                  <div className='muted'>No URL sources yet.</div>

    

                            

    

                                                                              )}

    

                            

    

                                                                          </div>

    

                            

    

                                                                      </div>

    

                            

    

                                                                  )}

    

                            

    

                                              

    

                            

    

                                                                  {knowledgeTab === 'text' && (

    

                            

    

                                                                      <div id="knowledge-sub-text"

    

                            

    

                                                                          class="knowledge-sub-content bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 min-h-[400px]">

    

                            

    

                                                                          <div class="flex justify-between items-center mb-6">

    

                            

    

                                                                              <div>

    

                            

    

                                                                                  <h2 class="text-xl font-bold text-slate-800">Custom Text</h2>

    

                            

    

                                                                                  <p class="text-sm text-slate-500 mt-1">Paste raw text for the bot to memorize.</p>

    

                            

    

                                                                              </div>

    

                            

    

                                                                              <button class="text-slate-400 hover:text-red-500 transition text-sm font-semibold"

    

                            

    

                                                                                  onClick={() => setKnowledge(knowledge.filter(k => k.kind !== 'text'))}><i

    

                            

    

                                                                                      class="fa-solid fa-trash-can mr-1"></i> Clear</button>

    

                            

    

                                                                          </div>

    

                            

    

                                              

    

                            

    

                                                                          <div class="relative group h-[300px]">

    

                            

    

                                                                              <textarea

    

                            

    

                                                                                  class="w-full h-full bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-700 text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition resize-none leading-relaxed font-mono"

    

                            

    

                                                                                  placeholder="Paste policies, product descriptions, or any text data here..."

    

                            

    

                                                                                  value={knowledge.filter(k => k.kind === 'text')[0]?.value || ''}

    

                            

    

                                                                                  onChange={(e) => {

    

                            

    

                                                                                      const textIndex = knowledge.findIndex(k => k.kind === 'text');

    

                            

    

                                                                                      if (textIndex > -1) {

    

                            

    

                                                                                          updKnowledge(textIndex, { value: e.target.value });

    

                            

    

                                                                                      } else {

    

                            

    

                                                                                          addKnowledge({ kind: 'text', value: e.target.value });

    

                            

    

                                                                                      }

    

                            

    

                                                                                  }}

    

                            

    

                                                                              ></textarea>

    

                            

    

                                                                              <button

    

                            

    

                                                                                  class="absolute bottom-4 right-4 bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition flex items-center gap-2 group/btn">

    

                            

    

                                                                                  <i class="fa-solid fa-wand-magic-sparkles group-hover/btn:animate-pulse"></i> Clean &

    

                            

    

                                                                                  Format

    

                            

    

                                                                              </button>

    

                            

    

                                                                          </div>

    

                            

    

                                                                          <div class="mt-4 flex justify-end">

    

                            

    

                                                                              <button

    

                            

    

                                                                                  class="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:scale-[1.02] transition">

    

                            

    

                                                                                  Save Text

    

                            

    

                                                                              </button>

    

                            

    

                                                                          </div>

    

                            

    

                                                                      </div>

    

                            

    

                                                                  )}

    

                            

    

                                              

    

                            

    

                                                                  {knowledgeTab === 'file' && (

    

                            

    

                                                                      <div id="knowledge-sub-file"

    

                            

    

                                                                          class="knowledge-sub-content bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 min-h-[400px]">

    

                            

    

                                                                          <div class="flex justify-between items-center mb-6">

    

                            

    

                                                                              <div>

    

                            

    

                                                                                  <h2 class="text-xl font-bold text-slate-800">Document Upload</h2>

    

                            

    

                                                                                  <p class="text-sm text-slate-500 mt-1">Support PDF, DOCX, TXT (Max 10MB).</p>

    

                            

    

                                                                              </div>

    

                            

    

                                                                          </div>

    

                            

    

                                              

    

                            

    

                                                                          {/* Big Dropzone */}

    

                            

    

                                                                          <div

    

                            

    

                                                                              class="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50/50 hover:border-orange-300 transition group mb-8">

    

                            

    

                                                                              <div

    

                            

    

                                                                                  class="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition shadow-sm">

    

                            

    

                                                                                  <i class="fa-solid fa-file-arrow-up"></i>

    

                            

    

                                                                              </div>

    

                            

    

                                                                              <p class="text-base font-bold text-slate-700">Click to upload or drag and drop</p>

    

                            

    

                                                                              <p class="text-sm text-slate-400 mt-1">PDF, DOCX, or TXT documents</p>

    

                            

    

                                                                              <input

    

                            

    

                                                                                  type="file"

    

                            

    

                                                                                  id="knowledge-file-upload-input"

    

                            

    

                                                                                  class="hidden"

    

                            

    

                                                                                  onChange={(e) => handleFileSelect(e.target.files[0], knowledge.length)}

    

                            

    

                                                                                  accept=".pdf,.docx,.txt"

    

                            

    

                                                                              />

    

                            

    

                                                                          </div>

    

                            

    

                                              

    

                            

    

                                                                          {/* File List */}

    

                            

    

                                                                          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Uploaded Files ({knowledge.filter(k => k.kind === 'file').length})

    

                            

    

                                                                          </h4>

    

                            

    

                                                                          <div class="space-y-3">

    

                            

    

                                                                              {knowledge.filter(k => k.kind === 'file').map((k, i) => (

    

                            

    

                                                                                  <div key={i}

    

                            

    

                                                                                      class="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">

    

                            

    

                                                                                      <div class="flex items-center gap-4">

    

                            

    

                                                                                          <div

    

                            

    

                                                                                              class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">

    

                            

    

                                                                                              <i class="fa-solid fa-file-pdf"></i>

    

                            

    

                                                                                          </div>

    

                            

    

                                                                                          <div>

    

                            

    

                                                                                              <h4 class="text-sm font-bold text-slate-800">{k.originalName || k.value.split('/').pop()}</h4>

    

                            

    

                                                                                              <p class="text-xs text-slate-400">Uploaded just now</p>

    

                            

    

                                                                                          </div>

    

                            

    

                                                                                      </div>

    

                            

    

                                                                                      <button class="text-slate-400 hover:text-red-500 transition"

    

                            

    

                                                                                          onClick={() => delKnowledge(knowledge.indexOf(k))}><i

    

                            

    

                                                                                              class="fa-solid fa-xmark"></i></button>

    

                            

    

                                                                                  </div>

    

                            

    

                                                                              ))}

    

                            

    

                                                                              {!knowledge.filter(k => k.kind === 'file').length && (

    

                            

    

                                                                                  <div className='muted'>No files uploaded yet.</div>

    

                            

    

                                                                              )}

    

                            

    

                                                                          </div>

    

                            

    

                                                                      </div>

    

                            

    

                                                                  )}

    

                            

    

                                              

    

                            

    

                                                                  {knowledgeTab === 'qna' && (

    

                            

    

                                                                      <div id="knowledge-sub-qa"

    

                            

    

                                                                          class="knowledge-sub-content bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 min-h-[400px]">

    

                            

    

                                                                          <div class="flex justify-between items-center mb-6">

    

                            

    

                                                                              <div>

    

                            

    

                                                                                  <h2 class="text-xl font-bold text-slate-800">Q&A Training</h2>

    

                            

    

                                                                                  <p class="text-sm text-slate-500 mt-1">Explicitly teach the bot how to answer specific

    

                            

    

                                                                                      questions.</p>

    

                            

    

                                                                              </div>

    

                            

    

                                                                          </div>

    

                            

    

                                              

    

                            

    

                                                                          {/* Add New Q&A */}

    

                            

    

                                                                          <div class="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-8">

    

                            

    

                                                                              <div class="grid gap-4">

    

                            

    

                                                                                  <div>

    

                            

    

                                                                                      <label

    

                            

    

                                                                                          class="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Question</label>

    

                            

    

                                                                                      <input type="text" placeholder="e.g. What are your opening hours?"

    

                            

    

                                                                                          class="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition"

    

                            

    

                                                                                          id="qna-question-input"

    

                            

    

                                                                                      />

    

                            

    

                                                                                  </div>

    

                            

    

                                                                                  <div>

    

                            

    

                                                                                      <label

    

                            

    

                                                                                          class="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Answer</label>

    

                            

    

                                                                                      <textarea placeholder="e.g. We are open Mon-Fri from 9am to 5pm."

    

                            

    

                                                                                          class="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-100 focus:focus:border-orange-400 outline-none transition resize-none h-20"

    

                            

    

                                                                                          id="qna-answer-input"

    

                            

    

                                                                                      ></textarea>

    

                            

    

                                                                                  </div>

    

                            

    

                                                                                  <div class="flex justify-end">

    

                            

    

                                                                                      <button

    

                            

    

                                                                                          class="bg-white text-slate-700 px-4 py-2 rounded-lg font-bold text-xs border border-slate-200 hover:bg-slate-100 mr-2">Cancel</button>

    

                            

    

                                                                                      <button

    

                            

    

                                                                                          class="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-md shadow-orange-200 hover:bg-orange-600"

    

                            

    

                                                                                          onClick={() => {

    

                            

    

                                                                                              const question = document.getElementById('qna-question-input').value;

    

                            

    

                                                                                              const answer = document.getElementById('qna-answer-input').value;

    

                            

    

                                                                                              if (question && answer) {

    

                            

    

                                                                                                  addKnowledge({ kind: 'qna', question, answer });

    

                            

    

                                                                                                  document.getElementById('qna-question-input').value = '';

    

                            

    

                                                                                                  document.getElementById('qna-answer-input').value = '';

    

                            

    

                                                                                              }

    

                            

    

                                                                                          }}

    

                            

    

                                                                                      >

    

                            

    

                                                                                          Add Pair

    

                            

    

                                                                                      </button>

    

                            

    

                                                                                  </div>

    

                            

    

                                                                              </div>

    

                            

    

                                                                          </div>

    

                            

    

                                              

    

                            

    

                                                                          {/* Q&A List */}

    

                            

    

                                                                          <div class="space-y-3">

    

                            

    

                                                                              {knowledge.filter(k => k.kind === 'qna').map((k, i) => (

    

                            

    

                                                                                  <div key={i}

    

                            

    

                                                                                      class="p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition group relative">

    

                            

    

                                                                                      <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">

    

                            

    

                                                                                          <button class="text-slate-400 hover:text-orange-500 mr-2"><i

    

                            

    

                                                                                                  class="fa-solid fa-pen"></i></button>

    

                            

    

                                                                                          <button class="text-slate-400 hover:text-red-500"

    

                            

    

                                                                                              onClick={() => delKnowledge(knowledge.indexOf(k))}><i

    

                            

    

                                                                                                  class="fa-solid fa-trash-can"></i></button>

    

                            

    

                                                                                      </div>

    

                            

    

                                                                                      <h4 class="text-sm font-bold text-slate-800 mb-1"><span

    

                            

    

                                                                                              class="text-orange-500 mr-2">Q:</span>{k.question}</h4>

    

                            

    

                                                                                      <p class="text-sm text-slate-600"><span

    

                            

    

                                                                                              class="text-slate-400 font-bold mr-2">A:</span>{k.answer}</p>

    

                            

    

                                                                                  </div>

    

                            

    

                                                                              ))}

    

                            

    

                                                                              {!knowledge.filter(k => k.kind === 'qna').length && (

    

                            

    

                                                                                  <div className='muted'>No Q&A pairs yet.</div>

    

                            

    

                                                                              )}

    

                            

    

                                                                          </div>

    

                            

    

                                                                      </div>

    

                            

    

                                                                  )}

    

                                            </div>

    

                                          )}

    

                            {tab === 'integrations' && (

    

                              <div id="content-integrations" class="tab-content hidden flex flex-col gap-6">

                                      {/* Dropdown Section */}

                                      <div>

                                          <h2 class="text-xl font-bold text-slate-800 mb-2">Integrations</h2>

                                          <p class="text-sm text-slate-500 mb-6">Connect your agent to platforms.</p>

                  

                                          <div class="relative max-w-md">

                                              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">

                                                  <i class="fa-solid fa-link text-slate-400"></i>

                                              </div>

                                              <select id="integration-select"

                                                  class="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition appearance-none cursor-pointer shadow-sm"

                                                  value={platformId || ''}

                                                  onChange={(e) => setPlatformId(e.target.value)}

                                              >

                                                  <option value="">Select a platform to connect...</option>

                                                  {platforms.map((p) => (

                                                      <option key={p._id} value={p._id}>

                                                          {p.label} ({p.type})

                                                      </option>

                                                  ))}

                                              </select>

                                              <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">

                                                  <i class="fa-solid fa-chevron-down text-slate-400 text-xs"></i>

                                              </div>

                                          </div>

                                      </div>

                  

                                      {/* Telegram Integration Card (Hidden by default) */}

                                      {platformId && (

                                      <div id="integration-telegram">

                                          <div

                                              class="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 animate-slide-up">

                                              <div class="flex items-start justify-between mb-6">

                                                  <div class="flex items-center gap-4">

                                                      <div

                                                          class="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center shadow-sm">

                                                          <i class="fa-brands fa-telegram text-3xl text-sky-500"></i>

                                                      </div>

                                                      <div>

                                                          <h2 class="text-xl font-bold text-slate-800">Telegram</h2>

                                                          <p class="text-sm text-slate-500 flex items-center gap-2">

                                                              Connected as <span class="font-semibold text-slate-700">{platforms.find(p => p._id === platformId)?.label}</span>

                                                          </p>

                                                      </div>

                                                  </div>

                  

                                                  {/* Status Column (Green Filled) */}

                                                  <div class="flex flex-col items-end gap-1">

                                                      <div

                                                          class="bg-emerald-500 text-white px-4 py-1.5 rounded-lg shadow-md shadow-emerald-200 flex items-center gap-2">

                                                          <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>

                                                          <span class="text-xs font-bold uppercase tracking-wide">Online</span>

                                                      </div>

                                                  </div>

                                              </div>

                  

                                              <div class="bg-slate-50 rounded-xl p-5 border border-slate-200">

                                                  <label

                                                      class="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Webhook

                                                      URL</label>

                                                  <div class="flex gap-2">

                                                      <code

                                                          class="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-mono text-slate-600 overflow-x-auto whitespace-nowrap flex items-center">

                                                          {`<PUBLIC_BASE_URL>/webhook/${platforms.find(p => p._id === platformId)?.type}/${id}`}

                                                      </code>

                                                      <button

                                                          class="bg-white text-slate-600 border border-slate-200 px-4 rounded-lg hover:bg-slate-100 transition hover:text-orange-500"

                                                          title="Copy">

                                                          <i class="fa-regular fa-copy"></i>

                                                      </button>

                                                  </div>

                                                  <p class="text-xs text-slate-400 mt-2">Webhook URL umum:

                                                      &lt;PUBLIC_BASE_URL&gt;/webhook/&lt;platform&gt;</p>

                                              </div>

                                          </div>

                                      </div>

                                      )}

                </div>

              )}

    

                            {tab === 'followups' && (

    

                              <div id="content-followups" class="tab-content hidden flex flex-col gap-6">

                                      {/* Header Section */}

                                      <div class="flex justify-between items-center">

                                          <div>

                                              <h2 class="text-xl font-bold text-slate-800">Automated Follow-ups</h2>

                                              <p class="text-sm text-slate-500 mt-1">Re-engage users if they stop responding.</p>

                                          </div>

                                          <button

                                              class="bg-gradient-to-r from-orange-500 to-pink-500 text-white pl-4 pr-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition flex items-center gap-2"

                                              onClick={addFollowUp}>

                                              <i class="fa-solid fa-plus"></i> Add Follow-up

                                          </button>

                                      </div>

                  

                                      {/* Follow-up Card (Item 1) */}

                                      {followUps.map((f, i) => (

                                          <div key={i}

                                              class="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/80 transition-all">

                                              {/* Decorative Side Bar */}

                                              <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-pink-500">

                                              </div>

                  

                                              <div class="flex flex-col md:flex-row gap-6 items-start">

                  

                                                  {/* Time Setting */}

                                                  <div class="w-full md:w-48 shrink-0">

                                                      <label

                                                          class="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block flex items-center gap-1">

                                                          <i class="fa-regular fa-hourglass text-orange-400"></i> Trigger Delay

                                                      </label>

                                                      <div class="relative">

                                                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                                                              <i class="fa-regular fa-clock text-slate-400"></i>

                                                          </div>

                                                          <input type="number" value={f.delay}

                                                              class="pl-10 pr-12 py-3 w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition"

                                                              onChange={(e) => updFollowUp(i, { delay: e.target.value })}

                                                          />

                                                          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">

                                                              <span class="text-xs text-slate-400 font-medium">mins</span>

                                                          </div>

                                                      </div>

                                                      <p class="text-[10px] text-slate-400 mt-2">Triggers after last user message.</p>

                                                  </div>

                  

                                                  {/* Instruction/Message */}

                                                  <div class="flex-1 w-full">

                                                      <div class="flex justify-between items-center mb-2">

                                                          <label class="text-xs font-bold text-slate-500 uppercase tracking-wide">Follow-up

                                                              Instruction</label>

                                                          <button

                                                              class="text-slate-300 hover:text-red-500 transition text-sm w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center"

                                                              onClick={() => delFollowUp(i)}><i

                                                                  class="fa-regular fa-trash-can"></i></button>

                                                      </div>

                                                      <div class="relative">

                                                          <textarea

                                                              class="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition resize-none leading-relaxed"

                                                              placeholder="e.g. Ask the user if they are still interested..."

                                                              value={f.prompt}

                                                              onChange={(e) => updFollowUp(i, { prompt: e.target.value })}

                                                          ></textarea>

                                                      </div>

                                                  </div>

                                              </div>

                                          </div>

                                      ))}

                  

                                      {/* Empty State / Add New Placeholder */}

                                      <button

                                          class="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-orange-200 transition group"

                                          onClick={addFollowUp}>

                                          <div

                                              class="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-50 group-hover:text-orange-500 transition">

                                              <i class="fa-solid fa-plus text-lg"></i>

                                          </div>

                                          <p class="text-sm font-bold text-slate-600 group-hover:text-orange-500 transition">Add another

                                              follow-up</p>

                                      </button>

                </div>

              )}

    

              {tab === 'evaluation' && (

                <div className='col'>

                  <h3>Evaluation</h3>

                  <div className='muted'>Placeholder metrik evaluasi.</div>

                </div>

              )}



              {tab === 'database' && (
                <div id="content-database" class="tab-content hidden flex flex-col gap-6">
                    {/* Header Section */}
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 class="text-xl font-bold text-slate-800">File Storage</h2>
                            <p class="text-sm text-slate-500 mt-1">Manage documents, images, and media assets for your
                                bot.</p>
                        </div>
                        <div class="flex gap-2">
                            <div class="relative">
                                <input type="text" placeholder="Search files..."
                                    class="bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition">
                                <i
                                    class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                            </div>
                        </div>
                    </div>

                    {/* Upload Card */}
                    <div class="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100">

                        <div class="mb-6">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Custom
                                File ID (Optional)</label>
                            <input type="text" placeholder="e.g. welcome-banner-img"
                                class="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition"
                                value={databaseCustomId}
                                onChange={(e) => setDatabaseCustomId(e.target.value)}
                            />
                        </div>

                        {/* Big Dropzone */}
                        <div
                            class="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50/50 hover:border-orange-300 transition group relative overflow-hidden"
                            onClick={() => document.getElementById('database-file-upload-input').click()}
                        >
                            <div
                                class="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition shadow-sm z-10">
                                <i class="fa-solid fa-folder-plus"></i>
                            </div>
                            <h3 class="text-lg font-bold text-slate-700 z-10">Upload Documents & Media</h3>
                            <p class="text-sm text-slate-400 mt-1 max-w-sm mx-auto z-10">Support for Images (JPG, PNG),
                                Documents (PDF, DOCX), and other assets. Max 25MB.</p>
                            <input
                                type="file"
                                id="database-file-upload-input"
                                class="hidden"
                                onChange={(e) => handleDatabaseFileSelect(e.target.files[0])}
                            />
                        </div>
                    </div>

                    {/* File List */}
                    <div>
                        <div class="flex justify-between items-end mb-3">
                            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Stored Files ({combinedDatabase.length})</h4>
                            <div class="flex gap-2 text-xs">
                                <button class="text-slate-500 font-semibold hover:text-orange-500">All</button>
                                <button class="text-slate-400 hover:text-orange-500">Images</button>
                                <button class="text-slate-400 hover:text-orange-500">Docs</button>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 gap-3">
                            {combinedDatabase.map((f, i) => {
                                const fileKey = f.id || f.storedName || `${f.originalName}-${i}`
                                const link = getFileLink(f)
                                return (
                                    <div key={fileKey}
                                        class="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition group">
                                        <div class="flex items-center gap-4">
                                            <div
                                                class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 text-xl relative overflow-hidden">
                                                {/* Preview thumbnail simulation */}
                                                {f.originalName.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                                    <img src={`${api.defaults.baseURL}${f.storedName}`} alt="preview" className="h-full w-full object-cover" />
                                                ) : f.originalName.match(/\.pdf$/) ? (
                                                    <i class="fa-regular fa-file-pdf z-10"></i>
                                                ) : f.originalName.match(/\.(doc|docx)$/) ? (
                                                    <i class="fa-regular fa-file-word z-10"></i>
                                                ) : (
                                                    <i class="fa-regular fa-file z-10"></i>
                                                )}
                                                <div class="absolute inset-0 bg-purple-100 opacity-50"></div>
                                            </div>
                                            <div>
                                                <h4 class="text-sm font-bold text-slate-800">{f.originalName}</h4>
                                                <div class="flex items-center gap-3 mt-1">
                                                    <span class="text-xs text-slate-400 font-mono">ID: {f.id || 'N/A'}</span>
                                                    <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                                                    <span class="text-[10px] font-bold text-slate-500">{(f.size / 1024).toFixed(1)} KB</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <button
                                                class="text-slate-400 hover:text-sky-500 transition p-2 rounded-full hover:bg-slate-50"
                                                title="Preview"
                                                onClick={() => {
                                                    const fileUrl = getFileLink(f);
                                                    if (fileUrl) window.open(fileUrl, '_blank');
                                                    else alert('File not available for preview.');
                                                }}
                                            >
                                                <i class="fa-regular fa-eye"></i>
                                            </button>
                                            <button
                                                class="text-slate-400 hover:text-orange-500 transition p-2 rounded-full hover:bg-slate-50"
                                                title="Copy Link"
                                                onClick={() => copyLink(link)}
                                            >
                                                <i class="fa-solid fa-link"></i>
                                            </button>
                                            <button
                                                class="text-slate-400 hover:text-red-500 transition p-2 rounded-full hover:bg-slate-50"
                                                onClick={() => deleteDatabaseFile(f)}
                                            >
                                                <i class="fa-regular fa-trash-can"></i>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}

                            {!combinedDatabase.length && (
                                <div className='muted'>No database files yet.</div>
                            )}
                        </div>
                    </div>
                </div>
              )}

            </main>
            <aside class="lg:col-span-5 xl:col-span-4 relative">
                <div class="sticky top-8">

                    {/* Live Preview Header */}
                    <div class="flex justify-between items-center mb-4 px-2">
                        <h3 class="font-bold text-slate-700 flex items-center gap-2 text-lg">
                            <i class="fa-solid fa-eye text-orange-500"></i> Live Preview
                        </h3>
                        <button onClick={() => setMessages([])}
                            class="text-xs font-medium text-slate-500 hover:text-orange-500 transition flex items-center gap-1">
                            <i class="fa-solid fa-rotate-right"></i> Refresh
                        </button>
                    </div>

                    {/* Background Decoration */}
                    <div
                        class="absolute -inset-4 bg-gradient-to-tr from-orange-100 via-pink-50 to-white rounded-[3rem] blur-xl opacity-70 -z-10">
                    </div>

                    {/* WIDGET CARD START */}
                    <div
                        class="bg-white rounded-[2.5rem] shadow-2xl shadow-orange-900/10 overflow-hidden border border-slate-100 h-[640px] flex flex-col relative transform transition hover:scale-[1.01] duration-500">
                        {/* Header */}
                        <div class="px-6 py-5 border-b border-slate-50 flex justify-between items-center bg-white z-10">
                            <div class="flex items-center gap-4">
                                <div class="relative group cursor-pointer">
                                    {/* Avatar */}
                                    <div
                                        class="w-12 h-12 rounded-full bg-slate-100 border border-slate-100 overflow-hidden flex items-center justify-center group-hover:shadow-md transition">
                                        <i class="fa-solid fa-robot text-slate-600 text-xl"></i>
                                    </div>
                                    {/* Online Dot */}
                                    <div
                                        class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-[3px] border-white rounded-full">
                                    </div>
                                </div>
                                <div>
                                    <h3 id="preview-bot-name" class="font-bold text-slate-800 text-lg leading-tight">
                                        {name || agent.name}</h3>
                                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                        ACTIVE NOW</p>
                                </div>
                            </div>
                            <div class="flex gap-1 text-slate-400">
                                <button
                                    class="w-8 h-8 hover:bg-slate-50 rounded-full flex items-center justify-center transition hover:text-orange-500">
                                    <i class="fa-solid fa-ellipsis-vertical text-sm"></i>
                                </button>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div id="chat-container" class="flex-1 bg-white p-6 overflow-y-auto space-y-6 scroll-smooth">

                            {/* Bot Message */}
                            <div class="flex items-start gap-3 group">
                                <div
                                    class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1 text-slate-500">
                                    <i class="fa-solid fa-robot text-xs"></i>
                                </div>
                                <div class="flex flex-col gap-2 max-w-[85%]">
                                    <div
                                        class="bg-white border border-slate-100 shadow-sm text-slate-600 p-4 rounded-2xl rounded-tl-none text-[15px] leading-relaxed group-hover:shadow-md transition-shadow duration-300">
                                        <p id="preview-welcome-msg">{welcomeMessage}</p>
                                    </div>
                                    {/* Image Preview Container (Hidden by default) */}
                                    {stickerUrl && (
                                    <div id="preview-image-container"
                                        class="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                                        <img src={`${api.defaults.baseURL}${stickerUrl}`} class="w-full h-auto object-cover"/>
                                    </div>
                                    )}
                                </div>
                            </div>

                            {/* Typing Indicator (Hidden by default) */}
                            {testing && (
                            <div id="typing-indicator" class="flex items-start gap-3">
                                <div
                                    class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1 text-slate-500">
                                    <i class="fa-solid fa-robot text-xs"></i>
                                </div>
                                <div
                                    class="bg-white border border-slate-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-none">
                                    <div class="flex gap-1">
                                        <div class="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                                        <div class="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                                        <div class="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                                    </div>
                                </div>
                            </div>
                            )}

                             {/* Messages from test chat */}
                            {messages.map((m, idx) => (
                                <div key={idx} className={`flex items-${m.from === 'user' ? 'end' : 'start'} gap-3 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
                                    {m.from === 'ai' && (
                                        <div
                                            class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1 text-slate-500">
                                            <i class="fa-solid fa-robot text-xs"></i>
                                        </div>
                                    )}
                                    <div class={`flex flex-col gap-2 max-w-[85%] ${m.from === 'user' ? 'items-end' : ''}`}>
                                        <div
                                            class={`${m.from === 'user' ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl rounded-br-none shadow-md shadow-orange-200/50' : 'bg-white border border-slate-100 shadow-sm text-slate-600 rounded-2xl rounded-tl-none'} p-4 text-[15px] leading-relaxed group-hover:shadow-md transition-shadow duration-300`}>
                                            <p>{m.text}</p>
                                        </div>
                                        {m.attachment && (
                                            <div class="mt-2">
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
                                                                class="max-w-full rounded-xl"
                                                            />
                                                        );
                                                    }
                                                    return (
                                                        <a
                                                            href={url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            class="btn ghost"
                                                        >
                                                            Download {filename || 'file'}
                                                        </a>
                                                    );
                                                })()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}


                        </div>

                        {/* Input Area */}
                        <div class="p-6 pt-2 bg-white pb-8">
                            <div class="relative group">
                                <input
                                    id="phone-input"
                                    type="text"
                                    placeholder="Type a message..."
                                    class="w-full bg-slate-50 text-slate-600 placeholder-slate-400 rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-100 transition shadow-inner text-sm font-medium"
                                    value={testMsg}
                                    onChange={(e) => setTestMsg(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendTest()}
                                />

                                {/* Send Button */}
                                <button onClick={sendTest} disabled={testing}
                                    class="absolute right-2 top-2 bottom-2 aspect-square bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 transition transform active:scale-95 group-focus-within:shadow-orange-300">
                                    <i class="fa-solid fa-paper-plane text-sm"></i>
                                </button>
                            </div>
                            <div class="text-center mt-4">
                                <p class="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Powered by
                                    Gemini 2.5</p>
                            </div>
                        </div>

                    </div>
                    {/* WIDGET CARD END */}
                </div>
            </aside>
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
