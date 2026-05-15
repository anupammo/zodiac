'use client'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Read user preference from localStorage on mount
    const saved = localStorage.getItem('theme-preference')
    const prefersDark = saved
      ? saved === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
    
    setDark(prefersDark)
    document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light'
    setMounted(true)
  }, [])

  useEffect(() => {
    if (dark !== null) {
      localStorage.setItem('theme-preference', dark ? 'dark' : 'light')
      document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    }
  }, [dark])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
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
        disabled
        aria-label="Theme toggle"
      />
    )
  }

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
