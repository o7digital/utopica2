import { Zap, Users, Sparkles, ArrowRight } from 'lucide-react';

type Lang = 'es' | 'en';

const ourApproach = {
  es: [
    {
      criterion: "Velocidad de Implementación",
      icon: Zap,
      requirement: "Máximo 4 semanas",
      howWeDo: "Sprint intensivo de 4 semanas exactas",
      whyDifferent: "12 sesiones grupales (3 por semana) que mantienen momentum y evitan procrastinación. Metodología probada que elimina pasos innecesarios.",
      result: "En 30 días tienes todo funcionando"
    },
    {
      criterion: "Perspectiva Externa + Pares",
      icon: Users,
      requirement: "Vista desde fuera + apoyo de iguales",
      howWeDo: "Grupos de máximo 5 empresas no competidoras",
      whyDifferent: "Combinamos facilitación experta con feedback de otros fundadores B2B enfrentando retos similares. No puedes leer la etiqueta desde dentro del frasco.",
      result: "Claridad que solo viene de perspectiva externa"
    },
    {
      criterion: "Implementación Práctica",
      icon: Sparkles,
      requirement: "Herramientas listas para usar",
      howWeDo: "9 activos comerciales creados durante el Sprint",
      whyDifferent: "No terminamos con un PDF bonito. Saldrás con elevator pitch, one-pager, presentación, scripts, propuestas, emails, LinkedIn optimizado, landing y FAQ comercial.",
      result: "Sistema completo funcionando desde el día 1"
    }
  ],
  en: [
    {
      criterion: "Implementation Speed",
      icon: Zap,
      requirement: "Maximum 4 weeks",
      howWeDo: "Intensive 4-week sprint",
      whyDifferent: "12 group sessions (3 per week) keep momentum and avoid procrastination. Proven methodology that removes unnecessary steps.",
      result: "In 30 days you have everything running"
    },
    {
      criterion: "External Perspective + Peers",
      icon: Users,
      requirement: "Outside view + peer support",
      howWeDo: "Groups of up to 5 non-competing companies",
      whyDifferent: "We combine expert facilitation with feedback from other B2B founders facing similar challenges. You can't read the label from inside the jar.",
      result: "Clarity that only comes from outside perspective"
    },
    {
      criterion: "Practical Implementation",
      icon: Sparkles,
      requirement: "Ready-to-use tools",
      howWeDo: "9 commercial assets created during the Sprint",
      whyDifferent: "We don't end with a pretty PDF. You leave with elevator pitch, one-pager, deck, scripts, proposals, emails, optimized LinkedIn, landing page, and sales FAQ.",
      result: "Complete system running from day one"
    }
  ]
};

const copy = {
  es: {
    line1: 'Por Qué el Sprint Es la ÚNICA Solución',
    line2: 'Que Cumple los 3 Criterios',
    description:
      'No somos una alternativa más. Somos la única solución diseñada específicamente para cumplir estos criterios.',
    bottomTitle: 'La Diferencia Fundamental',
    bottomText:
      'Mientras otros te dan teoría, consultoría cara o te dejan solo, nosotros te damos un sistema probado que implementas con apoyo experto en tiempo récord.',
    bottomStrong: 'No es otra opción. Es LA solución diseñada para tu situación.',
  },
  en: {
    line1: 'Why the Sprint Is the ONLY Solution',
    line2: 'That Meets All 3 Criteria',
    description:
      'We are not just another alternative. We are the only solution built specifically to meet these criteria.',
    bottomTitle: 'The Fundamental Difference',
    bottomText:
      'While others give you theory, expensive consulting, or leave you alone, we give you a proven system you implement with expert support in record time.',
    bottomStrong: 'It is not another option. It is THE solution built for your situation.',
  },
} as const;

export function SprintComparisonStatic({ lang = 'es' }: { lang?: Lang }) {
  const t = copy[lang];
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">{t.line1}</span>
            <span className="block text-primary">{t.line2}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="space-y-12">
          {ourApproach[lang].map((approach, index) => {
            const Icon = approach.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border shadow-lg hover:shadow-xl transition-all"
              >
                <div className="grid lg:grid-cols-5 gap-6 items-center">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{approach.criterion}</h3>
                        <p className="text-sm text-muted-foreground">{approach.requirement}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3 space-y-4">
                    <div>
                      <p className="font-semibold text-primary mb-1">How we do it:</p>
                      <p className="text-lg">{approach.howWeDo}</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-muted-foreground mb-1">Why it's different:</p>
                      <p className="text-muted-foreground">{approach.whyDifferent}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <ArrowRight className="h-5 w-5 text-green-600" />
                      <p className="font-semibold text-green-600">{approach.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">{t.bottomTitle}</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              {lang === 'es' ? (
                <>
                  Mientras otros te dan teoría, consultoría cara o te dejan solo,
                  nosotros te damos un <span className="font-semibold text-primary">sistema probado</span> que 
                  implementas <span className="font-semibold text-primary">con apoyo experto</span> en{' '}
                  <span className="font-semibold text-primary">tiempo récord</span>.
                </>
              ) : (
                <>
                  While others give you theory, expensive consulting, or leave you alone,
                  we give you a <span className="font-semibold text-primary">proven system</span> you implement{' '}
                  <span className="font-semibold text-primary">with expert support</span> in{' '}
                  <span className="font-semibold text-primary">record time</span>.
                </>
              )}
            </p>
            <p className="text-xl font-bold">
              {t.bottomStrong}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
