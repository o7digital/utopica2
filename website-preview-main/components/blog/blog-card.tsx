"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

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

// Artículos de ejemplo
const sampleArticles: Article[] = [
  {
    slug: 'la-contradiccion-que-me-hace-cuestionar-todo-lo-que-se',
    title: 'La Contradicción que Me Hace Cuestionar Todo lo que Sé: Cuando Enseño lo Contrario de lo que Practico',
    excerpt: 'Una reflexión incómoda sobre las estrategias de ventas B2B y cómo a veces enseñamos lo contrario de lo que practicamos, cuestionando si existen verdades absolutas en este campo.',
    date: '2025-04-03T19:30:00Z',
    author: {
      name: 'Gael Thomé',
      image: '/images/team/gael-thome.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop',
    categories: ['Venta Consultiva', 'Desarrollo de Talento'],
    readingTime: '8 min'
  },
  {
    slug: 'como-la-ia-esta-transformando-el-diagnostico-comercial',
    title: 'Cómo la IA está transformando el diagnóstico comercial',
    excerpt: 'Descubre cómo la inteligencia artificial está revolucionando la forma en que realizamos diagnósticos comerciales y mejoramos la toma de decisiones.',
    date: '2024-03-15T10:00:00Z',
    author: {
      name: 'Ana Martínez',
      image: '/images/team/ana-martinez.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
    categories: ['Inteligencia Artificial', 'Ventas'],
    readingTime: '5 min'
  },
  {
    slug: 'el-arte-de-hacer-preguntas-poderosas-en-la-era-digital',
    title: 'El arte de hacer preguntas poderosas en la era digital',
    excerpt: 'Aprende a formular preguntas que generen insights valiosos y construyan relaciones sólidas con tus clientes en entornos digitales.',
    date: '2024-03-12T10:00:00Z',
    author: {
      name: 'Miguel Sánchez',
      image: '/images/team/miguel-sanchez.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=2940&auto=format&fit=crop',
    categories: ['Venta Consultiva', 'Comunicación'],
    readingTime: '7 min'
  },
  {
    slug: 'de-equipos-reactivos-a-proactivos-el-nuevo-paradigma-comercial',
    title: 'De equipos reactivos a proactivos: el nuevo paradigma comercial',
    excerpt: 'Cómo las organizaciones B2B están transformando sus equipos comerciales para anticiparse a las necesidades del mercado.',
    date: '2024-03-14T10:00:00Z',
    author: {
      name: 'Carlos López',
      image: '/images/team/carlos-lopez.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2940&auto=format&fit=crop',
    categories: ['Tendencias B2B', 'Transformación Comercial'],
    readingTime: '5 min'
  },
  {
    slug: 'guia-practica-de-ia-para-equipos-comerciales',
    title: 'Guía práctica de IA para equipos comerciales',
    excerpt: 'Una guía paso a paso para implementar soluciones de IA en tu equipo comercial sin necesidad de conocimientos técnicos avanzados.',
    date: '2024-03-10T10:00:00Z',
    author: {
      name: 'Carlos López',
      image: '/images/team/carlos-lopez.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2940&auto=format&fit=crop',
    categories: ['Inteligencia Artificial', 'Tecnología'],
    readingTime: '8 min'
  },
  {
    slug: 'metodologias-hibridas-combinando-lo-mejor-del-contacto-humano-y-la-tecnologia',
    title: 'Metodologías híbridas: combinando lo mejor del contacto humano y la tecnología',
    excerpt: 'Estrategias para crear un enfoque de ventas que aproveche tanto la empatía humana como las capacidades tecnológicas.',
    date: '2024-03-08T10:00:00Z',
    author: {
      name: 'Ana Martínez',
      image: '/images/team/ana-martinez.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2940&auto=format&fit=crop',
    categories: ['Venta Consultiva', 'Tecnología'],
    readingTime: '6 min'
  },
  {
    slug: 'el-futuro-de-crm-de-registro-a-prediccion',
    title: 'El futuro de CRM: de registro a predicción',
    excerpt: 'Cómo los sistemas CRM están evolucionando de simples registros a potentes herramientas predictivas gracias a la inteligencia artificial.',
    date: '2024-03-05T10:00:00Z',
    author: {
      name: 'Laura Gómez',
      image: '/images/team/laura-gomez.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    categories: ['Inteligencia Artificial', 'CRM'],
    readingTime: '6 min'
  }
];

export function BlogCard({ index = 0 }: { index?: number }) {
  // Obtener un artículo del array de ejemplos
  const article = sampleArticles[index % sampleArticles.length];
  
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
