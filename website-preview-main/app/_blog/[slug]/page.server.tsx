import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleClient from './page.client';
import { BreadcrumbListSchema } from '@/components/schema-org';
import { 
  getBlogArticleBySlug, 
  getBlogArticleSlugs, 
  validateBlogSlug 
} from '@/lib/blog/data';
import { 
  generateBlogArticleMetadata, 
  generateBlogArticleJsonLD, 
  generateBreadcrumbJsonLD 
} from '@/lib/blog/cache';
import type { BlogSlugParams } from '@/lib/blog/types';

/**
 * Genera parámetros estáticos para todas las rutas de artículos del blog
 * Esto permite la pre-generación en build time para mejor performance
 */
export async function generateStaticParams(): Promise<BlogSlugParams[]> {
  try {
    const slugs = await getBlogArticleSlugs();
    return slugs.map((slug) => ({
      slug
    }));
  } catch (error) {
    console.error('Error generating static params for blog articles:', error);
    return [];
  }
}

// Configuración de segmento dinámico
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidar cada hora

// Función para generar metadatos dinámicos basados en el slug del artículo
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return generateBlogArticleMetadata(params.slug);
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // Obtener datos del artículo usando el nuevo data layer
  const article = await getBlogArticleBySlug(params.slug);
  
  // Si no se encuentra el artículo, mostrar página 404
  if (!article) {
    notFound();
  }
  
  // Generar datos estructurados usando cache
  const [breadcrumbJsonLD, articleJsonLD] = await Promise.all([
    generateBreadcrumbJsonLD([
      {
        name: "Inicio",
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://utopica.io'}/`
      },
      {
        name: "Blog",
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://utopica.io'}/_blog`
      },
      {
        name: article.title,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://utopica.io'}/_blog/${article.slug}`
      }
    ]),
    generateBlogArticleJsonLD(article.slug)
  ]);

  return (
    <>
      {/* Schema.org JSON-LD optimizado */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLD)
        }}
      />
      {articleJsonLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLD)
          }}
        />
      )}
      
      {/* Componente del cliente */}
      <ArticleClient article={article} />
    </>
  );
}
