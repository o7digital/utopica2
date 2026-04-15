"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { Marked } from '@/components/marcos-venta/marked';

/**
 * Página /equipo — rediseño editorial.
 * Hero + Fundador (Gael) + Consejo + Principios + CTA.
 */

const advisors = [
  {
    name: 'Olivier Sieuzac',
    role: 'Consejero independiente',
    image: '/images/team/olivier.jpg',
    desc: 'Líder empresarial con 20+ años en finanzas y dirección digital. Deputy CEO en EnviaFlores, ex GM de Linio México.',
    linkedin: 'https://www.linkedin.com/in/sieuzac/',
  },
  {
    name: 'Dennis Brandl',
    role: 'Consejero independiente',
    image: '/images/team/dennis.jpg',
    desc: 'Visionario empresarial con trayectoria en construir y escalar empresas digitales. Ex Managing Director de Valtech México.',
    linkedin: 'https://www.linkedin.com/in/dennisbrandl/',
  },
  {
    name: 'Warren Gutensohn',
    role: 'Consejero independiente',
    image: '/images/team/warren.jpg',
    desc: 'COO de baz súperapp. Ex Head of Product en Rappi y RappiPay. Experto en marketplaces y servicios financieros digitales.',
    linkedin: 'https://www.linkedin.com/in/warren-gutensohn/',
  },
  {
    name: 'Michael C. Collemiche',
    role: 'Consejero independiente',
    image: '/images/team/michael.jpg',
    desc: 'CRO en Algorithia. Top 100 innovadores globales en Data & Analytics. Fundador y VP de CDO LATAM.',
    linkedin: 'https://www.linkedin.com/in/michael-collemiche/',
  },
  {
    name: 'Edouard Perromat',
    role: 'Consejero independiente',
    image: '/images/team/edouard.jpg',
    desc: 'Sr. Strategy Director — Breakthrough Innovation en PepsiCo. Diseño de experiencias innovadoras.',
    linkedin: '#',
  },
  {
    name: 'Bernardo Torres',
    role: 'Consejero independiente',
    image: '/images/team/bernardo.jpg',
    desc: 'Experto en diseño de experiencias y producto digital.',
    linkedin: 'https://www.linkedin.com/in/torresbernardo/',
  },
  {
    name: 'Miguel A. Ruiz Torres',
    role: 'Consejero independiente',
    image: '/images/team/miguel-angel.jpg',
    desc: 'Fundador de Humanology. 15+ años transformando equipos comerciales. Trabajó con Coppel, Boehringer, Banco de México.',
    linkedin: 'https://www.linkedin.com/in/miguel-ruiz-humanology/',
  },
];

const principios = [
  {
    num: '01',
    title: 'La IA amplifica. No reemplaza.',
    body: 'El juicio humano es insustituible donde importa: cerrar relaciones, negociar contratos, leer personas. La IA va donde el humano pierde energía — research, registros, seguimiento, feedback. El equipo de 5 opera como uno de 15.',
  },
  {
    num: '02',
    title: 'Diagnóstico antes de prescripción.',
    body: 'Ningún médico receta sin examinar. Ningún consultor debería proponer sin entender. Cada engagement empieza con 30 minutos de conversación honesta — a veces concluimos que no somos el fit, y eso es ok.',
  },
  {
    num: '03',
    title: 'Instalamos — no capacitamos.',
    body: 'Las capacitaciones se diluyen en 90 días. Lo que instalamos son sistemas: criterios, playbooks, skills de Claude, certificaciones. Lo que queda funciona sin nosotros. Esa es la prueba de que funcionó.',
  },
  {
    num: '04',
    title: 'Honestidad sobre resultados.',
    body: 'No garantizamos facturación. Depende de factores fuera de nuestro control: mercado, competencia, ejecución del cliente. Sí garantizamos capacidades operando, sistemas documentados y transferencia total. Medible.',
  },
];

