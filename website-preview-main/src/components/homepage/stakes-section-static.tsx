"use client";

import { motion } from 'framer-motion';
import { MessageSquare, TrendingDown, UserX } from 'lucide-react';

const symptoms = [
  {
    icon: MessageSquare,
    title: "Tu mensaje no diferencia",
    description: "Tus clientes no saben explicar por qué elegirte a ti y no a la competencia. Compites por precio cuando deberías competir por valor."
  },
  {
    icon: TrendingDown,
    title: "Tu pipeline depende de la suerte",
    description: "Un mes cierras bien. Al siguiente no sabes de dónde vendrá el próximo cliente. Los referidos son bienvenidos, pero no son estrategia."
  },
  {
    icon: UserX,
    title: "Tu equipo no vende como tú",
    description: "Contrataste, capacitaste, delegaste. Pero las ventas importantes siguen pasando por ti. Y eso no escala."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 50 } }
};

export function StakesSectionStatic() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Tres señales de que tu negocio tiene un techo
            <span className="block font-serif italic text-primary mt-2">— y ese techo eres tú</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {symptoms.map((symptom, index) => {
            const Icon = symptom.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-destructive/5 border border-destructive/10 hover:border-destructive/20 hover:shadow-md transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-destructive/10 mb-4">
                  <Icon className="h-8 w-8 text-destructive" />
                </div>
                <h4 className="font-semibold text-xl mb-2">{symptom.title}</h4>
                <p className="text-muted-foreground">{symptom.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
