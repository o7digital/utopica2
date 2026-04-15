import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const before = [
  "El fundador cierra el 80% de las ventas",
  "Cada vendedor improvisa su propio proceso",
  "Prospectar un cliente toma 2-3 días",
  "Una propuesta toma 1 semana",
  "El seguimiento depende de la memoria",
  "No hay visibilidad del pipeline"
];

const after = [
  "El equipo cierra sin intervención del fundador",
  "Un proceso replicable, implementado en herramientas que usan a diario",
  "Prospectar un cliente toma 2-3 horas (con plugins que hacen el research)",
  "Una propuesta se genera en 30 minutos (con skills que estructuran el contenido)",
  "Cada oportunidad tiene próximo paso asignado",
  "Mission Control: tablero en tiempo real con pipeline, métricas y actividad"
];

export function EquipoAumentadoAntesDesp() {
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
            Cómo se ve el "después"
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-destructive/5 border-2 border-destructive/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6 text-destructive">Antes:</h3>
            <ul className="space-y-4">
              {before.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6 text-primary">Después:</h3>
            <ul className="space-y-4">
              {after.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
