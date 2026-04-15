# Sistema de Revalidación Inteligente de Cache

## Descripción General

El Sistema de Revalidación Inteligente de Cache es una solución avanzada para Next.js que proporciona control granular sobre la invalidación de cache, monitoreo en tiempo real, y automatización via webhooks. Está diseñado para optimizar el rendimiento mientras mantiene el contenido actualizado.

## Características Principales

### 🚀 Revalidación Avanzada
- **Revalidación Selectiva**: Invalidar cache específico por paths o tags
- **Cascada Inteligente**: Revalidación automática de contenido relacionado
- **Procesamiento en Lotes**: Manejar múltiples operaciones eficientemente
- **Sistema de Prioridades**: Alto, normal, y bajo impacto
- **Cache Warming**: Pre-cargar cache después de invalidación

### 🔒 Seguridad Robusta
- **Autenticación Multi-nivel**: Tokens separados para admin y API
- **Verificación de Signatures**: Validación de webhooks con HMAC
- **Rate Limiting**: Protección contra abuso y DDoS
- **Logging Detallado**: Auditoría completa de todas las operaciones

### 📊 Monitoreo y Analytics
- **Dashboard Administrativo**: Interfaz web para gestión manual
- **Métricas en Tiempo Real**: Estadísticas de rendimiento
- **Logs de Actividad**: Historial completo de operaciones
- **Monitoreo Continuo**: Seguimiento automático del sistema

### 🔗 Integración de Webhooks
- **Trello Integration**: Revalidación automática basada en cambios
- **GitHub Webhooks**: Soporte para repositorios y releases
- **Webhooks Genéricos**: Para integraciones personalizadas
- **Retry Logic**: Manejo robusto de errores

## Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Admin UI      │    │   API Routes    │    │   Webhooks      │
│   Dashboard     │────│   /revalidate   │────│   Trello/GitHub │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Revalidation   │
                    │     Engine      │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Cache Layer   │
                    │   Next.js ISR   │
                    └─────────────────┘
```

## Configuración

### Variables de Entorno Requeridas

```bash
# Tokens de Autenticación
REVALIDATE_TOKEN=your-secure-revalidation-token
ADMIN_TOKEN=your-secure-admin-token

# Seguridad de Webhooks
TRELLO_WEBHOOK_SECRET=your-trello-secret
GITHUB_WEBHOOK_SECRET=your-github-secret
GENERIC_WEBHOOK_SECRET=your-generic-secret

# Configuración de App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_REVALIDATE_TOKEN=your-public-token
```

### Instalación

1. **Instalar dependencias necesarias**:
   ```bash
   npm install crypto
   ```

2. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env.local
   # Editar .env.local con tus tokens
   ```

3. **Verificar instalación**:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        https://yourdomain.com/api/revalidate?action=status
   ```

## Uso del Sistema

### 1. API de Revalidación

#### Revalidación Manual
```bash
# Revalidar path específico
POST /api/revalidate?token=TOKEN&path=/sprint-claridad-comercial

# Revalidar por tag
POST /api/revalidate?token=TOKEN&tag=workshops

# Revalidar todo
POST /api/revalidate?token=TOKEN
```

#### Revalidación Avanzada (JSON)
```bash
POST /api/revalidate
Content-Type: application/json

{
  "token": "YOUR_TOKEN",
  "type": "manual",
  "targetType": "selective",
  "targets": ["/", "workshops", "/sprint-claridad-comercial"],
  "options": {
    "cascade": true,
    "warmAfter": true,
    "priority": "high",
    "batchSize": 10
  }
}
```

### 2. Dashboard Administrativo

Acceder a `https://yourdomain.com/admin/cache` para:

- **Monitoreo en Tiempo Real**: Ver métricas actuales
- **Operaciones Manuales**: Ejecutar revalidaciones específicas
- **Logs de Actividad**: Revisar historial completo
- **Configuración del Sistema**: Ajustar parámetros

### 3. Integración con Webhooks

#### Webhook de Trello
```bash
# URL del webhook
https://yourdomain.com/api/webhooks/trello

# Headers requeridos
X-Trello-Webhook: signature
Content-Type: application/json
```

#### Webhook Genérico
```bash
POST /api/webhooks/generic
X-Webhook-Signature: signature
Content-Type: application/json

{
  "action": "revalidate_tag",
  "target": "workshops",
  "cascade": true,
  "warmAfter": true,
  "priority": "high"
}
```

## Tipos de Revalidación

### 1. Por Path
- Invalida una ruta específica
- Ejemplo: `/sprint-claridad-comercial`
- Uso: Cambios en páginas específicas

### 2. Por Tag
- Invalida contenido con tag específico
- Ejemplo: `workshops`, `homepage`
- Uso: Cambios en datos compartidos

### 3. Selectiva
- Combina múltiples paths y tags
- Procesamiento inteligente en lotes
- Uso: Cambios complejos multi-área

### 4. Completa
- Invalida todo el cache
- Uso: Cambios estructurales mayores
- ⚠️ Usar con moderación

## Sistema de Prioridades

### Alta Prioridad
- Procesamiento inmediato
- Cache warming automático
- Ejemplo: Disponibilidad de workshops

### Prioridad Normal
- Procesamiento estándar
- Cascada habilitada
- Ejemplo: Contenido de páginas

### Baja Prioridad
- Procesamiento diferido
- Sin cascada automática
- Ejemplo: Cambios de configuración

## Monitoreo y Métricas

