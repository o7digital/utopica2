export function HubPrinciples() {
  return (
    <section className="bg-background py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-20 items-start">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-primary mb-4 font-semibold">
              02 — Fundamentos
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-[1.1] mb-6">
              Por qué estos <em className="italic text-primary">cinco marcos</em>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-5">
              La venta consultiva no es un estilo — es una disciplina con metodología,
              evidencia y práctica deliberada.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cada uno ataca el problema desde un ángulo diferente: el poder de
              posicionamiento, las preguntas correctas, el diagnóstico de brecha, el
              control de la narrativa o la estructura del pitch. Usarlos juntos — o
              saber cuándo aplicar cuál — es la diferencia entre vender y competir
              por precio.
            </p>
          </div>

          <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
            <PrincipleRow
              label="Principio universal"
              title="En toda venta de expertise, la venta es el ejemplo de lo que vendrá después."
              italic
              first
            />
            <PrincipleRow
              label="Diagnóstico antes de prescripción"
              title="Ningún médico receta sin examinar. Ningún consultor debería proponer sin entender."
            />
            <PrincipleRow
              label="El cliente compra el futuro"
              title="Siempre están comprando una mejor versión de sí mismos. El framework que uses cambia cómo llegas a ese futuro."
            />
            <PrincipleRow
              label="El precio no es el problema"
              title='Cuando el valor está claro, el precio se justifica. El "es muy caro" es siempre un síntoma, no una causa.'
              last
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PrincipleRow({
  label,
  title,
  italic = false,
  first = false,
  last = false,
}: {
  label: string;
  title: string;
  italic?: boolean;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={[
        'px-6 md:px-7 py-6',
        !last ? 'border-b border-border' : '',
        first ? 'bg-primary/[0.04]' : '',
      ].join(' ')}
    >
      <p className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground mb-2 font-semibold">
        {label}
      </p>
      <p
        className={
          italic
            ? 'font-serif text-xl md:text-2xl italic leading-snug text-primary'
            : 'text-base md:text-lg text-foreground/85 leading-relaxed'
        }
      >
        {title}
      </p>
    </div>
  );
}
