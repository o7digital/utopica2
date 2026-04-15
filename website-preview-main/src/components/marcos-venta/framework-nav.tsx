import { getFrameworkNav } from './data';

/**
 * Navegación inferior entre marcos — mono, sin cards.
 * Inspiración: footer de paper académico con "Previous / Next article".
 */
export function FrameworkNav({ slug }: { slug: string }) {
  const { prev, next } = getFrameworkNav(slug);
  return (
    <nav
      aria-label="Navegación entre marcos"
      className="mt-20 md:mt-28 pt-10 border-t border-foreground/20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
    >
      <div>
        {prev ? (
          <a
            href={`/marcos-venta/${prev.slug}`}
            className="group block transition-opacity hover:opacity-100 opacity-90"
          >
            <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/50 flex items-center gap-2 mb-2">
              <span className="group-hover:-translate-x-0.5 transition-transform" aria-hidden>
                ←
              </span>
              Marco anterior
            </span>
            <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
              {prev.shortTitle}
            </span>
          </a>
        ) : (
          <a
            href="/marcos-venta"
            className="group block"
          >
            <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/50 flex items-center gap-2 mb-2">
              <span className="group-hover:-translate-x-0.5 transition-transform" aria-hidden>
                ←
              </span>
              Índice
            </span>
            <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
              Volver a los cinco marcos
            </span>
          </a>
        )}
      </div>
      <div>
        {next && (
          <a
            href={`/marcos-venta/${next.slug}`}
            className="group block md:text-right transition-opacity hover:opacity-100 opacity-90"
          >
            <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/50 flex md:justify-end items-center gap-2 mb-2">
              Siguiente marco
              <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden>
                →
              </span>
            </span>
            <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
              {next.shortTitle}
            </span>
          </a>
        )}
      </div>
    </nav>
  );
}
