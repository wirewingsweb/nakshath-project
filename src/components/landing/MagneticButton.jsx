import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MAGNETIC_RADIUS, MAGNETIC_STRENGTH } from '../../utils/landing-motion';

/**
 * MagneticButton — pulls toward the cursor when the mouse is within
 * a `radius` of the button's centre. Springs back on leave.
 */
const MagneticButton = ({
  children,
  strength = MAGNETIC_STRENGTH,
  radius = MAGNETIC_RADIUS,
  className = '',
}) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const falloff = 1 - dist / radius;
        setPos({ x: dx * strength * falloff, y: dy * strength * falloff });
      } else {
        setPos((p) => (p.x === 0 && p.y === 0 ? p : { x: 0, y: 0 }));
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [radius, strength]);

  return (
    <motion.div
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.5 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;