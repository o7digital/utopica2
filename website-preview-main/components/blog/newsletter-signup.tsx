"use client";

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function NewsletterSignup() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center"
        >
          <Mail className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">The Utópica Insight</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestra newsletter mensual y recibe contenido premium, casos de estudio 
            exclusivos y las últimas tendencias en venta consultiva B2B.
          </p>

          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Tu email profesional"
                className="flex-1 px-4 py-2 rounded-md border bg-background"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Suscribirse
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Nos tomamos en serio tu privacidad. No spam, solo contenido valioso.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}