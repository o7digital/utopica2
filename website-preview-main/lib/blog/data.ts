/**
 * Blog Data Layer - Sistema centralizado para gestión de contenido del blog
 * 
 * Este módulo centraliza toda la gestión de datos del blog, incluyendo:
 * - Tipos de datos
 * - Cache de contenido
 * - Funciones de obtención de datos
 * - Generación de parámetros estáticos
 */

import { cache } from 'react';

// Tipos de datos del blog
export interface BlogAuthor {
  name: string;
  bio: string;
  image: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: BlogAuthor;
  coverImage: string;
  categories: string[];
  readingTime: string;
  featured?: boolean;
  published?: boolean;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  articleCount: number;
}

// Cache de datos del blog usando React cache
export const getBlogArticles = cache(async (): Promise<BlogArticle[]> => {
  // En un caso real, esto vendría de una API, CMS o base de datos
  // Por ahora mantenemos los datos existentes pero centralizados
  
  const articles: BlogArticle[] = [
    {
      slug: 'como-la-ia-esta-transformando-el-diagnostico-comercial',
      title: 'Cómo la IA está transformando el diagnóstico comercial',
      excerpt: 'Descubre cómo la inteligencia artificial está revolucionando la forma en que realizamos diagnósticos comerciales y mejoramos la toma de decisiones.',
      content: `
        <p>La inteligencia artificial (IA) está revolucionando la forma en que las empresas B2B realizan diagnósticos comerciales, permitiendo análisis más profundos, precisos y predictivos que nunca antes.</p>
        
        <h2>El poder de los datos en el diagnóstico comercial</h2>
        <p>Tradicionalmente, los diagnósticos comerciales se basaban en la experiencia del consultor y datos históricos limitados. Hoy, la IA permite analizar volúmenes masivos de datos de múltiples fuentes para identificar patrones que serían imposibles de detectar manualmente.</p>
        
        <h2>Casos de uso prácticos</h2>
        <p>Algunos ejemplos de cómo la IA está transformando el diagnóstico comercial incluyen:</p>
        <ul>
          <li>Análisis predictivo de oportunidades de venta</li>
          <li>Segmentación avanzada de clientes</li>
          <li>Optimización de rutas de venta</li>
          <li>Detección temprana de problemas en el pipeline</li>
        </ul>
        
        <h2>El factor humano sigue siendo crucial</h2>
        <p>A pesar de los avances en IA, el juicio humano sigue siendo insustituible. La combinación de inteligencia artificial y experiencia humana es lo que realmente está transformando el diagnóstico comercial.</p>
        
        <h2>Conclusión</h2>
        <p>Las empresas que adopten estas nuevas herramientas de diagnóstico potenciadas por IA estarán mejor posicionadas para identificar oportunidades, resolver problemas y optimizar sus procesos comerciales en un mercado cada vez más competitivo.</p>
      `,
      date: '2024-03-15T10:00:00Z',
      author: {
        name: 'Ana Martínez',
        bio: 'Especialista en IA aplicada a ventas B2B',
        image: '/images/team/ana-martinez.jpg'
      },
      coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
      categories: ['inteligencia-artificial', 'ventas'],
      readingTime: '5 min',
      featured: true,
      published: true
    },
    {
      slug: 'la-contradiccion-que-me-hace-cuestionar-todo-lo-que-se',
      title: 'La Contradicción que Me Hace Cuestionar Todo lo que Sé: Cuando Enseño lo Contrario de lo que Practico',
      excerpt: 'Una reflexión incómoda sobre las estrategias de ventas B2B y cómo a veces enseñamos lo contrario de lo que practicamos, cuestionando si existen verdades absolutas en este campo.',
      content: `
        <h2>Una reflexión incómoda sobre las estrategias de ventas B2B</h2>
        
        <p>Me encuentro en una situación que me ha llevado a cuestionar muchas de mis certezas profesionales: estoy enseñando a mis clientes exactamente lo contrario de lo que yo mismo practico en mi negocio... y ambos caminos parecen funcionar.</p>
        
        <p>Esta contradicción me desconcierta profundamente. ¿Significa que no hay verdades absolutas en este campo? ¿O peor aún, que mis recomendaciones son arbitrarias?</p>
        
        <h2>La historia que me hizo dudar</h2>
        
        <p>Hace unos meses, comencé a trabajar con un cliente cuya estrategia de prospección no estaba dando resultados. Su enfoque era directo y transaccional: identificaba brevemente el problema, mencionaba su solución y solicitaba una reunión casi inmediatamente. Sin establecer relación, sin profundizar en el dolor del prospecto, sin construir una conversación real.</p>
        
        <p>Sus resultados no eran alentadores: pocas respuestas, escasas reuniones, y un sentimiento creciente de frustración.</p>
        
        <p>Mi recomendación fue hacia un camino diferente: "Intenta no pedir reuniones tan pronto. Conéctate primero con el dolor de la persona. Establece una conversación genuina. Construye relación antes de vender."</p>
        
        <p>Siguió mi consejo y, con el tiempo, comenzó a ver una mejora. Más prospectos respondían, las conversaciones fluían y las reuniones surgían de manera más orgánica.</p>
        
        <p>Hasta aquí, la historia parece lógica. Pero aquí viene la parte desconcertante:</p>
        
        <p>En mi propia empresa, mi estrategia personal de prospección es similar a la que mi cliente estaba usando cuando no le funcionaba. Mis mensajes son bastante directos: identifico el problema, propongo una solución y sugiero una reunión. Sin demasiados rodeos.</p>
        
        <p>Y para mi sorpresa, este enfoque genera resultados consistentes en mi caso.</p>
        
        <p>Mismo sector. Propuestas de valor similares. Enfoques prácticamente opuestos.</p>
        
        <p>Y ambos parecen funcionar, cada uno a su manera.</p>
        
        <h2>La pregunta que me persigue</h2>
        
        <p>¿Cómo es posible que yo esté teniendo resultados positivos con un enfoque similar al que no funcionaba para mi cliente, mientras que él ahora avanza haciendo casi lo contrario?</p>
        
        <p>Esta contradicción me ha hecho cuestionar si realmente entiendo lo que estoy haciendo. No es que tenga todas las respuestas, pero al menos creía tener algunas certezas básicas.</p>
        
        <h2>Una hipótesis más compleja que la simple autenticidad</h2>
        
        <p>Después de reflexionar sobre esta paradoja, he llegado a una hipótesis que contradice incluso la idea de "sé simplemente tú mismo":</p>
        
        <p><strong>Quizás el éxito no viene de usar estrategias que se alinean perfectamente con nuestra personalidad, sino de encontrar el equilibrio que compensa nuestras tendencias naturales llevadas al extremo.</strong></p>
        
        <p>Lo ironía es que yo soy naturalmente una persona muy relacional. Me encanta construir conexiones, entablar conversaciones profundas y nutrir relaciones. Pero precisamente por esa tendencia natural, mi punto débil era la asertividad comercial. Podía pasar meses generando contenido valioso y construyendo relaciones sin un claro llamado a la acción, sin pedir concretamente una reunión.</p>
        
        <p>Lo que necesitaba no era amplificar mi autenticidad relacional, sino complementarla con elementos más directos y transaccionales. Al moverme ligeramente contra mi tendencia natural, encontré un balance más efectivo.</p>
        
        <p>Mi cliente enfrentaba el problema opuesto. También tiene un estilo personal muy relacional, pero curiosamente, su estrategia de prospección era excesivamente transaccional y directa. Esta disonancia entre su naturaleza y su método creaba una sensación de inautenticidad que los prospectos probablemente percibían.</p>
        
        <p>Al recomendarle un enfoque más relacional, no estaba pidiendo que fuera "más auténtico", sino que encontrara un equilibrio más efectivo, volviendo hacia su zona natural de fortaleza.</p>
        
        <h2>El problema con las verdades absolutas en ventas</h2>
        
        <p>La industria del marketing y las ventas B2B está llena de afirmaciones categóricas:</p>
        <ul>
          <li>"El outbound ya no funciona"</li>
          <li>"Las ventas consultivas son la única forma"</li>
          <li>"Siempre debes establecer valor antes de pedir algo"</li>
        </ul>
        
        <p>Estas "verdades universales" simplifican excesivamente un proceso complejo y lleno de matices. Y quizás esa sea precisamente su debilidad.</p>
        
        <p>Las estrategias no existen en el vacío. Existen en personas reales, con estilos comunicativos únicos, personalidades diferentes y contextos diversos.</p>
        
        <h2>El equilibrio como variable olvidada</h2>
        
        <p>Lo que rara vez se menciona en las discusiones sobre estrategias de venta es que todos tenemos tendencias naturales que, llevadas al extremo, pueden convertirse en limitaciones.</p>
        
        <p>Las personas naturalmente relacionales (como yo) podemos caer en la trampa de construir relaciones sin avanzar hacia objetivos comerciales concretos. Las personas naturalmente directas pueden alienar prospectos al ir demasiado rápido hacia la transacción.</p>
        
        <p>Quizás el éxito no viene de maximizar nuestra tendencia natural, sino de identificar dónde nuestras fortalezas se convierten en debilidades y complementarlas con elementos aparentemente contradictorios.</p>
        
        <p>Y lo más sorprendente: a veces necesitamos movernos ligeramente en dirección opuesta a nuestra zona de confort para encontrar ese punto de equilibrio.</p>
        
        <h2>Un enfoque más matizado</h2>
        
        <p>Esta contradicción me ha llevado a reconsiderar mi enfoque como profesional:</p>
        
        <p>Ya no creo en recomendar estrategias basadas únicamente en "mejores prácticas" universales. Intento observar cómo se comunica naturalmente la persona, qué la hace sentir cómoda, dónde parece más auténtica.</p>
        
        <p>Y desde ahí, busco estrategias que potencien esas cualidades naturales, incluso si contradicen lo que está "de moda" en el mercado.</p>
        
        <p>No tengo todas las respuestas, pero cada vez estoy más convencido de que no existe "la estrategia correcta" en abstracto, sino "la estrategia más alineada" con cada persona.</p>
        
        <h2>Una conclusión que desafía el "sé tú mismo"</h2>
        
        <p>Si algo he aprendido de esta contradicción, es esto:</p>
        
        <p>Quizás el éxito no está en maximizar nuestras tendencias naturales, sino en encontrar el equilibrio que nos completa.</p>
        
        <p>A veces necesitamos movernos en la dirección opuesta a nuestro instinto. Las personas relacionales como yo pueden necesitar más elementos transaccionales. Las personas naturalmente directas pueden necesitar incorporar más elementos relacionales.</p>
        
        <p>Es como si existiera un espectro entre lo puramente relacional y lo puramente transaccional, y todos tuviéramos un punto de equilibrio óptimo en algún lugar de ese continuo. Y ese punto rara vez está en los extremos.</p>
        
        <p>Por eso algunas personas fracasan con estrategias que funcionan para otros: no es que la estrategia sea inherentemente buena o mala, sino que puede alejarte o acercarte a tu punto de equilibrio personal.</p>
        
        <p>Y mientras la industria sigue discutiendo sobre qué método es universalmente mejor, la pregunta más útil podría ser: ¿dónde estás naturalmente en ese espectro relacional-transaccional, y qué necesitas incorporar para encontrar tu equilibrio óptimo?</p>
        
        <p>No pretendo tener la respuesta definitiva. Esta es solo una reflexión basada en una contradicción que sigo explorando. Y me pregunto: ¿has notado este fenómeno del "equilibrio compensatorio" en tu experiencia?</p>
      `,
      date: '2025-04-03T19:30:00Z',
      author: {
        name: 'Gael Thomé',
        bio: 'Fundador de Utópica y especialista en ventas consultivas B2B',
        image: '/images/team/gael-thome.jpg'
      },
      coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop',
      categories: ['venta-consultiva', 'desarrollo-de-talento'],
      readingTime: '8 min',
      featured: true,
      published: true
    },
    {
      slug: 'guia-practica-de-ia-para-equipos-comerciales',
      title: 'Guía práctica de IA para equipos comerciales',
      excerpt: 'Una guía paso a paso para implementar soluciones de IA en tu equipo comercial sin necesidad de conocimientos técnicos avanzados.',
      content: '<p>Contenido completo del artículo...</p>',
      date: '2024-03-10T10:00:00Z',
      author: {
        name: 'Carlos López',
        bio: 'Especialista en automatización comercial',
        image: '/images/team/carlos-lopez.jpg'
      },
      coverImage: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2940&auto=format&fit=crop',
      categories: ['inteligencia-artificial', 'tecnologia'],
      readingTime: '8 min',
      published: true
    },
    {
      slug: 'el-futuro-de-crm-de-registro-a-prediccion',
      title: 'El futuro de CRM: de registro a predicción',
      excerpt: 'Cómo los sistemas CRM están evolucionando de simples registros a potentes herramientas predictivas gracias a la inteligencia artificial.',
      content: '<p>Contenido completo del artículo...</p>',
      date: '2024-03-05T10:00:00Z',
      author: {
        name: 'Laura Gómez',
        bio: 'Consultora en transformación digital',
        image: '/images/team/laura-gomez.jpg'
      },
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
      categories: ['inteligencia-artificial', 'crm'],
      readingTime: '6 min',
      published: true
    },
    {
      slug: 'el-arte-de-hacer-preguntas-poderosas-en-la-era-digital',
      title: 'El arte de hacer preguntas poderosas en la era digital',
      excerpt: 'Aprende a formular preguntas que generen insights valiosos y construyan relaciones sólidas con tus clientes en entornos digitales.',
      content: '<p>Contenido completo del artículo...</p>',
      date: '2024-03-12T10:00:00Z',
      author: {
        name: 'Miguel Sánchez',
        bio: 'Coach en comunicación B2B',
        image: '/images/team/miguel-sanchez.jpg'
      },
      coverImage: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=2940&auto=format&fit=crop',
      categories: ['venta-consultiva', 'comunicacion'],
      readingTime: '7 min',
      published: true
    },
    {
      slug: 'metodologias-hibridas-combinando-lo-mejor-del-contacto-humano-y-la-tecnologia',
      title: 'Metodologías híbridas: combinando lo mejor del contacto humano y la tecnología',
      excerpt: 'Estrategias para crear un enfoque de ventas que aproveche tanto la empatía humana como las capacidades tecnológicas.',
      content: '<p>Contenido completo del artículo...</p>',
      date: '2024-03-08T10:00:00Z',
      author: {
        name: 'Ana Martínez',
        bio: 'Especialista en IA aplicada a ventas B2B',
        image: '/images/team/ana-martinez.jpg'
      },
      coverImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2940&auto=format&fit=crop',
      categories: ['venta-consultiva', 'tecnologia'],
      readingTime: '6 min',
      published: true
    },
    {
      slug: 'de-equipos-reactivos-a-proactivos-el-nuevo-paradigma-comercial',
      title: 'De equipos reactivos a proactivos: el nuevo paradigma comercial',
      excerpt: 'Cómo las organizaciones B2B están transformando sus equipos comerciales para anticiparse a las necesidades del mercado.',
      content: '<p>Contenido completo del artículo...</p>',
      date: '2024-03-14T10:00:00Z',
      author: {
        name: 'Carlos López',
        bio: 'Especialista en automatización comercial',
        image: '/images/team/carlos-lopez.jpg'
      },
      coverImage: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2940&auto=format&fit=crop',
      categories: ['tendencias-b2b', 'transformacion-comercial'],
      readingTime: '5 min',
      published: true
    }
  ];

  // Filtrar solo artículos publicados
  return articles.filter(article => article.published);
});

