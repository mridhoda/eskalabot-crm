import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api'
import Navbar from '../components/Navbar'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    setMessage('')
    setLoading(true)
    try {
      const r = await api.post('/auth/reset-password', { token, password })
      setMessage(r.data.message)
      setTimeout(() => navigate('/login'), 3000)
    } catch (e) {
      setError(e.response?.data?.error || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='center' style={{ minHeight: 'calc(100vh - 58px)' }}>
        <form className='card col' style={{ width: 380 }} onSubmit={submit}>
          <h3>Reset Password</h3>
          <p className='muted'>Enter your new password.</p>
          <input
            className='input'
            placeholder='New Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className='input'
            placeholder='Confirm New Password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {message && <div style={{ color: '#16a34a' }}>{message}</div>}
          {error && <div style={{ color: '#ef4444' }}>{error}</div>}
          <button className='btn' disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          {message && (
            <div>
              <Link to='/login'>Go to Login</Link>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
