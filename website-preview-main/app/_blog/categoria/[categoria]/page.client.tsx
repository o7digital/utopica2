"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { SeoHeading } from '@/components/ui/seo-heading';

// Tipos para los artículos
interface Author {
  name: string;
  image: string;
}

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: Author;
  coverImage: string;
  categories: string[];
  readingTime: string;
}

// Componente para mostrar una tarjeta de artículo
function ArticleCard({ article }: { article: Article }) {
  // Formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-background rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="inline-flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(article.date)}
          </span>
          <span className="inline-flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {article.readingTime}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
          <Link href={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="text-muted-foreground mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2">
          {article.categories.map((category) => (
            <Link
              key={category}
              href={`/blog/categoria/${category.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// Componente principal
export default function CategoryClient({ 
  categoryName, 
  articles 
}: { 
  categoryName: string;
  articles: Article[];
}) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-b from-primary/5 via-background to-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SeoHeading level={1} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {categoryName}
            </SeoHeading>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Explora nuestros artículos sobre {categoryName.toLowerCase()} para profesionales B2B.
              Aprende estrategias efectivas y mejores prácticas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24" aria-labelledby="articles-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SeoHeading level={2} id="articles-heading" className="text-3xl font-bold mb-6">
              Artículos sobre {categoryName}
            </SeoHeading>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Encontramos {articles.length} artículo{articles.length !== 1 ? 's' : ''} en esta categoría
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SeoHeading level={2} className="text-3xl font-bold mb-6">
            ¿Quieres más contenido sobre {categoryName}?
          </SeoHeading>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Suscríbete a nuestro newsletter para recibir los últimos artículos, guías y recursos directamente en tu bandeja de entrada.
          </p>
          <Link
            href="/blog#newsletter"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors"
          >
            Suscribirse al newsletter
          </Link>
        </div>
      </section>
    </>
  );
}
