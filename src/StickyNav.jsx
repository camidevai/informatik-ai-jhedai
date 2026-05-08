import { useState, useEffect } from 'react'
import './StickyNav.css'

const NAV_LINKS = [
  { label: 'Servicios',    id: 'servicios'  },
  { label: 'Proceso',      id: 'proceso'    },
  { label: 'Por qué elegirnos', id: 'elegirnos' },
  { label: 'Contacto',     id: 'contacto'   },
  { label: 'Equipo',       id: 'equipo'     },
]

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function StickyNav() {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`snav ${solid ? 'snav--solid' : ''}`}>
      <div className="snav-inner">

        {/* Marca */}
        <span className="snav-brand">
          InformatiK<span className="snav-brand-sep">×</span>JhedAI
        </span>

        {/* Links desktop */}
        <nav className="snav-links" aria-label="Navegación principal">
          {NAV_LINKS.map(l => (
            <button key={l.id} className="snav-link" onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href="https://calendar.app.google/dbFyNjc56vKE9WPZ9"
          target="_blank"
          rel="noopener noreferrer"
          className="snav-cta"
        >
          Agendar reunión
          <span className="snav-cta__arrow">→</span>
        </a>

        {/* Hamburguesa mobile */}
        <button
          className={`snav-burger ${menuOpen ? 'snav-burger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Drawer mobile */}
      {menuOpen && (
        <div className="snav-drawer">
          {NAV_LINKS.map(l => (
            <button
              key={l.id}
              className="snav-drawer-link"
              onClick={() => { scrollTo(l.id); setMenuOpen(false) }}
            >
              {l.label}
            </button>
          ))}
          <a
            href="https://calendar.app.google/dbFyNjc56vKE9WPZ9"
            target="_blank"
            rel="noopener noreferrer"
            className="snav-drawer-cta"
            onClick={() => setMenuOpen(false)}
          >
            Agendar reunión →
          </a>
        </div>
      )}
    </header>
  )
}
