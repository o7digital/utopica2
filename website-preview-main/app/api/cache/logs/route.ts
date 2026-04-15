import { NextRequest, NextResponse } from 'next/server';
import { getRevalidationLogs } from '@/lib/cache/revalidation';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.REVALIDATE_TOKEN;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // Verify admin authentication
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json(
      { error: 'Invalid admin token' },
      { status: 401 }
    );
  }

  try {
    // Parse filter parameters
    const filters: Record<string, any> = {
      type: searchParams.get('type') || undefined,
      source: searchParams.get('source') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50,
      since: searchParams.get('since') || undefined
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    const logs = getRevalidationLogs(filters);
    
    return NextResponse.json({
      success: true,
      data: {
        logs,
        filters: Object.keys(filters).length > 0 ? filters : null,
        total: logs.length
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching revalidation logs:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch revalidation logs',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}