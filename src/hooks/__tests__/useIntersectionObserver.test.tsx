import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIntersectionObserver } from '../useIntersectionObserver'

describe('useIntersectionObserver', () => {
  let mockIntersectionObserver: {
    observe: ReturnType<typeof vi.fn>
    unobserve: ReturnType<typeof vi.fn>
    disconnect: ReturnType<typeof vi.fn>
  }
  let mockObserve: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockObserve = vi.fn()
    mockIntersectionObserver = {
      observe: mockObserve,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }

    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn((callback) => {
      // Simular que el elemento es visible inmediatamente
      setTimeout(() => {
        callback([
          {
            isIntersecting: true,
            intersectionRatio: 1,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: {} as DOMRectReadOnly,
            target: {} as Element,
            time: 0,
          },
        ] as IntersectionObserverEntry[])
      }, 0)

      return mockIntersectionObserver as unknown as IntersectionObserver
    }) as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('retorna ref e isVisible', () => {
    const { result } = renderHook(() => useIntersectionObserver())

    expect(result.current).toHaveProperty('ref')
    expect(result.current).toHaveProperty('isVisible')
    expect(typeof result.current.ref).toBe('object')
    expect(typeof result.current.isVisible).toBe('boolean')
  })

  it('puede asignar un elemento al ref', () => {
    const { result } = renderHook(() => useIntersectionObserver())

    // Crear un elemento y asignarlo al ref
    const div = document.createElement('div')
    result.current.ref.current = div

    // Verificar que el ref se asignó correctamente
    expect(result.current.ref.current).toBe(div)
  })

  it('acepta opciones personalizadas', () => {
    const { result } = renderHook(() =>
      useIntersectionObserver({
        threshold: 0.5,
        rootMargin: '10px',
        triggerOnce: false,
      })
    )

    // Verificar que el hook se inicializa correctamente con opciones personalizadas
    expect(result.current).toHaveProperty('ref')
    expect(result.current).toHaveProperty('isVisible')
  })
})

