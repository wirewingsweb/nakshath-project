// src/components/motion/DriftImage.jsx
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useInViewOnce } from '../../hooks/useInViewOnce';

/**
 * DriftImage — image reveal + perpetual Ken Burns drift.
 *
 * Props:
 *   src           — image source
 *   alt           — alt text
 *   className     — wrapper class
 *   imgClassName  — image class
 *   targetOpacity — final opacity (default 1)
 *   amount        — viewport trigger amount (default 0.15)
 *   drift         — 'subtle' | 'medium' | 'dramatic' (default 'medium')
 *   duration      — total loop duration in seconds (default 30)
 */
const DriftImage = ({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  targetOpacity = 1,
  amount = 0.15,
  drift = 'medium',
  duration = 30,
  loading = 'lazy',
  decoding = 'async',
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInViewOnce({ amount });

  if (prefersReduced) {
    return (
      <div ref={ref} className={className}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          className={imgClassName}
          style={{ opacity: targetOpacity }}
        />
      </div>
    );
  }

  // Drift presets
  const driftMap = {
    subtle: {
      scale: [1.05, 1, 1, 1.02, 1.01, 1.05],
      x: ['0%', '0%', '0%', '-0.6%', '-0.3%', '0%'],
      y: ['0%', '0%', '0%', '-0.3%', '-0.15%', '0%'],
    },
    medium: {
      scale: [1.05, 1, 1, 1.04, 1.02, 1.05],
      x: ['0%', '0%', '0%', '-1.2%', '-0.6%', '0%'],
      y: ['0%', '0%', '0%', '-0.6%', '-0.3%', '0%'],
    },
    dramatic: {
      scale: [1.08, 1, 1, 1.06, 1.03, 1.08],
      x: ['0%', '0%', '0%', '-2%', '-1%', '0%'],
      y: ['0%', '0%', '0%', '-1%', '-0.5%', '0%'],
    },
  };

  const preset = driftMap[drift] || driftMap.medium;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={
        inView
          ? {
              opacity: [0, targetOpacity, targetOpacity, targetOpacity, targetOpacity, targetOpacity],
              scale: preset.scale,
              x: preset.x,
              y: preset.y,
            }
          : { opacity: 0, scale: 1.05 }
      }
      transition={
        inView
          ? {
              duration,
              times: [0, 0.05, 0.15, 0.45, 0.7, 1],
              ease: EASE_PRIMARY,
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 0,
            }
          : { duration: 0 }
      }
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={imgClassName}
      />
    </motion.div>
  );
};

export default DriftImage;