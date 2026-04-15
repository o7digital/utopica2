import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollTracking } from '@/hooks/use-scroll-tracking';

const testimonials = [
  {
    name: "María González",
    company: "Directora, Consultora Digital MG",
    avatar: "MG",
    quote: "En mi primera semana después del Sprint cerré 2 ventas sin estar presente. Mi equipo usó el pitch que creamos y funcionó perfectamente.",
    highlight: "2 ventas cerradas = $84,000 MXN",
    subhighlight: "ROI del 287% en 7 días",
    rating: 5,
    industry: "Consultoría Digital"
  },
  {
    name: "Carlos Rodríguez",
    company: "CEO, Soluciones Tech CR",
    avatar: "CR",
    quote: "Pasé de competir por precio a cobrar 3x más. Los clientes ahora entienden nuestro valor desde el primer contacto.",
    highlight: "De $15K a $45K por proyecto",
    subhighlight: "300% aumento en pricing",
    rating: 5,
    industry: "Desarrollo de Software"
  },
  {
    name: "Ana Martínez",
    company: "Fundadora, AM Marketing B2B",
    avatar: "AM",
    quote: "El Sprint me dio exactamente lo que prometió: 9 herramientas listas para usar. Mi LinkedIn ahora genera 5 leads calificados por semana.",
    highlight: "20 leads/mes = 4 clientes nuevos",
    subhighlight: "Pipeline de $240K MXN",
    rating: 5,
    industry: "Agencia de Marketing"
  }
];

const companies = [
  "Tech Solutions MX",
  "Innovate Consulting",
  "Digital Growth Co",
  "Strategic Partners",
  "NextGen Services"
];

export function SprintTestimonials() {
  const sectionRef = useScrollTracking('sprint_testimonials');
  
  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">50+ Fundadores Ya Tienen</span>
            <span className="block text-primary">Su Mensaje Trabajando 24/7</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Estos son algunos de los resultados que lograron en sus primeros 30 días
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="bg-primary/5 rounded-lg p-3 mb-4">
                    <p className="text-sm font-semibold text-primary text-center">
                      {testimonial.highlight}
                    </p>
                    {testimonial.subhighlight && (
                      <p className="text-xs text-primary/70 text-center mt-1">
                        {testimonial.subhighlight}
                      </p>
                    )}
                  </div>

                  <Quote className="h-8 w-8 text-primary/20 mb-3" />
                  
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      {testimonial.industry && (
                        <p className="text-xs text-muted-foreground">{testimonial.industry}</p>
                      )}
                    </div>
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
          className="bg-primary/5 rounded-2xl p-8 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">Empresas transformadas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">93%</p>
              <p className="text-sm text-muted-foreground">Logran 3+ ventas en 30 días</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">2.8x</p>
              <p className="text-sm text-muted-foreground">ROI promedio</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">4.9/5</p>
              <p className="text-sm text-muted-foreground">Satisfacción del cliente</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}