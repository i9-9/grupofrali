"use client";

import React, { useRef, useEffect, useState, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from '@/hooks/useTranslations'
import type { ContentfulProject } from '@/lib/contentful'
import { renderTitle } from "@/lib/titleUtils"

interface ContentfulProjectsProps {
  className?: string
  maxProjects?: number
  showAll?: boolean
  homeGalleryProjects?: ContentfulProject[]
}

export default function ContentfulProjects({ 
  className = '', 
  maxProjects = 6, 
  showAll = false,
  homeGalleryProjects
}: ContentfulProjectsProps) {
  const { language } = useTranslations()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Si no se pasan proyectos como props, mostrar loading
  const loading = !homeGalleryProjects
  const error = null

  // Crear array infinito duplicando los proyectos
  const createInfiniteProjects = (projects: ContentfulProject[]) => {
    if (!projects || projects.length === 0) return []
    
    const displayProjects = showAll ? projects : projects.slice(0, maxProjects)
    // Crear más copias para scroll verdaderamente infinito
    return [
      ...displayProjects, // Copia 1
      ...displayProjects, // Copia 2 (posición inicial)
      ...displayProjects, // Copia 3
      ...displayProjects, // Copia 4
      ...displayProjects  // Copia 5
    ]
  }

  const infiniteProjects = homeGalleryProjects ? createInfiniteProjects(homeGalleryProjects) : []
  const originalLength = homeGalleryProjects ? (showAll ? homeGalleryProjects.length : Math.min(maxProjects, homeGalleryProjects.length)) : 0

  // Scroll infinito hacia la derecha
  const scrollRight = () => {
    if (scrollContainerRef.current && !isTransitioning) {
      const container = scrollContainerRef.current
      const cardWidth = 320 // 280px card + 24px gap + 16px extra
      
      container.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      })
    }
  }

  // Scroll infinito hacia la izquierda
  const scrollLeft = () => {
    if (scrollContainerRef.current && !isTransitioning) {
      const container = scrollContainerRef.current
      const cardWidth = 320 // 280px card + 24px gap + 16px extra
      
      container.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      })
    }
  }

  // Inicializar posición en el primer proyecto
  useEffect(() => {
    if (scrollContainerRef.current && infiniteProjects.length > 0) {
      const container = scrollContainerRef.current
      // Empezar con el primer proyecto (primera copia)
      container.scrollTo({
        left: 0,
        behavior: 'auto'
      })
    }
  }, [infiniteProjects.length, originalLength])

  // Listener para scroll suave infinito
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      if (isTransitioning) return
      
      const cardWidth = 320
      const scrollLeft = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth
      
      // Reset cuando llegamos al final (copia 5) - volver a la copia 2
      if (scrollLeft >= maxScroll - cardWidth) {
        setIsTransitioning(true)
        container.scrollTo({
          left: originalLength * cardWidth,
          behavior: 'auto'
        })
        setTimeout(() => setIsTransitioning(false), 50)
      }
      // Reset cuando llegamos al inicio (copia 1) - volver a la copia 2
      else if (scrollLeft <= cardWidth) {
        setIsTransitioning(true)
        container.scrollTo({
          left: originalLength * cardWidth,
          behavior: 'auto'
        })
        setTimeout(() => setIsTransitioning(false), 50)
      }
    }

    // Usar requestAnimationFrame para mejor performance
    let ticking = false
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    container.addEventListener('scroll', optimizedScrollHandler, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', optimizedScrollHandler)
    }
  }, [isTransitioning, originalLength])

  if (loading) {
    return (
      <div className={`${className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className} text-center text-red-600`}>
        Error loading projects: {error}
      </div>
    )
  }

  if (!homeGalleryProjects || homeGalleryProjects.length === 0) {
    return (
      <div className={`${className} text-center text-gray-600`}>
        No projects available
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <div ref={scrollContainerRef} className="w-full overflow-x-auto scrollbar-hidden" style={{ margin: 0, padding: 0 }}>
        <div className="flex space-x-6 pb-4 md:pb-8" style={{ margin: 0 }}>
          {infiniteProjects.map((project, index) => {
            // Calcular el índice real para la numeración (0, 1, 2, etc.)
            const realIndex = index % originalLength
            return (
              <ProjectCard 
                key={`${project.sys.id}-${index}`} 
                project={project} 
                language={language} 
                index={realIndex} 
              />
            )
          })}
        </div>
      </div>
      
      {/* Navigation arrows */}
      <div className="flex justify-between items-center mt-4 mb-10">
        <button
          onClick={scrollLeft}
          disabled={isTransitioning}
          className={`flex items-center justify-center w-12 h-12 transition-opacity duration-200 ${
            isTransitioning 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:opacity-70 cursor-pointer'
          }`}
          aria-label="Ver proyectos anteriores"
        >
          <Image
            src="/images/icons/LEFT_ARROW.svg"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
        
        <button
          onClick={scrollRight}
          disabled={isTransitioning}
          className={`flex items-center justify-center w-12 h-12 transition-opacity duration-200 ${
            isTransitioning 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:opacity-70 cursor-pointer'
          }`}
          aria-label="Ver proyectos siguientes"
        >
          <Image
            src="/images/icons/RIGHT_ARROW.svg"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  project: ContentfulProject
  language: string
  index: number
}

const ProjectCard = memo(function ProjectCard({ project, language, index }: ProjectCardProps) {
  const title = language === 'en' ? project.fields.titleEn : project.fields.title

  // Obtener imagen principal para la galería del home
  const mainImage = project.fields.imagenHome

  return (
    <Link
      key={project.sys.id}
      href={`/desarrollos-proyectos/${project.fields.slug}`}
      className="group w-[280px] md:w-[343px] flex-shrink-0 cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
    >
      <div className="relative overflow-hidden aspect-[343/350] mb-4">
        <Image
          src={mainImage ? `https:${mainImage.fields.file.url}` : ''}
          alt={mainImage?.fields?.title || title}
          width={343}
          height={350}
          quality={85}
          loading={index < 3 ? "eager" : "lazy"}
          priority={index < 3}
          sizes="(max-width: 768px) 280px, 343px"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      <div className="border-t border-black pt-6 pb-4">
        <div className="flex items-baseline w-full">
          {/* Número a la izquierda - alineado con la primera línea */}
          <h3 className="font-light mr-4 leading-[1.1]">(0{index + 1})</h3>

          {/* Contenedor que empuja el título al borde derecho */}
          <div className="flex-1 flex justify-end">
            <h3 
              className="font-baskerville text-black text-left inline-block whitespace-pre-line"
              style={{
                fontSize: 'clamp(16px, 1.46vw, 22.11px)', /* Mobile: 16px (w393 base), Desktop: 22.11px (w1512 base) */
                lineHeight: '1.1',
                letterSpacing: '0%',
                fontWeight: '400'
              }}
            >
              {renderTitle(title)}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  )
})
