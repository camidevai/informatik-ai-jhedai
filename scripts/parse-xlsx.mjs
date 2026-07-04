// Parser del registro de herramientas (Registro Camidevai.xlsx)
// Extrae Nombre, Link herramienta, Link video (Instagram) y Descripción,
// deriva categoría + palabras clave, y genera public/data/tools.json.
//
// Uso:  node scripts/parse-xlsx.mjs
// El .xlsx es un ZIP con XML: leemos sharedStrings.xml + worksheets/sheet1.xml.
// Requiere que el .xlsx esté descomprimido en _xlsx_tmp/ (ver README del script).

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const XLSX = join(root, 'Registro Camidevai.xlsx')

// --- 1. Descomprimir el .xlsx (ZIP) a un temporal ------------------------------
const tmp = mkdtempSync(join(tmpdir(), 'xlsx-'))
execSync(
  `powershell -NoProfile -Command "Copy-Item '${XLSX}' '${tmp}\\book.zip'; Expand-Archive '${tmp}\\book.zip' -DestinationPath '${tmp}' -Force"`,
  { stdio: 'ignore' }
)

const sharedXml = readFileSync(join(tmp, 'xl', 'sharedStrings.xml'), 'utf8')
const sheetXml = readFileSync(join(tmp, 'xl', 'worksheets', 'sheet1.xml'), 'utf8')

// --- 2. Utilidades XML ---------------------------------------------------------
const decode = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&amp;/g, '&')

// sharedStrings: cada <si> puede tener varios <t> (rich text). Los concatenamos.
function parseSharedStrings(xml) {
  const out = []
  const siRe = /<si>([\s\S]*?)<\/si>/g
  let m
  while ((m = siRe.exec(xml))) {
    const body = m[1]
    const tRe = /<t[^>]*>([\s\S]*?)<\/t>/g
    let t
    let acc = ''
    while ((t = tRe.exec(body))) acc += decode(t[1])
    out.push(acc)
  }
  return out
}

