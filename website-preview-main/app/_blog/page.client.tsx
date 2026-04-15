"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { BlogCard } from '@/components/blog/blog-card';
import { CategorySection } from '@/components/blog/category-section';
import { FeaturedSeries } from '@/components/blog/featured-series';
import { NewsletterSignup } from '@/components/blog/newsletter-signup';

const categories = [
  "Venta Consultiva",
  "Inteligencia Artificial",
  "Desarrollo de Talento",
  "Casos de Éxito",
  "Tendencias B2B"
];

const mainCategories = [
  {
    title: "Venta Consultiva Aumentada™",
    posts: [
      "La Contradicción que Me Hace Cuestionar Todo lo que Sé: Cuando Enseño lo Contrario de lo que Practico",
      "Cómo la IA está transformando el diagnóstico comercial",
      "El arte de hacer preguntas poderosas en la era digital",
      "Metodologías híbridas: combinando lo mejor del contacto humano y la tecnología"
    ]
  },
  {
    title: "Transformación Comercial",
    posts: [
      'Rompiendo la dependencia de "vendedores estrella"',
      "De equipos reactivos a proactivos: el nuevo paradigma comercial",
      "Métricas que importan en la venta consultiva moderna",
      "Cultura comercial para la era digital"
    ]
  },
  {
    title: "Tecnología & Ventas",
    posts: [
      "Guía práctica de IA para equipos comerciales",
      "Automatización inteligente: qué, cuándo y cómo",
      "Herramientas digitales para el diagnóstico comercial",
      "El futuro de CRM: de registro a predicción"
    ]
  }
];

const series = [
  {
    title: "Transformación Comercial Real",
    description: "Casos de estudio mensuales",
    frequency: "Mensual"
  },
  {
    title: "Futuro del B2B",
    description: "Análisis trimestral de tendencias",
    frequency: "Trimestral"
  },
  {
    title: "Voces del Cambio",
    description: "Entrevistas con líderes comerciales",
    frequency: "Mensual"
  }
];

export default function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-primary/5 via-background to-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Insights para la Nueva Era Comercial
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Exploramos las fronteras de la venta consultiva, donde el talento humano y la 
              inteligencia artificial convergen para crear experiencias comerciales extraordinarias.
            </p>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Buscar artículos..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
                  aria-label="Buscar artículos"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  className="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/5"
                  aria-label="Filtrar artículos"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filtrar
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mt-8" role="group" aria-label="Categorías de artículos">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === selectedCategory
                      ? 'bg-primary text-white'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  aria-pressed={category === selectedCategory}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Posts Grid */}
      <section className="py-24" aria-labelledby="latest-posts-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="latest-posts-heading" className="text-3xl font-bold mb-6">Últimos Artículos</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <BlogCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories */}
      {mainCategories.map((category, index) => (
        <CategorySection
          key={category.title}
          category={category}
          index={index}
        />
      ))}

      {/* Featured Series */}
      <FeaturedSeries series={series} />

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </>
  );
}
