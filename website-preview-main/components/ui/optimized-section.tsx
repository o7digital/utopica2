'use client';

import React, { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import { createIntersectionObserver } from '@/lib/utils/performance';

interface OptimizedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  lazyLoad?: boolean;
  priority?: 'high' | 'medium' | 'low';
  preloadThreshold?: number;
  onVisible?: () => void;
}

const OptimizedSectionBase = ({
  children,
  className = '',
  id,
  lazyLoad = false,
  priority = 'medium',
  preloadThreshold = 0.1,
  onVisible
}: OptimizedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(!lazyLoad);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!lazyLoad || hasLoaded) return;

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
            onVisible?.();
            
            if (process.env.NODE_ENV === 'development') {
              console.log(`🔍 Section loaded: ${id || 'unnamed'}`);
            }
          }
        });
      },
      {
        rootMargin: priority === 'high' ? '200px' : priority === 'medium' ? '100px' : '50px',
        threshold: preloadThreshold
      }
    );

    if (observer && sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer && sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [lazyLoad, hasLoaded, id, onVisible, preloadThreshold, priority]);

  // For high priority sections, render immediately
  if (priority === 'high') {
    return (
      <section ref={sectionRef} className={className} id={id}>
        {children}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={className} id={id}>
      {isVisible ? (
        children
      ) : (
        // Placeholder to maintain layout during lazy loading
        <div 
          className="min-h-[200px] flex items-center justify-center"
          aria-label="Loading section content..."
        >
          {process.env.NODE_ENV === 'development' && (
            <div className="text-sm text-muted-foreground">
              Loading section: {id || 'unnamed'}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const OptimizedSection = memo(OptimizedSectionBase);

// HOC for wrapping existing components with optimization
export function withOptimization<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<OptimizedSectionProps, 'children'> = {}
) {
  const WrappedComponent = memo((props: P) => (
    <OptimizedSection {...options}>
      <Component {...props} />
    </OptimizedSection>
  ));
  
  WrappedComponent.displayName = `withOptimization(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}