# Guía de Despliegue - Auto Repuestos Carlos

## 📦 Requisitos Previos

- Cuenta de Vercel (gratis en vercel.com)
- Cuenta de MongoDB Atlas (gratis en mongodb.com/cloud/atlas)
- Node.js 18+ instalado localmente

## 🗄️ Configuración de MongoDB Atlas

### 1. Crear Cluster

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo cluster (elige el tier gratuito M0)
4. Selecciona la región más cercana a tus usuarios
5. Espera a que el cluster se aprovisione (3-5 minutos)

### 2. Configurar Acceso

1. En "Database Access", crea un usuario:
   - Username: `autorepuestos_admin`
   - Password: Genera una contraseña segura
   - Rol: `Atlas admin` o `Read and write to any database`

2. En "Network Access", agrega una IP:
   - Haz clic en "Add IP Address"
   - Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
   - Esto es necesario para que Vercel pueda conectarse

### 3. Obtener Connection String

1. En "Database", haz clic en "Connect"
2. Selecciona "Connect your application"
3. Copia la connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```
4. Reemplaza `<username>` y `<password>` con tus credenciales
5. Añade el nombre de la base de datos al final: `autorepuestos_carlos`

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Sube el código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Auto Repuestos Carlos"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/auto-repuestos-carlos.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js

3. **Configura Variables de Entorno:**
   - En "Environment Variables", añade:
     ```
     MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/autorepuestos_carlos
     ```
   - Haz clic en "Deploy"

### Opción 2: CLI de Vercel

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Inicia sesión:**
   ```bash
   vercel login
   ```

3. **Despliega:**
   ```bash
   vercel
   ```

4. **Añade variables de entorno:**
   ```bash
   vercel env add MONGODB_URI
   ```
   Pega tu connection string de MongoDB

5. **Redespliega con las variables:**
   ```bash
   vercel --prod
   ```

## 🔧 Configuración Post-Despliegue

### 1. Inicializar Base de Datos

Después del primer despliegue, inicializa la base de datos con productos de ejemplo:

```bash
# Localmente con tu MONGODB_URI
MONGODB_URI="tu_connection_string" node scripts/init-database.js
```

O importa manualmente desde `scripts/products-export.json` usando MongoDB Compass o la interfaz de Atlas.

### 2. Verificar Funcionalidad

1. **Página Principal:** Verifica que carga correctamente
2. **Navegación:** Prueba todas las secciones
3. **Chatbot:** Abre el chat y haz una pregunta de prueba
4. **Productos:** Verifica que las categorías se muestran
5. **Catálogo:** Haz clic en "Ver Más" en alguna categoría

### 3. Configurar Dominio Personalizado (Opcional)

1. En el dashboard de Vercel, ve a "Settings" > "Domains"
2. Añade tu dominio personalizado (ej: `autorepuestoscarlos.com`)
3. Sigue las instrucciones para configurar DNS
4. Vercel proveerá SSL automáticamente

## 🔒 Variables de Entorno de Producción

Asegúrate de configurar estas variables en Vercel:

```env
# Requerido
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/autorepuestos_carlos

# Opcional (si usas API key propia)
OPENAI_API_KEY=sk-...
```

## 📊 Monitoreo

### Vercel Analytics

- Activado automáticamente en el código
- Ve a "Analytics" en el dashboard de Vercel
- Monitorea visitas, rendimiento y web vitals

### MongoDB Metrics

- En MongoDB Atlas, ve a "Metrics"
- Monitorea:
  - Operaciones por segundo
  - Conexiones activas
  - Uso de almacenamiento

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"

1. Verifica que la IP 0.0.0.0/0 esté en Network Access
2. Confirma que el usuario tiene permisos correctos
3. Verifica el connection string (usuario, contraseña, nombre de DB)

### Error: "Module not found"

1. Asegúrate de que todas las dependencias estén en `package.json`
2. Vercel instalará automáticamente todas las dependencias

### El chatbot no responde

1. Verifica que el Vercel AI Gateway esté funcionando
2. Revisa los logs en Vercel dashboard > "Functions"
3. El modelo por defecto es `openai/gpt-5-mini` que no requiere API key

## 🔄 Actualizaciones

Para actualizar el sitio después del despliegue inicial:

```bash
git add .
git commit -m "Descripción de cambios"
git push
```

Vercel detectará automáticamente el push y desplegará la nueva versión.

## 📞 Soporte

Si encuentras problemas:
- Revisa los logs en Vercel: Dashboard > Deployments > [tu despliegue] > "Functions"
- Verifica MongoDB Atlas logs
- Contacta soporte de Vercel: vercel.com/help

## ✅ Checklist de Despliegue

- [ ] MongoDB Atlas cluster creado y configurado
- [ ] Usuario de base de datos creado
- [ ] Network access configurado (0.0.0.0/0)
- [ ] Connection string obtenido
- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Variable MONGODB_URI configurada
- [ ] Primera build exitosa
- [ ] Base de datos inicializada con productos
- [ ] Todas las páginas funcionando
- [ ] Chatbot respondiendo correctamente
- [ ] Analytics activado
- [ ] (Opcional) Dominio personalizado configurado
