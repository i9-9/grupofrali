import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import RandomVideo from '../RandomVideo'

describe('RandomVideo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock Math.random para hacer los tests determinísticos
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
  })

  it('renderiza el video después de montarse', async () => {
    const { container } = render(<RandomVideo type="mobile" />)
    // El componente se monta y renderiza inmediatamente en el entorno de test
    // Esperar un poco para que se monte
    await new Promise(resolve => setTimeout(resolve, 150))
    const video = container.querySelector('video')
    // El video debería estar presente después de montarse
    expect(video).toBeInTheDocument()
  })

  it('renderiza video mobile con clases correctas', async () => {
    const videos = [
      { src: '/test-mobile.mp4', poster: '/test-poster.jpg' },
    ]

    const { container } = render(<RandomVideo type="mobile" videos={videos} />)
    
    // Esperar a que se monte
    await new Promise(resolve => setTimeout(resolve, 150))
    
    const video = container.querySelector('video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveClass('md:hidden')
  })

  it('renderiza video desktop con clases correctas', async () => {
    const videos = [
      { src: '/test-desktop.mp4', poster: '/test-poster.jpg' },
    ]

    const { container } = render(<RandomVideo type="desktop" videos={videos} />)
    
    // Esperar a que se monte
    await new Promise(resolve => setTimeout(resolve, 150))
    
    const video = container.querySelector('video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveClass('hidden', 'md:block')
  })

  it('usa videos de fallback cuando no se proporcionan', async () => {
    const { container } = render(<RandomVideo type="mobile" />)
    
    // Esperar a que se monte
    await new Promise(resolve => setTimeout(resolve, 150))
    
    const video = container.querySelector('video')
    expect(video).toBeInTheDocument()
    // Debería usar los videos de fallback
    expect(video?.getAttribute('poster')).toContain('video_mobile')
  })

  it('aplica atributos correctos al video', async () => {
    const videos = [
      { src: '/test.mp4', poster: '/test-poster.jpg' },
    ]

    const { container } = render(<RandomVideo type="desktop" videos={videos} />)
    
    await new Promise(resolve => setTimeout(resolve, 150))
    
    const video = container.querySelector('video')
    expect(video).toHaveAttribute('autoPlay')
    expect(video).toHaveAttribute('muted')
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveAttribute('playsInline')
  })
})

