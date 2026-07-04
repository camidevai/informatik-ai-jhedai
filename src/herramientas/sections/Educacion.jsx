import { Link } from 'react-router-dom'
import DriveFolder from '../DriveFolder'

// Carpetas de Drive con el material de cada tutorial (contenido en vivo).
const DRIVE_TUTORIALS = [
  {
    tool: 'APOB',
    folderId: '1DeTZjeO4HDFXhQj6th7mqZxr79yPNCmB',
    url: 'https://drive.google.com/drive/folders/1DeTZjeO4HDFXhQj6th7mqZxr79yPNCmB?usp=sharing',
    note: 'Material paso a paso para crear videos con avatares en APOB.',
  },
  {
    tool: 'SYNTX',
    folderId: '18NX_XZzsoNDmBxW42a7WWboz_LEZrABi',
    url: 'https://drive.google.com/drive/folders/18NX_XZzsoNDmBxW42a7WWboz_LEZrABi?usp=sharing',
    note: 'Guía para aprovechar los más de 90 modelos de IA de SYNTX.',
  },
]

const RESOURCES = [
  {
    type: 'Tutoriales',
    icon: 'play',
    title: 'Videotutoriales en Instagram',
    text: 'Publicamos guías cortas mostrando cómo usar cada herramienta paso a paso, en español y al grano.',
    cta: 'Ver en Instagram',
    href: 'https://www.instagram.com/camidevai',
    external: true,
  },
  {
    type: 'Descargables',
    icon: 'folder',
    title: 'Tutoriales de APOB y SYNTX',
    text: 'Descarga el material completo donde te enseño a usar APOB y SYNTX. Contenido siempre actualizado desde Google Drive.',
    cta: 'Ver material',
    href: '#tp-tutoriales',
    external: false,
  },
  {
    type: 'Asesorías',
    icon: 'cap',
    title: 'Formación para equipos',
    text: 'Capacitamos a tu equipo para adoptar IA con criterio: qué usar, cómo integrarla y cómo medir resultados.',
    cta: 'Conoce nuestros servicios',
    href: '/',
    external: false,
    route: true,
  },
]

function Icon({ name }) {
  const p = {
    play:   <><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></>,
    folder: <><path d="M4 4h6l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /></>,
    cap:    <><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
  }[name]
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p}</svg>
  )
}

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function ResourceCta({ r }) {
  if (r.route) return <Link to={r.href} className="tp-edu__link">{r.cta} →</Link>
  if (r.external)
    return (
      <a className="tp-edu__link" href={r.href} target="_blank" rel="noopener noreferrer">
        {r.cta} →
      </a>
    )
  return (
    <button className="tp-edu__link" onClick={() => scrollTo(r.href.replace('#', ''))}>
      {r.cta} →
    </button>
  )
}

export default function Educacion() {
  return (
    <section id="tp-educacion" className="s-section tp-edu">
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">📚 Formación</span>
          <h2 className="s-title">
            Aprende <span className="svc-hl">Inteligencia Artificial</span>
          </h2>
          <p className="svc-intro">
            No solo listamos herramientas: te enseñamos a usarlas. Cursos, guías y recursos
            gratuitos para que la IA trabaje para ti.
          </p>
        </header>

        <div className="tp-edu__grid">
          {RESOURCES.map((r) => (
            <article key={r.title} className="tp-edu__card">
              <div className="tp-edu__top">
                <span className="tp-edu__ico"><Icon name={r.icon} /></span>
                <span className="tp-edu__type">{r.type}</span>
              </div>
              <strong className="tp-edu__title">{r.title}</strong>
              <p className="tp-edu__text">{r.text}</p>
              <ResourceCta r={r} />
            </article>
          ))}
        </div>

        {/* Material en vivo desde Google Drive */}
        <div id="tp-tutoriales" className="tp-tutoriales">
          <div className="tp-tutoriales__head">
            <h3 className="tp-tutoriales__title">Material de tutoriales</h3>
            <p className="tp-tutoriales__sub">
              Contenido cargado directamente desde nuestras carpetas de Google Drive:
              se actualiza solo cada vez que abres esta página.
            </p>
          </div>

          <div className="tp-tutoriales__grid">
            {DRIVE_TUTORIALS.map((t) => (
              <DriveFolder key={t.tool} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
