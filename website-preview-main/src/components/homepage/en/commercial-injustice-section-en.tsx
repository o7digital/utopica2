import { motion } from 'framer-motion';
import { AlertTriangle, Target, Award } from 'lucide-react';

export function CommercialInjusticeSectionEn() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Commercial Injustice
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            The root problem we solve: great professionals and companies don’t get the clients they deserve.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-6">My lesson in Multiplica Mexico</h3>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                I learned this the hard way. Years ago, at Multiplica Mexico, we promoted an excellent professional to Managing Director. He came from product and had a clear conviction:
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2 italic">
                “If we hire more senior talent to elevate delivery quality, our reputation will grow and opportunities will come like a magnet.”
              </blockquote>
              <p>
                The plan made sense, so we agreed. Two things happened:
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <p className="text-base">
                    Our project quality improved markedly.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                    <span className="text-destructive font-bold">2</span>
                  </div>
                  <p className="text-base">
                    Sales didn’t move significantly.
                  </p>
                </div>
              </div>
              <p className="text-xl font-semibold text-foreground">
                That day I understood the truth of commercial injustice: an incredible product isn’t enough. If you can’t communicate it with the same excellence, the market won’t magically find out.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              The Real Battlefield
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Product quality gives you the <span className="font-semibold text-foreground">right</span> to compete, but not the win. To win, your message must do justice to your service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="p-4 rounded-full bg-primary/10 mb-4 mx-auto w-fit">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-xl mb-2">CLEAR</h4>
              <p className="text-muted-foreground">
                So anyone understands it effortlessly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="p-4 rounded-full bg-primary/10 mb-4 mx-auto w-fit">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-xl mb-2">RELEVANT</h4>
              <p className="text-muted-foreground">
                So your ideal client cares right away.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="p-4 rounded-full bg-primary/10 mb-4 mx-auto w-fit">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-xl mb-2">UNIQUE</h4>
              <p className="text-muted-foreground">
                So they pick you, not a substitute.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-xl font-semibold text-foreground">
              Achieving these three criteria is the only way to end commercial injustice and communicate your true value.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
