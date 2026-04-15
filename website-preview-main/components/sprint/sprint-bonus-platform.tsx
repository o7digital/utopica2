"use client";

import { motion } from 'framer-motion';
import { Gift, MessageCircle, Brain, Clock, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: MessageCircle,
    title: "Crear documentos simplemente conversando",
    description: "Olvídate de los campos de texto intimidantes. Responde a preguntas guiadas y naturales, y observa cómo tu documento se construye en tiempo real."
  },
  {
    icon: Brain,
    title: "Aprovechar una memoria que aprende de ti",
    description: "La plataforma recuerda el contexto de tu negocio, tus clientes y proyectos anteriores para que no tengas que repetir la misma información una y otra vez."
  },
  {
    icon: Clock,
    title: "Trabajar a tu propio ritmo y sin presiones",
    description: "Pausa una conversación en cualquier momento y retómala justo donde la dejaste. La plataforma se adapta a tu disponibilidad."
  }
];

export function SprintBonusPlatform() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5">
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
            <span className="font-semibold">BONO ESPECIAL</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Acceso Vitalicio a la Plataforma</span>
            <span className="block text-primary">Kit de Claridad Comercial</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span className="font-semibold">Convierte tus Ideas en Documentos Perfectos, Sin Fricción.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            Como participante de nuestro taller, recibirás acceso de por vida a nuestra plataforma de IA conversacional. 
            Es una herramienta diseñada para ayudarte a crear los entregables de claridad comercial del taller de forma fluida, 
            eliminando la fricción de los formularios tradicionales.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border"
          >
            <Image
              src="/images/kit-claridad-screenshot.png"
              alt="Kit de Claridad Comercial - Plataforma de IA Conversacional"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            Con nuestra plataforma, podrás:
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-card p-6 rounded-xl border shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3">
                    {index + 1}. {feature.title}
                  </h4>
                  
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-primary/10 p-8 rounded-2xl border border-primary/20"
        >
          <p className="text-lg font-semibold text-primary mb-4">
            Incluido sin costo adicional para los participantes del taller.
          </p>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Este bono te proporciona una herramienta que evoluciona contigo, 
            asegurando que la claridad ganada en el taller se convierta en un activo estratégico duradero para tu negocio.
          </p>
        </motion.div>
      </div>
    </section>
  );
}