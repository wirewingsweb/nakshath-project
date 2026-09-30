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

  // ── Layer 1 — Background image parallax — snappy, subtle ──
  const imageSpring = { damping: 40, stiffness: 120, mass: 0.6 };
  const imageX = useSpring(mouseX, imageSpring);
  const imageY = useSpring(mouseY, imageSpring);
  const parallaxImageX = useTransform(imageX, [-0.5, 0.5], [10, -10]);
  const parallaxImageY = useTransform(imageY, [-0.5, 0.5], [8, -8]);

  // ── Layer 2 — Midground gold motes — medium rate for depth ──
  const motesSpring = { damping: 45, stiffness: 100, mass: 0.7 };
  const motesSmoothX = useSpring(mouseX, motesSpring);
  const motesSmoothY = useSpring(mouseY, motesSpring);
  const parallaxMotesX = useTransform(motesSmoothX, [-0.5, 0.5], [22, -22]);
  const parallaxMotesY = useTransform(motesSmoothY, [-0.5, 0.5], [18, -18]);

  // ── Layer 3 — Foreground gold glow (light source) — slower, lagged ──
  const glowSpring = { damping: 60, stiffness: 60, mass: 0.8 };
  const glowSmoothX = useSpring(mouseX, glowSpring);
  const glowSmoothY = useSpring(mouseY, glowSpring);

  const glowLeft = useTransform(glowSmoothX, [-0.5, 0.5], ['25%', '75%']);
  const glowTop = useTransform(glowSmoothY, [-0.5, 0.5], ['25%', '75%']);

  // ── Layer 4 — Very foreground decorative border — largest rate ──
  const decorSpring = { damping: 50, stiffness: 90, mass: 0.5 };
  const decorSmoothX = useSpring(mouseX, decorSpring);
  const decorSmoothY = useSpring(mouseY, decorSpring);
  const parallaxDecorX = useTransform(decorSmoothX, [-0.5, 0.5], [32, -32]);
  const parallaxDecorY = useTransform(decorSmoothY, [-0.5, 0.5], [26, -26]);

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

      {/* ═══════════════════════════════════════════════════════════
          LAYER 1 — BACKGROUND IMAGE
          Parallax rate: ±10px / ±8px (slowest — appears furthest away)
          Plus Ken Burns drift on load
      ═══════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        style={prefersReduced ? undefined : { x: parallaxImageX, y: parallaxImageY }}
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
            src="/heroImg.webp"
            alt="Horse riding at Nakshath Equestrian Club"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[68%_center] md:object-center"
          />
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 2 — MIDGROUND (Motes)
          Parallax rate: ±22px / ±18px (medium — appears between image and user)
      ═══════════════════════════════════════════════════════════ */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={prefersReduced ? undefined : { x: parallaxMotesX, y: parallaxMotesY }}
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

      {/* ═══════════════════════════════════════════════════════════
          LAYER 3 — CURSOR-FOLLOWING GLOW (Light source)
          Follows cursor with its own slow spring — creates a "lamp"
          effect that feels physically separate from the image.
      ═══════════════════════════════════════════════════════════ */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-[12]"
          style={{
            width: 'clamp(300px, 55vw, 800px)',
            height: 'clamp(300px, 55vw, 800px)',
            x: '-50%',
            y: '-50%',
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

      {/* ═══════════════════════════════════════════════════════════
          LAYER 4 — VERY FOREGROUND DECORATIVE BORDER
          Parallax rate: ±32px / ±26px (fastest — appears closest to user)
          These are subtle corner accents that move the most, creating
          the strongest depth cue.
      ═══════════════════════════════════════════════════════════ */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[18]"
          style={{ x: parallaxDecorX, y: parallaxDecorY }}
        >
          {/* Top-left corner accent */}
          <div className="absolute left-6 top-6 h-16 w-16 md:left-10 md:top-10 md:h-20 md:w-20">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#C9A227]/60 to-transparent" />
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#C9A227]/60 to-transparent" />
          </div>

          {/* Bottom-right corner accent */}
          <div className="absolute bottom-6 right-6 h-16 w-16 md:bottom-10 md:right-10 md:h-20 md:w-20">
            <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-[#C9A227]/60 to-transparent" />
            <div className="absolute bottom-0 right-0 h-px w-full bg-gradient-to-l from-[#C9A227]/60 to-transparent" />
          </div>

          {/* Center-bottom subtle marker */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#C9A227]/40 to-transparent" />
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          OVERLAYS — static layers that darken edges
      ═══════════════════════════════════════════════════════════ */}

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-t from-[#0C0922]/70 via-transparent to-transparent" />

      {/* Vignette */}
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

      {/* Gold accent line */}
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

      {/* Curtain */}
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