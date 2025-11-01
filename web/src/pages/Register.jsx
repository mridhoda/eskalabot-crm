import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setMsg('')
    try {
      await api.post('/auth/register', { name, email, password })
      setMsg(
        'Registration successful. Check your email for the OTP or see the server console.'
      )
      setTimeout(
        () => navigate('/verify?email=' + encodeURIComponent(email)),
        800
      )
    } catch (e) {
      setError(e.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className='auth-page'>
      <Navbar />
      <div className='auth-container'>
        <div className='auth-card'>
          <h2>Get started with KALIS.AI</h2>
          <p className='muted'>Create a new account</p>

          <form onSubmit={submit} className='auth-form'>
            <div className='input-with-icon'>
              <FontAwesomeIcon icon={faUser} className='input-icon' />
              <input
                className='input'
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className='input-with-icon'>
              <FontAwesomeIcon icon={faLock} className='input-icon' />
              <input
                className='input'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className='password-toggle-icon'
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {msg && <p className='success-message'>{msg}</p>}
            {error && <p className='error-message'>{error}</p>}

            <button type='submit' className='btn'>
              Create Account
            </button>
          </form>

          <p className='auth-switch'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
