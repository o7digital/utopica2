"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Marked } from '@/components/marcos-venta/marked';
import { servicios } from '@/components/servicios/data';

/**
 * Todas las secciones del home en nuevo lenguaje editorial/académico.
 * Reemplazan los componentes viejos (warm genérico) con el lenguaje
 * establecido en marcos-venta + nav + hero.
 */

/* ═══════════════════════════ SECCIÓN I · STAKES ═══════════════════════════ */

export function EditorialStakes() {
  const items = [
    {
      num: '01',
      title: 'Competidores inferiores ganan tus clientes.',
      desc: 'Cada mes sin mensaje claro, empresas con peor servicio cierran los deals que tú deberías cerrar. Porque ellos comunican mejor.',
    },
    {
      num: '02',
      title: 'Tu tiempo libre deja de existir.',
      desc: 'Toda venta importante pasa por tu cabeza. Vacaciones, fines de semana, noches — el negocio corre detrás de ti. No con.',
    },
    {
      num: '03',
      title: 'La brecha con quien usa IA bien se abre.',
      desc: 'Equipos que ya integraron IA en su proceso comercial no van más rápido — van acelerando. La distancia no es lineal. Es exponencial.',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-background border-b border-foreground/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-4 md:gap-10 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
              § I · El costo del status quo
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em]">
              Cuando tu mejor vendedor toma vacaciones, las{' '}
              <span className="italic">ventas caen</span>.
            </h2>
          </div>
          <p className="col-span-12 md:col-span-6 md:col-start-7 text-base md:text-lg text-foreground/65 leading-[1.65] self-end">
            Y cada semana que pasa, la situación se amplía. Esto es lo que se acumula
            mientras el sistema comercial depende de una sola cabeza.
          </p>
        </div>

        <ol className="border-t border-foreground/85">
          {items.map((it, i) => (
            <motion.li
              key={it.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border-b border-foreground/15 grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10"
            >
              <span className="col-span-12 md:col-span-2 font-mono text-sm tabular-nums tracking-[0.1em] text-foreground/55 pt-1.5">
                [ {it.num} ]
              </span>
              <h3 className="col-span-12 md:col-span-5 font-serif text-xl md:text-2xl lg:text-[1.65rem] text-foreground leading-[1.2] tracking-[-0.01em]">
                {it.title}
              </h3>
              <p className="col-span-12 md:col-span-5 text-base md:text-lg text-foreground/70 leading-[1.6]">
                {it.desc}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ═══════════════════════ SECCIÓN II · INJUSTICIA ═══════════════════════ */

export function EditorialInjusticia() {
  return (
    <section className="py-20 md:py-32 bg-background border-b border-foreground/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-6 font-semibold">
              § II · Injusticia comercial
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="font-serif text-foreground leading-[1.15] tracking-[-0.015em]"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.85rem)', fontWeight: 400 }}
            >
              <p className="mb-8">
                La calidad de tu trabajo te da el{' '}
                <span className="italic">derecho a competir</span>. No te garantiza la
                victoria.
              </p>
              <p className="mb-8">
                Cuando competidores con peor servicio te ganan clientes porque{' '}
                <Marked>
                  <span>comunican mejor</span>
                </Marked>
                , no es mala suerte. Es un problema de sistema.
              </p>
              <p className="text-foreground/80">
                Para ganar, necesitas un mensaje que le haga{' '}
                <span className="italic">justicia</span> a tu servicio — y un equipo capaz
                de venderlo sin depender de ti. Eso es{' '}
                <span className="italic text-primary">libertad comercial</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ SECCIÓN III · SERVICIOS ═══════════════════════ */

export function EditorialServicios() {
  return (
    <section className="py-20 md:py-28 bg-background border-b border-foreground/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 md:gap-10 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
              § III · Servicios
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em]">
              Cinco capacidades que se <span className="italic">instalan</span>.
            </h2>
          </div>
          <p className="col-span-12 md:col-span-5 md:col-start-8 text-base md:text-lg text-foreground/65 leading-[1.65] self-end">
            Se combinan según dónde está hoy tu cuello de botella. No todas aplican a
            todos — por eso empezamos con un diagnóstico.
          </p>
        </div>

        {/* Encabezado de tabla */}
        <div className="hidden md:grid grid-cols-[70px_1fr_200px_60px] gap-6 px-1 pb-3 border-b border-foreground/85">
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-foreground/55">
            ID
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-foreground/55">
            Capacidad
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-foreground/55">
            Duración
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-foreground/55 text-right">
            Ver
          </span>
        </div>

        {/* Filas */}
        <ol className="divide-y divide-foreground/15">
          {servicios.map((s) => (
            <li key={s.slug}>
              <a
                href={`/servicios/${s.slug}`}
                className="group grid md:grid-cols-[70px_1fr_200px_60px] gap-x-6 gap-y-1 md:gap-y-0 items-baseline py-7 md:py-8 px-1 transition-colors hover:bg-primary/[0.06]"
              >
                <span className="font-mono text-sm md:text-base text-foreground/60 tabular-nums tracking-wider">
                  {s.id}
                </span>
                <div className="md:contents">
                  <div className="col-start-2">
                    <h3 className="font-serif text-2xl md:text-[1.75rem] font-normal text-foreground leading-[1.15] tracking-[-0.01em] mb-1.5">
                      {s.title}{' '}
                      <span className="italic text-foreground/70">{s.titleEm}</span>
                    </h3>
                    <p className="text-sm md:text-base text-foreground/60 max-w-2xl leading-snug">
                      {s.tagline}
                    </p>
                  </div>
                </div>
                <span className="md:col-start-3 font-mono text-xs md:text-sm text-foreground/70 uppercase tracking-[0.08em] self-center">
                  {s.duration}
                </span>
                <span className="md:col-start-4 md:text-right self-center">
                  <ArrowUpRight
                    aria-hidden
                    className="inline-block w-4 h-4 text-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </span>
              </a>
            </li>
          ))}
        </ol>

        {/* Footer tabla */}
        <div className="mt-6 pt-4 border-t border-foreground/20 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/45">
            05 capacidades · combinables
          </span>
          <a
            href="/marcos-venta"
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            También ver los marcos de venta
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ SECCIÓN IV · IA ═══════════════════════ */

export function EditorialIA() {
  return (
    <section className="py-20 md:py-32 bg-background border-b border-foreground/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
              § IV · El rol de la IA
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em] mb-6">
              La IA no va a vender por ti.
            </h2>
            <p className="font-serif italic text-xl md:text-2xl text-foreground/80 leading-[1.35] tracking-[-0.005em] max-w-xl">
              Pero puede hacer que tu equipo venda como{' '}
              <Marked size="sm">
                <span className="not-italic">tu mejor cerrador</span>
              </Marked>
              .
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 space-y-5 pt-1 self-center">
            <p className="text-base md:text-lg text-foreground/75 leading-[1.65]">
              Usamos IA donde amplifica al humano: prospección, calificación, coaching
              post-reunión, research de cuentas, preparación de propuestas.
            </p>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.65]">
              No la usamos donde el juicio humano es insustituible: cerrar relaciones,
              negociar contratos sensibles, decidir estrategia.
            </p>
            <p className="text-base md:text-lg text-foreground leading-[1.65] border-t border-foreground/20 pt-5">
              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/55 block mb-2">
                Resultado
              </span>
              El equipo humano toma decisiones. La IA ejecuta el trabajo repetitivo. Un
              equipo de 5 opera como uno de 15.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ SECCIÓN V · FUNDADOR ═══════════════════════ */

export function EditorialFounder() {
  return (
    <section className="py-20 md:py-32 bg-background border-b border-foreground/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-4 md:gap-12 items-center">
          {/* Image */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div className="border border-foreground/20 aspect-[4/5] overflow-hidden bg-foreground/5">
              <img
                src="/images/team/optimized/gael-thome-new.jpg"
                alt="Gaël Thomé, fundador de Utópica"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
              § V · Quién lo opera
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em] mb-8">
              <span className="italic">Gaël</span> Thomé.
            </h2>
            <div className="space-y-5 text-base md:text-lg text-foreground/75 leading-[1.65] mb-8 max-w-2xl">
              <p>
                Fundé Utópica después de vivir el problema desde el otro lado: construir
                un servicio que los clientes adoraban pero que no escalaba porque
                dependía de mi tiempo, mi energía, mi cabeza.
              </p>
              <p>
                La salida fue sistematizar todo — lo que hoy instalamos en otras
                consultoras medianas. Un equipo que cierra sin ti. Un pipeline que se
                sostiene. Una conversación comercial con IA amplificando a la gente, no
                reemplazándola.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-4 md:gap-6 border-t border-foreground/20 pt-6">
              <div>
                <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-1">
                  Base
                </dt>
                <dd className="font-serif text-lg text-foreground">CDMX</dd>
              </div>
              <div>
                <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-1">
                  Opera desde
                </dt>
                <dd className="font-serif text-lg text-foreground tabular-nums">2022</dd>
              </div>
              <div>
                <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-1">
                  Clientes
                </dt>
                <dd className="font-serif text-lg text-foreground">Consultoras 50—1000</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ SECCIÓN VI · AUDIENCIA ═══════════════════════ */

export function EditorialAudience() {
  const si = [
    'Tu equipo cierra cuando tú estás. No cierra cuando no estás.',
    'Vendes servicios de alto ticket ($300k+) con ciclo largo.',
    'Ya exploraste IA y sabes que no es magia — quieres aplicarla con método.',
    'Facturas consistente pero no encuentras cómo escalar sin contratar el doble.',
  ];
  const no = [
    'Buscas "agencia que genere 25 reuniones en 3 meses o devuelve dinero".',
    'Vendes productos transaccionales con ciclo corto por canales masivos.',
    'No tienes ticket mediano-alto — un sistema es caro para tu margen.',
    'Esperas que la IA haga el trabajo sin tu equipo aprenderlo.',
  ];

  return (
    <section className="py-20 md:py-28 bg-background border-b border-foreground/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-4 font-semibold">
            § VI · Para quién
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em]">
            Honesto antes de <span className="italic">cobrarte</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-foreground/85">
          {/* Sí */}
          <div className="border-b md:border-b-0 md:border-r border-foreground/20 pt-8 pb-10 md:pr-10">
            <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/60 mb-5 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" aria-hidden />
              Sí — probablemente somos tu fit
            </p>
            <ul className="space-y-5">
              {si.map((item, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] gap-4 items-start">
                  <span className="font-mono text-sm text-foreground/55 tabular-nums pt-1">
                    [ {String(i + 1).padStart(2, '0')} ]
                  </span>
                  <p className="font-serif italic text-base md:text-lg leading-[1.5] text-foreground/85">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {/* No */}
          <div className="pt-8 pb-10 md:pl-10">
            <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/60 mb-5 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-foreground/30" aria-hidden />
              No — mejor busca en otro lado
            </p>
            <ul className="space-y-5">
              {no.map((item, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] gap-4 items-start">
                  <span className="font-mono text-sm text-foreground/40 tabular-nums pt-1">
                    [ {String(i + 1).padStart(2, '0')} ]
                  </span>
                  <p className="font-serif italic text-base md:text-lg leading-[1.5] text-foreground/55">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ SECCIÓN VII · CTA FINAL ═══════════════════════ */

export function EditorialCta() {
  const ctaHref =
    (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_RECLAIM_URL) ||
    'https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial';

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8 md:col-start-2">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary mb-6 font-semibold">
              Siguiente paso
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[4.5rem] font-normal text-foreground leading-[1.02] tracking-[-0.02em] mb-8">
              30 minutos para ver si esto{' '}
              <span className="italic">te aplica</span>.
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 leading-[1.55] max-w-2xl mb-10">
              Una conversación. Sin pitch. Sin compromiso. Describes tu situación,
              mapeamos dónde está tu cuello de botella, y decidimos juntos si tiene
              sentido trabajar — o si conviene otro camino.
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-16">
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-foreground bg-foreground text-background font-mono text-xs tracking-[0.14em] uppercase px-6 py-4 transition-all hover:bg-background hover:text-foreground"
              >
                Agendar diagnóstico
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="/marcos-venta"
                className="group font-mono text-xs tracking-[0.14em] uppercase text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
              >
                Explorar primero los marcos
                <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden>
                  →
                </span>
              </a>
            </div>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-foreground/20 pt-8">
              <div>
                <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-1">
                  Duración
                </dt>
                <dd className="font-serif text-lg text-foreground">30 minutos</dd>
              </div>
              <div>
                <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-1">
                  Costo
                </dt>
                <dd className="font-serif text-lg text-foreground">Cero</dd>
              </div>
              <div>
                <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-1">
                  Compromiso
                </dt>
                <dd className="font-serif text-lg text-foreground">Ninguno</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
