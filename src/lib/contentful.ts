import { createClient } from 'contentful'

// Función para crear el cliente de Contentful
function getContentfulClient() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Creating Contentful client with:', {
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ? 'Present' : 'Missing',
      environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
    })
  }

  return createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
    environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
  })
}

// Tipos de datos de Contentful
export interface ContentfulCategory {
  sys: {
    id: string
    type: string
  }
  fields: {
    name: string
    nameEn: string
    slug: string
    description?: string
    descriptionEn?: string
    isActive: boolean
  }
}

export interface ContentfulMedia {
  fields: {
    file: {
      url: string
      contentType: string
      details?: {
        size: number
        image?: {
          width: number
          height: number
        }
      }
    }
    title?: string
    description?: string
  }
}

export interface ContentfulRichText {
  content?: Array<{
    nodeType: string
    content?: Array<{
      nodeType: string
      value?: string
      marks?: Array<{
        type: string
      }>
    }>
  }>
}

export interface ContentfulProject {
  sys: {
    id: string
    type: string
  }
  fields: {
    title: string
    titleEn: string
    slug: string
    description: ContentfulRichText
    descriptionEn: ContentfulRichText
    category: ContentfulCategory
    location?: string
    locationEn?: string
    desarrolloDesktop?: ContentfulMedia
    desarrolloMobile?: ContentfulMedia
    galeriaDesktop?: ContentfulMedia[]
    galeriaMobile?: ContentfulMedia[]
    imagenHome?: ContentfulMedia
    estadisticas?: Array<{
      nombre: string
      nombreEn: string
      valor: string
    }>
    estadisticasReferencias?: ContentfulProjectStatistic[]
    statistics?: string // JSON field (legacy)
    status?: string
    statusEn?: string
    isFeatured: boolean
    isActive: boolean
    displayOrder?: number
    homeGalleryOrder?: number
  }
}

export interface ContentfulTeamMember {
  sys: {
    id: string
    type: string
  }
  fields: {
    name: string
    position: string
    positionEn: string
    photo?: ContentfulMedia
    bio?: string
    bioEn?: string
    isActive: boolean
    displayOrder?: number
  }
}

export interface ContentfulStatistic {
  sys: {
    id: string
    type: string
  }
  fields: {
    label: string
    labelEn: string
    value: string
    unit?: string
    unitEn?: string
    icon?: ContentfulMedia
    displayOrder: number
    isActive: boolean
  }
}

export interface ContentfulProjectStatistic {
  sys: {
    id: string
    type: string
  }
  fields: {
    name: string
    nameEn: string
    value: string
    unit?: string
    unitEn?: string
    project: ContentfulProject
  }
}

// Nuevo: Entry de Video con Poster incluido
export interface ContentfulVideoWithPoster {
  sys: {
    id: string
    type: string
  }
  fields: {
    title: string
    video: ContentfulMedia
    poster?: ContentfulMedia
    displayOrder?: number
  }
}

export interface ContentfulHomePage {
  sys: {
    id: string
    type: string
  }
  fields: {
    title: string
    titleEn: string
    heroTitle: string
    heroTitleEn: string
    description: ContentfulRichText
    descriptionEn: ContentfulRichText
    // OPCIÓN 1: Arrays separados (actual - mantener por compatibilidad)
    videosDesktop?: ContentfulMedia[]
    videosMobile?: ContentfulMedia[]
    postersDesktop?: ContentfulMedia[]
    postersMobile?: ContentfulMedia[]
    // OPCIÓN 2: Nuevos campos con videos+posters en un solo entry (RECOMENDADO)
    heroVideosDesktop?: ContentfulVideoWithPoster[]
    heroVideosMobile?: ContentfulVideoWithPoster[]
    logosMarquee?: ContentfulMedia[]
    proyectosDestacados?: ContentfulProject[]
    maxProyectosDestacados?: number
    miembrosEquipo?: ContentfulTeamMember[]
    maxMiembrosEquipo?: number
    estadisticas?: ContentfulStatistic[]
    maxEstadisticas?: number
    isActive?: boolean
    lastUpdated?: string
  }
}

// Funciones helper para obtener datos
export async function getHomePageData(): Promise<ContentfulHomePage | null> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'homePage',
      include: 3,
      limit: 1
    })
    
    return response.items[0] as unknown as ContentfulHomePage || null
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return null
  }
}

export async function getProjects(): Promise<ContentfulProject[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'project',
      include: 3, // Incluir referencias a estadísticas
      'fields.isActive': true,
      order: ['fields.displayOrder']
    })
    
    return response.items as unknown as ContentfulProject[]
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getFeaturedProjects(): Promise<ContentfulProject[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'project',
      include: 3, // Incluir referencias a estadísticas
      'fields.isActive': true,
      'fields.isFeatured': true,
      order: ['fields.displayOrder']
    })
    
    return response.items as unknown as ContentfulProject[]
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

export async function getHomeGalleryProjects(): Promise<ContentfulProject[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'project',
      include: 2, // Reduced from 3 to 2 for better performance
      'fields.isActive': true,
      'fields.isFeatured': true,
      order: ['fields.homeGalleryOrder', 'fields.displayOrder']
    })

    return response.items as unknown as ContentfulProject[]
  } catch (error) {
    console.error('Error fetching home gallery projects:', error)
    return []
  }
}

export async function getTeamMembers(): Promise<ContentfulTeamMember[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'teamMember',
      'fields.isActive': true,
      order: ['fields.displayOrder']
    })
    
    return response.items as unknown as ContentfulTeamMember[]
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export async function getStatistics(): Promise<ContentfulStatistic[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'statistic',
      'fields.isActive': true,
      order: ['fields.displayOrder']
    })

    return response.items as unknown as ContentfulStatistic[]
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<ContentfulProject | null> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'project',
      include: 2, // Reducido de 3 a 2 para mejor performance
      'fields.slug': slug,
      'fields.isActive': true,
      limit: 1
    })
    
    return response.items[0] as unknown as ContentfulProject || null
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    return null
  }
}

export async function getCategories(): Promise<ContentfulCategory[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'category',
      'fields.isActive': true,
      order: ['fields.name']
    })
    
    return response.items as unknown as ContentfulCategory[]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getProjectStatistics(projectId: string): Promise<ContentfulProjectStatistic[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: '7fjLXGmdgFUlcGjBFqrC0', // ProjectStatistic content type ID
      'fields.project.sys.id': projectId,
      include: 2
    })
    
    return response.items as unknown as ContentfulProjectStatistic[]
  } catch (error) {
    console.error('Error fetching project statistics:', error)
    return []
  }
}

// Función optimizada para obtener solo los datos necesarios para navegación
export async function getProjectSlugsForNavigation(): Promise<Array<{ slug: string; title: string; titleEn: string }>> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'project',
      'fields.isActive': true,
      order: ['fields.displayOrder'],
      select: ['fields.slug', 'fields.title', 'fields.titleEn'],
      limit: 1000
    })
    
    return response.items.map(item => {
      const fields = item.fields as { slug: string; title: string; titleEn: string }
      return {
        slug: fields.slug,
        title: fields.title,
        titleEn: fields.titleEn
      }
    })
  } catch (error) {
    console.error('Error fetching project slugs:', error)
    return []
  }
}
