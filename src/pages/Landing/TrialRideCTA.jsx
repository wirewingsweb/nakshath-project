// src/pages/Landing/TrialRideCTA.jsx
import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import ShinyText from '../../components/ShinyText';
import { EASE_PRIMARY } from '../../utils/motion';

// ═══════════════════════════════════════════════════════════════
// Magnetic CTA Button with spotlight + shine sweep
// ═══════════════════════════════════════════════════════════════

const MagneticCTA = ({ onClick, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 15, stiffness: 220, mass: 0.4 });
  const sy = useSpring(my, { damping: 15, stiffness: 220, mass: 0.4 });
  const x = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const y = useTransform(sy, [-0.5, 0.5], [-5, 5]);

  const spotLeft = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const spotTop  = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

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
      style={prefersReduced ? undefined : { x, y }}
      whileHover={prefersReduced ? undefined : { scale: 1.03 }}
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.25, ease: EASE_PRIMARY }}
      className="relative w-max"
    >
      <button
        type="button"
        onClick={onClick}
        className="group/cta type-button relative overflow-hidden rounded-full bg-[#C9A227] px-10 py-4 text-[#0C0922] shadow-lg transition-all duration-500 hover:bg-white hover:shadow-[0_10px_40px_-10px_rgba(201,162,39,0.8)]"
      >
        {/* Cursor spotlight inside button */}
        {!prefersReduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-400 group-hover/cta:opacity-100"
            style={{
              left: spotLeft,
              top: spotTop,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 45%, transparent 78%)',
              filter: 'blur(22px)',
            }}
          />
        )}

        {/* Shine sweep */}
        {!prefersReduced && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
          />
        )}

        <span className="relative inline-flex items-center gap-2">
          Book Your Trial Ride
          <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1.5">
            →
          </span>
        </span>
      </button>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

