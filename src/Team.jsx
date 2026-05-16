import './Team.css'

const MEMBERS = [
  {
    id: 1,
    photo: '/socios/edison.png',
    name: 'Edison Vásquez',
    role: 'CEO & Fundador',
    bio: 'Fundador y guía estratégico. Traza el rumbo de JhedAI en el despliegue de tecnología de frontera, consolidando un ecosistema de IA sin límites geográficos que define el estándar de innovación a gran escala.',
  },
  {
    id: 2,
    photo: '/socios/julio.png',
    name: 'Julio Hofflinger',
    role: 'Director de Operaciones',
    bio: 'Integra su experiencia en ingeniería y tecnologías de vanguardia para potenciar la eficiencia operativa. Su liderazgo en Computer Vision e IA, sumado a su enfoque en gobernanza ética, asegura que la innovación técnica sea tan robusta como responsable.',
  },
  {
    id: 3,
    photo: '/socios/ignacio.png',
    name: 'Ignacio Rojas',
    role: 'Director de Marketing',
    bio: 'Traduce las capacidades del equipo en herramientas que impulsan el crecimiento de quienes confían en JhedAI. Su experiencia en marketing e IA alinea la técnica con el impacto comercial.',
  },
  {
    id: 4,
    photo: '/socios/pablo.png',
    name: 'Pablo Troncoso',
    role: 'Director Comercial',
    bio: 'Socio y estratega comercial con amplio recorrido en alta dirección e innovación. Aplica su vasta experiencia en modelos de negocio y transformación digital para llevar la IA de JhedAI a sectores clave.',
  },
  {
    id: 5,
    photo: '/socios/hector.png',
    name: 'Héctor Vásquez',
    role: 'Director de Desarrollo',
    bio: 'Arquitecto detrás de las automatizaciones y el despliegue de sistemas de IA. Se especializa en entrenamiento de modelos de computer vision y automatización de procesos, impulsado por una curiosidad natural que lo mantiene en constante aprendizaje.',
  },
  {
    id: 6,
    photo: '/socios/jorge.png',
    name: 'Jorge Salgado',
    role: 'AI Architect | Director de Transferencia de Conocimiento',
    bio: 'Lidera la conexión entre tecnología, educación e implementación estratégica. Transforma conceptos complejos de IA en soluciones aplicables y escalables, impulsando la adopción responsable de tecnologías emergentes.',
  },
  {
    id: 7,
    photo: '/socios/gonzalo.png',
    name: 'Gonzalo Figueroa',
    role: 'AI Solutions Consultant | Transformación de Procesos',
    bio: 'Acompaña a organizaciones en la adopción práctica de IA para mejorar eficiencia, productividad y toma de decisiones. Combina visión estratégica y experiencia en sistemas para traducir la innovación en procesos más inteligentes y sostenibles.',
  },
  {
    id: 8,
    photo: '/socios/camila.png',
    name: 'Camila Bañares Carrasco',
    role: 'Ingeniera en Informática | Vicepresidenta CCHIA | Creadora de Contenido en IA',
    bio: 'Lidera iniciativas que acercan la IA a miles de personas de forma práctica y accesible. A través de Informatik-AI y CamiDevAI, combina educación, innovación y comunicación estratégica para impulsar la adopción responsable de tecnologías emergentes en Chile y Latinoamérica.',
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
