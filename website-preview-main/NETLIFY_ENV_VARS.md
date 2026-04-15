# Variables de Entorno para Netlify

Para que el sitio funcione correctamente en producción, debes agregar las siguientes variables de entorno en Netlify:

## 1. Ir a Netlify Dashboard
1. Ingresa a tu cuenta de Netlify
2. Selecciona el sitio "utopica-website"
3. Ve a "Site configuration" → "Environment variables"

## 2. Agregar las siguientes variables:

### Trello API (NUEVAS - REQUERIDAS)
```
TRELLO_API_KEY=5758b8a611933cfac25c22ef3e7e0a8b
TRELLO_TOKEN=ATTA8d7fb03810f6c7de7c2c8809b6fd017b72da1122282c753ec3e32b8e6d53fef285D9D7B0
TRELLO_BOARD_ID=SREcIKss
```

### Google Gemini API
```
GOOGLE_GEMINI_API_KEY=AIzaSyC027QQJ6eqLO6RoyZFdeidD7qEeyCYC8s
```

### Firecrawl API
```
FIRECRAWL_API_KEY=fc-596a7d51391e4c6db4fe0a085b801cb4
```

### Email Service (Resend)
```
RESEND_API_KEY=re_NEjRZLSA_HmEX6Hd4ZhhwE7DwBru8TUWH
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://xpyqvgwbecnkoosjcesh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweXF2Z3diZWNua29vc2pjZXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NTc2MjksImV4cCI6MjA2NjEzMzYyOX0.ayVDWIaRhdzPCrBnbaOSHibJPcmNxCSaJ8X0MK5Iyag
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweXF2Z3diZWNua29vc2pjZXNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDU1NzYyOSwiZXhwIjoyMDY2MTMzNjI5fQ.sXJS_hQBKocQjXG_HGkgXu7oYTV99J9Se2b0V2yhZcg
```

### Application URL
```
NEXT_PUBLIC_APP_URL=https://utopica.io
```

## 3. Desplegar cambios
Después de agregar todas las variables, haz clic en "Deploy site" para que los cambios surtan efecto.

## Notas importantes:
- Las variables que comienzan con `NEXT_PUBLIC_` estarán disponibles en el cliente
- Las demás solo estarán disponibles en el servidor
- Si cambias alguna variable, necesitarás hacer un nuevo deploy para que se apliquen los cambios

## Verificación
Para verificar que todo funciona:
1. Visita la página /sprint-claridad-comercial
2. Deberías ver la fecha real del próximo taller y los lugares disponibles
3. La sección de talleres debería mostrar los próximos 3 talleres desde Trello