import { signRanges } from './zodiacData'

const toValue = ([month, day]) => month * 100 + day

function inRange(value, [start, end]) {
  const s = toValue(start)
  const e = toValue(end)
  // Ranges that cross New Year (e.g. Capricorn, Dec 22 – Jan 19) wrap around.
  return s <= e ? value >= s && value <= e : value >= s || value <= e
}

export function getZodiacSign(dateString, type = 'tropical') {
  if (!dateString) return null
  // Parse YYYY-MM-DD as calendar parts. `new Date('YYYY-MM-DD')` is UTC midnight,
  // which shifts to the previous day for users west of UTC (wrong sign on cusp dates).
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(String(dateString))
  let month, day
  if (m) {
    month = Number(m[2])
    day = Number(m[3])
  } else {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return null
    month = date.getMonth() + 1
    day = date.getDate()
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) return null

  const value = month * 100 + day
  const system = type === 'sidereal' ? 'sidereal' : 'tropical'
  const match = signRanges.find((r) => inRange(value, r[system]))
  return match ? match.slug : null
}
