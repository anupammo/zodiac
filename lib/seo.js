// SEO helpers: page dates, Next.js metadata and schema.org JSON-LD.
// Every page gets its metadata and structured data from here so titles, URLs,
// dates and languages can never drift apart between <head>, JSON-LD and the sitemap.
import { routing, ogLocales } from '@/i18n/routing'
import { siteUrl, localePath, alternatesFor } from '@/lib/site'

export const SITE_NAME = 'ZodiacSign'
const ORG_ID = `${siteUrl}/#organization`
const WEBSITE_ID = `${siteUrl}/#website`
const LOGO = `${siteUrl}/maskable_icon_x512.png`
export const DEFAULT_OG_IMAGE = `${siteUrl}/og/default.png`

// ── Dates ────────────────────────────────────────────────────────────────────
// published: when the page first went live (from git history of the original site).
// modified:  bump the date whenever a page's content materially changes.
// Pages listed in DAILY_PAGES carry a reading that changes every day, so their
// dateModified is the current day (they are regenerated hourly via ISR).
const PAGES = {
  home:          { published: '2022-11-22', modified: '2026-11-22' },
  signs:         { published: '2024-04-09', modified: '2026-11-22' },
  sign:          { published: '2023-08-27', modified: '2026-11-22' },
  horoscope:     { published: '2026-04-18', modified: '2026-11-22' },
  compatibility: { published: '2026-04-18', modified: '2026-11-22' },
  about:         { published: '2026-11-22', modified: '2026-11-22' },
  privacy:       { published: '2026-11-22', modified: '2026-11-22' },
  terms:         { published: '2026-11-22', modified: '2026-11-22' },
}
// A translation can't be older than the day its language launched.
const LOCALE_LAUNCH = { en: '2022-11-22', hi: '2026-11-20', bn: '2026-11-22' }
const DAILY_PAGES = new Set(['horoscope', 'sign'])

const maxDate = (a, b) => (a > b ? a : b)
const toIso = (day) => `${day}T00:00:00+05:30`

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

// Returns ISO 8601 datetimes with timezone, as schema.org and Google expect.
export function pageDates(page, locale, now = new Date()) {
  const p = PAGES[page]
  const published = maxDate(p.published, LOCALE_LAUNCH[locale] || p.published)
  let modified = maxDate(p.modified, published)
  if (DAILY_PAGES.has(page)) modified = maxDate(modified, todayKey(now))
  return { published: toIso(published), modified: toIso(modified) }
}

export const absoluteUrl = (locale, path = '') => {
  const p = localePath(locale, path)
  return `${siteUrl}${p === '/' ? '' : p}` || siteUrl
}

// ── <head> metadata ─────────────────────────────────────────────────────────
export function buildMetadata({ locale, path = '', title, absoluteTitle = false, description, page, type = 'website', image = DEFAULT_OG_IMAGE, imageAlt }) {
  const url = absoluteUrl(locale, path)
  const dates = page ? pageDates(page, locale) : null
  const ogTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt || title }]
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      images,
      ...(type === 'article' && dates ? { publishedTime: dates.published, modifiedTime: dates.modified } : {}),
    },
    twitter: { card: 'summary_large_image', title: ogTitle, description, images: [image] },
  }
}

// ItemList of links, e.g. the 12 sign pages on /signs.
export function itemList(locale, items) {
  return {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: absoluteUrl(locale, it.path) })),
  }
}

// ── JSON-LD ─────────────────────────────────────────────────────────────────
const organization = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: siteUrl,
  logo: { '@type': 'ImageObject', url: LOGO, width: 512, height: 512 },
})

const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: siteUrl,
  name: SITE_NAME,
  inLanguage: routing.locales,
  publisher: { '@id': ORG_ID },
})

function breadcrumbList(locale, crumbs, url) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(locale, c.path),
    })),
  }
}

/**
 * Full @graph for a page: Organization, WebSite, the page itself
 * (WebPage / CollectionPage / AboutPage …), optional Article, and BreadcrumbList.
 * `crumbs` is [{ name, path }] from Home to the current page.
 */
export function pageGraph({ locale, path = '', page, pageType = 'WebPage', title, description, crumbs = [], image = DEFAULT_OG_IMAGE, article, mainEntity }) {
  const url = absoluteUrl(locale, path)
  const { published, modified } = pageDates(page, locale)
  const webPage = {
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
    datePublished: published,
    dateModified: modified,
    ...(crumbs.length > 1 ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(mainEntity ? { mainEntity } : {}),
  }
  const graph = [organization(), website(), webPage]
  if (article) {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: title.slice(0, 110),
      description,
      image: [image],
      inLanguage: locale,
      datePublished: published,
      dateModified: modified,
      author: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl(locale, '/about') },
      publisher: { '@id': ORG_ID },
      mainEntityOfPage: { '@id': `${url}#webpage` },
      isPartOf: { '@id': WEBSITE_ID },
      ...(article.about ? { about: article.about } : {}),
      ...(article.articleSection ? { articleSection: article.articleSection } : {}),
    })
  }
  if (crumbs.length > 1) graph.push(breadcrumbList(locale, crumbs, url))
  return { '@context': 'https://schema.org', '@graph': graph }
}
