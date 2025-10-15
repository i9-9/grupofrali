'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProjectImageSliderProps {
  images: string[]
  projectTitle: string
  logoSrc?: string
  isTransitioning?: boolean
}

export default function ProjectImageSlider({ 
  images, 
  projectTitle, 
  logoSrc,
  isTransitioning = false 
}: ProjectImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isTracking, setIsTracking] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [lastWheelTime, setLastWheelTime] = useState(0)

  // Threshold mínimo para el swipe
  const SWIPE_THRESHOLD = 50

  const nextSlide = () => {
    if (currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  // Handlers de touch mejorados
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setStartX(touch.clientX)
    setCurrentX(touch.clientX)
    setIsTracking(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTracking) return
    
    const touch = e.touches[0]
    setCurrentX(touch.clientX)
    
    // Prevenir scroll vertical si el movimiento es principalmente horizontal
    const deltaX = Math.abs(touch.clientX - startX)
    const deltaY = Math.abs(touch.clientY - (e.touches[0]?.clientY || 0))
    
    if (deltaX > deltaY) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = () => {
    if (!isTracking) return
    
    setIsTracking(false)
    
    const deltaX = startX - currentX
    
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0 && currentSlide < images.length - 1) {
        // Swipe left - siguiente imagen
        nextSlide()
      } else if (deltaX < 0 && currentSlide > 0) {
        // Swipe right - imagen anterior
        prevSlide()
      }
    }
    
    setStartX(0)
    setCurrentX(0)
  }

  // Handlers de mouse mejorados para desktop dev tools
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setStartX(e.clientX)
    setCurrentX(e.clientX)
    setIsTracking(true)
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isTracking || !isDragging) return
    
    e.preventDefault()
    setCurrentX(e.clientX)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isTracking) return
    
    e.preventDefault()
    setIsTracking(false)
    setIsDragging(false)
    
    const deltaX = startX - currentX
    
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0 && currentSlide < images.length - 1) {
        // Drag left - siguiente imagen
        nextSlide()
      } else if (deltaX < 0 && currentSlide > 0) {
        // Drag right - imagen anterior
        prevSlide()
      }
    }
    
    setStartX(0)
    setCurrentX(0)
  }

  const handleMouseLeave = () => {
    setIsTracking(false)
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }

  // Handler para trackpad/mouse wheel con throttle
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    
    const now = Date.now()
    const timeSinceLastWheel = now - lastWheelTime
    
    // Throttle: solo procesar si han pasado al menos 150ms desde el último wheel
    if (timeSinceLastWheel < 150) return
    
    setLastWheelTime(now)
    
    // Detectar dirección del scroll horizontal
    const deltaX = e.deltaX
    const deltaY = e.deltaY
    
    // Threshold mínimo para considerar el movimiento
    const threshold = 10
    
    // Si hay scroll horizontal significativo, usar esa dirección
    if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && currentSlide < images.length - 1) {
        // Scroll hacia la derecha - siguiente imagen
        nextSlide()
      } else if (deltaX < 0 && currentSlide > 0) {
        // Scroll hacia la izquierda - imagen anterior
        prevSlide()
      }
    } else if (Math.abs(deltaY) > threshold) {
      // Si no hay scroll horizontal significativo, usar scroll vertical
      if (deltaY > 0 && currentSlide < images.length - 1) {
        // Scroll hacia abajo - siguiente imagen
        nextSlide()
      } else if (deltaY < 0 && currentSlide > 0) {
        // Scroll hacia arriba - imagen anterior
        prevSlide()
      }
    }
  }

  // Handler para teclas de flecha
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && currentSlide > 0) {
      e.preventDefault()
      prevSlide()
    } else if (e.key === 'ArrowRight' && currentSlide < images.length - 1) {
      e.preventDefault()
      nextSlide()
    }
  }

  if (images.length === 0) {
    return (
      <div 
        className="w-full relative overflow-hidden bg-black flex items-center justify-center"
        style={{ 
          aspectRatio: '393/504', // Aspect ratio específico para mobile basado en w393 del diseño
          height: 'clamp(400px, 128.2vw, 504px)' // Escalado responsive desde 504px en w393
        }}
      >
        <p className="text-gray-500">No hay imágenes disponibles</p>
      </div>
    )
  }

  return (
    <div 
      className="w-full relative overflow-hidden bg-black"
      style={{ 
        aspectRatio: '393/504', // Aspect ratio específico para mobile basado en w393 del diseño
        height: 'clamp(400px, 128.2vw, 504px)' // Escalado responsive desde 504px en w393
      }}
      tabIndex={0} // Hacer focusable para eventos de teclado
      onKeyDown={handleKeyDown}
    >
      {/* Contenedor de slides con transform */}
      <div 
        className="flex h-full transition-transform duration-300 ease-out select-none cursor-grab active:cursor-grabbing project-image-slider-container"
        style={{
          width: `${images.length * 100}%`, // El contenedor debe ser tan ancho como todas las slides juntas
          transform: `translateX(-${currentSlide * 100}%)`, // Cada slide se mueve 100% del viewport
          gap: '0px',
          margin: '0px',
          padding: '0px',
          touchAction: 'pan-y' // Permite scroll vertical pero controla horizontal
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        onDragStart={(e) => e.preventDefault()} // Previene drag de imágenes
      >
        {images.map((imageSrc, index) => (
          <div 
            key={index} 
            className="relative flex-shrink-0 pointer-events-none project-image-slider-container"
            style={{
              width: '100%', // Cada slide debe ocupar el 100% del contenedor
              height: '100%',
              margin: '0px',
              padding: '0px',
              border: 'none',
              outline: 'none',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}
          >
            <Image 
              src={imageSrc} 
              alt={`${projectTitle} - Imagen ${index + 1}`}
              fill
              sizes="(max-width: 393px) 100vw, (max-width: 768px) 393px, 393px"
              quality={100}
              className={`object-cover transition-opacity duration-300 pointer-events-none ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                objectFit: 'cover',
                display: 'block',
                margin: '0px',
                padding: '0px',
                border: 'none',
                userSelect: 'none',
                boxSizing: 'border-box',
                width: '100%',
                height: '100%'
              }}
              priority={index === 0}
              draggable={false}
            />
          </div>
        ))}
      </div>
      
      {/* Logo overlay - mobile */}
      {logoSrc && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 z-10 pointer-events-none">
          <Image
            src={logoSrc}
            alt={`${projectTitle} logo`}
            width={200}
            height={80}
            className="w-[140px] h-auto"
            priority
          />
        </div>
      )}
      
      {/* Barra de progreso */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="rounded-full px-3 py-2">
            <div className="relative w-24 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 h-full bg-white rounded-full transition-all duration-300 ease-out"
                style={{ 
                  width: `${100 / images.length}%`,
                  left: `${(currentSlide * 100) / images.length}%`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
