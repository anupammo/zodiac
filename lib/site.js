import { routing } from '@/i18n/routing'

export const siteUrl = 'https://zodiac-ruddy.vercel.app'

// URL path for a page in a given locale (English has no prefix).
export function localePath(locale, path = '') {
  const clean = path === '/' ? '' : path
  return locale === routing.defaultLocale ? clean || '/' : `/${locale}${clean}`
}

// canonical + hreflang alternates for page metadata.
export function alternatesFor(locale, path = '') {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, localePath(l, path)]))
  languages['x-default'] = localePath(routing.defaultLocale, path)
  return { canonical: localePath(locale, path), languages }
}
