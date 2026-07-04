import { useMemo } from 'react'
import ToolImage from '../ToolImage'
import { resolveTopFive } from '../topFive'

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.9 6.3L22 9.3l-5 4.9 1.2 7L12 17.8 5.8 21l1.2-7-5-4.9 7.1-1z" />
  </svg>
)

const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
)

/** CTA de la tarjeta favorita: video si existe; si no, visitar sitio; si nada, aviso. */
function FavCta({ tool }) {
  if (tool.videoUrl)
    return (
      <a className="tp-btn tp-btn--primary tp-fav__cta" href={tool.videoUrl}
        target="_blank" rel="noopener noreferrer">
        <PlayIcon />
        Ver tutorial
      </a>
    )
  if (tool.toolUrl)
    return (
      <a className="tp-btn tp-btn--primary tp-fav__cta" href={tool.toolUrl}
        target="_blank" rel="noopener noreferrer">
        <LinkIcon />
        Visitar sitio
      </a>
    )
  return (
    <span className="tp-btn tp-btn--ghost tp-fav__cta tp-fav__cta--soon">
      Tutorial próximamente
    </span>
  )
}

export default function TopFive({ tools }) {
  const picks = useMemo(() => resolveTopFive(tools), [tools])

  return (
    <section id="tp-top5" className="tp-top5">
      <div className="tp-top5__inner">
        <header className="tp-top5__header">
          <span className="tp-top5__kicker"><StarIcon /> Selección del equipo</span>
          <h2 className="tp-top5__title">Nuestras 5 herramientas favoritas</h2>
          <p className="tp-top5__sub">
            De cientos que probamos, estas son las que no soltamos. Las usamos, las recomendamos
            y te enseñamos a sacarles provecho.
          </p>
        </header>

        <div className="tp-top5__grid">
          {picks.map((tool, i) => (
            <article key={tool.name} className={`tp-fav ${i === 0 ? 'tp-fav--hero' : ''}`}>
              <span className="tp-fav__rank">#{i + 1}</span>

              <div className="tp-fav__media">
                <ToolImage name={tool.name} domain={tool.domain} />
              </div>

              <div className="tp-fav__body">
                <div className="tp-fav__head">
                  <h3 className="tp-fav__name">{tool.name}</h3>
                  {tool.tagline && <span className="tp-fav__tag">{tool.tagline}</span>}
                </div>

                {tool.description && <p className="tp-fav__desc">{tool.description}</p>}

                <div className="tp-fav__reason">
                  <span className="tp-fav__reason-label">Por qué la recomendamos</span>
                  <p>{tool.reason}</p>
                </div>

                <FavCta tool={tool} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
