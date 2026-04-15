/**
 * Server-safe preloading utilities wrapper
 * This file provides a safe interface that works on both server and client
 */

import type { ResourceType, CrossOrigin, PreloadOptions, PrefetchOptions } from './preload-types';
import { PAGE_PRELOAD_CONFIG } from './preload-types';

// Re-export types
export * from './preload-types';

// Import client utilities only if in browser
let clientUtils: typeof import('./preload-client') | null = null;

if (typeof window !== 'undefined') {
  import('./preload-client').then(module => {
    clientUtils = module;
  });
}

/**
 * Create resource hints for server-side rendering
 * This is safe to use on the server
 */
export function createResourceHints(pageType: 'homepage' | 'sprint' | 'blog' | 'team') {
  const config = PAGE_PRELOAD_CONFIG[pageType];
  const hints: Array<{
    rel: string;
    href: string;
    as?: string;
    crossorigin?: string;
    fetchpriority?: string;
  }> = [];
  
  // DNS prefetch for external domains
  const externalDomains = ['fonts.googleapis.com', 'fonts.gstatic.com'];
  externalDomains.forEach(domain => {
    hints.push({ rel: 'dns-prefetch', href: `//${domain}` });
  });
  
  // Preconnect for critical external domains
  hints.push({ 
    rel: 'preconnect', 
    href: '//fonts.googleapis.com',
    crossorigin: 'anonymous'
  });
  
  // Preload critical resources
  config.images?.forEach(image => {
    hints.push({
      rel: 'preload',
      as: 'image',
      href: image,
      fetchpriority: 'high'
    });
  });
  
  // Prefetch likely navigation
  config.prefetch?.forEach(path => {
    hints.push({
      rel: 'prefetch',
      href: path
    });
  });
  
  return hints;
}

/**
 * Client-side only functions
 * These are no-ops on the server
 */
export const preloadResource = (...args: Parameters<typeof import('./preload-client')['preloadResource']>) => {
  if (clientUtils) {
    return clientUtils.preloadResource(...args);
  }
};

export const prefetchResource = (...args: Parameters<typeof import('./preload-client')['prefetchResource']>) => {
  if (clientUtils) {
    return clientUtils.prefetchResource(...args);
  }
};

export const preloadModuleScript = (...args: Parameters<typeof import('./preload-client')['preloadModuleScript']>) => {
  if (clientUtils) {
    return clientUtils.preloadModuleScript(...args);
  }
};

export const dnsPrefetch = (...args: Parameters<typeof import('./preload-client')['dnsPrefetch']>) => {
  if (clientUtils) {
    return clientUtils.dnsPrefetch(...args);
  }
};

export const preconnect = (...args: Parameters<typeof import('./preload-client')['preconnect']>) => {
  if (clientUtils) {
    return clientUtils.preconnect(...args);
  }
};

export const preloadImage = (...args: Parameters<typeof import('./preload-client')['preloadImage']>) => {
  if (clientUtils) {
    return clientUtils.preloadImage(...args);
  }
};

export const preloadApiResponse = (...args: Parameters<typeof import('./preload-client')['preloadApiResponse']>) => {
  if (clientUtils) {
    return clientUtils.preloadApiResponse(...args);
  }
};

export const shouldPreloadResource = () => {
  if (clientUtils) {
    return clientUtils.shouldPreloadResource();
  }
  return false;
};

// Export placeholder for preloadManager
export const preloadManager = null;