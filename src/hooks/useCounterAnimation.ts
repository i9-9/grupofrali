import { useState, useEffect, useRef } from 'react';

interface UseCounterAnimationProps {
  targetValue: string;
  isVisible: boolean;
  duration?: number;
  delay?: number;
  projectId?: string; // Agregar projectId para resetear solo cuando cambia el proyecto
}

export const useCounterAnimation = ({ 
  targetValue, 
  isVisible, 
  duration = 2000, 
  delay = 0,
  projectId
}: UseCounterAnimationProps) => {
  const [displayValue, setDisplayValue] = useState('0');
  const hasAnimatedRef = useRef(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!isVisible || hasAnimatedRef.current) return;

    // Extraer número del valor target (maneja casos como "300 MM", "+300", "7800", etc.)
    const extractNumber = (str: string): number => {
      // Remover espacios y convertir a minúsculas para procesamiento
      const cleanStr = str.replace(/\s+/g, '').toLowerCase();
      
      // Casos especiales para formateo
      if (cleanStr.includes('mm')) {
        const num = parseFloat(cleanStr.replace(/[^\d.]/g, ''));
        return num;
      }
      
      if (cleanStr.includes('k')) {
        const num = parseFloat(cleanStr.replace(/[^\d.]/g, ''));
        return num;
      }
      
      // Para números con + al inicio o números con puntos como separadores de miles
      if (cleanStr.startsWith('+') || cleanStr.includes('.')) {
        // Remover el + y tratar puntos como separadores de miles (removerlos)
        const withoutPlus = cleanStr.replace('+', '');
        const num = parseFloat(withoutPlus.replace(/\./g, ''));
        return num;
      }
      
      // Para números normales, extraer solo los dígitos
      const num = parseFloat(cleanStr.replace(/[^\d]/g, ''));
      return isNaN(num) ? 0 : num;
    };

    const getPrefix = (str: string): string => {
      return str.startsWith('+') ? '+' : '';
    };

    const getSuffix = (str: string): string => {
      const cleanStr = str.replace(/\s+/g, '').toLowerCase();
      if (cleanStr.includes('mm')) return ' MM';
      if (cleanStr.includes('k')) return 'K';
      return '';
    };

    const formatNumber = (num: number, originalStr: string): string => {
      const prefix = getPrefix(originalStr);
      const suffix = getSuffix(originalStr);
      
      // Siempre redondear a entero durante la animación
      const roundedNum = Math.round(num);
      
      // Para números enteros grandes, agregar comas cada 3 dígitos
      if (roundedNum >= 1000 && !suffix) {
        return `${prefix}${roundedNum.toLocaleString()}${suffix}`;
      }
      
      return `${prefix}${roundedNum}${suffix}`;
    };

    const targetNum = extractNumber(targetValue);
    
    if (targetNum === 0) {
      setDisplayValue(targetValue);
      hasAnimatedRef.current = true;
      return;
    }

    hasAnimatedRef.current = true;

    // Interpretar `duration` como tiempo total hasta finalizar (incluye el delay)
    // Para que todos terminen juntos: duración efectiva = duration - delay
    const effectiveDuration = Math.max(100, duration - delay);

    timeoutRef.current = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / effectiveDuration, 1);
        
        // Usar easing function para suavizar la animación
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentValue = startValue + (targetNum - startValue) * easeOutExpo;
        
        setDisplayValue(formatNumber(currentValue, targetValue));
        
        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(targetValue); // Asegurar valor final exacto
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, targetValue, duration, delay]);

  // Reset cuando cambia el proyecto
  useEffect(() => {
    hasAnimatedRef.current = false;
    setDisplayValue('0');
  }, [projectId]);

  return { displayValue };
};