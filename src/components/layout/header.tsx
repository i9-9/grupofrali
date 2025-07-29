"use client"

import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import HamburgerIcon from "../icons/HamburgerIcon"
import DownArrowIcon from "../icons/DownArrowIcon"
import { usePathname } from 'next/navigation'


const menuItems = ["QUIENES SOMOS", "DESARROLLOS & PROYECTOS", "RRHH", "CONTACTO", "EN"]
const mobileItems = ["HOME","QUIENES SOMOS", "DESARROLLOS & PROYECTOS", "RRHH", "CONTACTO"]


export default function Header() {
    const pathname = usePathname()
    const isHome = pathname === "/"
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    

  return (
    <>
    <header className="header-overlay">
        <div className="content-wrapper">
            {/* Mobile: estructura horizontal normal */}
            <div className={`flex md:hidden items-center h-30 ${
                isHome ? 'justify-between' : 'justify-between'
            }`}>
                <h1 className="font-baskerville text-[28px] text-white tracking-[0.68em]">
                    GRUPO FRALI
                </h1>

                <button onClick={toggleMenu}>
                    {isOpen ? <></> : <HamburgerIcon />}
                </button>
            </div>

            {/* Desktop: estructura vertical */}
            <div className="hidden md:block">
                {/* Fila superior: navegación a la derecha */}
                <div className="flex justify-end items-center h-14">
                    <ul className="flex gap-5 text-sm text-white">
                        {menuItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Título normal en otras páginas */}
                {!isHome && (
                    <div className="text-left">
                        <h1 className="font-baskerville text-base text-white tracking-[0.68em]">
                            GRUPO FRALI
                        </h1>
                    </div>
                )}
            </div>
        </div>

        {/* Título grande respetando márgenes */}
        {isHome && (
            <div className="content-wrapper">
                <div className="hidden md:block">
                    <h1 className="font-baskerville text-white responsive-title leading-none">
                        GRUPO FRALI
                    </h1>
                </div>
            </div>
        )}
    </header>

    <AnimatePresence>
    {isOpen && (
        <motion.div 
        className="fixed inset-0 bg-white z-50 md:hidden"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // easeOutCubic
        >
            <div className="content-wrapper">
                <h1 className="font-baskerville text-[28px] md:text-base text-[#151714] tracking-[0.68em] pt-14 pb-20">GRUPO FRALI</h1>
                <ul className="flex flex-col text-[#151714] text-lg divide-y divide-[#151714] border-y border-[#151714]">
                    {mobileItems.map((item, index) => (
                        <li className="font-archivo-light py-4 flex justify-between items-center" key={index} onClick={toggleMenu}>
                            <span>
                                {item}    
                            </span>
                            <span>
                                (0{index + 1})    
                            </span>
                            </li>
                    ))}
                </ul>
                <div className="flex justify-between items-center">
                    <h4 className="py-14">EN</h4>
                    <div onClick={toggleMenu}>
                        <DownArrowIcon className="rotate-180" /> 
                    </div>
                </div>
            </div>
        </motion.div>
    )}
    </AnimatePresence>
  </>
  )
}