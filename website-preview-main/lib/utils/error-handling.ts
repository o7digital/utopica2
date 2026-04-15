/**
 * Utilidades para manejo de errores - Error Handling Utilities
 * Provides comprehensive error handling and logging functionality
 */

export interface ErrorDetails {
  message: string;
  stack?: string;
  componentStack?: string;
  url?: string;
  userAgent?: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  buildId?: string;
  level: 'error' | 'warning' | 'info';
}

export interface ErrorBoundaryInfo {
  componentStack: string;
}

/**
 * Tipos de errores para categorización
 */
export enum ErrorType {
  JAVASCRIPT_ERROR = 'javascript_error',
  NETWORK_ERROR = 'network_error',
  CHUNK_LOAD_ERROR = 'chunk_load_error',
  HYDRATION_ERROR = 'hydration_error',
  API_ERROR = 'api_error',
  UNKNOWN_ERROR = 'unknown_error',
}

/**
 * Detecta el tipo de error basado en el mensaje y contexto
 */
export function categorizeError(error: Error): ErrorType {
  const message = error.message.toLowerCase();
  
  if (message.includes('loading chunk') || message.includes('loading css chunk')) {
    return ErrorType.CHUNK_LOAD_ERROR;
  }
  
  if (message.includes('hydration') || message.includes('hydrate')) {
    return ErrorType.HYDRATION_ERROR;
  }
  
  if (message.includes('network') || message.includes('fetch')) {
    return ErrorType.NETWORK_ERROR;
  }
  
  if (message.includes('api') || message.includes('http')) {
    return ErrorType.API_ERROR;
  }
  
  return ErrorType.JAVASCRIPT_ERROR;
}

/**
 * Genera un ID único para cada sesión de usuario
 */
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Obtiene información del navegador y contexto
 */
export function getEnvironmentInfo() {
  if (typeof window === 'undefined') return {};
  
  return {
    userAgent: navigator.userAgent,
    url: window.location.href,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    timestamp: new Date().toISOString(),
    buildId: process.env.NEXT_PUBLIC_BUILD_ID || 'unknown',
  };
}

/**
 * Formatea los detalles del error para logging
 */
export function formatErrorDetails(
  error: Error,
  errorInfo?: ErrorBoundaryInfo,
  additionalContext?: Record<string, any>
): ErrorDetails {
  const environmentInfo = getEnvironmentInfo();
  
  return {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    level: 'error',
    timestamp: new Date().toISOString(),
    ...environmentInfo,
    ...additionalContext,
  };
}

/**
 * Registra errores en analytics y servicios de logging
 */
export async function logError(
  error: Error,
  errorInfo?: ErrorBoundaryInfo,
  additionalContext?: Record<string, any>
): Promise<void> {
  const errorDetails = formatErrorDetails(error, errorInfo, additionalContext);
  const errorType = categorizeError(error);
  
  try {
    // Log a Google Analytics usando la función del componente analytics
    if (typeof window !== 'undefined') {
      // Importación dinámica para evitar problemas de SSR
      const { trackError } = await import('@/components/analytics');
      trackError(error, additionalContext?.context);
    }

    // Log a consola en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Triggered');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Additional Context:', additionalContext);
      console.error('Formatted Details:', errorDetails);
      console.groupEnd();
    }

    // En producción, aquí podrías enviar a servicios como Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // Ejemplo de integración con servicio de logging externo
      // await fetch('/api/log-error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorDetails),
      // });
    }
  } catch (loggingError) {
    // Si falla el logging, no queremos romper la aplicación
    console.error('Failed to log error:', loggingError);
  }
}

/**
 * Determina si un error es recuperable automáticamente
 */
export function isRecoverableError(error: Error): boolean {
  const errorType = categorizeError(error);
  
  // Los errores de chunk loading suelen ser recuperables con refresh
  if (errorType === ErrorType.CHUNK_LOAD_ERROR) {
    return true;
  }
  
  // Los errores de red pueden ser temporales
  if (errorType === ErrorType.NETWORK_ERROR) {
    return true;
  }
  
  return false;
}

/**
 * Intenta recuperarse automáticamente de errores
 */
export async function attemptRecovery(error: Error): Promise<boolean> {
  const errorType = categorizeError(error);
  
  try {
    let recovered = false;
    
    switch (errorType) {
      case ErrorType.CHUNK_LOAD_ERROR:
        // Para errores de chunk loading, recargar la página suele funcionar
        if (typeof window !== 'undefined') {
          window.location.reload();
          recovered = true;
        }
        break;
        
      case ErrorType.HYDRATION_ERROR:
        // Para errores de hidratación, intentar re-renderizar
        recovered = true;
        break;
        
      default:
        recovered = false;
    }
    
    // Track recovery attempt si fue exitoso
    if (recovered && typeof window !== 'undefined') {
      try {
        const { trackErrorRecovery } = await import('@/components/analytics');
        trackErrorRecovery(errorType);
      } catch (trackingError) {
        console.error('Failed to track recovery:', trackingError);
      }
    }
    
    return recovered;
  } catch (recoveryError) {
    console.error('Recovery attempt failed:', recoveryError);
    return false;
  }
}

/**
 * Obtiene un mensaje amigable para el usuario basado en el tipo de error
 */
export function getUserFriendlyErrorMessage(error: Error): string {
  const errorType = categorizeError(error);
  
  switch (errorType) {
    case ErrorType.CHUNK_LOAD_ERROR:
      return 'Hay una nueva versión disponible. La página se actualizará automáticamente.';
      
    case ErrorType.NETWORK_ERROR:
      return 'Problema de conexión. Por favor, verifica tu conexión a internet.';
      
    case ErrorType.HYDRATION_ERROR:
      return 'Error de carga. Intentando recuperar...';
      
    case ErrorType.API_ERROR:
      return 'Error del servidor. Por favor, intenta de nuevo en unos momentos.';
      
    default:
      return 'Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.';
  }
}

