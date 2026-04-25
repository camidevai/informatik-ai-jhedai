import { useState, useEffect } from 'react'
import './TabPanel.css'

const TABS = [
  { id: 'servicios',   label: 'Explorar servicios',  short: 'Software, agentes y visión IA aplicada a tu negocio.',    videoP: 0.62 },
  { id: 'construimos', label: 'Lo que construimos',   short: 'Cinco capacidades técnicas del ciclo completo con IA.',   videoP: 0.69 },
  { id: 'trabajamos',  label: 'Cómo trabajamos',      short: 'Proceso en 5 etapas con seguridad y código auditable.',  videoP: 0.76 },
  { id: 'elegirnos',   label: 'Por qué elegirnos',    short: '3× más rápido. 40% menos costo. 100% a medida.',         videoP: 0.83 },
  { id: 'reunion',     label: 'Agendar una reunión',  short: '30 minutos. Sin formularios. Conversación directa.',     videoP: 0.90 },
]

const SERVICES = [
  { num: '01', title: 'Software con IA',        sub: 'Aplicaciones que piensan',        desc: 'Sistemas que integran modelos de lenguaje, lógica de negocio y experiencia de usuario en un solo producto funcional y mantenible.' },
  { num: '02', title: 'Agentes IA',             sub: 'Procesos que se ejecutan solos',  desc: 'Agentes autónomos que toman decisiones y activan flujos complejos. Conectados con ERP, CRM, WhatsApp e Instagram.' },
  { num: '03', title: 'Visión Computacional',   sub: 'Máquinas que ven y entienden',    desc: 'Detección de objetos y reconocimiento visual en tiempo real para operaciones críticas e industriales.' },
  { num: '04', title: 'Machine Learning',       sub: 'Modelos que mejoran con el uso',  desc: 'Clasificación, predicción y modelos adaptados a tus datos con criterio de producción real.' },
  { num: '05', title: 'Soluciones a Medida',    sub: 'Arquitectura para crecer',        desc: 'Diseño técnico integral con escalabilidad real y deuda técnica controlada.' },
]

const STEPS = [
  { num: '01', title: 'Diagnóstico',  desc: 'Entendemos el problema real, no solo el síntoma.' },
  { num: '02', title: 'Diseño',       desc: 'Arquitectura técnica adaptada a tu caso y escala.' },
  { num: '03', title: 'Desarrollo',   desc: 'Código auditable, seguro y mantenible.' },
  { num: '04', title: 'Deploy',       desc: 'Entrega en producción con revisión de seguridad.' },
  { num: '05', title: 'Optimización', desc: 'Mejora continua basada en datos reales de uso.' },
]

const REASONS = [
  { stat: '3×',      label: 'Más rápido',  desc: 'que el desarrollo tradicional' },
  { stat: '40%',     label: 'Menos costo', desc: 'con el mismo nivel de calidad'  },
  { stat: 'IA real', label: 'Aplicada',    desc: 'no demos, no prototipos'         },
  { stat: '100%',    label: 'A medida',    desc: 'diseñada para tu caso'           },
]

// Reemplaza cada url con el link real de Calendly / Google Calendar
const MEETINGS = [
  { type: 'Alianza',      cost: 'REUNIÓN PAGA', free: false, desc: 'Partnership o propuesta comercial conjunta.',          cta: 'Explorar alianza →',     url: '#alianza'     },
  { type: 'Desarrollo',   cost: 'SIN COSTO',    free: true,  desc: 'Construir una solución, plataforma o automatización.', cta: 'Solicitar desarrollo →', url: '#desarrollo'  },
  { type: 'Colaboración', cost: 'SIN COSTO',    free: true,  desc: 'Proyecto conjunto o iniciativa específica.',           cta: 'Iniciar conversación →', url: '#colaboracion' },
]

/* ── Contenidos de cada sección ── */
const openReunionTab = () =>
  window.dispatchEvent(new CustomEvent('tp:openTab', { detail: 4 }))

function ContentServicios() {
  return (
    <div className="tc-grid">
      {SERVICES.map(s => (
        <div key={s.num} className="tc-card">
          <span className="tc-card-num">{s.num}</span>
          <strong className="tc-card-title">{s.title}</strong>
          <em className="tc-card-sub">{s.sub}</em>
          <p className="tc-card-desc">{s.desc}</p>
          <button className="tc-card-cta" onClick={openReunionTab}>
            Agendar →
          </button>
        </div>
      ))}
    </div>
  )
}

