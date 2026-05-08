import './Alianzas.css'

const PARTNERS = [
  { id: 1, logo: '/logos/cchia.png', name: 'CCHIA', type: 'Alianza estratégica', region: 'Chile', color: '#00D4C8' },
  // Agregar más partners aquí cuando estén disponibles
]

// Rellena el track para que el carousel tenga suficiente contenido
const fillTrack = (items, minCount = 8) => {
  const result = []
  while (result.length < minCount) result.push(...items)
  return [...result, ...result] // duplica para loop seamless
}

const TRACK = fillTrack(PARTNERS)

function PartnerCard({ p, idx }) {
  return (
    <div className="ali-card" style={{ '--ali-color': p.color }}>
      <div className="ali-logo">
        {p.logo
          ? <img src={p.logo} alt={p.name} className="ali-logo-img" />
          : <span>{p.initials}</span>
        }
      </div>
      <strong className="ali-name">{p.name}</strong>
      <span className="ali-type">{p.type}</span>
      <span className="ali-region">{p.region}</span>
    </div>
  )
}

export default function Alianzas() {
  return (
    <section className="s-section s-section--alt ali-section" id="alianzas">
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">Ecosistema</span>
          <h2 className="s-title">Alianzas estratégicas</h2>
          <p className="ali-sub">Trabajamos con organizaciones que comparten nuestra visión de transformar negocios con tecnología real</p>
        </header>
      </div>

      <div className="ali-viewport">
        <div className="ali-track">
          {TRACK.map((p, i) => (
            <PartnerCard key={`${p.id}-${i}`} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
