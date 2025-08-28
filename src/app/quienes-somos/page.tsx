'use client'

import React from 'react'
import Image from 'next/image'
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { useTranslations } from "@/hooks/useTranslations"

export default function QuienesSomos() {
  const { t, isReady } = useTranslations()
  
  // Intersection Observers para las diferentes secciones
  const { ref: valoresRef, isVisible: isValoresVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  })

  const { ref: adnRef, isVisible: isAdnVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  })

  const { ref: grupoRef, isVisible: isGrupoVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  })

  // Verificar que las traducciones estén listas
  if (!isReady) {
    return (
      <main className="bg-[#EFEFEF] text-[#151714]">
        <div className="content-wrapper pt-36 md:pt-24 pb-6">
          <div className="grid">
            <div className="col-6 md:col-12">
              <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Obtener valores y management de las traducciones
  const valoresItems = t('about.values.items') || [];
  const managementPositions = t('about.management.positions') || [];

  // Crear estructuras de datos con números
  const valores = Array.isArray(valoresItems) ? valoresItems.map((valor: string, index: number) => ({
    numero: String(index + 1).padStart(2, '0'),
    titulo: valor
  })) : [];

  const management = Array.isArray(managementPositions) ? managementPositions.map((person: { name: string; surname: string; position: string }, index: number) => ({
    numero: String(index + 1).padStart(2, '0'),
    nombre: person.name,
    apellido: person.surname,
    cargo: person.position,
    imagen: `/images/management/${person.name.toLowerCase().replace(' ', '-')}.png`
  })) : [];

  return (
    <main className="bg-[#EFEFEF] text-[#151714]">
      {/* Hero Section */}
      <div className="content-wrapper">
        <div className="grid pt-36 md:pt-24 pb-6">
          <div className="col-6 md:col-12">
            {/* Mobile version */}
            <h1 
              className="md:hidden text-h1-baskerville text-[#151714]" 
              style={{ fontSize: '1.5rem', lineHeight: '1.2' }}
              dangerouslySetInnerHTML={{ __html: t('about.hero.titleMobile') }}
            />
            
            {/* Desktop version */}
            <h1 
              className="hidden md:block text-h1-baskerville text-[#151714]" 
              style={{ lineHeight: '1.3' }}
              dangerouslySetInnerHTML={{ __html: t('about.hero.titleDesktop') }}
            />
          </div>
        </div>

        <div className="grid pb-16">
          <div className="col-6 md:col-6">
            <p className="text-[#151714] tracking-[0.01em] leading-[1.2] md:leading-[1] text-base md:text-[1.18rem]">
              {t('about.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Valores y Nuestro ADN Section */}
      <section className="content-wrapper pb-20 ">
        <div className="grid gap-y-32 md:gap-y-0 mb-20">
          {/* Columna Izquierda: VALORES */}
          <div className="col-6 md:col-6 pb-16 md:pb-0" ref={valoresRef}>
            {/* Título VALORES con línea animada */}
            <div className={`pb-2 mb-4 quienes-somos-line quienes-somos-line-delay-1 ${isValoresVisible ? 'animate' : ''}`}>
              <h2 className="text-small-baskerville md:text-small-baskerville" style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>
                {t('about.values.title')}
              </h2>
            </div>
            
            {/* Valores en columna para mobile, grid 2x2 para desktop */}
            <div className="space-y-6 md:space-y-8">
              {/* Mobile: todos en columna */}
              <div className="block md:hidden space-y-6">
                {valores.map((valor: { numero: string; titulo: string }) => (
                  <div key={valor.numero} className="flex items-start">
                    <div className="w-32 flex-shrink-0">
                      <span className="text-small-archivo text-black">
                        ({valor.numero})
                      </span>
                    </div>
                    <div className="flex-1 pl-12">
                      <p className="font-archivo text-black text-base md:text-[1.18rem] leading-[1.2] md:leading-[1]">
                        {valor.titulo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Desktop: Grid 2x2 */}
              <div className="hidden md:block space-y-6">
                {/* Fila 1 */}
                <div className="flex gap-6">
                  <div className="flex-1">
                    {valores[0] && (
                      <div className="flex items-start space-x-4">
                        <span className="text-small-archivo text-black flex-shrink-0">
                          ({valores[0].numero})
                        </span>
                        <p className="font-archivo text-black text-base md:text-[1.18rem] leading-[1.2] md:leading-[1]">
                          {valores[0].titulo}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {valores[2] && (
                      <div className="flex items-start space-x-4">
                        <span className="text-small-archivo text-black flex-shrink-0">
                          ({valores[2].numero})
                        </span>
                        <p className="font-archivo text-black text-base md:text-[1.18rem] leading-[1.2] md:leading-[1]">
                          {valores[2].titulo}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Fila 2 */}
                <div className="flex gap-6">
                  <div className="flex-1">
                    {valores[1] && (
                      <div className="flex items-start space-x-4">
                        <span className="text-small-archivo text-black flex-shrink-0">
                          ({valores[1].numero})
                        </span>
                        <p className="font-archivo text-black text-base md:text-[1.18rem] leading-[1.2] md:leading-[1]">
                          {valores[1].titulo}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {valores[3] && (
                      <div className="flex items-start space-x-4">
                        <span className="text-small-archivo text-black flex-shrink-0">
                          ({valores[3].numero})
                        </span>
                        <p className="font-archivo text-black text-base md:text-[1.18rem] leading-[1.2] md:leading-[1]">
                          {valores[3].titulo}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: NUESTRO ADN */}
          <div className="col-6 md:col-6" ref={adnRef}>
            {/* Título NUESTRO ADN con línea animada */}
            <div className={`pb-2 mb-4 quienes-somos-line quienes-somos-line-delay-2 ${isAdnVisible ? 'animate' : ''}`}>
              <h2 className="text-small-baskerville md:text-small-baskerville" style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>
                {t('about.dna.title')}
              </h2>
            </div>
            
            {/* MISIÓN con línea animada */}
            <div className={`flex items-start pb-4 mb-8 quienes-somos-line quienes-somos-line-delay-3 ${isAdnVisible ? 'animate' : ''}`}>
              <div className="w-32 flex-shrink-0">
                <h3 className="text-small-archivo text-black tracking-wider">
                  {t('about.dna.mission.title')}
                </h3>
              </div>
              <div className="flex-1 pl-12">
                <p className="font-archivo text-black text-base md:text-[1.18rem] leading-[1.2] md:leading-[1]">
                  {t('about.dna.mission.description')}
                </p>
              </div>
            </div>
            
            {/* VISIÓN sin línea */}
            <div className="flex items-start pb-4 mb-8">
              <div className="w-32 flex-shrink-0">
                <h3 className="text-small-archivo text-black tracking-wider">
                  {t('about.dna.vision.title')}
                </h3>
              </div>
              <div className="flex-1 pl-12">
                <p className="font-archivo text-black text-base md:text-[1.18rem] leading-[1.2] md:leading-[1]">
                  {t('about.dna.vision.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* El Grupo Section */}
      <section className="content-wrapper pb-20 md:pb-52">
        <div className="grid pb-8" ref={grupoRef}>
          <div className="col-6 md:col-12">
            <div className={`quienes-somos-line quienes-somos-line-delay-4 ${isGrupoVisible ? 'animate' : ''}`}>
              <h2 className="text-h1-baskerville text-black pb-4" style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>
                {t('about.group.title')}
              </h2>
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="col-6 md:col-6 space-y-6">
            <p className="text-black text-base md:text-[1.18rem] leading-[1.2] md:leading-[1]">
              {t('about.group.description1')}
            </p>

            <p className="text-black text-base md:text-[1.18rem] leading-[1.2] md:leading-[1]">
              {t('about.group.description2')}
            </p>
          </div>

          <div className="col-6 md:col-6">
            <div className="hidden md:block">
              <div className="flex items-start">
                <div className="w-32 flex-shrink-0">
                  {/* Espacio vacío para mantener alineación */}
                </div>
                <div className="flex-1 pl-12">
                  <h3 className="font-baskerville text-black" style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', lineHeight: '1.3' }}>
                    WE CONTINUE TO<br />
                    CREATE OPPORTUNITIES THAT<br />
                    DRIVE THE FUTURE
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section className="content-wrapper pb-16">
        <div className="grid pb-8">
          <div className="col-6 md:col-12">
            <h2 className="font-baskerville text-black" style={{ fontSize: 'clamp(24px, 3.5vw, 48px)', lineHeight: '1.2' }}>
              {t('about.management.title')}
            </h2>
          </div>
        </div>

        <div className="grid">
          {management.map((person: { numero: string; nombre: string; apellido: string; cargo: string; imagen: string }) => (
            <React.Fragment key={person.numero}>
              {/* Imagen - 5 columnas mobile, 3 columnas desktop */}
              <div className="col-5 md:col-3 mb-8 md:mb-12">
                <Image
                  src={person.imagen}
                  alt={`${person.nombre} ${person.apellido}`}
                  width={600}
                  height={800}
                  quality={100}
                  className="w-full h-auto object-contain grayscale"
                />
                
                {/* Información debajo de la imagen */}
                <div className="mt-3 space-y-0 flex justify-between items-start">
                  <div className="flex flex-col">
                    <h3 className="font-baskerville text-black" style={{ fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: '1.1' }}>
                      {person.nombre}
                    </h3>
                    <h4 className="font-baskerville text-black" style={{ fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: '1.1' }}>
                      {person.apellido}
                    </h4>
                  </div>
                  <div className="text-right">
                    <p className="font-archivo text-black tracking-wider uppercase text-base leading-[1.1]">
                      {person.cargo}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Número - 1 columna mobile y desktop */}
              <div className="col-1 md:col-1 flex items-start">
                <span className="leading-none font-archivo text-black" style={{ fontSize: 'clamp(16px, 2vw, 28px)' }}>
                  {person.numero}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

    </main>
  );
}