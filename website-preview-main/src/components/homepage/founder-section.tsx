import { motion } from 'framer-motion';

export function FounderSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Quién <span className="font-serif italic">está detrás</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            {/* Photo */}
            <motion.div
              className="md:col-span-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 40 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-2 scale-105" />
                <img
                  src="/images/team/gael-thome-new-hd.png"
                  alt="Gaël Thomé — Fundador de Utópica"
                  width={300}
                  height={400}
                  className="relative rounded-2xl object-cover shadow-xl w-full max-w-[280px]"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-1">Gaël Thomé</h3>
              <p className="text-primary font-medium mb-6">Fundador de Utópica</p>

              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Co-fundé varias empresas B2B. Escalé una. Viví cada uno de estos problemas: el mensaje confuso, el pipeline vacío, el equipo que no cierra.
                </p>
                <p>
                  No hablo de teoría. Hablo de lo que funciona porque lo probé primero conmigo.
                </p>
                <p>
                  Hoy, con Utópica, ayudo a fundadores B2B a instalar el sistema comercial que les permite crecer sin ser el cuello de botella.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
