import './Funnel.css'

export default function Funnel() {
  return (
    <section className="s-section funnel" id="funnel-section">
      <div className="funnel-glow" aria-hidden="true" />
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">¿Te interesa?</span>
          <h2 className="s-title">Hagamos algo juntos</h2>
          <p className="funnel-sub">Elige el tipo de conversación que mejor describe lo que necesitas</p>
        </header>
        <div className="funnel-cards">
          <a
            href="https://calendar.app.google/zbkAEVCiiMvgMVhK9"
            target="_blank"
            rel="noopener noreferrer"
            className="funnel-card funnel-card--alianza"
          >
            <div className="funnel-card-badge">Partnership</div>
            <strong className="funnel-card-title">Alianza estratégica</strong>
            <p className="funnel-card-desc">Para empresas que quieren colaborar, co-crear o desarrollar una propuesta conjunta.</p>
            <span className="funnel-card-cta">Explorar alianza →</span>
          </a>

          <div className="funnel-center" aria-hidden="true">
            <span className="funnel-orb" />
          </div>

          <a
            href="https://calendar.app.google/dbFyNjc56vKE9WPZ9"
            target="_blank"
            rel="noopener noreferrer"
            className="funnel-card funnel-card--desarrollo"
          >
            <div className="funnel-card-badge funnel-card-badge--blue">Desarrollo</div>
            <strong className="funnel-card-title">Construir juntos</strong>
            <p className="funnel-card-desc">Para quienes necesitan software, automatización, agentes IA o una plataforma a medida.</p>
            <span className="funnel-card-cta funnel-card-cta--blue">Agendar desarrollo →</span>
          </a>
        </div>
        <p className="funnel-note">30 minutos · Sin formularios · Una conversación honesta</p>
      </div>
    </section>
  )
}
