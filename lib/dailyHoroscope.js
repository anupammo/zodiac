// Date-seeded horoscope composer.
// Produces a different, stable reading for every sign on every day (same text for
// everyone on the same date), with zero API cost. This is the interim engine until
// the transit-based / AI-assisted pipeline in docs/ROADMAP.md replaces it.
import zodiacData from './zodiacData'
import horoscopeData from './horoscopeData'

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

const openers = [
  '{planet} sets the tone for your day, {name}.',
  'With {planet} guiding you, {name}, today rewards a clear intention.',
  'The sky leans in your favour today, {name}.',
  'Today asks you to slow down and listen, {name}.',
  '{name}, your {element} energy is running strong today.',
  'A quieter, reflective mood suits you today, {name}.',
  'Momentum is building around you, {name}.',
  '{planet} highlights what truly matters to you today, {name}.',
]

const pools = {
  general: [
    'Small choices made early in the day carry more weight than usual.',
    'An unfinished task finally finds its moment — clear it and feel lighter.',
    'Someone from your past may resurface with useful news.',
    'Trust the instinct that keeps returning; it is pointing somewhere real.',
    'A change of routine, even a small one, refreshes your perspective.',
    'Be generous with your time, but protect your energy.',
    'Clarity arrives once you put your thoughts into words.',
    'A practical decision now saves you stress later in the week.',
    'You are more persuasive than you realise — use it kindly.',
    'Let go of one expectation and watch the day open up.',
    'An unexpected invitation is worth saying yes to.',
    'Patience with a slow-moving situation pays off sooner than you think.',
  ],
  love: [
    'An honest, simple message means more than a grand gesture today.',
    'Listening closely earns you a moment of real closeness.',
    'Singles may feel a spark in a familiar place with a new face.',
    'Shared laughter repairs what serious talk could not.',
    'Give your partner space and they will come back closer.',
    'A thoughtful surprise lands perfectly this evening.',
    'Old feelings ask to be acknowledged — be gentle with them.',
    'Confidence is your most attractive quality right now.',
    'Plan something together; anticipation strengthens your bond.',
    'Say what you appreciate out loud — it matters more than you think.',
  ],
  career: [
    'Focus on one priority and the rest falls into place.',
    'A colleague offers support you did not ask for — accept it.',
    'Review numbers twice before signing or sending anything important.',
    'Your quiet consistency is being noticed by the right people.',
    'A creative approach solves a problem that logic alone could not.',
    'Good day to ask for feedback; it will be useful, not harsh.',
    'Avoid impulsive spending; a better option appears soon.',
    'Networking feels natural today — follow up on a recent contact.',
    'Organise your workspace and your thinking will follow.',
    'An idea you shelved deserves a second look.',
  ],
  health: [
    'Hydration and an early night do more for you than any shortcut.',
    'A walk outdoors resets both body and mind.',
    'Stretch regularly if you spend long hours seated today.',
    'Your body asks for nourishing, simple food.',
    'Breathing exercises calm a restless mind quickly.',
    'Move in a way that feels joyful rather than forced.',
    'Limit screen time before bed for deeper rest.',
    'Notice tension in your shoulders and consciously release it.',
  ],
  weekly: [
    'The first half of the week favours planning; the second half favours action.',
    'Mid-week brings a conversation that shifts your perspective.',
    'Relationships deepen when you make time for unhurried connection.',
    'A financial matter resolves more easily than expected.',
    'Creativity peaks around the weekend — make room for it.',
    'An obligation you have been dreading turns out to be rewarding.',
    'Rest is productive this week; do not skip it.',
    'Collaboration beats going solo on a key project.',
  ],
}

const colors = ['Red', 'Gold', 'Emerald', 'Royal Blue', 'Silver', 'Violet', 'White', 'Orange', 'Turquoise', 'Rose Pink', 'Indigo', 'Saffron']
const stones = ['Ruby', 'Emerald', 'Pearl', 'Amethyst', 'Citrine', 'Sapphire', 'Opal', 'Garnet', 'Topaz', 'Moonstone', 'Turquoise', 'Coral']

function fill(template, sign) {
  return template
    .replace(/\{name\}/g, sign.name)
    .replace(/\{planet\}/g, sign.planet)
    .replace(/\{element\}/g, sign.element.toLowerCase())
}

export function getDailyHoroscope(slug, date = new Date()) {
  const sign = zodiacData[slug]
  const base = horoscopeData[slug]
  if (!sign || !base) return null

  const key = dateKey(date)
  const rand = mulberry32(hashString(`${slug}|${key}`))

  const general = [fill(pick(rand, openers), sign), ...pickMany(rand, pools.general, 2)].join(' ')
  const love = pickMany(rand, pools.love, 2).join(' ')
  const career = pickMany(rand, pools.career, 2).join(' ')
  const health = pickMany(rand, pools.health, 2).join(' ')

  const weekRand = mulberry32(hashString(`${slug}|${isoWeekKey(date)}`))
  const weekly = pickMany(weekRand, pools.weekly, 3).join(' ')

  return {
    date: key,
    daily: {
      general,
      love,
      career,
      health,
      luckyColor: pick(rand, colors),
      luckyNumber: 1 + Math.floor(rand() * 99),
      luckyStone: pick(rand, stones),
      mood: pick(rand, ['Focused', 'Playful', 'Reflective', 'Bold', 'Calm', 'Curious', 'Romantic', 'Determined']),
    },
    weekly: `${weekly} ${base.weekly.split('. ').slice(-1)[0]}`,
    monthly: base.monthly,
  }
}
