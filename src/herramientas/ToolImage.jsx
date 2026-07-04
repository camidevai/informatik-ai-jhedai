import { useState } from 'react'

/**
 * Imagen representativa de la herramienta.
 * Estrategia de respaldo robusta:
 *   1. Logo/favicon del dominio (servicio de Google, tamaño 128).
 *   2. Si falla o no hay dominio -> mosaico con la inicial y degradado de marca.
 *
 * Incluye lazy loading nativo (loading="lazy") y decodificación asíncrona.
 */

// Degradados deterministas para el respaldo (según la inicial) — siempre en marca.
const GRADIENTS = [
  'linear-gradient(135deg, #6C3DFF 0%, #9D7DFF 100%)',
  'linear-gradient(135deg, #4A1FD6 0%, #7C5Cff 100%)',
  'linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)',
  'linear-gradient(135deg, #5B2BE0 0%, #A78BFA 100%)',
]

function gradientFor(name = '') {
  const code = name.charCodeAt(0) || 0
  return GRADIENTS[code % GRADIENTS.length]
}

export default function ToolImage({ name, domain }) {
  const [failed, setFailed] = useState(false)
  const initial = (name || '?').trim().charAt(0).toUpperCase()

  const showFallback = failed || !domain
  const src = domain
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`
    : ''

  return (
    <div className="tool-card__media" style={{ background: gradientFor(name) }}>
      <span className="tool-card__glow" aria-hidden="true" />
      {showFallback ? (
        <span className="tool-card__initial" aria-hidden="true">
          {initial}
        </span>
      ) : (
        <span className="tool-card__logo-tile">
          <img
            className="tool-card__logo"
            src={src}
            alt={`Logo de ${name}`}
            loading="lazy"
            decoding="async"
            width="64"
            height="64"
            onError={() => setFailed(true)}
          />
        </span>
      )}
    </div>
  )
}
