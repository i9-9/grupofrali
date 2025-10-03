import { useState, useEffect, useRef } from 'react';

interface UseCounterAnimationProps {
  targetValue: string;
  isVisible: boolean;
  duration?: number;
  delay?: number;
  projectId?: string;
}

export const useCounterAnimation = ({ 
  targetValue, 
  isVisible, 
  duration = 2000, 
  delay = 0,
  projectId
}: UseCounterAnimationProps) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const hasAnimatedRef = useRef(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  // Usar refs para valores que no deben causar re-ejecución del efecto
  const targetValueRef = useRef(targetValue);
  const durationRef = useRef(duration);
  const delayRef = useRef(delay);
  
  // Actualizar refs cuando cambien los valores
  useEffect(() => {
    targetValueRef.current = targetValue;
    durationRef.current = duration;
    delayRef.current = delay;
  }, [targetValue, duration, delay]);

  // Reset cuando cambia el proyecto
  useEffect(() => {
    hasAnimatedRef.current = false;
    setDisplayValue('0');
    setIsAnimationComplete(false);
    
    // Limpiar cualquier animación en curso
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [projectId]);

  useEffect(() => {
    if (!isVisible || hasAnimatedRef.current) {
      return;
    }

    // Extraer número del valor target
    const extractNumber = (str: string): number => {
      const cleanStr = str.replace(/\s+/g, '').toLowerCase();
      
      if (cleanStr.includes('mm')) {
        const num = parseFloat(cleanStr.replace(/[^\d.]/g, ''));
        return num;
      }
      
      if (cleanStr.includes('k')) {
        const num = parseFloat(cleanStr.replace(/[^\d.]/g, ''));
        return num;
      }
      
      if (cleanStr.startsWith('+') || cleanStr.includes('.')) {
        const withoutPlus = cleanStr.replace('+', '');
        const num = parseFloat(withoutPlus.replace(/\./g, ''));
        return num;
      }
      
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
      
      const roundedNum = Math.round(num);
      
      if (roundedNum >= 1000 && !suffix) {
        return `${prefix}${roundedNum.toLocaleString()}${suffix}`;
      }
      
      return `${prefix}${roundedNum}${suffix}`;
    };

    const currentTargetValue = targetValueRef.current;
    const currentDuration = durationRef.current;
    const currentDelay = delayRef.current;

    const targetNum = extractNumber(currentTargetValue);
    
    if (targetNum === 0) {
      setDisplayValue(currentTargetValue);
      setIsAnimationComplete(true);
      hasAnimatedRef.current = true;
      return;
    }

    hasAnimatedRef.current = true;

    const effectiveDuration = Math.max(100, currentDuration - currentDelay);

    timeoutRef.current = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / effectiveDuration, 1);
        
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentValue = startValue + (targetNum - startValue) * easeOutExpo;
        
        setDisplayValue(formatNumber(currentValue, currentTargetValue));
        
        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(currentTargetValue);
          setIsAnimationComplete(true);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }, currentDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, projectId]); // Solo depende de isVisible y projectId

  return { displayValue, isAnimationComplete };
};