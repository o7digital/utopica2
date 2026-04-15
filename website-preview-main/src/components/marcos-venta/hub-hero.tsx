import { motion } from 'framer-motion';
import { Marked } from './marked';

/**
 * Hub hero — layout editorial "archivo académico".
 * Catalog metadata arriba · serif gigante con marker highlight · mono info row · hairline.
 * Inspiración: Library of Congress catalog + Stripe Press + Vincent Tresno monospace.
 */
export function HubHero() {
  return (
    <section
      className="relative bg-background pt-16 md:pt-24 pb-14 md:pb-20"
      aria-labelledby="marcos-hero-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Catalog signature — mono micro-type */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-12 gap-4 mb-14 md:mb-20"
        >
          <div className="col-span-12 md:col-span-7 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
            <span className="font-mono text-[10.5px] md:text-[11px] tracking-[0.16em] uppercase text-foreground/50">
              UTP · Archivo 001
            </span>
            <span className="hidden sm:inline h-px w-8 bg-foreground/20" aria-hidden />
            <span className="font-mono text-[10.5px] md:text-[11px] tracking-[0.16em] uppercase text-foreground/50">
              Marcos de venta · 1988—2024
            </span>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <span className="font-mono text-[10.5px] md:text-[11px] tracking-[0.16em] uppercase text-foreground/40">
              Ref. 5 metodologías · 40 años de investigación
            </span>
          </div>
        </motion.div>

        {/* Massive serif title with marker highlight — the "one thing" that will be remembered */}
        <motion.h1
          id="marcos-hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif text-foreground leading-[0.95] tracking-[-0.02em] mb-12 md:mb-16"
          style={{ fontSize: 'clamp(3.25rem, 9vw, 8.5rem)', fontWeight: 400 }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Cinco maneras de vender
          </motion.span>
          <motion.span
            className="block italic"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            lo que no{' '}
            <Marked>
              <span className="not-italic font-normal">se puede tocar</span>
            </Marked>
            .
          </motion.span>
        </motion.h1>

        {/* Thesis prose — small serif italic, flush left, narrow measure */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-12 gap-4 mb-14 md:mb-20"
        >
          <p className="col-span-12 md:col-span-7 lg:col-span-6 text-base md:text-lg text-foreground/75 leading-[1.65]">
            Vender un servicio de expertise no se parece a vender un producto. No hay muestra,
            no hay pixel, no hay tercer botón que lo haga obvio. Solo hay una conversación — y
            lo que el cliente imagina a partir de ella. Esta biblioteca reúne{' '}
            <span className="text-foreground font-medium">
              los cinco marcos que más han movido esa conversación
            </span>{' '}
            en cuarenta años de investigación aplicada.
          </p>
        </motion.div>

        {/* Tabular mono info row — type specimen feel */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="border-t border-foreground/20 pt-5 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4"
        >
          <InfoCell label="Marcos" value="05" />
          <InfoCell label="Autores" value="06" />
          <InfoCell label="Años cubiertos" value="1988 — 2024" />
          <InfoCell label="Tiempo de lectura" value="~ 32 min" />
        </motion.dl>
      </div>
    </section>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/50 mb-1.5">
        {label}
      </dt>
      <dd className="font-mono text-base md:text-lg text-foreground tabular-nums">{value}</dd>
    </div>
  );
}
