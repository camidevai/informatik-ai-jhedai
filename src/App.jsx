import { useEffect, useState } from 'react'
import './App.css'
import './sections.css'
import StickyNav from './StickyNav'
import FloatBtn from './FloatBtn'
import Hero from './Hero'
import Servicios from './Servicios'
import Proceso from './Proceso'
import Elegirnos from './Elegirnos'
import Alianzas from './Alianzas'
import Funnel from './Funnel'
import Team from './Team'
import LegalModal from './LegalModal'
import ContactForm from './ContactForm'

export default function App() {
  const [legalPage, setLegalPage] = useState(null)

  // Permite que otros componentes salten al formulario de contacto
  useEffect(() => {
    const handler = () => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    window.addEventListener('goto:contacto', handler)
    return () => window.removeEventListener('goto:contacto', handler)
  }, [])

  const SECTION_IDS = ['servicios', 'proceso', 'elegirnos', 'contacto']
  const scrollToContent = (tabIdx) => {
    const id = SECTION_IDS[tabIdx] ?? 'servicios'
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <StickyNav />
      <FloatBtn />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Contenido ── */}
      <div className="page-content">
        <section id="equipo"><Team /></section>
        <div className="s-divider" />
        <section id="servicios"><Servicios /></section>
        <div className="s-divider" />
        <section id="proceso"><Proceso /></section>
        <div className="s-divider" />
        <section id="elegirnos"><Elegirnos /></section>
        <div className="s-divider" />
        <section id="alianzas"><Alianzas /></section>
        <div className="s-divider" />
        <section id="contacto"><Funnel /></section>
        <div className="s-divider" />
        <ContactForm />
      </div>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <nav className="site-footer__shortcuts">
          {[
            { label: 'Servicios',         idx: 0 },
            { label: 'Proceso',           idx: 1 },
            { label: 'Por qué elegirnos', idx: 2 },
            { label: 'Contacto',          idx: 3 },
          ].map(({ label, idx }) => (
            <button
              key={idx}
              className="site-footer__link"
              onClick={() => scrollToContent(idx)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="site-footer__legal">
          <span className="site-footer__copy">© 2025 prochechando.cl</span>
          <span className="site-footer__divider" />
          <button className="site-footer__link site-footer__link--legal" onClick={() => setLegalPage('terminos')}>Términos de uso</button>
          <button className="site-footer__link site-footer__link--legal" onClick={() => setLegalPage('privacidad')}>Política de privacidad</button>
          <button className="site-footer__link site-footer__link--legal" onClick={() => setLegalPage('cookies')}>Cookies</button>
        </div>
      </footer>

      <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />
    </>
  )
}
