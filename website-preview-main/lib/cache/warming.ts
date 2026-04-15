import { revalidateTag, revalidatePath } from 'next/cache';
import { CACHE_TAGS, CACHE_WARMING_ENDPOINTS } from '@/lib/utils/cache';
import { getCachedWorkshops } from '@/lib/server/preload';
import crypto from 'crypto';

// Types for cache warming system
export interface WarmingTarget {
  type: 'route' | 'api' | 'tag' | 'function';
  target: string;
  priority: 'critical' | 'high' | 'normal' | 'low';
  warmInterval?: number; // in seconds
  retryCount?: number;
  timeout?: number; // in milliseconds
  headers?: Record<string, string>;
  validation?: (response: Response) => boolean;
}

export interface WarmingResult {
  target: string;
  success: boolean;
  responseTime: number;
  status?: number;
  error?: string;
  cached?: boolean;
  timestamp: string;
}

export interface WarmingSessionResult {
  sessionId: string;
  startTime: string;
  endTime: string;
  totalDuration: number;
  targets: WarmingResult[];
  summary: {
    total: number;
    successful: number;
    failed: number;
    cached: number;
    averageResponseTime: number;
  };
}

// Critical warming targets with priorities
export const CRITICAL_WARMING_TARGETS: WarmingTarget[] = [
  // API endpoints
  {
    type: 'api',
    target: '/api/workshops',
    priority: 'critical',
    warmInterval: 240, // 4 minutes
    timeout: 5000,
    validation: (response) => response.ok && response.headers.get('content-type')?.includes('application/json') || false
  },
  {
    type: 'api',
    target: '/api/health',
    priority: 'high',
    warmInterval: 300, // 5 minutes
    timeout: 3000
  },
  
  // Main routes
  {
    type: 'route',
    target: '/',
    priority: 'critical',
    warmInterval: 21000, // 5.8 hours
    timeout: 8000,
    validation: (response) => response.ok && response.headers.get('content-type')?.includes('text/html') || false
  },
  {
    type: 'route',
    target: '/sprint-claridad-comercial',
    priority: 'critical',
    warmInterval: 7000, // 1.9 hours  
    timeout: 8000,
    validation: (response) => response.ok && response.headers.get('content-type')?.includes('text/html') || false
  },
  {
    type: 'route',
    target: '/equipo',
    priority: 'high',
    warmInterval: 43200, // 12 hours
    timeout: 6000
  },
  {
    type: 'route',
    target: '/_blog',
    priority: 'normal',
    warmInterval: 14400, // 4 hours
    timeout: 6000
  },
  
  // Server functions
  {
    type: 'function',
    target: 'workshops-cache',
    priority: 'critical',
    warmInterval: 240 // 4 minutes
  }
];

// Cache warming configuration
export const WARMING_CONFIG = {
  CONCURRENT_REQUESTS: 3,
  REQUEST_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 2,
  RETRY_DELAY: 1000,
  USER_AGENT: 'Cache-Warmer/2.0 (Next.js)',
  BATCH_DELAY: 100, // ms between requests in same batch
  PRIORITY_DELAYS: {
    critical: 0,
    high: 50,
    normal: 100,
    low: 200
  }
} as const;

/**
 * Generate unique session ID for warming operations
 */
export function generateWarmingSessionId(): string {
  return crypto.randomBytes(8).toString('hex');
}

/**
 * Get base URL for warming requests
 */
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 
         process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
         'http://localhost:3000';
}

/**
 * Warm a single target with retries and validation
 */
