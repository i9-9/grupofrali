"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import projectsData from "@/data/projects.json"

// Componente para imagen responsive
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

// Función para obtener imagen de desarrollo desde el JSON
const getDesarrollosImage = (project: { imagenes?: { desarrollos_mobile?: string, desarrollos_desktop?: string } }, isMobile: boolean = false) => {
  const baseKey = isMobile ? 'desarrollos_mobile' : 'desarrollos_desktop'
  
  // Retornar la imagen desde el JSON si existe
  if (project.imagenes && project.imagenes[baseKey]) {
    return project.imagenes[baseKey]
  }
  
  // Si no existe, retornar string vacío
  return ''
}

// Categorías disponibles
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

// Filtrar proyectos según la categoría seleccionada
const filteredProjects = selectedCategory === "VER TODOS" 
  ? projectsData.proyectos 
  : projectsData.proyectos.filter(project => project.categoria === selectedCategory)

// Función para manejar el cambio de filtro
const handleCategoryChange = (category: string) => {
  setSelectedCategory(category)
}

  return (
    <main className="bg-[#EFEFEF]">
      <div className="content-wrapper h-screen">
        <div className="grid">
          <div className="col-1 md:col-6 pt-36 md:pt-24">
            <h1 className="font-baskerville text-[40px] leading-[40px] md:text-[60px] md:leading-[64px] lg:text-[54px] lg:leading-[68px] text-black lg:pr-12">
              DIVERSIFICACIÓN ESTRATÉGICA, <br/> VISIÓN A LARGO PLAZO</h1>
              <p className="text-[19px] text-black pt-[22px] tracking-[0.01em] max-w-[600px] leading-[1]">
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
              <div className="md:col-start-1 md:col-span-3">
                <h2 className="font-baskerville text-[28px] leading-7">PROYECTOS</h2>
              </div>
              <div className="md:col-start-3 md:col-span-3">
                <div className="flex flex-col font-baskerville text-[26px] gap-y-1 leading-7">
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

      <section className="content-wrapper py-16">
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
              <h3 className="font-baskerville text-base md:text-[24.5px] mt-4 leading-none">
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