import {
  PrincipleBar,
  FormulaBlock,
  ObjBlock,
  OutcomeBlock,
  MiniCard,
  CardGrid,
  StepList,
  MetricsRow,
  SectionTitle,
  SectionHeader,
  ConvAccordion,
  type ConvItem,
} from '../primitives';

export function SalesPitchContent() {
  const items: ConvItem[] = [
    {
      number: 'I',
      title: 'Insight — el punto de vista único sobre el mercado',
      subtitle: 'El paso más difícil y el más importante del setup.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Compartir una perspectiva sobre el mercado que el cliente no tiene — algo que
            cambia cómo ve sus opciones y por qué tu valor diferenciado importa. La pregunta
            clave: &quot;¿Qué necesita saber el cliente para entender por qué tu valor único
            es importante para él?&quot;
          </ObjBlock>

          <SectionHeader>Cómo construirlo</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Parte de tu valor diferenciado',
                desc: 'El insight no es una observación genérica de la industria. Debe llevar lógicamente a por qué tu diferenciación específica importa. Si el insight les sirve para comprar a cualquier proveedor, no tienes ventaja.',
              },
              {
                name: 'Hazlo sorprendente y verificable',
                desc: 'El insight más poderoso es contraintuitivo — algo que el cliente no sabía o no había conectado. Pero debe ser comprobable con datos, casos o evidencia real.',
              },
              {
                name: 'Conviértelo en conversación',
                desc: 'El setup es un diálogo, no un monólogo. En cada paso preguntas: "¿Esto resuena con lo que están viviendo?" El cliente confirma o corrige — y tú haces discovery al mismo tiempo que educas.',
              },
            ]}
          />

          <OutcomeBlock>
            El cliente tiene una nueva forma de ver el mercado que lo lleva directamente a
            valorar lo que solo tú ofreces.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'II',
      title: 'Alternativas — el mapa completo de opciones',
      subtitle: 'No esconder la competencia — enseñar a evaluarla.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Ayudar al cliente a entender todas sus opciones agrupadas por &quot;enfoque&quot;
            — no por empresa o producto. La mayoría de las alternativas de mercado se pueden
            agrupar en 3-4 formas distintas de resolver el problema.
          </ObjBlock>

          <SectionHeader>El método de Dunford</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Agrupa por enfoque, no por proveedor',
                desc: 'No es "nosotros vs Salesforce vs HubSpot." Es "enfoque manual en hojas de cálculo vs CRM básico vs plataforma integrada." El cliente entiende la lógica mejor así.',
              },
              {
                name: 'Presenta los pros y contras de cada enfoque honestamente',
                desc: 'Dunford insiste en esto: ser honesto sobre las alternativas construye credibilidad. El cliente ya sabe que tienen ventajas — si las niegas, pierdes confianza.',
              },
              {
                name: 'Conecta los trade-offs con el insight',
                desc: 'Los trade-offs que importan son los que se conectan con el insight que compartiste. "Dado lo que vimos sobre X, la limitación de este enfoque es Y."',
              },
            ]}
          />

          <OutcomeBlock>
            El cliente tiene un mapa claro del mercado. Puede evaluar sus opciones con
            criterios informados — no solo por precio o por familiaridad.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'III',
      title: 'El mundo perfecto — criterios de compra ideales',
      subtitle: 'Definir qué haría perfecta la solución si no hubiera limitaciones.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Antes de presentar tu solución, preguntar al cliente: &quot;En un mundo ideal,
            sin restricciones de presupuesto o tiempo, ¿qué capacidades o características
            serían las más críticas para resolver esto?&quot; Esto define los criterios de
            evaluación — idealmente, los que favorecen tu diferenciación.
          </ObjBlock>

          <SectionHeader>Por qué funciona</SectionHeader>
          <ObjBlock className="leading-[1.9]">
            · Es el cliente quien establece los criterios — no el vendedor imponiéndolos.
            <br />· Si el cliente incluye los criterios donde eres fuerte, la decisión se
            alinea contigo sin que hayas &quot;vendido&quot; nada todavía.
            <br />· Si los criterios que enuncia no te favorecen, tienes información crítica
            para redirigir o descalificar antes de presentar.
          </ObjBlock>

          <OutcomeBlock>
            Criterios de evaluación explícitos y acordados. El pitch de la solución que sigue
            ya tiene un estándar contra el cual medirse — definido por el propio cliente.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'IV',
      title: 'Tu solución — valor diferenciado, no características',
      subtitle: 'Características → Valor → Por qué ese valor importa aquí.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Presentar tu solución como la respuesta lógica a los criterios que el cliente
            definió, conectando cada elemento con valor específico — no con características
            genéricas. La secuencia: característica → valor que entrega → por qué ese valor
            es crítico para este cliente.
          </ObjBlock>

          <SectionHeader>Valor vs características — la distinción crítica</SectionHeader>
          <CardGrid cols={2}>
            <MiniCard label="Pitch de características" title='"Tenemos dashboard en tiempo real con 200 métricas"'>
              El cliente escucha y pregunta internamente: ¿Y qué? No conecta automáticamente
              con lo que le importa.
            </MiniCard>
            <MiniCard
              label="Pitch de valor diferenciado"
              title='"Lo que eso significa para ustedes es que cuando un deal cambia de señal, el equipo lo sabe ese mismo día"'
            >
              El cliente conecta directamente con su situación. La característica tiene
              sentido porque el valor es explícito.
            </MiniCard>
          </CardGrid>

          <OutcomeBlock>
            El cliente puede articular por qué tu solución es la mejor elección para su
            situación específica. No porque el vendedor lo dijo — porque la lógica los llevó
            ahí.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'V',
      title: 'Prueba — evidencia concreta del valor',
      subtitle: 'No testimonios genéricos — casos análogos a la situación del prospecto.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Validar el valor diferenciado con evidencia real. La prueba más poderosa es un
            caso de un cliente que estaba en una situación similar, tomó la misma decisión, y
            obtuvo un resultado específico y medible.
          </ObjBlock>

          <SectionHeader>Qué hace una prueba efectiva</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Análoga, no genérica',
                desc: '"Una empresa de tu industria con un perfil similar" es más poderoso que "Fortune 500." El cliente necesita verse reflejado en el caso.',
              },
              {
                name: 'Específica en el resultado',
                desc: 'Números concretos cuando los hay. Si no hay métricas exactas, describir el cambio cualitativo con detalle. "Pasaron de X a Y en Z semanas."',
              },
              {
                name: 'Conectada con el valor diferenciado',
                desc: 'La prueba debe respaldar el valor único que presentaste — no una lista de logros generales del cliente.',
              },
            ]}
          />

          <OutcomeBlock>
            La promesa de valor tiene respaldo en resultados reales. El riesgo percibido de
            la decisión baja significativamente.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'VI',
      title: 'Demo · Objeciones · Llamada a la acción',
      subtitle: 'El cierre narrativo del pitch.',
      body: (
        <>
          <SectionHeader>Demo — integrada en la narrativa</SectionHeader>
          <ObjBlock>
            La demo no es un recorrido de funciones. Es la demostración del valor
            diferenciado que ya presentaste. Solo muestras lo que refuerza el argumento que
            construiste — y solo cuando el cliente ya entiende por qué debería importarle.
          </ObjBlock>

          <SectionHeader>Objeciones — anticipadas y proactivas</SectionHeader>
          <ObjBlock className="leading-[1.9]">
            Dunford propone manejar las objeciones más comunes antes de que el cliente las
            plantee:
            <br />
            <br />· Identifica las 2-3 objeciones más frecuentes para tu solución.
            <br />· Intégralas en el pitch: &quot;Sé que una preocupación común es X. Lo que
            encontramos es Y.&quot;
            <br />· Esto construye confianza — demuestra que conoces las limitaciones y has
            pensado en ellas.
          </ObjBlock>

          <SectionHeader>Llamada a la acción</SectionHeader>
          <ObjBlock>
            El pitch termina con un próximo paso específico, no con &quot;¿alguna
            pregunta?&quot; El cliente debe saber exactamente qué hacer si quiere avanzar — y
            ese paso debe ser fácil de tomar: una sesión de discovery más profunda, una
            prueba piloto, una propuesta acotada.
          </ObjBlock>

          <OutcomeBlock>
            El cliente tiene todo lo que necesita para tomar una decisión confiada —
            contexto de mercado, criterios claros, valor demostrado, objeciones resueltas y
            un camino evidente.
          </OutcomeBlock>
        </>
      ),
    },
  ];

  return (
    <>
      <PrincipleBar label="La premisa central">
        Entre el 40 y el 60% de los procesos de compra terminan en &quot;ninguna
        decisión&quot;. No porque el cliente eligió a otro —{' '}
        <strong className="text-foreground">
          sino porque no tuvo suficiente confianza para decidir
        </strong>
        . El trabajo del vendedor no es convencer al cliente de que tu producto es bueno. Es
        ayudarle a entender todas sus opciones, los trade-offs entre ellas, y cuándo elegiría
        la tuya.
      </PrincipleBar>

      <FormulaBlock>
        <strong className="text-foreground">
          La pregunta que el cliente realmente quiere responder:
        </strong>
        <br />
        No &quot;¿por qué debería comprarte a ti?&quot; — sino{' '}
        <strong className="text-foreground">
          &quot;¿por qué debería comprarte a ti sobre todas las alternativas?&quot;
        </strong>
        <br />
        Esa es la pregunta que un pitch ganador debe responder.
      </FormulaBlock>

      <SectionTitle>Los cuatro tipos de pitch que no funcionan</SectionTitle>
      <CardGrid cols={2}>
        <MiniCard label="El walkthrough" title="Recorrido de características">
          El vendedor muestra funciones una por una. El cliente no sabe cuáles son únicas y
          cuáles son estándar. No hay contexto de mercado ni de valor diferenciado.
        </MiniCard>
        <MiniCard label="Problema / solución" title="El setup genérico">
          Describe el problema de forma similar a todos los competidores. No hay espacio para
          hablar de diferenciación real ni de cómo evaluar las alternativas.
        </MiniCard>
        <MiniCard label="La narrativa de visión" title='"El viejo mundo vs el nuevo"'>
          El &quot;viejo mundo&quot; es fácil de acordar — pero puede haber múltiples
          &quot;nuevos mundos.&quot; El cliente no sabe cuál elegir ni por qué el tuyo es el
          correcto.
        </MiniCard>
        <MiniCard label="El viaje del héroe" title="StoryBrand style">
          Atractivo narrativamente, pero no enfocado en ayudar al cliente a tomar una
          decisión. No habla de alternativas ni de trade-offs entre opciones.
        </MiniCard>
      </CardGrid>

      <SectionTitle>La estructura del pitch ganador</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-b border-foreground/85 my-6">
        <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-foreground/15">
          <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-3">
            Parte 1 · Setup
          </p>
          <p className="font-serif text-xl md:text-2xl text-foreground leading-snug mb-3 tracking-[-0.005em]">
            Contexto de mercado
          </p>
          <p className="text-base md:text-lg text-foreground/70 leading-[1.6]">
            Antes de hablar de tu producto, educas al cliente sobre el mercado. Le das un
            framework para pensar en todas sus opciones. Esto sucede como conversación — no
            como presentación.
          </p>
        </div>
        <div className="p-6 md:p-7">
          <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-3">
            Parte 2 · Pitch
          </p>
          <p className="font-serif text-xl md:text-2xl text-foreground leading-snug mb-3 tracking-[-0.005em]">
            Tu solución en contexto
          </p>
          <p className="text-base md:text-lg text-foreground/70 leading-[1.6]">
            Una vez que el cliente entendió el mercado y las alternativas, presentas tu
            solución como la elección lógica para su situación específica. El valor
            diferenciado ya tiene contexto.
          </p>
        </div>
      </div>

      <ConvAccordion items={items} defaultOpen={0} />

      <PrincipleBar label="La base que hace funcionar el pitch: posicionamiento">
        Un pitch sin posicionamiento sólido es como construir sobre arena.{' '}
        <strong className="text-foreground">
          Todo en el pitch — el insight, las alternativas, el valor diferenciado — viene
          directamente del posicionamiento de producto.
        </strong>{' '}
        Si el posicionamiento es débil o difuso, el pitch lo reflejará.
      </PrincipleBar>

      <MetricsRow
        metrics={[
          { val: '40—60%', label: <>De procesos de compra terminan<br />en &quot;ninguna decisión&quot;</>, accent: true },
          { val: '250+', label: <>Empresas con las que Dunford<br />trabajó sus pitches</> },
          { val: '08', label: <>Secciones del pitch<br />structure</> },
        ]}
      />
    </>
  );
}
