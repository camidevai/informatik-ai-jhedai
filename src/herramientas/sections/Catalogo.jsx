import { useMemo, useState } from 'react'
import { useFilteredTools } from '../useTools'
import ToolCard from '../ToolCard'

const PAGE_SIZE = 24

const SORTS = [
  { value: 'popular', label: 'Populares' },
  { value: 'recent', label: 'Más recientes' },
  { value: 'name', label: 'Nombre (A-Z)' },
]

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

function sortTools(list, sort) {
  const arr = [...list]
  switch (sort) {
    case 'name':
      return arr.sort((a, b) => a.name.localeCompare(b.name, 'es'))
    case 'recent':
      return arr.sort((a, b) => (b.order || 0) - (a.order || 0))
    case 'popular':
    default:
      return arr.sort(
        (a, b) =>
          Number(b.popular) - Number(a.popular) || (a.order || 0) - (b.order || 0)
      )
  }
}

/**
 * Catálogo completo: búsqueda, filtros por categoría, ordenamiento y
 * paginación incremental. Recibe el estado ya cargado desde la página.
 */
export default function Catalogo({ tools, categories, loading, error }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todas')
  const [sort, setSort] = useState('popular')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useFilteredTools(tools, query, category)
  const sorted = useMemo(() => sortTools(filtered, sort), [filtered, sort])
  const shown = useMemo(() => sorted.slice(0, visible), [sorted, visible])

  // Reinicia la paginación cuando cambian filtros/orden (patrón sin efecto).
  const signature = `${query}|${category}|${sort}`
  const [prevSignature, setPrevSignature] = useState(signature)
  if (signature !== prevSignature) {
    setPrevSignature(signature)
    setVisible(PAGE_SIZE)
  }

  const chips = useMemo(() => ['Todas', ...categories], [categories])

  return (
    <section id="tp-catalogo" className="s-section tp-catalogo">
      <div className="s-container">
        <header className="s-header">
          <span className="s-kicker">Directorio completo</span>
          <h2 className="s-title">
            Todas las <span className="svc-hl">herramientas</span>
          </h2>
          <p className="svc-intro">
            Busca por nombre, categoría o palabra clave. Cada una incluye un video para
            aprender a usarla.
          </p>
        </header>

        {/* Controles: buscador + orden */}
        <div className="tp-controls">
          <div className="tools-search">
            <span className="tools-search__icon"><SearchIcon /></span>
            <input
              className="tools-search__input"
              type="search"
              placeholder="Buscar herramientas de IA…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar herramientas"
            />
            {query && (
              <button
                className="tools-search__clear"
                onClick={() => setQuery('')}
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          <label className="tp-sort">
            <span className="tp-sort__label">Ordenar:</span>
            <select
              className="tp-sort__select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Ordenar herramientas"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Filtros por categoría */}
        {!loading && !error && (
          <div className="tools-filters" role="tablist" aria-label="Filtrar por categoría">
            {chips.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                className={`tools-chip ${category === c ? 'tools-chip--active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="tool-grid" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="tool-card tool-card--skeleton">
                <div className="tool-card__media sk-shimmer" />
                <div className="tool-card__body">
                  <div className="sk-line sk-shimmer" style={{ width: '55%' }} />
                  <div className="sk-line sk-shimmer" style={{ width: '90%' }} />
                  <div className="sk-line sk-shimmer" style={{ width: '80%' }} />
                  <div className="sk-line sk-pill sk-shimmer" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="tools-msg tools-msg--error" role="alert">
            <strong>No pudimos cargar las herramientas.</strong>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="tools-count">
              {sorted.length === 0
                ? 'Sin resultados'
                : `${sorted.length} herramienta${sorted.length === 1 ? '' : 's'}`}
              {category !== 'Todas' && ` en «${category}»`}
            </p>

            {sorted.length === 0 ? (
              <div className="tools-msg tools-empty">
                <span className="tools-empty__emoji" aria-hidden="true">🔍</span>
                <strong>No encontramos herramientas para tu búsqueda.</strong>
                <button
                  className="tools-empty__reset"
                  onClick={() => { setQuery(''); setCategory('Todas') }}
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <>
                <div className="tool-grid">
                  {shown.map((t) => (
                    <ToolCard key={t.id} tool={t} />
                  ))}
                </div>

                {visible < sorted.length && (
                  <div className="tools-more">
                    <button
                      className="tools-more__btn"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    >
                      Ver más herramientas
                      <span className="tools-more__count">
                        {sorted.length - visible} restantes
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}
