"use client";

import { useEffect, useRef } from "react";

/**
 * Custom hook for GSAP scroll-triggered reveal animations.
 * Wraps each child element with a fade-up-in animation on scroll.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    threshold?: number;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      duration = 0.8,
      stagger = 0.1,
      delay = 0,
      threshold = 0.15,
    } = options;

    // Use IntersectionObserver for performant scroll detection
    // Then animate with CSS transitions (lightweight alternative to GSAP)
    const children = el.children;
    const elements = Array.from(children) as HTMLElement[];

    // Set initial state
    elements.forEach((child) => {
      child.style.opacity = "0";
      child.style.transform = `translateY(${y}px)`;
      child.style.transition = `opacity ${duration}s ease, transform ${duration}s ease`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate children with stagger
            elements.forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = "1";
                child.style.transform = "translateY(0)";
              }, (delay + i * stagger) * 1000);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options.y, options.duration, options.stagger, options.delay, options.threshold]);

  return ref;
}

/**
 * Hook for a single element fade-in animation on scroll.
 */
export function useFadeIn<T extends HTMLElement>(
  options: {
    y?: number;
    x?: number;
    duration?: number;
    delay?: number;
    threshold?: number;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 30,
      x = 0,
      duration = 0.7,
      delay = 0,
      threshold = 0.2,
    } = options;

    el.style.opacity = "0";
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.transition = `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translate(0, 0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.y, options.x, options.duration, options.delay, options.threshold]);

  return ref;
}
