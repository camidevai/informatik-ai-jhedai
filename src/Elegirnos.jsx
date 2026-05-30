import './Elegirnos.css'

function Icon({ name }) {
  const p = {
    bolt:    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    dollar:  <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    cpu:     <><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></>,
    trend:   <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
    target:  <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
    shield:  <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
    shieldcheck: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
    rocket:  <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></>,
    users:   <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    code:    <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
    server:  <><rect x="2" y="3" width="20" height="7" rx="1.5" /><rect x="2" y="14" width="20" height="7" rx="1.5" /><line x1="6" y1="6.5" x2="6.01" y2="6.5" /><line x1="6" y1="17.5" x2="6.01" y2="17.5" /></>,
    x:       <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>,
    eye:     <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></>,
    wrench:  <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.4-.6-.6-2.4z" />,
    puzzle:  <path d="M4 7h3a2 2 0 1 1 4 0h3v3a2 2 0 1 1 0 4v3h-3a2 2 0 1 0-4 0H4v-3a2 2 0 1 0 0-4z" />,
    user:    <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    targetuser: <><circle cx="12" cy="9" r="3" /><path d="M6.5 19a5.5 5.5 0 0 1 11 0" /><path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2" /></>,
    gem:     <><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20M9 3l3 6 3-6" /></>,
    bars:    <><rect x="4" y="13" width="3" height="7" rx="1" /><rect x="10.5" y="9" width="3" height="11" rx="1" /><rect x="17" y="5" width="3" height="15" rx="1" /></>,
    chartup: <><path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 5-6" /><polyline points="18 5 21 5 21 8" /></>,
    star:    <polygon points="12 2 15 9 22 9.3 17 14 18.5 21 12 17.3 5.5 21 7 14 2 9.3 9 9" />,
  }[name]
  return (
    <svg className="ico" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p}</svg>
  )
}

const BENCH = [
  { icon: 'bolt',   title: 'Velocidad de entrega',      desc: 'Entregamos hasta 3 veces más rápido que el desarrollo tradicional.', stat: '3×',   statLabel: 'más rápido',  them: 'Desarrollo tradicional', us: 100, themPct: 33 },
  { icon: 'dollar', title: 'Costo operativo',           desc: 'Optimizamos recursos y procesos reduciendo costos significativamente.', stat: '40%',  statLabel: 'menos costo', them: 'Metodología clásica',    us: 100, themPct: 58 },
  { icon: 'cpu',    title: 'IA aplicada en producción', desc: 'Implementamos modelos reales probados en entornos reales.',         stat: 'IA',   statLabel: 'real',        them: 'Demos o prototipos',     us: 100, themPct: 25 },
  { icon: 'trend',  title: 'Adaptación al negocio',     desc: 'Soluciones flexibles que se adaptan y crecen junto a tu empresa.',  stat: '100%', statLabel: 'a medida',    them: 'Solución genérica',      us: 100, themPct: 45 },
]

const MINI = [
  { icon: 'target', title: 'Resultados medibles',   text: 'KPIs claros y seguimiento continuo.' },
  { icon: 'shield', title: 'Tecnología confiable',  text: 'Arquitectura robusta y escalable.' },
  { icon: 'rocket', title: 'Mejora continua',       text: 'Iteramos y optimizamos sin detenerte.' },
  { icon: 'users',  title: 'Acompañamiento real',   text: 'Estamos contigo en cada etapa.' },
]

const CARDS = [
  {
    icon: 'shieldcheck', lead: 'Construimos,', hl: 'no asesoramos',
    text: 'Entregamos código en producción. No decks, no informes. Software que funciona.',
    chips: [{ i: 'code', t: 'Código real' }, { i: 'server', t: 'En producción' }, { i: 'x', t: 'Sin humo' }],
  },
  {
    icon: 'code', lead: 'Código', hl: 'auditable',
    text: 'Todo lo que entregamos puede ser revisado, mantenido y extendido por tu equipo.',
    chips: [{ i: 'eye', t: 'Revisado' }, { i: 'wrench', t: 'Mantenible' }, { i: 'puzzle', t: 'Extensible' }],
  },
  {
    icon: 'targetuser', lead: 'A medida para', hl: 'tu operación',
    text: 'Diseñado para tu negocio, no para un catálogo genérico. Cada solución es única.',
    chips: [{ i: 'user', t: 'Personalizado' }, { i: 'trend', t: 'Escalable' }, { i: 'gem', t: 'Único' }],
  },
  {
    icon: 'chartup', lead: 'Impacto', hl: 'medible',
    text: 'Medimos el éxito por el impacto en tu negocio. Métricas reales, no líneas de código.',
    chips: [{ i: 'bars', t: 'Métricas reales' }, { i: 'target', t: 'ROI medible' }, { i: 'star', t: 'Resultados' }],
  },
]

export default function Elegirnos() {
  return (
    <section className="s-section eli-section" id="elegirnos">
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">Por qué elegirnos</span>
          <h2 className="s-title">Resultados que <span className="eli-hl">puedes ver</span></h2>
          <p className="eli-sub">Impactos medibles que transforman tu negocio con inteligencia real.</p>
        </header>

        {/* ── Panel de benchmark ── */}
        <div className="eli-panel">
          {BENCH.map(b => (
            <div key={b.title} className="eli-row">
              <div className="eli-row-head">
                <span className="eli-row-ico"><Icon name={b.icon} /></span>
                <div>
                  <strong className="eli-row-title">{b.title}</strong>
                  <p className="eli-row-desc">{b.desc}</p>
                </div>
              </div>

              <div className="eli-bars">
                <span className="eli-bars-name">PROCHECHANDO AI</span>
                <div className="eli-track"><div className="eli-fill" style={{ width: `${b.us}%` }} /></div>
                <div className="eli-track eli-track--them"><div className="eli-fill eli-fill--them" style={{ width: `${b.themPct}%` }} /></div>
                <span className="eli-bars-them">{b.them}</span>
              </div>

              <div className="eli-stat">
                <b>{b.stat}</b>
                <span>{b.statLabel}</span>
              </div>
            </div>
          ))}

          <div className="eli-mini-row">
            {MINI.map(m => (
              <div key={m.title} className="eli-mini">
                <span className="eli-mini-ico"><Icon name={m.icon} /></span>
                <div>
                  <strong>{m.title}</strong>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tarjetas de propuesta ── */}
        <div className="eli-cards">
          {CARDS.map(c => (
            <article key={c.hl} className="eli-card">
              <div className="eli-badge">
                <span className="eli-badge-spark eli-badge-spark--a">✦</span>
                <span className="eli-badge-spark eli-badge-spark--b">✦</span>
                <span className="eli-badge-ico"><Icon name={c.icon} /></span>
                <span className="eli-badge-check"><Icon name="shieldcheck" /></span>
              </div>
              <div className="eli-card-body">
                <h3 className="eli-card-title">{c.lead} <span className="eli-hl">{c.hl}</span></h3>
                <p className="eli-card-text">{c.text}</p>
                <div className="eli-chips">
                  {c.chips.map(ch => (
                    <span key={ch.t} className="eli-chip"><Icon name={ch.i} />{ch.t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
