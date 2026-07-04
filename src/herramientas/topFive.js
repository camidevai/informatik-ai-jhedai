/**
 * Selección editorial: las 5 herramientas favoritas del equipo.
 * `match` se cruza (por nombre) con el catálogo generado del Excel para
 * reutilizar imagen, dominio, descripción y video. Los campos `fallback`
 * cubren herramientas que aún no están en el registro.
 *
 * NOTA: "Centeia" no está en el registro del Excel; sus datos se definen a mano abajo.
 */
export const TOP_FIVE = [
  {
    match: 'Apob',
    tagline: 'Video con avatares propios',
    reason:
      'Genera videos con avatares hiperrealistas —incluso creando los tuyos— con una calidad que sorprende a nuestros clientes en producción de contenido.',
  },
  {
    match: 'Syntx',
    tagline: 'Más de 90 modelos en un solo lugar',
    reason:
      'Con una sola suscripción accedes a decenas de modelos de IA. Es nuestra navaja suiza para prototipar rápido sin saltar entre plataformas.',
  },
  {
    match: 'Claude',
    tagline: 'El copiloto de nuestro equipo',
    reason:
      'La IA multimodal de Anthropic es la que más usamos día a día: razonamiento sólido, contexto enorme y resultados confiables para desarrollo y análisis.',
  },
  {
    match: 'Centeia',
    tagline: 'IA aplicada a negocios',
    reason:
      'La incluimos por su enfoque práctico para llevar la inteligencia artificial a procesos reales de empresa, con resultados medibles.',
    fallback: {
      name: 'Centeia',
      description: 'Plataforma de inteligencia artificial orientada a soluciones de negocio.',
      category: 'IA Conversacional',
      domain: 'centeia.com',
      toolUrl: 'https://centeia.com/?utm_source=camidevai',
      videoUrl: '',
    },
  },
  {
    match: 'NotebookLM',
    tagline: 'Tu segundo cerebro documental',
    reason:
      'Subes archivos, enlaces o videos y preguntas lo que sea sobre ellos. Ideal para investigación y para convertir documentación densa en respuestas claras.',
  },
]

/** Resuelve cada entrada editorial contra el catálogo cargado. */
export function resolveTopFive(tools) {
  const byName = new Map(tools.map((t) => [t.name.toLowerCase(), t]))
  return TOP_FIVE.map((pick) => {
    const found = byName.get(pick.match.toLowerCase())
    const base = found || pick.fallback || { name: pick.match }
    return { ...base, tagline: pick.tagline, reason: pick.reason }
  })
}
