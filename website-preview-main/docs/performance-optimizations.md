# Performance Optimizations - Preload Pattern Implementation

## Resumen de Optimizaciones Implementadas

Este documento detalla las optimizaciones de performance implementadas en el website, especialmente enfocadas en el preload pattern y la optimización del data fetching crítico.

## 🚀 Optimizaciones Implementadas

### 1. Server-Side Data Preloading (`/lib/server/preload.ts`)

- **Server-side caching** con `unstable_cache` de Next.js 15
- **Cache warming** durante SSR para datos críticos
- **Revalidación automática** cada 5 minutos
- **Fallback resiliente** en caso de errores

```typescript
export const getCachedWorkshops = unstable_cache(
  async () => getUpcomingWorkshops(),
  ['workshops-cache'],
  { revalidate: 300, tags: ['workshops'] }
);
```

### 2. Client-Side Hook Optimizado (`/lib/hooks/use-workshops.ts`)

- **Preload pattern** con cache global
- **Deduplicación de requests** para evitar llamadas múltiples
- **Stale-while-revalidate** strategy
- **Error boundary** con fallback a datos cached

```typescript
const { nextWorkshop, loading, error } = useWorkshops({
  preload: true,
  staleTime: 5 * 60 * 1000,
  refetchOnMount: false
});
```

### 3. API Route con Cache Agresivo (`/app/api/workshops/route.ts`)

- **HTTP cache headers** optimizados
- **ETag support** para conditional requests
- **Edge caching** con `s-maxage`
- **Stale-while-revalidate** para mejor UX

```typescript
response.headers.set(
  'Cache-Control',
  'public, max-age=300, s-maxage=60, stale-while-revalidate=600'
);
```

### 4. Lazy Loading Inteligente (`/components/ui/optimized-section.tsx`)

- **Intersection Observer** optimizado
- **Priority-based loading** (high/medium/low)
- **Memoización** para prevenir re-renders
- **Placeholder handling** para mantener layout

### 5. Resource Preloading (`/components/performance/resource-preloader.tsx`)

- **Critical resource preloading** (imágenes, fuentes)
- **API warmup** para endpoints críticos
- **Prefetch** de navegación probable
- **Performance monitoring** integrado

### 6. Performance Provider (`/lib/providers/performance-provider.tsx`)

- **Context global** para datos preloaded
- **Performance monitoring** automático
- **Web Vitals tracking** (LCP, FID, CLS)
- **Resource hints** dinámicos

## 📊 Métricas de Performance Esperadas

### Antes de las Optimizaciones:
- **TTFB**: ~800ms (fetch en cliente)
- **LCP**: ~2.5s (content blocking)
- **FID**: ~150ms (JS blocking)
- **CLS**: ~0.15 (layout shifts)

### Después de las Optimizaciones:
- **TTFB**: ~200ms (preload + cache)
- **LCP**: ~1.2s (eager loading)
- **FID**: ~50ms (optimized JS)
- **CLS**: ~0.05 (stable layout)

## 🛠️ Cómo Usar las Optimizaciones

### 1. En Páginas Server Components:
```typescript
export default async function MyPage() {
  // Preload critical data during SSR
  await preloadCriticalData();
  
  return (
    <PerformanceProvider>
      <MyPageContent />
    </PerformanceProvider>
  );
}
```

### 2. En Componentes Client:
```typescript
export function MyComponent() {
  const { data, loading } = useWorkshops({
    preload: true,
    staleTime: 5 * 60 * 1000
  });
  
  return <OptimizedSection priority="high">{content}</OptimizedSection>;
}
```

### 3. Para Nuevos Endpoints:
```typescript
// Usar fetchTrelloData que incluye edge caching
const data = await fetchTrelloData('/endpoint');

// Añadir cache headers apropiados
response.headers.set('Cache-Control', 'public, max-age=300');
```

## 🔧 Herramientas de Monitoreo

### Performance Monitor:
```typescript
import { performanceMonitor } from '@/lib/utils/performance';

performanceMonitor.start('data-fetch');
const data = await fetchData();
performanceMonitor.end('data-fetch');
```

### Web Vitals:
```typescript
import { measureWebVitals } from '@/lib/utils/performance';

useEffect(() => {
  measureWebVitals(); // Automatic Web Vitals tracking
}, []);
```

## 🎯 Próximos Pasos de Optimización

1. **Service Worker** para cache offline
2. **Image optimization** con next/image
3. **Bundle splitting** más granular
4. **CDN optimization** para assets estáticos
5. **Database query optimization** en Trello API calls

## 📈 Validación de Resultados

Para validar las optimizaciones:

1. **Lighthouse CI** en pipeline
2. **Web Vitals** monitoring en producción
3. **Bundle analyzer** para JS size
4. **Network panel** para waterfalls
5. **Performance profiler** en Chrome DevTools

---

**Nota**: Todas las optimizaciones mantienen backward compatibility y incluyen fallbacks para casos de error. El código está instrumentado con logging en desarrollo para facilitar debugging.