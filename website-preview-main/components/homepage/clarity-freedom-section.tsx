"use client";

import { motion } from 'framer-motion';
import { X, CheckCircle2, TrendingUp, Clock, Users, Plane } from 'lucide-react';

const withoutClarity = [
  {
    icon: X,
    text: "Solo tú puedes explicar el valor de tu servicio",
    subtext: "Cada venta requiere tu presencia y expertise"
  },
  {
    icon: X,
    text: "TÚ debes estar en cada venta importante",
    subtext: "Tu equipo no puede cerrar sin ti"
  },
  {
    icon: X,
    text: "No puedes escalar porque las ventas dependen de ti",
    subtext: "Crecimiento limitado por tu tiempo disponible"
  }
];

const withClarity = [
  {
    icon: Clock,
    text: "Tu sistema de mensajes genera leads las 24 horas",
    subtext: "Website, emails y materiales trabajando automáticamente"
  },
  {
    icon: Users,
    text: "Prospectos llegan pre-educados y listos para comprar",
    subtext: "Entienden tu valor antes de la primera llamada"
  },
  {
    icon: TrendingUp,
    text: "Tu equipo puede cerrar usando tu sistema",
    subtext: "Proceso replicable que no depende de ti"
  }
];

export function ClarityFreedomSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Por Qué <span className="text-primary">Claridad</span> = <span className="text-green-600">Libertad</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            La mayoría de fundadores buscan más vendedores o mejor CRM. 
            Pero el problema real es que su mensaje no vende sin ellos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-red-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <X className="h-8 w-8 text-red-600 mr-3" />
              Sin Mensaje Claro
            </h3>
            <div className="space-y-4">
              {withoutClarity.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{item.text}</p>
                    <p className="text-sm text-muted-foreground">{item.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-green-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 mr-3" />
              Con Mensaje Claro
            </h3>
            <div className="space-y-4">
              {withClarity.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <item.icon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{item.text}</p>
                    <p className="text-sm text-muted-foreground">{item.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary/5 rounded-2xl p-8 text-center"
        >
          <Plane className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            La Independencia Real en Ventas
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Imagina tomar vacaciones sin detener las ventas. 
            Tu sistema de mensajes sigue generando oportunidades 
            mientras tu equipo ejecuta el proceso que documentamos juntos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}