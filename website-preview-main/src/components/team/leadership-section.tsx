import { motion } from 'framer-motion';
import { TeamMember } from './team-member';

const teamMembers = [
  {
    name: "Gaël Thomé",
    role: "Fundador",
    image: "/images/team/gael-thome-new.jpg",
    quote: "El crecimiento sostenible no se trata de hacer más, sino de hacer menos y mejor.",
    description: "Co-fundé varias empresas B2B. Escalé una — Multiplica — donde duplicamos el tamaño año tras año durante más de una década, liderando un equipo de 400+ personas y estableciendo relaciones con clientes enterprise como Telcel, Coppel y BBVA.",
    experience: "Viví cada problema que resolvemos en Utópica: el mensaje que no diferencia, el pipeline que depende de referidos, el equipo que no vende como el fundador. Hoy integro IA en procesos comerciales para que los fundadores B2B dejen de ser el cuello de botella de su propia empresa.",
    achievements: [
      { value: "10+", label: "Años de experiencia en crecimiento B2B" },
      { value: "2X", label: "Crecimiento anual sostenido en Multiplica" },
      { value: "400+", label: "Personas lideradas" }
    ],
    highlights: [
      "Multilingüe: Francés, Portugués, Español e Inglés",
      "2x crecimiento anual sostenido en Multiplica",
      "400+ personas lideradas",
      "Integración de IA en procesos comerciales B2B"
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