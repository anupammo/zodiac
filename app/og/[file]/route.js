import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getAllSlugs, getSignBySlug } from '@/lib/zodiacData'

// Static 1200×630 share images: /og/default.png and /og/<sign>.png.
// The ".png" in the path keeps these URLs outside the locale middleware.
// Text is Latin-only because the built-in image font has no Devanagari/Bengali glyphs.
export const dynamic = 'force-static'

export function generateStaticParams() {
  return [{ file: 'default.png' }, ...getAllSlugs().map((slug) => ({ file: `${slug}.png` }))]
}

const size = { width: 1200, height: 630 }

async function dataUrl(path) {
  const buf = await readFile(join(process.cwd(), 'public', path))
  return `data:image/png;base64,${buf.toString('base64')}`
}

export async function GET(_req, { params }) {
  const { file } = await params
  const slug = file.replace(/\.png$/, '')
  const sign = slug === 'default' ? null : getSignBySlug(slug, 'en')
  if (slug !== 'default' && !sign) return new Response('Not found', { status: 404 })

  const art = await dataUrl(sign ? `signs/${slug}.png` : 'maskable_icon_x512.png')
  const title = sign ? sign.name : 'ZodiacSign'
  const subtitle = sign ? `${sign.dates.tropical} · ${sign.element} · ${sign.planet}` : 'Zodiac signs · Daily horoscope · Compatibility'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', alignItems: 'center', padding: '0 80px', gap: 60,
          background: 'linear-gradient(135deg, #0d0221 0%, #1a0533 50%, #2d1066 100%)', color: '#fff',
        }}
      >
        <img src={art} width={380} height={380} style={{ borderRadius: 40 }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: 28, color: '#d4af37', letterSpacing: 6, textTransform: 'uppercase' }}>
            {sign ? 'Zodiac sign' : 'Know your cosmic identity'}
          </div>
          <div style={{ fontSize: sign ? 110 : 96, fontWeight: 700, lineHeight: 1.05, marginTop: 10 }}>{title}</div>
          <div style={{ fontSize: 32, color: '#c9b8ee', marginTop: 20 }}>{subtitle}</div>
          <div style={{ fontSize: 26, color: '#d4af37', marginTop: 50 }}>ZodiacSign · English · Hindi · Bengali</div>
        </div>
      </div>
    ),
    size
  )
}
