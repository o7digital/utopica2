/**
 * Shared types and constants for preloading utilities
 * This file contains only type definitions and constants - no browser-specific code
 */

// Resource types for preloading
export type ResourceType = 
  | 'script' 
  | 'style' 
  | 'font' 
  | 'image' 
  | 'document' 
  | 'fetch'
  | 'modulepreload';

export type CrossOrigin = 'anonymous' | 'use-credentials' | undefined;

export interface PreloadOptions {
  as?: ResourceType;
  type?: string;
  crossorigin?: CrossOrigin;
  integrity?: string;
  media?: string;
  importance?: 'high' | 'low' | 'auto';
  fetchpriority?: 'high' | 'low' | 'auto';
}

export interface PrefetchOptions {
  priority?: 'high' | 'low' | 'auto';
  crossorigin?: CrossOrigin;
}

/**
 * Critical resources to preload on every page
 */
export const CRITICAL_RESOURCES = {
  // Critical CSS (above-the-fold)
  styles: [
    // Note: Next.js handles critical CSS automatically
  ],
  
  // Critical JavaScript chunks
  scripts: [
    // Next.js handles script preloading
  ],
  
  // Critical fonts (already configured in layout.tsx with Inter)
  fonts: [
    // Inter font is loaded via next/font
  ],
  
  // Critical images (above-the-fold)
  images: [
    '/images/Utopica Logo.svg', // Main logo
  ],
  
  // Critical API endpoints
  apis: [
    '/api/workshops',
    '/api/health'
  ]
} as const;

/**
 * Page-specific preload configurations
 */
export const PAGE_PRELOAD_CONFIG = {
  homepage: {
    images: [
      '/images/Utopica Logo.svg'
    ],
    apis: [
      '/api/workshops'
    ],
    prefetch: [
      '/sprint-claridad-comercial'
    ]
  },
  
  sprint: {
    images: [
      '/images/kit-claridad-screenshot.png'
    ],
    apis: [
      '/api/workshops'
    ],
    prefetch: [
      '/'
    ]
  },
  
  blog: {
    images: [],
    apis: [],
    prefetch: [
      '/',
      '/sprint-claridad-comercial'
    ]
  },
  
  team: {
    images: [
      '/images/team/optimized/gael-thome-new.webp'
    ],
    apis: [],
    prefetch: [
      '/',
      '/sprint-claridad-comercial'
    ]
  }
} as const;