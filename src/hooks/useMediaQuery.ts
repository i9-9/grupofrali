import { useState, useEffect } from 'react'

/**
 * Hook optimizado para media queries que evita múltiples window.innerWidth checks
 * Usa ResizeObserver para mejor performance
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Set initial value
    setMatches(media.matches)
    
    // Modern approach with addEventListener
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }
    
    // Use addEventListener if available (modern browsers)
    if (media.addEventListener) {
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    } else {
      // Fallback for older browsers
      media.addListener(listener)
      return () => media.removeListener(listener)
    }
  }, [query])

  return matches
}

/**
 * Hook específico para mobile (< 768px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)')
}

/**
 * Hook específico para desktop (>= 768px)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 768px)')
}

