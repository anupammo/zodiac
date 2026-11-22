# Zodiac Platform: Product Plan & Launch Strategy

*Started 20 Nov 2026. Living document: update it at the end of every phase.*

---

## 1. The goal

Build the **daily astrology companion** that people open every morning. It has three parts:

1. **Daily**: personal horoscope, moon phase, panchang/transits, a lucky colour/number, and a short "today's energy" card that's easy to share.
2. **Wiki**: the most complete free reference for astrology in every major language: signs, planets, houses, aspects, nakshatras, Chinese zodiac, numerology, tarot, gemstones, festivals, mythology.
3. **Tools**: zodiac finder, birth chart / kundli, compatibility and guna milan, numerology, rising-sign and moon-sign calculators, transit alerts.

**North-star metric:** daily active users. **Target:** 10 lakh (1M) DAU. That's when we open the **zodiac e-commerce store** (gemstones, rudraksha, jewellery, apparel, décor, gifts), selling to an audience that already trusts us.

**One codebase, every platform:** a Next.js PWA, wrapped for Android, iOS, Windows, macOS and Linux.

---

## 2. Reality check on 10 lakh DAU

| Benchmark | Figure |
|---|---|
| Typical DAU/MAU for a daily-habit app | 20–30% |
| MAU needed for 1M DAU | **~3.5–5M** |
| Organic, well-executed path (SEO + share loops + push) | **18–30 months** |
| With paid acquisition / influencer budget | 12–18 months |

This is achievable. Astrology is one of the largest evergreen search categories, India alone accounts for hundreds of millions of horoscope searches a month, and few competitors cover multiple languages well. Three things decide whether we get there:

- **Language coverage**: Hindi, Bengali, Tamil, Telugu and Marathi users are badly served compared with English users.
- **A daily reason to return**: horoscopes that are genuinely new every day, delivered by push or WhatsApp.
- **Built-in sharing**: every reading becomes a good-looking card people send to friends.

### Milestones (set your expectations by these)

| Milestone | Target date | DAU |
|---|---|---|
| M0: Foundation live on own domain | Dec 2026 | 100+ |
| M1: Hindi + 4 Indian languages, accounts, push | Feb 2027 | 5k |
| M2: Android + iOS in stores, kundli/birth chart | Apr 2027 | 25k |
| M3: 20 languages, programmatic SEO at scale | Aug 2027 | 1 lakh |
| M4: Premium + affiliate store (validates the commerce idea) | Dec 2027 | 3 lakh |
| M5: **10 lakh DAU → own e-commerce store launch** | 2028 | 10 lakh |

> **Recommendation:** don't wait until 1M DAU to test commerce. Run **affiliate product links** from M3 onward. They cost nothing, show which products convert, and give the store a ready catalogue and demand data on day one. The full own-inventory store still launches at 1M as you planned.

---

## 3. Brand (decide this week)

The current name "ZodiacSign" on `zodiac-ruddy.vercel.app` is too generic to trademark, rank for or remember. Before any marketing:

1. **Pick a distinctive, pronounceable name** that works in Hindi and English, has no meaning in a major language that would put people off, is 2–3 syllables, and has the `.com` (or `.app`) available, plus matching Instagram, YouTube and X handles. Directions to brainstorm: celestial words (Nakshatra-, Tara-, Graha-, Astra-, Orbit-, Lumi-) or invented names (like Co-Star or Astrotalk).
2. **Register the domain and file the trademark** (India class 9/41/45, plus 35 for the future store).
3. **Brand system:** keep the existing cosmic palette (deep violet `#0d0221`, royal purple `#6c3fc5`, gold) and Cinzel + Nunito fonts. They already fit. Add a logo mark that reads well at 48 px (app icon) and on a share card.
4. **Voice:** warm, optimistic, never fear-based. **For guidance and entertainment**: never medical, financial or legal advice. This matters for app-store review, ad policy and trust.

---

## 4. Product roadmap

