import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatItem } from '../StatItem'

// Mock de los hooks
vi.mock('@/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: () => ({
    ref: null,
    isVisible: true,
  }),
}))

vi.mock('@/hooks/useCounterAnimation', () => ({
  useCounterAnimation: () => ({
    displayValue: '100',
    isAnimationComplete: true,
  }),
}))

describe('StatItem', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renderiza el número y label correctamente', () => {
    render(
      <StatItem
        number="100"
        label="Proyectos completados"
        isVisible={true}
      />
    )

    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('Proyectos completados')).toBeInTheDocument()
  })

  it('renderiza la unidad cuando se proporciona', () => {
    render(
      <StatItem
        number="50"
        unit="MMUSD"
        label="Inversión total"
        isVisible={true}
      />
    )

    // El mock siempre devuelve '100', así que verificamos que existe el componente y el label
    expect(screen.getByText('Inversión total')).toBeInTheDocument()
    // Verificamos que la unidad MMUSD está presente
    expect(screen.getByText('MM')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  it('aplica clases de delay cuando se proporcionan', () => {
    const { container } = render(
      <StatItem
        number="200"
        label="Test"
        delay="delay-1"
        lineDelay="line-delay-1"
        isVisible={true}
      />
    )

    const statElement = container.querySelector('.stat-line')
    expect(statElement).toHaveClass('line-delay-1')
  })
})

