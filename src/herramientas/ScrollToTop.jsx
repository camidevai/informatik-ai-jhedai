import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Lleva el scroll al inicio al cambiar de ruta (mejor UX entre páginas). */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}
