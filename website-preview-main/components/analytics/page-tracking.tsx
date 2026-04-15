'use client';

import { useTimeOnPageTracking } from '@/hooks/use-scroll-tracking';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { pageview } from '@/lib/analytics';

export function PageTracking() {
  const pathname = usePathname();
  
  // Track time on page
  useTimeOnPageTracking();
  
  // Track page changes for SPAs
  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);
  
  return null;
}