### Phase 0: Foundation (20 Nov – 15 Dec 2026) ← *we are here*
- [x] Restore the build: `package.json`/`next.config.js` had been moved into `misc/`, so the app couldn't build.
- [x] Fix the zodiac-finder timezone bug (users west of UTC got the wrong sign on cusp dates).
- [x] Horoscopes now change daily (date-seeded composer, free to run) instead of the same text forever.
- [x] `sitemap.xml` + `robots.txt`.
- [ ] Own domain + brand (section 3).
- [ ] Analytics (Vercel Analytics or Plausible + GA4) and Search Console.
- [x] **i18n foundation**: `next-intl`, English at existing URLs + Hindi at `/hi/…`, `hreflang` + per-language sitemap, language switcher, Devanagari font. All UI strings live in `messages/<locale>.json`.
- [x] Sign text moved to `content/signs/<locale>.json`; horoscope phrases in `content/horoscope/<locale>.js`.
- [x] Fixed the Vedic (sidereal) finder, which returned the sign *after* the correct one for most birth dates.
- [x] Bengali (`/bn`) added; every page now exists in English, Hindi and Bengali (57 pages).
- [x] Semantic HTML (landmarks, skip link, heading order, article/aside, breadcrumbs), JSON-LD with publish/modified dates, per-sign share images, share widget on every page.
- [x] About, Privacy and Terms pages in all three languages.
- [x] PWA completed: per-language manifests (app name, start page and shortcuts follow the install language), real maskable icons, current screenshots, offline page in the visitor's language listing pages available offline.
- [ ] Native-speaker review of the Hindi and Bengali copy before promoting `/hi` and `/bn`.
- [ ] Legal review of Privacy and Terms before launch.
- [ ] Dynamic OG share images per sign per day (`next/og`).
- [ ] Legal pages: privacy, terms, disclaimer, cookie consent.

### Phase 1: Daily habit (Dec 2026 – Feb 2027)
- **Real astronomy:** compute planetary positions, moon phase, sunrise/moonrise, and Vedic panchang (tithi, nakshatra, yoga, karana, rahu kaal). Use `astronomy-engine` (MIT licence). Note: Swiss Ephemeris is AGPL, so it needs a commercial licence for closed-source apps.
- **Horoscope engine v2:** turn daily transits into a structured "sky of the day", have an LLM write a reading for each sign and language from that structure, run automated checks for safety and repetition, then human spot-checks. Generate once a day per sign per language and cache it: about 12 × 20 × 3 periods ≈ 720 texts/day, which costs very little.
- **Accounts** (Google/phone OTP), saved birth details, favourite signs.
- **Notifications:** web push + daily email; WhatsApp channel and Telegram bot for India.
- Hindi, Bengali, Tamil, Telugu, Marathi.

### Phase 2: Apps and depth (Feb – Apr 2027)
- **Android/iOS** with Capacitor (reuses this codebase), native push via FCM/APNs, home-screen widget (daily card).
- **Windows/macOS/Linux** with Tauri, plus Microsoft Store via PWABuilder (fastest route).
- **Birth chart / kundli:** North/South Indian and Western wheel, houses, aspects, dasha.
- **Compatibility v2:** Western synastry + Vedic guna milan (36 points).
- Wiki expansion: 27 nakshatras, 12 houses, 9 grahas, aspects, Chinese zodiac (12 animals × 5 elements), numerology 1–9, 78 tarot cards.

### Phase 3: Scale (May – Aug 2027)
- Expand to 20 languages: en, hi, bn, ta, te, mr, gu, kn, ml, pa, ur, es, pt, fr, de, ru, ar, id, tr, ja (then zh, vi, it, th).
- **Programmatic SEO** (the biggest traffic source; see section 6).
- Community: daily polls, "what your sign says about…" quizzes.
- Performance budget: LCP < 2s on 4G, JS < 150 kB, works offline.

### Phase 4: Monetise (Sep – Dec 2027)
- Ads (AdSense → direct astrology/wellness sponsors), capped so the experience stays good.
- **Premium** (₹99–199/month or $3.99): detailed reports, ad-free, yearly forecast PDF, advanced charts.
- **Affiliate shop:** gemstones, rudraksha, crystals, zodiac jewellery, books.
- Optional later: vetted live-astrologer consultations (marketplace model).

