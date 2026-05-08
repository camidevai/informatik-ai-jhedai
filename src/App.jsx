import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import './sections.css'
import StickyNav from './StickyNav'
import FloatBtn from './FloatBtn'
import Servicios from './Servicios'
import Proceso from './Proceso'
import Elegirnos from './Elegirnos'
import Alianzas from './Alianzas'
import Funnel from './Funnel'
import Team from './Team'
import LegalModal from './LegalModal'

// ── Chars escena 2 — JSON con syntax highlighting ──
const buildChars = () => {
  const chars = []
  const push = (str, type = 'default') => {
    for (const c of str) chars.push({ char: c, type, isBreak: false })
  }
  const br = () => chars.push({ isBreak: true })

  const lines = [
    { k: 'empresa',   v: 'InformatiK-AI × JhedAI',                           t: 'val'    },
    { k: 'misión',    v: 'Transformar negocios reales con inteligencia real',  t: 'val'    },
    { k: 'servicios', v: 'Software · Agentes IA · Visión · Machine Learning', t: 'val'    },
    { k: 'ventaja',   v: '3× más rápido · 40% menos costo · 100% a medida',   t: 'accent' },
    { k: 'promesa',   v: 'Juntos construimos el futuro que tu empresa merece', t: 'accent' },
  ]

  push('{', 'punct'); br()
  lines.forEach(({ k, v, t }, i) => {
    push('  ', 'punct')
    push(`"${k}"`, 'key')
    push(': ', 'punct')
    push(`"${v}"`, t)
    if (i < lines.length - 1) push(',', 'punct')
    br()
  })
  push('}', 'punct')

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
  const videoRef       = useRef(null)
  const scene1Ref      = useRef(null)
  const logosRowRef    = useRef(null)
  const scene2Ref      = useRef(null)
  const charRefs       = useRef(new Array(CHARS.length).fill(null))
  const appRef         = useRef(null)
  const pageContentRef = useRef(null)

  const autoScrollRef = useRef(false)

  const [loadPct, setLoadPct]     = useState(0)
  const [videoReady, setReady]    = useState(false)
  const [legalPage, setLegalPage] = useState(null)

  const seekVideoToProgress = useCallback((progress) => {
    const video = videoRef.current
    if (video?.duration) video.currentTime = progress * video.duration
  }, [])

  // ── Carga del video ──
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (isIOS) {
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

      video.addEventListener('loadedmetadata', () => {
        video.play().then(() => video.pause()).catch(() => {})
      }, { once: true })

      video.addEventListener('canplaythrough', settle, { once: true })
      video.addEventListener('progress', onProgress)

      const fallbackTimer = setTimeout(settle, 8000)

      return () => {
        video.removeEventListener('progress', onProgress)
        clearTimeout(fallbackTimer)
      }
    }

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
    if (!videoReady) return

    const video  = videoRef.current
    const scene1 = scene1Ref.current
    const scene2 = scene2Ref.current
    if (!video) return

    let targetP = 0
    let currentP = 0
    let rafId   = null

    const setScene = (el, op) => {
      if (!el) return
      el.style.opacity       = op
      el.style.pointerEvents = op > 0 ? 'auto' : 'none'
    }

    // maxScroll relativo al bloque .app (no al body completo)
    const getAppMax = () => {
      const appEl = appRef.current
      if (!appEl) return document.body.scrollHeight - window.innerHeight
      return Math.max(appEl.offsetHeight - window.innerHeight, 1)
    }

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

      // Escena 2: IDE typewriter — se desvanece al final del spacer
      const op2 = sceneOp(p, 0.24, 0.26, 0.80, 0.96)
      setScene(scene2, op2)
      // Rango extendido a 0.60 para el JSON más largo
      const charsP = p < 0.25 ? 0 : p > 0.60 ? 1 : (p - 0.25) / (0.60 - 0.25)
      let nonBreakIdx = 0
      charRefs.current.forEach((ref, i) => {
        if (!ref || CHARS[i]?.isBreak) return
        const diff = charsP - nonBreakIdx / TOTAL_CHARS
        ref.style.opacity = diff <= 0 ? 0 : diff >= FADE_WINDOW ? 1 : diff / FADE_WINDOW
        nonBreakIdx++
      })
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
      const maxScroll = getAppMax()
      const p = Math.min(window.scrollY / maxScroll, 1)
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
      if (autoScrollRef.current) { cancelAuto(); return }
      const max  = getAppMax()
      const next = e.key === 'ArrowDown'
        ? Math.min(window.scrollY + max * 0.05, max)
        : Math.max(window.scrollY - max * 0.05, 0)
      window.scrollTo({ top: next, behavior: 'smooth' })
    }

    const runAutoScroll = async () => {
      autoScrollRef.current = true
      const max = getAppMax()

      await sleep(600)
      if (!autoScrollRef.current) return

      // Fase 1: scroll hasta p=0.65 (JSON 100% escrito)
      await animateScrollTo(max * 0.65, 3200)
      if (!autoScrollRef.current) return

      // Fase 2: pausa de lectura
      await sleep(1500)
      if (!autoScrollRef.current) return

      // Fase 3: bajar al contenido de página
      autoScrollRef.current = false
      pageContentRef.current?.scrollIntoView({ behavior: 'smooth' })
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
  }, [videoReady])

  const SECTION_IDS = ['servicios', 'proceso', 'elegirnos', 'contacto']

  const scrollToContent = (tabIdx) => {
    const id = SECTION_IDS[tabIdx] ?? 'servicios'
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      pageContentRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handler = () => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    window.addEventListener('goto:contacto', handler)
    return () => window.removeEventListener('goto:contacto', handler)
  }, [])

  return (
    <>
      <StickyNav />
      <FloatBtn />

      <div className="app" ref={appRef}>
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
                autoScrollRef.current = false
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="scene1-cta__dot" />
              Agendar una reunión
              <span className="scene1-cta__arrow">→</span>
            </button>
          </div>

          {/* ── Escena 2: IDE typewriter ── */}
          <div className="scene scene-text" ref={scene2Ref} style={{ opacity: 0 }}>
            <div className="ide-window">
              <div className="ide-bar">
                <span className="ide-dot ide-dot--close" />
                <span className="ide-dot ide-dot--min" />
                <span className="ide-dot ide-dot--max" />
                <span className="ide-bar__file">solution.ts</span>
              </div>
              <div className="ide-body">
                <div className="ide-gutter">
                  {[1,2,3,4,5,6,7].map(n => <span key={n}>{n}</span>)}
                </div>
                <div className="ide-code">
                  <p className="headline">
                    {CHARS.map((c, i) =>
                      c.isBreak
                        ? <br key={i} />
                        : <span
                            key={i}
                            ref={el => { charRefs.current[i] = el }}
                            className={`char char--${c.type ?? 'default'}`}
                          >{c.char}</span>
                    )}
                    <span className="ide-cursor" aria-hidden="true" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="keyboard-cover" />
        </div>

        <div className="scroll-spacer" />
      </div>

      {/* ── Sección de contenido — flujo normal de página ── */}
      <div className="page-content" ref={pageContentRef}>
        <section id="equipo"><Team /></section>
        <div className="s-divider" />
        <section id="servicios"><Servicios /></section>
        <div className="s-divider" />
        <section id="proceso"><Proceso /></section>
        <div className="s-divider" />
        <section id="elegirnos"><Elegirnos /></section>
        <div className="s-divider" />
        <section id="alianzas"><Alianzas /></section>
        <div className="s-divider" />
        <section id="contacto"><Funnel /></section>
      </div>

      {/* ── Footer real de la página ── */}
      <footer className="site-footer">
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
              onClick={() => scrollToContent(idx)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="site-footer__legal">
          <span className="site-footer__copy">© 2025 JhedAi × InformatiK-AI</span>
          <span className="site-footer__divider" />
          <button className="site-footer__link site-footer__link--legal" onClick={() => setLegalPage('terminos')}>Términos de uso</button>
          <button className="site-footer__link site-footer__link--legal" onClick={() => setLegalPage('privacidad')}>Política de privacidad</button>
          <button className="site-footer__link site-footer__link--legal" onClick={() => setLegalPage('cookies')}>Cookies</button>
        </div>
      </footer>

      <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />
    </>
  )
}
