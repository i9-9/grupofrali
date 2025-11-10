# Configuración del Formulario de Contacto

El formulario de contacto está implementado y envía emails a `info@grupofrali.com` usando Resend.

## ✅ Configuración Simple (SIN DNS)

**No necesitas cambiar registros DNS.** El formulario funciona inmediatamente usando el dominio de prueba de Resend.

### 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com) y crea una cuenta gratuita
2. Obtén tu API Key desde el dashboard de Resend (Settings > API Keys)

### 2. Configurar Variables de Entorno

Agrega la siguiente variable de entorno en tu archivo `.env.local` (desarrollo) y en tu plataforma de hosting (producción):

```env
RESEND_API_KEY=re_N1yCqtgN_Pia9ZdaTnEgfzVrn3ennepKc
```

**¡Eso es todo!** El formulario funcionará inmediatamente usando el dominio de prueba `onboarding@resend.dev`.

### 3. (Opcional) Usar tu propio dominio

Si más adelante quieres usar tu propio dominio `grupofrali.com` como remitente:

1. Agrega la variable opcional:
   ```env
   RESEND_FROM_EMAIL=noreply@grupofrali.com
   ```

2. Verifica tu dominio en Resend y agrega los registros DNS (SPF, DKIM)

**Nota:** El formulario funciona perfectamente sin esto. Los emails llegarán a `info@grupofrali.com` desde `onboarding@resend.dev`.

## Funcionalidades Implementadas

- ✅ Validación de campos requeridos
- ✅ Validación de formato de email
- ✅ Estados de carga (loading)
- ✅ Mensajes de éxito y error
- ✅ Limpieza automática del formulario después del envío exitoso
- ✅ Email HTML formateado con toda la información del contacto
- ✅ Reply-To configurado con el email del remitente para facilitar la respuesta

## Estructura del Email

El email incluye:
- Nombre completo (nombre + apellido)
- Email del remitente
- Asunto
- Mensaje completo

El email se envía a `info@grupofrali.com` y el Reply-To está configurado con el email del remitente para que puedas responder directamente.

## Testing

Para probar el formulario en desarrollo:

1. Asegúrate de tener `RESEND_API_KEY` configurada en `.env.local`
2. Ejecuta `npm run dev`
3. Ve a `/contacto` y completa el formulario
4. Verifica que recibas el email en `info@grupofrali.com`

## Límites de Resend

### Plan Gratuito
- **100 emails por mes** (gratis)
- Dominio de prueba `onboarding@resend.dev` (sin verificación DNS)
- Ideal para sitios pequeños y testing

### Planes de Pago
- **Plan Básico**: 10,000 emails/mes
- **Plan Profesional**: 100,000 emails/mes  
- **Plan Empresarial**: 1,000,000 emails/mes

### Otros Límites Técnicos
- **Rate limit**: ~10 emails por segundo en plan gratuito
- **Tamaño máximo**: 25 MB por email
- **Destinatarios**: Hasta 50 destinatarios por email en plan gratuito

### Recomendaciones

Para un formulario de contacto típico:
- **100 emails/mes** suele ser suficiente para sitios pequeños/medianos
- Si esperas más tráfico, considera el Plan Básico ($20/mes para 10,000 emails)
- Puedes monitorear el uso desde el dashboard de Resend

## Notas Importantes

- Los emails se envían de forma asíncrona
- El formulario muestra estados visuales durante el proceso de envío
- Los errores se muestran al usuario de forma clara
- Si alcanzas el límite mensual, recibirás un error y deberás esperar al siguiente mes o actualizar el plan

