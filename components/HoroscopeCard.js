export default function HoroscopeCard({ horoscope, period = 'daily' }) {
  if (!horoscope) return null

  if (period === 'daily') {
    const sections = [
      { icon: 'fa-globe', label: 'General', key: 'general', color: 'var(--color-primary)' },
      { icon: 'fa-heart', label: 'Love', key: 'love', color: '#e74c3c' },
      { icon: 'fa-briefcase', label: 'Career', key: 'career', color: 'var(--color-gold)' },
      { icon: 'fa-heartbeat', label: 'Health', key: 'health', color: '#2ecc71' },
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
                    <i className={`fas ${icon}`} style={{ fontSize: '0.9rem' }} />
                  </div>
                  <h5 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: '1rem', color }} >
                    {label}
                  </h5>
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
          <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1rem', fontSize: '1rem' }}>
            <i className="fas fa-star me-2" />
            Lucky Influences
          </h5>
          <div className="row g-3">
            {[
              { label: 'Lucky Color', value: horoscope.luckyColor, icon: 'fa-palette' },
              { label: 'Lucky Number', value: horoscope.luckyNumber, icon: 'fa-hashtag' },
              { label: 'Lucky Stone', value: horoscope.luckyStone, icon: 'fa-gem' },
            ].map(({ label, value, icon }) => (
              <div className="col-4" key={label}>
                <div className="text-center p-3" style={{ background: 'rgba(212,175,55,0.05)', borderRadius: 12, border: '1px solid rgba(212,175,55,0.15)' }}>
                  <i className={`fas ${icon}`} style={{ color: 'var(--color-gold)', marginBottom: '0.5rem', display: 'block' }} />
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
        <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1rem' }}>
          <i className="fas fa-calendar-week me-2" />
          This Week&apos;s Forecast
        </h5>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
          {horoscope.weekly}
        </p>
      </div>
    )
  }

  return (
    <div className="cosmic-card p-4">
      <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1rem' }}>
        <i className="fas fa-calendar-alt me-2" />
        Monthly Cosmic Overview
      </h5>
      <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
        {horoscope.monthly}
      </p>
    </div>
  )
}
