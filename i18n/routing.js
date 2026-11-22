import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'hi', 'bn']
export const localeNames = { en: 'English', hi: 'हिन्दी', bn: 'বাংলা' }
// BCP 47 / Open Graph locale for each language.
export const ogLocales = { en: 'en_US', hi: 'hi_IN', bn: 'bn_IN' }

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  // English keeps today's URLs (/signs/leo); other languages get a prefix (/hi/signs/leo).
  localePrefix: 'as-needed',
})
