import { motion } from 'framer-motion';
import { Lightbulb, Hammer, Rocket, CheckCircle2 } from 'lucide-react';

const phases = [
  {
    week: "Semana 1-2",
    title: "CLARIFICAR",
    subtitle: "Descubrimos tu valor único",
    icon: Lightbulb,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    activities: [
      "Descubrir tu diferenciador oculto",
      "Mapear el journey de decisión B2B",
      "Validar tu núcleo de mensaje"
    ],
    result: "Mensaje central cristalizado"
  },
  {
    week: "Semana 3", 
    title: "CONSTRUIR",
    subtitle: "Creamos tus herramientas",
    icon: Hammer,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    activities: [
      "Crear tus 9 activos comerciales",
      "Integrar mensaje en cada touchpoint",
      "Preparar materiales para tu equipo"
    ],
    result: "Kit comercial completo"
  },
  {
    week: "Semana 4",
    title: "IMPLEMENTAR",
    subtitle: "Activamos tu sistema",
    icon: Rocket,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    activities: [
      "Entrenar a tu equipo comercial",
      "Ajustar con feedback real",
      "Medir primeros resultados"
    ],
    result: "Sistema funcionando"
  }
];

export function SprintJourneyMap() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">EL PROCESO</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Tu Transformación</span>
            <span className="block text-primary">en 4 Semanas</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Un proceso intensivo y probado que te lleva de la confusión a la claridad total.
            Cada semana construye sobre la anterior para garantizar resultados.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Línea conectora en desktop */}
          <div className="hidden lg:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 z-0" />
          
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative z-10"
              >
                <div className={`bg-card rounded-2xl p-8 border-2 ${phase.borderColor} shadow-lg hover:shadow-xl transition-all h-full`}>
                  {/* Week indicator */}
                  <div className={`inline-flex items-center gap-2 ${phase.bgColor} ${phase.color} px-3 py-1 rounded-full text-sm font-semibold mb-6`}>
                    {phase.week}
                  </div>
                  
                  {/* Icon and title */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-full ${phase.bgColor} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 ${phase.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{phase.title}</h3>
                    <p className="text-muted-foreground">{phase.subtitle}</p>
                  </div>
                  
                  {/* Activities */}
                  <div className="space-y-3 mb-6">
                    {phase.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-start gap-3">
                        <CheckCircle2 className={`h-5 w-5 mt-0.5 flex-shrink-0 ${phase.color}`} />
                        <p className="text-sm">{activity}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Result */}
                  <div className={`${phase.bgColor} rounded-lg p-4 text-center`}>
                    <p className="text-sm font-semibold">Resultado:</p>
                    <p className={`${phase.color} font-bold`}>{phase.result}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Al Final del Sprint Tendrás:</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <CheckCircle2 className="h-6 w-6 text-primary mb-2" />
                <p className="font-semibold">Mensaje Claro</p>
                <p className="text-sm text-muted-foreground">Que todos entienden</p>
              </div>
              <div>
                <CheckCircle2 className="h-6 w-6 text-primary mb-2" />
                <p className="font-semibold">9 Herramientas</p>
                <p className="text-sm text-muted-foreground">Listas para usar</p>
              </div>
              <div>
                <CheckCircle2 className="h-6 w-6 text-primary mb-2" />
                <p className="font-semibold">Equipo Alineado</p>
                <p className="text-sm text-muted-foreground">Vendiendo igual</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}