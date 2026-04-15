/**
 * Blog System - Exports centralizados
 * Sistema completo de gestión de blog con rutas dinámicas optimizadas
 */

// Tipos
export type {
  BlogAuthor,
  BlogArticle,
  BlogCategory,
  BlogMetadata,
  BlogSlugParams,
  CategorySlugParams,
  BlogCacheConfig,
} from './types';

// Data layer
export {
  getBlogArticles,
  getBlogArticleBySlug,
  getBlogCategories,
  getBlogArticlesByCategory,
  getBlogArticleSlugs,
  getBlogCategorySlugs,
  getFeaturedBlogArticles,
  getRecentBlogArticles,
  validateBlogSlug,
  validateCategorySlug,
} from './data';

// Cache optimizado
export {
  generateBlogArticleMetadata,
  generateBlogCategoryMetadata,
  generateBlogArticleJsonLD,
  generateBlogCategoryJsonLD,
  generateBreadcrumbJsonLD,
  BLOG_CACHE_TAGS,
  invalidateBlogCache,
} from './cache';

// Sistema de rutas dinámicas
export {
  type DynamicRouteParams,
  type DynamicRouteConfig,
  type ContentRouteParams,
  type ContentItem,
  type CategoryRouteParams,
  type Category,
  createDynamicRouteConfig,
  createStaticParamsGenerator,
  createMetadataGenerator,
  createParamsValidator,
  createContentRoute,
  createCategoryRoute,
  DYNAMIC_ROUTES_REGISTRY,
  getDynamicRoutesStats,
} from './dynamic-routes';

// Constantes útiles
export const BLOG_CONFIG = {
  BASE_PATH: '/_blog',
  CATEGORY_PATH: '/_blog/categoria',
  DEFAULT_REVALIDATE: 3600,
  DEFAULT_EXCERPT_LENGTH: 160,
  DEFAULT_READING_TIME_WPM: 200,
} as const;

// Utility functions
export const blogUtils = {
  /**
   * Genera la URL completa de un artículo
   */
  getArticleUrl: (slug: string, baseUrl?: string) => {
    const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://utopica.io';
    return `${base}${BLOG_CONFIG.BASE_PATH}/${slug}`;
  },

  /**
   * Genera la URL completa de una categoría
   */
  getCategoryUrl: (categorySlug: string, baseUrl?: string) => {
    const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://utopica.io';
    return `${base}${BLOG_CONFIG.CATEGORY_PATH}/${categorySlug}`;
  },

  /**
   * Calcula el tiempo de lectura estimado
   */
  calculateReadingTime: (content: string, wpm: number = BLOG_CONFIG.DEFAULT_READING_TIME_WPM) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wpm);
    return `${minutes} min`;
  },

  /**
   * Genera un excerpt de un contenido
   */
  generateExcerpt: (content: string, maxLength: number = BLOG_CONFIG.DEFAULT_EXCERPT_LENGTH) => {
    const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (plainText.length <= maxLength) return plainText;
    
    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? `${truncated.substring(0, lastSpace)}...` : `${truncated}...`;
  },

  /**
   * Formatea una fecha para mostrar
   */
  formatDate: (dateString: string, locale: string = 'es-ES') => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  /**
   * Genera keywords SEO a partir de categorías y contenido
   */
  generateKeywords: (categories: string[], content?: string) => {
    const baseKeywords = ['ventas B2B', 'consultoría comercial', 'Utópica'];
    const categoryKeywords = categories.map(cat => cat.toLowerCase());
    
    let contentKeywords: string[] = [];
    if (content) {
      // Extraer palabras clave del contenido (simplificado)
      const words = content.toLowerCase()
        .replace(/<[^>]*>/g, '')
        .split(/\s+/)
        .filter(word => word.length > 4);
      
      const wordCount = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      contentKeywords = Object.entries(wordCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([word]) => word);
    }
    
    return [...baseKeywords, ...categoryKeywords, ...contentKeywords].join(', ');
  },
} as const;