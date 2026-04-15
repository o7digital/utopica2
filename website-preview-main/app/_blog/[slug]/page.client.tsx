"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Share2, MessageCircle, ThumbsUp, Facebook, Twitter, Linkedin } from 'lucide-react';
import { SeoHeading } from '@/components/ui/seo-heading';
import { SeoLink } from '@/components/ui/seo-link';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Tipos para el artículo
interface Author {
  name: string;
  bio: string;
  image: string;
}

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: Author;
  coverImage: string;
  categories: string[];
  readingTime: string;
}

// Componente para mostrar la información del autor
function AuthorBio({ author }: { author: Author }) {
  return (
    <div className="flex items-center space-x-4 border-t border-b py-6 my-8">
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <Image 
          src={author.image} 
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{author.name}</h3>
        <p className="text-sm text-muted-foreground">{author.bio}</p>
      </div>
    </div>
  );
}

// Componente para los botones de compartir
function ShareButtons({ title, slug }: { title: string, slug: string }) {
  const url = `https://utopica.io/blog/${slug}`;
  
  return (
    <div className="flex items-center space-x-2 my-6">
      <span className="text-sm text-muted-foreground mr-2">Compartir:</span>
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Compartir en Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Compartir en Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a 
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Compartir en LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
    </div>
  );
}

// Componente para los comentarios
function CommentSection() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Carlos Rodríguez",
      date: "2024-03-16T14:30:00Z",
      content: "Excelente artículo. Me gustaría saber más sobre cómo implementar estas soluciones en empresas pequeñas.",
      likes: 5
    },
    {
      id: 2,
      author: "Laura Gómez",
      date: "2024-03-17T09:15:00Z",
      content: "Muy interesante el enfoque sobre el factor humano. Creo que muchas veces se olvida que la IA es una herramienta y no un reemplazo.",
      likes: 3
    }
  ]);
  
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulamos una petición a la API
    setTimeout(() => {
      const newCommentObj = {
        id: comments.length + 1,
        author: "Usuario",
        date: new Date().toISOString(),
        content: newComment,
        likes: 0
      };
      
      setComments([...comments, newCommentObj]);
      setNewComment("");
      setIsSubmitting(false);
    }, 500);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <section className="mt-12 pt-8 border-t" aria-labelledby="comments-heading">
      <SeoHeading level={2} id="comments-heading" className="mb-6">
        Comentarios ({comments.length})
      </SeoHeading>
      
      {/* Lista de comentarios */}
      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-secondary/20 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{comment.author}</h3>
                <p className="text-xs text-muted-foreground">{formatDate(comment.date)}</p>
              </div>
              <button 
                className="flex items-center text-xs text-muted-foreground hover:text-primary"
                aria-label="Me gusta"
              >
                <ThumbsUp className="h-3 w-3 mr-1" />
                {comment.likes}
              </button>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
        ))}
      </div>
      
      {/* Formulario para nuevo comentario */}
      <div className="bg-secondary/10 p-4 rounded-lg">
        <SeoHeading level={3} className="text-lg mb-4">
          Deja tu comentario
        </SeoHeading>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border rounded-md mb-3 min-h-[100px]"
          placeholder="Escribe tu comentario aquí..."
          aria-label="Comentario"
        />
        <button
          onClick={handleSubmitComment}
          disabled={isSubmitting || !newComment.trim()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Publicar comentario"}
        </button>
      </div>
    </section>
  );
}

// Componente para artículos relacionados
function RelatedArticles() {
  return (
    <section className="mt-12 pt-8 border-t" aria-labelledby="related-heading">
      <SeoHeading level={2} id="related-heading" className="mb-6">
        Artículos relacionados
      </SeoHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-background rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-40">
              <Image
                src={`https://images.unsplash.com/photo-155266473${i}-d307ca884978?q=80&w=800&auto=format&fit=crop`}
                alt="Artículo relacionado"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
                <Link href="/blog/articulo-relacionado">
                  Título del artículo relacionado {i}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                Breve descripción del artículo relacionado.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Componente principal
export default function ArticleClient({ article }: { article: Article }) {
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
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Categorías */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {article.categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/categoria/${category.toLowerCase().replace(/ /g, '-')}`}
                  className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
            
            {/* Título */}
            <SeoHeading level={1} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {article.title}
            </SeoHeading>
            
            {/* Metadatos */}
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {article.readingTime}
              </span>
              <span className="inline-flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                2 comentarios
              </span>
            </div>
            
            {/* Imagen de portada */}
            <div className="relative rounded-xl overflow-hidden shadow-xl mb-8 aspect-[16/9]">
              <OptimizedImage
                src={article.coverImage}
                alt={article.title}
                priority
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Contenido del artículo */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Extracto */}
            <p className="text-xl text-muted-foreground mb-8 font-medium italic">
              {article.excerpt}
            </p>
            
            {/* Contenido */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Botones para compartir */}
            <ShareButtons title={article.title} slug={article.slug} />
            
            {/* Información del autor */}
            <AuthorBio author={article.author} />
            
            {/* Sección de comentarios */}
            <CommentSection />
            
            {/* Artículos relacionados */}
            <RelatedArticles />
          </motion.div>
        </div>
      </section>
    </>
  );
}
