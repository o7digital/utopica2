import { Metadata } from 'next';
import { metadata as pageMetadata } from './metadata';
import EquipoPageClient from './page.client';
import { BreadcrumbListSchema } from '@/components/schema-org';

export const metadata: Metadata = pageMetadata;

// ISR Configuration - Revalidate every 24 hours (86400 seconds)
// Team page content is relatively static (changes occasionally)
export const revalidate = 86400;

const breadcrumbItems = [
  {
    name: "Inicio",
    item: "https://utopica.net/"
  },
  {
    name: "Equipo",
    item: "https://utopica.net/equipo"
  }
];

export default function EquipoPageServer() {
  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <EquipoPageClient />
    </>
  );
}