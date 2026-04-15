# Sistema de Autenticación para Generador de Auditorías

Este documento describe el sistema completo de autenticación implementado para el generador de auditorías de Utópica.

## Arquitectura General

El sistema utiliza **Supabase Auth** como backend de autenticación y mantiene sincronización con la tabla `audit_users` para datos adicionales del perfil.

### Componentes Principales

1. **AuthProvider** - Context provider para gestión global del estado de autenticación
2. **ProtectedRoute** - Componente wrapper para proteger rutas
3. **useRequireAuth** - Hook para páginas que requieren autenticación
4. **API Routes** - Endpoints REST para operaciones de autenticación
5. **Middleware** - Protección a nivel de servidor

## Estructura de Archivos

```
components/auditorias/auth/
├── AuthProvider.tsx     # Context y provider principal
├── ProtectedRoute.tsx   # Componente para proteger rutas
└── index.ts            # Exportaciones principales

hooks/
└── useRequireAuth.ts   # Hooks de autenticación

app/api/auth/
├── login/route.ts      # Endpoint de login
├── logout/route.ts     # Endpoint de logout
├── register/route.ts   # Endpoint de registro
└── reset-password/route.ts # Endpoint de reset de contraseña

app/api/user/
└── profile/route.ts    # Gestión de perfil de usuario

app/auditorias/
├── auth/login/page.tsx      # Página de login
└── dashboard/page.tsx       # Dashboard protegido (ejemplo)

middleware.ts           # Middleware de protección de rutas
```

## Configuración Inicial

### 1. Variables de Entorno

Asegúrate de tener estas variables configuradas:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 2. Base de Datos

El sistema utiliza las siguientes tablas (ya creadas por la migración):

- `audit_users` - Perfiles de usuarios del sistema de auditorías
- `audits` - Auditorías generadas
- `audit_comments` - Comentarios en auditorías
- `audit_prompts` - Prompts personalizados
- `audit_views` - Tracking de visualizaciones

### 3. Integración en la Aplicación

Envuelve tu aplicación con el AuthProvider:

```tsx
// app/layout.tsx o donde corresponda
import { AuthProvider } from '@/components/auditorias/auth';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## Uso del Sistema

### Proteger una Página Completa

```tsx
// app/auditorias/mi-pagina/page.tsx
import { ProtectedRoute } from '@/components/auditorias/auth';

function MiPaginaContent() {
  return <div>Contenido protegido</div>;
}

export default function MiPagina() {
  return (
    <ProtectedRoute>
      <MiPaginaContent />
    </ProtectedRoute>
  );
}
```

### Usar Hook de Autenticación

```tsx
// Para componentes que necesitan datos del usuario
import { useRequireAuth } from '@/hooks/useRequireAuth';

