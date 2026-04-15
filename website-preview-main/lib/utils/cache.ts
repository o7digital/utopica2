import { unstable_cache } from 'next/cache';

// Cache tags for easier invalidation
export const CACHE_TAGS = {
  HOMEPAGE: 'homepage',
  SPRINT: 'sprint',
  WORKSHOPS: 'workshops',
  TEAM: 'team',
  BLOG: 'blog',
  POSTS: 'posts'
} as const;

// Cache durations in seconds
export const CACHE_DURATIONS = {
  HOMEPAGE: 21600, // 6 hours
  SPRINT: 7200,    // 2 hours
  WORKSHOPS: 300,   // 5 minutes
  TEAM: 86400,     // 24 hours
  BLOG: 14400,     // 4 hours
  POSTS: 3600      // 1 hour
} as const;

/**
 * Utility function to create cached functions with appropriate tags and revalidation
 */
export function createCachedFunction<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  tags: string[],
  revalidate?: number
) {
  return unstable_cache(fn, undefined, {
    tags,
    revalidate
  });
}

/**
 * Generate cache key for consistent caching across the app
 */
export function generateCacheKey(prefix: string, ...params: (string | number)[]): string {
  return `${prefix}:${params.join(':')}`;
}

/**
 * Cache invalidation patterns for different content types
 */
export function getCacheInvalidationPaths(type: 'homepage' | 'sprint' | 'workshop' | 'all') {
  const paths = {
    homepage: ['/'],
    sprint: ['/sprint-claridad-comercial'],
    workshop: ['/api/workshops'],
    all: ['/', '/sprint-claridad-comercial', '/equipo', '/_blog', '/api/workshops']
  };

  return paths[type];
}

/**
 * Cache warming utilities for critical paths
 */
export const CACHE_WARMING_ENDPOINTS = [
  '/api/workshops',
  '/api/health?cache=true'
] as const;

/**
 * Advanced cache configuration with performance settings
 */
export const CACHE_PERFORMANCE_CONFIG = {
  // Stale-while-revalidate multipliers
  SWR_MULTIPLIER: 12, // 12x cache duration for stale-while-revalidate
  
  // Max age multipliers for different content types
  MAX_AGE_MULTIPLIERS: {
    STATIC: 2,    // 2x for static content (team, about)
    DYNAMIC: 1,   // 1x for dynamic content (workshops)
    SEMI_STATIC: 1.5 // 1.5x for semi-static content (sprint)
  },
  
  // Response size thresholds for compression
  COMPRESSION_THRESHOLD: 1024, // 1KB
  
  // Cache warming intervals (in seconds)
  WARMING_INTERVALS: {
    WORKSHOPS: 240, // 4 minutes (before 5min cache expires)
    HOMEPAGE: 21000, // 5.8 hours (before 6hr cache expires)
    SPRINT: 7000 // 1.9 hours (before 2hr cache expires)
  }
} as const;

/**
 * Get optimized cache headers based on content type and user agent
 */
export function getOptimizedCacheHeaders(
  contentType: keyof typeof CACHE_DURATIONS,
  options: {
    isStatic?: boolean;
    userAgent?: string;
    acceptEncoding?: string;
  } = {}
) {
  const baseDuration = CACHE_DURATIONS[contentType];
  const { isStatic = false, userAgent = '', acceptEncoding = '' } = options;
  
  // Adjust cache duration based on content type
  const multiplier = isStatic 
    ? CACHE_PERFORMANCE_CONFIG.MAX_AGE_MULTIPLIERS.STATIC
    : CACHE_PERFORMANCE_CONFIG.MAX_AGE_MULTIPLIERS.DYNAMIC;
    
  const maxAge = Math.floor(baseDuration * multiplier);
  const sMaxAge = Math.floor(baseDuration * 2); // CDN cache longer
  const staleWhileRevalidate = Math.floor(baseDuration * CACHE_PERFORMANCE_CONFIG.SWR_MULTIPLIER);
  
  const headers = new Headers();
  
  // Basic cache control
  headers.set(
    'Cache-Control',
    `public, max-age=${maxAge}, s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`
  );
  
  // Vary header for optimization
  const varyHeaders = ['Accept-Encoding'];
  if (userAgent.includes('Mobile')) {
    varyHeaders.push('User-Agent');
  }
  headers.set('Vary', varyHeaders.join(', '));
  
  // Compression hints
  if (acceptEncoding.includes('br')) {
    headers.set('Content-Encoding-Preference', 'br');
  } else if (acceptEncoding.includes('gzip')) {
    headers.set('Content-Encoding-Preference', 'gzip');
  }
  
  return headers;
}

