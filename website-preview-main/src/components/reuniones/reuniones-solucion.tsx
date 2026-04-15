import { motion } from 'framer-motion';
import { Search, MessageSquare, CheckCircle, Bot } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: "Identificamos a tus prospectos ideales",
    description: "Research profundo, listas segmentadas, perfiles que realmente encajan con tu oferta. No disparamos al aire."
  },
  {
    icon: MessageSquare,
    title: "Iniciamos conversaciones en tu nombre",
    description: "Desde tu LinkedIn, con mensajes que generan respuestas — no rechazo. Cada mensaje está diseñado para abrir puertas, no para vender."
  },
  {
    icon: CheckCircle,
    title: "Calificamos antes de agendar",
    description: "Solo llegan a tu agenda prospectos con presupuesto, autoridad y necesidad real. Nada de reuniones que no van a ningún lado."
  },
  {
    icon: Bot,
    title: "Agentes de IA hacen el trabajo pesado",
    description: "El research, la construcción de listas y los primeros borradores los hace la IA. Tu equipo humano revisa, personaliza y ejecuta. Velocidad de máquina con juicio humano."
  }
];

export function ReunionesSolucion() {
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
            Un equipo que prospecta por ti — <span className="text-primary">dedicado a tu empresa</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No es automatización masiva que quema tu marca. Es un equipo real, usando una metodología relacional: conversaciones genuinas, no spam.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-card rounded-2xl p-8 border shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-xl font-semibold text-primary-foreground">
              Tú te dedicas a cerrar. Nosotros llenamos el embudo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
