import { getAllSlugs } from '@/lib/zodiacData'
import { routing } from '@/i18n/routing'
import { siteUrl, localePath } from '@/lib/site'

export default function sitemap() {
  const now = new Date()
  const pages = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/signs', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/horoscope', changeFrequency: 'daily', priority: 0.8 },
    { path: '/compatibility', changeFrequency: 'weekly', priority: 0.8 },
    ...getAllSlugs().map((slug) => ({ path: `/signs/${slug}`, changeFrequency: 'daily', priority: 0.9 })),
  ]

  // One entry per page per language, each listing all its translations (hreflang).
  return pages.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${siteUrl}${localePath(l, path) === '/' ? '' : localePath(l, path)}`])
    )
    return routing.locales.map((locale) => ({
      url: languages[locale],
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages },
    }))
  })
}
