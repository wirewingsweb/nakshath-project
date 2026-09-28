// ============================================================
// ANIMATED SECTION — Reusable wrapper for all sections
// Isko wrap karo kisi bhi section pe, animation automatic lag jayegi
// ============================================================

import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../utils/animations';

const AnimatedSection = ({
  children,
  variant = fadeUp,
  className = '',
  delay = 0,
  as = 'div',
  viewport = viewportOnce,
}) => {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variant}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedSection;