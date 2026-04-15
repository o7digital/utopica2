import { motion } from 'framer-motion';
import { Calendar, AlertCircle, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Lang = 'es' | 'en';

const urgencyReasons = {
  es: [
    {
      icon: DollarSign,
      title: "El Costo de Oportunidad está Creciendo",
      description: "Cada mes sin claridad comercial representa oportunidades perdidas que nunca recuperarás. Mientras dudas, tus competidores están cerrando los clientes que deberían ser tuyos.",
      insight: "Si pierdes solo 2 clientes potenciales al mes por falta de claridad, son 24 oportunidades al año que nunca volverán.",
      highlight: "El Sprint se paga con UN solo cliente nuevo"
    },
    {
      icon: Users,
      title: "Tu Competencia También Está Buscando Diferenciarse",
      description: "El mercado B2B está saturado de mensajes genéricos. La ventana para posicionarte como el experto claro en tu nicho se está cerrando rápidamente.",
      insight: "El 67% de compradores B2B ya tienen un favorito antes de hablar contigo",
      highlight: "Ser el primero en comunicar con claridad = ventaja competitiva duradera"
    },
    {
      icon: Calendar,
      title: "El Momento Psicológico Es Ahora",
      description: "Ya identificaste el problema. Ya sabes que necesitas claridad. Posponer la decisión no te acerca a la solución - solo prolonga el dolor que ya conoces demasiado bien.",
      insight: "El costo emocional de saber que podrías estar mejor pero no actuar",
      highlight: "La claridad que buscas está a solo 4 semanas de distancia"
    }
  ],
  en: [
    {
      icon: DollarSign,
      title: "Opportunity Cost Is Growing",
      description: "Every month without commercial clarity means lost opportunities you will never recover. While you hesitate, competitors close the clients that should be yours.",
      insight: "Losing just 2 potential clients per month for lack of clarity is 24 opportunities a year you never get back.",
      highlight: "The Sprint pays for itself with ONE new client"
    },
    {
      icon: Users,
      title: "Your Competition Is Also Differentiating",
      description: "The B2B market is saturated with generic messages. The window to position yourself as the clear expert in your niche is closing fast.",
      insight: "67% of B2B buyers already have a favorite before talking to you.",
      highlight: "Being first to communicate clearly = durable competitive advantage"
    },
    {
      icon: Calendar,
      title: "The Psychological Moment Is Now",
      description: "You've identified the problem. You know you need clarity. Postponing doesn't move you closer to the solution—it only prolongs the pain you already know.",
      insight: "The emotional cost of knowing you could be better and not acting",
      highlight: "The clarity you want is only 4 weeks away"
    }
  ]
};

const copy = {
  es: {
    badge: 'DECISIÓN CRÍTICA',
    line1: 'Cada Mes Sin Claridad',
    line2: 'Son Ventas Perdidas Que Nunca Recuperarás',
    description: 'Mientras dudas, tus competidores están cerrando los clientes que deberían ser tuyos.',
    ctaTitle: 'La Pregunta No Es "¿Debería Hacerlo?"',
    ctaSubtitlePrefix: 'La pregunta es:',
    ctaSubtitleBold: '¿Cuánto más estás dispuesto a perder antes de actuar?',
    stats: [
      { value: '2-3 clientes', label: 'Perdidos cada mes por falta de claridad' },
      { value: '6 meses', label: 'Tiempo promedio intentando resolver solo' },
      { value: 'Hoy', label: 'El mejor momento para empezar a cambiar' },
    ],
    button: 'Quiero Reservar Mi Lugar Ahora',
  },
  en: {
    badge: 'CRITICAL DECISION',
    line1: 'Every Month Without Clarity',
    line2: 'Is Revenue Lost Forever',
    description: 'While you hesitate, competitors are closing the clients that should be yours.',
    ctaTitle: 'The question isn’t "Should I do it?"',
    ctaSubtitlePrefix: 'The question is:',
    ctaSubtitleBold: 'How much more are you willing to lose before acting?',
    stats: [
      { value: '2-3 clients', label: 'Lost each month because of unclear messaging' },
      { value: '6 months', label: 'Average time founders spend trying alone' },
      { value: 'Today', label: 'The best moment to start changing' },
    ],
    button: 'I Want to Reserve My Spot Now',
  },
} as const;

export function SprintWhyNow({ lang = 'es' }: { lang?: Lang }) {
  const t = copy[lang];
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-6">
            <AlertCircle className="h-5 w-5" />
            <span className="font-semibold">{t.badge}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">{t.line1}</span>
            <span className="block text-primary">{t.line2}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        <div className="space-y-8 mb-16">
          {urgencyReasons[lang].map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-full bg-primary/10 flex-shrink-0">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">
                      Razón #{index + 1}: {reason.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {reason.description}
                    </p>
                    
                    {reason.insight && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <p className="text-base italic">{reason.insight}</p>
                      </div>
                    )}
                    
                    <p className="text-lg font-semibold text-primary">
                      → {reason.highlight}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border-2 border-primary/20 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">{t.ctaTitle}</h3>
          <p className="text-xl text-muted-foreground mb-6">
            {t.ctaSubtitlePrefix} <span className="font-semibold">{t.ctaSubtitleBold}</span>
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {t.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            {t.button}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
