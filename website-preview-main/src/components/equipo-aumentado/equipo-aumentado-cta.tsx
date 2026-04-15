import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';

export function EquipoAumentadoCTA() {
  const ctaUrl = import.meta.env.PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial";

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Obtén un diagnóstico de tu proceso comercial
          </h2>

          <p className="text-xl text-muted-foreground mb-10">
            En 30 minutos identificamos dónde está tu cuello de botella y qué opciones tienes — trabajemos juntos o no.
          </p>

          <TrackedCTAButton
            href={ctaUrl}
            target="_blank"
            trackingLocation="equipo_aumentado_final_cta"
            size="lg"
            className="text-base px-8 py-6 h-auto bg-primary hover:bg-primary/80"
          >
            Agendar diagnóstico
            <ArrowRight className="ml-2 h-5 w-5" />
          </TrackedCTAButton>
        </motion.div>
      </div>
    </section>
  );
}
