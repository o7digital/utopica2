"use client";

import { motion } from 'framer-motion';
import { MessageSquare, Target, Sparkles, Users, Navigation, Gift, UserCheck, Globe, Trophy, Calendar, Clock, Video, FileText } from 'lucide-react';

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
        description: "En lugar de hablar de tus productos, hablarás de sus dificultades, problemas y aspiraciones.",
        result: "Narrativa de Marca",
        icon: Users
      },
      {
        number: "1.2",
        title: "Expresa su transformación en una sola frase",
        description: "Captura el problema que resuelves y el resultado que ofreces en una frase clara y potente.",
        result: "Propuesta de Valor en una Frase",
        icon: Target
      },
      {
        number: "1.3",
        title: "Pinta el \"después\" con tanta nitidez que puedan saborearlo",
        description: "Describe esa nueva realidad de forma tan emocional y tangible que sientan la necesidad de alcanzarla.",
        result: "Visión del Cliente Transformado",
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
        description: "Presenta un camino directo y claro hacia su destino, eliminando la confusión de mil opciones.",
        result: "Escalera de Valor",
        icon: Navigation
      },
      {
        number: "2.2",
        title: "Señaliza una única rampa de acceso",
        description: "Identifica y destaca tu entrada principal para que sea la opción obvia.",
        result: "Producto Estrella",
        icon: Target
      },
      {
        number: "2.3",
        title: "Haz que tu ruta sea la más rápida y segura",
        description: "Demuestra resultados y garantías para que elegir otra ruta parezca un error.",
        result: "Oferta Irresistible",
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
        description: "Tu perfil de LinkedIn es la invitación oficial que dice al mercado que estás organizando algo valioso.",
        result: "Perfil de LinkedIn optimizado",
        icon: UserCheck
      },
      {
        number: "3.2",
        title: "Recíbelos como se merecen",
        description: "Tu web debe recibir a tus invitados con claridad y profesionalismo, como un buen anfitrión.",
        result: "Página Web que convierte",
        icon: Globe
      },
      {
        number: "3.3",
        title: "Sírveles el plato principal",
        description: "Sirve una propuesta tan exquisita que tus invitados se sientan honrados de haberla probado.",
        result: "Presentación Comercial diseñada para diferenciarte",
        icon: Gift
      }
    ]
  }
];

const sprintDetails = [
  {
    icon: Calendar,
    title: "4 Sesiones Semanales",
    description: "90 minutos vía Zoom con máximo 5 empresas"
  },
  {
    icon: Clock,
    title: "2-3 horas entre sesiones",
    description: "Trabajo individual con plantillas listas"
  },
  {
    icon: Video,
    title: "Grabaciones disponibles",
    description: "Acceso completo si no puedes asistir en vivo"
  },
  {
    icon: Users,
    title: "Hasta 3 personas de tu equipo",
    description: "Incluye a tu equipo sin costo adicional"
  }
];

export function SprintProcess() {
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
            <span className="block">De la Confusión a un Sistema Funcionando</span>
            <span className="block text-primary">en Solo 4 Semanas</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            En 4 semanas, construirás los 9 activos comerciales que harán justicia a tu servicio
          </p>
        </motion.div>

        <div className="space-y-16 mb-20">
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
                  <div className={`flex-shrink-0 w-20 h-20 rounded-full ${step.bgColor} border-4 ${step.borderColor} flex items-center justify-center`}>
                    <span className={`text-3xl font-bold ${step.color}`}>{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-4xl font-bold mb-3">
                      Semana {step.number}: {step.title}
                    </h3>
                    <p className="text-xl text-muted-foreground">
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
                        className="bg-background rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className={`h-8 w-8 ${step.color}`} />
                          <span className={`font-bold text-lg ${step.color}`}>Paso {substep.number}</span>
                        </div>
                        <h4 className="font-bold text-xl mb-3">{substep.title}</h4>
                        <p className="text-muted-foreground mb-4">{substep.description}</p>
                        <div className="pt-4 border-t">
                          <p className="text-sm font-semibold text-primary">Entregable:</p>
                          <p className="text-sm font-medium mt-1">{substep.result}</p>
                        </div>
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
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20 mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Cómo Funciona el Sprint
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sprintDetails.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="p-4 rounded-full bg-primary/10 inline-flex mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{detail.title}</h4>
                  <p className="text-muted-foreground text-sm">{detail.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-card rounded-2xl p-8 lg:p-12 border-2 border-primary"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Al Terminar el Sprint Tendrás:
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">9 Activos Comerciales Funcionando</h4>
                  <p className="text-muted-foreground">
                    Todo implementado y listo para que el mercado entienda tu valor
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Target className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Un Mensaje que Hace Justicia a tu Servicio</h4>
                  <p className="text-muted-foreground">
                    Por fin tu comunicación refleja la calidad de tu trabajo
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <Trophy className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">El Fin de la Injusticia Comercial</h4>
                  <p className="text-muted-foreground">
                    Tu calidad ya no estará escondida detrás de mensajes confusos
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Resultados que Reflejan tu Calidad</h4>
                  <p className="text-muted-foreground">
                    Los resultados de tu negocio finalmente hacen justicia a tu servicio
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center pt-6 border-t"
          >
            <p className="text-lg font-semibold text-primary">
              "La calidad de tu producto te da el derecho a competir, pero no te garantiza la victoria"
            </p>
            <p className="text-muted-foreground mt-2">
              Es hora de ganar con un mensaje que haga justicia a tu trabajo
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}