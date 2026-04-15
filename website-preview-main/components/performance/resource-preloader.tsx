'use client';

import { useEffect } from 'react';
import { 
  shouldPreloadResource,
  PAGE_PRELOAD_CONFIG,
  type ResourceType 
} from '@/lib/utils/preload';
import { preloadManager } from '@/lib/utils/preload-client';

interface ResourcePreloaderProps {
  pageType?: keyof typeof PAGE_PRELOAD_CONFIG;
  criticalImages?: string[];
  prefetchUrls?: string[];
  preloadFonts?: string[];
  externalDomains?: string[];
  enableSmartPreloading?: boolean;
}

export function ResourcePreloader({
  pageType,
  criticalImages = [],
  prefetchUrls = [],
  preloadFonts = [],
  externalDomains = [],
  enableSmartPreloading = true
}: ResourcePreloaderProps) {
  useEffect(() => {
    // Check if we should preload based on connection and device
    if (!shouldPreloadResource() && enableSmartPreloading) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚫 Preloading disabled due to connection/device constraints');
      }
      return;
    }

    // Use page-based preloading if pageType is provided
    if (pageType && preloadManager) {
      preloadManager.preloadPageResources(pageType);
    }

    // Preload critical resources
    if (preloadManager) {
      preloadManager.preloadCriticalResources();
    }

    // Handle external domains using the manual functions
    if (externalDomains.length > 0) {
      import('@/lib/utils/preload').then(({ dnsPrefetch, preconnect }) => {
        externalDomains.forEach(domain => {
          dnsPrefetch(domain);
          preconnect(domain);
        });
      });
    }

    // Legacy support for manual configuration
    if (criticalImages.length > 0 || prefetchUrls.length > 0 || preloadFonts.length > 0) {
      // Import the manual preload functions
      import('@/lib/utils/preload').then(({ preloadResource, prefetchResource, preloadApiResponse }) => {
        // Preload critical images
        criticalImages.forEach(src => {
          preloadResource(src, 'image', undefined, undefined, { fetchpriority: 'high' });
        });

        // Preload critical fonts
        preloadFonts.forEach(src => {
          preloadResource(src, 'font', 'font/woff2', 'anonymous');
        });

        // Prefetch likely navigation targets
        prefetchUrls.forEach(url => {
          if (url.startsWith('/api/')) {
            // API endpoints should be preloaded, not prefetched
            preloadApiResponse(url);
          } else {
            prefetchResource(url);
          }
        });
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Advanced resource preloader initialized', {
        pageType,
        smartPreloading: enableSmartPreloading,
        shouldPreload: shouldPreloadResource(),
        legacyConfig: {
          images: criticalImages.length,
          fonts: preloadFonts.length,
          prefetch: prefetchUrls.length
        }
      });
    }
  }, [pageType, criticalImages, prefetchUrls, preloadFonts, externalDomains, enableSmartPreloading]);

  return null; // This component doesn't render anything
}

// Page-specific preloader components
export function HomepageResourcePreloader() {
  return (
    <ResourcePreloader
      pageType="homepage"
      externalDomains={[
        'fonts.googleapis.com',
        'fonts.gstatic.com'
      ]}
    />
  );
}

export function SprintResourcePreloader() {
  return (
    <ResourcePreloader
      pageType="sprint"
      externalDomains={[
        'calendly.com'
      ]}
    />
  );
}

export function BlogResourcePreloader() {
  return (
    <ResourcePreloader
      pageType="blog"
    />
  );
}

export function TeamResourcePreloader() {
  return (
    <ResourcePreloader
      pageType="team"
    />
  );
}

// Universal preloader for any page
export function UniversalResourcePreloader({ 
  pageType 
}: { 
  pageType: keyof typeof PAGE_PRELOAD_CONFIG 
}) {
  return (
    <ResourcePreloader
      pageType={pageType}
      externalDomains={[
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'vercel.com'
      ]}
      enableSmartPreloading={true}
    />
  );
}