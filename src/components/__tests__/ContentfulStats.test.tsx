import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContentfulStats from '../ContentfulStats'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ContentfulStatistic } from '@/lib/contentful'
import React from 'react'

// Mock de los hooks
vi.mock('@/hooks/useTranslations', () => ({
  useTranslations: () => ({
    language: 'es',
  }),
}))

vi.mock('@/components/StatItem', () => ({
  StatItem: ({ number, label }: { number: string; label: string }) => (
    <div data-testid="stat-item">
      <span>{number}</span>
      <span>{label}</span>
    </div>
  ),
}))

// Mock de las traducciones
vi.mock('@/data/translations/es.json', () => ({
  default: {
    home: {
      stats: {
        totalAssets: 'Activos Totales',
        projectsDelivered: 'Proyectos Entregados',
      },
    },
  },
}))

describe('ContentfulStats', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LanguageProvider>{children}</LanguageProvider>
  )

  const mockStatistics: ContentfulStatistic[] = [
    {
      sys: { id: 'stat-1', type: 'Entry' },
      fields: {
        value: '300',
        unit: 'MMUSD',
        unitEn: 'MMUSD',
        label: 'Activos Totales',
        labelEn: 'Total Assets',
        displayOrder: 0,
        isActive: true,
      },
    },
    {
      sys: { id: 'stat-2', type: 'Entry' },
      fields: {
        value: '14',
        unit: '',
        unitEn: '',
        label: 'Proyectos Entregados',
        labelEn: 'Projects Delivered',
        displayOrder: 1,
        isActive: true,
      },
    },
  ]

  it('muestra estado de carga cuando no hay estadísticas', () => {
    const { container } = render(<ContentfulStats />, { wrapper })
    const skeleton = container.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
  })

  it('renderiza las estadísticas cuando se proporcionan', () => {
    render(<ContentfulStats statistics={mockStatistics} />, { wrapper })
    expect(screen.getByText('300')).toBeInTheDocument()
    expect(screen.getByText('14')).toBeInTheDocument()
    expect(screen.getByText('Activos Totales')).toBeInTheDocument()
    expect(screen.getByText('Proyectos Entregados')).toBeInTheDocument()
  })

  it('respeta maxStats', () => {
    const { container } = render(
      <ContentfulStats statistics={mockStatistics} maxStats={1} />,
      { wrapper }
    )
    const statItems = container.querySelectorAll('[data-testid="stat-item"]')
    expect(statItems.length).toBe(1)
  })

  it('respeta startIndex', () => {
    render(
      <ContentfulStats statistics={mockStatistics} startIndex={1} maxStats={1} />,
      { wrapper }
    )
    // Debería mostrar solo la segunda estadística
    expect(screen.getByText('14')).toBeInTheDocument()
    expect(screen.queryByText('300')).not.toBeInTheDocument()
  })

  it('retorna null cuando no hay estadísticas', () => {
    const { container } = render(<ContentfulStats statistics={[]} />, { wrapper })
    expect(container.firstChild).toBeNull()
  })
})

