'use client'

import { useCounterAnimation } from "@/hooks/useCounterAnimation"

interface ProjectStatisticProps {
  statKey: string
  value: string
  index: number
  isVisible: boolean
  projectId: string
}

export default function ProjectStatistic({ 
  statKey, 
  value, 
  index, 
  isVisible,
  projectId
}: ProjectStatisticProps) {
  // Función simplificada para parsear estadísticas con 4 tipos claros
  const parseValue = (val: string) => {
    const str = val.toString().trim()
    
    // Caso especial para códigos de zonificación como "T6-360" - MOVER ARRIBA
    const zonificacion = str.match(/^(T\d+-\d+)$/i)
    if (zonificacion) {
      return { 
        isTextOnly: false,
        number: str, // Todo el código se trata como número
        text: '',
        unit: ''
      }
    }
    
    // Tipo 1: TEXTO - Solo texto sin números al inicio
    if (isNaN(Number(str.charAt(0))) && !str.match(/^\d/) && !str.match(/^T\d/i)) {
      return { 
        isTextOnly: true,
        number: '',
        text: str,
        unit: ''
      }
    }
    
    // Caso especial: "100% COMERCIALIZADO Y HABITADO" debe tratarse como texto completo
    if (str === "100% COMERCIALIZADO Y HABITADO") {
      return { 
        isTextOnly: true,
        number: '',
        text: str,
        unit: ''
      }
    }
    
    // Caso especial para porcentajes con texto
    const porcentajeConTexto = str.match(/^([\d,.]+%)\s+(.+)$/)
    if (porcentajeConTexto) {
      return { 
        isTextOnly: false,
        number: porcentajeConTexto[1],
        text: porcentajeConTexto[2],
        unit: ''
      }
    }
    
    // Tipo 2: NUMERO - Solo números (incluyendo decimales y porcentajes)
    const soloNumero = str.match(/^([\d,.]+[%]?)$/)
    if (soloNumero) {
      return { 
        isTextOnly: false,
        number: soloNumero[1],
        text: '',
        unit: ''
      }
    }
    
    // Tipo 3: NUMERO CON UNIDAD - Número seguido de unidad técnica corta
    const numeroConUnidad = str.match(/^([\d,.]+)\s+(MW|GWH|KWH|M²|H|KG|TON|€|USD|\$)$/i)
    if (numeroConUnidad) {
      return { 
        isTextOnly: false,
        number: numeroConUnidad[1],
        unit: numeroConUnidad[2],
        text: ''
      }
    }
    
    // Caso especial para "HOYOS" y "ESTRELLAS" - número arriba, texto abajo
    const hoyosEstrellas = str.match(/^(\d+)\s+(HOYOS?|ESTRELLAS?)$/i)
    if (hoyosEstrellas) {
      return { 
        isTextOnly: false,
        number: hoyosEstrellas[1],
        text: hoyosEstrellas[2],
        unit: ''
      }
    }
    
    // Tipo 4: NUMERO CON TEXTO - Número seguido de texto descriptivo
    const numeroConTexto = str.match(/^([\d,.]+)\s+(.+)$/)
    if (numeroConTexto) {
      return { 
        isTextOnly: false,
        number: numeroConTexto[1],
        text: numeroConTexto[2],
        unit: ''
      }
    }
    
    // Fallback: tratar como número
    return { 
      isTextOnly: false,
      number: str,
      text: '',
      unit: ''
    }
  }

  const parsed = parseValue(value.toString())

  // Hook de animación de conteo para números
  const { displayValue } = useCounterAnimation({
    targetValue: parsed.number,
    isVisible: isVisible,
    duration: 3000,
    delay: index * 200, // 200ms entre cada estadística
    projectId: projectId // Pasar el projectId para resetear solo cuando cambia el proyecto
  })

  // Función para crear delay class según el índice
  const getLineDelayClass = (index: number) => {
    return `project-stats-line-delay-${index + 1}`
  }

  const className = `pt-3 pb-2 flex justify-between items-start min-h-[60px] md:min-h-[20px] project-stats-line ${getLineDelayClass(index)} ${isVisible ? 'animate' : ''} ${parsed.isTextOnly ? 'text-only' : ''}`
  
  return (
    <div className={className}>
      <div className="font-archivo text-black uppercase max-w-[50%] self-start" style={{ 
        wordBreak: 'break-word',
        fontSize: 'clamp(13.49px, 1.2vw, 12.56px)',
        lineHeight: 'clamp(14.84px, 1.3vw, 13.82px)',
        letterSpacing: '0%'
      }}>
        {statKey.replace(/_/g, ' ').split(' ').map((word, index) => (
          <span key={index}>
            {word}
            {index === 1 && <br />}
            {index > 1 && index < statKey.replace(/_/g, ' ').split(' ').length - 1 && ' '}
            {index === 0 && index < statKey.replace(/_/g, ' ').split(' ').length - 1 && ' '}
          </span>
        ))}
      </div>
      <div className="text-right self-center max-w-[45%]">
        {parsed.isTextOnly ? (
          <div className="font-archivo text-black uppercase tracking-wider leading-none break-words md:text-[0.8rem]" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 'clamp(14px, 2.5vw, 16px)' : undefined }}>
            {parsed.text === "100% COMERCIALIZADO Y HABITADO" ? (
              <>
                100%<br />
                COMERCIALIZADO Y<br />
                HABITADO
              </>
            ) : (
              parsed.text
            )}
          </div>
        ) : parsed.text && (parsed.text.toUpperCase() === 'HOYOS' || parsed.text.toUpperCase() === 'ESTRELLAS') ? (
          // Caso especial para HOYOS y ESTRELLAS - número arriba, texto abajo
          <>
            <span className="font-archivo text-black font-archivo-light leading-none" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '2.5rem' : '1.875rem' }}>
              {displayValue}
            </span>
            <div className="font-archivo text-black uppercase tracking-wider leading-none md:text-[0.8rem]" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 'clamp(14px, 3vw, 20px)' : undefined }}>
              {parsed.text}
            </div>
          </>
        ) : (
          // Caso normal - número y unidad/texto
          <div className="flex flex-col items-end">
            {parsed.unit ? (
              // Número con unidad en línea
              <div className="flex items-baseline gap-1">
                <span className="font-archivo text-black font-archivo-light leading-none" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '2.5rem' : '1.875rem' }}>
                  {displayValue}
                </span>
                <span className="font-archivo text-black uppercase tracking-wider leading-none md:text-[0.8rem]" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 'clamp(14px, 3vw, 20px)' : undefined }}>
                  {parsed.unit}
                </span>
              </div>
            ) : parsed.text ? (
              // Número arriba, texto abajo
              <>
                <span className="font-archivo text-black font-archivo-light leading-none" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '2.5rem' : '1.875rem' }}>
                  {displayValue}
                </span>
                <div className="font-archivo text-black uppercase tracking-wider leading-none md:text-[0.8rem]" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 'clamp(14px, 2.5vw, 16px)' : undefined }}>
                  {parsed.text}
                </div>
              </>
            ) : (
              // Solo número
              <span className="font-archivo text-black font-archivo-light leading-none" style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '2.5rem' : '1.875rem' }}>
                {displayValue}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
