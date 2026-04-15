import Link from 'next/link';

export const revalidate = 21600;

const services = [
  {
    title: 'Claridad',
    description: 'Comprensión inmediata de lo que haces y para quién lo haces.',
  },
  {
    title: 'Estructura',
    description: 'Recorrido lógico y ordenado para guiar cada decisión del cliente.',
  },
  {
    title: 'Conversión',
    description: 'Un sitio pensado para generar negocio con mensajes concretos.',
  },
];

const methodSteps = [
  {
    title: 'Audit',
    description: 'Analizamos el mensaje actual, la oferta y los puntos de fricción.',
  },
  {
    title: 'Clarificación',
    description: 'Definimos una propuesta clara y diferenciada para tu mercado.',
  },
  {
    title: 'Estructura',
    description: 'Ordenamos el contenido para que la navegación tenga sentido comercial.',
  },
  {
    title: 'Optimización',
    description: 'Ajustamos textos y CTA para mejorar comprensión y conversión.',
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#f7f5f2] text-[#111] transition-colors duration-300 dark:bg-[#0b0c0e] dark:text-white">
      <main>
        <section className="relative flex min-h-[88vh] items-center pt-16" aria-labelledby="home-hero-title">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2070&auto=format&fit=crop"
              alt="Equipo de trabajo en una reunión"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-white/80">Consultoría digital</p>
            <h1 id="home-hero-title" className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
              Tu sitio no refleja el nivel de tu negocio
            </h1>
            <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
              Lo hacemos claro, estructurado y enfocado a resultados
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={process.env.NEXT_PUBLIC_RECLAIM_URL || 'https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Ver propuesta
              </a>
              <Link
                href="#metodo"
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Cómo trabajamos
              </Link>
            </div>
          </div>
        </section>

        <section id="servicios" className="mx-auto w-full max-w-7xl px-6 py-20 md:py-24" aria-labelledby="services-title">
          <h2 id="services-title" className="text-3xl font-semibold">Servicios</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#121317]"
              >
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="metodo" className="mx-auto w-full max-w-7xl px-6 pb-20 md:pb-24" aria-labelledby="method-title">
          <h2 id="method-title" className="text-3xl font-semibold">Método</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {methodSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#121317]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/45 dark:text-white/45">
                  Paso {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-black/10 px-6 py-20 text-center dark:border-white/10" aria-labelledby="final-cta-title">
          <div className="mx-auto max-w-3xl">
            <h2 id="final-cta-title" className="text-3xl font-semibold md:text-4xl">
              ¿Listo para un sitio más claro y más serio?
            </h2>
            <a
              href={process.env.NEXT_PUBLIC_RECLAIM_URL || 'https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Agendar proyecto
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
