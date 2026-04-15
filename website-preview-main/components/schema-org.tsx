import React from 'react';

type OrganizationProps = {
  url?: string;
  logo?: string;
  name?: string;
};

type WebsiteProps = {
  url?: string;
  name?: string;
  description?: string;
};

type BreadcrumbListProps = {
  items: {
    name: string;
    item: string;
  }[];
};

type FAQPageProps = {
  questions: {
    question: string;
    answer: string;
  }[];
};

type ServiceProps = {
  name: string;
  description: string;
  provider?: OrganizationProps;
  url?: string;
  image?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
};

type ArticleProps = {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: OrganizationProps;
  url: string;
};

export const OrganizationSchema = ({
  url = 'https://utopica.net',
  logo = 'https://utopica.net/images/Utopica Logo.svg',
  name = 'Utópica',
}: OrganizationProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          url,
          logo,
          name,
          sameAs: [
            'https://www.linkedin.com/company/somosutopica/',
            'https://www.youtube.com/@UtópicaMx',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'contacto@utopica.net',
            contactType: 'customer service',
          },
        }),
      }}
    />
  );
};

export const WebsiteSchema = ({
  url = 'https://utopica.net',
  name = 'Utópica | Venta Consultiva B2B con IA',
  description = 'Potencia tu proceso comercial B2B combinando metodología consultiva con IA generativa.',
}: WebsiteProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url,
          name,
          description,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }),
      }}
    />
  );
};

export const BreadcrumbListSchema = ({ items }: BreadcrumbListProps) => {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.item,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement,
        }),
      }}
    />
  );
};

export const FAQPageSchema = ({ questions }: FAQPageProps) => {
  const mainEntity = questions.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.answer,
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity,
        }),
      }}
    />
  );
};

export const ServiceSchema = ({
  name,
  description,
  provider = {
    name: 'Utópica',
    url: 'https://utopica.net',
  },
  url,
  image,
  offers,
}: ServiceProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name,
          description,
          provider: {
            '@type': 'Organization',
            name: provider.name,
            url: provider.url,
          },
          ...(url && { url }),
          ...(image && { image }),
          ...(offers && {
            offers: {
              '@type': 'Offer',
              ...offers,
            },
          }),
        }),
      }}
    />
  );
};

export const ArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
  url,
}: ArticleProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline,
          description,
          image,
          datePublished,
          dateModified: dateModified || datePublished,
          author: {
            '@type': 'Person',
            name: author.name,
            ...(author.url && { url: author.url }),
          },
          publisher: {
            '@type': 'Organization',
            name: publisher.name,
            logo: {
              '@type': 'ImageObject',
              url: publisher.logo,
            },
          },
          url,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
          },
        }),
      }}
    />
  );
};
