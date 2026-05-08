import './Alianzas.css'

const PARTNERS = [
  { id: 1, initials: 'AN', name: 'Anthropic',       type: 'AI Foundation Partner', region: 'Global',         color: '#00D4C8' },
  { id: 2, initials: 'OA', name: 'OpenAI',           type: 'Technology Partner',    region: 'Global',         color: '#4A9EFF' },
  { id: 3, initials: 'GC', name: 'Google Cloud',     type: 'Infrastructure Partner',region: 'LATAM',          color: '#8EF8F1' },
  { id: 4, initials: 'AW', name: 'AWS',              type: 'Cloud Partner',         region: 'LATAM',          color: '#00D4C8' },
  { id: 5, initials: 'MS', name: 'Microsoft Azure',  type: 'Cloud & AI Partner',    region: 'Global',         color: '#4A9EFF' },
  { id: 6, initials: 'HF', name: 'HuggingFace',      type: 'ML Models Partner',     region: 'Global',         color: '#8EF8F1' },
  { id: 7, initials: 'LG', name: 'LangChain',        type: 'Framework Partner',     region: 'Global',         color: '#00D4C8' },
  { id: 8, initials: 'PP', name: 'Partner 8',        type: 'Alianza en curso',      region: 'LATAM',          color: '#4A9EFF' },
]

const TRACK = [...PARTNERS, ...PARTNERS]

function PartnerCard({ p }) {
  return (
    <div className="ali-card" style={{ '--ali-color': p.color }}>
      <div className="ali-logo">
        <span>{p.initials}</span>
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
          <p className="ali-sub">Construimos sobre las mejores plataformas del mundo para entregar soluciones que escalan</p>
        </header>
      </div>

      <div className="ali-viewport">
        <div className="ali-track">
          {TRACK.map((p, i) => (
            <PartnerCard key={`${p.id}-${i}`} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
