import './Team.css'

const MEMBERS = [
  { id: 1, initials: 'CM', name: 'Camila M.',     role: 'CEO & Fundadora',    bio: 'Lidera la estrategia de InformatiK-AI con foco en soluciones de IA aplicada a negocios reales.' },
  { id: 2, initials: 'JH', name: 'J. Hernández',  role: 'CTO',                bio: 'Arquitecto de sistemas con experiencia en LLMs, visión computacional y automatización a escala.' },
  { id: 3, initials: 'AA', name: 'A. Álvarez',    role: 'Lead Developer',     bio: 'Especialista en desarrollo full-stack con enfoque en productos de IA producción-ready.' },
  { id: 4, initials: 'MR', name: 'M. Rodríguez',  role: 'ML Engineer',        bio: 'Diseño y entrenamiento de modelos de clasificación, predicción y visión computacional.' },
  { id: 5, initials: 'DP', name: 'D. Paredes',    role: 'AI Agent Engineer',  bio: 'Construcción de agentes autónomos conectados con CRM, ERP y canales de comunicación.' },
  { id: 6, initials: 'LV', name: 'L. Vargas',     role: 'UX / Frontend',      bio: 'Interfaces que combinan funcionalidad con experiencia de usuario de alto impacto visual.' },
  { id: 7, initials: 'FO', name: 'F. Olivares',   role: 'DevOps & Security',  bio: 'Infraestructura en producción, pipelines CI/CD y auditoría de seguridad en cada entrega.' },
]

// Los cards se duplican para el loop seamless
const TRACK = [...MEMBERS, ...MEMBERS]

function Card({ m }) {
  return (
    <div className="team-card" aria-label={m.name}>
      <div className="team-avatar">
        <span>{m.initials}</span>
      </div>
      <strong className="team-name">{m.name}</strong>
      <span className="team-role">{m.role}</span>
      <p className="team-bio">{m.bio}</p>
    </div>
  )
}

export default function Team() {
  return (
    <section className="s-section s-section--alt" id="equipo">
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">Quiénes somos</span>
          <h2 className="s-title">El equipo detrás de las soluciones</h2>
        </header>
      </div>

      {/* Máscara con fade en los extremos */}
      <div className="team-viewport">
        <div className="team-track">
          {TRACK.map((m, i) => (
            <Card key={`${m.id}-${i}`} m={m} />
          ))}
        </div>
      </div>
    </section>
  )
}
