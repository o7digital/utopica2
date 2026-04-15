import { motion } from 'framer-motion';
import { Search, FileText, MessageSquare, RefreshCw } from 'lucide-react';

const changes = [
  {
    icon: Search,
    title: "Prospectar deja de tomar días — toma horas",
    description: "La IA hace el research, arma las listas, redacta los mensajes. Tu equipo revisa y ejecuta."
  },
  {
    icon: FileText,
    title: "Las propuestas se generan en minutos, no en días",
    description: "Con la información del discovery, la IA estructura la propuesta. Tu equipo la afina y presenta."
  },
  {
    icon: MessageSquare,
    title: "El discovery tiene estructura, no depende de intuición",
    description: "Preguntas correctas, en el orden correcto, con guía en tiempo real. Ya no es arte — es proceso."
  },
  {
    icon: RefreshCw,
    title: 'El seguimiento es sistemático, no "cuando me acuerde"',
    description: "Cada oportunidad tiene su próximo paso claro. Nada se cae entre las grietas."
  }
];

export function EquipoAumentadoSolucion() {
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
            No reemplazamos a tu equipo. <span className="text-primary">Lo potenciamos.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Instalamos un proceso comercial que funciona sin ti. Tu equipo aprende a vender como tú — usando IA como copiloto.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {changes.map((change, index) => {
            const Icon = change.icon;
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
                    <h3 className="text-xl font-bold mb-2">{change.title}</h3>
                    <p className="text-muted-foreground">{change.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
