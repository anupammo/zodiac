'use client'
import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { locales, localeNames } from '@/i18n/routing'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: t('home'), icon: 'fa-house' },
    { href: '/signs', label: t('signs'), icon: 'fa-star' },
    { href: '/horoscope', label: t('horoscope'), icon: 'fa-moon' },
    { href: '/compatibility', label: t('compatibility'), icon: 'fa-heart' },
  ]

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-cosmic fixed-top ${scrolled ? 'scrolled' : ''}`}
      style={{ transition: 'all 0.3s ease' }}
    >
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
          {/* <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}>✦</span> */}
          <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}>
            <img
              src="/favicon-96x96.png"
              alt="favicon"
              style={{ width: '2em', height: '2em', verticalAlign: 'middle' }}
            />
          </span>

          <span style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>ZODIACSIGN</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t('toggle')}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {links.map(({ href, label, icon }) => (
              <li className="nav-item" key={href}>
                <Link
                  href={href}
                  className={`nav-link d-flex align-items-center gap-2 ${pathname === href ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <i className={`fas ${icon}`} style={{ fontSize: '0.8rem' }} />
                  {label}
                </Link>
              </li>
            ))}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <Link
                href="/"
                className="btn btn-gold btn-sm px-3"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em', color: '#0d0221' }}
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-magic me-1" />
                {t('findMySign')}
              </Link>
            </li>
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0 d-flex gap-1" role="group" aria-label={t('language')}>
              {locales.map((l) => (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? 'true' : undefined}
                  className={`btn btn-sm ${l === locale ? 'btn-cosmic' : 'btn-outline-cosmic'}`}
                  style={{ fontSize: '0.8rem', padding: '0.25rem 0.7rem' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
