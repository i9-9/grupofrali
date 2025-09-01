"use client"

import { useEffect, useMemo, useState, useRef, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import projectsData from "@/data/projects.json"
import AutoSlider from "@/components/AutoSlider"
import { useLanguage } from "@/contexts/LanguageContext"

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

// Componente que usa useSearchParams - debe estar envuelto en Suspense
function DesarrollosProyectosContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t, language } = useLanguage()
  
  const categories = [
    t("projects.categories.all"),
    t("projects.categories.renewableEnergy"), 
    t("projects.categories.realEstate"),
    t("projects.categories.agroindustry"),
    t("projects.categories.hospitality")
  ]

  // Obtener el filtro de la URL, por defecto "VER TODOS"
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const categoryFromUrl = searchParams.get('categoria')
    if (categoryFromUrl) {
      // Buscar la categoría correspondiente en el idioma actual
      const project = projectsData.proyectos.find(p => p.categoria === categoryFromUrl)
      if (project) {
        return language === 'en' ? project.category_en : project.categoria
      }
    }
    return t("projects.categories.all")
  })
  
  const projectsRef = useRef<HTMLElement>(null)

  // Valor estable para la categoría "VER TODOS"
  const allCategoryValue = useMemo(() => t("projects.categories.all"), [t])

  // Efecto para actualizar selectedCategory cuando cambie el idioma
  useEffect(() => {
    const categoryFromUrl = searchParams.get('categoria')
    if (categoryFromUrl) {
      const project = projectsData.proyectos.find(p => p.categoria === categoryFromUrl)
      if (project) {
        setSelectedCategory(language === 'en' ? project.category_en : project.categoria)
      }
    } else {
      // Si no hay categoría en la URL, establecer "VER TODOS" por defecto
      setSelectedCategory(allCategoryValue)
    }
  }, [language, searchParams, allCategoryValue])

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

  const filteredProjects = selectedCategory === t("projects.categories.all")
    ? projectsData.proyectos 
    : projectsData.proyectos.filter(project => {
        const projectCategory = language === 'en' ? project.category_en : project.categoria
        return projectCategory === selectedCategory
      })

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    
    // Actualizar la URL con el nuevo filtro
    const params = new URLSearchParams(searchParams.toString())
    if (category === t("projects.categories.all")) {
      params.delete('categoria')
    } else {
      // Buscar la categoría correspondiente en español para la URL
      const spanishCategory = projectsData.proyectos.find(project => {
        const projectCategory = language === 'en' ? project.category_en : project.categoria
        return projectCategory === category
      })?.categoria || category
      
      params.set('categoria', spanishCategory)
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
              <h1 
                className="text-h1-baskerville text-black lg:pr-6"
                dangerouslySetInnerHTML={{ __html: t('projects.hero.title') }}
              />
              <p className="md:text-[19px] text-black pt-[22px] tracking-[0.01em] max-w-[650px] leading-tight">
                {t('projects.hero.description')}
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
            <h2 className="font-baskerville leading-7 text-[1.5rem]">{t('projects.sectionTitle')}</h2>
            
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
            <h2 className="text-small-baskerville">{t('projects.sectionTitle')}</h2>
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
                alt={project.imagenes?.alt || (language === 'en' ? project.title_en : project.titulo)} 
              />
              <h3 className="font-baskerville text-base text-right md:text-left pb-5 md:pb-0 md:text-2xl mt-4 leading-none">
                {language === 'en' ? project.title_en : project.titulo}
              </h3>
            </Link>
            )
          })}
        </div>
      </section>

    </main>
  )
}

function LoadingFallback() {
  return (
    <main className="bg-[#EFEFEF]">
      <section className="relative flex items-center pt-16 md:pt-24">
        <div className="content-wrapper relative z-10 w-full">
          <div className="grid">
            <div className="col-6 md:col-6 pt-24 md:pt-0">
              <div className="animate-pulse">
                <div className="h-16 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function DesarrollosProyectos() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DesarrollosProyectosContent />
    </Suspense>
  )
}