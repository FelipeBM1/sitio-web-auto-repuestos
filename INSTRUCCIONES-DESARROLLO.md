# Guía de Desarrollo Local - Auto Repuestos Carlos

## 🛠️ Configuración Inicial

### 1. Clonar o Descargar el Proyecto

Si tienes el proyecto en GitHub:
```bash
git clone https://github.com/tu-usuario/auto-repuestos-carlos.git
cd auto-repuestos-carlos
```

Si descargaste el ZIP desde v0:
1. Extrae el archivo ZIP
2. Abre la terminal en la carpeta del proyecto

### 2. Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias incluyendo:
- Next.js 16
- React 19
- AI SDK de Vercel
- MongoDB Driver
- Tailwind CSS v4
- shadcn/ui components

### 3. Configurar Variables de Entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```

2. Edita `.env.local` y añade tu connection string de MongoDB:
   ```env
   MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/autorepuestos_carlos
   ```

### 4. Inicializar Base de Datos

Ejecuta el script de inicialización para crear las colecciones y añadir productos de ejemplo:

```bash
node scripts/init-database.js
```

Deberías ver:
```
🚀 Iniciando configuración de base de datos...
✅ Conectado a MongoDB
🗑️  Productos anteriores eliminados
✅ 29 productos insertados
✅ Índices creados
✅ Colección de chat configurada
🎉 Base de datos inicializada correctamente!
```

### 5. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El sitio estará disponible en: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
auto-repuestos-carlos/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # Endpoint del chatbot con IA
│   │   └── products/
│   │       └── route.ts          # API de productos
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página principal
│   └── globals.css               # Estilos globales
├── components/
│   ├── ui/                       # Componentes de shadcn/ui
│   ├── about-section.tsx         # Sección Quiénes Somos
│   ├── chatbot-modal.tsx         # Modal del chatbot
│   ├── contact-section.tsx       # Sección Contacto
│   ├── floating-buttons.tsx      # Botones flotantes (Chat/WhatsApp)
│   ├── header.tsx                # Encabezado y navegación
│   ├── hero-section.tsx          # Sección hero de inicio
│   ├── product-catalog.tsx       # Vista detallada de productos
│   └── products-section.tsx      # Vista de categorías
├── lib/
│   ├── db-utils.ts               # Utilidades de base de datos
│   ├── mongodb.ts                # Cliente de MongoDB
│   └── utils.ts                  # Utilidades generales
├── public/
│   ├── images/                   # Imágenes del proyecto
│   └── [otras imágenes]          # Imágenes de productos
├── scripts/
│   ├── init-database.js          # Script de inicialización
│   └── products-export.json      # Datos de ejemplo
├── .env.example                  # Ejemplo de variables de entorno
├── .env.local                    # Variables de entorno (no en Git)
├── package.json                  # Dependencias del proyecto
├── next.config.mjs               # Configuración de Next.js
├── tsconfig.json                 # Configuración de TypeScript
└── README.md                     # Documentación principal
```

## 🎨 Personalización

### Cambiar Colores Corporativos

Edita `app/globals.css` en las variables CSS:

```css
:root {
  --primary: oklch(0.45 0.2 25);    /* Rojo */
  --secondary: oklch(0.3 0.15 255); /* Azul */
  /* ... otros colores */
}
```

### Agregar/Modificar Productos

Edita `scripts/init-database.js` y vuelve a ejecutar:
```bash
node scripts/init-database.js
```

O usa la API:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuevo Producto",
    "category": "accesorios",
    "price": 50000,
    "description": "Descripción del producto",
    "image": "/imagen.jpg",
    "stock": 10
  }'
```

### Personalizar el Chatbot

Edita el prompt del sistema en `app/api/chat/route.ts`:

```typescript
const SYSTEM_PROMPT = `
Eres un asistente virtual de Auto Repuestos Carlos...
[Personaliza aquí el comportamiento del chatbot]
`
```

### Cambiar Información de Contacto

Edita `components/contact-section.tsx`:
- Ubicación
- Teléfono
- Email
- Horarios
- Mapa (actualiza el iframe src con tu ubicación)

## 🧪 Pruebas

### Probar el Chatbot

1. Abre el sitio en `http://localhost:3000`
2. Haz clic en el botón rojo flotante (abajo derecha)
3. Prueba preguntas como:
   - "¿Qué productos tienen?"
   - "¿Cuál es el horario?"
   - "¿Dónde están ubicados?"
   - "Necesito aceite para motor"

### Probar Navegación

- Haz clic en cada menú del header
- Verifica que todas las secciones se muestran correctamente
- Prueba en responsive (F12 > Toggle device toolbar)

### Probar Productos

1. Ve a "Nuestros Productos"
2. Haz clic en "VER MÁS" en cualquier categoría
3. Verifica que se muestran los productos
4. El botón "Comprar" está listo para integrar con tu sistema de ventas

## 🐛 Debugging

### Ver logs del servidor

Los logs aparecen en la terminal donde ejecutaste `npm run dev`

### Ver logs del chatbot

Agrega console.log en `app/api/chat/route.ts`:
```typescript
console.log('[v0] Mensaje recibido:', messages)
```

### Verificar conexión a MongoDB

```bash
node -e "require('./lib/mongodb.ts').default.then(() => console.log('✅ Conectado'))"
```

## 📦 Build de Producción

Para generar una build optimizada:

```bash
npm run build
npm start
```

Esto creará una versión optimizada en `.next/`

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Build
npm run build            # Crea build de producción
npm start                # Inicia servidor de producción

# Linting
npm run lint             # Ejecuta ESLint

# Base de datos
node scripts/init-database.js    # Inicializa/resetea DB
```

## 💡 Tips de Desarrollo

1. **Hot Reload:** Los cambios se reflejan automáticamente
2. **Error Overlay:** Next.js muestra errores en pantalla durante desarrollo
3. **Fast Refresh:** React preserva el estado entre cambios
4. **TypeScript:** Los errores de tipo se muestran en el editor

## 🔧 Solución de Problemas Comunes

### Puerto 3000 ocupado

```bash
# Usa otro puerto
PORT=3001 npm run dev
```

### Error de MongoDB

1. Verifica que MONGODB_URI esté en `.env.local`
2. Confirma que el cluster de MongoDB está activo
3. Verifica que la IP está permitida en Network Access

### Cambios no se reflejan

1. Detén el servidor (Ctrl+C)
2. Borra `.next/`: `rm -rf .next`
3. Reinicia: `npm run dev`

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [AI SDK](https://sdk.vercel.ai)
- [MongoDB](https://docs.mongodb.com)

## 📞 Ayuda

Si necesitas ayuda:
1. Revisa la documentación en README.md
2. Verifica DEPLOYMENT.md para despliegue
3. Consulta los logs de error
4. Contacta al equipo de desarrollo
