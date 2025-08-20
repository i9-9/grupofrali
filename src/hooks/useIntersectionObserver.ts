import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Dejar de vigilar
        }
      },
      {
        threshold: 0.3, // 30% visible, se activa.
        rootMargin: '0px 0px -50px 0px' // 50px antes de ser visible
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}