### Phase 5: E-commerce store (at 10 lakh DAU)
- Own-brand and curated products. Sign-matched recommendations come from the user's chart ("your lucky stone this month"), which is our edge over generic stores.
- Stack: Shopify Headless or Medusa.js plus Razorpay (India) and Stripe (global). Start in India, then the US/UK/UAE.
- **Compliance:** gemstone certification (GII/IGI), no health-cure claims (Consumer Protection Act and ASCI), clear return policy.

---

## 5. Technical architecture

```
            ┌──────────── Next.js 15 (App Router) ─────────────┐
 Web/PWA ─▶ │ SSG/ISR pages · i18n routes · OG images · API     │
 Android ─▶ │ (Capacitor shell)        iOS ─▶ (Capacitor shell) │
 Desktop ─▶ │ (Tauri shell / MS Store PWA)                      │
            └───────────────┬───────────────────────────────────┘
                            │
     ┌──────────────────────┼──────────────────────────┐
 Postgres (Neon)    Daily content job (cron)     Push / Email / WhatsApp
 users, charts,     astronomy → LLM → QA →       FCM · APNs · Web Push
 saved signs        cached JSON per locale        Resend · WA Business API
```

- **Hosting:** Vercel (edge cache; ISR is cheap at scale because almost all traffic is cacheable). Costs grow with dynamic requests, so keep pages static.
- **Data model:** keep content (static, translatable, versioned in git) separate from user data (Postgres).
- **Quality:** TypeScript migration over time, Playwright smoke tests, Lighthouse CI ≥ 90.
- **Security/privacy:** birth date, time and place are personal data. Comply with India's DPDP Act 2023, GDPR and CCPA. Collect the minimum, allow deletion, no selling of data.

---

## 6. Launch and growth strategy

### 6.1 Organic search (expected to bring ~50–60% of traffic)
Page templates × languages, all generated from structured data:

| Template | Count | × 20 langs |
|---|---|---|
| Sign hub pages | 12 | 240 |
| Daily/weekly/monthly/yearly horoscope per sign | 12 × 4 | 960 (refreshed constantly) |
| Compatibility pairs ("Leo and Scorpio compatibility") | 78 | 1,560 |
| Nakshatra, planet, house, number, tarot pages | ~150 | 3,000 |
| Birthday pages ("born on 14 March") | 366 | 7,320 |
| Festivals, eclipses, retrogrades (time-bound) | ~50/yr | 1,000/yr |

That's 10k+ high-intent pages. Requirements: original text per page (not thin AI filler), schema.org markup (`FAQPage`, `Article`), and internal linking between pages.

### 6.2 Share loops (most of our free growth)
- A daily share card per sign (1080×1920 for Stories, 1200×630 for WhatsApp/X) with the brand and URL on it.
- "Send to your Scorpio friend" compatibility invites. The recipient must enter their birth date, which turns them into a user.
- Prominent WhatsApp share button. In India, WhatsApp is the main way content spreads.

### 6.3 Short video and social (daily, automated)
- Make 12 short videos a day (one per sign) from the same daily content: YouTube Shorts, Instagram Reels, Moj/Josh. Text-to-video templates keep production cost near zero.
- Channels in Hindi + English first, then regional languages.
- Collaborate with micro-influencers (10k–100k followers) in the astrology, spirituality and lifestyle niches. Pay per install, not flat fees.

### 6.4 App store optimisation
- Localised store listings in all 20 languages, screenshots that show the daily card, and a 15-second preview video.
- **Apple review risk:** guideline 4.3 rejects generic "template" astrology apps. Differentiate with real charts, multiple languages, widgets and personalisation.

### 6.5 Launch sequence
1. **Soft launch (Dec 2026):** own domain, English + Hindi, friends and family plus astrology Reddit/Quora answers. Fix the funnel.
2. **Public web launch (Jan 2027):** Product Hunt, Indian startup communities, press note for Makar Sankranti.
3. **App launch (Apr 2027):** time it with a big astrological event and run an influencer burst.
4. **Language waves (monthly):** each new language gets its own mini-launch with local influencers.
5. **Seasonal peaks:** New Year forecasts, Diwali/Navratri, Mercury retrogrades, eclipses. Publish content 2–3 weeks ahead.

