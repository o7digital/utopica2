"use client";

import { motion } from 'framer-motion';
import { Star, Zap, Users, HeadphonesIcon, FileText, ArrowRight } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';

const premiumFeatures = [
  {
    icon: Users,
    title: "4 Sesiones Privadas 1-a-1 (60 min c/u)",
    description: "Trabajo directo sobre TU empresa específica"
  },
  {
    icon: FileText,
    title: "Implementación Personalizada",
    description: "No solo templates, creamos TUS documentos juntos"
  },
  {
    icon: Zap,
    title: "Revisión y perfeccionamiento en tiempo real",
    description: "Ajustes específicos para tu mercado"
  },
  {
    icon: HeadphonesIcon,
    title: "Atención Prioritaria",
    description: "Tus preguntas se responden primero"
  }
];

export function SprintPremium() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/20 rounded-full mb-6">
            <Star className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            <span className="text-sm font-medium text-amber-900 dark:text-amber-200">OPCIÓN PREMIUM</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Opción Premium: Círculo Interno</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Para fundadores que quieren implementación personalizada y resultados acelerados.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-primary/20 rounded-3xl blur-2xl" />
          
          <div className="relative bg-card rounded-3xl border-2 border-amber-200 dark:border-amber-800 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 px-8 py-6 border-b border-amber-200 dark:border-amber-800">
              <h3 className="text-2xl font-bold text-center">
                Qué incluye el Círculo Interno:
              </h3>
              <p className="text-center text-muted-foreground mt-2">
                Todo el programa grupal MÁS:
              </p>
            </div>

            <div className="p-6 sm:p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {premiumFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 flex-shrink-0">
                        <Icon className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{feature.title}</h4>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 sm:p-8 text-center"
              >
                <h4 className="text-xl sm:text-2xl font-bold mb-4">Inversión Círculo Interno</h4>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
                  <Star className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
                  <p className="text-3xl sm:text-5xl font-bold text-primary">$58,500 MXN</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">+ IVA</p>
                <p className="text-sm sm:text-base text-muted-foreground mb-2 px-2">
                  Para fundadores que valoran el tiempo y quieren resultados extraordinarios
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  <span className="font-semibold">La diferencia clave:</span> Mientras el grupo trabaja con plantillas, tú y yo creamos juntos cada pieza de tu sistema comercial, adaptada perfectamente a tu negocio.
                </p>
                
                <TrackedCTAButton
                  href={process.env.NEXT_PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial"}
                  target="_blank"
                  trackingLocation="sprint_premium"
                  size="lg" 
                  className="text-sm sm:text-base px-4 sm:px-8 w-full sm:w-auto"
                  variant="default"
                >
                  Aplicar al Círculo Interno
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 inline" />
                </TrackedCTAButton>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Solo 2 de los 5 lugares totales • Requiere entrevista previa
          </p>
        </motion.div>
      </div>
    </section>
  );
}