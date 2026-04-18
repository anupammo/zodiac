'use client'
import { useState, useEffect } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      const dismissed = sessionStorage.getItem('pwa-dismissed')
      if (!dismissed) setShowBanner(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setShowBanner(false)
  }

  const handleDismiss = () => {
    setShowBanner(false)
    sessionStorage.setItem('pwa-dismissed', '1')
  }

  if (!showBanner) return null

  return (
    <div className="pwa-banner">
      <div className="d-flex align-items-center gap-3">
        <div style={{ fontSize: '2rem', flexShrink: 0 }}>✦</div>
        <div className="flex-1">
          <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
            Install ZodiacSign
          </div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
            Add to home screen for offline cosmic readings
          </div>
        </div>
        <div className="d-flex gap-2 flex-shrink-0">
          <button onClick={handleInstall} className="btn-cosmic btn btn-sm px-3" style={{ fontSize: '0.8rem' }}>
            Install
          </button>
          <button
            onClick={handleDismiss}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1, padding: '0.2rem' }}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
