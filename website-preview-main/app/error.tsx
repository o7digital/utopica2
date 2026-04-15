"use client";

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logError, getUserFriendlyErrorMessage, categorizeError } from '@/lib/utils/error-handling';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error Boundary de página para Next.js 15 App Router
 * Captura errores a nivel de página y proporciona recuperación
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log del error de página
    logError(error, undefined, { 
      context: 'page-error-boundary',
      level: 'page',
      digest: error.digest,
      url: window.location.href,
    });
  }, [error]);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleReportError = () => {
    const subject = encodeURIComponent(`Error de Página: ${error.message}`);
    const body = encodeURIComponent(`
Error Message: ${error.message}
Error Digest: ${error.digest || 'No digest available'}
Page URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}

Pasos para reproducir:
1. [Describe los pasos que llevaron al error]
2. 
3. 

Comportamiento esperado:
[Describe qué esperabas que ocurriera]

Comportamiento actual:
[Describe qué ocurrió en su lugar]
    `);
    
    window.open(`mailto:soporte@utopica.net?subject=${subject}&body=${body}`);
  };

  const errorType = categorizeError(error);
  const userMessage = getUserFriendlyErrorMessage(error);
  const isChunkError = errorType === 'chunk_load_error';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation placeholder */}
      <div className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-primary">Utópica</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGoHome}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Inicio
          </Button>
        </div>
      </div>

      {/* Error content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl text-center space-y-8">
          
          {/* Error icon and title */}
          <div className="space-y-4">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {isChunkError ? 'Actualizando...' : 'Error de Página'}
              </h1>
              <p className="text-xl text-muted-foreground">
                {isChunkError 
                  ? 'Hay una nueva versión disponible'
                  : 'Algo salió mal en esta página'
                }
              </p>
            </div>
          </div>

          {/* User message */}
          <div className="bg-muted/50 p-6 rounded-lg space-y-3">
            <p className="text-lg">
              {userMessage}
            </p>
            
            {!isChunkError && (
              <p className="text-sm text-muted-foreground">
                Este error ha sido reportado automáticamente a nuestro equipo técnico.
              </p>
            )}
          </div>

          {/* Technical details for development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-muted p-4 rounded-lg">
              <summary className="cursor-pointer font-medium hover:text-primary mb-3">
                Información técnica (desarrollo)
              </summary>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Error:</strong>
                  <pre className="bg-background p-2 rounded mt-1 overflow-auto">
                    {error.message}
                  </pre>
                </div>
                
                {error.digest && (
                  <div>
                    <strong>Digest:</strong>
                    <pre className="bg-background p-2 rounded mt-1">
                      {error.digest}
                    </pre>
                  </div>
                )}
                
                <div>
                  <strong>Tipo de Error:</strong>
                  <span className="ml-2 px-2 py-1 bg-background rounded text-xs">
                    {errorType}
                  </span>
                </div>
                
                {error.stack && (
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="bg-background p-2 rounded mt-1 overflow-auto max-h-32 text-xs">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          {/* Action buttons */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={reset}
                variant="default"
                size="lg"
                className="gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                {isChunkError ? 'Actualizar Ahora' : 'Intentar de Nuevo'}
              </Button>
              
              <Button 
                onClick={handleGoBack}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver Atrás
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
            </div>

            {/* Alternative actions */}
            <div className="flex flex-wrap gap-2 justify-center text-sm">
              <Button 
                onClick={handleReload}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Recargar Página
              </Button>
              
              {!isChunkError && (
                <Button 
                  onClick={handleReportError}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <Bug className="h-4 w-4" />
                  Reportar Error
                </Button>
              )}
            </div>
          </div>

          {/* Help section */}
          {!isChunkError && (
            <div className="pt-6 border-t border-border space-y-2">
              <p className="text-sm text-muted-foreground">
                ¿El problema persiste?
              </p>
              <p className="text-sm">
                Contáctanos en{' '}
                <a 
                  href="mailto:soporte@utopica.net" 
                  className="text-primary hover:underline font-medium"
                >
                  soporte@utopica.net
                </a>
                {' '}para recibir ayuda personalizada.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}