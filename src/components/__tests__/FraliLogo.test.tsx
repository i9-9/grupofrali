import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import FraliLogo from '../FraliLogo'

describe('FraliLogo', () => {
  it('renderiza correctamente con props por defecto', () => {
    const { container } = render(<FraliLogo />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 1463 74')
  })

  it('aplica className correctamente', () => {
    const { container } = render(<FraliLogo className="test-class" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('test-class')
  })

  it('aplica color personalizado', () => {
    const { container } = render(<FraliLogo color="#FF0000" />)
    const paths = container.querySelectorAll('path')
    expect(paths.length).toBeGreaterThan(0)
    paths.forEach(path => {
      expect(path).toHaveAttribute('fill', '#FF0000')
    })
  })

  it('aplica width y height cuando se proporcionan', () => {
    const { container } = render(<FraliLogo width={200} height={100} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '200')
    expect(svg).toHaveAttribute('height', '100')
  })

  it('aplica estilos personalizados', () => {
    const customStyle = { marginTop: '20px' }
    const { container } = render(<FraliLogo style={customStyle} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveStyle({ marginTop: '20px' })
  })
})

