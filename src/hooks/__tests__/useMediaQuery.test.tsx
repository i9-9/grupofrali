import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useMediaQuery, useIsMobile, useIsDesktop } from '../useMediaQuery'

describe('useMediaQuery', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockMatchMedia = vi.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('retorna false cuando la media query no coincide', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('retorna true cuando la media query coincide', () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('actualiza cuando cambia la media query', async () => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = []
    const mockRemoveListener = vi.fn()
    
    const mockMediaQueryList = {
      matches: false,
      addEventListener: vi.fn((event: string, callback: (e: MediaQueryListEvent) => void) => {
        if (event === 'change' && typeof callback === 'function') {
          listeners.push(callback)
        }
      }),
      removeEventListener: mockRemoveListener,
      addListener: vi.fn((callback: (e: MediaQueryListEvent) => void) => {
        if (typeof callback === 'function') {
          listeners.push(callback)
        }
      }),
      removeListener: vi.fn(),
    }

    mockMatchMedia.mockReturnValue(mockMediaQueryList as unknown as MediaQueryList)

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    // Esperar a que se registre el listener
    await waitFor(() => {
      expect(listeners.length).toBeGreaterThan(0)
    })

    // Simular cambio en la media query llamando directamente a los listeners
    const event = {
      matches: true,
      media: '(min-width: 768px)',
    } as MediaQueryListEvent

    act(() => {
      listeners.forEach((listener) => {
        if (typeof listener === 'function') {
          listener(event)
        }
      })
    })

    await waitFor(() => {
      expect(result.current).toBe(true)
    }, { timeout: 1000 })
  })
})

describe('useIsMobile', () => {
  it('usa la query correcta para mobile', () => {
    const mockMatchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })

    renderHook(() => useIsMobile())
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })
})

describe('useIsDesktop', () => {
  it('usa la query correcta para desktop', () => {
    const mockMatchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })

    renderHook(() => useIsDesktop())
    expect(mockMatchMedia).toHaveBeenCalledWith('(min-width: 768px)')
  })
})

