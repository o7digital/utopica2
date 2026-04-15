import { motion } from 'framer-motion';
import { AlertTriangle, Zap, Users, Sparkles } from 'lucide-react';

type Lang = 'es' | 'en';

const criteria = {
  es: [
    {
      icon: Zap,
      title: "Velocidad de Implementación",
      requirement: "Máximo 4 semanas de principio a fin",
      why: "Porque cada mes sin claridad son ventas perdidas que nunca recuperarás",
      withoutThis: "Sin velocidad → 6-12 meses de prueba y error mientras pierdes mercado",
      whyEssential: "El tiempo es tu recurso más valioso. Cada día cuenta."
    },
    {
      icon: Users,
      title: "Perspectiva Externa + Grupo de Pares",
      requirement: "Vista desde fuera + otros fundadores en tu situación",
      why: "Porque cuando estás dentro del frasco, no puedes leer la etiqueta",
      withoutThis: "Sin perspectiva → Sigues repitiendo los mismos errores sin darte cuenta",
      whyEssential: "Somos los últimos en ver nuestros puntos ciegos."
    },
    {
      icon: Sparkles,
      title: "Implementación Práctica Lista",
      requirement: "Herramientas funcionales, no solo teoría",
      why: "Porque necesitas un sistema funcionando, no otro PDF en tu disco duro",
      withoutThis: "Sin implementación → Buenas ideas que nunca se materializan",
      whyEssential: "La diferencia entre saber y hacer es... hacer."
    }
  ],
  en: [
    {
      icon: Zap,
      title: "Implementation Speed",
      requirement: "Maximum 4 weeks end to end",
      why: "Every month without clarity is revenue you never recover.",
      withoutThis: "Without speed → 6–12 months of trial and error while you lose market share",
      whyEssential: "Time is your most valuable resource. Every day counts."
    },
    {
      icon: Users,
      title: "External Perspective + Peer Group",
      requirement: "Outside view + other founders in your situation",
      why: "When you're inside the jar, you can't read the label.",
      withoutThis: "Without perspective → you keep repeating the same mistakes without noticing",
      whyEssential: "We're the last to see our own blind spots."
    },
    {
      icon: Sparkles,
      title: "Ready-to-Use Implementation",
      requirement: "Working tools, not just theory",
      why: "You need a system that works, not another PDF in your drive.",
      withoutThis: "Without implementation → good ideas that never materialize",
      whyEssential: "The difference between knowing and doing is… doing."
    }
  ]
};

const copy = {
  es: {
    badge: 'CRITERIOS DE ÉXITO',
    line1: 'Los 3 Criterios Que Cualquier Solución',
    line2: 'DEBE Cumplir (O Fracasará)',
    description:
      'Después de intentar múltiples caminos, ya sabes que no todas las soluciones son iguales. Estos son los 3 criterios que separan las promesas vacías de los resultados reales.',
    truthTitle: 'La Verdad Incómoda',
    truthText:
      'La mayoría de las "soluciones" fallan en al menos uno de estos criterios. Y un criterio faltante es suficiente para que todo falle.',
    truthBlocks: [
      { title: 'Sin Velocidad', text: '= Pérdidas acumuladas' },
      { title: 'Sin Perspectiva', text: '= Puntos ciegos fatales' },
      { title: 'Sin Implementación', text: '= Buenas intenciones inútiles' },
    ],
    bottomLine: 'Necesitas los 3. Sin excepción. Sin compromiso.',
    labels: {
      criterion: 'Criterio',
      critical: 'Por qué es crítico:',
      nonNegotiable: 'Por qué no es negociable:',
      without: 'Sin este criterio:',
    },
  },
  en: {
    badge: 'SUCCESS CRITERIA',
    line1: 'The 3 Criteria Every Solution',
    line2: 'MUST Meet (Or It Fails)',
    description:
      'After trying multiple paths, you know not all solutions are equal. These are the 3 criteria that separate empty promises from real results.',
    truthTitle: 'The Uncomfortable Truth',
    truthText:
      'Most "solutions" fail at least one of these criteria. Missing even one is enough for everything to fail.',
    truthBlocks: [
      { title: 'No Speed', text: '= Compounding losses' },
      { title: 'No Perspective', text: '= Fatal blind spots' },
      { title: 'No Implementation', text: '= Useless good intentions' },
    ],
    bottomLine: 'You need all 3. No exceptions. No compromise.',
    labels: {
      criterion: 'Criterion',
      critical: "Why it's critical:",
      nonNegotiable: "Why it's non-negotiable:",
      without: 'Without this criterion:',
    },
  },
} as const;

export function SprintSuccessCriteria({ lang = 'es' }: { lang?: Lang }) {
  const t = copy[lang];
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="h-5 w-5" />
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
          {criteria[lang].map((criterion, index) => {
            const Icon = criterion.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl border shadow-lg overflow-hidden"
              >
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Left side - The criterion */}
                  <div className="lg:col-span-3 p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {t.labels.criterion} #{index + 1}: {criterion.title}
                        </h3>
                        <p className="text-lg font-medium text-foreground">
                          {criterion.requirement}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 ml-16">
                      <div>
                        <p className="font-semibold text-primary mb-1">{t.labels.critical}</p>
                        <p className="text-muted-foreground">{criterion.why}</p>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-primary mb-1">{t.labels.nonNegotiable}</p>
                        <p className="text-muted-foreground">{criterion.whyEssential}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Without this */}
                  <div className="lg:col-span-2 bg-destructive/5 p-8 border-l">
                    <h4 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      {t.labels.without}
                    </h4>
                    <p className="text-muted-foreground">
                      {criterion.withoutThis}
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
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-200 text-center">
            <h3 className="text-2xl font-bold mb-4">{t.truthTitle}</h3>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
              {t.truthText}
            </p>
                <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {t.truthBlocks.map((block, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-destructive">{block.title}</p>
                  <p className="text-sm text-muted-foreground">{block.text}</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-semibold mt-6">
              {t.bottomLine}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
