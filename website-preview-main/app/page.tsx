import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { StakesSectionStatic } from '@/components/homepage/stakes-section-static';
import { ClarityPathSectionStatic } from '@/components/homepage/clarity-path-section-static';
import { NextStepsSectionStatic } from '@/components/homepage/next-steps-section-static';

// ISR Configuration - Revalidate every 6 hours (21600 seconds)
// Homepage content changes occasionally, so 6-hour revalidation is appropriate
export const revalidate = 21600;

// Interactive components that need client-side features
const HeroSection = dynamic(() => import('@/components/homepage').then(mod => ({ default: mod.HeroSection })), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background" />
});

const CommercialInjusticeSection = dynamic(() => import('@/components/homepage').then(mod => ({ default: mod.CommercialInjusticeSection })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-gradient-to-b from-background to-secondary/10" />
});

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      
      {/* Interactive hero section */}
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }>
        <HeroSection />
      </Suspense>

      {/* Static sections rendered as Server Components */}
      <StakesSectionStatic />
      
      {/* Interactive section with animations */}
      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-b from-background to-secondary/10" />}>
        <CommercialInjusticeSection />
      </Suspense>
      
      {/* Static sections */}
      <ClarityPathSectionStatic />
      <NextStepsSectionStatic />
    </>
  );
}
