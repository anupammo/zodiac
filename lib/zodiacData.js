// Sign data = language-independent facts (here) + translated text (content/signs/<locale>.json).
// Date ranges below are the single source of truth for both the zodiac finder
// (lib/zodiacLogic.js) and the dates shown on pages.
import en from '@/content/signs/en.json'
import hi from '@/content/signs/hi.json'
import bn from '@/content/signs/bn.json'

const content = { en, hi, bn }
export const defaultLocale = 'en'

const base = {
  aries:       { symbol: '♈', emoji: '🐏', element: 'Fire',  planet: 'Mars',    quality: 'Cardinal', color: '#FF4500', luckyNumbers: [1, 9, 19],  compatibility: ['leo', 'sagittarius', 'gemini', 'aquarius'],  tropical: [[3, 21], [4, 19]],  sidereal: [[4, 15], [5, 15]] },
  taurus:      { symbol: '♉', emoji: '🐂', element: 'Earth', planet: 'Venus',   quality: 'Fixed',    color: '#228B22', luckyNumbers: [2, 6, 9],   compatibility: ['virgo', 'capricorn', 'cancer', 'pisces'],    tropical: [[4, 20], [5, 20]],  sidereal: [[5, 16], [6, 15]] },
  gemini:      { symbol: '♊', emoji: '👯', element: 'Air',   planet: 'Mercury', quality: 'Mutable',  color: '#FFD700', luckyNumbers: [3, 5, 12],  compatibility: ['libra', 'aquarius', 'aries', 'leo'],         tropical: [[5, 21], [6, 20]],  sidereal: [[6, 16], [7, 15]] },
  cancer:      { symbol: '♋', emoji: '🦀', element: 'Water', planet: 'Moon',    quality: 'Cardinal', color: '#C0C0C0', luckyNumbers: [2, 3, 15],  compatibility: ['scorpio', 'pisces', 'taurus', 'virgo'],      tropical: [[6, 21], [7, 22]],  sidereal: [[7, 16], [8, 15]] },
  leo:         { symbol: '♌', emoji: '🦁', element: 'Fire',  planet: 'Sun',     quality: 'Fixed',    color: '#FF8C00', luckyNumbers: [1, 10, 19], compatibility: ['aries', 'sagittarius', 'gemini', 'libra'],   tropical: [[7, 23], [8, 22]],  sidereal: [[8, 16], [9, 15]] },
  virgo:       { symbol: '♍', emoji: '👧', element: 'Earth', planet: 'Mercury', quality: 'Mutable',  color: '#808000', luckyNumbers: [3, 6, 15],  compatibility: ['taurus', 'capricorn', 'cancer', 'scorpio'],  tropical: [[8, 23], [9, 22]],  sidereal: [[9, 16], [10, 15]] },
  libra:       { symbol: '♎', emoji: '⚖️', element: 'Air',   planet: 'Venus',   quality: 'Cardinal', color: '#FFB6C1', luckyNumbers: [4, 6, 13],  compatibility: ['gemini', 'aquarius', 'leo', 'sagittarius'],  tropical: [[9, 23], [10, 22]], sidereal: [[10, 16], [11, 15]] },
  scorpio:     { symbol: '♏', emoji: '🦂', element: 'Water', planet: 'Pluto',   quality: 'Fixed',    color: '#8B0000', luckyNumbers: [8, 11, 18], compatibility: ['cancer', 'pisces', 'virgo', 'capricorn'],    tropical: [[10, 23], [11, 21]], sidereal: [[11, 16], [12, 15]] },
  sagittarius: { symbol: '♐', emoji: '🏹', element: 'Fire',  planet: 'Jupiter', quality: 'Mutable',  color: '#9400D3', luckyNumbers: [6, 9, 12],  compatibility: ['aries', 'leo', 'libra', 'aquarius'],         tropical: [[11, 22], [12, 21]], sidereal: [[12, 16], [1, 14]] },
  capricorn:   { symbol: '♑', emoji: '🐐', element: 'Earth', planet: 'Saturn',  quality: 'Cardinal', color: '#556B2F', luckyNumbers: [4, 8, 13],  compatibility: ['taurus', 'virgo', 'scorpio', 'pisces'],      tropical: [[12, 22], [1, 19]], sidereal: [[1, 15], [2, 12]] },
  aquarius:    { symbol: '♒', emoji: '🌊', element: 'Air',   planet: 'Uranus',  quality: 'Fixed',    color: '#00CED1', luckyNumbers: [4, 7, 11],  compatibility: ['gemini', 'libra', 'aries', 'sagittarius'],   tropical: [[1, 20], [2, 18]],  sidereal: [[2, 13], [3, 14]] },
  pisces:      { symbol: '♓', emoji: '🐟', element: 'Water', planet: 'Neptune', quality: 'Mutable',  color: '#008080', luckyNumbers: [3, 9, 12],  compatibility: ['cancer', 'scorpio', 'taurus', 'capricorn'],  tropical: [[2, 19], [3, 20]],  sidereal: [[3, 15], [4, 14]] },
}

export const signRanges = Object.entries(base).map(([slug, s]) => ({ slug, tropical: s.tropical, sidereal: s.sidereal }))

function formatMonthDay([month, day], locale) {
  // Fixed non-leap year in UTC so formatting is identical on server and client.
  return new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(2001, month - 1, day)))
}

export function formatRange([start, end], locale = defaultLocale) {
  return `${formatMonthDay(start, locale)} – ${formatMonthDay(end, locale)}`
}

function build(slug, locale) {
  const b = base[slug]
  if (!b) return null
  const text = (content[locale] || content[defaultLocale])[slug]
  return {
    slug,
    ...b,
    ...text,
    image: `/signs/${slug}-b.webp`,
    dates: { tropical: formatRange(b.tropical, locale), sidereal: formatRange(b.sidereal, locale) },
  }
}

export const getAllSlugs = () => Object.keys(base)
export const getSignBySlug = (slug, locale = defaultLocale) => build(slug, locale)
export const getAllSigns = (locale = defaultLocale) => getAllSlugs().map((slug) => build(slug, locale))
