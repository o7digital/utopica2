import { getUpcomingWorkshops } from '@/lib/trello';
import { unstable_cache } from 'next/cache';

// Server-side preload functions for critical data
// These run during SSR/SSG to warm up the cache

// Cache workshops data on the server
export const getCachedWorkshops = unstable_cache(
  async () => {
    try {
      const workshops = await getUpcomingWorkshops();
      return {
        workshops,
        timestamp: Date.now(),
        success: true
      };
    } catch (error) {
      console.error('Server preload error for workshops:', error);
      return {
        workshops: [],
        timestamp: Date.now(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },
  ['workshops-cache'],
  {
    revalidate: 300, // 5 minutes
    tags: ['workshops']
  }
);

// Preload function that can be called in page components
export async function preloadCriticalData() {
  try {
    // Preload workshops data
    const workshopsPromise = getCachedWorkshops();
    
    // Add other critical data preloads here
    // const otherDataPromise = getCachedOtherData();
    
    // Wait for all critical data
    const [workshopsData] = await Promise.all([
      workshopsPromise
      // otherDataPromise
    ]);
    
    return {
      workshops: workshopsData,
      preloadedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Critical data preload failed:', error);
    return {
      workshops: { workshops: [], timestamp: Date.now(), success: false },
      preloadedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Revalidate function to manually refresh cache
export async function revalidateWorkshops() {
  const { revalidateTag } = await import('next/cache');
  revalidateTag('workshops');
}