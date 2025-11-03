'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface ProjectDesktopGalleryProps {
  images: string[]
  projectTitle: string
  logoSrc?: string
  isTransitioning?: boolean
}

export default function ProjectDesktopGallery({ 
  images, 
  projectTitle, 
  logoSrc,
  isTransitioning = false 
}: ProjectDesktopGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const desktopScrollRef = useRef<HTMLDivElement>(null)

  // Detectar imagen activa en el scroll - Desktop
  const handleScroll = useCallback(() => {
    if (!desktopScrollRef.current) return
    
    const container = desktopScrollRef.current
    const containerHeight = container.clientHeight
    const scrollTop = container.scrollTop
    
    // Calcular qué imagen está visible
    // Cada imagen ocupa toda la altura del contenedor (h-full)
    const imageHeight = containerHeight
    const activeIndex = Math.floor(scrollTop / imageHeight)
    
    if (activeIndex !== activeImageIndex && activeIndex < images.length) {
      setActiveImageIndex(activeIndex)
    }
  }, [activeImageIndex, images.length])

  useEffect(() => {
    const container = desktopScrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  if (images.length === 0) {
    return (
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">No hay imágenes disponibles</p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
      <div className="relative w-full h-full">
        {/* Carrusel de imágenes desktop */}
        <div 
          ref={desktopScrollRef}
          className="flex flex-col overflow-y-auto h-full scrollbar-hidden snap-y snap-mandatory"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {images.map((imageSrc, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full snap-start">
              <Image
                src={imageSrc}
                alt={`${projectTitle} - Imagen ${index + 1}`}
                width={960}
                height={1080}
                quality={100}
                priority={index === 0}
                loading={index === 0 ? undefined : 'lazy'}
                className={`w-full h-full object-cover transition-opacity duration-200 ease-in-out ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  WebkitTransform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Logo overlay - desktop */}
        {logoSrc && (
          <div className={`absolute left-6 z-10 pointer-events-none ${
            logoSrc.includes('cardales-white') ? 'bottom-3' : 'bottom-6'
          }`}>
            <Image
              src={logoSrc}
              alt={`${projectTitle} logo`}
              width={220}
              height={90}
              className="w-[180px] h-auto"
              priority
            />
          </div>
        )}
        
        {/* Barra de paginación - desktop vertical */}
        {images.length > 1 && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="rounded-full px-2 py-3">
              <div className="relative w-1 h-24 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 w-full bg-[#efefef] rounded-full transition-all duration-300 ease-out"
                  style={{ 
                    height: `${100 / images.length}%`,
                    top: `${(activeImageIndex * 100) / images.length}%`
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
