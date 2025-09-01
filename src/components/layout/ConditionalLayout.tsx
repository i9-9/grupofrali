// components/layout/ConditionalLayout.tsx
'use client'
import { usePathname } from 'next/navigation'
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SmoothScroll from "@/components/SmoothScroll"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Verificar si estamos en la ruta de proyecto específico
  const isProyectoDetailPage = pathname?.match(/^\/desarrollos-proyectos\/[^\/]+$/)

  return (
    <>
      <SmoothScroll />
      <Header />
      {children}
      {!isProyectoDetailPage && <Footer />}
    </>
  )
}
