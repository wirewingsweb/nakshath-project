// src/components/motion/KenBurnsImage.jsx
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { EASE_PRIMARY } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * KenBurnsImage — wraps an image with a perpetual slow Ken Burns drift.
 * Also does an initial "arrival" scale for cinematic entrance.
 *
 * Usage:
 *   <KenBurnsImage
 *     src="/heroImg.webp"
 *     alt="..."
 *     className="h-full w-full"
 *     imgClassName="h-full w-full object-cover"
 *   />
 */
const KenBurnsImage = ({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  targetOpacity = 0.8,
  cinematic = true,
  ...rest
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={imgClassName}
          style={{ opacity: targetOpacity }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: cinematic ? 1.08 : 1.05 }}
      animate={{
        opacity: [0, targetOpacity, targetOpacity, targetOpacity, targetOpacity],
        scale: cinematic
          ? [1.08, 1, 1.08, 1]
          : [1.05, 1, 1.05, 1],
        x: ['0%', '0%', '-1.5%', '0%'],
        y: ['0%', '0%', '-0.6%', '0%'],
      }}
      transition={{
        duration: cinematic ? 24 : 30,
        times: cinematic ? [0, 0.08, 0.92, 1] : [0, 0.1, 0.9, 1],
        ease: EASE_PRIMARY,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      }}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={imgClassName}
      />
    </motion.div>
  );
};

export default KenBurnsImage;