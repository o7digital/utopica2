# Cache Warming & Preloading System

## Fase 5.2 del Plan Meridian - Sistema Completo de Cache Warming y Preloading

Este documento describe el sistema avanzado de cache warming y preloading implementado para optimizar el rendimiento de la aplicación.

## 🎯 Objetivos

1. **Cache Warming Proactivo**: Mantener los caches "calientes" antes de que sean solicitados
2. **Preloading Inteligente**: Precargar recursos críticos basado en patrones de uso
3. **Automatización Completa**: Scripts y APIs para warming automático
4. **Monitoreo y Métricas**: Seguimiento del rendimiento del sistema de warming

## 🏗️ Arquitectura del Sistema

### Componentes Principales

#### 1. Core Cache Warming (`/lib/cache/warming.ts`)
- Lógica central de warming con estrategias inteligentes
- Manejo de reintentos y validación de respuestas
- Sistema de prioridades (critical, high, normal, low)
- Scheduler automático con intervalos inteligentes

#### 2. API Endpoint (`/app/api/cache-warming/route.ts`)
- Endpoint seguro para triggers manuales y webhooks
- Rate limiting y autenticación
- Queue system para warming en background
- Soporte para CORS y múltiples métodos de autenticación

#### 3. Scripts de Automatización
- **`cache-warming.js`**: Script principal con múltiples estrategias
- **`post-deployment-warming.js`**: Warming especializado post-deploy
- **`scheduled-warming.js`**: Warming programado con detección de patrones de tráfico

#### 4. Sistema de Preloading (`/lib/utils/preload.ts`)
- Preloading inteligente basado en conexión y dispositivo
- Componentes React para preloading automático
- Soporte para critical resources y lazy loading

#### 5. Componentes de Performance
- **`CriticalResources`**: Server component para resource hints
- **`ResourcePreloader`**: Client component para preloading dinámico
- Integración con sistema de métricas existente

## 🚀 Características Principales

### Cache Warming Strategies

#### Critical Warming
- **Targets**: API críticos (/api/workshops, /api/health)
- **Routes**: Homepage, Sprint page
- **Frequency**: Cada 4 minutos
- **Priority**: Máxima

#### Smart Warming
- **Detección automática** de patrones de tráfico
- **Warming adaptativo** según horarios (peak/normal/off-peak)
- **Optimización** basada en histórico de uso

#### Deployment Warming
- **Invalidación** de caches existentes
- **Warming secuencial** de rutas críticas
- **Validación** de endpoints post-deploy
- **Monitoreo** de salud del deployment

### Preloading Inteligente

#### Resource Types
- **Critical CSS & JS**: Inline y preload headers
- **Images**: Above-the-fold con fetchpriority="high"
- **Fonts**: Web fonts con display=swap
- **APIs**: Critical endpoints para warming
- **DNS**: Prefetch para dominios externos

#### Smart Detection
- **Connection Type**: 2G, 3G, 4G detection
- **Data Saver**: Respeta preferencias del usuario
- **Device Memory**: Optimiza para dispositivos limitados
- **Intersection Observer**: Lazy preloading basado en viewport

## 📋 Configuración e Instalación

### 1. Variables de Entorno

```bash
# Required
CACHE_WARMING_TOKEN=your-secure-token-here
CACHE_WARMING_WEBHOOK_SECRET=your-webhook-secret

# Optional
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
TEAMS_WEBHOOK_URL=https://your-teams-webhook-url
```

### 2. NPM Scripts Disponibles

```bash
# Cache Warming
npm run cache:warm                    # Warm all critical caches
npm run cache:warm:critical          # Critical caches only
npm run cache:warm:smart             # Smart warming strategy
npm run cache:warm:deployment        # Post-deployment warming
npm run cache:health                 # Check warming system health

# Scheduler Management
npm run cache:scheduler:start        # Start automated scheduler
npm run cache:scheduler:stop         # Stop scheduler

# Specialized Scripts
npm run post-deploy-warming          # Full post-deployment sequence
npm run scheduled-warming:auto       # Auto-detect warming strategy
npm run scheduled-warming:peak       # Peak hours strategy
npm run scheduled-warming:off-peak   # Off-peak strategy
```

### 3. Integración en Componentes

#### Server Components (Critical Resources)
```tsx
import { SprintCriticalResources } from '@/components/performance/critical-resources';

export default function SprintPage() {
  return (
    <>
      <SprintCriticalResources />
      {/* Page content */}
    </>
  );
}
```

#### Client Components (Dynamic Preloading)
```tsx
import { SprintResourcePreloader } from '@/components/performance/resource-preloader';

export default function SprintClientPage() {
  return (
    <>
      <SprintResourcePreloader />
      {/* Interactive content */}
    </>
  );
}
```

## 🔧 APIs y Endpoints

### Cache Warming API

#### GET `/api/cache-warming`
- **Health check**: `?action=health`
- **Targets list**: `?action=targets`
- **Scheduler status**: `?action=scheduler`

