"use client"

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Función para scroll suave personalizado
    const smoothScrollTo = (targetPosition: number, duration?: number) => {
      // Si no se especifica duración, usar duración más corta para scroll to top
      if (!duration) {
        duration = targetPosition === 0 ? 600 : 1200
      }
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      const startTime = performance.now()

      const easeInOutQuad = (t: number): number => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      }

      const animation = (currentTime: number) => {
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutQuad(progress)
        
        window.scrollTo(0, startPosition + distance * ease)
        
        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }

    // Interceptar todos los clicks en links con anclas
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href.includes('#')) {
        const url = new URL(link.href)
        const hash = url.hash
        
        if (hash) {
          e.preventDefault()
          const element = document.querySelector(hash)
          if (element) {
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80
            smoothScrollTo(targetPosition)
          }
        }
      }
    }

    // Interceptar scroll programático (como window.scrollTo)
    const originalScrollTo = window.scrollTo
    // @ts-expect-error - Interceptando window.scrollTo temporalmente
    window.scrollTo = function(x: number | ScrollToOptions, y?: number) {
      if (typeof x === 'object' && x !== null) {
        const options = x as ScrollToOptions
        if (options.behavior === 'smooth' || !options.behavior) {
          smoothScrollTo(options.top || 0)
          return
        }
      } else if (typeof x === 'number' && typeof y === 'number') {
        smoothScrollTo(y)
        return
      }
      if (typeof x === 'number' && typeof y === 'number') {
        originalScrollTo.call(window, x, y)
      } else if (typeof x === 'object') {
        originalScrollTo.call(window, x)
      }
    }

    document.addEventListener('click', handleLinkClick)
    
    return () => {
      document.removeEventListener('click', handleLinkClick)
      window.scrollTo = originalScrollTo
    }
  }, [])

  return null
}