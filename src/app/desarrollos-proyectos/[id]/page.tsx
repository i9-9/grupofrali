'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"
import { useLanguage } from "@/contexts/LanguageContext"
import projectsData from "@/data/projects.json"

export default function DesarrolloProyecto() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const projectId = params.id as string
  const desktopScrollRef = useRef<HTMLDivElement>(null)
  
  // Estados para carrusel mobile con transform
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  const [activeDesktopImageIndex, setActiveDesktopImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Intersection Observer para estadísticas mobile
  const { ref: mobileStatsRef, isVisible: isMobileStatsVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  })

  // Intersection Observer para estadísticas desktop
  const { ref: desktopStatsRef, isVisible: isDesktopStatsVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  })
  
  // Buscar el proyecto por ID
  const project = projectsData.proyectos.find(p => p.id === projectId)
  
  // Crear URL de vuelta que preserva el filtro y hace scroll a proyectos
  const getBackUrl = useMemo(() => {
    if (!project) return '/desarrollos-proyectos'
    
    const params = new URLSearchParams()
    
    // Agregar categoría si no es "VER TODOS"
    if (project.categoria !== "VER TODOS") {
      params.set('categoria', project.categoria)
    }
    
    // Agregar parámetro para hacer scroll a proyectos
    params.set('scrollTo', 'projects')
    
    return `/desarrollos-proyectos?${params.toString()}`
  }, [project])
  
  // Encontrar el índice del proyecto actual y calcular anterior/siguiente con navegación circular
  const currentProjectIndex = projectsData.proyectos.findIndex(p => p.id === projectId)
  const previousProject = currentProjectIndex > 0 
    ? projectsData.proyectos[currentProjectIndex - 1] 
    : projectsData.proyectos[projectsData.proyectos.length - 1] // Último proyecto
  const nextProject = currentProjectIndex < projectsData.proyectos.length - 1 
    ? projectsData.proyectos[currentProjectIndex + 1] 
    : projectsData.proyectos[0] // Primer proyecto
  

  const mobileImages: string[] = (() => {
    if (!project?.imagenes?.individual_mobile) return []
    const mobile = project.imagenes.individual_mobile
    return Array.isArray(mobile) ? mobile : [mobile]
  })()
      
  const desktopImages: string[] = (() => {
    if (!project?.imagenes?.individual_desktop) return []
    const desktop = project.imagenes.individual_desktop
    return Array.isArray(desktop) ? desktop : [desktop]
  })()

  const hasImages = mobileImages.length > 0 || desktopImages.length > 0

  // Variable para detectar LA RESERVA CARDALES
  const isReservaCardales = (language === 'en' ? project?.title_en : project?.titulo) === 'LA RESERVA CARDALES'

  // Funciones para carrusel mobile con transform
  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, mobileImages.length - 1)))
  }

  const nextSlide = () => {
    if (currentSlide < mobileImages.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  // Manejar gestos táctiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
    
    setIsDragging(false)
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Detectar imagen activa en el scroll - Desktop
  useEffect(() => {
    const handleScroll = () => {
      if (!desktopScrollRef.current) return
      
      const container = desktopScrollRef.current
      const containerHeight = container.clientHeight
      const scrollTop = container.scrollTop
      
      // Calcular qué imagen está más centrada
      const activeIndex = Math.round(scrollTop / containerHeight)
      setActiveDesktopImageIndex(Math.min(activeIndex, desktopImages.length - 1))
    }

    const container = desktopScrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [desktopImages.length])
  
  // Función para navegar entre proyectos con transición de opacidad
  const navigateToProject = (targetProject: typeof projectsData.proyectos[0]) => {
    if (!targetProject) return
    
    setIsTransitioning(true)
    
    setTimeout(() => {
      router.push(`/desarrollos-proyectos/${targetProject.id}`)
    }, 150) // Mitad de la transición para cambiar el contenido
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300) // Duración total de la transición
  }

  // Función para crear delay class según el índice
  const getLineDelayClass = (index: number) => {
    return `project-stats-line-delay-${index + 1}`
  }

  // Componente para estadística individual con contador animado
  const StatisticItem = ({ 
    statKey, 
    value, 
    index, 
    isVisible 
  }: { 
    statKey: string, 
    value: string, 
    index: number, 
    isVisible: boolean 
  }) => {
    // Función simplificada para parsear estadísticas con 4 tipos claros
    const parseValue = (val: string) => {
      const str = val.toString().trim()
      
      // Caso especial para códigos de zonificación como "T6-360" - MOVER ARRIBA
      const zonificacion = str.match(/^(T\d+-\d+)$/i)
      if (zonificacion) {
        return { 
          isTextOnly: false,
          number: str, // Todo el código se trata como número
          text: '',
          unit: ''
        }
      }
      
      // Tipo 1: TEXTO - Solo texto sin números al inicio
      if (isNaN(Number(str.charAt(0))) && !str.match(/^\d/) && !str.match(/^T\d/i)) {
        return { 
          isTextOnly: true,
          number: '',
          text: str,
          unit: ''
        }
      }
      
      // Caso especial: "100% COMERCIALIZADO Y HABITADO" debe tratarse como texto completo
      if (str === "100% COMERCIALIZADO Y HABITADO") {
        return { 
          isTextOnly: true,
          number: '',
          text: str,
          unit: ''
        }
      }
      
      // Caso especial para porcentajes con texto
      const porcentajeConTexto = str.match(/^([\d,.]+%)\s+(.+)$/)
      if (porcentajeConTexto) {
        return { 
          isTextOnly: false,
          number: porcentajeConTexto[1],
          text: porcentajeConTexto[2],
          unit: ''
        }
      }
      
      // Tipo 2: NUMERO - Solo números (incluyendo decimales y porcentajes)
      const soloNumero = str.match(/^([\d,.]+[%]?)$/)
      if (soloNumero) {
        return { 
          isTextOnly: false,
          number: soloNumero[1],
          text: '',
          unit: ''
        }
      }
      
      // Tipo 3: NUMERO CON UNIDAD - Número seguido de unidad técnica corta
      const numeroConUnidad = str.match(/^([\d,.]+)\s+(MW|GWH|KWH|M²|H|KG|TON|€|USD|\$)$/i)
      if (numeroConUnidad) {
        return { 
          isTextOnly: false,
          number: numeroConUnidad[1],
          unit: numeroConUnidad[2],
          text: ''
        }
      }
      
      // Caso especial para "HOYOS" y "ESTRELLAS" - número arriba, texto abajo
      const hoyosEstrellas = str.match(/^(\d+)\s+(HOYOS?|ESTRELLAS?)$/i)
      if (hoyosEstrellas) {
        return { 
          isTextOnly: false,
          number: hoyosEstrellas[1],
          text: hoyosEstrellas[2],
          unit: ''
        }
      }
      
      // Tipo 4: NUMERO CON TEXTO - Número seguido de texto descriptivo
      const numeroConTexto = str.match(/^([\d,.]+)\s+(.+)$/)
      if (numeroConTexto) {
        return { 
          isTextOnly: false,
          number: numeroConTexto[1],
          text: numeroConTexto[2],
          unit: ''
        }
      }
      
      // Fallback: tratar como número
      return { 
        isTextOnly: false,
        number: str,
        text: '',
        unit: ''
      }
    }

    const parsed = parseValue(value.toString())

    // Hook de animación de conteo para números
    const { displayValue } = useCounterAnimation({
      targetValue: parsed.number,
      isVisible,
      duration: 1500,
      delay: index * 200 // 200ms entre cada estadística
    })

    return (
      <div className={`pt-3 pb-1 flex justify-between items-start min-h-[60px] md:min-h-[20px] project-stats-line ${getLineDelayClass(index)} ${isVisible ? 'animate' : ''} ${parsed.isTextOnly ? 'text-only' : ''}`}>
        <div className="font-archivo text-black uppercase tracking-wider leading-none max-w-[50%] md:text-[0.8rem] text-[14px] md:text-[13px] self-start" style={{ wordBreak: 'break-word' }}>
          {statKey.replace(/_/g, ' ').split(' ').map((word, index) => (
            <span key={index}>
              {word}
              {index === 1 && <br />}
              {index > 1 && index < statKey.replace(/_/g, ' ').split(' ').length - 1 && ' '}
              {index === 0 && index < statKey.replace(/_/g, ' ').split(' ').length - 1 && ' '}
            </span>
          ))}
        </div>
        <div className="text-right self-center max-w-[45%]">
          {parsed.isTextOnly ? (
            <div className="font-archivo text-black uppercase tracking-wider leading-none break-words text-stat-description md:text-[0.8rem]" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 'clamp(14px, 2.5vw, 16px)' : undefined }}>
              {parsed.text}
            </div>
          ) : parsed.text && (parsed.text.toUpperCase() === 'HOYOS' || parsed.text.toUpperCase() === 'ESTRELLAS') ? (
            // Caso especial para HOYOS y ESTRELLAS - número arriba, texto abajo
            <>
              <span className="font-archivo text-black font-archivo-light leading-none text-h2-arquivo md:text-h2-archivo" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '2.5rem' : '1.875rem' }}>
                {displayValue}
              </span>
              <div className="font-archivo text-black uppercase tracking-wider leading-none text-stat-description md:text-[0.8rem]" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 'clamp(14px, 3vw, 20px)' : undefined }}>
                {parsed.text}
              </div>
            </>
          ) : (
            // Caso normal - número y unidad/texto
            <div className="flex flex-col items-end">
              {parsed.unit ? (
                // Número con unidad en línea
                <div className="flex items-baseline gap-1">
                  <span className="font-archivo text-black font-arquivo-light leading-none text-h2-arquivo md:text-h2-archivo" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '2.5rem' : '1.875rem' }}>
                    {displayValue}
                  </span>
                  <span className="font-archivo text-black uppercase tracking-wider leading-none text-stat-description md:text-[0.8rem]" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 'clamp(14px, 3vw, 20px)' : undefined }}>
                    {parsed.unit}
                  </span>
                </div>
              ) : parsed.text ? (
                // Número arriba, texto abajo
                <>
                  <span className="font-archivo text-black font-arquivo-light leading-none text-h2-arquivo md:text-h2-archivo" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '2.5rem' : '1.875rem' }}>
                    {displayValue}
                  </span>
                  <div className="font-archivo text-black uppercase tracking-wider leading-none text-stat-description md:text-[0.8rem]" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 'clamp(14px, 2.5vw, 16px)' : undefined }}>
                    {parsed.text}
                  </div>
                </>
              ) : (
                // Solo número
                <span className="font-archivo text-black font-arquivo-light leading-none text-h2-arquivo md:text-h2-archivo" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '2.5rem' : '1.875rem' }}>
                  {displayValue}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    )
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
        {/* CARRUSEL MOBILE CON TRANSFORM - SIN LÍNEAS BLANCAS */}
        <div className="w-full h-[504px] relative overflow-hidden bg-black">
          {hasImages ? (
            <>
              {/* Contenedor de slides con transform */}
              <div 
                className="flex h-full transition-transform duration-300 ease-out"
                style={{
                  width: `${mobileImages.length * 100}%`,
                  transform: `translateX(-${currentSlide * (100 / mobileImages.length)}%)`,
                  // Eliminar gaps y asegurar que no hay espacios
                  gap: 0,
                  margin: 0,
                  padding: 0
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {mobileImages.map((imageSrc, index) => (
                  <div 
                    key={index} 
                    className="relative flex-shrink-0"
                    style={{
                      width: `${100 / mobileImages.length}%`,
                      height: '100%',
                      // Asegurar que no hay espacios entre slides
                      margin: 0,
                      padding: 0,
                      border: 'none',
                      outline: 'none'
                    }}
                  >
                    <Image 
                      src={imageSrc} 
                      alt={`${project.imagenes?.alt || (language === 'en' ? project.title_en : project.titulo)} - Imagen ${index + 1}`}
                      fill
                      sizes="100vw"
                      quality={100}
                      className={`object-cover transition-opacity duration-300 ${
                        isTransitioning ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{
                        objectFit: 'cover',
                        // Eliminar cualquier espacio en la imagen
                        display: 'block',
                        margin: 0,
                        padding: 0,
                        border: 'none'
                      }}
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
              
              {/* Barra de progreso */}
              {mobileImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="rounded-full px-3 py-2">
                    <div className="relative w-24 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 h-full bg-white rounded-full transition-all duration-300 ease-out"
                        style={{ 
                          width: `${100 / mobileImages.length}%`,
                          left: `${(currentSlide * 100) / mobileImages.length}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              

            </>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">No hay imágenes disponibles</p>
            </div>
          )}
        </div>
        
        {/* Panel de información mobile */}
        <div className={`bg-[#EFEFEF] border-t border-gray-200 p-4 transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Link href={getBackUrl} className="text-[#151714]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
            <span className="text-black font-baskerville text-base">{language === 'en' ? project.category_en : project.categoria}</span>
          </div>
          
          <h1 className="font-archivo text-3xl md:text-4xl text-black leading-tight mb-12 md:mb-15">{language === 'en' ? project.title_en : project.titulo}</h1>
          <p className="text-[#151714] text-sm mb-4 flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1 text-black">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {language === 'en' ? project.location_en : project.locacion}
          </p>
          
          <p className="text-[#151714] text-base leading-6 md:leading-5 mb-12">
            {language === 'en' ? project.description_en : project.descripcion}
          </p>
          
          {/* Estadísticas mobile con animaciones */}
          {(language === 'en' ? project.statistics_en : project.estadisticas) && (
            <div className="py-12" ref={mobileStatsRef}>
              <div className="stats-custom-layout">
                {Object.entries(language === 'en' ? project.statistics_en : project.estadisticas).map(([key, value], index) => (
                  <StatisticItem 
                    key={key}
                    statKey={key}
                    value={value}
                    index={index}
                    isVisible={isMobileStatsVisible}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block h-full relative">
        {/* Panel de información desktop */}
        <div className={`absolute left-0 top-0 w-1/2 h-full bg-[#EFEFEF] z-10 p-4 md:p-6 lg:p-8 pt-16 md:pt-20 lg:pt-24 flex flex-col transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        } ${(language === 'en' ? project?.title_en : project?.titulo) === 'SOFITEL LA RESERVA CARDALES' ? 'pb-32' : ''}`}>
          <div className="max-w-xl md:max-w-2xl">
            {/* Header fijo */}
            <div className="flex items-center gap-2 mb-4">
              <Link href={getBackUrl} className="text-black hover:text-black/80 transition-colors">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </Link>
              <span className="text-[#151714] font-baskerville font-medium" style={{ fontSize: 'clamp(16px, 1.5vw, 19px)' }}>{language === 'en' ? project.category_en : project.categoria}</span>
            </div>
            
            {/* Título con altura fija - AJUSTADO PARA LA RESERVA CARDALES */}
            <div className={`flex items-start ${isReservaCardales ? 'h-16 md:h-20 lg:h-24 mb-2' : 'h-24 md:h-32 lg:h-36 mb-6'}`}>
              <h1 className="font-archivo text-black leading-tight" style={{ fontSize: 'clamp(24px, 36px, 48px)' }}>{language === 'en' ? project.title_en : project.titulo}</h1>
            </div>
            
            {/* Contenido con espacio flexible - AJUSTADO PARA LA RESERVA CARDALES */}
            <div className={`flex-1 flex flex-col justify-start ${isReservaCardales ? 'space-y-1' : 'space-y-8'}`}>
              <p className={`text-black flex items-center ${(language === 'en' ? project?.title_en : project?.titulo) === 'SOFITEL LA RESERVA CARDALES' ? 'mb-2' : ''}`} style={{ fontSize: 'clamp(12px, 1vw, 16px)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 md:w-[18px] md:h-[18px]">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {language === 'en' ? project.location_en : project.locacion}
              </p>
              
              <p className={`text-[#151714] leading-none ${(language === 'en' ? project?.title_en : project?.titulo) === 'SOFITEL LA RESERVA CARDALES' ? 'mb-4' : ''}`} style={{ fontSize: 'clamp(14px, 1.25vw, 16px)' }}>
                {language === 'en' ? project.description_en : project.descripcion}
              </p>
            </div>
            
            {/* Estadísticas desktop con animaciones - AJUSTADO PARA LA RESERVA CARDALES */}
            {(language === 'en' ? project.statistics_en : project.estadisticas) && (
              <div className={`grid !grid-cols-2 gap-2 md:gap-x-6 md:gap-y-1 ${(language === 'en' ? project?.title_en : project?.titulo) === 'SOFITEL LA RESERVA CARDALES' ? 'mt-8' : 'mt-16'}`} ref={desktopStatsRef}>
                {Object.entries(language === 'en' ? project.statistics_en : project.estadisticas).map(([key, value], index) => (
                  <StatisticItem 
                    key={key}
                    statKey={key}
                    value={value}
                    index={index}
                    isVisible={isDesktopStatsVisible}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Galería de imágenes desktop - carrusel vertical */}
        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
          <div className="relative w-full h-full">
            {hasImages ? (
              <>
                {/* Carrusel de imágenes desktop */}
                <div 
                  ref={desktopScrollRef}
                  className="flex flex-col overflow-y-auto h-full scrollbar-hidden snap-y snap-mandatory"
                  style={{ scrollSnapType: 'y mandatory' }}
                >
                  {desktopImages.map((imageSrc, index) => (
                    <div key={index} className="flex-shrink-0 w-full h-full snap-start">
                      <Image 
                        src={imageSrc} 
                        alt={`${project.imagenes?.alt || (language === 'en' ? project.title_en : project.titulo)} - Imagen ${index + 1}`}
                        width={800}
                        height={600}
                        quality={100}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          isTransitioning ? 'opacity-0' : 'opacity-100'
                        }`}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Barra de paginación - desktop vertical */}
                {desktopImages.length > 1 && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="rounded-full px-2 py-3">
                      <div className="relative w-1 h-24 bg-white/30 rounded-full overflow-hidden">
                        <div 
                          className="absolute left-0 w-full bg-[#efefef] rounded-full transition-all duration-300 ease-out"
                          style={{ 
                            height: `${100 / desktopImages.length}%`,
                            top: `${(activeDesktopImageIndex * 100) / desktopImages.length}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">No hay imágenes disponibles</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Flechas de navegación desktop */}
        <div className="flex absolute bottom-2 left-0 right-0 justify-between pointer-events-none z-20 px-4 md:px-6">
          {/* Flecha anterior */}
          <button
            onClick={() => navigateToProject(previousProject)}
            className="pointer-events-auto w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label={`Ir a proyecto anterior: ${previousProject.titulo}`}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          
          {/* Flecha siguiente */}
          <button
            onClick={() => navigateToProject(nextProject)}
            className="pointer-events-auto w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label={`Ir a proyecto siguiente: ${nextProject.titulo}`}
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