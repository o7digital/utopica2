import { motion } from 'framer-motion';
import { MessageSquare, Target, Sparkles, Users, Navigation, Gift, UserCheck, Globe, Trophy, Calendar, Clock, Video, FileText } from 'lucide-react';

type Lang = 'es' | 'en';

const steps: Record<
  Lang,
  {
    number: string;
    title: string;
    description: string;
    icon: typeof MessageSquare;
    color: string;
    bgColor: string;
    borderColor: string;
    substeps: {
      number: string;
      title: string;
      description: string;
      result: string;
      icon: typeof MessageSquare;
    }[];
  }[]
> = {
  es: [
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
  ],
  en: [
    {
      number: "1",
      title: "Speak Your Buyer's Language",
      description: "Connect from their reality, not from your solution",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      substeps: [
        {
          number: "1.1",
          title: "Map their reality, not your solution",
          description: "Instead of talking about your products, you'll talk about their struggles, problems, and aspirations.",
          result: "Brand Narrative",
          icon: Users
        },
        {
          number: "1.2",
          title: "Express their transformation in one sentence",
          description: "Capture the problem you solve and the outcome you deliver in one clear, powerful line.",
          result: "One-Sentence Value Proposition",
          icon: Target
        },
        {
          number: "1.3",
          title: "Paint the 'after' so vividly they can taste it",
          description: "Describe that new reality in an emotional, tangible way so they feel the urge to reach it.",
          result: "Transformed Client Vision",
          icon: Sparkles
        }
      ]
    },
    {
      number: "2",
      title: "Communicate ONE Thing at a Time",
      description: "Design a clear highway, not a maze of options",
      icon: Navigation,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      substeps: [
        {
          number: "2.1",
          title: "Build a highway, not a maze",
          description: "Present a direct, clear path to their destination, removing the confusion of countless options.",
          result: "Value Ladder",
          icon: Navigation
        },
        {
          number: "2.2",
          title: "Signpost one on-ramp",
          description: "Identify and spotlight your main entry point so it is the obvious choice.",
          result: "Hero Product",
          icon: Target
        },
        {
          number: "2.3",
          title: "Make your route the fastest and safest",
          description: "Prove results and guarantees so choosing another route feels like a mistake.",
          result: "Irresistible Offer",
          icon: Trophy
        }
      ]
    },
    {
      number: "3",
      title: "Show Your Best Side",
      description: "Be the exceptional host your clients deserve",
      icon: UserCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      substeps: [
        {
          number: "3.1",
          title: "Send the invitation",
          description: "Your LinkedIn profile is the official invitation telling the market you're hosting something valuable.",
          result: "Optimized LinkedIn Profile",
          icon: UserCheck
        },
        {
          number: "3.2",
          title: "Welcome them properly",
          description: "Your site should greet visitors with clarity and professionalism, like a good host.",
          result: "Website that Converts",
          icon: Globe
        },
        {
          number: "3.3",
          title: "Serve the main course",
          description: "Deliver a proposal so good your guests feel honored to have tasted it.",
          result: "Sales Presentation Designed to Differentiate",
          icon: Gift
        }
      ]
    }
  ]
};

const sprintDetails: Record<Lang, { icon: typeof Calendar; title: string; description: string }[]> = {
  es: [
    { icon: Calendar, title: "4 Sesiones Semanales", description: "90 minutos vía Zoom con máximo 5 empresas" },
    { icon: Clock, title: "2-3 horas entre sesiones", description: "Trabajo individual con plantillas listas" },
    { icon: Video, title: "Grabaciones disponibles", description: "Acceso completo si no puedes asistir en vivo" },
    { icon: Users, title: "Hasta 3 personas de tu equipo", description: "Incluye a tu equipo sin costo adicional" },
  ],
  en: [
    { icon: Calendar, title: "4 Weekly Sessions", description: "90 minutes on Zoom with max 5 companies" },
    { icon: Clock, title: "2–3 hours between sessions", description: "Individual work with ready-to-use templates" },
    { icon: Video, title: "Recordings available", description: "Full access if you can't attend live" },
    { icon: Users, title: "Up to 3 people from your team", description: "Bring your team at no extra cost" },
  ],
};

