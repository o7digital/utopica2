import { frameworks } from './data';

/**
 * El índice de marcos presentado como TABLA de biblioteca, no grid de cards.
 * Cada fila es tipográfica: mono metadata + serif title + mono author.
 * Hover: tinta gold sutil en la fila + flecha animada.
 */
export function HubIndex() {
  return (
    <section id="index" className="bg-background border-t border-foreground/20 pt-14 md:pt-20 pb-14 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Encabezado de sección estilo catálogo */}
        <div className="flex items-baseline justify-between mb-10 md:mb-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/50 mb-3">
              § I · Índice
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em] max-w-2xl">
              Los marcos, del más <span className="italic">reciente</span> al más <span className="italic">clásico</span>.
            </h2>
          </div>
          <span className="hidden md:block font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/40 tabular-nums">
            05 entradas
          </span>
        </div>

        {/* Encabezado de tabla */}
        <div className="hidden md:grid grid-cols-[90px_80px_1fr_200px_60px] gap-6 px-1 pb-3 border-b border-foreground/85">
          <HeadCell>Año</HeadCell>
          <HeadCell>ID</HeadCell>
          <HeadCell>Marco</HeadCell>
          <HeadCell>Autor</HeadCell>
          <HeadCell className="text-right">Leer</HeadCell>
        </div>

        {/* Filas */}
        <ol className="divide-y divide-foreground/12">
          {frameworks.map((f, i) => (
            <li key={f.slug}>
              <a
                href={`/marcos-venta/${f.slug}`}
                className="group grid md:grid-cols-[90px_80px_1fr_200px_60px] gap-x-6 gap-y-1 md:gap-y-0 items-baseline py-6 md:py-7 px-1 transition-colors hover:bg-primary/[0.06] relative"
                style={{ scrollMarginTop: '80px' }}
              >
                {/* Año */}
                <span className="font-mono text-sm md:text-base text-foreground/70 tabular-nums tracking-wider">
                  {f.year}
                </span>

                {/* ID */}
                <span className="font-mono text-sm md:text-base text-foreground/60 tabular-nums tracking-wider md:block hidden">
                  M.{String(i + 1).padStart(2, '0')}
                </span>

                {/* Título + subtítulo */}
                <div className="md:contents">
                  <div className="col-start-3">
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-[2rem] font-normal text-foreground leading-[1.1] tracking-[-0.01em] mb-1.5 group-hover:text-foreground">
                      {f.title} <span className="italic">{f.titleEm}</span>
                    </h3>
                    <p className="text-sm md:text-base text-foreground/60 max-w-xl leading-snug">
                      {f.subtitle}.
                    </p>
                  </div>
                </div>

                {/* Autor */}
                <span className="md:col-start-4 font-mono text-xs md:text-sm text-foreground/70 uppercase tracking-[0.08em] self-center">
                  {f.author}
                </span>

                {/* Flecha leer */}
                <span className="md:col-start-5 md:text-right self-center">
                  <span
                    aria-hidden
                    className="inline-block font-mono text-xl text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all tabular-nums"
                  >
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>

        {/* Footer de la tabla */}
        <div className="mt-6 pt-4 border-t border-foreground/20 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/45">
            Fin del índice
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/45">
            5 de 5
          </span>
        </div>
      </div>
    </section>
  );
}

function HeadCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        'font-mono text-[10.5px] tracking-[0.18em] uppercase text-foreground/55',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </span>
  );
}
