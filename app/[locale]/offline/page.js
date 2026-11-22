import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { localePath } from '@/lib/site'
import { getAllSigns } from '@/lib/zodiacData'
import StarField from '@/components/StarField'
import ReloadButton from '@/components/ReloadButton'
import OfflinePages from '@/components/OfflinePages'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('offlineTitle'), robots: { index: false } }
}

// The service worker stores ONE copy of this page and shows it for any page
// that can't load offline. The URL in the address bar is still the page the
// visitor asked for, so this script reads its language prefix (/hi, /bn) and
// shows the matching block before anything paints. English is the default.
const pickLanguage = `(function(){var m=/^\\/(hi|bn)(\\/|$)/.exec(location.pathname);var l=m?m[1]:'en';var d=document.documentElement;d.lang=l;d.setAttribute('data-offline-lang',l);d.classList.add('offline-page');})();`

export default async function OfflinePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  const blocks = []
  const labels = {}
  for (const l of routing.locales) {
    const t = await getTranslations({ locale: l, namespace: 'offline' })
    const nav = await getTranslations({ locale: l, namespace: 'nav' })
    const meta = await getTranslations({ locale: l, namespace: 'meta' })
    const pwa = await getTranslations({ locale: l, namespace: 'pwa' })
    blocks.push({ l, t: { titleStart: t('titleStart'), titleHighlight: t('titleHighlight'), text: t('text'), noConnection: t('noConnection'), home: t('home'), retry: t('retry') } })
    labels[l] = {
      title: pwa('offlineAvailable'), none: pwa('offlineNone'),
      home: nav('home'), signs: nav('signs'), horoscope: nav('horoscope'), compatibility: nav('compatibility'),
      about: meta('aboutTitle'), privacy: meta('privacyTitle'), terms: meta('termsTitle'),
      signNames: Object.fromEntries(getAllSigns(l).map((s) => [s.slug, s.name])),
    }
  }

  return (
    <section className="hero-section offline-hero" style={{ minHeight: '100vh', background: 'var(--gradient-hero)' }}>
      <script dangerouslySetInnerHTML={{ __html: pickLanguage }} />
      <StarField count={60} />
      <div className="container text-center py-5" style={{ position: 'relative', zIndex: 2 }}>
        <div className="animate-float mb-4" style={{ fontSize: '5rem' }} aria-hidden="true">🌌</div>
        {blocks.map(({ l, t }) => (
          <div key={l} lang={l} className="offline-block">
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
              {t.titleStart} <span className="shimmer-text">{t.titleHighlight}</span>
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.8 }}>{t.text}</p>
            <div className="p-4 rounded-4 d-inline-block mb-4" style={{ background: 'rgba(108,63,197,0.15)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.9rem' }}>
                <i className="fas fa-wifi me-2" style={{ color: '#e74c3c' }} aria-hidden="true" />
                {t.noConnection}
              </p>
            </div>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <a href={localePath(l, '')} className="btn btn-cosmic px-4">
                <i className="fas fa-home me-2" aria-hidden="true" />
                {t.home}
              </a>
              <ReloadButton label={t.retry} />
            </div>
          </div>
        ))}
        <OfflinePages labels={labels} />
      </div>
    </section>
  )
}
