import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getAllSigns } from '@/lib/zodiacData'

function FooterLinks({ links }) {
  return (
    <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className="footer-link">
            <i className="fas fa-chevron-right me-2" style={{ fontSize: '0.65rem' }} aria-hidden="true" />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const locale = useLocale()
  const signs = getAllSigns(locale)

  return (
    <footer className="footer-cosmic">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <p className="d-flex align-items-center gap-2 mb-3">
              <span style={{ color: 'var(--color-gold)', fontSize: '1.5rem' }} aria-hidden="true">✦</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-text-primary)' }}>
                ZodiacSign
              </span>
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.8' }}>{t('about')}</p>
          </div>

          <nav className="col-6 col-lg-2" aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="footer-heading">{t('explore')}</h2>
            <FooterLinks
              links={[
                { href: '/', label: nav('findMySign') },
                { href: '/signs', label: nav('signs') },
                { href: '/horoscope', label: nav('horoscope') },
                { href: '/compatibility', label: nav('compatibility') },
              ]}
            />
          </nav>

          <nav className="col-6 col-lg-3" aria-labelledby="footer-signs">
            <h2 id="footer-signs" className="footer-heading">{t('zodiacSigns')}</h2>
            <ul className="row g-1 list-unstyled mb-0">
              {signs.map((sign) => (
                <li className="col-6" key={sign.slug}>
                  <Link href={`/signs/${sign.slug}`} className="footer-link d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>
                    <span aria-hidden="true">{sign.emoji}</span>
                    {sign.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-lg-3" aria-labelledby="footer-info">
            <h2 id="footer-info" className="footer-heading">{t('info')}</h2>
            <FooterLinks
              links={[
                { href: '/about', label: t('aboutLink') },
                { href: '/privacy', label: t('privacy') },
                { href: '/terms', label: t('terms') },
              ]}
            />
          </nav>
        </div>

        <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
            {t('rights', { year: new Date().getFullYear() })} {t('madeWith')}
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: '0.4rem 0 0' }}>
            <small>{t('disclaimer')}</small>
          </p>
        </div>
      </div>
    </footer>
  )
}
