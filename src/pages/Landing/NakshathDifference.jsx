// src/pages/Landing/NakshathDifference.jsx
import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { EASE_PRIMARY } from '../../utils/motion';

// ═══════════════════════════════════════════════════════════════
// Interactive Feature Card — Rise & Unfold reveal + tilt + spotlight
// ═══════════════════════════════════════════════════════════════

const FeatureCard = ({ feature, index, progress, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 22, stiffness: 180, mass: 0.6 });
  const sy = useSpring(my, { damping: 22, stiffness: 180, mass: 0.6 });

  // 3D tilt on cursor
  const rX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  // Cursor spotlight
  const spotLeft = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const spotTop  = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  // Rise & Unfold reveal ranges
  const start = 0.32 + index * 0.04;
  const end = start + 0.13;

  const cardOpacity = useTransform(progress, [start, end], [0, 1]);
  const cardY       = useTransform(progress, [start, end], [40, 0]);
  const cardScale   = useTransform(progress, [start, end], [0.92, 1]);
  const cardRotateY = useTransform(progress, [start, end], [-25, 0]);

  // Icon spring-bounce-in after card lands
  const iconStart = start + 0.06;
  const iconEnd = iconStart + 0.10;
  const iconY     = useTransform(progress, [iconStart, iconEnd], [20, 0]);
  const iconScale = useTransform(progress, [iconStart, iconEnd], [0.7, 1]);
  const iconOpacity = useTransform(progress, [iconStart, iconEnd], [0, 1]);

  // Card divider draws from left
  const dividerStart = start + 0.08;
  const dividerEnd = dividerStart + 0.08;
  const dividerScale = useTransform(progress, [dividerStart, dividerEnd], [0, 1]);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group/card relative flex h-full min-h-[200px] flex-col items-start justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] p-6 text-left backdrop-blur-md transition-all duration-500 hover:border-[#C9A227]/60 hover:shadow-[0_20px_50px_-15px_rgba(201,162,39,0.4)] md:items-center md:text-center"
      style={{
        opacity: cardOpacity,
        y: cardY,
        scale: cardScale,
        rotateY: prefersReduced ? 0 : cardRotateY,
        rotateX: prefersReduced ? 0 : rX,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      whileHover={prefersReduced ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: EASE_PRIMARY }}
    >
      {/* Cursor spotlight */}
      {!prefersReduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.22) 0%, rgba(201,162,39,0.05) 50%, transparent 78%)',
            filter: 'blur(32px)',
          }}
        />
      )}

      {/* Gold ring on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] rounded-2xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover/card:ring-2 group-hover/card:ring-inset"
      />

      {/* Corner brackets */}
      {!prefersReduced && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-3 z-[3] h-5 w-5 opacity-0 transition-all duration-500 group-hover/card:left-5 group-hover/card:top-5 group-hover/card:opacity-100"
          >
            <span className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
            <span className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3 z-[3] h-5 w-5 opacity-0 transition-all duration-500 group-hover/card:bottom-5 group-hover/card:right-5 group-hover/card:opacity-100"
          >
            <span className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
            <span className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
          </span>
        </>
      )}

      {/* Icon — spring bounce-in on reveal + hover rotate/scale */}
      <motion.div
        className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A227]/10 transition-all duration-500 group-hover/card:bg-[#C9A227]/20 group-hover/card:shadow-[0_0_28px_rgba(201,162,39,0.55)]"
        style={
          prefersReduced
            ? undefined
            : { y: iconY, scale: iconScale, opacity: iconOpacity }
        }
      >
        <motion.span
          className="inline-flex"
          whileHover={prefersReduced ? undefined : { rotate: 10, scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          {feature.icon}
        </motion.span>
      </motion.div>

      {/* Title — hover tracking + gold shift */}
      <h4 className="type-card-title relative z-10 text-left text-[#C9A227] transition-all duration-500 group-hover/card:tracking-[0.08em] group-hover/card:text-[#F5E6A8] md:text-center">
        {feature.title}
      </h4>

      {/* Divider — draws from left on reveal + grows on hover */}
      <motion.div
        className="relative z-10 mt-4 h-[1px] w-8 origin-left bg-[#C9A227]/40 transition-all duration-500 group-hover/card:w-12 group-hover/card:bg-[#C9A227]"
        style={prefersReduced ? undefined : { scaleX: dividerScale }}
      />
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

const NakshathDifference = () => {
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef(null);

  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const currentScroll = Math.max(0, -rect.top);
      const progress = totalScroll > 0 ? Math.min(1, currentScroll / totalScroll) : 0;
      scrollYProgress.set(progress);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [scrollYProgress]);

  const features = [
    {
      title: 'INTERNATIONAL-STANDARD INDOOR ARENA',
      icon: (
        <svg className="w-10 h-10 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          <path d="M6 42h36" strokeLinecap="round" />
          <path d="M10 42V14l14-8 14 8v28" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 18h4M22 18h4M30 18h4" strokeLinecap="round" />
          <path d="M14 24h4M22 24h4M30 24h4" strokeLinecap="round" />
          <path d="M14 30h4M22 30h4M30 30h4" strokeLinecap="round" />
          <path d="M24 42v-8h4v8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 34c0-2 1-4 3-5s5-2 7-1 3 2 3 3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M37 31c1 0 2-1 2-2s-1-2-2-2-2 1-2 2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 28c-1-2 0-4 2-5" strokeLinecap="round" />
          <path d="M24 34c0-2 1-4 3-5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'PROFESSIONAL COACHING',
      icon: (
        <svg className="w-10 h-10 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          <circle cx="24" cy="14" r="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 20v8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 28c-6 0-10 4-10 10v4h20v-4c0-6-4-10-10-10z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 32h16" strokeLinecap="round" />
          <path d="M14 36h20" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'WELL-TRAINED HORSES',
      icon: (
        <svg className="w-10 h-10 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          <path d="M16 40c0-4 2-8 6-10s10-4 14-2 6 5 4 8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 36c2 0 4-2 4-4s-2-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 32c-2-4-4-8-8-10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 22c1-2 3-3 5-2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 28c-2-2-2-5 0-7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 40v4" strokeLinecap="round" />
          <path d="M20 40v4" strokeLinecap="round" />
          <path d="M24 40v4" strokeLinecap="round" />
          <path d="M30 40v4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'LIMITED RIDERS PER BATCH',
      icon: (
        <svg className="w-10 h-10 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          <circle cx="18" cy="16" r="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="16" r="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 32c0-4 3-7 6-7s6 3 6 7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 32c0-4 3-7 6-7s6 3 6 7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 32c0-4 2-6 6-6s6 2 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  // ── BACKGROUND ──
  const bgOpacity    = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const bgScale      = useTransform(scrollYProgress, [0, 0.72, 1], [1.05, 1, 1.15]);
  const bgBrightness = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.95, 0.82]);
  const bgFilter     = useTransform(bgBrightness, (b) => `brightness(${b})`);

  // ── HEADER ──
  const eyebrowOpacity = useTransform(scrollYProgress, [0.06, 0.16], [0, 1]);
  const eyebrowX       = useTransform(scrollYProgress, [0.06, 0.16], [-20, 0]);

  const headingOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0.08, 0.22], [30, 0]);
  const headingBlur    = useTransform(scrollYProgress, [0.08, 0.22], [10, 0]);
  const headingFilter  = useTransform(headingBlur, (v) => `blur(${v}px)`);
  const headingTrack   = useTransform(scrollYProgress, [0.08, 0.22], ['0.04em', '0em']);

  const dividerScale = useTransform(scrollYProgress, [0.16, 0.26], [0, 1]);

  const descOpacity = useTransform(scrollYProgress, [0.20, 0.32], [0, 1]);
  const descY       = useTransform(scrollYProgress, [0.20, 0.32], [20, 0]);
  const descTrack   = useTransform(scrollYProgress, [0.20, 0.32], ['0.02em', '0em']);

  // ── CINEMATIC EXIT ──
  const exitOpacity = useTransform(scrollYProgress, [0.78, 0.94], [1, 0]);
  const exitScale   = useTransform(scrollYProgress, [0.78, 0.94], [1, 1.04]);
  const exitY       = useTransform(scrollYProgress, [0.78, 0.94], [0, -48]);

  // ── Section-wide cursor ambient glow ──
  const sectionMouseX = useMotionValue(0.5);
  const sectionMouseY = useMotionValue(0.5);
  const sectionSx = useSpring(sectionMouseX, { damping: 60, stiffness: 60, mass: 0.8 });
  const sectionSy = useSpring(sectionMouseY, { damping: 60, stiffness: 60, mass: 0.8 });
  const sectionLeft = useTransform(sectionSx, (v) => `${v * 100}%`);
  const sectionTop  = useTransform(sectionSy, (v) => `${v * 100}%`);

  useEffect(() => {
    if (prefersReduced) return undefined;
    const section = sectionRef.current;
    if (!section) return undefined;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return undefined;

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      sectionMouseX.set((e.clientX - rect.left) / rect.width);
      sectionMouseY.set((e.clientY - rect.top) / rect.height);
    };

    section.addEventListener('mousemove', handleMove);
    return () => section.removeEventListener('mousemove', handleMove);
  }, [prefersReduced, sectionMouseX, sectionMouseY]);

  // ── Reduced motion fallback ──
  if (prefersReduced) {
    return (
      <section className="relative w-full overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-16 max-w-2xl">
            <h4 className="type-eyebrow mb-4 text-[#C9A227]">The Nakshath Difference</h4>
            <h2 className="type-page-title mb-6">
              <span className="text-white">Where Passion</span>
              <br />
              <span className="text-[#C9A227]">Meets Prestige</span>
            </h2>
            <div className="mb-8 h-[2px] w-16 bg-[#C9A227]/60" />
            <p className="type-lead max-w-xl text-white/90">
              Nakshath Equestrian Club is a premium equestrian sports
              destination designed to inspire discipline, strength and
              excellence through world-class equestrian training and
              sporting experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:mr-[20%] lg:grid-cols-4">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                feature={feature}
                index={idx}
                progress={scrollYProgress}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: '200vh' }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

        {/* Background image */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            opacity: bgOpacity,
            scale: bgScale,
            filter: bgFilter,
          }}
        >
          <img
            src="/find difference.webp"
            alt="Indoor Arena"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center brightness-[1.5] contrast-[1.08] saturate-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/50 via-[#0C0922]/60 to-[#0C0922]/75" />
        </motion.div>

        {/* Section-wide cursor ambient glow */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-[5] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: sectionLeft,
              top: sectionTop,
              background:
                'radial-gradient(circle, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.03) 45%, transparent 75%)',
              filter: 'blur(60px)',
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Content — cinematic exit group */}
        <motion.div
          className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6"
          style={{
            opacity: exitOpacity,
            scale: exitScale,
            y: exitY,
          }}
        >
          <div className="mb-10 max-w-2xl lg:mb-14">
            {/* Eyebrow — slide + dot grow */}
            <motion.div
              className="group/eyebrow mb-4 inline-flex cursor-default items-center gap-3"
              style={{ opacity: eyebrowOpacity, x: eyebrowX }}
            >
              <span className="h-1 w-1 rounded-full bg-[#C9A227] transition-all duration-500 group-hover/eyebrow:w-5" />
              <span className="type-eyebrow text-[#C9A227] transition-all duration-500 group-hover/eyebrow:tracking-[0.25em] group-hover/eyebrow:text-[#F5E6A8]">
                The Nakshath Difference
              </span>
            </motion.div>

            {/* Heading — blur focus pull + hover shift */}
            <motion.h2
              className="group/heading type-page-title mb-6 cursor-default"
              style={{
                opacity: headingOpacity,
                y: headingY,
                filter: headingFilter,
                letterSpacing: headingTrack,
              }}
            >
              <span className="text-white transition-colors duration-500 group-hover/heading:text-[#F5E6A8]">
                Where Passion
              </span>
              <br />
              <span className="text-[#C9A227] transition-all duration-500 group-hover/heading:tracking-wide group-hover/heading:drop-shadow-[0_0_18px_rgba(201,162,39,0.5)]">
                Meets Prestige
              </span>
            </motion.h2>

            {/* Divider — scaleX + shimmer on hover */}
            <motion.div
              className="group/div relative mb-6 h-[2px] w-16 origin-left bg-[#C9A227]/60 transition-all duration-500 hover:w-24 hover:bg-[#C9A227]"
              style={{ scaleX: dividerScale }}
            >
              {!prefersReduced && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-1000 group-hover/div:translate-x-full"
                />
              )}
            </motion.div>

            {/* Description — fade-up + hover brighten */}
            <motion.p
              className="type-lead max-w-xl cursor-default text-white/90 transition-colors duration-500 hover:text-white"
              style={{ opacity: descOpacity, y: descY, letterSpacing: descTrack }}
            >
              Nakshath Equestrian Club is a premium equestrian sports
              destination designed to inspire discipline, strength and
              excellence through world-class equestrian training and
              sporting experiences.
            </motion.p>
          </div>

          {/* Feature cards — Rise & Unfold */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:mr-[20%] lg:grid-cols-4">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                feature={feature}
                index={idx}
                progress={scrollYProgress}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NakshathDifference;