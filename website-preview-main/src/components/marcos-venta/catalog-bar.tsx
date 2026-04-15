import { cn } from '@/lib/utils';

/**
 * Barra de metadata tipo catálogo de biblioteca.
 * Aparece debajo de la navegación global en /marcos-venta.
 * Formato: UTP / MARCOS / M.01 / 2024 / BLAIR ENNS
 */
export function CatalogBar({
  segments,
  className,
}: {
  segments: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border-b border-foreground/15 bg-background/95 backdrop-blur-sm',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3.5 flex items-center">
        <nav
          aria-label="Ruta del archivo"
          className="font-mono text-[10.5px] md:text-[11px] tracking-[0.14em] uppercase text-foreground/60 flex items-center flex-wrap gap-x-0 gap-y-1"
        >
          {segments.map((seg, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && <span className="mx-2 md:mx-3 text-foreground/30">/</span>}
              <span className={i === segments.length - 1 ? 'text-foreground' : ''}>{seg}</span>
            </span>
          ))}
        </nav>
        <span className="ml-auto font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/40 hidden md:inline">
          Archivo · v1.0
        </span>
      </div>
    </div>
  );
}
