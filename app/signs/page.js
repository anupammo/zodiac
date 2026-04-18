import Link from 'next/link'
import { getAllSigns } from '@/lib/zodiacData'
import ZodiacCard from '@/components/ZodiacCard'
import StarField from '@/components/StarField'

export const metadata = {
  title: 'All Zodiac Signs',
  description: 'Explore detailed profiles for all 12 zodiac signs. Discover their personalities, traits, compatibility, and cosmic insights.',
}

export default function SignsPage() {
  const signs = getAllSigns()

  const elementGroups = [
    { element: 'Fire', emoji: '🔥', color: '#ff6b35', signs: signs.filter(s => s.element === 'Fire') },
    { element: 'Earth', emoji: '🌍', color: '#6dbf6d', signs: signs.filter(s => s.element === 'Earth') },
    { element: 'Air', emoji: '💨', color: '#7fd8d8', signs: signs.filter(s => s.element === 'Air') },
    { element: 'Water', emoji: '🌊', color: '#6aadff', signs: signs.filter(s => s.element === 'Water') },
  ]

  return (
    <>
      {/* Hero */}
      <section
        className="hero-section"
        style={{
          minHeight: '50vh',
          background: 'linear-gradient(135deg, #0d0221 0%, #1a0533 50%, #2d1066 100%)',
          paddingTop: 80,
        }}
      >
        <StarField count={50} />
        <div className="container py-5 text-center" style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge-gold mb-3 d-inline-block">
            <i className="fas fa-star me-1" /> The Cosmic Twelve
          </span>
          <h1 className="hero-title mb-3">
            All <span className="shimmer-text">Zodiac Signs</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 560, margin: '0 auto' }}>
            Explore the unique essence of each of the twelve celestial archetypes.
            From fiery Aries to mystical Pisces, discover your place in the cosmic order.
          </p>
        </div>
      </section>

      {/* Signs by element */}
      <section className="section-dark py-5">
        <div className="container">
          {elementGroups.map(({ element, emoji, color, signs: groupSigns }) => (
            <div key={element} className="mb-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <span style={{ fontSize: '1.8rem' }}>{emoji}</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', color, margin: 0, fontSize: '1.4rem' }}>
                    {element} Signs
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.85rem' }}>
                    {element === 'Fire' && 'Bold, passionate, and full of life'}
                    {element === 'Earth' && 'Grounded, practical, and dependable'}
                    {element === 'Air' && 'Intellectual, social, and communicative'}
                    {element === 'Water' && 'Intuitive, emotional, and empathetic'}
                  </p>
                </div>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {groupSigns.map(sign => (
                  <div className="col" key={sign.slug}>
                    <ZodiacCard sign={sign} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-accent py-5">
        <div className="container text-center">
          <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
            Don&apos;t Know Your Sign?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Enter your birth date to discover your cosmic identity instantly.
          </p>
          <Link href="/" className="btn btn-cosmic px-5">
            <i className="fas fa-magic me-2" />
            Find My Sign
          </Link>
        </div>
      </section>
    </>
  )
}
