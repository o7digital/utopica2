/**
 * Marcos de Venta — metadata de los 5 frameworks.
 * El contenido completo de cada marco vive en components/marcos-venta/content/[slug].tsx
 */

export interface FrameworkMeta {
  slug: string;
  number: string; // "01", "02"…
  year: number;
  author: string;
  title: string;
  titleEm: string; // pieza en cursiva
  shortTitle: string;
  subtitle: string;
  description: string;
  tags: string[];
  navLabel: string;
}

export const frameworks: FrameworkMeta[] = [
  {
    slug: '4-conversaciones',
    number: '01',
    year: 2024,
    author: 'Blair Enns',
    title: 'Las 4',
    titleEm: 'Conversaciones',
    shortTitle: 'Las 4 Conversaciones',
    subtitle: 'El sistema de venta para firmas de expertise',
    description:
      'Un nuevo modelo de venta para firmas que venden expertise. No pitches, no presentaciones gratuitas — cuatro conversaciones en secuencia que mantienen al experto en posición de poder.',
    tags: ['Venta de expertise', 'Posicionamiento', 'Valor antes de precio', 'Firmas creativas y consultoras'],
    navLabel: '4 Conversaciones',
  },
  {
    slug: 'sales-pitch',
    number: '02',
    year: 2023,
    author: 'April Dunford',
    title: 'Sales',
    titleEm: 'Pitch',
    shortTitle: 'Sales Pitch',
    subtitle: 'El puente entre posicionamiento y venta',
    description:
      'El puente que faltaba entre posicionamiento y venta. Dunford parte de una premisa simple: un buen producto con un pitch débil pierde ante un producto mediocre con una historia clara. La clave no es convencer — es ayudar al cliente a tomar una decisión confiada.',
    tags: ['Posicionamiento', 'Valor diferenciado', 'Narrativa de mercado', 'B2B tech y startups'],
    navLabel: 'Sales Pitch',
  },
  {
    slug: 'gap-selling',
    number: '03',
    year: 2018,
    author: 'Keenan',
    title: 'Gap',
    titleEm: 'Selling',
    shortTitle: 'Gap Selling',
    subtitle: 'Vender es ampliar la brecha',
    description:
      'Vender no es convencer — es ayudar al cliente a ver y sentir la brecha entre dónde está hoy y dónde quiere estar. El vendedor que no entiende el estado actual del cliente no puede vender nada.',
    tags: ['Diagnóstico de brecha', 'Estado actual vs deseado', 'Causa raíz', 'Impacto de negocio'],
    navLabel: 'Gap Selling',
  },
  {
    slug: 'challenger-sale',
    number: '04',
    year: 2011,
    author: 'Dixon & Adamson',
    title: 'The Challenger',
    titleEm: 'Sale',
    shortTitle: 'The Challenger Sale',
    subtitle: 'Enseñar, adaptar y tomar el control',
    description:
      'El estudio más provocador sobre el comportamiento del vendedor exitoso. La conclusión: el mejor vendedor no construye relaciones — enseña algo nuevo al cliente, adapta el mensaje a su contexto, y toma el control de la conversación de venta.',
    tags: ['Control comercial', 'Insight de negocio', 'Tensión constructiva', 'Ventas enterprise'],
    navLabel: 'Challenger',
  },
  {
    slug: 'spin-selling',
    number: '05',
    year: 1988,
    author: 'Neil Rackham',
    title: 'SPIN',
    titleEm: 'Selling',
    shortTitle: 'SPIN Selling',
    subtitle: 'Las preguntas que cierran ventas complejas',
    description:
      'El método de ventas más estudiado de la historia. 12 años de investigación, 35,000 llamadas de venta observadas en 23 países. Una conclusión sorprendente: las técnicas de cierre y las preguntas de apertura dañan el resultado en ventas complejas.',
    tags: ['Preguntas de valor', 'Ventas complejas', 'B2B enterprise', 'Basado en investigación'],
    navLabel: 'SPIN',
  },
];

export function getFrameworkBySlug(slug: string): FrameworkMeta | undefined {
  return frameworks.find((f) => f.slug === slug);
}

export function getFrameworkNav(slug: string): { prev?: FrameworkMeta; next?: FrameworkMeta } {
  const idx = frameworks.findIndex((f) => f.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? frameworks[idx - 1] : undefined,
    next: idx < frameworks.length - 1 ? frameworks[idx + 1] : undefined,
  };
}
