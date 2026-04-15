import { Marked } from './marked';

/**
 * Los "axiomas" de la biblioteca — numeración estilo papers académicos.
 * Prosa densa, sin cards, sin ornamentos. Tipografía manda.
 */
const axioms = [
  {
    num: '01',
    body: (
      <>
        La venta consultiva no es un <span className="italic">estilo</span>. Es una{' '}
        <Marked size="sm">disciplina</Marked> con método, evidencia y práctica deliberada.
        Confundirla con personalidad — &quot;yo soy más relacional&quot; — es lo que deja a
        los fundadores dependiendo de vendedores estrella imposibles de replicar.
      </>
    ),
  },
  {
    num: '02',
    body: (
      <>
        En toda venta de <span className="italic">expertise</span>, la venta es el{' '}
        <span className="italic">ejemplo</span> de lo que vendrá después. Cómo vendes comunica
        cómo resolves. Un experto que presenta gratis, persigue al cliente y acepta
        condiciones, señala que será un ejecutor de órdenes durante el proyecto.
      </>
    ),
  },
  {
    num: '03',
    body: (
      <>
        El cliente nunca compra el producto. Compra una{' '}
        <span className="italic">mejor versión de sí mismo</span>. Cada marco aquí ataca el
        mismo problema desde un ángulo distinto — posicionamiento, preguntas, diagnóstico de
        brecha, control de la narrativa, estructura del pitch — pero todos llegan al mismo
        lugar: ayudar al cliente a verse en el futuro.
      </>
    ),
  },
  {
    num: '04',
    body: (
      <>
        El precio casi nunca es el problema. Cuando el valor está claro, el precio se
        justifica. <span className="italic">&quot;Es muy caro&quot;</span> es siempre un
        síntoma — de pitch débil, de discovery apurado, de una brecha poco definida. Nunca la
        causa.
      </>
    ),
  },
];

export function HubThesis() {
  return (
    <section className="bg-background border-t border-foreground/20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Encabezado */}
        <div className="grid grid-cols-12 gap-4 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/50 mb-3">
              § II · Axiomas
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.015em]">
              Cuatro cosas que se repiten en los <span className="italic">cinco marcos</span>.
            </h2>
          </div>
          <p className="col-span-12 md:col-span-6 md:col-start-7 text-base md:text-lg text-foreground/65 leading-[1.65] self-end">
            Antes de entrar al detalle de cada uno, vale detenerse en lo que los une — el
            sustrato común sobre el que cuarenta años de investigación se han ido apilando.
          </p>
        </div>

        {/* Axioms list */}
        <ol className="border-t border-foreground/85">
          {axioms.map((a) => (
            <li
              key={a.num}
              className="border-b border-foreground/15 py-8 md:py-10 grid grid-cols-12 gap-4 md:gap-8"
            >
              <span className="col-span-12 md:col-span-2 font-mono text-sm tracking-[0.14em] uppercase text-foreground/50 tabular-nums pt-1">
                [ {a.num} ]
              </span>
              <p className="col-span-12 md:col-span-10 lg:col-span-9 font-serif text-xl md:text-2xl lg:text-[1.65rem] leading-[1.45] text-foreground/90 tracking-[-0.005em]">
                {a.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
