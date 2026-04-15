"use client";

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface Series {
  title: string;
  description: string;
  frequency: string;
}

interface FeaturedSeriesProps {
  series: Series[];
}

export function FeaturedSeries({ series }: FeaturedSeriesProps) {
  return (
    <section className="py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Series Temáticas</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explora nuestras series especializadas con contenido curado y análisis profundo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {series.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 shadow-lg"
            >
              <BookOpen className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <p className="text-sm text-primary">Frecuencia: {item.frequency}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}