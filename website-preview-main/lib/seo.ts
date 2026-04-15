import { Metadata } from 'next';

type OpenGraphType = 
  | 'website' 
  | 'article' 
  | 'book' 
  | 'profile' 
  | 'music.song' 
  | 'music.album' 
  | 'music.playlist' 
  | 'music.radio_station' 
  | 'video.movie' 
  | 'video.episode' 
  | 'video.tv_show' 
  | 'video.other';

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: OpenGraphType;
  noindex?: boolean;
};

export const defaultSeo: SeoProps = {
  title: 'Utópica | Venta Consultiva B2B con IA',
  description: 'Potencia tu proceso comercial B2B combinando metodología consultiva con IA generativa. Descubre cómo escalar tus ventas de manera efectiva y sostenible.',
  keywords: ['venta consultiva', 'B2B', 'IA generativa', 'ventas', 'consultoría', 'leads B2B'],
  image: '/images/og/default.png',
  url: 'https://utopica.net',
  type: 'website',
};

export function constructMetadata({
  title = defaultSeo.title,
  description = defaultSeo.description,
  keywords = defaultSeo.keywords,
  image = defaultSeo.image,
  url = defaultSeo.url,
  type = defaultSeo.type,
  noindex = false,
}: SeoProps = defaultSeo): Metadata {
  // Construir título completo con formato consistente
  const fullTitle = title === defaultSeo.title ? title : `${title} | Utópica`;
  
  // Asegurar que la URL de la imagen sea absoluta
  const ogImage = image?.startsWith('http') ? image : `https://utopica.net${image}`;
  
  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL('https://utopica.net'),
    robots: {
      index: !noindex,
      follow: true,
      googleBot: {
        index: !noindex,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Utópica',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'es_MX',
      type: type || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@UtopicaMx',
    },
    alternates: {
      canonical: url || 'https://utopica.net',
      languages: {
        'es-MX': url || 'https://utopica.net',
      },
    },
    authors: [{ name: 'Utópica' }],
    creator: 'Utópica',
    publisher: 'Utópica',
    formatDetection: {
      telephone: false,
    },
    category: 'technology',
    other: {
      'google-site-verification': 'TU_CÓDIGO_DE_VERIFICACIÓN', // Reemplazar con el código real
    },
  };
}
