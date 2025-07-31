import React from 'react'

export default function QuienesSomos() {
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
        <div className="grid pt-36 md:pt-24 pb-12">
          <div className="col-6 md:col-12">
            <h1 className="font-baskerville text-[#151714]" style={{ fontSize: 'clamp(36px, 56px, 72px)', lineHeight: 'clamp(40px, 70.89px, 80px)' }}>
              DESARROLLAMOS INVERSIONES ESTRATÉGICAS<br />
              EN SECTORES CLAVE PARA EL CRECIMIENTO<br />
              ECONÓMICO Y SOCIAL.
            </h1>
          </div>
        </div>

        <div className="grid pb-16">
          <div className="col-6 md:col-6">
            <p className="text-[#151714] tracking-[0.01em] leading-[1]" style={{ fontSize: 'clamp(16px, 22px, 17px)' }}>
              Con casi 30 años de trayectoria, consolidamos nuestro liderazgo a 
              través de proyectos que combinan innovación, compromiso y una 
              gestión profesional orientada al valor de largo plazo, en Argentina, 
              Estados Unidos y Uruguay. Nuestra fortaleza está en la capacidad 
              de evolucionar, diversificar e invertir en el futuro.
            </p>
          </div>
        </div>
      </div>

      {/* Valores y Nuestro ADN Section */}
      <section className="content-wrapper pb-20">
        <div className="grid">
          {/* Título Valores - Columnas 1-6 */}
          <div className="col-6 md:col-span-6">
            <h2 className="font-baskerville pb-4 border-b border-black pr-4 md:pr-6" style={{ fontSize: 'clamp(24px, 28px, 32px)', lineHeight: '1.2' }}>
              VALORES
            </h2>
          </div>

          {/* Título Nuestro ADN - Columnas 7-12 */}
          <div className="col-6 md:col-span-6 md:col-start-7">
            <h2 className="font-baskerville pb-4 border-b border-black pl-4 md:pl-6" style={{ fontSize: 'clamp(24px, 2.2vw, 32px)', lineHeight: '1.2' }}>
              NUESTRO ADN
            </h2>
          </div>

          {/* Valores distribuidos en columnas 1-6 (2x2) */}
          
          {/* Fila 2: Valores 01 y 02 */}
          {/* Valor 01 - Columnas 1-3, Fila 2 */}
          <div className="col-3 md:col-span-3 md:col-start-1 py-6 border-b border-black pr-2 md:pr-3" style={{ gridRow: '2' }}>
            <span className="font-baskerville block mb-2" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}>
              ({valores[0].numero})
            </span>
            <p className="font-baskerville" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '1.3' }}>
              {valores[0].titulo}
            </p>
          </div>

          {/* Valor 02 - Columnas 4-6, Fila 2 */}
          <div className="col-3 md:col-span-3 md:col-start-4 py-6 border-b border-black pl-2 md:pl-3" style={{ gridRow: '2' }}>
            <span className="font-baskerville block mb-2" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}>
              ({valores[1].numero})
            </span>
            <p className="font-baskerville" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '1.3' }}>
              {valores[1].titulo}
            </p>
          </div>

          {/* Fila 2: Misión - Columnas 7-8, Fila 2 */}
          <div className="col-3 md:col-span-2 md:col-start-7 py-6 border-b border-black pl-4 md:pl-6" style={{ gridRow: '2' }}>
            <h3 className="font-archivo-bold text-xs mb-3 tracking-wider">MISIÓN</h3>
          </div>

          {/* Fila 2: Párrafo Misión - Columnas 9-12, Fila 2 */}
          <div className="col-3 md:col-span-4 md:col-start-9 py-6 border-b border-black" style={{ gridRow: '2' }}>
            <p style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '1.4' }}>
              Impulsar proyectos de inversión que generen valor económico, social y humano, fortaleciendo 
              el crecimiento de las comunidades donde operamos.
            </p>
          </div>

          {/* Fila 3: Valores 03 y 04 */}
          {/* Valor 03 - Columnas 1-3, Fila 3 */}
          <div className="col-3 md:col-span-3 md:col-start-1 py-6 pr-2 md:pr-3" style={{ gridRow: '3' }}>
            <span className="font-baskerville block mb-2" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}>
              ({valores[2].numero})
            </span>
            <p className="font-baskerville" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '1.3' }}>
              {valores[2].titulo}
            </p>
          </div>

          {/* Valor 04 - Columnas 4-6, Fila 3 */}
          <div className="col-3 md:col-span-3 md:col-start-4 py-6 pl-2 md:pl-3" style={{ gridRow: '3' }}>
            <span className="font-baskerville block mb-2" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}>
              ({valores[3].numero})
            </span>
            <p className="font-baskerville" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '1.3' }}>
              {valores[3].titulo}
            </p>
          </div>

          {/* Fila 3: Visión - Columnas 7-8, Fila 3 */}
          <div className="col-3 md:col-span-2 md:col-start-7 py-6 pl-4 md:pl-6" style={{ gridRow: '3' }}>
            <h3 className="font-archivo-bold text-xs mb-3 tracking-wider">VISIÓN</h3>
          </div>

          {/* Fila 3: Párrafo Visión - Columnas 9-12, Fila 3 */}
          <div className="col-3 md:col-span-4 md:col-start-9 py-6" style={{ gridRow: '3' }}>
            <p style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '1.4' }}>
              Consolidarnos como un actor estratégico en la generación de desarrollos de alto impacto, 
              combinando responsabilidad, innovación y visión de futuro.
            </p>
          </div>
        </div>
      </section>

      {/* El Grupo Section */}
      <section className="content-wrapper pb-20">
        <div className="grid pb-8">
          <div className="col-6 md:col-12">
            <h2 className="font-baskerville text-black border-b border-black pb-4" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', lineHeight: '1.2' }}>
              EL GRUPO
            </h2>
          </div>
        </div>

        <div className="grid">
          <div className="col-6 md:col-7 space-y-6">
            <p className="text-black" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '1.5' }}>
              Desde nuestros inicios, canalizamos inversiones en sectores 
              estratégicos, trabajando con un enfoque profesional y una mirada a 
              largo plazo. Nuestros desarrollos en real estate, agroindustria, energía 
              y hotelería reflejan un modelo de gestión basado en la diversificación 
              y el compromiso con el proyecto institucional. Hoy operamos en 
              Argentina, Estados Unidos y Uruguay, ampliando nuestra presencia 
              en segmentos clave de manera planificada.
            </p>

            <p className="text-black" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '1.5' }}>
              Fieles a nuestro espíritu dinámico, continuamos analizando nuevas 
              oportunidades de desarrollo e inversión, abiertos a expandir nuestra 
              participación en distintos mercados, siempre con la visión de generar 
              valor perdurable. Nuestro directorio está conformado por profesionales 
              con experiencia local e internacional, comprometidos con la excelencia 
              y el crecimiento estratégico del grupo.
            </p>
          </div>

          <div className="col-6 md:col-4 md:col-start-9">
            <div className="px-6 py-8">
              <h3 className="font-baskerville text-black" style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', lineHeight: '1.3' }}>
                SEGUIMOS CREANDO OPORTUNIDADES QUE IMPULSAN EL FUTURO
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section className="content-wrapper pb-16">
        <div className="grid pb-8">
          <div className="col-6 md:col-12">
            <h2 className="font-baskerville text-black" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', lineHeight: '1.2' }}>
              MANAGEMENT
            </h2>
          </div>
        </div>

        <div className="grid">
          {management.map((person, index) => (
            <React.Fragment key={person.numero}>
              {/* Imagen - 5 columnas mobile, 3 columnas desktop */}
              <div className="col-5 md:col-3 mb-8 md:mb-12">
                <img
                  src={person.imagen}
                  alt={`${person.nombre} ${person.apellido}`}
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
                  <p className="font-archivo text-black text-xs tracking-wider uppercase">
                    {person.cargo}
                  </p>
                </div>
              </div>
              
              {/* Número - 1 columna mobile y desktop */}
              <div className="col-1 md:col-1 flex items-start">
                <span className="leading-none font-archivo text-black text-md md:text-[28px]">
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