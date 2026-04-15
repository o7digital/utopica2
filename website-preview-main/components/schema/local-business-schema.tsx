export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://utopica.net/#localbusiness",
    "name": "Utópica",
    "description": "Consultoría especializada en libertad comercial para fundadores B2B. Sprint de Claridad Comercial: 9 herramientas en 4 semanas para que tu equipo venda sin ti.",
    "url": "https://utopica.net",
    "telephone": "+52-55-1234-5678",
    "email": "hola@utopica.net",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ciudad de México",
      "addressRegion": "CDMX",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.4326",
      "longitude": "-99.1332"
    },
    "image": [
      "https://utopica.net/images/Utopica Logo.svg",
      "https://utopica.net/og-image.jpg"
    ],
    "priceRange": "$$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/somosutopica/",
      "https://www.youtube.com/@UtópicaMx"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Consultoría B2B",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sprint de Claridad Comercial",
            "description": "Programa de 4 semanas para obtener claridad en tu mensaje comercial"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Auditoría de Claridad Comercial",
            "description": "Diagnóstico gratuito de tu mensaje y proceso de ventas"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://utopica.net/#founder",
    "name": "Gaël Thomé",
    "jobTitle": "Fundador y CEO",
    "worksFor": {
      "@type": "Organization",
      "@id": "https://utopica.net/#organization"
    },
    "description": "Fundador de Utópica. Experto en ventas B2B y claridad comercial. Ayuda a fundadores a lograr libertad comercial mediante sistemas probados.",
    "sameAs": [
      "https://www.linkedin.com/in/gaelthome/"
    ],
    "knowsAbout": [
      "Ventas B2B",
      "Claridad Comercial",
      "Consultoría Empresarial",
      "Liderazgo",
      "Estrategia de Negocios"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}