# Archivos para Limpieza

## Páginas Obsoletas (pueden eliminarse)

### 1. Página de Diagnóstico
- `/app/diagnostico/`
- `/components/diagnostic/` (todos los componentes)

### 2. Página de Servicios  
- `/app/servicios/`
- `/components/services/` (todos los componentes)

### 3. Página Fábrica de Leads
- `/app/fabrica-leads/`
- `/components/fabrica/` (todos los componentes)

### 4. Página Demo
- `/app/demo/`
- `/components/demo/` (todos los componentes)

### 5. Componentes Obsoletos
- `/components/purpose.tsx`
- `/components/challenges.tsx`
- `/components/results.tsx`
- `/components/solution.tsx`
- `/components/who-for.tsx`
- `/components/hero.tsx`
- `/components/call-to-action.tsx`

### 6. Blog (si no se va a usar)
- `/app/_blog/`
- `/components/blog/`
- `/dev/app/blog/`
- `/dev/components/blog/`

## Archivos de Scripts Externos
- `/squeeze/` (landing page de LinkedIn templates)
- `/Script/` y `/app/script/` (duplicados)

## Comando para eliminar (ejecutar con precaución)
```bash
# Backup primero
git add -A && git commit -m "Backup before cleanup"

# Eliminar páginas obsoletas
rm -rf app/diagnostico app/servicios app/fabrica-leads app/demo
rm -rf components/diagnostic components/services components/fabrica components/demo

# Eliminar componentes obsoletos
rm -f components/purpose.tsx components/challenges.tsx components/results.tsx
rm -f components/solution.tsx components/who-for.tsx components/hero.tsx
rm -f components/call-to-action.tsx

# Eliminar blog si no se usa
rm -rf app/_blog components/blog dev/app/blog dev/components/blog

# Eliminar scripts externos
rm -rf squeeze Script app/script app/scripts
```

## Imágenes Obsoletas
- `/public/images/fabrica-leads.png`
- `/public/images/mentoria-comercial.png`
- `/public/images/venta-consultiva.png`
- `/public/images/og/servicios.png`
- `/public/images/og/fabrica-leads.png`
- `/public/images/og/proposito.png`
- `/public/images/og/blog.png`

## Actualizar después de la limpieza
1. Verificar que no hay referencias a estas páginas en:
   - Navigation
   - Footer
   - Sitemap
   - Enlaces internos

2. Actualizar metadatos y SEO si es necesario

3. Ejecutar build para verificar que no hay errores:
   ```bash
   npm run build
   ```