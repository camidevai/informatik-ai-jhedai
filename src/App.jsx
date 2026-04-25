import { useEffect, useRef, useState } from 'react'
import './App.css'
import TabPanel from './TabPanel'

// ── Chars escena 2 ──
const buildChars = () => {
  const chars = []
  const push = (str, calypso = false) => {
    for (const c of str) chars.push({ char: c, calypso, isBreak: false })
  }
  push('Juntos creamos soluciones inteligentes')
  chars.push({ char: '', calypso: false, isBreak: true })
  push('que ')
  push('transforman', true)
  push(' el mañana')
  return chars
}

const CHARS       = buildChars()
const TOTAL_CHARS = CHARS.filter(c => !c.isBreak).length
const FADE_WINDOW = 5 / TOTAL_CHARS
const LERP_FACTOR = 0.09

const sceneOp = (p, fadeIn, show, hide, fadeOut) => {
  if (p < fadeIn || p > fadeOut) return 0
  if (p < show)  return (p - fadeIn)  / (show - fadeIn)
  if (p < hide)  return 1
  return 1 - (p - hide) / (fadeOut - hide)
}

export default function App() {
  const videoRef      = useRef(null)
  const scene1Ref     = useRef(null)
  const logosRowRef   = useRef(null)
  const scene2Ref     = useRef(null)
  const charRefs      = useRef(new Array(CHARS.length).fill(null))
  const tabSceneRef   = useRef(null)

  const [loadPct, setLoadPct]     = useState(0)   // 0-100
  const [videoReady, setReady]    = useState(false)

  // ── Carga el video via Fetch+Blob para progreso y seeking instantáneo ──
  useEffect(() => {
    const controller = new AbortController()

    fetch('/video.mp4', { signal: controller.signal })
      .then(res => {
        const total = parseInt(res.headers.get('Content-Length') || '0', 10)
        const reader = res.body.getReader()
        const chunks = []
        let loaded = 0

        const pump = () => reader.read().then(({ done, value }) => {
          if (done) {
            const blob = new Blob(chunks, { type: 'video/mp4' })
            const url  = URL.createObjectURL(blob)
            if (videoRef.current) videoRef.current.src = url
            setLoadPct(100)
            setReady(true)
            return
          }
          chunks.push(value)
          loaded += value.length
          if (total) setLoadPct(Math.min(Math.round((loaded / total) * 100), 99))
          return pump()
        })
        return pump()
      })
      .catch(err => {
        if (err.name !== 'AbortError') setReady(true) // fallback sin progreso
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const video    = videoRef.current
    const scene1   = scene1Ref.current
    const scene2   = scene2Ref.current
    const tabScene = tabSceneRef.current
    if (!video) return

    let targetP        = 0
    let currentP       = 0
    let rafId          = null

    const setScene = (el, op) => {
      if (!el) return
      el.style.opacity      = op
      el.style.pointerEvents = op > 0 ? 'auto' : 'none'
    }

    // Logos + botón aparecen automáticamente al cargar (sin necesitar scroll)
    const triggerLogos = setTimeout(() => {
      logosRowRef.current?.querySelectorAll('.logo').forEach((logo, i) => {
        logo.style.animationDelay = `${i * 0.2}s`
        logo.classList.add('logo-shine')
      })
      const cta = scene1?.querySelector('.scene1-cta')
      if (cta) cta.classList.add('scene1-cta--visible')
    }, 400)

    const applyUI = (p) => {

      // Escena 1: Logos 0–25%
      const op1 = sceneOp(p, 0, 0, 0.15, 0.25)
      setScene(scene1, op1)
      if (scene1) scene1.style.transform = `translateY(-${p * 60}px)`

      // Escena 2: Texto typewriter 24–60%
      const op2 = sceneOp(p, 0.24, 0.26, 0.50, 0.60)
      setScene(scene2, op2)
      const charsP = p < 0.25 ? 0 : p > 0.44 ? 1 : (p - 0.25) / (0.44 - 0.25)
      let nonBreakIdx = 0
      charRefs.current.forEach((ref, i) => {
        if (!ref || CHARS[i]?.isBreak) return
        const diff = charsP - nonBreakIdx / TOTAL_CHARS
        ref.style.opacity = diff <= 0 ? 0 : diff >= FADE_WINDOW ? 1 : diff / FADE_WINDOW
        nonBreakIdx++
      })

      // Escena Tabs: aparece al 62%, permanece hasta el final
      setScene(tabScene, sceneOp(p, 0.60, 0.65, 1.00, 1.00))
    }

    const loop = () => {
      const diff = targetP - currentP
      if (Math.abs(diff) < 0.00008) {
        currentP = targetP
        applyUI(currentP)
        rafId = null
        return
      }
      currentP += diff * LERP_FACTOR
      applyUI(currentP)
      rafId = requestAnimationFrame(loop)
    }

    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return
      const p = Math.min(window.scrollY / maxScroll, 1)

      // Video: seek directo (no lerpeado)
      if (video.duration) video.currentTime = p * video.duration

      targetP = p
      if (!rafId) rafId = requestAnimationFrame(loop)
    }

    const init = () => {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    if (video.readyState >= 1) init()
    else video.addEventListener('loadedmetadata', init, { once: true })

    return () => {
      clearTimeout(triggerLogos)
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="app">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="bg-video"
          muted
          playsInline
          preload="none"
        />
        <div className="video-backdrop" />

        {/* ── Pantalla de carga ── */}
        {!videoReady && (
          <div className="video-loader">
            <div className="video-loader__logos">
              <img src="/logos/jhedai.png"        alt="JHED AI"       className="video-loader__logo" />
              <img src="/logos/informatik-ai.png" alt="InformatiK-AI" className="video-loader__logo" />
            </div>
            <div className="video-loader__bar-wrap">
              <div className="video-loader__bar" style={{ width: `${loadPct}%` }} />
            </div>
            <span className="video-loader__pct">{loadPct}%</span>
          </div>
        )}

        {/* ── Escena 1: Logos + CTA ── */}
        <div className="scene scene-1" ref={scene1Ref}>
          <div className="logos-row" ref={logosRowRef}>
            <img src="/logos/jhedai.png"        alt="JHED AI"       className="logo logo-jhedai" />
            <img src="/logos/informatik-ai.png" alt="InformatiK-AI" className="logo" />
          </div>
          <button
            className="scene1-cta"
            onClick={() => {
              const max = document.body.scrollHeight - window.innerHeight

              // Fase 1: scroll hasta p=0.47 — texto 100% escrito (termina en p=0.44)
              // y el usuario puede leerlo completo antes de seguir
              window.scrollTo({ top: max * 0.47, behavior: 'smooth' })

              // Fase 2: espera a que el scroll llegue (~2.2s) + tiempo de lectura (2s)
              setTimeout(() => {
                window.scrollTo({ top: max * 0.73, behavior: 'smooth' })
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('tp:openTab', { detail: 4 }))
                }, 1400)
              }, 4400)
            }}
          >
            <span className="scene1-cta__dot" />
            Agendar una reunión
            <span className="scene1-cta__arrow">→</span>
          </button>
        </div>

        {/* ── Escena 2: Texto typewriter ── */}
        <div className="scene scene-text" ref={scene2Ref} style={{ opacity: 0 }}>
          <p className="headline">
            {CHARS.map((c, i) =>
              c.isBreak
                ? <br key={i} />
                : <span
                    key={i}
                    ref={el => { charRefs.current[i] = el }}
                    className={`char${c.calypso ? ' calypso' : ''}`}
                  >{c.char}</span>
            )}
          </p>
        </div>

        {/* ── Escena Tabs ── */}
        <div className="scene scene-tabs" ref={tabSceneRef} style={{ opacity: 0 }}>
          <TabPanel videoRef={videoRef} />
        </div>

        <div className="keyboard-cover" />

        {/* ── Footer: atajos + legales ── */}
        <footer className="site-footer">
          {/* Atajos de navegación */}
          <nav className="site-footer__shortcuts">
            {[
              { label: 'Servicios',        idx: 0 },
              { label: 'Construcción',     idx: 1 },
              { label: 'Proceso',          idx: 2 },
              { label: 'Por qué elegirnos',idx: 3 },
              { label: 'Contacto',         idx: 4 },
            ].map(({ label, idx }) => (
              <button
                key={idx}
                className="site-footer__link"
                onClick={() => {
                  const max = document.body.scrollHeight - window.innerHeight
                  window.scrollTo({ top: max * 0.73, behavior: 'smooth' })
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('tp:openTab', { detail: idx }))
                  }, 900)
                }}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Separador + legales */}
          <div className="site-footer__legal">
            <span className="site-footer__copy">© 2025 JhedAi × InformatiK-AI</span>
            <span className="site-footer__divider" />
            <button className="site-footer__link site-footer__link--legal">Términos de uso</button>
            <button className="site-footer__link site-footer__link--legal">Política de privacidad</button>
            <button className="site-footer__link site-footer__link--legal">Cookies</button>
          </div>
        </footer>
      </div>

      <div className="scroll-spacer" />
    </div>
  )
}
