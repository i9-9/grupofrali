"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import projectsData from "@/data/projects.json"

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
    <img 
      src={imageSrc} 
      className={className}
      alt={alt} 
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
const [currentPhoto, setCurrentPhoto] = useState(0)
const [isFading, setIsFading] = useState(false)
const [selectedCategory, setSelectedCategory] = useState("VER TODOS")

const photos = [
  "/images/desarrollos/1.jpg",
  "/images/desarrollos/2.jpg",
  "/images/desarrollos/3.jpg",
  "/images/desarrollos/4.jpg",
] 

useEffect(() => {
  const interval = setInterval(() => {
    setIsFading(true)

    setTimeout(() => {
      setCurrentPhoto((prevIndex) => (prevIndex + 1) % photos.length)
      setIsFading(false)
    }, 300) // Increased from 100ms to 300ms for smoother transition
  }, 4000)

  return () => clearInterval(interval)
}, [])

const filteredProjects = selectedCategory === "VER TODOS" 
  ? projectsData.proyectos 
  : projectsData.proyectos.filter(project => project.categoria === selectedCategory)

const handleCategoryChange = (category: string) => {
  setSelectedCategory(category)
}

  return (
    <main className="bg-[#EFEFEF]">
      <div className="content-wrapper h-screen">
        <div className="grid">
          <div className="col-6 md:col-6 pt-36 md:pt-24">
            <h1 className="font-baskerville text-black lg:pr-12" style={{ fontSize: 'clamp(36px, 3.2vw, 54px)', lineHeight: 'clamp(40px, 3.6vw, 68px)' }}>
              DIVERSIFICACIÓN ESTRATÉGICA, <br/> VISIÓN A LARGO PLAZO</h1>
              <p className="text-black pt-[22px] tracking-[0.01em] max-w-[600px] leading-[1]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
              En Grupo Frali desarrollamos y gestionamos proyectos en sectores estratégicos, combinando experiencia, innovación y compromiso. Con una estrategia basada en la diversificación de inversiones en distintos mercados y segmentos de negocio, y con presencia en Argentina, Estados Unidos y Uruguay, apostamos a una evolución constante, abiertos a nuevas oportunidades que integren infraestructura, naturaleza, calidad de vida y eficiencia productiva.
              </p>
          </div>
          <div className="hidden md:block absolute top-0 right-0 md:w-[50%] w-full h-full z-0 md:pt-24"> {/* Slightly smaller width with gap */}
            <img
              src={photos[currentPhoto]}
              alt={`Slide ${currentPhoto}`}
              className={`w-full h-auto object-cover transition-opacity duration-300 ease-in-out ${
                isFading ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
        </div>
        <div className="grid pt-16 grid-cols-12">
          {/* Mobile layout - título ocupa toda la columna y filtros debajo */}
          <div className="md:hidden col-6">
            <h2 className="font-baskerville leading-7" style={{ fontSize: 'clamp(26px, 2.2vw, 32px)' }}>PROYECTOS</h2>
            
            {/* Filtros mobile en dos filas debajo del título */}
            <div className="flex flex-col font-baskerville gap-y-3 mt-6" style={{ fontSize: 'clamp(18px, 4vw, 22px)' }}>
              {/* Primera fila: 2 botones */}
              <div className="flex gap-x-3">
                {categories.slice(0, 2).map((category) => (
                  <h4 
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex justify-center filter-item items-center rounded-[5px] text-center px-3 py-2 flex-1 text-xs ${
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
                    className={`flex justify-center filter-item items-center rounded-[5px] text-center px-3 py-2 flex-1 text-xs ${
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
          
          {/* Desktop layout - estructura original */}
          <div className="hidden md:block md:col-start-1 md:col-span-3">
            <h2 className="font-baskerville leading-7" style={{ fontSize: 'clamp(26px, 2.2vw, 32px)' }}>PROYECTOS</h2>
          </div>
          <div className="hidden md:block md:col-start-3 md:col-span-3">
            <div className="flex flex-col font-baskerville gap-y-1 leading-7" style={{ fontSize: 'clamp(22px, 1.8vw, 26px)' }}>
              {categories.map((category) => (
                <h4 
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`filter-item ${selectedCategory === category ? 'active' : 'inactive'}`}
                >
                  {category}
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="content-wrapper pb-16 pt-5">
        <div className="grid gap-4 md:gap-[21px]">
          {filteredProjects.map((project) => {
            const desktopImage = getDesarrollosImage(project, false)
            const mobileImage = getDesarrollosImage(project, true)
            
            if (!desktopImage || !mobileImage) return null
            
            return (
            <Link 
              key={project.id}
              href={`/desarrollos-proyectos/${project.id}`} 
              className="col-6 md:col-4 lg:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out"
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
