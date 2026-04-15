import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { CACHE_TAGS, getCacheInvalidationPaths } from '@/lib/utils/cache';
import { resetCacheMetrics } from '@/lib/trello';
import { 
  executeRevalidation,
  checkRateLimit,
  WebhookValidator,
  REVALIDATION_CONFIG,
  generateRequestId,
  type RevalidationRequest
} from '@/lib/cache/revalidation';

// Security tokens for different types of revalidation
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || 'your-secret-token';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret';
const TRELLO_WEBHOOK_SECRET = process.env.TRELLO_WEBHOOK_SECRET || '';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.REVALIDATE_TOKEN;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  const requestId = generateRequestId();
  
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'manual'; // 'manual' | 'webhook' | 'admin'
    
    // Handle different types of requests with appropriate rate limiting
    const rateLimitType = type === 'webhook' ? 'WEBHOOK' : type === 'admin' ? 'ADMIN' : 'MANUAL';
    const rateLimitResult = checkRateLimit(clientIp, rateLimitType);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          resetTime: new Date(rateLimitResult.resetTime!).toISOString(),
          remainingRequests: rateLimitResult.remainingRequests
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': REVALIDATION_CONFIG.RATE_LIMIT.MAX_REQUESTS[rateLimitType].toString(),
            'X-RateLimit-Remaining': rateLimitResult.remainingRequests!.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime!.toString()
          }
        }
      );
    }

    // Handle webhook requests with enhanced security
    if (type === 'webhook') {
      const body = await request.text();
      const signature = request.headers.get('x-trello-webhook') || 
                       request.headers.get('x-hub-signature-256') || 
                       request.headers.get('x-webhook-signature') || '';
      const webhookProvider = searchParams.get('provider') || 'trello';
      
      // Verify webhook signature based on provider
      let secret = '';
      switch (webhookProvider) {
        case 'trello':
          secret = TRELLO_WEBHOOK_SECRET;
          break;
        case 'github':
          secret = process.env.GITHUB_WEBHOOK_SECRET || '';
          break;
        default:
          secret = WEBHOOK_SECRET;
      }
      
      if (!WebhookValidator.verifyWebhook(body, signature, secret, webhookProvider as any)) {
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 401 }
        );
      }

      // Parse webhook payload
      let webhookData;
      try {
        webhookData = JSON.parse(body);
      } catch {
        return NextResponse.json(
          { error: 'Invalid webhook payload' },
          { status: 400 }
        );
      }

      // Create revalidation request for webhook
      const revalidationRequest: RevalidationRequest = {
        type: 'webhook',
        source: `${webhookProvider}-webhook`,
        targetType: 'tag',
        targets: [CACHE_TAGS.WORKSHOPS],
        options: {
          cascade: true,
          priority: 'normal'
        },
        metadata: {
          ip: clientIp,
          userAgent,
          timestamp: Date.now()
        }
      };

      // Determine what to revalidate based on webhook action
      if (webhookProvider === 'trello') {
        const action = webhookData.action?.type;
        const workshopActions = [
          'addMemberToCard', 'removeMemberFromCard', 'createCard', 'deleteCard',
          'updateCard', 'moveCardToBoard', 'moveCardFromBoard', 'copyCard',
          'convertToCardFromCheckItem', 'createList', 'updateList'
        ];
        
        if (action && workshopActions.includes(action)) {
          const result = await executeRevalidation(revalidationRequest);
          return NextResponse.json(result);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Webhook received but no action required',
        data: {
          action: webhookData.action?.type || 'unknown',
          provider: webhookProvider,
          processingTime: Date.now() - startTime
        },
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
          source: `${webhookProvider}-webhook`,
          type: 'webhook'
        }
      });
    }

    // Handle manual/admin requests - parse JSON body for advanced options
    let requestBody;
    try {
      const bodyText = await request.text();
      requestBody = bodyText ? JSON.parse(bodyText) : {};
    } catch {
      requestBody = {};
    }

    // Legacy URL parameter support
    const token = searchParams.get('token') || requestBody.token;
    const path = searchParams.get('path') || requestBody.path;
    const tag = searchParams.get('tag') || requestBody.tag;
    const resetMetrics = searchParams.get('reset_metrics') === 'true' || requestBody.resetMetrics;

    // Verify authentication token
    const isAdmin = token === ADMIN_TOKEN;
    const isValidManual = token === REVALIDATE_TOKEN;
    
    if (!isValidManual && !isAdmin) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    // Reset cache metrics if requested (admin only)
    if (resetMetrics && isAdmin) {
      resetCacheMetrics();
    }

    // Create revalidation request
    let revalidationRequest: RevalidationRequest;

    if (requestBody.type && requestBody.targetType) {
      // Advanced request format
      revalidationRequest = {
        type: type as any,
        source: isAdmin ? 'admin-dashboard' : 'manual-api',
        targetType: requestBody.targetType,
        targets: requestBody.targets,
        options: {
          cascade: requestBody.options?.cascade ?? true,
          warmAfter: requestBody.options?.warmAfter ?? false,
          priority: requestBody.options?.priority || 'normal',
          batchSize: requestBody.options?.batchSize || REVALIDATION_CONFIG.BATCH.MAX_SIZE
        },
        metadata: {
          ip: clientIp,
          userAgent,
          timestamp: Date.now()
        }
      };
    } else {
      // Legacy format - convert to new format
      if (path) {
        revalidationRequest = {
          type: 'manual',
          source: 'legacy-api',
          targetType: 'path',
          targets: [path],
          options: { cascade: false },
          metadata: { ip: clientIp, userAgent, timestamp: Date.now() }
        };
      } else if (tag) {
        revalidationRequest = {
          type: 'manual',
          source: 'legacy-api',
          targetType: 'tag',
          targets: [tag],
          options: { cascade: true },
          metadata: { ip: clientIp, userAgent, timestamp: Date.now() }
        };
      } else {
        revalidationRequest = {
          type: 'manual',
          source: 'legacy-api',
          targetType: 'all',
          options: { cascade: true },
          metadata: { ip: clientIp, userAgent, timestamp: Date.now() }
        };
      }
    }

    // Execute revalidation
    const result = await executeRevalidation(revalidationRequest);
    
    return NextResponse.json(result, {
      headers: {
        'X-Request-ID': requestId,
        'X-RateLimit-Remaining': rateLimitResult.remainingRequests!.toString()
      }
    });

  } catch (error) {
    console.error('Revalidation endpoint error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Revalidation request failed',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined,
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
          source: 'error',
          type: 'error'
        }
      },
      { 
        status: 500,
        headers: {
          'X-Request-ID': requestId
        }
      }
    );
  }
}