### Métricas Clave
- **Total de Operaciones**: Contador global
- **Tasa de Éxito**: Porcentaje de operaciones exitosas
- **Tiempo de Respuesta**: Promedio de procesamiento
- **Estado de Cola**: Operaciones pendientes

### Logs de Actividad
```typescript
interface RevalidationLog {
  id: string;
  timestamp: string;
  type: 'manual' | 'webhook' | 'scheduled';
  source: string;
  action: string;
  targets: string[];
  result: 'success' | 'partial' | 'failed';
  processingTime: number;
  error?: string;
}
```

## Rate Limiting

### Límites por Tipo
- **Manual**: 20 req/min por IP
- **Webhook**: 100 req/min por IP
- **Admin**: 50 req/min por IP

### Headers de Respuesta
```
X-RateLimit-Limit: 20
X-RateLimit-Remaining: 15
X-RateLimit-Reset: 1635789600
```

## Seguridad

### Autenticación
- **Tokens Separados**: Admin vs API
- **Rotación Regular**: Cambio periódico recomendado
- **Ambiente-Específico**: Tokens diferentes por entorno

### Validación de Webhooks
- **HMAC Signatures**: Verificación criptográfica
- **Provider-Specific**: Lógica por proveedor
- **Timeout Protection**: Límites de tiempo

### Logging de Seguridad
- **Intentos Fallidos**: Log de accesos denegados
- **Rate Limiting**: Registro de límites excedidos
- **Signatures Inválidos**: Auditoría de webhooks

## Mantenimiento

### Limpieza Regular
```bash
# Limpiar logs antiguos (automático)
# Los logs se mantienen automáticamente a 1000 entradas máximo

# Verificar salud del sistema
curl https://yourdomain.com/api/revalidate?action=health&token=TOKEN
```

### Monitoreo de Rendimiento
```bash
# Obtener métricas detalladas
curl https://yourdomain.com/api/cache/stats?token=ADMIN_TOKEN

# Verificar configuración
curl https://yourdomain.com/api/revalidate?action=config&token=ADMIN_TOKEN
```

## Troubleshooting

### Problemas Comunes

#### 1. Revalidación No Funciona
```bash
# Verificar configuración
curl https://yourdomain.com/api/revalidate?action=status&token=TOKEN

# Revisar logs
curl https://yourdomain.com/api/cache/logs?token=ADMIN_TOKEN&limit=10
```

#### 2. Rate Limit Excedido
- Verificar origen de requests
- Ajustar límites en `REVALIDATION_CONFIG`
- Implementar caching local

#### 3. Webhooks Fallando
- Verificar signatures
- Confirmar secrets en variables de entorno
- Revisar logs de webhook

#### 4. Dashboard No Carga
- Verificar `NEXT_PUBLIC_REVALIDATE_TOKEN`
- Confirmar que admin token está configurado
- Revisar console de browser

### Logs de Debug

```javascript
// Habilitar debug en desarrollo
console.log('Revalidation Debug:', {
  operation: 'revalidate_tag',
  target: 'workshops',
  timestamp: new Date().toISOString()
});
```

## API Reference

### Endpoints Principales

#### GET /api/revalidate
- **Propósito**: Estado del sistema y documentación
- **Auth**: Token requerido
- **Parámetros**: `action=status|config|health`

#### POST /api/revalidate
- **Propósito**: Ejecutar revalidación
- **Auth**: Token requerido
- **Formatos**: URL params o JSON body

#### GET /api/cache/stats
- **Propósito**: Métricas del sistema
- **Auth**: Admin token requerido

#### GET /api/cache/logs
- **Propósito**: Logs de actividad
- **Auth**: Admin token requerido
- **Parámetros**: `type`, `source`, `limit`, `since`

### Webhook Endpoints

#### POST /api/webhooks/trello
- **Headers**: `X-Trello-Webhook`
- **Verificación**: HMAC SHA1

#### POST /api/webhooks/generic
- **Headers**: `X-Webhook-Signature`
- **Verificación**: HMAC SHA256

## Extensión y Personalización

### Añadir Nuevos Providers
1. Crear archivo en `/api/webhooks/[provider]/route.ts`
2. Implementar lógica de verificación específica
3. Configurar secrets apropiados

### Personalizar Cascadas
```typescript
// En /lib/cache/revalidation.ts
function getRelatedTags(tag: string): string[] {
  switch(tag) {
    case 'custom-tag':
      return ['related-tag-1', 'related-tag-2'];
    default:
      return [];
  }
}
```

### Añadir Métricas Personalizadas
```typescript
// Extender interface CacheStats
interface CustomCacheStats extends CacheStats {
  customMetric: number;
  businessLogicStats: any;
}
```

## Roadmap

### Versión 2.1
- [ ] Soporte para Redis como storage de logs
- [ ] Métricas de Prometheus
- [ ] Webhooks de Slack/Discord
- [ ] Scheduling de revalidaciones

### Versión 2.2
- [ ] Machine Learning para optimización automática
- [ ] A/B testing de estrategias de cache
- [ ] CDN integration (Cloudflare/AWS)
- [ ] GraphQL subscription para real-time

## Contribución

### Desarrollo Local
1. Clone el repositorio
2. Configure variables de entorno
3. Ejecute tests: `npm run test:cache`
4. Inicie desarrollo: `npm run dev`

### Testing
```bash
# Tests unitarios
npm run test:revalidation

# Tests de integración
npm run test:webhooks

# Tests de carga
npm run test:load
```

## Licencia

Este sistema es parte del proyecto principal y sigue la misma licencia.

---

Para soporte técnico o preguntas específicas, consulte los logs del sistema o contacte al equipo de desarrollo.