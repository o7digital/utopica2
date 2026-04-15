import { NextRequest, NextResponse } from 'next/server';
import { 
  warmCaches, 
  warmCriticalCaches, 
  smartWarm, 
  postDeploymentWarm,
  getWarmingHealth,
  updateWarmingResults,
  warmingScheduler,
  CRITICAL_WARMING_TARGETS,
  type WarmingTarget
} from '@/lib/cache/warming';
import { checkRateLimit } from '@/lib/cache/revalidation';
import crypto from 'crypto';

// API configuration
const API_CONFIG = {
  ADMIN_TOKEN: process.env.CACHE_WARMING_TOKEN,
  WEBHOOK_SECRET: process.env.CACHE_WARMING_WEBHOOK_SECRET,
  RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
  MAX_REQUESTS_PER_MINUTE: 10,
  ALLOWED_ORIGINS: [
    process.env.NEXT_PUBLIC_APP_URL,
    'https://api.github.com',
    'https://hooks.zapier.com'
  ].filter(Boolean) as string[]
} as const;

// Request types
interface WarmingRequest {
  action: 'warm' | 'critical' | 'smart' | 'deployment' | 'health' | 'scheduler';
  targets?: WarmingTarget[];
  options?: {
    concurrency?: number;
    priorityFilter?: ('critical' | 'high' | 'normal' | 'low')[];
    respectPriorities?: boolean;
  };
  schedulerAction?: 'start' | 'stop' | 'status';
}

/**
 * Verify webhook signature for security
 */
function verifyWebhookSignature(body: string, signature: string): boolean {
  if (!API_CONFIG.WEBHOOK_SECRET || !signature) return false;
  
  const expectedSignature = crypto
    .createHmac('sha256', API_CONFIG.WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
    
  const receivedSignature = signature.startsWith('sha256=') 
    ? signature.slice(7) 
    : signature;
    
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(receivedSignature)
  );
}

/**
 * Verify admin token
 */
function verifyAdminToken(token: string): boolean {
  return Boolean(API_CONFIG.ADMIN_TOKEN && token === API_CONFIG.ADMIN_TOKEN);
}

/**
 * Check if origin is allowed
 */
function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  return API_CONFIG.ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith(allowed.replace(/^https?:\/\//, ''))
  );
}

/**
 * Get client identifier for rate limiting
 */
function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  return `cache-warming:${ip}`;
}

/**
 * Handle GET requests - Health check and status
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const action = searchParams.get('action') || 'health';
    
    // Verify authentication for non-health requests
    if (action !== 'health' && !verifyAdminToken(token || '')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = checkRateLimit(clientId, 'WEBHOOK');
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          resetTime: rateLimit.resetTime
        },
        { status: 429 }
      );
    }
    
    switch (action) {
      case 'health':
        const health = getWarmingHealth();
        return NextResponse.json({
          status: 'ok',
          warming: health,
          scheduler: warmingScheduler.getStatus(),
          timestamp: new Date().toISOString()
        });
        
      case 'targets':
        return NextResponse.json({
          targets: CRITICAL_WARMING_TARGETS.map(t => ({
            type: t.type,
            target: t.target,
            priority: t.priority,
            interval: t.warmInterval
          }))
        });
        
      case 'scheduler':
        return NextResponse.json({
          scheduler: warmingScheduler.getStatus()
        });
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Cache warming GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Handle POST requests - Execute warming operations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const origin = request.headers.get('origin');
    
    // CORS check
    if (origin && !isOriginAllowed(origin)) {
      return NextResponse.json(
        { error: 'Origin not allowed' },
        { status: 403 }
      );
    }
    
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = checkRateLimit(clientId, 'WEBHOOK');
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          resetTime: rateLimit.resetTime
        },
        { status: 429 }
      );
    }
    
    // Authentication
    const authHeader = request.headers.get('authorization');
    const webhookSignature = request.headers.get('x-webhook-signature');
    const isWebhook = !!webhookSignature;
    
    let authenticated = false;
    
    if (isWebhook) {
      // Webhook authentication
      authenticated = verifyWebhookSignature(body, webhookSignature);
    } else if (authHeader?.startsWith('Bearer ')) {
      // Token authentication
      const token = authHeader.slice(7);
      authenticated = verifyAdminToken(token);
    }
    
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse request
    let requestData: WarmingRequest;
    try {
      requestData = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }
    
    console.log('🔥 Cache warming API request:', {
      action: requestData.action,
      isWebhook,
      origin
    });
    
    // Execute warming action
    let result: any;
    
    switch (requestData.action) {
      case 'warm':
        result = await warmCaches(
          requestData.targets || CRITICAL_WARMING_TARGETS,
          requestData.options
        );
        updateWarmingResults(result);
        break;
        
      case 'critical':
        result = await warmCriticalCaches();
        updateWarmingResults(result);
        break;
        
      case 'smart':
        result = await smartWarm();
        updateWarmingResults(result);
        break;
        
      case 'deployment':
        result = await postDeploymentWarm();
        updateWarmingResults(result);
        break;
        
      case 'health':
        result = {
          health: getWarmingHealth(),
          scheduler: warmingScheduler.getStatus()
        };
        break;
        
      case 'scheduler':
        const { schedulerAction } = requestData;
        if (!schedulerAction) {
          return NextResponse.json(
            { error: 'schedulerAction required' },
            { status: 400 }
          );
        }
        
        switch (schedulerAction) {
          case 'start':
            warmingScheduler.start();
            break;
          case 'stop':
            warmingScheduler.stop();
            break;
        }
        
        result = {
          action: schedulerAction,
          status: warmingScheduler.getStatus()
        };
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      success: true,
      action: requestData.action,
      result,
      timestamp: new Date().toISOString(),
      remainingRequests: rateLimit.remainingRequests
    });
    
  } catch (error) {
    console.error('Cache warming API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS requests for CORS
 */
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  
  if (origin && isOriginAllowed(origin)) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Webhook-Signature',
        'Access-Control-Max-Age': '86400'
      }
    });
  }
  
  return new NextResponse(null, { status: 403 });
}