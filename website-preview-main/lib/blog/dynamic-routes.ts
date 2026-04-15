/**
 * Sistema de gestión de rutas dinámicas futuras
 * Template y utilidades para implementar nuevas rutas dinámicas fácilmente
 */

import { cache } from 'react';
import { Metadata } from 'next';

// Interfaz genérica para parámetros dinámicos
export interface DynamicRouteParams {
  [key: string]: string | string[];
}

// Configuración base para rutas dinámicas
export interface DynamicRouteConfig {
  /** Patrón de la ruta (ej: '/blog/[slug]') */
  pattern: string;
  /** Función para generar parámetros estáticos */
  generateStaticParams: () => Promise<DynamicRouteParams[]>;
  /** Función para generar metadata */
  generateMetadata: (params: DynamicRouteParams) => Promise<Metadata>;
  /** Función para validar parámetros */
  validateParams: (params: DynamicRouteParams) => Promise<boolean>;
  /** Configuración de revalidación */
  revalidate?: number;
  /** Configuración de dynamic */
  dynamic?: 'auto' | 'force-dynamic' | 'error' | 'force-static';
}

// Factory para crear configuraciones de rutas dinámicas
export function createDynamicRouteConfig(config: DynamicRouteConfig): DynamicRouteConfig {
  return {
    revalidate: 3600, // 1 hora por defecto
    dynamic: 'force-static',
    ...config,
  };
}

// Utilidad para crear generateStaticParams con error handling
export function createStaticParamsGenerator<T extends DynamicRouteParams>(
  dataFetcher: () => Promise<T[]>,
  errorFallback: T[] = []
) {
  return cache(async (): Promise<T[]> => {
    try {
      return await dataFetcher();
    } catch (error) {
      console.error('Error generating static params:', error);
      return errorFallback;
    }
  });
}

// Utilidad para crear generateMetadata con cache
export function createMetadataGenerator<T extends DynamicRouteParams>(
  metadataFetcher: (params: T) => Promise<Metadata>
) {
  return cache(async (params: T): Promise<Metadata> => {
    try {
      return await metadataFetcher(params);
    } catch (error) {
      console.error('Error generating metadata:', error);
      return {};
    }
  });
}

// Utilidad para validación de parámetros
export function createParamsValidator<T extends DynamicRouteParams>(
  validator: (params: T) => Promise<boolean>
) {
  return cache(async (params: T): Promise<boolean> => {
    try {
      return await validator(params);
    } catch (error) {
      console.error('Error validating params:', error);
      return false;
    }
  });
}

// Template para rutas de contenido dinámico (como blog posts)
export interface ContentRouteParams {
  slug: string;
}

export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  published?: boolean;
}

// Factory para rutas de contenido
export function createContentRoute<T extends ContentItem>(
  config: {
    /** Obtener todos los elementos de contenido */
    getAll: () => Promise<T[]>;
    /** Obtener un elemento por slug */
    getBySlug: (slug: string) => Promise<T | null>;
    /** Prefijo de la URL (ej: 'blog', 'docs') */
    urlPrefix: string;
    /** Sitio base */
    siteUrl?: string;
  }
): DynamicRouteConfig {
  const { getAll, getBySlug, urlPrefix, siteUrl = 'https://utopica.io' } = config;

  return createDynamicRouteConfig({
    pattern: `/${urlPrefix}/[slug]`,
    
    generateStaticParams: createStaticParamsGenerator(
      async () => {
        const items = await getAll();
        return items
          .filter(item => item.published !== false)
          .map(item => ({ slug: item.slug }));
      }
    ),
    
    generateMetadata: createMetadataGenerator(
      async (params) => {
        const { slug } = params as unknown as ContentRouteParams;
        const item = await getBySlug(slug);
        if (!item) return {};

        const url = `${siteUrl}/${urlPrefix}/${item.slug}`;
        
        return {
          title: `${item.title} | Utópica`,
          description: item.description,
          keywords: item.tags?.join(', '),
          authors: item.author ? [{ name: item.author }] : undefined,
          publisher: 'Utópica',
          metadataBase: new URL(siteUrl),
          alternates: { canonical: url },
          openGraph: {
            title: item.title,
            description: item.description,
            type: 'article',
            publishedTime: item.publishedAt,
            modifiedTime: item.updatedAt,
            url,
            siteName: 'Utópica',
            locale: 'es_ES',
          },
          twitter: {
            card: 'summary_large_image',
            title: item.title,
            description: item.description,
          },
          robots: {
            index: true,
            follow: true,
          },
        };
      }
    ),
    
    validateParams: createParamsValidator(
      async (params) => {
        const { slug } = params as unknown as ContentRouteParams;
        const item = await getBySlug(slug);
        return item !== null && item.published !== false;
      }
    ),
  });
}

