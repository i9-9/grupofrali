import { useState, useEffect } from 'react'
import { 
  getHomePageData, 
  getProjects, 
  getFeaturedProjects, 
  getHomeGalleryProjects,
  getTeamMembers, 
  getStatistics,
  getProjectBySlug,
  getCategories,
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
        const data = await getHomePageData()
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
        const data = await getProjects()
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
        const data = await getFeaturedProjects()
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
        const data = await getHomeGalleryProjects()
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
        const data = await getTeamMembers()
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
        const data = await getStatistics()
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
        const data = await getCategories()
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
        const data = await getProjectBySlug(slug)
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

