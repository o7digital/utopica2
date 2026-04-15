"use client";

import { motion } from 'framer-motion';
import { AlertTriangle, Target, Award } from 'lucide-react';

export function CommercialInjusticeSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            La Injusticia Comercial
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            La raíz del problema que vamos a resolver es una profunda injusticia: 
            profesionales y empresas con excelentes servicios no consiguen los clientes que merecen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-6">Mi Lección en Multiplica México</h3>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Aprendí esta lección de la forma más dura. Hace unos años, en Multiplica México, 
                promoví a un excelente profesional al rol de Director General. Él venía del mundo 
                del producto y tenía una convicción clara:
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2 italic">
                "Si invertimos en perfiles más senior para elevar la calidad de nuestros entregables, 
                nuestra reputación crecerá, la satisfacción de los clientes aumentará y las 
                oportunidades de negocio llegarán como un imán."
              </blockquote>
              <p>
                El plan nos hizo sentido a mi socio y a mí, así que aceptamos la inversión. 
                Y pasaron dos cosas:
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <p className="text-base">
                    Efectivamente, la calidad de nuestros proyectos mejoró notablemente.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                    <span className="text-destructive font-bold">2</span>
                  </div>
                  <p className="text-base">
                    No hubo ningún impacto significativo en las ventas.
                  </p>
                </div>
              </div>
              <p className="text-xl font-semibold text-foreground">
                Ese día entendí la gran verdad de la injusticia comercial: tener un producto 
                increíble no es suficiente. Si no eres capaz de comunicarlo con la misma 
                excelencia, el mercado no se entera por arte de magia.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              El Verdadero Campo de Batalla
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              La calidad de tu producto te da el <span className="font-semibold text-foreground">derecho</span> a competir, 
              pero no te garantiza la victoria. Para ganar, necesitas un mensaje que le haga justicia a tu servicio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="p-4 rounded-full bg-primary/10 mb-4 mx-auto w-fit">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-xl mb-2">CLARO</h4>
              <p className="text-muted-foreground">
                Para que cualquier persona lo entienda sin esfuerzo
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="p-4 rounded-full bg-primary/10 mb-4 mx-auto w-fit">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-xl mb-2">RELEVANTE</h4>
              <p className="text-muted-foreground">
                Para que a tu cliente ideal le importe de inmediato
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="p-4 rounded-full bg-primary/10 mb-4 mx-auto w-fit">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-xl mb-2">ÚNICO</h4>
              <p className="text-muted-foreground">
                Para que te elijan a ti y no a tu competencia
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-xl font-semibold text-foreground">
              Lograr que tu comunicación cumpla estos tres criterios es el único camino 
              para comunicar tu verdadero valor y terminar con la injusticia comercial.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}