const copy = {
  es: {
    heading1: 'De la Confusión a un Sistema Funcionando',
    heading2: 'en Solo 4 Semanas',
    intro: 'En 4 semanas, construirás los 9 activos comerciales que harán justicia a tu servicio',
    howItWorks: 'Cómo Funciona el Sprint',
    deliverablesTitle: 'Al Terminar el Sprint Tendrás:',
    deliverables: [
      { title: '9 Activos Comerciales Funcionando', text: 'Todo implementado y listo para que el mercado entienda tu valor' },
      { title: 'Un Mensaje que Hace Justicia a tu Servicio', text: 'Por fin tu comunicación refleja la calidad de tu trabajo' },
      { title: 'El Fin de la Injusticia Comercial', text: 'Tu calidad ya no estará escondida detrás de mensajes confusos' },
      { title: 'Resultados que Reflejan tu Calidad', text: 'Los resultados de tu negocio finalmente hacen justicia a tu servicio' },
    ],
    quote: '"La calidad de tu producto te da el derecho a competir, pero no te garantiza la victoria"',
    quoteSub: 'Es hora de ganar con un mensaje que haga justicia a tu trabajo',
  },
  en: {
    heading1: 'From Confusion to a Working System',
    heading2: 'in Just 4 Weeks',
    intro: 'In 4 weeks you will build the 9 commercial assets that do justice to your service.',
    howItWorks: 'How the Sprint Works',
    deliverablesTitle: "By the End of the Sprint You'll Have:",
    deliverables: [
      { title: '9 Commercial Assets Running', text: 'Everything implemented so the market understands your value' },
      { title: 'A Message that Does Justice to Your Service', text: 'Your communication finally reflects your quality' },
      { title: 'The End of Commercial Injustice', text: 'Your quality is no longer hidden behind confusing messaging' },
      { title: 'Results that Reflect Your Quality', text: 'Your business results finally match the caliber of your service' },
    ],
    quote: 'The quality of your product gives you the right to compete, but it does not guarantee victory.',
    quoteSub: "It's time to win with a message that does justice to your work.",
  },
} as const;

export function SprintProcess({ lang = 'es' }: { lang?: Lang }) {
  const t = copy[lang];
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
            <span className="block">{t.heading1}</span>
            <span className="block text-primary">{t.heading2}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            {t.intro}
          </p>
        </motion.div>

        <div className="space-y-16 mb-20">
          {steps[lang].map((step, index) => (
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
                      {lang === 'es' ? <>Semana {step.number}: {step.title}</> : <>Week {step.number}: {step.title}</>}
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
                          <span className={`font-bold text-lg ${step.color}`}>{lang === 'es' ? 'Paso' : 'Step'} {substep.number}</span>
                        </div>
                        <h4 className="font-bold text-xl mb-3">{substep.title}</h4>
                        <p className="text-muted-foreground mb-4">{substep.description}</p>
                        <div className="pt-4 border-t">
                          <p className="text-sm font-semibold text-primary">{lang === 'es' ? 'Entregable:' : 'Deliverable:'}</p>
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
            {t.howItWorks}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sprintDetails[lang].map((detail, index) => {
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
            {t.deliverablesTitle}
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              {[t.deliverables[0], t.deliverables[1]].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  {(idx === 0 ? <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" /> : <Target className="h-6 w-6 text-primary flex-shrink-0 mt-1" />)}
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4"
            >
              {[t.deliverables[2], t.deliverables[3]].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  {(idx === 0 ? <Trophy className="h-6 w-6 text-primary flex-shrink-0 mt-1" /> : <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />)}
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
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
              {t.quote}
            </p>
            <p className="text-muted-foreground mt-2">
              {t.quoteSub}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
