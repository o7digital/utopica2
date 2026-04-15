import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

type Lang = 'es' | 'en';

const faqs: Record<Lang, { question: string; answer: string }[]> = {
  es: [
    {
      question: "¿Qué pasa si no puedo asistir a una sesión?",
      answer: "Todas las sesiones se graban. Recibes el video y puedes hacer preguntas en el grupo."
    },
    {
      question: "¿Funciona para mi tipo de negocio?",
      answer: "SÍ funciona si: necesitas múltiples reuniones para que entiendan tu valor, los clientes te comparan por precio, el fundador es el mejor vendedor, o eres consultor/agencia B2B/software complejo (ticket >$10K USD). NO es para ti si: tu producto se vende solo online, compites principalmente por precio, o vendes productos físicos/commodities. La regla de oro: Si necesitas EXPLICAR tu valor = SÍ es para ti. Si tu valor es OBVIO al instante = NO es para ti."
    },
    {
      question: "¿Necesito tener mi equipo listo?",
      answer: "No. Puedes empezar solo y sumar a tu equipo después."
    },
    {
      question: "¿Cuánto tiempo debo dedicar?",
      answer: "90 minutos por sesión + 2-3 horas de trabajo entre sesiones. Total: 3-4 horas por semana."
    },
    {
      question: "¿Por qué solo 5 empresas?",
      answer: "Para dar atención personalizada y feedback específico a cada participante."
    },
    {
      question: "¿Qué incluye la Masterclass bonus?",
      answer: "Una sesión completa de 90 minutos donde aprenderás el sistema exacto para convertir tu mensaje claro en conversaciones reales con prospectos calificados."
    }
  ],
  en: [
    {
      question: "What if I can't attend a session?",
      answer: "All sessions are recorded. You receive the video and can ask questions in the group."
    },
    {
      question: "Will it work for my business?",
      answer: "YES if: you need multiple meetings for people to grasp your value, clients compare you on price, the founder is the best seller, or you are a B2B consultant/agency/complex software (ticket >$10K USD). NOT for you if: your product sells fully online, you compete mainly on price, or you sell physical products/commodities. Golden rule: If you need to EXPLAIN your value = YES. If your value is obvious instantly = NO."
    },
    {
      question: "Do I need my team ready?",
      answer: "No. You can start solo and bring your team in later."
    },
    {
      question: "How much time should I invest?",
      answer: "90 minutes per session + 2–3 hours between sessions. Total: 3–4 hours per week."
    },
    {
      question: "Why only 5 companies?",
      answer: "To provide personalized attention and specific feedback for each participant."
    },
    {
      question: "What does the bonus Masterclass include?",
      answer: "A 90-minute session where you learn the exact system to turn your clear message into real conversations with qualified prospects."
    }
  ]
};

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-none"
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          // Tracking removed per client request
        }}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors"
      >
        <h3 className="text-lg font-semibold pr-8">{question}</h3>
        {isOpen ? (
          <Minus className="h-5 w-5 text-primary flex-shrink-0" />
        ) : (
          <Plus className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-muted-foreground pb-6">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export function SprintFAQ({ lang = 'es' }: { lang?: Lang }) {
  return (
    <section className="min-h-screen flex items-center bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">{lang === 'es' ? 'Todas Tus Dudas' : 'All Your Questions'}</span>
            <span className="block text-primary">{lang === 'es' ? 'Resueltas' : 'Answered'}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {faqs[lang].map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            {lang === 'es' ? '¿Tienes otra pregunta? Escríbenos directamente' : 'Have another question? Write us directly'}
          </p>
          <a
            href="mailto:gael@utopica.net"
            className="text-primary font-semibold hover:underline"
          >
            gael@utopica.net
          </a>
        </motion.div>
      </div>
    </section>
  );
}
