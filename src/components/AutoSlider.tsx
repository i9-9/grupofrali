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
    }, 500)
  }, [images.length])


  // Función para iniciar el intervalo
  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 5000)
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
  }, [images.length])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div 
      className={`relative w-full h-full ${className}`}
    > 
      <Image
        src={images[currentPhoto]}
        alt={`${altText} ${currentPhoto + 1}`}
        fill
        className={`object-cover transition-opacity duration-500 ease-in-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
} 