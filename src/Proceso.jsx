import './Proceso.css'

const STEPS = [
  { num: '01', icon: 'search', title: 'Diagnóstico',           desc: 'Entendemos el problema real, no solo el síntoma.' },
  { num: '02', icon: 'edit',   title: 'Diseño',                desc: 'Arquitectura técnica adaptada a tu caso y escala.' },
  { num: '03', icon: 'code',   title: 'Desarrollo',            desc: 'Código auditable, seguro y mantenible.' },
  { num: '04', icon: 'rocket', title: 'Entrega en producción', desc: 'Despliegue con revisión de seguridad y monitoreo.' },
  { num: '05', icon: 'chart',  title: 'Optimización',          desc: 'Mejora continua basada en datos reales de uso.' },
]

const BADGES = [
  { icon: 'shield',  label: '5 etapas' },
  { icon: 'lock',    label: 'Seguridad' },
  { icon: 'headset', label: 'Soporte continuo' },
]

function Icon({ name }) {
  const p = {
    search:  <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    edit:    <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
    code:    <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
    rocket:  <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></>,
    chart:   <><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" rx="1" /><rect x="12" y="8" width="3" height="10" rx="1" /><rect x="17" y="4" width="3" height="14" rx="1" /></>,
    shield:  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    lock:    <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    headset: <><path d="M3 14v-3a9 9 0 0 1 18 0v3" /><path d="M21 14v3a3 3 0 0 1-3 3h-3" /><rect x="2" y="13.5" width="4" height="7" rx="1.5" /><rect x="18" y="13.5" width="4" height="7" rx="1.5" /></>,
  }[name]
  return (
    <svg className="ico" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p}</svg>
  )
}

export default function Proceso() {
  return (
    <section className="s-section s-section--alt" id="proceso">
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">Metodología</span>
          <h2 className="s-title">Cómo <span className="proc-hl">trabajamos</span></h2>
          <p className="proc-sub">Un proceso claro, ágil y enfocado en resultados reales.</p>
        </header>

        <div className="proc-timeline">
          <span className="proc-rail" aria-hidden="true" />
          {STEPS.map(s => (
            <div key={s.num} className="proc-col">
              <div className="proc-node"><span>{s.num}</span></div>
              <article className="proc-card">
                <span className="proc-ico"><Icon name={s.icon} /></span>
                <strong className="proc-title">{s.title}</strong>
                <p className="proc-desc">{s.desc}</p>
                <span className="proc-dots" aria-hidden="true" />
              </article>
            </div>
          ))}
        </div>

        <div className="proc-footer">
          {BADGES.map((b, i) => (
            <span key={b.label} className="proc-badge" data-sep={i > 0 ? 'true' : undefined}>
              <Icon name={b.icon} />{b.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
