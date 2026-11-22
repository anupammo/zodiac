import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getAllSigns } from '@/lib/zodiacData'
import { buildMetadata, pageGraph, pageDates, absoluteUrl, itemList } from '@/lib/seo'
import ZodiacCard from '@/components/ZodiacCard'
import StarField from '@/components/StarField'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageDates from '@/components/PageDates'
import JsonLd from '@/components/JsonLd'
import ShareBar from '@/components/ShareBar'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return buildMetadata({ locale, path: '/signs', title: t('signsTitle'), description: t('signsDescription'), page: 'signs' })
}

export default async function SignsPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('signs')
  const terms = await getTranslations('terms')
  const nav = await getTranslations('nav')
  const meta = await getTranslations('meta')
  const signs = getAllSigns(locale)
  const crumbs = [{ name: nav('home'), path: '' }, { name: nav('signs'), path: '/signs' }]
  const graph = pageGraph({
    locale, path: '/signs', page: 'signs', pageType: 'CollectionPage',
    title: meta('signsTitle'), description: meta('signsDescription'), crumbs,
    mainEntity: itemList(locale, signs.map((s) => ({ name: s.name, path: `/signs/${s.slug}` }))),
  })

  const elementGroups = [
    { element: 'Fire', emoji: '🔥', color: '#ff6b35', signs: signs.filter(s => s.element === 'Fire') },
    { element: 'Earth', emoji: '🌍', color: '#6dbf6d', signs: signs.filter(s => s.element === 'Earth') },
    { element: 'Air', emoji: '💨', color: '#7fd8d8', signs: signs.filter(s => s.element === 'Air') },
    { element: 'Water', emoji: '🌊', color: '#6aadff', signs: signs.filter(s => s.element === 'Water') },
  ]

  return (
    <>
      <JsonLd data={graph} />
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
          <div className="d-flex justify-content-center"><Breadcrumbs crumbs={crumbs} /></div>
          <span className="badge-gold mb-3 d-inline-block">
            <i className="fas fa-star me-1" aria-hidden="true" /> {t('badge')}
          </span>
          <h1 className="hero-title mb-3">
            {t('titleStart')} <span className="shimmer-text">{t('titleHighlight')}</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 560, margin: '0 auto' }}>
            {t('subtitle')}
          </p>
          <PageDates dates={pageDates('signs', locale)} />
        </div>
      </section>

      {/* Signs by element */}
      <section className="section-dark py-5">
        <div className="container">
          {elementGroups.map(({ element, emoji, color, signs: groupSigns }) => (
            <section key={element} className="mb-5" aria-labelledby={`element-${element}`}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <span style={{ fontSize: '1.8rem' }} aria-hidden="true">{emoji}</span>
                <div>
                  <h2 id={`element-${element}`} style={{ fontFamily: 'var(--font-heading)', color, margin: 0, fontSize: '1.4rem' }}>
                    {t('elementSigns', { element: terms(`elements.${element}`) })}
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.85rem' }}>
                    {t(`${element.toLowerCase()}Desc`)}
                  </p>
                </div>
              </div>
              <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 list-unstyled">
                {groupSigns.map(sign => (
                  <li className="col" key={sign.slug}>
                    <ZodiacCard sign={sign} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-accent py-5" aria-labelledby="find-cta">
        <div className="container text-center">
          <h2 id="find-cta" style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
            {t('dontKnow')}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            {t('dontKnowText')}
          </p>
          <Link href="/" className="btn btn-cosmic px-5">
            <i className="fas fa-magic me-2" aria-hidden="true" />
            {nav('findMySign')}
          </Link>
        </div>
      </section>

      <ShareBar url={absoluteUrl(locale, '/signs')} title={meta('signsTitle')} />
    </>
  )
}
