"use client"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import React from "react";

interface StatItemProps {
  number: string;
  unit?: string;
  label: string;
  delay?: string;
  lineDelay?: string;
  isVisible?: boolean;
}

export function StatItem({ number, unit, label, delay, lineDelay, isVisible: parentIsVisible }: StatItemProps) {

  const { ref, isVisible: localIsVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  });

  // Usar la visibilidad del padre si está disponible, sino usar la local
  const isVisible = parentIsVisible !== undefined ? parentIsVisible : localIsVisible; 

  // Extraer delay numérico para la animación de conteo
  const getDelayFromClass = (delayClass?: string): number => {
    if (!delayClass) return 0;
    const match = delayClass.match(/delay-(\d+)/);
    if (match) {
      const delayNumber = parseInt(match[1]);
      // Convertir delay-1 -> 300ms, delay-2 -> 600ms, etc.
      return delayNumber * 300;
    }
    return 0;
  };

  const counterDelay = getDelayFromClass(delay);
  
  // Usar el hook de animación de conteo
  const { displayValue } = useCounterAnimation({
    targetValue: number,
    isVisible,
    // Duración total fija (incluye delay) para que todos terminen juntos
    duration: 3000,
    delay: counterDelay
  });

  return (
    <div
      ref={parentIsVisible !== undefined ? undefined : ref}
      className={`pt-4 md:pt-4 mb-8 md:mb-12 w-full flex stat-line ${lineDelay} ${isVisible ? 'animate' : ''}`}
    >
      {/* Contenedor que asegura separación entre número y label */}
      <div className="flex items-start w-full">
        
        {/* Número pegado al margen izquierdo */}
        <div
          className={`text-stat-number text-black stat-number-animated ${delay} ${isVisible ? 'animate' : '' }`}
          style={{ 
            lineHeight: '1', 
            verticalAlign: 'top',
            marginTop: '-10px'
          }}
        >
          {displayValue}
          {unit && (
            <>
              {unit === 'MMUSD' ? (
                <>
                  <span className="text-stat-number">MM</span>
                  <span className="text-stat-unit" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)', verticalAlign: 'sub' }}>USD</span>
                </>
              ) : (
                <span className="text-stat-unit">{unit}</span>
              )}
            </>
          )}
        </div>

        {/* Spacer para empujar el label al borde derecho */}
        <div className="flex-1"></div>

        {/* Label alineado al borde derecho con text-left */}
        <div 
          className="text-small-archivo text-black text-left"
          style={{
            width: 'clamp(120px, 10.6vw, 160px)',
            lineHeight: '1',
            verticalAlign: 'top'
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}