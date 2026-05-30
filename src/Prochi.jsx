import './Prochi.css'

/**
 * PROCHI — mascota oficial de PROCHECHANDO AI.
 * Carita sonriente con 5 "pelos"/destellos que pulsan (el central más alto),
 * evocando el concepto de marca: "Mientras carga, construimos el futuro".
 *
 * props:
 *   size      → tamaño en px (alto/ancho)
 *   animated  → activa el pulso de los pelos (default true)
 *   wordmark  → muestra "PROCHECHANDO AI" bajo la carita (default false)
 */
export default function Prochi({ size = 120, animated = true, wordmark = false, className = '' }) {
  // 5 pelos radiales sobre la cabeza (el central, más largo)
  const sparks = [
    { angle: -42, color: 'var(--brand-light)', delay: 0,    len: 20 },
    { angle: -21, color: 'var(--brand)',       delay: 0.12, len: 26 },
    { angle:   0, color: 'var(--brand)',       delay: 0.24, len: 30 },
    { angle:  21, color: 'var(--gray-tech)',   delay: 0.36, len: 25 },
    { angle:  42, color: 'var(--brand-light)', delay: 0.48, len: 20 },
  ]

  return (
    <span className={`prochi-lockup ${className}`}>
      <svg
        className={`prochi ${animated ? 'prochi--animated' : ''}`}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        role="img"
        aria-label="PROCHI — PROCHECHANDO AI"
      >
        <defs>
          <linearGradient id="prochiFace" x1="40" y1="60" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--brand)" />
            <stop offset="1" stopColor="var(--brand-light)" />
          </linearGradient>
        </defs>

        {/* 5 pelos / destellos de carga */}
        <g className="prochi__sparks">
          {sparks.map((s, i) => (
            <line
              key={i}
              x1="100" y1="40" x2="100" y2={40 - s.len}
              stroke={s.color}
              strokeWidth="9"
              strokeLinecap="round"
              transform={`rotate(${s.angle} 100 70)`}
              style={{ '--spark-delay': `${s.delay}s` }}
            />
          ))}
        </g>

        {/* Cabeza */}
        <circle cx="100" cy="120" r="58" stroke="url(#prochiFace)" strokeWidth="11" />

        {/* Ojos felices (sonrisa) */}
        <path d="M75 114 q9 11 18 0"  stroke="var(--ink)" strokeWidth="9" strokeLinecap="round" />
        <path d="M107 114 q9 11 18 0" stroke="var(--ink)" strokeWidth="9" strokeLinecap="round" />
      </svg>

      {wordmark && (
        <span className="prochi-wordmark">PROCHECHANDO <b>AI</b></span>
      )}
    </span>
  )
}
