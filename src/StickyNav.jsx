import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './StickyNav.css'
import Prochi from './Prochi'

const NAV_LINKS = [
  { label: 'Equipo',            id: 'equipo'    },
  { label: 'Servicios',         id: 'servicios' },
  { label: 'Proceso',           id: 'proceso'   },
  { label: 'Por qué elegirnos', id: 'elegirnos' },
  { label: 'Recursos',          id: 'alianzas', caret: true },
  { label: 'Herramientas',      to: '/herramientas' },
  { label: 'Contacto',          id: 'contacto'  },
]

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const CalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

export default function StickyNav() {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Navega a una ruta (to) o hace scroll a una sección (id).
  const go = (l) => (l.to ? navigate(l.to) : scrollTo(l.id))

  return (
    <header className={`snav ${solid ? 'snav--solid' : ''}`}>
      <div className="snav-inner">

        {/* Marca */}
        <span className="snav-brand" onClick={() => scrollTo('equipo')}>
          <Prochi size={26} animated={false} className="snav-brand__logo" />
          PROCHECHANDO<b className="snav-brand-sep">.cl</b>
        </span>

        {/* Links desktop */}
        <nav className="snav-links" aria-label="Navegación principal">
          {NAV_LINKS.map(l => (
            <button key={l.label} className="snav-link" onClick={() => go(l)}>
              {l.label}
              {l.caret && <span className="snav-link__caret">▾</span>}
            </button>
          ))}
        </nav>

        {/* CTA desktop */}
        <button className="snav-cta" onClick={() => scrollTo('contacto')}>
          Agendar reunión
          <CalIcon />
        </button>

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
              key={l.label}
              className="snav-drawer-link"
              onClick={() => { go(l); setMenuOpen(false) }}
            >
              {l.label}
            </button>
          ))}
          <button
            className="snav-drawer-cta"
            onClick={() => { scrollTo('contacto'); setMenuOpen(false) }}
          >
            Agendar reunión →
          </button>
        </div>
      )}
    </header>
  )
}
