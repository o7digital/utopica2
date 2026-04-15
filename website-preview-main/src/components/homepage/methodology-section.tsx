import { motion } from 'framer-motion';
import { MessageSquare, Target, Zap, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';


export function MethodologySection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            El Primer Paso: <span className="text-primary">La Claridad es tu Mejor Herramienta</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Para que tus ventas reflejen tu calidad, no necesitas un plan complejo. 
            Necesitas una sola cosa: un mensaje tan claro y potente que sea imposible de ignorar.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nuestro Sprint de Claridad Comercial es un programa intensivo diseñado para construir ese mensaje. 
            En solo unas semanas, trabajaremos juntos para:
          </p>
        </motion.div>


        <div className="space-y-12 mb-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card p-8 rounded-2xl border"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <MessageSquare className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Habla el Idioma del Cliente</h3>
                <p className="text-muted-foreground leading-relaxed">
                  En lugar de hablar de tus servicios, habla de sus problemas y aspiraciones. 
                  Mapea su realidad actual, expresa la transformación que buscan en una sola frase potente, 
                  y pinta su futuro con tanta claridad que pueda saborearlo. El resultado: una narrativa 
                  de marca que conecta al instante.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card p-8 rounded-2xl border"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Comunica UNA Sola Cosa a la Vez</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tu oferta debe ser como una autopista bien señalizada, no un cruce caótico de opciones. 
                  Diseña una escalera de valor clara, identifica tu producto estrella como rampa de entrada, 
                  y hazlo tan irresistible que elegir otra opción parezca un error. Simplicidad que vende.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-8 rounded-2xl border"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <Zap className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Muestra tu Mejor Cara</h3>
                <p className="text-muted-foreground leading-relaxed">
                  No mostrar tu mejor cara es una falta de respeto hacia tus clientes. Tu LinkedIn es 
                  la invitación a la fiesta, tu web es cómo los recibes en casa, y tu presentación 
                  comercial es el plato principal que sirves. Cada punto de contacto debe estar a la 
                  altura de la calidad de tu trabajo.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-primary/5 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold mb-4">
            Este primer paso no es teoría.
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Es un plan de acción concreto que te entrega las herramientas para empezar 
            a hacerle justicia a tu trabajo de inmediato.
          </p>
          <TrackedCTAButton
            href="/sprint-claridad-comercial"
            trackingLocation="methodology_section"
            size="lg"
            className="text-base"
          >
            Conocer el Sprint de Claridad
            <ArrowRight className="ml-2 h-5 w-5" />
          </TrackedCTAButton>
        </motion.div>
      </div>
    </section>
  );
}