import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';

export function ReunionesCTA() {
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
            Descubre si este modelo funciona para tu negocio
          </h2>

          <p className="text-xl text-muted-foreground mb-10">
            En 30 minutos evaluamos tu mercado, tu oferta y tu capacidad de cierre — y te decimos con honestidad si esto es para ti.
          </p>

          <TrackedCTAButton
            href={ctaUrl}
            target="_blank"
            trackingLocation="reuniones_final_cta"
            size="lg"
            className="text-base px-8 py-6 h-auto bg-primary hover:bg-primary/80"
          >
            Agendar evaluación
            <ArrowRight className="ml-2 h-5 w-5" />
          </TrackedCTAButton>
        </motion.div>
      </div>
    </section>
  );
}
