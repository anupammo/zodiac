import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

// Visible breadcrumb trail. The matching BreadcrumbList JSON-LD comes from
// pageGraph() in lib/seo.js using the same `crumbs` array.
export default function Breadcrumbs({ crumbs }) {
  const t = useTranslations('breadcrumb')
  return (
    <nav aria-label={t('label')} className="mb-3">
      <ol className="breadcrumb breadcrumb-cosmic">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <li key={c.path || 'home'} className={`breadcrumb-item${last ? ' active' : ''}`} {...(last ? { 'aria-current': 'page' } : {})}>
              {last ? c.name : <Link href={c.path || '/'}>{c.name}</Link>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
