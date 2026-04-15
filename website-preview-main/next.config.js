/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // ISR and Caching Configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Static assets caching
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // API routes caching
      {
        source: '/api/workshops/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=60, stale-while-revalidate=600',
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utopica.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600, // Increased cache TTL for images
  },
  
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack: (config) => {
    // Configuración para mejorar la compatibilidad con Netlify
    // Excluir undici de la optimización para evitar problemas con sintaxis privada
    config.externals = config.externals || [];
    config.externals.push({
      'undici': 'undici',
    });
    return config;
  },
  // Configuración para mejorar el SEO
  poweredByHeader: false,
  compress: true,
  // Evitar problemas con rutas dinámicas en Netlify
  trailingSlash: false,
  // Configuración para mejorar la compatibilidad con Netlify
  output: 'standalone'
}

module.exports = nextConfig
