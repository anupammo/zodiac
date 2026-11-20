import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'hi']
export const localeNames = { en: 'English', hi: 'हिन्दी' }

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  // English keeps today's URLs (/signs/leo); other languages get a prefix (/hi/signs/leo).
  localePrefix: 'as-needed',
})
