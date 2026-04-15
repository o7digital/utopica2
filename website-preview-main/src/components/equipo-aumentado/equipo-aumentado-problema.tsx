import { motion } from 'framer-motion';
import { UserX, Users, RefreshCw, TrendingUp } from 'lucide-react';

const problems = [
  {
    icon: UserX,
    title: "No puedes delegar porque nadie vende como tú",
    description: "Has intentado capacitar, contratar, delegar. Pero al final siempre regresas tú a cerrar lo importante."
  },
  {
    icon: Users,
    title: "Contratar más gente solo multiplica los problemas",
    description: "Más vendedores = más supervisión, más inconsistencia, más rotación. El cuello de botella sigue siendo el mismo: tú."
  },
  {
    icon: RefreshCw,
    title: "Cada mes empiezas de cero",
    description: "Sin un sistema predecible, tu pipeline es una montaña rusa. Un mes cierras bien, al siguiente no sabes de dónde vendrá el próximo cliente."
  }
];

export function EquipoAumentadoProblema() {
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
            El problema no es que vendas mal. <span className="text-destructive">Es que tu proceso no escala.</span>
          </h2>
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
          <div className="bg-gradient-to-br from-background via-primary/5 to-primary/10/50 p-8 md:p-12 rounded-2xl border border-primary/20 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Y la brecha se amplía</h3>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground">
              Los equipos comerciales que ya usan IA no solo van más rápido — van acelerando. Cada mes que pasa, la distancia entre ellos y tú crece. <span className="font-semibold text-foreground">No es lineal. Es exponencial.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
