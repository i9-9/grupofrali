'use client'

import { useTranslations } from '@/hooks/useTranslations'
import { ReactNode } from 'react'

interface TranslationLoaderProps {
  children: ReactNode
  fallback?: ReactNode
  showSkeleton?: boolean
}

/**
 * Componente wrapper que oculta el contenido hasta que las traducciones estén cargadas.
 * Útil para evitar que se vean los keys de traducción durante la carga inicial.
 * 
 * Mejorado para reducir layout shift: muestra contenido con opacidad reducida mientras carga
 * en lugar de ocultarlo completamente.
 */
export default function TranslationLoader({ 
  children, 
  fallback = null,
  showSkeleton = false 
}: TranslationLoaderProps) {
  const { isReady, isLoading } = useTranslations()

  // Si está cargando y no está listo, mostrar fallback o skeleton
  if (isLoading || !isReady) {
    if (showSkeleton) {
      return (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      )
    }
    // Show fallback or children with reduced opacity to maintain layout
    if (fallback) {
      return <>{fallback}</>
    }
    // Show children with reduced opacity to prevent layout shift
    return (
      <div style={{ opacity: 0.3, pointerEvents: 'none' }} aria-hidden="true">
        {children}
      </div>
    )
  }

  return <>{children}</>
}

