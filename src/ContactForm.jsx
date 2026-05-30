import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './ContactForm.css'

const SERVICES_OPTIONS = [
  'Agentes IA',
  'Automatización de procesos',
  'Computer Vision',
  'Machine Learning',
  'Desarrollo de software a medida',
  'Consultoría estratégica en IA',
  'Otro',
]

const BUDGET_OPTIONS = [
  'Menos de $1.000 USD',
  '$1.000 – $5.000 USD',
  '$5.000 – $15.000 USD',
  '$15.000 – $50.000 USD',
  'Más de $50.000 USD',
  'Por definir',
]

const INITIAL = {
  user_name: '',
  user_email: '',
  phone: '',
  company: '',
  services: '',
  budget: '',
  message: '',
}

const MIN_MSG = 50

const PERKS = [
  { icon: 'clock',  title: 'Respuesta rápida',  text: 'Menos de 24 horas' },
  { icon: 'shield', title: 'Confidencialidad',  text: 'Tu información está segura con nosotros' },
  { icon: 'users',  title: 'Asesoría experta',  text: 'Te ayudamos a encontrar la mejor solución' },
  { icon: 'check',  title: 'Sin compromiso',    text: 'Conversación inicial totalmente gratuita' },
]

const FOOTER = [
  { icon: 'clock',  t: 'Respuesta < 24h' },
  { icon: 'shield', t: '100% confidencial' },
  { icon: 'users',  t: 'Sin compromiso' },
]

function Icon({ name }) {
  const p = {
    chat:    <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></>,
    bolt:    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    user:    <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    mail:    <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
    phone:   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>,
    grid:    <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    dollar:  <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    lock:    <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    clock:   <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></>,
    shield:  <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
    users:   <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    check:   <><circle cx="12" cy="12" r="9" /><path d="M8 12l2.5 2.5L16 9" /></>,
    send:    <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>,
    arrow:   <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
  }[name]
  return (
    <svg className="ico" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p}</svg>
  )
}

