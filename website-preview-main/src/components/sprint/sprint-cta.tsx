import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';

type Lang = 'es' | 'en';

const copy = {
  es: {
    badge: 'GARANTÍA: Trabajo hasta lograr tu Claridad Comercial',
    heading1: '¿Listo para Terminar con la',
    heading2: 'Injusticia Comercial?',
    description:
      'No necesitas otro curso o consultor. Necesitas claridad. En 4 semanas terminas con la injusticia comercial de una vez por todas.',
    cardTitle: 'Empieza con una Sesión de Claridad',
    cardSubtitle: '20 minutos para evaluar si el Sprint es para ti',
    steps: [
      {
        title: 'Conversamos sobre tu situación comercial',
        desc: 'Identificamos por qué tu calidad no se refleja en ventas',
      },
      {
        title: 'Evaluamos si el Sprint puede ayudarte',
        desc: 'Sin compromisos, solo honestidad sobre el camino',
      },
      {
        title: 'Decides con total claridad',
        desc: 'Sin compromiso • Solo hablamos si tiene sentido para ambos',
      },
    ],
    cta: 'Agendar Sesión de Claridad',
    footer: 'Sin compromiso • Solo hablamos si tiene sentido para ambos',
    quote:
      '"La calidad de tu producto te da el derecho a competir, pero no te garantiza la victoria. Para ganar, necesitas un mensaje que le haga justicia a tu servicio."',
    author: '— Gaël Thomé, Fundador de Utópica',
  },
  en: {
    badge: 'GUARANTEE: We work until you get Commercial Clarity',
    heading1: 'Ready to End',
    heading2: 'Commercial Injustice?',
    description:
      `You don't need another course or consultant. You need clarity. In 4 weeks you end commercial injustice once and for all.`,
    cardTitle: `Start with a Clarity Session`,
    cardSubtitle: '20 minutes to see if the Sprint is for you',
    steps: [
      {
        title: 'We discuss your commercial injustice',
        desc: 'We identify why your quality is not reflected in sales',
      },
      {
        title: 'We assess if the Sprint can help',
        desc: 'No commitments—just honesty about the path',
      },
      {
        title: 'You decide with full clarity',
        desc: 'No obligation • We only proceed if it makes sense for both',
      },
    ],
    cta: 'Book a Clarity Session',
    footer: 'No obligation • We only talk if it makes sense for both',
    quote:
      '"The quality of your product gives you the right to compete, but it does not guarantee victory. To win, you need a message that does justice to your service."',
    author: '— Gaël Thomé, Founder of Utópica',
  },
} as const;

export function SprintCTA({ lang = 'es' }: { lang?: Lang }) {
  const t = copy[lang];
  const calendlyUrl = import.meta.env.PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial";
  
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
            <span>{t.badge}</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">{t.heading1}</span>
            <span className="block text-primary">{t.heading2}</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t.description}
          </p>

          <div className="bg-card rounded-2xl p-8 shadow-xl border mb-8">
            <h3 className="text-2xl font-bold mb-6">{t.cardTitle}</h3>
            <p className="text-lg text-muted-foreground mb-6">{t.cardSubtitle}</p>
            
            <div className="space-y-4 text-left max-w-md mx-auto mb-8">
              {t.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <TrackedCTAButton
              href={calendlyUrl}
              target="_blank"
              trackingLocation="sprint_cta_final"
              size="lg" 
              className="w-full text-base sm:text-lg py-4 sm:py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              {t.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </TrackedCTAButton>
            
            <p className="text-sm text-muted-foreground mt-4">
              {t.footer}
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
              {t.quote}
            </p>
            <p className="text-sm text-primary font-semibold mt-2">
              {t.author}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
