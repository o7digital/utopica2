import React from 'react';
import { motion } from 'framer-motion';
import { ValueCard } from './value-card';

const values = [
  {
    title: "Innovación Responsable",
    description: "Impulsamos el cambio sin perder la esencia humana de las ventas."
  },
  {
    title: "Excelencia Sostenible",
    description: "Creemos en el crecimiento que perdura, no en las soluciones rápidas."
  },
  {
    title: "Impacto Medible",
    description: "Nos comprometemos con resultados tangibles y verificables."
  },
  {
    title: "Mejora Continua",
    description: "Evolucionamos constantemente, aprendiendo de cada interacción."
  }
];

export const ValuesSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Lo Que</span>
            <span className="block text-primary">Nos Define</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};