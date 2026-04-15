"use client";

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logError, getUserFriendlyErrorMessage } from '@/lib/utils/error-handling';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Boundary para Next.js 15 App Router
 * Captura errores que no son manejados por error boundaries más específicos
 * Solo se activa en production para errores del root layout
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log del error global
    logError(error, undefined, { 
      context: 'global-error-boundary',
      level: 'page',
      digest: error.digest,
    });
  }, [error]);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleReportError = () => {
    const subject = encodeURIComponent(`Error Global: ${error.message}`);
    const body = encodeURIComponent(`
Error Message: ${error.message}
Error Digest: ${error.digest || 'No digest available'}
Error Stack: ${error.stack || 'No stack trace available'}
Page URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}

Descripción adicional:
[Describe qué estabas haciendo cuando ocurrió el error]
    `);
    
    window.open(`mailto:soporte@utopica.net?subject=${subject}&body=${body}`);
  };

  const userMessage = getUserFriendlyErrorMessage(error);

  return (
    <html lang="es">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background">
          <div className="max-w-2xl space-y-8">
            {/* Header */}
            <div className="flex items-center justify-center space-x-3">
              <AlertTriangle className="h-12 w-12 text-destructive" />
              <div>
                <h1 className="text-3xl font-bold">Error Crítico</h1>
                <p className="text-muted-foreground mt-1">
                  La aplicación ha encontrado un error inesperado
                </p>
              </div>
            </div>

            {/* Mensaje principal */}
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                {userMessage}
              </p>
              
              <p className="text-sm text-muted-foreground">
                Nuestro equipo técnico ha sido notificado automáticamente del problema.
              </p>
            </div>

            {/* Detalles técnicos en desarrollo */}
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left bg-muted p-4 rounded-lg">
                <summary className="cursor-pointer font-medium hover:text-primary">
                  Detalles técnicos (desarrollo)
                </summary>
                <div className="mt-3 space-y-2">
                  <div>
                    <strong>Mensaje:</strong>
                    <pre className="text-sm bg-background p-2 rounded mt-1 overflow-auto">
                      {error.message}
                    </pre>
                  </div>
                  
                  {error.digest && (
                    <div>
                      <strong>Digest:</strong>
                      <pre className="text-sm bg-background p-2 rounded mt-1">
                        {error.digest}
                      </pre>
                    </div>
                  )}
                  
                  {error.stack && (
                    <div>
                      <strong>Stack Trace:</strong>
                      <pre className="text-sm bg-background p-2 rounded mt-1 overflow-auto max-h-40">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Acciones */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={reset}
                variant="default"
                size="lg"
                className="gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Intentar de Nuevo
              </Button>
              
              <Button 
                onClick={handleGoHome}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Home className="h-5 w-5" />
                Ir al Inicio
              </Button>
              
              <Button 
                onClick={handleReload}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Recargar Página
              </Button>
            </div>

            {/* Reportar error */}
            <div className="pt-4 border-t border-border">
              <Button 
                onClick={handleReportError}
                variant="ghost"
                className="gap-2 text-muted-foreground"
              >
                <Bug className="h-4 w-4" />
                Reportar este Error
              </Button>
              
              <p className="text-xs text-muted-foreground mt-2">
                Tu reporte nos ayuda a mejorar la aplicación
              </p>
            </div>

            {/* Información de contacto */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>¿Necesitas ayuda inmediata?</p>
              <p>
                Contáctanos en{' '}
                <a 
                  href="mailto:soporte@utopica.net" 
                  className="text-primary hover:underline"
                >
                  soporte@utopica.net
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}