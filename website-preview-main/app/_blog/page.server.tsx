import { Metadata } from 'next';
import { metadata as pageMetadata } from './metadata';
import BlogClient from './page.client';
import { BreadcrumbListSchema, WebsiteSchema } from '@/components/schema-org';

// Exportar los metadatos para Next.js
export const metadata: Metadata = pageMetadata;

// ISR Configuration - Revalidate every 4 hours (14400 seconds)
// Blog listings may have new posts added semi-frequently
export const revalidate = 14400;

// Datos para los esquemas de Schema.org
const breadcrumbItems = [
  {
    name: "Inicio",
    item: "https://utopica.io/"
  },
  {
    name: "Blog",
    item: "https://utopica.io/blog"
  }
];

// Datos para el esquema de Blog
const blogData = {
  name: "Blog de Utópica",
  description: "Artículos, guías y recursos sobre venta consultiva, IA en ventas y transformación comercial B2B.",
  url: "https://utopica.io/blog",
  publisher: {
    name: "Utópica",
    url: "https://utopica.io",
    logo: "https://utopica.io/images/Utopica Logo.svg"
  }
};

export default function BlogPage() {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <BreadcrumbListSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: blogData.name,
            description: blogData.description,
            url: blogData.url,
            publisher: {
              "@type": "Organization",
              name: blogData.publisher.name,
              url: blogData.publisher.url,
              logo: {
                "@type": "ImageObject",
                url: blogData.publisher.logo
              }
            }
          })
        }}
      />
      
      {/* Componente del cliente */}
      <BlogClient />
    </>
  );
}
