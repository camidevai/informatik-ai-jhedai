import './Servicios.css'

const SERVICES = [
  { num: '01', icon: 'cpu',   title: 'Software con IA',       sub: 'Aplicaciones que piensan',        desc: 'Sistemas que integran modelos de lenguaje, lógica de negocio y experiencia de usuario en un solo producto funcional y mantenible.' },
  { num: '02', icon: 'chat',  title: 'Agentes IA',            sub: 'Procesos que se ejecutan solos',  desc: 'Agentes autónomos que toman decisiones y activan flujos complejos. Conectados con ERP, CRM, WhatsApp e Instagram.' },
  { num: '03', icon: 'scan',  title: 'Visión Computacional',  sub: 'Máquinas que ven y entienden',    desc: 'Detección de objetos y reconocimiento visual en tiempo real para operaciones críticas e industriales.' },
  { num: '04', icon: 'chart', title: 'Machine Learning',      sub: 'Modelos que mejoran con el uso',  desc: 'Clasificación, predicción y modelos adaptados a tus datos con criterio de producción real.' },
  { num: '05', icon: 'cube',  title: 'Soluciones a Medida',   sub: 'Arquitectura para crecer',        desc: 'Diseño técnico integral con escalabilidad real y deuda técnica controlada.' },
]

function Icon({ name }) {
  const p = {
    cpu:   <><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></>,
    chat:  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    scan:  <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="3" /></>,
    chart: <><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" rx="1" /><rect x="12" y="8" width="3" height="10" rx="1" /><rect x="17" y="4" width="3" height="14" rx="1" /></>,
    cube:  <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></>,
    cal:   <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  }[name]
  return (
    <svg className="ico" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p}</svg>
  )
}

export default function Servicios() {
  const handleCta = () => window.dispatchEvent(new CustomEvent('goto:contacto'))
  return (
    <section className="s-section">
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">Lo que hacemos</span>
          <h2 className="s-title">Soluciones con <span className="svc-hl">inteligencia real</span></h2>
          <p className="svc-intro">Tecnología avanzada para transformar desafíos en oportunidades</p>
        </header>

        <div className="svc-grid">
          {SERVICES.map(s => (
            <article key={s.num} className="svc-card">
              <span className="svc-dots" aria-hidden="true" />
              <span className="svc-wave" aria-hidden="true" />

              <div className="svc-top">
                <span className="svc-ico"><Icon name={s.icon} /></span>
                <span className="svc-num">{s.num}</span>
              </div>

              <strong className="svc-title">{s.title}</strong>
              <em className="svc-sub">{s.sub}</em>
              <p className="svc-desc">{s.desc}</p>

              <button className="svc-cta" onClick={handleCta}>
                <Icon name="cal" />
                Agendar
                <span className="svc-cta__arrow">→</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
