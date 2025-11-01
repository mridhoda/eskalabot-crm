import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ authed, user, plan, className }) {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className={`navbar ${className || ''}`}>
      <Link
        to={authed ? '/app' : '/'}
        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
      >
        <div className='logo'>
          <div className='logo-dot'></div>
          <div>{import.meta.env.VITE_APP_NAME || 'KALIS.AI'}</div>
        </div>
      </Link>
      {!authed ? (
        <div className='row'>
          <Link to='/login' className='btn ghost'>
            Login
          </Link>
          <Link to='/register' className='btn'>
            Daftar Sekarang
          </Link>
        </div>
      ) : (
        <div className='row' style={{ alignItems: 'center' }}>
          <span className='badge'>
            Paket: {plan?.plan?.toUpperCase?.() || 'PRO'}
          </span>
          <div className='badge'>
            Sisa aktif:{' '}
            {plan?.expiry ? new Date(plan.expiry).toLocaleDateString() : '-'}
          </div>
          <div
            ref={dropdownRef}
            className='row'
            style={{ gap: 8, alignItems: 'center', position: 'relative' }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: '#22c55e',
              }}
            ></div>
            <div>
              {user?.name}{' '}
              <span style={{ color: '#6b7280' }}>({user?.email})</span>
            </div>
            <button
              className='btn ghost'
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              Profile
            </button>

            {showDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  border: '1px solid #eee',
                  borderRadius: 8,
                  padding: 8,
                  marginTop: 4,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  zIndex: 10,
                }}
              >
                <button
                  className='btn ghost'
                  style={{ width: '100%', textAlign: 'left' }}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
