/**
 * Client-side preloading utilities
 * This file contains all browser-specific preloading functionality
 */

import type {
  ResourceType,
  CrossOrigin,
  PreloadOptions,
  PrefetchOptions
} from './preload-types';

import { PAGE_PRELOAD_CONFIG, CRITICAL_RESOURCES } from './preload-types';

export * from './preload-types';

/**
 * Check if we're in a browser environment
 */
export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Generic resource preloader with comprehensive options
 */
export function preloadResource(
  href: string, 
  as: ResourceType,
  type?: string,
  crossorigin?: CrossOrigin,
  options: PreloadOptions = {}
): void {
  if (!isBrowser) return;
  
  // Check if already preloaded
  if (document.querySelector(`link[rel="preload"][href="${href}"]`)) {
    return;
  }
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (type) link.type = type;
  if (crossorigin) link.crossOrigin = crossorigin;
  if (options.integrity) link.integrity = options.integrity;
  if (options.media) link.media = options.media;
  if (options.fetchpriority) link.setAttribute('fetchpriority', options.fetchpriority);
  
  document.head.appendChild(link);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📦 Preloaded: ${href} as ${as}`);
  }
}

/**
 * Prefetch resource for likely future navigation
 */
export function prefetchResource(
  href: string,
  options: PrefetchOptions = {}
): void {
  if (!isBrowser) return;
  
  // Check if already prefetched
  if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
    return;
  }
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  
  if (options.crossorigin) link.crossOrigin = options.crossorigin;
  if (options.priority) link.setAttribute('importance', options.priority);
  
  document.head.appendChild(link);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔮 Prefetched: ${href}`);
  }
}

/**
 * Preload ES6 module scripts
 */
