"use client";

import { motion } from 'framer-motion';
import { X, Clock, DollarSign, Users, Target, Zap } from 'lucide-react';

const failedApproaches = [
  {
    title: "Hacerlo Tú Mismo",
    icon: Clock,
    problems: [
      {
        issue: "Falta de perspectiva externa",
        detail: "Estás demasiado cerca de tu negocio para ver lo que realmente importa a tus clientes"
      },
      {
        issue: "Síndrome de la hoja en blanco",
        detail: "Sin estructura probada, terminas con un mensaje genérico que no diferencia"
      },
      {
        issue: "Tiempo infinito de iteración",
        detail: "6-12 meses cambiando y dudando, mientras pierdes ventas cada día"
      }
    ],
    verdict: "Resultado: Un mensaje que suena bien para ti, pero no convierte"
  },
  {
    title: "Consultoría Tradicional",
    icon: DollarSign,
    problems: [
      {
        issue: "Costo prohibitivo",
        detail: "$150,000 - $300,000 MXN por un proyecto de messaging completo"
      },
      {
        issue: "Tiempos eternos",
        detail: "3-6 meses de diagnóstico, estrategia, implementación y ajustes"
      },
      {
        issue: "Dependencia del consultor",
        detail: "Cuando se va, te quedas sin capacidad de evolucionar el mensaje"
      }
    ],
    verdict: "Resultado: Funciona, pero mata tu flujo de caja y crea dependencia"
  },
  {
    title: "Cursos y Templates Genéricos",
    icon: Target,
    problems: [
      {
        issue: "No diseñados para B2B complejo",
        detail: "La mayoría están hechos para productos simples o B2C"
      },
      {
        issue: "Sin retroalimentación experta",
        detail: "Llenas plantillas pero nadie valida si tiene sentido para TU mercado"
      },
      {
        issue: "Información sin implementación",
        detail: "Terminas con 50 horas de videos y cero claridad real"
      }
    ],
    verdict: "Resultado: Mucha teoría, poca transformación real"
  }
];

export function SprintFailedSolutions() {
  return (
    <section className="min-h-screen flex items-center bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Ya Intentaste Todo</span>
            <span className="block text-primary">Y Sigues en el Mismo Lugar</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Seamos honestos: si las soluciones obvias funcionaran, 
            ya tendrías un mensaje claro que convierte.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {failedApproaches.map((approach, index) => {
            const Icon = approach.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-card rounded-2xl p-6 border border-muted-foreground/20 h-full">
                  {/* Header with X mark */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">{approach.title}</h3>
                    </div>
                    <X className="h-5 w-5 text-muted-foreground/60 flex-shrink-0" />
                  </div>

                  {/* Problems */}
                  <div className="space-y-4 mb-6">
                    {approach.problems.map((problem, problemIndex) => (
                      <div key={problemIndex} className="relative pl-6">
                        <div className="absolute left-0 top-2 w-2 h-2 bg-muted-foreground/40 rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm mb-1">{problem.issue}</p>
                          <p className="text-sm text-muted-foreground">
                            {problem.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Verdict */}
                  <div className="pt-4 border-t border-muted">
                    <p className="text-sm font-medium text-muted-foreground">
                      {approach.verdict}
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
            <h3 className="text-2xl font-bold mb-4">La Realidad:</h3>
            <p className="text-xl text-muted-foreground">
              Necesitas una solución que sea <span className="font-semibold">rápida como el DIY</span>, 
              {' '}<span className="font-semibold">efectiva como la consultoría</span>, 
              {' '}y <span className="font-semibold">específica para B2B complejo</span>.
            </p>
            <p className="text-lg mt-4 text-primary font-semibold">
              ¿Existe algo así?
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}