function ComponenteProtegido() {
  const { user, loading, isAuthenticated } = useRequireAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Hola {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### Verificar Autenticación sin Redirecciones

```tsx
// Para componentes que solo necesitan verificar el estado
import { useAuthState } from '@/hooks/useRequireAuth';

function Navigation() {
  const { isAuthenticated, user, loading } = useAuthState();

  if (loading) return <NavSkeleton />;

  return (
    <nav>
      {isAuthenticated ? (
        <UserMenu user={user} />
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}
```

### Operaciones de Autenticación

```tsx
import { useAuth } from '@/components/auditorias/auth';

function AuthComponent() {
  const { login, logout, register, resetPassword, updateProfile } = useAuth();

  const handleLogin = async () => {
    const result = await login({ 
      email: 'user@example.com', 
      password: 'password' 
    });
    
    if (result.success) {
      // Login exitoso
    } else {
      // Manejar error: result.error
    }
  };

  const handleUpdateProfile = async () => {
    const result = await updateProfile({
      name: 'Nuevo Nombre',
      calendly_link: 'https://calendly.com/usuario'
    });
  };

  // ... resto del componente
}
```

## API Routes

### POST /api/auth/login

Inicia sesión con email y contraseña.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "user": { ... },
  "session": { ... },
  "message": "Login exitoso"
}
```

### POST /api/auth/register

Registra un nuevo usuario.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Nombre Usuario",
  "calendly_link": "https://calendly.com/usuario" // opcional
}
```

### POST /api/auth/logout

Cierra la sesión actual.

**Headers:**
```
Authorization: Bearer <access_token>
```

### POST /api/auth/reset-password

Envía email para resetear contraseña.

**Request:**
```json
{
  "email": "user@example.com"
}
```

### GET/PUT /api/user/profile

Obtiene o actualiza el perfil del usuario.

**Headers:**
```
Authorization: Bearer <access_token>
```

**PUT Request:**
```json
{
  "name": "Nuevo Nombre",
  "calendly_link": "https://calendly.com/nuevo-usuario",
  "photo_url": "https://example.com/photo.jpg"
}
```

## Middleware de Protección

El middleware protege automáticamente todas las rutas `/auditorias/*` excepto:

- `/auditorias/auth/login`
- `/auditorias/auth/register` 
- `/auditorias/auth/reset-password`
- `/auditorias/auth/reset-password-confirm`

Si un usuario no autenticado intenta acceder a una ruta protegida, será redirigido a login con el parámetro `?redirect=` para regresar después de autenticarse.

## Tipos TypeScript

### Principales Interfaces

```typescript
interface AuthUser {
  id: string;
  email: string;
  name: string;
  calendly_link?: string | null;
  photo_url?: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  email: string;
  password: string;
  name: string;
  calendly_link?: string;
}
```

## Seguridad

### Características Implementadas

1. **Validación de Input** - Todas las entradas son validadas tanto en cliente como servidor
2. **Sanitización de Datos** - Emails se normalizan a lowercase, nombres se limpian
3. **Rate Limiting** - Supabase maneja automáticamente límites de intentos
4. **Tokens JWT** - Sesiones seguras con tokens con expiración
5. **RLS (Row Level Security)** - Políticas de seguridad a nivel de base de datos
6. **HTTPS Obligatorio** - Todas las comunicaciones son cifradas

### Mejores Prácticas Aplicadas

- Nunca se revelan detalles específicos de errores al cliente
- Los tokens se manejan automáticamente por Supabase
- Las contraseñas nunca se almacenan en plain text
- Sincronización automática entre Supabase Auth y audit_users

## Personalización

### Loading States Personalizados

```tsx
<ProtectedRoute
  loadingComponent={MiComponenteDeLoading}
  // o
  fallback={<div>Cargando...</div>}
>
  <ContenidoProtegido />
</ProtectedRoute>
```

### Redirecciones Personalizadas

```tsx
const { user } = useRequireAuth({
  redirectTo: '/custom-login',
  includeRedirect: false
});
```

### Verificación de Permisos

```tsx
import { usePermission } from '@/hooks/useRequireAuth';

function AdminPanel() {
  const hasAdminAccess = usePermission((user) => 
    user?.email?.endsWith('@utopica.mx')
  );

  if (!hasAdminAccess) {
    return <AccessDenied />;
  }

  return <AdminContent />;
}
```

## Troubleshooting

### Problemas Comunes

1. **"Supabase no configurado"**
   - Verificar variables de entorno
   - Comprobar que las URLs son válidas

2. **Usuario no se sincroniza con audit_users**
   - Verificar que la migración se aplicó correctamente
   - Revisar políticas RLS en Supabase

3. **Redirecciones infinitas**
   - Verificar que las rutas públicas están correctamente configuradas
   - Comprobar middleware configuration

4. **Session no persiste**
   - Verificar cookies de Supabase
   - Comprobar configuración de dominio

### Debug

Activar logs de debug:

```typescript
// En development
if (process.env.NODE_ENV === 'development') {
  console.log('Auth state:', { user, loading, error });
}
```

## Próximos Pasos

1. **Implementar 2FA** - Autenticación de dos factores
2. **SSO Integration** - Google/Microsoft login
3. **Roles y Permisos** - Sistema más granular de permisos
4. **Audit Logging** - Registro de todas las acciones de autenticación
5. **Session Management** - Control de sesiones activas

---

## Soporte

Para cualquier duda o problema con el sistema de autenticación, revisar:

1. Los logs del servidor en `/api/auth/*`
2. La consola del navegador para errores del cliente
3. Los logs de Supabase Dashboard
4. Este documento de referencia

El sistema está diseñado para ser robusto y fácil de mantener, siguiendo las mejores prácticas de seguridad para aplicaciones web modernas.