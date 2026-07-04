import { useState } from 'react'

/**
 * Muestra el contenido EN VIVO de una carpeta pública de Google Drive.
 * Usa la vista embebida de Drive (embeddedfolderview): en cada carga de la
 * página refleja los archivos actuales de la carpeta, sin API key.
 *
 * Requisito: la carpeta debe estar compartida como "Cualquiera con el enlace".
 */
const DriveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
)

export default function DriveFolder({ tool, folderId, url, note }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <article className="tp-drive">
      <header className="tp-drive__head">
        <div className="tp-drive__titles">
          <span className="tp-drive__badge">Tutorial</span>
          <h3 className="tp-drive__title">Cómo usar {tool}</h3>
        </div>
        <a className="tp-drive__open" href={url} target="_blank" rel="noopener noreferrer">
          <DriveIcon />
          Abrir en Drive
        </a>
      </header>

      {note && <p className="tp-drive__note">{note}</p>}

      <div className="tp-drive__frame">
        {!loaded && (
          <div className="tp-drive__loading">
            <span className="tp-drive__spinner" aria-hidden="true" />
            Cargando material de {tool}…
          </div>
        )}
        <iframe
          className="tp-drive__iframe"
          src={`https://drive.google.com/embeddedfolderview?id=${folderId}#grid`}
          title={`Material del tutorial de ${tool} en Google Drive`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      </div>
    </article>
  )
}
