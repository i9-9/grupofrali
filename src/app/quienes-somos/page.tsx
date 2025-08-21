'use client'

import React from 'react'
import Image from 'next/image'
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

export default function QuienesSomos() {
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

  const valores = [
    {
      numero: "01",
      titulo: "Compromiso con el desarrollo responsable"
    },
    {
      numero: "02", 
      titulo: "Solidez y profesionalismo en cada proyecto"
    },
    {
      numero: "03",
      titulo: "Innovación aplicada a la gestión y al crecimiento"
    },
    {
      numero: "04",
      titulo: "Integridad como pilar de nuestras acciones"
    }
  ];

  const management = [
    {
      numero: "01",
      nombre: "SEBASTIAN",
      apellido: "LANUSSE",
      cargo: "DIRECTOR GENERAL",
      imagen: "/images/management/lanusse.jpg"
    },
    {
      numero: "02", 
      nombre: "HORACIO",
      apellido: "ANTELO",
      cargo: "DIRECTOR DE OPERACIONES",
      imagen: "/images/management/antelo.jpg"
    },
    {
      numero: "03",
      nombre: "INÉS",
      apellido: "GEMINI",
      cargo: "DIRECTORA FINANCIERA",
      imagen: "/images/management/gemini.jpg"
    },
    {
      numero: "04",
      nombre: "SEAN",
      apellido: "DUGGAN",
      cargo: "REAL ESTATE MANAGER",
      imagen: "/images/management/duggan.jpg"
    },
    {
      numero: "05",
      nombre: "JOAQUÍN",
      apellido: "GOICOCHEA",
      cargo: "ASSET MANAGER",
      imagen: "/images/management/goicochea.jpg"
    },
    {
      numero: "06",
      nombre: "JOAQUÍN NAZAR",
      apellido: "ANCHORENA",
      cargo: "AGRO BUSINESS",
      imagen: "/images/management/nazar-anchorena.jpg"
    }
  ];

  return (
    <main className="bg-[#EFEFEF] text-[#151714]">
      {/* Hero Section */}
      <div className="content-wrapper">
        <div className="grid pt-36 md:pt-24 pb-6">
          <div className="col-6 md:col-12">
            {/* Mobile version */}
            <h1 className="md:hidden text-h1-baskerville text-[#151714]" style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>
              DESARROLLAMOS<br />
              INVERSIONES ESTRATÉGICAS<br />
              EN SECTORES CLAVE PARA<br />
              EL CRECIMIENTO<br />
              ECONÓMICO Y SOCIAL.
            </h1>
            
            {/* Desktop version */}
            <h1 className="hidden md:block text-h1-baskerville text-[#151714]" style={{ lineHeight: '1.3' }}>
              DESARROLLAMOS INVERSIONES ESTRATÉGICAS<br />
              EN SECTORES CLAVE PARA EL CRECIMIENTO<br />
              ECONÓMICO Y SOCIAL.
            </h1>
          </div>
        </div>

        <div className="grid pb-16">
          <div className="col-6 md:col-6">
            <p className="text-[#151714] tracking-[0.01em] leading-[1.2] md:leading-[1] text-base md:text-[1.4rem]">
              Con casi 30 años de trayectoria, consolidamos nuestro liderazgo a través de proyectos que combinan innovación, compromiso y una gestión profesional orientada al valor de largo plazo, en Argentina, Estados Unidos y Uruguay. Nuestra fortaleza está en la capacidad de evolucionar, diversificar e invertir en el futuro.
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
                VALORES
              </h2>
            </div>
            
            {/* Valores en columna para mobile, grid 2x2 para desktop */}
            <div className="space-y-6 md:space-y-8">
              {/* Mobile: todos en columna */}
              <div className="block md:hidden space-y-6">
                {valores.map((valor) => (
                  <div key={valor.numero} className="flex items-start">
                    <div className="w-32 flex-shrink-0">
                      <span className="text-small-archivo text-black">
                        ({valor.numero})
                      </span>
                    </div>
                    <div className="flex-1 pl-12">
                      <p className="font-archivo text-black text-base md:text-[1.4rem] leading-[1.2] md:leading-[1]">
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
                    <div className="flex items-start space-x-4">
                      <span className="text-small-archivo text-black flex-shrink-0">
                        ({valores[0].numero})
                      </span>
                      <p className="font-archivo text-black text-base md:text-[1.4rem] leading-[1.2] md:leading-[1]">
                        {valores[0].titulo}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <span className="text-small-archivo text-black flex-shrink-0">
                        ({valores[2].numero})
                      </span>
                      <p className="font-archivo text-black text-base md:text-[1.4rem] leading-[1.2] md:leading-[1]">
                        {valores[2].titulo}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Fila 2 */}
                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <span className="text-small-archivo text-black flex-shrink-0">
                        ({valores[1].numero})
                      </span>
                      <p className="font-archivo text-black text-base md:text-[1.4rem] leading-[1.2] md:leading-[1]">
                        {valores[1].titulo}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <span className="text-small-archivo text-black flex-shrink-0">
                        ({valores[3].numero})
                      </span>
                      <p className="font-archivo text-black text-base md:text-[1.4rem] leading-[1.2] md:leading-[1]">
                        {valores[3].titulo}
                      </p>
                    </div>
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
                NUESTRO ADN
              </h2>
            </div>
            
            {/* MISIÓN con línea animada */}
            <div className={`flex items-start pb-4 mb-8 quienes-somos-line quienes-somos-line-delay-3 ${isAdnVisible ? 'animate' : ''}`}>
              <div className="w-32 flex-shrink-0">
                <h3 className="text-small-archivo text-black tracking-wider">
                  MISIÓN
                </h3>
              </div>
              <div className="flex-1 pl-12">
                <p className="font-archivo text-black text-base md:text-[1.4rem] leading-[1.2] md:leading-[1]">
                  Impulsar proyectos de inversión que generen valor económico, social y humano, fortaleciendo el crecimiento de las comunidades donde operamos.
                </p>
              </div>
            </div>
            
            {/* VISIÓN sin línea */}
            <div className="flex items-start pb-4 mb-8">
              <div className="w-32 flex-shrink-0">
                <h3 className="text-small-archivo text-black tracking-wider">
                  VISIÓN
                </h3>
              </div>
              <div className="flex-1 pl-12">
                <p className="font-archivo text-black text-base md:text-[1.4rem] leading-[1.2] md:leading-[1]">
                  Consolidarnos como un actor estratégico en la generación de desarrollos de alto impacto, combinando responsabilidad, innovación y visión de futuro.
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
                EL GRUPO
              </h2>
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="col-6 md:col-6 space-y-6">
            <p className="text-black text-base md:text-[1.4rem] leading-[1.2] md:leading-[1]">
              Desde nuestros inicios, canalizamos inversiones en sectores estratégicos, trabajando con un enfoque profesional y una mirada a largo plazo. Nuestros proyectos en real estate, agroindustria, energía y hotelería reflejan un modelo de gestión basado en la diversificación y el compromiso con el impacto positivo. Hoy operamos en Argentina, Estados Unidos y Uruguay, ampliando nuestra presencia en segmentos clave de manera planificada.
            </p>

            <p className="text-black text-base md:text-[1.4rem] leading-[1.2] md:leading-[1]">
              Fieles a nuestro espíritu dinámico, continuamos analizando nuevas oportunidades de desarrollo e inversión, abiertos a expandir nuestra participación en distintos mercados, siempre con la visión de generar valor perdurable. Nuestro directorio está conformado por profesionales con experiencia local e internacional, comprometidos con la excelencia y el crecimiento estratégico del grupo.
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
      <section className="content-wrapper pb-16">
        <div className="grid pb-8">
          <div className="col-6 md:col-12">
            <h2 className="font-baskerville text-black" style={{ fontSize: 'clamp(24px, 3.5vw, 48px)', lineHeight: '1.2' }}>
              MANAGEMENT
            </h2>
          </div>
        </div>

        <div className="grid">
          {management.map((person) => (
            <React.Fragment key={person.numero}>
              {/* Imagen - 5 columnas mobile, 3 columnas desktop */}
              <div className="col-5 md:col-3 mb-8 md:mb-12">
                <Image
                  src={person.imagen}
                  alt={`${person.nombre} ${person.apellido}`}
                  width={300}
                  height={400}
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