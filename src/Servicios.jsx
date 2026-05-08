import './Servicios.css'

const SERVICES = [
  { num: '01', title: 'Software con IA', sub: 'Aplicaciones que piensan', desc: 'Sistemas que integran modelos de lenguaje, lógica de negocio y experiencia de usuario en un solo producto funcional y mantenible.' },
  { num: '02', title: 'Agentes IA', sub: 'Procesos que se ejecutan solos', desc: 'Agentes autónomos que toman decisiones y activan flujos complejos. Conectados con ERP, CRM, WhatsApp e Instagram.' },
  { num: '03', title: 'Visión Computacional', sub: 'Máquinas que ven y entienden', desc: 'Detección de objetos y reconocimiento visual en tiempo real para operaciones críticas e industriales.' },
  { num: '04', title: 'Machine Learning', sub: 'Modelos que mejoran con el uso', desc: 'Clasificación, predicción y modelos adaptados a tus datos con criterio de producción real.' },
  { num: '05', title: 'Soluciones a Medida', sub: 'Arquitectura para crecer', desc: 'Diseño técnico integral con escalabilidad real y deuda técnica controlada.' },
]

export default function Servicios() {
  const handleCta = () => window.dispatchEvent(new CustomEvent('goto:contacto'))
  return (
    <section className="s-section">
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">Lo que hacemos</span>
          <h2 className="s-title">Soluciones con inteligencia real</h2>
        </header>
        <div className="svc-grid">
          {SERVICES.map(s => (
            <div key={s.num} className="svc-card">
              <span className="svc-num">{s.num}</span>
              <strong className="svc-title">{s.title}</strong>
              <em className="svc-sub">{s.sub}</em>
              <p className="svc-desc">{s.desc}</p>
              <button className="svc-cta" onClick={handleCta}>Agendar →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
