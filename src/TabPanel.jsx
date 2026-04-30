import { useState, useEffect, useRef } from 'react'
import './TabPanel.css'

const TABS = [
  { id: 'servicios',  label: 'Explorar servicios', short: 'Software, agentes y visión IA aplicada a tu negocio.',   videoP: 0.62 },
  { id: 'trabajamos', label: 'Cómo trabajamos',    short: 'Proceso en 5 etapas con seguridad y código auditable.', videoP: 0.76 },
  { id: 'elegirnos',  label: 'Por qué elegirnos',  short: '3× más rápido. 40% menos costo. 100% a medida.',        videoP: 0.83 },
  { id: 'reunion',    label: 'Agendar una reunión', short: '30 minutos. Sin formularios. Conversación directa.',    videoP: 0.90 },
]

// ── SVG icons animados — uno por servicio ────────────────────────
function SvgSoftware() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="svc-icon">
      <rect x="13" y="13" width="22" height="22" rx="3" stroke="white" strokeWidth="1.5" />
      <rect x="19" y="19" width="10" height="10" rx="1.5" stroke="white" strokeWidth="1">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="2.4s" repeatCount="indefinite" />
      </rect>
      {/* Pins L */}
      <line x1="13" y1="18" x2="7"  y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="24" x2="7"  y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="30" x2="7"  y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pins R */}
      <line x1="35" y1="18" x2="41" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="35" y1="24" x2="41" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="35" y1="30" x2="41" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pins T */}
      <line x1="18" y1="13" x2="18" y2="7"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="13" x2="24" y2="7"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="13" x2="30" y2="7"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pins B */}
      <line x1="18" y1="35" x2="18" y2="41" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="35" x2="24" y2="41" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="35" x2="30" y2="41" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* Expanding ring */}
      <circle cx="24" cy="24" stroke="white" strokeWidth="1" fill="none">
        <animate attributeName="r"       values="4;11;4"     dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8"  dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="24" cy="24" r="2" fill="white" />
    </svg>
  )
}

function SvgAgentes() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="svc-icon">
      {/* Edges */}
      <line x1="24" y1="10" x2="10" y2="37" stroke="white" strokeWidth="1"   strokeOpacity="0.35" />
      <line x1="24" y1="10" x2="38" y2="37" stroke="white" strokeWidth="1"   strokeOpacity="0.35" />
      <line x1="10" y1="37" x2="38" y2="37" stroke="white" strokeWidth="1"   strokeOpacity="0.35" />
      {/* Node rings */}
      <circle cx="24" cy="10" r="4" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="37" r="4" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="38" cy="37" r="4" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Node fills — staggered pulse */}
      <circle cx="24" cy="10" r="2" fill="white"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="0s"  repeatCount="indefinite" /></circle>
      <circle cx="10" cy="37" r="2" fill="white"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="1s"  repeatCount="indefinite" /></circle>
      <circle cx="38" cy="37" r="2" fill="white"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="2s"  repeatCount="indefinite" /></circle>
      {/* Flow dots */}
      <circle r="2" fill="white">
        <animateMotion path="M24,10 L10,37"  dur="1.8s" begin="0s"   repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin="0s"   repeatCount="indefinite" />
      </circle>
      <circle r="2" fill="white">
        <animateMotion path="M10,37 L38,37"  dur="1.8s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
      </circle>
      <circle r="2" fill="white">
        <animateMotion path="M38,37 L24,10"  dur="1.8s" begin="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin="1.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

function SvgVision() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="svc-icon">
      <defs>
        <clipPath id="svc-vision-clip">
          <ellipse cx="24" cy="24" rx="19" ry="10" />
        </clipPath>
      </defs>
      <ellipse cx="24" cy="24" rx="19" ry="10" stroke="white" strokeWidth="1.5" />
      <circle  cx="24" cy="24" r="6"            stroke="white" strokeWidth="1"   />
      {/* Pupil — contracts and expands */}
      <circle cx="24" cy="24" fill="white">
        <animate attributeName="r" values="2.5;3.5;2;3.5;2.5" dur="3.2s" repeatCount="indefinite" />
      </circle>
      {/* Specular highlight */}
      <circle cx="27" cy="21" r="1.4" fill="white" fillOpacity="0.35" />
      {/* Scan line — sweeps across clipped to the eye */}
      <rect y="20" width="7" height="8" fill="white" fillOpacity="0.5" clipPath="url(#svc-vision-clip)">
        <animate attributeName="x" values="-7;48;-7" dur="2.6s" repeatCount="indefinite" />
      </rect>
    </svg>
  )
}

