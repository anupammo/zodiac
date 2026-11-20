import { notFound } from 'next/navigation'

// Unknown paths inside a locale render app/[locale]/not-found.js (translated, with nav).
export default function CatchAll() {
  notFound()
}
