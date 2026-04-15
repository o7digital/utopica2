"use client";

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  logError, 
  isRecoverableError, 
  attemptRecovery, 
  getUserFriendlyErrorMessage,
  categorizeError,
  type ErrorBoundaryInfo 
} from '@/lib/utils/error-handling';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorBoundaryInfo | null;
  isRecovering: boolean;
  recoveryAttempts: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  level?: 'page' | 'section' | 'component';
  context?: string;
  enableRecovery?: boolean;
  maxRecoveryAttempts?: number;
  onError?: (error: Error, errorInfo: ErrorBoundaryInfo) => void;
}

/**
 * Error Boundary Component para capturar errores de JavaScript
 * Proporciona fallbacks informativos y capacidades de recuperación automática
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private recoveryTimer: NodeJS.Timeout | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isRecovering: false,
      recoveryAttempts: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorBoundaryInfo) {
    const { context, onError, enableRecovery = true, maxRecoveryAttempts = 3 } = this.props;
    
    this.setState({ errorInfo });
    
    // Log del error
    logError(error, errorInfo, { 
      context, 
      level: this.props.level || 'component' 
    });
    
    // Callback personalizado
    if (onError) {
      onError(error, errorInfo);
    }
    
    // Intentar recuperación automática si está habilitada
    if (enableRecovery && this.state.recoveryAttempts < maxRecoveryAttempts) {
      this.attemptAutomaticRecovery(error);
    }
  }

  componentWillUnmount() {
    if (this.recoveryTimer) {
      clearTimeout(this.recoveryTimer);
    }
  }

  private attemptAutomaticRecovery = async (error: Error) => {
    const { maxRecoveryAttempts = 3 } = this.props;
    
    if (this.state.recoveryAttempts >= maxRecoveryAttempts) {
      return;
    }
    
    if (isRecoverableError(error)) {
      this.setState({ isRecovering: true });
      
      // Intentar recuperación después de un delay
      this.recoveryTimer = setTimeout(async () => {
        try {
          const recovered = await attemptRecovery(error);
          if (recovered) {
            // Si la recuperación automática fue exitosa, resetear el estado
            this.handleRetry();
          } else {
            // Si falló, incrementar attempts y detener recovery
            this.setState({ 
              isRecovering: false,
              recoveryAttempts: this.state.recoveryAttempts + 1,
            });
          }
        } catch (recoveryError) {
          console.error('Recovery failed:', recoveryError);
          this.setState({ 
            isRecovering: false,
            recoveryAttempts: this.state.recoveryAttempts + 1,
          });
        }
      }, 2000);
    }
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isRecovering: false,
      recoveryAttempts: 0,
    });
  };

  private handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private handleReportError = () => {
    const { error } = this.state;
    if (!error) return;
    
    const subject = encodeURIComponent(`Error Report: ${error.message}`);
    const body = encodeURIComponent(`
Error Message: ${error.message}
Error Stack: ${error.stack || 'No stack trace available'}
Page URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}
    `);
    
    window.open(`mailto:soporte@utopica.net?subject=${subject}&body=${body}`);
  };

  render() {
    const { hasError, error, isRecovering } = this.state;
    const { children, fallback, level = 'component' } = this.props;

    if (hasError && error) {
      // Si hay un fallback personalizado, usarlo
      if (fallback) {
        return fallback(error, this.handleRetry);
      }

      const errorType = categorizeError(error);
      const userMessage = getUserFriendlyErrorMessage(error);
      const isPageLevel = level === 'page';

      // Fallback de recuperación automática
      if (isRecovering) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Recuperando...</h3>
            <p className="text-muted-foreground">
              Intentando solucionar el problema automáticamente
            </p>
          </div>
        );
      }

      // Fallback principal
      return (
        <div className={`
          flex flex-col items-center justify-center p-8 text-center space-y-6
          ${isPageLevel ? 'min-h-screen' : 'min-h-[300px]'}
          border rounded-lg bg-background
        `}>
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <h2 className="text-xl font-semibold">
              {isPageLevel ? 'Error en la Página' : 'Error en Componente'}
            </h2>
          </div>
          
          <div className="max-w-md space-y-3">
            <p className="text-muted-foreground">
              {userMessage}
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Detalles técnicos (desarrollo)
                </summary>
                <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </details>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              onClick={this.handleRetry}
              variant="default"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Intentar de Nuevo
            </Button>
            
            {isPageLevel && (
              <Button 
                onClick={this.handleGoHome}
                variant="outline"
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Ir al Inicio
              </Button>
            )}
            
            <Button 
              onClick={this.handleReload}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Recargar Página
            </Button>
          </div>

          {process.env.NODE_ENV === 'production' && (
            <Button 
              onClick={this.handleReportError}
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
            >
              <Bug className="h-4 w-4" />
              Reportar Error
            </Button>
          )}
        </div>
      );
    }

    return children;
  }
}

/**
 * Hook para usar Error Boundary de forma declarativa
 */
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return {
    captureError,
    resetError,
  };
}

/**
 * HOC para envolver componentes con Error Boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}