function SvgML() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="svc-icon">
      {/* Weights — input → hidden */}
      <line x1="10" y1="18" x2="24" y2="12" stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1="10" y1="18" x2="24" y2="24" stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1="10" y1="18" x2="24" y2="36" stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1="10" y1="30" x2="24" y2="12" stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1="10" y1="30" x2="24" y2="24" stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1="10" y1="30" x2="24" y2="36" stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      {/* Weights — hidden → output */}
      <line x1="24" y1="12" x2="38" y2="24" stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1="24" y1="24" x2="38" y2="24" stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1="24" y1="36" x2="38" y2="24" stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      {/* Nodes */}
      <circle cx="10" cy="18" r="3.5" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="30" r="3.5" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="12" r="3.5" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="3.5" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="36" r="3.5" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="38" cy="24" r="3.5" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Signals traveling through the network */}
      <circle r="1.8" fill="white">
        <animateMotion path="M10,18 L24,24 L38,24" dur="2s" begin="0s"   repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;1;0" dur="2s"     begin="0s"   repeatCount="indefinite" />
      </circle>
      <circle r="1.8" fill="white">
        <animateMotion path="M10,30 L24,12 L38,24" dur="2s" begin="0.7s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;1;0" dur="2s"     begin="0.7s" repeatCount="indefinite" />
      </circle>
      {/* Output node flash */}
      <circle cx="38" cy="24" r="2" fill="white">
        <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

function SvgSoluciones() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="svc-icon">
      {/* Layer 3 — base */}
      <rect x="6"  y="35" width="36" height="7" rx="2" stroke="white" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.3;0.95;0.3" dur="3.6s" begin="0s"   repeatCount="indefinite" />
      </rect>
      {/* Layer 2 — mid */}
      <rect x="10" y="25" width="28" height="7" rx="2" stroke="white" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.3;0.95;0.3" dur="3.6s" begin="0.6s" repeatCount="indefinite" />
      </rect>
      {/* Layer 1 — top */}
      <rect x="14" y="15" width="20" height="7" rx="2" stroke="white" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.3;0.95;0.3" dur="3.6s" begin="1.2s" repeatCount="indefinite" />
      </rect>
      {/* Vertical connectors */}
      <line x1="14" y1="32" x2="14" y2="35" stroke="white" strokeWidth="1" strokeOpacity="0.35" strokeLinecap="round" />
      <line x1="34" y1="32" x2="34" y2="35" stroke="white" strokeWidth="1" strokeOpacity="0.35" strokeLinecap="round" />
      <line x1="18" y1="22" x2="18" y2="25" stroke="white" strokeWidth="1" strokeOpacity="0.35" strokeLinecap="round" />
      <line x1="30" y1="22" x2="30" y2="25" stroke="white" strokeWidth="1" strokeOpacity="0.35" strokeLinecap="round" />
      {/* Top accent */}
      <line x1="21" y1="12" x2="27" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="3.6s" begin="1.8s" repeatCount="indefinite" />
      </line>
      <line x1="24" y1="12" x2="24" y2="15" stroke="white" strokeWidth="1" strokeOpacity="0.35" strokeLinecap="round" />
    </svg>
  )
}

const SERVICES = [
  { num: '01', title: 'Software con IA',       sub: 'Aplicaciones que piensan',        desc: 'Sistemas que integran modelos de lenguaje, lógica de negocio y experiencia de usuario en un solo producto funcional y mantenible.', Icon: SvgSoftware   },
  { num: '02', title: 'Agentes IA',            sub: 'Procesos que se ejecutan solos',  desc: 'Agentes autónomos que toman decisiones y activan flujos complejos. Conectados con ERP, CRM, WhatsApp e Instagram.',               Icon: SvgAgentes    },
  { num: '03', title: 'Visión Computacional',  sub: 'Máquinas que ven y entienden',    desc: 'Detección de objetos y reconocimiento visual en tiempo real para operaciones críticas e industriales.',                             Icon: SvgVision     },
  { num: '04', title: 'Machine Learning',      sub: 'Modelos que mejoran con el uso',  desc: 'Clasificación, predicción y modelos adaptados a tus datos con criterio de producción real.',                                        Icon: SvgML         },
  { num: '05', title: 'Soluciones a Medida',   sub: 'Arquitectura para crecer',        desc: 'Diseño técnico integral con escalabilidad real y deuda técnica controlada.',                                                         Icon: SvgSoluciones },
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
  { type: 'Alianza',    cost: 'REUNIÓN PAGA', free: false, img: '/meetings/alianza.png',    desc: 'Partnership o propuesta comercial conjunta.',          cta: 'Explorar alianza →',     url: '#alianza'    },
  { type: 'Desarrollo', cost: 'SIN COSTO',    free: true,  img: '/meetings/desarrollo.png', desc: 'Construir una solución, plataforma o automatización.', cta: 'Solicitar desarrollo →', url: '#desarrollo' },
]

