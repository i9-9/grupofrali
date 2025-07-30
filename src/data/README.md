# 📋 Estructura de Datos de Proyectos - Grupo Frali

## 🚀 Resumen

La estructura de datos de proyectos está diseñada para ser **simple**, **escalable** y **type-safe**. Incluye tipos TypeScript, un hook personalizado y componentes de ejemplo. **12 proyectos reales** de Grupo Frali incluidos.

## 📁 Archivos Principales

```
src/
├── data/
│   └── projects.json          # Datos de proyectos reales
├── types/
│   └── global.ts             # Tipos TypeScript
├── lib/
│   └── useProjects.ts        # Hook personalizado
└── components/
    └── examples/
        └── ProjectCard.tsx   # Componente de ejemplo
```

## 🏗️ Estructura JSON Con Sistema de Imágenes Optimizado

### Proyectos
```json
{
  "proyectos": [
    {
      "id": "chacras-de-mar",
      "titulo": "CHACRAS DE MAR",
      "categoria": "REAL ESTATE",
      "locacion": "Rochas, Uruguay",
      "descripcion": "Descripción completa del proyecto...",
      "imagenes": {
        "home_gallery": "/images/projects/chacras-de-mar/home-gallery.jpg",
        "desarrollos_mobile": "/images/projects/chacras-de-mar/desarrollos-mobile.jpg",
        "desarrollos_desktop": "/images/projects/chacras-de-mar/desarrollos-desktop.jpg",
        "individual_mobile": "/images/projects/chacras-de-mar/individual-mobile.jpg",
        "individual_desktop": [
          "/images/projects/chacras-de-mar/individual-desktop-1.jpg",
          "/images/projects/chacras-de-mar/individual-desktop-2.jpg",
          "/images/projects/chacras-de-mar/individual-desktop-3.jpg"
        ],
        "alt": "Vista aérea del desarrollo costero con casas modernas junto al mar"
      },
      "estadisticas": {
        "cantidad_lotes": "30",
        "superficie": "168 m²",
        "estado": "EN PLANIFICACIÓN"
      }
    }
  ]
}
```

### 📸 Sistema de Imágenes por Contexto

#### **1. Home Gallery (`home_gallery`)**
- **Uso**: Galería de proyectos en la página principal
- **Formato**: Imagen optimizada para cards/grid
- **Dimensiones sugeridas**: 400x300px (4:3)

#### **2. Desarrollos Mobile (`desarrollos_mobile`)**
- **Uso**: Lista de proyectos en mobile (página desarrollos)
- **Formato**: Imagen vertical/cuadrada
- **Dimensiones sugeridas**: 350x350px (1:1)

#### **3. Desarrollos Desktop (`desarrollos_desktop`)**
- **Uso**: Vista de proyecto en desktop (página desarrollos)
- **Formato**: Imagen horizontal que acompaña el texto
- **Dimensiones sugeridas**: 800x500px (16:10)

#### **4. Individual Mobile (`individual_mobile`)**
- **Uso**: Imagen principal en página individual mobile
- **Formato**: Imagen hero para mobile
- **Dimensiones sugeridas**: 400x250px (16:10)

#### **5. Individual Desktop (`individual_desktop[]`)**
- **Uso**: Galería de imágenes en página individual desktop
- **Formato**: Array de imágenes para galería/carrusel
- **Dimensiones sugeridas**: 1200x800px (3:2)
- **Cantidad**: 1-5 imágenes por proyecto

## 🎣 Uso del Hook

```tsx
import { useProjects } from '@/lib/useProjects'

function MiComponente() {
  const {
    getAllProjects,
    getProjectsByCategory,
    getProjectById,
    // Nuevas funciones de imágenes por contexto
    getHomeGalleryImage,
    getDesarrollosMobileImage,
    getDesarrollosDesktopImage,
    getIndividualMobileImage,
    getIndividualDesktopImages,
    getImageAlt,
    formatStatistic
  } = useProjects()

  const proyectos = getAllProjects()
  const stats = getProjectStats()

  return (
    <div>
      {proyectos.map(proyecto => (
        <div key={proyecto.id}>
          <h3>{proyecto.titulo}</h3>
          <p>{proyecto.categoria}</p>
          
          {/* Imagen para home gallery */}
          <img 
            src={getHomeGalleryImage(proyecto)} 
            alt={getImageAlt(proyecto)} 
          />
          
          {/* Imagen para página desarrollos desktop */}
          <img 
            src={getDesarrollosDesktopImage(proyecto)} 
            alt={getImageAlt(proyecto)} 
          />
          
          {/* Galería de imágenes individuales */}
          {getIndividualDesktopImages(proyecto).map((img, index) => (
            <img key={index} src={img} alt={getImageAlt(proyecto)} />
          ))}
        </div>
      ))}
    </div>
  )
}
```

## 🎨 Componente de Ejemplo

```tsx
import { ProjectCard, ProjectsGrid } from '@/components/examples/ProjectCard'

// Usar un proyecto específico
<ProjectCard project={proyecto} />

// Mostrar todos los proyectos
<ProjectsGrid />
```

## 📸 Estructura de Imágenes Organizada

