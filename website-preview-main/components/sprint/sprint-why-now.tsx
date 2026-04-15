"use client";

import { motion } from 'framer-motion';
import { TrendingDown, Calendar, Target, AlertCircle, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const urgencyReasons = [
  {
    icon: DollarSign,
    title: "El Costo de Oportunidad está Creciendo",
    description: "Cada mes sin claridad comercial representa oportunidades perdidas que nunca recuperarás. Mientras dudas, tus competidores están cerrando los clientes que deberían ser tuyos.",
    insight: "Si pierdes solo 2 clientes potenciales al mes por falta de claridad, son 24 oportunidades al año que nunca volverán.",
    highlight: "El Sprint se paga con UN solo cliente nuevo"
  },
  {
    icon: Users,
    title: "Tu Competencia También Está Buscando Diferenciarse",
    description: "El mercado B2B está saturado de mensajes genéricos. La ventana para posicionarte como el experto claro en tu nicho se está cerrando rápidamente.",
    insight: "El 67% de compradores B2B ya tienen un favorito antes de hablar contigo",
    highlight: "Ser el primero en comunicar con claridad = ventaja competitiva duradera"
  },
  {
    icon: Calendar,
    title: "El Momento Psicológico Es Ahora",
    description: "Ya identificaste el problema. Ya sabes que necesitas claridad. Posponer la decisión no te acerca a la solución - solo prolonga el dolor que ya conoces demasiado bien.",
    insight: "El costo emocional de saber que podrías estar mejor pero no actuar",
    highlight: "La claridad que buscas está a solo 4 semanas de distancia"
  }
];

export function SprintWhyNow() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-6">
            <AlertCircle className="h-5 w-5" />
            <span className="font-semibold">DECISIÓN CRÍTICA</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Cada Mes Sin Claridad</span>
            <span className="block text-primary">Son Ventas Perdidas Que Nunca Recuperarás</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Mientras dudas, tus competidores están cerrando los clientes que deberían ser tuyos.
          </p>
        </motion.div>

        <div className="space-y-8 mb-16">
          {urgencyReasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-full bg-primary/10 flex-shrink-0">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">
                      Razón #{index + 1}: {reason.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {reason.description}
                    </p>
                    
                    {reason.insight && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <p className="text-base italic">{reason.insight}</p>
                      </div>
                    )}
                    
                    <p className="text-lg font-semibold text-primary">
                      → {reason.highlight}
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border-2 border-primary/20 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">La Pregunta No Es "¿Debería Hacerlo?"</h3>
          <p className="text-xl text-muted-foreground mb-6">
            La pregunta es: <span className="font-semibold">¿Cuánto más estás dispuesto a perder antes de actuar?</span>
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">2-3 clientes</p>
              <p className="text-sm text-muted-foreground">Perdidos cada mes por falta de claridad</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">6 meses</p>
              <p className="text-sm text-muted-foreground">Tiempo promedio intentando resolver solo</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">Hoy</p>
              <p className="text-sm text-muted-foreground">El mejor momento para empezar a cambiar</p>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            Quiero Reservar Mi Lugar Ahora
          </Button>
        </motion.div>
      </div>
    </section>
  );
}