// Función para obtener un artículo específico por slug
export const getBlogArticleBySlug = cache(async (slug: string): Promise<BlogArticle | null> => {
  const articles = await getBlogArticles();
  return articles.find(article => article.slug === slug) || null;
});

// Función para obtener categorías del blog
export const getBlogCategories = cache(async (): Promise<BlogCategory[]> => {
  const articles = await getBlogArticles();
  
  // Crear un mapa de categorías con contador
  const categoryMap = new Map<string, { name: string; articles: BlogArticle[] }>();
  
  articles.forEach(article => {
    article.categories.forEach(categorySlug => {
      if (!categoryMap.has(categorySlug)) {
        categoryMap.set(categorySlug, {
          name: formatCategoryName(categorySlug),
          articles: []
        });
      }
      categoryMap.get(categorySlug)!.articles.push(article);
    });
  });
  
  // Convertir a array de categorías con descripciones
  const categories: BlogCategory[] = Array.from(categoryMap.entries()).map(([slug, data]) => ({
    slug,
    name: data.name,
    description: getCategoryDescription(slug),
    articleCount: data.articles.length
  }));
  
  return categories.sort((a, b) => b.articleCount - a.articleCount);
});

// Función para obtener artículos por categoría
export const getBlogArticlesByCategory = cache(async (categorySlug: string): Promise<BlogArticle[]> => {
  const articles = await getBlogArticles();
  return articles
    .filter(article => article.categories.includes(categorySlug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// Función para obtener slugs de artículos (para generateStaticParams)
export const getBlogArticleSlugs = cache(async (): Promise<string[]> => {
  const articles = await getBlogArticles();
  return articles.map(article => article.slug);
});

// Función para obtener slugs de categorías (para generateStaticParams)
export const getBlogCategorySlugs = cache(async (): Promise<string[]> => {
  const categories = await getBlogCategories();
  return categories.map(category => category.slug);
});

// Función para obtener artículos destacados
export const getFeaturedBlogArticles = cache(async (limit: number = 3): Promise<BlogArticle[]> => {
  const articles = await getBlogArticles();
  return articles
    .filter(article => article.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
});

// Función para obtener artículos recientes
export const getRecentBlogArticles = cache(async (limit: number = 5, excludeSlug?: string): Promise<BlogArticle[]> => {
  const articles = await getBlogArticles();
  return articles
    .filter(article => article.slug !== excludeSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
});

// Utilidades
function formatCategoryName(slug: string): string {
  const categoryNames: Record<string, string> = {
    'inteligencia-artificial': 'Inteligencia Artificial',
    'venta-consultiva': 'Venta Consultiva',
    'desarrollo-de-talento': 'Desarrollo de Talento',
    'tendencias-b2b': 'Tendencias B2B',
    'transformacion-comercial': 'Transformación Comercial',
    'tecnologia': 'Tecnología',
    'comunicacion': 'Comunicación',
    'crm': 'CRM',
    'ventas': 'Ventas'
  };
  
  return categoryNames[slug] || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getCategoryDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    'inteligencia-artificial': 'Artículos sobre IA aplicada a ventas B2B, automatización y herramientas inteligentes.',
    'venta-consultiva': 'Estrategias y metodologías para una venta más consultiva y centrada en el cliente.',
    'desarrollo-de-talento': 'Recursos para el crecimiento profesional y desarrollo de habilidades comerciales.',
    'tendencias-b2b': 'Las últimas tendencias y evoluciones en el mundo B2B.',
    'transformacion-comercial': 'Guías para transformar y modernizar procesos comerciales.',
    'tecnologia': 'Herramientas y tecnologías que impulsan las ventas modernas.',
    'comunicacion': 'Técnicas de comunicación efectiva en entornos B2B.',
    'crm': 'Mejores prácticas y estrategias para sistemas CRM.',
    'ventas': 'Estrategias, técnicas y metodologías de ventas efectivas.'
  };
  
  return descriptions[slug] || `Artículos sobre ${formatCategoryName(slug).toLowerCase()} para profesionales B2B.`;
}

// Función para validar que un slug existe
export const validateBlogSlug = cache(async (slug: string): Promise<boolean> => {
  const article = await getBlogArticleBySlug(slug);
  return article !== null;
});

// Función para validar que una categoría existe
export const validateCategorySlug = cache(async (categorySlug: string): Promise<boolean> => {
  const categories = await getBlogCategories();
  return categories.some(category => category.slug === categorySlug);
});