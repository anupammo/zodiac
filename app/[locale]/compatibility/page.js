import { getTranslations, setRequestLocale } from 'next-intl/server'
import StarField from '@/components/StarField'
import CompatibilityChecker from '@/components/CompatibilityChecker'
import { getAllSigns } from '@/lib/zodiacData'
import { buildMetadata, pageGraph, pageDates, absoluteUrl } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageDates from '@/components/PageDates'
import JsonLd from '@/components/JsonLd'
import ShareBar from '@/components/ShareBar'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return buildMetadata({ locale, path: '/compatibility', title: t('compatibilityTitle'), description: t('compatibilityDescription'), page: 'compatibility' })
}

export default async function CompatibilityPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('compatibility')
  const terms = await getTranslations('terms')
  const signs = getAllSigns(locale)
  const meta = await getTranslations('meta')
  const nav = await getTranslations('nav')
  const crumbs = [{ name: nav('home'), path: '' }, { name: nav('compatibility'), path: '/compatibility' }]
  const graph = pageGraph({ locale, path: '/compatibility', page: 'compatibility', title: meta('compatibilityTitle'), description: meta('compatibilityDescription'), crumbs })

  const pairings = [
    { sign1: 'aries', sign2: 'leo', score: 95, label: t('pairFire') },
    { sign1: 'taurus', sign2: 'cancer', score: 90, label: t('pairNurturing') },
    { sign1: 'gemini', sign2: 'libra', score: 95, label: t('pairIntellectual') },
    { sign1: 'scorpio', sign2: 'pisces', score: 95, label: t('pairMystic') },
  ]

  return (
    <>
      <JsonLd data={graph} />
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d0221 0%, #1a0533 50%, #2d1066 100%)',
          paddingTop: 80,
          minHeight: '50vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StarField count={60} />
        <div className="container py-5 text-center" style={{ position: 'relative', zIndex: 2 }}>
          <div className="d-flex justify-content-center"><Breadcrumbs crumbs={crumbs} /></div>
          <span className="badge-gold mb-3 d-inline-block">
            <i className="fas fa-heart me-1" aria-hidden="true" /> {t('badge')}
          </span>
          <h1 className="hero-title mb-3">
            {t('titleStart')} <span className="shimmer-text">{t('titleHighlight')}</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 540, margin: '0 auto' }}>
            {t('subtitle')}
          </p>
          <PageDates dates={pageDates('compatibility', locale)} />
        </div>
      </section>

      {/* Checker */}
      <section className="section-dark py-5" aria-labelledby="calc-title">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="cosmic-card-glass p-4 p-md-5 rounded-4">
                <div className="text-center mb-4">
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💞</div>
                  <h2 id="calc-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem' }}>
                    {t('calcTitleStart')} <span className="shimmer-text">{t('calcTitleHighlight')}</span>
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    {t('calcSubtitle')}
                  </p>
                </div>
                <CompatibilityChecker />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Famous Pairings */}
      <section className="section-accent py-5" aria-labelledby="pairings-title">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title" id="pairings-title">{t('pairingsTitleStart')} <span className="shimmer-text">{t('pairingsTitleHighlight')}</span></h2>
            <div className="section-divider" />
            <p style={{ color: 'var(--color-text-muted)' }}>{t('pairingsSubtitle')}</p>
          </div>
          <div className="row g-4">
            {pairings.map(({ sign1, sign2, score, label }) => {
              const s1 = signs.find(s => s.slug === sign1)
              const s2 = signs.find(s => s.slug === sign2)
              return (
                <div className="col-md-6 col-lg-3" key={label}>
                  <div className="cosmic-card p-4 text-center h-100">
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                      <span style={{ fontSize: '2rem' }}>{s1?.emoji}</span>
                      <span style={{ color: '#e74c3c' }}>♥</span>
                      <span style={{ fontSize: '2rem' }}>{s2?.emoji}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', marginBottom: '0.3rem', fontSize: '0.95rem' }}>
                      {s1?.name} & {s2?.name}
                    </h3>
                    <div style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                      {score}%
                    </div>
                    <div className="compatibility-meter mt-2 mb-2">
                      <div className="compatibility-fill" style={{ width: `${score}%` }} />
                    </div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Compatibility Guide */}
      <section className="section-gradient py-5" aria-labelledby="guide-title">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title" id="guide-title">{t('guideTitleStart')} <span className="shimmer-text">{t('guideTitleHighlight')}</span></h2>
            <div className="section-divider" />
          </div>
          <div className="row g-4">
            {[
              { emoji: '🔥🔥', a: 'Fire', b: 'Fire', key: 'fireFire', score: 85 },
              { emoji: '🌍🌊', a: 'Earth', b: 'Water', key: 'earthWater', score: 90 },
              { emoji: '💨💨', a: 'Air', b: 'Air', key: 'airAir', score: 80 },
              { emoji: '🔥💨', a: 'Fire', b: 'Air', key: 'fireAir', score: 88 },
              { emoji: '🌍🌍', a: 'Earth', b: 'Earth', key: 'earthEarth', score: 82 },
              { emoji: '🌊🌊', a: 'Water', b: 'Water', key: 'waterWater', score: 85 },
            ].map(({ emoji, a, b, key, score }) => ({
              emoji,
              score,
              title: `${terms(`elements.${a}`)} + ${terms(`elements.${b}`)}`,
              desc: t(key),
            })).map(({ emoji, title, desc, score }) => (
              <div className="col-md-6 col-lg-4" key={title}>
                <div className="cosmic-card p-4 h-100">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span style={{ fontSize: '1.8rem' }}>{emoji}</span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1rem', margin: 0 }}>{title}</h3>
                      <div style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.9rem' }}>{t('average', { score })}</div>
                    </div>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ShareBar url={absoluteUrl(locale, '/compatibility')} title={meta('compatibilityTitle')} />
    </>
  )
}
