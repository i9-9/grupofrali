# Esquema Completo de Contentful - Grupo Frali

## 📋 **Resumen del Proyecto**

Sistema de gestión de contenidos bilingüe (español/inglés) para el sitio web de Grupo Frali, incluyendo proyectos, estadísticas dinámicas, equipos y toda la información del home.

---

## 🏷️ **1. Content Type: Category**

**API ID**: `category`  
**Descripción**: Categorías para clasificar proyectos (Real Estate, Renewable Energy, etc.)

### **Campos**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Nombre | `name` | Short text | ✅ | Max 100 chars | Nombre de la categoría en español |
| Nombre (EN) | `nameEn` | Short text | ✅ | Max 100 chars | Nombre de la categoría en inglés |
| Slug | `slug` | Short text | ✅ | Único, lowercase | Identificador único para URLs |
| Descripción | `description` | Long text | ❌ | Max 500 chars | Descripción en español |
| Descripción (EN) | `descriptionEn` | Long text | ❌ | Max 500 chars | Descripción en inglés |
| Activa | `isActive` | Boolean | ✅ | Default: true | Si la categoría está activa |

---

## 🏗️ **2. Content Type: Project**

**API ID**: `project`  
**Descripción**: Desarrollos e inversiones de Grupo Frali

### **Información Básica**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Título | `title` | Short text | ✅ | Max 150 chars | Título del proyecto en español |
| Título (EN) | `titleEn` | Short text | ✅ | Max 150 chars | Título del proyecto en inglés |
| Slug | `slug` | Short text | ✅ | Único, lowercase | Identificador único para URLs |
| Descripción | `description` | Rich text | ✅ | Max 2000 chars | Descripción completa en español |
| Descripción (EN) | `descriptionEn` | Rich text | ✅ | Max 2000 chars | Descripción completa en inglés |

### **Categorización y Ubicación**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Categoría | `category` | Reference | ✅ | Link to: Category | Categoría del proyecto |
| Ubicación | `location` | Short text | ❌ | Max 100 chars | Ubicación en español |
| Ubicación (EN) | `locationEn` | Short text | ❌ | Max 100 chars | Ubicación en inglés |

### **Imágenes del Proyecto**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Imagen Principal Desktop | `desarrolloDesktop` | Media | ❌ | JPG/PNG/WebP, Max 5MB | Imagen principal para desarrollo (desktop) |
| Imagen Principal Mobile | `desarrolloMobile` | Media | ❌ | JPG/PNG/WebP, Max 5MB | Imagen principal para desarrollo (mobile) |
| Galería Desktop | `galeriaDesktop` | Media (Array) | ❌ | Max 10 items, Max 5MB c/u | Galería de imágenes desktop |
| Galería Mobile | `galeriaMobile` | Media (Array) | ❌ | Max 10 items, Max 5MB c/u | Galería de imágenes mobile |
| Imagen Home | `imagenHome` | Media | ❌ | JPG/PNG/WebP, Max 5MB | Imagen para galería del home |

### **Estadísticas del Proyecto**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Estadísticas | `estadisticas` | Object (Array) | ❌ | Max 10 items | Array de estadísticas simples |

**Estructura de cada estadística:**
```json
{
  "nombre": "Superficie Total",
  "nombreEn": "Total Surface", 
  "valor": "5000 m²"
}
```

### **Estado y Configuración**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Estado | `status` | Short text | ❌ | Max 50 chars | Estado del proyecto en español |
| Estado (EN) | `statusEn` | Short text | ❌ | Max 50 chars | Estado del proyecto en inglés |
| Proyecto Destacado | `isFeatured` | Boolean | ✅ | Default: false | Si aparece destacado en el home |
| Activo | `isActive` | Boolean | ✅ | Default: true | Si el proyecto está activo |
| Orden | `displayOrder` | Number | ❌ | Min: 0 | Orden de aparición |

---

## 👥 **3. Content Type: Team Member**

**API ID**: `teamMember`  
**Descripción**: Miembros del equipo de Grupo Frali

### **Información Personal**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Nombre | `name` | Short text | ✅ | Max 100 chars | Nombre completo |
| Cargo | `position` | Short text | ✅ | Max 100 chars | Cargo en español |
| Cargo (EN) | `positionEn` | Short text | ✅ | Max 100 chars | Cargo en inglés |
| Foto | `photo` | Media | ❌ | JPG/PNG, Max 2MB | Foto del miembro |

