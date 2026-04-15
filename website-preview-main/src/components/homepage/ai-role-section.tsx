import { motion } from 'framer-motion';
import { Search, BarChart3, FileEdit, Headphones, RefreshCw } from 'lucide-react';

const capabilities = [
  { icon: Search, text: "Investigan prospectos antes del primer contacto" },
  { icon: BarChart3, text: "Califican oportunidades con criterios objetivos" },
  { icon: FileEdit, text: "Redactan borradores de mensajes y propuestas" },
  { icon: Headphones, text: "Dan coaching en tiempo real durante el discovery" },
  { icon: RefreshCw, text: "Hacen seguimiento sistemático de cada oportunidad" },
];

export function AIRoleSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              El rol de la IA <span className="font-serif italic">en todo esto</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No usamos IA como buzzword. La usamos como herramienta real dentro del proceso comercial.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 mb-8">
            <h3 className="text-xl font-bold mb-6">Agentes de IA que trabajan para tu equipo:</h3>
            <div className="space-y-4">
              {capabilities.map((cap, index) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-lg text-muted-foreground">{cap.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <p className="text-lg text-muted-foreground">
              Tu equipo humano toma las decisiones. La IA ejecuta el trabajo repetitivo. El resultado: <span className="font-semibold text-foreground">un proceso 10x más productivo con la misma gente.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
