'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAllSigns } from '@/lib/zodiacData'

const compatibilityMatrix = {
  aries:       { aries: 55, taurus: 45, gemini: 85, cancer: 50, leo: 95, virgo: 55, libra: 70, scorpio: 65, sagittarius: 90, capricorn: 50, aquarius: 80, pisces: 65 },
  taurus:      { aries: 45, taurus: 75, gemini: 55, cancer: 90, leo: 60, virgo: 95, libra: 70, scorpio: 80, sagittarius: 50, capricorn: 95, aquarius: 55, pisces: 85 },
  gemini:      { aries: 85, taurus: 55, gemini: 65, cancer: 55, leo: 85, virgo: 60, libra: 95, scorpio: 55, sagittarius: 80, capricorn: 55, aquarius: 90, pisces: 60 },
  cancer:      { aries: 50, taurus: 90, gemini: 55, cancer: 70, leo: 65, virgo: 80, libra: 55, scorpio: 95, sagittarius: 50, capricorn: 80, aquarius: 50, pisces: 95 },
  leo:         { aries: 95, taurus: 60, gemini: 85, cancer: 65, leo: 65, virgo: 60, libra: 85, scorpio: 65, sagittarius: 95, capricorn: 55, aquarius: 75, pisces: 65 },
  virgo:       { aries: 55, taurus: 95, gemini: 60, cancer: 80, leo: 60, virgo: 70, libra: 60, scorpio: 85, sagittarius: 55, capricorn: 90, aquarius: 60, pisces: 75 },
  libra:       { aries: 70, taurus: 70, gemini: 95, cancer: 55, leo: 85, virgo: 60, libra: 65, scorpio: 65, sagittarius: 85, capricorn: 60, aquarius: 95, pisces: 70 },
  scorpio:     { aries: 65, taurus: 80, gemini: 55, cancer: 95, leo: 65, virgo: 85, libra: 65, scorpio: 75, sagittarius: 60, capricorn: 90, aquarius: 55, pisces: 95 },
  sagittarius: { aries: 90, taurus: 50, gemini: 80, cancer: 50, leo: 95, virgo: 55, libra: 85, scorpio: 60, sagittarius: 70, capricorn: 55, aquarius: 90, pisces: 65 },
  capricorn:   { aries: 50, taurus: 95, gemini: 55, cancer: 80, leo: 55, virgo: 90, libra: 60, scorpio: 90, sagittarius: 55, capricorn: 70, aquarius: 65, pisces: 80 },
  aquarius:    { aries: 80, taurus: 55, gemini: 90, cancer: 50, leo: 75, virgo: 60, libra: 95, scorpio: 55, sagittarius: 90, capricorn: 65, aquarius: 70, pisces: 65 },
  pisces:      { aries: 65, taurus: 85, gemini: 60, cancer: 95, leo: 65, virgo: 75, libra: 70, scorpio: 95, sagittarius: 65, capricorn: 80, aquarius: 65, pisces: 75 },
}

function getCompatibilityLabel(score) {
  if (score >= 90) return { label: 'Soulmates', color: '#d4af37' }
  if (score >= 80) return { label: 'Excellent', color: '#2ecc71' }
  if (score >= 70) return { label: 'Very Good', color: '#3498db' }
  if (score >= 60) return { label: 'Good', color: '#9b59b6' }
  if (score >= 50) return { label: 'Moderate', color: '#e67e22' }
  return { label: 'Challenging', color: '#e74c3c' }
}

export default function CompatibilityChecker({ preselected }) {
  const signs = getAllSigns()
  const [sign1, setSign1] = useState(preselected || '')
  const [sign2, setSign2] = useState('')
  const [result, setResult] = useState(null)
  const [subscores, setSubscores] = useState(null)

  useEffect(() => {
    if (result) {
      // Generate subscores once when result changes to ensure consistency
      setSubscores({
        love: Math.min(100, result.score + Math.floor(Math.random() * 10 - 5)),
        friendship: Math.min(100, result.score + Math.floor(Math.random() * 10 - 5)),
        work: Math.min(100, result.score - 5 + Math.floor(Math.random() * 10)),
      })
    }
  }, [result])

  const handleCheck = () => {
    if (!sign1 || !sign2) return
    const score = compatibilityMatrix[sign1]?.[sign2] ?? 65
    setResult({ score, ...getCompatibilityLabel(score) })
  }

  const sign1Data = signs.find(s => s.slug === sign1)
  const sign2Data = signs.find(s => s.slug === sign2)

  return (
    <div>
      <div className="row g-4 mb-4">
        {[
          { value: sign1, setter: setSign1, label: 'Your Sign' },
          { value: sign2, setter: setSign2, label: "Partner's Sign" },
        ].map(({ value, setter, label }, idx) => (
          <div className="col-12 col-md-5" key={idx}>
            <label className="form-label-cosmic d-block mb-2">
              <i className={`fas fa-${idx === 0 ? 'user' : 'heart'} me-2`} style={{ color: 'var(--color-gold)' }} />
              {label}
            </label>
            <select
              className="form-control form-control-cosmic"
              value={value}
              onChange={(e) => { setter(e.target.value); setResult(null) }}
              aria-label={label}
            >
              <option value="">Select sign…</option>
              {signs.map(s => (
                <option key={s.slug} value={s.slug}>{s.emoji} {s.name}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="col-12 col-md-2 d-flex align-items-end justify-content-center">
          <div className="text-center mb-1" style={{ color: 'var(--color-gold)', fontSize: '1.5rem' }}>✦</div>
        </div>
      </div>

      <button
        className="btn btn-cosmic w-100 py-3"
        onClick={handleCheck}
        disabled={!sign1 || !sign2}
        style={{ fontSize: '1rem' }}
      >
        <i className="fas fa-heart me-2" />
        Check Compatibility
      </button>

      {result && sign1Data && sign2Data && (
        <div className="result-card mt-4 p-4">
          <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
            <div className="text-center">
              <div style={{ fontSize: '3rem' }}>{sign1Data.emoji}</div>
              <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>{sign1Data.name}</div>
            </div>
            <div style={{ color: '#e74c3c', fontSize: '2rem' }}>♥</div>
            <div className="text-center">
              <div style={{ fontSize: '3rem' }}>{sign2Data.emoji}</div>
              <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>{sign2Data.name}</div>
            </div>
          </div>

          <div className="text-center mb-3">
            <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: result.color, fontWeight: 700 }}>
              {result.score}%
            </div>
            <div style={{ color: result.color, fontWeight: 700, fontSize: '1.1rem' }}>{result.label}</div>
          </div>

          <div className="compatibility-meter mb-2">
            <div className="compatibility-fill" style={{ width: `${result.score}%` }} />
          </div>

          {subscores && (
            <div className="row g-3 mt-3">
              {[
                { icon: 'fa-heart', label: 'Love', score: subscores.love },
                { icon: 'fa-users', label: 'Friendship', score: subscores.friendship },
                { icon: 'fa-briefcase', label: 'Work', score: subscores.work },
              ].map(({ icon, label, score: s }) => (
                <div className="col-4" key={label}>
                  <div className="text-center p-3" style={{ background: 'rgba(212,175,55,0.05)', borderRadius: 12, border: '1px solid rgba(212,175,55,0.15)' }}>
                    <i className={`fas ${icon} mb-2 d-block`} style={{ color: 'var(--color-gold)' }} />
                    <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{s}%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
