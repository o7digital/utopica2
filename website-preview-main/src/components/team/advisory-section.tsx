import { motion } from 'framer-motion';
import { AdvisorCard } from './advisor-card';

const advisors = [
  {
    name: "Olivier Sieuzac",
    role: "Consejero Independiente",
    image: "/images/team/olivier.jpg",
    description: "Líder empresarial con más de 20 años de experiencia internacional en finanzas y dirección digital.",
    highlights: [
      "Deputy CEO de EnviaFlores.com, la empresa líder de gifting en México",
      "Ex General Manager de Linio México y CFO de Grupo Linio",
      "Pionero en el desarrollo del e-commerce en Latinoamérica",
      "Experiencia en transformación digital y finanzas en GE Capital"
    ],
    linkedin: "https://www.linkedin.com/in/sieuzac/"
  },
  {
    name: "Dennis Brandl",
    role: "Consejero Independiente",
    image: "/images/team/dennis.jpg",
    description: "Visionario empresarial con una trayectoria probada en la construcción y escalamiento de empresas digitales.",
    highlights: [
      "Ex Managing Director de Valtech México",
      "Fundador de múltiples empresas digitales exitosas",
      "Experto en desarrollo de negocios digitales B2B/B2C",
      "Líder en transformación digital y cultura organizacional"
    ],
    linkedin: "https://www.linkedin.com/in/dennisbrandl/"
  },
  {
    name: "Warren Gutensohn",
    role: "Consejero Independiente",
    image: "/images/team/warren.jpg",
    description: "Líder innovador especializado en productos digitales y experiencia de usuario.",
    highlights: [
      "COO de baz súperapp",
      "Ex Head of Product en Rappi y RappiPay",
      "Experto en marketplaces y servicios financieros digitales",
      "Pionero en transformación digital en Latinoamérica"
    ],
    linkedin: "https://www.linkedin.com/in/warren-gutensohn/"
  },
  {
    name: "Michael Christian R. Collemiche",
    role: "Consejero Independiente",
    image: "/images/team/michael.jpg",
    description: "Ejecutivo global reconocido por su liderazgo en transformación data-driven.",
    highlights: [
      "Chief Revenue Officer en Algorithia",
      "Ex Executive Director CDAO en Belcorp",
      "Top 100 Innovadores Globales en Data & Analytics",
      "Fundador y VP de CDO LATAM"
    ],
    linkedin: "https://www.linkedin.com/in/michael-collemiche/"
  },
  {
    name: "Edouard Perromat",
    role: "Consejero Independiente",
    image: "/images/team/edouard.jpg",
    description: "Líder en innovación tecnológica con amplia experiencia en transformación empresarial.",
    highlights: [
      "Sr. Strategy Director - Breakthrough Innovation en PepsiCo",
      "Ex cofundador y Head of Operations & Product en Seemantik",
      "Experto en modelos de negocio basados en IA",
      "Especialista en transformación digital y analítica avanzada"
    ],
    linkedin: "https://www.linkedin.com/in/edouardperromat/"
  },
  {
    name: "Bernardo Torres",
    role: "Consejero Independiente",
    image: "/images/team/bernardo.jpg",
    description: "Estratega e innovador con amplia experiencia en diseño de negocios.",
    highlights: [
      "Fundador y Director de Uncommon",
      "Líder en transformación organizacional",
      "Experto en estrategia de negocios digitales",
      "Pionero en diseño de experiencias innovadoras"
    ],
    linkedin: "https://www.linkedin.com/in/torresbernardo/"
  },
  {
    name: "Miguel Angel Ruiz Torres",
    role: "Consejero Independiente",
    image: "/images/team/miguel-angel.jpg",
    description: "Emprendedor y experto en ventas con más de 15 años transformando equipos comerciales.",
    highlights: [
      "Fundador de Humanology Consulting Group",
      "Experto en desarrollo de equipos comerciales de alto rendimiento",
      "Implementador de metodologías de venta consultiva con resultados medibles",
      "Trabajó con Coppel, Boehringer Ingelheim, Banco de México y Walmart"
    ],
    linkedin: "https://www.linkedin.com/in/miguel-ruiz-humanology/"
  }
];

export const AdvisorySection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Consejo</span>
            <span className="block text-primary">Asesor</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Potenciando la Innovación Comercial
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            Nuestro Consejo Asesor reúne a líderes visionarios en ventas B2B, tecnología y 
            transformación empresarial. Su experiencia colectiva guía nuestra visión y asegura 
            que mantengamos el más alto nivel de excelencia e innovación.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advisors.map((advisor, index) => (
            <AdvisorCard key={advisor.name} advisor={advisor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};