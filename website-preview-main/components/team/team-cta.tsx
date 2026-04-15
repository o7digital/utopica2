import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';

export const TeamCTA = () => {
  return (
    <section className="py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="block">Conoce el Poder de</span>
            <span className="block text-primary">Nuestro Ecosistema</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedCTAButton
              href={process.env.NEXT_PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial"}
              target="_blank"
              trackingLocation="team_cta"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Agendar Sesión de Claridad
              <ArrowRight className="ml-2 h-5 w-5" />
            </TrackedCTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};