/* ── Contenidos de cada sección ── */
const openReunionTab = () =>
  window.dispatchEvent(new CustomEvent('tp:openTab', { detail: 3 }))

function ContentServicios() {
  return (
    <div className="tc-grid">
      {SERVICES.map(({ num, title, sub, desc, Icon }) => (
        <div key={num} className="tc-card">
          <div className="tc-card-icon">
            <Icon />
          </div>
          <div className="tc-card-body">
            <span className="tc-card-num">{num}</span>
            <strong className="tc-card-title">{title}</strong>
            <em className="tc-card-sub">{sub}</em>
            <p className="tc-card-desc">{desc}</p>
            <button className="tc-card-cta" onClick={openReunionTab}>
              Agendar →
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}


// ── SVG icons — Cómo trabajamos ─────────────────────────────────
function SvgDiagnostico() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="step-icon">
      <defs><clipPath id="stp-diag"><circle cx="19" cy="19" r="11"/></clipPath></defs>
      {/* Lupa */}
      <circle cx="19" cy="19" r="11" stroke="white" strokeWidth="1.5"/>
      <circle cx="19" cy="19" r="5"  stroke="white" strokeWidth="0.75" strokeOpacity="0.4"/>
      {/* Mango */}
      <line x1="27" y1="27" x2="41" y2="41" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Línea de scan calipso */}
      <line x1="8" y1="19" x2="30" y2="19" stroke="#00D4C8" strokeWidth="1.5" clipPath="url(#stp-diag)">
        <animateTransform attributeName="transform" type="translate" values="0,-10; 0,10; 0,-10" dur="2.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.35;0.95;0.35" dur="2.2s" repeatCount="indefinite"/>
      </line>
      {/* Dato detectado */}
      <circle cx="19" cy="19" r="2" fill="#00D4C8" fillOpacity="0.6" clipPath="url(#stp-diag)">
        <animate attributeName="opacity" values="0;1;0" dur="2.2s" begin="1.1s" repeatCount="indefinite"/>
      </circle>
      {/* Reflejo */}
      <circle cx="13" cy="13" r="1.5" fill="white" fillOpacity="0.35"/>
    </svg>
  )
}

function SvgDiseno() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="step-icon">
      <defs>
        <pattern id="stp-bp-grid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.65" fill="white" fillOpacity="0.18"/>
        </pattern>
      </defs>
      {/* Grilla */}
      <rect x="5" y="5" width="38" height="38" fill="url(#stp-bp-grid)"/>
      {/* Brackets de esquina */}
      <path d="M5,13 L5,5 L13,5"    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M35,5 L43,5 L43,13"  stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M43,35 L43,43 L35,43" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13,43 L5,43 L5,35"  stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Forma dibujándose (edificio/arco) */}
      <path d="M14,34 L14,21 L24,13 L34,21 L34,34"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="76">
        <animate attributeName="stroke-dashoffset" values="76;0;0;76" dur="3.6s" repeatCount="indefinite"/>
      </path>
      {/* Puerta que aparece */}
      <rect x="21" y="27" width="6" height="7" stroke="white" strokeWidth="1" fill="none">
        <animate attributeName="opacity" values="0;0;0;1;1;0" dur="3.6s" repeatCount="indefinite"/>
      </rect>
      {/* Cursor calipso */}
      <circle r="2.5" fill="#00D4C8">
        <animateMotion path="M14,34 L14,21 L24,13 L34,21 L34,34" dur="3.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;1;1;0.2;0;0" dur="3.6s" repeatCount="indefinite"/>
      </circle>
    </svg>
  )
}

