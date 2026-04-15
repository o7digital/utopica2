import { motion } from 'framer-motion';
import { MessageSquare, CalendarCheck, Clock, DollarSign } from 'lucide-react';

const metrics = [
  {
    icon: MessageSquare,
    value: "15-30%",
    label: "Tasa de respuesta",
    comparison: "vs. 3-5% del spam masivo"
  },
  {
    icon: CalendarCheck,
    value: "8-15",
    label: "Reuniones agendadas por mes",
    comparison: "con decisores calificados"
  },
  {
    icon: Clock,
    value: "2-3 semanas",
    label: "Tiempo de ramp-up",
    comparison: "para primeras reuniones"
  },
  {
    icon: DollarSign,
    value: "Fracción",
    label: "Costo por reunión",
    comparison: "de lo que cuesta un SDR interno"
  }
];

export function ReunionesMetricas() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Métricas típicas
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border text-center shadow-sm"
              >
                <div className="p-3 rounded-full bg-primary/10 inline-flex mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-primary mb-1">{metric.value}</p>
                <p className="font-semibold mb-1">{metric.label}</p>
                <p className="text-sm text-muted-foreground">{metric.comparison}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground italic">
          Los números varían según industria, ticket y mercado objetivo.
        </p>
      </div>
    </section>
  );
}
