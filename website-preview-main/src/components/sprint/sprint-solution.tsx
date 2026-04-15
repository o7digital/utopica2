import { motion } from 'framer-motion';
import { MessageSquare, Target, Presentation, CheckCircle2, Zap } from 'lucide-react';

const assets = [
  {
    category: "SEMANA 1: Habla el Idioma del Cliente",
    icon: MessageSquare,
    items: [
      "Narrativa de Marca: Mapea su realidad, no tu solución",
      "Propuesta de Valor: Expresa su transformación en una sola frase",
      "Visión del Cliente Transformado: Pinta el 'después' con tanta nitidez que puedan saborearlo"
    ]
  },
  {
    category: "SEMANA 2: Comunica Una Sola Cosa a la Vez",
    icon: Target,
    items: [
      "Escalera de Valor: Construye una autopista, no un laberinto",
      "Producto Estrella: Señaliza una única rampa de acceso",
      "Oferta Irresistible: Haz que tu ruta sea la más rápida y segura"
    ]
  },
  {
    category: "SEMANA 3: Muestra tu Mejor Cara",
    icon: Presentation,
    items: [
      "Perfil de LinkedIn: Invita a la fiesta con LinkedIn optimizado",
      "Página Web que Convierte: Recíbelos como se merecen en tu web",
      "Presentación Comercial: Sírveles el plato principal"
    ]
  },
  {
    category: "SEMANA 4: Activa Conversaciones que Convierten",
    icon: Zap,
    items: [
      "Sistema de Prospección: Descubre que ya tienes una lista valiosa",
      "Técnicas de Conversación: Transforma cada conversación en una oportunidad",
      "Proceso de Seguimiento: Mantén siempre conversaciones activas"
    ]
  }
];

export function SprintSolution() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Qué obtienes en 4 semanas</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            El Sprint de Claridad Comercial termina con la injusticia comercial en 4 semanas.{' '}
            <span className="font-semibold">Trabajarás con máximo 4 empresas más</span>{' '}
            para crear un mensaje que por fin le haga justicia a tu servicio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            Los 9 Activos Comerciales que te llevas:
          </h3>
          
          <div className="space-y-8">
            {assets.map((asset, index) => {
              const Icon = asset.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-card p-8 rounded-2xl border shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold text-primary">{asset.category}</h4>
                  </div>
                  
                  <div className="space-y-3 pl-16">
                    {asset.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + itemIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-primary/10 p-8 rounded-2xl border border-primary/20"
        >
          <p className="text-xl font-semibold">
            Total:{' '}
            <span className="text-primary">Terminas con la injusticia comercial de una vez por todas</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}