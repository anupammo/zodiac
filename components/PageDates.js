import { useTranslations, useLocale } from 'next-intl'

const fmt = (iso, locale) =>
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(iso))

// Visible published / updated dates, matching datePublished / dateModified in JSON-LD.
export default function PageDates({ dates, className = '' }) {
  const t = useTranslations('dates')
  const locale = useLocale()
  return (
    <p className={`page-dates ${className}`}>
      <span>
        {t('published')}: <time dateTime={dates.published}>{fmt(dates.published, locale)}</time>
      </span>
      {dates.modified !== dates.published && (
        <span>
          {' · '}
          {t('updated')}: <time dateTime={dates.modified}>{fmt(dates.modified, locale)}</time>
        </span>
      )}
    </p>
  )
}
