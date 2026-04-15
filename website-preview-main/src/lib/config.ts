// Centralized config that works in both Astro (Vite) and Next.js environments
// In Astro/Vite: use import.meta.env
// In Next.js: use process.env

const getEnv = (key: string, fallback?: string): string | undefined => {
  // Vite/Astro: import.meta.env is always available
  const viteVal = (import.meta as any).env?.[key];
  if (viteVal) return viteVal;
  return fallback;
};

export const RECLAIM_URL = getEnv('PUBLIC_RECLAIM_URL')
  || getEnv('NEXT_PUBLIC_RECLAIM_URL')
  || "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial";

export const IS_DEV = import.meta.env?.DEV ?? false;
export const IS_PROD = import.meta.env?.PROD ?? true;
