# 📋 Estructura de Datos de Proyectos

## 🚀 Resumen

La estructura de datos de proyectos está diseñada para ser **escalable**, **multiidioma** y **type-safe**. Incluye tipos TypeScript, un hook personalizado y componentes de ejemplo.

## 📁 Archivos Principales

```
src/
├── data/
│   └── projects.json          # Datos de proyectos
├── types/
│   └── global.ts             # Tipos TypeScript
├── lib/
│   └── useProjects.ts        # Hook personalizado
└── components/
    └── examples/
        └── ProjectCard.tsx   # Componente de ejemplo
```

## 🏗️ Estructura JSON

### Categorías
```json
{
  "categories": [
    {
      "id": "residential",
      "name": { "es": "Residencial", "en": "Residential" }
    }
  ]
}
```

### Estados
```json
{
  "status": [
    {
      "id": "completed",
      "name": { "es": "Completado", "en": "Completed" }
    }
  ]
}
```

### Proyectos
```json
{
  "projects": [
    {
      "id": "proyecto-unico",
      "title": { "es": "Título", "en": "Title" },
      "subtitle": { "es": "Subtítulo", "en": "Subtitle" },
      "description": { "es": "Descripción", "en": "Description" },
      "category": "residential",
      "status": "completed",
      "location": {
        "city": "Buenos Aires",
        "country": "Argentina",
        "coordinates": { "lat": -34.6118, "lng": -58.3960 }
      },
      "specs": {
        "area": { "total": 5000, "unit": "m²" },
        "floors": 10,
        "units": 50
      },
      "features": {
        "es": ["Spa", "Gimnasio"],
        "en": ["Spa", "Gym"]
      },
      "images": {
        "hero": "/images/projects/ejemplo/hero.jpg",
        "gallery": ["/images/projects/ejemplo/1.jpg"]
      },
      "investment": { "total": 50000000, "currency": "USD" },
      "featured": true,
      "order": 1
    }
  ]
}
```

## 🎣 Uso del Hook

```tsx
import { useProjects } from '@/lib/useProjects'

function MiComponente() {
  const {
    getAllProjects,
    getFeaturedProjects,
    getProjectsByCategory,
    getProjectById,
    formatInvestment,
    formatArea,
    getLocalizedText
  } = useProjects()

  const proyectos = getFeaturedProjects()
  const stats = getProjectStats()

  return (
    <div>
      {proyectos.map(proyecto => (
        <div key={proyecto.id}>
          <h3>{getLocalizedText(proyecto.title, 'es')}</h3>
          <p>{formatInvestment(proyecto.investment)}</p>
          <p>{formatArea(proyecto.specs.area)}</p>
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
<ProjectCard project={proyecto} language="es" />

// Mostrar todos los proyectos destacados
<ProjectsGrid language="es" />
```

## 🌍 Multiidioma

Todos los textos están en formato:
```json
{
  "es": "Texto en español",
  "en": "Text in English"
}
```

Usar con:
```tsx
const texto = getLocalizedText(proyecto.title, 'es') // o 'en'
```

## 📸 Imágenes

Estructura de carpetas recomendada:
```
public/images/projects/
├── sofitel/
│   ├── hero.jpg
│   ├── exterior.jpg
│   └── ...
├── cardales/
│   ├── hero.jpg
│   └── ...
└── septiembre/
    └── ...
```

## 🔍 Funciones Disponibles

### Obtener Datos
- `getAllProjects()` - Todos los proyectos
- `getFeaturedProjects()` - Solo destacados
- `getProjectsByCategory(id)` - Por categoría
- `getProjectsByStatus(id)` - Por estado
- `getProjectById(id)` - Proyecto específico
- `searchProjects(query, language)` - Búsqueda

### Formato y Utilidades
- `formatInvestment(investment)` - Formato moneda
- `formatArea(area)` - Formato área
- `getLocalizedText(text, language)` - Texto localizado
- `getProjectStats()` - Estadísticas generales

### Filtros y Ordenamiento
- `getProjectsSorted()` - Ordenados por `order`
- `getCategories()` - Lista de categorías
- `getStatusOptions()` - Lista de estados

## 📊 Estadísticas

```tsx
const stats = getProjectStats()
// Retorna:
{
  total: 3,
  completed: 1,
  inProgress: 1,
  planning: 1,
  totalInvestment: 300000000,
  averageArea: 145000
}
```

## ➕ Agregar Nuevos Proyectos

1. **Agregar al JSON**:
```json
{
  "id": "nuevo-proyecto",
  "title": { "es": "Nuevo", "en": "New" },
  // ... resto de campos
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
- `Project` - Proyecto completo
- `ProjectsData` - Estructura completa
- `Language` - 'es' | 'en'
- `LocalizedString` - Texto multiidioma

¡La estructura está lista para usar! 🚀 