### **Información Adicional**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Biografía | `bio` | Long text | ❌ | Max 1000 chars | Biografía en español |
| Biografía (EN) | `bioEn` | Long text | ❌ | Max 1000 chars | Biografía en inglés |

### **Configuración**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Activo | `isActive` | Boolean | ✅ | Default: true | Si está activo |
| Orden | `displayOrder` | Number | ❌ | Min: 0 | Orden de aparición |

---

## 📊 **4. Content Type: Statistic**

**API ID**: `statistic`  
**Descripción**: Estadísticas dinámicas para el home y proyectos

### **Información Básica**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Etiqueta | `label` | Short text | ✅ | Max 100 chars | Etiqueta en español |
| Etiqueta (EN) | `labelEn` | Short text | ✅ | Max 100 chars | Etiqueta en inglés |
| Valor | `value` | Short text | ✅ | Max 50 chars | Valor de la estadística |
| Unidad | `unit` | Short text | ❌ | Max 20 chars | Unidad de medida en español |
| Unidad (EN) | `unitEn` | Short text | ❌ | Max 20 chars | Unidad de medida en inglés |
| Ícono | `icon` | Media | ❌ | SVG/PNG, Max 1MB | Ícono representativo |

### **Configuración**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Orden | `displayOrder` | Number | ✅ | Min: 0 | Orden de aparición |
| Activa | `isActive` | Boolean | ✅ | Default: true | Si la estadística está activa |

---

## 🏠 **5. Content Type: Home Page**

**API ID**: `homePage`  
**Descripción**: Configuración completa de la página principal

### **Información Básica**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Título | `title` | Short text | ✅ | Max 100 chars | Título principal en español |
| Título (EN) | `titleEn` | Short text | ✅ | Max 100 chars | Título principal en inglés |
| Título Hero | `heroTitle` | Short text | ✅ | Max 150 chars | Título del hero en español |
| Título Hero (EN) | `heroTitleEn` | Short text | ✅ | Max 150 chars | Título del hero en inglés |
| Descripción | `description` | Rich text | ✅ | Max 500 chars | Descripción principal en español |
| Descripción (EN) | `descriptionEn` | Rich text | ✅ | Max 500 chars | Descripción principal en inglés |

### **Videos del Home**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Videos Desktop | `videosDesktop` | Media (Array) | ❌ | Max 3 items, MP4/WebM, Max 100MB | Videos para desktop |
| Videos Mobile | `videosMobile` | Media (Array) | ❌ | Max 3 items, MP4/WebM, Max 50MB | Videos para mobile |

### **Logos del Marquee**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Logos Marquee | `logosMarquee` | Media (Array) | ❌ | Max 10 items, SVG/PNG, Max 2MB | Logos para el marquee |

### **Proyectos Destacados**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Proyectos Destacados | `proyectosDestacados` | Reference (Array) | ❌ | Link to: Project, Max 6 items | Referencias a proyectos destacados |
| Máx. Proyectos | `maxProyectosDestacados` | Number | ❌ | Min: 1, Max: 10, Default: 6 | Máximo de proyectos a mostrar |

### **Miembros del Equipo**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Miembros Equipo | `miembrosEquipo` | Reference (Array) | ❌ | Link to: Team Member, Max 10 | Referencias a miembros del equipo |
| Máx. Miembros | `maxMiembrosEquipo` | Number | ❌ | Min: 1, Max: 15, Default: 10 | Máximo de miembros a mostrar |

### **Estadísticas Dinámicas**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Estadísticas | `estadisticas` | Reference (Array) | ❌ | Link to: Statistic, Max 10 | Referencias a estadísticas |
| Máx. Estadísticas | `maxEstadisticas` | Number | ❌ | Min: 1, Max: 10, Default: 4 | Máximo de estadísticas a mostrar |

### **Configuración**

| Campo | API ID | Tipo | Requerido | Validaciones | Descripción |
|-------|--------|------|-----------|--------------|-------------|
| Activa | `isActive` | Boolean | ✅ | Default: true | Si la página está activa |
| Fecha Actualización | `lastUpdated` | Date | ❌ | - | Última fecha de actualización |

---

## 🔗 **6. Sistema de Referencias**

