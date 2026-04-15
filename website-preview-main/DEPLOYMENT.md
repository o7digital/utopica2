# Guía de Despliegue - Utópica Website

## Variables de Entorno Requeridas

Para desplegar el sitio en producción, necesitas configurar las siguientes variables de entorno:

### 1. Servicios de Email (Resend)
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@utopica.io
```

Para obtener las credenciales:
1. Crear cuenta en [Resend](https://resend.com)
2. Verificar tu dominio
3. Generar API key en la configuración

### 2. Google Gemini AI
```env
GOOGLE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
```

Para obtener la API key:
1. Ir a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crear proyecto o seleccionar uno existente
3. Generar API key

### 3. Supabase (Base de Datos)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SUPABASE_SERVICE_ROLE_KEY=eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Para configurar Supabase:
1. Crear proyecto en [Supabase](https://supabase.com)
2. Ejecutar el SQL en `supabase/migrations/001_create_audit_requests.sql`
3. Copiar las credenciales del proyecto

### 4. URLs de Aplicación
```env
NEXT_PUBLIC_APP_URL=https://utopica.io
```

### 5. Analytics
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 6. Reclaim.ai
La URL de Reclaim.ai está hardcodeada en el componente:
```
https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial
```

Si necesitas cambiarla, edita el archivo `/components/ui/calendly-button.tsx`

## Pasos de Despliegue

### 1. Preparación Local
```bash
# Instalar dependencias
npm install

# Ejecutar build local para verificar
npm run build

# Generar imágenes Open Graph
npm run generate-og
```

### 2. Configuración en Vercel/Netlify

#### Vercel
1. Importar proyecto desde GitHub
2. Configurar variables de entorno en Project Settings
3. Deploy

#### Netlify
1. Importar proyecto desde GitHub
2. Configurar variables de entorno en Site Settings > Environment
3. El archivo `netlify.toml` ya está configurado

### 3. Post-Despliegue

1. **Verificar Supabase**:
   - Confirmar que las tablas se crearon correctamente
   - Verificar permisos RLS

2. **Probar Auditoría**:
   - Enviar una auditoría de prueba
   - Verificar que llegue el email

3. **Verificar Analytics**:
   - Confirmar que GA está registrando visitas

4. **Configurar Dominio**:
   - Apuntar DNS a Vercel/Netlify
   - Configurar SSL (automático)

## Monitoreo

### Logs de Errores
- Vercel: Dashboard > Functions > Logs
- Netlify: Functions > Logs
- Supabase: Dashboard > Logs

### Métricas Clave
- Tasa de conversión de auditorías
- Tiempo de respuesta de API
- Errores de Gemini API

## Troubleshooting

### Error: "Failed to analyze website"
- Verificar límites de API de Gemini
- Revisar logs de la función

### Error: "Email not sent"
- Verificar dominio en Resend
- Confirmar API key correcta

### Error: "Database connection failed"
- Verificar credenciales de Supabase
- Confirmar que las tablas existen