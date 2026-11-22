import ZodiacFinder from '@/components/ZodiacFinder'
import ZodiacCard from '@/components/ZodiacCard'
import ZodiacWheel from '@/components/ZodiacWheel'
import StarField from '@/components/StarField'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getAllSigns } from '@/lib/zodiacData'
import { buildMetadata, pageGraph, absoluteUrl } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ShareBar from '@/components/ShareBar'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return buildMetadata({ locale, title: t('homeTitle'), absoluteTitle: true, description: t('homeDescription'), page: 'home' })
}

export default async function HomePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const meta = await getTranslations('meta')
  const nav = await getTranslations('nav')
  const signs = getAllSigns(locale)
  const graph = pageGraph({
    locale, page: 'home', title: meta('homeTitle'), description: meta('homeDescription'),
    crumbs: [{ name: nav('home'), path: '' }],
  })

  const features = [
    {
      icon: 'fa-moon',
      title: t('featureHoroscope'),
      description: t('featureHoroscopeText'),
      href: '/horoscope',
      gradient: 'linear-gradient(135deg, rgba(108,63,197,0.3), rgba(108,63,197,0.05))',
    },
    {
      icon: 'fa-heart',
      title: t('featureCompatibility'),
      description: t('featureCompatibilityText'),
      href: '/compatibility',
      gradient: 'linear-gradient(135deg, rgba(231,76,60,0.3), rgba(231,76,60,0.05))',
    },
    {
      icon: 'fa-star',
      title: t('featureProfiles'),
      description: t('featureProfilesText'),
      href: '/signs',
      gradient: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
    },
    {
      icon: 'fa-globe',
      title: t('featureSystems'),
      description: t('featureSystemsText'),
      href: '/#finder',
      gradient: 'linear-gradient(135deg, rgba(46,204,113,0.3), rgba(46,204,113,0.05))',
    },
  ]

  return (
    <>
      <JsonLd data={graph} />
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero-section" id="finder" style={{ paddingTop: '80px' }} aria-labelledby="home-title">
        <StarField count={80} />
        <div className="container py-5" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6 hero-content animate-fade-in-up">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge-gold">
                  <i className="fas fa-star me-1" aria-hidden="true" />
                  {t('badge')}
                </span>
              </div>
              <h1 className="hero-title mb-3" id="home-title">
                {t('heroTitleStart')}{' '}
                <span className="shimmer-text">{t('heroTitleHighlight')}</span>{' '}
                {t('heroTitleEnd')}
              </h1>
              <p className="hero-subtitle mb-5">
                {t('heroSubtitle')}
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
      <section className="section-dark py-5" id="all-signs" aria-labelledby="all-signs-title">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title" id="all-signs-title">
              {t('signsTitleStart')} <span className="shimmer-text">{t('signsTitleHighlight')}</span>
            </h2>
            <div className="section-divider" />
            <p style={{ color: 'var(--color-text-muted)', maxWidth: 500, margin: '0 auto' }}>
              {t('signsSubtitle')}
            </p>
          </div>

          <ul className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3 list-unstyled">
            {signs.map((sign) => (
              <li className="col" key={sign.slug}>
                <ZodiacCard sign={sign} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="section-accent py-5" aria-labelledby="explore-title">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title" id="explore-title">
              {t('exploreTitleStart')} <span className="gradient-text">{t('exploreTitleHighlight')}</span>
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
                      <i className={`fas ${icon}`} style={{ fontSize: '1.4rem', color: 'var(--color-gold)' }} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', marginBottom: '0.75rem', fontSize: '1.25rem' }}>
                      {title}
                    </h3>
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
      <section className="py-5 section-gradient" aria-labelledby="cta-title">
        <div className="container">
          <div
            className="text-center p-5 rounded-4"
            style={{
              background: 'linear-gradient(135deg, rgba(108,63,197,0.2), rgba(212,175,55,0.1))',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
            <h2 id="cta-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1rem' }}>
              {t('ctaTitleStart')} <span className="shimmer-text">{t('ctaTitleHighlight')}</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.8 }}>
              {t('ctaText')}
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link href="/horoscope" className="btn btn-cosmic px-4">
                <i className="fas fa-moon me-2" aria-hidden="true" />
                {t('ctaHoroscope')}
              </Link>
              <Link href="/compatibility" className="btn btn-outline-cosmic px-4">
                <i className="fas fa-heart me-2" aria-hidden="true" />
                {t('ctaCompatibility')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ShareBar url={absoluteUrl(locale)} title={meta('homeTitle')} />
    </>
  )
}