/**
 * Generate ETag with content and cache metadata
 */
export function generateAdvancedETag(
  content: string | object,
  metadata: {
    source?: string;
    timestamp?: number;
    version?: string;
  } = {}
) {
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
  const contentHash = contentStr.length.toString(36); // Simple hash based on length
  const timestamp = Math.floor((metadata.timestamp || Date.now()) / 1000);
  const source = metadata.source || 'api';
  const version = metadata.version || '1';
  
  return `"${source}-${version}-${contentHash}-${timestamp}"`;
}

/**
 * Enhanced cache warming integration with new warming system
 */
export async function triggerCacheWarming(
  type: 'critical' | 'smart' | 'deployment' = 'critical'
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const token = process.env.CACHE_WARMING_TOKEN;
    
    if (!token) {
      console.warn('CACHE_WARMING_TOKEN not configured, skipping warming');
      return { 
        success: false, 
        message: 'Cache warming token not configured' 
      };
    }
    
    const response = await fetch(`${baseUrl}/api/cache-warming`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        action: type
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        message: `Cache warming (${type}) completed successfully`,
        data
      };
    } else {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: `Cache warming failed: ${response.status} ${response.statusText}`,
        data: errorData
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Cache warming error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Cache status monitoring
 */
export interface CacheHealthStatus {
  status: 'healthy' | 'degraded' | 'critical';
  checks: {
    hitRatio: { status: 'pass' | 'fail'; value: number; threshold: number };
    responseTime: { status: 'pass' | 'fail'; value: number; threshold: number };
    errorRate: { status: 'pass' | 'fail'; value: number; threshold: number };
  };
  recommendations: string[];
}

export function evaluateCacheHealth(metrics: {
  hitRatio: number;
  avgResponseTime: number;
  errors: number;
  total: number;
}): CacheHealthStatus {
  const { hitRatio, avgResponseTime, errors, total } = metrics;
  const errorRate = total > 0 ? (errors / total) * 100 : 0;
  
  const checks = {
    hitRatio: {
      status: (hitRatio >= 70 ? 'pass' : 'fail') as 'pass' | 'fail',
      value: hitRatio,
      threshold: 70
    },
    responseTime: {
      status: (avgResponseTime <= 100 ? 'pass' : 'fail') as 'pass' | 'fail',
      value: avgResponseTime,
      threshold: 100
    },
    errorRate: {
      status: (errorRate <= 5 ? 'pass' : 'fail') as 'pass' | 'fail',
      value: errorRate,
      threshold: 5
    }
  };
  
  const failedChecks = Object.values(checks).filter(check => check.status === 'fail').length;
  
  let status: CacheHealthStatus['status'] = 'healthy';
  if (failedChecks === 1) status = 'degraded';
  if (failedChecks >= 2) status = 'critical';
  
  const recommendations: string[] = [];
  if (checks.hitRatio.status === 'fail') {
    recommendations.push('Increase cache duration or improve cache invalidation strategy');
  }
  if (checks.responseTime.status === 'fail') {
    recommendations.push('Optimize data fetching or implement cache warming');
  }
  if (checks.errorRate.status === 'fail') {
    recommendations.push('Investigate error causes and implement better error handling');
  }
  
  return {
    status,
    checks,
    recommendations
  };
}