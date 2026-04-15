"use client";

import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, CalendarCheck, Users } from 'lucide-react';
import { Link } from '@/components/ui/Link';

const services = [
  {
    icon: MessageSquare,
    problem: "No sé cómo comunicar mi valor",
    title: "Sprint de Claridad Comercial",
    description: "En 4 semanas defines tu mensaje: claro, relevante, diferenciador. Para que tus clientes entiendan por qué elegirte — y lo puedan explicar a otros.",
    href: "/sprint-claridad-comercial",
    cta: "Ver Sprint de Claridad",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    hoverBorder: "hover:border-blue-400",
    hoverShadow: "hover:shadow-blue-100/50"
  },
  {
    icon: CalendarCheck,
    problem: "Cierro bien, pero no tengo suficientes oportunidades",
    title: "Reuniones Bajo Demanda",
    description: "Un equipo dedicado que llena tu pipeline con decisores calificados. Tú cierras. Nosotros prospectamos.",
    href: "/reuniones-bajo-demanda",
    cta: "Ver Reuniones Bajo Demanda",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    hoverBorder: "hover:border-green-400",
    hoverShadow: "hover:shadow-green-100/50"
  },
  {
    icon: Users,
    problem: "Mi equipo no vende como yo",
    title: "Equipo Comercial Aumentado",
    description: "Instalamos un proceso comercial con IA. Tu equipo aprende a vender como tú — sin depender de ti.",
    href: "/equipo-comercial-aumentado",
    cta: "Ver Equipo Comercial Aumentado",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    hoverBorder: "hover:border-purple-400",
    hoverShadow: "hover:shadow-purple-100/50"
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 50 } }
};

export function ClarityPathSectionStatic() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-secondary/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="font-serif italic">¿Cuál es tu cuello de botella?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada empresa B2B tiene un problema distinto. Nosotros lo diagnosticamos y lo resolvemos.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.href}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`rounded-2xl border-2 ${service.borderColor} ${service.hoverBorder} ${service.bgColor} p-8 transition-all duration-300 hover:shadow-xl ${service.hoverShadow} flex flex-col cursor-pointer`}
              >
                <div className={`p-4 rounded-full ${service.bgColor} border ${service.borderColor} w-fit mb-6`}>
                  <Icon className={`h-8 w-8 ${service.color}`} />
                </div>

                <p className="text-sm font-medium text-muted-foreground mb-2 italic">
                  &ldquo;{service.problem}&rdquo;
                </p>

                <h3 className={`text-xl font-bold mb-3 ${service.color}`}>
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6 flex-1">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className={`inline-flex items-center font-semibold ${service.color} hover:underline group`}
                >
                  {service.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
