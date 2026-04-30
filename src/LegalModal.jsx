import { useEffect } from 'react'
import './LegalModal.css'

/* ── Contenido legal — legislación chilena ───────────────────────── */
const PAGES = {
  terminos: {
    title: 'Términos de uso',
    updated: 'Última actualización: abril de 2026',
    sections: [
      {
        h: '1. Aceptación',
        p: 'Al acceder o utilizar los servicios, plataformas o productos de JhedAI e InformatiK-AI (en adelante "la Empresa"), usted acepta quedar vinculado por los presentes Términos de Uso. Si no está de acuerdo con alguna disposición, debe abstenerse de usar nuestros servicios.',
      },
      {
        h: '2. Descripción del servicio',
        p: 'La Empresa ofrece soluciones tecnológicas basadas en inteligencia artificial, incluyendo desarrollo de software a medida, agentes autónomos, visión computacional, modelos de machine learning e integración con sistemas empresariales (ERP, CRM, WhatsApp, Instagram). Los servicios se prestan bajo contratos específicos suscritos con cada cliente.',
      },
      {
        h: '3. Uso aceptable',
        p: 'El usuario se compromete a utilizar los servicios únicamente para fines lícitos y de conformidad con la legislación chilena vigente. Queda expresamente prohibido: (a) utilizar los servicios para actividades fraudulentas o ilícitas; (b) intentar acceder sin autorización a sistemas o datos de terceros; (c) reproducir, distribuir o modificar los productos sin autorización escrita de la Empresa; (d) realizar ingeniería inversa sobre los sistemas entregados.',
      },
      {
        h: '4. Propiedad intelectual',
        p: 'Todo el código fuente, modelos de IA, diseños, documentación y demás activos desarrollados por la Empresa están protegidos por la Ley N° 17.336 sobre Propiedad Intelectual de Chile. Salvo acuerdo en contrario suscrito por escrito, la Empresa conserva la titularidad de la propiedad intelectual de los desarrollos. El cliente recibe una licencia de uso no exclusiva e intransferible según lo pactado en el contrato de servicios.',
      },
      {
        h: '5. Limitación de responsabilidad',
        p: 'La Empresa no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso de los servicios. La responsabilidad total de la Empresa frente al cliente no podrá superar el monto pagado por los servicios en los tres (3) meses anteriores al evento que origina el reclamo.',
      },
      {
        h: '6. Modificaciones',
        p: 'La Empresa se reserva el derecho de modificar los presentes Términos en cualquier momento. Los cambios serán notificados con al menos 15 días de anticipación a través de los canales de comunicación acordados. El uso continuado del servicio tras la notificación implica la aceptación de las modificaciones.',
      },
      {
        h: '7. Ley aplicable y jurisdicción',
        p: 'Los presentes Términos se rigen por la legislación de la República de Chile. Cualquier controversia derivada de su interpretación o aplicación se someterá a los Tribunales Ordinarios de Justicia de Santiago de Chile, salvo que las partes acuerden un mecanismo alternativo de resolución de conflictos.',
      },
      {
        h: '8. Contacto',
        p: 'Para consultas relativas a estos Términos, puede contactarnos en: contacto@informatik-ai.cl — JhedAI × InformatiK-AI, Santiago, Chile.',
      },
    ],
  },

  privacidad: {
    title: 'Política de privacidad',
    updated: 'Última actualización: abril de 2026',
    sections: [
      {
        h: '1. Responsable del tratamiento',
        p: 'InformatiK-AI SpA y JhedAI (en adelante "la Empresa"), con domicilio en Santiago de Chile, son responsables del tratamiento de los datos personales que usted nos proporciona, en conformidad con la Ley N° 19.628 sobre Protección de la Vida Privada y sus modificaciones posteriores.',
      },
      {
        h: '2. Datos que recopilamos',
        p: 'Recopilamos únicamente los datos necesarios para la prestación del servicio: (a) Datos de identificación: nombre, RUT o documento de identidad, cargo y empresa; (b) Datos de contacto: correo electrónico, teléfono y dirección; (c) Datos de uso: información técnica sobre cómo interactúa con nuestras plataformas (logs, métricas de rendimiento); (d) Datos contractuales: información necesaria para la emisión de facturas y gestión del contrato.',
      },
      {
        h: '3. Finalidad y base legal',
        p: 'Sus datos son tratados para: (a) ejecutar el contrato de servicios celebrado con usted o su organización; (b) enviar comunicaciones relacionadas con el proyecto; (c) cumplir obligaciones legales y tributarias (Ley N° 20.780, Código Tributario); (d) mejorar nuestros servicios mediante análisis agregado y anonimizado. El tratamiento se fundamenta en el consentimiento del titular, la ejecución contractual y el cumplimiento de obligaciones legales, según los artículos 4° y 6° de la Ley N° 19.628.',
      },
      {
        h: '4. Conservación de datos',
        p: 'Los datos se conservan durante el período de vigencia del contrato y por un período adicional de cinco (5) años para cumplir obligaciones legales y tributarias. Transcurrido dicho plazo, los datos serán eliminados de forma segura o anonimizados.',
      },
      {
        h: '5. Derechos del titular',
        p: 'De acuerdo con el artículo 12 de la Ley N° 19.628, usted tiene derecho a: (a) Acceder gratuitamente a sus datos personales; (b) Rectificar datos inexactos o desactualizados; (c) Cancelar o eliminar datos cuando procedan; (d) Oponerse al tratamiento en los casos previstos por la ley. Para ejercer estos derechos, envíe su solicitud a privacidad@informatik-ai.cl adjuntando copia de su documento de identidad. Responderemos en un plazo máximo de 15 días hábiles.',
      },
      {
        h: '6. Transferencias internacionales',
        p: 'Sus datos pueden ser procesados por proveedores de infraestructura cloud (AWS, Google Cloud, Microsoft Azure) ubicados fuera de Chile. En tales casos, exigimos contractualmente que dichos proveedores apliquen estándares de protección equivalentes a los exigidos por la legislación chilena.',
      },
      {
        h: '7. Seguridad',
        p: 'Aplicamos medidas técnicas y organizativas adecuadas para proteger sus datos contra acceso no autorizado, pérdida o divulgación: cifrado en tránsito (TLS 1.3) y en reposo (AES-256), control de acceso basado en roles, revisiones periódicas de seguridad y planes de respuesta a incidentes conforme a la Ley Marco de Ciberseguridad (Ley N° 21.663).',
      },
      {
        h: '8. Contacto',
        p: 'Para consultas sobre privacidad o para ejercer sus derechos, contáctenos en: privacidad@informatik-ai.cl — InformatiK-AI SpA, Santiago, Chile.',
      },
    ],
  },

  cookies: {
    title: 'Política de cookies',
    updated: 'Última actualización: abril de 2026',
    sections: [
      {
        h: '1. ¿Qué son las cookies?',
        p: 'Las cookies son pequeños archivos de texto que un sitio web almacena en su dispositivo cuando lo visita. Permiten al sitio recordar sus preferencias y mejorar su experiencia. Su uso está regulado en Chile por la Ley N° 19.628 y por las directrices del Consejo para la Transparencia.',
      },
      {
        h: '2. Cookies que utilizamos',
        p: 'Nuestro sitio utiliza exclusivamente: (a) Cookies estrictamente necesarias: imprescindibles para el funcionamiento básico del sitio (sesión, seguridad). No requieren su consentimiento. (b) Cookies de rendimiento: recopilan información anónima y agregada sobre cómo los usuarios navegan el sitio (páginas visitadas, tiempo de sesión), con el fin de mejorar la experiencia. Solo se activan con su consentimiento. No utilizamos cookies de publicidad ni de perfilamiento.',
      },
      {
        h: '3. Cookies de terceros',
        p: 'Podemos utilizar servicios de terceros que instalan sus propias cookies: (a) Google Fonts: carga tipografías desde servidores de Google; (b) Herramientas de análisis anónimo (si aplica). Estos terceros cuentan con sus propias políticas de privacidad. Le recomendamos consultarlas directamente.',
      },
      {
        h: '4. Gestión y rechazo de cookies',
        p: 'Puede configurar su navegador para bloquear o eliminar cookies en cualquier momento: Chrome → Configuración → Privacidad → Cookies; Firefox → Preferencias → Privacidad; Safari → Preferencias → Privacidad; Edge → Configuración → Privacidad. Tenga en cuenta que bloquear ciertas cookies puede afectar la funcionalidad del sitio.',
      },
      {
        h: '5. Actualizaciones de esta política',
        p: 'Esta política puede actualizarse para reflejar cambios en la tecnología o en la legislación aplicable. La versión vigente siempre estará disponible en esta sección con su fecha de última actualización.',
      },
      {
        h: '6. Contacto',
        p: 'Para consultas sobre el uso de cookies en nuestro sitio, contáctenos en: contacto@informatik-ai.cl — InformatiK-AI SpA, Santiago, Chile.',
      },
    ],
  },
}

export default function LegalModal({ page, onClose }) {
  useEffect(() => {
    if (!page) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [page, onClose])

  if (!page) return null
  const { title, updated, sections } = PAGES[page]

  return (
    <div className="legal-overlay" onClick={onClose}>
      <div className="legal-panel" onClick={e => e.stopPropagation()}>

        <div className="legal-header">
          <div>
            <h2 className="legal-title">{title}</h2>
            <span className="legal-updated">{updated}</span>
          </div>
          <button className="legal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <div className="legal-body">
          {sections.map(s => (
            <section key={s.h} className="legal-section">
              <h3 className="legal-sh">{s.h}</h3>
              <p className="legal-sp">{s.p}</p>
            </section>
          ))}
          <p className="legal-brand">JhedAI × InformatiK-AI · Santiago, Chile</p>
        </div>

      </div>
    </div>
  )
}
