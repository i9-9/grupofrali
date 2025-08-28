
// components/layout/ConditionalLayout.tsx
'use client'
import { usePathname } from 'next/navigation'
import { useTranslations } from "@/hooks/useTranslations"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SmoothScroll from "@/components/SmoothScroll"
import Loader from "@/components/ui/Loader"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const { isLoading, isReady } = useTranslations()
  
  // Verificar si estamos en la ruta de proyecto específico
  const isProyectoDetailPage = pathname?.match(/^\/desarrollos-proyectos\/[^\/]+$/)

  // Mostrar loader mientras las traducciones no estén listas
  if (isLoading || !isReady) {
    return <Loader />
  }

  return (
    <>
      <SmoothScroll />
      <Header />
      {children}
      {!isProyectoDetailPage && <Footer />}
    </>
  )
}