import { getAllSlugs } from '@/lib/zodiacData'
import { routing } from '@/i18n/routing'
import { pageDates, absoluteUrl } from '@/lib/seo'

// One entry per page per language. lastModified matches the page's
// dateModified in JSON-LD; each entry lists all its translations (hreflang).
export default function sitemap() {
  const pages = [
    { path: '', page: 'home', changeFrequency: 'weekly', priority: 1 },
    { path: '/signs', page: 'signs', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/horoscope', page: 'horoscope', changeFrequency: 'daily', priority: 0.9 },
    { path: '/compatibility', page: 'compatibility', changeFrequency: 'monthly', priority: 0.8 },
    ...getAllSlugs().map((slug) => ({ path: `/signs/${slug}`, page: 'sign', changeFrequency: 'daily', priority: 0.9 })),
    { path: '/about', page: 'about', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/privacy', page: 'privacy', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/terms', page: 'terms', changeFrequency: 'yearly', priority: 0.2 },
  ]

  return pages.flatMap(({ path, page, changeFrequency, priority }) => {
    const languages = Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, path)]))
    languages['x-default'] = absoluteUrl(routing.defaultLocale, path)
    return routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: pageDates(page, locale).modified,
      changeFrequency,
      priority,
      alternates: { languages },
    }))
  })
}
