"use client"

import { useState, useEffect } from 'react';

interface UseCounterAnimationProps {
  targetValue: string;
  isVisible: boolean;
  duration: number;
  delay: number;
}

interface UseCounterAnimationReturn {
  displayValue: string;
}

export function useCounterAnimation({
  targetValue,
  isVisible,
  duration,
  delay
}: UseCounterAnimationProps): UseCounterAnimationReturn {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const targetNum = parseInt(targetValue.replace(/\D/g, ''));
      if (isNaN(targetNum)) {
        setDisplayValue(targetValue);
        return;
      }

      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetNum - startValue) * easeOutQuart);

        setDisplayValue(currentValue.toString());

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(targetValue);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, targetValue, duration, delay]);

  return { displayValue };
}