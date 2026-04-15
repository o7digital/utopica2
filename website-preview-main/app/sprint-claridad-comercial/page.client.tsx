"use client";

import { SprintHero } from '@/components/sprint/sprint-hero';
import { SprintProblem } from '@/components/sprint/sprint-problem';
import { SprintProblemDeep } from '@/components/sprint/sprint-problem-deep';
import { SprintFailedSolutions } from '@/components/sprint/sprint-failed-solutions';
import { SprintSuccessCriteria } from '@/components/sprint/sprint-success-criteria';
import { SprintComparison } from '@/components/sprint/sprint-comparison';
import { SprintProcess } from '@/components/sprint/sprint-process';
import { SprintOffer } from '@/components/sprint/sprint-offer';
import { SprintBonuses } from '@/components/sprint/sprint-bonuses';
import { SprintWhyNow } from '@/components/sprint/sprint-why-now';
import { SprintFAQ } from '@/components/sprint/sprint-faq';
import { SprintCTA } from '@/components/sprint/sprint-cta';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { OptimizedSection } from '@/components/ui/optimized-section';
import { SprintResourcePreloader } from '@/components/performance/resource-preloader';
import { useEffect } from 'react';
import { measureWebVitals } from '@/lib/utils/performance';

// Comentados para uso futuro:
// import { SprintSolution } from '@/components/sprint/sprint-solution';
// import { SprintTestimonials } from '@/components/sprint/sprint-testimonials';

export default function SprintPageClient() {
  useEffect(() => {
    // Initialize Web Vitals monitoring
    measureWebVitals();
  }, []);

  return (
    <>
      <SprintResourcePreloader />
      <ScrollProgress />
      
      {/* 1. HERO - High priority, always visible */}
      <OptimizedSection priority="high" id="hero">
        <SprintHero />
      </OptimizedSection>
      
      {/* SECCIÓN 1: EL PROBLEMA - High priority, visible quickly */}
      <OptimizedSection priority="high" id="problem" lazyLoad>
        <SprintProblem />
      </OptimizedSection>
      
      <OptimizedSection priority="medium" id="problem-deep" lazyLoad>
        <SprintProblemDeep />
      </OptimizedSection>
      
      <OptimizedSection priority="medium" id="why-now" lazyLoad>
        <SprintWhyNow />
      </OptimizedSection>
      
      {/* SECCIÓN 2: ENTENDIENDO LA SOLUCIÓN IDEAL */}
      <OptimizedSection priority="medium" id="failed-solutions" lazyLoad>
        <SprintFailedSolutions />
      </OptimizedSection>
      
      <OptimizedSection priority="medium" id="success-criteria" lazyLoad>
        <SprintSuccessCriteria />
      </OptimizedSection>
      
      <OptimizedSection priority="medium" id="comparison" lazyLoad>
        <SprintComparison />
      </OptimizedSection>
      
      {/* SECCIÓN 3: NUESTRA SOLUCIÓN */}
      <OptimizedSection priority="medium" id="process" lazyLoad>
        <SprintProcess />
      </OptimizedSection>
      
      <OptimizedSection priority="medium" id="bonuses" lazyLoad>
        <SprintBonuses />
      </OptimizedSection>
      
      <OptimizedSection priority="high" id="offer" lazyLoad>
        <SprintOffer />
      </OptimizedSection>
      
      {/* TU PRÓXIMO PASO - High priority for conversion */}
      <OptimizedSection priority="high" id="cta" lazyLoad>
        <SprintCTA />
      </OptimizedSection>
      
      {/* COMPLEMENTARIO - Low priority */}
      <OptimizedSection priority="low" id="faq" lazyLoad>
        <SprintFAQ />
      </OptimizedSection>
    </>
  );
}