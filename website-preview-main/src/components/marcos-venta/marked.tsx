import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Marker highlight — amarillo ambar pintado detrás de la palabra.
 * Inspiración: Fabian Roschig "Faster." highlight.
 * Único gesto decorativo permitido en /marcos-venta.
 * Usar MAX 1-2 veces por sección mayor.
 */
export function Marked({
  children,
  size = 'default',
  className,
}: {
  children: ReactNode;
  size?: 'default' | 'sm';
  className?: string;
}) {
  return (
    <span className={cn(size === 'sm' ? 'marker-highlight-sm' : 'marker-highlight', className)}>
      {children}
    </span>
  );
}
