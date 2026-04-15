"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';
import { Marked } from '@/components/marcos-venta/marked';

/**
 * Hero — rediseño editorial/académico.
 * Catalog metadata · serif gigante con marker en "injusticia comercial" · subheadline · stat card side.
 */
export function HeroSection() {
  const ctaUrl =
    import.meta.env.PUBLIC_RECLAIM_URL ||
    'https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial';

  return (
    <section
      className="relative min-h-screen flex items-center bg-background pt-20 md:pt-24 pb-16 overflow-hidden"
      aria-labelledby="homepage-hero-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
        {/* Catalog signature — mono micro-type */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-12 gap-4 mb-10 md:mb-14 pb-4 border-b border-foreground/20"
        >
          <div className="col-span-12 md:col-span-7 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-5">
            <span className="font-mono text-[10.5px] md:text-[11px] tracking-[0.16em] uppercase text-foreground/55">
              Utópica · CDMX
            </span>
            <span className="hidden sm:inline h-px w-8 bg-foreground/20" aria-hidden />
            <span className="font-mono text-[10.5px] md:text-[11px] tracking-[0.16em] uppercase text-foreground/55">
              Ventas B2B · Consultoras medianas
            </span>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <span className="font-mono text-[10.5px] md:text-[11px] tracking-[0.16em] uppercase text-foreground/40">
              Operamos desde 2022
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          {/* Text column */}
          <div>
            <motion.h1
              id="homepage-hero-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-foreground leading-[0.95] tracking-[-0.02em] mb-10 md:mb-12"
              style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.75rem)', fontWeight: 400 }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                Tu calidad no se
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                refleja en tus ventas.
              </motion.span>
              <motion.span
                className="block italic mt-3"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Eso es una{' '}
                <Marked>
                  <span className="not-italic font-normal">injusticia comercial</span>
                </Marked>
                .
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-lg md:text-xl text-foreground/75 max-w-xl leading-[1.6] mb-10"
            >
              Instalamos sistemas comerciales que funcionan aunque nadie esté mirando
              — y escalan sin contratar más vendedores.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap items-center gap-5"
            >
              <TrackedCTAButton
                href={ctaUrl}
                target="_blank"
                trackingLocation="homepage_hero"
                className="group inline-flex items-center gap-2 border border-foreground bg-foreground text-background font-mono text-xs tracking-[0.14em] uppercase px-5 py-3.5 transition-all hover:bg-background hover:text-foreground"
              >
                Agendar diagnóstico
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </TrackedCTAButton>
              <a
                href="#como-funciona"
                className="group font-mono text-xs tracking-[0.14em] uppercase text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
              >
                Cómo funciona
                <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden>
                  →
                </span>
              </a>
            </motion.div>
          </div>

          {/* Side card — editorial stat sheet */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="border border-foreground/25 bg-background relative">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/20">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                    aria-hidden
                  />
                  <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/60">
                    Sistema instalado
                  </span>
                </div>
                <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/40 tabular-nums">
                  v.2.0
                </span>
              </div>

              {/* Primary metric */}
              <div className="px-6 py-7 border-b border-foreground/15">
                <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/55 mb-3">
                  Claridad del mensaje
                </p>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-serif italic text-4xl text-primary tabular-nums">94%</span>
                  <span className="font-mono text-xs text-foreground/50 tabular-nums">
                    +682% vs. antes
                  </span>
                </div>
                <div className="h-[3px] bg-foreground/10">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: '12%' }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between mt-2 font-mono text-[10px] text-foreground/40 tabular-nums tracking-wider">
                  <span>12 %</span>
                  <span>94 %</span>
                </div>
              </div>

              {/* Metrics grid */}
              <dl className="grid grid-cols-3 divide-x divide-foreground/15 border-b border-foreground/15">
                <StatCell label="Semanas" value="04" />
                <StatCell label="Conversión" value="3×" accent />
                <StatCell label="Activos" value="09" />
              </dl>

              {/* Activity feed */}
              <div className="px-6 py-5">
                <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/55 mb-4">
                  Resultados recientes
                </p>
                <ul className="space-y-3">
                  {[
                    { label: 'Propuesta de valor definida', week: 'W.01' },
                    { label: 'Narrativa de ventas lista', week: 'W.02' },
                    { label: 'Pipeline +40% reuniones', week: 'W.03' },
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + i * 0.2 }}
                      className="flex items-center gap-3 text-[13px]"
                    >
                      <span
                        className="inline-block w-1 h-1 rounded-full bg-primary/70 flex-shrink-0"
                        aria-hidden
                      />
                      <span className="text-foreground/80 flex-1">{item.label}</span>
                      <span className="font-mono text-[10px] tracking-wider text-foreground/40 tabular-nums">
                        {item.week}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

function StatCell({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="px-4 py-5 text-center">
      <dt className="font-mono text-[10px] tracking-[0.14em] uppercase text-foreground/50 mb-1.5">
        {label}
      </dt>
      <dd
        className={
          accent
            ? 'font-serif italic text-2xl text-primary tabular-nums'
            : 'font-serif text-2xl text-foreground tabular-nums'
        }
      >
        {value}
      </dd>
    </div>
  );
}
