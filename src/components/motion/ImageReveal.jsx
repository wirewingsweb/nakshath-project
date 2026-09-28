// src/components/motion/ImageReveal.jsx
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION, VIEWPORT, REVEAL } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

/**
 * ImageReveal — fade + subtle scale for images.
 *
 * Props:
 *   cinematic     — use the 1.4s duration (hero, TrialRideCTA, Footer CTA)
 *   scale         — override start scale (default 1.04)
 *   targetOpacity — end opacity (default 1; use 0.8 if the image has opacity-80)
 *   delay         — seconds
 *   duration      — override
 *   as            — element type (default "div"; use "img" if no wrapper)
 */
export default function ImageReveal({
  children,
  cinematic = false,
  scale,
  targetOpacity = 1,
  delay = 0,
  duration,
  amount = VIEWPORT.amount,
  once = VIEWPORT.once,
  as = 'div',
  className,
  ...rest
}) {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const resolvedScale = scale ?? (isMobile ? REVEAL.imageScaleSmall.scale : REVEAL.imageScale.scale);
  const resolvedDuration = duration ?? (cinematic ? DURATION.cinematic : DURATION.image);

  const MotionTag = motion[as] || motion.div;

  if (prefersReduced) {
    return (
      <MotionTag className={className} style={{ opacity: targetOpacity }} {...rest}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, scale: resolvedScale }}
      whileInView={{ opacity: targetOpacity, scale: 1 }}
      viewport={{ amount, once }}
      transition={{ duration: resolvedDuration, delay, ease: EASE_PRIMARY }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}