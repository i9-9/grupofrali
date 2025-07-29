export default function Footer() {
    return(
        <footer className="bg-[#151714]">
            <div className="content-wrapper">
                <div className="grid pt-7">
                    <div className="col-6 md:col-6 flex flex-col">
                        <h4 className="text-white text-xs mb-2">
                            INFO@GRUPOFRALI.COM
                        </h4>
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
                    <h4 className="hidden md:block">
                        VOLVER ARRIBA
                    </h4>
                    <h4 className="tracking-[0.17em]">
                        HOME
                    </h4>
                    <h4 className="tracking-[0.17em]">
                        QUIÉNES SOMOS
                    </h4>
                    <h4 className="tracking-[0.17em]">
                        DESARROLLOS E INVERSIONES
                    </h4>
                    <h4 className="tracking-[0.17em]">
                        RECURSOS HUMANOS
                    </h4>
                    <div className="flex justify-between">
                        <h4 className="tracking-[0.17em]">
                            CONTACTO
                        </h4>
                        <h4 className="md:hidden">
                        VOLVER ARRIBA
                        </h4>
                    </div>
                </div>
            </div>
        </footer>
    )
}