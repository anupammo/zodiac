'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home', icon: 'fa-house' },
    { href: '/signs', label: 'All Signs', icon: 'fa-star' },
    { href: '/horoscope', label: 'Horoscope', icon: 'fa-moon' },
    { href: '/compatibility', label: 'Compatibility', icon: 'fa-heart' },
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
          aria-label="Toggle navigation"
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
                Find My Sign
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
