"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';

export function SprintCTA() {
  const calendlyUrl = process.env.NEXT_PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial";
  
  return (
    <section id="sprint-cta" className="min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold mb-8 shadow-lg text-sm sm:text-base"
          >
            <Shield className="h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0" />
            <span>GARANTÍA: Trabajo hasta lograr tu Claridad Comercial</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">¿Listo para Terminar con la</span>
            <span className="block text-primary">Injusticia Comercial?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            No necesitas otro curso o consultor. Necesitas claridad.
            En 4 semanas terminas con la injusticia comercial de una vez por todas.
          </p>

          <div className="bg-card rounded-2xl p-8 shadow-xl border mb-8">
            <h3 className="text-2xl font-bold mb-6">Empieza con una Sesión de Claridad</h3>
            <p className="text-lg text-muted-foreground mb-6">20 minutos para evaluar si el Sprint es para ti</p>
            
            <div className="space-y-4 text-left max-w-md mx-auto mb-8">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <p className="font-semibold">Conversamos sobre tu injusticia comercial</p>
                  <p className="text-sm text-muted-foreground">Identificamos por qué tu calidad no se refleja en ventas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <p className="font-semibold">Evaluamos si el Sprint puede ayudarte</p>
                  <p className="text-sm text-muted-foreground">Sin compromisos, solo honestidad sobre el camino</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <p className="font-semibold">Decides con total claridad</p>
                  <p className="text-sm text-muted-foreground">Sin compromiso • Solo hablamos si tiene sentido para ambos</p>
                </div>
              </div>
            </div>
            
            <TrackedCTAButton
              href={calendlyUrl}
              target="_blank"
              trackingLocation="sprint_cta_final"
              size="lg" 
              className="w-full text-base sm:text-lg py-4 sm:py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              Agendar Sesión de Claridad
              <ArrowRight className="ml-2 h-5 w-5" />
            </TrackedCTAButton>
            
            <p className="text-sm text-muted-foreground mt-4">
              Sin compromiso • Solo hablamos si tiene sentido para ambos
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-lg text-muted-foreground italic">
              "La calidad de tu producto te da el derecho a competir, pero no te garantiza la victoria. 
              Para ganar, necesitas un mensaje que le haga justicia a tu servicio."
            </p>
            <p className="text-sm text-primary font-semibold mt-2">
              — Gaël Thomé, Fundador de Utópica
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}