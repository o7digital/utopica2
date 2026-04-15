import { ArrowRight, Sparkles, FileSearch } from 'lucide-react';
import { TrackedCTAButton } from '@/components/ui/tracked-cta-button';

export function NextStepsSectionStaticEn() {
  const calendlyUrl = import.meta.env.PUBLIC_RECLAIM_URL || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial";
  
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">The market rewards those who communicate best,</span>
            <span className="block text-primary">not necessarily those who work hardest.</span>
            <span className="block mt-2">It’s time to change that.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            If you’re ready for your message to match the quality of your work, start here.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              Start with the Sprint
            </h3>
            
            <div className="space-y-3 mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold">For you if:</span> You know your message is slowing you down and you want results in 4 weeks.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-4">
                <p className="text-sm font-semibold">4 weeks to transform your message</p>
              </div>
              
              <TrackedCTAButton
                href="/en/clarity-sprint"
                trackingLocation="next_steps_ready_en"
                size="lg"
                className="w-full"
              >
                Explore the 4-Week Sprint
                <ArrowRight className="ml-2 h-5 w-5" />
              </TrackedCTAButton>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 border hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <FileSearch className="h-8 w-8 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              Start with a Diagnostic
            </h3>
            
            <div className="space-y-3 mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold">For you if:</span> You prefer an assessment first before committing.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm font-semibold text-blue-700">30 minutes to evaluate your situation</p>
              </div>
              
              <TrackedCTAButton
                href={calendlyUrl}
                target="_blank"
                trackingLocation="next_steps_audit_en"
                size="lg" 
                className="w-full"
              >
                Book a Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </TrackedCTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
