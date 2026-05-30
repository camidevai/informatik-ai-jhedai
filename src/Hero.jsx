import './Hero.css'
import Prochi from './Prochi'

const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const FEATURES = [
  { icon: 'spark', label: 'Soluciones a medida' },
  { icon: 'code',  label: 'Tecnología accesible' },
  { icon: 'user',  label: 'Enfoque humano' },
  { icon: 'chart', label: 'Resultados reales' },
]

const STATS = [
  { icon: 'users',  value: '+50', label: 'Proyectos exitosos' },
  { icon: 'rocket', value: '+20', label: 'Soluciones con IA' },
  { icon: 'smile',  value: '98%', label: 'Clientes satisfechos' },
  { icon: 'globe',  value: '8+',  label: 'Países alcanzados' },
]

function Icon({ name }) {
  const paths = {
    spark:  <path d="M12 2l2.3 6.8L21 11l-6.7 2.2L12 20l-2.3-6.8L3 11l6.7-2.2z" />,
    code:   <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
    user:   <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    chart:  <><polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" /></>,
    users:  <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></>,
    smile:  <><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></>,
    globe:  <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
    cal:    <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    play:   <polygon points="6 4 20 12 6 20 6 4" />,
    chat:   <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />,
    cpu:    <><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></>,
  }[name]
  return (
    <svg className="ico" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths}
    </svg>
  )
}

export default function Hero() {
  return (
    <header className="hero">
      {/* Fondo decorativo */}
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__orb hero__orb--1" />
        <span className="hero__orb hero__orb--2" />
        <div className="hero__grid" />
      </div>

      <div className="hero__inner">
        {/* ── Texto (izquierda) ── */}
        <div className="hero__text">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-spark">✦</span>
            Inteligencia artificial que te acerca al futuro
          </span>

          <h1 className="hero__title">
            IA que <span className="hero__grad">simplifica, potencia</span> y{' '}
            <span className="hero__grad">transforma</span>.
          </h1>

          <p className="hero__sub">
            Acercamos la inteligencia artificial y la programación a las personas
            que quieren ir <b>más allá</b>.
          </p>

          <div className="hero__cta">
            <button className="hero__btn hero__btn--primary" onClick={() => goTo('contacto')}>
              <Icon name="cal" />
              Agendar una reunión
              <span className="hero__btn-arrow">→</span>
            </button>
            <button className="hero__btn hero__btn--ghost" onClick={() => goTo('servicios')}>
              <Icon name="play" />
              Ver servicios
            </button>
          </div>

          <ul className="hero__features">
            {FEATURES.map(f => (
              <li key={f.label} className="hero__feature">
                <Icon name={f.icon} />
                {f.label}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Escena del logo (derecha) ── */}
        <div className="hero__brand">
          <div className="hero__stage">
            <div className="hero__glow" />
            <div className="hero__ring" />
            <div className="hero__dots" />

            <span className="hero__chip hero__chip--cpu"><Icon name="cpu" /></span>
            <span className="hero__chip hero__chip--ai">AI</span>
            <span className="hero__chip hero__chip--code"><Icon name="code" /></span>
            <span className="hero__chip hero__chip--chat"><Icon name="chat" /></span>

            <Prochi size={210} className="hero__prochi" />
            <div className="hero__podium" />
          </div>

          <div className="hero__brandname">
            <span className="hero__wordmark">PROCHECHANDO <b>AI</b></span>
            <span className="hero__rule" />
            <p className="hero__tagline">Mientras carga, construimos el futuro.</p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="hero__stats">
          {STATS.map(s => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-ico"><Icon name={s.icon} /></span>
              <div className="hero__stat-body">
                <b className="hero__stat-value">{s.value}</b>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
