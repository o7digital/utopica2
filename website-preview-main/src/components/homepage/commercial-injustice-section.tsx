import { motion } from 'framer-motion';
import { AlertTriangle, Users, TrendingUp } from 'lucide-react';

const costs = [
  { icon: Users, text: "Competidores con peor servicio te ganan clientes porque comunican mejor." },
  { icon: AlertTriangle, text: "Pierdes tiempo prospectando cuando deberías estar entregando." },
  { icon: TrendingUp, text: "Tu equipo espera que tú cierres lo importante." }
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring", stiffness: 60 } }
};

export function CommercialInjusticeSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            El costo de no resolver esto
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Cada mes sin un sistema comercial es un mes donde:
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto mb-16 space-y-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {costs.map((cost, index) => {
            const Icon = cost.icon;
            return (
              <motion.div
                key={index}
                variants={slideIn}
                className="flex items-start gap-4 p-6 rounded-xl bg-destructive/5 border border-destructive/10 hover:border-destructive/20 transition-colors"
              >
                <div className="flex-shrink-0 p-2 rounded-full bg-destructive/10">
                  <Icon className="h-6 w-6 text-destructive" />
                </div>
                <p className="text-lg text-muted-foreground">{cost.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-background via-primary/5 to-primary/10 p-8 md:p-12 rounded-2xl border border-primary/20 shadow-lg text-center">
            <p className="text-lg md:text-xl text-muted-foreground">
              Y la brecha se amplía. Los equipos que ya usan IA en su proceso comercial no solo van más rápido — van acelerando. La distancia no es lineal. <span className="font-semibold text-foreground">Es exponencial.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
