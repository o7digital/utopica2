import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Clock } from 'lucide-react';

const stakes = [
  {
    icon: AlertCircle,
    title: "Pierdes clientes",
    description: "Que se van con competidores que son inferiores, pero que comunican su valor de forma más asertiva."
  },
  {
    icon: TrendingDown,
    title: "Compites por precio",
    description: "Porque a pesar de ofrecer un mejor servicio, los clientes no perciben la diferencia y te tratan como un proveedor más."
  },
  {
    icon: Clock,
    title: "Tu crecimiento se estanca",
    description: "Porque la única persona que puede comunicar eficazmente el valor de lo que haces eres tú, y tu tiempo es limitado."
  }
];

export function StakesSection() {
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
            <span className="block">¿Sientes que el mercado es</span>
            <span className="block text-primary mt-2">injusto con tu negocio?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Si tu calidad no se refleja en tus ventas, estás experimentando lo que llamamos la "Injusticia Comercial":
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stakes.map((stake, index) => {
              const Icon = stake.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-destructive/5 border border-destructive/10 hover:border-destructive/20 transition-colors"
                >
                  <div className="p-4 rounded-full bg-destructive/10 mb-4">
                    <Icon className="h-8 w-8 text-destructive" />
                  </div>
                  <h4 className="font-semibold text-xl mb-2">{stake.title}</h4>
                  <p className="text-muted-foreground">{stake.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-5xl mx-auto mt-16"
        >
          <div className="bg-gradient-to-br from-background via-primary/5 to-primary/10 p-8 md:p-12 rounded-2xl border border-primary/20 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              La Causa Raíz: No estás comunicando el verdadero valor de tu trabajo.
            </h3>
            <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
              Si tu mensaje no es claro, relevante y único, seguirás siendo invisible para tus clientes ideales.
            </p>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
              Para ganar, necesitas un mensaje que cumpla tres condiciones no negociables:
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="text-center space-y-2">
                <h4 className="text-xl font-bold text-primary">CLARO</h4>
                <p className="text-sm text-muted-foreground">
                  Que cualquier persona lo entienda sin esfuerzo
                </p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-xl font-bold text-primary">RELEVANTE</h4>
                <p className="text-sm text-muted-foreground">
                  Que a tu cliente ideal le importe de inmediato
                </p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-xl font-bold text-primary">ÚNICO</h4>
                <p className="text-sm text-muted-foreground">
                  Que te elijan a ti y no a tu competencia
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}