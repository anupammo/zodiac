const tropicalDates = [
  { slug: 'capricorn', start: [1, 1], end: [1, 19] },
  { slug: 'aquarius', start: [1, 20], end: [2, 18] },
  { slug: 'pisces', start: [2, 19], end: [3, 20] },
  { slug: 'aries', start: [3, 21], end: [4, 19] },
  { slug: 'taurus', start: [4, 20], end: [5, 20] },
  { slug: 'gemini', start: [5, 21], end: [6, 20] },
  { slug: 'cancer', start: [6, 21], end: [7, 22] },
  { slug: 'leo', start: [7, 23], end: [8, 22] },
  { slug: 'virgo', start: [8, 23], end: [9, 22] },
  { slug: 'libra', start: [9, 23], end: [10, 22] },
  { slug: 'scorpio', start: [10, 23], end: [11, 21] },
  { slug: 'sagittarius', start: [11, 22], end: [12, 21] },
  { slug: 'capricorn2', slug2: 'capricorn', start: [12, 22], end: [12, 31] },
]

const siderealDates = [
  { slug: 'capricorn', start: [1, 1], end: [1, 14] },
  { slug: 'aquarius', start: [1, 15], end: [2, 12] },
  { slug: 'pisces', start: [2, 13], end: [3, 14] },
  { slug: 'aries', start: [3, 15], end: [4, 14] },
  { slug: 'taurus', start: [4, 15], end: [5, 15] },
  { slug: 'gemini', start: [5, 16], end: [6, 15] },
  { slug: 'cancer', start: [6, 16], end: [7, 15] },
  { slug: 'leo', start: [7, 16], end: [8, 15] },
  { slug: 'virgo', start: [8, 16], end: [9, 15] },
  { slug: 'libra', start: [9, 16], end: [10, 15] },
  { slug: 'scorpio', start: [10, 16], end: [11, 15] },
  { slug: 'sagittarius', start: [11, 16], end: [12, 15] },
  { slug: 'capricorn2', slug2: 'capricorn', start: [12, 16], end: [12, 31] },
]

function isDateInRange(month, day, start, end) {
  const dateVal = month * 100 + day
  const startVal = start[0] * 100 + start[1]
  const endVal = end[0] * 100 + end[1]
  return dateVal >= startVal && dateVal <= endVal
}

export function getZodiacSign(dateString, type = 'tropical') {
  if (!dateString) return null
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return null

  const month = date.getMonth() + 1
  const day = date.getDate()

  const ranges = type === 'sidereal' ? siderealDates : tropicalDates

  for (const range of ranges) {
    if (isDateInRange(month, day, range.start, range.end)) {
      return range.slug2 || range.slug
    }
  }

  return 'capricorn'
}

export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
