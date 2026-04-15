import {
  PrincipleBar,
  FormulaBlock,
  ObjBlock,
  OutcomeBlock,
  WarnBlock,
  MiniCard,
  CardGrid,
  MetricsRow,
  SectionTitle,
  SectionHeader,
  ConvAccordion,
  type ConvItem,
} from '../primitives';

export function SpinContent() {
  const items: ConvItem[] = [
    {
      number: 'S',
      title: 'Situation Questions — Preguntas de situación',
      subtitle: 'Contexto. Úsalas con moderación.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Recopilar hechos y datos sobre la situación actual del cliente. Son el punto de
            partida necesario, pero la investigación de Rackham mostró que los vendedores
            inexpertos hacen demasiadas — lo que aburre y frustra al comprador.
          </ObjBlock>

          <SectionHeader>Ejemplos de preguntas</SectionHeader>
          <ObjBlock className="leading-[2]">
            · &quot;¿Cuántas personas tiene actualmente en su equipo de ventas?&quot;
            <br />· &quot;¿Qué sistema usan hoy para hacer seguimiento de sus
            oportunidades?&quot;
            <br />· &quot;¿Hace cuánto tiempo tienen este proceso en su lugar?&quot;
            <br />· &quot;¿Cuántos clientes atienden actualmente?&quot;
          </ObjBlock>

          <WarnBlock label="Error común">
            Hacer demasiadas preguntas de situación seguidas. El cliente siente que está
            siendo interrogado o que no hiciste investigación previa. Investigar lo básico
            antes de la reunión reduce la necesidad de estas preguntas.
          </WarnBlock>

          <OutcomeBlock>
            Contexto suficiente para hacer preguntas de problema relevantes. No es el fin —
            es el punto de partida.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'P',
      title: 'Problem Questions — Preguntas de problema',
      subtitle: 'Dificultades, insatisfacciones, dolores explícitos.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Explorar los problemas, dificultades e insatisfacciones del cliente con su
            situación actual. Estas preguntas están fuertemente correlacionadas con el éxito
            en ventas pequeñas, pero son solo el inicio en ventas complejas.
          </ObjBlock>

          <SectionHeader>Ejemplos de preguntas</SectionHeader>
          <ObjBlock className="leading-[2]">
            · &quot;¿Qué tan difícil resulta mantener actualizada la información de sus
            prospectos?&quot;
            <br />· &quot;¿Tienen problemas con la consistencia en cómo su equipo hace
            discovery?&quot;
            <br />· &quot;¿Están satisfechos con los tiempos de respuesta a nuevas
            oportunidades?&quot;
            <br />· &quot;¿Qué aspectos del proceso actual les generan más fricción?&quot;
          </ObjBlock>

          <SectionHeader>La distinción crítica de Rackham</SectionHeader>
          <ObjBlock className="leading-[1.75]">
            <strong className="text-foreground">Necesidades implícitas</strong> (lo que
            revelan las preguntas de problema): &quot;Tenemos algunos problemas con el
            seguimiento.&quot; — No es suficiente para justificar un cambio costoso.
            <br />
            <br />
            <strong className="text-foreground">Necesidades explícitas</strong> (lo que
            buscamos generar): &quot;Necesito un sistema que me dé visibilidad total del
            pipeline en tiempo real.&quot; — Esto sí justifica la inversión.
          </ObjBlock>

          <OutcomeBlock>
            Identificar áreas de dolor e insatisfacción. En ventas complejas, esto no es
            suficiente — el cliente necesita sentir que el problema vale la pena resolver.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'I',
      title: 'Implication Questions — Preguntas de implicación',
      subtitle: 'El corazón del método. Las más poderosas y difíciles.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Explorar las consecuencias y efectos del problema. Hacer que el cliente sienta el
            costo real de no resolver — no de forma manipuladora, sino genuinamente. Son las
            preguntas más poderosas del modelo y las más difíciles de dominar.
          </ObjBlock>

          <SectionHeader>Ejemplos de preguntas</SectionHeader>
          <ObjBlock className="leading-[2]">
            · &quot;¿Cómo afecta eso a la moral del equipo de ventas?&quot;
            <br />· &quot;¿Cuánto tiempo pierde su equipo resolviendo esas incoherencias cada
            semana?&quot;
            <br />· &quot;Si eso no se resuelve, ¿qué impacto tiene en su objetivo de revenue
            del año?&quot;
            <br />· &quot;¿Ese retraso en respuesta les ha costado alguna oportunidad?&quot;
            <br />· &quot;¿Cómo afecta a la dirección no tener visibilidad del
            pipeline?&quot;
          </ObjBlock>

          <SectionHeader>Por qué son tan poderosas</SectionHeader>
          <ObjBlock className="leading-[1.75]">
            El cliente{' '}
            <strong className="text-foreground">
              no vino a la reunión pensando en todos los efectos secundarios de su problema
            </strong>
            . Las preguntas de implicación lo ayudan a construir ese mapa mental. Cuando el
            cliente articula las consecuencias, aumenta la urgencia percibida — sin que el
            vendedor haya dicho nada sobre la solución.
          </ObjBlock>

          <WarnBlock label="Cuidado con el tono">
            Estas preguntas pueden sentirse pesadas si se acumulan sin empatía. Los mejores
            vendedores conectan las preguntas de implicación con una narrativa de mejora, no
            de catástrofe.
          </WarnBlock>

          <OutcomeBlock>
            El cliente siente el costo real de su problema. Una necesidad implícita se
            convierte en urgente. El terreno está listo para las preguntas de beneficio.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'N',
      title: 'Need-Payoff Questions — Preguntas de beneficio',
      subtitle: 'El cliente articula el valor de la solución — en sus propias palabras.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Hacer que el cliente exprese el valor o utilidad de resolver su problema. Cuando
            el cliente dice &quot;eso nos ahorraría mucho tiempo&quot;, lo cree más
            profundamente que si lo dijera el vendedor. Son las preguntas más positivas y
            generan entusiasmo.
          </ObjBlock>

          <SectionHeader>Ejemplos de preguntas</SectionHeader>
          <ObjBlock className="leading-[2]">
            · &quot;¿Cuánto les ayudaría tener visibilidad del pipeline en tiempo real?&quot;
            <br />· &quot;Si pudieras reducir ese tiempo de respuesta a la mitad, ¿qué
            impacto tendría?&quot;
            <br />· &quot;¿Qué valor tendría para ti poder escalar sin contratar más
            personas?&quot;
            <br />· &quot;Si ese proceso estuviera automatizado, ¿en qué enfocaría el equipo
            ese tiempo?&quot;
          </ObjBlock>

          <SectionHeader>El efecto en la conversación</SectionHeader>
          <CardGrid cols={2}>
            <MiniCard label="Sin preguntas N" title="El vendedor explica beneficios">
              El cliente escucha pero no internaliza. Probabilidad de objeciones alta.
            </MiniCard>
            <MiniCard label="Con preguntas N" title="El cliente declara beneficios">
              El cliente construye el caso internamente. Reduce la resistencia al cierre.
            </MiniCard>
          </CardGrid>

          <OutcomeBlock>
            El cliente articula el valor de la solución con sus propias palabras. La
            necesidad explícita está formada. La propuesta puede presentarse con altísima
            relevancia.
          </OutcomeBlock>
        </>
      ),
    },
  ];

  return (
    <>
      <PrincipleBar label="La conclusión central de la investigación">
        Los vendedores exitosos en ventas grandes{' '}
        <strong className="text-foreground">hacen más preguntas y hablan menos</strong>.
        Pero no cualquier pregunta — hay cuatro tipos que, en la secuencia correcta, llevan
        al cliente a articular su propia necesidad de cambio. Cuando el cliente lo dice, lo
        cree. Cuando el vendedor lo dice, desconfía.
      </PrincipleBar>

      <FormulaBlock>
        <strong className="text-foreground">Las 4 categorías de preguntas:</strong> S · P · I · N
        <br />
        Situation → Problem → Implication → Need-Payoff
      </FormulaBlock>

      <SectionTitle>El modelo SPIN</SectionTitle>

      <ConvAccordion items={items} defaultOpen={0} />

      <SectionTitle>Hallazgos contraintuitivos de la investigación</SectionTitle>
      <CardGrid cols={2}>
        <MiniCard
          label="Sobre las técnicas de cierre"
          title="Dañan el resultado en ventas complejas"
        >
          El &quot;cierre alternativo&quot; y el &quot;cierre de urgencia&quot; funcionan en
          ventas transaccionales. En ventas de alto valor, el cliente se siente presionado y
          la relación se daña.
        </MiniCard>
        <MiniCard
          label="Sobre las objeciones"
          title="Los buenos vendedores reciben menos — no más"
        >
          La creencia de que &quot;saber manejar objeciones&quot; define al buen vendedor es
          falsa. Los mejores previenen objeciones haciéndolas innecesarias con mejores
          preguntas.
        </MiniCard>
        <MiniCard
          label="Sobre los beneficios"
          title="Más beneficios = más objeciones de precio"
        >
          Presentar muchas características y beneficios genera resistencia de precio. El
          cliente compara. Enfocarse en beneficios específicos para el dolor identificado
          funciona mejor.
        </MiniCard>
        <MiniCard label="Sobre el rapport" title="Las aperturas no cambian el resultado">
          Pasar tiempo construyendo rapport al inicio de la reunión no tiene correlación con
          el éxito. Llegar rápido a las preguntas relevantes sí la tiene.
        </MiniCard>
      </CardGrid>

      <MetricsRow
        metrics={[
          { val: '35K', label: <>Llamadas de venta<br />analizadas en la investigación</>, accent: true },
          { val: '12', label: <>Años de investigación<br />en el campo</> },
          { val: '23', label: <>Países donde se<br />realizó el estudio</> },
        ]}
      />
    </>
  );
}
