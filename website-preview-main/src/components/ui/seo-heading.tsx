import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SeoHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Componente para crear encabezados semánticos con la jerarquía correcta para SEO
 * Asegura que los encabezados tengan la estructura adecuada y sean accesibles
 */
export function SeoHeading({ level, children, className, id }: SeoHeadingProps) {
  const baseStyles = "font-bold tracking-tight";
  
  // Estilos específicos para cada nivel de encabezado
  const levelStyles = {
    1: "text-4xl md:text-5xl lg:text-6xl mb-6",
    2: "text-3xl md:text-4xl mb-5",
    3: "text-2xl md:text-3xl mb-4",
    4: "text-xl md:text-2xl mb-3",
    5: "text-lg md:text-xl mb-2",
    6: "text-base md:text-lg mb-2",
  };
  
  // Combinar estilos base con estilos específicos del nivel y cualquier clase personalizada
  const combinedClassName = cn(baseStyles, levelStyles[level], className);
  
  // Renderizar el encabezado correcto basado en el nivel
  switch (level) {
    case 1:
      return <h1 id={id} className={combinedClassName}>{children}</h1>;
    case 2:
      return <h2 id={id} className={combinedClassName}>{children}</h2>;
    case 3:
      return <h3 id={id} className={combinedClassName}>{children}</h3>;
    case 4:
      return <h4 id={id} className={combinedClassName}>{children}</h4>;
    case 5:
      return <h5 id={id} className={combinedClassName}>{children}</h5>;
    case 6:
      return <h6 id={id} className={combinedClassName}>{children}</h6>;
    default:
      return <h2 id={id} className={combinedClassName}>{children}</h2>;
  }
}
