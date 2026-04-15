import { revalidatePath, revalidateTag } from 'next/cache';
import { CACHE_TAGS, getCacheInvalidationPaths, warmCriticalCaches } from '@/lib/utils/cache';
import crypto from 'crypto';

// Types for the revalidation system
export interface RevalidationRequest {
  type: 'manual' | 'webhook' | 'scheduled';
  source: string;
  targetType: 'path' | 'tag' | 'all' | 'selective';
  targets?: string[];
  options?: {
    cascade?: boolean;
    warmAfter?: boolean;
    priority?: 'low' | 'normal' | 'high';
    batchSize?: number;
  };
  metadata?: {
    userId?: string;
    ip?: string;
    userAgent?: string;
    timestamp?: number;
  };
}

export interface RevalidationResult {
  success: boolean;
  message: string;
  data: {
    revalidatedPaths: string[];
    revalidatedTags: string[];
    warmedCaches?: string[];
    failedOperations?: string[];
    processingTime: number;
    batchInfo?: {
      total: number;
      processed: number;
      failed: number;
    };
  };
  metadata: {
    requestId: string;
    timestamp: string;
    source: string;
    type: string;
  };
}

export interface RevalidationLog {
  id: string;
  timestamp: string;
  type: 'manual' | 'webhook' | 'scheduled';
  source: string;
  action: string;
  targets: string[];
  result: 'success' | 'partial' | 'failed';
  processingTime: number;
  error?: string;
  metadata?: any;
}

// In-memory store for recent logs (in production, use Redis or database)
const revalidationLogs: RevalidationLog[] = [];
const MAX_LOGS = 1000;

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Security configuration
export const REVALIDATION_CONFIG = {
  RATE_LIMIT: {
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: {
      MANUAL: 20,
      WEBHOOK: 100,
      ADMIN: 50
    }
  },
  BATCH: {
    MAX_SIZE: 50,
    DELAY_MS: 100 // Delay between batch operations
  },
  SECURITY: {
    MAX_TOKEN_LENGTH: 256,
    WEBHOOK_TIMEOUT_MS: 30000,
    ADMIN_SESSION_DURATION: 3600000 // 1 hour
  }
} as const;

/**
 * Generate a secure request ID for tracking
 */
export function generateRequestId(): string {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Check rate limits for revalidation requests
 */
export function checkRateLimit(
  identifier: string, 
  type: keyof typeof REVALIDATION_CONFIG.RATE_LIMIT.MAX_REQUESTS
): { allowed: boolean; resetTime?: number; remainingRequests?: number } {
  const now = Date.now();
  const key = `${identifier}:${type}`;
  const limit = REVALIDATION_CONFIG.RATE_LIMIT.MAX_REQUESTS[type];
  
  const currentData = rateLimitStore.get(key);
  
  if (!currentData || now > currentData.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + REVALIDATION_CONFIG.RATE_LIMIT.WINDOW_MS
    });
    return {
      allowed: true,
      resetTime: now + REVALIDATION_CONFIG.RATE_LIMIT.WINDOW_MS,
      remainingRequests: limit - 1
    };
  }
  
  if (currentData.count >= limit) {
    return {
      allowed: false,
      resetTime: currentData.resetTime,
      remainingRequests: 0
    };
  }
  
  currentData.count++;
  return {
    allowed: true,
    resetTime: currentData.resetTime,
    remainingRequests: limit - currentData.count
  };
}

/**
 * Log revalidation activity
 */
function logRevalidation(log: Omit<RevalidationLog, 'id' | 'timestamp'>): void {
  const logEntry: RevalidationLog = {
    ...log,
    id: generateRequestId(),
    timestamp: new Date().toISOString()
  };
  
  revalidationLogs.unshift(logEntry);
  
  // Keep only recent logs
  if (revalidationLogs.length > MAX_LOGS) {
    revalidationLogs.splice(MAX_LOGS);
  }
  
  // Log to console for debugging
  console.log(`[REVALIDATION] ${log.type.toUpperCase()} - ${log.action}`, {
    source: log.source,
    targets: log.targets,
    result: log.result,
    processingTime: `${log.processingTime}ms`
  });
}

/**
 * Get recent revalidation logs
 */
export function getRevalidationLogs(
  filters?: {
    type?: string;
    source?: string;
    limit?: number;
    since?: string;
  }
): RevalidationLog[] {
  let logs = [...revalidationLogs];
  
  if (filters) {
    if (filters.type) {
      logs = logs.filter(log => log.type === filters.type);
    }
    if (filters.source) {
      logs = logs.filter(log => log.source.includes(filters.source!));
    }
    if (filters.since) {
      const sinceDate = new Date(filters.since);
      logs = logs.filter(log => new Date(log.timestamp) >= sinceDate);
    }
    if (filters.limit) {
      logs = logs.slice(0, filters.limit);
    }
  }
  
  return logs;
}

/**
 * Advanced selective revalidation with intelligent cascading
 */
