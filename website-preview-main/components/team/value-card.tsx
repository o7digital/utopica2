"use client";

import { motion } from 'framer-motion';

interface ValueCardProps {
  value: {
    title: string;
    description: string;
  };
  index: number;
}

export function ValueCard({ value, index }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold mb-4">{value.title}</h3>
      <p className="text-muted-foreground">{value.description}</p>
    </motion.div>
  );
}