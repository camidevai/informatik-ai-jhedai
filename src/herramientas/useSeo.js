import { useEffect } from 'react'

/**
 * SEO básico sin dependencias: actualiza <title> y meta description
 * al montar la página, y restaura los valores previos al desmontar.
 */
export function useSeo({ title, description }) {
  useEffect(() => {
    const prevTitle = document.title
    const metaEl = document.querySelector('meta[name="description"]')
    const prevDesc = metaEl?.getAttribute('content')

    if (title) document.title = title
    if (description && metaEl) metaEl.setAttribute('content', description)

    return () => {
      document.title = prevTitle
      if (metaEl && prevDesc != null) metaEl.setAttribute('content', prevDesc)
    }
  }, [title, description])
}
