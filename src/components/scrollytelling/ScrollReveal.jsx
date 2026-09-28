// src/components/scrollytelling/ScrollReveal.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * ScrollReveal — scroll-linked fade + rise + blur for any content.
 *
 * Reveals IN as the element enters the viewport, holds while centered,
 * reveals OUT as the element leaves. All timing is expressed as
 * scroll-progress breakpoints on the element's travel through the viewport.
 *
 * Progress mapping (offset: ['start end', 'end start']):
 *   0.0  → element top hits viewport bottom   (entering)
 *   0.5  → element center at viewport center  (centered)
 *   1.0  → element bottom hits viewport top   (leaving)
 *
 * Props:
 *   inStart   — progress when reveal-in begins        (default 0.05)
 *   inEnd     — progress when reveal-in completes     (default 0.35)
 *   outStart  — progress when reveal-out begins       (default 0.70)
 *   outEnd    — progress when reveal-out completes    (default 0.95)
 *   y         — rise/drop amount in px                (default 40)
 *   blur      — start with blur, resolve to sharp     (default true)
 *   maxBlur   — blur amount at the edges              (default 8)
 */
const ScrollReveal = ({
  children,
  y = 40,
  blur = true,
  maxBlur = 8,
  inStart = 0.05,
  inEnd = 0.35,
  outStart = 0.70,
  outEnd = 0.95,
  className = '',
}) => {
  const ref = useRef(null);
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Opacity: 0 → 1 (reveal in) → 1 (hold) → 0 (reveal out)
  const opacity = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    [0, 1, 1, 0]
  );

  // Y: rise from +y to 0 (reveal in), hold, then drop to -y (reveal out)
  // Using symmetric y values makes the exit feel like a mirror of the entry.
  const translateY = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    [y, 0, 0, -y]
  );

  // Blur: maxBlur → 0 (reveal in), hold, then 0 → maxBlur (reveal out)
  const blurAmount = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    [blur ? maxBlur : 0, 0, 0, blur ? maxBlur : 0]
  );
  const filter = useTransform(blurAmount, (v) => `blur(${v}px)`);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        y: translateY,
        filter: blur ? filter : undefined,
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;