export async function selectiveRevalidation(
  targets: string[],
  options: {
    cascade?: boolean;
    priority?: 'low' | 'normal' | 'high';
    batchSize?: number;
  } = {}
): Promise<{ paths: string[]; tags: string[]; failed: string[] }> {
  const { cascade = true, batchSize = REVALIDATION_CONFIG.BATCH.MAX_SIZE } = options;
  const revalidatedPaths: string[] = [];
  const revalidatedTags: string[] = [];
  const failed: string[] = [];
  
  // Process in batches to avoid overwhelming the system
  for (let i = 0; i < targets.length; i += batchSize) {
    const batch = targets.slice(i, i + batchSize);
    
    for (const target of batch) {
      try {
        if (target.startsWith('/')) {
          // It's a path
          revalidatePath(target);
          revalidatedPaths.push(target);
          
          // Cascade to related paths if enabled
          if (cascade) {
            const relatedPaths = getRelatedPaths(target);
            for (const relatedPath of relatedPaths) {
              revalidatePath(relatedPath);
              revalidatedPaths.push(relatedPath);
            }
          }
        } else {
          // It's a tag
          revalidateTag(target);
          revalidatedTags.push(target);
          
          // Cascade to related tags if enabled
          if (cascade) {
            const relatedTags = getRelatedTags(target);
            for (const relatedTag of relatedTags) {
              revalidateTag(relatedTag);
              revalidatedTags.push(relatedTag);
            }
          }
        }
      } catch (error) {
        console.error(`Failed to revalidate ${target}:`, error);
        failed.push(target);
      }
    }
    
    // Small delay between batches to prevent overwhelming
    if (i + batchSize < targets.length) {
      await new Promise(resolve => setTimeout(resolve, REVALIDATION_CONFIG.BATCH.DELAY_MS));
    }
  }
  
  return {
    paths: [...new Set(revalidatedPaths)], // Remove duplicates
    tags: [...new Set(revalidatedTags)],
    failed
  };
}

/**
 * Get related paths for cascade revalidation
 */
function getRelatedPaths(path: string): string[] {
  const related: string[] = [];
  
  // Homepage affects many other paths
  if (path === '/') {
    related.push('/sprint-claridad-comercial');
  }
  
  // Workshop changes might affect homepage
  if (path.includes('workshop')) {
    related.push('/');
  }
  
  // API changes might affect their consumer pages
  if (path.startsWith('/api/workshops')) {
    related.push('/', '/sprint-claridad-comercial');
  }
  
  return related;
}

/**
 * Get related tags for cascade revalidation
 */
function getRelatedTags(tag: string): string[] {
  const related: string[] = [];
  
  // Workshop changes might affect homepage content
  if (tag === CACHE_TAGS.WORKSHOPS) {
    related.push(CACHE_TAGS.HOMEPAGE);
  }
  
  // Sprint changes might affect homepage
  if (tag === CACHE_TAGS.SPRINT) {
    related.push(CACHE_TAGS.HOMEPAGE);
  }
  
  return related;
}

/**
 * Main revalidation handler with comprehensive logging and error handling
 */
export async function executeRevalidation(request: RevalidationRequest): Promise<RevalidationResult> {
  const startTime = Date.now();
  const requestId = generateRequestId();
  
  try {
    let revalidatedPaths: string[] = [];
    let revalidatedTags: string[] = [];
    let warmedCaches: string[] = [];
    let failedOperations: string[] = [];
    
    // Execute revalidation based on type
    switch (request.targetType) {
      case 'path':
        if (request.targets) {
          for (const path of request.targets) {
            try {
              revalidatePath(path);
              revalidatedPaths.push(path);
            } catch (error) {
              failedOperations.push(`path:${path}`);
            }
          }
        }
        break;
        
      case 'tag':
        if (request.targets) {
          for (const tag of request.targets) {
            try {
              revalidateTag(tag);
              revalidatedTags.push(tag);
              
              // Also revalidate related paths for the tag
              if (request.options?.cascade !== false) {
                const paths = getCacheInvalidationPaths(tag as any);
                if (paths) {
                  paths.forEach(path => {
                    revalidatePath(path);
                    revalidatedPaths.push(path);
                  });
                }
              }
            } catch (error) {
              failedOperations.push(`tag:${tag}`);
            }
          }
        }
        break;
        
      case 'selective':
        if (request.targets) {
          const result = await selectiveRevalidation(request.targets, request.options);
          revalidatedPaths = result.paths;
          revalidatedTags = result.tags;
          failedOperations = result.failed;
        }
        break;
        
      case 'all':
        // Revalidate all cache
        const allPaths = getCacheInvalidationPaths('all');
        const allTags = Object.values(CACHE_TAGS);
        
        allPaths.forEach(path => {
          try {
            revalidatePath(path);
            revalidatedPaths.push(path);
          } catch (error) {
            failedOperations.push(`path:${path}`);
          }
        });
        
        allTags.forEach(tag => {
          try {
            revalidateTag(tag);
            revalidatedTags.push(tag);
          } catch (error) {
            failedOperations.push(`tag:${tag}`);
          }
        });
        break;
    }
    
    // Warm critical caches if requested
    if (request.options?.warmAfter) {
      try {
        const warmResult = await warmCriticalCaches();
        warmedCaches = warmResult.warmed;
        failedOperations.push(...warmResult.failed.map(f => `warm:${f}`));
      } catch (error) {
        failedOperations.push('warm:critical-caches');
      }
    }
    
    const processingTime = Date.now() - startTime;
    const success = failedOperations.length === 0;
    
    const result: RevalidationResult = {
      success,
      message: success 
        ? 'Revalidation completed successfully'
        : `Revalidation completed with ${failedOperations.length} failures`,
      data: {
        revalidatedPaths: [...new Set(revalidatedPaths)],
        revalidatedTags: [...new Set(revalidatedTags)],
        warmedCaches,
        failedOperations: failedOperations.length > 0 ? failedOperations : undefined,
        processingTime
      },
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
        source: request.source,
        type: request.type
      }
    };
    
    // Log the operation
    logRevalidation({
      type: request.type,
      source: request.source,
      action: `${request.targetType}:${request.targets?.join(',') || 'all'}`,
      targets: request.targets || [],
      result: success ? 'success' : (failedOperations.length < (request.targets?.length || 1) ? 'partial' : 'failed'),
      processingTime,
      error: failedOperations.length > 0 ? failedOperations.join(', ') : undefined,
      metadata: request.metadata
    });
    
    return result;
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    // Log the error
    logRevalidation({
      type: request.type,
      source: request.source,
      action: `${request.targetType}:error`,
      targets: request.targets || [],
      result: 'failed',
      processingTime,
      error: error instanceof Error ? error.message : 'Unknown error',
      metadata: request.metadata
    });
    
    return {
      success: false,
      message: 'Revalidation failed due to an error',
      data: {
        revalidatedPaths: [],
        revalidatedTags: [],
        failedOperations: ['system-error'],
        processingTime
      },
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
        source: request.source,
        type: request.type
      }
    };
  }
}

