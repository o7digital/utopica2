"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const transformationCases = [
  {
    name: "Carlos M.",
    company: "Consultora de TI",
    avatar: "CM",
    challenge: "Dependía 100% de su presencia para cerrar ventas. No podía tomar vacaciones sin detener el negocio.",
    result: "Ahora su equipo cierra ventas usando su metodología. Tomó 3 semanas de vacaciones y las ventas aumentaron.",
    metrics: [
      { icon: Users, text: "3 vendedores cerrando sin él" },
      { icon: TrendingUp, text: "65% conversión en demos" },
      { icon: Clock, text: "50% menos tiempo en ventas" }
    ],
    highlight: "De 0 a 3 vendedores autónomos en 90 días"
  },
  {
    name: "Laura P.",
    company: "Agencia de Marketing",
    avatar: "LP",
    challenge: "Sus prospectos no entendían su valor diferencial. Competía solo por precio.",
    result: "Triplicó sus tarifas al comunicar claramente su metodología propietaria. Los clientes la buscan específicamente.",
    metrics: [
      { icon: Award, text: "3X en tarifas promedio" },
      { icon: Users, text: "80% clientes por referencia" },
      { icon: TrendingUp, text: "Cero objeciones de precio" }
    ],
    highlight: "Pasó de $30K a $90K por proyecto"
  },
  {
    name: "Roberto S.",
    company: "SaaS B2B",
    avatar: "RS",
    challenge: "Ciclo de venta de 6 meses. Los prospectos no veían la urgencia de su solución.",
    result: "Redujo el ciclo a 45 días con su nuevo mensaje. Los prospectos llegan educados y listos para comprar.",
    metrics: [
      { icon: Clock, text: "De 6 meses a 45 días" },
      { icon: TrendingUp, text: "4X en velocidad de cierre" },
      { icon: Users, text: "90% menos demos perdidas" }
    ],
    highlight: "Ciclo de venta 75% más corto"
  }
];

export function TransformationCases() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Fundadores que le Han Hecho <span className="text-primary">Justicia a su Trabajo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estos líderes se enfrentaron a la Injusticia Comercial y ganaron. Transformaron su negocio 
            al implementar un mensaje que por fin reflejaba su verdadero valor.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {transformationCases.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {caseStudy.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold">{caseStudy.name}</h3>
                      <p className="text-sm text-muted-foreground">{caseStudy.company}</p>
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-primary/5 rounded-lg">
                    <p className="text-lg font-semibold text-primary text-center">
                      {caseStudy.highlight}
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">ANTES:</p>
                      <p className="text-sm">{caseStudy.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-1">DESPUÉS:</p>
                      <p className="text-sm">{caseStudy.result}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    {caseStudy.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <metric.icon className="h-4 w-4 text-primary" />
                        <span>{metric.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground mb-2">
            Todos estos resultados comenzaron con el mismo paso:
          </p>
          <p className="text-xl font-semibold text-primary">
            Un Sprint de Claridad Comercial de 4 semanas
          </p>
        </motion.div>
      </div>
    </section>
  );
}