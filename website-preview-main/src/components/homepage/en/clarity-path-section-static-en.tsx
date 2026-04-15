import { MessageSquare, Target, Sparkles, Users, Navigation, Gift, UserCheck, Globe, Trophy } from 'lucide-react';

const steps = [
  {
    number: "1",
    title: "Speak your buyer’s language",
    description: "Connect to their reality, not your solution.",
    icon: MessageSquare,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    substeps: [
      {
        number: "1.1",
        title: "Map their reality, not your product",
        description: "Talk about their pains, frictions, and aspirations. Build your Brand Narrative.",
        icon: Users
      },
      {
        number: "1.2",
        title: "Express the transformation in one line",
        description: "Capture the problem you solve and the result you deliver. Define your Value Proposition.",
        icon: Target
      },
      {
        number: "1.3",
        title: "Paint the ‘after’ so clearly they can taste it",
        description: "Describe their new reality tangibly. Create your Transformed Client Vision.",
        icon: Sparkles
      }
    ]
  },
  {
    number: "2",
    title: "Communicate ONE thing at a time",
    description: "Design a clear highway, not a maze of options.",
    icon: Navigation,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    substeps: [
      {
        number: "2.1",
        title: "Build a highway, not a maze",
        description: "Present a direct, simple path. Design your Value Ladder.",
        icon: Navigation
      },
      {
        number: "2.2",
        title: "Signal a single on-ramp",
        description: "Highlight your main entry point. Define your Flagship Offer.",
        icon: Target
      },
      {
        number: "2.3",
        title: "Make your route the fastest and safest",
        description: "Show proof and guarantees. Craft your Irresistible Offer.",
        icon: Trophy
      }
    ]
  },
  {
    number: "3",
    title: "Show your best face",
    description: "Be the exceptional host your clients deserve.",
    icon: UserCheck,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    substeps: [
      {
        number: "3.1",
        title: "Send the invitation",
        description: "Your LinkedIn profile is the official invite. Optimize your professional presence.",
        icon: UserCheck
      },
      {
        number: "3.2",
        title: "Welcome them properly",
        description: "Your website proves professionalism. Build a Site that Converts.",
        icon: Globe
      },
      {
        number: "3.3",
        title: "Serve the main course",
        description: "Your proposal is the highlight. Design your Commercial Presentation.",
        icon: Gift
      }
    ]
  }
];

export function ClarityPathSectionStaticEn() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-secondary/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Path to Clarity
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            The commercial clarity problem is solved in three big steps:
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className={`rounded-2xl border-2 ${step.borderColor} ${step.bgColor} p-8 md:p-12`}>
                <div className="flex items-start gap-6 mb-8">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full ${step.bgColor} border-2 ${step.borderColor} flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${step.color}`}>{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      STEP {step.number}: {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {step.substeps.map((substep) => {
                    const Icon = substep.icon;
                    return (
                      <div
                        key={substep.number}
                        className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className={`h-6 w-6 ${step.color}`} />
                          <span className={`font-semibold ${step.color}`}>{substep.number}</span>
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{substep.title}</h4>
                        <p className="text-sm text-muted-foreground">{substep.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ending the Injustice
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              It’s not about working harder on delivery quality—it’s about working smarter on message quality.
            </p>
            <p className="text-lg font-semibold">
              It’s time to do justice to what you offer and host the experience your clients have been waiting for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
