'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import projectsData from "@/data/projects.json"



export default function DesarrolloProyecto() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const scrollRef = useRef<HTMLDivElement>(null)
  const desktopScrollRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeDesktopImageIndex, setActiveDesktopImageIndex] = useState(0)
  
  // Buscar el proyecto por ID
  const project = projectsData.proyectos.find(p => p.id === projectId)
  
  // Encontrar el índice del proyecto actual y calcular anterior/siguiente con navegación circular
  const currentProjectIndex = projectsData.proyectos.findIndex(p => p.id === projectId)
  const previousProject = currentProjectIndex > 0 
    ? projectsData.proyectos[currentProjectIndex - 1] 
    : projectsData.proyectos[projectsData.proyectos.length - 1] // Último proyecto
  const nextProject = currentProjectIndex < projectsData.proyectos.length - 1 
    ? projectsData.proyectos[currentProjectIndex + 1] 
    : projectsData.proyectos[0] // Primer proyecto
  
  // Función para navegar a otro proyecto
  const navigateToProject = (project: typeof projectsData.proyectos[0]) => {
    if (project) {
      router.push(`/desarrollos-proyectos/${project.id}`)
    }
  }

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

  // Detectar imagen activa en el scroll - Mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      
      const container = scrollRef.current
      const containerWidth = container.clientWidth
      const scrollLeft = container.scrollLeft
      
      // Calcular qué imagen está más centrada
      const activeIndex = Math.round(scrollLeft / containerWidth)
      setActiveImageIndex(Math.min(activeIndex, mobileImages.length - 1))
    }

    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [mobileImages.length])

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
        {/* Galería de imágenes mobile - carrusel con paginación */}
        <div className="w-full h-[504px] overflow-hidden relative">
          {hasImages ? (
            <>
              {/* Carrusel de imágenes */}
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto h-full scrollbar-hidden snap-x snap-mandatory"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {mobileImages.map((imageSrc, index) => (
                  <div key={index} className="flex-shrink-0 w-full h-full snap-start">
                    <Image 
                      src={imageSrc} 
                      alt={`${project.imagenes?.alt || project.titulo} - Imagen ${index + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Barra de paginación - mobile horizontal */}
              {mobileImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="rounded-full px-3 py-2">
                    <div className="relative w-24 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 h-full bg-white rounded-full transition-all duration-300 ease-out"
                        style={{ 
                          width: `${100 / mobileImages.length}%`,
                          left: `${(activeImageIndex * 100) / mobileImages.length}%`
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
        <div className="bg-[#EFEFEF] border-t border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/desarrollos-proyectos" className="text-[#151714]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
            <span className="text-black font-baskerville text-base">{project.categoria}</span>
          </div>
          
          <h1 className="font-archivo text-3xl md:text-4xl text-black leading-tight mb-12 md:mb-15">{project.titulo}</h1>
          <p className="text-[#151714] text-sm mb-4 flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1 text-black">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {project.locacion}
          </p>
          
                      <p className="text-[#151714] text-base leading-6 md:leading-5 mb-12">
              {project.descripcion}
            </p>
            
            {/* Estadísticas mobile */}
            {project.estadisticas && (
              <div className="flex flex-col gap-4 py-12 ">
              {Object.entries(project.estadisticas).map(([key, value]) => {
                // Función para separar número y texto (misma lógica que desktop)
                const parseValue = (val: string) => {
                  const str = val.toString()
                  console.log('Parsing value:', str)
                  // Caso especial para códigos como "T6-360" - tratar como número
                  const codigo = str.match(/^([A-Z]\d+-\d+)$/i)
                  console.log('Codigo match:', codigo)
                  if (codigo) {
                    console.log('Found codigo, returning as number')
                    return { 
                      isTextOnly: false, 
                      number: codigo[1], 
                      unit: '', 
                      text: '' 
                    }
                  }
                  
                  // Detectar si es solo texto (no empieza con número)
                  if (isNaN(Number(str.charAt(0))) && !str.match(/^\d/)) {
                    return { isTextOnly: true, number: '', text: str, unit: '' }
                  }
                  
                  // Separar número, unidad técnica y texto descriptivo
                  const techUnitMatch = str.match(/^([\d,.]+)\s+(MW|GWH|KWH|MW|M²|H|KG|TON)\s*(.*)$/i)
                  if (techUnitMatch) {
                    return { 
                      isTextOnly: false, 
                      number: techUnitMatch[1], 
                      unit: techUnitMatch[2], 
                      text: techUnitMatch[3] 
                    }
                  }
                  
                  // Caso especial para "5 ESTRELLAS" - mantener junto
                  const estrellas = str.match(/^(\d+)\s+(ESTRELLAS?)$/i)
                  if (estrellas) {
                    return { 
                      isTextOnly: false, 
                      number: estrellas[1], 
                      unit: '', 
                      text: estrellas[2] 
                    }
                  }
                  
                  // Caso especial para "18 HOYOS" - mantener junto
                  const hoyos = str.match(/^(\d+)\s+(HOYOS?)$/i)
                  if (hoyos) {
                    return { 
                      isTextOnly: false, 
                      number: hoyos[1], 
                      unit: '', 
                      text: hoyos[2] 
                    }
                  }
                  
                  // Separar número con porcentaje o unidad simple
                  const simpleMatch = str.match(/^([\d,.]+)\s*([%A-Z]*)\s*(.*)$/)
                  if (simpleMatch && simpleMatch[2]) {
                    return { 
                      isTextOnly: false, 
                      number: simpleMatch[1] + simpleMatch[2], 
                      unit: '', 
                      text: simpleMatch[3] 
                    }
                  }
                  
                  // Si no hay texto adicional, es solo número
                  return { isTextOnly: false, number: str, text: '', unit: '' }
                }
                
                const parsed = parseValue(value.toString())
                
                                  return (
                    <div key={key} className="border-t border-black pt-1 pb-0 md:pt-0.5 md:pb-0 flex justify-between items-start">
                      <div className="font-archivo text-black uppercase tracking-wider text-stat-description leading-4 md:leading-5 lg:leading-3 max-w-[50%]" style={{ wordBreak: 'break-word', hyphens: 'auto' }}>
                        {key.replace(/_/g, ' ').split(' ').map((word, index) => (
                          <span key={index}>
                            {word}
                            {index === 1 && <br />}
                            {index > 1 && index < key.replace(/_/g, ' ').split(' ').length - 1 && ' '}
                            {index === 0 && index < key.replace(/_/g, ' ').split(' ').length - 1 && ' '}
                          </span>
                        ))}
                      </div>
                      <div className="text-right self-center max-w-[45%]">
                                              {parsed.isTextOnly ? (
                          <div className="font-archivo text-black uppercase tracking-wider text-stat-description leading-4 md:leading-5 lg:leading-3 break-words">
                            {parsed.text}
                          </div>
                        ) : (
                          <div className="flex flex-col items-end">
                            {parsed.text && (parsed.text.toUpperCase() === 'HOYOS' || parsed.text.toUpperCase() === 'ESTRELLAS') ? (
                              // Caso especial para HOYOS y ESTRELLAS - número arriba, texto abajo
                              <>
                                <span className="font-archivo text-black font-archivo-light leading-none" style={{ fontSize: 'clamp(18px, 5vw, 30px)' }}>
                                  {parsed.number}
                                </span>
                                <div className="font-archivo text-black uppercase tracking-wider text-stat-description leading-4 md:leading-5 lg:leading-3">
                                  {parsed.text}
                                </div>
                              </>
                            ) : (
                              // Caso normal - número y unidad/texto en línea
                              <>
                                <div className="flex items-baseline gap-1">
                                  <span className="font-archivo text-black font-archivo-light leading-none" style={{ fontSize: 'clamp(18px, 5vw, 30px)' }}>
                                    {parsed.number}
                                  </span>
                                  {parsed.unit && (
                                    <span className="font-archivo text-black uppercase tracking-wider text-stat-description leading-4 md:leading-5 lg:leading-3">
                                      {parsed.unit}
                                    </span>
                                  )}
                                  {!parsed.unit && parsed.text && (
                                    <span className="font-archivo text-black uppercase tracking-wider text-stat-description leading-4 md:leading-5 lg:leading-3">
                                      {parsed.text}
                                    </span>
                                  )}
                                </div>
                                {parsed.unit && parsed.text && (
                                  <div className="font-archivo text-black uppercase tracking-wider text-stat-description leading-4 md:leading-5 lg:leading-3">
                                    {parsed.text}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        
        {/* Flechas de navegación desktop */}
        <div className="hidden md:flex fixed bottom-2 left-0 right-0 justify-between pointer-events-none z-50 px-4">
          {/* Flecha anterior */}
          <button
            onClick={() => navigateToProject(previousProject)}
            className="pointer-events-auto w-12 h-12 flex items-center hover:opacity-70 transition-opacity"
            aria-label={`Ir a proyecto anterior: ${previousProject.titulo}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          
          {/* Flecha siguiente */}
          <button
            onClick={() => navigateToProject(nextProject)}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label={`Ir a proyecto siguiente: ${nextProject.titulo}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block h-full relative">
        {/* Panel de información desktop */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-[#EFEFEF] z-10 p-4 md:p-6 lg:p-8 pt-16 md:pt-20 lg:pt-24 flex flex-col">
          <div className="max-w-xl md:max-w-2xl">
            {/* Header fijo */}
            <div className="flex items-center gap-2 mb-4">
              <Link href="/desarrollos-proyectos" className="text-black hover:text-black/80 transition-colors">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </Link>
              <span className="text-[#151714] font-baskerville font-medium" style={{ fontSize: 'clamp(16px, 1.5vw, 19px)' }}>{project.categoria}</span>
            </div>
            
            {/* Título con altura fija */}
            <div className="h-24 md:h-32 lg:h-36 flex items-start mb-6">
              <h1 className="font-archivo text-black leading-tight" style={{ fontSize: 'clamp(24px, 36px, 48px)' }}>{project.titulo}</h1>
            </div>
            {/* Contenido con espacio flexible */}
            <div className="flex-1 flex flex-col justify-start space-y-6">
              <p className="text-black flex items-center" style={{ fontSize: 'clamp(12px, 1vw, 16px)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 md:w-[18px] md:h-[18px]">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {project.locacion}
              </p>
              
              <p className="text-[#151714] leading-[1.1]" style={{ fontSize: 'clamp(14px, 1.25vw, 16px)' }}>
                {project.descripcion}
              </p>
            </div>
            
            {/* Estadísticas desktop */}
            {project.estadisticas && (
              <div className="grid !grid-cols-2 gap-2 mt-16">
                {Object.entries(project.estadisticas).map(([key, value]) => {
                  // Función para separar número y texto
                  const parseValue = (val: string) => {
                    const str = val.toString()
                    console.log('Desktop parsing value:', str)
                    // Caso especial para códigos como "T6-360" - tratar como número
                    const codigo = str.match(/^([A-Z]\d+-\d+)$/i)
                    console.log('Desktop codigo match:', codigo)
                    if (codigo) {
                      console.log('Desktop found codigo, returning as number')
                      return { 
                        isTextOnly: false, 
                        number: codigo[1], 
                        unit: '', 
                        text: '' 
                      }
                    }
                    
                    // Detectar si es solo texto (no empieza con número)
                    if (isNaN(Number(str.charAt(0))) && !str.match(/^\d/)) {
                      return { isTextOnly: true, number: '', text: str, unit: '' }
                    }
                    
                    // Separar número, unidad técnica y texto descriptivo
                    const techUnitMatch = str.match(/^([\d,.]+)\s+(MW|GWH|KWH|MW|M²|H|KG|TON)\s*(.*)$/i)
                    if (techUnitMatch) {
                      return { 
                        isTextOnly: false, 
                        number: techUnitMatch[1], 
                        unit: techUnitMatch[2], 
                        text: techUnitMatch[3] 
                      }
                    }
                    
                    // Caso especial para "5 ESTRELLAS" - mantener junto
                    const estrellas = str.match(/^(\d+)\s+(ESTRELLAS?)$/i)
                    if (estrellas) {
                      return { 
                        isTextOnly: false, 
                        number: estrellas[1], 
                        unit: '', 
                        text: estrellas[2] 
                      }
                    }
                    
                    // Caso especial para "18 HOYOS" - mantener junto
                    const hoyos = str.match(/^(\d+)\s+(HOYOS?)$/i)
                    if (hoyos) {
                      return { 
                        isTextOnly: false, 
                        number: hoyos[1], 
                        unit: '', 
                        text: hoyos[2] 
                      }
                    }
                    
                    // Separar número con porcentaje o unidad simple
                    const simpleMatch = str.match(/^([\d,.]+)\s*([%A-Z]*)\s*(.*)$/)
                    if (simpleMatch && simpleMatch[2]) {
                      return { 
                        isTextOnly: false, 
                        number: simpleMatch[1] + simpleMatch[2], 
                        unit: '', 
                        text: simpleMatch[3] 
                      }
                    }
                    
                    // Si no hay texto adicional, es solo número
                    return { isTextOnly: false, number: str, text: '', unit: '' }
                  }
                  
                  const parsed = parseValue(value.toString())
                  
                  return (
                    <div key={key} className="border-t border-black pt-0.5 pb-0 flex justify-between items-start">
                      <div className="font-archivo text-black uppercase tracking-wider leading-[1]" style={{ fontSize: 'clamp(9px, 0.8vw, 14px)', wordBreak: 'break-word', hyphens: 'auto' }}>
                        {key.replace(/_/g, ' ').split(' ').map((word, index) => (
                          <span key={index}>
                            {word}
                            {index === 1 && <br />}
                            {index > 1 && index < key.replace(/_/g, ' ').split(' ').length - 1 && ' '}
                            {index === 0 && index < key.replace(/_/g, ' ').split(' ').length - 1 && ' '}
                          </span>
                        ))}
                      </div>
                      <div className="text-right self-center max-w-[45%]">
                        {parsed.isTextOnly ? (
                          <div className="font-archivo text-black uppercase tracking-wider leading-[1.1] break-words" style={{ fontSize: 'clamp(9px, 0.8vw, 14px)' }}>
                            {parsed.text}
                          </div>
                        ) : (
                          <div className="flex flex-col items-end">
                            {parsed.text && (parsed.text.toUpperCase() === 'HOYOS' || parsed.text.toUpperCase() === 'ESTRELLAS') ? (
                              // Caso especial para HOYOS y ESTRELLAS - número arriba, texto abajo
                              <>
                                <span className="font-archivo text-black font-archivo-light leading-none" style={{ fontSize: 'clamp(18px, 2.2vw, 30px)' }}>
                                  {parsed.number}
                                </span>
                                <div className="font-archivo text-black uppercase tracking-wider leading-[1.1]" style={{ fontSize: 'clamp(9px, 0.8vw, 14px)' }}>
                                  {parsed.text}
                                </div>
                              </>
                            ) : (
                              // Caso normal - número y unidad/texto en línea
                              <>
                                <div className="flex items-baseline gap-1">
                                  <span className="font-archivo text-black font-archivo-light leading-none" style={{ fontSize: 'clamp(18px, 2.2vw, 30px)' }}>
                                    {parsed.number}
                                  </span>
                                  {parsed.unit && (
                                    <span className="font-archivo text-black uppercase tracking-wider leading-[1.1]" style={{ fontSize: 'clamp(9px, 0.8vw, 14px)' }}>
                                      {parsed.unit}
                                    </span>
                                  )}
                                  {!parsed.unit && parsed.text && (
                                    <span className="font-archivo text-black uppercase tracking-wider leading-[1.1]" style={{ fontSize: 'clamp(9px, 0.8vw, 14px)' }}>
                                      {parsed.text}
                                    </span>
                                  )}
                                </div>
                                {parsed.unit && parsed.text && (
                                  <div className="font-archivo text-black uppercase tracking-wider leading-[1.1]" style={{ fontSize: 'clamp(9px, 0.8vw, 14px)' }}>
                                    {parsed.text}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
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
                      alt={`${project.imagenes?.alt || project.titulo} - Imagen ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
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