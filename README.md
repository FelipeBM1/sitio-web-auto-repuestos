# Auto Repuestos Carlos - Sitio Web

## 🚗 Descripción

Aplicación web moderna e intuitiva para Auto Repuestos Carlos, empresa líder en soluciones de repuestos automotrices con más de 20 años de experiencia.

## ✨ Características

- **Chatbot Inteligente con IA**: Asistente virtual basado en AI SDK de Vercel para responder preguntas de clientes en tiempo real
- **Catálogo de Productos**: Sistema completo de categorías y productos con imágenes y precios
- **Backend MongoDB**: Base de datos NoSQL para almacenamiento de productos y mensajes del chat
- **Diseño Responsive**: Interfaz adaptable a todos los dispositivos
- **Navegación Intuitiva**: Secciones claramente organizadas (Inicio, Productos, Quiénes Somos, Contacto)

## 🛠️ Tecnologías

- **Frontend**: Next.js 16, React 19, TypeScript
- **Estilos**: Tailwind CSS v4
- **IA**: Vercel AI SDK v5
- **Base de Datos**: MongoDB
- **Componentes**: shadcn/ui

## 🚀 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con:

```env
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/autorepuestos_carlos
```

### Instalación

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
/app
  /api
    /chat          - Endpoint del chatbot con IA
    /products      - API de productos
  layout.tsx       - Layout principal
  page.tsx         - Página principal
  globals.css      - Estilos globales
/components
  header.tsx       - Navegación
  hero-section.tsx - Sección hero
  products-section.tsx - Catálogo
  about-section.tsx - Quiénes somos
  contact-section.tsx - Contacto
  chatbot-modal.tsx - Modal del chat
  floating-buttons.tsx - Botones flotantes
/lib
  mongodb.ts       - Conexión MongoDB
  db-utils.ts      - Utilidades de base de datos
```

## 🤖 Chatbot con Machine Learning

El chatbot utiliza:
- **AI SDK de Vercel**: Para procesamiento de lenguaje natural
- **GPT-5-mini**: Modelo de lenguaje avanzado
- **Agentes de IA en TypeScript**: Lógica personalizada para respuestas específicas del negocio
- **Almacenamiento en MongoDB**: Historial de conversaciones para mejorar el servicio

## 📦 Funcionalidades Principales

### 1. Página de Inicio
- Hero section con imagen de fondo
- Call-to-actions para productos y conocer más
- Botones flotantes (Chat y WhatsApp)

### 2. Productos
- 8 categorías de productos
- Vista de catálogo con "Ver Más"
- Productos individuales con imagen, título y botón "Comprar"

### 3. Quiénes Somos
- Misión y Visión
- Valores corporativos
- Historia de la empresa
- Imagen de la tienda

### 4. Contacto
- Mapa de ubicación
- Horarios de atención
- Información de contacto

## 🎨 Diseño

Colores corporativos:
- **Primario**: Rojo (#E63946 aproximado)
- **Secundario**: Azul (#1D3557 aproximado)
- **Acento**: Blanco y grises

## 📱 Responsive

El diseño se adapta a:
- Móviles (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🔒 Seguridad

- Variables de entorno para datos sensibles
- Conexiones seguras a MongoDB
- Validación de entradas del usuario

## 📊 Base de Datos MongoDB

### Colecciones:

**products**
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  stock: Number,
  createdAt: Date
}
```

**chat_messages**
```javascript
{
  _id: ObjectId,
  userId: String,
  message: String,
  response: String,
  timestamp: Date
}
```

## 🚀 Despliegue

El proyecto está optimizado para desplegarse en Vercel:

1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno en Vercel
3. Despliega automáticamente

## 📞 Soporte

Para soporte técnico, contacta a: info@autorepuestoscarlos.com

## 📄 Licencia

© 2025 Auto Repuestos Carlos. Todos los derechos reservados.
"# sitio-web-auto-repuestos" 
