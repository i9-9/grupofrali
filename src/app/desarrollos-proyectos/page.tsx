"use client"

import { useEffect, useMemo, useState, useRef, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import projectsData from "@/data/projects.json"
import AutoSlider from "@/components/AutoSlider"

function ResponsiveImage({ 
  desktopImage, 
  mobileImage, 
  alt
}: {
  desktopImage: string
  mobileImage: string
  alt: string
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
    <div className="w-full pb-[22px] border-b border-black">
      {/* Desktop: siempre el mismo aspect ratio */}
      {/* Mobile: aspect ratio diferente para el layout mobile */}
      <div 
        className="w-full overflow-hidden"
        style={{ aspectRatio: isMobile ? '16/9' : '347/355' }}
      >
        <Image 
          src={imageSrc} 
          alt={alt}
          width={isMobile ? 400 : 400}
          height={isMobile ? 225 : 400}
          quality={100}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
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

// Componente que usa useSearchParams - debe estar envuelto en Suspense
function DesarrollosProyectosContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Obtener el filtro de la URL, por defecto "VER TODOS"
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const categoryFromUrl = searchParams.get('categoria')
    return categoryFromUrl && categories.includes(categoryFromUrl) ? categoryFromUrl : "VER TODOS"
  })
  
  const projectsRef = useRef<HTMLElement>(null)

  // Efecto para hacer scroll a los proyectos cuando venimos de vuelta de un proyecto individual
  useEffect(() => {
    const shouldScrollToProjects = searchParams.get('scrollTo') === 'projects'
    if (shouldScrollToProjects && projectsRef.current) {
      // Remover el parámetro scrollTo de la URL
      const params = new URLSearchParams(searchParams.toString())
      params.delete('scrollTo')
      const newUrl = params.toString() ? `?${params.toString()}` : '/desarrollos-proyectos'
      router.replace(newUrl, { scroll: false })
      
      // Hacer scroll a la sección de proyectos
      setTimeout(() => {
        projectsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    }
  }, [searchParams, router])

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
    
    // Actualizar la URL con el nuevo filtro
    const params = new URLSearchParams(searchParams.toString())
    if (category === "VER TODOS") {
      params.delete('categoria')
    } else {
      params.set('categoria', category)
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/desarrollos-proyectos'
    router.replace(newUrl, { scroll: false })

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
            <h2 className="font-baskerville leading-7 text-[1.5rem]">PROYECTOS</h2>
            
            {/* Filtros mobile en dos filas debajo del título */}
            <div className="flex flex-col font-baskerville gap-y-3 mt-4 md:mt-6" >
              {/* Primera fila: 2 botones */}
              <div className="flex gap-x-3">
                {categories.slice(0, 2).map((category) => (
                  <h4 
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex justify-center filter-item items-center rounded-[5px] text-center px-3 py-2 text-[0.75rem] cursor-pointer ${
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
                    className={`flex justify-center filter-item items-center rounded-[5px] text-center px-3 py-2 text-[0.75rem] cursor-pointer ${
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
              className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out pt-4 "
            >
              <ResponsiveImage 
                desktopImage={desktopImage}
                mobileImage={mobileImage}
                alt={project.imagenes?.alt || project.titulo} 
              />
              <h3 className="font-baskerville text-base text-right md:text-left pb-5 md:pb-0 md:text-2xl mt-4 leading-none">
                {project.titulo}
              </h3>
            </Link>
            )
          })}
        </div>
      </section>

    </main>
  )
}

export default function DesarrollosProyectos() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#EFEFEF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black">Cargando proyectos...</p>
        </div>
      </div>
    }>
      <DesarrollosProyectosContent />
    </Suspense>
  )
}