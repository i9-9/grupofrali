"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface AutoSliderProps {
  images: string[]
  altText?: string
  className?: string
}

export default function AutoSlider({ images, altText = "Slide", className = "" }: AutoSliderProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentPhoto((prevIndex) => (prevIndex + 1) % images.length)
      setIsFading(false)
    }, 500) // Aumentado a 500ms para transición más suave
  }

  // Función para ir a un slide específico
  const goToSlide = (index: number) => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentPhoto(index)
      setIsFading(false)
    }, 500)
  }

  // Función para iniciar el intervalo
  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        nextSlide()
      }
    }, 5000) // Aumentado a 5 segundos para dar más tiempo
  }

  // Función para pausar/reanudar
  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  useEffect(() => {
    startInterval()
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, images.length])

  // Reiniciar slider cuando cambian las imágenes
  useEffect(() => {
    setCurrentPhoto(0)
    setIsFading(false)
    setIsPaused(false)
  }, [images])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    > 
      <Image
        src={images[currentPhoto]}
        alt={`${altText} ${currentPhoto + 1}`}
        width={350}
        height={355}
        className={`w-full h-auto object-cover transition-opacity duration-500 ease-in-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Indicadores de slide */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPhoto 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Botón de pausa/reanudar */}
      {images.length > 1 && (
        <button
          onClick={togglePause}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
          aria-label={isPaused ? "Reanudar slideshow" : "Pausar slideshow"}
        >
          {isPaused ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      )}
    </div>
  )
} 