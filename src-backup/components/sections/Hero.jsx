// src/components/sections/Hero.jsx
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EASE_PRIMARY } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import GoldMotes from '../GoldMotes';

const Hero = () => {
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef(null);

  // ── Cursor tracking — base motion values ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // ── Image parallax — snappy spring ──
  const parallaxSpring = { damping: 40, stiffness: 120, mass: 0.6 };
  const smoothX = useSpring(mouseX, parallaxSpring);
  const smoothY = useSpring(mouseY, parallaxSpring);

  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  // ── Motes — slightly larger parallax than the image for depth ──
  const motesX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const motesY = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  // ── Glow — slower spring so it lags behind the cursor like light ──
  const glowSpring = { damping: 60, stiffness: 60, mass: 0.8 };
  const glowSmoothX = useSpring(smoothX, glowSpring);
  const glowSmoothY = useSpring(smoothY, glowSpring);

  // Confine the glow's center to the middle 50% of the frame so it never
  // reaches the edges — a light source at the edge feels like a graphic.
  const glowLeft = useTransform(glowSmoothX, [-0.5, 0.5], ['25%', '75%']);
  const glowTop = useTransform(glowSmoothY, [-0.5, 0.5], ['25%', '75%']);

  // ── Mouse listener — desktop, fine pointer only ──
  useEffect(() => {
    if (prefersReduced) return undefined;

    const section = sectionRef.current;
    if (!section) return undefined;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return undefined;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReduced, mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="nav-dark-hero relative h-screen w-full overflow-hidden bg-[#0C0922]"
    >
      <h1 className="sr-only">Horse Riding Academy in Bengaluru</h1>

      {/* ═══ Layer 1: Image — Ken Burns + cursor parallax ═══ */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        style={prefersReduced ? undefined : { x: parallaxX, y: parallaxY }}
      >
        <motion.div
          className="absolute inset-0 h-full w-full will-change-transform"
          initial={
            prefersReduced
              ? { scale: 1, opacity: 0.8 }
              : { scale: 1.08, opacity: 0 }
          }
          animate={
            prefersReduced
              ? { scale: 1, opacity: 0.8 }
              : {
                  scale: [1.08, 1, 1.08, 1],
                  opacity: [0, 0.8, 0.8, 0.8],
                  x: ['0%', '0%', '-1.5%', '0%'],
                  y: ['0%', '0%', '-0.6%', '0%'],
                }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : {
                  duration: 24,
                  times: [0, 0.08, 0.92, 1],
                  ease: EASE_PRIMARY,
                  repeat: Infinity,
                  repeatType: 'loop',
                  repeatDelay: 0,
                }
          }
        >
          <img
            src="/heroImg.png"
            alt="Horse riding at Nakshath Equestrian Club"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[68%_center] md:object-center"
          />
        </motion.div>
      </motion.div>

      {/* ═══ Layer 2: Gold glow — cursor-following light source ═══ */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-[5]"
          style={{
            width: 'clamp(300px, 55vw, 800px)',
            height: 'clamp(300px, 55vw, 800px)',
            // Center the glow on the point defined by left/top
            x: '-50%',
            y: '-50%',
            // Cursor-driven position — the light source follows the pointer
            left: glowLeft,
            top: glowTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.14) 0%, rgba(201,162,39,0.05) 35%, transparent 70%)',
            filter: 'blur(20px)',
            mixBlendMode: 'screen',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: [0, 1, 0.7, 1],
            scale: [0.85, 1, 1.02, 1],
          }}
          transition={{
            opacity: {
              duration: 6,
              delay: 1.2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            },
            scale: {
              duration: 6,
              delay: 1.2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            },
          }}
        />
      )}

      {/* ═══ Layer 3: Gold motes — ambient dust, cursor-parallaxed ═══ */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={prefersReduced ? undefined : { x: motesX, y: motesY }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: prefersReduced ? 0 : 1 }}
          transition={{ duration: 2, delay: 1.5, ease: EASE_PRIMARY }}
        >
          <GoldMotes count={120} speed={1.5} paused={prefersReduced} />
        </motion.div>
      </motion.div>

      {/* ═══ Layer 4: Bottom gradient ═══ */}
      <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-t from-[#0C0922]/70 via-transparent to-transparent" />

      {/* ═══ Layer 5: Vignette ═══ */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[15]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(12,9,34,0.55) 100%)',
        }}
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReduced ? 0 : 1.8,
          delay: prefersReduced ? 0 : 0.8,
          ease: EASE_PRIMARY,
        }}
      />

      {/* ═══ Layer 6: Gold accent line — draws across on mount ═══ */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 z-20"
          style={{ top: 'clamp(4rem, 8vh, 6rem)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.6,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mx-auto h-px w-[min(88vw,1200px)] origin-left bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-60" />
        </motion.div>
      )}

      {/* ═══ Layer 7: Curtain — initial black frame, lifts on mount ═══ */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 bg-[#0C0922]"
        initial={{ opacity: prefersReduced ? 0 : 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: prefersReduced ? 0 : 1.4,
          ease: EASE_PRIMARY,
        }}
      />
    </section>
  );
};

export default Hero;