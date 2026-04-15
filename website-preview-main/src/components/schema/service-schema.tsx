type Lang = 'es' | 'en';

export function SprintServiceSchema({ lang = 'es' }: { lang?: Lang } = {}) {
  const isEn = lang === 'en';
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": isEn ? "Commercial Clarity Sprint" : "Sprint de Claridad Comercial",
    "description": isEn
      ? "4-week intensive for B2B founders to get commercial clarity and give their team the tools to sell without them."
      : "Programa intensivo de 4 semanas para fundadores B2B que necesitan claridad en su mensaje comercial y herramientas para que su equipo venda sin ellos",
    "provider": {
      "@type": "Organization",
      "name": isEn ? "Utópica" : "Utópica",
      "url": isEn ? "https://utopica.net/en" : "https://utopica.net",
      "logo": "https://utopica.net/images/Utopica Logo.svg",
      "sameAs": [
        "https://www.linkedin.com/company/somosutopica/",
        "https://www.youtube.com/@UtópicaMx"
      ]
    },
    "areaServed": isEn
      ? {
          "@type": "Country",
          "name": "Mexico"
        }
      : {
          "@type": "Country",
          "name": "México"
        },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": isEn ? "Sprint Packages" : "Modalidades del Sprint",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": isEn ? "Regular Sprint" : "Sprint Regular",
          "description": isEn
            ? "4 live group sessions + 9 commercial tools"
            : "4 sesiones grupales en vivo + 9 herramientas comerciales",
          "price": "29250",
          "priceCurrency": "MXN",
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-01-01",
          "itemOffered": {
            "@type": "Service",
            "name": isEn
              ? "Commercial Clarity Sprint - Regular"
              : "Sprint de Claridad Comercial - Regular"
          }
        },
        {
          "@type": "Offer",
          "name": isEn ? "Inner Circle" : "Círculo Interno",
          "description": isEn
            ? "Regular Sprint + 4 private 1:1 mentoring sessions"
            : "Sprint Regular + 4 sesiones 1:1 de mentoría privada",
          "price": "59250",
          "priceCurrency": "MXN",
          "availability": "https://schema.org/LimitedAvailability",
          "validFrom": "2024-01-01",
          "itemOffered": {
            "@type": "Service",
            "name": isEn
              ? "Commercial Clarity Sprint - Inner Circle"
              : "Sprint de Claridad Comercial - Círculo Interno"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Antonio Galindo"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": isEn
          ? "I went from closing 1 in 10 prospects to 4 in 10. Best part: now my team can explain our value without me in the room."
          : "Pasé de cerrar 1 de cada 10 prospectos a 4 de cada 10. Lo mejor: ahora mi equipo puede explicar nuestro valor sin que yo esté presente."
      }
    ],
    "serviceType": isEn ? "Business consulting" : "Consultoría empresarial",
    "termsOfService": isEn ? "https://utopica.net/en/privacy-notice" : "https://utopica.net/terminos",
    "category": isEn ? "B2B sales consulting" : "Consultoría de ventas B2B"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchemaExtended({ lang = 'es' }: { lang?: Lang } = {}) {
  const faqs = lang === 'en'
    ? [
        {
          question: "What is the Commercial Clarity Sprint?",
          answer: "A 4-week intensive program for B2B founders who need clarity in their commercial message. You leave with 9 tools ready so your team can sell without you."
        },
        {
          question: "Who is the Sprint for?",
          answer: "Founders of B2B service companies billing over $50k USD/month, with a team of at least 5 people, who want to stop being the only one who can close deals."
        },
        {
          question: "What exactly is included?",
          answer: "4 live group sessions, 9 commercial tools (brand story, value proposition, client profile, offer sequence, LinkedIn profile, web copy, sales deck, call script), lifetime access to recordings, WhatsApp group, and 30-day guarantee."
        },
        {
          question: "What's the difference between Regular and Inner Circle?",
          answer: "Inner Circle includes everything in the Regular Sprint plus 4 private 1:1 sessions, personalized review of your materials, priority WhatsApp access, and only 2 spots per cohort."
        },
        {
          question: "How does the guarantee work?",
          answer: "If after 30 days of implementing the system you don’t see better sales conversations or conversion rate, we refund your full investment. We just ask for implementation evidence."
        }
      ]
    : [
        {
          question: "¿Qué es el Sprint de Claridad Comercial?",
          answer: "Es un programa intensivo de 4 semanas diseñado para fundadores B2B que necesitan claridad en su mensaje comercial. Al final tendrás 9 herramientas listas para que tu equipo pueda vender sin depender de ti."
        },
        {
          question: "¿Para quién es el Sprint?",
          answer: "Para fundadores de empresas B2B de servicios que facturan más de $50k USD/mes, tienen un equipo de al menos 5 personas y quieren dejar de ser el único que puede cerrar ventas."
        },
        {
          question: "¿Qué incluye exactamente?",
          answer: "4 sesiones grupales en vivo, 9 herramientas comerciales (historia de marca, propuesta de valor, perfil cliente, secuencia ofertas, perfil LinkedIn, textos web, presentación ventas, guión llamada), acceso de por vida a grabaciones, grupo WhatsApp y garantía de 30 días."
        },
        {
          question: "¿Cuál es la diferencia entre Sprint Regular y Círculo Interno?",
          answer: "El Círculo Interno incluye todo lo del Sprint Regular más 4 sesiones privadas 1:1, revisión personalizada de materiales, acceso prioritario WhatsApp y solo 2 lugares por cohorte."
        },
        {
          question: "¿Cómo funciona la garantía?",
          answer: "Si después de 30 días de implementar el sistema no ves mejora en la calidad de tus conversaciones de venta o en tu tasa de conversión, te devolvemos tu inversión completa. Solo pedimos evidencia de implementación."
        }
      ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
