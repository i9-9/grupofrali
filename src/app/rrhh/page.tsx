export default function RRHH() {
  return (
    <main className="bg-[#EFEFEF]">
      {/* Hero */}
      <div className="content-wrapper">
        <div className="grid pt-36 md:pt-24 pb-20">
          <div className="col-6 md:col-8">
            <h1 className="font-baskerville text-black" style={{ fontSize: 'clamp(40px, 56px, 72px)', lineHeight: 'clamp(40px, 1.1em, 80px)' }}>
              UN EQUIPO QUE<br />
              CRECE EN CADA<br />
              PROYECTO
            </h1>
          </div>
        </div>
      </div>

      {/* Sumate a Nuestro Equipo */}
      <section className="content-wrapper pb-16">
        <div className="grid pb-8">
          <div className="col-6 md:col-12">
            <h2 className="font-baskerville text-black" style={{ fontSize: 'clamp(20px, 28px, 28px)', lineHeight: '1.2' }}>
              SUMATE A NUESTRO EQUIPO
            </h2>
          </div>
        </div>

        <div className="grid">
          <div className="col-6 md:col-span-5 space-y-6 md:space-y-6 space-y-4">
            <p className="text-black" style={{ fontSize: 'clamp(14px, 22px, 16px)', lineHeight: '1' }}>
              El crecimiento sostenido de nuestros desarrollos se apoya 
              en el compromiso y la calidad humana de nuestro 
              equipo. Fomentamos un ambiente de trabajo basado en el 
              profesionalismo, la responsabilidad y la mejora continua, 
              acompañando el desarrollo personal y profesional de cada 
              colaborador.
            </p>
            
            {/* Segundo párrafo en mobile */}
            <div className="md:hidden">
              <p className="text-black mb-8" style={{ fontSize: 'clamp(14px, 22px, 16px)', lineHeight: '1' }}>
                Si compartís nuestra visión y<br />
                buscás desarrollarte en un entorno<br />
                profesional y dinámico, te invitamos<br />
                a enviarnos tu perfil.
              </p>
              
              <div>
                <a 
                  href="mailto:RRHH@GRUPOFRALI.COM" 
                  className="font-archivo font-normal text-black text-[14px] md:text-[21px] hover:opacity-70 transition-opacity"
                >
                  RRHH@GRUPOFRALI.COM
                </a>
              </div>
            </div>
          </div>

          {/* Segundo párrafo en desktop */}
          <div className="hidden md:block col-6 md:col-7-to-12 mb-20 md:mb-40">
            <p className="text-black mb-8" style={{ fontSize: 'clamp(14px, 22px, 16px)', lineHeight: '1' }}>
              Si compartís nuestra visión y<br />
              buscás desarrollarte en un entorno<br />
              profesional y dinámico, te invitamos<br />
              a enviarnos tu perfil.
            </p>
            
            <div>
                              <a 
                  href="mailto:RRHH@GRUPOFRALI.COM" 
                  className="font-archivo font-normal text-black text-[14px] md:text-[21px] hover:opacity-70 transition-opacity"
                >
                  RRHH@GRUPOFRALI.COM
                </a>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}