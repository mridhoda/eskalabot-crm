import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api'
import Navbar from '../components/Navbar'

export default function Verify() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [sp] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const e = sp.get('email')
    if (e) setEmail(e)
  }, [sp])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setMsg('')
    try {
      await api.post('/auth/verify', { email, code })
      setMsg('Verifikasi berhasil. Silakan login.')
      setTimeout(() => navigate('/login'), 800)
    } catch (e) {
      setError(e.response?.data?.error || e.message)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='center' style={{ minHeight: 'calc(100vh - 58px)' }}>
        <form className='card col' style={{ width: 380 }} onSubmit={submit}>
          <h3>Verifikasi OTP</h3>
          <input
            className='input'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='input'
            placeholder='Kode OTP 6 digit'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {msg && <div className='badge'>{msg}</div>}
          {error && <div style={{ color: '#ef4444' }}>{error}</div>}
          <button className='btn'>Verifikasi</button>
        </form>
      </div>
    </div>
  )
}
