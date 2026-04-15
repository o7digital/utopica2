import { AlertCircle, TrendingDown, Clock } from 'lucide-react';

const stakes = [
  {
    icon: AlertCircle,
    title: "You lose clients",
    description: "They choose competitors with worse delivery but clearer communication."
  },
  {
    icon: TrendingDown,
    title: "You compete on price",
    description: "Buyers don’t perceive your difference and treat you like any other vendor."
  },
  {
    icon: Clock,
    title: "Growth stalls",
    description: "You are the only one who can articulate the value, and your time is limited."
  }
];

export function StakesSectionStaticEn() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">Does the market feel</span>
            <span className="block text-primary mt-2">unfair to your business?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            If your quality is not reflected in your sales, you&apos;re facing what we call <strong className="font-semibold text-foreground">“Commercial Injustice.”</strong>
          </p>
        </div>

        <div className="mb-12">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stakes.map((stake, index) => {
              const Icon = stake.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-destructive/5 border border-destructive/10 hover:border-destructive/20 transition-colors"
                >
                  <div className="p-4 rounded-full bg-destructive/10 mb-4">
                    <Icon className="h-8 w-8 text-destructive" />
                  </div>
                  <h4 className="font-semibold text-xl mb-2">{stake.title}</h4>
                  <p className="text-muted-foreground">{stake.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-background via-primary/5 to-primary/10 p-8 md:p-12 rounded-2xl border border-primary/20 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              The Root Cause: you’re not communicating the real value of your work.
            </h3>
            <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
              If your message isn’t clear, relevant, and unique, you’ll remain invisible to ideal clients.
            </p>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
              To win, your message must meet three non‑negotiable conditions:
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="text-center space-y-2">
                <h4 className="text-xl font-bold text-primary">CLEAR</h4>
                <p className="text-sm text-muted-foreground">
                  Anyone understands it effortlessly.
                </p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-xl font-bold text-primary">RELEVANT</h4>
                <p className="text-sm text-muted-foreground">
                  Your ideal buyer cares immediately.
                </p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-xl font-bold text-primary">UNIQUE</h4>
                <p className="text-sm text-muted-foreground">
                  They choose you, not a substitute.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
