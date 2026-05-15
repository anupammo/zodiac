import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllSlugs, getSignBySlug, getAllSigns } from '@/lib/zodiacData'
import { getHoroscope } from '@/lib/horoscopeData'
import StarField from '@/components/StarField'
import ZodiacCard from '@/components/ZodiacCard'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const sign = getSignBySlug(slug)
  if (!sign) return { title: 'Sign Not Found' }
  return {
    title: `${sign.name} Zodiac Sign – Traits, Love & Horoscope`,
    description: `Discover everything about ${sign.name} (${sign.dates.tropical}). Personality traits, love compatibility, career insights, and daily horoscope.`,
  }
}

export default async function SignPage({ params }) {
  const { slug } = await params
  const sign = getSignBySlug(slug)
  if (!sign) notFound()

  const horoscope = getHoroscope(slug)
  const allSigns = getAllSigns()
  const compatibleSigns = sign.compatibility.map(s => getSignBySlug(s)).filter(Boolean)

  const elementEmoji = { Fire: '🔥', Earth: '🌍', Air: '💨', Water: '🌊' }

  const stats = [
    { icon: 'fa-circle-dot', label: 'Ruling Planet', value: sign.planet },
    { icon: 'fa-layer-group', label: 'Element', value: `${elementEmoji[sign.element]} ${sign.element}` },
    { icon: 'fa-shapes', label: 'Quality', value: sign.quality },
    { icon: 'fa-gem', label: 'Birthstone', value: sign.stone },
    { icon: 'fa-calendar', label: 'Dates', value: sign.dates.tropical },
    { icon: 'fa-dice', label: 'Lucky Day', value: sign.luckyDay },
  ]

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(135deg, #0d0221 0%, #1a0533 40%, ${sign.color}33 100%)`,
          paddingTop: 80,
          minHeight: '60vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StarField count={60} />
        <div className="container py-5" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb" style={{ background: 'transparent', padding: 0 }}>
                  <li className="breadcrumb-item">
                    <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/signs" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Signs</Link>
                  </li>
                  <li className="breadcrumb-item active" style={{ color: 'var(--color-gold)' }}>{sign.name}</li>
                </ol>
              </nav>

              <div className="d-flex align-items-center gap-3 mb-3">
                <span style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.6))' }}>
                  {sign.emoji}
                </span>
                <div>
                  <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', margin: 0 }}>
                    {sign.name}
                  </h1>
                  <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '1rem' }}>
                    {sign.symbol} · {sign.dates.tropical}
                  </p>
                </div>
              </div>

              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
                {sign.description}
              </p>

              <div className="d-flex flex-wrap gap-2">
                <span className={`element-badge element-${sign.element.toLowerCase()}`}>
                  {elementEmoji[sign.element]} {sign.element}
                </span>
                <span className="badge-gold">
                  <i className="fas fa-circle-dot me-1" style={{ fontSize: '0.7rem' }} />
                  {sign.planet}
                </span>
                <span className="badge-cosmic">{sign.quality}</span>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="cosmic-card p-4">
                <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1.2rem', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Sign Overview
                </h5>
                <div className="row g-3">
                  {stats.map(({ icon, label, value }) => (
                    <div className="col-6" key={label}>
                      <div style={{ background: 'rgba(212,175,55,0.05)', borderRadius: 12, padding: '0.75rem', border: '1px solid rgba(212,175,55,0.1)' }}>
                        <i className={`fas ${icon} mb-1 d-block`} style={{ color: 'var(--color-gold)', fontSize: '0.9rem' }} />
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>{value}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-dark py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">

              {/* Traits */}
              <div className="mb-5">
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                  <i className="fas fa-sparkles me-2" style={{ color: 'var(--color-gold)' }} />
                  Personality Traits
                </h2>
                <div className="section-divider" style={{ margin: '0.5rem 0 1.5rem' }} />
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="cosmic-card p-4 h-100">
                      <h6 style={{ color: '#2ecc71', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
                        <i className="fas fa-plus-circle me-2" />
                        Strengths
                      </h6>
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                        {sign.traits.positive.map(trait => (
                          <li key={trait} className="d-flex align-items-center gap-2">
                            <span style={{ color: '#2ecc71', fontSize: '0.7rem' }}>✦</span>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cosmic-card p-4 h-100">
                      <h6 style={{ color: '#e74c3c', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
                        <i className="fas fa-minus-circle me-2" />
                        Challenges
                      </h6>
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                        {sign.traits.negative.map(trait => (
                          <li key={trait} className="d-flex align-items-center gap-2">
                            <span style={{ color: '#e74c3c', fontSize: '0.7rem' }}>✦</span>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Life Sections */}
              {[
                { icon: 'fa-heart', title: 'Love & Relationships', color: '#e74c3c', content: sign.love },
                { icon: 'fa-briefcase', title: 'Career & Money', color: 'var(--color-gold)', content: sign.career },
                { icon: 'fa-heartbeat', title: 'Health & Wellness', color: '#2ecc71', content: sign.health },
              ].map(({ icon, title, color, content }) => (
                <div className="mb-5" key={title}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                    <i className={`fas ${icon} me-2`} style={{ color }} />
                    {title}
                  </h2>
                  <div className="section-divider" style={{ margin: '0.5rem 0 1.5rem' }} />
                  <div className="cosmic-card p-4">
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, margin: 0 }}>{content}</p>
                  </div>
                </div>
              ))}

              {/* Today's Horoscope */}
              {horoscope && (
                <div className="mb-5">
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                    <i className="fas fa-moon me-2" style={{ color: 'var(--color-primary)' }} />
                    Today&apos;s Horoscope
                  </h2>
                  <div className="section-divider" style={{ margin: '0.5rem 0 1.5rem' }} />
                  <div className="cosmic-card p-4">
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                      {horoscope.daily.general}
                    </p>
                    <Link href="/horoscope" className="btn btn-cosmic btn-sm px-4">
                      <i className="fas fa-arrow-right me-2" />
                      Full Horoscope
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Compatible Signs */}
              <div className="cosmic-card p-4 mb-4">
                <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1.2rem' }}>
                  <i className="fas fa-heart me-2" />
                  Best Matches
                </h5>
                <div className="d-flex flex-column gap-2">
                  {compatibleSigns.map(s => (
                    <Link
                      key={s.slug}
                      href={`/signs/${s.slug}`}
                      className="compatible-sign-link d-flex align-items-center gap-3 p-2 rounded-3 text-decoration-none"
                    >
                      <span style={{ fontSize: '1.5rem' }}>{s.emoji}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>{s.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{s.dates.tropical}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/compatibility" className="btn btn-outline-cosmic btn-sm w-100 mt-3">
                  Full Compatibility Chart
                </Link>
              </div>

              {/* Lucky Info */}
              <div className="cosmic-card p-4 mb-4">
                <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1.2rem' }}>
                  <i className="fas fa-star me-2" />
                  Lucky Influences
                </h5>
                {[
                  { label: 'Lucky Numbers', value: sign.luckyNumbers.join(', '), icon: 'fa-hashtag' },
                  { label: 'Lucky Day', value: sign.luckyDay, icon: 'fa-calendar-check' },
                  { label: 'Lucky Color', value: sign.color, icon: 'fa-palette', isColor: true },
                  { label: 'Birthstone', value: sign.stone, icon: 'fa-gem' },
                ].map(({ label, value, icon, isColor }) => (
                  <div key={label} className="d-flex align-items-center gap-3 mb-3">
                    <i className={`fas ${icon}`} style={{ color: 'var(--color-gold)', width: 16, textAlign: 'center' }} />
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                      <div style={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        {isColor && <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: value, border: '1px solid rgba(255,255,255,0.2)' }} />}
                        {isColor ? value : value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                className="p-4 text-center rounded-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(108,63,197,0.2), rgba(212,175,55,0.1))',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔮</div>
                <h5 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.75rem' }}>Find Your Sign</h5>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Not sure if you&apos;re a {sign.name}? Enter your birth date to confirm.
                </p>
                <Link href="/" className="btn btn-gold btn-sm px-4" style={{ color: '#0d0221' }}>
                  <i className="fas fa-magic me-2" />
                  Check My Sign
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Signs */}
      <section className="section-accent py-5">
        <div className="container">
          <h2 className="section-title mb-2">Explore Other Signs</h2>
          <div className="section-divider" />
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3 mt-2">
            {allSigns.filter(s => s.slug !== slug).slice(0, 6).map(s => (
              <div className="col" key={s.slug}>
                <ZodiacCard sign={s} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/signs" className="btn btn-outline-cosmic px-4">
              <i className="fas fa-th-large me-2" />
              View All Signs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