#### POST `/api/cache-warming`
- **Authentication**: Bearer token o webhook signature
- **Rate limiting**: 10 requests/minute
- **CORS**: Configurado para dominios permitidos

##### Payload Examples:

```json
// Critical warming
{
  "action": "critical"
}

// Smart warming
{
  "action": "smart"
}

// Custom warming
{
  "action": "warm",
  "targets": [
    { "type": "route", "target": "/", "priority": "critical" },
    { "type": "api", "target": "/api/workshops", "priority": "high" }
  ],
  "options": {
    "concurrency": 3,
    "respectPriorities": true
  }
}

// Scheduler management
{
  "action": "scheduler",
  "schedulerAction": "start"
}
```

## 📊 Monitoreo y Métricas

### Health Checks
```bash
# Check warming system health
curl -X GET "https://your-domain.com/api/cache-warming?action=health"
```

### Métricas Disponibles
- **Success Rate**: Porcentaje de operaciones exitosas
- **Response Times**: Tiempos promedio de respuesta
- **Cache Hit Ratio**: Efectividad del warming
- **Failed Targets**: Endpoints que fallan consistentemente

### Dashboard Integration
El sistema se integra con el admin dashboard existente en `/admin/cache` para visualización en tiempo real.

## 🔄 Automatización y CI/CD

### Post-Deployment Integration

#### GitHub Actions Example
```yaml
- name: Post-Deployment Cache Warming
  run: |
    npm run post-deploy-warming
  env:
    CACHE_WARMING_TOKEN: ${{ secrets.CACHE_WARMING_TOKEN }}
    NEXT_PUBLIC_APP_URL: ${{ secrets.DEPLOY_URL }}
```

#### Netlify Integration
```toml
[build]
command = "npm run build"

[[plugins]]
package = "@netlify/plugin-nextjs"

[build.environment]
CACHE_WARMING_TOKEN = "your-token"

[[headers]]
for = "/api/cache-warming"
[headers.values]
X-Robots-Tag = "noindex"
```

### Cron Jobs Setup

#### Critical Warming (every 30 minutes during business hours)
```bash
*/30 9-17 * * 1-5 cd /path/to/app && npm run scheduled-warming:peak
```

#### Off-peak Warming (every 2 hours during nights/weekends)
```bash
0 */2 * * * cd /path/to/app && npm run scheduled-warming:off-peak
```

#### Auto-detection (every hour)
```bash
0 * * * * cd /path/to/app && npm run scheduled-warming:auto
```

## 🔒 Seguridad

### Authentication Methods
1. **Bearer Token**: Para requests programáticos
2. **Webhook Signatures**: Para integración con webhooks
3. **Rate Limiting**: Protección contra abuse
4. **CORS**: Restricción de dominios permitidos

### Token Generation
```bash
# Generate secure tokens
openssl rand -hex 32  # For CACHE_WARMING_TOKEN
openssl rand -hex 16  # For CACHE_WARMING_WEBHOOK_SECRET
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Warming Failures
```bash
# Check health
npm run cache:health

# Manual critical warming
npm run cache:warm:critical -- --verbose

# Check logs
tail -f logs/cache-warming.log
```

#### 2. Authentication Errors
- Verify `CACHE_WARMING_TOKEN` is set correctly
- Check token has sufficient length (32+ characters)
- Ensure webhook signatures match

#### 3. Rate Limiting
- Default: 10 requests/minute per IP
- Monitor usage with health endpoint
- Implement exponential backoff in custom scripts

#### 4. Performance Issues
```bash
# Check current warming targets
curl -X GET "https://your-domain.com/api/cache-warming?action=targets&token=YOUR_TOKEN"

# Monitor response times
npm run cache:health | grep "averageResponseTime"
```

## 📈 Optimización Continua

### Performance Metrics Tracking
- **Weekly Reports**: Automated performance reports
- **A/B Testing**: Compare warming strategies
- **Load Testing**: Validate warming effectiveness

### Scaling Considerations
- **CDN Integration**: Leverage edge caching
- **Geographic Distribution**: Multi-region warming
- **Queue Optimization**: Background processing for large warming operations

## 🎯 Resultados Esperados

### Performance Improvements
- **TTFB Reduction**: 40-60% mejora en Time to First Byte
- **Cache Hit Rate**: 85%+ para recursos críticos
- **Page Load Speed**: Sub-1s para páginas críticas
- **Core Web Vitals**: Mejoras en LCP, FID, CLS

### Operational Benefits
- **Reduced Server Load**: Menos requests "cold"
- **Better User Experience**: Navegación más fluida
- **Deployment Confidence**: Warming automático post-deploy
- **Cost Optimization**: Uso eficiente de recursos del servidor

## 📚 Referencias

- [Next.js Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching)
- [Web Performance Best Practices](https://web.dev/fast/)
- [Resource Hints Specification](https://w3c.github.io/resource-hints/)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Implementado por**: Claude Code  
**Fase**: 5.2 - Cache Warming y Preloading  
**Status**: ✅ Implementación Completa  
**Fecha**: 2025-01-27