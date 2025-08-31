# Esquema de Datos para Contentful - Grupo Frali

## 📋 **Resumen del Esquema**

Este documento define la estructura de datos que debe implementarse en Contentful para permitir que el cliente gestione:
- Información del home
- Proyectos destacados del home (Projects gallery)
- Videos del home
- Logos del marquee
- Fotos de equipo (management)
- Proyectos y sus imágenes (12 proyectos)

---

## 🏠 **1. Content Type: Home Page**

### **Campos Básicos**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `title` | Short text | ✅ | Título principal "Grupo Frali" |
| `titleEn` | Short text | ✅ | Título principal en inglés |
| `description` | Long text | ✅ | Descripción principal del home |
| `descriptionEn` | Long text | ✅ | Descripción principal del home en inglés |
| `heroTitle` | Short text | ✅ | Título grande del hero |
| `heroTitleEn` | Short text | ✅ | Título grande del hero en inglés |
| `heroSubtitle` | Short text | ❌ | Subtítulo opcional del hero |
| `heroSubtitleEn` | Short text | ❌ | Subtítulo opcional del hero en inglés |

### **Videos del Home**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `heroVideosDesktop` | Media (Array) | ✅ | Videos para desktop (máx. 3) |
| `heroVideosMobile` | Media (Array) | ✅ | Videos para mobile (máx. 3) |

### **Proyectos Destacados**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `featuredProjects` | Reference (Array) | ✅ | Referencias a Project (máx. 6) |
| `maxFeaturedProjects` | Number | ✅ | Máximo de proyectos a mostrar (default: 6) |

### **Equipo del Management**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `teamMembers` | Reference (Array) | ✅ | Referencias a Team Member (máx. 10) |
| `maxTeamMembers` | Number | ✅ | Máximo de miembros a mostrar (default: 10) |

### **Estadísticas del Home**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `statsProyectosDesarrollados` | Short text | ✅ | "PROYECTOS DESARROLLADOS" |
| `statsProyectosDesarrolladosEn` | Short text | ✅ | "DEVELOPED PROJECTS" |
| `statsProyectosDesarrolladosValor` | Short text | ✅ | "14" |
| `statsValorTotalActivos` | Short text | ✅ | "VALOR TOTAL DE ACTIVOS" |
| `statsValorTotalActivosEn` | Short text | ✅ | "TOTAL ASSET VALUE" |
| `statsValorTotalActivosValor` | Short text | ✅ | "300 MMUSD" |
| `statsProyectosPlanificacion` | Short text | ✅ | "PROYECTOS EN PLANIFICACIÓN" |
| `statsProyectosPlanificacionEn` | Short text | ✅ | "PROJECTS IN PLANNING" |
| `statsProyectosPlanificacionValor` | Short text | ✅ | "5" |
| `statsHectareasAgricolas` | Short text | ✅ | "HÉCTAREAS AGRÍCOLAS" |
| `statsHectareasAgricolasEn` | Short text | ✅ | "AGRICULTURAL HECTARES" |
| `statsHectareasAgricolasValor` | Short text | ✅ | "7800ha" |
| `statsEmpleadosColaboradores` | Short text | ✅ | "EMPLEADOS Y COLABORADORES" |
| `statsEmpleadosColaboradoresEn` | Short text | ✅ | "EMPLOYEES AND COLLABORATORS" |
| `statsEmpleadosColaboradoresValor` | Short text | ✅ | "+300" |
| `statsSuperficieConstruida` | Short text | ✅ | "SUPERFICIE CONSTRUIDA" |
| `statsSuperficieConstruidaEn` | Short text | ✅ | "BUILT SURFACE" |
| `statsSuperficieConstruidaValor` | Short text | ✅ | "+100.000m²" |

### **Configuración**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `isActive` | Boolean | ✅ | Si la página está activa |
| `lastModified` | Date | ✅ | Última modificación (auto) |

---

## 🎯 **2. Content Type: Project**

### **Identificación**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | Short text | ✅ | Slug único (ej: "septiembre") |
| `title` | Short text | ✅ | Título en español |
| `titleEn` | Short text | ✅ | Título en inglés |
| `displayOrder` | Number | ✅ | Orden de aparición en galerías |

### **Categorización**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `category` | Reference | ✅ | Referencia a Category |
| `location` | Short text | ✅ | Ubicación en español |
| `locationEn` | Short text | ✅ | Ubicación en inglés |

### **Descripción**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `description` | Long text | ✅ | Descripción en español |
| `descriptionEn` | Long text | ✅ | Descripción en inglés |

### **Imágenes**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `homeGallery` | Media | ❌ | Imagen para galería del home |
| `developmentMobile` | Media | ✅ | Imagen mobile para desarrollos |
| `developmentDesktop` | Media | ✅ | Imagen desktop para desarrollos |
| `individualMobile` | Media (Array) | ✅ | Imágenes individuales mobile (máx. 5) |
| `individualDesktop` | Media (Array) | ✅ | Imágenes individuales desktop (máx. 5) |
| `altText` | Short text | ✅ | Texto alternativo para accesibilidad |
| `altTextEn` | Short text | ✅ | Texto alternativo para accesibilidad en inglés |

### **Estadísticas**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `statistics` | JSON Object | ✅ | Estadísticas en español |
| `statisticsEn` | JSON Object | ✅ | Estadísticas en inglés |

