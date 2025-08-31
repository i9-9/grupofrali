
// components/layout/ConditionalLayout.tsx
'use client'
import { useState, useEffect } from 'react'
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
  const [showLoader, setShowLoader] = useState(true)
  
  const [mounted, setMounted] = useState(false)
  
  // Verificar si estamos en la ruta de proyecto específico
  const isProyectoDetailPage = pathname?.match(/^\/desarrollos-proyectos\/[^\/]+$/)

  // Marcar como montado cuando el componente se monta
  useEffect(() => {
    setMounted(true)
  }, [])

  // Ocultar loader cuando las traducciones estén listas
  useEffect(() => {
    console.log('🔍 ConditionalLayout Debug:', { isReady, isLoading, showLoader, mounted })
    
    if (mounted && isReady && !isLoading) {
      console.log('✅ Condiciones cumplidas - ocultando loader en 500ms')
      const timer = setTimeout(() => {
        setShowLoader(false)
        console.log('🎯 Loader ocultado')
      }, 500)
      
      return () => clearTimeout(timer)
    }
    
    // Timeout de emergencia por si algo falla
    if (mounted) {
      const emergencyTimer = setTimeout(() => {
        console.log('⚠️ Timeout de emergencia - ocultando loader después de 5 segundos')
        setShowLoader(false)
      }, 5000)
      
      return () => clearTimeout(emergencyTimer)
    }
  }, [isReady, isLoading, mounted, showLoader])

  if (showLoader) {
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