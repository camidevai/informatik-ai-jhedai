import ToolImage from './ToolImage'

const PlayIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
)

/**
 * Tarjeta de herramienta: imagen, nombre, categoría, descripción,
 * CTA al video y botón opcional "Más información" (sitio de la herramienta).
 */
export default function ToolCard({ tool }) {
  const { name, description, category, domain, toolUrl, videoUrl } = tool

  return (
    <article className="tool-card">
      <ToolImage name={name} domain={domain} />

      <div className="tool-card__body">
        <div className="tool-card__head">
          <h3 className="tool-card__name" title={name}>{name}</h3>
          {category && <span className="tool-card__badge">{category}</span>}
        </div>

        <p className="tool-card__desc">
          {description || 'Sin descripción disponible.'}
        </p>

        <div className="tool-card__footer">
          {videoUrl ? (
            <a
              className="tool-card__cta"
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayIcon />
              Ver video
            </a>
          ) : (
            <span className="tool-card__cta tool-card__cta--disabled">
              Sin video
            </span>
          )}

          {domain && toolUrl && (
            <a
              className="tool-card__more"
              href={toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Ir a ${domain}`}
            >
              <InfoIcon />
              Más info
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
