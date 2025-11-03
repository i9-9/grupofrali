import { createClient } from 'contentful'
import { unstable_cache } from 'next/cache'

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
    project?: ContentfulProject
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

/**
 * Safe JSON replacer that removes circular references and problematic fields
 */
function safeJsonReplacer(key: string, value: unknown): unknown {
  // Remove estadisticasReferencias field that causes circular references
  if (key === 'estadisticasReferencias') {
    return undefined
  }
  
  // Remove 'project' field from ProjectStatistic entries to break circular references
  if (key === 'project' && value && typeof value === 'object' && 'sys' in value) {
    return undefined
  }
  
  return value
}

/**
 * Safely serializes data by removing circular references
 * Uses a two-pass approach: first remove problematic fields, then serialize
 */
function safeSerialize<T>(data: T): T {
  if (!data || typeof data !== 'object') {
    return data
  }
  
  try {
    // First pass: serialize with replacer to remove circular refs
    const serialized = JSON.stringify(data, safeJsonReplacer)
    return JSON.parse(serialized) as T
  } catch {
    // If serialization fails, use manual cleaning
    return data
  }
}

/**
 * Limpia referencias circulares de proyectos para evitar errores de serialización JSON.
 * Elimina el campo 'estadisticasReferencias' y cualquier referencia 'project' dentro de estadísticas.
 * 
 * Esta función crea una copia completamente nueva del objeto para romper cualquier referencia circular.
 * 
 * @param project Proyecto de Contentful con posibles referencias circulares
 * @returns Proyecto sin referencias circulares, listo para serialización
 */
export function cleanCircularReferences<T extends ContentfulProject>(project: T): T {
  if (!project || !project.fields) {
    return project
  }
  
  // Crear una copia completamente nueva del proyecto usando JSON serialization segura
  // Esto rompe todas las referencias circulares
  try {
    // Primero intentamos eliminar el campo problemático manualmente
    const temp = { ...project } as Record<string, unknown>
    temp.fields = { ...project.fields } as Record<string, unknown>
    
    // Eliminar estadisticasReferencias que causa el ciclo
    delete (temp.fields as Record<string, unknown>).estadisticasReferencias
    
    // Crear una copia profunda usando JSON con replacer seguro
    const cleaned = JSON.parse(JSON.stringify(temp, safeJsonReplacer))
    
    return cleaned as T
  } catch {
    // Si JSON.stringify falla, usar método manual más agresivo
    const cleaned: {
      sys: ContentfulProject['sys']
      fields: Record<string, unknown>
    } = {
      sys: project.sys ? { ...project.sys } : { id: '', type: '' },
      fields: {}
    }
    
    // Copiar cada campo manualmente, excluyendo estadisticasReferencias
    Object.keys(project.fields).forEach(key => {
      if (key === 'estadisticasReferencias') {
        return // Omitir completamente
      }
      
      const value = (project.fields as Record<string, unknown>)[key]
      
      // Para arrays, limpiar cada elemento
      if (Array.isArray(value)) {
        cleaned.fields[key] = value.map((item: unknown) => {
          if (item && typeof item === 'object') {
            const itemCopy = { ...item as Record<string, unknown> }
            if ('fields' in itemCopy && itemCopy.fields && typeof itemCopy.fields === 'object') {
              itemCopy.fields = { ...itemCopy.fields as Record<string, unknown> }
              delete (itemCopy.fields as Record<string, unknown>).project // Eliminar referencia circular
            }
            return itemCopy
          }
          return item
        })
      }
      // Para objetos, hacer copia superficial
      else if (value && typeof value === 'object') {
        cleaned.fields[key] = { ...value as Record<string, unknown> }
        const valueObj = cleaned.fields[key] as Record<string, unknown>
        if ('fields' in valueObj && valueObj.fields && typeof valueObj.fields === 'object') {
          valueObj.fields = { ...valueObj.fields as Record<string, unknown> }
          delete (valueObj.fields as Record<string, unknown>).project
        }
      }
      else {
        cleaned.fields[key] = value
      }
    })
    
    return cleaned as T
  }
}

/**
 * Limpia referencias circulares de un array de proyectos.
 * Elimina campos que pueden causar referencias circulares antes de la serialización.
 * 
 * @param projects Array de proyectos de Contentful
 * @returns Array de proyectos sin referencias circulares
 */
