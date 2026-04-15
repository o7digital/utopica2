import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 transform-origin-left"
        style={{ scaleX }}
      />
      
      {/* Side dots indicator */}
      <motion.div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <ScrollDotsIndicator />
      </motion.div>
    </>
  );
}

function ScrollDotsIndicator() {
  const [activeSection, setActiveSection] = useState(0);
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    // Find all main sections
    const sectionElements = document.querySelectorAll('section');
    const sectionIds = Array.from(sectionElements).map((_, index) => `section-${index}`);
    setSections(sectionIds);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sectionElements.forEach((section, index) => {
        const { top, bottom } = section.getBoundingClientRect();
        const absoluteTop = window.scrollY + top;
        const absoluteBottom = window.scrollY + bottom;
        
        if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const sectionElements = document.querySelectorAll('section');
    if (sectionElements[index]) {
      sectionElements[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-3 p-2 bg-background/80 backdrop-blur-sm rounded-full border shadow-lg">
      {sections.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className="group relative"
          aria-label={`Ir a sección ${index + 1}`}
        >
          <motion.div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index 
                ? 'bg-primary scale-125' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          {/* Tooltip */}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Sección {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
}