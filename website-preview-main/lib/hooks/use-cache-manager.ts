'use client';

import { useState, useEffect, useCallback } from 'react';
import { CACHE_TAGS, getCacheInvalidationPaths } from '@/lib/utils/cache';
import type { RevalidationLog } from '@/lib/cache/revalidation';

export interface CacheStats {
  totalOperations: number;
  successRate: number;
  averageProcessingTime: number;
  recentActivity: RevalidationLog[];
  rateLimitStatus: { [key: string]: number };
  queueStatus: { pending: number; processing: boolean };
}

export interface CacheOperation {
  id: string;
  type: 'path' | 'tag' | 'all' | 'selective';
  targets?: string[];
  status: 'pending' | 'loading' | 'success' | 'error';
  message?: string;
  timestamp: string;
  processingTime?: number;
}

export interface UseCacheManagerReturn {
  // State
  stats: CacheStats | null;
  operations: CacheOperation[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  revalidatePath: (path: string, options?: { warmAfter?: boolean }) => Promise<void>;
  revalidateTag: (tag: string, options?: { cascade?: boolean; warmAfter?: boolean }) => Promise<void>;
  revalidateAll: (options?: { warmAfter?: boolean }) => Promise<void>;
  selectiveRevalidate: (targets: string[], options?: { cascade?: boolean; warmAfter?: boolean }) => Promise<void>;
  
  // Data management
  refreshStats: () => Promise<void>;
  clearOperations: () => void;
  
  // Utilities
  getAvailableTags: () => string[];
  getAvailablePaths: () => string[];
  testWebhook: (url: string) => Promise<boolean>;
}

export function useCacheManager(): UseCacheManagerReturn {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [operations, setOperations] = useState<CacheOperation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate operation ID
  const generateOperationId = useCallback(() => {
    return `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Add operation to tracking
  const addOperation = useCallback((operation: Omit<CacheOperation, 'id' | 'timestamp'>) => {
    const newOperation: CacheOperation = {
      ...operation,
      id: generateOperationId(),
      timestamp: new Date().toISOString()
    };
    
    setOperations(prev => [newOperation, ...prev.slice(0, 19)]); // Keep last 20 operations
    return newOperation.id;
  }, [generateOperationId]);

  // Update operation status
  const updateOperation = useCallback((id: string, updates: Partial<CacheOperation>) => {
    setOperations(prev => prev.map(op => 
      op.id === id ? { ...op, ...updates } : op
    ));
  }, []);

  // Generic revalidation function
  const executeRevalidation = useCallback(async (
    type: 'path' | 'tag' | 'all' | 'selective',
    params: any,
    options: any = {}
  ) => {
    const operationId = addOperation({
      type,
      targets: type === 'all' ? undefined : (Array.isArray(params) ? params : [params]),
      status: 'loading'
    });

    try {
      const token = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;
      if (!token) {
        throw new Error('Revalidation token not configured');
      }

      let url = `/api/revalidate?token=${token}`;
      let body: any = {
        type: 'manual',
        source: 'admin-dashboard',
        targetType: type,
        options
      };

      if (type === 'path') {
        body.targets = [params];
      } else if (type === 'tag') {
        body.targets = [params];
      } else if (type === 'selective') {
        body.targets = params;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const result = await response.json();
      
      updateOperation(operationId, {
        status: 'success',
        message: result.message,
        processingTime: result.processingTime ? parseInt(result.processingTime) : undefined
      });

      // Refresh stats after successful operation
      await refreshStats();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      updateOperation(operationId, {
        status: 'error',
        message: errorMessage
      });
      
      setError(errorMessage);
      throw err;
    }
  }, [addOperation, updateOperation]);

  // Revalidate specific path
  const revalidatePath = useCallback(async (path: string, options: { warmAfter?: boolean } = {}) => {
    await executeRevalidation('path', path, options);
  }, [executeRevalidation]);

  // Revalidate by tag
  const revalidateTag = useCallback(async (tag: string, options: { cascade?: boolean; warmAfter?: boolean } = {}) => {
    await executeRevalidation('tag', tag, options);
  }, [executeRevalidation]);

  // Revalidate all cache
  const revalidateAll = useCallback(async (options: { warmAfter?: boolean } = {}) => {
    await executeRevalidation('all', null, options);
  }, [executeRevalidation]);

  // Selective revalidation
  const selectiveRevalidate = useCallback(async (targets: string[], options: { cascade?: boolean; warmAfter?: boolean } = {}) => {
    await executeRevalidation('selective', targets, options);
  }, [executeRevalidation]);

  // Refresh stats from server
  const refreshStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;
      if (!token) {
        throw new Error('Revalidation token not configured');
      }

      const response = await fetch(`/api/cache/stats?token=${token}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.status}`);
      }

      const data = await response.json();
      setStats(data);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh stats';
      setError(errorMessage);
      console.error('Error refreshing cache stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear operations history
  const clearOperations = useCallback(() => {
    setOperations([]);
    setError(null);
  }, []);

  // Get available cache tags
  const getAvailableTags = useCallback(() => {
    return Object.values(CACHE_TAGS);
  }, []);

  // Get available paths for revalidation
  const getAvailablePaths = useCallback(() => {
    return getCacheInvalidationPaths('all');
  }, []);

  // Test webhook endpoint
  const testWebhook = useCallback(async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Cache-Manager-Test/1.0'
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error('Webhook test failed:', error);
      return false;
    }
  }, []);

  // Auto-refresh stats on mount and periodically
  useEffect(() => {
    refreshStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(refreshStats, 30000);
    
    return () => clearInterval(interval);
  }, [refreshStats]);

  // Clear error after some time
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return {
    // State
    stats,
    operations,
    isLoading,
    error,
    
    // Actions
    revalidatePath,
    revalidateTag,
    revalidateAll,
    selectiveRevalidate,
    
    // Data management
    refreshStats,
    clearOperations,
    
    // Utilities
    getAvailableTags,
    getAvailablePaths,
    testWebhook
  };
}

// Custom hook for real-time cache monitoring
export function useCacheMonitor(refreshInterval: number = 10000) {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitoringData, setMonitoringData] = useState<{
    timestamp: string;
    stats: CacheStats;
  }[]>([]);

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
  }, []);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(async () => {
      try {
        const token = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;
        if (!token) return;

        const response = await fetch(`/api/cache/stats?token=${token}`);
        if (!response.ok) return;

        const stats = await response.json();
        
        setMonitoringData(prev => [
          {
            timestamp: new Date().toISOString(),
            stats
          },
          ...prev.slice(0, 99) // Keep last 100 data points
        ]);
        
      } catch (error) {
        console.error('Monitoring error:', error);
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isMonitoring, refreshInterval]);

  const clearMonitoringData = useCallback(() => {
    setMonitoringData([]);
  }, []);

  return {
    isMonitoring,
    monitoringData,
    startMonitoring,
    stopMonitoring,
    clearMonitoringData
  };
}