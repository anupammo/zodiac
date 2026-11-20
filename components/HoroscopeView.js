'use client'
import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import StarField from '@/components/StarField'
import HoroscopeCard from '@/components/HoroscopeCard'
import { getAllSigns } from '@/lib/zodiacData'
import { getDailyHoroscope } from '@/lib/dailyHoroscope'

export default function HoroscopeView() {
  const t = useTranslations('horoscope')
  const terms = useTranslations('terms')
  const locale = useLocale()
  const signs = getAllSigns(locale)
  const [selectedSign, setSelectedSign] = useState('aries')
  const [period, setPeriod] = useState('daily')

  const sign = signs.find(s => s.slug === selectedSign)
  // Resolve the date on the client so readings follow the visitor's local day
  // (and the prerendered HTML can't mismatch on hydration).
  const [today, setToday] = useState(null)
  useEffect(() => { setToday(new Date()) }, [])
  const horoscope = today ? getDailyHoroscope(selectedSign, today, locale) : null

  const periods = [
    { id: 'daily', label: t('daily'), icon: 'fa-sun' },
    { id: 'weekly', label: t('weekly'), icon: 'fa-calendar-week' },
    { id: 'monthly', label: t('monthly'), icon: 'fa-calendar-alt' },
  ]

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d0221 0%, #1a0533 50%, #2d1066 100%)',
          paddingTop: 80,
          minHeight: '50vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StarField count={60} />
        <div className="container py-5 text-center" style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge-gold mb-3 d-inline-block">
            <i className="fas fa-moon me-1" /> {t('badge')}
          </span>
          <h1 className="hero-title mb-3">
            {t('titleStart')} <span className="shimmer-text">{t('titleHighlight')}</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 540, margin: '0 auto' }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="section-dark py-5">
        <div className="container">
          <div className="row g-5">
            {/* Sign Selector */}
            <div className="col-lg-3">
              <div className="cosmic-card p-3 mb-4">
                <h6 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1rem', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {t('selectSign')}
                </h6>
                <div className="d-flex flex-column gap-1">
                  {signs.map(s => (
                    <button
                      key={s.slug}
                      onClick={() => setSelectedSign(s.slug)}
                      style={{
                        background: selectedSign === s.slug ? 'rgba(108,63,197,0.25)' : 'transparent',
                        border: selectedSign === s.slug ? '1px solid rgba(108,63,197,0.5)' : '1px solid transparent',
                        borderRadius: 10,
                        padding: '0.5rem 0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        transition: 'all 0.2s ease',
                        width: '100%',
                        textAlign: 'start',
                        color: selectedSign === s.slug ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                      }}
                    >
                      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{s.emoji}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>{s.dates.tropical}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Horoscope Display */}
            <div className="col-lg-9">
              {sign && (
                <>
                  {/* Sign header */}
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.5))' }}>
                      {sign.emoji}
                    </span>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: 0 }}>
                        {sign.name}
                      </h2>
                      <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                        {sign.dates.tropical} · {t('ruledBy', { planet: terms(`planets.${sign.planet}`) })}
                      </p>
                    </div>
                  </div>

                  {/* Period tabs */}
                  <ul className="nav nav-tabs-cosmic mb-4 d-flex gap-0">
                    {periods.map(({ id, label, icon }) => (
                      <li className="nav-item" key={id}>
                        <button
                          className={`nav-link ${period === id ? 'active' : ''}`}
                          onClick={() => setPeriod(id)}
                        >
                          <i className={`fas ${icon} me-2`} style={{ fontSize: '0.8rem' }} />
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>

                  {horoscope && <HoroscopeCard horoscope={period === 'daily' ? horoscope.daily : horoscope} period={period} />}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