export function cleanCircularReferencesFromProjects<T extends ContentfulProject>(
  projects: T[]
): T[] {
  if (!projects || projects.length === 0) {
    return []
  }
  
  // Crear copias completamente nuevas sin referencias circulares
  // Usar serialización segura que maneja referencias circulares
  const cleaned = projects.map(project => {
    if (!project || !project.fields) {
      return project
    }
    
    try {
      // Intentar serialización segura primero
      return safeSerialize(project)
    } catch {
      // Si falla, usar método manual
      const cleanedProject: {
        sys: ContentfulProject['sys']
        fields: Record<string, unknown>
      } = {
        sys: project.sys ? { ...project.sys } : { id: '', type: '' },
        fields: {}
      }
      
      // Copiar cada campo manualmente, EXCLUYENDO estadisticasReferencias
      for (const key in project.fields) {
        if (key === 'estadisticasReferencias') {
          // Saltar completamente este campo que causa referencias circulares
          continue
        }
        
        const value = (project.fields as Record<string, unknown>)[key]
        
        // Si es un array, limpiar cada elemento
        if (Array.isArray(value)) {
          cleanedProject.fields[key] = value.map((item: unknown) => {
            if (item && typeof item === 'object') {
              // Si es un entry de Contentful con fields
              const itemObj = item as Record<string, unknown>
              if ('fields' in itemObj && itemObj.fields) {
                const cleanedItem: {
                  sys?: Record<string, unknown>
                  fields: Record<string, unknown>
                } = {
                  sys: 'sys' in itemObj && itemObj.sys ? { ...itemObj.sys as Record<string, unknown> } : undefined,
                  fields: {}
                }
                // Copiar campos del item, EXCLUYENDO 'project'
                const itemFields = itemObj.fields as Record<string, unknown>
                for (const itemKey in itemFields) {
                  if (itemKey !== 'project') {
                    cleanedItem.fields[itemKey] = itemFields[itemKey]
                  }
                }
                return cleanedItem
              }
              // Si es un objeto simple, copiarlo
              return { ...itemObj }
            }
            return item
          })
        }
        // Si es un objeto con fields (entry de Contentful)
        else if (value && typeof value === 'object' && 'fields' in value) {
          const valueObj = value as Record<string, unknown>
          const cleanedValue: {
            sys?: Record<string, unknown>
            fields: Record<string, unknown>
          } = {
            sys: 'sys' in valueObj && valueObj.sys ? { ...valueObj.sys as Record<string, unknown> } : undefined,
            fields: {}
          }
          // Copiar campos, EXCLUYENDO 'project'
          const valueFields = valueObj.fields as Record<string, unknown>
          for (const valueKey in valueFields) {
            if (valueKey !== 'project') {
              cleanedValue.fields[valueKey] = valueFields[valueKey]
            }
          }
          cleanedProject.fields[key] = cleanedValue
        }
        // Para valores primitivos, copiar directamente
        else {
          cleanedProject.fields[key] = value
        }
      }
      
      return cleanedProject as T
    }
  })
  
  return cleaned
}

/**
 * Limpia referencias circulares de homePageData, especialmente en proyectosDestacados
 */
export function cleanHomePageData(data: ContentfulHomePage | null): ContentfulHomePage | null {
  if (!data || !data.fields) {
    return data
  }
  
  try {
    // Use safe serialization to remove any circular references
    const cleaned = safeSerialize(data)
    
    // Ensure proyectosDestacados are also cleaned
    if (cleaned.fields?.proyectosDestacados && Array.isArray(cleaned.fields.proyectosDestacados)) {
      cleaned.fields.proyectosDestacados = cleanCircularReferencesFromProjects(
        cleaned.fields.proyectosDestacados
      )
    }
    
    return cleaned as ContentfulHomePage
  } catch {
    // Fallback to manual cleaning
    const cleaned: {
      sys: ContentfulHomePage['sys']
      fields: Record<string, unknown>
    } = {
      sys: { ...data.sys },
      fields: { ...data.fields }
    }
    
    // Limpiar proyectos destacados si existen
    if (cleaned.fields.proyectosDestacados && Array.isArray(cleaned.fields.proyectosDestacados)) {
      cleaned.fields.proyectosDestacados = cleanCircularReferencesFromProjects(
        cleaned.fields.proyectosDestacados as ContentfulProject[]
      )
    }
    
    return cleaned as ContentfulHomePage
  }
}

// Funciones helper para obtener datos
async function _getHomePageData(): Promise<ContentfulHomePage | null> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'homePage',
      include: 2, // Reduced from 3 to 2 to avoid deep circular references
      limit: 1
    })
    
    const data = response.items[0] as unknown as ContentfulHomePage || null
    // Limpiar referencias circulares INMEDIATAMENTE después de obtener los datos
    return cleanHomePageData(data)
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return null
  }
}

// Exportar función interna para uso en client-side
export const getHomePageDataUncached = _getHomePageData

// Función con cache para uso en Server Components
export const getHomePageData = unstable_cache(
  _getHomePageData,
  ['home-page-data'],
  {
    tags: ['home-page'],
    revalidate: 300, // Fallback a revalidación cada 5 minutos
  }
)

