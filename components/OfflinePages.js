'use client'
import { useEffect, useState } from 'react'

// Lists pages the service worker has cached, so offline visitors can still
// open what they've read before. Only pages in the visitor's language are shown.
const CACHE_NAMES = ['start-url', 'pages']
const SECTIONS = ['signs', 'horoscope', 'compatibility', 'about', 'privacy', 'terms']

export function offlineLang(pathname) {
  const m = /^\/(hi|bn)(\/|$)/.exec(pathname)
  return m ? m[1] : 'en'
}

export default function OfflinePages({ labels }) {
  const [state, setState] = useState(null)

  useEffect(() => {
    const lang = offlineLang(window.location.pathname)
    ;(async () => {
      const paths = new Set()
      try {
        for (const name of CACHE_NAMES) {
          if (!(await caches.has(name))) continue
          for (const req of await (await caches.open(name)).keys()) {
            const p = new URL(req.url).pathname
            if (p.includes('.') || p.startsWith('/_next') || p.endsWith('/offline')) continue
            if (offlineLang(p) === lang) paths.add(p)
          }
        }
      } catch { /* Cache API unavailable */ }
      setState({ lang, paths: [...paths].sort() })
    })()
  }, [])

  if (!state) return null
  const l = labels[state.lang]
  const label = (p) => {
    const rest = p.replace(/^\/(hi|bn)(?=\/|$)/, '') || '/'
    if (rest === '/') return l.home
    const sign = /^\/signs\/([a-z]+)$/.exec(rest)
    if (sign) return l.signNames[sign[1]] || sign[1]
    const section = rest.slice(1)
    return SECTIONS.includes(section) ? l[section] : rest
  }

  return (
    <section className="cosmic-card p-4 mt-4 mx-auto text-start" style={{ maxWidth: 520 }} aria-labelledby="offline-pages" lang={state.lang}>
      <h2 id="offline-pages" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-gold)' }}>{l.title}</h2>
      {state.paths.length ? (
        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
          {state.paths.map((p) => (
            <li key={p}>
              <a href={p} className="footer-link">
                <i className="fas fa-chevron-right me-2" style={{ fontSize: '0.65rem' }} aria-hidden="true" />
                {label(p)}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-0" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{l.none}</p>
      )}
    </section>
  )
}
