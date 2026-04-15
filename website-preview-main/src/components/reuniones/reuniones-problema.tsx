import { motion } from 'framer-motion';
import { TrendingDown, Clock, RefreshCw } from 'lucide-react';

const problems = [
  {
    icon: TrendingDown,
    title: "No puedes planear nada",
    description: "Sin un flujo predecible de oportunidades, ¿cómo decides cuándo contratar? ¿Cuánto invertir? ¿Cómo proyectar ingresos?"
  },
  {
    icon: Clock,
    title: "Y prospectar tú mismo no es opción",
    description: "Es un trabajo de tiempo completo. Tu hora vale más cerrando que buscando. Pero si no buscas, no hay qué cerrar."
  },
  {
    icon: RefreshCw,
    title: "El ciclo se repite",
    description: "Mes bueno → te confías → dejas de prospectar → mes vacío → prospectas con urgencia → cierras algo → te confías → mes vacío otra vez."
  }
];

export function ReunionesProblema() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Tu crecimiento depende de terceros, <span className="text-destructive">no de ti</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada cliente nuevo es un golpe de suerte. Cada mes sin referidos es un mes de incertidumbre.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-destructive/5 border border-destructive/10"
              >
                <div className="p-4 rounded-full bg-destructive/10 mb-4">
                  <Icon className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-background via-destructive/5 to-destructive/10 p-8 md:p-12 rounded-2xl border border-destructive/20 text-center">
            <p className="text-lg md:text-xl text-muted-foreground">
              Mientras tanto, tu competencia está llenando su pipeline con decisores <span className="font-semibold text-foreground">que deberían estar hablando contigo.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
