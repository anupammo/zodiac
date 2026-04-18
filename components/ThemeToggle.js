'use client'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{
        background: 'transparent',
        border: '1px solid rgba(212,175,55,0.3)',
        borderRadius: '50%',
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-gold)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <i className={`fas ${dark ? 'fa-sun' : 'fa-moon'}`} style={{ fontSize: '0.9rem' }} />
    </button>
  )
}
