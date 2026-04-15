/**
 * Colophon estilo publicación impresa.
 * Cierra la página con voz de "archivo curado", no con CTAs agresivos.
 */
export function HubColophon() {
  return (
    <section className="bg-background border-t border-foreground/20 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/50 mb-4">
              Colophon
            </p>
            <p className="font-serif italic text-lg md:text-xl text-foreground/70 leading-[1.6] max-w-2xl">
              Compilado por Utópica. Tipografías: Instrument Serif para el cuerpo editorial,
              DM Sans para prosa, DM Mono para metadata. Los textos resumen y reinterpretan
              obras originales de sus autores; se recomienda leer las fuentes primarias.
            </p>
          </div>
          <dl className="col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-y-5 gap-x-4 content-start">
            <MetaCell label="Versión" value="1.0" />
            <MetaCell label="Actualizado" value="2026 · abr" />
            <MetaCell label="Idioma" value="es-MX" />
            <MetaCell label="Licencia" value="Uso interno / referencia" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/50 border-t border-foreground/15 pt-2.5">
        {label}
      </dt>
      <dd className="font-mono text-[13px] text-foreground/80 border-t border-foreground/15 pt-2.5">
        {value}
      </dd>
    </>
  );
}