async function warmSingleTarget(target: WarmingTarget): Promise<WarmingResult> {
  const startTime = Date.now();
  const result: WarmingResult = {
    target: target.target,
    success: false,
    responseTime: 0,
    timestamp: new Date().toISOString()
  };

  let lastError: string | undefined;
  
  for (let attempt = 0; attempt <= (target.retryCount || WARMING_CONFIG.RETRY_ATTEMPTS); attempt++) {
    try {
      if (target.type === 'function') {
        // Handle server function warming
        await warmServerFunction(target.target);
        result.success = true;
        break;
      } else if (target.type === 'tag') {
        // Handle cache tag revalidation
        revalidateTag(target.target);
        result.success = true;
        break;
      } else {
        // Handle HTTP requests (routes and APIs)
        const url = `${getBaseUrl()}${target.target}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(), 
          target.timeout || WARMING_CONFIG.REQUEST_TIMEOUT
        );

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': WARMING_CONFIG.USER_AGENT,
            'X-Cache-Warming': 'true',
            'X-Warming-Priority': target.priority,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            ...target.headers
          },
          signal: controller.signal,
          cache: 'no-store'
        });

        clearTimeout(timeoutId);

        result.status = response.status;
        result.cached = response.headers.get('x-cache') === 'HIT' || 
                       response.headers.get('cf-cache-status') === 'HIT';

        // Validate response if validator provided
        if (target.validation) {
          result.success = target.validation(response);
          if (!result.success) {
            lastError = `Validation failed for ${target.target}`;
          }
        } else {
          result.success = response.ok;
          if (!result.success) {
            lastError = `HTTP ${response.status}: ${response.statusText}`;
          }
        }

        if (result.success) break;
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown error';
      
      // Don't retry on certain errors
      if (error instanceof Error && 
          (error.name === 'AbortError' || error.message.includes('ECONNREFUSED'))) {
        break;
      }
    }

    // Wait before retry
    if (attempt < (target.retryCount || WARMING_CONFIG.RETRY_ATTEMPTS)) {
      await new Promise(resolve => setTimeout(resolve, WARMING_CONFIG.RETRY_DELAY));
    }
  }

  result.responseTime = Date.now() - startTime;
  result.error = result.success ? undefined : lastError;

  return result;
}

/**
 * Warm server functions (cached functions)
 */
async function warmServerFunction(functionName: string): Promise<void> {
  switch (functionName) {
    case 'workshops-cache':
      await getCachedWorkshops();
      break;
    default:
      throw new Error(`Unknown server function: ${functionName}`);
  }
}

/**
 * Warm multiple targets with priority-based batching
 */
export async function warmCaches(
  targets: WarmingTarget[] = CRITICAL_WARMING_TARGETS,
  options: {
    concurrency?: number;
    respectPriorities?: boolean;
    priorityFilter?: WarmingTarget['priority'][];
  } = {}
): Promise<WarmingSessionResult> {
  const sessionId = generateWarmingSessionId();
  const startTime = new Date();
  const {
    concurrency = WARMING_CONFIG.CONCURRENT_REQUESTS,
    respectPriorities = true,
    priorityFilter
  } = options;

  console.log(`🔥 Starting cache warming session ${sessionId}`, {
    targets: targets.length,
    concurrency,
    respectPriorities
  });

  let filteredTargets = targets;
  
  // Filter by priority if specified
  if (priorityFilter) {
    filteredTargets = targets.filter(t => priorityFilter.includes(t.priority));
  }

  // Sort by priority if respect priorities is enabled
  if (respectPriorities) {
    const priorityOrder = { critical: 0, high: 1, normal: 2, low: 3 };
    filteredTargets = [...filteredTargets].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  const results: WarmingResult[] = [];
  
  // Process targets in batches based on concurrency
  for (let i = 0; i < filteredTargets.length; i += concurrency) {
    const batch = filteredTargets.slice(i, i + concurrency);
    
    // Add priority-based delays
    const batchPromises = batch.map(async (target, index) => {
      if (respectPriorities && index > 0) {
        await new Promise(resolve => 
          setTimeout(resolve, WARMING_CONFIG.PRIORITY_DELAYS[target.priority])
        );
      }
      return warmSingleTarget(target);
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Small delay between batches
    if (i + concurrency < filteredTargets.length) {
      await new Promise(resolve => setTimeout(resolve, WARMING_CONFIG.BATCH_DELAY));
    }
  }

  const endTime = new Date();
  const totalDuration = endTime.getTime() - startTime.getTime();
  
  const summary = {
    total: results.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    cached: results.filter(r => r.cached).length,
    averageResponseTime: results.length > 0 
      ? Math.round(results.reduce((acc, r) => acc + r.responseTime, 0) / results.length)
      : 0
  };

  const sessionResult: WarmingSessionResult = {
    sessionId,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    totalDuration,
    targets: results,
    summary
  };

  console.log(`✅ Cache warming session ${sessionId} completed`, summary);

  return sessionResult;
}

/**
 * Warm critical caches only (highest priority)
 */
export async function warmCriticalCaches(): Promise<WarmingSessionResult> {
  return warmCaches(CRITICAL_WARMING_TARGETS, {
    priorityFilter: ['critical'],
    concurrency: WARMING_CONFIG.CONCURRENT_REQUESTS
  });
}

/**
 * Smart warming based on current time and traffic patterns
 */
export async function smartWarm(): Promise<WarmingSessionResult> {
  const now = new Date();
  const hour = now.getHours();
  const isBusinessHours = hour >= 9 && hour <= 18;
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  
  // Determine priorities based on time
  let priorityFilter: WarmingTarget['priority'][];
  
  if (isBusinessHours && !isWeekend) {
    // Peak hours: warm everything
    priorityFilter = ['critical', 'high', 'normal'];
  } else if (!isWeekend) {
    // Off-peak weekday: critical and high only
    priorityFilter = ['critical', 'high'];
  } else {
    // Weekend: critical only
    priorityFilter = ['critical'];
  }
  
  console.log(`🧠 Smart warming for ${isBusinessHours ? 'business' : 'off-peak'} hours`, {
    hour,
    isWeekend,
    priorities: priorityFilter
  });
  
  return warmCaches(CRITICAL_WARMING_TARGETS, {
    priorityFilter,
    respectPriorities: true
  });
}

/**
 * Post-deployment warming sequence
 */
export async function postDeploymentWarm(): Promise<WarmingSessionResult> {
  console.log('🚀 Post-deployment cache warming started');
  
  // First, invalidate all existing caches
  const allTags = Object.values(CACHE_TAGS);
  allTags.forEach(tag => revalidateTag(tag));
  
  // Wait a moment for invalidation to propagate
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Then warm critical paths
  return warmCaches(CRITICAL_WARMING_TARGETS, {
    priorityFilter: ['critical', 'high'],
    concurrency: 2, // Lower concurrency for deployment scenario
    respectPriorities: true
  });
}

/**
 * Scheduled warming with intelligent intervals
 */
export class CacheWarmingScheduler {
  private timers: Map<string, NodeJS.Timeout> = new Map();
  private isRunning = false;
  
  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('📅 Cache warming scheduler started');
    
    CRITICAL_WARMING_TARGETS.forEach(target => {
      if (target.warmInterval) {
        const timer = setInterval(async () => {
          try {
            await warmSingleTarget(target);
          } catch (error) {
            console.error(`Scheduled warming failed for ${target.target}:`, error);
          }
        }, target.warmInterval * 1000);
        
        this.timers.set(target.target, timer);
      }
    });
  }
  
  stop(): void {
    if (!this.isRunning) return;
    
    this.timers.forEach(timer => clearInterval(timer));
    this.timers.clear();
    this.isRunning = false;
    
    console.log('⏹️ Cache warming scheduler stopped');
  }
  
  getStatus(): { running: boolean; scheduledTargets: number } {
    return {
      running: this.isRunning,
      scheduledTargets: this.timers.size
    };
  }
}

// Export singleton scheduler
export const warmingScheduler = new CacheWarmingScheduler();

/**
 * Get warming statistics and health
 */
export interface WarmingHealthStatus {
  status: 'healthy' | 'degraded' | 'critical';
  lastWarming?: string;
  successRate: number;
  averageResponseTime: number;
  failedTargets: string[];
  recommendations: string[];
}

let lastWarmingResults: WarmingSessionResult | null = null;

export function updateWarmingResults(results: WarmingSessionResult): void {
  lastWarmingResults = results;
}

export function getWarmingHealth(): WarmingHealthStatus {
  if (!lastWarmingResults) {
    return {
      status: 'critical',
      successRate: 0,
      averageResponseTime: 0,
      failedTargets: [],
      recommendations: ['No warming data available - run initial warming']
    };
  }
  
  const { summary, targets, endTime } = lastWarmingResults;
  const successRate = (summary.successful / summary.total) * 100;
  const failedTargets = targets.filter(t => !t.success).map(t => t.target);
  
  let status: WarmingHealthStatus['status'] = 'healthy';
  if (successRate < 90) status = 'degraded';
  if (successRate < 70) status = 'critical';
  
  const recommendations: string[] = [];
  if (summary.averageResponseTime > 2000) {
    recommendations.push('High response times detected - check server performance');
  }
  if (failedTargets.length > 0) {
    recommendations.push(`${failedTargets.length} targets failing - investigate: ${failedTargets.join(', ')}`);
  }
  if (successRate < 90) {
    recommendations.push('Success rate below 90% - review warming targets and intervals');
  }
  
  return {
    status,
    lastWarming: endTime,
    successRate: Math.round(successRate * 100) / 100,
    averageResponseTime: summary.averageResponseTime,
    failedTargets,
    recommendations
  };
}