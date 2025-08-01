"use client"

import { useState } from "react"
import HamburgerIcon from "../icons/HamburgerIcon"
import DownArrowIcon from "../icons/DownArrowIcon"
import { usePathname } from 'next/navigation'
import Link from "next/link"

const menuItems = [
  { name: "QUIENES SOMOS", href: "/quienes-somos" },
  { name: "DESARROLLOS & PROYECTOS", href: "/desarrollos-proyectos" },
  { name: "RRHH", href: "/rrhh" },
  { name: "CONTACTO", href: "/contacto" }
  // { name: "EN", href: "/en" }
]

const mobileItems = [
  { name: "HOME", href: "/" },
  { name: "QUIENES SOMOS", href: "/quienes-somos" },
  { name: "DESARROLLOS & PROYECTOS", href: "/desarrollos-proyectos" },
  { name: "RRHH", href: "/rrhh" },
  { name: "CONTACTO", href: "/contacto" }
]

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isProjectPage = pathname.startsWith("/desarrollos-proyectos/") && pathname !== "/desarrollos-proyectos"
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationClass, setAnimationClass] = useState("")

  const toggleMenu = () => {
    if (isOpen) {
      // Cerrar menu
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
    }
  }

  return (
    <>
      <header className="header-overlay">
        <div className="content-wrapper">
          {/* Mobile */}
          <div className={`flex md:hidden items-center h-30 ${isHome ? 'justify-between' : 'justify-between'}`}>
                <h1 className={`font-baskerville header-logo-mobile ${isHome || isProjectPage ? 'text-white' : 'text-black'}`}>
                GRUPO FRALI
                </h1>

            <button onClick={toggleMenu} className={isHome || isProjectPage ? 'text-white' : 'text-black'}>
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
              </div>
            ) : (
              <div className="flex justify-between items-center h-14">
                <Link href="/">
                    <h1 className="font-baskerville header-logo text-black pl-3">
                    GRUPO FRALI
                    </h1>
                </Link>
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
              </div>
            )}
          </div>
        </div>

        {/* Título grande en Home */}
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

      {(isOpen || isAnimating) && (
        <div
          className={`fixed inset-0 bg-[#EBEBEB] z-50 md:hidden ${animationClass}`}
        >
          <div className="content-wrapper">
            <h1 className="font-baskerville text-[28px] md:text-base text-[#151714] tracking-[0.68em] pt-14 pb-20">
              GRUPO FRALI
            </h1>
            <ul className="flex flex-col text-[#151714] text-lg divide-y divide-[#151714] border-y border-[#151714]">
              {mobileItems.map((item, index) => {
                const isCurrent = pathname === item.href
                return (
                  <li
                    key={index}
                    className="font-archivo-light py-4 flex justify-between items-center"
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
            <div className="flex justify-between items-center">
              {/* <Link href="/en">
                <h4 className="py-14" onClick={toggleMenu}>EN</h4>
              </Link> */}
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
