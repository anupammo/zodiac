'use client'
import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import StarField from '@/components/StarField'
import HoroscopeCard from '@/components/HoroscopeCard'
import { getAllSigns } from '@/lib/zodiacData'
import { getDailyHoroscope } from '@/lib/dailyHoroscope'
import { absoluteUrl } from '@/lib/seo'
import ShareBar from '@/components/ShareBar'

// `initialDate` (YYYY-MM-DD) comes from the server so the first HTML already
// contains a real reading for search engines; the browser then switches to the
// visitor's own local date. `heroExtra` holds server-rendered breadcrumbs/dates.
export default function HoroscopeView({ initialDate, heroExtra }) {
  const t = useTranslations('horoscope')
  const shareT = useTranslations('share')
  const terms = useTranslations('terms')
  const locale = useLocale()
  const signs = getAllSigns(locale)
  const [selectedSign, setSelectedSign] = useState('aries')
  const [period, setPeriod] = useState('daily')

  const sign = signs.find(s => s.slug === selectedSign)
  const [today, setToday] = useState(() => new Date(`${initialDate}T12:00:00`))
  useEffect(() => { setToday(new Date()) }, [])
  const horoscope = getDailyHoroscope(selectedSign, today, locale)
  const dateLabel = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(today)

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
            <i className="fas fa-moon me-1" aria-hidden="true" /> {t('badge')}
          </span>
          <h1 className="hero-title mb-3">
            {t('titleStart')} <span className="shimmer-text">{t('titleHighlight')}</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 540, margin: '0 auto' }}>
            {t('subtitle')}
          </p>
          {heroExtra}
        </div>
      </section>

      {/* Main content */}
      <section className="section-dark py-5">
        <div className="container">
          <div className="row g-5">
            {/* Sign Selector */}
            <div className="col-lg-3">
              <div className="cosmic-card p-3 mb-4">
                <h2 id="select-sign" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1rem', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {t('selectSign')}
                </h2>
                <div className="d-flex flex-column gap-1" role="group" aria-labelledby="select-sign">
                  {signs.map(s => (
                    <button
                      key={s.slug}
                      type="button"
                      aria-pressed={selectedSign === s.slug}
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
                    <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.5))' }} aria-hidden="true">
                      {sign.emoji}
                    </span>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: 0 }}>
                        {sign.name}
                      </h2>
                      <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                        {sign.dates.tropical} · {t('ruledBy', { planet: terms(`planets.${sign.planet}`) })}
                      </p>
                      <p style={{ color: 'var(--color-gold)', margin: 0, fontSize: '0.9rem' }}>
                        <time dateTime={horoscope.date}>{t('forDate', { date: dateLabel })}</time>
                      </p>
                    </div>
                  </div>

                  {/* Period tabs */}
                  <div className="nav nav-tabs-cosmic mb-4 d-flex gap-0" role="tablist">
                    {periods.map(({ id, label, icon }) => (
                      <button
                        key={id}
                        type="button"
                        role="tab"
                        id={`tab-${id}`}
                        aria-selected={period === id}
                        aria-controls="horoscope-panel"
                        className={`nav-link ${period === id ? 'active' : ''}`}
                        onClick={() => setPeriod(id)}
                      >
                        <i className={`fas ${icon} me-2`} style={{ fontSize: '0.8rem' }} aria-hidden="true" />
                        {label}
                      </button>
                    ))}
                  </div>

                  <div role="tabpanel" id="horoscope-panel" aria-labelledby={`tab-${period}`}>
                    <HoroscopeCard horoscope={period === 'daily' ? horoscope.daily : horoscope} period={period} />
                  </div>
                  <ShareBar
                    variant="inline"
                    url={absoluteUrl(locale, `/signs/${sign.slug}`)}
                    title={shareT('readingText', { sign: sign.name, date: dateLabel })}
                    text={`${shareT('readingText', { sign: sign.name, date: dateLabel })}: ${horoscope.daily.general}`}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