function SvgDesarrollo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="step-icon">
      {/* Terminal */}
      <rect x="4" y="8" width="40" height="32" rx="4" stroke="white" strokeWidth="1.5"/>
      <line x1="4" y1="16" x2="44" y2="16" stroke="white" strokeWidth="0.75" strokeOpacity="0.3"/>
      {/* Dots título */}
      <circle cx="11" cy="12" r="1.8" fill="white" fillOpacity="0.55"/>
      <circle cx="17" cy="12" r="1.8" fill="white" fillOpacity="0.3"/>
      <circle cx="23" cy="12" r="1.8" fill="white" fillOpacity="0.16"/>
      {/* Prompt > */}
      <path d="M9,22 L13,25 L9,28" stroke="#00D4C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Líneas de código apareciendo */}
      <rect x="16" y="22.5" height="2.5" rx="1" fill="white" fillOpacity="0.72" width="0">
        <animate attributeName="width" values="0;17;17;17;0" dur="4s" begin="0s"   repeatCount="indefinite"/>
      </rect>
      <rect x="9"  y="28"   height="2.5" rx="1" fill="white" fillOpacity="0.5"  width="0">
        <animate attributeName="width" values="0;0;23;23;0"  dur="4s" begin="0s"   repeatCount="indefinite"/>
      </rect>
      <rect x="9"  y="33.5" height="2.5" rx="1" fill="white" fillOpacity="0.62" width="0">
        <animate attributeName="width" values="0;0;0;15;0"   dur="4s" begin="0s"   repeatCount="indefinite"/>
      </rect>
      {/* Cursor parpadeante */}
      <rect x="9" y="22.5" width="4.5" height="2.5" rx="0.5" fill="#00D4C8">
        <animate attributeName="opacity" values="1;0;1" dur="0.85s" repeatCount="indefinite"/>
      </rect>
    </svg>
  )
}

function SvgDeploy() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="step-icon">
      {/* Estrellas parpadeantes */}
      <circle cx="7"  cy="9"  r="1"   fill="white"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" begin="0s"    repeatCount="indefinite"/></circle>
      <circle cx="41" cy="7"  r="0.8" fill="white"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" begin="0.8s"  repeatCount="indefinite"/></circle>
      <circle cx="43" cy="21" r="1"   fill="white"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" begin="1.6s"  repeatCount="indefinite"/></circle>
      <circle cx="5"  cy="28" r="0.8" fill="white"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" begin="0.4s"  repeatCount="indefinite"/></circle>
      {/* Cohete flotando */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,3; 0,-3; 0,3" dur="2.8s" repeatCount="indefinite"/>
        <path d="M24,5 L30,19 L30,33 L24,37 L18,33 L18,19 Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="24" cy="23" r="4" stroke="white" strokeWidth="1"/>
        <circle cx="24" cy="23" r="1.8" fill="white" fillOpacity="0.18"/>
        <path d="M18,29 L12,37 L18,34" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M30,29 L36,37 L30,34" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
        {/* Llama calipso */}
        <path d="M21,37 L24,46 L27,37" stroke="#00D4C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="opacity" values="0.5;1;0.65;1;0.5" dur="0.55s" repeatCount="indefinite"/>
        </path>
      </g>
    </svg>
  )
}

