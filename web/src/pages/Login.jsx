import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const r = await api.post('/auth/login', { email, password })
      sessionStorage.setItem('token', r.data.token)
      if (remember) localStorage.setItem('token', r.data.token)
      sessionStorage.setItem('user', JSON.stringify(r.data.user))
      navigate('/app')
    } catch (e) {
      setError(e.response?.data?.error || 'Invalid email or password')
    }
  }

  return (
    <div className='auth-page'>
      <Navbar />
      <div className='auth-container'>
        <div className='auth-card'>
          <h2>Welcome Back</h2>
          <p className='muted'>Login to your account</p>

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

            <label className='remember-me'>
              <input
                type='checkbox'
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>

            {error && <p className='error-message'>{error}</p>}

            <button type='submit' className='btn'>
              Sign In
            </button>
          </form>

          <Link to='/forgot-password' className='auth-link'>
            Forgot your password?
          </Link>

          <div className='auth-switch'>
            <p className='muted'>Don&apos;t have an account yet?</p>
            <Link to='/register'>Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
