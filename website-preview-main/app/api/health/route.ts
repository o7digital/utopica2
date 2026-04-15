import { NextRequest, NextResponse } from 'next/server';
import { getCacheMetrics } from '@/lib/trello';
import { CACHE_DURATIONS } from '@/lib/utils/cache';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeCache = searchParams.get('cache') === 'true';
  
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      hasGeminiKey: !!process.env.GOOGLE_GEMINI_API_KEY,
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasFirecrawlKey: !!process.env.FIRECRAWL_API_KEY,
      hasTrelloCredentials: !!(process.env.TRELLO_API_KEY && process.env.TRELLO_TOKEN),
      hasTrelloBoardId: !!process.env.TRELLO_BOARD_ID,
      resendFrom: process.env.RESEND_FROM_EMAIL || 'not configured',
      appUrl: process.env.NEXT_PUBLIC_APP_URL || 'not configured',
      nodeEnv: process.env.NODE_ENV
    },
    cache: includeCache ? {
      ...getCacheMetrics(),
      configuration: {
        workshopsCacheDuration: CACHE_DURATIONS.WORKSHOPS,
        homepageCacheDuration: CACHE_DURATIONS.HOMEPAGE,
        sprintCacheDuration: CACHE_DURATIONS.SPRINT
      }
    } : undefined,
    performance: {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      nodeVersion: process.version
    }
  };

  const response = NextResponse.json(status);
  
  // Health check should not be cached
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('X-Health-Check', 'true');
  
  return response;
}