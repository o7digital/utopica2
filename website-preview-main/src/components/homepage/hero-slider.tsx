import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  { image: '/images/utopica1.webp', fallback: '/images/utopica1.jpg' },
  { image: '/images/utopica2.webp', fallback: '/images/utopica2.jpg' },
  { image: '/images/utopica3.webp', fallback: '/images/utopica3.jpg' }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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

      {/* Content with white background */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* First Block - Main Title */}
          <div className="bg-white/50 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center">
              ¿Ofreces un Servicio Increíble<br />
              pero las <span className="text-primary">Ventas no Llegan</span>?
            </h1>
          </div>

          {/* Second Block - Everything else */}
          <div className="bg-white/50 backdrop-blur-sm px-8 py-7 rounded-2xl shadow-2xl">
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 text-center mb-5">
              Aquí está el problema: puedes hacer un trabajo excepcional y aún<br className="hidden md:block" />
              así tener dificultades para vender.
            </p>

            {/* Secondary text */}
            <p className="text-base md:text-lg lg:text-xl text-gray-600 text-center mb-7">
              Hay una forma de cambiar esto. Y empieza con tu mensaje.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center mb-6">
              <a
                href="/sprint-claridad-comercial"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all hover:scale-105 shadow-xl"
              >
                Conocer el Sprint de Claridad
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>

            {/* Bottom text */}
            <p className="text-sm text-gray-600 text-center">
              Solo 5 lugares disponibles • <a href="/sprint-claridad-comercial" className="text-primary hover:underline font-medium">Ver detalles del Sprint</a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/30 hover:bg-white/50 text-white backdrop-blur-sm transition-all hover:scale-110"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/30 hover:bg-white/50 text-white backdrop-blur-sm transition-all hover:scale-110"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Descubre más */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white"
      >
        <span className="text-sm font-medium">Descubre más</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Dots Navigation */}
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
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
