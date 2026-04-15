import { GoogleGenerativeAI } from '@google/generative-ai';
import * as cheerio from 'cheerio';
import { extractWebsiteWithFirecrawl, crawlWebsiteWithFirecrawl } from './firecrawl';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

interface WebsiteContent {
  title: string;
  metaDescription: string;
  headings: { level: string; text: string }[];
  mainContent: string;
  ctaButtons: string[];
  navigation: string[];
  sections: { title: string; content: string }[];
  pages?: {
    url: string;
    title: string;
    content: string;
  }[];
}

async function fetchPageContent(url: string): Promise<{ html: string; $ : cheerio.CheerioAPI } | null> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
      }
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Remover scripts y estilos
    $('script').remove();
    $('style').remove();
    
    return { html, $ };
  } catch (error) {
    console.error('Error fetching page:', url, error);
    return null;
  }
}

async function fetchWebsiteContent(url: string, crawlSubpages: boolean = true): Promise<WebsiteContent> {
  try {
    console.log('Fetching website content for:', url);
    
    // Intentar primero con Firecrawl
    const firecrawlContent = await extractWebsiteWithFirecrawl(url);
    if (firecrawlContent && firecrawlContent.markdown) {
      console.log('Using Firecrawl for content extraction');
      
      // Extraer headings del markdown
      const headings: { level: string; text: string }[] = [];
      const headingRegex = /^(#{1,4})\s+(.+)$/gm;
      let match;
      while ((match = headingRegex.exec(firecrawlContent.markdown)) !== null) {
        headings.push({
          level: `h${match[1].length}`,
          text: match[2].trim()
        });
      }
      
      // Extraer CTAs del markdown
      const ctaButtons: string[] = [];
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      while ((match = linkRegex.exec(firecrawlContent.markdown)) !== null) {
        const text = match[1];
        const url = match[2];
        if (text.match(/contact|demo|start|try|get|book|schedule/i)) {
          ctaButtons.push(text);
        }
      }
      
      // Si se requiere crawl de subpáginas
      const pages: { url: string; title: string; content: string }[] = [];
      if (crawlSubpages) {
        const crawledPages = await crawlWebsiteWithFirecrawl(url, 5);
        crawledPages.forEach(page => {
          if (page.markdown) {
            pages.push({
              url: url, // Firecrawl no siempre devuelve la URL de cada página
              title: page.title,
              content: page.markdown.substring(0, 5000)
            });
          }
        });
      }
      
      return {
        title: firecrawlContent.title,
        metaDescription: firecrawlContent.description,
        headings,
        mainContent: firecrawlContent.markdown.substring(0, 30000),
        ctaButtons: [...new Set(ctaButtons)],
        navigation: [], // Firecrawl no extrae navegación directamente
        sections: [], // Usaremos el markdown completo en lugar de secciones
        pages
      };
    }
    
    // Si Firecrawl no está disponible, usar el método tradicional
    console.log('Falling back to traditional extraction');
    const pageData = await fetchPageContent(url);
    if (!pageData) {
      throw new Error('Failed to fetch main page');
    }
    
    const { $ } = pageData;
    
    // Extraer información básica
    const title = $('title').text().trim() || '';
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    
    // Extraer todos los headings con su nivel
    const headings: { level: string; text: string }[] = [];
    $('h1, h2, h3, h4').each((_, el) => {
      const text = $(el).text().trim();
      if (text) {
        headings.push({
          level: el.tagName.toLowerCase(),
          text: text
        });
      }
    });
    
    // Extraer navegación
    const navigation: string[] = [];
    $('nav a, header a').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length < 50) {
        navigation.push(text);
      }
    });
    
    // Extraer CTAs mejorado
    const ctaButtons: string[] = [];
    $('button, a.btn, a.button, a[class*="cta"], a[class*="button"], a[href*="contact"], a[href*="demo"]').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length < 100) ctaButtons.push(text);
    });
    
    // Extraer secciones principales
    const sections: { title: string; content: string }[] = [];
    $('section, main > div, .section').each((_, section) => {
      const $section = $(section);
      const sectionTitle = $section.find('h1, h2, h3').first().text().trim();
      const sectionContent = $section.text()
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 2000); // Limitar cada sección a 2000 caracteres
      
      if (sectionTitle && sectionContent) {
        sections.push({
          title: sectionTitle,
          content: sectionContent
        });
      }
    });
    
    // Extraer contenido principal - más extenso
    // Priorizar contenido de main, article, y divs principales
    let mainContent = '';
    const contentSelectors = ['main', 'article', '[role="main"]', '.content', '#content'];
    for (const selector of contentSelectors) {
      const content = $(selector).text().replace(/\s+/g, ' ').trim();
      if (content.length > mainContent.length) {
        mainContent = content;
      }
    }
    
    // Si no encontramos contenido principal, usar body
    if (!mainContent) {
      mainContent = $('body').text().replace(/\s+/g, ' ').trim();
    }
    
    mainContent = mainContent.substring(0, 30000); // Aumentar a 30k caracteres
    
    // Extraer enlaces internos para crawlear
    const pages: { url: string; title: string; content: string }[] = [];
    
    if (crawlSubpages) {
      const baseUrl = new URL(url);
      const internalLinks = new Set<string>();
      
      // Encontrar todos los enlaces internos
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (href) {
          try {
            const linkUrl = new URL(href, baseUrl);
            // Solo enlaces internos del mismo dominio
            if (linkUrl.hostname === baseUrl.hostname && 
                linkUrl.pathname !== baseUrl.pathname &&
                !linkUrl.pathname.includes('#') &&
                !linkUrl.pathname.match(/\.(jpg|jpeg|png|gif|pdf|zip)$/i)) {
              internalLinks.add(linkUrl.href);
            }
          } catch (e) {
            // Ignorar URLs inválidas
          }
        }
      });
      
      // Limitar a las primeras 5 páginas más importantes
      const importantPages = Array.from(internalLinks).slice(0, 5);
      
      console.log(`Found ${internalLinks.size} internal links, crawling ${importantPages.length} important pages`);
      
      // Crawlear páginas en paralelo
      const pagePromises = importantPages.map(async (pageUrl) => {
        const subPageData = await fetchPageContent(pageUrl);
        if (subPageData) {
          const { $ : subPage$ } = subPageData;
          const pageTitle = subPage$('title').text().trim() || subPage$('h1').first().text().trim() || 'Sin título';
          const pageContent = subPage$('main, article, [role="main"], .content, #content, body')
            .text()
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 5000); // 5k caracteres por página secundaria
          
          return {
            url: pageUrl,
            title: pageTitle,
            content: pageContent
          };
        }
        return null;
      });
      
      const crawledPages = await Promise.all(pagePromises);
      pages.push(...crawledPages.filter(p => p !== null) as any);
    }
    
    return {
      title: title || `Análisis de ${new URL(url).hostname}`,
      metaDescription,
      headings,
      mainContent,
      ctaButtons: [...new Set(ctaButtons)],
      navigation: [...new Set(navigation)],
      sections: sections.slice(0, 10), // Limitar a las primeras 10 secciones
      pages
    };
  } catch (error) {
    console.error('Error fetching website:', error);
    
    const domain = new URL(url).hostname;
    return {
      title: `Análisis de ${domain}`,
      metaDescription: `Auditoría de claridad comercial para ${domain}`,
      headings: [{ level: 'h1', text: `Sitio web: ${domain}` }],
      mainContent: `No se pudo acceder al contenido completo de ${url}. El análisis se basará en la información disponible.`,
      ctaButtons: [],
      navigation: [],
      sections: [],
      pages: []
    };
  }
}


