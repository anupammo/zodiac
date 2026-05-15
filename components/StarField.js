'use client'
import { useState, useEffect, useRef } from 'react'

function generateStars(count = 80) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    maxOpacity: Math.random() * 0.6 + 0.2,
  }))
}

export default function StarField({ count = 80 }) {
  const [stars, setStars] = useState([])

  useEffect(() => {
    setStars(generateStars(count))
  }, [count])

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
            '--max-opacity': star.maxOpacity,
          }}
        />
      ))}
    </div>
  )
}
