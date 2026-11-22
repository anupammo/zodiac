import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function ZodiacCard({ sign }) {
  const terms = useTranslations('terms')
  const elementColors = {
    Fire: { bg: 'rgba(255,69,0,0.08)', border: 'rgba(255,69,0,0.2)', glow: 'rgba(255,69,0,0.3)' },
    Earth: { bg: 'rgba(34,139,34,0.08)', border: 'rgba(34,139,34,0.2)', glow: 'rgba(34,139,34,0.3)' },
    Air: { bg: 'rgba(0,206,209,0.08)', border: 'rgba(0,206,209,0.2)', glow: 'rgba(0,206,209,0.3)' },
    Water: { bg: 'rgba(30,144,255,0.08)', border: 'rgba(30,144,255,0.2)', glow: 'rgba(30,144,255,0.3)' },
  }

  const colors = elementColors[sign.element] || elementColors.Fire

  return (
    <Link href={`/signs/${sign.slug}`} className="sign-card p-3 p-md-4 h-100" style={{ background: colors.bg, borderColor: colors.border }}>
      <div className="text-center">
        <span className="sign-emoji" aria-hidden="true">{sign.emoji}</span>
        <h3 className="sign-name mb-1">{sign.name}</h3>
        <div className="sign-dates mb-2">{sign.dates.tropical}</div>
        <div className="d-flex justify-content-center gap-1 flex-wrap">
          <span
            className="element-badge"
            style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
          >
            {sign.element === 'Fire' ? '🔥' : sign.element === 'Earth' ? '🌍' : sign.element === 'Air' ? '💨' : '🌊'}
            {terms(`elements.${sign.element}`)}
          </span>
        </div>
        <p
          className="mt-2 mb-0"
          style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}
        >
          {sign.traits.positive.slice(0, 3).join(' · ')}
        </p>
      </div>
    </Link>
  )
}
