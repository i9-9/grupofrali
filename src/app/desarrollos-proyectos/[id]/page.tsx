'use client'

import { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { useLanguage } from "@/contexts/LanguageContext"
import { useProject, useProjects } from "@/hooks/useContentful"
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
  
  // Intersection Observer para estadísticas mobile
  const { ref: mobileStatsRef, isVisible: isMobileStatsVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  })

  // Intersection Observer para estadísticas desktop
  const { ref: desktopStatsRef, isVisible: isDesktopStatsVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  })
  
  // Obtener el proyecto desde Contentful
  const { project, loading, error } = useProject(projectId)
  const { projects: allProjects } = useProjects()
  
  // Obtener estadísticas locales
  const localProject = projectsData.proyectos.find(p => p.id === projectId)
  const localStats = localProject ? (language === 'en' ? localProject.statistics_en : localProject.estadisticas) : null
  
  // Debug: verificar datos del proyecto
  console.log('Project Debug:', {
    project,
    projectId,
    estadisticasReferencias: project?.fields?.estadisticasReferencias,
    statistics: project?.fields?.statistics
  })
  
  // Mapa de logos por proyecto (versiones en blanco)
  const projectLogos: Record<string, string> = {
    'septiembre': '/images/project-logos/septiembre.svg',
    'terrazas-de-septiembre': '/images/project-logos/septiembre.svg',
    'casas-de-septiembre': '/images/project-logos/septiembre.svg',
    'la-reserva-cardales': '/images/project-logos/lareservacardales.svg',
    'sofitel-la-reserva-cardales': '/images/project-logos/sofitel.svg',
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
  

  interface GalleryImage {
    fields: {
      file: {
        url: string
      }
    }
  }

  const mobileImages: string[] = (() => {
    if (!project?.fields?.galeriaMobile) return []
    const mobile = project.fields.galeriaMobile as GalleryImage | GalleryImage[]
    return Array.isArray(mobile) ? mobile.map((img: GalleryImage) => `https:${img.fields.file.url}`) : [`https:${mobile.fields.file.url}`]
  })()
      
  const desktopImages: string[] = (() => {
    if (!project?.fields?.galeriaDesktop) return []
    const desktop = project.fields.galeriaDesktop as GalleryImage | GalleryImage[]
    return Array.isArray(desktop) ? desktop.map((img: GalleryImage) => `https:${img.fields.file.url}`) : [`https:${desktop.fields.file.url}`]
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
          projectTitle={language === 'en' ? project.fields.titleEn : project.fields.title}
          logoSrc={logoSrc}
          isTransitioning={isTransitioning}
        />
        
        {/* Panel de información mobile */}
        <div className={`bg-[#EFEFEF] border-t border-gray-200 transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="content-wrapper p-4">
            <div className="grid">
              <div className="col-6 flex items-center gap-2 mb-2">
                <Link href={getBackUrl} className="text-[#151714] flex items-center" style={{ transform: 'translateY(-1px)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </Link>
                <span className="text-black font-baskerville" style={{ fontSize: 'clamp(16.2px, 1.25vw, 18.9px)', lineHeight: '100%' }}>{language === 'en' ? project.fields.category?.fields?.nameEn : project.fields.category?.fields?.name}</span>
              </div>
            </div>
            
            <h1 className="font-archivo text-black font-normal leading-[100%] tracking-[0%] mb-[120px] md:mb-0" style={{ fontSize: 'clamp(36.41px, 2.4vw, 35.55px)', lineHeight: '100%' }}>{language === 'en' ? project.fields.titleEn : project.fields.title}</h1>
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
            
            <div 
              className="text-[#151714] font-archivo font-normal leading-[100%] tracking-[0%] mb-12" 
              style={{ 
                fontSize: 'clamp(13.75px, 1.1vw, 17.5px)', 
                lineHeight: '110%',
                letterSpacing: '0%',
                fontWeight: '400'
              }}
            >
              <ContentfulRichText content={language === 'en' ? project.fields.descriptionEn : project.fields.description} />
            </div>
            
            {/* Estadísticas mobile con animaciones */}
            {localStats && (
              <div className="py-12" ref={mobileStatsRef}>
                <div className="stats-custom-layout">
                  {Object.entries(localStats).map(([key, value], index) => (
                    <ProjectStatistic 
                      key={key}
                      statKey={key.replace(/_/g, ' ').toUpperCase()}
                      value={value as string}
                      index={index}
                      isVisible={isMobileStatsVisible}
                      projectId={projectId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block h-full relative">
        {/* Panel de información desktop */}
        <div className={`absolute left-0 top-0 w-1/2 h-full bg-[#EFEFEF] z-10 pt-16 md:pt-20 lg:pt-18 flex flex-col transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="content-wrapper p-4 md:p-6 lg:p-8 lg:pt-0">
            {/* Header fijo */}
            <div className="grid">
              <div className="col-6 md:col-6 flex items-center gap-2 mb-4">
                <Link href={getBackUrl} className="text-black hover:text-black/80 transition-colors flex items-center" style={{ transform: 'translateY(-1px)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </Link>
                <span className="text-[#151714] font-baskerville font-medium" style={{ fontSize: 'clamp(16.2px, 1.25vw, 18.9px)', lineHeight: '100%' }}>{language === 'en' ? project.fields.category?.fields?.nameEn : project.fields.category?.fields?.name}</span>
              </div>
            </div>
            
            {/* Título con altura fija */}
            <div className="flex items-start h-24  mb-6 md:mb-3">
              <h1 className="font-archivo text-black font-normal leading-[100%] tracking-[0%]" style={{ fontSize: 'clamp(36.41px, 2.4vw, 35.55px)', lineHeight: '100%' }}>{language === 'en' ? project.fields.titleEn : project.fields.title}</h1>
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
              
              <div 
                className="text-[#151714] font-archivo font-normal leading-[100%] tracking-[0%]" 
                style={{ 
                  fontSize: 'clamp(13.75px, 1.1vw, 17.5px)', 
                  lineHeight: '110%',
                  letterSpacing: '0%',
                  fontWeight: '400'
                }}
              >
                <ContentfulRichText content={language === 'en' ? project.fields.descriptionEn : project.fields.description} />
              </div>
            </div>
            
            {/* Estadísticas desktop con animaciones */}
            {localStats && (
              <div className="grid !grid-cols-2 gap-2 md:gap-x-6 md:gap-y-1 mt-16" ref={desktopStatsRef}>
                {Object.entries(localStats).map(([key, value], index) => (
                  <ProjectStatistic 
                    key={key}
                    statKey={key.replace(/_/g, ' ').toUpperCase()}
                    value={value as string}
                    index={index}
                    isVisible={isDesktopStatsVisible}
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
          projectTitle={language === 'en' ? project.fields.titleEn : project.fields.title}
          logoSrc={logoSrc}
          isTransitioning={isTransitioning}
        />
        
        {/* Flechas de navegación desktop */}
        <div className="flex absolute bottom-2 left-0 right-0 justify-between pointer-events-none z-20 px-4">
          {/* Flecha anterior */}
          <button
            onClick={() => navigateToProject(previousProject)}
            className="pointer-events-auto w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label={`Ir a proyecto anterior: ${previousProject ? (language === 'en' ? previousProject.fields.titleEn : previousProject.fields.title) : 'Proyecto anterior'}`}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          
          {/* Flecha siguiente */}
          <button
            onClick={() => navigateToProject(nextProject)}
            className="pointer-events-auto w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label={`Ir a proyecto siguiente: ${nextProject ? (language === 'en' ? nextProject.fields.titleEn : nextProject.fields.title) : 'Proyecto siguiente'}`}
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