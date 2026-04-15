# Limpieza de Código - Junio 2024

## Resumen
Se realizó una limpieza mayor del proyecto para eliminar código no utilizado y mejorar la mantenibilidad.

## Código Preservado
Todo el código eliminado está preservado en el branch: `archive/legacy-code-2024-06`

## Archivos Eliminados

### Funcionalidad de Auditoría (no utilizada)
- components/homepage/audit-section.tsx
- app/api/audit/route.ts
- scripts/test-audit-*.js
- supabase/migrations/001_create_audit_requests.sql

### Componentes de Páginas Antiguas
- components/challenges.tsx
- components/purpose.tsx
- components/results.tsx
- components/solution.tsx
- components/who-for.tsx
- components/hero.tsx
- components/call-to-action.tsx

### Componentes UI No Utilizados (shadcn/ui)
- 40+ componentes UI que no se estaban usando
- Incluyendo: accordion, alert, avatar, calendar, carousel, etc.

### Directorios Completos
- /dev (duplicados de componentes)
- /squeeze (landing page antigua)
- /Script (scripts antiguos)
- /public/Script
- /components/workshops (funcionalidad no implementada)

### Imágenes de Servicios Antiguos
- fabrica-leads.png
- mentoria-comercial.png
- venta-consultiva.png

## Beneficios
- ✅ Reducción significativa del tamaño del proyecto
- ✅ Mejor mantenibilidad
- ✅ Builds más rápidos
- ✅ Menos confusión para desarrolladores
- ✅ Código preservado en branch de archivo

## Recuperación
Si necesitas recuperar algún archivo:
```bash
git checkout archive/legacy-code-2024-06 -- path/to/file
```