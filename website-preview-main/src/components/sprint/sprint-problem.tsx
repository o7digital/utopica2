import { motion } from 'framer-motion';
import { MessageSquare, Users, Trophy } from 'lucide-react';

const problemPoints = [
  {
    icon: MessageSquare,
    title: "Cada reunión es reinventar la rueda",
    description: "Tus vendedores improvisan explicaciones diferentes. Los prospectos salen confundidos de las llamadas."
  },
  {
    icon: Trophy,
    title: "Tus casos de éxito no convencen",
    description: "Tienes clientes felices pero no sabes por qué eligieron trabajar contigo. No puedes replicar el éxito porque no entiendes el patrón."
  },
  {
    icon: Users,
    title: "El marketing genera leads que no cierran",
    description: "Muchas reuniones, pocas ventas. Los prospectos 'lo van a pensar' y desaparecen."
  }
];

export function SprintProblem() {
  return (
    <section className="min-h-screen flex items-center bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Tus Clientes Te Adoran</span>
            <span className="block text-primary">Pero Los Nuevos No Entienden Por Qué</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Esta es la paradoja más cruel: referencias increíbles, cero conversiones nuevas.
          </p>
        </motion.div>

        <div className="grid gap-8 mb-16">
          {problemPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-primary/5 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Esto es la "Injusticia Comercial"</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La brecha dolorosa entre la calidad real de tu servicio y 
            cómo el mercado lo percibe. Es frustrante, limitante y completamente evitable.
          </p>
        </motion.div>
      </div>
    </section>
  );
}