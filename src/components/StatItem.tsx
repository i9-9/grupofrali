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
}

export function StatItem({ number, unit, label, delay, lineDelay }: StatItemProps) {

  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  }); 

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
    duration: 1500, // 1.5 segundos para la animación de conteo
    delay: counterDelay
  });

  return (
    <div
      ref={ref}
      className={`pt-1 mb-1 w-full flex stat-line ${lineDelay} ${isVisible ? 'animate' : ''}`}
    >
      {/* Contenedor que asegura separación entre número y label */}
      <div className="flex justify-between items-start w-full">
        
        {/* Número pegado al margen izquierdo */}
        <div
          className={`text-stat-number text-black stat-number-animated ${delay} ${isVisible ? 'animate' : '' }`}
        >
          {displayValue}
          {unit && <span className="text-stat-unit">{unit}</span>}
        </div>

        {/* Label alineado a la izquierda, pero al borde derecho */}
        <div className="text-small-archivo text-black text-left w-[160px]">
          {label}
        </div>
      </div>
    </div>
  );
}