function SvgOptimizacion() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="step-icon">
      {/* Ejes */}
      <line x1="8" y1="40" x2="44" y2="40" stroke="white" strokeWidth="1"   strokeOpacity="0.3"/>
      <line x1="8" y1="8"  x2="8"  y2="40" stroke="white" strokeWidth="1"   strokeOpacity="0.3"/>
      {/* Marcas eje Y */}
      <line x1="6" y1="30" x2="9" y2="30" stroke="white" strokeWidth="0.75" strokeOpacity="0.3"/>
      <line x1="6" y1="20" x2="9" y2="20" stroke="white" strokeWidth="0.75" strokeOpacity="0.3"/>
      <line x1="6" y1="10" x2="9" y2="10" stroke="white" strokeWidth="0.75" strokeOpacity="0.3"/>
      {/* Barras creciendo */}
      <rect x="13" y="30" width="7" height="10" rx="1.5" fill="white" fillOpacity="0.55">
        <animate attributeName="y"      values="40;30;30;40" dur="2.8s" begin="0s"    repeatCount="indefinite"/>
        <animate attributeName="height" values="0;10;10;0"   dur="2.8s" begin="0s"    repeatCount="indefinite"/>
      </rect>
      <rect x="23" y="20" width="7" height="20" rx="1.5" fill="white" fillOpacity="0.72">
        <animate attributeName="y"      values="40;20;20;40" dur="2.8s" begin="0.22s" repeatCount="indefinite"/>
        <animate attributeName="height" values="0;20;20;0"   dur="2.8s" begin="0.22s" repeatCount="indefinite"/>
      </rect>
      <rect x="33" y="10" width="7" height="30" rx="1.5" fill="white" fillOpacity="0.9">
        <animate attributeName="y"      values="40;10;10;40" dur="2.8s" begin="0.44s" repeatCount="indefinite"/>
        <animate attributeName="height" values="0;30;30;0"   dur="2.8s" begin="0.44s" repeatCount="indefinite"/>
      </rect>
      {/* Línea de tendencia */}
      <path d="M16.5,30 L26.5,20 L36.5,10" stroke="#00D4C8" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="42">
        <animate attributeName="stroke-dashoffset" values="42;0;0;42" dur="2.8s" begin="0.55s" repeatCount="indefinite"/>
      </path>
      {/* Dot superior — resultado */}
      <circle cx="36.5" cy="10" r="3" stroke="#00D4C8" strokeWidth="1.5" fill="none">
        <animate attributeName="opacity" values="0;0;1;1;0" dur="2.8s" begin="0.9s" repeatCount="indefinite"/>
      </circle>
      {/* Flecha ciclo continuo */}
      <path d="M43,13 A5,5 0 1 0 38,8" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" strokeOpacity="0.5">
        <animateTransform attributeName="transform" type="rotate" values="0,40,11; 360,40,11" dur="4s" repeatCount="indefinite"/>
      </path>
    </svg>
  )
}

const STEP_ICONS = [SvgDiagnostico, SvgDiseno, SvgDesarrollo, SvgDeploy, SvgOptimizacion]

function ContentTrabajamos() {
  const items = []
  STEPS.forEach((s, i) => {
    const Icon = STEP_ICONS[i]
    items.push(
      <div key={s.num} className="tc-pipeline-step">
        <div className="tc-pipeline-orb">
          <Icon />
          <span className="tc-pipeline-orb-ring" />
        </div>
        <span className="tc-pipeline-num">{s.num}</span>
        <strong className="tc-pipeline-title">{s.title}</strong>
        <p className="tc-pipeline-desc">{s.desc}</p>
      </div>
    )
    if (i < STEPS.length - 1) {
      items.push(
        <div key={`c${i}`} className="tc-pipeline-conn">
          <svg viewBox="0 0 40 14" fill="none" className="tc-conn-svg">
            <line x1="0" y1="7" x2="36" y2="7" stroke="white" strokeWidth="0.75" strokeOpacity="0.2"/>
            <polygon points="33,4 40,7 33,10" fill="white" fillOpacity="0.18"/>
            <circle r="2.2" fill="#00D4C8" fillOpacity="0.9">
              <animateMotion path="M0,7 L38,7" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      )
    }
  })

  return (
    <div className="tc-process">
      <p className="tc-lead">Cada etapa incluye revisión de seguridad. Código auditable y mantenible — no solo funcional.</p>
      <div className="tc-pipeline">
        {items}
      </div>
    </div>
  )
}