### **Relaciones Principales**
```
Home Page
├── Proyectos Destacados → Project[]
├── Miembros Equipo → Team Member[]
├── Estadísticas → Statistic[]
└── Logos y Videos (Assets directos)

Project
├── Categoría → Category
├── Estadísticas (Object Array)
└── Imágenes (Assets directos)
```

### **Flujo de Datos**
1. **Home Page** obtiene proyectos marcados como `isFeatured = true`
2. **Estadísticas dinámicas** se gestionan desde el content type `Statistic`
3. **Team Members** activos se muestran según `displayOrder`
4. **Assets** (imágenes/videos) se optimizan automáticamente por Contentful

---

## ⚙️ **7. Configuración de Contentful**

### **Entornos**
- **Development**: `dev-frali-cms`
- **Staging**: `staging-frali-cms`  
- **Production**: `prod-frali-cms`

### **Webhooks de Sincronización**
```javascript
// Webhook para actualización automática
{
  "name": "Deploy Trigger",
  "url": "https://api.vercel.com/v1/integrations/deploy/...",
  "topics": ["Entry.publish", "Entry.unpublish", "Entry.archive"],
  "filters": [{
    "equals": [{"doc": "sys.environment.sys.id"}, "production"]
  }]
}
```

### **API Keys y Permisos**
- **Content Delivery API**: Solo lectura para producción
- **Content Management API**: Para actualizaciones desde admin
- **Content Preview API**: Para preview de contenido

---

## 🎯 **8. Ejemplos de Implementación**

### **Obtener Datos del Home**
```javascript
// Fetch home page data
const homeData = await contentfulClient.getEntries({
  content_type: 'homePage',
  include: 3, // Include referenced content
  'fields.isActive': true
});

const home = homeData.items[0];

// Get featured projects
const featuredProjects = home.fields.proyectosDestacados || [];

// Get team members
const teamMembers = home.fields.miembrosEquipo || [];

// Get statistics
const statistics = home.fields.estadisticas || [];
```

### **Estructura de Estadística Simple en Project**
```javascript
// Ejemplo de estadísticas en un proyecto
const projectStats = [
  {
    nombre: "Superficie Total",
    nombreEn: "Total Surface",
    valor: "185 hectáreas"
  },
  {
    nombre: "Lotes",
    nombreEn: "Lots", 
    valor: "566"
  },
  {
    nombre: "Estado",
    nombreEn: "Status",
    valor: "En Comercialización"
  }
];
```

---

## 🚀 **9. Plan de Implementación**

### **Fase 1: Setup Inicial**
1. ✅ Crear space en Contentful
2. ✅ Configurar content types
3. ✅ Establecer validaciones
4. ✅ Crear webhooks

### **Fase 2: Contenido Base**
1. 🔄 Cargar categorías iniciales
2. 🔄 Subir proyectos existentes  
3. 🔄 Agregar miembros del equipo
4. 🔄 Configurar estadísticas

### **Fase 3: Integración**
1. ⏳ Desarrollar componentes React
2. ⏳ Implementar SSG con Next.js
3. ⏳ Configurar optimización de imágenes
4. ⏳ Testing y QA

### **Fase 4: Launch**
1. ⏳ Deploy a staging
2. ⏳ Entrenamiento del cliente
3. ⏳ Deploy a producción
4. ⏳ Monitoreo y soporte

---

## 📝 **10. Notas Técnicas**

### **Optimizaciones**
- **Imágenes**: Transformaciones automáticas con Contentful Images API
- **Videos**: Compresión y múltiples formatos (MP4, WebM)
- **Caching**: CDN de Contentful + caché de aplicación
- **SEO**: Campos meta automáticos desde título/descripción

### **Validaciones Especiales**
- Slugs únicos con formato URL-friendly
- Límites de caracteres para títulos/descripciones
- Formatos de archivo específicos por tipo de media
- Referencias circulares prevenidas

### **Internacionalización**
- Todos los textos tienen versión ES/EN
- Fallback automático a español si inglés no existe
- Detección automática de idioma del usuario
- URLs bilingües (/es/proyectos, /en/projects)

---

**Este esquema está diseñado para ser:**
- 🔄 **Flexible**: Fácil agregar nuevos campos
- 🚀 **Escalable**: Maneja crecimiento de contenido
- 🎨 **Intuitivo**: Interfaz simple para el cliente
- 🌐 **Bilingüe**: Soporte completo ES/EN
- ⚡ **Performante**: Optimizado para web

*Documentación actualizada para desarrollo completo del CMS de Grupo Frali*