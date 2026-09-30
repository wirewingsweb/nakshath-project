// ============================================================
// GSAP + SCROLLTRIGGER + LENIS INTEGRATION
// Ye file dono ko connect karti hai — zaroori hai!
// ============================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin (sirf ek baar)
gsap.registerPlugin(ScrollTrigger);

// ============================================================
// CONNECT LENIS WITH GSAP TICKER
// ============================================================
export const connectLenisWithGSAP = (lenis) => {
  if (!lenis) return;

  // Lenis ka RAF GSAP ticker se chalega
  const update = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);

  // Jab bhi Lenis scroll kare, ScrollTrigger update ho
  lenis.on('scroll', ScrollTrigger.update);

  // Cleanup function
  return () => {
    gsap.ticker.remove(update);
    lenis.off('scroll', ScrollTrigger.update);
  };
};

// ============================================================
// UTILITY — Check if mobile
// ============================================================
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// ============================================================
// UTILITY — Refresh ScrollTrigger on resize
// ============================================================
export const refreshOnResize = () => {
  const handleResize = () => {
    ScrollTrigger.refresh();
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
};

export { gsap, ScrollTrigger };