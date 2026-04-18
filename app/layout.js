import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InstallPrompt from '@/components/InstallPrompt'

export const metadata = {
  title: {
    default: 'ZodiacSign – Know Your Cosmic Identity',
    template: '%s | ZodiacSign',
  },
  description: 'Discover your zodiac sign, daily horoscope, compatibility, and cosmic insights. Both Tropical and Sidereal zodiac systems supported.',
  keywords: ['zodiac sign', 'horoscope', 'astrology', 'zodiac compatibility', 'sidereal zodiac', 'tropical zodiac'],
  authors: [{ name: 'ZodiacSign' }],
  creator: 'ZodiacSign',
  manifest: '/manifest.json',
  metadataBase: new URL('https://zodiac-sign.vercel.app'),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
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
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zodiac-sign.vercel.app',
    siteName: 'ZodiacSign',
    title: 'ZodiacSign – Know Your Cosmic Identity',
    description: 'Discover your zodiac sign, daily horoscope, compatibility, and cosmic insights.',
    images: [{ url: '/res/gradient-galaxy-background.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZodiacSign – Know Your Cosmic Identity',
    description: 'Discover your zodiac sign, daily horoscope, and cosmic compatibility.',
  },
}

export const viewport = {
  themeColor: '#6c3fc5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <meta name="msapplication-TileColor" content="#6c3fc5" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ZodiacSign" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <InstallPrompt />
      </body>
    </html>
  )
}
