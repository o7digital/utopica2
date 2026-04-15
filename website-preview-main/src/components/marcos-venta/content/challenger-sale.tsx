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

export function ChallengerContent() {
  const items: ConvItem[] = [
    {
      number: 'I',
      title: 'Teach — Enseñar',
      subtitle: 'Dar al cliente algo que no sabía sobre su propio negocio.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Llevar a la conversación un insight de negocio que el cliente no tiene — algo
            que cambia cómo ve su situación, su mercado o sus prioridades. No información
            genérica. Un insight específico, contraintuitivo, y conectado con lo que vendes.
          </ObjBlock>

          <SectionHeader>El Commercial Teaching Framework</SectionHeader>
          <StepList
            steps={[
              {
                name: 'El calentamiento',
                desc: 'Construir credibilidad mostrando que entiendes la situación del cliente mejor de lo que esperaba. "Sabemos que empresas en tu posición enfrentan X, Y y Z."',
              },
              {
                name: 'El reencuadre',
                desc: 'Introducir una perspectiva nueva y sorprendente. "Lo que encontramos es que la mayoría cree que el problema es A — pero los datos muestran que en realidad es B."',
              },
              {
                name: 'La inmersión racional',
                desc: 'Demostrar el insight con datos, casos, investigación. El cliente debe poder decir "esto tiene sentido" antes de que aparezca tensión emocional.',
              },
              {
                name: 'El impacto emocional',
                desc: 'Conectar el insight con consecuencias personales para el cliente — en su carrera, en su equipo, en su posición competitiva.',
              },
              {
                name: 'La solución',
                desc: 'Solo entonces mostrar cómo lo que ofreces resuelve el problema reencuadrado. El cliente ya está en el lugar mental correcto.',
              },
            ]}
          />

          <WarnBlock label="El error más común">
            Enseñar algo interesante pero no conectado con tu solución. El insight debe
            llevar lógicamente a una capacidad que solo tú tienes. Si el insight le sirve
            para contratar a cualquiera, no tienes ventaja.
          </WarnBlock>

          <OutcomeBlock>
            El cliente ve su situación de forma diferente — y esa nueva forma lo lleva
            directamente a necesitar lo que tú ofreces.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'II',
      title: 'Tailor — Adaptar',
      subtitle: 'El mensaje correcto para la persona correcta.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            El mismo insight presentado de forma genérica cae plano. Adaptar significa
            traducir el mensaje al lenguaje de motivaciones, objetivos e inquietudes
            específicas de cada interlocutor.
          </ObjBlock>

          <SectionHeader>Las dimensiones de adaptación</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Por rol dentro de la organización',
                desc: 'El CFO quiere hablar de costo y riesgo. El VP de Ventas quiere hablar de revenue y crecimiento. El Director de Operaciones quiere hablar de eficiencia. Mismo problema — tres conversaciones distintas.',
              },
              {
                name: 'Por objetivos personales',
                desc: 'Más allá del rol, ¿qué quiere lograr esta persona específica en su carrera? ¿Está tratando de demostrar algo? ¿Está en modo defensivo o en expansión?',
              },
              {
                name: 'Por madurez y contexto de la empresa',
                desc: 'Una empresa en hipercrecimiento tiene prioridades distintas a una en estabilización. El mismo insight debe resonar diferente según el momento.',
              },
            ]}
          />

          <OutcomeBlock>
            Cada interlocutor siente que el mensaje fue construido para él. Eso genera
            confianza y apertura para el control que viene después.
          </OutcomeBlock>
        </>
      ),
    },
    {
      number: 'III',
      title: 'Take Control — Tomar el control',
      subtitle: 'Liderar la conversación, mantener la tensión constructiva.',
      body: (
        <>
          <SectionHeader>Objetivo</SectionHeader>
          <ObjBlock>
            Mantener el control del proceso de venta — especialmente cuando el cliente
            presiona en precio, pide descuento, o intenta postergar la decisión. El
            Challenger no cede ni se pone a la defensiva. Redirige la conversación hacia el
            valor.
          </ObjBlock>

          <SectionHeader>Qué significa tomar el control</SectionHeader>
          <StepList
            steps={[
              {
                name: 'Comodidad con la tensión',
                desc: 'El Challenger no evita el desacuerdo. Cuando el cliente cuestiona el insight, lo defiende con datos y perspectiva — sin ponerse a la defensiva ni ceder por no generar incomodidad.',
              },
              {
                name: 'Manejar el precio desde el valor',
                desc: '"Entiendo la preocupación por el precio. Antes de llegar ahí, asegurémonos de que estamos de acuerdo en el valor de resolver esto." Redirige al impacto económico.',
              },
              {
                name: 'Manejar la demora en la decisión',
                desc: 'No presionar — ayudar al cliente a entender el costo de postergar. "Cada mes en esta situación tiene un costo de X. ¿Qué necesitarías para poder decidir esta semana?"',
              },
              {
                name: 'Identificar y neutralizar al bloqueador',
                desc: 'En ventas enterprise siempre hay alguien que frena. El Challenger identifica quién tiene interés en que el status quo no cambie y trabaja para neutralizarlo o aislarlo.',
              },
            ]}
          />

          <WarnBlock label="Control ≠ agresividad">
            Tomar control no significa ser confrontacional o arrogante. El Challenger es
            asertivo con los datos y cede en lo que no importa. La línea es: defender el
            valor, no el ego.
          </WarnBlock>

          <OutcomeBlock>
            El proceso de venta avanza al ritmo del vendedor, no del cliente. Las objeciones
            se manejan desde el valor. Las demoras se convierten en conversaciones de costo
            de espera.
          </OutcomeBlock>
        </>
      ),
    },
  ];

  const profiles = [
    { pct: '21%', name: 'Hard Worker', desc: 'Trabaja más horas, más llamadas, más esfuerzo. Disciplinado y perseverante.', highlight: false },
    { pct: '17%', name: 'Reactive Problem Solver', desc: 'Extremadamente confiable en resolución de problemas post-venta.', highlight: false },
    { pct: '40%', name: 'Challenger', desc: 'Enseña, adapta y toma control. Domina en entornos de alta complejidad.', highlight: true },
    { pct: '12%', name: 'Lone Wolf', desc: 'Sigue su propio instinto. Alto performer pero difícil de replicar.', highlight: false },
    { pct: '10%', name: 'Relationship Builder', desc: 'Construye redes internas. Evita tensión. Peor desempeño en venta compleja.', highlight: false },
  ];

  const presSteps = [
    { num: '01', title: 'El Calentamiento', time: '~10%', desc: 'Empieza demostrando que entiendes su mundo. Muestra que has investigado, que conoces sus desafíos.', example: '"Hemos trabajado con 40+ empresas en su industria. Lo que vemos consistentemente es que enfrentan tres presiones simultáneas: presión de margen, rotación de talento y ciclo de venta cada vez más largo."' },
    { num: '02', title: 'El Reencuadre', time: '~10%', desc: 'Introduces una perspectiva que el cliente no tenía — algo que contradice lo que asumía. Respaldado por datos.', example: '"La mayoría está invirtiendo en productividad de vendedores. Pero nuestros datos muestran que el problema no es productividad — es que el 60% del tiempo del vendedor se gasta en tareas que no generan revenue."' },
    { num: '03', title: 'La Inmersión Racional', time: '~25%', desc: 'Respalda el reencuadre con datos, gráficos, benchmarks, estudios de caso. El cliente necesita evidencia.', example: '"De las 200 empresas analizadas, las que optimizaron productividad mejoraron 8%. Las que eliminaron tareas sin valor mejoraron 32%. Tres veces más impacto con menos inversión."' },
    { num: '04', title: 'El Impacto Emocional', time: '~15%', desc: 'Conecta el insight con consecuencias personales. Habla del equipo, reputación, competitividad.', example: '"Trabajamos con una empresa similar. Su VP decidió esperar al siguiente quarter. En 3 meses perdieron a 4 de sus 10 mejores vendedores. La fuga se aceleró porque los buenos se frustraron primero."' },
    { num: '05', title: 'El Nuevo Camino', time: '~25%', desc: 'Presenta la solución conceptual al problema reencuadrado. Todavía no tu producto. Describe las características que cualquier solución debe tener.', example: '"Lo que necesitan es un sistema que: identifique qué actividades generan revenue, elimine las tareas administrativas que roban tiempo, y dé visibilidad al director sobre dónde se pierde el esfuerzo."' },
    { num: '06', title: 'Tu Solución', time: '~15%', desc: 'Recién aquí hablas de tu producto. No necesitas venderlo — solo mostrar que cumple los requisitos que el cliente acaba de validar.', example: '"Nuestro producto hace exactamente eso. [Req 1] lo resolvemos con X. [Req 2] con Y. [Req 3] con Z. En 90 días vieron un aumento del 28% en tiempo dedicado a venta."' },
  ];

  return (
    <>
      <PrincipleBar label="La conclusión que cambió la conversación sobre ventas">
        CEB estudió a más de 6,000 vendedores. Encontraron cinco perfiles. Uno —{' '}
        <strong className="text-foreground">el Challenger</strong> — domina consistentemente
        en ventas complejas. Lo opuesto a lo esperado:{' '}
        <strong className="text-foreground">
          el que construye relaciones es el de peor desempeño en ventas de alto valor.
        </strong>
      </PrincipleBar>

      <SectionTitle>Los cinco perfiles de vendedor</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-t border-b border-foreground/85 my-6">
        {profiles.map((p, i) => (
          <div
            key={i}
            className={[
              'p-5 md:p-4 lg:p-5 text-center border-b md:border-b-0',
              i < profiles.length - 1 ? 'md:border-r' : '',
              'border-foreground/15',
              p.highlight ? 'bg-primary/[0.08]' : '',
            ].join(' ')}
          >
            <p
              className={[
                'font-serif text-3xl md:text-4xl mb-2 tabular-nums',
                p.highlight ? 'text-primary italic' : 'text-foreground/85',
              ].join(' ')}
            >
              {p.pct}
            </p>
            <p
              className={[
                'font-mono text-[11px] tracking-[0.1em] uppercase mb-2',
                p.highlight ? 'text-foreground font-semibold' : 'text-foreground/70',
              ].join(' ')}
            >
              {p.name}
            </p>
            <p className="text-xs md:text-[13px] text-foreground/60 leading-[1.5]">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      <FormulaBlock>
        <strong className="text-foreground">El modelo del Challenger:</strong> Enseñar →
        Adaptar → Tomar Control
        <br />
        Tres capacidades que se construyen en secuencia. Sin enseñanza, no hay nada que
        adaptar. Sin adaptación, el control se siente abrupto.
      </FormulaBlock>

      <SectionTitle>Las tres capacidades del Challenger</SectionTitle>

      <ConvAccordion items={items} defaultOpen={0} />

      <SectionTitle>La presentación Challenger — 6 pasos</SectionTitle>
      <p className="text-base md:text-lg text-foreground/70 leading-[1.65] mb-8 max-w-3xl">
        Una coreografía de seis pasos para construir una presentación comercial que enseña
        al cliente algo nuevo. No es un pitch de producto — es una narrativa que lleva al
        cliente desde su mundo conocido hasta una conclusión inevitable.
      </p>

      <ol className="border-t border-foreground/85">
        {presSteps.map((step) => (
          <li
            key={step.num}
            className="border-b border-foreground/15 grid grid-cols-12 gap-4 md:gap-6 py-8"
          >
            <span className="col-span-12 md:col-span-1 font-mono text-sm text-foreground/55 tabular-nums pt-1">
              {step.num}
            </span>
            <div className="col-span-12 md:col-span-4">
              <h4 className="font-serif text-xl md:text-2xl text-foreground leading-snug mb-1 tracking-[-0.005em]">
                {step.title}
              </h4>
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/50">
                {step.time} del tiempo
              </span>
            </div>
            <div className="col-span-12 md:col-span-7 space-y-3">
              <p className="text-base md:text-lg text-foreground/75 leading-[1.6]">
                {step.desc}
              </p>
              <p className="font-serif italic text-sm md:text-base text-foreground/70 leading-[1.55] pl-4 border-l border-primary/40">
                {step.example}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <WarnBlock label="El error que arruina todo">
        Si tu insight no conecta lógicamente con tu solución, la presentación se cae. La
        regla de oro: el reencuadre del paso 2 debe llevar inevitablemente a una capacidad
        que solo tú tienes. Si cualquier competidor puede resolver lo que reencuadraste, no
        tienes insight — tienes un dato curioso.
      </WarnBlock>

      <PrincipleBar label="La prueba del buen insight comercial">
        Un buen insight Challenger cumple tres criterios:{' '}
        <strong className="text-foreground">1)</strong> Específico de la industria del
        cliente, no genérico.{' '}
        <strong className="text-foreground">2)</strong> Contradice una creencia establecida
        — genera la reacción de &quot;nunca lo había visto así&quot;.{' '}
        <strong className="text-foreground">3)</strong> Conduce lógicamente a una capacidad
        diferenciadora de tu solución.
      </PrincipleBar>

      <MetricsRow
        metrics={[
          { val: '6K+', label: <>Vendedores estudiados<br />en múltiples industrias</>, accent: true },
          { val: '40%', label: <>De los top performers<br />son del perfil Challenger</> },
          { val: '54%', label: <>Del proceso de decisión ocurre<br />antes de hablar con ventas</> },
        ]}
      />
    </>
  );
}
