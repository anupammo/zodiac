'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getZodiacSign, formatDate } from '@/lib/zodiacLogic'
import { getSignBySlug } from '@/lib/zodiacData'

export default function ZodiacFinder() {
  const [birthDate, setBirthDate] = useState('')
  const [system, setSystem] = useState('tropical')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [maxDate, setMaxDate] = useState('')

  useEffect(() => {
    // Calculate max date once on client to ensure consistency
    const today = new Date()
    setMaxDate(today.toISOString().split('T')[0])
  }, [])

  const handleFind = () => {
    if (!birthDate) {
      setError('Please enter your birth date.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      const slug = getZodiacSign(birthDate, system)
      const sign = getSignBySlug(slug)
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
        <span className="animate-float d-block" style={{ fontSize: '3rem' }}>🔮</span>
        <h2 className="mt-2" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem' }}>
          Discover Your <span className="shimmer-text">Cosmic Sign</span>
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          Enter your birth date to reveal your zodiac identity
        </p>
      </div>

      {/* System Toggle */}
      <div className="d-flex justify-content-center mb-4">
        <div className="zodiac-toggle">
          <button
            onClick={() => setSystem('tropical')}
            className={system === 'tropical' ? 'active' : ''}
          >
            <i className="fas fa-sun me-2" style={{ fontSize: '0.8rem' }} />
            Tropical
          </button>
          <button
            onClick={() => setSystem('sidereal')}
            className={system === 'sidereal' ? 'active' : ''}
          >
            <i className="fas fa-moon me-2" style={{ fontSize: '0.8rem' }} />
            Sidereal
          </button>
        </div>
      </div>

      <div className="mb-2" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
        {system === 'tropical'
          ? '☀️ Western astrology based on seasons (most common)'
          : '🌙 Vedic astrology aligned with actual star positions'}
      </div>

      {/* Date Input */}
      <div className="mb-4 mt-3">
        <label className="form-label-cosmic d-block mb-2">
          <i className="fas fa-calendar-alt me-2" style={{ color: 'var(--color-gold)' }} />
          Date of Birth
        </label>
        <input
          type="date"
          className="form-control form-control-cosmic"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          onKeyDown={handleKeyDown}
          max={maxDate}
          aria-label="Birth date"
        />
        {error && (
          <p className="mt-2" style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
            <i className="fas fa-exclamation-circle me-1" />
            {error}
          </p>
        )}
      </div>

      <button
        onClick={handleFind}
        disabled={loading}
        className="btn btn-cosmic w-100 py-3"
        style={{ fontSize: '1.05rem' }}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" />
            Reading the stars…
          </>
        ) : (
          <>
            <i className="fas fa-magic me-2" />
            Reveal My Sign
          </>
        )}
      </button>

      {/* Result */}
      {result && !loading && (
        <div className="result-card mt-4 p-4 text-center">
          <div className="cosmic-separator">
            <span style={{ color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Your Cosmic Sign
            </span>
          </div>

          <div className="result-sign-symbol mb-2">{result.image}</div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--color-gold)' }}>
            {result.name}
          </h3>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            <i className="fas fa-calendar me-1" />
            {system === 'tropical' ? result.dates.tropical : result.dates.sidereal}
          </p>

          <div className="d-flex justify-content-center gap-2 flex-wrap my-3">
            <span className={`element-badge element-${result.element.toLowerCase()}`}>
              {result.element === 'Fire' ? '🔥' : result.element === 'Earth' ? '🌍' : result.element === 'Air' ? '💨' : '🌊'}
              {result.element}
            </span>
            <span className="badge-gold">
              <i className="fas fa-circle-dot me-1" style={{ fontSize: '0.7rem' }} />
              {result.planet}
            </span>
            <span className="badge-cosmic">
              <i className="fas fa-gem me-1" style={{ fontSize: '0.7rem' }} />
              {result.stone}
            </span>
          </div>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {result.description.substring(0, 160)}…
          </p>

          <Link href={`/signs/${result.slug}`} className="btn btn-gold mt-3" style={{ color: '#0d0221' }}>
            <i className="fas fa-arrow-right me-2" />
            Explore Full Profile
          </Link>
        </div>
      )}
    </div>
  )
}
