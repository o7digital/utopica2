"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  category: {
    title: string;
    posts: string[];
  };
  index: number;
}

export function CategorySection({ category, index }: CategorySectionProps) {
  return (
    <section className={`py-24 ${index % 2 === 1 ? 'bg-secondary/30' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">{category.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {category.posts.map((post, i) => (
            <motion.article
              key={post}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 hover:text-primary transition-colors">
                <Link href={`/blog/${post.toLowerCase().replace(/\s+/g, '-')}`}>
                  {post}
                </Link>
              </h3>
              <Link
                href={`/blog/${post.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center text-primary hover:text-primary/90 transition-colors"
              >
                Leer más
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}