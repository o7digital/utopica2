"use client";

import { motion } from 'framer-motion';
import { Target, Zap, Gem, Rocket, Trophy } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: "Claridad Inmediata",
    description: "Tu propuesta se entiende en 30 segundos, no en reuniones de 2 horas",
    stage: "Claridad"
  },
  {
    icon: Zap,
    title: "Atracción Automática",
    description: "Los clientes correctos te encuentran y entienden por qué eres su mejor opción",
    stage: "Claridad"
  },
  {
    icon: Gem,
    title: "Ventas Replicables",
    description: "Tu equipo puede explicar y vender tu servicio con la misma efectividad que tú",
    stage: "Delegación"
  }
];

export function ValuePropositionSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">De la Claridad a la</span>
            <span className="block text-primary">Libertad Comercial</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Un mensaje claro es el puente entre depender de ti para cada venta 
            y tener un negocio que genera ingresos de forma independiente:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl group-hover:bg-primary/20 transition-colors" />
                <div className="relative bg-card p-8 rounded-2xl border border-primary/10 h-full">
                  <div className="mb-4">
                    <div className="p-3 inline-flex rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center p-8 bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20">
            <p className="text-lg md:text-xl font-medium max-w-2xl">
              <span className="text-2xl font-bold text-primary block mb-2">Claridad → Delegación → Libertad</span>
              Este es el camino probado para dejar de ser el único vendedor efectivo en tu empresa.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}