export function EditorialEquipo() {
  const ctaHref =
    (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_RECLAIM_URL) ||
    'https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial';

  return (
    <main className="bg-background text-foreground">
      {/* ───────── HERO ───────── */}
      <section className="pt-24 md:pt-32 pb-14 md:pb-20 border-b border-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-12 gap-4 mb-12 pb-4 border-b border-foreground/20"
          >
            <span className="col-span-12 md:col-span-7 font-mono text-[10.5px] md:text-[11px] tracking-[0.16em] uppercase text-foreground/55">
              Utópica · Nosotros
            </span>
            <span className="col-span-12 md:col-span-5 md:text-right font-mono text-[10.5px] md:text-[11px] tracking-[0.16em] uppercase text-foreground/40">
              1 fundador · 7 consejeros · 4 principios
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-foreground leading-[0.98] tracking-[-0.02em] mb-10"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 6.5rem)', fontWeight: 400 }}
          >
            Un{' '}
            <Marked size="sm">
              <span>equipo pequeño</span>
            </Marked>
            <br />
            con un consejo <span className="italic">grande</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-foreground/75 max-w-3xl leading-[1.6]"
          >
            Utópica opera como un equipo lean — Gaël y colaboradores específicos por proyecto
            — apoyado por un consejo de siete líderes que han escalado consultoras,
            plataformas y organizaciones en Latinoamérica.
          </motion.p>
        </div>
      </section>

      {/* ───────── FUNDADOR ───────── */}
      <section className="py-20 md:py-28 border-b border-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <div className="border border-foreground/20 aspect-[4/5] overflow-hidden bg-foreground/5">
                <img
                  src="/images/team/optimized/gael-thome-new.jpg"
                  alt="Gaël Thomé"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
                § I · Fundador
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-normal text-foreground leading-[1.02] tracking-[-0.015em] mb-4">
                <span className="italic">Gaël</span> Thomé.
              </h2>
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/55 mb-8">
                Fundador · CDMX · Opera desde 2022
              </p>
              <div className="space-y-5 text-base md:text-lg text-foreground/75 leading-[1.65] mb-8 max-w-2xl">
                <p>
                  Co-fundé varias empresas B2B. Escalé una — Multiplica — donde duplicamos
                  el tamaño año tras año por más de una década, liderando un equipo de 400+
                  personas y construyendo relaciones con clientes como Telcel, Coppel y
                  BBVA.
                </p>
                <p>
                  Viví en carne propia cada problema que resolvemos en Utópica: el mensaje
                  que no diferencia, el pipeline que depende de referidos, el equipo que no
                  vende como el fundador.
                </p>
                <p className="font-serif italic text-foreground/85">
                  Hoy integro IA en procesos comerciales para que los fundadores B2B dejen
                  de ser el cuello de botella de su propia empresa.
                </p>
              </div>
              <dl className="grid grid-cols-3 gap-4 md:gap-6 border-t border-foreground/20 pt-6 mb-6">
                <div>
                  <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-1">
                    Escala
                  </dt>
                  <dd className="font-serif text-xl text-foreground">2× anual</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-1">
                    Equipos
                  </dt>
                  <dd className="font-serif text-xl text-foreground tabular-nums">400+</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-1">
                    Idiomas
                  </dt>
                  <dd className="font-serif text-xl text-foreground">FR · ES · EN · PT</dd>
                </div>
              </dl>
              <a
                href="https://www.linkedin.com/in/gaelthome/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/70 hover:text-foreground transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CONSEJO ───────── */}
      <section className="py-20 md:py-28 border-b border-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-4 md:gap-10 mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-6">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
                § II · Consejo independiente
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em]">
                Siete líderes que ya <span className="italic">escalaron</span>.
              </h2>
            </div>
            <p className="col-span-12 md:col-span-5 md:col-start-8 text-base md:text-lg text-foreground/65 leading-[1.65] self-end">
              No un logo decorativo. Advisors activos que han construido lo que estamos
              instalando en otras empresas — y que revisan nuestras decisiones cuando el
              contexto lo requiere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {advisors.map((a) => (
              <div
                key={a.name}
                className="border-t border-foreground/85 pt-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 border border-foreground/15 overflow-hidden flex-shrink-0 bg-foreground/5">
                    <img
                      src={a.image}
                      alt={a.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg text-foreground leading-snug tracking-[-0.005em] mb-1">
                      {a.name}
                    </h3>
                    <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55">
                      {a.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground/70 leading-[1.6] mb-4">{a.desc}</p>
                {a.linkedin !== '#' && (
                  <a
                    href={a.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-3 w-3" />
                    LinkedIn
                    <ArrowUpRight className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PRINCIPIOS ───────── */}
      <section className="py-20 md:py-28 border-b border-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-4 md:gap-10 mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
                § III · Cómo pensamos
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em]">
                Cuatro principios <span className="italic">no negociables</span>.
              </h2>
            </div>
          </div>
          <ol className="border-t border-foreground/85">
            {principios.map((p) => (
              <li
                key={p.num}
                className="border-b border-foreground/15 grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10"
              >
                <span className="col-span-12 md:col-span-2 font-mono text-sm tabular-nums tracking-[0.1em] text-foreground/55 pt-1">
                  [ {p.num} ]
                </span>
                <h3 className="col-span-12 md:col-span-4 font-serif text-xl md:text-2xl text-foreground leading-[1.2] tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="col-span-12 md:col-span-6 text-base md:text-lg text-foreground/75 leading-[1.65]">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 md:col-start-2">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-6 font-semibold">
                Siguiente paso
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[4.5rem] font-normal text-foreground leading-[1.02] tracking-[-0.02em] mb-8">
                Conoce al equipo en un{' '}
                <span className="italic">diagnóstico</span>.
              </h2>
              <p className="text-lg text-foreground/70 leading-[1.6] max-w-2xl mb-10">
                30 minutos con Gaël. Describes tu situación, mapeamos dónde está el cuello
                de botella, y decidimos juntos si trabajar o si conviene otro camino.
              </p>
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-foreground bg-foreground text-background font-mono text-xs tracking-[0.14em] uppercase px-6 py-4 transition-all hover:bg-background hover:text-foreground"
              >
                Agendar diagnóstico
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
