// ============================================================
// SCROLL PROGRESS BAR — Top golden line that fills with scroll
// ============================================================
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[200] h-[2px] origin-left bg-gradient-to-r from-[#876B18] via-[#C9A227] to-[#FFD966]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;