'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';

interface PerformanceContextValue {
  preloadedData: Set<string>;
}

const PerformanceContext = createContext<PerformanceContextValue>({
  preloadedData: new Set()
});

export function usePerformance() {
  return useContext(PerformanceContext);
}

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const preloadedData = useRef(new Set<string>());
  const hasPreloaded = useRef(false);

  useEffect(() => {
    // Preload critical data only once
    if (!hasPreloaded.current) {
      hasPreloaded.current = true;
      
      // Preload workshops removed - not needed

      // Preload other critical resources
      if (typeof window !== 'undefined') {
        // Preload important images
        const criticalImages = [
          '/images/kit-claridad-screenshot.png'
        ];
        
        criticalImages.forEach(src => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
        });

        // Prefetch likely navigation targets
        const prefetchUrls = [
          '/api/workshops'
        ];
        
        prefetchUrls.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          document.head.appendChild(link);
        });

        // Setup performance monitoring
        if ('performance' in window && 'observe' in PerformanceObserver.prototype) {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'navigation') {
                const navEntry = entry as PerformanceNavigationTiming;
                console.log('🚀 Performance metrics:', {
                  TTFB: navEntry.responseStart - navEntry.fetchStart,
                  domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
                  loadComplete: navEntry.loadEventEnd - navEntry.fetchStart
                });
              }
            }
          });
          
          try {
            observer.observe({ entryTypes: ['navigation'] });
          } catch (e) {
            console.warn('Performance Observer not supported');
          }
        }
      }
    }
  }, []);

  const contextValue: PerformanceContextValue = {
    preloadedData: preloadedData.current
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}