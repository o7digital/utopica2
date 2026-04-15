"use client";

import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SeoLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

/**
 * Componente para crear enlaces optimizados para SEO y accesibilidad
 * Añade automáticamente atributos rel para enlaces externos y target="_blank"
 */
export function SeoLink({
  href,
  children,
  className,
  title,
  target,
  rel,
  ariaLabel,
  onClick,
}: SeoLinkProps) {
  // Determinar si es un enlace externo
  const isExternal = href.startsWith('http') || href.startsWith('//');
  
  // Configurar rel para enlaces externos
  let finalRel = rel;
  if (isExternal && target === '_blank') {
    finalRel = rel ? `${rel} noopener noreferrer` : 'noopener noreferrer';
  }
  
  // Clases base para todos los enlaces
  const baseClasses = "transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";
  
  // Combinar clases base con clases personalizadas
  const combinedClassName = cn(baseClasses, className);

  // Renderizar el enlace adecuado según sea interno o externo
  if (isExternal) {
    return (
      <a
        href={href}
        className={combinedClassName}
        title={title}
        target={target}
        rel={finalRel}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  
  // Para enlaces internos, usar el componente Link de Next.js
  return (
    <Link
      href={href}
      className={combinedClassName}
      title={title}
      target={target}
      rel={finalRel}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
