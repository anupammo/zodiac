'use client'
import Link from 'next/link'
import { getAllSigns } from '@/lib/zodiacData'

export default function Footer() {
  const signs = getAllSigns()

  return (
    <footer className="footer-cosmic">
      <div className="container">
        <div className="row g-5">
          {/* Brand */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span style={{ color: 'var(--color-gold)', fontSize: '1.5rem' }}>✦</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-text-primary)' }}>
                ZodiacSign
              </span>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.8' }}>
              Explore your cosmic identity through ancient wisdom and modern insights.
              Discover your zodiac sign, daily horoscope, and compatibility.
            </p>
            <div className="d-flex gap-3 mt-3">
              {['fa-twitter', 'fa-facebook-f', 'fa-instagram', 'fa-pinterest-p'].map(icon => (
                <a
                  key={icon}
                  href="#"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(108,63,197,0.2)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    color: 'var(--color-text-muted)',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.15)'
                    e.currentTarget.style.color = 'var(--color-gold)'
                    e.currentTarget.style.borderColor = 'var(--color-gold)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(108,63,197,0.2)'
                    e.currentTarget.style.color = 'var(--color-text-muted)'
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'
                  }}
                  aria-label={icon}
                >
                  <i className={`fab ${icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-lg-2">
            <h6 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontSize: '0.9rem', letterSpacing: '0.08em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Explore
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {[
                { href: '/', label: 'Find My Sign' },
                { href: '/signs', label: 'All Signs' },
                { href: '/horoscope', label: 'Horoscope' },
                { href: '/compatibility', label: 'Compatibility' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                  >
                    <i className="fas fa-chevron-right me-2" style={{ fontSize: '0.65rem' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zodiac Signs */}
          <div className="col-6 col-lg-3">
            <h6 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontSize: '0.9rem', letterSpacing: '0.08em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Zodiac Signs
            </h6>
            <div className="row g-1">
              {signs.map(sign => (
                <div className="col-6" key={sign.slug}>
                  <Link
                    href={`/signs/${sign.slug}`}
                    style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                  >
                    <span style={{ fontSize: '0.9rem' }}>{sign.emoji}</span>
                    {sign.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3">
            <h6 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontSize: '0.9rem', letterSpacing: '0.08em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Cosmic Updates
            </h6>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Receive your weekly cosmic forecast and spiritual insights.
            </p>
            <div className="d-flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="form-control form-control-cosmic flex-1"
                style={{ fontSize: '0.85rem', flex: 1 }}
                aria-label="Email for newsletter"
              />
              <button className="btn-gold btn" style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', padding: '0.5rem 1rem', color: '#0d0221' }}>
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mt-5 pt-4"
          style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}
        >
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
            © {new Date().getFullYear()} ZodiacSign. All rights reserved. Made with{' '}
            <span style={{ color: '#e74c3c' }}>♥</span> for the cosmos.
          </p>
          <div className="d-flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map(label => (
              <a key={label} href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
