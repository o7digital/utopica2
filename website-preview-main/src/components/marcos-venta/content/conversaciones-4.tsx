import {
  PrincipleBar,
  FormulaBlock,
  Mantra,
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

export function Conversaciones4Content() {
  const items: ConvItem[] = [
    {
      number: 1,
      title: 'Conversación probativa',
      subtitle: 'Sucede sin ti — es tu reputación hablando',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Mover al prospecto en su mente de verte como un proveedor más, a verte como el experto que quiere contratar.
            Esto sucede antes de cualquier conversación humana.
          </ObjBlock>

          <SectionHeader>Los tres dominios</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Estrategia de negocio',
                desc: 'Definir en qué eres experto y dónde vas a jugar. Cuanto más específico el posicionamiento, más creíble la expertise antes de hablar.',
              },
              {
                name: 'Lenguaje de posicionamiento',
                desc: 'Cómo articulas tu oferta frente a alternativas. No es un tagline — es la razón de existir de tu firma.',
              },
              {
                name: 'Liderazgo de pensamiento',
                desc: 'Artículos, podcasts, conferencias, contenido que demuestra conocimiento profundo. Trabajan por ti mientras duermes. Las referencias hacen lo mismo.',
              },
            ]}
          />

          <SectionHeader>El Flip — la señal clave</SectionHeader>
          <CardGrid cols={2}>
            <MiniCard label="Flip ocurrido ✓" title={'"Llevo dos años leyendo tu blog"'}>
              Alta probabilidad de cierre. Entras desde posición de fuerza. El cliente ya te ve como experto.
            </MiniCard>
            <MiniCard label="Flip no ocurrido ·" title={'"Te encontré en Google"'}>
              Entras desde posición débil. Debes ganar estatus de experto en tiempo real durante la calificación.
            </MiniCard>
          </CardGrid>

          <OutcomeBlock>
            El prospecto llega convencido de tu expertise. Cuanto mejor tu marketing, menos ventas necesitas hacer.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 2,
      title: 'Conversación de calificación',
      subtitle: 'Tú calificas al prospecto — no al revés',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Evaluar si existe una oportunidad real y determinar los próximos pasos. Tono: discernimiento clínico. Blair
            elimina por completo la &quot;reunión de credenciales&quot; — no existe.
          </ObjBlock>

          <SectionHeader>Marco BANT adaptado</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Necesidad / Estado Futuro Deseado',
                desc: 'Va primero. "Las personas compran una mejor versión de sí mismas." Preguntar qué quieren lograr y cómo beneficia a su carrera. No solo qué problema tienen.',
              },
              {
                name: 'Autoridad',
                desc: '¿Quién toma la decisión? ¿Quién más necesita estar involucrado? Sin acceso al decisor, la oportunidad está en riesgo.',
              },
              {
                name: 'Tiempo',
                desc: '¿Cuál es la urgencia real? ¿Qué consecuencias tiene no resolver esto en 90 días?',
              },
              {
                name: 'Presupuesto',
                desc: 'Mencionar pronto el mínimo de engagement: "Normalmente no trabajamos por menos de $X." Filtra antes de invertir más tiempo.',
              },
            ]}
          />

          <SectionHeader>Principios de comportamiento</SectionHeader>
          <ObjBlock className="leading-[1.9]">
            · Más preguntas que declaraciones. Estás diagnosticando, no presentando.
            <br />· Nunca interrumpir al cliente para decir &quot;nosotros podemos hacer eso.&quot;
            <br />· Si te piden que te justifiques: &quot;¿Qué tal si te cuento por qué nuestros clientes actuales nos contratan?&quot;
            <br />· Señal de transición: &quot;Puedo ver a mi equipo emocionándose con esto&quot; — no &quot;yo estoy emocionado.&quot;
          </ObjBlock>

          <OutcomeBlock>
            Decisión binaria tuya: existe una oportunidad real o no. Avanzar por cortesía es el error más caro en ventas.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 3,
      title: 'Conversación de valor',
      subtitle: 'La habilidad más valiosa de los negocios — y la más difícil',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Determinar el valor que podrías crear y la parte de ese valor que puedes cobrar. Blair: &quot;No puedo pensar
            en una habilidad más valiosa en todo el negocio.&quot; Requiere 12–40 conversaciones reales para dominarse.
          </ObjBlock>

          <SectionHeader>El marco de 4 pasos — sin hablar de soluciones</SectionHeader>
          <CardGrid cols={2}>
            <MiniCard label="Paso 1" title="Comprometer al cliente con su estado futuro deseado">
              &quot;Si nos reuniéramos en 3 años, ¿qué tendría que haber pasado para que te sientas contento?&quot; El
              cliente sueña, tú escuchas.
            </MiniCard>
            <MiniCard label="Paso 2" title="Acordar las métricas de éxito">
              &quot;¿Cómo sabremos que lo logramos?&quot; KPIs específicos. Para valor difícil de cuantificar, buscar
              métricas proxy.
            </MiniCard>
            <MiniCard label="Paso 3" title="Acordar el valor económico del éxito">
              &quot;Si llegamos a estas métricas, ¿cuál es el valor económico?&quot; Con números del cliente, no
              estimaciones tuyas.
            </MiniCard>
            <MiniCard label="Paso 4" title="Anclar alto antes de pensar en soluciones">
              &quot;Si pudiera ayudarte a crear ese millón de dólares, ¿me pagarías medio millón?&quot; El número ancla
              toda la negociación desde arriba.
            </MiniCard>
          </CardGrid>

          <WarnBlock label="La disciplina crítica">
            Durante toda la conversación de valor, NO pensar en soluciones. &quot;Si te quitara todos tus productos y no
            tuvieras nada que vender, solo este marco de 4 pasos — serías un vendedor exponencialmente mejor.&quot; El
            valor viene del futuro del cliente, no de tus entregables.
          </WarnBlock>

          <OutcomeBlock>
            Te retiras a diseñar opciones: qué harías al precio ancla (alto) y qué puedes entregar a su presupuesto
            mínimo. Esa brecha define las tres opciones de tu propuesta.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 4,
      title: 'Conversación de cierre',
      subtitle: 'Facilitar una elección — no forzar una venta',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Ayudar al cliente a seleccionar y comprometerse con un camino. &quot;Cuando manejaste bien las
            conversaciones anteriores, esta es la más fácil. Solo facilitas una elección.&quot;
          </ObjBlock>

          <SectionHeader>El protocolo</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Verificar tiempo y asistentes',
                desc: 'Confirmar que los decisores clave están. Si falta alguien crítico, considerar reagendar.',
              },
              {
                name: 'Recapitular el valor',
                desc: 'Revisitar el estado futuro deseado, las métricas y el valor económico de la Conversación 3. El cliente reconfirma lo que quiere.',
              },
              {
                name: 'Presentar opciones — siempre empezando por el precio más alto',
                desc: 'Orden: alto → bajo → medio. El medio se convierte en "la nueva zona segura." Agregar una opción cara al tope jala el precio promedio hacia arriba.',
              },
            ]}
          />

          <SectionHeader>Las 3 opciones — no son Bueno/Mejor/Óptimo</SectionHeader>
          <CardGrid cols={3}>
            <MiniCard label="Opción A · bajo riesgo" title="Vender inputs">
              Horas, sprints. El cliente absorbe todo el riesgo. Precio más bajo.
            </MiniCard>
            <MiniCard label="Opción B · riesgo compartido" title="Vender outputs">
              Un sistema, una campaña. Riesgo compartido. Precio medio.
            </MiniCard>
            <MiniCard label="Opción C · alto riesgo" title="Vender outcomes">
              Impacto en revenue. La firma absorbe más riesgo — y cobra más.
            </MiniCard>
          </CardGrid>

          <ObjBlock className="leading-[1.9] mt-3">
            · Propuesta de <strong className="text-white">una página</strong> — documento guía para la conversación, no
            entregable para leer solo.
            <br />· Presentar en pantalla compartida, no enviar por adelantado.
            <br />· <strong className="text-white">Di un precio antes de mostrarlo.</strong> Las objeciones tempranas son
            tus amigas; las tardías son tus enemigas.
          </ObjBlock>

          <OutcomeBlock>
            En promedio, los clientes eligen la opción media. Con tres opciones, el porcentaje de resultados positivos
            sube al menos 50% versus la propuesta única.
          </OutcomeBlock>
        </>
      ),
    },
  ];

  return (
    <>
      <FormulaBlock>
        <strong className="text-white">Principio fundamental:</strong> P = DB &gt; D
        <br />
        <span className="text-white/70 text-base md:text-lg">
          Tu poder (P) en la venta es función de tu deseabilidad para el cliente (DB) siendo mayor que tu deseo por ese
          cliente (D). Quien quiere más el deal tiene menos poder.
        </span>
      </FormulaBlock>

      <PrincipleBar label="El mantra del experto — repetir antes de cada conversación">
        <Mantra>
          &quot;Soy el experto. Soy el premio.&quot;
          <br />
          &quot;Estoy en misión de ayudar.&quot;
          <br />
          &quot;Solo puedo hacerlo si me dejas liderar.&quot;
          <br />
          &quot;No todos van a seguirme — y está bien.&quot;
        </Mantra>
      </PrincipleBar>

      <PrincipleBar label="Premisa central" className="mt-4">
        En toda venta de expertise,{' '}
        <strong className="text-[#f3eacb]">la venta es el ejemplo de lo que vendrá después.</strong> Cómo vendes comunica
        cómo resolves. Un experto que presenta gratis, persigue al cliente y acepta condiciones señala que será un
        ejecutor de órdenes en el proyecto.
      </PrincipleBar>

      <SectionTitle>Las cuatro conversaciones</SectionTitle>

      <ConvAccordion items={items} defaultOpen={0} />

      <MetricsRow
        metrics={[
          { val: '50%+', label: <>Tasa de cierre objetivo<br />(vs 25% promedio industria)</>, accent: true },
          { val: '+20%', label: <>Valor promedio de propuesta<br />con opciones múltiples</> },
          { val: '40%', label: <>Umbral mínimo de cierre<br />para ser respetable</> },
        ]}
      />
    </>
  );
}
