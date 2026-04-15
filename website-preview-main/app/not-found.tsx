import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Página No Encontrada</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Parece que te has perdido en el camino hacia la claridad comercial. 
          No te preocupes, te ayudamos a encontrar el rumbo.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            Volver al Inicio
          </Link>
          
          <div className="mt-8">
            <p className="text-muted-foreground mb-4">
              O mejor aún, agenda una sesión gratuita y descubre cómo lograr libertad comercial:
            </p>
            <TrackedCTAButton
              href={process.env.NEXT_PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial"}
              target="_blank"
              trackingLocation="404_page"
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Agendar Sesión de Claridad
              <ArrowRight className="ml-2 h-5 w-5" />
            </TrackedCTAButton>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-muted">
          <h3 className="font-semibold mb-4">Enlaces útiles:</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/sprint-claridad-comercial" className="text-primary hover:underline">
              Sprint de Claridad
            </Link>
            <Link href="/equipo" className="text-primary hover:underline">
              Conoce al Equipo
            </Link>
            <Link href="/servicios" className="text-primary hover:underline">
              Servicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}