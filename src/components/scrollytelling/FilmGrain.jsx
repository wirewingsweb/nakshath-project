// src/components/scrollytelling/FilmGrain.jsx
import { useEffect, useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * FilmGrain — SVG-noise grain overlay for cinematic section exits.
 *
 * Props:
 *   progress     — MotionValue<number> 0→1 (from useScrollProgress)
 *   baseOpacity  — grain opacity during reveal + hold (default 0.06)
 *   exitOpacity  — grain opacity during exit peak (default 0.18)
 *   range        — [start, end] progress for the exit ramp (default [0.7, 1])
 *   animate      — animate the noise seed (subtle movement, default true)
 *
 * Behaves:
 *   - During reveal (progress 0 → 0.7): grain at baseOpacity
 *   - During exit (0.7 → 1): grain ramps from baseOpacity → exitOpacity
 *   - Reduced-motion: no grain at all
 */
const FilmGrain = ({
  progress,
  baseOpacity = 0.06,
  exitOpacity = 0.18,
  range = [0.7, 1],
  animate = true,
  className = '',
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const seedRef = useRef(1);

  // Ramp opacity from base → exit as progress enters [range]
  const [start, end] = range;
  const opacity = useTransform(
    progress,
    [0, start, end],
    [baseOpacity, baseOpacity, exitOpacity]
  );

  // Subtle animated seed for organic grain movement
  useEffect(() => {
    if (!animate || prefersReduced) return undefined;

    const interval = window.setInterval(() => {
      // Cycle through a few seeds to keep grain moving without being distracting
      seedRef.current = (seedRef.current % 5) + 1;
      const el = document.getElementById('film-grain-turbulence');
      if (el) el.setAttribute('seed', String(seedRef.current));
    }, 800);

    return () => window.clearInterval(interval);
  }, [animate, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-[5] mix-blend-overlay ${className}`}
      style={{ opacity }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="film-grain-filter" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              id="film-grain-turbulence"
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="1"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#film-grain-filter)" />
      </svg>
    </motion.div>
  );
};

export default FilmGrain;