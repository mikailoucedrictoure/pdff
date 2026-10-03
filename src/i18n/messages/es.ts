import type { Messages } from "./fr";

const es: Messages = {
  meta: {
    title: "pdff — Unir, convertir y editar PDF, Word, Excel gratis",
    description: "Herramienta online gratuita para unir, convertir, comprimir, dividir y proteger tus PDF, Word, Excel, PowerPoint e imágenes. Sin registro, archivos eliminados al instante.",
    keywords: "unir pdf, convertir pdf, pdf a word, word a pdf, jpg a pdf, pdf a jpg, comprimir pdf, dividir pdf, excel a pdf, herramientas pdf gratis",
  },
  nav: { merge: "Unir", convert: "Convertir", allTools: "Todas las herramientas", back: "← Todas las herramientas" },
  footer: {
    text: "Gratis y sin registro. Tus archivos se eliminan en cuanto termina el proceso.",
    skip: "Ir al contenido",
    legalNav: "Información sobre el sitio",
    developedBy: "Diseñado y desarrollado por {name}",
  },
  home: {
    title: "Todos tus documentos, en una sola herramienta.",
    subtitle: "PDF, Word, Excel, PowerPoint, imágenes: une, convierte y edita en segundos.",
    ctaMerge: "Unir archivos",
    ctaConvert: "Convertir un archivo",
    trust: "Gratis, sin registro y sin marca de agua añadida.",
    orbitHint: "Agarra un icono, lanza el anillo, toca la hoja central.",
    orbitCore: "Hacer estallar el anillo",
    formatsTitle: "{n} formatos compatibles",
    formatsSubtitle: "Los que realmente circulan en administraciones, escuelas y empresas.",
    stepsTitle: "Tres gestos, nada más",
    steps: [
      { title: "Suelta", text: "Arrastra tus archivos o elígelos desde tu teléfono." },
      { title: "Elige", text: "Ajusta el orden, el formato de salida o las páginas que quieres conservar." },
      { title: "Descarga", text: "El resultado se descarga solo, listo para enviar." },
    ],
  },
  categories: { organiser: "Organizar", convertir: "Convertir", modifier: "Editar", securite: "Seguridad" },
  formatCategories: {
    pdf: "PDF",
    image: "Imágenes",
    document: "Documentos de texto",
    spreadsheet: "Hojas de cálculo",
    presentation: "Presentaciones",
    ebook: "Libros y documentos fijos",
    text: "Texto",
    web: "Web",
  },
  formatNames: {
    odt: "Texto OpenDocument (ODT)",
    cbz: "Cómic (CBZ)",
    txt: "Texto (TXT)",
    doc: "Word 97-2003 (DOC)",
    xls: "Excel 97-2003 (XLS)",
    ppt: "PowerPoint 97-2003 (PPT)",
  },
  notice: {
    officeMissingTitle: "Formatos Word, Excel y PowerPoint desactivados.",
    officeMissingText: "Instala LibreOffice (gratis) para activarlos y reinicia pdff. En Windows:",
  },
  workspace: {
    dropTitle: "Suelta tus archivos aquí",
    dropActive: "Suéltalos, ¡vamos!",
    dropPdfOnly: "Archivos PDF",
    dropAny: "PDF, Word, Excel, PowerPoint, imágenes, EPUB, texto…",
    choose: "Elegir archivos",
    addMore: "Añadir archivos",
    fileCount: "{n} archivo(s)",
    dragHint: "Arrastra para cambiar el orden.",
    sortAZ: "Ordenar A→Z",
    reverse: "Invertir",
    clear: "Quitar todo",
    moveUp: "Subir",
    moveDown: "Bajar",
    remove: "Quitar",
    rejected: "Formato no compatible con esta herramienta: {files}",
    settings: "Ajustes",
    noSettings: "No hace falta ningún ajuste.",
    approximate: "Desde un PDF, el diseño se reconstruye: el resultado puede necesitar retoques, sobre todo si el documento está escaneado.",
    targetEmpty: "Añade un archivo para ver los formatos posibles.",
    targetNone: "Estos archivos no tienen ningún formato de salida en común.",
    uploading: "Enviando… {pct} %",
    processing: "Procesando…",
    processingShort: "Procesando…",
    cancel: "Cancelar",
    done: "Listo en {s} s",
    doneMany: "Listo en {s} s, {n} archivos (ZIP)",
    download: "Descargar",
    downloadResult: "✓ Descargar el resultado",
    restart: "Empezar de nuevo",
    limits: "Hasta {pages} páginas y {files} archivos por operación.",
    errorConnection: "No se puede conectar con el servidor.",
    errorGeneric: "El proceso ha fallado.",
    advanced: "Más ajustes (opcional)",
    preview: "Vista previa",
    saved: "{before} → {after}: {pct} más ligero",
    savedNone: "Este archivo ya estaba bien optimizado: no se puede reducir más.",
    outputLabel: "Formato del resultado",
    resultName: "Nombre del archivo final",
    resultNamePlaceholder: "automático",
    resultNameHelp: "La extensión se añade sola.",
    previewTitle: "Vista previa",
    previewResult: "Vista previa del resultado",
    previewLoading: "Preparando la vista previa…",
    previewLocked: "Documento protegido: escribe la contraseña para ver la vista previa.",
    previewNone: "No hay vista previa para este formato.",
    previewMore: "+ {n} páginas",
    previewFile: "Archivo {n}",
    previewInvalid: "Revisa los números de página: la vista previa se actualiza en cuanto sean correctos.",
    localOnly: "Procesado en tu navegador: tus archivos no se envían.",
    sigDraw: "Dibujar",
    sigType: "Escribir",
    sigUpload: "Importar",
    sigClear: "Borrar",
    sigTypePlaceholder: "Tu nombre y apellido",
    sigDrawHint: "Firma dentro del recuadro con el ratón o el dedo.",
    sigUploadHint: "Imagen de tu firma (PNG o JPG), mejor sobre fondo blanco.",
    areaHint: "Dibuja un rectángulo en una página para ocultar una zona (foto, firma, sello…).",
    areaRemove: "Quitar esta zona",
    areaCount: "Zonas a ocultar: {n}",
    ocrLoading: "Preparando la lectura (descarga del modelo de idioma)…",
    ocrProgress: "Leyendo el texto: página {n} de {total}…",
    formLoading: "Leyendo los campos del formulario…",
    formNone: "Este PDF no tiene campos para rellenar. Para escribir en él hace falta un formulario PDF interactivo.",
    formFilled: "Campos rellenados: {n} de {total}",
    formChoose: "— Elegir —",
    formFields: "Campos del formulario",
    compareNeedTwo: "Deja dos PDF: primero la versión antigua y luego la nueva.",
    compareOld: "Versión antigua",
    compareNew: "Versión nueva",
    compareLoading: "Comparando…",
    compareSummary: "{added} palabras añadidas, {removed} palabras eliminadas",
    compareSame: "Ninguna diferencia en el texto: las dos versiones dicen lo mismo.",
    compareLegend: "En verde: texto añadido. En rojo tachado: texto eliminado.",
    comparePages: "Páginas: {a} → {b}",
    compareNoText: "Estos PDF no contienen texto legible (¿escaneos?). Pásalos antes por la herramienta OCR.",
    compareReport: "Informe de comparación",
    compareSkipped: "… {n} palabras idénticas …",
    sizeChange: "{from} → {to} píxeles",
  },
  language: {
    button: "Idioma",
    title: "Elegir idioma",
    search: "Buscar un idioma…",
    verified: "Traducción revisada",
    automatic: "Traducción automática",
    current: "Idioma actual",
    translating: "Traduciendo pdff al {lang}…",
    unavailable: "La traducción automática aún no está activada en este servidor: pdff se muestra en inglés.",
    failed: "La traducción al {lang} ha fallado. Inténtalo más tarde.",
    noResult: "Ningún idioma coincide.",
    close: "Cerrar",
    auto: "Automático (idioma del navegador)",
  },
  seo: {
    whyTitle: "¿Por qué pdff?",
    why: [
      {
        title: "100 % gratis",
        text: "Sin suscripción, sin tarjeta bancaria y sin marcas de agua en tus documentos.",
      },
      {
        title: "Sin registro",
        text: "No hay que crear cuenta: abre la página, suelta tus archivos y listo.",
      },
      {
        title: "Tus archivos son tuyos",
        text: "Se procesan y se eliminan al instante. No guardamos ni tus documentos ni tus datos.",
      },
      {
        title: "Todos los formatos",
        text: "PDF, Word, Excel, PowerPoint, OpenDocument, imágenes, EPUB… desde un ordenador o un móvil.",
      },
    ],
    howTitle: "¿Cómo funciona?",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿pdff es realmente gratis?",
        a: "Sí. Todas las herramientas son gratuitas, sin marcas de agua ni funciones bloqueadas tras una suscripción. Nunca se pide una tarjeta bancaria.",
      },
      {
        q: "¿Hace falta crear una cuenta?",
        a: "No. Sin registro y sin correo electrónico: usas las herramientas directamente.",
      },
      {
        q: "¿Se guardan mis documentos?",
        a: "No. Tus archivos solo sirven para la tarea que pides y luego se eliminan. Nadie los lee y no se comparten con nadie.",
      },
      {
        q: "¿Funciona en el móvil?",
        a: "Sí. pdff funciona en el navegador de cualquier móvil, tableta u ordenador (Android, iPhone, Windows, Mac, Linux), sin instalar nada.",
      },
      {
        q: "¿Qué formatos se admiten?",
        a: "PDF, Word (DOCX, DOC), Excel (XLSX, XLS, CSV), PowerPoint (PPTX, PPT), OpenDocument (ODT, ODS, ODP), RTF, imágenes (JPG, PNG, WebP, AVIF, TIFF, GIF, SVG), EPUB, TXT, HTML y más.",
      },
      {
        q: "¿Hay algún límite?",
        a: "Puedes procesar hasta {files} archivos a la vez, y un documento generado puede tener hasta {pages} páginas.",
      },
    ],
    moreTools: "Más herramientas",
    privacyLink: "Privacidad",
    sourceLink: "Código abierto",
    usesTitle: "¿Para qué sirve?",
    toolFaqTitle: "Preguntas sobre esta herramienta",
  },
  privacy: {
    title: "Privacidad",
    description: "Cómo trata pdff tus archivos: sin cuenta, sin documentos guardados, sin publicidad ni venta de datos.",
    updated: "Última actualización: {date}",
    intro: "pdff está pensado para que tus documentos sigan siendo tuyos. Esto es, en pocas palabras, lo que ocurre cuando lo usas.",
    sections: [
      {
        title: "Tus archivos",
        text: "Se envían cifrados (HTTPS), se procesan automáticamente y se eliminan en cuanto el resultado está listo. Los archivos grandes pasan por un almacenamiento temporal con un nombre aleatorio y se borran al terminar el proceso; una limpieza automática elimina cualquier resto en un máximo de 24 horas.",
      },
      {
        title: "Sin cuenta ni datos personales",
        text: "pdff no pide registro, correo electrónico ni tarjeta bancaria. Tus documentos no se leen, no se analizan, no se comparten ni se usan para entrenar inteligencia artificial.",
      },
      {
        title: "Medición de audiencia",
        text: "Contamos las visitas de forma anónima y sin cookies (Vercel Web Analytics) para saber qué herramientas son útiles. Sin publicidad ni rastreo entre sitios.",
      },
      { title: "Cookies", text: "Una sola cookie, opcional: recuerda el idioma que elegiste." },
      {
        title: "Alojamiento",
        text: "El sitio está alojado en Vercel, en servidores situados en París; las conversiones de Word, Excel y PowerPoint las realiza Render, en Fráncfort. Estos proveedores solo tratan los archivos durante la conversión.",
      },
      {
        title: "Contacto",
        text: "¿Una pregunta o un comentario? Escríbenos desde la página del proyecto:",
      },
    ],
  },
  legal: {
    termsLink: "Condiciones de uso",
    securityLink: "Seguridad y datos",
    accessibilityLink: "Accesibilidad",
    terms: {
      title: "Condiciones de uso",
      description: "pdff es gratuito para todos, incluidas empresas y administraciones. Tus documentos siguen siendo tuyos: nada se analiza ni se conserva.",
      intro: "Estas condiciones regulan el uso de pdff. Son breves a propósito y están escritas con palabras sencillas. Al usar el sitio, las aceptas.",
      sections: [
        {
          title: "Quién edita pdff",
          text: "pdff ha sido diseñado, desarrollado y editado por Mikailou Cedric Toure, desarrollador establecido en Nuevo Brunswick (Canadá).",
        },
        {
          title: "Una licencia de uso gratuita, para todos",
          text: "pdff es gratuito, sin registro y sin límite de tiempo, para todo el mundo: particulares, estudiantes, docentes, empresas, asociaciones, administraciones y gobiernos, en Canadá y en cualquier otro país. Ningún uso está reservado a una oferta de pago, porque no existe. Los archivos que produces son totalmente tuyos: no llevan marca de agua ni mención de pdff.",
        },
        {
          title: "Todos tus documentos, incluso los confidenciales",
          text: "Puedes procesar cualquier tipo de documento, incluso confidencial, porque pdff no lee, analiza, conserva ni comparte tus archivos: se procesan automáticamente y luego se eliminan. Sigues siendo su propietario y eres responsable de contar con los derechos necesarios para procesarlos.",
        },
        {
          title: "Código fuente e instalación en tus propios servidores",
          text: "El código de pdff se publica bajo la licencia MIT. Puedes consultarlo, auditarlo, instalarlo en tus propios servidores (incluso en una red cerrada, sin acceso a Internet), modificarlo y redistribuirlo gratuitamente, siempre que conserves el aviso de derechos de autor y el texto de la licencia.",
        },
        {
          title: "Uso aceptable",
          text: "Está prohibido usar pdff para actividades ilegales, intentar perturbar el servicio (envíos automatizados masivos, intentos de intrusión) o eludir sus límites técnicos. Los límites de tamaño y de número de archivos protegen el servicio para todos.",
        },
        {
          title: "Disponibilidad",
          text: "pdff se ofrece gratuitamente. Puede cambiar, interrumpirse por mantenimiento o dejar de funcionar. Conserva siempre tus documentos originales: pdff no guarda ninguna copia.",
        },
        {
          title: "Garantía y responsabilidad",
          text: "El servicio se ofrece «tal cual», sin garantía de ningún tipo. En la máxima medida permitida por la ley, el editor no es responsable de daños indirectos, pérdidas de datos ni de un resultado de conversión imperfecto. Revisa los documentos producidos antes de usarlos para un trámite importante.",
        },
        {
          title: "Propiedad intelectual",
          text: "El nombre pdff, su logotipo y los textos del sitio pertenecen al editor; el código está bajo licencia MIT, como se indica arriba. Las marcas citadas (PDF, Word, Excel, PowerPoint…) pertenecen a sus respectivos propietarios.",
        },
        {
          title: "Ley aplicable",
          text: "Estas condiciones se rigen por las leyes de la provincia de Nuevo Brunswick y las leyes federales de Canadá aplicables en ella. Los tribunales de Nuevo Brunswick son competentes, sin perjuicio de los derechos que la ley de tu país te garantiza como consumidor.",
        },
        {
          title: "Cambios",
          text: "Estas condiciones pueden actualizarse. La fecha en la parte superior de la página indica la versión vigente; un cambio solo se aplica a los usos posteriores a su publicación.",
        },
        {
          title: "Contacto",
          text: "¿Una pregunta sobre estas condiciones? Escríbenos desde la página del proyecto:",
        },
      ],
    },
    security: {
      title: "Seguridad y datos",
      description: "Qué pasa con tus archivos en pdff: procesamiento automático, sin análisis, eliminación inmediata, cifrado, alojamiento en Europa e instalación posible en tus servidores.",
      intro: "Qué pasa con tus archivos, dónde se procesan y cómo se protegen: explicado de forma sencilla, tanto para particulares como para departamentos de informática.",
      sections: [
        {
          title: "Ningún documento conservado",
          text: "Tus archivos se procesan automáticamente y se eliminan en cuanto el resultado está listo o descargado. No hay copia, ni respaldo, ni historial. Una limpieza automática diaria borra además cualquier archivo temporal que pudiera quedar, a más tardar al día siguiente.",
        },
        {
          title: "Ningún análisis",
          text: "Nadie lee tus documentos. No se indexan, ni se analizan, ni se comparten, ni se usan para entrenar inteligencia artificial. pdff no tiene cuentas, ni publicidad, ni perfiles de usuario.",
        },
        {
          title: "Cifrado",
          text: "Todas las conexiones están cifradas (HTTPS) y el sitio impone el cifrado en cada visita (HSTS). La herramienta Proteger cifra tus PDF con AES-256; la contraseña elegida nunca se guarda.",
        },
        {
          title: "Dónde se procesan tus archivos",
          text: "Sitio y herramientas de PDF e imágenes: Vercel, centro de datos de París (Francia, Unión Europea). Conversiones de Word, Excel y PowerPoint: Render, en Fráncfort (Alemania, Unión Europea). Archivos de más de 4 MB: almacenamiento temporal Vercel Blob, con un nombre aleatorio, eliminado tras su uso.",
        },
        {
          title: "Protecciones técnicas",
          text: "Cabeceras de seguridad (HSTS, bloqueo de la inserción del sitio en otras páginas, protección contra la confusión de tipos de archivo), direcciones de archivos temporales imposibles de adivinar y un servicio de conversión accesible solo con un token secreto. Cada cambio en el código se verifica automáticamente (pruebas, control de tipos) antes de publicarse.",
        },
        {
          title: "Privacidad y leyes aplicables",
          text: "pdff se edita en Nuevo Brunswick y cumple la Ley de Protección de Información Personal y Documentos Electrónicos (PIPEDA) de Canadá. No recoge ningún dato personal de sus usuarios: ni cuenta, ni correo electrónico, ni cookie de seguimiento. Está diseñado según los mismos principios que el RGPD europeo y la Ley 25 de Quebec: minimización de datos, ninguna reutilización, eliminación tras el procesamiento.",
        },
        {
          title: "Para organizaciones con normas estrictas",
          text: "Si tus normas prohíben enviar documentos a un servicio externo, instala pdff en tus propios servidores. El software completo es gratuito, de código abierto y funciona sin conexión a Internet: ningún archivo sale de tu red. La guía de instalación está en la página del proyecto.",
        },
        {
          title: "Transparencia",
          text: "El código fuente completo es público: tus equipos de seguridad pueden verificar cada una de estas afirmaciones.",
        },
        {
          title: "Informar de una vulnerabilidad",
          text: "¿Crees haber encontrado un fallo de seguridad? Infórmalo de forma confidencial desde la pestaña «Security» de la página del proyecto:",
        },
      ],
    },
    accessibility: {
      title: "Accesibilidad",
      description: "Declaración de accesibilidad de pdff: objetivo WCAG 2.2 nivel AA, medidas aplicadas, limitaciones conocidas y cómo informar de un obstáculo.",
      intro: "Todo el mundo debe poder usar pdff, incluidas las personas ciegas o con baja visión, sordas o con pérdida auditiva, o con una discapacidad motriz o cognitiva.",
      sections: [
        {
          title: "Norma de referencia",
          text: "pdff aspira a cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2, nivel AA, la norma internacional del W3C. Este nivel cubre los requisitos de la Norma de accesibilidad web del Gobierno de Canadá, la norma europea EN 301 549 y la sección 508 de Estados Unidos, que remiten a las WCAG 2.0 o 2.1 de nivel AA.",
        },
        {
          title: "Estado de conformidad",
          text: "pdff es parcialmente conforme con las WCAG 2.2 nivel AA: las limitaciones conocidas se indican más abajo. Esta declaración se basa en una evaluación interna realizada el 2 de octubre de 2026, con herramientas automáticas (axe, Lighthouse) y comprobaciones manuales (teclado, contraste, zoom, anuncios). Todavía no se ha realizado ninguna auditoría independiente.",
        },
        {
          title: "Medidas aplicadas",
          text: "Todo el sitio se usa con el teclado, con un enlace «Ir al contenido» y un contorno visible en el elemento activo. El contraste del texto es de al menos 4,5:1. Las etapas de una tarea (envío, resultado, error) se anuncian a los lectores de pantalla. El orden de los archivos se cambia sin arrastrar y soltar, con botones. El sitio respeta el ajuste «reducir movimiento» de tu dispositivo: las animaciones se detienen entonces por completo. Las páginas siguen siendo legibles con un zoom del 400 % y en el móvil. El idioma de cada página está declarado y el árabe se muestra de derecha a izquierda.",
        },
        {
          title: "Limitaciones conocidas",
          text: "Sin ese ajuste, las animaciones decorativas (fondo, anillo, desfile de formatos) funcionan sin parar; el desfile se detiene al pasar el ratón y con el teclado. El anillo animado de la página de inicio se maneja con el ratón o con el dedo; es decorativo y la lista de formatos que muestra también está disponible como texto en la página. Los idiomas traducidos automáticamente pueden contener imprecisiones. Por último, la accesibilidad de un documento producido depende del original: pdff no añade etiquetas de accesibilidad a un PDF que no las tiene.",
        },
        {
          title: "Informar de un obstáculo",
          text: "¿Alguna parte del sitio te causa problemas? Descríbela desde la página del proyecto; intentamos responder en un plazo de 10 días hábiles y ofrecer una alternativa si la corrección tarda más:",
        },
      ],
    },
    installLink: "Instalar en sus servidores",
    install: {
      title: "pdff para organizaciones",
      description: "Instale pdff en los servidores de su administración o empresa: gratis, de código abierto y sus documentos nunca salen de su red.",
      intro: "Administraciones, empresas, hospitales, escuelas: instale pdff en sus propias instalaciones en minutos y mantenga el control total de sus documentos.",
      sections: [
        {
          title: "Sus documentos no salen de su red",
          text: "Todo el procesamiento se realiza en sus propios servidores, incluso sin conexión a Internet. Sin estadísticas, sin servicios externos, sin cuentas.",
        },
        {
          title: "Todo incluido",
          text: "Todas las herramientas de pdff, más de 40 formatos, LibreOffice para Word, Excel y PowerPoint, y los 160 idiomas de la interfaz, en un solo contenedor.",
        },
        {
          title: "Gratis y de código abierto",
          text: "pdff se publica bajo la licencia MIT: instalación, uso y modificación gratuitos, sin límite de usuarios. Sus equipos de seguridad pueden auditar todo el código.",
        },
        {
          title: "Instalación en 3 comandos",
          text: "En un servidor con Docker (al menos 2 procesadores y 2 GB de memoria):",
        },
        {
          title: "Actualizaciones",
          text: "Basta un comando: docker compose pull y luego docker compose up -d. Cada versión se construye y se prueba automáticamente, sin red, antes de publicarse. La guía completa (HTTPS, red aislada, ajustes) está aquí:",
        },
        {
          title: "Acompañamiento",
          text: "¿Necesita ayuda con la instalación, una versión con sus colores, un contrato de soporte o una función a medida? Contacte con el desarrollador:",
        },
      ],
    },
  },
  tools: {
    fusionner: {
      name: "Unir",
      tagline: "Junta varios archivos (PDF, Word, imágenes…) en un solo PDF, en el orden que elijas.",
      seoTitle: "Unir PDF online gratis (Word, imágenes, PDF)",
      seoDescription: "Combina PDF, Word, Excel, PowerPoint e imágenes en un solo PDF, en el orden que quieras. Gratis, sin registro ni marca de agua, archivos eliminados al instante.",
      intro: "Reúne todos tus papeles en un solo archivo: pdff acepta PDF, pero también documentos Word, hojas de Excel, presentaciones y fotos, y los une en un PDF limpio con un marcador por archivo.",
      options: { bookmarks: { label: "Añadir un marcador por archivo" } },
      guide: {
        keywords: "unir pdf, combinar pdf, juntar pdf, fusionar pdf, unir word y pdf, unir varios pdf en uno",
        uses: [
          "Enviar un expediente completo (identificación, justificantes, formularios) en un solo archivo, como piden la mayoría de las administraciones.",
          "Reunir los capítulos de una tesis o un informe escritos en archivos separados.",
          "Convertir fotos de documentos hechas con el móvil en un único PDF limpio.",
        ],
        steps: [
          {
            title: "Deja tus archivos",
            text: "PDF, Word, Excel, imágenes… los que necesites.",
          },
          {
            title: "Ordénalos",
            text: "Arrástralos o usa las flechas y el orden A→Z.",
          },
          {
            title: "Haz clic en Unir",
            text: "Descargas un solo PDF, con un marcador por archivo.",
          },
        ],
        faq: [
          {
            q: "¿Se pueden unir archivos Word y fotos con PDF?",
            a: "Sí. pdff convierte cada archivo a PDF automáticamente antes de unirlos, en el orden elegido.",
          },
          {
            q: "¿Cuántos archivos se pueden unir?",
            a: "Hasta varios cientos a la vez, sin marca de agua ni registro.",
          },
        ],
      },
    },
    convertir: {
      name: "Convertir",
      tagline: "Convierte cualquier documento o imagen a otro formato.",
      seoTitle: "Convertir PDF a Word, Word a PDF, JPG a PDF — gratis",
      seoDescription: "Conversor gratuito: PDF ↔ Word, Excel, PowerPoint, JPG, PNG, EPUB y más de 40 formatos. Online, sin registro y en alta calidad.",
      intro: "Un solo conversor para todos tus formatos: Word a PDF, PDF a Word, JPG a PDF, PDF a JPG, Excel a PDF, PowerPoint a PDF, PNG a JPG, EPUB a PDF… Suelta tus archivos y pdff solo te propone los formatos posibles.",
      options: {
        target: { label: "Convertir a" },
        dpi: { label: "Resolución de las imágenes (DPI)" },
        quality: { label: "Calidad JPG / WebP / AVIF (1-100)" },
      },
      guide: {
        keywords: "pdf a word, word a pdf, jpg a pdf, pdf a jpg, excel a pdf, powerpoint a pdf, convertidor pdf gratis",
        uses: [
          "Pasar un PDF a Word para poder modificar el texto.",
          "Pasar una foto o captura de pantalla a PDF para enviarla a un organismo.",
          "Pasar un documento Word, Excel o PowerPoint a PDF para que se vea igual en todas partes.",
        ],
        steps: [
          {
            title: "Deja tus archivos",
            text: "Uno o varios, en cualquier formato habitual.",
          },
          {
            title: "Elige el formato",
            text: "pdff solo propone las conversiones posibles para tus archivos.",
          },
          {
            title: "Haz clic en Convertir",
            text: "El archivo convertido se descarga al momento.",
          },
        ],
        faq: [
          {
            q: "¿La conversión de PDF a Word mantiene el diseño?",
            a: "Lo mantiene lo mejor posible, pero un PDF complejo (columnas, tablas anidadas) puede necesitar retoques: pdff te avisa cuando es el caso.",
          },
          {
            q: "¿Qué formatos se pueden convertir?",
            a: "Más de 40: PDF, Word, Excel, PowerPoint, OpenDocument, imágenes (JPG, PNG, WebP, AVIF…), EPUB, texto, HTML y más.",
          },
        ],
      },
    },
    diviser: {
      name: "Dividir",
      tagline: "Cortar un PDF en varios archivos más pequeños.",
      seoTitle: "Dividir un PDF online gratis — separar páginas",
      seoDescription: "Separa un PDF en varios archivos: por rangos de páginas, página a página o cada N páginas. Gratis, rápido y sin registro.",
      intro: "Deja tu PDF, elige cómo cortarlo y haz clic en Dividir: recibes todas las partes en un solo archivo ZIP.",
      options: {
        mode: {
          label: "¿Cómo cortarlo?",
          choices: {
            each: "Cada página por separado",
            ranges: "Yo elijo las páginas",
            every: "Por bloques",
          },
          hints: {
            each: "1 página = 1 archivo. Lo más sencillo.",
            ranges: "Ej.: páginas 1 a 3 en un archivo, 4 a 10 en otro.",
            every: "Ej.: un archivo nuevo cada 5 páginas.",
          },
        },
        ranges: {
          label: "¿Qué páginas?",
          placeholder: "1-3, 4-10",
          help: "Una coma separa cada archivo: «1-3, 4-10» da 2 archivos (páginas 1 a 3 y luego 4 a 10). Escribe «final» para la última página.",
        },
        every: {
          label: "¿Cuántas páginas por archivo?",
        },
      },
      guide: {
        keywords: "dividir pdf, separar pdf, cortar pdf, separar páginas pdf, extraer cada página de un pdf",
        uses: [
          "Separar un escaneo grande que contiene varios documentos distintos.",
          "Enviar solo una parte de un documento demasiado pesado.",
          "Obtener cada página de un PDF en un archivo aparte, o en imágenes.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "La vista previa muestra todas sus páginas.",
          },
          {
            title: "Elige cómo cortarlo",
            text: "Cada página por separado, por rangos o por bloques.",
          },
          {
            title: "Haz clic en Dividir",
            text: "Recibes todas las partes en un solo archivo ZIP.",
          },
        ],
        faq: [
          {
            q: "¿Puedo elegir exactamente las páginas de cada archivo?",
            a: "Sí: escribe por ejemplo «1-3, 4-10» para obtener un archivo con las páginas 1 a 3 y otro con las 4 a 10.",
          },
          {
            q: "¿Se pueden obtener imágenes en lugar de PDF?",
            a: "Sí: elige JPG o PNG en «Formato del resultado».",
          },
        ],
      },
    },
    extraire: {
      name: "Extraer / eliminar páginas",
      tagline: "Conserva o quita algunas páginas de un PDF.",
      seoTitle: "Extraer o eliminar páginas de un PDF — gratis",
      seoDescription: "Conserva solo las páginas útiles de un PDF o quita las que sobran. Online, gratis, sin registro ni marca de agua.",
      intro: "¿Una página en blanco, un anexo inútil, un duplicado? Indica las páginas que quieres conservar o quitar (por ejemplo 1-3, 7, 10-fin) y obtén un PDF limpio en segundos.",
      options: {
        mode: { label: "Acción", choices: { keep: "Conservar solo estas páginas", remove: "Eliminar estas páginas" } },
        pages: { label: "Páginas", placeholder: "1, 3-5", help: "Ej.: 1-3, 5, 8-fin. Vacío = todas las páginas." },
      },
      guide: {
        keywords: "eliminar páginas pdf, quitar páginas de un pdf, extraer páginas pdf, conservar páginas pdf",
        uses: [
          "Quitar una página en blanco o repetida de un escaneo.",
          "Conservar solo las páginas útiles de un documento largo antes de enviarlo.",
          "Quitar una página con datos personales.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "La vista previa muestra todas sus páginas.",
          },
          {
            title: "Indica las páginas",
            text: "Elige conservarlas o eliminarlas: la vista previa tacha las páginas quitadas.",
          },
          {
            title: "Haz clic en el botón",
            text: "Descargas el PDF aligerado.",
          },
        ],
        faq: [
          {
            q: "¿Cómo elimino una sola página de un PDF?",
            a: "Elige «Eliminar estas páginas» y escribe su número, por ejemplo «3».",
          },
          {
            q: "¿Se modifica el resto del documento?",
            a: "No: las demás páginas quedan igual, sin pérdida de calidad.",
          },
        ],
      },
    },
    organiser: {
      name: "Reordenar páginas",
      tagline: "Cambia el orden de las páginas, duplica, invierte.",
      seoTitle: "Ordenar las páginas de un PDF online — gratis",
      seoDescription: "Cambia el orden de las páginas de un PDF, duplica algunas o invierte todo el documento. Gratis, online, sin registro.",
      intro: "¿Páginas escaneadas en desorden? Indica el nuevo orden (por ejemplo 3, 1, 2, 4-fin) o invierte el documento entero: pdff hace el resto.",
      options: {
        order: { label: "Nuevo orden", placeholder: "3, 1, 2, 4-fin", help: "Las páginas no indicadas se eliminan." },
        reverse: { label: "Invertir todo el documento (ignora el orden anterior)" },
      },
      guide: {
        keywords: "ordenar páginas pdf, cambiar el orden de un pdf, mover páginas pdf, invertir pdf",
        uses: [
          "Volver a ordenar páginas escaneadas desordenadas.",
          "Poner una portada o un índice al principio.",
          "Invertir un documento escaneado al revés.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "La vista previa muestra todas sus páginas.",
          },
          {
            title: "Escribe el nuevo orden",
            text: "Por ejemplo «3, 1, 2»: la vista previa muestra el resultado.",
          },
          {
            title: "Haz clic en Reordenar páginas",
            text: "Descargas el PDF ordenado.",
          },
        ],
        faq: [
          {
            q: "¿Se puede duplicar una página?",
            a: "Sí: escribe su número dos veces, por ejemplo «1, 2, 2, 3».",
          },
          {
            q: "¿Cómo invierto todo el documento?",
            a: "Marca la opción de invertir: la última página pasa a ser la primera.",
          },
        ],
      },
    },
    renommer: {
      name: "Renombrar",
      tagline: "Cambiar el nombre de uno o varios archivos, sin enviar nada.",
      seoTitle: "Renombrar archivos en línea — gratis y sin envíos",
      seoDescription: "Renombra uno o varios archivos (PDF, Word, imágenes…) de una vez, con numeración automática. Todo ocurre en tu navegador: no se envía nada.",
      intro: "Deja tus archivos, escribe el nuevo nombre y haz clic en Renombrar. Para varios archivos, pdff añade un número: Factura-1, Factura-2… Tus archivos nunca salen de tu dispositivo.",
      options: {
        name: {
          label: "Nuevo nombre",
          placeholder: "ej.: Factura-marzo",
          help: "¿Varios archivos? Se añade un número, en el orden de la lista.",
        },
        ext: {
          label: "Nueva extensión",
          placeholder: "mantener la extensión",
          help: "Cambiar la extensión no cambia el formato del archivo. Para transformarlo, usa Convertir.",
        },
      },
      guide: {
        keywords: "renombrar archivos, renombrar varios archivos, cambiar el nombre de un archivo, renombrar pdf en línea",
        uses: [
          "Dar nombres claros a los documentos de un expediente antes de enviarlos (Factura-1, Factura-2…).",
          "Renombrar de una vez decenas de fotos o escaneos.",
          "Corregir un nombre de archivo sin abrir otro programa.",
        ],
        steps: [
          {
            title: "Deja tus archivos",
            text: "De cualquier tipo, en el orden deseado.",
          },
          {
            title: "Escribe el nuevo nombre",
            text: "Se añade un número si hay varios archivos; la vista previa muestra cada nombre nuevo.",
          },
          {
            title: "Haz clic en Renombrar",
            text: "Se descarga un archivo o un ZIP.",
          },
        ],
        faq: [
          {
            q: "¿Se envían mis archivos por internet?",
            a: "No: el cambio de nombre se hace por completo en tu navegador.",
          },
          {
            q: "¿Cambiar la extensión convierte el archivo?",
            a: "No. Para cambiar realmente de formato (por ejemplo de Word a PDF), usa la herramienta Convertir.",
          },
        ],
      },
    },
    pivoter: {
      name: "Girar",
      tagline: "Gira todas las páginas o una selección.",
      seoTitle: "Girar un PDF online gratis",
      seoDescription: "Gira todas las páginas de un PDF o solo algunas, 90°, 180° o 270°. Gratis, rápido y sin registro.",
      intro: "¿Un escaneo al revés o una página apaisada? Gira todo el documento o solo las páginas que elijas, sin perder calidad.",
      options: {
        angle: { label: "Rotación", choices: { "90": "90° en sentido horario", "180": "180°", "270": "90° en sentido antihorario" } },
        pages: { label: "Páginas", placeholder: "todas", help: "Ej.: 1-3, 5, 8-fin. Vacío = todas las páginas." },
      },
      guide: {
        keywords: "girar pdf, rotar pdf, rotar una página pdf, enderezar un pdf escaneado",
        uses: [
          "Enderezar una página escaneada al revés o de lado.",
          "Poner en horizontal las páginas de una tabla.",
          "Corregir la orientación de un documento fotografiado con el móvil.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "La vista previa muestra todas sus páginas.",
          },
          {
            title: "Elige el sentido y las páginas",
            text: "Un cuarto de vuelta o media vuelta, en todo el documento o en algunas páginas.",
          },
          {
            title: "Haz clic en Girar",
            text: "Descargas el PDF enderezado.",
          },
        ],
        faq: [
          {
            q: "¿Se puede girar una sola página?",
            a: "Sí: escribe su número en «Páginas»; las demás no se mueven.",
          },
          {
            q: "¿Girar reduce la calidad?",
            a: "No, la página solo se gira, sin volver a comprimirse.",
          },
        ],
      },
    },
    numeroter: {
      name: "Numerar páginas",
      tagline: "Escribir el número en cada página.",
      seoTitle: "Numerar las páginas de un PDF — gratis online",
      seoDescription: "Añade números de página a un PDF: posición, formato «1 / 10», primer número y tamaño a elegir. Gratis, sin registro.",
      intro: "Deja tu PDF, haz clic en el lugar de la página donde va el número, elige un estilo y haz clic en Numerar. La vista previa muestra el resultado antes de empezar.",
      options: {
        position: {
          label: "¿Dónde poner el número?",
          choices: {
            "bottom-center": "Abajo, en el centro",
            "bottom-right": "Abajo, a la derecha",
            "bottom-left": "Abajo, a la izquierda",
            "top-center": "Arriba, en el centro",
            "top-right": "Arriba, a la derecha",
            "top-left": "Arriba, a la izquierda",
          },
        },
        format: {
          label: "Estilo",
          choices: {
            nTotal: "1 / 10",
            n: "1",
            page: "Pág. 1",
            dash: "- 1 -",
          },
          templates: {
            nTotal: "{n} / {total}",
            n: "{n}",
            page: "Pág. {n}",
            dash: "- {n} -",
          },
        },
        start: {
          label: "Primer número",
          help: "Ej.: 3 para empezar a contar en 3.",
        },
        size: {
          label: "Tamaño de los números",
        },
        pages: {
          label: "Páginas a numerar",
          placeholder: "todas",
          help: "Déjalo vacío para todas las páginas. «2-final» salta la primera página.",
        },
      },
      guide: {
        keywords: "numerar páginas pdf, añadir número de página pdf, paginar un pdf",
        uses: [
          "Numerar una tesis, un informe o una solicitud.",
          "Añadir «1 / 10» para que no falte ninguna página al imprimir.",
          "Paginar documentos antes de presentarlos ante un juzgado o una administración.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "La vista previa muestra todas sus páginas.",
          },
          {
            title: "Haz clic en el lugar y el estilo",
            text: "El número aparece al instante en cada página de la vista previa.",
          },
          {
            title: "Haz clic en Numerar páginas",
            text: "Descargas el PDF numerado.",
          },
        ],
        faq: [
          {
            q: "¿Se puede no numerar la primera página?",
            a: "Sí: en «Más ajustes», escribe «2-final» en «Páginas a numerar».",
          },
          {
            q: "¿Se puede empezar en un número distinto de 1?",
            a: "Sí, en «Más ajustes», campo «Primer número».",
          },
        ],
      },
    },
    filigrane: {
      name: "Marca de agua",
      tagline: "Escribir «COPIA» o «CONFIDENCIAL» en grande en cada página.",
      seoTitle: "Añadir marca de agua a un PDF — gratis online",
      seoDescription: "Estampa un texto como marca de agua (CONFIDENCIAL, COPIA, BORRADOR…) en un PDF, con tamaño, opacidad, ángulo y color ajustables. Gratis.",
      intro: "Deja tu PDF, elige un texto (o escribe el tuyo), mira la vista previa y haz clic en Marca de agua. Útil para proteger la copia de un documento de identidad.",
      options: {
        text: {
          label: "Texto a escribir",
          default: "CONFIDENCIAL",
          suggestions: ["CONFIDENCIAL", "COPIA", "BORRADOR", "NO DIFUNDIR"],
        },
        color: {
          label: "Color",
          choices: {
            gray: "Gris",
            red: "Rojo",
            blue: "Azul",
            black: "Negro",
          },
        },
        opacity: {
          label: "Visibilidad",
          choices: {
            "12": "Discreta",
            "25": "Normal",
            "45": "Muy visible",
          },
        },
        rotation: {
          label: "Dirección del texto",
          choices: {
            "0": "En horizontal",
            "45": "En diagonal",
          },
        },
        size: {
          label: "Tamaño máximo del texto",
          help: "El texto se reduce solo si es demasiado largo para la página.",
        },
        pages: {
          label: "Páginas",
          placeholder: "todas",
          help: "Déjalo vacío para todas las páginas. Ej.: 1-3, 5, 8-final.",
        },
      },
      guide: {
        keywords: "marca de agua pdf, añadir marca de agua, sello copia pdf, marcar confidencial pdf",
        uses: [
          "Marcar la copia de tu documento de identidad «Copia solo para el alquiler» para que no se reutilice.",
          "Indicar «CONFIDENCIAL» o «BORRADOR» en un documento interno.",
          "Señalar que un documento no es la versión final.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "La vista previa muestra todas sus páginas.",
          },
          {
            title: "Elige el texto y el estilo",
            text: "Color, visibilidad y dirección: la vista previa se actualiza al momento.",
          },
          {
            title: "Haz clic en Marca de agua",
            text: "Descargas el PDF marcado.",
          },
        ],
        faq: [
          {
            q: "¿Por qué poner una marca de agua en un documento de identidad?",
            a: "Una mención como «Copia para el trámite X del 2 de octubre» impide que una copia robada se use para otra gestión.",
          },
          {
            q: "¿El texto del documento sigue siendo legible?",
            a: "Sí: elige una visibilidad «Discreta» o «Normal».",
          },
        ],
      },
    },
    compresser: {
      name: "Comprimir",
      tagline: "Hacer un PDF más ligero para enviarlo fácilmente.",
      seoTitle: "Comprimir PDF online — reducir el tamaño gratis",
      seoDescription: "Reduce el peso de un PDF para enviarlo por correo o subirlo a una web oficial. Tres niveles de compresión, gratis.",
      intro: "¿Tu archivo pesa demasiado para un correo o una web? Déjalo, mantén «Recomendado» y haz clic en Comprimir. El texto sigue nítido.",
      options: {
        level: {
          label: "¿Cuánto reducir?",
          choices: {
            lossless: "Ligero",
            recommended: "Recomendado",
            strong: "Máximo",
          },
          hints: {
            lossless: "Misma calidad, poca reducción.",
            recommended: "La mejor opción en la mayoría de los casos.",
            strong: "Lo más pequeño posible; las fotos quedan algo borrosas.",
          },
        },
      },
      guide: {
        keywords: "comprimir pdf, reducir tamaño pdf, pdf demasiado pesado, hacer un pdf más ligero, comprimir pdf para correo",
        uses: [
          "Enviar por correo un PDF demasiado pesado.",
          "Subir un documento a un portal con límite de tamaño (a menudo de 2 a 5 MB).",
          "Ahorrar espacio en tus carpetas.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "Uno o varios.",
          },
          {
            title: "Mantén «Recomendado»",
            text: "O elige Ligero o Máximo según el tamaño que necesites.",
          },
          {
            title: "Haz clic en Comprimir",
            text: "pdff muestra la reducción, por ejemplo «8 MB → 2 MB».",
          },
        ],
        faq: [
          {
            q: "¿La compresión vuelve borroso el texto?",
            a: "No: el texto sigue nítido. Solo se aligeran las imágenes, muy poco en modo Recomendado.",
          },
          {
            q: "¿Por qué mi PDF no se reduce?",
            a: "Seguramente ya estaba optimizado; pdff te lo indica.",
          },
        ],
      },
    },
    proteger: {
      name: "Proteger",
      tagline: "Cifra un PDF con una contraseña (AES-256).",
      seoTitle: "Proteger un PDF con contraseña — gratis (AES-256)",
      seoDescription: "Cifra un PDF con contraseña (AES-256) y bloquea la impresión, la copia o la edición. Gratis, sin registro.",
      intro: "Antes de enviar una nómina o un documento médico, protégelo con una contraseña segura: sin ella, nadie puede abrirlo.",
      options: {
        password: { label: "Contraseña de apertura" },
        noPrint: { label: "Prohibir la impresión" },
        noCopy: { label: "Prohibir copiar el texto" },
        noEdit: { label: "Prohibir la edición" },
      },
      guide: {
        keywords: "proteger pdf con contraseña, cifrar pdf, poner contraseña a un pdf, bloquear impresión pdf",
        uses: [
          "Enviar una nómina, un historial médico o un contrato que nadie más pueda abrir.",
          "Impedir imprimir, copiar o modificar un documento.",
          "Cumplir las normas de confidencialidad de tu organización.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "Uno o varios.",
          },
          {
            title: "Elige una contraseña",
            text: "Y, si hace falta, qué se prohíbe: imprimir, copiar, modificar.",
          },
          {
            title: "Haz clic en Proteger",
            text: "El PDF se cifra con AES-256; envía la contraseña por otro medio.",
          },
        ],
        faq: [
          {
            q: "¿Es seguro este cifrado?",
            a: "Sí: AES-256, el nivel que usan bancos y gobiernos. Sin la contraseña, el contenido es ilegible.",
          },
          {
            q: "¿pdff guarda mi contraseña?",
            a: "No, nunca se guarda. Si la olvidas, nadie podrá abrir el archivo.",
          },
        ],
      },
    },
    deverrouiller: {
      name: "Desbloquear",
      tagline: "Quita la contraseña de un PDF cuya contraseña conoces.",
      seoTitle: "Desbloquear un PDF — quitar la contraseña gratis",
      seoDescription: "Quita la contraseña de un PDF cuya contraseña conoces, para abrirlo, imprimirlo o unirlo libremente. Gratis.",
      intro: "¿Conoces la contraseña pero escribirla cada vez es un fastidio? Quítala de una vez por todas. pdff nunca se salta una contraseña que no conoces.",
      options: { password: { label: "Contraseña actual", help: "Déjalo vacío si el PDF solo tiene contraseña de permisos." } },
      guide: {
        keywords: "desbloquear pdf, quitar contraseña pdf, eliminar protección pdf",
        uses: [
          "Dejar de escribir la contraseña cada vez que abres un documento que es tuyo.",
          "Quitar una protección antes de unir o modificar un PDF.",
          "Archivar documentos sin riesgo de perder su contraseña.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "El PDF protegido.",
          },
          {
            title: "Escribe su contraseña",
            text: "La vista previa aparece en cuanto es correcta.",
          },
          {
            title: "Haz clic en Desbloquear",
            text: "Descargas el PDF sin protección.",
          },
        ],
        faq: [
          {
            q: "¿Se puede desbloquear un PDF sin la contraseña?",
            a: "No. pdff solo quita la protección de documentos cuya contraseña conoces.",
          },
          {
            q: "¿También se quitan las restricciones de impresión?",
            a: "Sí, el PDF obtenido ya no tiene ninguna restricción.",
          },
        ],
      },
    },
    metadonnees: {
      name: "Metadatos",
      tagline: "Edita el título, el autor, el asunto y las palabras clave.",
      seoTitle: "Editar los metadatos de un PDF (título, autor) — gratis",
      seoDescription: "Cambia el título, el autor, el asunto y las palabras clave de un PDF, o bórralos todos. Gratis, online, sin registro.",
      intro: "¿El título de la pestaña del navegador o el nombre del autor delatan una plantilla antigua? Corrige las propiedades del documento o bórralas antes de compartirlo.",
      options: {
        title: { label: "Título" },
        author: { label: "Autor" },
        subject: { label: "Asunto" },
        keywords: { label: "Palabras clave (separadas por comas)" },
        clear: { label: "Borrar todos los metadatos existentes" },
      },
      guide: {
        keywords: "editar metadatos pdf, cambiar título pdf, autor pdf, propiedades pdf, borrar metadatos pdf",
        uses: [
          "Dar un título real a un PDF (el que aparece en la pestaña del navegador).",
          "Borrar el nombre del autor o del programa antes de publicar un documento.",
          "Añadir palabras clave para encontrar fácilmente tus documentos.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "Uno o varios.",
          },
          {
            title: "Rellena los campos",
            text: "Título, autor, asunto, palabras clave, o marca la opción para borrarlos todos.",
          },
          {
            title: "Haz clic en Metadatos",
            text: "Descargas el PDF actualizado.",
          },
        ],
        faq: [
          {
            q: "¿Qué son los metadatos de un PDF?",
            a: "Información oculta en el archivo: título, autor, programa usado, fechas. Puede revelar quién creó el documento.",
          },
          {
            q: "¿Cambia el contenido de las páginas?",
            a: "No, solo se modifica esa información.",
          },
        ],
      },
    },
    signer: {
      name: "Firmar",
      tagline: "Poner tu firma en un PDF.",
      seoTitle: "Firmar un PDF en línea gratis, sin registro",
      seoDescription: "Dibuja, escribe o importa tu firma y colócala en tu PDF, con la fecha si hace falta. Gratis, sin registro, archivos eliminados al momento.",
      intro: "Dibuja tu firma con el ratón o el dedo (o escribe tu nombre), elige la página y el lugar, y haz clic en Firmar. Es una firma visual, como una firma manuscrita escaneada.",
      options: {
        signature: {
          label: "Tu firma",
        },
        where: {
          label: "¿En qué página?",
          choices: {
            last: "Última página",
            first: "Primera página",
            all: "Todas las páginas",
            custom: "Yo elijo",
          },
        },
        pages: {
          label: "Páginas",
          placeholder: "ej.: 2, 5",
          help: "Ej.: 1-3, 5, 8-final.",
        },
        position: {
          label: "¿Dónde firmar?",
          choices: {
            "bottom-center": "Abajo, en el centro",
            "bottom-right": "Abajo, a la derecha",
            "bottom-left": "Abajo, a la izquierda",
            "top-center": "Arriba, en el centro",
            "top-right": "Arriba, a la derecha",
            "top-left": "Arriba, a la izquierda",
          },
        },
        size: {
          label: "Tamaño",
          choices: {
            small: "Pequeña",
            medium: "Mediana",
            large: "Grande",
          },
        },
        date: {
          label: "Añadir la fecha de hoy debajo de la firma",
        },
      },
      guide: {
        keywords: "firmar pdf, firma pdf en línea, añadir firma a un pdf, firmar un documento gratis, firma manuscrita pdf",
        uses: [
          "Firmar un contrato de alquiler, de trabajo o una autorización sin imprimir ni escanear.",
          "Añadir tu rúbrica en cada página de un contrato.",
          "Firmar desde el móvil, con el dedo.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "El documento que hay que firmar.",
          },
          {
            title: "Crea tu firma",
            text: "Dibújala, escribe tu nombre o importa una imagen.",
          },
          {
            title: "Elige la página y el lugar",
            text: "Revisa la vista previa y haz clic en Firmar.",
          },
        ],
        faq: [
          {
            q: "¿Tiene validez legal esta firma?",
            a: "Es una firma electrónica simple, como una firma manuscrita escaneada: basta para la mayoría de los trámites habituales. Algunos actos exigen una firma electrónica cualificada, con certificado.",
          },
          {
            q: "¿Se guarda mi firma?",
            a: "No: solo sirve para tu documento y se elimina con él.",
          },
        ],
      },
    },
    caviarder: {
      name: "Tachar",
      tagline: "Borrar para siempre información sensible de un PDF.",
      seoTitle: "Tachar un PDF: ocultar información de forma definitiva",
      seoDescription: "Elimina de verdad nombres, direcciones, números y zonas de un PDF: el contenido oculto se borra del archivo, no solo se tapa. Gratis, sin registro.",
      intro: "Escribe las palabras que deben desaparecer, marca la información a detectar (correos, teléfonos…) o dibuja rectángulos en las páginas. pdff borra de verdad el contenido oculto: no se puede recuperar copiando el texto ni quitando el recuadro negro.",
      options: {
        terms: {
          label: "Palabras a eliminar",
          placeholder: "ej.: García, Calle Mayor 12",
          help: "Sepáralas con comas. Se eliminan todas las apariciones, con o sin mayúsculas.",
        },
        patterns: {
          label: "Detectar automáticamente",
          choices: {
            email: "Correos electrónicos",
            phone: "Números de teléfono",
            iban: "IBAN y números de cuenta",
            date: "Fechas",
            number: "Números (6 cifras o más)",
          },
        },
        areas: {
          label: "Zonas a ocultar",
        },
      },
      guide: {
        keywords: "tachar pdf, anonimizar pdf, ocultar texto pdf, borrar datos sensibles pdf, censurar pdf",
        uses: [
          "Anonimizar un documento antes de publicarlo o compartirlo (nombres, direcciones, números).",
          "Responder a una solicitud de acceso a la información quitando los datos protegidos.",
          "Compartir un extracto bancario ocultando los números de cuenta.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "La vista previa muestra todas sus páginas.",
          },
          {
            title: "Indica qué ocultar",
            text: "Escribe palabras, marca tipos de información o dibuja zonas en las páginas.",
          },
          {
            title: "Haz clic en Tachar",
            text: "El contenido oculto se borra del archivo, no solo se tapa.",
          },
        ],
        faq: [
          {
            q: "¿Por qué no dibujar simplemente un rectángulo negro?",
            a: "Un rectángulo encima deja el texto en el archivo: se puede copiar o quitar el rectángulo. pdff borra de verdad el texto y las imágenes bajo la zona.",
          },
          {
            q: "¿Importan las mayúsculas?",
            a: "No: «García» también borra «GARCÍA» y «garcía».",
          },
        ],
      },
    },
    ocr: {
      name: "Leer un escaneo",
      tagline: "Hacer que el texto de un documento escaneado o fotografiado se pueda buscar y copiar.",
      seoTitle: "OCR en línea gratis: PDF escaneado con texto buscable",
      seoDescription: "Lee el texto de un PDF escaneado o de una foto (OCR) para buscarlo, copiarlo o escucharlo en voz alta. 16 idiomas, gratis, sin enviar el documento.",
      intro: "Un documento escaneado o fotografiado es solo una imagen: no se puede buscar una palabra ni copiar una frase. Leer un escaneo reconoce cada letra (esto se llama OCR) y añade el texto real al documento sin cambiar su aspecto. La lectura se hace en tu dispositivo: tu documento no se envía. Solo se descarga una vez el modelo del idioma elegido (unos pocos MB).",
      options: {
        lang: {
          label: "Idioma del documento",
        },
        format: {
          label: "Resultado",
          choices: {
            pdf: "PDF con búsqueda",
            txt: "Texto (.txt)",
          },
          hints: {
            pdf: "El mismo documento, con texto que se puede buscar y copiar.",
            txt: "Solo el texto, para reutilizarlo.",
          },
        },
      },
      guide: {
        keywords: "ocr en línea, ocr gratis, pdf escaneado a texto, hacer un pdf buscable, reconocimiento de texto, imagen a texto",
        uses: [
          "Encontrar una palabra en un contrato escaneado largo con Ctrl + F.",
          "Copiar el texto de una factura o una carta fotografiada.",
          "Hacer accesibles a las personas ciegas archivos en papel digitalizados.",
        ],
        steps: [
          {
            title: "Deja tu escaneo",
            text: "Un PDF escaneado o una foto de un documento.",
          },
          {
            title: "Elige el idioma",
            text: "El del texto del documento.",
          },
          {
            title: "Haz clic en Leer un escaneo",
            text: "Obtienes un PDF en el que se puede buscar y copiar el texto, o un archivo de texto.",
          },
        ],
        faq: [
          {
            q: "¿Qué significa OCR?",
            a: "Reconocimiento óptico de caracteres: el ordenador reconoce las letras de una imagen para convertirlas en texto real.",
          },
          {
            q: "¿Se envía mi documento?",
            a: "No: la lectura se hace por completo en tu dispositivo. Solo se descarga una vez el modelo de idioma.",
          },
        ],
      },
    },
    remplir: {
      name: "Rellenar un formulario",
      tagline: "Completar un formulario PDF directamente en el navegador.",
      seoTitle: "Rellenar un formulario PDF en línea gratis",
      seoDescription: "Completa los campos de un formulario PDF (texto, casillas, listas) sin programas y descárgalo relleno, bloqueado si quieres. Gratis, sin registro.",
      intro: "Deja un formulario PDF: pdff encuentra todos los campos y te los muestra como un formulario sencillo. Rellénalo, revisa la vista previa y haz clic en Rellenar un formulario para descargar el PDF completado.",
      options: {
        values: {
          label: "Respuestas",
        },
        lock: {
          label: "Bloquear las respuestas (el formulario ya no se podrá modificar)",
        },
      },
      guide: {
        keywords: "rellenar pdf, rellenar formulario pdf en línea, completar un formulario pdf, escribir en un pdf",
        uses: [
          "Completar un formulario administrativo (solicitud, inscripción, declaración) sin imprimirlo.",
          "Rellenar un formulario desde el móvil.",
          "Bloquear tus respuestas antes de enviar el documento.",
        ],
        steps: [
          {
            title: "Deja el formulario",
            text: "pdff encuentra todos los campos que hay que rellenar.",
          },
          {
            title: "Rellena los campos",
            text: "La vista previa muestra tus respuestas en su sitio en la página.",
          },
          {
            title: "Haz clic en Rellenar un formulario",
            text: "Descargas el PDF completado.",
          },
        ],
        faq: [
          {
            q: "¿Por qué pdff no encuentra ningún campo?",
            a: "El PDF no es un formulario interactivo (suele ser un escaneo). Habrá que imprimirlo o pedir una versión interactiva al organismo.",
          },
          {
            q: "¿Qué hace «Bloquear las respuestas»?",
            a: "Las respuestas pasan a formar parte de la página y ya no se pueden modificar.",
          },
        ],
      },
    },
    comparer: {
      name: "Comparar",
      tagline: "Ver qué cambió entre dos versiones de un PDF.",
      seoTitle: "Comparar dos PDF en línea: ver las diferencias",
      seoDescription: "Compara dos versiones de un contrato o documento PDF: palabras añadidas en verde, eliminadas en rojo e informe descargable. Gratis, no se envía nada.",
      intro: "Deja la versión antigua y luego la nueva: las diferencias aparecen al instante, palabra por palabra. Haz clic en Comparar para descargar el informe. Todo ocurre en tu navegador.",
      options: {
        ignoreCase: {
          label: "Ignorar mayúsculas y minúsculas",
        },
      },
      guide: {
        keywords: "comparar dos pdf, diferencias entre dos pdf, comparar dos versiones de un documento, comparar contratos",
        uses: [
          "Comprobar qué cambió en un contrato o un alquiler antes de firmarlo.",
          "Revisar las correcciones hechas a un informe o una tesis.",
          "Comparar dos versiones de un reglamento o un texto oficial.",
        ],
        steps: [
          {
            title: "Deja la versión antigua",
            text: "Y luego la nueva, en ese orden.",
          },
          {
            title: "Lee las diferencias",
            text: "En verde lo añadido, en rojo tachado lo eliminado.",
          },
          {
            title: "Haz clic en Comparar",
            text: "Descargas un informe para guardar o imprimir.",
          },
        ],
        faq: [
          {
            q: "¿Se envían mis documentos?",
            a: "No: la comparación se hace por completo en tu navegador.",
          },
          {
            q: "¿Se pueden comparar documentos escaneados?",
            a: "Sí, después de pasarlos por la herramienta Leer un escaneo, que extrae su texto.",
          },
        ],
      },
    },
    images: {
      name: "Extraer imágenes",
      tagline: "Sacar las fotos e ilustraciones de un PDF.",
      seoTitle: "Extraer imágenes de un PDF en línea gratis",
      seoDescription: "Saca todas las fotos, ilustraciones y logotipos de un PDF en PNG o JPG, sin duplicados. Gratis, sin registro, archivos eliminados al momento.",
      intro: "Deja un PDF: pdff encuentra todas las imágenes que contiene y te las da una a una, en PNG o JPG, en un archivo ZIP. Se descartan las imágenes decorativas pequeñas y los duplicados.",
      options: {
        format: {
          label: "Formato de las imágenes",
          choices: {
            png: "PNG",
            jpg: "JPG",
          },
          hints: {
            png: "Calidad perfecta, conserva la transparencia.",
            jpg: "Archivos más ligeros, ideal para fotos.",
          },
        },
        small: {
          label: "Conservar también las imágenes pequeñas (iconos, viñetas)",
        },
      },
      guide: {
        keywords: "extraer imágenes de pdf, sacar fotos de un pdf, guardar imágenes de un pdf",
        uses: [
          "Sacar las fotos de un catálogo, informe o folleto en PDF.",
          "Reutilizar un logotipo o un gráfico en una presentación.",
          "Guardar las imágenes de un documento antes de borrarlo.",
        ],
        steps: [
          {
            title: "Deja tu PDF",
            text: "Uno o varios.",
          },
          {
            title: "Elige PNG o JPG",
            text: "PNG para una calidad perfecta, JPG para archivos más ligeros.",
          },
          {
            title: "Haz clic en Extraer imágenes",
            text: "Recibes todas las imágenes en un archivo ZIP.",
          },
        ],
        faq: [
          {
            q: "¿Qué diferencia hay con convertir un PDF a JPG?",
            a: "La conversión transforma cada página entera en una imagen. Extraer imágenes solo saca las fotos e ilustraciones de las páginas, en su tamaño original.",
          },
          {
            q: "¿Por qué faltan algunas imágenes?",
            a: "Las imágenes pequeñas (iconos, viñetas) se omiten por defecto: marca «Conservar también las imágenes pequeñas». El texto y los dibujos vectoriales no son imágenes.",
          },
        ],
      },
    },
    redimensionner: {
      name: "Redimensionar / recortar",
      tagline: "Cambiar el tamaño de una imagen o recortarla.",
      seoTitle: "Redimensionar y recortar imágenes en línea gratis",
      seoDescription: "Reduce una foto (en % o en píxeles) o recórtala en cuadrado, 16:9 o 4:3, y guárdala en JPG, PNG o WebP. Gratis, sin registro.",
      intro: "Deja tus imágenes, elige reducirlas o recortarlas, revisa la vista previa y haz clic en Redimensionar / recortar. Útil para una foto de perfil, un adjunto demasiado pesado o un formulario que exige un tamaño.",
      options: {
        mode: {
          label: "¿Qué hacer?",
          choices: {
            resize: "Redimensionar",
            crop: "Recortar",
          },
          hints: {
            resize: "Conservar toda la imagen, más pequeña.",
            crop: "Cortar los bordes para obtener un formato exacto.",
          },
        },
        scale: {
          label: "Nuevo tamaño",
          choices: {
            "25": "25 % (cuarto)",
            "50": "50 % (mitad)",
            "75": "75 %",
            custom: "Tamaño exacto en píxeles",
          },
        },
        width: {
          label: "Ancho (píxeles)",
        },
        height: {
          label: "Alto (píxeles)",
          help: "0 = calculado para mantener las proporciones.",
        },
        ratio: {
          label: "Formato",
          choices: {
            "1:1": "Cuadrado (1:1)",
            "4:3": "Horizontal (4:3)",
            "3:4": "Vertical (3:4)",
            "16:9": "Panorámico (16:9)",
            "9:16": "Vertical (9:16)",
            "3:2": "Foto (3:2)",
          },
        },
        format: {
          label: "Formato del archivo",
          choices: {
            same: "Mantener el formato",
            jpg: "JPG",
            png: "PNG",
            webp: "WebP",
          },
        },
      },
      guide: {
        keywords: "redimensionar imagen, reducir tamaño de foto, recortar imagen en línea, achicar imagen, imagen cuadrada",
        uses: [
          "Reducir una foto demasiado pesada para un correo o un formulario en línea.",
          "Recortar una foto en cuadrado para un perfil.",
          "Preparar imágenes 16:9 para una presentación o una web.",
        ],
        steps: [
          {
            title: "Deja tus imágenes",
            text: "JPG, PNG, WebP…",
          },
          {
            title: "Elige el tamaño o el formato",
            text: "La vista previa muestra la zona conservada y el nuevo tamaño.",
          },
          {
            title: "Haz clic en Redimensionar / recortar",
            text: "Descargas las imágenes modificadas.",
          },
        ],
        faq: [
          {
            q: "¿La foto pierde calidad?",
            a: "Una imagen reducida tiene menos píxeles, pero se ve nítida en su nuevo tamaño.",
          },
          {
            q: "¿Dónde se hace el recorte?",
            a: "En el centro de la imagen: los bordes se recortan por igual para obtener el formato elegido, como muestra la vista previa.",
          },
        ],
      },
    },
  },
  errors: {
    unknownTool: "Herramienta desconocida.",
    tooLarge: "Envío demasiado grande (máx. {mb} MB).",
    badRequest: "Solicitud no válida.",
    noFiles: "Añade al menos un archivo.",
    tooManyFiles: "Demasiados archivos: {max} como máximo para esta herramienta.",
    badOptions: "Opciones no válidas.",
    noOutput: "No se ha generado ningún archivo.",
    unexpected: "Se produjo un error inesperado durante el proceso.",
    inFile: "{file}: {message}",
    pageLimitDocument: "El documento tiene {count} páginas, más que el límite de {max} páginas.",
    pageLimitResult: "El resultado tendría {count} páginas, más que el límite de {max} páginas.",
    pageLimit: "Se ha superado el límite de {max} páginas.",
    unreadable: "No se puede leer «{name}»: archivo dañado o formato no reconocido.",
    damagedPdf: "No se puede leer «{name}»: PDF dañado.",
    wrongPassword: "Contraseña incorrecta para «{name}».",
    passwordProtected: "«{name}» está protegido con contraseña. Usa primero la herramienta «Desbloquear».",
    notPdf: "«{name}» no es un PDF.",
    notPdfConvertFirst: "«{name}» no es un PDF. Conviértelo primero.",
    passwordComma: "La contraseña no puede contener comas.",
    imageFormat: "Formato de imagen no compatible: {format}",
    imageConvert: "No se puede convertir «{name}»: imagen ilegible o dañada.",
    imageUnreadable: "«{name}» no es una imagen legible.",
    officeMissing: "Esta conversión necesita LibreOffice (Word, Excel, PowerPoint…). Instálalo y reinicia pdff.",
    officeTarget: "La conversión a {target} no es compatible.",
    officeTimeout: "La conversión tardó demasiado y se detuvo.",
    officeFailed: "LibreOffice no pudo convertir «{name}» a {target}.",
    officeTooLarge: "«{name}» supera los {mb} MB: demasiado grande para una conversión de Word, Excel o PowerPoint.",
    conversionImpossible: "La conversión {from} → {to} no es posible.",
    conversionImpossibleOffice: "La conversión {from} → {to} no es posible (instalar LibreOffice añade los formatos Word, Excel y PowerPoint).",
    watermarkText: "Escribe el texto de la marca de agua.",
    emptyResult: "El documento resultante no tendría ninguna página.",
    chooseTarget: "Elige el formato de salida.",
    passwordOrRestriction: "Indica una contraseña o al menos una restricción.",
    pageInvalid: "«{token}» no es un número de página válido.",
    pageMissing: "La página {n} no existe (el documento tiene {total} páginas).",
    rangeInvalid: "Rango no válido: «{part}».",
    rangeRequired: "Indica al menos un rango de páginas.",
    signatureMissing: "Crea primero tu firma: dibújala, escribe tu nombre o importa una imagen.",
    redactNothing: "Indica palabras, marca un tipo de información o dibuja una zona a ocultar.",
    redactNone: "Nada que tachar: no se encontró ninguna de las palabras o datos indicados en el documento.",
    formNoFields: "«{name}» no tiene campos de formulario para rellenar.",
    formLockUnicode: "Algunas respuestas contienen caracteres que no se pueden fijar en la página. Desmarca «Bloquear las respuestas» para mantenerlas editables.",
    noImages: "No se encontró ninguna imagen en este PDF. El texto y los dibujos vectoriales no son imágenes.",
    notImage: "«{name}» no es una imagen (JPG, PNG, WebP…).",
  },
};

export default es;
