import '../globals.css'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { siteUrl, alternatesFor } from '@/lib/site'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InstallPrompt from '@/components/InstallPrompt'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
  applicationName: 'ZodiacSign',
  title: {
    default: t('defaultTitle'),
    template: '%s | ZodiacSign',
  },
  description: t('description'),
  keywords: ['zodiac sign', 'horoscope', 'astrology', 'zodiac compatibility', 'sidereal zodiac', 'tropical zodiac'],
  authors: [{ name: 'ZodiacSign' }],
  creator: 'ZodiacSign',
  publisher: 'ZodiacSign',
  manifest: '/manifest.json',
  metadataBase: new URL(siteUrl),
  alternates: alternatesFor(locale, ''),
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ZodiacSign',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/apple-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/maskable_icon_x512.png', color: '#6c3fc5' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: locale === 'hi' ? 'hi_IN' : 'en_US',
    url: siteUrl,
    siteName: 'ZodiacSign',
    title: t('ogTitle'),
    description: t('ogDescription'),
    images: [{ url: '/res/gradient-galaxy-background.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: t('ogTitle'),
    description: t('ogDescription'),
    images: ['/res/gradient-galaxy-background.jpg'],
  },
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6c3fc5' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0221' },
  ],
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Nunito:wght@300;400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet" />
        <meta name="application-name" content="ZodiacSign" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#6c3fc5" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ZodiacSign" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <InstallPrompt />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
