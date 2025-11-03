import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTranslations } from '../useTranslations'
import { LanguageProvider } from '@/contexts/LanguageContext'
import React from 'react'

// Mock de las traducciones
vi.mock('@/data/translations/es.json', () => ({
  default: {
    common: {
      navigation: {
        home: 'INICIO',
        about: 'QUIENES SOMOS',
      },
    },
  },
}))

vi.mock('@/data/translations/en.json', () => ({
  default: {
    common: {
      navigation: {
        home: 'HOME',
        about: 'ABOUT US',
      },
    },
  },
}))

describe('useTranslations', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('retorna funciones y valores básicos', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    )

    const { result } = renderHook(() => useTranslations(), { wrapper })

    // Verificar que todas las propiedades esperadas existen
    expect(result.current).toHaveProperty('t')
    expect(result.current).toHaveProperty('language')
    expect(result.current).toHaveProperty('setLanguage')
    expect(result.current).toHaveProperty('isSpanish')
    expect(result.current).toHaveProperty('isEnglish')
    expect(typeof result.current.t).toBe('function')
    expect(typeof result.current.setLanguage).toBe('function')
  })

  it('detecta correctamente el idioma español', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    )

    const { result } = renderHook(() => useTranslations(), { wrapper })

    // El idioma por defecto debería ser español
    expect(result.current.language).toBe('es')
    expect(result.current.isSpanish).toBe(true)
    expect(result.current.isEnglish).toBe(false)
  })
})

