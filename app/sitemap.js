import { getAllSlugs } from '@/lib/zodiacData'

const siteUrl = 'https://zodiac-ruddy.vercel.app'

export default function sitemap() {
  const now = new Date()
  const staticRoutes = ['', '/signs', '/horoscope', '/compatibility'].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '/horoscope' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))
  const signRoutes = getAllSlugs().map((slug) => ({
    url: `${siteUrl}/signs/${slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }))
  return [...staticRoutes, ...signRoutes]
}
