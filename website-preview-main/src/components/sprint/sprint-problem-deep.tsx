import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Target, Lock } from 'lucide-react';

type Lang = 'es' | 'en';

const consequences = {
  es: [
    {
      icon: Target,
      title: "El doble de esfuerzo, la mitad del resultado",
      description: "Necesitas 10 reuniones donde otros cierran con 5. Tu equipo se quema trabajando el doble para facturar menos. Cada venta es una batalla épica cuando debería ser una conversación natural.",
      impact: "Impacto: Equipo agotado, resultados mediocres"
    },
    {
      icon: TrendingDown,
      title: "Estás entrenando al mercado a no valorarte",
      description: "Cada descuento que das para cerrar establece un precedente. Tu reputación se está convirtiendo en 'el barato' no 'el experto'. Los clientes esperan descuentos porque tú los acostumbraste.",
      impact: "Impacto: Márgenes que desaparecen, reputación dañada"
    },
    {
      icon: Lock,
      title: "Tu conocimiento es una prisión dorada",
      description: "Solo tú puedes vender = nunca podrás crecer ni tomar vacaciones. Has creado un trabajo disfrazado de empresa. Tu valor está atrapado en tu cabeza, no en tu negocio.",
      impact: "Impacto: Negocio que no puede escalar ni venderse"
    }
  ],
  en: [
    {
      icon: Target,
      title: "Double the effort, half the result",
      description: "You need 10 meetings where others close in 5. Your team burns twice as hard to bill less. Every sale is an epic battle when it should be a natural conversation.",
      impact: "Impact: Exhausted team, mediocre results"
    },
    {
      icon: TrendingDown,
      title: "You're training the market not to value you",
      description: `Every discount you give sets a precedent. Your reputation is becoming "the cheap one" not "the expert." Clients expect discounts because you taught them to.`,
      impact: "Impact: Disappearing margins, damaged reputation"
    },
    {
      icon: Lock,
      title: "Your knowledge is a gilded cage",
      description: "Only you can sell = no growth and no vacations. You've built a job disguised as a company. Your value is trapped in your head, not in the business.",
      impact: "Impact: A business that can't scale or be sold"
    }
  ]
};

const headers = {
  es: {
    badge: 'LA VERDAD INCÓMODA',
    line1: 'Trabajas el Doble para Ganar la Mitad',
    line2: 'Y Cada Mes Es Peor',
    description:
      'La "injusticia comercial" no es solo frustrante. Es una hemorragia silenciosa que está matando el potencial de tu negocio.',
    questionTitle: 'La Pregunta del Millón:',
    questionText: '¿Cuánto más estás dispuesto a perder antes de hacer algo al respecto?',
    warningPrefix: 'Cada mes que pasa sin claridad',
    warningSuffix: 'es dinero, tiempo y oportunidades que nunca recuperarás.',
  },
  en: {
    badge: 'THE UNCOMFORTABLE TRUTH',
    line1: 'You Work Twice to Earn Half',
    line2: 'And Every Month It Gets Worse',
    description:
      `The "commercial injustice" isn't just frustrating. It's a silent bleed that's killing your business potential.`,
    questionTitle: 'The Million-Dollar Question:',
    questionText: 'How much longer are you willing to lose before you do something about it?',
    warningPrefix: 'Every month without clarity',
    warningSuffix: 'is money, time, and opportunities you will never get back.',
  },
} as const;

export function SprintProblemDeep({ lang = 'es' }: { lang?: Lang }) {
  const t = headers[lang];
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
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

        <div className="space-y-8">
          {consequences[lang].map((consequence, index) => {
            const Icon = consequence.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-full bg-muted flex-shrink-0">
                    <Icon className="h-8 w-8 text-foreground" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{consequence.title}</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {consequence.description}
                    </p>
                    <p className="text-base font-semibold text-primary">
                      {consequence.impact}
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
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">{t.questionTitle}</h3>
            <p className="text-xl text-muted-foreground mb-6">
              {t.questionText}
            </p>
            <p className="text-lg">
              <span className="font-semibold">{t.warningPrefix}</span> {t.warningSuffix}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
