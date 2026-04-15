import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const forYou = [
  "Tienes una consultora o empresa de servicios B2B",
  "Tu ticket promedio es alto (+$100K MXN)",
  "Tus decisores están activos en LinkedIn",
  "Tienes capacidad de cerrar (tú o alguien de tu equipo)",
  "Tu venta es consultiva, no transaccional",
];

const notForYou = [
  "Vendes a consumidores finales (B2C)",
  "Vendes productos físicos o commodities",
  "Tu ticket es bajo (menos de $50K MXN)",
  "No tienes tiempo de atender reuniones",
  "Buscas resultados en 2 semanas",
  "Tus clientes no están en LinkedIn",
];

export function ReunionesAudiencia() {
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
            Para quién es
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6">Esto es para ti si:</h3>
            <ul className="space-y-4">
              {forYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
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
            className="bg-destructive/5 border-2 border-destructive/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6">Esto NO es para ti si:</h3>
            <ul className="space-y-4">
              {notForYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
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
