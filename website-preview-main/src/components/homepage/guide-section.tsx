import { motion } from 'framer-motion';

export function GuideSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              <span className="block">La lección más dura</span>
              <span className="block text-primary mt-2">de mi carrera.</span>
            </h2>
            
            <div className="space-y-5 mb-10">
              <p className="text-lg text-muted-foreground leading-relaxed">
                En Multiplica México, promoví a un excelente profesional como Director General. 
                Su plan era simple: invertir en perfiles senior para elevar la calidad, y las 
                ventas llegarían solas. Tenía sentido, así que aceptamos.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                La calidad mejoró notablemente. Las ventas no se movieron.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ese día entendí la injusticia fundamental del mercado: tener un servicio increíble no es suficiente. 
                Si no lo comunicas con la misma excelencia, el mercado no se entera por arte de magia. 
                La calidad te da el derecho a competir, pero no te garantiza la victoria.
              </p>
            </div>

            <p className="text-sm text-primary font-semibold">— Gaël Thomé, Fundador de Utópica</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}