### **Estado y Configuración**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `status` | Short text | ✅ | Estado en español |
| `statusEn` | Short text | ✅ | Estado en inglés |
| `isFeatured` | Boolean | ✅ | Si aparece en el home |
| `isActive` | Boolean | ✅ | Si el proyecto está activo |

---

## 🏷️ **3. Content Type: Category**

### **Información Básica**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `name` | Short text | ✅ | Nombre de la categoría en español |
| `nameEn` | Short text | ✅ | Nombre de la categoría en inglés |
| `slug` | Short text | ✅ | Identificador único (ej: "real-estate") |
| `description` | Long text | ❌ | Descripción de la categoría en español |
| `descriptionEn` | Long text | ❌ | Descripción de la categoría en inglés |

### **Configuración**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `displayOrder` | Number | ✅ | Orden de aparición |
| `isActive` | Boolean | ✅ | Si la categoría está activa |
| `color` | Short text | ❌ | Color para identificar la categoría (hex) |

---

## 🎬 **4. Content Type: Video Asset**

### **Campos Básicos**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `title` | Short text | ✅ | Título del video |
| `titleEn` | Short text | ✅ | Título del video en inglés |
| `description` | Long text | ❌ | Descripción opcional |
| `descriptionEn` | Long text | ❌ | Descripción opcional en inglés |
| `video` | Media | ✅ | Archivo de video |

### **Configuración**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `device` | Short text | ✅ | "desktop", "mobile", o "both" |
| `displayOrder` | Number | ✅ | Orden de aparición |
| `isActive` | Boolean | ✅ | Si el video está activo |

---

## 🏢 **4. Content Type: Marquee Logo**

### **Campos Básicos**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `title` | Short text | ✅ | Nombre del logo |
| `titleEn` | Short text | ✅ | Nombre del logo en inglés |
| `logo` | Media | ✅ | Imagen del logo |
| `altText` | Short text | ✅ | Texto alternativo |
| `altTextEn` | Short text | ✅ | Texto alternativo en inglés |

### **Configuración**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `link` | Short text | ❌ | URL del logo si es clickeable |
| `displayOrder` | Number | ✅ | Orden en el marquee |
| `isActive` | Boolean | ✅ | Si el logo está activo |

---

## 👥 **5. Content Type: Team Member**

### **Información Personal**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `name` | Short text | ✅ | Nombre completo |
| `position` | Short text | ✅ | Cargo en español |
| `positionEn` | Short text | ✅ | Cargo en inglés |

### **Imagen**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `photo` | Media | ✅ | Foto del miembro |
| `photoAlt` | Short text | ✅ | Texto alternativo de la foto |
| `photoAltEn` | Short text | ✅ | Texto alternativo de la foto en inglés |

### **Información Adicional**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `bio` | Long text | ❌ | Biografía en español |
| `bioEn` | Long text | ❌ | Biografía en inglés |

### **Configuración**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `displayOrder` | Number | ✅ | Orden de aparición |
| `isActive` | Boolean | ✅ | Si está activo |

---

## ⚙️ **6. Configuración de Contentful**

### **Entornos**
- **Development**: Para desarrollo y testing
- **Staging**: Para revisión del cliente
- **Production**: Para el sitio en vivo

### **Roles de Usuario**
- **Admin**: Acceso completo a todos los entornos
- **Editor**: Puede editar contenido en staging y production
- **Viewer**: Solo puede ver contenido

### **Validaciones**
- Campos requeridos marcados como obligatorios
- Límites de caracteres para títulos (máx. 100) y descripciones (máx. 2000)
- Validación de formatos de imagen (jpg, png, webp) y video (mp4, webm)
- Restricciones de tamaño: imágenes máx. 5MB, videos máx. 100MB

---

## 📊 **7. Estructura de Referencias**

### **Home Page → Projects**
- `featuredProjects` referencia a `Project` (máx. 6)

### **Project → Category**
- `category` referencia a `Category`

### **Project → Media**
- Todas las imágenes y videos referencian a `Media` entries

### **Home Page → Videos**
- `heroVideosDesktop` y `heroVideosMobile` referencian a `Video Asset`

### **Home Page → Logos**
- Los logos del marquee se referencian desde `Marquee Logo`

---

## 🚀 **8. Workflow de Implementación**

1. **Crear esquemas** en Contentful Development
2. **Migrar contenido** existente desde JSON
3. **Configurar webhooks** para sincronización
4. **Implementar en el código** con Contentful SDK
5. **Testing** con el cliente en Staging
6. **Deploy** a Production
7. **Entrenamiento** del cliente en el uso del CMS

---

## 📝 **9. Notas Importantes**

- **Internacionalización**: TODOS los campos de texto tienen versiones en español e inglés
- **Management**: El cliente puede gestionar nombre, cargo e imagen de cada miembro del equipo
- **Estadísticas**: El cliente puede modificar las estadísticas del home y su orden de aparición
- **Categorías**: El cliente puede crear, modificar y gestionar categorías de proyectos
- Todos los campos de texto deben soportar caracteres especiales (ñ, á, é, etc.)
- Las imágenes deben optimizarse automáticamente por Contentful
- Los videos deben tener formatos compatibles con web
- Implementar validaciones de contenido antes de publicar
- Mantener versionado de contenido para rollbacks si es necesario

---

*Este esquema está diseñado para ser flexible y escalable, permitiendo futuras expansiones del sitio.*
