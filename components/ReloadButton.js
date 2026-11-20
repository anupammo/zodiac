'use client'
import { useTranslations } from 'next-intl'

export default function ReloadButton() {
  const t = useTranslations('offline')
  return (
    <button
      onClick={() => window.location.reload()}
      className="btn btn-outline-cosmic px-4"
    >
      <i className="fas fa-redo me-2" />
      {t('retry')}
    </button>
  )
}
