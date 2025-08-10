"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"

interface AutoSliderProps {
  images: string[]
  altText?: string
  className?: string
}

export default function AutoSlider({ images, altText = "Slide", className = "" }: AutoSliderProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Función para avanzar al siguiente slide
  const nextSlide = useCallback(() => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentPhoto((prevIndex) => (prevIndex + 1) % images.length)
      setIsFading(false)
    }, 500) // Aumentado a 500ms para transición más suave
  }, [images.length])

  // Función para ir a un slide específico
  const goToSlide = (index: number) => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentPhoto(index)
      setIsFading(false)
    }, 500)
  }

  // Función para iniciar el intervalo
  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 5000) // Aumentado a 5 segundos para dar más tiempo
  }, [nextSlide])

  useEffect(() => {
    startInterval()
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [startInterval])

  // Reiniciar slider cuando cambian las imágenes
  useEffect(() => {
    setCurrentPhoto(0)
    setIsFading(false)
  }, [images])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div 
      className={`relative ${className}`}
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
      
      
    </div>
  )
} 