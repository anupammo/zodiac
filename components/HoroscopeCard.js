import { useTranslations } from 'next-intl'

export default function HoroscopeCard({ horoscope, period = 'daily' }) {
  const t = useTranslations('horoscope')
  if (!horoscope) return null

  if (period === 'daily') {
    const sections = [
      { icon: 'fa-globe', label: t('general'), key: 'general', color: 'var(--color-primary)' },
      { icon: 'fa-heart', label: t('love'), key: 'love', color: '#e74c3c' },
      { icon: 'fa-briefcase', label: t('career'), key: 'career', color: 'var(--color-gold)' },
      { icon: 'fa-heartbeat', label: t('health'), key: 'health', color: '#2ecc71' },
    ]

    return (
      <div>
        <div className="row g-4 mb-4">
          {sections.map(({ icon, label, key, color }) => (
            <div className="col-12" key={key}>
              <div className="cosmic-card p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: `${color}22`,
                      border: `1px solid ${color}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color,
                      flexShrink: 0,
                    }}
                  >
                    <i className={`fas ${icon}`} style={{ fontSize: '0.9rem' }} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: '1rem', color }} >
                    {label}
                  </h3>
                </div>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
                  {horoscope[key]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lucky info */}
        <div className="cosmic-card p-4">
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1rem', fontSize: '1rem' }}>
            <i className="fas fa-star me-2" aria-hidden="true" />
            {t('lucky')}
          </h3>
          <div className="row g-3">
            {[
              { label: t('luckyColor'), value: horoscope.luckyColor, icon: 'fa-palette' },
              { label: t('luckyNumber'), value: horoscope.luckyNumber, icon: 'fa-hashtag' },
              { label: t('luckyStone'), value: horoscope.luckyStone, icon: 'fa-gem' },
            ].map(({ label, value, icon }) => (
              <div className="col-4" key={label}>
                <div className="text-center p-3" style={{ background: 'rgba(212,175,55,0.05)', borderRadius: 12, border: '1px solid rgba(212,175,55,0.15)' }}>
                  <i className={`fas ${icon}`} style={{ color: 'var(--color-gold)', marginBottom: '0.5rem', display: 'block' }} aria-hidden="true" />
                  <div style={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>{value}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (period === 'weekly') {
    return (
      <div className="cosmic-card p-4">
        <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1rem' }}>
          <i className="fas fa-calendar-week me-2" aria-hidden="true" />
          {t('weekTitle')}
        </h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
          {horoscope.weekly}
        </p>
      </div>
    )
  }

  return (
    <div className="cosmic-card p-4">
      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1rem' }}>
        <i className="fas fa-calendar-alt me-2" aria-hidden="true" />
        {t('monthTitle')}
      </h3>
      <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
        {horoscope.monthly}
      </p>
    </div>
  )
}
