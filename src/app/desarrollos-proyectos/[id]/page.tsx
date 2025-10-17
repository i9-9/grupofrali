'use client'

import { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from "@/contexts/LanguageContext"
import { useProject, useProjects } from "@/hooks/useContentful"
import type { ContentfulMedia } from "@/lib/contentful"
import ContentfulRichText from "@/components/ContentfulRichText"
import ProjectImageSlider from "@/components/ProjectImageSlider"
import ProjectDesktopGallery from "@/components/ProjectDesktopGallery"
import ProjectStatistic from "@/components/ProjectStatistic"
import projectsData from "@/data/projects.json"

export default function DesarrolloProyecto() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const projectId = params.id as string
  
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Obtener el proyecto desde Contentful
  const { project, loading, error } = useProject(projectId)
  const { projects: allProjects } = useProjects()
  
  // Obtener estadísticas locales
  const localProject = projectsData.proyectos.find(p => p.id === projectId)
  const localStats = localProject ? (language === 'en' ? localProject.statistics_en : localProject.estadisticas) : null
  
  // Mapa de logos por proyecto (versiones en blanco)
  const projectLogos: Record<string, string> = {
    'septiembre': '/images/project-logos/septiembre.svg',
    'terrazas-de-septiembre': '/images/project-logos/septiembre.svg',
    'casas-de-septiembre': '/images/project-logos/septiembre.svg',
    'la-reserva-cardales': '/images/project-logos/lareservacardales.svg',
    'sofitel-la-reserva-cardales': '/images/logos/sofitel-blanco.png',
    'santa-regina': '/images/project-logos/santa-regina.svg'
  }
  const logoSrc = project ? projectLogos[project.fields.slug] : undefined
  
  // Crear URL de vuelta que preserva el filtro y hace scroll a proyectos
  const getBackUrl = useMemo(() => {
    if (!project) return '/desarrollos-proyectos'
    
    const params = new URLSearchParams()
    
    // Agregar categoría si no es "VER TODOS"
    const categoryName = language === 'en' ? project.fields.category?.fields?.nameEn : project.fields.category?.fields?.name
    if (categoryName && categoryName !== "VER TODOS") {
      params.set('categoria', project.fields.category?.fields?.slug || '')
    }
    
    // Agregar parámetro para hacer scroll a proyectos
    params.set('scrollTo', 'projects')
    
    return `/desarrollos-proyectos?${params.toString()}`
  }, [project, language])
  
  // Encontrar el índice del proyecto actual y calcular anterior/siguiente con navegación circular
  const currentProjectIndex = allProjects.findIndex(p => p.fields.slug === projectId)
  const previousProject = currentProjectIndex > 0 
    ? allProjects[currentProjectIndex - 1] 
    : allProjects[allProjects.length - 1] // Último proyecto
  const nextProject = currentProjectIndex < allProjects.length - 1 
    ? allProjects[currentProjectIndex + 1] 
    : allProjects[0] // Primer proyecto
  


  const mobileImages: string[] = (() => {
    if (!project?.fields?.galeriaMobile) {
      return []
    }
    
    const mobile = project.fields.galeriaMobile as ContentfulMedia[]
    
    // Mapear todas las imágenes del array
    const images = mobile.map((img: ContentfulMedia) => `https:${img.fields.file.url}`)
    
    // Remove duplicates while preserving order
    const uniqueImages = images.filter((url, index, self) => self.indexOf(url) === index)
    
    return uniqueImages
  })()
      
  const desktopImages: string[] = (() => {
    if (!project?.fields?.galeriaDesktop) return []
    
    // galeriaDesktop siempre es un array según la interfaz ContentfulProject
    const desktop = project.fields.galeriaDesktop as ContentfulMedia[]
    
    // Mapear todas las imágenes del array
    const images = desktop.map((img: ContentfulMedia) => `https:${img.fields.file.url}`)
    
    // Remove duplicates while preserving order
    return images.filter((url, index, self) => self.indexOf(url) === index)
  })()

  // Estados de loading y error
  if (loading) {
    return (
      <main className="bg-[#EFEFEF] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="bg-[#EFEFEF] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested project could not be found.'}</p>
          <Link 
            href="/desarrollos-proyectos" 
            className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    )
  }

  
  // Función para navegar entre proyectos con transición de opacidad
  const navigateToProject = (targetProject: { fields: { slug: string } }) => {
    if (!targetProject) return
    
    setIsTransitioning(true)
    
    setTimeout(() => {
      router.push(`/desarrollos-proyectos/${targetProject.fields.slug}`)
    }, 150) // Mitad de la transición para cambiar el contenido
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300) // Duración total de la transición
  }

  
  if (!project) {
    return (
      <div className="content-wrapper h-screen flex items-center justify-center">
        <h1>Proyecto no encontrado</h1>
      </div>
    )
  }

  return (
    <main className="min-h-screen md:h-screen md:overflow-hidden bg-[#EFEFEF] relative">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col">
        {/* CARRUSEL MOBILE */}
        <ProjectImageSlider 
          images={mobileImages}
          projectTitle={(language === 'en' ? project.fields.titleEn : project.fields.title).replace(/\\n/g, ' ')}
          logoSrc={logoSrc}
          isTransitioning={isTransitioning}
        />
        
        {/* Panel de información mobile */}
        <div className={`bg-[#EFEFEF] border-t border-gray-200 transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="content-wrapper">
            <div className="grid">
              <div className="col-6 flex items-center gap-2 my-4">
                <Link href={getBackUrl} className="text-[#151714] flex items-center" style={{ transform: 'translateY(-1px)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </Link>
                <span className="text-black font-baskerville" style={{ fontSize: 'clamp(16.2px, 1.25vw, 18.9px)', lineHeight: '100%', transform: 'translateY(-0.5px)' }}>{language === 'en' ? project.fields.category?.fields?.nameEn : project.fields.category?.fields?.name}</span>
              </div>
            </div>
            
            <h1 
              className="text-black mb-[60px] md:hidden font-archivo font-normal leading-none tracking-[0%]"
              style={{ fontSize: 'clamp(36.41px, 9.26vw, 36.41px)' }}
            >
              {(language === 'en' ? project.fields.titleEn : project.fields.title).replace(/\\n/g, ' ')}
            </h1>
            <p 
              className="text-[#151714] font-archivo font-normal tracking-[0%] mb-[60px] md:mb-4 flex items-center" 
              style={{ 
                fontSize: 'clamp(13.75px, 1.1vw, 17.5px)', 
                lineHeight: '110%',
                letterSpacing: '0%',
                fontWeight: '400'
              }}
            >
              <Image 
                src="/images/icons/location.png" 
                alt="Ubicación" 
                width={16} 
                height={16} 
                className="mr-1"
              />
              {language === 'en' ? project.fields.locationEn : project.fields.location}
            </p>
            
            <div className="text-[#151714] mb-12 md:hidden">
              <ContentfulRichText 
                content={language === 'en' ? project.fields.descriptionEn : project.fields.description}
                paragraphStyle={{ 
                  fontSize: 'clamp(16.1px, 4.1vw, 16.1px)',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  fontWeight: '400',
                  fontFamily: 'Archivo, sans-serif'
                }}
                convertLineBreaksToSpaces={true}
              />
            </div>
            
            {/* Estadísticas mobile con animaciones */}
            {localStats && (
              <div className="pt-12 pb-2">
                <div className="stats-custom-layout">
                  {Object.entries(localStats).map(([key, value], index) => (
                    <ProjectStatistic 
                      key={key}
                      statKey={key.replace(/_/g, ' ').toUpperCase()}
                      value={value as string}
                      index={index}
                      isVisible={true}
                      projectId={projectId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Flechas de navegación mobile - fuera del content-wrapper */}
        <div className="flex justify-between items-center py-8 px-4">
          {/* Flecha anterior */}
          <button
            onClick={() => navigateToProject(previousProject)}
            className="w-12 h-12 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label={`Ir a proyecto anterior: ${previousProject ? (language === 'en' ? previousProject.fields.titleEn : previousProject.fields.title).replace(/\\n/g, ' ') : 'Proyecto anterior'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          
          {/* Flecha siguiente */}
          <button
            onClick={() => navigateToProject(nextProject)}
            className="w-12 h-12 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label={`Ir a proyecto siguiente: ${nextProject ? (language === 'en' ? nextProject.fields.titleEn : nextProject.fields.title).replace(/\\n/g, ' ') : 'Proyecto siguiente'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block h-full relative">
        {/* Panel de información desktop */}
        <div className={`absolute left-0 top-0 w-1/2 h-full bg-[#EFEFEF] z-10 pt-16 md:pt-20 lg:pt-18 flex flex-col transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="content-wrapper">
            {/* Header fijo */}
            <div className="grid">
              <div className="col-6 md:col-6 flex items-center gap-2 mb-4">
                <Link href={getBackUrl} className="text-black hover:text-black/80 transition-colors flex items-center" style={{ transform: 'translateY(-1px)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </Link>
                <span className="text-[#151714] font-baskerville font-medium" style={{ fontSize: 'clamp(16.2px, 1.25vw, 18.9px)', lineHeight: '100%', transform: 'translateY(-2px)' }}>{language === 'en' ? project.fields.category?.fields?.nameEn : project.fields.category?.fields?.name}</span>
              </div>
            </div>
            
            {/* Título */}
            <div className="flex items-start mb-24">
              <h1 
                className="text-black hidden md:block font-archivo font-normal leading-none tracking-[0%]"
                style={{ fontSize: 'clamp(35.55px, 2.35vw, 35.55px)' }}
              >
                {(language === 'en' ? project.fields.titleEn : project.fields.title).replace(/\\n/g, ' ')}
              </h1>
            </div>
            
            {/* Contenido con espacio flexible */}
            <div className="flex-1 flex flex-col justify-start space-y-8">
              <p 
                className="text-black font-archivo font-normal tracking-[0%] flex items-center" 
                style={{ 
                  fontSize: 'clamp(13.75px, 1.1vw, 17.5px)', 
                  lineHeight: '110%',
                  letterSpacing: '0%',
                  fontWeight: '400'
                }}
              >
                <Image 
                  src="/images/icons/location.png" 
                  alt="Ubicación" 
                  width={18} 
                  height={18} 
                  className="mr-2"
                />
                {language === 'en' ? project.fields.locationEn : project.fields.location}
              </p>
              
              <div className="text-[#151714] hidden md:block">
                <ContentfulRichText 
                  content={language === 'en' ? project.fields.descriptionEn : project.fields.description}
                  paragraphStyle={{ 
                    fontSize: 'clamp(16.1px, 1.07vw, 16.1px)',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                    fontWeight: '400',
                    fontFamily: 'Archivo, sans-serif'
                  }}
                  convertLineBreaksToSpaces={true}
                />
              </div>
            </div>
            
            {/* Estadísticas desktop con animaciones */}
            {localStats && (
              <div className="grid !grid-cols-2 gap-2 md:gap-x-6 md:gap-y-1 mt-16">
                {Object.entries(localStats).map(([key, value], index) => (
                  <ProjectStatistic 
                    key={key}
                    statKey={key.replace(/_/g, ' ').toUpperCase()}
                    value={value as string}
                    index={index}
                    isVisible={true}
                    projectId={projectId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Galería de imágenes desktop - carrusel vertical */}
        <ProjectDesktopGallery 
          images={desktopImages}
          projectTitle={(language === 'en' ? project.fields.titleEn : project.fields.title).replace(/\\n/g, ' ')}
          logoSrc={logoSrc}
          isTransitioning={isTransitioning}
        />
        
        {/* Flechas de navegación desktop */}
        <div className="flex absolute bottom-2 left-0 right-0 justify-between pointer-events-none z-20 px-4">
          {/* Flecha anterior */}
          <button
            onClick={() => navigateToProject(previousProject)}
            className="pointer-events-auto w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label={`Ir a proyecto anterior: ${previousProject ? (language === 'en' ? previousProject.fields.titleEn : previousProject.fields.title).replace(/\\n/g, ' ') : 'Proyecto anterior'}`}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          
          {/* Flecha siguiente */}
          <button
            onClick={() => navigateToProject(nextProject)}
            className="pointer-events-auto w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label={`Ir a proyecto siguiente: ${nextProject ? (language === 'en' ? nextProject.fields.titleEn : nextProject.fields.title).replace(/\\n/g, ' ') : 'Proyecto siguiente'}`}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
  )
}