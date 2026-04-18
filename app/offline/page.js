import Link from 'next/link'
import StarField from '@/components/StarField'
import ReloadButton from '@/components/ReloadButton'

export const metadata = {
  title: 'Offline – ZodiacSign',
}

export default function OfflinePage() {
  return (
    <section
      className="hero-section"
      style={{ minHeight: '100vh', background: 'var(--gradient-hero)' }}
    >
      <StarField count={60} />
      <div className="container text-center py-5" style={{ position: 'relative', zIndex: 2 }}>
        <div className="animate-float mb-4" style={{ fontSize: '5rem' }}>🌌</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
          Lost in the <span className="shimmer-text">Cosmos</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.8 }}>
          The stars are temporarily out of reach. It seems you&apos;re offline.
          Your cosmic journey will resume once you reconnect to the universe.
        </p>
        <div
          className="p-4 rounded-4 d-inline-block mb-4"
          style={{ background: 'rgba(108,63,197,0.15)', border: '1px solid rgba(212,175,55,0.2)' }}
        >
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.9rem' }}>
            <i className="fas fa-wifi me-2" style={{ color: '#e74c3c' }} />
            No internet connection detected
          </p>
        </div>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link href="/" className="btn btn-cosmic px-4">
            <i className="fas fa-home me-2" />
            Return Home
          </Link>
          <ReloadButton />
        </div>
      </div>
    </section>
  )
}
