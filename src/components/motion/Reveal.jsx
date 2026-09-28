// src/components/motion/Reveal.jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

export default function Reveal({
  children,
  y,
  yMobile,
  delay = 0,
  duration = DURATION.normal,
  amount = 0.2,
  once = true,
  as = 'div',
  className,
  ...rest
}) {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const desktopY = typeof y === 'number' ? y : 40;
  const mobileY = typeof yMobile === 'number' ? yMobile : Math.round(desktopY * 0.6);
  const startY = isMobile ? mobileY : desktopY;

  useEffect(() => {
    if (prefersReduced) {
      setVisible(true);
      return undefined;
    }

    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: amount, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced, amount, once]);

  const MotionComponent = motion[as] || motion.div;

  if (prefersReduced) {
    return <MotionComponent className={className} ref={ref} {...rest}>{children}</MotionComponent>;
  }

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: startY }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: startY }}
      transition={{ duration, delay, ease: EASE_PRIMARY }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}