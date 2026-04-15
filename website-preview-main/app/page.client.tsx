"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ScrollProgress } from '@/components/ui/scroll-progress';

// Importar los nuevos componentes de la homepage
const HeroSection = dynamic(() => import('@/components/homepage').then(mod => ({ default: mod.HeroSection })), {
  ssr: true
});
const StakesSection = dynamic(() => import('@/components/homepage').then(mod => ({ default: mod.StakesSection })), {
  ssr: true
});
const CommercialInjusticeSection = dynamic(() => import('@/components/homepage').then(mod => ({ default: mod.CommercialInjusticeSection })), {
  ssr: true
});
const ClarityPathSection = dynamic(() => import('@/components/homepage').then(mod => ({ default: mod.ClarityPathSection })), {
  ssr: true
});
const MethodologySection = dynamic(() => import('@/components/homepage').then(mod => ({ default: mod.MethodologySection })), {
  ssr: true
});
const TransformationCases = dynamic(() => import('@/components/homepage').then(mod => ({ default: mod.TransformationCases })), {
  ssr: true
});
const GuideSection = dynamic(() => import('@/components/homepage').then(mod => ({ default: mod.GuideSection })), {
  ssr: true
});
const NextStepsSection = dynamic(() => import('@/components/homepage').then(mod => ({ default: mod.NextStepsSection })), {
  ssr: true
});

export default function HomeClient() {
  return (
    <>
      <ScrollProgress />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>}>
        <HeroSection />
        <StakesSection />
        <CommercialInjusticeSection />
        <ClarityPathSection />
        <NextStepsSection />
      </Suspense>
    </>
  );
}
