"use client";

import { motion } from 'framer-motion';
import { Quote, ArrowRight, TrendingUp } from 'lucide-react';

const testimonials = [
  {
    name: "Carlos Mendoza",
    company: "TechConsult México",
    role: "CEO & Fundador",
    industry: "Consultoría IT",
    before: {
      message: "Ayudamos a empresas con transformación digital",
      problem: "Genérico y olvidable. Competíamos por precio."
    },
    after: {
      message: "Eliminamos el caos tecnológico que frena el crecimiento de las medianas empresas",
      result: "3 clientes nuevos en 45 días. Precio promedio +40%"
    },
    quote: "En 4 semanas logramos más claridad que en 2 años intentándolo solos. Ahora los clientes nos buscan, no al revés."
  },
  {
    name: "Ana López",
    company: "Strategia B2B",
    role: "Directora General",
    industry: "Consultoría Estratégica",
    before: {
      message: "Somos expertos en estrategia empresarial y mejora de procesos",
      problem: "Nadie entendía qué hacíamos diferente."
    },
    after: {
      message: "Duplicamos la velocidad de crecimiento de empresas de $50-200M sin aumentar su nómina",
      result: "Pipeline x3 en 60 días. Cerramos el cliente más grande de nuestra historia."
    },
    quote: "El Sprint no solo clarificó nuestro mensaje, transformó cómo vemos nuestro propio negocio."
  },
  {
    name: "Roberto Gutiérrez",
    company: "InnovaHR",
    role: "Socio Director",
    industry: "Consultoría RRHH",
    before: {
      message: "Ofrecemos soluciones integrales de recursos humanos",
      problem: "Sonábamos igual a 100 consultoras más."
    },
    after: {
      message: "Convertimos el talento disperso en equipos de alto rendimiento que triplican resultados",
      result: "De 3 meses a 2 semanas el ciclo de venta. ROI de 8x en 90 días."
    },
    quote: "La claridad que logramos se convirtió en ventas casi de inmediato. Es impresionante."
  }
];

export function SprintTestimonialsReal() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Fundadores Como Tú</span>
            <span className="block text-primary">Que Ya Lograron Claridad</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            No teorías. No promesas. Resultados reales de empresas B2B 
            que transformaron su mensaje en 4 semanas.
          </p>
        </motion.div>

        <div className="space-y-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card rounded-2xl border shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-muted-foreground">
                      {testimonial.role} en {testimonial.company}
                    </p>
                    <p className="text-sm text-primary font-medium mt-1">
                      {testimonial.industry}
                    </p>
                  </div>
                  <Quote className="h-8 w-8 text-primary/30" />
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-destructive flex items-center gap-2">
                      ANTES del Sprint
                    </h4>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="font-medium mb-2">Su mensaje:</p>
                      <p className="text-muted-foreground italic">"{testimonial.before.message}"</p>
                    </div>
                    <p className="text-sm text-destructive">
                      ❌ {testimonial.before.problem}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600 flex items-center gap-2">
                      DESPUÉS del Sprint
                      <ArrowRight className="h-4 w-4" />
                    </h4>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="font-medium mb-2">Su mensaje:</p>
                      <p className="font-medium text-green-900">"{testimonial.after.message}"</p>
                    </div>
                    <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {testimonial.after.result}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-lg italic text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-sm font-semibold mt-3">
                    — {testimonial.name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-muted-foreground">
            <span className="font-semibold">Nota:</span> Estos son resultados reales. 
            Los tuyos dependerán de tu mercado y ejecución.
          </p>
        </motion.div>
      </div>
    </section>
  );
}