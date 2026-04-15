import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from './team-member';

const teamMembers = [
  {
    name: "Gael Thomé",
    role: "Cofundador",
    image: "/images/team/gael-thome-new.jpg",
    quote: "El crecimiento sostenible no se trata de hacer 'más', sino de hacer 'menos y mejor'.",
    description: "Esta filosofía me llevó a fundar Utópica después de descubrir una verdad fundamental en mi trayectoria como líder empresarial.",
    experience: "Durante más de una década liderando el crecimiento de Multiplica, donde duplicamos el tamaño de la empresa año tras año, aprendí que la verdadera escalabilidad viene de la claridad estratégica y la ejecución inteligente.",
    achievements: [
      { value: "10+", label: "Años de experiencia" },
      { value: "2X", label: "Crecimiento anual" },
      { value: "400+", label: "Empleados liderados" }
    ],
    highlights: [
      "Multilingüe (Francés, Portugués, Español e Inglés nativos/profesionales)",
      "Líder en crecimiento empresarial B2B (logró duplicar Multiplica anualmente por una década)",
      "Experto en establecer relaciones estratégicas con clientes enterprise (Telcel, Coppel, BBVA)",
      "Pionero en integración de IA en procesos comerciales",
      "Especialista en crecimiento sostenible para empresas de servicios profesionales"
    ],
    linkedin: "https://www.linkedin.com/in/gaelthome/"
  }
];

export const LeadershipSection = () => {
  return (
    <section className="pt-8 pb-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          <span className="text-primary">Liderazgo</span>
        </motion.h2>

        <div className="space-y-16 md:space-y-32">
          {teamMembers.map((member, index) => (
            <TeamMember key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};