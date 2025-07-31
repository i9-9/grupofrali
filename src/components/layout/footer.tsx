"use client"

import Link from "next/link"

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return(
        <footer className="bg-[#151714]">
            <div className="content-wrapper">
                <div className="grid pt-7">
                    <div className="col-6 md:col-6 flex flex-col">
                        <a href="mailto:info@grupofrali.com" className="text-white text-xs mb-2 hover:text-white/70 transition-colors">
                            INFO@GRUPOFRALI.COM
                        </a>
                        <h4 className="text-white text-xs mb-2">
                            RUTA PANAMERICANA Nº9, KM 61 (2804)<br/>
                            CAMPANA, ARGENTINA.                        
                        </h4>
                        <h4 className="text-white text-xs mb-2">
                            +54 3489 466110
                        </h4>
                    </div>
                    <div className="col-6 flex flex-col md:text-right">
                        <h4 className="text-white text-xs mb-2">
                            © 2025 GRUPO FRALI<br/>
                            TODOS LOS DERECHOS RESERVADOS
                        </h4>
                    </div>
                </div>
                                 <div className="flex flex-col md:flex-row justify-between text-white text-xs py-10 gap-y-1 md:text-[14px]">
                    <button onClick={scrollToTop} className="hidden md:block text-white text-xs md:text-[14px] hover:text-white/70 transition-colors cursor-pointer text-left">
                        VOLVER ARRIBA
                    </button>
                    <Link href="/" className="text-white text-xs md:text-[14px] tracking-[0.17em] hover:text-white/70 transition-colors">
                        HOME
                    </Link>
                    <Link href="/quienes-somos" className="text-white text-xs md:text-[14px] tracking-[0.17em] hover:text-white/70 transition-colors">
                        QUIÉNES SOMOS
                    </Link>
                    <Link href="/desarrollos-proyectos" className="text-white text-xs md:text-[14px] tracking-[0.17em] hover:text-white/70 transition-colors">
                        DESARROLLOS E INVERSIONES
                    </Link>
                    <Link href="/rrhh" className="text-white text-xs md:text-[14px] tracking-[0.17em] hover:text-white/70 transition-colors">
                        RECURSOS HUMANOS
                    </Link>
                    <div className="flex justify-between">
                        <Link href="/contacto" className="text-white text-xs md:text-[14px] tracking-[0.17em] hover:text-white/70 transition-colors">
                            CONTACTO
                        </Link>
                        <button onClick={scrollToTop} className="md:hidden text-white text-xs hover:text-white/70 transition-colors cursor-pointer">
                        VOLVER ARRIBA
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}