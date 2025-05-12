
import React, { useEffect, useRef } from "react";

type AnimationDirection = "bottom" | "left" | "right" | "fade" | "scale" | "zoom" | "rotate";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  threshold?: number;
  className?: string;
  duration?: number;
  distance?: number;
  easing?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "bottom",
  delay = 0,
  threshold = 0.1,
  className = "",
  duration = 700,
  distance = 30,
  easing = "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("active");
          }, delay);
          // Once the animation has played, we can unobserve
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold, 
        rootMargin: "0px 0px -50px 0px" 
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold]);

  const getAnimationClass = () => {
    switch (direction) {
      case "bottom":
        return `opacity-0 translate-y-[${distance}px]`;
      case "left":
        return `opacity-0 -translate-x-[${distance}px]`;
      case "right":
        return `opacity-0 translate-x-[${distance}px]`;
      case "fade":
        return "opacity-0";
      case "scale":
        return "opacity-0 scale-95";
      case "zoom":
        return "opacity-0 scale-50";
      case "rotate":
        return "opacity-0 rotate-12 scale-95";
      default:
        return `opacity-0 translate-y-[${distance}px]`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className} will-change-transform`}
      style={{
        transitionProperty: 'transform, opacity',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: easing,
      }}
    >
      {children}
    </div>
  );
};

const createScrollRevealStyle = () => {
  // Add active classes for different animations
  const style = document.createElement('style');
  style.innerHTML = `
    .opacity-0.active { opacity: 1 !important; }
    [class*="translate-"].active { transform: translate(0, 0) !important; }
    [class*="scale-"].active { transform: scale(1) !important; }
    [class*="rotate-"].active { transform: rotate(0) !important; }
    .translate-y-\\[30px\\].scale-95.active { transform: translateY(0) scale(1) !important; }
    .rotate-12.scale-95.active { transform: rotate(0) scale(1) !important; }
  `;
  document.head.appendChild(style);
};

// Add the styles when the component is imported
if (typeof window !== 'undefined') {
  createScrollRevealStyle();
}

export default ScrollReveal;
