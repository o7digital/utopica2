import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Marked } from '@/components/marcos-venta/marked';
import type { Servicio } from './data';
import { getServicioNav } from './data';

/**
 * Página individual de un servicio/capacidad.
 * Todo el contenido en un solo componente React para minimizar imports.
 * Estética: archivo académico — mono metadata + serif titles + hairlines.
 */
export function ServicioPage({ servicio: s }: { servicio: Servicio }) {
  const { prev, next } = getServicioNav(s.slug);
  const ctaHref =
    (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_RECLAIM_URL) ||
    'https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial';

  return (
    <main className="bg-background text-foreground">
      {/* ───────── HERO ───────── */}
      <section className="pt-24 md:pt-28 pb-16 md:pb-24 border-b border-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Back link */}
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/55 hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Todos los servicios
          </motion.a>

          {/* Catalog metadata bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-12 gap-4 mb-10 pb-4 border-b border-foreground/20"
          >
            <span className="col-span-6 md:col-span-3 font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/60">
              <span className="text-foreground/40">ID · </span>
              <span className="text-foreground tabular-nums">{s.id}</span>
            </span>
            <span className="col-span-6 md:col-span-4 font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/60">
              <span className="text-foreground/40">Duración · </span>
              <span className="text-foreground">{s.duration}</span>
            </span>
            <span className="col-span-12 md:col-span-5 md:text-right font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/40">
              Capacidad instalada · Utópica
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-foreground leading-[0.98] tracking-[-0.02em] mb-8"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 6.5rem)', fontWeight: 400 }}
          >
            {s.title}{' '}
            <span className="italic text-foreground/80">{s.titleEm}</span>
            <span className="text-primary">.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif italic text-xl md:text-2xl text-foreground/75 max-w-3xl leading-[1.45] mb-10"
          >
            {s.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-base md:text-lg text-foreground/75 max-w-3xl leading-[1.65] mb-10"
          >
            {s.description}
          </motion.p>

          {/* Tags + legacy note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10"
          >
            {s.tags.map((t, i) => (
              <span
                key={t}
                className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 flex items-center gap-5"
              >
                {i > 0 && <span aria-hidden className="text-foreground/25">·</span>}
                {t}
              </span>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-foreground bg-foreground text-background font-mono text-xs tracking-[0.14em] uppercase px-5 py-3.5 transition-all hover:bg-background hover:text-foreground"
            >
              Agendar diagnóstico
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ───────── SIGNAL ───────── */}
      <section className="py-16 md:py-24 border-b border-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-4 md:gap-10">
            <div className="col-span-12 md:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
                § I · Síntomas
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em] mb-6">
                Si estás leyendo porque <span className="italic">alguno de estos</span> aplica.
              </h2>
            </div>
            <ol className="col-span-12 md:col-span-7 border-t border-foreground/85">
              {s.signalProblem.map((p, i) => (
                <li
                  key={i}
                  className="border-b border-foreground/15 grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-6 md:py-7 items-start"
                >
                  <span className="font-mono text-sm tabular-nums text-foreground/55 pt-1">
                    [ {String(i + 1).padStart(2, '0')} ]
                  </span>
                  <p className="font-serif italic text-lg md:text-xl leading-[1.5] text-foreground/85">
                    &ldquo;{p}&rdquo;
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────── WHAT WE INSTALL ───────── */}
      <section className="py-16 md:py-24 border-b border-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-12 md:mb-16 max-w-3xl">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
              § II · Qué instalamos
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em]">
              No es capacitación. Es{' '}
              <Marked size="sm">
                <span>sistema</span>
              </Marked>
              .
            </h2>
          </div>
          <ol className="border-t border-foreground/85">
            {s.whatWeInstall.map((item, i) => (
              <li
                key={i}
                className="border-b border-foreground/15 grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10"
              >
                <span className="col-span-12 md:col-span-2 font-mono text-sm tracking-[0.14em] uppercase text-foreground/55 tabular-nums pt-1.5">
                  [ {String(i + 1).padStart(2, '0')} ]
                </span>
                <div className="col-span-12 md:col-span-4">
                  <h3 className="font-serif text-xl md:text-2xl text-foreground leading-snug tracking-[-0.01em]">
                    {item.label}
                  </h3>
                </div>
                <p className="col-span-12 md:col-span-6 text-base md:text-lg text-foreground/75 leading-[1.6]">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── PHASES ───────── */}
      <section className="py-16 md:py-24 border-b border-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-12 md:mb-16 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
                § III · Cómo funciona
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em]">
                <span className="italic">{s.duration}</span> de instalación.
              </h2>
            </div>
            <p className="col-span-12 md:col-span-6 md:col-start-7 text-base md:text-lg text-foreground/65 leading-[1.6] self-end">
              Cada fase entrega algo concreto — no esperamos al final para ver impacto.
            </p>
          </div>
          <ol className="border-t border-foreground/85">
            {s.phases.map((phase, i) => (
              <li
                key={i}
                className="border-b border-foreground/15 grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10"
              >
                <span className="col-span-12 md:col-span-2 font-mono text-sm text-foreground/55 tabular-nums tracking-[0.08em]">
                  Fase {String(i + 1).padStart(2, '0')}
                </span>
                <div className="col-span-12 md:col-span-5">
                  <h3 className="font-serif text-xl md:text-2xl text-foreground leading-snug tracking-[-0.01em] mb-1">
                    {phase.name}
                  </h3>
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/50">
                    {phase.weeks}
                  </span>
                </div>
                <p className="col-span-12 md:col-span-5 text-base md:text-lg text-foreground/75 leading-[1.6]">
                  {phase.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── OUTCOME ───────── */}
      <section className="py-16 md:py-24 border-b border-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-4 md:gap-10 items-start">
            <div className="col-span-12 md:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
                § IV · Resultado
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em]">
                Lo que <span className="italic">queda instalado</span>.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 border-t border-foreground/85 pt-8">
              <p className="font-serif text-2xl md:text-3xl text-foreground/90 leading-[1.35] tracking-[-0.01em] mb-8">
                {s.outcome}
              </p>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 pt-8 border-t border-foreground/15">
                <div>
                  <dt className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/55 mb-2">
                    Para quién aplica
                  </dt>
                  <dd className="text-base text-foreground/80 leading-[1.6]">{s.forWho}</dd>
                </div>
                {s.legacyName && (
                  <div>
                    <dt className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/55 mb-2">
                      Antes conocido como
                    </dt>
                    <dd className="font-serif italic text-base text-foreground/80">
                      {s.legacyName}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="py-16 md:py-24 border-b border-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/50 mb-4">
                Siguiente paso
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em] mb-6">
                30 minutos para diagnosticar <span className="italic">si esto aplica</span>.
              </h2>
              <p className="text-lg text-foreground/70 leading-[1.6] max-w-2xl mb-10">
                Sin pitch. Sin compromiso. Una conversación donde describes tu situación y
                decidimos juntos si este es el camino — o si conviene otro.
              </p>
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-foreground bg-foreground text-background font-mono text-xs tracking-[0.14em] uppercase px-5 py-3.5 transition-all hover:bg-background hover:text-foreground"
              >
                Agendar diagnóstico
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── NAV ENTRE SERVICIOS ───────── */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <nav
            aria-label="Navegación entre servicios"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
          >
            <div>
              {prev ? (
                <a
                  href={`/servicios/${prev.slug}`}
                  className="group block opacity-80 hover:opacity-100 transition-opacity"
                >
                  <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/50 flex items-center gap-2 mb-2">
                    <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
                    Servicio anterior
                  </span>
                  <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                    {prev.shortTitle}
                  </span>
                </a>
              ) : (
                <a href="/" className="group block">
                  <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/50 flex items-center gap-2 mb-2">
                    <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
                    Inicio
                  </span>
                  <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                    Volver al home
                  </span>
                </a>
              )}
            </div>
            <div>
              {next && (
                <a
                  href={`/servicios/${next.slug}`}
                  className="group block md:text-right opacity-80 hover:opacity-100 transition-opacity"
                >
                  <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/50 flex md:justify-end items-center gap-2 mb-2">
                    Siguiente servicio
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                    {next.shortTitle}
                  </span>
                </a>
              )}
            </div>
          </nav>
        </div>
      </section>
    </main>
  );
}
