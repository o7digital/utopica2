import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <img
      src="/images/Utopica Logo.svg"
      alt="Utópica - Libertad Comercial para Fundadores B2B"
      width={160}
      height={42}
      className={`object-contain ${className || ''}`}
      style={{ objectFit: 'contain' }}
    />
  );
}