"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import projectsData from "@/data/projects.json"
import AutoSlider from "@/components/AutoSlider"

function ResponsiveImage({ 
  desktopImage, 
  mobileImage, 
  alt, 
  className = ""
}: {
  desktopImage: string
  mobileImage: string
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

  const imageSrc = isMobile ? mobileImage : desktopImage

  return (
    <Image 
      src={imageSrc} 
      alt={alt}
      width={300}
      height={200}
      className={className}
    />
  )
}

interface ProjectImage {
  desarrollos_mobile?: string
  desarrollos_desktop?: string
  alt?: string
}

interface Project {
  id: string
  titulo: string
  categoria: string
  imagenes?: ProjectImage
}

// Función para obtener imagen de desarrollo desde JSON
const getDesarrollosImage = (project: Project, isMobile: boolean = false): string => {
  const baseKey = isMobile ? 'desarrollos_mobile' : 'desarrollos_desktop'
  
  // Retornar la imagen desde el JSON
  return project.imagenes?.[baseKey] || ''
}

const categories = [
  "VER TODOS",
  "ENERGIA RENOVABLE", 
  "REAL ESTATE",
  "AGROPECUARIA",
  "HOTELERIA"
]

export default function DesarrollosProyectos() {
const [selectedCategory, setSelectedCategory] = useState("VER TODOS")
const projectsRef = useRef<HTMLElement>(null)

const scrollToProjects = () => {
  if (projectsRef.current) {
    projectsRef.current.scrollIntoView({
      behavior: 'smooth', 
      block:'start'
    })
  }
}

const photos = useMemo(() => [
  "/images/desarrollos/1.jpg",
  "/images/desarrollos/2.jpg",
  "/images/desarrollos/3.jpg",
  "/images/desarrollos/4.jpg",
], [])

const filteredProjects = selectedCategory === "VER TODOS" 
  ? projectsData.proyectos 
  : projectsData.proyectos.filter(project => project.categoria === selectedCategory)

const handleCategoryChange = (category: string) => {
  setSelectedCategory(category)

  setTimeout(() => {
    scrollToProjects()
  }, 100)
}

  return (
    <main className="bg-[#EFEFEF]">
      {/* Hero Section con layout híbrido */}
      <section className="relative flex items-center pt-16 md:pt-24">
        {/* Contenido de texto usando content-wrapper */}
        <div className="content-wrapper relative z-10 w-full">
          <div className="grid">
            <div className="col-6 md:col-6 pt-24 md:pt-0">
              <h1 className="text-h1-baskerville text-black lg:pr-6">
                DIVERSIFICACIÓN ESTRATÉGICA, <br/> VISIÓN A LARGO PLAZO
              </h1>
              <p className="md:text-[19px] text-black pt-[22px] tracking-[0.01em] max-w-[650px] leading-tight">
                En Grupo Frali desarrollamos y gestionamos proyectos en sectores estratégicos, combinando experiencia, innovación y compromiso. Con una estrategia basada en la diversificación de inversiones en distintos mercados y segmentos de negocio, y con presencia en Argentina, Estados Unidos y Uruguay, apostamos a una evolución constante, abiertos a nuevas oportunidades que integren infraestructura, naturaleza, calidad de vida y eficiencia productiva.
              </p>
            </div>
          </div>
        </div>
        
        {/* AutoSlider que se extiende hasta el borde derecho y centrado verticalmente */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 items-center z-0 pt-16">
          <div className="w-full h-[500px]">
            <AutoSlider 
              images={photos}
              altText="Desarrollo"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Sección de proyectos - con alineación corregida */}
      <div className="content-wrapper">
        <div className="grid pt-6 md:pt-8 mt-8 md:mt-12">
          {/* Mobile layout - título ocupa toda la columna y filtros debajo */}
          <div className="md:hidden col-6">
            <h2 className="font-baskerville leading-7">PROYECTOS</h2>
            
            {/* Filtros mobile en dos filas debajo del título */}
            <div className="flex flex-col font-baskerville gap-y-3 mt-4 md:mt-6" style={{ fontSize: 'clamp(18px, 4vw, 22px)' }}>
              {/* Primera fila: 2 botones */}
              <div className="flex gap-x-3">
                {categories.slice(0, 2).map((category) => (
                  <h4 
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex justify-center filter-item items-center rounded-[5px] text-center px-3 py-2 flex-1 text-xs cursor-pointer ${
                      selectedCategory === category 
                        ? 'bg-black text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {category}
                  </h4>
                ))}
              </div>
              
              {/* Segunda fila: 3 botones */}
              <div className="flex gap-x-3">
                {categories.slice(2).map((category) => (
                  <h4 
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex justify-center filter-item items-center rounded-[5px] text-center px-3 py-2 flex-1 text-xs cursor-pointer ${
                      selectedCategory === category 
                        ? 'bg-black text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {category}
                  </h4>
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop layout - usando columnas separadas */}
          <div className="hidden md:block md:col-start-1 md:col-span-3">
            <h2 className="text-small-baskerville">PROYECTOS</h2>
          </div>
          <div className="hidden md:block md:col-start-4 md:col-span-4">
            <div className="flex flex-col font-baskerville gap-y-1 leading-7" style={{ fontSize: 'clamp(22px, 1.8vw, 26px)' }}>
              {categories.map((category) => (
                <h4 
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`filter-item cursor-pointer ${selectedCategory === category ? 'active' : 'inactive'}`}
                >
                  {category}
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section ref={projectsRef} className="content-wrapper pb-16">
        <div className="grid gap-2 md:gap-[10px] mt-16 md:mt-40">
          {filteredProjects.map((project) => {
            const desktopImage = getDesarrollosImage(project, false)
            const mobileImage = getDesarrollosImage(project, true)
            
            if (!desktopImage || !mobileImage) return null
            
            return (
            <Link 
              key={project.id}
              href={`/desarrollos-proyectos/${project.id}`} 
              className="col-6  md:col-4 lg:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out pt-4 "
            >
              <ResponsiveImage 
                desktopImage={desktopImage}
                mobileImage={mobileImage}
                className="w-full h-[250px] md:h-[356px] object-cover pb-[22px] border-b border-black" 
                alt={project.imagenes?.alt || project.titulo} 
              />
              <h3 className="font-baskerville text-base text-right md:text-left pb-5 md:pb-0 md:text-[24.5px] mt-4 leading-none">
                {project.titulo}
              </h3>
            </Link>
            )
          })}
        </div>
      </section>

    </main>
  );
}