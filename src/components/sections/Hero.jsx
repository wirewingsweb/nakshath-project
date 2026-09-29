import { useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="nav-dark-hero relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-[#0C0922]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SEO H1 */}
      <h1 className="sr-only">Horse Riding Academy in Bengaluru</h1>

      {/* KEN BURNS IMAGE */}
      <motion.div
        className="absolute inset-0 transition-[filter] duration-700 ease-out"
        style={{
          filter: isHovered
            ? 'brightness(1.15) saturate(1.15)'
            : 'brightness(1) saturate(1)',
        }}
        animate={{
          scale: [1.05, 1.18, 1.05],
          x: ['0%', '-2.5%', '0%'],
          y: ['0%', '-1.5%', '0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <img
          src="/heroImg.webp"
          alt="Horse riding at Nakshath Equestrian Club"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[68%_center] md:object-center"
        />
      </motion.div>

      {/* GOLDEN LIGHT SWEEP */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(120deg, transparent 25%, rgba(201,162,39,0.18) 50%, transparent 75%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['-150% 0%', '250% 0%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      />

      {/* VIGNETTE */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(12,9,34,0.55)_100%)] transition-opacity duration-700"
        style={{ opacity: isHovered ? 0.6 : 1 }}
      />

      {/* DARK GRADIENT */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-[#0C0922]/85 via-transparent to-[#0C0922]/40 transition-opacity duration-700"
        style={{ opacity: isHovered ? 0.65 : 1 }}
      />

      {/* ============================================================ */}
      {/* SCROLL INDICATOR — REMOVED ✅ */}
      {/* ============================================================ */}
    </section>
  );
};

export default Hero;