// src/components/scrollytelling/LoadingScreen.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_PRIMARY } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * LoadingScreen — brief branded intro that covers the page while
 * the scrollytelling sections mount and initial ScrollTrigger positions are set.
 */
const LoadingScreen = ({ onComplete, duration = 2000 }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      onComplete?.();
      return undefined;
    }

    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        // Brief pause so 100% is visible
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => onComplete?.(), 500);
        }, 150);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [duration, onComplete, prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0922]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE_PRIMARY }}
        >
          {/* Logo */}
          <motion.img
            src="/nakshath logo head.png"
            alt="Nakshath"
            className="mb-12 h-20 w-auto object-contain md:h-24"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_PRIMARY }}
          />

          {/* Progress bar */}
          <div className="relative h-[2px] w-[180px] overflow-hidden bg-white/10 md:w-[240px]">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#C9A227]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Subtle tagline */}
          <motion.p
            className="absolute bottom-10 text-[0.625rem] font-medium uppercase tracking-[0.3em] text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Nakshath Equestrian
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;