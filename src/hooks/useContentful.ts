import { useState, useEffect } from 'react'
import { 
  getHomePageDataUncached, 
  getProjectsUncached, 
  getFeaturedProjectsUncached, 
  getHomeGalleryProjectsUncached,
  getTeamMembersUncached, 
  getStatisticsUncached,
  getProjectBySlugUncached,
  getCategoriesUncached,
  getProjectSlugsForNavigationUncached,
  type ContentfulHomePage,
  type ContentfulProject,
  type ContentfulTeamMember,
  type ContentfulStatistic,
  type ContentfulCategory
} from '@/lib/contentful'

// Hook para datos del home
export function useHomePage() {
  const [homeData, setHomeData] = useState<ContentfulHomePage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHomeData() {
      try {
        setLoading(true)
        const data = await getHomePageDataUncached()
        setHomeData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading home data')
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  return { homeData, loading, error }
}

// Hook para proyectos
export function useProjects() {
  const [projects, setProjects] = useState<ContentfulProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const data = await getProjectsUncached()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}

// Hook para proyectos destacados
export function useFeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState<ContentfulProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        setLoading(true)
        const data = await getFeaturedProjectsUncached()
        setFeaturedProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading featured projects')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProjects()
  }, [])

  return { featuredProjects, loading, error }
}

// Hook para proyectos de la galería del home
export function useHomeGalleryProjects() {
  const [homeGalleryProjects, setHomeGalleryProjects] = useState<ContentfulProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHomeGalleryProjects() {
      try {
        setLoading(true)
        const data = await getHomeGalleryProjectsUncached()
        setHomeGalleryProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading home gallery projects')
      } finally {
        setLoading(false)
      }
    }

    fetchHomeGalleryProjects()
  }, [])

  return { homeGalleryProjects, loading, error }
}

// Hook para miembros del equipo
export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<ContentfulTeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        setLoading(true)
        const data = await getTeamMembersUncached()
        setTeamMembers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading team members')
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  return { teamMembers, loading, error }
}

// Hook para estadísticas
export function useStatistics() {
  const [statistics, setStatistics] = useState<ContentfulStatistic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStatistics() {
      try {
        setLoading(true)
        const data = await getStatisticsUncached()
        setStatistics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading statistics')
      } finally {
        setLoading(false)
      }
    }

    fetchStatistics()
  }, [])

  return { statistics, loading, error }
}

// Hook para categorías
export function useCategories() {
  const [categories, setCategories] = useState<ContentfulCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const data = await getCategoriesUncached()
        setCategories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

// Hook para un proyecto específico por slug
export function useProject(slug: string) {
  const [project, setProject] = useState<ContentfulProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return
      
      try {
        setLoading(true)
        const data = await getProjectBySlugUncached(slug)
        setProject(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading project')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  return { project, loading, error }
}

// Hook optimizado para navegación entre proyectos
export function useProjectNavigation() {
  const [projectSlugs, setProjectSlugs] = useState<Array<{ slug: string; title: string; titleEn: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjectSlugs() {
      try {
        setLoading(true)
        const data = await getProjectSlugsForNavigationUncached()
        setProjectSlugs(data)
      } catch (err) {
        console.error('Error loading project navigation data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectSlugs()
  }, [])

  return { projectSlugs, loading }
}

