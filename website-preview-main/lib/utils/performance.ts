// Performance utility functions

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Intersection Observer hook for lazy loading
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
}

/**
 * Performance measurement utilities
 */
export class PerformanceMonitor {
  private measurements = new Map<string, number>();

  start(label: string): void {
    this.measurements.set(label, performance.now());
  }

  end(label: string): number {
    const startTime = this.measurements.get(label);
    if (!startTime) {
      console.warn(`No start time found for measurement: ${label}`);
      return 0;
    }

    const endTime = performance.now();
    const duration = endTime - startTime;
    
    this.measurements.delete(label);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ ${label}: ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  measure<T>(label: string, fn: () => T): T {
    this.start(label);
    const result = fn();
    this.end(label);
    return result;
  }

  async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label);
    try {
      const result = await fn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * Web Vitals monitoring
 */
export function measureWebVitals(): void {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const lcp = entry as PerformanceNavigationTiming;
      console.log('LCP:', lcp.startTime);
    }
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // LCP not supported
  }

  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fidEntry = entry as any; // Type assertion for FID entries
      console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
    }
  });

  try {
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    // FID not supported
  }
}

/**
 * Resource preloading utilities
 */
export function preloadResource(
  href: string,
  as: string,
  type?: string,
  crossorigin?: string
): void {
  if (typeof document === 'undefined') return;

  const existing = document.querySelector(`link[href="${href}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (type) link.type = type;
  if (crossorigin) link.crossOrigin = crossorigin;
  
  link.onerror = () => console.warn(`Failed to preload: ${href}`);
  
  document.head.appendChild(link);
}

export function prefetchResource(href: string): void {
  if (typeof document === 'undefined') return;

  const existing = document.querySelector(`link[href="${href}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  
  link.onerror = () => console.warn(`Failed to prefetch: ${href}`);
  
  document.head.appendChild(link);
}

/**
 * Memory management utilities
 */
export function cleanupResources(cleanup: () => void): () => void {
  return () => {
    try {
      cleanup();
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  };
}

/**
 * Bundle analysis utilities
 */
export function analyzeBundle(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return;
  }

  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const totalSize = scripts.reduce((acc, script) => {
    const src = script.getAttribute('src');
    if (src && src.includes('_next/static')) {
      // Estimate size based on script name patterns
      return acc + 1;
    }
    return acc;
  }, 0);

  console.log(`📦 Bundle analysis: ${scripts.length} scripts loaded`);
}