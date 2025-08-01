"use client"


import RandomVideo from "@/components/RandomVideo"
import ProjectGallery from "@/components/ProjectGallery"
import Link from "next/link"

export default function Home() {

  return (
    <main>
      {/* Video Hero */}
      <section className="relative h-screen overflow-hidden">
        <RandomVideo type="mobile" />
        <RandomVideo type="desktop" />
        {/* Content over video */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
          </div>
        </div>
      </section>

      {/* Desarrollo */}
      <section className="py-16 bg-white min-h-screen lg:h-screen">
        <div className="content-wrapper">
          <div className="grid">
            {/* TÍTULO - 6 columnas */}
            <div className="col-6 md:col-6">
              {/* Mobile */}
              <h2 className="md:hidden font-baskerville text-5xl text-black mb-8">
                IMPULSAMOS EL<br />
                DESARROLLO<br />
                CON VISIÓN<br />
                ESTRATÉGICA<br />
              </h2>
              
              {/* Desktop */}
              <h2 className="hidden md:block font-baskerville text-5xl text-black mb-8">
                <span className="whitespace-nowrap mb-1">IMPULSAMOS EL DESARROLLO</span><br />
                <span className="whitespace-nowrap">CON VISIÓN ESTRATÉGICA</span>
              </h2>
            </div>

            {/* CONCEPTOS - arriba de stats izquierdas (columnas 1-5) */}
            <div className="col-6 md:col-1-to-5 flex flex-col order-2 md:order-1">
              <div className="flex justify-between pb-8 items-center mt-auto">
                <h3 className="font-baskerville text-xs text-black uppercase tracking-wider">
                  VISIÓN DE FUTURO
                </h3>
                <h3 className="font-baskerville text-xs text-black uppercase tracking-wider">
                  INNOVACIÓN
                </h3>
                <h3 className="font-baskerville text-xs text-black uppercase tracking-wider">
                  SOLIDEZ
                </h3>
              </div>
            </div>

            {/* PÁRRAFO - arriba de stats derechas (columnas 8-12) */}
            <div className="col-6 md:col-8-to-12 order-1 md:order-2 flex flex-col">
              <p className="font-archivo font-normal text-base text-black leading-none tracking-normal mb-12 mt-auto">
                Con casi 30 años de trayectoria, en Grupo Frali desarrollamos inversiones estratégicas en real estate, agroindustria, hotelería y energías renovables. Apostamos a proyectos que combinan crecimiento económico, compromiso con el entorno y generación de valor en Argentina, EE. UU. y Uruguay.
              </p>
            </div>

            {/* ESTADÍSTICAS - Layout 5+2+5 en Desktop */}
            {/* Columna 1: Estadísticas izquierda (columnas 1-5) */}
            <div className="col-6 md:col-1-to-5 order-3 md:order-3">
              <div className="border-t border-black pt-1 mb-1 flex justify-between items-start">
                <div className="font-archivo text-black text-stat-number leading-none font-archivo-light">14</div>
                <div className="font-archivo text-black uppercase tracking-wider text-left text-stat-description leading-3 flex-1 max-w-[140px] md:max-w-[120px] lg:max-w-[140px]">
                  PROYECTOS<br />DESARROLLADOS
                </div>
              </div>

              <div className="border-t border-black pt-1 mb-1 flex justify-between items-start">
                <div className="font-archivo text-black text-stat-number leading-none font-archivo-light">300 MM<span className="text-stat-unit">USD</span></div>
                <div className="font-archivo text-black uppercase tracking-wider text-left text-stat-description leading-3 flex-1 max-w-[140px] md:max-w-[120px] lg:max-w-[140px]">
                  VALOR TOTAL<br />DE ACTIVOS
                </div>
              </div>

              <div className="border-t border-black pt-1 mb-1 flex justify-between items-start">
                <div className="font-archivo text-black text-stat-number leading-none font-archivo-light">5</div>
                <div className="font-archivo text-black uppercase tracking-wider text-left text-stat-description leading-3 flex-1 max-w-[140px] md:max-w-[120px] lg:max-w-[140px]">
                  PROYECTOS EN<br />PLANIFICACIÓN
                </div>
              </div>
            </div>

            {/* Columna 2: Estadísticas derecha (columnas 8-12) */}
            <div className="col-6 md:col-8-to-12 order-4 md:order-4">
              <div className="border-t border-black pt-1 mb-1 flex justify-between items-start">
                <div className="font-archivo text-black text-stat-number leading-none font-archivo-light">7800<span className="text-stat-unit">ha</span></div>
                <div className="font-archivo text-black uppercase tracking-wider text-left text-stat-description leading-3 flex-1 max-w-[140px] md:max-w-[120px] lg:max-w-[140px]">
                  HECTÁREAS<br />AGRÍCOLAS
                </div>
              </div>

              <div className="border-t border-black pt-1 mb-1 flex justify-between items-start">
                <div className="font-archivo text-black text-stat-number leading-none font-archivo-light">+300</div>
                <div className="font-archivo text-black uppercase tracking-wider text-left text-stat-description leading-3 flex-1 max-w-[140px] md:max-w-[120px] lg:max-w-[140px]">
                  Nº EMPLEADOS &<br />COLABORADORES
                </div>
              </div>

              <div className="border-t border-black pt-1 mb-1 flex justify-between items-start">
                <div className="font-archivo text-black text-stat-number leading-none font-archivo-light">+100.000<span className="text-stat-unit">m²</span></div>
                <div className="font-archivo text-black uppercase tracking-wider text-left text-stat-description leading-3 flex-1 max-w-[140px] md:max-w-[120px] lg:max-w-[140px]">
                  SUPERFICIE<br />CONSTRUIDA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Logos */}
      <section className="pb-40 overflow-hidden pt-20">
        <div className="w-full overflow-hidden">
          <div className="flex gap-32 w-max animate-marquee">
            {/* Primera iteración de logos */}
            <div className="flex items-center gap-32">
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source srcSet="/images/logos/sofitel.png" type="image/webp" />
                  <img
                    src="/images/logos/sofitel.png" 
                    alt="Sofitel" 
                    width={120}
                    height={80}
                    className="h-20 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source srcSet="/images/logos/cardales.png" type="image/webp" />
                  <img 
                    src="/images/logos/cardales.png" 
                    alt="Cardales" 
                    width={120}
                    height={144}
                    className="h-48 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source srcSet="/images/logos/regina.png" type="image/webp" />
                  <img 
                    src="/images/logos/regina.png" 
                    alt="Regina" 
                    width={120}
                    height={96}
                    className="h-32 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source srcSet="/images/logos/septiembre.png" type="image/webp" />
                  <img 
                    src="/images/logos/septiembre.png" 
                    alt="Septiembre" 
                    width={120}
                    height={80}
                    className="h-20 w-auto object-contain"
                  />
                </picture>
              </div>
            </div>
            {/* Segunda iteración (duplicada para efecto infinito) */}
            <div className="flex items-center gap-32">
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source srcSet="/images/logos/sofitel.png" type="image/webp" />
                  <img 
                    src="/images/logos/sofitel.png" 
                    alt="Sofitel" 
                    width={120}
                    height={80}
                    className="h-20 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source srcSet="/images/logos/cardales.png" type="image/webp" />
                  <img 
                    src="/images/logos/cardales.png" 
                    alt="Cardales" 
                    width={120}
                    height={144}
                    className="h-48 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source srcSet="/images/logos/regina.png" type="image/webp" />
                  <img 
                    src="/images/logos/regina.png" 
                    alt="Regina" 
                    width={120}
                    height={96}
                    className="h-32 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source srcSet="/images/logos/septiembre.png" type="image/webp" />
                  <img 
                    src="/images/logos/septiembre.png" 
                    alt="Septiembre" 
                    width={120}
                    height={80}
                    className="h-20 w-auto object-contain"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section className="py-16 bg-white">
        <div className="content-wrapper">
          {/* Header */}
          <div className="flex justify-between items-baseline font-baskerville text-base mb-8">
            <h3 className="text-sm md:text-base">PROYECTOS</h3>
          </div>

          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="md:hidden font-baskerville text-[32px] leading-[1.1em]">
                DIVERSIFICACIÓN <br/>
                PARA CRECER DE<br/>
                MANERA SOSTENIBLE
              </h2>
              <h2 className="hidden md:block font-baskerville text-[48px] leading-[1.1em]">
                DIVERSIFICACIÓN PARA <br/> 
                CRECER DE MANERA <br/> 
                SOSTENIBLE
              </h2>
            </div>
            <Link href="/desarrollos-proyectos">
              <h3 className="text-sm md:text-base underline font-archivo">VER MÁS</h3>
            </Link>
          </div>

          <ProjectGallery />
        </div>
      </section>

    </main>
  )
}