import { NextRequest, NextResponse } from 'next/server';
import { getWorkshopsWithFallback, getCacheMetrics } from '@/lib/trello';
import { 
  CACHE_DURATIONS, 
  CACHE_TAGS,
  getOptimizedCacheHeaders,
  generateAdvancedETag
} from '@/lib/utils/cache';

// API Route Configuration
export const runtime = 'nodejs';
export const revalidate = 300; // 5 minutes

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const { searchParams } = new URL(request.url);
  const includeMetrics = searchParams.get('metrics') === 'true';
  
  try {
    // Get workshops with intelligent fallback
    const { workshops, source, metrics } = await getWorkshopsWithFallback();
    
    // Serializar las fechas a string para evitar problemas de serialización
    const serializedWorkshops = workshops.map(workshop => ({
      ...workshop,
      date: workshop.date instanceof Date ? workshop.date.toISOString() : workshop.date
    }));
    
    const responseTime = Date.now() - startTime;
    
    const responseData = {
      success: true,
      data: {
        workshops: serializedWorkshops,
        meta: {
          total: workshops.length,
          source,
          lastUpdated: new Date().toISOString(),
          responseTime: `${responseTime}ms`,
          revalidateIn: CACHE_DURATIONS.WORKSHOPS,
          cached: source === 'cache'
        }
      }
    };

    // Include cache metrics if requested
    if (includeMetrics) {
      (responseData.data.meta as any).cacheMetrics = metrics;
    }
    
    const response = NextResponse.json(responseData);

    // Use advanced cache headers based on source and user agent
    if (source !== 'mock') {
      const userAgent = request.headers.get('user-agent') || '';
      const acceptEncoding = request.headers.get('accept-encoding') || '';
      
      const optimizedHeaders = getOptimizedCacheHeaders('WORKSHOPS', {
        isStatic: false,
        userAgent,
        acceptEncoding
      });
      
      // Apply optimized headers
      optimizedHeaders.forEach((value, key) => {
        response.headers.set(key, value);
      });
    } else {
      // Don't cache mock data
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
    
    // Advanced ETag with content metadata
    const etag = generateAdvancedETag(serializedWorkshops, {
      source,
      timestamp: Date.now(),
      version: '2.0'
    });
    response.headers.set('ETag', etag);
    
    // Performance and debugging headers
    response.headers.set('X-Cache-Tags', CACHE_TAGS.WORKSHOPS);
    response.headers.set('X-Data-Source', source);
    response.headers.set('X-Response-Time', `${responseTime}ms`);
    response.headers.set('X-Cache-Hit-Ratio', `${metrics.hitRatio.toFixed(1)}%`);
    response.headers.set('X-API-Version', '2.0');
    
    // Cache warming hint
    if (request.headers.get('x-cache-warming') === 'true') {
      response.headers.set('X-Cache-Warmed', 'true');
    }
    
    return response;
  } catch (error) {
    console.error('Error in workshops API:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: {
          code: 'WORKSHOPS_API_ERROR',
          message: 'Error al obtener talleres',
          timestamp: new Date().toISOString()
        }
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Error': 'true'
        }
      }
    );
  }
}