### 6.6 Retention
- Push at the user's chosen time (default 7:30 am local), streaks, "your week ahead" every Sunday.
- **Day-1/7/30 retention targets:** 40% / 20% / 12%.

---

## 7. KPIs to review weekly

| Area | Metric | Phase 1 target |
|---|---|---|
| Growth | DAU, MAU, DAU/MAU | 5k DAU, 25% |
| Acquisition | Organic sessions, shares per DAU, K-factor | 0.15 shares/DAU |
| Retention | D1 / D7 / D30 | 40 / 20 / 12 % |
| Engagement | Sessions/user/day, push opt-in | 1.4, 45% |
| Quality | Lighthouse, Core Web Vitals, crash-free | ≥ 90, all green, 99.5% |
| Revenue (Phase 4+) | ARPDAU, premium conversion, affiliate CTR | ₹0.10, 1.5%, 3% |

---

## 8. Bootstrapped team and budget

| Stage | People | Monthly spend (approx.) |
|---|---|---|
| Phase 0–1 | Founder + AI-assisted dev; 1 part-time content/translation reviewer | ₹10–25k (domain, Vercel Pro, LLM API, email) |
| Phase 2–3 | + 1 mobile/frontend dev, + 1 social/video creator, freelance translators per language | ₹1.5–3 lakh |
| Phase 4–5 | + growth marketer, + customer support, + commerce ops/sourcing | Funded by ads, premium and affiliate revenue, or a seed round at ~1 lakh DAU |

At 1 lakh DAU with real retention data, you're in a strong position to raise a seed round if you want to speed up the store launch.

---

## 9. Next 14 days

| # | Task | Owner |
|---|---|---|
| 1 | Choose brand name, buy domain, reserve social handles | Founder |
| 2 | Point domain at Vercel, update `siteUrl` in `app/layout.js`, `app/sitemap.js`, `app/robots.js` | Dev |
| 3 | Submit sitemap to Google Search Console + Bing | Dev |
| 4 | Add analytics (privacy policy + disclaimer ✅; update the policy when analytics is added) | Dev |
| 5 | ~~Set up `next-intl` with `en` + `hi`, extract all strings~~ ✅ | Dev |
| 6 | ~~Convert sign data to JSON content files~~ ✅ | Dev |
| 7 | ~~OG share image per sign + share buttons~~ ✅ (per-day images still to do) | Dev |
| 8 | Start Instagram + YouTube channels; post one daily card per sign | Founder/creator |
| 9 | Prototype the transit calculation (`astronomy-engine`) for horoscope engine v2 | Dev |
| 10 | Weekly KPI review ritual (every Monday) | Founder |

---

## Appendix: adding a language

1. Add the code to `locales`, `localeNames` and `ogLocales` in `i18n/routing.js`.
2. Copy and translate (keeping the keys): `messages/en.json`, `content/signs/en.json`, `content/horoscope/en.js` and `content/pages/en.json`.
3. Register the new files in `lib/zodiacData.js` (`content`), `lib/dailyHoroscope.js` (`pools`, `terms`) and `components/InfoPage.js` (`content`).
4. Add the launch date to `LOCALE_LAUNCH` in `lib/seo.js` (it becomes the translation's `datePublished`).
5. If the script needs it, add a font in `SCRIPT_FONTS` (`app/[locale]/layout.js`) and an `html[lang='<code>']` rule in `app/globals.css`.
6. Run `npm run build`, then the audit (all pages × all languages).

## Appendix: SEO conventions

- **Dates:** every page's `datePublished` / `dateModified` comes from `PAGES` in `lib/seo.js`. The same values feed the JSON-LD, the visible "Published / Updated" line and the sitemap `lastmod`. **When you materially change a page's content, bump its `modified` date there.** Never bump dates without a real change: Google treats fake freshness as spam. Horoscope and sign pages update daily automatically because their reading changes daily.
- **Structured data:** one JSON-LD `@graph` per page (Organization, WebSite, the page, BreadcrumbList, plus Article on sign pages), built by `pageGraph()`.
- **Share images:** `/og/<sign>.png` and `/og/default.png` are generated at build time (`app/og/[file]/route.js`).
- **Every content page** ends with the shared `ShareBar`; the horoscope also has an inline "share this reading".