// worksheet: cada <row> con celdas <c r="B3" t="s"><v>idx</v></c>
function parseRows(xml, shared) {
  const rows = []
  const rowRe = /<row[^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g
  let r
  while ((r = rowRe.exec(xml))) {
    const rowNum = +r[1]
    const cellsXml = r[2]
    const cells = {}
    const cRe = /<c\s+([^>]*?)>(?:<v>([\s\S]*?)<\/v>)?<\/c>/g
    let c
    while ((c = cRe.exec(cellsXml))) {
      const attrs = c[1]
      const val = c[2]
      if (val == null) continue
      const col = (attrs.match(/r="([A-Z]+)\d+"/) || [])[1]
      if (!col) continue
      const type = (attrs.match(/t="([a-z]+)"/) || [])[1]
      cells[col] = type === 's' ? shared[+val] : decode(val)
    }
    rows.push({ rowNum, cells })
  }
  return rows
}

const shared = parseSharedStrings(sharedXml)
const rows = parseRows(sheetXml, shared)

// --- 3. Normalización de links -------------------------------------------------
const cleanLink = (s) => (s || '').trim()
const toUrl = (link) => {
  const l = cleanLink(link)
  if (!l) return ''
  if (/^https?:\/\//i.test(l)) return l
  return 'https://' + l.replace(/^\/+/, '')
}
const domainOf = (link) => {
  const l = cleanLink(link).replace(/^https?:\/\//i, '')
  return l.split(/[/?#]/)[0].replace(/^www\./, '')
}

// --- 4. Clasificador de categorías (por palabras clave) ------------------------
// Reglas ordenadas: la primera que coincide gana.
const RULES = [
  ['Video', /video|reel|short|film|avatar|pel[ií]cula|animaci[oó]n de|anima tus|movimiento|movimiento/i],
  ['Imagen', /imagen|im[aá]genes|image-to-image|text-to-image|foto|logo|png|comic|manga|dibujo|colorear|gif|sticker|tatuaje|fondo|banner|flyer|emote|colorization|selfie/i],
  ['Audio y Música', /m[uú]sica|audio|voz|voces|canci[oó]n|partitura|podcast|sonido|clonaci[oó]n de voz|metr[oó]nomo|transcrib.*canci/i],
  ['3D y Diseño', /3d|modelos? 3d|entornos? 3d|tridimensional|interiores|espacios?|circuito|c[aá]psula/i],
  ['Programación y Desarrollo', /c[oó]digo|programaci[oó]n|desarroll|api|json|csv|sql|base de datos|bases de datos|deploy|repositorio|git|no-code|nocode|vibecoding|vibe coding|app|aplicaci|landing|layout|css|carrusel|carruseles|loader|snippet|framework|algoritmo|websim|simulaci[oó]n interactiv/i],
  ['Educación y Estudio', /profesor|profesores|clase|clases|estudi|educa|curso|cursos|lecci|examen|ex[aá]men|quiz|cuestionario|tesis|aprend|idioma|ingl[eé]s|coreano|matem[aá]tic|tarea|marco te[oó]rico|preescolar|did[aá]ctic|khan|flashcard/i],
  ['Datos y Análisis', /analista de datos|analiza.*datos|datos|gr[aá]fico|infograf|reporte|dashboard|estad[ií]stic|satelital/i],
  ['Presentaciones', /presentaci|ppt|slide|diapositiva/i],
  ['Documentos y Escritura', /documento|pdf|resum|resumen|parafrase|escrib|redacci|redactar|correo|email|texto|art[ií]culo|blog|firma|humaniza|ocr|transcri|nota|notas|mapa mental|mapa conceptual|mapas? conceptual|diagrama|organiza tu|apuntes/i],
  ['IA Conversacional', /chat|chatbot|conversa|terapeuta|amigo|personaje|asistente|jur[ií]dic|homeop[aá]tic|multimodal|generativa de texto/i],
  ['Productividad', /automatiz|automatico|autom[aá]tico|tarea|productividad|calendario|lista|gantt|proyecto|organiz|planific|firma|extensi[oó]n|cuentagotas|captura|pantalla|link|enlaces/i],
  ['Negocios y Marketing', /marketing|negocio|contabilidad|contable|licitaci|producto|merchandising|branding|empaque|embalaje|ecommerce|e-commerce|ventas|cliente|sms|carrito|precios|mercado|inversi|token/i],
  ['Empleo y CV', /cv|curr[ií]culum|curriculum|resume|resum[eé]|empleo|trabajo|puesto|reclut|ats|linkedin|entrevista/i],
  ['Utilidades', /comprim|compresor|vpn|archivo|alojamiento|almacen|traduc|regalo|receta|chef|ejercicio|m[uú]sculo|salud|mascota|evento|cuerpo|medicina/i],
]
function classify(name, desc) {
  const hay = `${name} ${desc}`.toLowerCase()
  for (const [cat, re] of RULES) if (re.test(hay)) return cat
  return 'Otras'
}

// Palabras clave para búsqueda: tokens significativos de nombre + descripción.
const STOP = new Set(
  'de la el los las un una y o a con para que tu tus su sus se le lo en del al es por como puede puedes genera generar crea crear plataforma herramienta online desde base te da hace haces mas más'.split(
    ' '
  )
)
function keywords(name, desc, cat) {
  const raw = `${name} ${desc} ${cat}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w))
  return [...new Set(raw)]
}

// Herramientas mainstream/reconocidas -> mayor "popularidad" para el ordenamiento.
// (Proxy editable: al no existir métricas reales, priorizamos las más conocidas.)
const POPULAR = new Set(
  [
    'claude', 'canva', 'notion', 'perplexity', 'elevenlabs', 'suno', 'runway',
    'github', 'vercel', 'gamma', 'grok', 'notebooklm', 'replit', 'bolt', 'lovable',
    'v0', 'make', 'freepik', 'ideogram', 'descript', 'quizlet', 'obsidian',
    'heygen', 'napkin', 'gutenberg', 'otter', 'meshy', 'udio', 'flux', 'apob',
    'syntx', 'veed io', 'pika art', 'khanmigo', 'character ai', 'chatpdf', 'prezi',
  ].map((s) => s.toLowerCase())
)

// --- 5. Construir el listado ---------------------------------------------------
const tools = []
let id = 0
for (const { rowNum, cells } of rows) {
  if (rowNum < 3) continue // fila 2 = encabezado
  const name = (cells.B || '').trim()
  if (!name) continue
  const toolLink = toUrl(cells.C)
  const videoLink = cleanLink(cells.D)
  const description = (cells.E || '').trim()
  const domain = domainOf(cells.C)
  const category = classify(name, description)
  const order = ++id // el orden en la hoja es cronológico (proxy de "fecha")
  tools.push({
    id: order,
    order,
    name,
    description,
    category,
    domain,
    toolUrl: toolLink,
    videoUrl: /^https?:\/\//i.test(videoLink) ? videoLink : '',
    keywords: keywords(name, description, category),
    popular: POPULAR.has(name.toLowerCase()),
  })
}

// Resumen de categorías por consola
const byCat = {}
for (const t of tools) byCat[t.category] = (byCat[t.category] || 0) + 1

const payload = {
  generatedFrom: 'Registro Camidevai.xlsx',
  count: tools.length,
  categories: Object.keys(byCat).sort(),
  tools,
}

const outPublic = join(root, 'public', 'data', 'tools.json')
writeFileSync(outPublic, JSON.stringify(payload, null, 2), 'utf8')

console.log(`✓ ${tools.length} herramientas -> public/data/tools.json`)
console.log('Categorías:')
for (const [c, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1]))
  console.log(`  ${n.toString().padStart(3)}  ${c}`)
const missingDesc = tools.filter((t) => !t.description).length
const missingVideo = tools.filter((t) => !t.videoUrl).length
console.log(`Sin descripción: ${missingDesc} · Sin video: ${missingVideo}`)
