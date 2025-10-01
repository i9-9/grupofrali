"use client"

import { useState } from "react"
import HamburgerIcon from "../icons/HamburgerIcon"
import DownArrowIcon from "../icons/DownArrowIcon"
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const isHome = pathname === "/"
  const isProjectPage = pathname.startsWith("/desarrollos-proyectos/") && pathname !== "/desarrollos-proyectos"
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationClass, setAnimationClass] = useState("")
  const [showLines, setShowLines] = useState(false)
  // El loading está manejado por ConditionalLayout
  
  const menuItems = [
    { name: t("common.navigation.about"), href: "/quienes-somos" },
    { name: t("common.navigation.projects"), href: "/desarrollos-proyectos" },
    { name: t("common.navigation.hr"), href: "/rrhh" },
    { name: t("common.navigation.contact"), href: "/contacto" }
  ]

  const mobileItems = [
    { name: t("common.navigation.home"), href: "/" },
    { name: t("common.navigation.about"), href: "/quienes-somos" },
    { name: t("common.navigation.projects"), href: "/desarrollos-proyectos" },
    { name: t("common.navigation.hrMobile"), href: "/rrhh" },
    { name: t("common.navigation.contact"), href: "/contacto" }
  ]

  const toggleMenu = () => {
    if (isOpen) {
      // Cerrar menu
      setShowLines(false) // Ocultar líneas inmediatamente
      setIsAnimating(true)
      setAnimationClass("mobile-menu-exit-active")
      setTimeout(() => {
        setIsOpen(false)
        setIsAnimating(false)
        setAnimationClass("")
      }, 1000)
    } else {
      // Abrir menu
      setIsOpen(true)
      setAnimationClass("mobile-menu-enter")
      
      // Usar setTimeout con un delay mínimo para asegurar que la clase se aplique
      setTimeout(() => {
        setAnimationClass("mobile-menu-enter-active")
      }, 10) // 10ms es suficiente para que React procese el primer cambio de estado
      
      // Activar animación de líneas antes de que el menú termine de aparecer
      setTimeout(() => {
        setShowLines(true)
      }, 200) // Delay reducido para que las líneas empiecen antes
    }
  }

  return (
    <>
      <header className="header-overlay">
        <div className="content-wrapper">
          {/* Mobile */}
          <div className={`flex md:hidden items-center h-30 ${isHome ? 'justify-between' : 'justify-between'}`}>
            <Link href='/' className="flex items-center">
                <h1 className={`font-baskerville header-logo-mobile whitespace-nowrap mb-2 ${isHome || isProjectPage ? 'text-white' : 'text-black'}`}>
                GRUPO FRALI
                </h1>
            </Link>

            <button onClick={toggleMenu} className={`flex items-center justify-center h-9 w-9 pb-2 sm:pb-3 ${isHome || isProjectPage ? 'text-white' : 'text-black'}`}>
              {isOpen ? <></> : <HamburgerIcon />}
            </button>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            {isHome ? (
              <div className="flex justify-end items-center h-14">
                <ul className="flex gap-5 header-menu-items text-white">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="ml-6 text-white">
                  <LanguageSwitcher />
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center h-14">
                <Link href="/">
                    <h1 className="font-baskerville header-logo text-black pl-3 whitespace-nowrap">
                    GRUPO FRALI
                    </h1>
                </Link>
                <div className="flex items-center gap-5">
                  <ul className="flex gap-5 header-menu-items">
                    {menuItems.map((item, index) => {
                      const isCurrent = pathname === item.href
                      const textColor = isProjectPage ? 'text-white' : 'text-black'
                      const hoverColor = isProjectPage ? 'hover:text-white/30' : 'hover:text-black/30'
                      const currentColor = isProjectPage ? 'text-white/30' : 'text-black/30'
                      return (
                        <li key={index}>
                          <Link href={item.href} className={`${isCurrent ? currentColor : textColor} ${hoverColor} transition-colors duration-400`}>
                            {item.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  <div className={`ml-2 ${isProjectPage ? 'text-white' : 'text-black'}`}>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Título grande en Home */}
        {isHome && (
          <div className="content-wrapper">
            <div className="hidden md:block">
              <h1 className="font-baskerville text-white responsive-title leading-none whitespace-nowrap -mt-8">
                G R U P O &nbsp; F R A L I
              </h1>
            </div>
          </div>
        )}
      </header>

      {(isOpen || isAnimating) && (
        <div
          className={`fixed top-0 left-0 right-0 bg-[#EBEBEB] z-50 md:hidden ${animationClass}`}
          style={{ height: '100vh', overflowY: 'auto' }}
        >
          <div className="content-wrapper">
            <Link href='/'>
              <h1 className="font-baskerville text-2xl sm:text-2xl text-[#151714] tracking-[0.5em] xs:tracking-[0.6em] pt-14 pb-20 whitespace-nowrap">
                GRUPO FRALI
              </h1>
            </Link>
            
            {/* Contenedor del menú con líneas animadas */}
            <div className={`mobile-menu-border-top mobile-menu-border-bottom mobile-menu-line-delay-0 mobile-menu-line-delay-5 ${showLines ? 'animate' : ''}`}>
              <ul className="flex flex-col text-[#151714] text-lg">
                {mobileItems.map((item, index) => {
                  const isCurrent = pathname === item.href
                  return (
                    <li
                      key={index}
                      className={`font-archivo-light py-4 flex justify-between items-center mobile-menu-item mobile-menu-line-delay-${index + 1} ${showLines ? 'animate' : ''}`}
                      onClick={toggleMenu}
                    >
                      <Link
                        href={item.href}
                        className={`flex justify-between w-full ${isCurrent ? 'font-bold' : ''}`}
                      >
                        <span>{item.name}</span>
                        <span>(0{index + 1})</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="py-14">
                <LanguageSwitcher />
              </div>
              <div onClick={toggleMenu}>
                <DownArrowIcon className="rotate-180" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}