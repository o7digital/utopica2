export function FrameworkPlaceholder({ frameworkName }: { frameworkName: string }) {
  return (
    <div className="my-12 md:my-16 border-t border-b border-foreground/85 py-14 md:py-20">
      <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-foreground/55 mb-5">
        Status · En compilación
      </p>
      <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.15] tracking-[-0.015em] max-w-2xl mb-6">
        {frameworkName} — el resumen editorial{' '}
        <span className="italic">todavía está en redacción</span>.
      </p>
      <p className="text-base md:text-lg text-foreground/70 leading-[1.6] max-w-xl mb-7">
        Estamos terminando el resumen académico de este marco. Mientras tanto, el índice y los
        otros marcos ya publicados están disponibles.
      </p>
      <a
        href="/marcos-venta"
        className="font-mono text-[11px] tracking-[0.16em] uppercase text-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
      >
        <span aria-hidden>←</span>
        Volver al índice
      </a>
    </div>
  );
}
