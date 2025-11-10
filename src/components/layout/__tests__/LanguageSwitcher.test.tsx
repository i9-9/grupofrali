import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageSwitcher from '../language-switcher'
import { LanguageProvider } from '@/contexts/LanguageContext'
import React from 'react'

// Mock de las traducciones
vi.mock('@/data/translations/es.json', () => ({
  default: {
    common: { navigation: { home: 'INICIO' } },
  },
}))

vi.mock('@/data/translations/en.json', () => ({
  default: {
    common: { navigation: { home: 'HOME' } },
  },
}))

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LanguageProvider>{children}</LanguageProvider>
  )

  it('muestra EN cuando el idioma es español', () => {
    render(<LanguageSwitcher />, { wrapper })
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('cambia el idioma al hacer click', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />, { wrapper })
    
    const button = screen.getByRole('button')
    expect(screen.getByText('EN')).toBeInTheDocument()
    
    await user.click(button)
    
    // Esperar a que el cambio se refleje
    await screen.findByText('ES')
    expect(screen.getByText('ES')).toBeInTheDocument()
  })

  it('tiene el aria-label correcto', () => {
    render(<LanguageSwitcher />, { wrapper })
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Cambiar idioma a inglés')
  })
})



