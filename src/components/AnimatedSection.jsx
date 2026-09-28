import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '../utils/animations';

// Reusable scroll-triggered animation wrapper
const AnimatedSection = ({
  children,
  variant = fadeInUp,
  delay = 0,
  className = '',
  as = 'div',
  threshold = 0.2
}) => {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedSection;