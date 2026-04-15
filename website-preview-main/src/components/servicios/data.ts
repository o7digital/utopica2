/**
 * Datos centralizados de las 5 capacidades (servicios) de Utópica.
 * Cada servicio es una "capacidad comercial instalada" — no un producto cerrado.
 * Basado en propuestas reales: Global Quark, Multiplica, Blackwell.
 */

export interface ServicioDeliverable {
  label: string;
  desc: string;
}

export interface ServicioPhase {
  name: string;
  weeks: string;
  desc: string;
}

export interface Servicio {
  slug: string;
  id: string; // S.01, S.02...
  title: string;
  titleEm: string; // parte en cursiva
  shortTitle: string;
  tagline: string;
  description: string;
  duration: string;
  forWho: string;
  signalProblem: string[]; // 3-4 frases que el cliente diría
  whatWeInstall: ServicioDeliverable[];
  phases: ServicioPhase[];
  outcome: string;
  legacyName?: string; // nombre anterior del producto (si aplica)
  tags: string[];
}

export const servicios: Servicio[] = [
  {
    slug: 'prospeccion',
    id: 'S.01',
    title: 'Prospección',
    titleEm: 'sin depender del fundador',
    shortTitle: 'Prospección',
    tagline: 'Reuniones con tu cliente ideal que no dependen de quien es el más carismático del equipo.',
    description:
      'El 100% de tu pipeline viene de referidos o de una sola persona. Cuando esa persona no está, las reuniones no llegan. Instalamos el sistema de generación de oportunidades — con IA que amplifica, SDR certificado y playbook outbound — para que el pipeline se sostenga aunque el fundador esté de vacaciones.',
    duration: '14 semanas',
    forWho: 'Consultoras con ticket mediano-alto, ciclo de venta 2-6 meses, dependencia alta del fundador para generar reuniones.',
    signalProblem: [
      'Cero leads programados para el próximo mes.',
      'El cliente importante canceló cuando supo que el fundador no estaría.',
      '100% del pipeline es referidos — no hay outbound sistemático.',
      'Contratar un SDR no ha funcionado: rotan, no producen, no replican lo que el fundador hace intuitivamente.',
    ],
    whatWeInstall: [
      {
        label: 'Playbook outbound multicanal',
        desc: 'Secuencias de LinkedIn + email + WhatsApp con copy calibrado a tu ICP, verticales prioritarias y personas-objetivo. Documentado, no en la cabeza.',
      },
      {
        label: 'Skills de Claude para prospección',
        desc: 'Agentes de IA que preparan la lista, escriben mensajes personalizados, hacen seguimiento y registran en CRM — amplificando a un SDR, no reemplazándolo.',
      },
      {
        label: 'SDR certificado',
        desc: 'Certificación con juegos de rol + métricas reales de campaña. No es capacitación de 2 días: es validación de que la persona ejecuta el sistema.',
      },
      {
        label: 'Campaña inicial de leads',
        desc: '25-50 reuniones reales con decisores en las primeras 8-10 semanas mientras entrenamos al equipo. Aprender haciendo, no aprender primero.',
      },
    ],
    phases: [
      {
        name: 'Campaña de leads + arranque',
        weeks: 'Semanas 1-8',
        desc: 'Ejecutamos una campaña real de prospección mientras el SDR observa, practica y gana contexto. Tú ves reuniones llegando desde el día 15.',
      },
      {
        name: 'Institucionalización',
        weeks: 'Semanas 9-14',
        desc: 'El SDR toma el sistema. Diagnóstico, capacitación, certificación técnica y certificación con métricas reales. Al final, opera autónomo.',
      },
      {
        name: 'Acompañamiento',
        weeks: 'Post-programa',
        desc: 'Revisiones mensuales de pipeline. Skills de Claude refinadas según feedback. Sistema que mejora solo.',
      },
    ],
    outcome:
      '8-10 reuniones mensuales con decisores, sin depender del fundador. Pipeline que se sostiene aunque el equipo comercial estrella esté de vacaciones.',
    legacyName: 'Reuniones Bajo Demanda',
    tags: ['Outbound B2B', 'Skills IA', 'Certificación SDR', 'Multicanal'],
  },
  {
    slug: 'calificacion',
    id: 'S.02',
    title: 'Calificación',
    titleEm: 'que decide antes de gastar preventa',
    shortTitle: 'Calificación de oportunidades',
    tagline: 'Saber qué oportunidad vale propuesta — y cuál descalificar temprano.',
    description:
      'Preventa saturada, propuestas genéricas, 30% de deals perdidos por ghosting. La causa raíz casi siempre es la misma: no calificamos bien. Instalamos un sistema de 10 criterios, un dashboard de salud del pipeline y un coaching IA que califica por ti después de cada reunión.',
    duration: '12 semanas',
    forWho: 'Empresas con volumen alto de propuestas, ciclo largo, preventa saturada, precio premium que se pierde contra competidores.',
    signalProblem: [
      'Propuestas técnicamente perfectas que se pierden sin respuesta.',
      'Esperaban 300k, nuestra propuesta fue 4M — cerraron la puerta sin negociación.',
      'Preventa trabaja todo con la misma prioridad. Nada sale rápido, todo sale profundo.',
      'El forecast es "lo que el director cree". Nunca coincide con lo que cierra.',
    ],
    whatWeInstall: [
      {
        label: '10 criterios de calificación',
        desc: 'Framework objetivo: estado actual, impacto, causa raíz, estado deseado, gap, urgencia, criterios de decisión, presupuesto, decisor, competencia. No intuición.',
      },
      {
        label: 'Skill de Claude para calificar oportunidades',
        desc: 'Cada deal entra al sistema, recibe score 0-100 automático, señala información faltante y recomienda próximos pasos concretos.',
      },
      {
        label: 'Dashboard de salud del pipeline',
        desc: 'Vista consolidada con probabilidad ponderada por deal. Forecast 85% de precisión desde el mes 3.',
      },
      {
        label: 'Coaching IA post-reunión',
        desc: 'El vendedor sube transcripción, el sistema devuelve estado de calificación + áreas de mejora personales. Sigue funcionando después del programa.',
      },
    ],
    phases: [
      {
        name: 'Diagnóstico',
        weeks: 'Semanas 1-2',
        desc: 'Evaluación del nivel actual de cada vendedor con transcripciones reales. Baseline medible antes de intervenir.',
      },
      {
        name: 'Capacitación',
        weeks: 'Semanas 3-6',
        desc: 'Criterios + juegos de rol + evaluación de discoveries reales. Feedback individual por vendedor.',
      },
      {
        name: 'Certificación',
        weeks: 'Semanas 7-10',
        desc: 'Doble validación: role-play aprobado + reuniones reales con score. Sin certificación fingida.',
      },
      {
        name: 'Coaching IA permanente',
        weeks: 'Semana 11 en adelante',
        desc: 'Sistema configurado. Feedback automático después de cada reunión de prospección. No requiere intervención adicional.',
      },
    ],
    outcome:
      'Forecast 85% de precisión. 100% de oportunidades activas con score objetivo. Menos propuestas, mejor trabajadas, más cierres.',
    tags: ['Discovery', 'Forecasting', 'Skills IA', 'Pipeline Health'],
  },
  {
    slug: 'venta-consultiva',
    id: 'S.03',
    title: 'Venta consultiva',
    titleEm: 'que no depende de la estrella',
    shortTitle: 'Venta consultiva',
    tagline: 'Tu equipo cierra como tu mejor cerrador — con business case propio, sin descontar.',
    description:
      'Tasa de cierre de 90% cuando tú estás. 20% cuando no. El problema no es capacitación — es que lo que sabes hacer no está documentado ni certificado. Instalamos playbooks por producto, entrenamos el cierre consultivo y certificamos al equipo con reuniones reales.',
    duration: '12 semanas',
    forWho: 'Equipos comerciales de 2-10 personas donde el fundador cierra la mayoría. Tickets arriba de $500k MXN, decisiones multi-stakeholder, precio premium.',
    signalProblem: [
      'Cuando el fundador entra a un deal, cierra. Cuando no entra, se pierde.',
      'El vendedor presenta la empresa los primeros 45 minutos. No escucha al cliente.',
      'Bajamos precio cada vez que alguien objeta — no sabemos defender valor.',
      'El equipo sabe pitchear, no sabe diagnosticar.',
    ],
    whatWeInstall: [
      {
        label: 'Playbooks por producto',
        desc: 'Business case por cada oferta — con fórmulas de ROI, calculadoras y bibliografía de casos análogos. Documentado, replicable.',
      },
      {
        label: 'Metodología de discovery de negocio',
        desc: 'No pregunta técnica — pregunta de impacto. Extraer el problema cuantificado del cliente antes de hablar de solución.',
      },
      {
        label: 'Manejo estructurado de objeciones',
        desc: 'Tres opciones (Blair Enns), justificación de precio premium con datos del propio cliente, respuestas a "está caro" documentadas.',
      },
      {
        label: 'Certificación con reuniones reales',
        desc: 'El vendedor graba 5 reuniones con clientes reales. El sistema evalúa. No se certifica por asistir — se certifica por demostrar.',
      },
    ],
    phases: [
      {
        name: 'Diagnóstico de cierre',
        weeks: 'Semanas 1-2',
        desc: 'Análisis de deals ganados y perdidos de los últimos 12 meses. Identificamos los 3 patrones de pérdida más caros.',
      },
      {
        name: 'Construcción de playbooks',
        weeks: 'Semanas 3-6',
        desc: 'Business case por producto. Calculadoras de ROI. Scripts de descubrimiento. Todo testeado en reuniones reales.',
      },
      {
        name: 'Certificación del equipo',
        weeks: 'Semanas 7-12',
        desc: 'Juegos de rol + reuniones reales. Feedback específico por vendedor hasta que cada uno alcanza el estándar de cierre del fundador.',
      },
    ],
    outcome:
      'Tasa de cierre +15pp (de 20% a 35% en frío). Ticket promedio +20% por business case. El fundador deja de ser el único que cierra.',
    legacyName: 'Sprint de Claridad Comercial',
    tags: ['Cierre', 'Business Case', 'Discovery', 'Certificación'],
  },
  {
    slug: 'coaching-ia',
    id: 'S.04',
    title: 'Coaching IA',
    titleEm: 'que no desaparece cuando termina el programa',
    shortTitle: 'Coaching IA permanente',
    tagline: 'Feedback automático después de cada reunión. El cambio de comportamiento que otras capacitaciones prometen y nunca sostienen.',
    description:
      '80% de las capacitaciones comerciales se pierden en 90 días. Sin refuerzo, el equipo vuelve a hábitos viejos. Instalamos un sistema de coaching con IA que evalúa cada reunión de prospección, da feedback específico por vendedor y mantiene el cambio activo — aunque tú no estés mirando.',
    duration: '4 semanas de instalación + permanente post',
    forWho: 'Equipos que ya pasaron por Prospección o Calificación, o que tienen una metodología definida pero el equipo no la mantiene.',
    signalProblem: [
      'Capacitamos al equipo hace 6 meses — hoy hacen lo mismo de antes.',
      'El director comercial no tiene tiempo de escuchar 50 reuniones al mes.',
      'Los vendedores no saben en qué mejorar específicamente.',
      'La mejora no es medible — es "sentimiento".',
    ],
    whatWeInstall: [
      {
        label: 'Pipeline de transcripciones',
        desc: 'Integración con tu stack actual (Granola, Fathom, Gong, Fireflies, Zoom). Cada reunión fluye al sistema automáticamente.',
      },
      {
        label: 'Skill de Claude calibrada',
        desc: 'Evaluación diseñada para tu metodología específica — no un coach genérico. Lo que tu mejor cerrador hace, codificado.',
      },
      {
        label: 'Reporte individual post-reunión',
        desc: 'Cada vendedor recibe feedback 30 minutos después: qué hizo bien, qué mejorar, cómo preparar la siguiente reunión. Específico, no cliché.',
      },
      {
        label: 'Dashboard de progreso por persona',
        desc: 'El director ve quién mejora, en qué área, en qué velocidad. Conversaciones de coaching se vuelven basadas en datos, no impresiones.',
      },
    ],
    phases: [
      {
        name: 'Calibración de la skill',
        weeks: 'Semanas 1-2',
        desc: 'Extraemos lo que tu mejor cerrador hace bien. Entrenamos la IA con ejemplos tuyos, no con genéricos de internet.',
      },
      {
        name: 'Integración + onboarding',
        weeks: 'Semanas 3-4',
        desc: 'Conectamos transcripciones, configuramos dashboard, entrenamos al equipo en cómo leer el feedback. El sistema arranca.',
      },
      {
        name: 'Operación continua',
        weeks: 'Permanente',
        desc: 'Sistema funciona solo. Revisamos trimestralmente la precisión del feedback y refinamos la skill si cambia tu metodología.',
      },
    ],
    outcome:
      'Cambio de comportamiento sostenido — medible por vendedor, trimestre a trimestre. El sistema sigue mejorando al equipo cuando termina el programa.',
    tags: ['IA aplicada', 'Feedback automático', 'Retención de aprendizaje', 'Measurable'],
  },
  {
    slug: 'proyectos-ia',
    id: 'S.05',
    title: 'Proyectos IA',
    titleEm: 'para procesos que no son ventas',
    shortTitle: 'Proyectos IA (custom)',
    tagline: 'Agentes y skills personalizadas para cualquier proceso repetitivo — comerciales o no.',
    description:
      'Tu equipo sabe que la IA puede ayudar, pero "implementar IA" es vago. Diseñamos e instalamos un agente o skill específico para un proceso concreto: manejo de crisis, despliegue generativo, onboarding, research, operaciones. Con transferencia total al equipo.',
    duration: 'Variable (6-16 semanas según alcance)',
    forWho: 'Empresas con procesos repetitivos de alto valor donde la IA tradicional no funciona por contexto específico. Exploradores de IA que no quieren "comprar SaaS" sino "instalar capacidad".',
    signalProblem: [
      'Sabemos que la IA aplicaría aquí, pero no sabemos cómo empezar.',
      'Compramos ChatGPT Enterprise y nadie lo usa bien.',
      'Tenemos un proceso que drena 20 horas-semana y sentimos que podría automatizarse.',
      'Queremos que el equipo se apropie — no depender del proveedor para siempre.',
    ],
    whatWeInstall: [
      {
        label: 'Diagnóstico y scoping',
        desc: 'Antes de construir nada: entendemos el proceso a profundidad, medimos el costo actual, estimamos el ROI y definimos el MVP mínimo viable.',
      },
      {
        label: 'Agentes y skills custom',
        desc: 'Construidos para tu caso — no configurados a partir de plantillas. Código, prompts, integraciones que se adaptan a tu stack.',
      },
      {
        label: 'Entrenamiento del equipo',
        desc: 'Workshops hands-on donde tu equipo aprende a operar, modificar y extender el sistema. No una caja negra.',
      },
      {
        label: 'Transferencia total',
        desc: 'Documentación, propiedad del código, autonomía para ajustar sin depender de Utópica. Podemos seguir como sparring, pero no eres rehén.',
      },
    ],
    phases: [
      {
        name: 'Exploración + scoping',
        weeks: 'Semanas 1-3',
        desc: 'Mapeo de procesos candidatos, business case, elección del MVP, alineación de stakeholders. Salimos con un scope firmado o con la decisión clara de no avanzar.',
      },
      {
        name: 'Construcción',
        weeks: 'Semanas 4-10',
        desc: 'Desarrollo iterativo con revisiones semanales. El sistema funciona antes de ser perfecto. El cliente prueba y ajusta con nosotros.',
      },
      {
        name: 'Despliegue + capacitación',
        weeks: 'Semanas 10-16',
        desc: 'Rollout por equipos, workshops de operación, documentación, transferencia. Salimos cuando el equipo opera sin nosotros.',
      },
    ],
    outcome:
      'Proceso específico amplificado por IA, propiedad del cliente, equipo capaz de operarlo y extenderlo. Sin dependencia crónica del proveedor.',
    tags: ['Custom AI', 'Transferencia total', 'Agentes especializados', 'No-comercial OK'],
  },
];

export function getServicioBySlug(slug: string): Servicio | undefined {
  return servicios.find((s) => s.slug === slug);
}

export function getServicioNav(slug: string): { prev?: Servicio; next?: Servicio } {
  const idx = servicios.findIndex((s) => s.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? servicios[idx - 1] : undefined,
    next: idx < servicios.length - 1 ? servicios[idx + 1] : undefined,
  };
}
