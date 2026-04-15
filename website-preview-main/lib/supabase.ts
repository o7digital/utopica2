import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Validar que las URLs sean válidas
const isValidSupabaseConfig = 
  supabaseUrl.startsWith('https://') && 
  supabaseUrl.includes('.supabase.co') &&
  supabaseAnonKey.startsWith('ey') &&
  supabaseServiceKey.startsWith('ey');

// Cliente público para el navegador
export const supabase = isValidSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Cliente con privilegios de servicio para el servidor
export const supabaseAdmin = isValidSupabaseConfig
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Tipos para la tabla de auditorías
export interface AuditRequest {
  id?: string;
  email: string;
  website_url?: string | null;
  requested_at: string;
  ip_address?: string;
  user_agent?: string;
  analysis_status: 'pending' | 'processing' | 'completed' | 'failed';
  analysis_result?: any;
  error_message?: string;
  created_at?: string;
  updated_at?: string;
}