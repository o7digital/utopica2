import { NextRequest, NextResponse } from 'next/server';
import { 
  executeRevalidation,
  checkRateLimit,
  WebhookValidator,
  generateRequestId,
  type RevalidationRequest
} from '@/lib/cache/revalidation';
import { CACHE_TAGS } from '@/lib/utils/cache';

const GENERIC_WEBHOOK_SECRET = process.env.GENERIC_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET || '';

interface GenericWebhookPayload {
  action: string;
  target?: string;
  targets?: string[];
  cascade?: boolean;
  warmAfter?: boolean;
  priority?: 'low' | 'normal' | 'high';
  metadata?: any;
}

// Handle HEAD requests for webhook verification
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

// Handle GET requests for webhook status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const verification = searchParams.get('verification');
  
  if (verification) {
    return new NextResponse(verification, { status: 200 });
  }
  
  return NextResponse.json({
    message: 'Generic webhook endpoint active',
    supportedActions: [
      'revalidate_path',
      'revalidate_tag', 
      'revalidate_all',
      'revalidate_selective'
    ],
    requiredHeaders: [
      'x-webhook-signature',
      'content-type: application/json'
    ],
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const requestId = generateRequestId();
  
  try {
    // Rate limiting for webhook requests
    const rateLimitResult = checkRateLimit(clientIp, 'WEBHOOK');
    
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for generic webhook from ${clientIp}`);
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          resetTime: new Date(rateLimitResult.resetTime!).toISOString()
        },
        { status: 429 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get('x-webhook-signature') || 
                     request.headers.get('x-hub-signature-256') || '';
    
    // Verify webhook signature
    if (!WebhookValidator.verifyWebhook(body, signature, GENERIC_WEBHOOK_SECRET, 'generic')) {
      console.warn('Invalid generic webhook signature received', {
        ip: clientIp,
        hasSignature: !!signature,
        hasSecret: !!GENERIC_WEBHOOK_SECRET
      });
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    let payload: GenericWebhookPayload;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      console.error('Invalid JSON in generic webhook payload:', error);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const { action, target, targets, cascade = true, warmAfter = false, priority = 'normal' } = payload;
    
    console.log(`Generic webhook received: ${action}`, {
      requestId,
      target,
      targets,
      cascade,
      warmAfter,
      priority
    });

    // Create revalidation request based on action
    let revalidationRequest: RevalidationRequest;
    
    switch (action) {
      case 'revalidate_path':
        if (!target) {
          return NextResponse.json(
            { error: 'Target path is required for revalidate_path action' },
            { status: 400 }
          );
        }
        revalidationRequest = {
          type: 'webhook',
          source: 'generic-webhook',
          targetType: 'path',
          targets: [target],
          options: { cascade: false, warmAfter, priority },
          metadata: {
            ip: clientIp,
            userAgent: request.headers.get('user-agent') || '',
            timestamp: Date.now()
          }
        };
        break;
        
      case 'revalidate_tag':
        if (!target) {
          return NextResponse.json(
            { error: 'Target tag is required for revalidate_tag action' },
            { status: 400 }
          );
        }
        revalidationRequest = {
          type: 'webhook',
          source: 'generic-webhook',
          targetType: 'tag',
          targets: [target],
          options: { cascade, warmAfter, priority },
          metadata: {
            ip: clientIp,
            userAgent: request.headers.get('user-agent') || '',
            timestamp: Date.now()
          }
        };
        break;
        
      case 'revalidate_selective':
        if (!targets || targets.length === 0) {
          return NextResponse.json(
            { error: 'Targets array is required for revalidate_selective action' },
            { status: 400 }
          );
        }
        revalidationRequest = {
          type: 'webhook',
          source: 'generic-webhook',
          targetType: 'selective',
          targets,
          options: { cascade, warmAfter, priority },
          metadata: {
            ip: clientIp,
            userAgent: request.headers.get('user-agent') || '',
            timestamp: Date.now()
          }
        };
        break;
        
      case 'revalidate_all':
        revalidationRequest = {
          type: 'webhook',
          source: 'generic-webhook',
          targetType: 'all',
          options: { cascade, warmAfter, priority },
          metadata: {
            ip: clientIp,
            userAgent: request.headers.get('user-agent') || '',
            timestamp: Date.now()
          }
        };
        break;
        
      default:
        return NextResponse.json(
          { 
            error: 'Invalid action',
            supportedActions: ['revalidate_path', 'revalidate_tag', 'revalidate_selective', 'revalidate_all']
          },
          { status: 400 }
        );
    }

    // Execute revalidation
    const result = await executeRevalidation(revalidationRequest);
    
    console.log(`Generic webhook revalidation completed:`, {
      requestId,
      action,
      success: result.success,
      processingTime: result.data.processingTime
    });

    return NextResponse.json(result, {
      headers: {
        'X-Request-ID': requestId,
        'X-Webhook-Source': 'generic'
      }
    });

  } catch (error) {
    console.error('Generic webhook processing error:', error, {
      requestId,
      ip: clientIp
    });
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Webhook processing failed',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined,
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
          source: 'generic-webhook-error',
          type: 'webhook'
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