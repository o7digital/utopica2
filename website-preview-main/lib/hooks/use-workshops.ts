'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Workshop } from '@/lib/trello';

interface WorkshopData {
  workshops: Workshop[];
  lastUpdated: string;
  cached?: boolean;
  mock?: boolean;
}

interface UseWorkshopsOptions {
  preload?: boolean;
  staleTime?: number; // Time in ms before data is considered stale
  cacheTime?: number; // Time in ms to keep data in cache
  refetchOnMount?: boolean;
}

interface UseWorkshopsReturn {
  workshops: Workshop[];
  nextWorkshop: Workshop | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
  isStale: boolean;
  isCached: boolean;
}

// Global cache for workshops data
let workshopsCache: {
  data: WorkshopData | null;
  timestamp: number;
  promise: Promise<WorkshopData> | null;
} = {
  data: null,
  timestamp: 0,
  promise: null
};

const DEFAULT_OPTIONS: Required<UseWorkshopsOptions> = {
  preload: false,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnMount: true
};

async function fetchWorkshops(): Promise<WorkshopData> {
  // Prevent duplicate requests
  if (workshopsCache.promise) {
    return workshopsCache.promise;
  }

  workshopsCache.promise = (async () => {
    try {
      const timestamp = Date.now();
      const response = await fetch(`/api/workshops?t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WorkshopData = await response.json();
      
      // Update cache
      workshopsCache.data = data;
      workshopsCache.timestamp = Date.now();
      workshopsCache.promise = null;

      return data;
    } catch (error) {
      workshopsCache.promise = null;
      throw error;
    }
  })();

  return workshopsCache.promise;
}

// Preload function for critical data
export function preloadWorkshops(): Promise<WorkshopData> {
  return fetchWorkshops();
}

export function useWorkshops(options: UseWorkshopsOptions = {}): UseWorkshopsReturn {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if cached data is still valid
  const isDataStale = useMemo(() => {
    if (!workshopsCache.data || !workshopsCache.timestamp) return true;
    return Date.now() - workshopsCache.timestamp > opts.staleTime;
  }, [opts.staleTime]);

  const isDataExpired = useMemo(() => {
    if (!workshopsCache.data || !workshopsCache.timestamp) return true;
    return Date.now() - workshopsCache.timestamp > opts.cacheTime;
  }, [opts.cacheTime]);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      
      // Use cached data if available and not expired
      if (workshopsCache.data && !isDataExpired) {
        setLoading(false);
        return;
      }

      setLoading(true);
      await fetchWorkshops();
      setLoading(false);
    } catch (err) {
      console.error('Error fetching workshops:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, [isDataExpired]);

  const refetch = useCallback(async () => {
    // Force refetch by clearing cache
    workshopsCache.data = null;
    workshopsCache.timestamp = 0;
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Preload data if requested
    if (opts.preload) {
      preloadWorkshops().catch(console.error);
    }

    // Fetch data on mount or if stale
    if (opts.refetchOnMount || isDataStale) {
      fetchData();
    } else if (workshopsCache.data) {
      setLoading(false);
    }
  }, [opts.preload, opts.refetchOnMount, isDataStale, fetchData]);

  // Parse workshops data
  const workshops = useMemo(() => {
    if (!workshopsCache.data?.workshops) return [];
    
    return workshopsCache.data.workshops.map(workshop => ({
      ...workshop,
      date: new Date(workshop.date)
    }));
  }, [workshopsCache.data]);

  // Get next workshop
  const nextWorkshop = useMemo(() => {
    const upcoming = workshops.filter(w => w.status === 'upcoming');
    return upcoming.length > 0 ? upcoming[0] : null;
  }, [workshops]);

  const lastUpdated = useMemo(() => {
    if (!workshopsCache.data?.lastUpdated) return null;
    return new Date(workshopsCache.data.lastUpdated);
  }, [workshopsCache.data]);

  return {
    workshops,
    nextWorkshop,
    loading,
    error,
    lastUpdated,
    refetch,
    isStale: isDataStale,
    isCached: !!workshopsCache.data?.cached
  };
}

// Clean up cache when needed
export function clearWorkshopsCache(): void {
  workshopsCache.data = null;
  workshopsCache.timestamp = 0;
  workshopsCache.promise = null;
}