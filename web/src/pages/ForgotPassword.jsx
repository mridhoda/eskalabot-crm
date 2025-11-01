import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      const r = await api.post('/auth/forgot-password', { email })
      setMessage(r.data.message)
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to send reset link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-page'>
      <Navbar />
      <div className='auth-container'>
        <div className='auth-card'>
          <h2>Forgot Your Password?</h2>
          <p className='muted'>
            No worries, we&apos;ll send you reset instructions.
          </p>

          <form onSubmit={submit} className='auth-form'>
            <div className='input-with-icon'>
              <FontAwesomeIcon icon={faEnvelope} className='input-icon' />
              <input
                className='input'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {message && <p className='success-message'>{message}</p>}
            {error && <p className='error-message'>{error}</p>}

            <button type='submit' className='btn' disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <p className='auth-switch'>
            Remembered your password? <Link to='/login'>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
