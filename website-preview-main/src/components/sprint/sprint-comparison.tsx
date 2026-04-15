import { motion } from 'framer-motion';
import { Zap, Users, Sparkles, ArrowRight } from 'lucide-react';

const ourApproach = [
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
];

export function SprintComparison() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Por Qué el Sprint Es la ÚNICA Solución</span>
            <span className="block text-primary">Que Cumple los 3 Criterios</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            No somos una alternativa más. Somos la única solución diseñada 
            específicamente para cumplir estos criterios.
          </p>
        </motion.div>


        {/* How we meet each criterion */}
        <div className="space-y-12">
          {ourApproach.map((approach, index) => {
            const Icon = approach.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">La Diferencia Fundamental</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              Mientras otros te dan teoría, consultoría cara o te dejan solo,
              nosotros te damos un <span className="font-semibold text-primary">sistema probado</span> que 
              implementas <span className="font-semibold text-primary">con apoyo experto</span> en{' '}
              <span className="font-semibold text-primary">tiempo récord</span>.
            </p>
            <p className="text-xl font-bold">
              No es otra opción. Es LA solución diseñada para tu situación.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}