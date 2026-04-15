import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface AdvisorCardProps {
  advisor: {
    name: string;
    role: string;
    image: string;
    description: string;
    highlights: string[];
    linkedin: string;
  };
  index: number;
}

export function AdvisorCard({ advisor, index }: AdvisorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background rounded-xl p-6 shadow-lg"
    >
      <div className="relative w-32 h-32 mx-auto mb-6 bg-secondary rounded-full overflow-hidden">
        <OptimizedImage
          src={advisor.image.replace('.jpg', '.webp').replace('/team/', '/team/optimized/')}
          fallbackSrc={advisor.image.replace('/team/', '/team/optimized/')}
          alt={advisor.name}
          width={128}
          height={128}
          className="absolute inset-0 w-full h-full"
          objectFit="cover"
        />
      </div>
      
      <h3 className="text-xl font-bold text-center mb-2">{advisor.name}</h3>
      <p className="text-primary text-center mb-4">{advisor.role}</p>
      <p className="text-muted-foreground mb-6">{advisor.description}</p>
      
      <ul className="space-y-2 mb-6">
        {advisor.highlights.map((highlight, i) => (
          <li key={i} className="flex items-start">
            <span className="mr-2 flex-shrink-0">•</span>
            <span className="text-sm">{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="text-center">
        <a
          href={advisor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-primary/90 transition-colors"
        >
          <Linkedin className="h-5 w-5 mr-2" />
          Conecta en LinkedIn
        </a>
      </div>
    </motion.div>
  );
}