import { NextRequest, NextResponse } from 'next/server';
import { getRevalidationStats } from '@/lib/cache/revalidation';

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
    const stats = getRevalidationStats();
    
    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching cache stats:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch cache statistics',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}