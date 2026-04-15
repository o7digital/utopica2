"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';


export function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden"
      aria-labelledby="homepage-hero-title"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            id="homepage-hero-title"
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">¿Ofreces un Servicio Increíble</span>
            <span className="block mt-2">pero las <span className="text-primary">Ventas no Llegan</span>?</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Aquí está el problema: puedes hacer un trabajo excepcional y aún así tener dificultades para vender.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Hay una forma de cambiar esto. Y empieza con tu mensaje.
          </motion.p>
          

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <TrackedCTAButton
              href="/sprint-claridad-comercial"
              trackingLocation="homepage_hero"
              size="lg"
              className="text-base px-8 py-6 h-auto bg-primary hover:bg-primary/90"
            >
              Conocer el Sprint de Claridad
              <ArrowRight className="ml-2 h-5 w-5" />
            </TrackedCTAButton>
          </motion.div>
          
          <motion.p
            className="mt-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Solo 5 lugares disponibles • <Link href="/sprint-claridad-comercial" className="underline hover:text-primary">Ver detalles del Sprint</Link>
          </motion.p>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  );
}