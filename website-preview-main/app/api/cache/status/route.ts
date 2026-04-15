import { NextRequest, NextResponse } from 'next/server';
import { getCacheMetrics } from '@/lib/trello';
import { 
  evaluateCacheHealth, 
  warmCriticalCaches,
  CACHE_PERFORMANCE_CONFIG,
  CACHE_DURATIONS,
  CACHE_TAGS
} from '@/lib/utils/cache';

// Security token for cache status access
const CACHE_STATUS_TOKEN = process.env.CACHE_STATUS_TOKEN || process.env.REVALIDATE_TOKEN || 'your-secret-token';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const action = searchParams.get('action'); // 'status' | 'health' | 'warm'
  
  // Verify authentication token
  if (token !== CACHE_STATUS_TOKEN) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  const startTime = Date.now();
  
  try {
    // Get current cache metrics
    const metrics = getCacheMetrics();
    const total = metrics.hits + metrics.misses;
    
    // Evaluate cache health
    const healthStatus = evaluateCacheHealth({
      hitRatio: metrics.hitRatio,
      avgResponseTime: metrics.avgResponseTime,
      errors: metrics.errors,
      total
    });

    // Handle cache warming action
    if (action === 'warm') {
      const warmingResult = await warmCriticalCaches();
      
      return NextResponse.json({
        success: true,
        action: 'cache_warming',
        result: warmingResult,
        currentMetrics: metrics,
        health: healthStatus,
        timestamp: new Date().toISOString(),
        processingTime: `${Date.now() - startTime}ms`
      });
    }

    // Prepare comprehensive status response
    const statusData = {
      success: true,
      cache: {
        metrics: {
          ...metrics,
          total,
          performance: {
            status: healthStatus.status,
            checks: healthStatus.checks,
            recommendations: healthStatus.recommendations
          }
        },
        configuration: {
          durations: CACHE_DURATIONS,
          tags: Object.values(CACHE_TAGS),
          performance: CACHE_PERFORMANCE_CONFIG
        },
        runtime: {
          uptime: process.uptime(),
          memoryUsage: process.memoryUsage(),
          nodeVersion: process.version,
          environment: process.env.NODE_ENV
        }
      },
      api: {
        responseTime: `${Date.now() - startTime}ms`,
        timestamp: new Date().toISOString(),
        endpoint: '/api/cache/status'
      }
    };

    // Set appropriate cache headers for this endpoint
    const response = NextResponse.json(statusData);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('X-Cache-Status', healthStatus.status);
    response.headers.set('X-Cache-Hit-Ratio', `${metrics.hitRatio.toFixed(1)}%`);
    
    return response;

  } catch (error) {
    console.error('Cache status error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to get cache status',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST endpoint for cache management operations
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  
  if (token !== CACHE_STATUS_TOKEN) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { action, options = {} } = body;

    switch (action) {
      case 'warm_cache':
        const warmingResult = await warmCriticalCaches();
        return NextResponse.json({
          success: true,
          action: 'warm_cache',
          result: warmingResult,
          processingTime: `${Date.now() - startTime}ms`,
          timestamp: new Date().toISOString()
        });

      case 'health_check':
        const metrics = getCacheMetrics();
        const healthStatus = evaluateCacheHealth({
          hitRatio: metrics.hitRatio,
          avgResponseTime: metrics.avgResponseTime,
          errors: metrics.errors,
          total: metrics.hits + metrics.misses
        });
        
        return NextResponse.json({
          success: true,
          action: 'health_check',
          health: healthStatus,
          metrics,
          processingTime: `${Date.now() - startTime}ms`,
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { 
            error: 'Invalid action',
            validActions: ['warm_cache', 'health_check']
          },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Cache management error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Cache management operation failed',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}