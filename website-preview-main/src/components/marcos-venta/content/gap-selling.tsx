import {
  PrincipleBar,
  FormulaBlock,
  ObjBlock,
  OutcomeBlock,
  WarnBlock,
  MiniCard,
  CardGrid,
  StepList,
  MetricsRow,
  SectionTitle,
  SectionHeader,
  ConvAccordion,
  type ConvItem,
} from '../primitives';

export function GapSellingContent() {
  const items: ConvItem[] = [
    {
      number: 'I',
      title: 'Diagnóstico del estado actual',
      subtitle: 'Hechos, problemas, causa raíz, impacto.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Entender con profundidad la situación actual del cliente: no solo los síntomas
            visibles, sino la causa raíz y el impacto real en el negocio. Keenan llama esto
            el &quot;Problem Identification&quot; y es el trabajo más importante del
            vendedor.
          </ObjBlock>

          <SectionHeader>Las cinco capas del estado actual</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Hechos físicos',
                desc: 'Los datos objetivos y observables: métricas actuales, procesos en uso, estructura del equipo, sistemas que utilizan.',
              },
              {
                name: 'Problemas visibles',
                desc: 'Los síntomas que el cliente ya reconoce y puede articular. Tasas de conversión bajas, ciclos de venta largos, rotación alta.',
              },
              {
                name: 'Causa raíz',
                desc: 'El "por qué" detrás del problema. Sin causa raíz, cualquier solución es un parche. El vendedor que llega a la causa raíz antes que el cliente se posiciona como experto.',
              },
              {
                name: 'Impacto en el negocio',
                desc: '¿Cuánto le cuesta este problema? Revenue perdido, costo de tiempo, riesgo competitivo. El impacto cuantificado es lo que justifica la inversión.',
              },
              {
                name: 'Estado emocional del cliente',
                desc: 'Frustración, miedo, urgencia, resignación. Las emociones determinan cuándo compran y por qué. Ignorarlas es ignorar la mitad de la ecuación.',
              },
            ]}
          />

          <OutcomeBlock>
            Una imagen completa y profunda de la realidad actual del cliente — más completa
            de lo que el cliente tenía antes de la conversación.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'II',
      title: 'Diagnóstico del estado futuro',
      subtitle: 'Objetivos, visión, métricas deseadas.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Definir con precisión a dónde quiere llegar el cliente. No solo &quot;quiero
            mejorar las ventas&quot; — sino qué métricas, en qué plazo, con qué impacto. La
            brecha no existe sin un estado futuro claro.
          </ObjBlock>

          <SectionHeader>Dimensiones del estado futuro</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Objetivos de negocio',
                desc: '¿Qué resultados busca? Revenue, retención, eficiencia, crecimiento. Los objetivos conectan la solución con lo que importa al cliente.',
              },
              {
                name: 'Métricas de éxito',
                desc: '¿Cómo va a saber que llegó? Indicadores concretos. Sin métricas, no hay forma de demostrar valor ni de fijar expectativas realistas.',
              },
              {
                name: 'Plazo y urgencia',
                desc: '¿Para cuándo necesita estar ahí? La urgencia define si hay una venta hoy o una conversación pendiente.',
              },
              {
                name: 'Estado emocional deseado',
                desc: '¿Cómo quiere sentirse? Más confiado, más libre, más en control. Las emociones del estado futuro son motor de decisión.',
              },
            ]}
          />

          <OutcomeBlock>
            Un estado futuro claro, medible y emocionalmente cargado. Sin esto, la brecha no
            tiene destino.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'III',
      title: 'Amplificar la brecha',
      subtitle: 'Hacer visible el costo del estado actual.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Ayudar al cliente a sentir el peso real de permanecer en su estado actual. No de
            forma manipuladora — sino ayudándole a construir el mapa completo de
            consecuencias que quizás no había conectado.
          </ObjBlock>

          <SectionHeader>Preguntas que amplifican</SectionHeader>
          <ObjBlock className="leading-[2]">
            · &quot;¿Cuánto revenue dejas sobre la mesa cada mes mientras esto no se
            resuelve?&quot;
            <br />· &quot;¿Cómo afecta esto a tu equipo en términos de tiempo y
            motivación?&quot;
            <br />· &quot;Si en 12 meses estuvieras exactamente donde estás hoy, ¿qué habría
            pasado con tu objetivo?&quot;
            <br />· &quot;¿Qué oportunidades no puedes perseguir por no tener esto
            resuelto?&quot;
          </ObjBlock>

          <WarnBlock label="La diferencia clave con manipulación">
            Keenan es explícito: amplificar la brecha no significa exagerar o inventar
            problemas. Es ayudar al cliente a ver las conexiones reales entre su problema y
            sus consecuencias. Si el problema no es real o la brecha es pequeña, no hay venta
            — y eso es legítimo.
          </WarnBlock>

          <OutcomeBlock>
            El cliente siente que permanecer en el estado actual tiene un costo real y
            creciente. La urgencia de cambio se genera internamente, no por presión del
            vendedor.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'IV',
      title: 'Solución como puente',
      subtitle: 'La solución no se vende — se conecta.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Presentar la solución no como un producto con características, sino como el
            puente específico entre el estado actual del cliente y su estado futuro deseado.
            Cada elemento de la solución se conecta con un aspecto del diagnóstico previo.
          </ObjBlock>

          <SectionHeader>Cómo se presenta</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Recapitular el diagnóstico',
                desc: 'Antes de hablar de solución, confirmar con el cliente el mapa del problema. "Basado en lo que encontramos, esto es lo que entendí de tu situación..."',
              },
              {
                name: 'Conectar cada elemento con el problema',
                desc: 'No listar características — mostrar cómo cada parte de la solución ataca una causa raíz específica del estado actual del cliente.',
              },
              {
                name: 'Proyectar el estado futuro',
                desc: 'Mostrar cómo se ve la situación del cliente con la solución implementada. No en abstracto — con las métricas y objetivos que el cliente mismo articuló.',
              },
            ]}
          />

          <OutcomeBlock>
            El cliente reconoce su propia situación en la propuesta. La solución se siente
            diseñada para él — porque lo está.
          </OutcomeBlock>
        </>
      ),
    },
  ];

  return (
    <>
      <PrincipleBar label="La premisa central">
        Los clientes compran para resolver problemas.{' '}
        <strong className="text-foreground">
          Todo problema es la distancia entre un estado actual indeseable y un estado futuro
          deseado.
        </strong>{' '}
        El trabajo del vendedor es hacer esa brecha visible, urgente y costosa. Sin brecha,
        no hay venta.
      </PrincipleBar>

      {/* Gap viz: Estado actual → BRECHA → Estado futuro */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 border-t border-b border-foreground/85 my-8">
        <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-foreground/15">
          <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-3">
            Estado actual
          </p>
          <p className="font-serif text-lg md:text-xl text-foreground leading-snug mb-2">
            Dónde está hoy
          </p>
          <p className="text-sm md:text-base text-foreground/65 leading-[1.55]">
            Hechos, síntomas, problemas visibles, emociones negativas, métricas actuales. Lo
            que el cliente vive y siente.
          </p>
        </div>
        <div className="flex items-center justify-center border-b md:border-b-0 md:border-r border-foreground/15 py-5 md:px-8 md:py-7 bg-primary/[0.06]">
          <p className="font-serif italic text-lg md:text-xl text-primary text-center leading-snug">
            La
            <br />
            <span className="font-normal not-italic text-2xl md:text-3xl tracking-[0.05em]">
              BRECHA
            </span>
            <br />
            es la venta
          </p>
        </div>
        <div className="p-6 md:p-7">
          <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-3">
            Estado futuro
          </p>
          <p className="font-serif text-lg md:text-xl text-foreground leading-snug mb-2">
            Dónde quiere estar
          </p>
          <p className="text-sm md:text-base text-foreground/65 leading-[1.55]">
            Objetivos, visión, resultados esperados, emociones positivas, métricas objetivo.
            Lo que quiere vivir.
          </p>
        </div>
      </div>

      <FormulaBlock>
        <strong className="text-foreground">La ecuación de la venta:</strong> Brecha = Estado
        Futuro − Estado Actual
        <br />A mayor brecha percibida y mayor costo de permanecer en el estado actual →
        mayor urgencia de compra.
      </FormulaBlock>

      <SectionTitle>El proceso de diagnóstico</SectionTitle>

      <ConvAccordion items={items} defaultOpen={0} />

      <SectionTitle>Principios de Keenan</SectionTitle>
      <CardGrid cols={2}>
        <MiniCard label="Sin problema, no hay venta" title="El cliente no compra productos">
          Compra salidas de problemas. Si no hay problema diagnosticado, no hay razón de
          cambio — y ninguna técnica de cierre lo va a solucionar.
        </MiniCard>
        <MiniCard label="El vendedor es el diferenciador" title="No el producto">
          En mercados con productos similares, la calidad del diagnóstico es lo que
          diferencia. Mejor diagnóstico = mayor valor percibido = menor sensibilidad al
          precio.
        </MiniCard>
        <MiniCard label="La causa raíz lo cambia todo" title="Los síntomas engañan">
          El cliente dice que quiere más leads. La causa raíz es que su proceso de discovery
          no califica bien. La solución correcta no es más leads — es mejor calificación.
        </MiniCard>
        <MiniCard label="El status quo es el competidor" title="No las otras empresas">
          La mayoría de las ventas se pierden porque el cliente decide no hacer nada. No
          porque eligió a otro proveedor. La brecha tiene que ser más dolorosa que el
          esfuerzo de cambiar.
        </MiniCard>
      </CardGrid>

      <MetricsRow
        metrics={[
          { val: '60%', label: <>De las ventas perdidas terminan<br />en &quot;no hacer nada&quot;</>, accent: true },
          { val: '5×', label: <>Más probable cerrar cuando el comprador<br />articula su propio problema</> },
          { val: '00', label: <>Posibilidades de vender<br />sin brecha diagnosticada</> },
        ]}
      />
    </>
  );
}
