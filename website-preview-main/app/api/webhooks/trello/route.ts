import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { CACHE_TAGS, getCacheInvalidationPaths } from '@/lib/utils/cache';
import { 
  executeRevalidation,
  checkRateLimit,
  WebhookValidator,
  generateRequestId,
  type RevalidationRequest
} from '@/lib/cache/revalidation';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';
const TRELLO_WEBHOOK_SECRET = process.env.TRELLO_WEBHOOK_SECRET || '';

interface TrelloWebhookPayload {
  action: {
    type: string;
    data: {
      card?: { id: string; name: string };
      list?: { id: string; name: string };
      board?: { id: string; name: string };
      old?: any;
    };
    memberCreator: {
      id: string;
      username: string;
      fullName?: string;
    };
    date: string;
  };
  model: {
    id: string;
    name: string;
  };
}

// Enhanced webhook action mappings
const WORKSHOP_ACTIONS = {
  // Card actions that affect workshop availability
  CARD_ACTIONS: [
    'addMemberToCard',
    'removeMemberFromCard', 
    'createCard',
    'deleteCard',
    'updateCard',
    'moveCardToBoard',
    'moveCardFromBoard',
    'copyCard',
    'convertToCardFromCheckItem',
    'archiveCard',
    'unarchiveCard'
  ],
  // List actions that might affect workshop organization
  LIST_ACTIONS: [
    'createList',
    'updateList',
    'moveListToBoard',
    'moveListFromBoard',
    'archiveList',
    'unarchiveList'
  ],
  // Board actions for comprehensive tracking
  BOARD_ACTIONS: [
    'updateBoard',
    'addMemberToBoard',
    'removeMemberFromBoard'
  ]
} as const;

// Handle HEAD requests for Trello webhook verification
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

// Handle GET requests for Trello webhook setup verification
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const verification = searchParams.get('verification');
  
  if (verification) {
    return new NextResponse(verification, { status: 200 });
  }
  
  return NextResponse.json({
    message: 'Trello webhook endpoint active',
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
      console.warn(`Rate limit exceeded for Trello webhook from ${clientIp}`);
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          resetTime: new Date(rateLimitResult.resetTime!).toISOString()
        },
        { status: 429 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get('x-trello-webhook') || '';
    
    // Verify webhook signature using the enhanced validator
    if (!WebhookValidator.verifyWebhook(body, signature, TRELLO_WEBHOOK_SECRET, 'trello')) {
      console.warn('Invalid Trello webhook signature received', {
        ip: clientIp,
        hasSignature: !!signature,
        hasSecret: !!TRELLO_WEBHOOK_SECRET
      });
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    let payload: TrelloWebhookPayload;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      console.error('Invalid JSON in Trello webhook payload:', error);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const { action } = payload;
    const actionType = action.type;
    
    console.log(`Trello webhook received: ${actionType}`, {
      requestId,
      cardName: action.data.card?.name,
      listName: action.data.list?.name,
      boardName: payload.model.name,
      memberCreator: action.memberCreator.fullName || action.memberCreator.username,
      timestamp: action.date
    });

    // Determine revalidation strategy based on action type
    let revalidationRequest: RevalidationRequest | null = null;
    
    // Check if this action affects workshops
    const allWorkshopActions = [
      ...WORKSHOP_ACTIONS.CARD_ACTIONS,
      ...WORKSHOP_ACTIONS.LIST_ACTIONS,
      ...WORKSHOP_ACTIONS.BOARD_ACTIONS
    ];

    if (allWorkshopActions.includes(actionType as any)) {
      // Determine the appropriate revalidation scope
      let targets: string[] = [CACHE_TAGS.WORKSHOPS];
      let cascade = true;
      let priority: 'low' | 'normal' | 'high' = 'normal';

      // High priority for immediate impact actions
      if (['addMemberToCard', 'removeMemberFromCard', 'createCard', 'deleteCard'].includes(actionType as any)) {
        priority = 'high';
        // Also invalidate homepage as it might show workshop availability
        targets.push(CACHE_TAGS.HOMEPAGE);
      }
      
      // Low priority for less impactful actions
      if (WORKSHOP_ACTIONS.BOARD_ACTIONS.includes(actionType as any)) {
        priority = 'low';
        cascade = false; // Board changes might not need cascading
      }

      revalidationRequest = {
        type: 'webhook',
        source: 'trello-webhook',
        targetType: 'tag',
        targets,
        options: {
          cascade,
          priority,
          warmAfter: priority === 'high' // Warm cache for high priority changes
        },
        metadata: {
          ip: clientIp,
          userAgent: request.headers.get('user-agent') || '',
          timestamp: Date.now()
        }
      };
    }

    // Execute revalidation if needed
    let result;
    if (revalidationRequest) {
      result = await executeRevalidation(revalidationRequest);
      
      console.log(`Trello webhook revalidation completed:`, {
        requestId,
        action: actionType,
        success: result.success,
        processingTime: result.data.processingTime
      });
    } else {
      // Action doesn't require revalidation
      result = {
        success: true,
        message: 'Webhook received but no revalidation required',
        data: {
          action: actionType,
          reason: 'Action type does not affect cached content',
          processingTime: Date.now() - startTime
        },
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
          source: 'trello-webhook-skip',
          type: 'webhook'
        }
      };
    }

    return NextResponse.json(result, {
      headers: {
        'X-Request-ID': requestId,
        'X-Webhook-Source': 'trello'
      }
    });

  } catch (error) {
    console.error('Trello webhook processing error:', error, {
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
          source: 'trello-webhook-error',
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