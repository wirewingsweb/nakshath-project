import { motion } from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

/**
 * LineReveal — wraps a single line of text and masks it up from below.
 * Each line must be inside its own <LineReveal> for a split-text effect.
 */
const LineReveal = ({ children, delay = 0, className = '' }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      initial={{ y: '110%', opacity: 0 }}
      whileInView={{ y: '0%', opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1, delay, ease: EASE }}
      className="block"
    >
      {children}
    </motion.span>
  </span>
);

export default LineReveal;