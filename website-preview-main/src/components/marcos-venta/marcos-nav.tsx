import { frameworks } from './data';
import { cn } from '@/lib/utils';

/**
 * Sub-navegación tipográfica — mono, sin adornos.
 * Sticky debajo del nav global.
 */
export function MarcosNav({ pathname = '' }: { pathname?: string }) {
  const isHub = pathname === '/marcos-venta' || pathname === '/marcos-venta/';

  return (
    <nav
      aria-label="Marcos de venta"
      className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-foreground/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-12 md:h-14 flex items-center gap-6 md:gap-10">
        <a
          href="/marcos-venta"
          className={cn(
            'font-mono text-[11px] md:text-xs tracking-[0.16em] uppercase transition-colors whitespace-nowrap',
            isHub ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
          )}
        >
          <span className="text-foreground/40">UTP /</span> Marcos
        </a>
        <ul className="hidden md:flex items-center gap-5 lg:gap-7 flex-1 min-w-0 overflow-x-auto">
          {frameworks.map((f, i) => {
            const href = `/marcos-venta/${f.slug}`;
            const active = pathname === href || pathname === `${href}/`;
            return (
              <li key={f.slug} className="flex-shrink-0">
                <a
                  href={href}
                  className={cn(
                    'font-mono text-[11px] tracking-[0.14em] uppercase transition-colors flex items-center gap-2',
                    active ? 'text-foreground' : 'text-foreground/55 hover:text-foreground'
                  )}
                >
                  <span className="text-foreground/40 tabular-nums">
                    M.{String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{f.navLabel}</span>
                  {active && (
                    <span
                      aria-hidden
                      className="inline-block w-1.5 h-1.5 bg-primary rounded-full ml-0.5"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
