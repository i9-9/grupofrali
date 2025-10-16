import React from 'react'

/**
 * Función utilitaria para renderizar títulos con soporte para múltiples tipos de separadores
 * Detecta diferentes tipos de separadores: \n, \\n, |, y espacios múltiples
 * 
 * @param titulo - El título a renderizar
 * @returns JSX.Element o string según si necesita saltos de línea
 */
export const renderTitle = (titulo: string): React.ReactNode => {
  if (!titulo) return ''
  
  // Detectar diferentes tipos de separadores: \n, \\n, |, y espacios múltiples
  const lines = titulo.split(/\n|\\n|\|/)
  
  if (lines.length === 1) {
    return titulo
  }
  
  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {line.trim()}
          {lineIndex < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  )
}
