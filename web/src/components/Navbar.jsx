import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons' // Import the robot icon

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
          {/* Replaced logo-dot with FontAwesomeIcon and new styling */}
          <div className='lp-logo-icon' style={{ width: 32, height: 32, fontSize: 18, borderRadius: 8 }}>
            <FontAwesomeIcon icon={faRobot} />
          </div>
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
                background: 'var(--lp-green-500)', // Using new color variable
              }}
            ></div>
            <div>
              {user?.name}{' '}
              <span style={{ color: 'var(--muted)' }}>({user?.email})</span> {/* Using new color variable */}
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
                  border: '1px solid var(--border)', // Using new color variable
                  borderRadius: 8,
                  padding: 8,
                  marginTop: 4,
                  boxShadow: 'var(--shadow)', // Using new shadow variable
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