export async function analyzeWebsiteClarity(url: string): Promise<string> {
  if (!genAI) {
    console.warn('Gemini API is not configured');
    return generateMockAnalysis(url);
  }
  
  try {
    console.log('Starting website analysis for:', url);
    
    // Primero extraer el contenido de la web
    const websiteContent = await fetchWebsiteContent(url);
    
    // Opciones de modelos:
    // - 'gemini-1.5-pro': Modelo actual, buena calidad
    // - 'gemini-1.5-flash': Más rápido, menor costo
    // - 'gemini-2.0-flash-exp': Experimental con capacidades mejoradas
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const prompt = `# Instrucciones para el Modelo de Lenguaje (LLM): Auditoría de Claridad Web

## Objetivo de la Auditoría:
Analizar el contenido web proporcionado para determinar qué tan bien cumple con los principios de Claridad, Relevancia y Diferenciación en su comunicación, identificar puntos de dolor clave relacionados con la falta de claridad, y ofrecer recomendaciones accionables.

## Información de la Página Web:
**URL Analizada:** ${url}

**Título de la Página:** ${websiteContent.title}
**Meta Descripción:** ${websiteContent.metaDescription || 'No encontrada'}

**Navegación Principal:**
${websiteContent.navigation.slice(0, 10).join(', ') || 'No encontrada'}

**Estructura de Encabezados:**
${websiteContent.headings.map((h, i) => `${i + 1}. [${h.level.toUpperCase()}] ${h.text}`).join('\n')}

**Llamadas a la Acción (CTAs) encontradas:**
${websiteContent.ctaButtons.join('\n') || 'No se encontraron CTAs claros'}

**Secciones Principales Identificadas:**
${websiteContent.sections.map((s, i) => `
${i + 1}. ${s.title}
Contenido: ${s.content.substring(0, 500)}...
`).join('\n')}

**Contenido Principal de la Página (primeros 5000 caracteres):**
${websiteContent.mainContent.substring(0, 5000)}

${websiteContent.pages && websiteContent.pages.length > 0 ? `
**Páginas Adicionales Analizadas:**
${websiteContent.pages.map((page, i) => `
${i + 1}. ${page.title}
URL: ${page.url}
Contenido: ${page.content.substring(0, 1000)}...
`).join('\n')}
` : ''}

---

## Proceso de Auditoría (Pasos para el LLM):

### Paso 1: Análisis del Contenido Proporcionado

**IMPORTANTE:** Basa tu análisis ÚNICAMENTE en el contenido extraído y proporcionado arriba. NO inventes información ni hagas suposiciones sobre contenido que no está presente en los datos proporcionados.

**Deducción de Público Objetivo y Servicio Principal:** Basado EXCLUSIVAMENTE en el contenido real proporcionado arriba (título, encabezados, CTAs, texto de las secciones), deduce el público objetivo principal del cliente y su servicio/producto principal. Si esta información no es clara en el contenido proporcionado, anótalo como una oportunidad de mejora.

**Análisis del Mensaje Principal:** Identifica cuál es el mensaje principal basándote SOLO en:
- El título de la página proporcionado
- Los encabezados listados arriba
- Las llamadas a la acción (CTAs) encontradas
- El contenido de las secciones proporcionadas
- El texto principal extraído

---

### Paso 2: Evaluación por Criterio (Basado en el Documento de Claridad Comercial)

#### Criterio 1: CLARIDAD

**Pregunta Clave:** ¿Cualquier persona, sin conocimiento previo, entendería qué hace la empresa, para quién y qué problema resuelve en 3-5 segundos?

**Análisis a Realizar:**

- **Jerga Técnica:** Busca el uso excesivo de términos técnicos o de la industria que el cliente final podría no entender. Evalúa si el lenguaje es "el idioma del cliente" o el "idioma profesional" de la empresa.

- **Multiplicidad de Mensajes:** ¿La página intenta comunicar demasiadas cosas a la vez? ¿Hay un producto estrella o una oferta principal clara?

- **Propuesta de Valor:** ¿Es la propuesta de valor (qué se hace, para quién, qué resultado) fácilmente identificable y concisa? (Idealmente, en el headline).

**Escala de Evaluación (1-5):**
- 1 = Completamente confuso.
- 3 = Algo claro, pero requiere esfuerzo mental.
- 5 = Cristalino, se entiende al instante.

#### Criterio 2: RELEVANCIA

**Pregunta Clave:** ¿El mensaje conecta directamente con un problema específico y urgente de la audiencia objetivo? ¿El cliente ideal se sentiría interpelado directamente?

**Análisis a Realizar:**

- **Enfoque en el Cliente vs. la Empresa:** ¿La página habla predominantemente de los problemas, aspiraciones y día a día del cliente, o se centra en las características y logros de la empresa?

- **Identificación del Problema:** ¿Se articula claramente el problema que el cliente intenta resolver, o se asume que el visitante ya lo conoce?

- **Visión del Cliente Transformado:** ¿La página pinta un cuadro claro de cómo será la vida del cliente después de usar el servicio/producto? ¿Activa la aspiración?

**Escala de Evaluación (1-5):**
- 1 = No relevante, genérico.
- 3 = Relevante para un público amplio, pero no específico.
- 5 = Extremadamente relevante, "habla directamente a mí".

#### Criterio 3: DIFERENCIACIÓN

**Pregunta Clave:** ¿El mensaje es algo que SOLO esta empresa podría decir? ¿Se percibe una oferta única o un enfoque particular que la distingue de la competencia?

**Análisis a Realizar:**

- **Originalidad del Mensaje:** ¿El lenguaje y las promesas suenan genéricos o podrían ser usadas por cualquier competidor?

- **Metodología Única/Historia:** ¿Se presenta una metodología, un proceso o una historia de marca que sea distintiva? (Ej. StoryBrand, marcos propios).

- **Prueba Social y Casos de Éxito:** ¿Los testimonios o casos de éxito refuerzan una propuesta única o son genéricos?

**Escala de Evaluación (1-5):**
- 1 = Completamente indistinguible de la competencia.
- 3 = Algunas diferencias menores.
- 5 = Claramente única y memorable.

---

### Paso 3: Identificación de Puntos de Dolor del Cliente (Prospecto) e Insights Novedosos

Basado en la evaluación de los 3 criterios, infiere los problemas clave que la falta de claridad está generando para el negocio del prospecto. Conecta esto con el "dolor" que tu servicio de claridad comercial resuelve.

**Ejemplos de dolores inferidos:** Pérdida de prospectos calificados, baja tasa de conversión, dificultad para explicar el valor, confusión en el mercado, competencia basada en precio.

**Cuantificación del Dolor (inferencial):** De manera inferencial y basada en patrones comunes de la industria (no en datos específicos del cliente), describe el tipo y la magnitud del costo de la inacción o de la falta de claridad. Esto puede ser en términos de:

- **Oportunidades perdidas:** "un flujo constante de prospectos que nunca llegan a entender su valor."
- **Eficiencia operativa:** "un tiempo excesivo dedicado a 'educar' a cada nuevo lead."
- **Posicionamiento de precios:** "una presión constante para competir por precio, en lugar de por valor único."
- **Duración del ciclo de venta:** "ciclos de venta alargados innecesariamente."

**Importante:** Evita dar porcentajes o cifras exactas a menos que puedas justificarlas como un promedio de la industria o un "hasta X%". En su lugar, usa frases como "un porcentaje significativo", "muchas oportunidades", "días o semanas adicionales", "una porción considerable", "potencialmente miles de euros/dólares".

**Challenger Insight/Elemento Sorpresa:** Identifica una suposición común que el prospecto pueda tener sobre su problema de comunicación y presenta un contra-argumento o una perspectiva que no haya considerado. Busca contradicciones sutiles en el mensaje de la web, oportunidades de conexión perdidas entre secciones, o patrones de lenguaje que, sin darse cuenta, estén limitando su alcance o diferenciación. Esto busca revelar algo que no sabían.

---

### Paso 4: Generación del Informe de Auditoría y Recomendaciones

[El resto de las instrucciones continúan aquí...]

Genera el informe completo en formato HTML para ser enviado por email, con estilos inline para compatibilidad.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing website with Gemini:', error);
    if (error instanceof Error && error.message.includes('API key')) {
      return generateMockAnalysis(url);
    }
    throw new Error('Failed to analyze website');
  }
}

function generateMockAnalysis(url: string): string {
  return `
    <h1>Informe de Auditoría de Claridad Web</h1>
    <p><strong>URL Auditada:</strong> ${url}</p>
    <p><strong>Nota:</strong> Este es un análisis de demostración. Configure las APIs para obtener análisis reales.</p>
    
    <h2>Resumen Ejecutivo</h2>
    <p>La claridad de su mensaje comercial necesita optimización en las tres áreas clave evaluadas.</p>
    
    <h3>Puntuaciones:</h3>
    <ul>
      <li><strong>Claridad:</strong> <span class="score">3/5</span></li>
      <li><strong>Relevancia:</strong> <span class="score">3/5</span></li>
      <li><strong>Diferenciación:</strong> <span class="score">2/5</span></li>
    </ul>
    
    <h2>Recomendaciones Principales</h2>
    <ol>
      <li>Simplifique su mensaje principal eliminando jerga técnica</li>
      <li>Enfóquese en los problemas específicos de su cliente ideal</li>
      <li>Desarrolle una propuesta de valor única y memorable</li>
    </ol>
    
    <p style="text-align: center; margin-top: 40px;">
      <a href="https://utopica.io/sprint-claridad-comercial" class="cta-button">
        Descubre el Sprint de Claridad Comercial
      </a>
    </p>
  `;
}