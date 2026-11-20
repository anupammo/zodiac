const siteUrl = 'https://zodiac-ruddy.vercel.app'

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/offline'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