export default function ContactForm() {
  const [fields, setFields] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const set = (k, v) => {
    setFields(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!fields.user_name.trim())                        e.user_name  = 'El nombre es obligatorio'
    if (!fields.user_email.trim())                       e.user_email = 'El email es obligatorio'
    if (!fields.phone.trim())                            e.phone      = 'El teléfono es obligatorio'
    if (!fields.company.trim())                          e.company    = 'La empresa es obligatoria'
    if (!fields.services)                                e.services   = 'Selecciona un servicio'
    if (!fields.budget)                                  e.budget     = 'Selecciona un presupuesto'
    if (fields.message.trim().length < MIN_MSG)          e.message    = `Mínimo ${MIN_MSG} caracteres (faltan ${Math.max(0, MIN_MSG - fields.message.trim().length)})`
    return e
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_name:  fields.user_name,
          user_email: fields.user_email,
          phone:      fields.phone,
          company:    fields.company,
          services:   fields.services,
          budget:     fields.budget,
          message:    fields.message,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      )
      setStatus('success')
      setFields(INITIAL)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section className="s-section cf-section" id="formulario">
      <div className="cf-glow" aria-hidden="true" />
      <div className="cf-dots cf-dots--tr" aria-hidden="true" />
      <div className="cf-dots cf-dots--bl" aria-hidden="true" />

      <div className="s-container cf-layout">
        {/* ── Columna izquierda ── */}
        <aside className="cf-aside">
          <span className="s-kicker cf-kicker"><Icon name="chat" />Hablemos</span>
          <h2 className="cf-title">Cuéntanos tu <span className="cf-hl">proyecto</span></h2>
          <p className="cf-lead">
            Responderemos en menos de <b>24 horas</b>
            <span className="cf-lead-bolt"><Icon name="bolt" /></span>
          </p>

          <div className="cf-illus" aria-hidden="true">
            <span className="cf-illus-glow" />
            <svg viewBox="0 0 220 160" className="cf-illus-svg" fill="none">
              <rect x="34" y="58" width="152" height="92" rx="12" fill="#efe9ff" stroke="#c9b8ff" strokeWidth="2" />
              <path d="M34 70l76 52 76-52" stroke="#9d7dff" strokeWidth="2" fill="#f7f4ff" />
              <rect x="70" y="26" width="80" height="60" rx="14" fill="#fff" stroke="#c9b8ff" strokeWidth="2" />
              <circle cx="92" cy="56" r="4" fill="#6c3dff" />
              <circle cx="110" cy="56" r="4" fill="#9d7dff" />
              <circle cx="128" cy="56" r="4" fill="#c9b8ff" />
              <path d="M86 86l14 0-7 10z" fill="#fff" stroke="#c9b8ff" strokeWidth="2" />
              <circle cx="156" cy="118" r="20" fill="#6c3dff" />
              <path d="M148 118l6 6 12-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="cf-perks">
            {PERKS.map(p => (
              <div key={p.title} className="cf-perk">
                <span className="cf-perk-ico"><Icon name={p.icon} /></span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Columna derecha (formulario) ── */}
        <div className="cf-formwrap">
          {status === 'success' ? (
            <div className="cf-success">
              <span className="cf-success__icon"><Icon name="check" /></span>
              <strong>¡Mensaje enviado!</strong>
              <p>Nos pondremos en contacto contigo pronto.</p>
              <button className="cf-btn" onClick={() => setStatus('idle')}>Enviar otro mensaje</button>
            </div>
          ) : (
            <form className="cf-form" onSubmit={handleSubmit} noValidate>
              <div className="cf-row">
                <div className="cf-field">
                  <span className="cf-field-ico"><Icon name="user" /></span>
                  <div className="cf-field-main">
                    <label htmlFor="cf-name">Nombre completo *</label>
                    <input id="cf-name" name="user_name" type="text" placeholder="Tu nombre completo"
                      value={fields.user_name} onChange={e => set('user_name', e.target.value)}
                      className={errors.user_name ? 'cf-input--error' : ''} />
                    {errors.user_name && <span className="cf-field-error">{errors.user_name}</span>}
                  </div>
                </div>
                <div className="cf-field">
                  <span className="cf-field-ico"><Icon name="mail" /></span>
                  <div className="cf-field-main">
                    <label htmlFor="cf-email">Email *</label>
                    <input id="cf-email" name="user_email" type="email" placeholder="tu@empresa.com"
                      value={fields.user_email} onChange={e => set('user_email', e.target.value)}
                      className={errors.user_email ? 'cf-input--error' : ''} />
                    {errors.user_email && <span className="cf-field-error">{errors.user_email}</span>}
                  </div>
                </div>
              </div>

              <div className="cf-row">
                <div className="cf-field">
                  <span className="cf-field-ico"><Icon name="phone" /></span>
                  <div className="cf-field-main">
                    <label htmlFor="cf-phone">Teléfono *</label>
                    <input id="cf-phone" name="phone" type="tel" placeholder="+56 9 1234 5678"
                      value={fields.phone} onChange={e => set('phone', e.target.value)}
                      className={errors.phone ? 'cf-input--error' : ''} />
                    {errors.phone && <span className="cf-field-error">{errors.phone}</span>}
                  </div>
                </div>
                <div className="cf-field">
                  <span className="cf-field-ico"><Icon name="briefcase" /></span>
                  <div className="cf-field-main">
                    <label htmlFor="cf-company">Empresa *</label>
                    <input id="cf-company" name="company" type="text" placeholder="Nombre de tu empresa"
                      value={fields.company} onChange={e => set('company', e.target.value)}
                      className={errors.company ? 'cf-input--error' : ''} />
                    {errors.company && <span className="cf-field-error">{errors.company}</span>}
                  </div>
                </div>
              </div>

              <div className="cf-row">
                <div className="cf-field">
                  <span className="cf-field-ico"><Icon name="grid" /></span>
                  <div className="cf-field-main">
                    <label htmlFor="cf-services">Servicio de interés *</label>
                    <select id="cf-services" name="services"
                      value={fields.services} onChange={e => set('services', e.target.value)}
                      className={errors.services ? 'cf-input--error' : ''}>
                      <option value="" disabled>Selecciona una opción</option>
                      {SERVICES_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.services && <span className="cf-field-error">{errors.services}</span>}
                  </div>
                </div>
                <div className="cf-field">
                  <span className="cf-field-ico"><Icon name="dollar" /></span>
                  <div className="cf-field-main">
                    <label htmlFor="cf-budget">Presupuesto aproximado *</label>
                    <select id="cf-budget" name="budget"
                      value={fields.budget} onChange={e => set('budget', e.target.value)}
                      className={errors.budget ? 'cf-input--error' : ''}>
                      <option value="" disabled>Selecciona un rango</option>
                      {BUDGET_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    {errors.budget && <span className="cf-field-error">{errors.budget}</span>}
                  </div>
                </div>
              </div>

              <div className="cf-field cf-field--full">
                <span className="cf-field-ico"><Icon name="message" /></span>
                <div className="cf-field-main">
                  <label htmlFor="cf-message">
                    Mensaje *
                    <span className="cf-char-count">{fields.message.trim().length}/{MIN_MSG}</span>
                  </label>
                  <textarea id="cf-message" name="message" rows={5}
                    placeholder="Cuéntanos qué necesitas, qué problema quieres resolver..."
                    value={fields.message} onChange={e => set('message', e.target.value)}
                    className={errors.message ? 'cf-input--error' : ''} />
                  {errors.message && <span className="cf-field-error">{errors.message}</span>}
                </div>
              </div>

              <div className="cf-privacy">
                <Icon name="lock" />
                <span><b>Tu información está protegida.</b> No compartimos tus datos con terceros.</span>
              </div>

              {status === 'error' && (
                <p className="cf-error">Hubo un error al enviar. Intenta de nuevo o escríbenos directamente.</p>
              )}

              <button type="submit" className="cf-btn cf-btn--submit" disabled={status === 'sending'}>
                <Icon name="send" />
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                <span className="cf-btn-arrow"><Icon name="arrow" /></span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Pie de garantías ── */}
      <div className="cf-footer">
        {FOOTER.map((f, i) => (
          <span key={f.t} className="cf-footer-item" data-sep={i > 0 ? 'true' : undefined}>
            <Icon name={f.icon} />{f.t}
          </span>
        ))}
      </div>
    </section>
  )
}
