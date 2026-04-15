import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validar configuración
const isValidConfig = 
  supabaseUrl.startsWith('https://') && 
  supabaseUrl.includes('.supabase.co') &&
  supabaseAnonKey.startsWith('ey');

/**
 * Crear cliente de Supabase para el navegador
 * Usado en componentes del cliente
 */
export function createSupabaseBrowserClient() {
  if (!isValidConfig) {
    console.error('Invalid Supabase configuration');
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Cliente singleton para el navegador
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (typeof window === 'undefined') {
    throw new Error('Browser client can only be used in browser environment');
  }

  if (!browserClient && isValidConfig) {
    browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }

  return browserClient;
}