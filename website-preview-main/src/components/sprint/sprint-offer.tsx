import { motion } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle2, Package, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Lang = 'es' | 'en';

const stackItems: Record<Lang, string[]> = {
  es: [
    "12 Sesiones Grupales en Vivo (3 por semana)",
    "Grupo Exclusivo de Máximo 5 Empresas",
    "9 Activos Comerciales Listos para Usar",
    "Elevator Pitch + One-Pager + Presentación de Ventas",
    "Scripts de Discovery + Propuesta + Email Sequences",
    "LinkedIn Optimizado + Landing Page + FAQ Comercial",
    "Grabaciones de Todas las Sesiones",
    "Bonus #1: Masterclass 'Conversaciones que Convierten'",
    "Bonus #2: Acceso de Por Vida a Kit de Claridad Comercial",
    "Bonus #3: Sesión 5 - La Cosecha de Victorias",
    "Garantía: Trabajo hasta lograr tu Claridad"
  ],
  en: [
    "12 Live Group Sessions (3 per week)",
    "Exclusive Group of up to 5 Companies",
    "9 Ready-to-Use Commercial Assets",
    "Elevator Pitch + One-Pager + Sales Deck",
    "Discovery Scripts + Proposal + Email Sequences",
    "Optimized LinkedIn + Landing Page + Sales FAQ",
    "Recordings of All Sessions",
    'Bonus #1: Masterclass "Conversations that Convert"',
    "Bonus #2: Lifetime Access to Commercial Clarity Kit",
    "Bonus #3: Session 5 – Harvesting Wins",
    "Guarantee: We work until you get Clarity"
  ],
};

const packages: Record<
  Lang,
  {
    id: string;
    icon: typeof Package;
    name: string;
    subtitle: string;
    price: string;
    features: string[];
    recommended: boolean;
    cta: string;
    spots: string;
  }[]
> = {
  es: [
    {
      id: "entry",
      icon: Package,
      name: "Sprint de Claridad Comercial",
      subtitle: "Todo lo esencial para transformar tu mensaje",
      price: "$32,500 MXN",
      features: [
        "Acceso completo al Sprint de 4 semanas",
        "Los 9 activos comerciales completos",
        "Grupo reducido de máximo 5 empresas",
        "Grabaciones de todas las sesiones",
        "Bonus #1: Masterclass incluida"
      ],
      recommended: false,
      cta: "Reservar Mi Lugar",
      spots: "Solo 4 lugares disponibles"
    },
    {
      id: "premium",
      icon: Crown,
      name: "Círculo Interno de Claridad Comercial",
      subtitle: "Máxima aceleración con implementación asistida",
      price: "$58,500 MXN",
      features: [
        "TODO del Sprint de Claridad Comercial",
        "+ 4 sesiones 1:1 de implementación",
        "+ Revisión personalizada de tus activos",
        "+ Acceso prioritario a nuevos recursos",
        "+ Soporte por WhatsApp durante 90 días",
        "+ Los 3 bonos exclusivos incluidos"
      ],
      recommended: true,
      cta: "Asegurar Mi Transformación",
      spots: "Solo 2 lugares disponibles"
    }
  ],
  en: [
    {
      id: "entry",
      icon: Package,
      name: "Commercial Clarity Sprint",
      subtitle: "Everything essential to transform your message",
      price: "$32,500 MXN",
      features: [
        "Full access to the 4-week Sprint",
        "All 9 commercial assets completed",
        "Small group of up to 5 companies",
        "Recordings of every session",
        "Bonus #1: Masterclass included"
      ],
      recommended: false,
      cta: "Reserve My Spot",
      spots: "Only 4 spots available"
    },
    {
      id: "premium",
      icon: Crown,
      name: "Commercial Clarity Inner Circle",
      subtitle: "Maximum acceleration with assisted implementation",
      price: "$58,500 MXN",
      features: [
        "Everything in the Commercial Clarity Sprint",
        "+ 4 one-on-one implementation sessions",
        "+ Personalized review of your assets",
        "+ Priority access to new resources",
        "+ WhatsApp support for 90 days",
        "+ All 3 bonuses included"
      ],
      recommended: true,
      cta: "Lock In My Transformation",
      spots: "Only 2 spots available"
    }
  ]
};

