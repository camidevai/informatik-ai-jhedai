import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: 'flask',
    title: 'Probamos IA sin parar',
    text: 'Cada semana evaluamos nuevas herramientas de inteligencia artificial para quedarnos solo con las que realmente aportan valor.',
  },
  {
    icon: 'build',
    title: 'Implementamos en empresas',
    text: 'Ayudamos a empresas y profesionales a integrar IA en sus procesos: automatización, agentes, visión computacional y más.',
  },
  {
    icon: 'book',
    title: 'Creamos contenido educativo',
    text: 'Compartimos tutoriales y guías para que cualquiera aprenda a usar estas herramientas con criterio.',
  },
  {
    icon: 'chat',
    title: 'Asesoramos a medida',
    text: 'Te acompañamos con asesorías personalizadas para que la IA resuelva problemas concretos de tu negocio.',
  },
]

function Icon({ name }) {
  const p = {
    flask: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" /><path d="M7 15h10" /></>,
    build: <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18v3h3l6.4-6.4a4 4 0 0 0 5.3-5.4l-2.7 2.7-2.3-2.3z" /></>,
    book:  <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
    chat:  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  }[name]
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p}</svg>
  )
}

export default function QuienesSomos() {
  return (
    <section id="tp-nosotros" className="s-section tp-about">
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">Quiénes somos</span>
          <h2 className="s-title">
            Construimos IA, no solo <span className="svc-hl">hablamos de ella</span>
          </h2>
          <p className="svc-intro">
            En PROCHECHANDO AI vivimos la inteligencia artificial todos los días: la probamos,
            la implementamos y la enseñamos.
          </p>
        </header>

        <div className="tp-about__grid">
          {FEATURES.map((f) => (
            <article key={f.title} className="tp-about__card">
              <span className="tp-about__ico"><Icon name={f.icon} /></span>
              <strong className="tp-about__title">{f.title}</strong>
              <p className="tp-about__text">{f.text}</p>
            </article>
          ))}
        </div>

        <div className="tp-about__cta">
          <p className="tp-about__cta-text">
            ¿Listo para llevar la inteligencia artificial a tu empresa?
          </p>
          <Link to="/" className="tp-btn tp-btn--primary tp-btn--lg">
            Conoce nuestros servicios →
          </Link>
        </div>
      </div>
    </section>
  )
}
