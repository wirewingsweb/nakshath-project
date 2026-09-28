// src/hooks/useScrollProgress.js
import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

/**
 * useScrollProgress — computes 0→1 scroll progress for a target element.
 * Works reliably with Lenis (uses getBoundingClientRect, not scroll position).
 *
 * @param {React.RefObject} targetRef — the section to track
 * @returns {MotionValue<number>} — 0 at top of section, 1 when section exits
 */
export function useScrollProgress(targetRef) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return undefined;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const currentScroll = Math.max(0, -rect.top);
      const p = totalScroll > 0 ? Math.min(1, currentScroll / totalScroll) : 0;
      progress.set(p);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [targetRef, progress]);

  return progress;
}

export default useScrollProgress;