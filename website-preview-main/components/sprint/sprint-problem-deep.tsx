"use client";

import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Target, Lock } from 'lucide-react';

const consequences = [
  {
    icon: Target,
    title: "El doble de esfuerzo, la mitad del resultado",
    description: "Necesitas 10 reuniones donde otros cierran con 5. Tu equipo se quema trabajando el doble para facturar menos. Cada venta es una batalla épica cuando debería ser una conversación natural.",
    impact: "Impacto: Equipo agotado, resultados mediocres"
  },
  {
    icon: TrendingDown,
    title: "Estás entrenando al mercado a no valorarte",
    description: "Cada descuento que das para cerrar establece un precedente. Tu reputación se está convirtiendo en 'el barato' no 'el experto'. Los clientes esperan descuentos porque tú los acostumbraste.",
    impact: "Impacto: Márgenes que desaparecen, reputación dañada"
  },
  {
    icon: Lock,
    title: "Tu conocimiento es una prisión dorada",
    description: "Solo tú puedes vender = nunca podrás crecer ni tomar vacaciones. Has creado un trabajo disfrazado de empresa. Tu valor está atrapado en tu cabeza, no en tu negocio.",
    impact: "Impacto: Negocio que no puede escalar ni venderse"
  }
];

export function SprintProblemDeep() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <AlertCircle className="h-5 w-5" />
            <span className="font-semibold">LA VERDAD INCÓMODA</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Trabajas el Doble para Ganar la Mitad</span>
            <span className="block text-primary">Y Cada Mes Es Peor</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            La "injusticia comercial" no es solo frustrante. 
            Es una hemorragia silenciosa que está matando el potencial de tu negocio.
          </p>
        </motion.div>

        <div className="space-y-8">
          {consequences.map((consequence, index) => {
            const Icon = consequence.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-full bg-muted flex-shrink-0">
                    <Icon className="h-8 w-8 text-foreground" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{consequence.title}</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {consequence.description}
                    </p>
                    <p className="text-base font-semibold text-primary">
                      {consequence.impact}
                    </p>
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
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">La Pregunta del Millón:</h3>
            <p className="text-xl text-muted-foreground mb-6">
              ¿Cuánto más estás dispuesto a perder antes de hacer algo al respecto?
            </p>
            <p className="text-lg">
              <span className="font-semibold">Cada mes que pasa sin claridad</span> es dinero, 
              tiempo y oportunidades que <span className="text-primary font-bold">nunca recuperarás</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}