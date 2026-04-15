"use client";

import { motion } from 'framer-motion';
import { Linkedin, Award } from 'lucide-react';

interface Achievement {
  value: string;
  label: string;
}

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    image: string;
    quote?: string;
    description: string;
    experience: string;
    achievements: Achievement[];
    highlights: string[];
    linkedin: string;
  };
  index: number;
}

export function TeamMember({ member, index }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-x-hidden"
    >
      <div className="relative">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12">
          {/* Contenido */}
          <div className={`${index % 2 === 1 ? 'md:order-2' : ''} order-2 w-full`}>
            <div className="md:h-[600px] md:overflow-y-auto md:pr-4">
              <div className="space-y-3 md:space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold">{member.name}</h3>
                  <p className="text-lg md:text-xl text-primary mt-1 md:mt-2">{member.role}</p>
                </div>
                
                {member.quote && (
                  <blockquote className="text-lg md:text-2xl font-medium italic text-foreground">
                    {member.quote}
                  </blockquote>
                )}
                
                <div className="space-y-3 md:space-y-4">
                  <p className="text-base md:text-lg text-muted-foreground">{member.description}</p>
                  <p className="text-base md:text-lg text-muted-foreground">{member.experience}</p>
                </div>
                
                {/* Grid de logros */}
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {member.achievements.map((achievement, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-primary">{achievement.value}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{achievement.label}</div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h4 className="text-base md:text-lg font-semibold flex items-center">
                    <Award className="h-4 md:h-5 w-4 md:w-5 text-primary mr-2" />
                    Highlights
                  </h4>
                  <ul className="mt-3 md:mt-4 space-y-1.5 md:space-y-2">
                    {member.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-sm md:text-base">•</span>
                        <span className="text-sm md:text-base text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm md:text-base text-primary hover:text-primary/90 transition-colors"
                >
                  <Linkedin className="h-4 md:h-5 w-4 md:w-5 mr-2" />
                  Conecta en LinkedIn
                </a>
              </div>
            </div>
          </div>
          
          {/* Imagen */}
          <div className={`${index % 2 === 1 ? 'md:order-1' : ''} order-1 w-full`}>
            <div className="h-[200px] sm:h-[300px] md:h-[600px] max-w-[300px] mx-auto md:max-w-none relative rounded-xl overflow-hidden bg-secondary">
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}