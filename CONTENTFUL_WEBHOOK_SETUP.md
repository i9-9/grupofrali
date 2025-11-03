# Configuración del Webhook de Contentful para ISR

Este documento explica cómo configurar el webhook de Contentful para revalidar automáticamente las páginas cuando se hacen cambios en el contenido.

## ¿Qué hace el webhook?

Cuando se publica, despublica o elimina contenido en Contentful, el webhook notifica a Next.js para que revalide las páginas afectadas usando ISR (Incremental Static Regeneration). Esto asegura que los cambios se reflejen inmediatamente sin necesidad de esperar el tiempo de revalidación automática.

## Configuración

### 1. Generar un secreto

Genera un secreto seguro para proteger el endpoint del webhook. Puedes usar cualquier generador de strings aleatorios:

```bash
# En macOS/Linux
openssl rand -base64 32

# O usar Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. Configurar la variable de entorno

Añade el secreto a tu archivo `.env.local`:

```env
CONTENTFUL_WEBHOOK_SECRET=tu_secreto_generado_aqui
```

**IMPORTANTE**: También añade esta variable en tu plataforma de hosting (Vercel, Netlify, etc.) en las variables de entorno del proyecto.

### 3. Configurar el webhook en Contentful

1. Inicia sesión en Contentful y ve a tu Space
2. Navega a **Settings** > **Webhooks**
3. Haz clic en **Add webhook**
4. Completa la configuración:

   **Basic settings:**
   - **Name**: `Next.js Revalidation` (o el nombre que prefieras)
   - **URL**: `https://tu-dominio.vercel.app/api/revalidate`
     - **Usando el dominio de Vercel** (recomendado para empezar):
       - Ve a tu proyecto en Vercel
       - Copia el dominio automático (ej: `grupo-frali.vercel.app` o `grupo-frali-abc123.vercel.app`)
       - Úsalo en la URL: `https://grupo-frali.vercel.app/api/revalidate`
     - **Usando dominio personalizado** (cuando lo tengas configurado):
       - Reemplaza con tu dominio final (ej: `grupo-frali.com`)
       - URL: `https://grupo-frali.com/api/revalidate`
     - **Nota importante**: 
       - La revalidación es a **nivel de proyecto**, no de dominio
       - Si ambos dominios (`.vercel.app` y `.com`) apuntan al mismo proyecto de Vercel, **ambos mostrarán los cambios** automáticamente
       - Puedes usar cualquiera de los dos dominios en el webhook; ambos funcionarán igual
       - Puedes cambiar la URL del webhook en Contentful en cualquier momento sin afectar el funcionamiento

   **Triggers:**
   - Selecciona **Content Management API**
   - En **Events**, selecciona:
     - ✅ Entry publish
     - ✅ Entry unpublish
     - ✅ Entry delete
     - ✅ Entry archive
     - ✅ Entry unarchive

   **HTTP Headers:**
   - Haz clic en **Add HTTP header**
   - **Name**: `x-contentful-secret`
   - **Value**: (el mismo secreto que configuraste en `.env.local`)

5. Haz clic en **Save**

### 4. Probar el webhook

Para verificar que el webhook funciona:

1. **Opción A - Usar la interfaz de Contentful:**
   - En la página de webhooks, haz clic en tu webhook
   - Ve a la pestaña **Recent requests**
   - Edita y publica cualquier entry en Contentful
   - Deberías ver una solicitud con status 200

2. **Opción B - Usar curl:**
   ```bash
   curl -X POST https://tu-dominio.com/api/revalidate \
     -H "Content-Type: application/json" \
     -H "x-contentful-secret: tu_secreto" \
     -d '{
       "sys": {
         "id": "test-entry-id",
         "type": "Entry",
         "contentType": {
           "sys": {
             "id": "project"
           }
         }
       }
     }'
   ```

## Tipos de contenido soportados

El webhook revalida automáticamente las páginas según el tipo de contenido modificado:

