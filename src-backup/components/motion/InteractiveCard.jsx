// src/components/motion/InteractiveCard.jsx
import { motion } from 'framer-motion';
import { EASE_PRIMARY } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * InteractiveCard — wraps any card-like element with a subtle hover lift.
 * Lifts 4px on hover, drops shadow beneath.
 *
 * Usage:
 *   <InteractiveCard className="...">
 *     <article>...</article>
 *   </InteractiveCard>
 */
const InteractiveCard = ({
  children,
  as = 'div',
  className = '',
  liftY = -4,
  ...rest
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (prefersReduced) {
    const Tag = as;
    return <Tag className={className} {...rest}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      whileHover={{ y: liftY, transition: { duration: 0.25, ease: EASE_PRIMARY } }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default InteractiveCard;