import { Metadata } from 'next';
import { metadata as pageMetadata } from './metadata';
import HomePage from './page.client';
import { OrganizationSchema, WebsiteSchema, BreadcrumbListSchema } from '@/components/schema-org';

// Exportar los metadatos para Next.js
export const metadata: Metadata = pageMetadata;

// Datos para los esquemas de Schema.org
const breadcrumbItems = [
  {
    name: "Inicio",
    item: "https://utopica.net/"
  }
];

export default function HomePageServer() {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <OrganizationSchema />
      <WebsiteSchema />
      <BreadcrumbListSchema items={breadcrumbItems} />
      
      {/* Componente del cliente */}
      <HomePage />
    </>
  );
}
