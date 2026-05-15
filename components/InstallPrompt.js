'use client'
import { useState, useEffect } from 'react'

function getIsStandalone() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}

function getIsIOS() {
  if (typeof window === 'undefined') return false
  const userAgent = window.navigator.userAgent.toLowerCase()
  const isAppleMobile = /iphone|ipad|ipod/.test(userAgent)
  const isTouchMac = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1
  return isAppleMobile || isTouchMac
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const standalone = getIsStandalone()
    const ios = getIsIOS()
    const dismissed = localStorage?.getItem('pwa-dismissed') ?? null

    setIsIOS(ios)
    setIsInstalled(standalone)

    if (!standalone && ios && !dismissed) {
      setShowBanner(true)
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      if (!(localStorage?.getItem('pwa-dismissed')) && !getIsStandalone()) {
        setShowBanner(true)
      }
    }

    const handleInstalled = () => {
      setDeferredPrompt(null)
      setShowBanner(false)
      setIsInstalled(true)
      localStorage.removeItem('pwa-dismissed')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setShowBanner(false)
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem('pwa-dismissed', '1')
  }

  if (!showBanner || isInstalled) return null

  return (
    <div className="pwa-banner" role="dialog" aria-live="polite" aria-label="Install ZodiacSign app">
      <div className="d-flex align-items-start gap-3 flex-wrap flex-sm-nowrap">
        {/* <div style={{ fontSize: '2rem', flexShrink: 0 }}>✦</div> */}
        <div style={{ fontSize: '2rem', flexShrink: 0 }}>
          <img src="/favicon-96x96.png" alt="favicon" style={{ width: '4rem', height: '4rem' }} />
        </div>

        <div className="flex-1">
          <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
            Install ZodiacSign
          </div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>
            {isIOS
              ? 'On iPhone or iPad, tap Share and choose Add to Home Screen for the full app experience.'
              : 'Add to your device for fast loading, offline access, and an app-like experience.'}
          </div>
        </div>
        <div className="d-flex gap-2 flex-shrink-0 align-items-center">
          {!isIOS && deferredPrompt && (
            <button onClick={handleInstall} className="btn-cosmic btn btn-sm px-3" style={{ fontSize: '0.8rem' }}>
              <i className="fa fa-download" aria-hidden="true"></i><br />
              Install
            </button>
          )}
          <button
            onClick={handleDismiss}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1, padding: '0.2rem' }}
            aria-label="Dismiss"
          >
            x
          </button>
        </div>
      </div>
    </div>
  )
}
