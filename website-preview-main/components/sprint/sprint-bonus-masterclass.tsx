"use client";

import { motion } from 'framer-motion';
import { Gift, Target, MessageSquare, Calendar, CheckCircle } from 'lucide-react';

const secrets = [
  {
    icon: Target,
    title: "Secreto #1: Ya Tienes una Lista Valiosa",
    points: [
      "Cómo activar tu red existente sin sentirte incómodo",
      "La \"pregunta mágica\" que reconecta genuinamente",
      "Por qué no necesitas contactos \"en frío\" por meses"
    ]
  },
  {
    icon: MessageSquare,
    title: "Secreto #2: Toda Conversación es una Oportunidad",
    points: [
      "El modelo VVP (Validación-Valor-Pregunta) para conexiones auténticas",
      "Cómo escuchar señales de interés reales",
      "Por qué \"no forzar la venta\" multiplica tus resultados"
    ]
  },
  {
    icon: Calendar,
    title: "Secreto #3: Siempre Estar Conversando",
    points: [
      "El sistema para mantener 20+ conversaciones activas",
      "Cómo calificar prospectos sin perder tiempo",
      "La mentalidad del 3% vs 97% del mercado"
    ]
  }
];

export function SprintBonusMasterclass() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Gift className="h-5 w-5" />
            <span className="font-semibold">BONO EXCLUSIVO</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Masterclass "Conversaciones que Convierten"</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span className="font-semibold">Transforma tu Claridad en Oportunidades Reales</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            Como participante del Sprint, recibirás acceso completo a nuestra Masterclass exclusiva donde descubrirás:
          </p>
          
          <h3 className="text-2xl font-bold text-center mb-12">
            Los 3 Secretos de la Prospección Magistral:
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {secrets.map((secret, index) => {
            const Icon = secret.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-card p-6 rounded-xl border shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold flex-1">{secret.title}</h4>
                </div>
                
                <ul className="space-y-2">
                  {secret.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-lg font-semibold text-primary mb-4">
            *Incluido sin costo adicional para participantes del Sprint*
          </p>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Esta masterclass te asegura que tu mensaje claro no se quede en un documento, 
            sino que se convierta en conversaciones reales con clientes potenciales.
          </p>
        </motion.div>
      </div>
    </section>
  );
}