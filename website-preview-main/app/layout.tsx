import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { SkipLink } from '@/components/ui/skip-link';
import { constructMetadata } from '@/lib/seo';
import { OrganizationSchema, WebsiteSchema, BreadcrumbListSchema } from '@/components/schema-org';
import { LocalBusinessSchema, PersonSchema } from '@/components/schema/local-business-schema';
import { Analytics } from '@/components/analytics';
import { PageTracking } from '@/components/analytics/page-tracking';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { UniversalCriticalResources } from '@/components/performance/critical-resources';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

export const metadata = constructMetadata({
  title: 'Libertad Comercial para Fundadores B2B | Sprint de Claridad - Utópica',
  description: 'Obtén un mensaje claro y 9 herramientas probadas para que tu equipo venda sin ti. Sprint de 4 semanas con garantía de resultados. Para fundadores que facturan +$50k USD/mes.',
  keywords: [
    'claridad comercial',
    'ventas B2B',
    'fundadores B2B',
    'libertad comercial',
    'mensaje de ventas',
    'equipo de ventas',
    'consultoría ventas',
    'sprint comercial',
    'delegación ventas',
    'escalamiento B2B'
  ],
  url: 'https://utopica.net'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <UniversalCriticalResources pageType="homepage" />
      </head>
      <body className={inter.className}>
        {/* Analytics */}
        <Suspense fallback={null}>
          <Analytics />
          <PageTracking />
        </Suspense>
        
        {/* Schema.org JSON-LD */}
        <OrganizationSchema />
        <WebsiteSchema />
        <LocalBusinessSchema />
        <PersonSchema />
        <BreadcrumbListSchema items={[{ name: "Inicio", item: "https://utopica.net/" }]} />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SkipLink />
          
          <ErrorBoundary 
            level="section" 
            context="navigation"
            enableRecovery={true}
          >
            <Navigation />
          </ErrorBoundary>
          
          <main id="main-content" className="min-h-screen">
            <ErrorBoundary 
              level="page" 
              context="main-content"
              enableRecovery={true}
            >
              {children}
            </ErrorBoundary>
          </main>
          
          <ErrorBoundary 
            level="section" 
            context="footer"
            enableRecovery={false}
          >
            <Footer />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
