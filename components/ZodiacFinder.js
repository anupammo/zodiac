'use client'
import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getZodiacSign } from '@/lib/zodiacLogic'
import { getSignBySlug } from '@/lib/zodiacData'

export default function ZodiacFinder() {
  const t = useTranslations('finder')
  const terms = useTranslations('terms')
  const locale = useLocale()
  const [birthDate, setBirthDate] = useState('')
  const [system, setSystem] = useState('tropical')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [maxDate, setMaxDate] = useState('')

  useEffect(() => {
    // Calculate max date once on client to ensure consistency
    const today = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    setMaxDate(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`)
  }, [])

  const handleFind = () => {
    if (!birthDate) {
      setError(t('error'))
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      const slug = getZodiacSign(birthDate, system)
      const sign = slug ? getSignBySlug(slug, locale) : null
      setResult(sign)
      setLoading(false)
    }, 600)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleFind()
  }

  return (
    <div className="cosmic-card-glass p-4 p-md-5 rounded-4" style={{ maxWidth: 640, margin: '0 auto' }}>
      <div className="text-center mb-4">
        <span className="animate-float d-block" style={{ fontSize: '3rem' }} aria-hidden="true">🔮</span>
        <h2 className="mt-2" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem' }}>
          {t('titleStart')} <span className="shimmer-text">{t('titleHighlight')}</span>
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          {t('subtitle')}
        </p>
      </div>

      {/* System Toggle */}
      <div className="d-flex justify-content-center mb-4">
        <div className="zodiac-toggle">
          <button
            type="button"
            aria-pressed={system === 'tropical'}
            onClick={() => setSystem('tropical')}
            className={system === 'tropical' ? 'active' : ''}
          >
            <i className="fas fa-sun me-2" style={{ fontSize: '0.8rem' }} aria-hidden="true" />
            {t('tropical')}
          </button>
          <button
            type="button"
            aria-pressed={system === 'sidereal'}
            onClick={() => setSystem('sidereal')}
            className={system === 'sidereal' ? 'active' : ''}
          >
            <i className="fas fa-moon me-2" style={{ fontSize: '0.8rem' }} aria-hidden="true" />
            {t('sidereal')}
          </button>
        </div>
      </div>

      <div className="mb-2" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
        {system === 'tropical'
          ? t('tropicalHint')
          : t('siderealHint')}
      </div>

      {/* Date Input */}
      <div className="mb-4 mt-3">
        <label className="form-label-cosmic d-block mb-2" htmlFor="birth-date">
          <i className="fas fa-calendar-alt me-2" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
          {t('dob')}
        </label>
        <input
          type="date"
          id="birth-date"
          aria-describedby={error ? 'birth-date-error' : undefined}
          className="form-control form-control-cosmic"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          onKeyDown={handleKeyDown}
          max={maxDate}
          aria-label={t('dobLabel')}
        />
        {error && (
          <p className="mt-2" id="birth-date-error" role="alert" style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
            <i className="fas fa-exclamation-circle me-1" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleFind}
        disabled={loading}
        className="btn btn-cosmic w-100 py-3"
        style={{ fontSize: '1.05rem' }}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" />
            {t('loading')}
          </>
        ) : (
          <>
            <i className="fas fa-magic me-2" aria-hidden="true" />
            {t('reveal')}
          </>
        )}
      </button>

      {/* Result */}
      {result && !loading && (
        <div className="result-card mt-4 p-4 text-center" role="status" aria-live="polite">
          <div className="cosmic-separator">
            <span style={{ color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {t('yourSign')}
            </span>
          </div>

          <div className="result-sign-symbol mb-2">
            <img src={result.image} alt="" width="48" height="48" style={{ width: '2em', height: '2em', verticalAlign: 'middle' }} />
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--color-gold)' }}>
            {result.name}
          </h3>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            <i className="fas fa-calendar me-1" aria-hidden="true" />
            {system === 'tropical' ? result.dates.tropical : result.dates.sidereal}
          </p>

          <div className="d-flex justify-content-center gap-2 flex-wrap my-3">
            <span className={`element-badge element-${result.element.toLowerCase()}`}>
              {result.element === 'Fire' ? '🔥' : result.element === 'Earth' ? '🌍' : result.element === 'Air' ? '💨' : '🌊'}
              {terms(`elements.${result.element}`)}
            </span>
            <span className="badge-gold">
              <i className="fas fa-circle-dot me-1" style={{ fontSize: '0.7rem' }} aria-hidden="true" />
              {terms(`planets.${result.planet}`)}
            </span>
            <span className="badge-cosmic">
              <i className="fas fa-gem me-1" style={{ fontSize: '0.7rem' }} aria-hidden="true" />
              {result.stone}
            </span>
          </div>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {result.description.substring(0, 160)}…
          </p>

          <Link href={`/signs/${result.slug}`} className="btn btn-gold mt-3" style={{ color: '#0d0221' }}>
            <i className="fas fa-arrow-right me-2" aria-hidden="true" />
            {t('fullProfile')}
          </Link>
        </div>
      )}
    </div>
  )
}
