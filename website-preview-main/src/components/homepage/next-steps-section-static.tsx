import { ArrowRight } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';

export function NextStepsSectionStatic() {
  const ctaUrl = import.meta.env.PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial";

  return (
    <section className="py-24 lg:py-40 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            El siguiente paso <span className="font-serif italic">es simple.</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-4">
            30 minutos para entender tu situación, identificar tu cuello de botella y ver si tiene sentido trabajar juntos.
          </p>

          <p className="text-lg text-muted-foreground mb-10">
            Sin pitch. Sin compromiso. Solo claridad.
          </p>

          <TrackedCTAButton
            href={ctaUrl}
            target="_blank"
            trackingLocation="homepage_final_cta"
            size="lg"
            className="text-lg px-10 py-7 h-auto"
          >
            Agendar sesión de claridad
            <ArrowRight className="ml-2 h-5 w-5" />
          </TrackedCTAButton>
        </div>
      </div>
    </section>
  );
}
