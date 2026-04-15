'use client';

import { useEffect, useRef } from 'react';
import { trackConversion } from '@/lib/analytics';

interface ScrollTrackingOptions {
  threshold?: number; // Percentage of element visible before triggering
  trackOnce?: boolean; // Only track once per element
}

export function useScrollTracking(
  sectionName: string,
  options: ScrollTrackingOptions = {}
) {
  const { threshold = 50, trackOnce = true } = options;
  const elementRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold / 100) {
            if (!trackOnce || !hasTracked.current) {
              trackConversion.scrollToSection(sectionName);
              hasTracked.current = true;
            }
          }
        });
      },
      {
        threshold: threshold / 100,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [sectionName, threshold, trackOnce]);

  return elementRef;
}

// Hook para tracking de tiempo en página
export function useTimeOnPageTracking() {
  const startTime = useRef(Date.now());
  const hasSent30s = useRef(false);
  const hasSent60s = useRef(false);
  const hasSent120s = useRef(false);

  useEffect(() => {
    const checkTimeOnPage = () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);

      if (timeSpent >= 30 && !hasSent30s.current) {
        trackConversion.timeOnPage(30);
        hasSent30s.current = true;
      }
      
      if (timeSpent >= 60 && !hasSent60s.current) {
        trackConversion.timeOnPage(60);
        hasSent60s.current = true;
      }
      
      if (timeSpent >= 120 && !hasSent120s.current) {
        trackConversion.timeOnPage(120);
        hasSent120s.current = true;
      }
    };

    const interval = setInterval(checkTimeOnPage, 5000); // Check every 5 seconds

    return () => {
      clearInterval(interval);
      // Send final time on page when component unmounts
      const finalTime = Math.floor((Date.now() - startTime.current) / 1000);
      if (finalTime > 5) {
        trackConversion.timeOnPage(finalTime);
      }
    };
  }, []);
}