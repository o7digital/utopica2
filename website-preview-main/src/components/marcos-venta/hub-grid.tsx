import { ArrowUpRight } from 'lucide-react';
import { frameworks } from './data';

export function HubGrid() {
  return (
    <section className="bg-background py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header editorial */}
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] tracking-[0.18em] uppercase text-primary mb-4 font-semibold">
            01 — Los cinco marcos
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-[1.1] mb-5">
            Del más reciente <em className="italic text-primary">al clásico</em>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cuarenta años de investigación en ventas B2B condensados en cinco frameworks
            que se complementan entre sí. Cada marco ataca un problema distinto —
            posicionamiento, preguntas, diagnóstico, control, estructura.
          </p>
        </div>

        {/* Grid de marcos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {frameworks.map((f) => (
            <a
              key={f.slug}
              href={`/marcos-venta/${f.slug}`}
              className="group relative bg-card border border-border rounded-xl p-8 md:p-10 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5 min-h-[340px] flex flex-col overflow-hidden"
            >
              {/* accent shape atmospheric */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/0 group-hover:bg-primary/[0.05] transition-colors blur-2xl"
                aria-hidden
              />

              <div className="relative flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-muted-foreground">
                  {f.year}
                </span>
                <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-primary font-semibold">
                  {f.number}
                </span>
              </div>

              <div className="relative w-10 h-[2px] bg-primary mb-6" aria-hidden />

              <h3 className="relative font-serif text-[1.75rem] md:text-[2rem] font-normal text-foreground leading-[1.1] mb-4">
                {f.title}
                <br />
                <em className="italic text-primary">{f.titleEm}</em>
              </h3>

              <p className="relative text-sm md:text-base text-muted-foreground leading-relaxed mb-7 flex-1">
                <span className="text-foreground font-semibold">{f.author}.</span>{' '}
                {f.subtitle}.
              </p>

              <div className="relative flex items-center justify-between gap-3">
                <span className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground border border-border px-2.5 py-1 rounded-full bg-secondary/50">
                  {f.tags[0]}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors font-semibold">
                  Leer
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
