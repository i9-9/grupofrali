# Configuración del Formulario de Contacto con EmailJS

El formulario de contacto ahora usa EmailJS, que permite enviar emails a `info@grupofrali.com` **sin necesidad de verificar dominios DNS**.

## ✅ Ventajas de EmailJS

- ✅ **Sin DNS**: No necesitas verificar dominios
- ✅ **Sin backend**: Funciona directamente desde el frontend
- ✅ **Envío directo**: Los emails llegan directamente a `info@grupofrali.com`
- ✅ **Plan gratuito**: 200 emails/mes gratis
- ✅ **Fácil configuración**: Solo necesitas crear una cuenta y configurar un template

## Configuración Paso a Paso

### 1. Crear cuenta en EmailJS

1. Ve a [emailjs.com](https://www.emailjs.com/) y crea una cuenta gratuita
2. Confirma tu email

### 2. Configurar Gmail en EmailJS

1. En el dashboard de EmailJS, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona **Gmail**
4. Haz clic en **Connect Account**
5. Se abrirá una ventana de Google para autorizar EmailJS
   - Inicia sesión con tu cuenta de Gmail
   - Autoriza los permisos necesarios
   - **Importante**: Esta cuenta solo se usa para autenticación/autorización
   - Los emails pueden enviarse a cualquier destinatario (no tiene que ser el mismo email)
6. Una vez conectado, **copia el Service ID** que se genera (ej: `service_xxxxxxxx`)

**Nota**: 
- Puedes usar cualquier cuenta de Gmail que tengas
- El remitente del email puede ser diferente (configurado en el template)
- Los emails llegarán a `info@grupofrali.com` independientemente del Gmail conectado

### 3. Crear un template de email

1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Configura el template así:

**Template Name:** `contact_form`

**Subject:** `Contacto: {{title}}` (o `{{subject}}` - ambos funcionan)

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
    Nuevo mensaje de contacto
  </h2>
  
  <div style="margin-top: 20px;">
    <p><strong>Nombre:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Asunto:</strong> {{title}}</p>
  </div>
  
  <div style="margin-top: 30px;">
    <h3 style="color: #333;">Mensaje:</h3>
    <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
      {{message}}
    </p>
  </div>
</div>
```

**To Email:** `info@grupofrali.com` ⬅️ **Este es el destinatario final** (NO uses `mailingfrali@gmail.com` aquí)

**From Name:** `Contacto Grupo Frali` (texto fijo, NO uses `{{name}}`)

**From Email:** 
- ❌ NO marques "Use Default Email Address"
- ✅ Escribe manualmente: `mailingfrali@gmail.com`

**Reply To:** `{{from_email}}` ⬅️ **Importante**: usa `{{from_email}}` (NO `{{email}}`)

4. Guarda el template y **copia el Template ID** (ej: `template_xxxxxxxx`)

### 4. Obtener Public Key

1. Ve a **Account** → **General**
2. En la sección **API Keys**, **copia el Public Key** (ej: `xxxxxxxxxxxxxxxxxxxx`)

### 5. Configurar Variables de Entorno

Agrega estas variables en tu archivo `.env.local` (desarrollo) y en Vercel (producción):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

**Importante:** En Vercel, asegúrate de agregar estas variables en:
- Settings → Environment Variables
- Asignarlas a **Production**, **Preview** y **Development**

### 6. Redesplegar

Después de agregar las variables en Vercel, necesitas redesplegar:
- Ve a **Deployments**
- Haz clic en los tres puntos del último deployment
- Selecciona **Redeploy**

## Límites de EmailJS

### Plan Gratuito
- **200 emails por mes** (gratis)
- Sin límite de destinatarios
- Sin verificación DNS requerida

### Planes de Pago
- **Premium**: $15/mes - 1,000 emails/mes
- **Business**: $45/mes - 10,000 emails/mes
- **Enterprise**: Personalizado

## Estructura del Email

El email incluye:
- Nombre completo (nombre + apellido)
- Email del remitente
- Asunto
- Mensaje completo

El email se envía directamente a `info@grupofrali.com` y el Reply-To está configurado con el email del remitente para que puedas responder directamente.

## Testing

Para probar el formulario:

1. Asegúrate de tener las variables de entorno configuradas
2. Ejecuta `npm run dev` (desarrollo) o espera el deploy en producción
3. Ve a `/contacto` y completa el formulario
4. Verifica que recibas el email en `info@grupofrali.com`

## Notas Importantes

- Los emails se envían directamente desde el navegador (no hay API route)
- EmailJS valida los emails antes de enviarlos
- El formulario muestra estados visuales durante el proceso de envío
- Los errores se muestran al usuario de forma clara
- Si alcanzas el límite mensual, recibirás un error y deberás esperar al siguiente mes o actualizar el plan

## Troubleshooting

Si el formulario no funciona:

1. Verifica que las variables de entorno estén correctamente configuradas
2. Verifica que los IDs del servicio y template sean correctos
3. Revisa la consola del navegador para ver errores específicos
4. Verifica en el dashboard de EmailJS que el servicio esté activo

