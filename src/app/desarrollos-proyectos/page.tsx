"use client"

import {useEffect, useState} from "react"
import Link from "next/link"

// Componente para imagen responsive
function ResponsiveImage({ 
  projectName, 
  desktopImage, 
  mobileImage, 
  alt, 
  className = ""
}: {
  projectName: string
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

export default function DesarrollosProyectos() {
const [currentPhoto, setCurrentPhoto] = useState(0)
const [isFading, setIsFading] = useState(false)

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
                  <h4>VER TODOS</h4>
                  <h4>ENERGÍA RENOVABLE</h4>
                  <h4>REAL ESTATE</h4>
                  <h4>AGROPECUARIA</h4>
                  <h4>HOTELERÍA</h4>
                </div>
              </div>
          </div>
      </div>

      <section className="content-wrapper py-16">
        <div className="grid">
          {/* Fila 1 */}
          <Link href="/desarrollos-proyectos/la-banderita-parque-eolico" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/la-banderita-parque-eolico/desarrollos/desktop/labanderita.jpg" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="PARQUE EOLICO LA BANDERITA" 
            />
            <h3 className="font-baskerville text-lg mt-4">PARQUE EOLICO LA BANDERITA</h3>
          </Link>
          <Link href="/desarrollos-proyectos/septiembre" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/septiembre/desarrollos/desktop/septiembre.jpg" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="SEPTIEMBRE" 
            />
            <h3 className="font-baskerville text-lg mt-4">SEPTIEMBRE</h3>
          </Link>
          <Link href="/desarrollos-proyectos/la-reserva-cardales" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/la-reserva-cardales/desarrollos/desktop/la-reserva.jpg" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="LA RESERVA CARDALES" 
            />
            <h3 className="font-baskerville text-lg mt-4">LA RESERVA CARDALES</h3>
          </Link>
          <Link href="/desarrollos-proyectos/sofitel" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/sofitel/desarrollos/desktop/sofitel.jpg" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="SOFITEL LA RESERVA CARDALES" 
            />
            <h3 className="font-baskerville text-lg mt-4">SOFITEL LA RESERVA CARDALES</h3>
          </Link>
          
          {/* Fila 2 */}
          <Link href="/desarrollos-proyectos/terrazas-de-septiembre" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/terrazas-de-septiembre/desarrollos/desktop/terrazas.jpg" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="TERRAZAS DE SEPTIEMBRE" 
            />
            <h3 className="font-baskerville text-lg mt-4">TERRAZAS DE SEPTIEMBRE</h3>
          </Link>
          <Link href="/desarrollos-proyectos/casas-de-septiembre" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/casas-de-septiembre/desarrollos/desktop/casas.png" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="CASAS DE SEPTIEMBRE" 
            />
            <h3 className="font-baskerville text-lg mt-4">CASAS DE SEPTIEMBRE</h3>
          </Link>
          <Link href="/desarrollos-proyectos/green-house" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/green-house/desarrollos/desktop/green-house.jpg" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="GREEN HOUSE" 
            />
            <h3 className="font-baskerville text-lg mt-4">GREEN HOUSE</h3>
          </Link>
          <Link href="/desarrollos-proyectos/chacras-de-mar" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/chacras-de-mar/desarrollos/desktop/chacras.jpg" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="CHACRAS DE MAR" 
            />
            <h3 className="font-baskerville text-lg mt-4">CHACRAS DE MAR</h3>
          </Link>
          
          {/* Fila 3 */}
          <Link href="/desarrollos-proyectos/edgewater-river" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/edgewater-river/desarrollos/desktop/edgewater.png" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="EDGEWATER RIVER" 
            />
            <h3 className="font-baskerville text-lg mt-4">EDGEWATER RIVER</h3>
          </Link>
          <Link href="/desarrollos-proyectos/santa-regina" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/santa-regina/desarrollos/desktop/santa-regina.jpg" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="SANTA REGINA" 
            />
            <h3 className="font-baskerville text-lg mt-4">SANTA REGINA</h3>
          </Link>
          <Link href="/desarrollos-proyectos/elvis-river-sunflower-river" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/elvis-river-sunflower-river/desarrollos/desktop/elvis.jpg" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="ELVIS RIVER & SUNFLOWER RIVER" 
            />
            <h3 className="font-baskerville text-lg mt-4">ELVIS RIVER & SUNFLOWER RIVER</h3>
          </Link>
          <Link href="/desarrollos-proyectos/la-villette-golf-residences" className="col-6 md:col-3 block hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src="/images/projects/la-villette-golf-residences/desarrollos/desktop/la-villete.jpg" 
              className="w-[362px] h-[197px] md:w-full md:h-[356px] object-cover pb-[22px] border-b border-black" 
              alt="LA VILLETTE GOLF RESIDENCES" 
            />
            <h3 className="font-baskerville text-lg mt-4">LA VILLETTE GOLF RESIDENCES</h3>
          </Link>
        </div>
      </section>

    </main>
  );
}