// Template para rutas de categorización (como categorías del blog)
export interface CategoryRouteParams {
  category: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  itemCount: number;
}

// Factory para rutas de categoría
export function createCategoryRoute<T extends Category>(
  config: {
    /** Obtener todas las categorías */
    getCategories: () => Promise<T[]>;
    /** Prefijo de la URL (ej: 'blog/categoria', 'docs/categoria') */
    urlPrefix: string;
    /** Sitio base */
    siteUrl?: string;
  }
): DynamicRouteConfig {
  const { getCategories, urlPrefix, siteUrl = 'https://utopica.io' } = config;

  return createDynamicRouteConfig({
    pattern: `/${urlPrefix}/[category]`,
    
    generateStaticParams: createStaticParamsGenerator(
      async () => {
        const categories = await getCategories();
        return categories.map(category => ({ category: category.slug }));
      }
    ),
    
    generateMetadata: createMetadataGenerator(
      async (params) => {
        const categories = await getCategories();
        const { category: categorySlug } = params as unknown as CategoryRouteParams;
        const category = categories.find(cat => cat.slug === categorySlug);
        if (!category) return {};

        const url = `${siteUrl}/${urlPrefix}/${category.slug}`;
        
        return {
          title: `${category.name} | Utópica`,
          description: category.description,
          publisher: 'Utópica',
          metadataBase: new URL(siteUrl),
          alternates: { canonical: url },
          openGraph: {
            title: `${category.name} | Utópica`,
            description: category.description,
            type: 'website',
            url,
            siteName: 'Utópica',
            locale: 'es_ES',
          },
          twitter: {
            card: 'summary',
            title: `${category.name} | Utópica`,
            description: category.description,
          },
          robots: {
            index: true,
            follow: true,
          },
        };
      }
    ),
    
    validateParams: createParamsValidator(
      async (params) => {
        const categories = await getCategories();
        const { category: categorySlug } = params as unknown as CategoryRouteParams;
        return categories.some(cat => cat.slug === categorySlug);
      }
    ),
  });
}

// Ejemplos de uso futuro:

/*
// Ejemplo 1: Blog posts (ya implementado)
const blogRouteConfig = createContentRoute({
  getAll: getBlogArticles,
  getBySlug: getBlogArticleBySlug,
  urlPrefix: '_blog',
});

// Ejemplo 2: Documentación
const docsRouteConfig = createContentRoute({
  getAll: getDocumentationPages,
  getBySlug: getDocumentationBySlug,
  urlPrefix: 'docs',
});

// Ejemplo 3: Casos de estudio
const caseStudyRouteConfig = createContentRoute({
  getAll: getCaseStudies,
  getBySlug: getCaseStudyBySlug,
  urlPrefix: 'casos-de-estudio',
});

// Ejemplo 4: Categorías de servicios
const serviceCategoryRouteConfig = createCategoryRoute({
  getCategories: getServiceCategories,
  urlPrefix: 'servicios/categoria',
});
*/

// Registro de rutas dinámicas para monitoreo
export const DYNAMIC_ROUTES_REGISTRY = {
  blog: {
    articles: '/_blog/[slug]',
    categories: '/_blog/categoria/[categoria]',
  },
  // Futuras rutas dinámicas se registrarán aquí
} as const;

// Función para obtener estadísticas de rutas dinámicas
export async function getDynamicRoutesStats() {
  const stats = {
    totalRoutes: 0,
    routesByType: {} as Record<string, number>,
    lastUpdated: new Date().toISOString(),
  };

  // Estadísticas del blog
  try {
    const { getBlogArticleSlugs, getBlogCategorySlugs } = await import('./data');
    const [articleSlugs, categorySlugs] = await Promise.all([
      getBlogArticleSlugs(),
      getBlogCategorySlugs(),
    ]);
    
    stats.routesByType.blogArticles = articleSlugs.length;
    stats.routesByType.blogCategories = categorySlugs.length;
    stats.totalRoutes += articleSlugs.length + categorySlugs.length;
  } catch (error) {
    console.error('Error getting blog stats:', error);
  }

  return stats;
}