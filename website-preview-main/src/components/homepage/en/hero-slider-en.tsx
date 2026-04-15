import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  { image: '/images/utopica1.webp', fallback: '/images/utopica1.jpg' },
  { image: '/images/utopica2.webp', fallback: '/images/utopica2.jpg' },
  { image: '/images/utopica3.webp', fallback: '/images/utopica3.jpg' }
];

export function HeroSliderEn() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <picture>
              <source srcSet={slides[currentSlide].image} type="image/webp" />
              <img
                src={slides[currentSlide].fallback}
                alt="Hero background"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="bg-white/55 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center">
              Do you deliver an incredible service<br />
              but <span className="text-primary">sales won&apos;t come</span>?
            </h1>
          </div>

          <div className="bg-white/55 backdrop-blur-sm px-8 py-7 rounded-2xl shadow-2xl">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 text-center mb-5">
              Here&apos;s the problem: you can do exceptional work and still<br className="hidden md:block" />
              struggle to sell.
            </p>

            <p className="text-base md:text-lg lg:text-xl text-gray-600 text-center mb-7">
              There is a way to change this. It starts with your message.
            </p>

            <div className="flex justify-center mb-6">
              <a
                href="/en/clarity-sprint"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all hover:scale-105 shadow-xl"
              >
                Discover the Clarity Sprint
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Only 5 spots available • <a href="/en/clarity-sprint" className="text-primary hover:underline font-medium">See sprint details</a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/30 hover:bg-white/50 text-white backdrop-blur-sm transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/30 hover:bg-white/50 text-white backdrop-blur-sm transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Discover more */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white"
      >
        <span className="text-sm font-medium">Discover more</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-12 bg-white'
                : 'w-3 bg-white/50 hover:bg-white/70'
            } h-3 rounded-full shadow-lg`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
