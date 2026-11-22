import { routing, localeNames } from '@/i18n/routing'
import en from '@/messages/en.json'
import hi from '@/messages/hi.json'
import bn from '@/messages/bn.json'
import { localePath } from '@/lib/site'

// One web app manifest per language: /manifests/en.webmanifest, /hi…, /bn…
// All share the same `id`, so the browser treats them as one app; the language
// you install from decides the app's name, start page and shortcuts.
export const dynamic = 'force-static'
const messages = { en, hi, bn }

export function generateStaticParams() {
  return routing.locales.map((l) => ({ file: `${l}.webmanifest` }))
}

const shot = (locale, name, sizes, form_factor, label) => ({
  src: `/screenshots/${locale}-${name}.webp`, sizes, type: 'image/webp', form_factor, label,
})

export async function GET(_req, { params }) {
  const { file } = await params
  const locale = file.replace(/\.webmanifest$/, '')
  if (!routing.locales.includes(locale)) return new Response('Not found', { status: 404 })
  const t = messages[locale].pwa
  const home = localePath(locale, '')
  const url = (p) => localePath(locale, p)

  const manifest = {
    id: '/',
    name: t.name,
    short_name: t.shortName,
    description: t.description,
    lang: locale,
    dir: 'ltr',
    start_url: `${home}?source=pwa`,
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#0d0221',
    theme_color: '#0d0221',
    categories: ['lifestyle', 'entertainment', 'education'],
    prefer_related_applications: false,
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    screenshots: [
      shot(locale, 'home', '824x1830', 'narrow', t.shotHome),
      shot(locale, 'horoscope', '824x1830', 'narrow', t.shotHoroscope),
      shot(locale, 'sign', '824x1830', 'narrow', t.shotSign),
      shot(locale, 'wide', '1920x1080', 'wide', t.shotWide),
    ],
    shortcuts: [
      { name: t.scFind, short_name: t.scFind, description: t.scFindDesc, url: `${home}?source=pwa-shortcut`, icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }] },
      { name: t.scHoroscope, short_name: t.scHoroscope, description: t.scHoroscopeDesc, url: `${url('/horoscope')}?source=pwa-shortcut`, icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }] },
      { name: t.scCompat, short_name: t.scCompat, description: t.scCompatDesc, url: `${url('/compatibility')}?source=pwa-shortcut`, icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }] },
    ],
  }
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
