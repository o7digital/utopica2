"use client";

import { TeamHero } from '@/components/team/team-hero';
import { LeadershipSection } from '@/components/team/leadership-section';
import { AdvisorySection } from '@/components/team/advisory-section';
import { ValuesSection } from '@/components/team/values-section';
import { TeamCTA } from '@/components/team/team-cta';

export default function EquipoPageClient() {
  return (
    <>
      <TeamHero />
      <LeadershipSection />
      <AdvisorySection />
      <ValuesSection />
      <TeamCTA />
    </>
  );
}