import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryClient from './page.client';
import { BreadcrumbListSchema } from '@/components/schema-org';
import { 
  getBlogCategorySlugs, 
  getBlogArticlesByCategory, 
  getBlogCategories,
  validateCategorySlug 
} from '@/lib/blog/data';
import { 
  generateBlogCategoryMetadata, 
  generateBlogCategoryJsonLD, 
  generateBreadcrumbJsonLD 
} from '@/lib/blog/cache';
import type { CategorySlugParams } from '@/lib/blog/types';

/**
 * Genera parámetros estáticos para todas las categorías del blog
 * Esto permite la pre-generación en build time para mejor performance
 */
export async function generateStaticParams(): Promise<CategorySlugParams[]> {
  try {
    const categorySlugs = await getBlogCategorySlugs();
    return categorySlugs.map((categoria) => ({
      categoria
    }));
  } catch (error) {
    console.error('Error generating static params for blog categories:', error);
    return [];
  }
}

// Configuración de segmento dinámico
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidar cada hora

// Función para generar metadatos dinámicos basados en la categoría
export async function generateMetadata({ params }: { params: { categoria: string } }): Promise<Metadata> {
  return generateBlogCategoryMetadata(params.categoria);
}



export default async function CategoryPage({ params }: { params: { categoria: string } }) {
  // Verificar que la categoría existe
  const isValidCategory = await validateCategorySlug(params.categoria);
  if (!isValidCategory) {
    notFound();
  }
  
  // Obtener artículos por categoría y datos de la categoría
  const [articles, categories] = await Promise.all([
    getBlogArticlesByCategory(params.categoria),
    getBlogCategories()
  ]);
  
  const category = categories.find(cat => cat.slug === params.categoria);
  if (!category) {
    notFound();
  }
  
  // Generar datos estructurados usando cache
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://utopica.io';
  const [breadcrumbJsonLD, categoryJsonLD] = await Promise.all([
    generateBreadcrumbJsonLD([
      {
        name: "Inicio",
        item: `${baseUrl}/`
      },
      {
        name: "Blog",
        item: `${baseUrl}/_blog`
      },
      {
        name: category.name,
        item: `${baseUrl}/_blog/categoria/${category.slug}`
      }
    ]),
    generateBlogCategoryJsonLD(category.slug)
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
      {categoryJsonLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(categoryJsonLD)
          }}
        />
      )}
      
      {/* Componente del cliente */}
      <CategoryClient categoryName={category.name} articles={articles} />
    </>
  );
}