export function preloadModuleScript(href: string, options: ModulePreloadOptions = {}): void {
  if (!isBrowser) return;
  
  if (document.querySelector(`link[rel="modulepreload"][href="${href}"]`)) {
    return;
  }
  
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = href;
  
  if (options.integrity) link.integrity = options.integrity;
  if (options.crossorigin) link.crossOrigin = options.crossorigin;
  
  document.head.appendChild(link);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📦 Preloaded module: ${href}`);
  }
}

/**
 * DNS prefetch for external domains
 */
export function dnsPrefetch(domain: string): void {
  if (!isBrowser) return;
  
  const hostname = domain.startsWith('http') ? new URL(domain).hostname : domain;
  
  if (document.querySelector(`link[rel="dns-prefetch"][href="//${hostname}"]`)) {
    return;
  }
  
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = `//${hostname}`;
  
  document.head.appendChild(link);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🌐 DNS prefetch: ${hostname}`);
  }
}

/**
 * Preconnect to external domains (more aggressive than DNS prefetch)
 */
export function preconnect(url: string, crossorigin?: CrossOrigin): void {
  if (!isBrowser) return;
  
  const hostname = url.startsWith('http') ? new URL(url).hostname : url;
  const href = `//${hostname}`;
  
  if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
    return;
  }
  
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;
  
  if (crossorigin) link.crossOrigin = crossorigin;
  
  document.head.appendChild(link);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔌 Preconnect: ${hostname}`);
  }
}

/**
 * Preload critical images with responsive support
 */
export function preloadImage(
  src: string, 
  options: {
    sizes?: string;
    srcset?: string;
    fetchpriority?: 'high' | 'low' | 'auto';
  } = {}
): void {
  if (!isBrowser) return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  
  if (options.sizes) link.setAttribute('imagesizes', options.sizes);
  if (options.srcset) link.setAttribute('imagesrcset', options.srcset);
  if (options.fetchpriority) link.setAttribute('fetchpriority', options.fetchpriority);
  
  document.head.appendChild(link);
}

/**
 * Preload critical API responses
 */
export async function preloadApiResponse(
  endpoint: string,
  options: RequestInit = {}
): Promise<void> {
  if (!isBrowser) return;
  
  try {
    // Use fetch with cache to warm up the edge cache
    await fetch(endpoint, {
      method: 'GET',
      headers: {
        'X-Preload-Request': 'true',
        ...options.headers
      },
      cache: 'force-cache',
      ...options
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🌐 Preloaded API: ${endpoint}`);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Failed to preload API ${endpoint}:`, error);
    }
  }
}

/**
 * Preload critical resources based on connection speed
 */
export function shouldPreloadResource(): boolean {
  if (!isBrowser) return false;
  
  // Check if we're on a slow connection
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    
    // Skip preloading on slow 2g or save data mode
    if (connection.saveData || connection.effectiveType === 'slow-2g') {
      return false;
    }
    
    // Preload more aggressively on fast connections
    if (connection.effectiveType === '4g') {
      return true;
    }
  }
  
  return true;
}

/**
 * Intersection Observer based lazy preloading
 */
export class LazyPreloader {
  private observer: IntersectionObserver | null = null;
  private preloadQueue: Set<string> = new Set();
  
  constructor(rootMargin: string = '50px') {
    if (!isBrowser || !('IntersectionObserver' in window)) {
      return;
    }
    
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const preloadSrc = element.dataset.preload;
            const preloadType = element.dataset.preloadType as ResourceType;
            
            if (preloadSrc && !this.preloadQueue.has(preloadSrc)) {
              this.preloadQueue.add(preloadSrc);
              
              if (preloadType) {
                preloadResource(preloadSrc, preloadType);
              } else {
                prefetchResource(preloadSrc);
              }
              
              this.observer?.unobserve(element);
            }
          }
        });
      },
      { rootMargin }
    );
  }
  
  observe(element: Element): void {
    if (this.observer) {
      this.observer.observe(element);
    }
  }
  
  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.preloadQueue.clear();
  }
}

/**
 * Preload manager for coordinating all preloading activities
 */
export class PreloadManager {
  private static instance: PreloadManager;
  private lazyPreloader: LazyPreloader;
  private preloadedResources: Set<string> = new Set();
  
  private constructor() {
    this.lazyPreloader = new LazyPreloader();
    this.setupEventListeners();
  }
  
  static getInstance(): PreloadManager {
    if (!PreloadManager.instance) {
      PreloadManager.instance = new PreloadManager();
    }
    return PreloadManager.instance;
  }
  
  private setupEventListeners(): void {
    if (!isBrowser) return;
    
    // Preload on user interaction (hover, focus)
    document.addEventListener('mouseover', this.handleInteraction.bind(this), { passive: true });
    document.addEventListener('focus', this.handleInteraction.bind(this), { passive: true });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      this.lazyPreloader.disconnect();
    });
  }
  
  private handleInteraction(event: Event): void {
    const target = event.target as HTMLElement;
    const linkElement = target.closest('a[href]') as HTMLAnchorElement;
    
    if (linkElement && linkElement.href) {
      const url = new URL(linkElement.href);
      
      // Preload internal links
      if (url.origin === window.location.origin && !this.preloadedResources.has(url.pathname)) {
        this.preloadedResources.add(url.pathname);
        prefetchResource(url.pathname);
      }
    }
  }
  
  observeElement(element: Element): void {
    this.lazyPreloader.observe(element);
  }
  
  preloadPageResources(pageType: keyof typeof PAGE_PRELOAD_CONFIG): void {
    if (!isBrowser || !shouldPreloadResource()) return;
    
    const config = PAGE_PRELOAD_CONFIG[pageType];
    
    // Preload images
    config.images?.forEach(image => {
      preloadImage(image, { fetchpriority: 'high' });
    });
    
    // Preload API responses
    config.apis?.forEach(api => {
      preloadApiResponse(api);
    });
    
    // Prefetch likely navigation targets
    config.prefetch?.forEach(path => {
      prefetchResource(path);
    });
  }
  
  preloadCriticalResources(): void {
    if (!isBrowser || !shouldPreloadResource()) return;
    
    // Preload critical images
    CRITICAL_RESOURCES.images.forEach(image => {
      preloadImage(image, { fetchpriority: 'high' });
    });
    
    // Preload critical APIs
    CRITICAL_RESOURCES.apis.forEach(api => {
      preloadApiResponse(api);
    });
  }
}

// Export singleton instance - only create on client side
export const preloadManager = isBrowser ? PreloadManager.getInstance() : null;

/**
 * React hook for preloading page resources
 * Note: This is a placeholder function for client-side use only
 * Actual React hook implementation should be in a separate file
 */
export function usePreload(pageType: keyof typeof PAGE_PRELOAD_CONFIG): void {
  if (!isBrowser) return;
  
  // Direct call to preload manager instead of dynamic React import
  // This avoids the React Hook error
  if (preloadManager) {
    preloadManager.preloadPageResources(pageType);
  }
}

/**
 * Create resource hints for server-side rendering
 * This returns an array of resource hint configurations
 */
export function createResourceHints(pageType: keyof typeof PAGE_PRELOAD_CONFIG) {
  const config = PAGE_PRELOAD_CONFIG[pageType];
  const hints = [];
  
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

interface ModulePreloadOptions {
  integrity?: string;
  crossorigin?: CrossOrigin;
}