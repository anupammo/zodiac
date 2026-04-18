import ZodiacFinder from '@/components/ZodiacFinder'
import ZodiacCard from '@/components/ZodiacCard'
import ZodiacWheel from '@/components/ZodiacWheel'
import StarField from '@/components/StarField'
import Link from 'next/link'
import { getAllSigns } from '@/lib/zodiacData'

export const metadata = {
  title: 'ZodiacSign – Discover Your Cosmic Identity',
  description: 'Find your zodiac sign instantly. Enter your birth date and discover your cosmic identity with both Tropical and Sidereal zodiac systems.',
}

export default function HomePage() {
  const signs = getAllSigns()

  const features = [
    {
      icon: 'fa-moon',
      title: 'Daily Horoscope',
      description: 'Receive personalized daily, weekly, and monthly cosmic forecasts aligned with your sign.',
      href: '/horoscope',
      gradient: 'linear-gradient(135deg, rgba(108,63,197,0.3), rgba(108,63,197,0.05))',
    },
    {
      icon: 'fa-heart',
      title: 'Compatibility',
      description: 'Discover your cosmic compatibility with every other zodiac sign in love, friendship, and work.',
      href: '/compatibility',
      gradient: 'linear-gradient(135deg, rgba(231,76,60,0.3), rgba(231,76,60,0.05))',
    },
    {
      icon: 'fa-star',
      title: 'Sign Profiles',
      description: 'Explore in-depth personality profiles, traits, love patterns, and cosmic insights for all 12 signs.',
      href: '/signs',
      gradient: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
    },
    {
      icon: 'fa-globe',
      title: 'Two Systems',
      description: 'Support for both Tropical (Western) and Sidereal (Vedic/Eastern) zodiac calculation systems.',
      href: '/#finder',
      gradient: 'linear-gradient(135deg, rgba(46,204,113,0.3), rgba(46,204,113,0.05))',
    },
  ]

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero-section" id="finder" style={{ paddingTop: '80px' }}>
        <StarField count={80} />
        <div className="container py-5" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6 hero-content animate-fade-in-up">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge-gold">
                  <i className="fas fa-star me-1" />
                  Ancient Wisdom · Modern Insight
                </span>
              </div>
              <h1 className="hero-title mb-3">
                Discover Your{' '}
                <span className="shimmer-text">Cosmic</span>{' '}
                Identity
              </h1>
              <p className="hero-subtitle mb-5">
                Unlock the secrets of the stars. Your zodiac sign reveals your personality,
                destiny, and place in the cosmos. Both Tropical and Sidereal systems supported.
              </p>
              <ZodiacFinder />
            </div>

            <div className="col-lg-6 d-none d-lg-flex justify-content-center">
              <div className="animate-float">
                <ZodiacWheel />
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, fill: 'var(--color-bg-dark)' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── All Signs Grid ─────────────────────────────────── */}
      <section className="section-dark py-5" id="all-signs">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              The <span className="shimmer-text">12 Zodiac Signs</span>
            </h2>
            <div className="section-divider" />
            <p style={{ color: 'var(--color-text-muted)', maxWidth: 500, margin: '0 auto' }}>
              Each sign carries unique cosmic energy, personality traits, and ancient wisdom.
              Explore them all and discover the tapestry of the zodiac.
            </p>
          </div>

          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
            {signs.map((sign) => (
              <div className="col" key={sign.slug}>
                <ZodiacCard sign={sign} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="section-accent py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              Explore the <span className="gradient-text">Cosmos</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="row g-4">
            {features.map(({ icon, title, description, href, gradient }) => (
              <div className="col-md-6 col-lg-3" key={title}>
                <Link href={href} className="text-decoration-none d-block h-100">
                  <div
                    className="cosmic-card p-4 h-100 text-center"
                    style={{ background: gradient }}
                  >
                    <div
                      className="mb-3 mx-auto"
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'rgba(212,175,55,0.1)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <i className={`fas ${icon}`} style={{ fontSize: '1.4rem', color: 'var(--color-gold)' }} />
                    </div>
                    <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                      {title}
                    </h5>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                      {description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────── */}
      <section className="py-5 section-gradient">
        <div className="container">
          <div
            className="text-center p-5 rounded-4"
            style={{
              background: 'linear-gradient(135deg, rgba(108,63,197,0.2), rgba(212,175,55,0.1))',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1rem' }}>
              Begin Your <span className="shimmer-text">Cosmic Journey</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.8 }}>
              The stars have guided humanity for millennia. Let them guide you today.
              Explore your horoscope and discover your cosmic compatibility.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link href="/horoscope" className="btn btn-cosmic px-4">
                <i className="fas fa-moon me-2" />
                Read Horoscope
              </Link>
              <Link href="/compatibility" className="btn btn-outline-cosmic px-4">
                <i className="fas fa-heart me-2" />
                Check Compatibility
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
