export default function RRHH() {
  return (
    <main className="bg-[#EFEFEF]">
      {/* Hero */}
      <div className="content-wrapper">
        <div className="grid pt-36 md:pt-24 pb-32">
          <div className="col-6 md:col-8">
            <h1 className="text-h1-baskerville text-black">
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
            <h2 className="text-small-baskerville text-black">
              SUMATE A NUESTRO EQUIPO
            </h2>
          </div>
        </div>

        <div className="grid">
          <div className="col-6 md:col-span-5 space-y-6 md:space-y-6 space-y-4">
            <p className="text-black text-base leading-none">
              El crecimiento sostenido de nuestros desarrollos se apoya 
              en el compromiso y la calidad humana de nuestro 
              equipo. Fomentamos un ambiente de trabajo basado en el 
              profesionalismo, la responsabilidad y la mejora continua, 
              acompañando el desarrollo personal y profesional de cada 
              colaborador.
            </p>
            
            {/* Segundo párrafo en mobile */}
            <div className="md:hidden">
              <p className="text-black mb-8 text-base leading-none">
                Si compartís nuestra visión y<br />
                buscás desarrollarte en un entorno<br />
                profesional y dinámico, te invitamos<br />
                a enviarnos tu perfil.
              </p>
              
              <div>
                <a 
                  href="mailto:RRHH@GRUPOFRALI.COM" 
                  className="font-archivo font-normal text-black text-base hover:opacity-70 transition-opacity"
                >
                  RRHH@GRUPOFRALI.COM
                </a>
              </div>
            </div>
          </div>

          {/* Segundo párrafo en desktop */}
          <div className="hidden md:block col-6 md:col-7-to-12 mb-20 md:mb-40">
            <p className="text-black mb-8 text-base leading-none">
              Si compartís nuestra visión y<br />
              buscás desarrollarte en un entorno<br />
              profesional y dinámico, te invitamos<br />
              a enviarnos tu perfil.
            </p>
            
            <div>
              <a 
                href="mailto:RRHH@GRUPOFRALI.COM" 
                className="font-archivo font-normal text-black text-base hover:opacity-70 transition-opacity"
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