const TrialRideCTA = () => {
  const { openEnquiry } = useEnquiry();
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

  // ── BACKGROUND ──
  const bgOpacity = useTransform(scrollYProgress, [0, 0.14], [0, 1]);
  const bgScale   = useTransform(scrollYProgress, [0, 0.72], [1.1, 1.02]);
  const bgFilter  = useTransform(
    scrollYProgress,
    [0, 0.72],
    ['brightness(1.08) contrast(1.08) saturate(1.12)', 'brightness(1.02) contrast(1.1) saturate(1.14)']
  );

  // Horizontal light beam sweep across background
  const beamX = useTransform(scrollYProgress, [0.05, 0.55], ['-120%', '120%']);
  const beamOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.45, 0.6], [0, 0.7, 0.5, 0]);

  // ── HEADING LINE 1 (slide from left) ──
  const h1Opacity = useTransform(scrollYProgress, [0.10, 0.28], [0, 1]);
  const h1X       = useTransform(scrollYProgress, [0.10, 0.28], [-40, 0]);
  const h1Blur    = useTransform(scrollYProgress, [0.10, 0.28], [12, 0]);
  const h1Filter  = useTransform(h1Blur, (v) => `blur(${v}px)`);

  // ── HEADING LINE 2 (slide from right) ──
  const h2Opacity = useTransform(scrollYProgress, [0.16, 0.32], [0, 1]);
  const h2X       = useTransform(scrollYProgress, [0.16, 0.32], [40, 0]);
  const h2Blur    = useTransform(scrollYProgress, [0.16, 0.32], [12, 0]);
  const h2Filter  = useTransform(h2Blur, (v) => `blur(${v}px)`);

  // ── SUBTITLE ──
  const subtitleOpacity = useTransform(scrollYProgress, [0.22, 0.36], [0, 1]);
  const subtitleY       = useTransform(scrollYProgress, [0.22, 0.36], [25, 0]);
  const subtitleTrack   = useTransform(scrollYProgress, [0.22, 0.36], ['0.03em', '0em']);

  // ── CTA BUTTON (slide up + width draw) ──
  const ctaOpacity = useTransform(scrollYProgress, [0.34, 0.50], [0, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.34, 0.50], [20, 0]);
  const ctaScaleX  = useTransform(scrollYProgress, [0.34, 0.50], [0.75, 1]);

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
      <section className="relative w-full overflow-hidden px-5 py-24 sm:px-6 md:px-20 md:py-32">
        <img
          src="/come and ride.webp"
          alt="Trial Background"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[72%_center] brightness-[1.08] contrast-[1.08] saturate-[1.12] md:object-right md:brightness-100 md:contrast-[1.1] md:saturate-[1.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/76 via-[#0C0922]/46 to-[#0C0922]/14 md:from-[#0C0922]/55 md:via-[#0C0922]/32 md:to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[400px] max-w-7xl flex-col items-start justify-center md:min-h-[500px]">
          <div className="flex max-w-2xl flex-col [text-shadow:0_2px_16px_rgba(0,0,0,.76)]">
            <h2 className="type-page-title mb-4 leading-tight text-white">
              Come and sit<br />
              <ShinyText
                text="on a horse."
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h2>
            <p className="type-lead mb-10 text-white/95">
              Ten minutes, no charge, no obligation.
            </p>
            <button
              type="button"
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button w-max rounded-full bg-[#C9A227] px-10 py-4 text-[#0C0922] shadow-lg transition-colors hover:bg-white"
            >
              Book Your Trial Ride
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background image — cinematic arrival */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: bgOpacity, scale: bgScale, filter: bgFilter }}
        >
          <img
            src="/come and ride.webp"
            alt="Trial Background"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[72%_center] brightness-[1.08] contrast-[1.08] saturate-[1.12] md:object-right md:brightness-100 md:contrast-[1.1] md:saturate-[1.14]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/76 via-[#0C0922]/46 to-[#0C0922]/14 md:from-[#0C0922]/55 md:via-[#0C0922]/32 md:to-transparent" />

          {/* Horizontal light beam sweep */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-[55%] -skew-x-12"
            style={{
              x: beamX,
              opacity: beamOpacity,
              background:
                'linear-gradient(105deg, transparent 30%, rgba(201,162,39,0.28) 50%, transparent 70%)',
              mixBlendMode: 'screen',
            }}
          />
        </motion.div>

        {/* Section-wide cursor ambient glow */}
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

        {/* Content — final section, no exit */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-5 sm:px-6 md:px-20">
          <div className="flex max-w-2xl flex-col [text-shadow:0_2px_16px_rgba(0,0,0,.76)]">
            {/* Heading line 1 — slide from left + blur focus pull */}
            <motion.h2
              className="type-page-title mb-4 leading-tight text-white"
              style={{
                opacity: h1Opacity,
                x: h1X,
                filter: h1Filter,
              }}
            >
              <span className="group/l1 inline-block cursor-default transition-colors duration-500 hover:text-[#F5E6A8]">
                Come and sit
              </span>
            </motion.h2>

            {/* Heading line 2 — slide from right + ShinyText hover */}
            <motion.h2
              className="type-page-title mb-4 leading-tight text-white"
              style={{
                opacity: h2Opacity,
                x: h2X,
                filter: h2Filter,
              }}
            >
              <span className="group/l2 inline-block cursor-default transition-all duration-500 hover:tracking-wide hover:drop-shadow-[0_0_22px_rgba(201,162,39,0.55)]">
                <ShinyText
                  text="on a horse."
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </span>
            </motion.h2>

            {/* Subtitle — fade-up + tracking settle + hover brighten */}
            <motion.p
              className="type-lead mb-10 cursor-default text-white/95 transition-colors duration-500 hover:text-white"
              style={{
                opacity: subtitleOpacity,
                y: subtitleY,
                letterSpacing: subtitleTrack,
              }}
            >
              Ten minutes, no charge, no obligation.
            </motion.p>

            {/* CTA — slide up + width draw */}
            <motion.div
              style={{
                opacity: ctaOpacity,
                y: ctaY,
                scaleX: prefersReduced ? 1 : ctaScaleX,
                transformOrigin: 'left center',
              }}
            >
              <MagneticCTA
                onClick={() => openEnquiry('Trial Ride')}
                prefersReduced={prefersReduced}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialRideCTA;