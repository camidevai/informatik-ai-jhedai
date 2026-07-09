import './Alianzas.css'

const PARTNERS = [
  { id: 1,  logo: '/logos/Alianzas estratégicas/cchia.png',                               name: 'CCHIA', dark: true },
  { id: 2,  logo: '/logos/Alianzas estratégicas/Logo CENIA V2.png',                       name: 'CENIA' },
  { id: 3,  logo: '/logos/Alianzas estratégicas/logo USS.png',                            name: 'USS' },
  { id: 4,  logo: '/logos/Alianzas estratégicas/Chile Valora.png',                        name: 'Chile Valora' },
  { id: 5,  logo: '/logos/Alianzas estratégicas/CRTIC-removebg-preview.png',              name: 'CRTIC' },
  { id: 6,  logo: '/logos/Alianzas estratégicas/logo_NLHPC_horiz_rgb.png',               name: 'NLHPC' },
  { id: 7,  logo: '/logos/Alianzas estratégicas/LOGO_CIRCULO-STARTUPS_DE_EIVA_1.png',    name: 'Círculo Startups EIVA', dark: true },
  { id: 8,  logo: '/logos/Alianzas estratégicas/Banco El Salvador Transparente.png',     name: 'Banco El Salvador' },
  { id: 9,  logo: '/logos/Alianzas estratégicas/Tenpo.png',                              name: 'Tenpo' },
  { id: 10, logo: '/logos/Alianzas estratégicas/Logo_Color.png',                         name: 'Partner' },
  { id: 11, logo: '/logos/Alianzas estratégicas/apob_ai.png',                            name: 'APOB AI' },
  { id: 12, logo: '/logos/Alianzas estratégicas/csiaa_logo.jfif',                        name: 'CSIAA' },
  { id: 13, logo: '/logos/Alianzas estratégicas/logo vehice.png',                        name: 'Vehice' },
  { id: 14, logo: '/logos/Alianzas estratégicas/logo_Datamate-removebg-preview.png',     name: 'Datamate' },
  { id: 15, logo: '/logos/Alianzas estratégicas/logo_latam_gpt-removebg-preview.png',   name: 'Latam GPT' },
  { id: 16, logo: '/logos/Alianzas estratégicas/muni viña 2.png',                        name: 'Municipalidad de Viña' },
  { id: 17, logo: '/logos/Alianzas estratégicas/onlyoffice.png',                         name: 'OnlyOffice' },
  { id: 18, logo: '/logos/Alianzas estratégicas/printify.png',                           name: 'Printify' },
]

function PartnerCard({ p }) {
  return (
    <div className="ali-card" aria-label={p.name}>
      <div className={`ali-logo${p.dark ? ' ali-logo--dark' : ''}`}>
        <img src={p.logo} alt={p.name} className="ali-logo-img" />
      </div>
      <span className="ali-name">{p.name}</span>
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

      <div className="ali-grid">
        {PARTNERS.map(p => (
          <PartnerCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  )
}
