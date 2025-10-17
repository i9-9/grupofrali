# Configuración de Video Posters en Contentful

## 🎯 DOS OPCIONES DISPONIBLES

El código soporta **DOS formas** de configurar videos con posters:

### ✨ OPCIÓN A: Content Type "Hero Video" (RECOMENDADA)
**Video y poster en un solo entry** - garantiza que estén correctamente emparejados.

```
Entry "Video Desktop 1"
  ├─ video: video_desktop1.mp4
  └─ poster: video_desktop1_poster.jpg  ✅ Emparejado automáticamente
```

### 📦 OPCIÓN B: Arrays Separados (Fallback)
**Arrays separados de videos y posters** - requiere mantener el orden sincronizado manualmente.

```
videosDesktop[0]: video_desktop1.mp4
postersDesktop[0]: video_desktop1_poster.jpg  ⚠️ Orden manual
```

El código **automáticamente** intentará usar OPCIÓN A primero. Si no existe, usará OPCIÓN B.

---

## ✨ OPCIÓN A: Content Type "Hero Video" (RECOMENDADA)

### ¿Por qué es mejor?
- ✅ **Imposible equivocar el emparejamiento** - video y poster están vinculados
- ✅ **Más fácil de administrar** - un entry por video
- ✅ **Escalable** - fácil agregar más campos después
- ✅ **Sin errores humanos** - no depende del orden

---

### Paso 1: Crear Content Type "Hero Video"

1. Ir a **Content Model** > **Add content type**
2. Configurar:
   - **Name**: `Hero Video`
   - **API Identifier**: `heroVideo`
   - **Description**: "Video con su imagen poster para el hero de la homepage"

### Paso 2: Agregar Campos al Content Type "Hero Video"

#### Campo 1: Title
- **Name**: `Title`
- **Field ID**: `title`
- **Type**: Short text
- **Required**: ✅ Yes
- **Description**: "Nombre descriptivo del video (ej: 'Video Desktop 1', 'Video Mobile Septiembre')"

#### Campo 2: Video
- **Name**: `Video`
- **Field ID**: `video`
- **Type**: Media (Single file)
- **Required**: ✅ Yes
- **Validation**: File type > Video
- **Description**: "Archivo de video MP4"

#### Campo 3: Poster
- **Name**: `Poster`
- **Field ID**: `poster`
- **Type**: Media (Single file)
- **Required**: ❌ No (opcional)
- **Validation**: File type > Image
- **Description**: "Imagen poster (primer frame del video). Aparece mientras el video carga."

#### Campo 4: Display Order
- **Name**: `Display Order`
- **Field ID**: `displayOrder`
- **Type**: Integer
- **Required**: ❌ No
- **Description**: "Orden de aparición (opcional, para control del orden)"

### Paso 3: Agregar Campos al Content Model "Home Page"

1. Ir a **Content Model** > **Home Page** > **Edit**
2. Agregar dos campos nuevos:

#### Campo 1: Hero Videos Desktop
- **Name**: `Hero Videos Desktop`
- **Field ID**: `heroVideosDesktop`
- **Type**: Reference (Multiple entries)
- **Required**: ❌ No
- **Validation**: Accept only specified entry type > `Hero Video`
- **Description**: "Videos para mostrar en desktop. Seleccionar múltiples entries de tipo 'Hero Video'."

#### Campo 2: Hero Videos Mobile
- **Name**: `Hero Videos Mobile`
- **Field ID**: `heroVideosMobile`
- **Type**: Reference (Multiple entries)
- **Required**: ❌ No
- **Validation**: Accept only specified entry type > `Hero Video`
- **Description**: "Videos para mostrar en mobile. Seleccionar múltiples entries de tipo 'Hero Video'."

### Paso 4: Crear Entries de "Hero Video"

1. Ir a **Content** > **Add entry** > **Hero Video**
2. Crear 4 entries:

#### Entry 1: Video Desktop 1
- **Title**: "Video Desktop 1"
- **Video**: Subir `video_desktop1.mp4`
- **Poster**: Subir `video_desktop1_poster.jpg` (del folder `/public/videos/`)
- **Display Order**: 1
- **Publish**

#### Entry 2: Video Desktop 3
- **Title**: "Video Desktop 3"
- **Video**: Subir `video_desktop3.mp4`
- **Poster**: Subir `video_desktop3_poster.jpg`
- **Display Order**: 2
- **Publish**

#### Entry 3: Video Mobile 1
- **Title**: "Video Mobile 1"
- **Video**: Subir `video_mobile1.mp4`
- **Poster**: Subir `video_mobile1_poster.jpg`
- **Display Order**: 1
- **Publish**

