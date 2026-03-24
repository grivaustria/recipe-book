import { useEffect, useRef } from "react";

type UseScrollRevealOptions = {
  selector: string;
  visibleClass: string;
  threshold?: number;
};

export const useScrollReveal = <T extends HTMLElement>({
  selector,
  visibleClass,
  threshold = 0.12,
}: UseScrollRevealOptions) => {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const revealElements = container.querySelectorAll<HTMLElement>(selector);

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => {
        element.classList.add(visibleClass);
      });

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [selector, threshold, visibleClass]);

  return containerRef;
};
