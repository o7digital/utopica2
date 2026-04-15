'use client';

import { Link } from '@/components/ui/Link';
import { Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

const servicios = [
  { href: '/servicios/prospeccion', label: 'Prospección', meta: 'S.01' },
  { href: '/servicios/calificacion', label: 'Calificación', meta: 'S.02' },
  { href: '/servicios/venta-consultiva', label: 'Venta consultiva', meta: 'S.03' },
  { href: '/servicios/coaching-ia', label: 'Coaching IA', meta: 'S.04' },
  { href: '/servicios/proyectos-ia', label: 'Proyectos IA', meta: 'S.05' },
];

const recursos = [
  { href: '/marcos-venta', label: 'Marcos de Venta', meta: 'R.01' },
  { href: '/blog', label: 'Blog', meta: 'R.02' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 md:pt-20 pb-10">
        {/* Top eyebrow */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-5 mb-12 border-b border-background/20">
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-background/55">
            Utópica · Índice del sitio
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-background/40 tabular-nums">
            Actualizado 2026 · abr
          </span>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 mb-16 md:mb-20">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link
              href="/"
              aria-label="Ir a la página de inicio"
              className="inline-block mb-5"
            >
              <img
                src="/images/logo-gris.png"
                alt="Utópica"
                width={120}
                height={32}
                className="brightness-200 invert opacity-90"
              />
            </Link>
            <p className="font-serif italic text-xl md:text-2xl text-background/85 leading-[1.35] tracking-[-0.005em] max-w-md mb-6">
              Instalamos sistemas comerciales que funcionan aunque nadie esté mirando.
            </p>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-background/50 max-w-md leading-[1.8]">
              Consultoría de ventas B2B con IA
              <br />
              Ciudad de México · Operamos desde 2022
            </p>
          </div>

          {/* Servicios */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-background/55 mb-5 flex items-center justify-between">
              <span>Servicios</span>
              <span className="text-background/30 tabular-nums">05</span>
            </h4>
            <ul className="divide-y divide-background/15 border-t border-background/25">
              {servicios.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 py-3 text-background/80 hover:text-background transition-colors"
                  >
                    <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-background/40 tabular-nums w-9 flex-shrink-0">
                      {item.meta}
                    </span>
                    <span className="font-serif text-base flex-1 leading-snug">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 text-background/30 group-hover:text-background transition-colors flex-shrink-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-background/55 mb-5 flex items-center justify-between">
              <span>Recursos</span>
              <span className="text-background/30 tabular-nums">02</span>
            </h4>
            <ul className="divide-y divide-background/15 border-t border-background/25">
              {recursos.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 py-3 text-background/80 hover:text-background transition-colors"
                  >
                    <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-background/40 tabular-nums w-9 flex-shrink-0">
                      {item.meta}
                    </span>
                    <span className="font-serif text-base flex-1 leading-snug">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 text-background/30 group-hover:text-background transition-colors flex-shrink-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-background/55 mb-5">
              Contacto
            </h4>
            <dl className="divide-y divide-background/15 border-t border-background/25">
              <div className="py-3">
                <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-background/40 mb-1">
                  Correo
                </dt>
                <dd>
                  <a
                    href="mailto:gael@utopica.net"
                    className="font-serif text-base text-background/85 hover:text-background transition-colors"
                  >
                    gael@utopica.net
                  </a>
                </dd>
              </div>
              <div className="py-3">
                <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-background/40 mb-1">
                  Redes
                </dt>
                <dd className="flex items-center gap-5 pt-1" aria-label="Redes sociales">
                  <a
                    href="https://www.linkedin.com/company/somosutopica/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/60 hover:text-background transition-colors"
                    aria-label="LinkedIn de Utópica"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/@UtópicaMx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/60 hover:text-background transition-colors"
                    aria-label="YouTube de Utópica"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                </dd>
              </div>
              <div className="py-3">
                <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-background/40 mb-1">
                  Agendar
                </dt>
                <dd>
                  <a
                    href="https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-background hover:text-background/80 transition-colors"
                  >
                    Diagnóstico (30 min)
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Colophon type-specimen */}
        <div className="border-t border-background/20 pt-8">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 mb-8">
            <div className="md:col-span-6">
              <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-background/45 mb-3">
                Colophon
              </p>
              <p className="font-serif italic text-base md:text-lg text-background/70 leading-[1.6] max-w-xl">
                Compilado por Utópica. Tipografías: Instrument Serif · DM Sans · DM Mono.
                Construido con Astro, React y Tailwind. Cuidadosamente diseñado en Ciudad
                de México.
              </p>
            </div>
            <dl className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-5 content-start">
              <div>
                <dt className="font-mono text-[10px] tracking-[0.14em] uppercase text-background/40 mb-1">
                  Versión
                </dt>
                <dd className="font-mono text-xs text-background/75 tabular-nums">v.1</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.14em] uppercase text-background/40 mb-1">
                  Idioma
                </dt>
                <dd className="font-mono text-xs text-background/75">es-MX</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.14em] uppercase text-background/40 mb-1">
                  Sede
                </dt>
                <dd className="font-mono text-xs text-background/75">CDMX</dd>
              </div>
            </dl>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-background/15 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-background/45">
              © {year} Utópica · Todos los derechos reservados
            </p>
            <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-background/35">
              CDMX · Polanco · Reforma · Santa Fe · Roma · Condesa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
