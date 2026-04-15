export function SprintServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Sprint de Claridad Comercial",
    "description": "Programa intensivo de 4 semanas para fundadores B2B que necesitan claridad en su mensaje comercial y herramientas para que su equipo venda sin ellos",
    "provider": {
      "@type": "Organization",
      "name": "Utópica",
      "url": "https://utopica.net",
      "logo": "https://utopica.net/images/Utopica Logo.svg",
      "sameAs": [
        "https://www.linkedin.com/company/somosutopica/",
        "https://www.youtube.com/@UtópicaMx"
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": "México"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Modalidades del Sprint",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Sprint Regular",
          "description": "4 sesiones grupales en vivo + 9 herramientas comerciales",
          "price": "29250",
          "priceCurrency": "MXN",
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-01-01",
          "itemOffered": {
            "@type": "Service",
            "name": "Sprint de Claridad Comercial - Regular"
          }
        },
        {
          "@type": "Offer",
          "name": "Círculo Interno",
          "description": "Sprint Regular + 4 sesiones 1:1 de mentoría privada",
          "price": "59250",
          "priceCurrency": "MXN",
          "availability": "https://schema.org/LimitedAvailability",
          "validFrom": "2024-01-01",
          "itemOffered": {
            "@type": "Service",
            "name": "Sprint de Claridad Comercial - Círculo Interno"
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
        "reviewBody": "Pasé de cerrar 1 de cada 10 prospectos a 4 de cada 10. Lo mejor: ahora mi equipo puede explicar nuestro valor sin que yo esté presente."
      }
    ],
    "serviceType": "Consultoría empresarial",
    "termsOfService": "https://utopica.net/terminos",
    "category": "Consultoría de ventas B2B"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchemaExtended() {
  const faqs = [
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