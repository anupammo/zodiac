const assets = [
  "./",
  "./index.html",
  "./css/zodiac-sign.css",
  "./js/zodiac-sign.js",
  "./js/app.js",
  "./res/aquarius.webp",
  "./res/aries.webp",
  "./res/cancer.webp",
  "./res/capricorn.webp",
  "./res/gemini.webp",
  "./res/thinking-zodiac.webp",
  "./res/leo.webp",
  "./res/libra.webp",
  "./res/pisces.webp",
  "./res/sagittarius.webp",
  "./res/scorpio.webp",
  "./res/taurus.webp",
  "./res/virgo.webp",
]

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})