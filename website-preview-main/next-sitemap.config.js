/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://utopica.net',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://utopica.net/server-sitemap.xml',
    ],
  },
  exclude: [
    '/server-sitemap.xml',
    '/api/*',
    '/demo',
    '/diagnostico',
    '/fabrica-leads',
    '/servicios',
    '/test-audit',
    '/script',
    '/scripts',
    '/_*',
    '/404'
  ],
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Personaliza la prioridad basada en la ruta
    let priority = config.priority;
    
    // Páginas principales tienen mayor prioridad
    if (path === '/') {
      priority = 1.0;
    } else if (path.startsWith('/servicios') || path.startsWith('/fabrica-leads')) {
      priority = 0.9;
    } else if (path.startsWith('/blog')) {
      priority = 0.8;
    }
    
    // Personaliza la frecuencia de cambio basada en la ruta
    let changefreq = config.changefreq;
    
    // El blog cambia más frecuentemente
    if (path.startsWith('/blog')) {
      changefreq = 'daily';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
