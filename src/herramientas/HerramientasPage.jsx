import { Link } from 'react-router-dom'
import '../App.css'
import '../sections.css'
import './herramientas.css'
import './herramientas-page.css'
import { useTools } from './useTools'
import { useSeo } from './useSeo'
import ToolsNav from './ToolsNav'
import ToolsHero from './sections/ToolsHero'
import QuienesSomos from './sections/QuienesSomos'
import TopFive from './sections/TopFive'
import Catalogo from './sections/Catalogo'
import Educacion from './sections/Educacion'
import CtaFinal from './sections/CtaFinal'

export default function HerramientasPage() {
  const { tools, categories, loading, error } = useTools()

  useSeo({
    title: 'Herramientas de IA probadas por expertos | PROCHECHANDO AI',
    description:
      'Directorio curado de las mejores herramientas de inteligencia artificial, probadas por nuestro equipo. Descúbrelas, aprende a usarlas con videotutoriales e implementa IA en tu empresa.',
  })

  return (
    <div className="tools-page">
      <ToolsNav />

      <main>
        <ToolsHero total={tools.length} />

        <div className="s-divider" />
        <QuienesSomos />

        <TopFive tools={tools} />

        <Catalogo tools={tools} categories={categories} loading={loading} error={error} />

        <div className="s-divider" />
        <Educacion />

        <CtaFinal />
      </main>

      {/* Footer simple con retorno a Inicio */}
      <footer className="tp-footer">
        <span className="tp-footer__brand">PROCHECHANDO<b>AI</b></span>
        <nav className="tp-footer__nav">
          <Link to="/" className="tp-footer__link">Inicio</Link>
          <a href="#tp-top5" className="tp-footer__link">Favoritas</a>
          <a href="#tp-catalogo" className="tp-footer__link">Herramientas</a>
          <a href="#tp-educacion" className="tp-footer__link">Aprende</a>
        </nav>
        <span className="tp-footer__copy">© 2025 PROCHECHANDO AI</span>
      </footer>

      {/* Botón flotante siempre visible para volver a Inicio */}
      <Link to="/" className="tp-fab" aria-label="Volver a Inicio y conocer nuestros servicios">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="tp-fab__text">Nuestros servicios</span>
      </Link>
    </div>
  )
}
