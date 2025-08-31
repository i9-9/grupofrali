'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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

  useEffect(() => {
    const loadTranslations = async () => {
      console.log(`🔄 Cargando traducciones para: ${language}`)
      setIsLoading(true)
      setIsReady(false)
      
      let success = false
      try {
        const translationModule = await import(`@/data/translations/${language}.json`)
        setTranslations(translationModule.default)
        success = true
        console.log(`✅ Traducciones cargadas para: ${language}`)
      } catch (error) {
        console.error(`❌ Error loading translations for ${language}:`, error)
        success = false
      } finally {
        setIsLoading(false)
        setIsReady(success)
        console.log(`🏁 isLoading: false, isReady: ${success}`)
      }
    }

    loadTranslations()
  }, [language])

  useEffect(() => {
    // Recuperar idioma del localStorage al cargar
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    
    // Actualizar el atributo lang del HTML
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key // Retornar la clave si no se encuentra la traducción
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  const getValue = (key: string): unknown => {
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
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getValue, isLoading, isReady }}>
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
