import { motion } from 'framer-motion';
import { Wrench, GraduationCap, Headphones } from 'lucide-react';

const sections = [
  {
    icon: Wrench,
    title: "Herramientas digitales sobre IA",
    subtitle: "No documentos — herramientas funcionales",
    items: [
      "Plugins de prospección: Research de mercado, construcción de listas, redacción de mensajes — ejecutables con un comando",
      "Skills de calificación: Discovery estructurado, scoring de oportunidades, análisis de transcripciones — integrados en el flujo diario",
      "Skills de venta: Generación de propuestas, seguimiento sistemático, preparación de reuniones — listos para usar",
      "Tableros HTML (Mission Control): Dashboards interactivos de pipeline, métricas y actividad — visibilidad en tiempo real",
      "Todo adaptado a tu industria, tu proceso y tu tipo de negocio"
    ]
  },
  {
    icon: GraduationCap,
    title: "Capacitación",
    subtitle: "Tu equipo aprende haciendo",
    items: [
      "Venta consultiva: Tu equipo aprende a hacer discovery, calificar y cerrar",
      "Dominio de las herramientas: Practican con los plugins y skills hasta que los dominan",
      "Certificación: Validamos que realmente saben antes de soltarlos"
    ]
  },
  {
    icon: Headphones,
    title: "Acompañamiento",
    subtitle: "No te dejamos solo",
    items: [
      "Diagnóstico inicial: Entendemos tu proceso actual antes de cambiarlo",
      "Implementación guiada: Instalamos y configuramos cada plugin, skill y tablero en tu entorno",
      "Soporte post-instalación: Resolvemos dudas, ajustamos configuraciones y agregamos lo que haga falta"
    ]
  }
];

export function EquipoAumentadoIncluye() {
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
            Qué incluye
          </h2>
        </motion.div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-card rounded-2xl p-8 border shadow-sm"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{section.title}</h3>
                    <p className="text-muted-foreground">{section.subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-3 ml-16">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary/40 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
