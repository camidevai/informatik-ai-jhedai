import { useState, useEffect, useRef } from 'react'
import './FloatBtn.css'

export default function FloatBtn() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  // Cierra el menú al hacer click fuera
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="fab-wrap" ref={wrapRef}>

      {/* Mini-menú expandido */}
      <div className={`fab-menu ${open ? 'fab-menu--open' : ''}`} aria-hidden={!open}>
        <a
          href="https://calendar.app.google/dbFyNjc56vKE9WPZ9"
          target="_blank"
          rel="noopener noreferrer"
          className="fab-item fab-item--blue"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        >
          <span className="fab-item-icon">💻</span>
          <span className="fab-item-body">
            <strong>Desarrollo / Servicios</strong>
            <em>Sin costo</em>
          </span>
        </a>

        <a
          href="https://calendar.app.google/zbkAEVCiiMvgMVhK9"
          target="_blank"
          rel="noopener noreferrer"
          className="fab-item fab-item--cyan"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        >
          <span className="fab-item-icon">🤝</span>
          <span className="fab-item-body">
            <strong>Alianza estratégica</strong>
            <em>Reunión paga</em>
          </span>
        </a>
      </div>

      {/* Botón principal */}
      <button
        className={`fab-btn ${open ? 'fab-btn--open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label="Agendar una reunión"
        aria-expanded={open}
      >
        {/* Ícono calendario cuando cerrado, X cuando abierto */}
        <svg className="fab-icon fab-icon--cal" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M8 2v3M16 2v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="8" cy="14" r="1" fill="currentColor"/>
          <circle cx="12" cy="14" r="1" fill="currentColor"/>
          <circle cx="16" cy="14" r="1" fill="currentColor"/>
        </svg>
        <svg className="fab-icon fab-icon--close" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Tooltip que aparece al hover (cuando está cerrado) */}
        <span className="fab-tooltip">Agendar reunión</span>
      </button>
    </div>
  )
}
