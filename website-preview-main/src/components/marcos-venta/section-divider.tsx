import type { ReactNode } from 'react';

/**
 * Divisor editorial entre secciones de /marcos-venta.
 * Línea + label en serif cursiva ambar + línea. Formato revista.
 */
export function SectionDivider({
  label,
  className,
}: {
  label: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex items-center gap-5 md:gap-8">
        <span
          className="h-px bg-gradient-to-r from-transparent via-border to-border flex-1"
          aria-hidden
        />
        <span className="flex items-center gap-3">
          <span className="w-1 h-1 rounded-full bg-primary" aria-hidden />
          <span className="font-serif italic text-sm md:text-base text-primary whitespace-nowrap">
            {label}
          </span>
          <span className="w-1 h-1 rounded-full bg-primary" aria-hidden />
        </span>
        <span
          className="h-px bg-gradient-to-l from-transparent via-border to-border flex-1"
          aria-hidden
        />
      </div>
    </div>
  );
}
