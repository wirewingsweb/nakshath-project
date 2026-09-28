// src/components/motion/Stagger.jsx
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION, VIEWPORT, STAGGER } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

/**
 * Stagger — parent container that orchestrates children reveals.
 *
 * Usage:
 *   <Stagger>
 *     <StaggerItem>...</StaggerItem>
 *     <StaggerItem>...</StaggerItem>
 *   </Stagger>
 *
 * Props:
 *   gap        — seconds between children (default STAGGER.normal)
 *   delay      — initial delay before first child
 *   amount     — viewport trigger amount
 *   once       — only animate once
 *   as         — element type (default "div")
 */
export function Stagger({
  children,
  gap = STAGGER.normal,
  delay = 0,
  amount = VIEWPORT.amount,
  once = VIEWPORT.once,
  as = 'div',
  className,
  ...rest
}) {
  const prefersReduced = usePrefersReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (prefersReduced) {
    return (
      <MotionTag className={className} {...rest}>
        {children}
      </MotionTag>
    );
  }

  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: gap,
        delayChildren: delay,
      },
    },
  };

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * StaggerItem — child of <Stagger>.
 * Inherits stagger timing from parent variants.
 */
export function StaggerItem({
  children,
  y,
  yMobile,
  duration = DURATION.normal,
  as = 'div',
  className,
  ...rest
}) {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const desktopY = y ?? 25;
  const resolvedMobileY = yMobile ?? Math.round(desktopY * 0.6);
  const startY = isMobile ? resolvedMobileY : desktopY;

  const MotionTag = motion[as] || motion.div;

  if (prefersReduced) {
    return (
      <MotionTag className={className} {...rest}>
        {children}
      </MotionTag>
    );
  }

  const variants = {
    hidden: { opacity: 0, y: startY },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE_PRIMARY },
    },
  };

  return (
    <MotionTag variants={variants} className={className} {...rest}>
      {children}
    </MotionTag>
  );
}

export default Stagger;