// GET endpoint for system status and documentation
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const action = searchParams.get('action') || 'status';

  // Check authentication
  const isAdmin = token === ADMIN_TOKEN;
  const isValidToken = token === REVALIDATE_TOKEN || isAdmin;

  if (!isValidToken) {
    return NextResponse.json(
      { error: 'Invalid authentication token' },
      { status: 401 }
    );
  }

  switch (action) {
    case 'status':
      return NextResponse.json({
        message: 'Advanced Revalidation System - Online',
        version: '2.0.0',
        status: 'healthy',
        endpoints: {
          revalidation: {
            path: 'POST /api/revalidate',
            description: 'Main revalidation endpoint with advanced features',
            formats: {
              legacy: {
                revalidatePath: 'POST /api/revalidate?token=TOKEN&path=/path',
                revalidateTag: 'POST /api/revalidate?token=TOKEN&tag=tag-name',
                revalidateAll: 'POST /api/revalidate?token=TOKEN'
              },
              advanced: {
                selective: 'POST /api/revalidate with JSON body',
                batch: 'POST /api/revalidate with targets array',
                cascading: 'POST /api/revalidate with cascade options'
              }
            }
          },
          webhooks: {
            trello: 'POST /api/revalidate?type=webhook&provider=trello',
            github: 'POST /api/revalidate?type=webhook&provider=github',
            generic: 'POST /api/revalidate?type=webhook&provider=generic'
          },
          ...(isAdmin && {
            admin: {
              stats: 'GET /api/cache/stats?token=ADMIN_TOKEN',
              logs: 'GET /api/cache/logs?token=ADMIN_TOKEN',
              dashboard: '/admin/cache'
            }
          })
        },
        availableTargets: {
          tags: Object.values(CACHE_TAGS),
          paths: getCacheInvalidationPaths('all')
        },
        security: {
          rateLimits: {
            manual: `${REVALIDATION_CONFIG.RATE_LIMIT.MAX_REQUESTS.MANUAL} req/min`,
            webhook: `${REVALIDATION_CONFIG.RATE_LIMIT.MAX_REQUESTS.WEBHOOK} req/min`,
            admin: `${REVALIDATION_CONFIG.RATE_LIMIT.MAX_REQUESTS.ADMIN} req/min`
          },
          authentication: {
            webhookSignatureRequired: true,
            supportedProviders: ['trello', 'github', 'generic']
          }
        },
        features: {
          cascadeRevalidation: true,
          batchProcessing: true,
          cacheWarming: true,
          advancedLogging: true,
          queueSystem: true,
          realTimeStats: isAdmin
        },
        timestamp: new Date().toISOString()
      });

    case 'config':
      if (!isAdmin) {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      }
      
      return NextResponse.json({
        rateLimits: REVALIDATION_CONFIG.RATE_LIMIT,
        batch: REVALIDATION_CONFIG.BATCH,
        security: REVALIDATION_CONFIG.SECURITY,
        environment: {
          hasRevalidateToken: !!REVALIDATE_TOKEN,
          hasAdminToken: !!ADMIN_TOKEN,
          hasTrelloSecret: !!TRELLO_WEBHOOK_SECRET,
          hasWebhookSecret: !!WEBHOOK_SECRET,
          nodeEnv: process.env.NODE_ENV
        }
      });

    case 'health':
      return NextResponse.json({
        status: 'healthy',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
      });

    default:
      return NextResponse.json(
        { error: 'Invalid action parameter' },
        { status: 400 }
      );
  }
}