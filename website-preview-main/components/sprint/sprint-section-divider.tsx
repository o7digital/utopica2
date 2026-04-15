"use client";

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface SprintSectionDividerProps {
  sectionNumber: "1" | "2" | "3";
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
}

export function SprintSectionDivider({ 
  sectionNumber, 
  title, 
  subtitle, 
  icon: Icon,
  color = "text-primary",
  bgColor = "bg-primary/10"
}: SprintSectionDividerProps) {
  const sectionLabels = {
    "1": "PARTE 1 DE 3",
    "2": "PARTE 2 DE 3", 
    "3": "PARTE 3 DE 3"
  };

  return (
    <section className="py-12 bg-gradient-to-b from-muted/30 to-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {["1", "2", "3"].map((num) => (
              <div
                key={num}
                className={`h-2 w-16 rounded-full transition-all ${
                  num <= sectionNumber ? color.replace('text-', 'bg-') : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Section label */}
          <p className={`text-sm font-semibold mb-3 ${color}`}>
            {sectionLabels[sectionNumber]}
          </p>

          {/* Icon and title */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className={`p-3 rounded-full ${bgColor}`}>
              <Icon className={`h-8 w-8 ${color}`} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="flex justify-center"
          >
            <ChevronDown className={`h-6 w-6 ${color}`} />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-64 h-64 ${bgColor} rounded-full blur-3xl opacity-20`} />
        <div className={`absolute bottom-0 right-1/4 w-64 h-64 ${bgColor} rounded-full blur-3xl opacity-20`} />
      </div>
    </section>
  );
}