### Carpetas Automáticas Generadas
```
public/images/projects/
├── chacras-de-mar/
│   ├── home-gallery.jpg           # Para galería del home
│   ├── desarrollos-mobile.jpg     # Para página desarrollos mobile
│   ├── desarrollos-desktop.jpg    # Para página desarrollos desktop
│   ├── individual-mobile.jpg      # Para página individual mobile
│   └── individual-desktop-1.jpg   # Para galería individual desktop
│       individual-desktop-2.jpg
│       individual-desktop-3.jpg
├── sofitel/
│   ├── home-gallery.jpg
│   ├── desarrollos-mobile.jpg
│   ├── desarrollos-desktop.jpg
│   ├── individual-mobile.jpg
│   └── individual-desktop-1.jpg
│       individual-desktop-2.jpg
│       individual-desktop-3.jpg
│       individual-desktop-4.jpg
└── ... (12 proyectos total)
```

### Script de Generación
```bash
# Ejecutar para crear todas las carpetas automáticamente
node scripts/create-image-folders.js
```

### Convenciones de Nomenclatura
- **`home-gallery.jpg`**: Imagen para galería principal
- **`desarrollos-mobile.jpg`**: Imagen vertical/cuadrada para mobile
- **`desarrollos-desktop.jpg`**: Imagen horizontal para desktop
- **`individual-mobile.jpg`**: Hero image para página individual mobile
- **`individual-desktop-X.jpg`**: Galería numerada para desktop (1-5 imágenes)

## 🔍 Funciones Disponibles

### Obtener Datos
- `getAllProjects()` - Todos los proyectos
- `getProjectsByCategory(categoria)` - Por categoría
- `getProjectsByStatus(estado)` - Por estado
- `getProjectById(id)` - Proyecto específico
- `searchProjects(query)` - Búsqueda en título, descripción, etc.

### Utilidades de Imágenes
- `getHomeGalleryImage(project)` - Imagen para galería del home
- `getDesarrollosMobileImage(project)` - Imagen para desarrollos mobile
- `getDesarrollosDesktopImage(project)` - Imagen para desarrollos desktop
- `getIndividualMobileImage(project)` - Imagen para página individual mobile
- `getIndividualDesktopImages(project)` - Array de imágenes para galería desktop
- `getImageAlt(project)` - Alt text de las imágenes

### Utilidades Generales
- `formatStatistic(key, value)` - Formateo de estadísticas
- `getProjectStats()` - Estadísticas generales

### Filtros
- `getCategories()` - Lista de categorías únicas
- `getStatusOptions()` - Lista de estados únicos

## 📊 Estadísticas

```tsx
const stats = getProjectStats()
// Retorna:
{
  total: 12,
  byCategory: {
    "REAL ESTATE": 8,
    "AGROPECUARIA": 2,
    "HOTELERIA": 1,
    "ENERGIA RENOVABLE": 1
  },
  byStatus: {
    "EN OPERACIÓN": 5,
    "EN PLANIFICACIÓN": 3,
    "EN COMERCIALIZACIÓN ETAPA FINAL": 2,
    "100% COMERCIALIZADO Y HABITADO": 2
  }
}
```

## 🏢 Proyectos Incluidos

### **REAL ESTATE (8)**
- Chacras de Mar, La Reserva Cardales, La Villette Golf Residences
- Green House, Edgewater River, Septiembre, Terrazas de Septiembre
- Casas de Septiembre

### **AGROPECUARIA (2)**
- Elvis River y Sunflower River, Santa Regina

### **HOTELERÍA (1)**
- Sofitel La Reserva Cardales

### **ENERGÍA RENOVABLE (1)**
- La Banderita Parque Eólico

## ➕ Agregar Nuevos Proyectos

1. **Agregar al JSON**:
```json
{
  "id": "nuevo-proyecto",
  "titulo": "NUEVO PROYECTO",
  "categoria": "REAL ESTATE",
  "locacion": "Buenos Aires, Argentina",
  "descripcion": "Descripción del proyecto...",
  "imagenes": [
    {
      "src": "/images/projects/nuevo-proyecto/imagen_1.jpg",
      "alt": "Descripción de la imagen"
    }
  ],
  "estadisticas": {
    "superficie": "1000 m²",
    "estado": "EN DESARROLLO"
  }
}
```

2. **Crear carpeta de imágenes**:
```
public/images/projects/nuevo-proyecto/
```

3. **Usar en componentes**:
```tsx
const proyecto = getProjectById('nuevo-proyecto')
```

## ✅ Type Safety

Todos los tipos están definidos en `src/types/global.ts`:
- `Project` - Proyecto individual
- `ProjectsData` - Estructura completa
- `ProjectImage` - Imagen con src y alt
- `ProjectStatistics` - Estadísticas dinámicas

## 🎯 Características Clave

- ✅ **12 proyectos reales** de Grupo Frali
- ✅ **Estructura simple** sin multiidioma
- ✅ **Estadísticas dinámicas** adaptables por proyecto
- ✅ **Type Safety** completo con TypeScript
- ✅ **Hook personalizado** con utilidades
- ✅ **Componentes listos** para usar

¡Todo listo para implementar! 🚀 