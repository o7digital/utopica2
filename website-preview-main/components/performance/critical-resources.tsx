/**
 * Critical Resources Component
 * 
 * This component handles the preloading of critical resources that should be
 * loaded as early as possible in the page lifecycle. It's designed to be
 * included in the layout or specific pages for optimal performance.
 */

import { PAGE_PRELOAD_CONFIG, type CrossOrigin } from '@/lib/utils/preload-types';
import { createResourceHints } from '@/lib/utils/preload';

interface CriticalResourcesProps {
  pageType: keyof typeof PAGE_PRELOAD_CONFIG;
  additionalPreloads?: Array<{
    href: string;
    as: string;
    type?: string;
    crossorigin?: string;
    fetchpriority?: 'high' | 'low' | 'auto';
  }>;
  additionalPrefetch?: string[];
  externalDomains?: string[];
}

/**
 * Server component that generates critical resource hints
 * This runs during SSR and adds the resource hints to the document head
 */
export function CriticalResources({
  pageType,
  additionalPreloads = [],
  additionalPrefetch = [],
  externalDomains = []
}: CriticalResourcesProps) {
  // Generate resource hints based on page type
  const resourceHints = createResourceHints(pageType);
  
  // Add additional preloads if specified
  const allPreloads = [
    ...resourceHints.filter(hint => hint.rel === 'preload'),
    ...additionalPreloads.map(preload => ({
      rel: 'preload',
      href: preload.href,
      as: preload.as,
      type: preload.type,
      crossorigin: preload.crossorigin,
      fetchpriority: preload.fetchpriority
    }))
  ];
  
  // Add additional prefetch if specified
  const allPrefetch = [
    ...resourceHints.filter(hint => hint.rel === 'prefetch'),
    ...additionalPrefetch.map(href => ({ rel: 'prefetch', href }))
  ];
  
  return (
    <>
      {/* DNS prefetch for external domains */}
      {externalDomains.map(domain => (
        <link
          key={`dns-prefetch-${domain}`}
          rel="dns-prefetch"
          href={`//${domain}`}
        />
      ))}
      
      {/* Preconnect for critical external domains */}
      {externalDomains.includes('fonts.googleapis.com') && (
        <>
          <link rel="preconnect" href="//fonts.googleapis.com" />
          <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
        </>
      )}
      
      {externalDomains.includes('calendly.com') && (
        <link rel="preconnect" href="//calendly.com" />
      )}
      
      {/* Critical resource preloads */}
      {allPreloads.map((hint, index) => (
        <link
          key={`preload-${hint.href}-${index}`}
          rel="preload"
          href={hint.href}
          as={hint.as}
          type={(hint as any).type}
          crossOrigin={hint.crossorigin as CrossOrigin}
          fetchPriority={hint.fetchpriority as ("high" | "low" | "auto" | undefined)}
        />
      ))}
      
      {/* Resource prefetch for likely navigation */}
      {allPrefetch.map((hint, index) => (
        <link
          key={`prefetch-${hint.href}-${index}`}
          rel="prefetch"
          href={hint.href}
        />
      ))}
      
      {/* Critical CSS removed to prevent hydration mismatch */}
    </>
  );
}

// Page-specific critical resource components
export function HomepageCriticalResources() {
  return (
    <CriticalResources
      pageType="homepage"
      externalDomains={['fonts.googleapis.com', 'fonts.gstatic.com']}
      additionalPreloads={[
        {
          href: '/images/Utopica Logo.svg',
          as: 'image',
          fetchpriority: 'high'
        }
      ]}
    />
  );
}

export function SprintCriticalResources() {
  return (
    <CriticalResources
      pageType="sprint"
      externalDomains={['fonts.googleapis.com', 'fonts.gstatic.com', 'calendly.com']}
      additionalPreloads={[
        {
          href: '/images/kit-claridad-screenshot.png',
          as: 'image',
          fetchpriority: 'high'
        },
        {
          href: '/api/workshops',
          as: 'fetch',
          fetchpriority: 'high'
        }
      ]}
    />
  );
}

export function BlogCriticalResources() {
  return (
    <CriticalResources
      pageType="blog"
      externalDomains={['fonts.googleapis.com', 'fonts.gstatic.com']}
    />
  );
}

export function TeamCriticalResources() {
  return (
    <CriticalResources
      pageType="team"
      externalDomains={['fonts.googleapis.com', 'fonts.gstatic.com']}
      additionalPreloads={[
        {
          href: '/images/team/optimized/gael-thome-new.webp',
          as: 'image',
          fetchpriority: 'high'
        }
      ]}
    />
  );
}

// Universal critical resources for layouts
export function UniversalCriticalResources({
  pageType,
  customPreloads = [],
  customPrefetch = [],
  customDomains = []
}: {
  pageType: keyof typeof PAGE_PRELOAD_CONFIG;
  customPreloads?: CriticalResourcesProps['additionalPreloads'];
  customPrefetch?: string[];
  customDomains?: string[];
}) {
  const defaultDomains = ['fonts.googleapis.com', 'fonts.gstatic.com'];
  
  return (
    <CriticalResources
      pageType={pageType}
      additionalPreloads={customPreloads}
      additionalPrefetch={customPrefetch}
      externalDomains={[...defaultDomains, ...customDomains]}
    />
  );
}