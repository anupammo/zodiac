import { getTranslations, setRequestLocale } from 'next-intl/server'
import { alternatesFor } from '@/lib/site'
import HoroscopeView from '@/components/HoroscopeView'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('horoscopeTitle'),
    description: t('horoscopeDescription'),
    alternates: alternatesFor(locale, '/horoscope'),
  }
}

export default async function HoroscopePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <HoroscopeView />
}
