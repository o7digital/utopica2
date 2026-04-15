import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';

export function EquipoAumentadoHero() {
  const ctaUrl = import.meta.env.PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial";

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5/50 via-background to-background overflow-hidden"
      aria-labelledby="equipo-aumentado-hero-title"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-primary/10/30 animate-blob" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-primary/10/20 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            id="equipo-aumentado-hero-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Contrataste seniors, compraste cursos,</span>
            <span className="block mt-2">implementaste CRM.</span>
            <span className="block mt-2 text-primary">Y las ventas siguen dependiendo de ti.</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            No necesitas más gente. Necesitas aumentar a la que ya tienes.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <TrackedCTAButton
              href={ctaUrl}
              target="_blank"
              trackingLocation="equipo_aumentado_hero"
              size="lg"
              className="text-base px-8 py-6 h-auto bg-primary hover:bg-primary/80"
            >
              Agendar diagnóstico
              <ArrowRight className="ml-2 h-5 w-5" />
            </TrackedCTAButton>
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
