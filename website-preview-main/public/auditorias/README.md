# Sistema de Auditoría Interactiva con Autenticación

## Descripción
Sistema de auditoría de claridad comercial protegido por contraseña para múltiples clientes.

## Estructura de Archivos
- `index.html` - Página de login con autenticación
- `auditoria.html` - Página principal de la auditoría (protegida)

## Contraseñas Configuradas

El sistema tiene cinco contraseñas configuradas:

1. **martos2024** - Acceso para Martos Metrics
2. **s4iot2024** - Acceso para S4IoT
3. **sensigas2024** - Acceso para Sensigas
4. **admin** - Acceso administrativo para todos los clientes
5. **claridad2024** - Acceso por defecto

## Características de Seguridad

- **Autenticación basada en SessionStorage**: Los datos de sesión se almacenan temporalmente en el navegador
- **Expiración automática**: La sesión expira después de 2 horas
- **Protección de rutas**: Redirección automática si no está autenticado
- **Mensajes de error**: Feedback visual para intentos de login fallidos

## Personalización

### Modificar Contraseñas
En `index.html`, busca el objeto `PASSWORDS`:

```javascript
const PASSWORDS = {
    'martos2024': 'martos-metrics',
    's4iot2024': 's4iot',
    'sensigas2024': 'sensigas',
    'admin': 'all-clients',
    'claridad2024': 'default'
};
```

### Modificar Datos de la Auditoría
En `auditoria.html`, los datos específicos del cliente se encuentran en el objeto `clientData`:

```javascript
const clientData = {
    'martos-metrics': {
        name: 'Martos Metrics',
        scores: [3, 4, 2],
        // ... más datos
    },
    's4iot': {
        name: 'S4IoT',
        scores: [2, 3, 2],
        // ... más datos
    },
    'sensigas': {
        name: 'Sensigas',
        scores: [4, 3, 2],
        // ... más datos
    }
};
```

## Uso

1. Accede a `index.html`
2. Ingresa una de las contraseñas configuradas
3. Serás redirigido automáticamente a la página de auditoría
4. La sesión se mantiene activa por 2 horas
5. Usa el botón "Cerrar Sesión" para salir

## Notas de Implementación

- El sistema usa `sessionStorage` para mayor seguridad (se borra al cerrar el navegador)
- Las contraseñas están en el código JavaScript del lado del cliente (considera implementar autenticación del lado del servidor para mayor seguridad en producción)
- El diseño es completamente responsive y utiliza Tailwind CSS