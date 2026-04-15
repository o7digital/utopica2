"use client";

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  fallbackSrc,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Determinar si la imagen es local o externa
  const isLocalImage = src.startsWith('/');
  
  // Crear un placeholder blur para mejorar la experiencia de carga
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="20%" />
          <stop stop-color="#edeef1" offset="50%" />
          <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  // Calcular dimensiones si no se proporcionan
  const calculatedWidth = width || 800;
  const calculatedHeight = height || 600;

  return (
    <div
      className={`relative overflow-hidden ${className} ${
        isLoading ? 'animate-pulse bg-gray-200' : ''
      }`}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
    >
      {isLocalImage ? (
        <Image
          src={currentSrc}
          alt={alt}
          width={calculatedWidth}
          height={calculatedHeight}
          quality={90}
          priority={priority}
          placeholder={!priority ? `data:image/svg+xml;base64,${toBase64(shimmer(calculatedWidth, calculatedHeight))}` : 'empty'}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ objectFit }}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            if (fallbackSrc && !hasError) {
              setHasError(true);
              setCurrentSrc(fallbackSrc);
            }
          }}
          loading={priority ? 'eager' : 'lazy'}
        />
      ) : (
        // Para imágenes externas que no pueden usar el componente Image de Next.js
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ objectFit }}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      )}
    </div>
  );
}
