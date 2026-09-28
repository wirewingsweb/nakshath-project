// src/components/scrollytelling/SectionFadeOut.jsx
import { motion, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * SectionFadeOut — wraps section content and fades/translates it out
 * as scroll progress approaches 1. Creates the overlapping "merge" effect
 * with the next section.
 *
 * Props:
 *   progress  — MotionValue<number> 0→1
 *   range     — [start, end] fraction where fade-out happens (default [0.75, 1])
 *   fadeY     — how far to translate up while fading out (default -80)
 */
const SectionFadeOut = ({
  progress,
  range = [0.75, 1],
  fadeY = -80,
  className = '',
  children,
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [start, end] = range;

  const opacity = useTransform(progress, [start, end], [1, 0]);
  const y = useTransform(progress, [start, end], [0, fadeY]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
};

export default SectionFadeOut;