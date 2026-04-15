import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-12 left-0 right-0 flex justify-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 0.7, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 2,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Descubre más</span>
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </motion.div>
  );
}