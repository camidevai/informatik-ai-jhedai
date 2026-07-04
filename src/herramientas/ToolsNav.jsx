import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../StickyNav.css'
import Prochi from '../Prochi'

const SECTIONS = [
  { label: 'Inicio',       id: 'tp-hero'     },
  { label: 'Nosotros',     id: 'tp-nosotros' },
  { label: 'Favoritas',    id: 'tp-top5'     },
  { label: 'Herramientas', id: 'tp-catalogo' },
  { label: 'Aprende',      id: 'tp-educacion' },
]

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const HomeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

/** Header fijo de la página /herramientas: navega por secciones + CTA a Inicio (/). */
export default function ToolsNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="snav snav--solid snav--tools">
      <div className="snav-inner">
        <Link to="/" className="snav-brand" aria-label="Ir a Inicio">
          <Prochi size={26} animated={false} className="snav-brand__logo" />
          PROCHECHANDO<b className="snav-brand-sep">AI</b>
        </Link>

        <nav className="snav-links" aria-label="Navegación de herramientas">
          {SECTIONS.map((s) => (
            <button key={s.id} className="snav-link" onClick={() => scrollTo(s.id)}>
              {s.label}
            </button>
          ))}
        </nav>

        <Link to="/" className="snav-cta">
          <HomeIcon />
          Conoce nuestros servicios
        </Link>

        <button
          className={`snav-burger ${menuOpen ? 'snav-burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="snav-drawer">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className="snav-drawer-link"
              onClick={() => { scrollTo(s.id); setMenuOpen(false) }}
            >
              {s.label}
            </button>
          ))}
          <Link to="/" className="snav-drawer-cta" onClick={() => setMenuOpen(false)}>
            Conoce nuestros servicios →
          </Link>
        </div>
      )}
    </header>
  )
}
