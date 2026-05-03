import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import TabPanel from './TabPanel'
import LegalModal from './LegalModal'

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
const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

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

  const autoScrollRef = useRef(false)

  const [loadPct, setLoadPct]     = useState(0)   // 0-100
  const [videoReady, setReady]    = useState(false)
  const [legalPage, setLegalPage] = useState(null)

  const seekVideoToProgress = useCallback((progress) => {
    const video = videoRef.current
    if (video?.duration) video.currentTime = progress * video.duration
  }, [])

  // ── Carga el video con progreso y manejo especial de iOS ──
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (isIOS) {
      // iOS Safari requiere preload='auto' + play/pause para desbloquear seeking
      video.preload = 'auto'
      video.src = '/video.mp4'
      video.load()

      let settled = false
      const settle = () => {
        if (settled) return
        settled = true
        video.removeEventListener('progress', onProgress)
        clearTimeout(fallbackTimer)
        setLoadPct(100)
        setReady(true)
      }

      const onProgress = () => {
        if (video.buffered.length > 0 && video.duration) {
          setLoadPct(Math.min(Math.round((video.buffered.end(0) / video.duration) * 100), 99))
        }
      }

      // Tras cargar metadata, fuerza la pipeline de video en iOS con play/pause
      video.addEventListener('loadedmetadata', () => {
        video.play().then(() => video.pause()).catch(() => {})
      }, { once: true })

      video.addEventListener('canplaythrough', settle, { once: true })
      video.addEventListener('progress', onProgress)

      // Fallback: si canplaythrough nunca llega (iOS con datos limitados)
      const fallbackTimer = setTimeout(settle, 8000)

      return () => {
        video.removeEventListener('progress', onProgress)
        clearTimeout(fallbackTimer)
      }
    }

    // Desktop / Android: Fetch+Blob para seeking instantáneo + barra de progreso
    const controller = new AbortController()

    const applyAndReady = (src) => {
      video.src = src
      video.load()
      setLoadPct(100)
      setReady(true)
    }

    fetch('/video.mp4', { signal: controller.signal })
      .then(res => {
        if (!res.ok || !res.body) throw new Error('stream unavailable')
        const total  = parseInt(res.headers.get('Content-Length') || '0', 10)
        const reader = res.body.getReader()
        const chunks = []
        let loaded   = 0

        const pump = () => reader.read().then(({ done, value }) => {
          if (done) {
            const blob = new Blob(chunks, { type: 'video/mp4' })
            applyAndReady(URL.createObjectURL(blob))
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
        if (err.name !== 'AbortError') applyAndReady('/video.mp4')
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!videoReady) return   // espera a que el video esté listo

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

    // ── Auto-scroll narrativo ──────────────────────────────────────
    const sleep = ms => new Promise(r => setTimeout(r, ms))

    const animateScrollTo = (targetY, duration) =>
      new Promise(resolve => {
        const startY = window.scrollY
        const dist   = targetY - startY
        const t0     = performance.now()
        const tick = now => {
          if (!autoScrollRef.current) { resolve(); return }
          const t = Math.min((now - t0) / duration, 1)
          window.scrollTo(0, startY + dist * easeInOutCubic(t))
          if (t < 1) requestAnimationFrame(tick)
          else resolve()
        }
        requestAnimationFrame(tick)
      })

    const cancelAuto = () => { autoScrollRef.current = false }

    const handleKeyDown = e => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      e.preventDefault()
      // Durante auto-scroll cualquier tecla lo cancela
      if (autoScrollRef.current) { cancelAuto(); return }
      const max  = document.body.scrollHeight - window.innerHeight
      const next = e.key === 'ArrowDown'
        ? Math.min(window.scrollY + max * 0.05, max)
        : Math.max(window.scrollY - max * 0.05, 0)
      window.scrollTo({ top: next, behavior: 'smooth' })
    }

    const runAutoScroll = async () => {
      autoScrollRef.current = true
      const max = document.body.scrollHeight - window.innerHeight

      await sleep(600)
      if (!autoScrollRef.current) return

      // Fase 1 – scroll suave hasta p=0.47 (texto completamente visible)
      await animateScrollTo(max * 0.47, 2200)
      if (!autoScrollRef.current) return

      // Fase 2 – pausa de lectura 1.5s
      await sleep(1500)
      if (!autoScrollRef.current) return

      // Fase 3 – continuar hasta p=0.73 (escena de tabs)
      await animateScrollTo(max * 0.73, 1800)
      autoScrollRef.current = false
    }
    // ──────────────────────────────────────────────────────────────

    const init = () => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('wheel', cancelAuto, { passive: true })
      window.addEventListener('touchstart', cancelAuto, { passive: true })
      window.addEventListener('keydown', handleKeyDown)
      runAutoScroll()
    }

    if (video.readyState >= 1) init()
    else video.addEventListener('loadedmetadata', init, { once: true })

    return () => {
      clearTimeout(triggerLogos)
      autoScrollRef.current = false
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', cancelAuto)
      window.removeEventListener('touchstart', cancelAuto)
      window.removeEventListener('keydown', handleKeyDown)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [videoReady])  // re-ejecuta cuando el video esté listo

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
                  window.dispatchEvent(new CustomEvent('tp:openTab', { detail: 3 }))
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
          <div className="headline-stage">
            <svg className="headline-orbit" viewBox="0 0 920 360" aria-hidden="true">
              <defs>
                <linearGradient id="headlineLine" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00D4C8" stopOpacity="0" />
                  <stop offset="45%" stopColor="#00D4C8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#4A9EFF" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="headlineCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8EF8F1" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#00D4C8" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#00D4C8" stopOpacity="0" />
                </radialGradient>
                <filter id="headlineGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path className="headline-orbit__ring headline-orbit__ring--wide" d="M82 180 C190 42 730 42 838 180 C730 318 190 318 82 180Z" />
              <path className="headline-orbit__ring headline-orbit__ring--tilt" d="M142 266 C280 116 642 98 780 230" />
              <path className="headline-orbit__ring headline-orbit__ring--tilt-alt" d="M142 94 C280 244 642 262 780 130" />
              <path className="headline-orbit__scan" d="M116 180 H804" />

              <g className="headline-orbit__network">
                <path d="M250 148 L342 106 L460 146 L578 106 L670 148" />
                <path d="M250 212 L342 254 L460 214 L578 254 L670 212" />
                <path d="M342 106 L342 254 M460 146 L460 214 M578 106 L578 254" />
              </g>

              <circle className="headline-orbit__core" cx="460" cy="180" r="72" fill="url(#headlineCore)" />
              {[250, 342, 460, 578, 670].map((x, i) => (
                <circle key={`top-${x}`} className={`headline-orbit__node headline-orbit__node--${i + 1}`} cx={x} cy={i === 2 ? 146 : i % 2 ? 106 : 148} r="5" />
              ))}
              {[250, 342, 460, 578, 670].map((x, i) => (
                <circle key={`bottom-${x}`} className={`headline-orbit__node headline-orbit__node--${i + 6}`} cx={x} cy={i === 2 ? 214 : i % 2 ? 254 : 212} r="5" />
              ))}

              <circle className="headline-orbit__spark headline-orbit__spark--one" r="4">
                <animateMotion path="M82 180 C190 42 730 42 838 180 C730 318 190 318 82 180Z" dur="7s" repeatCount="indefinite" />
              </circle>
              <circle className="headline-orbit__spark headline-orbit__spark--two" r="3">
                <animateMotion path="M142 94 C280 244 642 262 780 130" dur="5.8s" repeatCount="indefinite" />
              </circle>
            </svg>

            <span className="headline-glint headline-glint--left" />
            <span className="headline-glint headline-glint--right" />

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
        </div>

        {/* ── Escena Tabs ── */}
        <div className="scene scene-tabs" ref={tabSceneRef} style={{ opacity: 0 }}>
          <TabPanel onSeekVideo={seekVideoToProgress} />
        </div>

        <div className="keyboard-cover" />

        {/* ── Footer: atajos + legales ── */}
        <footer className="site-footer">
          {/* Atajos de navegación */}
          <nav className="site-footer__shortcuts">
            {[
              { label: 'Servicios',         idx: 0 },
              { label: 'Proceso',           idx: 1 },
              { label: 'Por qué elegirnos', idx: 2 },
              { label: 'Contacto',          idx: 3 },
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
            <button className="site-footer__link site-footer__link--legal" onClick={() => setLegalPage('terminos')}>Términos de uso</button>
            <button className="site-footer__link site-footer__link--legal" onClick={() => setLegalPage('privacidad')}>Política de privacidad</button>
            <button className="site-footer__link site-footer__link--legal" onClick={() => setLegalPage('cookies')}>Cookies</button>
          </div>
        </footer>
      </div>

      <div className="scroll-spacer" />

      <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />
    </div>
  )
}