function ContentConstruimos() {
  return (
    <div className="tc-list">
      {SERVICES.map(s => (
        <div key={s.num} className="tc-row">
          <span className="tc-row-num">{s.num}</span>
          <div>
            <strong>{s.title}</strong>
            <em className="tc-row-sub">{s.sub}</em>
            <p className="tc-row-desc">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ContentTrabajamos() {
  return (
    <div className="tc-steps-wrap">
      <p className="tc-lead">Cada etapa incluye revisión de seguridad. Código auditable y mantenible — no solo funcional.</p>
      <div className="tc-steps">
        {STEPS.map((s, i) => (
          <div key={s.num} className="tc-step">
            <div className="tc-step-head">
              <div className="tc-step-dot">{s.num}</div>
              {i < STEPS.length - 1 && <div className="tc-step-connector" />}
            </div>
            <strong>{s.title}</strong>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContentElegirnos() {
  return (
    <div className="tc-reasons">
      <div className="tc-stats">
        {REASONS.map(r => (
          <div key={r.stat} className="tc-stat">
            <span className="tc-stat-val">{r.stat}</span>
            <strong>{r.label}</strong>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>
      <div className="tc-props">
        <div className="tc-prop"><span>100% Ejecución propia</span><p>No consultamos sin construir.</p></div>
        <div className="tc-prop"><span>2 en 1</span><p>Estrategia + código — negocio y técnica en el mismo equipo.</p></div>
        <div className="tc-prop"><span>Ciclos cortos</span><p>Equipos pequeños, decisiones inmediatas.</p></div>
      </div>
      <blockquote className="tc-quote">
        "La calidad de lo que construimos es el mejor argumento que tenemos."
        <cite>JhedAi × Informatik-AI</cite>
      </blockquote>
    </div>
  )
}

const MEETING_COLORS = ['calipso', 'blue', 'violet']

function ContentReunion() {
  return (
    <div className="tc-reunion">
      <p className="tc-lead">Elegí el tipo de conversación y llegás al calendario correcto.</p>
      <div className="tc-meetings">
        {MEETINGS.map((m, i) => (
          <a
            key={m.type}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`tc-meeting tc-meeting--${MEETING_COLORS[i]}`}
          >
            <strong>{m.type}</strong>
            <p>{m.desc}</p>
            <span className="tc-cta">{m.cta}</span>
          </a>
        ))}
      </div>
      <p className="tc-footnote">30 minutos. Sin formularios. Una conversación honesta.</p>
    </div>
  )
}

const CONTENT_MAP = {
  servicios:   ContentServicios,
  construimos: ContentConstruimos,
  trabajamos:  ContentTrabajamos,
  elegirnos:   ContentElegirnos,
  reunion:     ContentReunion,
}

/* ══════════════════════════════════════════
   Componente principal
══════════════════════════════════════════ */
export default function TabPanel({ videoRef }) {
  const [activeIdx, setActiveIdx]   = useState(null)
  const [menuLeaving, setMenuLeaving] = useState(false)

  const openTab = (idx) => {
    const v = videoRef?.current
    if (v?.duration) v.currentTime = TABS[idx].videoP * v.duration

    if (activeIdx !== null) {
      // Ya estamos en detalle: cambia directo
      setActiveIdx(idx)
      return
    }
    // Desde menú: anima salida del menú, luego muestra detalle
    setMenuLeaving(true)
    setTimeout(() => {
      setActiveIdx(idx)
      setMenuLeaving(false)
    }, 380)
  }

  const goBack = () => setActiveIdx(null)

  // Escucha evento externo para abrir un tab específico (ej. desde botón CTA de logos)
  useEffect(() => {
    const handler = (e) => openTab(e.detail)
    window.addEventListener('tp:openTab', handler)
    return () => window.removeEventListener('tp:openTab', handler)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Pantalla de botones ── */
  if (activeIdx === null) {
    return (
      <div className={`tp-menu ${menuLeaving ? 'tp-menu--leaving' : ''}`}>

        {/* Columna izquierda — botones */}
        <div className="tp-menu-col tp-menu-col--btns">
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              className="tp-menu-btn"
              onClick={() => openTab(idx)}
            >
              <div className="tp-menu-left">
                <span className="tp-menu-num">{String(idx + 1).padStart(2, '0')}</span>
                <div className="tp-menu-text">
                  <strong>{tab.label}</strong>
                  <p>{tab.short}</p>
                </div>
              </div>
              <span className="tp-menu-arrow">→</span>
            </button>
          ))}
        </div>

        {/* Columna derecha — logos */}
        <div className="tp-menu-col tp-menu-col--img">
          <div className="tp-menu-img-placeholder">
            <img src="/logos/jhedai.png"        alt="JHED AI"       className="tp-placeholder-logo tp-placeholder-logo--jhedai" />
            <img src="/logos/informatik-ai.png" alt="InformatiK-AI" className="tp-placeholder-logo" />
          </div>
        </div>

      </div>
    )
  }

  /* ── Pantalla de contenido ── */
  const ActiveContent = CONTENT_MAP[TABS[activeIdx].id]

  return (
    <div className="tp-detail">
      <div className="tp-detail-header">
        <button className="tp-back" onClick={goBack}>← Volver</button>
        <span className="tp-detail-title">{TABS[activeIdx].label}</span>
        <span className="tp-detail-num">{String(activeIdx + 1).padStart(2, '0')}</span>
      </div>
      <div className="tp-detail-body">
        <div className="tp-detail-slide">
          <ActiveContent />
        </div>
      </div>
    </div>
  )
}
