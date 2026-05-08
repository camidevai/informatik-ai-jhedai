import './Team.css'

const MEMBERS = [
  {
    id: 1,
    photo: '/socios/jorge.png',
    name: 'Jorge Salgado',
    role: 'CEO & Fundador',
    bio: 'Lidera la visión estratégica de InformatiK-AI, conectando inteligencia artificial con resultados reales para empresas y organizaciones.',
  },
  {
    id: 2,
    photo: '/socios/camila.png',
    name: 'Camila Bañares',
    role: 'CMO & Fundadora · VP CCHIA',
    bio: 'Estratega de marketing e innovación. Vicepresidenta de la Cámara Chilena de Inteligencia Artificial, impulsa la adopción responsable de IA en Chile.',
  },
  {
    id: 3,
    photo: '/socios/gonzalo.png',
    name: 'Gonzalo Figueroa',
    role: 'CTO & Fundador',
    bio: 'Arquitecto de sistemas con expertise en LLMs, visión computacional y automatización a escala. Diseña la infraestructura técnica de las soluciones.',
  },
  {
    id: 4,
    photo: '/socios/edison.png',
    name: 'Edison',
    role: 'AI Agent Engineer',
    bio: 'Construye agentes autónomos que se integran con CRM, ERP y canales de comunicación para automatizar flujos de trabajo complejos.',
  },
  {
    id: 5,
    photo: '/socios/hector.png',
    name: 'Héctor',
    role: 'ML Engineer',
    bio: 'Diseño y entrenamiento de modelos de clasificación, predicción y visión computacional aplicados a casos de negocio concretos.',
  },
  {
    id: 6,
    photo: '/socios/ignacio.png',
    name: 'Ignacio',
    role: 'Lead Developer',
    bio: 'Especialista en desarrollo full-stack con enfoque en productos de IA listos para producción, escalables y de alta disponibilidad.',
  },
  {
    id: 7,
    photo: '/socios/julio.png',
    name: 'Julio',
    role: 'DevOps & Cloud',
    bio: 'Infraestructura en producción, pipelines CI/CD y auditoría de seguridad. Garantiza entregas confiables en cada sprint.',
  },
  {
    id: 8,
    photo: '/socios/pablo.png',
    name: 'Pablo',
    role: 'UX / Frontend',
    bio: 'Interfaces que combinan funcionalidad con experiencia de usuario de alto impacto visual, optimizadas para conversión.',
  },
]

const TRACK = [...MEMBERS, ...MEMBERS]

function Card({ m }) {
  return (
    <div className="team-card" aria-label={m.name}>
      <div className="team-avatar">
        <img src={m.photo} alt={m.name} />
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
