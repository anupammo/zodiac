import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import StarField from '@/components/StarField'

export default function NotFound() {
  const t = useTranslations('notFound')
  return (
    <section className="hero-section" style={{ minHeight: '80vh', paddingTop: 80 }}>
      <StarField count={50} />
      <div className="container text-center py-5" style={{ position: 'relative', zIndex: 2 }}>
        <div className="animate-float mb-4" style={{ fontSize: '4rem' }}>🪐</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1rem' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{t('text')}</p>
        <Link href="/" className="btn btn-cosmic px-4">
          <i className="fas fa-home me-2" />
          {t('home')}
        </Link>
      </div>
    </section>
  )
}
