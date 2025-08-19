import React from "react";

interface StatItemProps {
  number: string;
  unit?: string;
  label: string;
  delay?: string;
}

export function StatItem({ number, unit, label, delay }: StatItemProps) {
  return (
    <div className="border-t border-black pt-1 mb-1 w-full flex">
      {/* Contenedor que asegura separación entre número y label */}
      <div className="flex justify-between items-start w-full">
        
        {/* Número pegado al margen izquierdo */}
        <div
          className={`text-stat-number text-black stat-number-animated ${delay}`}
        >
          {number}
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
