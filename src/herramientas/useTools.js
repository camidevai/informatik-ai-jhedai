import { useEffect, useMemo, useState } from 'react'

/**
 * Carga el catálogo de herramientas de forma dinámica desde /data/tools.json
 * (generado a partir de "Registro Camidevai.xlsx" por scripts/parse-xlsx.mjs).
 *
 * Devuelve estado de carga y error para que la UI pueda reaccionar.
 */
export function useTools() {
  const [state, setState] = useState({
    tools: [],
    categories: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const ac = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/tools.json`, {
          signal: ac.signal,
        })
        if (!res.ok) throw new Error(`No se pudo cargar el catálogo (HTTP ${res.status})`)

        const data = await res.json()
        const tools = Array.isArray(data?.tools) ? data.tools : []

        // Categorías presentes, ordenadas por frecuencia (desc) y luego alfabético.
        const counts = tools.reduce((acc, t) => {
          const c = t.category || 'Otras'
          acc[c] = (acc[c] || 0) + 1
          return acc
        }, {})
        const categories = Object.keys(counts).sort(
          (a, b) => counts[b] - counts[a] || a.localeCompare(b, 'es')
        )

        setState({ tools, categories, loading: false, error: null })
      } catch (err) {
        if (err.name === 'AbortError') return
        setState({ tools: [], categories: [], loading: false, error: err.message })
      }
    })()

    return () => ac.abort()
  }, [])

  return state
}

/**
 * Filtra herramientas por texto (nombre, descripción, categoría, palabras clave)
 * y por categoría seleccionada. Memorizado para evitar recálculos innecesarios.
 */
export function useFilteredTools(tools, query, category) {
  return useMemo(() => {
    const q = query.trim().toLowerCase()
    const terms = q.split(/\s+/).filter(Boolean)

    return tools.filter((t) => {
      if (category !== 'Todas' && t.category !== category) return false
      if (!terms.length) return true

      const haystack = [
        t.name,
        t.description,
        t.category,
        t.domain,
        ...(t.keywords || []),
      ]
        .join(' ')
        .toLowerCase()

      // Coincidencia AND: todos los términos deben aparecer.
      return terms.every((term) => haystack.includes(term))
    })
  }, [tools, query, category])
}
