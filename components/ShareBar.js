'use client'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

/**
 * The one share widget used on every content page.
 * Links are real <a href>s rendered on the server, so they work without JS;
 * the native share sheet (mobile) and copy-link are progressive enhancements.
 */
export default function ShareBar({ url, title, text, variant = 'section', label }) {
  const t = useTranslations('share')
  const [canShare, setCanShare] = useState(false)
  const [copied, setCopied] = useState(false)
  useEffect(() => setCanShare(typeof navigator !== 'undefined' && !!navigator.share), [])

  const message = text || title
  const u = encodeURIComponent(url)
  const m = encodeURIComponent(message)
  const targets = [
    { key: 'whatsapp', icon: 'fa-whatsapp', href: `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`, color: '#25D366' },
    { key: 'facebook', icon: 'fa-facebook-f', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, color: '#1877F2' },
    { key: 'x', icon: 'fa-x-twitter', href: `https://twitter.com/intent/tweet?url=${u}&text=${m}`, color: '#e7e7e7' },
    { key: 'telegram', icon: 'fa-telegram', href: `https://t.me/share/url?url=${u}&text=${m}`, color: '#29A9EB' },
    { key: 'linkedin', icon: 'fa-linkedin-in', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, color: '#0A66C2' },
  ]

  const nativeShare = async () => {
    try { await navigator.share({ title, text: message, url }) } catch { /* user cancelled */ }
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch { /* clipboard blocked */ }
  }

  const buttons = (
    <ul className="share-list" role="list">
      {canShare && (
        <li>
          <button type="button" className="share-btn" onClick={nativeShare} aria-label={t('native')} title={t('native')}>
            <i className="fas fa-share-nodes" aria-hidden="true" />
          </button>
        </li>
      )}
      {targets.map(({ key, icon, href, color }) => (
        <li key={key}>
          <a className="share-btn" href={href} target="_blank" rel="noopener noreferrer nofollow" aria-label={t(key)} title={t(key)} style={{ '--share-color': color }}>
            <i className={`fab ${icon}`} aria-hidden="true" />
          </a>
        </li>
      ))}
      <li>
        <button type="button" className="share-btn" onClick={copy} aria-label={t('copy')} title={t('copy')}>
          <i className={`fas ${copied ? 'fa-check' : 'fa-link'}`} aria-hidden="true" />
        </button>
      </li>
    </ul>
  )

  if (variant === 'inline') {
    return (
      <div className="share-inline">
        <span className="share-inline-label">{label || t('reading')}</span>
        {buttons}
        <span className="visually-hidden" role="status" aria-live="polite">{copied ? t('copied') : ''}</span>
      </div>
    )
  }

  return (
    <section className="share-section py-4" aria-labelledby="share-heading">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div className="text-center text-md-start">
          <h2 id="share-heading" className="share-heading">{t('title')}</h2>
          <p className="share-text mb-0">{t('text')}</p>
        </div>
        {buttons}
      </div>
      <span className="visually-hidden" role="status" aria-live="polite">{copied ? t('copied') : ''}</span>
    </section>
  )
}
