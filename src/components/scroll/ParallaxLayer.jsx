import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * ParallaxLayer
 * Wraps content and moves it up or down as the container scrolls past.
 *
 * @param speed  Positive = moves up as you scroll down.
 *               Negative = moves down as you scroll down.
 *               Range ~ -1.5 to 1.5. Small values (0.15-0.4) for subtle depth.
 * @param range  Total travel in % of the element's own height. Default 30.
 * @param spring Softening of the raw scroll value. Higher damping = less float.
 */
const ParallaxLayer = ({
  children,
  speed = 0.3,
  range = 30,
  className = '',
  style = {},
}) => {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const travel = range * speed;
  const y = useTransform(scrollYProgress, [0, 1], [`${-travel}%`, `${travel}%`]);
  const smoothed = useSpring(y, { stiffness: 110, damping: 26, mass: 0.55 });

  if (shouldReduce) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`} style={style}>
      <motion.div
        style={{ y: smoothed, willChange: 'transform' }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxLayer;