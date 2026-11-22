import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata, pageGraph, pageDates, todayKey } from '@/lib/seo'
import HoroscopeView from '@/components/HoroscopeView'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageDates from '@/components/PageDates'
import JsonLd from '@/components/JsonLd'
import ShareBar from '@/components/ShareBar'
import { absoluteUrl } from '@/lib/seo'

// Regenerate hourly so the server-rendered reading follows the calendar.
export const revalidate = 3600

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return buildMetadata({ locale, path: '/horoscope', title: t('horoscopeTitle'), description: t('horoscopeDescription'), page: 'horoscope' })
}

export default async function HoroscopePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const meta = await getTranslations('meta')
  const nav = await getTranslations('nav')
  const crumbs = [{ name: nav('home'), path: '' }, { name: nav('horoscope'), path: '/horoscope' }]
  const graph = pageGraph({ locale, path: '/horoscope', page: 'horoscope', title: meta('horoscopeTitle'), description: meta('horoscopeDescription'), crumbs })

  return (
    <>
      <JsonLd data={graph} />
      <HoroscopeView
        initialDate={todayKey()}
        heroExtra={
          <div className="d-flex flex-column align-items-center mt-3">
            <Breadcrumbs crumbs={crumbs} />
            <PageDates dates={pageDates('horoscope', locale)} />
          </div>
        }
      />
      <ShareBar url={absoluteUrl(locale, '/horoscope')} title={meta('horoscopeTitle')} />
    </>
  )
}