// ── SVG orbital — Por qué elegirnos ─────────────────────────────
function SvgElegirnos() {
  const orbit = "M144,80 A64,17 0 1 0 16,80 A64,17 0 1 0 144,80"
  return (
    <svg viewBox="0 0 160 160" fill="none" className="eli-svg">
      {/* Halo de fondo */}
      <circle cx="80" cy="80" r="58" fill="rgba(0,212,200,0.03)"/>

      {/* Anillo 3 — inclinado 110° (capa trasera) */}
      <g transform="rotate(110, 80, 80)">
        <ellipse cx="80" cy="80" rx="64" ry="17" stroke="white" strokeWidth="0.75" strokeOpacity="0.17"/>
        <circle r="3" fill="white">
          <animateMotion path={orbit} dur="7.2s" begin="-2.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.25;0.65;0.25" dur="7.2s" begin="-2.4s" repeatCount="indefinite"/>
        </circle>
      </g>

      {/* Anillo 2 — inclinado 55° */}
      <g transform="rotate(55, 80, 80)">
        <ellipse cx="80" cy="80" rx="64" ry="17" stroke="white" strokeWidth="0.9"  strokeOpacity="0.22"/>
        <circle r="3.5" fill="white">
          <animateMotion path={orbit} dur="5.5s" begin="-1.1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.35;0.8;0.35"  dur="5.5s" begin="-1.1s" repeatCount="indefinite"/>
        </circle>
      </g>

      {/* Anillo 1 — ecuatorial (capa frontal) */}
      <ellipse cx="80" cy="80" rx="64" ry="17" stroke="white" strokeWidth="1.1" strokeOpacity="0.28"/>
      <circle r="4.5" fill="white">
        <animateMotion path={orbit} dur="4s" begin="0s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="0s" repeatCount="indefinite"/>
      </circle>

      {/* Pulso calipso — onda expansiva */}
      <circle cx="80" cy="80" fill="none" stroke="#00D4C8" strokeWidth="1">
        <animate attributeName="r"       values="22;42;22"  dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="80" cy="80" fill="none" stroke="#00D4C8" strokeWidth="0.7">
        <animate attributeName="r"       values="22;42;22"    dur="3s" begin="-1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0;0.3"   dur="3s" begin="-1.5s" repeatCount="indefinite"/>
      </circle>

      {/* Núcleo */}
      <circle cx="80" cy="80" r="19" fill="rgba(0,212,200,0.1)" stroke="rgba(0,212,200,0.45)" strokeWidth="1.5"/>
      <circle cx="80" cy="80" fill="rgba(0,212,200,0.28)">
        <animate attributeName="r" values="9;12;9" dur="2.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="80" cy="80" r="5.5" fill="#00D4C8">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.6s" repeatCount="indefinite"/>
      </circle>

      {/* Labels flotantes que aparecen en ciclo */}
      <text x="80" y="22"  textAnchor="middle" fontSize="9"  fontWeight="bold" fill="white" fillOpacity="0" fontFamily="system-ui,sans-serif">
        3× rápido
        <animate attributeName="fillOpacity" values="0;0;0.55;0.55;0" dur="8s" begin="0s"   repeatCount="indefinite"/>
      </text>
      <text x="22" y="120" textAnchor="middle" fontSize="9"  fontWeight="bold" fill="white" fillOpacity="0" fontFamily="system-ui,sans-serif">
        40% ahorro
        <animate attributeName="fillOpacity" values="0;0;0.55;0.55;0" dur="8s" begin="2.7s" repeatCount="indefinite"/>
      </text>
      <text x="138" y="120" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white" fillOpacity="0" fontFamily="system-ui,sans-serif">
        100% tuyo
        <animate attributeName="fillOpacity" values="0;0;0.55;0.55;0" dur="8s" begin="5.4s" repeatCount="indefinite"/>
      </text>
    </svg>
  )
}

function ContentElegirnos() {
  return (
    <div className="tc-reasons">

      {/* ── Contenido izquierdo ── */}
      <div className="tc-reasons-content">
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

      {/* ── Visual orbital ── */}
      <div className="tc-reasons-visual">
        <SvgElegirnos />
      </div>

    </div>
  )
}

const MEETING_COLORS = ['calipso', 'blue']

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
            <div className="tc-meeting-img">
              <img src={m.img} alt={m.type} />
            </div>
            <div className="tc-meeting-body">
              <strong>{m.type}</strong>
              <p>{m.desc}</p>
              <span className="tc-cta">{m.cta}</span>
            </div>
          </a>
        ))}
      </div>
      <p className="tc-footnote">30 minutos. Sin formularios. Una conversación honesta.</p>
    </div>
  )
}

const CONTENT_MAP = {
  servicios:  ContentServicios,
  trabajamos: ContentTrabajamos,
  elegirnos:  ContentElegirnos,
  reunion:    ContentReunion,
}

/* ══════════════════════════════════════════
   Componente principal
══════════════════════════════════════════ */
export default function TabPanel({ videoRef }) {
  const [activeIdx, setActiveIdx]   = useState(null)
  const [menuLeaving, setMenuLeaving] = useState(false)
  const openTabRef = useRef(null)

  const openTab = (idx) => {
    const v = videoRef?.current
    if (v?.duration) v.currentTime = TABS[idx].videoP * v.duration

    if (activeIdx !== null) {
      setActiveIdx(idx)
      return
    }
    setMenuLeaving(true)
    setTimeout(() => {
      setActiveIdx(idx)
      setMenuLeaving(false)
    }, 380)
  }

  openTabRef.current = openTab  // siempre apunta al openTab del render actual

  const goBack = () => setActiveIdx(null)

  useEffect(() => {
    const handler = (e) => openTabRef.current(e.detail)
    window.addEventListener('tp:openTab', handler)
    return () => window.removeEventListener('tp:openTab', handler)
  }, [])

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
