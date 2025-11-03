import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

// Tipos para el webhook de Contentful
interface ContentfulWebhookPayload {
  sys: {
    id: string
    type: string
    contentType?: {
      sys: {
        id: string
      }
    }
  }
}

interface ContentfulWebhookBody {
  sys?: {
    id?: string
    type?: string
    contentType?: {
      sys?: {
        id?: string
      }
    }
  }
  contentType?: {
    sys?: {
      id?: string
    }
  }
}

/**
 * API Route para revalidar páginas cuando Contentful detecta cambios
 * 
 * Configuración en Contentful:
 * 1. Ve a Settings > Webhooks
 * 2. Crea un nuevo webhook con:
 *    - URL: https://tu-dominio.com/api/revalidate
 *    - Trigger: Content Management API
 *    - Events: Entry publish, Entry unpublish, Entry delete
 * 3. Añade un Header:
 *    - Name: x-contentful-secret
 *    - Value: (el mismo valor que CONTENTFUL_WEBHOOK_SECRET en .env.local)
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar el secreto del webhook
    const secret = request.headers.get('x-contentful-secret')
    const expectedSecret = process.env.CONTENTFUL_WEBHOOK_SECRET

    if (!expectedSecret) {
      console.error('CONTENTFUL_WEBHOOK_SECRET no está configurado en las variables de entorno')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    if (secret !== expectedSecret) {
      console.warn('Intento de acceso al webhook con secreto inválido')
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Parsear el body del webhook
    const body: ContentfulWebhookBody = await request.json()
    
    // Contentful puede enviar el payload de diferentes formas dependiendo del evento
    // Formato 1: Body directo con sys.contentType
    // Formato 2: Body con contentType en el nivel raíz
    // Formato 3: Body con X-Contentful-Topic header (para algunos eventos)
    
    let contentTypeId: string | undefined
    let entryId: string | undefined

    // Intentar extraer el contentType del body
    if (body.sys?.contentType?.sys?.id) {
      contentTypeId = body.sys.contentType.sys.id
      entryId = body.sys.id
    } else if (body.contentType?.sys?.id) {
      contentTypeId = body.contentType.sys.id
      entryId = body.sys?.id
    } else if (body.sys?.id) {
      // Si solo tenemos el ID, intentar obtener el contentType desde los headers o del body completo
      // Contentful a veces envía el contentType en el header X-Contentful-Content-Type
      const contentTypeFromHeader = request.headers.get('x-contentful-content-type')
      if (contentTypeFromHeader) {
        contentTypeId = contentTypeFromHeader
        entryId = body.sys.id
      }
    }
    
    if (!contentTypeId) {
      console.warn('Webhook recibido sin contentType. Body:', JSON.stringify(body, null, 2))
      console.warn('Headers:', Object.fromEntries(request.headers.entries()))
      
      // Intentar revalidar todo si no podemos determinar el tipo
      revalidatePath('/', 'layout')
      revalidatePath('/desarrollos-proyectos', 'page')
      revalidatePath('/desarrollos-proyectos/[id]', 'page')
      revalidateTag('home-page')
      revalidateTag('projects')
      revalidateTag('statistics')
      revalidateTag('team')
      revalidateTag('categories')
      
      return NextResponse.json({
        revalidated: true,
        contentType: 'unknown',
        entryId: entryId,
        message: 'Content type not found, revalidated all pages',
        timestamp: new Date().toISOString(),
      })
    }

    console.log(`Revalidación solicitada para contentType: ${contentTypeId}, entryId: ${entryId}`)

    // Revalidar según el tipo de contenido
    switch (contentTypeId) {
      case 'homePage':
        // Revalidar la página principal
        revalidatePath('/', 'layout')
        revalidateTag('home-page')
        console.log('✅ Página principal revalidada')
        break

      case 'project':
        // Revalidar la página principal (porque muestra proyectos destacados)
        revalidatePath('/', 'layout')
        revalidateTag('home-page')
        
        // Revalidar la página de listado de proyectos
        revalidatePath('/desarrollos-proyectos', 'page')
        revalidateTag('projects-list')
        
        // Si tenemos el entry ID y podemos obtener el slug, revalidar el proyecto específico
        // Por ahora revalidamos todos los proyectos dinámicos
        revalidatePath('/desarrollos-proyectos/[id]', 'page')
        revalidateTag('projects')
        
        console.log('✅ Proyectos revalidados (home, listado y detalle)')
        break

      case 'statistic':
        // Las estadísticas se usan en la página principal
        revalidatePath('/', 'layout')
        revalidateTag('home-page')
        revalidateTag('statistics')
        console.log('✅ Estadísticas revalidadas')
        break

      case 'projectStatistic':
        // Las estadísticas de proyecto afectan a los proyectos y la home
        revalidatePath('/', 'layout')
        revalidatePath('/desarrollos-proyectos', 'page')
        revalidatePath('/desarrollos-proyectos/[id]', 'page')
        revalidateTag('home-page')
        revalidateTag('projects')
        revalidateTag('statistics')
        console.log('✅ Estadísticas de proyecto revalidadas')
        break

      case 'teamMember':
        // Los miembros del equipo se muestran en la página principal
        revalidatePath('/', 'layout')
        revalidateTag('home-page')
        revalidateTag('team')
        console.log('✅ Miembros del equipo revalidadas')
        break

      case 'category':
        // Las categorías afectan a la página de proyectos
        revalidatePath('/desarrollos-proyectos', 'page')
        revalidateTag('categories')
        console.log('✅ Categorías revalidadas')
        break

      default:
        // Para tipos desconocidos, revalidar todo como medida de seguridad
        console.warn(`ContentType desconocido: ${contentTypeId}, revalidando todo`)
        revalidatePath('/', 'layout')
        revalidatePath('/desarrollos-proyectos', 'page')
        revalidatePath('/desarrollos-proyectos/[id]', 'page')
    }

    return NextResponse.json({
      revalidated: true,
      contentType: contentTypeId,
      entryId: entryId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error procesando webhook de Contentful:', error)
    return NextResponse.json(
      { 
        error: 'Error processing webhook',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Permitir GET para testing
export async function GET() {
  return NextResponse.json({
    message: 'Webhook endpoint activo. Usa POST para revalidar contenido.',
    timestamp: new Date().toISOString(),
  })
}

