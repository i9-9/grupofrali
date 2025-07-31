export default function RRHH() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="content-wrapper">
        <div className="grid pt-36 md:pt-24 pb-20">
          <div className="col-6 md:col-8">
            <h1 className="font-baskerville text-black" style={{ fontSize: 'clamp(36px, 4.5vw, 72px)', lineHeight: 'clamp(40px, 5vw, 80px)' }}>
              UN EQUIPO QUE<br />
              CRECE EN CADA<br />
              PROYECTO
            </h1>
          </div>
        </div>
      </div>

      {/* Sumate a Nuestro Equipo Section */}
      <section className="content-wrapper pb-16">
        <div className="grid pb-8">
          <div className="col-6 md:col-12">
            <h2 className="font-baskerville text-black" style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: '1.2' }}>
              SUMATE A NUESTRO EQUIPO
            </h2>
          </div>
        </div>

        <div className="grid">
          <div className="col-6 md:col-6 space-y-6">
            <p className="text-black" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '1.5' }}>
              El crecimiento sostenido de nuestros desarrollos se apoya 
              en el compromiso y la calidad humana de nuestro 
              equipo. Fomentamos un ambiente de trabajo basado en el 
              profesionalismo, la responsabilidad y la mejora continua, 
              acompañando el desarrollo personal y profesional de cada 
              colaborador.
            </p>
          </div>

          <div className="col-6 md:col-6">
            <p className="text-black mb-8" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '1.5' }}>
              Si compartís nuestra visión y<br />
              buscás desarrollarte en un entorno<br />
              profesional y dinámico, te invitamos<br />
              a enviarnos tu perfil.
            </p>
            
            <div>
              <a 
                href="mailto:RRHH@GRUPOFRALI.COM" 
                className="font-archivo text-black text-sm tracking-wider hover:opacity-70 transition-opacity"
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