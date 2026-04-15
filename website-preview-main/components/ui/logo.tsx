import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/images/Utopica Logo.svg"
      alt="Utópica - Libertad Comercial para Fundadores B2B"
      width={160}
      height={42}
      className={`object-contain ${className || ''}`}
      priority
      style={{ objectFit: 'contain' }}
    />
  );
}