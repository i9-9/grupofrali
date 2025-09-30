"use client"

import { useEffect, useMemo, useState, useRef, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useProjects, useCategories } from "@/hooks/useContentful"
import type { ContentfulProject } from "@/lib/contentful"
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

// Función para obtener imagen de desarrollo desde Contentful
const getDesarrollosImage = (project: ContentfulProject, isMobile: boolean = false): string => {
  const imageField = isMobile ? project.fields.desarrolloMobile : project.fields.desarrolloDesktop
  
  if (imageField && imageField.fields && imageField.fields.file) {
    return `https:${imageField.fields.file.url}`
  }
  
  return ''
}

// Componente que usa useSearchParams - debe estar envuelto en Suspense
function DesarrollosProyectosContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t, language } = useLanguage()
  
  // Hooks de Contentful
  const { projects, loading: projectsLoading, error: projectsError } = useProjects()
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
  
  // Crear array de categorías con "VER TODOS" al inicio y orden específico
  const allCategories = [
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
      // Buscar la categoría correspondiente en Contentful
      const category = categories.find(cat => cat.fields.slug === categoryFromUrl)
      if (category) {
        return language === 'en' ? category.fields.nameEn : category.fields.name
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
      const category = categories.find(cat => cat.fields.slug === categoryFromUrl)
      if (category) {
        setSelectedCategory(language === 'en' ? category.fields.nameEn : category.fields.name)
      }
    } else {
      // Si no hay categoría en la URL, establecer "VER TODOS" por defecto
      setSelectedCategory(allCategoryValue)
    }
  }, [language, searchParams, allCategoryValue, categories])

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
    ? projects 
    : projects.filter(project => {
        const projectCategory = language === 'en' ? project.fields.category?.fields?.nameEn : project.fields.category?.fields?.name
        
        // Mapear las traducciones a los nombres de Contentful
        const categoryMapping: Record<string, string[]> = {
          [t("projects.categories.realEstate")]: ['REAL ESTATE', 'Real Estate'],
          [t("projects.categories.agroindustry")]: ['AGROPECUARIA', 'Agroindustry'],
          [t("projects.categories.hospitality")]: ['HOTELERIA', 'Hospitality'],
          [t("projects.categories.renewableEnergy")]: ['ENERGIA RENOVABLE', 'Renewable Energy']
        }
        
        const mappedCategories = categoryMapping[selectedCategory] || [selectedCategory]
        return mappedCategories.includes(projectCategory)
      })


  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    
    // Actualizar la URL con el nuevo filtro
    const params = new URLSearchParams(searchParams.toString())
    if (category === t("projects.categories.all")) {
      params.delete('categoria')
    } else {
      // Mapear las traducciones a los slugs de Contentful
      const categorySlugMapping: Record<string, string> = {
        [t("projects.categories.realEstate")]: 'real-estate',
        [t("projects.categories.agroindustry")]: 'agroindustria',
        [t("projects.categories.hospitality")]: 'hoteleria',
        [t("projects.categories.renewableEnergy")]: 'energia-renovable'
      }
      
      const slug = categorySlugMapping[category]
      if (slug) {
        params.set('categoria', slug)
      }
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/desarrollos-proyectos'
    router.replace(newUrl, { scroll: false })

    setTimeout(() => {
      scrollToProjects()
    }, 100)
  }

  // Estados de loading y error
  if (projectsLoading || categoriesLoading) {
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

  if (projectsError || categoriesError) {
    return (
      <main className="bg-[#EFEFEF]">
        <section className="relative flex items-center pt-16 md:pt-24">
          <div className="content-wrapper relative z-10 w-full">
            <div className="grid">
              <div className="col-6 md:col-6 pt-24 md:pt-0">
                <div className="text-red-600">
                  Error loading projects: {projectsError || categoriesError}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-[#EFEFEF]">
      {/* Hero Section con layout flexbox */}
      <section className="pt-16 md:pt-24">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start">
          {/* Contenido de texto */}
          <div className="w-full lg:w-1/2 pl-4 pr-4 md:pl-6 md:pr-6 flex flex-col justify-between h-[637px]">
            <div className="grid">
              <div className="col-6 md:col-12 pt-24 md:pt-0">
                  <h1 
                    className="font-baskerville font-normal tracking-[0%] text-black lg:pr-6 max-w-[1200px]"
                    style={{
                      fontSize: 'clamp(40px, 3.6vw, 54px)',
                      lineHeight: 'clamp(40px, 4vw, 60px)',
                      letterSpacing: '0%',
                      fontWeight: '400'
                    }}
                    dangerouslySetInnerHTML={{ __html: t('projects.hero.title') }}
                  />
                  <p 
                    className="font-archivo font-normal tracking-[0%] text-black pt-[32px] col-span-6 md:col-span-5 max-w-[600px]"
                    style={{
                      fontSize: 'clamp(16px, 1.2vw, 19.02px)',
                      lineHeight: '110%',
                      letterSpacing: '0%',
                      fontWeight: '400'
                    }}
                  >
                    {t('projects.hero.description')}
                  </p>
                </div>
              </div>
            
              {/* Sección de proyectos - alineada al borde inferior del slider */}
              <div className="pt-6 md:pt-8 mt-8 md:mt-12">
                {/* Mobile layout - título ocupa toda la columna y filtros debajo */}
                <div className="lg:hidden">
                <h2 className="projects-title-mobile">
                  {t('projects.sectionTitle')}
                </h2>
                
                {/* Filtros mobile en dos filas debajo del título */}
                <div className="flex flex-col font-baskerville gap-y-3 mt-4 md:mt-6" >
                  {/* Primera fila: 2 botones */}
                  <div className="flex gap-x-3">
                    {allCategories.slice(0, 2).map((category) => (
                      <h4 
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`flex justify-center filter-item items-center rounded-[5px] text-center px-3 py-2 cursor-pointer projects-filters-mobile ${
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
                    {allCategories.slice(2).map((category) => (
                      <h4 
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`flex justify-center filter-item items-center rounded-[5px] text-center px-3 py-2 cursor-pointer projects-filters-mobile ${
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
              
              {/* Desktop layout - usando flexbox para mitad y mitad */}
              <div className="hidden lg:block">
                <div className="flex">
                  <div className="w-1/2">
                    <h2 className="projects-title-desktop">
                      {t('projects.sectionTitle')}
                    </h2>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col projects-filters-desktop gap-y-1">
                      {allCategories.map((category) => (
                        <h4 
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`filter-item cursor-pointer whitespace-nowrap ${selectedCategory === category ? 'active' : 'inactive'}`}
                        >
                          {category}
                        </h4>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AutoSlider - oculto en mobile y tablet */}
          <div className="hidden lg:block w-full lg:w-1/2">
            <div className="w-full h-[637px] relative">
              <AutoSlider 
                images={photos}
                altText="Desarrollo"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="max-w-[1600px] mx-auto pl-4 pr-4 md:pl-6 md:pr-6 pb-16">
        <div className="grid gap-2 md:gap-[10px] mt-16 md:mt-20">
          {filteredProjects.map((project) => {
            const desktopImage = getDesarrollosImage(project, false)
            const mobileImage = getDesarrollosImage(project, true)
            const title = language === 'en' ? project.fields.titleEn : project.fields.title
            
            return (
            <Link 
              key={project.sys.id}
              href={`/desarrollos-proyectos/${project.fields.slug}`} 
              className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out pt-4 "
            >
              {desktopImage && mobileImage ? (
                <ResponsiveImage 
                  desktopImage={desktopImage}
                  mobileImage={mobileImage}
                  alt={title} 
                />
              ) : (
                <div className="w-full pb-[22px] border-b border-black">
                  <div className="w-full overflow-hidden aspect-[16/9] md:aspect-[347/355]">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image available</span>
                    </div>
                  </div>
                </div>
              )}
              <h3 className="font-baskerville text-right md:text-left pb-5 md:pb-0 mt-4 leading-none" style={{ fontSize: 'clamp(16px, 1.5vw, 24px)', maxWidth: '70%' }}>
                {title}
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