import { motion } from 'framer-motion';
import { Target, Search, MessageSquare, Send, BarChart3 } from 'lucide-react';

const steps = [
  {
    number: "1",
    icon: Target,
    title: "Definición de ICP",
    description: "Documentamos tu perfil de cliente ideal con criterios firmográficos, demográficos y conductuales. Sin esto, todo lo demás es ruido."
  },
  {
    number: "2",
    icon: Search,
    title: "Research y construcción de listas",
    description: "Agentes de IA investigan empresas y personas. Filtramos por señales de compra reales: crecimiento, contrataciones, tecnología adoptada, cambios de liderazgo."
  },
  {
    number: "3",
    icon: MessageSquare,
    title: "Secuencias de contacto",
    description: "Diseñamos mensajes personalizados por segmento. No templates genéricos — cada mensaje demuestra que hicimos tarea."
  },
  {
    number: "4",
    icon: Send,
    title: "Ejecución y seguimiento",
    description: "Enviamos, hacemos follow-up, manejamos objeciones iniciales. Cuando el prospecto está listo para hablar, lo conectamos contigo."
  },
  {
    number: "5",
    icon: BarChart3,
    title: "Optimización continua",
    description: "Medimos tasas de respuesta, reuniones agendadas, calidad de prospectos. Ajustamos mensajes, listas y criterios cada semana."
  }
];

export function ReunionesProceso() {
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
            El proceso paso a paso
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                <div className="flex-1 bg-card rounded-2xl p-6 border shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