| Content Type | Páginas revalidadas |
|--------------|---------------------|
| `homePage` | `/` (home) |
| `project` | `/`, `/desarrollos-proyectos`, `/desarrollos-proyectos/[id]` |
| `statistic` | `/` (home) |
| `projectStatistic` | `/`, `/desarrollos-proyectos`, `/desarrollos-proyectos/[id]` |
| `teamMember` | `/` (home) |
| `category` | `/desarrollos-proyectos` |
| Otros | Todas las páginas (por seguridad) |

## Migrar al dominio final (opcional)

Cuando tengas configurado tu dominio personalizado, puedes actualizar el webhook si lo prefieres:

1. Ve a tu proyecto en Vercel y verifica que el dominio esté configurado correctamente
2. En Contentful, ve a **Settings** > **Webhooks**
3. Edita tu webhook existente (opcional)
4. Actualiza la **URL** con tu nuevo dominio (ej: `https://grupo-frali.com/api/revalidate`)
5. Guarda los cambios

**Importante**: 
- **NO es necesario cambiar el dominio del webhook** si ya funciona con el `.vercel.app`
- Ambos dominios (`.vercel.app` y `.com`) mostrarán los cambios porque apuntan al mismo proyecto
- La revalidación se aplica al proyecto completo, independientemente del dominio usado en el webhook
- Puedes dejar el webhook con el dominio `.vercel.app` permanentemente si lo prefieres
- Solo cambia el dominio del webhook si tienes una razón específica (ej: el `.vercel.app` deja de estar disponible)

**No necesitas cambiar nada en el código** - el endpoint `/api/revalidate` funciona igual con cualquier dominio que apunte a tu proyecto.

## Desarrollo local

Para probar el webhook localmente:

1. Usa [ngrok](https://ngrok.com/) o similar para exponer tu servidor local:
   ```bash
   ngrok http 3000
   ```

2. Copia la URL HTTPS que ngrok proporciona (ej: `https://abc123.ngrok.io`)

3. En Contentful, configura el webhook con la URL: `https://abc123.ngrok.io/api/revalidate`

4. Asegúrate de que `CONTENTFUL_WEBHOOK_SECRET` esté en tu `.env.local`

**Nota**: Para producción, es mejor usar el dominio de Vercel directamente (paso 3 arriba) en lugar de ngrok.

## Troubleshooting

### El webhook no funciona

1. **Verifica el secreto:**
   - Asegúrate de que `CONTENTFUL_WEBHOOK_SECRET` esté configurado en producción
   - Verifica que el header `x-contentful-secret` coincida exactamente

2. **Revisa los logs:**
   - En Vercel: Ve a tu proyecto > Deployments > Function Logs
   - Busca errores relacionados con `/api/revalidate`

3. **Verifica la URL:**
   - Asegúrate de que la URL del webhook sea accesible públicamente
   - Prueba accediendo a `https://tu-dominio.vercel.app/api/revalidate` en tu navegador (deberías ver un mensaje JSON con `"message": "Webhook endpoint activo..."`)
   - Si usas dominio personalizado, prueba con ese dominio

4. **Revisa los eventos configurados:**
   - Asegúrate de que los eventos correctos estén seleccionados en Contentful

### El contenido no se actualiza inmediatamente

- Los cambios pueden tardar unos segundos en propagarse
- Si usas CDN, puede haber un delay adicional
- Verifica que el webhook se haya ejecutado correctamente en la interfaz de Contentful

## Seguridad

- **Nunca** compartas el secreto del webhook públicamente
- Usa secretos diferentes para desarrollo y producción
- El endpoint rechazará solicitudes sin el header correcto
- Solo Contentful puede activar la revalidación (con el secreto correcto)

## Recursos adicionales

- [Documentación de Next.js sobre ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Documentación de Contentful sobre Webhooks](https://www.contentful.com/developers/docs/concepts/webhooks/)
- [Revalidación On-Demand en Next.js](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