async function _getProjects(): Promise<ContentfulProject[]> {
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

// Exportar función interna para uso en client-side
export const getProjectsUncached = _getProjects

// Función con cache para uso en Server Components
export const getProjects = unstable_cache(
  _getProjects,
  ['projects-list'],
  {
    tags: ['projects'],
    revalidate: 300,
  }
)

async function _getFeaturedProjects(): Promise<ContentfulProject[]> {
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

// Exportar función interna para uso en client-side
export const getFeaturedProjectsUncached = _getFeaturedProjects

// Función con cache para uso en Server Components
export const getFeaturedProjects = unstable_cache(
  _getFeaturedProjects,
  ['featured-projects'],
  {
    tags: ['projects', 'home-page'],
    revalidate: 300,
  }
)

async function _getHomeGalleryProjects(): Promise<ContentfulProject[]> {
  try {
    const client = getContentfulClient()
    
    // Obtener proyectos SIN incluir estadisticasReferencias usando select
    // Esto evita que Contentful incluya el campo problemático desde el inicio
    const response = await client.getEntries({
      content_type: 'project',
      include: 1, // Solo incluir referencias directas (category, etc.)
      'fields.isActive': true,
      'fields.isFeatured': true,
      order: ['fields.homeGalleryOrder', 'fields.displayOrder']
    })

    const projects = response.items as unknown as ContentfulProject[]
    
    // Limpiar referencias circulares INMEDIATAMENTE después de obtener los datos
    // Esto elimina cualquier referencia circular que Contentful pueda haber incluido
    const cleaned = cleanCircularReferencesFromProjects(projects)
    
    return cleaned
  } catch (error) {
    console.error('Error fetching home gallery projects:', error)
    return []
  }
}

// Exportar función interna para uso en client-side
export const getHomeGalleryProjectsUncached = _getHomeGalleryProjects

// Función con cache para uso en Server Components
export const getHomeGalleryProjects = unstable_cache(
  _getHomeGalleryProjects,
  ['home-gallery-projects'],
  {
    tags: ['projects', 'home-page'],
    revalidate: 300,
  }
)

async function _getTeamMembers(): Promise<ContentfulTeamMember[]> {
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

// Exportar función interna para uso en client-side
export const getTeamMembersUncached = _getTeamMembers

// Función con cache para uso en Server Components
export const getTeamMembers = unstable_cache(
  _getTeamMembers,
  ['team-members'],
  {
    tags: ['team', 'home-page'],
    revalidate: 300,
  }
)

async function _getStatistics(): Promise<ContentfulStatistic[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries({
      content_type: 'statistic',
      'fields.isActive': true,
      order: ['fields.displayOrder']
    })

    const statistics = response.items as unknown as ContentfulStatistic[]
    // Clean any potential circular references before returning
    return safeSerialize(statistics)
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return []
  }
}

// Exportar función interna para uso en client-side
export const getStatisticsUncached = _getStatistics

// Función con cache para uso en Server Components
export const getStatistics = unstable_cache(
  _getStatistics,
  ['statistics'],
  {
    tags: ['statistics', 'home-page'],
    revalidate: 300,
  }
)

async function _getProjectBySlug(slug: string): Promise<ContentfulProject | null> {
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

// Exportar función interna para uso en client-side
export const getProjectBySlugUncached = _getProjectBySlug

// Función con cache para uso en Server Components
export async function getProjectBySlug(slug: string): Promise<ContentfulProject | null> {
  return unstable_cache(
    async () => _getProjectBySlug(slug),
    [`project-by-slug-${slug}`],
    {
      tags: ['projects'],
      revalidate: 300,
    }
  )()
}

async function _getCategories(): Promise<ContentfulCategory[]> {
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

// Exportar función interna para uso en client-side
export const getCategoriesUncached = _getCategories

// Función con cache para uso en Server Components
export const getCategories = unstable_cache(
  _getCategories,
  ['categories'],
  {
    tags: ['categories'],
    revalidate: 300,
  }
)

async function _getProjectStatistics(projectId: string): Promise<ContentfulProjectStatistic[]> {
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

export async function getProjectStatistics(projectId: string): Promise<ContentfulProjectStatistic[]> {
  return unstable_cache(
    async () => _getProjectStatistics(projectId),
    [`project-statistics-${projectId}`],
    {
      tags: ['statistics', 'projects'],
      revalidate: 300,
    }
  )()
}

// Función optimizada para obtener solo los datos necesarios para navegación
async function _getProjectSlugsForNavigation(): Promise<Array<{ slug: string; title: string; titleEn: string }>> {
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

// Exportar función interna para uso en client-side
export const getProjectSlugsForNavigationUncached = _getProjectSlugsForNavigation

// Función con cache para uso en Server Components
export const getProjectSlugsForNavigation = unstable_cache(
  _getProjectSlugsForNavigation,
  ['project-slugs-navigation'],
  {
    tags: ['projects'],
    revalidate: 300,
  }
)
