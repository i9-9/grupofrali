'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  getValue: (key: string) => unknown
  isLoading: boolean
  isReady: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')
  const [translations, setTranslations] = useState<Record<string, unknown>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Marcar cuando estamos en el cliente para evitar problemas de hidratación
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true)
      setIsReady(false)

      let success = false
      try {
        const translationModule = await import(`@/data/translations/${language}.json`)
        setTranslations(translationModule.default)
        success = true
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ Traducciones cargadas para: ${language}`)
        }
      } catch (error) {
        console.error(`Error loading translations for ${language}:`, error)
        success = false
      } finally {
        setIsLoading(false)
        setIsReady(success)
      }
    }

    loadTranslations()
  }, [language])

  useEffect(() => {
    // Solo recuperar idioma del localStorage cuando estemos en el cliente
    if (isClient) {
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage)
      }
    }
  }, [isClient])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)

    // Actualizar el atributo lang del HTML
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [])

  const t = useCallback((key: string): string => {
    // Si las traducciones no están listas, retornar string vacío para evitar mostrar keys
    if (!isReady || isLoading) {
      return ''
    }

    const keys = key.split('.')
    let value: unknown = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        // En desarrollo, retornar la key para debug; en producción, string vacío
        if (process.env.NODE_ENV === 'development') {
          return key
        }
        return ''
      }
    }

    return typeof value === 'string' ? value : (process.env.NODE_ENV === 'development' ? key : '')
  }, [translations, isReady, isLoading])

  const getValue = useCallback((key: string): unknown => {
    const keys = key.split('.')
    let value: unknown = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return undefined
      }
    }

    return value
  }, [translations])

  const contextValue = useMemo(
    () => ({ language, setLanguage, t, getValue, isLoading, isReady }),
    [language, setLanguage, t, getValue, isLoading, isReady]
  )

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
