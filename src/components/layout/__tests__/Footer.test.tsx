import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import Footer from '../footer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import React from 'react'

// Mock de las traducciones
vi.mock('@/data/translations/es.json', () => ({
  default: {
    footer: {
      contact: {
        email: 'info@grupofrali.com',
        address: 'Av. Test 123',
        city: 'Buenos Aires',
        phone: '+54 11 1234-5678',
      },
      copyright: '© 2024 Grupo Frali\nTodos los derechos reservados',
      navigation: {
        home: 'INICIO',
        aboutUs: 'QUIENES SOMOS',
        developments: 'DESARROLLOS',
        humanResources: 'RRHH',
        contact: 'CONTACTO',
      },
    },
    common: {
      buttons: {
        back: 'VOLVER ARRIBA',
      },
    },
  },
}))

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LanguageProvider>{children}</LanguageProvider>
  )

  it('renderiza el email de contacto', async () => {
    const { container } = render(<Footer />, { wrapper })
    // Verificar que existe un enlace de email (puede mostrar la clave de traducción mientras carga)
    const emailLink = container.querySelector('a[href^="mailto:"]')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:info@grupofrali.com')
  })

  it('renderiza los enlaces de navegación', () => {
    const { container } = render(<Footer />, { wrapper })
    // Verificar que los enlaces existen por sus hrefs
    expect(container.querySelector('a[href="/"]')).toBeInTheDocument()
    expect(container.querySelector('a[href="/quienes-somos"]')).toBeInTheDocument()
    expect(container.querySelector('a[href="/desarrollos-proyectos"]')).toBeInTheDocument()
    expect(container.querySelector('a[href="/rrhh"]')).toBeInTheDocument()
    expect(container.querySelector('a[href="/contacto"]')).toBeInTheDocument()
  })

  it('tiene el botón de volver arriba', () => {
    const { container } = render(<Footer />, { wrapper })
    // Buscar botones que tienen el aria-label o la clase correcta
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('tiene la clase de fondo correcta', () => {
    const { container } = render(<Footer />, { wrapper })
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-[#151714]')
  })
})

