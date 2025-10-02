"use client";

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from '@/hooks/useTranslations'
import type { ContentfulProject } from '@/lib/contentful'

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
  
  // Si no se pasan proyectos como props, mostrar loading
  const loading = !homeGalleryProjects
  const error = null

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320, // 280px card + 24px gap + 16px extra
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320, // 280px card + 24px gap + 16px extra
        behavior: 'smooth'
      })
    }
  }

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

  const displayProjects = showAll ? homeGalleryProjects : homeGalleryProjects.slice(0, maxProjects)

  return (
    <div className="relative w-full">
      <div ref={scrollContainerRef} className="w-full overflow-x-auto scrollbar-hidden">
        <div className="flex space-x-6 pb-4 md:pb-8">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.sys.id} project={project} language={language} index={index} />
          ))}
        </div>
      </div>
      
      {/* Navigation arrows */}
      <div className="flex justify-between items-center mt-4 mb-10">
        <button
          onClick={scrollLeft}
          className="flex items-center justify-center w-6 h-6 hover:opacity-70 transition-opacity duration-200"
          aria-label="Scroll left"
        >
          <Image
            src="/images/icons/LEFT_ARROW.svg"
            alt="Previous"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
        
        <button
          onClick={scrollRight}
          className="flex items-center justify-center w-6 h-6 hover:opacity-70 transition-opacity duration-200"
          aria-label="Scroll right"
        >
          <Image
            src="/images/icons/RIGHT_ARROW.svg"
            alt="Next"
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

function ProjectCard({ project, language, index }: ProjectCardProps) {
  const title = language === 'en' ? project.fields.titleEn : project.fields.title
  
  // Obtener imagen principal para la galería del home
  const mainImage = project.fields.imagenHome

  const renderTitle = (titulo: string) => {
    const lines = titulo.split('\n');
    if (lines.length === 1) {
      return titulo;
    }
    return (
      <>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex}>
            {line}
            {lineIndex < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </>
    );
  };

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
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      <div className="border-t border-black pt-6 pb-4">
        <div className="flex items-center w-full">
          {/* Número a la izquierda */}
          <h3 className="font-light mr-4">(0{index + 1})</h3>

          {/* Contenedor que empuja el título al borde derecho */}
          <div className="flex-1 flex justify-end">
            <h3 
              className="font-baskerville text-black leading-tight text-right inline-block whitespace-pre-line"
              style={{
                fontSize: 'clamp(16px, 1.46vw, 22.11px)', /* Mobile: 16px (w393 base), Desktop: 22.11px (w1512 base) */
                lineHeight: '100%',
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
}
