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
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">Hablemos</span>
          <h2 className="s-title">Cuéntanos tu proyecto</h2>
          <p className="cf-sub">Responderemos en menos de 24 horas</p>
        </header>

        {status === 'success' ? (
          <div className="cf-success">
            <span className="cf-success__icon">✓</span>
            <strong>¡Mensaje enviado!</strong>
            <p>Nos pondremos en contacto contigo pronto.</p>
            <button className="cf-btn" onClick={() => setStatus('idle')}>Enviar otro mensaje</button>
          </div>
        ) : (
          <form className="cf-form" onSubmit={handleSubmit} noValidate>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-name">Nombre *</label>
                <input
                  id="cf-name"
                  name="user_name"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={fields.user_name}
                  onChange={e => set('user_name', e.target.value)}
                  className={errors.user_name ? 'cf-input--error' : ''}
                />
                {errors.user_name && <span className="cf-field-error">{errors.user_name}</span>}
              </div>
              <div className="cf-field">
                <label htmlFor="cf-email">Email *</label>
                <input
                  id="cf-email"
                  name="user_email"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={fields.user_email}
                  onChange={e => set('user_email', e.target.value)}
                  className={errors.user_email ? 'cf-input--error' : ''}
                />
                {errors.user_email && <span className="cf-field-error">{errors.user_email}</span>}
              </div>
            </div>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-phone">Teléfono *</label>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  value={fields.phone}
                  onChange={e => set('phone', e.target.value)}
                  className={errors.phone ? 'cf-input--error' : ''}
                />
                {errors.phone && <span className="cf-field-error">{errors.phone}</span>}
              </div>
              <div className="cf-field">
                <label htmlFor="cf-company">Empresa *</label>
                <input
                  id="cf-company"
                  name="company"
                  type="text"
                  placeholder="Nombre de tu empresa"
                  value={fields.company}
                  onChange={e => set('company', e.target.value)}
                  className={errors.company ? 'cf-input--error' : ''}
                />
                {errors.company && <span className="cf-field-error">{errors.company}</span>}
              </div>
            </div>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-services">Servicio de interés *</label>
                <select
                  id="cf-services"
                  name="services"
                  value={fields.services}
                  onChange={e => set('services', e.target.value)}
                  className={errors.services ? 'cf-input--error' : ''}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  {SERVICES_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.services && <span className="cf-field-error">{errors.services}</span>}
              </div>
              <div className="cf-field">
                <label htmlFor="cf-budget">Presupuesto aproximado *</label>
                <select
                  id="cf-budget"
                  name="budget"
                  value={fields.budget}
                  onChange={e => set('budget', e.target.value)}
                  className={errors.budget ? 'cf-input--error' : ''}
                >
                  <option value="" disabled>Selecciona un rango</option>
                  {BUDGET_OPTIONS.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {errors.budget && <span className="cf-field-error">{errors.budget}</span>}
              </div>
            </div>

            <div className="cf-field cf-field--full">
              <label htmlFor="cf-message">
                Mensaje *
                <span className="cf-char-count">{fields.message.trim().length}/{MIN_MSG}</span>
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={5}
                placeholder="Cuéntanos qué necesitas, qué problema quieres resolver..."
                value={fields.message}
                onChange={e => set('message', e.target.value)}
                className={errors.message ? 'cf-input--error' : ''}
              />
              {errors.message && <span className="cf-field-error">{errors.message}</span>}
            </div>

            {status === 'error' && (
              <p className="cf-error">Hubo un error al enviar. Intenta de nuevo o escríbenos directamente.</p>
            )}

            <button
              type="submit"
              className="cf-btn cf-btn--submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
