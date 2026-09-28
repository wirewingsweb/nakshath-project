// src/components/motion/PageTransition.jsx
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * PageTransition — wraps <Outlet /> to fade/slide between routes.
 *
 * Parent must wrap with:
 *   <AnimatePresence mode="wait" initial={false}>
 *     <PageTransition key={location.pathname}>...</PageTransition>
 *   </AnimatePresence>
 */
export default function PageTransition({ children }) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_PRIMARY }}
    >
      {children}
    </motion.div>
  );
}