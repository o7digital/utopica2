"use client";

import { motion } from 'framer-motion';
import { Gift, Video, FileText, Clock, Target, MessageSquare, Calendar, MessageCircle, Brain, CheckCircle, type LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface BonusSection {
  icon: LucideIcon;
  title: string;
  points?: string[];
  description?: string;
}

interface Bonus {
  icon: LucideIcon;
  number: string;
  title: string;
  subtitle: string;
  value?: string;
  features: string[];
  highlight: string;
  expandedContent?: {
    title: string;
    hasImage?: boolean;
    imagePath?: string;
    imageAlt?: string;
    sections: BonusSection[];
  };
}

const bonuses: Bonus[] = [
  {
    icon: Video,
    number: "BONUS #1",
    title: "Masterclass: Conversaciones que Convierten",
    subtitle: "Transforma tu Claridad en Oportunidades Reales",
    features: [
      "2 horas de contenido avanzado en video",
      "Las 7 objeciones universales y cómo desarmarlas",
      "Scripts probados para cada etapa de venta"
    ],
    highlight: "Acceso inmediato al inscribirte",
    expandedContent: {
      title: "Los 3 Secretos de la Prospección Magistral:",
      sections: [
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
      ]
    }
  },
  {
    icon: FileText,
    number: "BONUS #2",
    title: "Acceso de Por Vida a Plataforma Kit de Claridad Comercial",
    subtitle: "Convierte tus Ideas en Documentos Perfectos, Sin Fricción",
    features: [
      "Plataforma de IA conversacional para crear documentos comerciales",
      "Plantillas actualizadas mensualmente para cada industria",
      "Memoria inteligente que aprende de tu negocio"
    ],
    highlight: "Sin pagos adicionales, para siempre",
    expandedContent: {
      title: "Con nuestra plataforma, podrás:",
      hasImage: true,
      imagePath: "/images/kit-claridad-screenshot.png",
      imageAlt: "Kit de Claridad Comercial - Plataforma de IA Conversacional",
      sections: [
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
      ]
    }
  },
  {
    icon: Clock,
    number: "BONUS #3",
    title: "Sesión 5: La Cosecha de Victorias y Resultados",
    subtitle: "La celebración de tu transformación",
    features: [
      "Compartirás tus victorias y resultados tangibles",
      "Análisis de casos reales: qué funcionó y por qué",
      "Networking con tu grupo de transformación"
    ],
    highlight: "Un mes después del Sprint",
    expandedContent: {
      title: "¿Qué pasará en esta sesión?",
      sections: [
        {
          icon: MessageSquare,
          title: "Micro Abierto",
          description: "Compartirás tus victorias, aprendizajes y los resultados que has generado desde que implementaste tu nueva claridad."
        },
        {
          icon: Brain,
          title: "Inteligencia Colectiva",
          description: "Escucharás las experiencias reales de tus compañeros, obteniendo ideas que no habías considerado para tu propio negocio."
        },
        {
          icon: Target,
          title: "Análisis de Casos Reales",
          description: "Veremos qué funcionó, qué no, y por qué. Pura práctica, cero teoría. Resolveremos en grupo tu próximo desafío."
        }
      ]
    }
  }
];

export function SprintBonuses() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
            <Gift className="h-5 w-5" />
            <span className="font-semibold">VALOR ADICIONAL</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Los 3 Aceleradores de Resultados</span>
            <span className="block text-primary">Que Multiplican Tu Inversión</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Herramientas adicionales que aceleran y multiplican tus resultados.
            Incluidos sin costo extra para participantes del Sprint.
          </p>
        </motion.div>

        <div className="space-y-16">
          {bonuses.map((bonus, index) => {
            const Icon = bonus.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-card rounded-2xl border shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className="p-8 bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-green-600">{bonus.number}</span>
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{bonus.title}</h3>
                  <p className="text-lg text-muted-foreground mb-4">{bonus.subtitle}</p>
                  
                  <div className="flex items-center justify-between">
                    {bonus.value && <p className="font-bold text-xl text-primary">{bonus.value}</p>}
                    <p className="text-sm text-green-600 font-semibold">{bonus.highlight}</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-8">
                  {/* Expanded Content */}
                  {bonus.expandedContent && (
                    <div className="pt-0">
                      {index === 2 && (
                        <div className="bg-primary/5 rounded-lg p-4 mb-6">
                          <p className="text-sm font-semibold text-primary">
                            Esta no es una sesión más. Es LA celebración de tu transformación. 
                            El momento donde la teoría se convierte en resultados tangibles.
                          </p>
                        </div>
                      )}
                      <h4 className="text-xl font-semibold mb-6">{bonus.expandedContent.title}</h4>
                      
                      {/* Image for Kit de Claridad */}
                      {bonus.expandedContent.hasImage && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="relative rounded-xl overflow-hidden shadow-xl border mb-8"
                        >
                          <Image
                            src={bonus.expandedContent.imagePath!}
                            alt={bonus.expandedContent.imageAlt!}
                            width={1200}
                            height={675}
                            className="w-full h-auto"
                            priority
                          />
                        </motion.div>
                      )}

                      {/* Sections */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {bonus.expandedContent.sections.map((section, sectionIndex) => {
                          const SectionIcon = section.icon;
                          return (
                            <div key={sectionIndex} className="bg-muted/50 rounded-lg p-4">
                              <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                                  <SectionIcon className="h-5 w-5 text-primary" />
                                </div>
                                <h5 className="font-semibold text-sm">{section.title}</h5>
                              </div>
                              
                              {section.description ? (
                                <p className="text-sm text-muted-foreground">{section.description}</p>
                              ) : section.points && (
                                <ul className="space-y-2">
                                  {section.points.map((point, pointIndex) => (
                                    <li key={pointIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <span className="text-primary mt-1">•</span>
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      {index === 2 && (
                        <div className="mt-8 bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                          <h5 className="font-semibold mb-3 text-green-800">Ven preparado para compartir:</h5>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold">1.</span>
                              <span><strong>Tu Mayor Victoria:</strong> Un resultado concreto (cliente nuevo, venta cerrada) gracias a tu nueva claridad</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold">2.</span>
                              <span><strong>El "Antes y Después":</strong> Una anécdota real de cómo comunicabas antes vs. ahora</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold">3.</span>
                              <span><strong>Métricas de Impacto:</strong> Datos concretos de mejora en conversión, respuestas, etc.</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
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
          <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold mb-4">Estos Bonos Son Tu Ventaja Competitiva</h3>
            <p className="text-lg text-muted-foreground">
              Diseñados para complementar perfectamente tu Sprint 
              y garantizar que mantengas el momentum después de las 4 semanas.
            </p>
            <p className="text-lg font-semibold text-green-700 mt-4">
              Incluidos sin costo adicional, pero solo por tiempo limitado.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}