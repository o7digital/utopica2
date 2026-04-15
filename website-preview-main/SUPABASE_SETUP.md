# Configuración de Supabase para Utópica Website

## Pasos para configurar Supabase:

### 1. Crear un proyecto en Supabase (si no tienes uno)
1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto con el nombre "utopica-website" (o usa uno existente)
4. Espera a que el proyecto se inicialice

### 2. Obtener las credenciales
Una vez creado el proyecto:
1. Ve a Settings > API
2. Copia los siguientes valores:
   - Project URL (ejemplo: `https://xxxxx.supabase.co`)
   - anon/public key (empieza con `eyJ...`)
   - service_role key (empieza con `eyJ...`) - ¡MANTÉN ESTO SECRETO!

### 3. Configurar las variables de entorno
Actualiza el archivo `.env.local` con tus credenciales:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

### 4. Ejecutar la migración
En el SQL Editor de Supabase:
1. Ve a SQL Editor en el dashboard de Supabase
2. Crea una nueva query
3. Copia y pega el contenido de `supabase/migrations/001_create_audit_requests.sql`
4. Ejecuta la query

### 5. Verificar la configuración
La tabla `audit_requests` debe estar creada con:
- Columnas para email, website_url, status, etc.
- Índices para optimización
- Row Level Security habilitado
- Políticas que permiten inserts anónimos pero solo service role puede leer/actualizar

### 6. Configuración adicional opcional

#### Configurar Email con Resend (ya configurado)
El sistema ya está configurado para usar Resend. Si necesitas cambiar el email de envío:
1. Ve a [Resend Dashboard](https://resend.com)
2. Verifica tu dominio
3. Actualiza `RESEND_FROM_EMAIL` en `.env.local`

#### Habilitar logs de auditoría
Si quieres ver los logs de las auditorías en tiempo real:
1. Ve a Table Editor > audit_requests en Supabase
2. Podrás ver todas las solicitudes y su estado

## Estructura de la tabla audit_requests

```sql
audit_requests
├── id (UUID, PRIMARY KEY)
├── email (VARCHAR)
├── website_url (TEXT, nullable)
├── requested_at (TIMESTAMP)
├── ip_address (VARCHAR)
├── user_agent (TEXT)
├── analysis_status (VARCHAR) - pending|processing|completed|failed
├── analysis_result (JSONB) - Resultado del análisis de Gemini
├── error_message (TEXT) - En caso de error
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Troubleshooting

### Error: "Supabase is not configured"
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que las keys empiecen con `eyJ`
- Verifica que la URL sea válida y termine en `.supabase.co`

### Error al insertar en la base de datos
- Verifica que la tabla `audit_requests` esté creada
- Revisa que las políticas RLS estén configuradas correctamente
- Verifica los logs en Supabase Dashboard > Logs

### El sistema funciona sin Supabase
El código está diseñado para funcionar sin Supabase si no está configurado. En ese caso:
- Las auditorías se procesarán pero no se guardarán en BD
- Los emails se enviarán normalmente
- No habrá histórico de auditorías