import { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { BreadcrumbListSchema } from '@/components/schema-org';
import { SprintServiceSchema, FAQSchemaExtended } from '@/components/schema/service-schema';
import { preloadCriticalData } from '@/lib/server/preload';
import { PerformanceProvider } from '@/lib/providers/performance-provider';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { OptimizedSection } from '@/components/ui/optimized-section';

// ISR Configuration - Revalidate every 2 hours (7200 seconds)
// Sprint page content includes pricing and availability that may change more frequently
export const revalidate = 7200;

// Static Server Components
import { SprintProblemStatic } from '@/components/sprint/sprint-problem-static';
import { SprintComparisonStatic } from '@/components/sprint/sprint-comparison-static';

// Dynamic Client Components (with interactivity)
const SprintHero = dynamic(() => import('@/components/sprint').then(mod => ({ default: mod.SprintHero })), {
  ssr: true,
  loading: () => <div className="min-h-[90vh] bg-gradient-to-br from-primary/10 via-background to-background" />
});

const SprintProblemDeep = dynamic(() => import('@/components/sprint').then(mod => ({ default: mod.SprintProblemDeep })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-background" />
});

const SprintWhyNow = dynamic(() => import('@/components/sprint').then(mod => ({ default: mod.SprintWhyNow })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-background" />
});

const SprintFailedSolutions = dynamic(() => import('@/components/sprint').then(mod => ({ default: mod.SprintFailedSolutions })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-background" />
});

const SprintSuccessCriteria = dynamic(() => import('@/components/sprint').then(mod => ({ default: mod.SprintSuccessCriteria })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-background" />
});

const SprintProcess = dynamic(() => import('@/components/sprint').then(mod => ({ default: mod.SprintProcess })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-background" />
});

const SprintBonuses = dynamic(() => import('@/components/sprint').then(mod => ({ default: mod.SprintBonuses })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-background" />
});

const SprintOffer = dynamic(() => import('@/components/sprint').then(mod => ({ default: mod.SprintOffer })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-background" />
});

const SprintCTA = dynamic(() => import('@/components/sprint').then(mod => ({ default: mod.SprintCTA })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-background" />
});

const SprintFAQ = dynamic(() => import('@/components/sprint').then(mod => ({ default: mod.SprintFAQ })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-background" />
});

export const metadata: Metadata = {
  title: 'Sprint de Claridad Comercial | 9 Herramientas en 4 Semanas - Utópica',
  description: 'Obtén un mensaje claro y 9 herramientas probadas para que tu equipo venda sin ti. Programa intensivo de 4 semanas con garantía de resultados para fundadores B2B.',
  keywords: ['sprint claridad comercial', 'mensaje de ventas', 'storybrand', 'ventas b2b', 'libertad comercial', 'delegación ventas', 'equipo comercial', 'fundadores B2B'],
  openGraph: {
    title: 'Sprint de Claridad Comercial | Utópica',
    description: 'El único programa que instala en tu negocio un mensaje tan claro y potente que atrae a tus clientes ideales y acelera tus ventas.',
    images: [
      {
        url: '/og-sprint-claridad.jpg',
        width: 1200,
        height: 630,
        alt: 'Sprint de Claridad Comercial',
      },
    ],
  },
};

const breadcrumbItems = [
  {
    name: "Inicio",
    item: "https://utopica.net/"
  },
  {
    name: "Sprint de Claridad Comercial",
    item: "https://utopica.net/sprint-claridad-comercial"
  }
];

export default async function SprintPage() {
  // Preload critical data during SSR for better performance
  await preloadCriticalData();

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <SprintServiceSchema />
      <FAQSchemaExtended />
      <PerformanceProvider>
        <ScrollProgress />
        
        {/* Interactive Hero Section */}
        <Suspense fallback={
          <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }>
          <SprintHero />
        </Suspense>

        {/* Static Problem Section - Server Component */}
        <SprintProblemStatic />
        
        {/* Interactive sections */}
        <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
          <SprintProblemDeep />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
          <SprintWhyNow />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
          <SprintFailedSolutions />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
          <SprintSuccessCriteria />
        </Suspense>
        
        {/* Static Comparison Section - Server Component */}
        <SprintComparisonStatic />
        
        {/* Interactive sections */}
        <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
          <SprintProcess />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
          <SprintBonuses />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
          <SprintOffer />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
          <SprintCTA />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
          <SprintFAQ />
        </Suspense>
      </PerformanceProvider>
    </>
  );
}