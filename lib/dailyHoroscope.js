// Date-seeded horoscope composer.
// Produces a different, stable reading for every sign on every day (same text for
// everyone on the same date), with zero API cost. This is the interim engine until
// the transit-based / AI-assisted pipeline in docs/ROADMAP.md replaces it.
import { getSignBySlug, defaultLocale } from './zodiacData'
import enPools from '@/content/horoscope/en'
import hiPools from '@/content/horoscope/hi'
import bnPools from '@/content/horoscope/bn'
import enMessages from '@/messages/en.json'
import hiMessages from '@/messages/hi.json'
import bnMessages from '@/messages/bn.json'

const pools = { en: enPools, hi: hiPools, bn: bnPools }
const terms = { en: enMessages.terms, hi: hiMessages.terms, bn: bnMessages.terms }

function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickMany(rand, arr, n) {
  const copy = arr.slice()
  const out = []
  while (out.length < n && copy.length) {
    out.push(copy.splice(Math.floor(rand() * copy.length), 1)[0])
  }
  return out
}

const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)]

// Local calendar date as YYYY-MM-DD (avoids the UTC shift of toISOString()).
export function dateKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function isoWeekKey(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return `${d.getUTCFullYear()}-W${week}`
}

function fill(template, sign, t) {
  return template
    .replace(/\{name\}/g, sign.name)
    .replace(/\{planet\}/g, t.planets[sign.planet])
    .replace(/\{element\}/g, t.elements[sign.element].toLowerCase())
}

export function getDailyHoroscope(slug, date = new Date(), locale = defaultLocale) {
  const sign = getSignBySlug(slug, locale)
  if (!sign) return null
  const p = pools[locale] || pools[defaultLocale]
  const t = terms[locale] || terms[defaultLocale]

  // Seeds use the slug + date only, so every language gets the same reading.
  const key = dateKey(date)
  const rand = mulberry32(hashString(`${slug}|${key}`))

  const general = [fill(pick(rand, p.openers), sign, t), ...pickMany(rand, p.general, 2)].join(' ')
  const love = pickMany(rand, p.love, 2).join(' ')
  const career = pickMany(rand, p.career, 2).join(' ')
  const health = pickMany(rand, p.health, 2).join(' ')
  const luckyColor = pick(rand, p.colors)
  const luckyNumber = 1 + Math.floor(rand() * 99)
  const luckyStone = pick(rand, p.stones)
  const mood = pick(rand, p.moods)

  const weekRand = mulberry32(hashString(`${slug}|${isoWeekKey(date)}`))
  const weekly = pickMany(weekRand, p.weekly, 3).join(' ')

  const monthRand = mulberry32(hashString(`${slug}|${key.slice(0, 7)}`))
  const monthly = pickMany(monthRand, p.monthly, 4).join(' ')

  return {
    date: key,
    daily: { general, love, career, health, luckyColor, luckyNumber, luckyStone, mood },
    weekly,
    monthly,
  }
}
