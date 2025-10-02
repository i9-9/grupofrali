"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Footer() {
    const { t } = useLanguage()
    
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            // Usar smooth scroll nativo más optimizado, evitando la interceptación personalizada
            document.documentElement.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            })
        }
    }
    return(
        <footer className="bg-[#151714]">
            <div className="w-full mx-auto" style={{ paddingLeft: 'clamp(1rem, 0.4vw, 1.5rem)', paddingRight: 'clamp(1rem, 0.4vw, 1.5rem)' }}>
                <div className="grid pt-7">
                    <div className="col-6 md:col-6 flex flex-col">
                        <a href="mailto:info@grupofrali.com" className="text-white text-xs mb-2 hover:text-white/70 transition-colors">
                            {t("footer.contact.email")}
                        </a>
                        <h4 className="text-white text-xs mb-2">
                            {t("footer.contact.address")}<br/>
                            {t("footer.contact.city")}                        
                        </h4>
                        <h4 className="text-white text-xs mb-2">
                            {t("footer.contact.phone")}
                        </h4>
                    </div>
                    <div className="col-6 flex flex-col md:text-right">
                        <h4 className="text-white text-xs mb-2">
                            {t("footer.copyright").split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index < t("footer.copyright").split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </h4>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between text-white py-10 gap-y-1">
                    <button onClick={scrollToTop} className="hidden md:block text-white hover:text-white/70 transition-colors cursor-pointer text-left" style={{ fontSize: 'clamp(10px, 1vw, 14px)' }}>
                        {t("common.buttons.back")}
                    </button>
                    <Link href="/" className="text-white tracking-[0.17em] hover:text-white/70 transition-colors" style={{ fontSize: 'clamp(10px, 1vw, 14px)' }}>
                        {t("footer.navigation.home")}
                    </Link>
                    <Link href="/quienes-somos" className="text-white tracking-[0.17em] hover:text-white/70 transition-colors duration-300" style={{ fontSize: 'clamp(10px, 1vw, 14px)' }}>
                        {t("footer.navigation.aboutUs")}
                    </Link>
                    <Link href="/desarrollos-proyectos" className="text-white tracking-[0.17em] hover:text-white/70 transition-colors duration-300" style={{ fontSize: 'clamp(10px, 1vw, 14px)' }}>
                        {t("footer.navigation.developments")}
                    </Link>
                    <Link href="/rrhh" className="text-white tracking-[0.17em] hover:text-white/70 transition-colors duration-300" style={{ fontSize: 'clamp(10px, 1vw, 14px)' }}>
                        {t("footer.navigation.humanResources")}
                    </Link>
                    <div className="flex justify-between">
                        <Link href="/contacto" className="text-white tracking-[0.17em] hover:text-white/70 transition-colors duration-300" style={{ fontSize: 'clamp(10px, 1vw, 14px)' }}>
                            {t("footer.navigation.contact")}
                        </Link>
                        <button onClick={scrollToTop} className="md:hidden text-white hover:text-white/70 transition-colors cursor-pointer duration-300" style={{ fontSize: 'clamp(10px, 1.2vw, 12px)' }}>
                        {t("common.buttons.back")}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}