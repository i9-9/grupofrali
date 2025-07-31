'use client'

import { useState, useEffect } from 'react'
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
  
  // Buscar el proyecto por ID
  const project = projectsData.proyectos.find(p => p.id === projectId)
  
  if (!project) {
    return (
      <div className="content-wrapper h-screen flex items-center justify-center">
        <h1>Proyecto no encontrado</h1>
      </div>
    )
  }

  const mobileImages: string[] = (() => {
    const mobile = project.imagenes?.individual_mobile
    if (!mobile) return []
    return Array.isArray(mobile) ? mobile : [mobile]
  })()
      
  const desktopImages: string[] = (() => {
    const desktop = project.imagenes?.individual_desktop
    if (!desktop) return []
    return Array.isArray(desktop) ? desktop : [desktop]
  })()

  const hasImages = mobileImages.length > 0 || desktopImages.length > 0

  return (
    <main className="h-screen bg-[#EFEFEF] relative">
      {/* Mobile Layout */}
      <div className="md:hidden h-full flex flex-col">
        {/* Galería de imágenes mobile */}
        <div className="h-[504px] md:h-full overflow-hidden">
          {hasImages ? (
            <ResponsiveImage 
              desktopImages={desktopImages}
              mobileImages={mobileImages}
              alt={project.imagenes?.alt || project.titulo}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">No hay imágenes disponibles</p>
            </div>
          )}
        </div>
        
        {/* Panel de información mobile - fijo en la parte inferior */}
        <div className="bg-white border-t border-gray-200 p-4 max-h-[50vh] overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/desarrollos-proyectos" className="text-gray-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
            <span className="text-gray-500 text-sm font-medium">{project.categoria}</span>
          </div>
          
          <h1 className="font-baskerville text-2xl text-black mb-1">{project.titulo}</h1>
          <p className="text-gray-600 text-sm mb-4 flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {project.locacion}
          </p>
          
          <p className="text-black text-sm leading-relaxed mb-4">
            {project.descripcion}
          </p>
          
          {/* Estadísticas mobile */}
          {project.estadisticas && (
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(project.estadisticas).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600 text-xs uppercase tracking-wide">{key.replace(/_/g, ' ')}</span>
                  <span className="text-black text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block h-full relative">
        {/* Panel de información desktop - fijo */}
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
        
        {/* Galería de imágenes desktop - scrolleable */}
        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
          {hasImages ? (
            <ResponsiveImage 
              desktopImages={desktopImages}
              mobileImages={mobileImages}
              alt={project.imagenes?.alt || project.titulo}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">No hay imágenes disponibles</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}