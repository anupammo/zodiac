export default function ZodiacWheel() {
  const signs = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓']
  const names = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']
  const r = 140

  return (
    <div className="zodiac-wheel-container">
      <svg
        viewBox="0 0 320 320"
        className="zodiac-wheel w-100"
        aria-label="Zodiac wheel"
        style={{ maxWidth: 320 }}
      >
        {/* Outer ring */}
        <circle cx="160" cy="160" r="155" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
        <circle cx="160" cy="160" r="120" fill="none" stroke="rgba(108,63,197,0.3)" strokeWidth="1" />
        <circle cx="160" cy="160" r="80" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />

        {/* Background */}
        <circle cx="160" cy="160" r="155" fill="rgba(13,2,33,0.6)" />

        {/* Sign segments */}
        {signs.map((symbol, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const x = 160 + r * Math.cos(angle)
          const y = 160 + r * Math.sin(angle)
          const textAngle = i * 30 - 90

          return (
            <g key={i}>
              <line
                x1="160"
                y1="160"
                x2={160 + 155 * Math.cos(angle)}
                y2={160 + 155 * Math.sin(angle)}
                stroke="rgba(212,175,55,0.1)"
                strokeWidth="0.5"
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="rgba(212,175,55,0.8)"
                style={{ fontFamily: 'serif' }}
              >
                {symbol}
              </text>
            </g>
          )
        })}

        {/* Center decoration */}
        <circle cx="160" cy="160" r="50" fill="rgba(108,63,197,0.15)" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
        <text x="160" y="155" textAnchor="middle" fontSize="22" fill="#d4af37">✦</text>
        <text x="160" y="175" textAnchor="middle" fontSize="8" fill="rgba(212,175,55,0.6)" letterSpacing="1">
          ZODIAC
        </text>
      </svg>
    </div>
  )
}