const copy = {
  es: {
    guaranteeBadge: "GARANTÍA: Trabajo hasta lograr tu Claridad Comercial",
    heading1: "Tienes 2 Opciones para Recuperar",
    heading2: "La Justicia Comercial",
    subheading: "El sistema completo para transformar tu mensaje comercial en 4 semanas",
    stackTitle: "El Stack Completo de Valor",
    popular: "MÁS POPULAR",
    guaranteeTitle: "Garantía de Resultados",
    guaranteeText:
      "Si después de 30 días no tienes un mensaje claro que tu equipo pueda explicar y que tus clientes entiendan, sigo trabajando contigo sin costo adicional hasta que logremos el nivel de claridad comercial que necesitas.",
    guaranteeNote: "Simple y directo: No paro hasta que tengas la claridad que mereces. Sin letra chica."
  },
  en: {
    guaranteeBadge: "GUARANTEE: We work until you get Commercial Clarity",
    heading1: "You Have 2 Ways to Regain",
    heading2: "Commercial Justice",
    subheading: "The complete system to transform your commercial message in 4 weeks",
    stackTitle: "The Full Value Stack",
    popular: "MOST POPULAR",
    guaranteeTitle: "Results Guarantee",
    guaranteeText:
      "If after 30 days you don't have a clear message your team can explain and your clients understand, I keep working with you at no extra cost until we reach the clarity you need.",
    guaranteeNote: "Simple and direct: I don't stop until you have the clarity you deserve. No fine print."
  },
} as const;

export function SprintOffer({ lang = 'es' }: { lang?: Lang }) {
  const t = copy[lang];
  const stacks = stackItems[lang];
  const pkgs = packages[lang];
  return (
    <section id="sprint-pricing" className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-6 py-3 rounded-full font-bold mb-6 shadow-lg"
          >
            <Shield className="h-6 w-6" />
            <span>{t.guaranteeBadge}</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="block">{t.heading1}</span>
            <span className="block text-primary">{t.heading2}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subheading}
          </p>
        </motion.div>

        {/* Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-12 border-2 border-primary/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-bold">{t.stackTitle}</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {stacks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm md:text-base">{item}</span>
              </motion.div>
            ))}
          </div>
          
        </motion.div>

        {/* Packages */}
        <div className="grid lg:grid-cols-2 gap-8">
          {pkgs.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className={`relative rounded-2xl p-8 ${
                  pkg.recommended 
                    ? 'bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary shadow-xl' 
                    : 'bg-card border shadow-lg'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      {t.popular}
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <Icon className={`h-12 w-12 mx-auto mb-4 ${pkg.recommended ? 'text-primary' : 'text-muted-foreground'}`} />
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground">{pkg.subtitle}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                        pkg.recommended ? 'text-primary' : 'text-green-600'
                      }`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold mb-2">
                    {pkg.price}
                  </p>
                  <p className="text-sm text-muted-foreground">+ IVA</p>
                </div>
                
                <Button 
                  asChild
                  size="lg" 
                  variant={pkg.recommended ? "default" : "outline"}
                  className={`w-full ${pkg.recommended ? 'shadow-lg' : ''}`}
                >
                  <a href={import.meta.env.PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial"} target="_blank">
                    {pkg.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-3">
                  {pkg.spots}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 mt-12 border-2 border-green-300 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-green-600" />
            <h3 className="text-2xl font-bold text-green-800">{t.guaranteeTitle}</h3>
          </div>
          <p className="text-lg text-green-800 font-medium mb-3">
            {t.guaranteeText}
          </p>
          <p className="text-sm text-green-700">
            {t.guaranteeNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
