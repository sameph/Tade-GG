
import { useState, useEffect, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const [ref, setRef] = useState<RefObject<T> | null>(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.1, triggerOnce = false, rootMargin = '0px' } = options;
  
  useEffect(() => {
    if (!ref?.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);
        
        if (isIntersecting && triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, triggerOnce, rootMargin]);
  
  return { ref: setRef as any, inView };
}

export default useInView;
