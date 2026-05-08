import './Elegirnos.css'

const BENCHMARKS = [
  {
    label:    'Velocidad de entrega',
    us:       100,
    them:     33,
    usTag:    '3× más rápido',
    themTag:  'Desarrollo tradicional',
  },
  {
    label:    'Costo operativo',
    us:       60,
    them:     100,
    usTag:    '40% menos costo',
    themTag:  'Metodología clásica',
  },
  {
    label:    'IA aplicada en producción',
    us:       100,
    them:     20,
    usTag:    'Modelos reales',
    themTag:  'Demos o prototipos',
  },
  {
    label:    'Adaptación al negocio',
    us:       100,
    them:     45,
    usTag:    '100% a medida',
    themTag:  'Solución genérica',
  },
]

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="eli-feat-icon">
        <circle cx="20" cy="20" r="16" stroke="#00D4C8" strokeWidth="1.5" strokeOpacity="0.3"/>
        <path d="M13 20l5 5 9-10" stroke="#00D4C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="7" stroke="#00D4C8" strokeWidth="1" strokeOpacity="0.2"/>
      </svg>
    ),
    title: 'Construimos, no asesoramos',
    text:  'Entregamos código en producción. No decks, no informes. Software que funciona.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="eli-feat-icon">
        <rect x="8" y="12" width="24" height="16" rx="3" stroke="#4A9EFF" strokeWidth="1.5"/>
        <path d="M14 20h12M14 24h7" stroke="#4A9EFF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="30" cy="12" r="5" fill="#00D4C8" fillOpacity="0.15" stroke="#00D4C8" strokeWidth="1.5"/>
        <path d="M28.5 12l1 1 2-2" stroke="#00D4C8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Código auditable',
    text:  'Todo lo que entregamos puede ser revisado, mantenido y extendido por tu equipo.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="eli-feat-icon">
        <path d="M20 8c-3 0-8 4-8 10s5 8 8 8 8-2 8-8-5-10-8-10z" stroke="#00D4C8" strokeWidth="1.5"/>
        <circle cx="20" cy="18" r="3" stroke="#00D4C8" strokeWidth="1.5"/>
        <path d="M12 32c1-3 4-5 8-5s7 2 8 5" stroke="#4A9EFF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'A medida para tu operación',
    text:  'Diseñado para tu negocio, no para un catálogo genérico. Cada solución es única.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="eli-feat-icon">
        <path d="M10 28 L20 12 L30 20 L38 10" stroke="#00D4C8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="12" r="2.5" fill="#00D4C8"/>
        <circle cx="30" cy="20" r="2.5" fill="#4A9EFF"/>
        <circle cx="38" cy="10" r="2.5" fill="#8EF8F1"/>
        <path d="M6 34h28" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Impacto medible',
    text:  'Medimos el éxito por el impacto en tu negocio. Métricas reales, no líneas de código.',
  },
]

export default function Elegirnos() {
  return (
    <section className="s-section eli-section" id="elegirnos">
      <div className="s-container">

        <header className="s-header">
          <span className="s-kicker">Por qué elegirnos</span>
          <h2 className="s-title">Resultados que puedes ver</h2>
        </header>

        {/* ── Benchmark visual ── */}
        <div className="eli-bench">
          <div className="eli-bench-labels">
            <span className="eli-bench-tag eli-bench-tag--us">InformatiK-AI × JhedAI</span>
            <span className="eli-bench-tag eli-bench-tag--them">Referencia de mercado</span>
          </div>
          {BENCHMARKS.map(b => (
            <div key={b.label} className="eli-bench-row">
              <span className="eli-bench-label">{b.label}</span>
              <div className="eli-bench-bars">
                <div className="eli-bench-bar-wrap">
                  <div className="eli-bench-bar eli-bench-bar--us" style={{ width: `${b.us}%` }}>
                    <span className="eli-bench-bar-tag">{b.usTag}</span>
                  </div>
                </div>
                <div className="eli-bench-bar-wrap eli-bench-bar-wrap--them">
                  <div className="eli-bench-bar eli-bench-bar--them" style={{ width: `${b.them}%` }}>
                    <span className="eli-bench-bar-tag eli-bench-bar-tag--them">{b.themTag}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Feature cards con iconos ── */}
        <div className="eli-feats">
          {FEATURES.map(f => (
            <div key={f.title} className="eli-feat">
              <div className="eli-feat-icon-wrap">{f.icon}</div>
              <div className="eli-feat-body">
                <strong>{f.title}</strong>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
