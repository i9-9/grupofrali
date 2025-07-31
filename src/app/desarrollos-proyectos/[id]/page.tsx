'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import projectsData from "@/data/projects.json"

interface ProjectImage {
  individual_mobile?: string | string[]
  individual_desktop?: string | string[]
  alt?: string
}

interface ProjectStats {
  [key: string]: string | number
}



function ResponsiveImage({ 
  desktopImages, 
  mobileImages, 
  alt, 
  className = ""
}: {
  desktopImages: string[]
  mobileImages: string[]
  alt: string
  className?: string
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const images = isMobile ? mobileImages : desktopImages
  
  return (
    <div className="w-full h-full overflow-hidden">
      {images.map((imageSrc, index) => (
        <img 
          key={index}
          src={imageSrc} 
          className={`w-full h-auto object-cover block ${className}`}
          alt={`${alt} - Imagen ${index + 1}`} 
        />
      ))}
    </div>
  )
}

export default function DesarrolloProyecto() {
  const params = useParams()
  const projectId = params.id as string
  const scrollRef = useRef<HTMLDivElement>(null)
  const desktopScrollRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeDesktopImageIndex, setActiveDesktopImageIndex] = useState(0)
  
  // Buscar el proyecto por ID
  const project = projectsData.proyectos.find(p => p.id === projectId)

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
    <main className="min-h-screen md:h-screen bg-[#EFEFEF] relative">
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
                    <img 
                      src={imageSrc} 
                      className="w-full h-full object-cover"
                      alt={`${project.imagenes?.alt || project.titulo} - Imagen ${index + 1}`} 
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
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/desarrollos-proyectos" className="text-[#151714]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
            <span className="text-black font-baskerville text-base">{project.categoria}</span>
          </div>
          
          <h1 className="font-archivo text-4xl text-black mb-15">{project.titulo}</h1>
          <p className="text-[#151714] text-sm mb-4 flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1 text-black">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {project.locacion}
          </p>
          
          <p className="text-[#151714] text-base leading-5 mb-4">
            {project.descripcion}
          </p>
          
          {/* Estadísticas mobile */}
          {project.estadisticas && (
            <div className="flex flex-col gap-4 py-12">
              {Object.entries(project.estadisticas).map(([key, value]) => {
                // Función para separar número y texto (misma lógica que desktop)
                const parseValue = (val: string) => {
                  const str = val.toString()
                  // Detectar si es solo texto (no empieza con número)
                  if (isNaN(Number(str.charAt(0))) && !str.match(/^\d/)) {
                    return { isTextOnly: true, number: '', text: str }
                  }
                  
                  // Separar número principal y texto descriptivo
                  const match = str.match(/^([\d,.]+ ?[A-Z%]*)\s*(.*)$/)
                  if (match && match[2]) {
                    return { isTextOnly: false, number: match[1], text: match[2] }
                  }
                  
                  // Si no hay texto adicional, es solo número
                  return { isTextOnly: false, number: str, text: '' }
                }
                
                const parsed = parseValue(value.toString())
                
                return (
                  <div key={key} className="border-t border-black pt-3 pb-2 flex justify-between items-start">
                    <div className="font-archivo text-black uppercase tracking-wider text-xs leading-3 max-w-[50%]">
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div className="text-right">
                      {parsed.isTextOnly ? (
                        <div className="font-archivo text-black uppercase tracking-wider text-xs leading-3">
                          {parsed.text}
                        </div>
                      ) : (
                        <>
                          <div className="font-archivo text-black text-2xl font-archivo-light leading-none">
                            {parsed.number}
                          </div>
                          {parsed.text && (
                            <div className="font-archivo text-black uppercase tracking-wider text-xs leading-3 mt-1">
                              {parsed.text}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block h-full relative">
        {/* Panel de información desktop */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-white overflow-y-auto z-10 p-8 pt-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/desarrollos-proyectos" className="text-black hover:text-black/80 transition-colors">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </Link>
              <span className="text-[#151714] text-[19px] font-baskerville font-medium">{project.categoria}</span>
            </div>
            
            <h1 className="font-archivo text-4xl text-black mb-2 pb-20">{project.titulo}</h1>
            <p className="text-black mb-6 flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {project.locacion}
            </p>
            
            <p className="text-[#151714] text-[19px] leading-5 mb-8">
              {project.descripcion}
            </p>
            
                        {/* Estadísticas desktop */}
            {project.estadisticas && (
              <div className="grid !grid-cols-2 gap-2">
                {Object.entries(project.estadisticas).map(([key, value]) => {
                  // Función para separar número y texto
                  const parseValue = (val: string) => {
                    const str = val.toString()
                    // Detectar si es solo texto (no empieza con número)
                    if (isNaN(Number(str.charAt(0))) && !str.match(/^\d/)) {
                      return { isTextOnly: true, number: '', text: str }
                    }
                    
                    // Separar número principal y texto descriptivo
                    const match = str.match(/^([\d,.]+ ?[A-Z%]*)\s*(.*)$/)
                    if (match && match[2]) {
                      return { isTextOnly: false, number: match[1], text: match[2] }
                    }
                    
                    // Si no hay texto adicional, es solo número
                    return { isTextOnly: false, number: str, text: '' }
                  }
                  
                  const parsed = parseValue(value.toString())
                  
                  return (
                    <div key={key} className="border-t border-black pt-2 pb-1 flex justify-between items-start">
                      <div className="font-archivo text-black uppercase tracking-wider text-stat-description leading-3">
                        {key.replace(/_/g, ' ')}
                      </div>
                      <div className="text-right">
                        {parsed.isTextOnly ? (
                          <div className="font-archivo text-black uppercase tracking-wider text-stat-description leading-3">
                            {parsed.text}
                          </div>
                        ) : (
                          <>
                            <div className="font-archivo text-black text-3xl font-archivo-light leading-none">
                              {parsed.number}
                            </div>
                            {parsed.text && (
                              <div className="font-archivo text-black uppercase tracking-wider text-xs leading-3 mt-1">
                                {parsed.text}
                              </div>
                            )}
                          </>
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
                    <img 
                      src={imageSrc} 
                      className="w-full h-full object-cover"
                      alt={`${project.imagenes?.alt || project.titulo} - Imagen ${index + 1}`} 
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
                        className="absolute left-0 w-full bg-white rounded-full transition-all duration-300 ease-out"
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
      </div>
    </main>
  )
}