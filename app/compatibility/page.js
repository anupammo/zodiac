'use client'
import { useState } from 'react'
import StarField from '@/components/StarField'
import CompatibilityChecker from '@/components/CompatibilityChecker'
import { getAllSigns } from '@/lib/zodiacData'

export default function CompatibilityPage() {
  const signs = getAllSigns()

  const pairings = [
    { sign1: 'aries', sign2: 'leo', score: 95, label: 'Fire Power Duo' },
    { sign1: 'taurus', sign2: 'cancer', score: 90, label: 'Nurturing Bond' },
    { sign1: 'gemini', sign2: 'libra', score: 95, label: 'Intellectual Match' },
    { sign1: 'scorpio', sign2: 'pisces', score: 95, label: 'Mystic Union' },
  ]

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d0221 0%, #1a0533 50%, #2d1066 100%)',
          paddingTop: 80,
          minHeight: '50vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StarField count={60} />
        <div className="container py-5 text-center" style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge-gold mb-3 d-inline-block">
            <i className="fas fa-heart me-1" /> Cosmic Compatibility
          </span>
          <h1 className="hero-title mb-3">
            Discover Your <span className="shimmer-text">Cosmic Match</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 540, margin: '0 auto' }}>
            The stars reveal which signs harmonize best with yours. Explore compatibility in love,
            friendship, and work through the wisdom of the zodiac.
          </p>
        </div>
      </section>

      {/* Checker */}
      <section className="section-dark py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="cosmic-card-glass p-4 p-md-5 rounded-4">
                <div className="text-center mb-4">
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💞</div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem' }}>
                    Compatibility <span className="shimmer-text">Calculator</span>
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    Select two signs to reveal your cosmic connection
                  </p>
                </div>
                <CompatibilityChecker />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Famous Pairings */}
      <section className="section-accent py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Legendary <span className="shimmer-text">Cosmic Pairings</span></h2>
            <div className="section-divider" />
            <p style={{ color: 'var(--color-text-muted)' }}>The most compatible sign combinations in the zodiac</p>
          </div>
          <div className="row g-4">
            {pairings.map(({ sign1, sign2, score, label }) => {
              const s1 = signs.find(s => s.slug === sign1)
              const s2 = signs.find(s => s.slug === sign2)
              return (
                <div className="col-md-6 col-lg-3" key={label}>
                  <div className="cosmic-card p-4 text-center h-100">
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                      <span style={{ fontSize: '2rem' }}>{s1?.emoji}</span>
                      <span style={{ color: '#e74c3c' }}>♥</span>
                      <span style={{ fontSize: '2rem' }}>{s2?.emoji}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', marginBottom: '0.3rem', fontSize: '0.95rem' }}>
                      {s1?.name} & {s2?.name}
                    </div>
                    <div style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                      {score}%
                    </div>
                    <div className="compatibility-meter mt-2 mb-2">
                      <div className="compatibility-fill" style={{ width: `${score}%` }} />
                    </div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Compatibility Guide */}
      <section className="section-gradient py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Understanding <span className="shimmer-text">Compatibility</span></h2>
            <div className="section-divider" />
          </div>
          <div className="row g-4">
            {[
              { emoji: '🔥🔥', title: 'Fire + Fire', desc: 'Intense and passionate. An explosive combination full of energy, ambition, and creativity, but prone to clashes.', score: 85 },
              { emoji: '🌍🌊', title: 'Earth + Water', desc: 'Deeply nurturing. Earth provides stability while Water brings emotional depth. A grounding and fulfilling bond.', score: 90 },
              { emoji: '💨💨', title: 'Air + Air', desc: 'Mentally stimulating. Great for conversation and shared ideas, but may lack emotional depth and grounding.', score: 80 },
              { emoji: '🔥💨', title: 'Fire + Air', desc: 'Exciting and dynamic. Air fuels Fire\'s enthusiasm. Great chemistry and lots of fun adventures together.', score: 88 },
              { emoji: '🌍🌍', title: 'Earth + Earth', desc: 'Steady and reliable. Share the same values and approach to life. Building lasting bonds through shared goals.', score: 82 },
              { emoji: '🌊🌊', title: 'Water + Water', desc: 'Deeply intuitive. Powerful emotional connection and understanding, but may struggle with boundaries.', score: 85 },
            ].map(({ emoji, title, desc, score }) => (
              <div className="col-md-6 col-lg-4" key={title}>
                <div className="cosmic-card p-4 h-100">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span style={{ fontSize: '1.8rem' }}>{emoji}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1rem' }}>{title}</div>
                      <div style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.9rem' }}>{score}% average</div>
                    </div>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
