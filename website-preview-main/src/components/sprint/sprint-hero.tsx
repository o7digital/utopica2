import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Calendar, Users } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';

type Lang = 'es' | 'en';

const copy = {
  es: {
    badge: 'Próximo grupo en Enero 2026',
    titleTop: 'Haces un Servicio Extraordinario',
    titleBottom: 'Pero Nadie lo Sabe',
    description: 'Es hora de que el mercado entienda por qué tus clientes actuales te recomiendan tanto',
    messageLabel: 'En 4 semanas construyes un mensaje',
    bullets: [
      { strong: 'Claro', text: 'como el agua' },
      { strong: 'Relevante', text: 'para tu cliente ideal' },
      { strong: 'Único', text: 'imposible de copiar' },
    ],
    resultsLabel: 'Que logra',
    results: ['Generar curiosidad genuina', 'Atraer clientes ideales', 'Acelerar tu ciclo de ventas'],
    spots: 'Solo 5 lugares por grupo',
    cta: 'Agendar Sesión de Claridad',
    investment: 'Inversión: $32,500 MXN + IVA • Garantía: Trabajo hasta lograr tu Claridad',
  },
  en: {
    badge: 'Next cohort in January 2026',
    titleTop: 'You Deliver an Extraordinary Service',
    titleBottom: 'But Nobody Knows It',
    description: 'It is time the market understands why your current clients recommend you so much.',
    messageLabel: 'In 4 weeks you craft a message',
    bullets: [
      { strong: 'Clear', text: 'as water' },
      { strong: 'Relevant', text: 'for your ideal client' },
      { strong: 'Unique', text: 'impossible to copy' },
    ],
    resultsLabel: 'What it achieves',
    results: ['Spark genuine curiosity', 'Attract ideal clients', 'Speed up your sales cycle'],
    spots: 'Only 5 spots per cohort',
    cta: 'Book a Clarity Session',
    investment: 'Investment: $32,500 MXN + VAT • Guarantee: We work until you get clarity',
  },
} as const;

export function SprintHero({ lang = 'es' }: { lang?: Lang }) {
  const t = copy[lang];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background pt-20"
      aria-labelledby="sprint-hero-title"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-primary/5 animate-blob" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-primary/3 animate-blob animation-delay-2000" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
          >
            <Calendar className="h-5 w-5" />
            <span className="font-semibold">{t.badge}</span>
          </motion.div>
          
          <motion.h1 
            id="sprint-hero-title"
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">{t.titleTop}</span>
            <span className="block mt-2 text-primary">
              {t.titleBottom}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.description}
          </motion.p>

          <motion.div 
            className="max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-card/50 backdrop-blur rounded-xl p-6 border border-primary/20">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{t.messageLabel}</p>
                  <ul className="space-y-2">
                    {t.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true"></div>
                        <span className="font-semibold">{bullet.strong}</span>
                        <span className="text-sm text-muted-foreground">{bullet.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-l border-primary/20 pl-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{t.resultsLabel}</p>
                  <ul className="space-y-2">
                    {t.results.map((result, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                        <span className="text-sm">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-flex items-center gap-2 text-lg mb-6"
          >
            <Users className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">{t.spots}</span>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <TrackedCTAButton
              href={import.meta.env.PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial"}
              target="_blank"
              trackingLocation="sprint_hero"
              size="lg"
              className="text-base px-8 py-6 h-auto bg-primary hover:bg-primary/90"
            >
              {t.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </TrackedCTAButton>
          </motion.div>
          
          <motion.p
            className="mt-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {t.investment}
          </motion.p>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  );
}
