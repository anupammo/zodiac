import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getAllSlugs, getSignBySlug, getAllSigns } from '@/lib/zodiacData'
import { getDailyHoroscope } from '@/lib/dailyHoroscope'
import { buildMetadata, pageGraph, pageDates, absoluteUrl } from '@/lib/seo'
import { siteUrl } from '@/lib/site'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageDates from '@/components/PageDates'
import JsonLd from '@/components/JsonLd'
import ShareBar from '@/components/ShareBar'

const ogImage = (slug) => `${siteUrl}/og/${slug}.png`
import StarField from '@/components/StarField'
import ZodiacCard from '@/components/ZodiacCard'

// Regenerate hourly so "Today's Horoscope" follows the calendar.
export const revalidate = 3600

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const sign = getSignBySlug(slug, locale)
  if (!sign) return { title: t('notFoundTitle') }
  return buildMetadata({
    locale, path: `/signs/${slug}`, page: 'sign', type: 'article',
    title: t('signTitle', { name: sign.name }),
    description: t('signDescription', { name: sign.name, dates: sign.dates.tropical }),
    image: ogImage(slug), imageAlt: sign.name,
  })
}

export default async function SignPage({ params }) {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const sign = getSignBySlug(slug, locale)
  if (!sign) notFound()
  const t = await getTranslations('sign')
  const terms = await getTranslations('terms')
  const nav = await getTranslations('nav')
  const meta = await getTranslations('meta')
  const path = `/signs/${slug}`
  const title = meta('signTitle', { name: sign.name })
  const description = meta('signDescription', { name: sign.name, dates: sign.dates.tropical })
  const crumbs = [{ name: nav('home'), path: '' }, { name: nav('signs'), path: '/signs' }, { name: sign.name, path }]
  const graph = pageGraph({
    locale, path, page: 'sign', title, description, crumbs, image: ogImage(slug),
    article: { articleSection: nav('signs'), about: { '@type': 'Thing', name: sign.name } },
  })
  const dates = pageDates('sign', locale)

  const horoscope = getDailyHoroscope(slug, new Date(), locale)
  const allSigns = getAllSigns(locale)
  const idx = allSigns.findIndex((s) => s.slug === slug)
  const otherSigns = Array.from({ length: 6 }, (_, i) => allSigns[(idx + 1 + i) % allSigns.length])
  const compatibleSigns = sign.compatibility.map(s => getSignBySlug(s, locale)).filter(Boolean)
  const element = terms(`elements.${sign.element}`)
  const planet = terms(`planets.${sign.planet}`)
  const quality = terms(`qualities.${sign.quality}`)

  const elementEmoji = { Fire: '🔥', Earth: '🌍', Air: '💨', Water: '🌊' }

  const stats = [
    { icon: 'fa-circle-dot', label: t('rulingPlanet'), value: planet },
    { icon: 'fa-layer-group', label: t('element'), value: `${elementEmoji[sign.element]} ${element}` },
    { icon: 'fa-shapes', label: t('quality'), value: quality },
    { icon: 'fa-gem', label: t('birthstone'), value: sign.stone },
    { icon: 'fa-calendar', label: t('dates'), value: sign.dates.tropical },
    { icon: 'fa-dice', label: t('luckyDay'), value: sign.luckyDay },
  ]

  return (
    <article>
      <JsonLd data={graph} />
      {/* Hero */}
      <header
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
              <Breadcrumbs crumbs={crumbs} />

              <div className="d-flex align-items-center gap-3 mb-3">
                <span style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.6))' }} aria-hidden="true">
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
                  {elementEmoji[sign.element]} {element}
                </span>
                <span className="badge-gold">
                  <i className="fas fa-circle-dot me-1" style={{ fontSize: '0.7rem' }} aria-hidden="true" />
                  {planet}
                </span>
                <span className="badge-cosmic">{quality}</span>
              </div>
              <PageDates dates={dates} />
            </div>

            <div className="col-lg-5">
              <div className="cosmic-card p-4">
                <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1.2rem', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {t('overview')}
                </h2>
                <dl className="row g-3 mb-0">
                  {stats.map(({ icon, label, value }) => (
                    <div className="col-6" key={label}>
                      <div style={{ background: 'rgba(212,175,55,0.05)', borderRadius: 12, padding: '0.75rem', border: '1px solid rgba(212,175,55,0.1)', height: '100%' }}>
                        <i className={`fas ${icon} mb-1 d-block`} style={{ color: 'var(--color-gold)', fontSize: '0.9rem' }} aria-hidden="true" />
                        <dt style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>{label}</dt>
                        <dd style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)', fontWeight: 600, margin: 0 }}>{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="section-dark py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">

              {/* Traits */}
              <section className="mb-5" aria-labelledby="traits">
                <h2 id="traits" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                  <i className="fas fa-sparkles me-2" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                  {t('traits')}
                </h2>
                <div className="section-divider" style={{ margin: '0.5rem 0 1.5rem' }} />
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="cosmic-card p-4 h-100">
                      <h3 style={{ color: '#2ecc71', fontFamily: 'var(--font-heading)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        <i className="fas fa-plus-circle me-2" aria-hidden="true" />
                        {t('strengths')}
                      </h3>
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
                      <h3 style={{ color: '#e74c3c', fontFamily: 'var(--font-heading)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        <i className="fas fa-minus-circle me-2" aria-hidden="true" />
                        {t('challenges')}
                      </h3>
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
              </section>

              {/* Life Sections */}
              {[
                { icon: 'fa-heart', title: t('love'), color: '#e74c3c', content: sign.love },
                { icon: 'fa-briefcase', title: t('career'), color: 'var(--color-gold)', content: sign.career },
                { icon: 'fa-heartbeat', title: t('health'), color: '#2ecc71', content: sign.health },
              ].map(({ icon, title, color, content }) => (
                <section className="mb-5" key={title} aria-labelledby={`sec-${icon}`}>
                  <h2 id={`sec-${icon}`} style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                    <i className={`fas ${icon} me-2`} style={{ color }} aria-hidden="true" />
                    {title}
                  </h2>
                  <div className="section-divider" style={{ margin: '0.5rem 0 1.5rem' }} />
                  <div className="cosmic-card p-4">
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, margin: 0 }}>{content}</p>
                  </div>
                </section>
              ))}

              {/* Today's Horoscope */}
              {horoscope && (
                <section className="mb-5" aria-labelledby="today">
                  <h2 id="today" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                    <i className="fas fa-moon me-2" style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
                    {t('today')}
                  </h2>
                  <div className="section-divider" style={{ margin: '0.5rem 0 1.5rem' }} />
                  <div className="cosmic-card p-4">
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      <time dateTime={horoscope.date}>
                        {new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${horoscope.date}T00:00:00Z`))}
                      </time>
                    </p>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                      {horoscope.daily.general}
                    </p>
                    <Link href="/horoscope" className="btn btn-cosmic btn-sm px-4">
                      <i className="fas fa-arrow-right me-2" aria-hidden="true" />
                      {t('fullHoroscope')}
                    </Link>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="col-lg-4">
              {/* Compatible Signs */}
              <div className="cosmic-card p-4 mb-4">
                <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1.2rem', fontSize: '1.25rem' }}>
                  <i className="fas fa-heart me-2" aria-hidden="true" />
                  {t('bestMatches')}
                </h2>
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
                  {t('fullChart')}
                </Link>
              </div>

              {/* Lucky Info */}
              <div className="cosmic-card p-4 mb-4">
                <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '1.2rem', fontSize: '1.25rem' }}>
                  <i className="fas fa-star me-2" aria-hidden="true" />
                  {t('lucky')}
                </h2>
                {[
                  { label: t('luckyNumbers'), value: sign.luckyNumbers.join(', '), icon: 'fa-hashtag' },
                  { label: t('luckyDay'), value: sign.luckyDay, icon: 'fa-calendar-check' },
                  { label: t('luckyColor'), value: sign.color, icon: 'fa-palette', isColor: true },
                  { label: t('birthstone'), value: sign.stone, icon: 'fa-gem' },
                ].map(({ label, value, icon, isColor }) => (
                  <div key={label} className="d-flex align-items-center gap-3 mb-3">
                    <i className={`fas ${icon}`} style={{ color: 'var(--color-gold)', width: 16, textAlign: 'center' }} aria-hidden="true" />
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
                <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.75rem', fontSize: '1.25rem' }}>{t('findTitle')}</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {t('findText', { name: sign.name })}
                </p>
                <Link href="/" className="btn btn-gold btn-sm px-4" style={{ color: '#0d0221' }}>
                  <i className="fas fa-magic me-2" aria-hidden="true" />
                  {t('checkMySign')}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <ShareBar url={absoluteUrl(locale, path)} title={title} />

      {/* Other Signs */}
      <section className="section-accent py-5" aria-labelledby="other-signs">
        <div className="container">
          <h2 className="section-title mb-2" id="other-signs">{t('otherSigns')}</h2>
          <div className="section-divider" />
          <ul className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3 mt-2 list-unstyled">
            {otherSigns.map(s => (
              <li className="col" key={s.slug}>
                <ZodiacCard sign={s} />
              </li>
            ))}
          </ul>
          <div className="text-center mt-4">
            <Link href="/signs" className="btn btn-outline-cosmic px-4">
              <i className="fas fa-th-large me-2" aria-hidden="true" />
              {t('viewAll')}
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
