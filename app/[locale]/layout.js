import '../globals.css'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { siteUrl, alternatesFor } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InstallPrompt from '@/components/InstallPrompt'

// Load only the script font the current language needs.
const SCRIPT_FONTS = { hi: 'Noto+Sans+Devanagari', bn: 'Noto+Sans+Bengali' }
const fontHref = (locale) =>
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Nunito:wght@300;400;600;700' +
  (SCRIPT_FONTS[locale] ? `&family=${SCRIPT_FONTS[locale]}:wght@400;600;700` : '') +
  '&display=swap'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  // Pages override these; they cover any page that sets no metadata of its own.
  const { openGraph, twitter } = buildMetadata({ locale, title: t('ogTitle'), absoluteTitle: true, description: t('ogDescription') })
  const defaults = { openGraph, twitter }
  return {
  applicationName: 'ZodiacSign',
  title: {
    default: t('defaultTitle'),
    template: '%s | ZodiacSign',
  },
  description: t('description'),
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  authors: [{ name: 'ZodiacSign' }],
  creator: 'ZodiacSign',
  publisher: 'ZodiacSign',
  manifest: `/manifests/${locale}.webmanifest`,
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
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  ...defaults,
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontHref(locale)} rel="stylesheet" />
        {/* Tiny subsets so the other languages' names render in the language menu */}
        {locale !== 'hi' && <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&text=%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80&display=swap" rel="stylesheet" />}
        {locale !== 'bn' && <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali&text=%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE&display=swap" rel="stylesheet" />}
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
          <a href="#main" className="skip-link">{messages.nav.skip}</a>
          <header>
            <Navbar />
          </header>
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
          <InstallPrompt />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