/**
 * Webhook signature verification utilities
 */
export class WebhookValidator {
  private static verifyTrelloSignature(body: string, signature: string, secret: string): boolean {
    if (!secret || !signature) return false;
    
    const expectedSignature = crypto
      .createHmac('sha1', secret)
      .update(body)
      .digest('base64');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }
  
  private static verifyGenericHmacSignature(
    body: string, 
    signature: string, 
    secret: string,
    algorithm: string = 'sha256'
  ): boolean {
    if (!secret || !signature) return false;
    
    // Remove sha256= prefix if present
    const sig = signature.startsWith(`${algorithm}=`) 
      ? signature.slice(algorithm.length + 1)
      : signature;
    
    const expectedSignature = crypto
      .createHmac(algorithm, secret)
      .update(body)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(sig),
      Buffer.from(expectedSignature)
    );
  }
  
  static verifyWebhook(
    body: string,
    signature: string,
    secret: string,
    provider: 'trello' | 'github' | 'generic' = 'generic'
  ): boolean {
    switch (provider) {
      case 'trello':
        return this.verifyTrelloSignature(body, signature, secret);
      case 'github':
        return this.verifyGenericHmacSignature(body, signature, secret, 'sha256');
      case 'generic':
      default:
        return this.verifyGenericHmacSignature(body, signature, secret);
    }
  }
}

/**
 * Queue system for batch revalidations
 */
export class RevalidationQueue {
  private queue: RevalidationRequest[] = [];
  private processing = false;
  
  async add(request: RevalidationRequest): Promise<void> {
    this.queue.push(request);
    
    if (!this.processing) {
      this.processQueue();
    }
  }
  
  private async processQueue(): Promise<void> {
    this.processing = true;
    
    while (this.queue.length > 0) {
      const request = this.queue.shift();
      if (!request) continue;
      
      try {
        await executeRevalidation(request);
      } catch (error) {
        console.error('Queue processing error:', error);
      }
      
      // Small delay between queue items
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    this.processing = false;
  }
  
  getQueueStatus(): { pending: number; processing: boolean } {
    return {
      pending: this.queue.length,
      processing: this.processing
    };
  }
}

// Export singleton queue instance
export const revalidationQueue = new RevalidationQueue();

/**
 * Get revalidation system health and statistics
 */
export function getRevalidationStats(): {
  totalOperations: number;
  successRate: number;
  averageProcessingTime: number;
  recentActivity: RevalidationLog[];
  rateLimitStatus: { [key: string]: number };
  queueStatus: { pending: number; processing: boolean };
} {
  const logs = getRevalidationLogs({ limit: 100 });
  const successful = logs.filter(log => log.result === 'success').length;
  const total = logs.length;
  const successRate = total > 0 ? (successful / total) * 100 : 100;
  const averageProcessingTime = total > 0 
    ? logs.reduce((acc, log) => acc + log.processingTime, 0) / total 
    : 0;
  
  return {
    totalOperations: total,
    successRate: Math.round(successRate * 100) / 100,
    averageProcessingTime: Math.round(averageProcessingTime * 100) / 100,
    recentActivity: logs.slice(0, 10),
    rateLimitStatus: Object.fromEntries(
      Array.from(rateLimitStore.entries()).map(([key, value]) => [key, value.count])
    ),
    queueStatus: revalidationQueue.getQueueStatus()
  };
}