import './Proceso.css'

const STEPS = [
  { num: '01', title: 'Diagnóstico', desc: 'Entendemos el problema real, no solo el síntoma.' },
  { num: '02', title: 'Diseño', desc: 'Arquitectura técnica adaptada a tu caso y escala.' },
  { num: '03', title: 'Desarrollo', desc: 'Código auditable, seguro y mantenible.' },
  { num: '04', title: 'Entrega en producción', desc: 'Entrega en producción con revisión de seguridad.' },
  { num: '05', title: 'Optimización', desc: 'Mejora continua basada en datos reales de uso.' },
]

export default function Proceso() {
  return (
    <section className="s-section s-section--alt">
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">Metodología</span>
          <h2 className="s-title">Cómo trabajamos</h2>
        </header>
        <div className="proc-line-wrap">
          <div className="proc-line" />
          <div className="proc-steps">
            {STEPS.map((s) => (
              <div key={s.num} className="proc-step">
                <div className="proc-orb">
                  <span className="proc-orb-num">{s.num}</span>
                </div>
                <strong className="proc-title">{s.title}</strong>
                <p className="proc-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="proc-badges">
          <span>5 etapas</span>
          <span>Seguridad</span>
          <span>Soporte continuo</span>
        </div>
      </div>
    </section>
  )
}
