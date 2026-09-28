// src/components/scrollytelling/FixedBackground.jsx
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * FixedBackground — a single continuous background layer behind the whole page.
 * Gradient subtly shifts as you scroll, creating visual continuity between sections.
 * This is what makes sections "merge" instead of hard-cutting.
 */
const FixedBackground = () => {
  const { scrollYProgress } = useScroll();

  // Gradual hue shift through the page
  // Starts at deep navy, warms slightly in the middle, returns to navy
  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      'radial-gradient(ellipse at 50% 30%, #0C0922 0%, #050410 100%)',
      'radial-gradient(ellipse at 50% 40%, #141034 0%, #0C0922 100%)',
      'radial-gradient(ellipse at 50% 50%, #1a1340 0%, #0C0922 100%)',
      'radial-gradient(ellipse at 50% 60%, #141034 0%, #0C0922 100%)',
      'radial-gradient(ellipse at 50% 70%, #0C0922 0%, #050410 100%)',
    ]
  );

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background }}
    />
  );
};

export default FixedBackground;