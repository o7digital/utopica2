"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, FileSearch } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';
import Link from 'next/link';

export function NextStepsSection() {
  const calendlyUrl = process.env.NEXT_PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial";
  
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">El mercado premia a quienes comunican mejor,</span>
            <span className="block text-primary">no necesariamente a quienes trabajan mejor.</span>
            <span className="block mt-2">Es momento de cambiar eso.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Si estás listo para que tu mensaje esté a la altura de tu trabajo, tu primer paso es aquí.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              Empieza con el Sprint
            </h3>
            
            <div className="space-y-3 mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold">Para ti si:</span> Sabes que tu mensaje te está frenando y quieres resultados en 4 semanas.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-4">
                <p className="text-sm font-semibold">4 semanas para transformar tu mensaje</p>
              </div>
              
              <TrackedCTAButton
                href="/sprint-claridad-comercial"
                trackingLocation="next_steps_ready"
                size="lg"
                className="w-full"
              >
                Conocer el Sprint de 4 Semanas
                <ArrowRight className="ml-2 h-5 w-5" />
              </TrackedCTAButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 border hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <FileSearch className="h-8 w-8 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              Empieza con un Diagnóstico
            </h3>
            
            <div className="space-y-3 mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold">Para ti si:</span> Prefieres un análisis de tu situación actual antes de comprometerte.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm font-semibold text-blue-700">30 minutos para evaluar tu situación</p>
              </div>
              
              <TrackedCTAButton
                href={calendlyUrl}
                target="_blank"
                trackingLocation="next_steps_audit"
                size="lg" 
                className="w-full"
              >
                Agendar Llamada
                <ArrowRight className="ml-2 h-5 w-5" />
              </TrackedCTAButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}