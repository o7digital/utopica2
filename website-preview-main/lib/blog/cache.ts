/**
 * Sistema de cache avanzado para metadata del blog
 * Optimiza la generación de metadatos para rutas dinámicas
 */

import { cache } from 'react';
import { Metadata } from 'next';
import { getBlogArticleBySlug, getBlogCategories } from './data';
import type { BlogMetadata } from './types';

// Cache para metadatos de artículos
export const generateBlogArticleMetadata = cache(async (slug: string): Promise<Metadata> => {
  const article = await getBlogArticleBySlug(slug);
  
  if (!article) {
    return {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://utopica.io';
  const articleUrl = `${baseUrl}/_blog/${article.slug}`;

  return {
    title: `${article.title} | Blog de Utópica`,
    description: article.excerpt,
    keywords: [
      ...article.categories,
      'ventas B2B',
      'consultoría comercial',
      'desarrollo de talento',
      'Utópica'
    ].join(', '),
    authors: [{ name: article.author.name }],
    creator: article.author.name,
    publisher: 'Utópica',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author.name],
      url: articleUrl,
      siteName: 'Utópica',
      locale: 'es_ES',
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      site: '@utopica_io',
      creator: '@utopica_io',
      images: {
        url: article.coverImage,
        alt: article.title,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },
  };
});

// Cache para metadatos de categorías
export const generateBlogCategoryMetadata = cache(async (categorySlug: string): Promise<Metadata> => {
  const categories = await getBlogCategories();
  const category = categories.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    return {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://utopica.io';
  const categoryUrl = `${baseUrl}/_blog/categoria/${category.slug}`;

  return {
    title: `${category.name} | Blog de Utópica`,
    description: category.description,
    keywords: [
      category.name.toLowerCase(),
      'artículos',
      'ventas B2B',
      'consultoría comercial',
      'Utópica'
    ].join(', '),
    publisher: 'Utópica',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: `${category.name} | Blog de Utópica`,
      description: category.description,
      type: 'website',
      url: categoryUrl,
      siteName: 'Utópica',
      locale: 'es_ES',
      images: [
        {
          url: `/images/og/blog-${category.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${category.name} - Blog de Utópica`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | Blog de Utópica`,
      description: category.description,
      site: '@utopica_io',
      creator: '@utopica_io',
      images: {
        url: `/images/og/blog-${category.slug}.png`,
        alt: `${category.name} - Blog de Utópica`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },
  };
});

// Función para generar JSON-LD estructurado para artículos
export const generateBlogArticleJsonLD = cache(async (slug: string) => {
  const article = await getBlogArticleBySlug(slug);
  
  if (!article) {
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://utopica.io';

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author.name,
      description: article.author.bio,
      image: article.author.image
    },
    publisher: {
      "@type": "Organization",
      name: "Utópica",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/Utopica Logo.svg`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/_blog/${article.slug}`
    },
    keywords: article.categories.join(', '),
    wordCount: article.content.split(' ').length,
    timeRequired: `PT${article.readingTime.replace(' min', '')}M`,
    articleSection: article.categories[0],
    inLanguage: "es-ES"
  };
});

// Función para generar JSON-LD estructurado para categorías
export const generateBlogCategoryJsonLD = cache(async (categorySlug: string) => {
  const categories = await getBlogCategories();
  const category = categories.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://utopica.io';

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - Blog de Utópica`,
    description: category.description,
    url: `${baseUrl}/_blog/categoria/${category.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Utópica",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/Utopica Logo.svg`
      }
    },
    numberOfItems: category.articleCount,
    inLanguage: "es-ES"
  };
});

// Función para generar breadcrumbs estructurados
export const generateBreadcrumbJsonLD = cache((items: Array<{ name: string; item: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
});

// Configuración de cache tags para invalidación
export const BLOG_CACHE_TAGS = {
  ARTICLES: 'blog-articles',
  CATEGORIES: 'blog-categories',
  METADATA: 'blog-metadata'
} as const;

// Función para invalidar cache de blog
export const invalidateBlogCache = async (tags?: string[]) => {
  const { revalidateTag } = await import('next/cache');
  
  const tagsToInvalidate = tags || Object.values(BLOG_CACHE_TAGS);
  
  tagsToInvalidate.forEach(tag => {
    revalidateTag(tag);
  });
};