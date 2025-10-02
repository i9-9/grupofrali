'use client'

import React from 'react'
import Image from 'next/image'
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { useTranslations } from "@/hooks/useTranslations"

export default function QuienesSomos() {
  const { t, getValue } = useTranslations()
  
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

  // Las traducciones están manejadas por ConditionalLayout

  // Obtener valores y management de las traducciones usando getValue para arrays
  const valoresItems = getValue('about.values.items') as string[] | undefined;
  const managementPositions = getValue('about.management.positions') as Array<{ name: string; surname: string; position: string }> | undefined;

  // Crear estructuras de datos con números
  const valores = Array.isArray(valoresItems) ? valoresItems.map((valor: string, index: number) => ({
    numero: String(index + 1).padStart(2, '0'),
    titulo: valor
  })) : [];

  const management = Array.isArray(managementPositions) ? managementPositions.map((person: { name: string; surname: string; position: string }, index: number) => {
    // Generar la ruta de imagen basada en el nombre y apellido
    let imageName = '';
    if (person.name === 'JOAQUÍN NAZAR' && person.surname === 'ANCHORENA') {
      imageName = 'nazar-anchorena';
    } else if (person.name === 'JOAQUÍN' && person.surname === 'GOICOECHEA') {
      imageName = 'goicochea';
    } else if (person.name === 'SEAN' && person.surname === 'DUGGAN') {
      imageName = 'duggan';
    } else if (person.name === 'INÉS' && person.surname === 'GEMINI') {
      imageName = 'gemini';
    } else if (person.name === 'HORACIO' && person.surname === 'ANTELO') {
      imageName = 'antelo';
    } else if (person.name === 'SEBASTIAN' && person.surname === 'LANUSSE') {
      imageName = 'lanusse';
    } else {
      // Fallback: usar el apellido en minúsculas
      imageName = person.surname.toLowerCase();
    }

    return {
      numero: String(index + 1).padStart(2, '0'),
      nombre: person.name,
      apellido: person.surname,
      cargo: person.position,
      imagen: `/images/management/${imageName}.png`
    };
  }) : [];

  return (
    <main className="bg-[#EFEFEF] text-[#151714]">
      {/* Hero Section */}
      <div className="w-full mx-auto" style={{ paddingLeft: 'clamp(1rem, 0.4vw, 1.5rem)', paddingRight: 'clamp(1rem, 0.4vw, 1.5rem)' }}>
        <div className="grid pt-36 md:pt-24 pb-6">
          <div className="col-6 md:col-12">
            {/* Mobile version */}
            <h1 
              className="md:hidden font-baskerville text-[#151714] font-normal"
              style={{ 
                fontSize: 'clamp(24.02px, 6.1vw, 56px)',
                lineHeight: 'clamp(25.8px, 6.6vw, 70.89px)'
              }}
              dangerouslySetInnerHTML={{ __html: t('about.hero.titleMobile') }}
            />
            
            {/* Desktop version */}
            <h1 
              className="hidden md:block font-baskerville text-[#151714] font-normal"
              style={{ 
                fontSize: 'clamp(24.02px, 6.1vw, 56px)',
                lineHeight: 'clamp(25.8px, 6.6vw, 70.89px)'
              }}
              dangerouslySetInnerHTML={{ __html: t('about.hero.titleDesktop') }}
            />
          </div>
        </div>

        <div className="grid pb-16">
          <div className="col-6 md:col-6">
            <p 
              className="font-archivo text-[#151714] font-normal tracking-[0%]"
              style={{
                fontSize: 'clamp(16px, 1.4vw, 22.44px)',
                lineHeight: '100%'
              }}
            >
              {t('about.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Valores y Nuestro ADN Section */}
      <section className="w-full mx-auto" style={{ paddingLeft: 'clamp(1rem, 0.4vw, 1.5rem)', paddingRight: 'clamp(1rem, 0.4vw, 1.5rem)', paddingBottom: 'clamp(0rem, 0.2vw, 0.2rem)' }}>
        <div className="grid gap-y-32 md:gap-y-0 mb-20">
          {/* Columna Izquierda: VALORES */}
          <div className="col-6 md:col-6 pb-16 md:pb-0" ref={valoresRef}>
            {/* Título VALORES con línea animada */}
            <div className={`pb-2 mb-4 quienes-somos-line quienes-somos-line-delay-1 ${isValoresVisible ? 'animate' : ''}`}>
              <h2 
                className="font-baskerville font-normal tracking-[0%]"
                style={{
                  fontSize: 'clamp(24px, 2.8vw, 28.35px)',
                  lineHeight: 'clamp(28px, 3.6vw, 36px)'
                }}
              >
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
                      <span 
                        className="font-archivo text-black font-normal tracking-[0%]"
                        style={{
                          fontSize: 'clamp(16px, 1.1vw, 17.08px)',
                          lineHeight: '100%'
                        }}
                      >
                        ({valor.numero})
                      </span>
                    </div>
                    <div className="flex-1 pl-12">
                      <p 
                        className="font-archivo text-black font-normal tracking-[0%]"
                        style={{
                          fontSize: 'clamp(14px, 1.4vw, 22.44px)',
                          lineHeight: '100%'
                        }}
                      >
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
                        <span 
                          className="font-archivo text-black font-normal tracking-[0%] flex-shrink-0"
                          style={{
                            fontSize: 'clamp(16px, 1.1vw, 17.08px)',
                            lineHeight: '100%'
                          }}
                        >
                          ({valores[0].numero})
                        </span>
                        <p 
                          className="font-archivo text-black font-normal tracking-[0%]"
                          style={{
                            fontSize: 'clamp(14px, 1.4vw, 22.44px)',
                            lineHeight: '100%'
                          }}
                        >
                          {valores[0].titulo}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {valores[2] && (
                      <div className="flex items-start space-x-4">
                        <span 
                          className="font-archivo text-black font-normal tracking-[0%] flex-shrink-0"
                          style={{
                            fontSize: 'clamp(16px, 1.1vw, 17.08px)',
                            lineHeight: '100%'
                          }}
                        >
                          ({valores[2].numero})
                        </span>
                        <p 
                          className="font-archivo text-black font-normal tracking-[0%]"
                          style={{
                            fontSize: 'clamp(14px, 1.4vw, 22.44px)',
                            lineHeight: '100%'
                          }}
                        >
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
                        <span 
                          className="font-archivo text-black font-normal tracking-[0%] flex-shrink-0"
                          style={{
                            fontSize: 'clamp(16px, 1.1vw, 17.08px)',
                            lineHeight: '100%'
                          }}
                        >
                          ({valores[1].numero})
                        </span>
                        <p 
                          className="font-archivo text-black font-normal tracking-[0%]"
                          style={{
                            fontSize: 'clamp(14px, 1.4vw, 22.44px)',
                            lineHeight: '100%'
                          }}
                        >
                          {valores[1].titulo}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {valores[3] && (
                      <div className="flex items-start space-x-4">
                        <span 
                          className="font-archivo text-black font-normal tracking-[0%] flex-shrink-0"
                          style={{
                            fontSize: 'clamp(16px, 1.1vw, 17.08px)',
                            lineHeight: '100%'
                          }}
                        >
                          ({valores[3].numero})
                        </span>
                        <p 
                          className="font-archivo text-black font-normal tracking-[0%]"
                          style={{
                            fontSize: 'clamp(14px, 1.4vw, 22.44px)',
                            lineHeight: '100%'
                          }}
                        >
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
              <h2 
                className="font-baskerville font-normal tracking-[0%]"
                style={{
                  fontSize: 'clamp(24px, 2.8vw, 28.35px)',
                  lineHeight: 'clamp(28px, 3.6vw, 36px)'
                }}
              >
                {t('about.dna.title')}
              </h2>
            </div>
            
            {/* MISIÓN con línea animada */}
            <div className={`pb-2 mb-4 quienes-somos-line quienes-somos-line-delay-3 ${isAdnVisible ? 'animate' : ''}`}>
              <div className="flex items-start pb-4 mb-8">
                <div className="w-32 flex-shrink-0">
                  <h3 
                    className="font-archivo text-black font-normal tracking-[0%]"
                    style={{
                      fontSize: 'clamp(16px, 1.2vw, 17.72px)',
                      lineHeight: '100%'
                    }}
                  >
                    {t('about.dna.mission.title')}
                  </h3>
                </div>
                <div className="flex-1 pl-12">
                  <p 
                    className="font-archivo text-black font-normal tracking-[0%]"
                    style={{
                      fontSize: 'clamp(11.56px, 1.4vw, 22.44px)',
                      lineHeight: '100%'
                    }}
                  >
                    {t('about.dna.mission.description')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* VISIÓN sin línea */}
            <div className="flex items-start pb-4 mb-8">
              <div className="w-32 flex-shrink-0">
                <h3 
                  className="font-archivo text-black font-normal tracking-[0%]"
                  style={{
                    fontSize: 'clamp(16px, 1.2vw, 17.72px)',
                    lineHeight: '100%'
                  }}
                >
                  {t('about.dna.vision.title')}
                </h3>
              </div>
              <div className="flex-1 pl-12">
                <p 
                  className="font-archivo text-black font-normal tracking-[0%]"
                  style={{
                    fontSize: 'clamp(11.56px, 1.4vw, 22.44px)',
                    lineHeight: '100%'
                  }}
                >
                  {t('about.dna.vision.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* El Grupo Section */}
      <section className="w-full mx-auto pb-20 md:pb-52" style={{ paddingLeft: 'clamp(1rem, 0.4vw, 1.5rem)', paddingRight: 'clamp(1rem, 0.4vw, 1.5rem)' }}>
        <div className="grid pb-8" ref={grupoRef}>
          <div className="col-6 md:col-12">
            <div className={`quienes-somos-line quienes-somos-line-delay-4 ${isGrupoVisible ? 'animate' : ''}`}>
              <h2 
                className="font-baskerville text-black font-normal tracking-[0%] pb-4"
                style={{
                  fontSize: 'clamp(24px, 6.1vw, 60.24px)',
                  lineHeight: 'clamp(28px, 6.5vw, 65px)'
                }}
              >
                {t('about.group.title')}
              </h2>
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="col-6 md:col-6 space-y-6">
            <p 
              className="font-archivo text-black font-normal tracking-[0%]"
              style={{
                fontSize: 'clamp(16px, 1.4vw, 22.44px)',
                lineHeight: '100%'
              }}
            >
              {t('about.group.description1')}
            </p>

            <p 
              className="font-archivo text-black font-normal tracking-[0%]"
              style={{
                fontSize: 'clamp(16px, 1.4vw, 22.44px)',
                lineHeight: '100%'
              }}
            >
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
                  <h3 
                    className="font-baskerville text-black font-normal tracking-[0%]"
                    style={{
                      fontSize: 'clamp(18px, 2.8vw, 28.35px)',
                      lineHeight: 'clamp(20px, 3.6vw, 36.62px)'
                    }}
                  >
                    SEGUIMOS CREANDO<br />
                    OPORTUNIDADES QUE<br />
                    IMPULSAN EL FUTURO
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section className="w-full mx-auto pb-16" style={{ paddingLeft: 'clamp(1rem, 0.4vw, 1.5rem)', paddingRight: 'clamp(1rem, 0.4vw, 1.5rem)' }}>
        <div className="grid pb-8">
          <div className="col-6 md:col-12">
            <h2 
              className="font-baskerville text-black font-normal tracking-[0%]"
              style={{
                fontSize: 'clamp(24px, 6.1vw, 60.24px)',
                lineHeight: 'clamp(28px, 6.5vw, 65px)'
              }}
            >
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
                    {/* Mobile: especificaciones exactas del diseño en w393 */}
                    <h3 
                      className="md:hidden font-baskerville text-black font-normal tracking-[0%]"
                      style={{ 
                        fontSize: 'clamp(18px, 4.6vw, 20px)', 
                        lineHeight: '100%' 
                      }}
                    >
                      {person.nombre}
                    </h3>
                    {/* Desktop: especificaciones exactas del diseño en w1512 */}
                    <h3 
                      className="hidden md:block font-baskerville text-black font-normal tracking-[0%]"
                      style={{ 
                        fontSize: 'clamp(20px, 1.5vw, 23.51px)', 
                        lineHeight: '100%' 
                      }}
                    >
                      {person.nombre}
                    </h3>
                    
                    {/* Mobile: especificaciones exactas del diseño en w393 */}
                    <h4 
                      className="md:hidden font-baskerville text-black font-normal tracking-[0%]"
                      style={{ 
                        fontSize: 'clamp(18px, 4.6vw, 20px)', 
                        lineHeight: '100%' 
                      }}
                    >
                      {person.apellido}
                    </h4>
                    {/* Desktop: especificaciones exactas del diseño en w1512 */}
                    <h4 
                      className="hidden md:block font-baskerville text-black font-normal tracking-[0%]"
                      style={{ 
                        fontSize: 'clamp(20px, 1.5vw, 23.51px)', 
                        lineHeight: '100%' 
                      }}
                    >
                      {person.apellido}
                    </h4>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    {/* Mobile: especificaciones exactas del diseño en w393 */}
                    <p 
                      className="md:hidden font-archivo text-black font-normal tracking-[0%] uppercase whitespace-pre-line text-right"
                      style={{ 
                        fontSize: 'clamp(11px, 2.8vw, 12px)',
                        lineHeight: 'clamp(12px, 3vw, 13px)'
                      }}
                    >
                      {person.cargo}
                    </p>
                    {/* Desktop: especificaciones exactas del diseño en w1512 */}
                    <p 
                      className="hidden md:block font-archivo text-black font-normal tracking-[0%] uppercase whitespace-pre-line text-right"
                      style={{ 
                        fontSize: 'clamp(10px, 0.9vw, 14.61px)', /* Más pequeño en tablets */
                        lineHeight: 'clamp(11px, 1vw, 16.66px)'
                      }}
                    >
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