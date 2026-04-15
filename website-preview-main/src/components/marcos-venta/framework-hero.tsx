import { motion } from 'framer-motion';
import type { FrameworkMeta } from './data';
import { Marked } from './marked';
import { frameworks } from './data';

/**
 * Framework hero — "paper académico" aesthetic.
 * Catalog bar · serif title masivo con marker · autor & metadata en mono · tags.
 */
export function FrameworkHero({ f }: { f: FrameworkMeta }) {
  const idx = frameworks.findIndex((x) => x.slug === f.slug);
  const mId = `M.${String(idx + 1).padStart(2, '0')}`;

  return (
    <section className="relative bg-background pt-12 md:pt-16 pb-14 md:pb-20 border-b border-foreground/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Back link — mono */}
        <motion.a
          href="/marcos-venta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/55 hover:text-foreground transition-colors mb-10 md:mb-14"
        >
          <span aria-hidden>←</span>
          Volver al índice
        </motion.a>

        {/* Catalog metadata row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-12 gap-4 mb-10 md:mb-14 pb-5 border-b border-foreground/20"
        >
          <span className="col-span-6 md:col-span-3 font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/60">
            <span className="text-foreground/40">ID · </span>
            <span className="text-foreground tabular-nums">{mId}</span>
          </span>
          <span className="col-span-6 md:col-span-3 font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/60">
            <span className="text-foreground/40">Año · </span>
            <span className="text-foreground tabular-nums">{f.year}</span>
          </span>
          <span className="col-span-12 md:col-span-6 md:text-right font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/60">
            <span className="text-foreground/40">Autor · </span>
            <span className="text-foreground">{f.author}</span>
          </span>
        </motion.div>

        {/* Massive serif title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-foreground leading-[0.95] tracking-[-0.02em] mb-10 md:mb-12"
          style={{ fontSize: 'clamp(2.75rem, 7vw, 6.5rem)', fontWeight: 400 }}
        >
          {f.title} <span className="italic"><Marked size="sm"><span className="not-italic">{f.titleEm}</span></Marked></span>
        </motion.h1>

        {/* Description — thesis */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="grid grid-cols-12 gap-4 mb-10 md:mb-12"
        >
          <p className="col-span-12 md:col-span-9 lg:col-span-8 text-lg md:text-xl text-foreground/75 leading-[1.55]">
            {f.description}
          </p>
        </motion.div>

        {/* Tags — mono caps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap gap-x-5 gap-y-2"
        >
          {f.tags.map((t, i) => (
            <span
              key={t}
              className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 flex items-center gap-5"
            >
              {i > 0 && <span aria-hidden className="text-foreground/25">·</span>}
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
