// src/hooks/useLenis.js
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useLenis — sets up smooth inertia scroll + integrates with GSAP ScrollTrigger.
 * Only used on the landing page. Returns the Lenis instance.
 *
 * Automatically disabled for reduced-motion users.
 */
export function useLenis({ enabled = true, duration = 1.1 } = {}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const lenis = new Lenis({
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      smoothWheel: true,
      smoothTouch: false, // never on touch — breaks native feel
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Bridge Lenis into GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000); // GSAP uses seconds, Lenis uses ms
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [enabled, duration]);

  return lenisRef;
}

export default useLenis;