import { MessageSquare, Users, Trophy } from 'lucide-react';

type Lang = 'es' | 'en';

const problemPoints = {
  es: [
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
  ],
  en: [
    {
      icon: MessageSquare,
      title: "Every meeting is reinventing the wheel",
      description: "Your reps improvise different explanations. Prospects leave calls confused."
    },
    {
      icon: Trophy,
      title: "Your success stories don't persuade",
      description: "You have happy clients but don't know why they chose you. You can't replicate success because you don't see the pattern."
    },
    {
      icon: Users,
      title: "Marketing brings leads that don't close",
      description: `Lots of meetings, few sales. Prospects "think about it" and disappear.`
    }
  ]
};

const headers = {
  es: {
    line1: "Tus Clientes Te Adoran",
    line2: "Pero Los Nuevos No Entienden Por Qué",
    description: "Esta es la paradoja más cruel: referencias increíbles, cero conversiones nuevas.",
    blockTitle: 'Esto es la "Injusticia Comercial"',
    blockDescription:
      "La brecha dolorosa entre la calidad real de tu servicio y cómo el mercado lo percibe. Es frustrante, limitante y completamente evitable.",
  },
  en: {
    line1: "Your Customers Love You",
    line2: "But New Prospects Don't Get Why",
    description: "This is the cruelest paradox: incredible referrals, zero new conversions.",
    blockTitle: 'This is the "Commercial Injustice"',
    blockDescription:
      "The painful gap between the true quality of your service and how the market perceives it. It's frustrating, limiting, and completely avoidable.",
  },
} as const;

export function SprintProblemStatic({ lang = 'es' }: { lang?: Lang }) {
  const t = headers[lang];
  return (
    <section className="min-h-screen flex items-center bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">{t.line1}</span>
            <span className="block text-primary">{t.line2}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid gap-8 mb-16">
          {problemPoints[lang].map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
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
              </div>
            );
          })}
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">{t.blockTitle}</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.blockDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