#### Entry 4: Video Mobile 2
- **Title**: "Video Mobile 2"
- **Video**: Subir `video_mobile2.mp4`
- **Poster**: Subir `video_mobile2_poster.jpg`
- **Display Order**: 2
- **Publish**

### Paso 5: Configurar Home Page Entry

1. Ir a **Content** > **Home Page** entry
2. En el campo **Hero Videos Desktop**:
   - Agregar reference a "Video Desktop 1"
   - Agregar reference a "Video Desktop 3"
3. En el campo **Hero Videos Mobile**:
   - Agregar reference a "Video Mobile 1"
   - Agregar reference a "Video Mobile 2"
4. **Publish**

---

## 📦 OPCIÓN B: Arrays Separados (Fallback)

⚠️ **Solo usar si no puedes implementar OPCIÓN A**

### Paso 1: Agregar Campos al Content Model "Home Page"

#### Campo 1: Posters Desktop
- **Name**: `Posters Desktop`
- **Field ID**: `postersDesktop`
- **Type**: Media (Multiple files)
- **Description**: "⚠️ ORDEN CRÍTICO: Deben estar en el mismo orden que 'Videos Desktop'"

#### Campo 2: Posters Mobile
- **Name**: `Posters Mobile`
- **Field ID**: `postersMobile`
- **Type**: Media (Multiple files)
- **Description**: "⚠️ ORDEN CRÍTICO: Deben estar en el mismo orden que 'Videos Mobile'"

### Paso 2: Configurar Home Page Entry

1. Subir las imágenes poster a **Media**
2. En **Home Page** entry:
   - **Posters Desktop**: Agregar en orden: `video_desktop1_poster.jpg`, `video_desktop3_poster.jpg`
   - **Posters Mobile**: Agregar en orden: `video_mobile1_poster.jpg`, `video_mobile2_poster.jpg`
3. ⚠️ **CRÍTICO**: Verificar que el orden coincida con `videosDesktop` y `videosMobile`

---

## 📁 Imágenes Poster Disponibles

Ya generadas localmente en `/public/videos/`:

| Archivo | Tamaño | Para Video |
|---------|--------|------------|
| `video_desktop1_poster.jpg` | 116KB | video_desktop1.mp4 |
| `video_desktop3_poster.jpg` | 211KB | video_desktop3.mp4 |
| `video_mobile1_poster.jpg` | 26KB | video_mobile1.mp4 |
| `video_mobile2_poster.jpg` | 40KB | video_mobile2.mp4 |

---

## ✨ Beneficios

Una vez configurado (cualquier opción):

- ✅ **Carga instantánea del poster** (26-211KB vs 3.8-4.7MB del video)
- ✅ **Mejor UX** durante la carga del video
- ✅ **LCP mejorado** significativamente
- ✅ **Sin CLS** - contenido visual estable desde el inicio
- ✅ **90% menos datos** para la carga inicial

---

## 🧪 Testing

### Con OPCIÓN A configurada:
```
✅ Videos muestran poster mientras cargan
✅ Cada video tiene su poster correcto garantizado
✅ Transición suave poster → video
```

### Con OPCIÓN B configurada:
```
✅ Videos muestran poster mientras cargan
⚠️ Verificar manualmente que el orden sea correcto
✅ Transición suave poster → video
```

### Sin Contentful configurado:
```
✅ Usa videos locales de /public/videos/ con sus posters
✅ Funciona perfectamente como fallback
```

---

## 🔧 Troubleshooting

**Problema**: El poster no se muestra

**OPCIÓN A**:
- Verificar que el Content Type `heroVideo` existe
- Verificar que los entries de `heroVideo` están published
- Verificar que `heroVideosDesktop` y `heroVideosMobile` tienen referencias

**OPCIÓN B**:
- Verificar que el orden de `postersDesktop` coincide con `videosDesktop`
- Verificar que el orden de `postersMobile` coincide con `videosMobile`

**Ambas**:
- Verificar que las imágenes están subidas a Contentful
- Verificar que el entry "Home Page" está published
- Limpiar cache de Next.js: `rm -rf .next && npm run build`

---

## 💡 Recomendación Final

**Usa OPCIÓN A** - Content Type "Hero Video"

Razones:
1. Más robusto - imposible equivocar el emparejamiento
2. Más fácil de mantener
3. Mejor para el futuro - puedes agregar más campos después
4. Menos propenso a errores humanos

El código ya está preparado para ambas opciones y funcionará automáticamente.
