import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata, pageGraph, pageDates, absoluteUrl } from '@/lib/seo'
import en from '@/content/pages/en.json'
import hi from '@/content/pages/hi.json'
import bn from '@/content/pages/bn.json'
import StarField from '@/components/StarField'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageDates from '@/components/PageDates'
import JsonLd from '@/components/JsonLd'
import ShareBar from '@/components/ShareBar'

const content = { en, hi, bn }
const PAGE_TYPES = { about: 'AboutPage', privacy: 'WebPage', terms: 'WebPage' }

// Shared builder for the About / Privacy / Terms pages.
export function infoMetadata(page) {
  return async function generateMetadata({ params }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'meta' })
    return buildMetadata({ locale, path: `/${page}`, title: t(`${page}Title`), description: t(`${page}Description`), page })
  }
}

export function infoPage(page) {
  return async function InfoPage({ params }) {
    const { locale } = await params
    setRequestLocale(locale)
    const meta = await getTranslations('meta')
    const nav = await getTranslations('nav')
    const body = (content[locale] || content.en)[page]
    const title = meta(`${page}Title`)
    const path = `/${page}`
    const crumbs = [{ name: nav('home'), path: '' }, { name: title, path }]
    const graph = pageGraph({ locale, path, page, pageType: PAGE_TYPES[page], title, description: meta(`${page}Description`), crumbs })

    return (
      <>
        <JsonLd data={graph} />
        <article>
          <header className="hero-section" style={{ minHeight: '40vh', paddingTop: 80 }}>
            <StarField count={40} />
            <div className="container py-5" style={{ position: 'relative', zIndex: 2, maxWidth: 820 }}>
              <Breadcrumbs crumbs={crumbs} />
              <h1 className="hero-title mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{title}</h1>
              <p className="hero-subtitle mb-0">{body.lead}</p>
              <PageDates dates={pageDates(page, locale)} />
            </div>
          </header>
          <div className="section-dark py-5">
            <div className="container prose-cosmic" style={{ maxWidth: 820 }}>
              {body.sections.map((s, i) => (
                <section key={i} aria-labelledby={`${page}-s${i}`}>
                  <h2 id={`${page}-s${i}`}>{s.h}</h2>
                  {s.list && (
                    <ul>
                      {s.list.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  )}
                  {(s.p || []).map((para, j) => <p key={j}>{para}</p>)}
                </section>
              ))}
            </div>
          </div>
        </article>
        <ShareBar url={absoluteUrl(locale, path)} title={title} />
      </>
    )
  }
}
