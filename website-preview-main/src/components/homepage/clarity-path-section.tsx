import { motion } from 'framer-motion';
import { MessageSquare, Target, Sparkles, Users, Navigation, Gift, UserCheck, Globe, Trophy } from 'lucide-react';

const steps = [
  {
    number: "1",
    title: "Hablar el Idioma de tu Cliente",
    description: "Conecta desde su realidad, no desde tu solución",
    icon: MessageSquare,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    substeps: [
      {
        number: "1.1",
        title: "Mapea su realidad, no tu solución",
        description: "Habla de sus dificultades, problemas y aspiraciones. Construye tu Narrativa de Marca.",
        icon: Users
      },
      {
        number: "1.2",
        title: "Expresa su transformación en una sola frase",
        description: "Captura el problema que resuelves y el resultado que ofreces. Define tu Propuesta de Valor.",
        icon: Target
      },
      {
        number: "1.3",
        title: "Pinta el \"después\" con tanta nitidez que puedan saborearlo",
        description: "Describe su nueva realidad de forma tangible. Crea tu Visión del Cliente Transformado.",
        icon: Sparkles
      }
    ]
  },
  {
    number: "2",
    title: "Comunicar UNA Sola Cosa a la Vez",
    description: "Diseña una autopista clara, no un laberinto de opciones",
    icon: Navigation,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    substeps: [
      {
        number: "2.1",
        title: "Construye una autopista, no un laberinto",
        description: "Presenta un camino directo y claro. Diseña tu Escalera de Valor.",
        icon: Navigation
      },
      {
        number: "2.2",
        title: "Señaliza una única rampa de acceso",
        description: "Identifica y destaca tu entrada principal. Define tu Producto Estrella.",
        icon: Target
      },
      {
        number: "2.3",
        title: "Haz que tu ruta sea la más rápida y segura",
        description: "Demuestra resultados y garantías. Crea tu Oferta Irresistible.",
        icon: Trophy
      }
    ]
  },
  {
    number: "3",
    title: "Muestra tu Mejor Cara",
    description: "Sé el anfitrión excepcional que tus clientes merecen",
    icon: UserCheck,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    substeps: [
      {
        number: "3.1",
        title: "Invita a la fiesta",
        description: "Tu perfil de LinkedIn es la invitación oficial. Optimiza tu presencia profesional.",
        icon: UserCheck
      },
      {
        number: "3.2",
        title: "Recíbelos como se merecen",
        description: "Tu página web demuestra profesionalismo. Crea una Web que Convierte.",
        icon: Globe
      },
      {
        number: "3.3",
        title: "Sírveles el plato principal",
        description: "Tu propuesta es el momento cumbre. Diseña tu Presentación Comercial.",
        icon: Gift
      }
    ]
  }
];

export function ClarityPathSection() {
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
            El Camino hacia la Claridad
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            El problema de la claridad comercial se resuelve en tres grandes pasos:
          </p>
        </motion.div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              <div className={`rounded-2xl border-2 ${step.borderColor} ${step.bgColor} p-8 md:p-12`}>
                <div className="flex items-start gap-6 mb-8">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full ${step.bgColor} border-2 ${step.borderColor} flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${step.color}`}>{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      PASO {step.number}: {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {step.substeps.map((substep, subIndex) => {
                    const Icon = substep.icon;
                    return (
                      <motion.div
                        key={substep.number}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * subIndex }}
                        className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className={`h-6 w-6 ${step.color}`} />
                          <span className={`font-semibold ${step.color}`}>{substep.number}</span>
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{substep.title}</h4>
                        <p className="text-sm text-muted-foreground">{substep.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              El Fin de la Injusticia
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Ya no se trata de trabajar más duro en la calidad de tu servicio, 
              sino de trabajar con más inteligencia en la calidad de tu mensaje.
            </p>
            <p className="text-lg font-semibold">
              Es el momento de hacerle justicia a lo que ofreces y organizar 
              la fiesta que tus clientes siempre han estado esperando.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}