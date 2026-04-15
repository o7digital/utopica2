# Utópica Website

Website corporativo de Utópica - Venta Consultiva B2B con IA Generativa.

## 🚀 Características

- **Homepage con mensaje de Libertad Comercial**
- **Landing page del Sprint de Claridad Comercial**
- **Sistema de Auditoría Automatizada** con IA (Gemini + Firecrawl)
- **Envío automático de reportes por email**
- **Diseño responsivo y optimizado**

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 13.5
- **Estilos:** Tailwind CSS
- **UI Components:** Radix UI + Shadcn
- **Email:** Resend
- **IA:** Google Gemini API + Firecrawl
- **Base de datos:** Supabase (preparado, no implementado aún)
- **Hosting:** Netlify

## 📋 Requisitos Previos

- Node.js 20+ 
- npm o yarn
- Cuentas en los servicios requeridos (ver variables de entorno)

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/website.git
cd website
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

4. Editar `.env.local` con tus valores reales.

## 🏃‍♂️ Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚀 Deployment en Netlify

### Configuración Inicial:

1. **Conectar con GitHub** en Netlify
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20

3. **Variables de entorno en Netlify:**
   Agregar todas las variables de `.env.production.example`

### Deploy Automático:

Los pushes a `main` se despliegan automáticamente.

### Deploy Manual:

```bash
npm run build
netlify deploy --prod
```

## 📝 Variables de Entorno Requeridas

Ver `.env.example` para la lista completa. Las principales son:

- `GOOGLE_GEMINI_API_KEY` - Para análisis de IA
- `FIRECRAWL_API_KEY` - Para extracción de contenido web
- `RESEND_API_KEY` - Para envío de emails
- Variables de Supabase (opcional por ahora)

## 🔑 APIs y Servicios

1. **Google Gemini**: [Obtener API key](https://makersuite.google.com/app/apikey)
2. **Firecrawl**: [Crear cuenta gratuita](https://firecrawl.dev)
3. **Resend**: [Obtener API key](https://resend.com)

## 📂 Estructura del Proyecto

```
website/
├── app/                    # Rutas de Next.js
│   ├── api/               # API routes
│   ├── equipo/            # Página del equipo
│   └── sprint-claridad-comercial/  # Landing del Sprint
├── components/            # Componentes React
│   ├── homepage/         # Componentes de la homepage
│   ├── sprint/           # Componentes del Sprint
│   ├── team/             # Componentes del equipo
│   └── ui/               # Componentes UI reutilizables
├── lib/                   # Utilidades y configuraciones
├── public/                # Assets estáticos
└── scripts/               # Scripts de utilidad
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte, envía un email a gael@utopica.io# GA Update
