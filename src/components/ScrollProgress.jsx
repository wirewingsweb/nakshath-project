// ============================================================
// SCROLL PROGRESS BAR — Uses Lenis directly (not Framer Motion)
// ============================================================
import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import { motion, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = ({ scroll, limit }) => {
      const p = limit > 0 ? scroll / limit : 0;
      setProgress(p);
      spring.set(p);
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis, spring]);

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[200] h-[2px] origin-left bg-gradient-to-r from-[#876B18] via-[#C9A227] to-[#FFD966]"
      style={{ scaleX: spring }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;