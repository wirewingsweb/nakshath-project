// src/components/scrollytelling/BlurInText.jsx
import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { EASE_PRIMARY } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * BlurInText — text that starts blurred and low-opacity, resolves to sharp.
 *
 * Props:
 *   as          — element type (default 'h2')
 *   progress    — MotionValue<number> 0→1 (from useScrollProgress)
 *   range       — [start, end] fraction of progress where animation runs (default [0.1, 0.4])
 *   blur        — max blur amount in px (default 12; reduced on mobile)
 *   y           — rise distance in px (default 40)
 *   className   — styling
 */
const BlurInText = ({
  as = 'h2',
  progress,
  range = [0.1, 0.4],
  blur = 12,
  y = 40,
  className = '',
  children,
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 500;

  const [start, end] = range;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const blurPx = useTransform(progress, [start, end], [isMobile ? 0 : blur, 0]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);
  const yMotion = useTransform(progress, [start, end], [y, 0]);

  const MotionTag = motion[as] || motion.h2;

  if (prefersReduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      style={{
        opacity,
        filter: isMobile ? undefined : filter,
        y: yMotion,
      }}
    >
      {children}
    </MotionTag>
  );
};

export default BlurInText;