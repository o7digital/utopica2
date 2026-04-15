/**
 * Tipos de datos para el sistema de blog
 * Exportaciones centralizadas para reutilización en toda la aplicación
 */

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

export interface BlogMetadata {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

// Parámetros para generateStaticParams
export interface BlogSlugParams {
  slug: string;
}

export interface CategorySlugParams {
  categoria: string;
}

// Configuración de cache y revalidación
export interface BlogCacheConfig {
  revalidate?: number;
  tags?: string[];
  dynamic?: 'auto' | 'force-dynamic' | 'error' | 'force-static';
}