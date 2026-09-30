// src/pages/Landing/RisingBeyond.jsx
import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { GiHorseHead, GiHorseshoe } from 'react-icons/gi';
import { useEnquiry } from '../../context/EnquiryContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { EASE_PRIMARY } from '../../utils/motion';

// ═══════════════════════════════════════════════════════════════
// Interactive Trial Card — tilt + spotlight + icon rotate + tint
// ═══════════════════════════════════════════════════════════════

const InteractiveTrialCard = ({ icon: Icon, eyebrow, big, caption, delayY, direction, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 22, stiffness: 180, mass: 0.6 });
  const sy = useSpring(my, { damping: 22, stiffness: 180, mass: 0.6 });

  // 3D tilt
  const rX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  // Spotlight
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

  // Reveal direction: 'up' (from below) or 'down' (from above)
  const initialY = direction === 'up' ? 30 : -30;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group/card relative flex-1 overflow-hidden rounded-2xl bg-white p-6 text-center shadow-lg transition-all duration-500 hover:bg-[#FDFCFA] hover:shadow-[0_20px_50px_-15px_rgba(201,162,39,0.5)]"
      style={{
        rotateX: prefersReduced ? 0 : rX,
        rotateY: prefersReduced ? 0 : rY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      initial={prefersReduced ? false : { opacity: 0, y: initialY, scale: 0.94 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.7, delay: delayY, ease: [0.22, 1, 0.36, 1] }
      }
      whileHover={prefersReduced ? undefined : { y: -6 }}
    >
      {/* Gold tint overlay on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[#C9A227]/0 transition-colors duration-500 group-hover/card:bg-[#C9A227]/[0.06]"
      />

      {/* Cursor spotlight */}
      {!prefersReduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.28) 0%, rgba(201,162,39,0.06) 50%, transparent 78%)',
            filter: 'blur(30px)',
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

      {/* Icon */}
      <div className="relative z-10 mb-3 flex justify-center">
        <motion.span
          className="inline-flex"
          whileHover={prefersReduced ? undefined : { rotate: 12, scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          <Icon
            aria-hidden="true"
            className="h-11 w-11 text-[#C9A227] transition-all duration-500 group-hover/card:drop-shadow-[0_0_16px_rgba(201,162,39,0.7)]"
          />
        </motion.span>
      </div>

      <p className="type-eyebrow relative z-10 mb-2 text-[#1A1A1A] transition-all duration-500 group-hover/card:tracking-[0.25em] group-hover/card:text-[#876B18]">
        {eyebrow}
      </p>
      <div className="type-page-title relative z-10 mb-1 text-[#1A1A1A] transition-colors duration-500 group-hover/card:text-[#876B18]">
        {big}
      </div>
      <p className="type-caption relative z-10 mb-4 uppercase tracking-wider text-[#1A1A1A]/70 transition-colors duration-500 group-hover/card:text-[#1A1A1A]">
        {caption}
      </p>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// "or" connector — line draws down + text spring
// ═══════════════════════════════════════════════════════════════

const OrConnector = ({ prefersReduced }) => (
  <div className="flex flex-col items-center justify-center pt-8">
    <motion.span
      className="text-sm font-medium text-[#C9A227]"
      initial={prefersReduced ? false : { opacity: 0, scale: 0.6 }}
      whileInView={prefersReduced ? {} : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }
      }
    >
      or
    </motion.span>
    <motion.div
      className="mt-2 h-8 w-[1px] origin-top bg-[#C9A227]/30"
      initial={prefersReduced ? false : { scaleY: 0 }}
      whileInView={prefersReduced ? {} : { scaleY: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.5, delay: 0.2, ease: EASE_PRIMARY }
      }
    />
  </div>
);

// ═══════════════════════════════════════════════════════════════
// Magnetic CTA
// ═══════════════════════════════════════════════════════════════

const MagneticCTA = ({ onClick, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 15, stiffness: 220, mass: 0.4 });
  const sy = useSpring(my, { damping: 15, stiffness: 220, mass: 0.4 });
  const x = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const y = useTransform(sy, [-0.5, 0.5], [-4, 4]);

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
      whileHover={prefersReduced ? undefined : { scale: 1.02 }}
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.25, ease: EASE_PRIMARY }}
      className="relative w-full"
    >
      <button
        type="button"
        onClick={onClick}
        className="group/cta type-button relative w-full overflow-hidden rounded-full bg-[#C9A227] py-4 text-[#0C0922] shadow-lg transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_-8px_rgba(201,162,39,0.7)]"
      >
        {!prefersReduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-400 group-hover/cta:opacity-100"
            style={{
              left: spotLeft,
              top: spotTop,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.15) 45%, transparent 78%)',
              filter: 'blur(20px)',
            }}
          />
        )}

        {!prefersReduced && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
          />
        )}

        <span className="relative inline-flex items-center justify-center gap-2">
          <span className="inline-block transition-transform duration-300 group-hover/cta:-translate-x-1.5">
            →
          </span>
          Book Your Trial Ride
        </span>
      </button>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

const RisingBeyond = () => {
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
  const bgOpacity    = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const bgScale      = useTransform(scrollYProgress, [0, 0.72, 1], [1.05, 1, 1.15]);
  const bgBrightness = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.95, 0.82]);
  const bgFilter     = useTransform(bgBrightness, (b) => `brightness(${b})`);

  // Lighthouse sweep — diagonal gold beam across bg
  const beamX = useTransform(scrollYProgress, [0, 0.5, 1], ['-130%', '130%', '260%']);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.9, 1], [0, 0.7, 0.5, 0.7, 0]);

  // ── EYEBROW ──
  const eyebrowOpacity = useTransform(scrollYProgress, [0.06, 0.16], [0, 1]);
  const eyebrowX       = useTransform(scrollYProgress, [0.06, 0.16], [-20, 0]);
  const eyebrowLine    = useTransform(scrollYProgress, [0.06, 0.18], [0, 1]);

  // ── HEADING ──
  const headingOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0.08, 0.22], [30, 0]);
  const headingBlur    = useTransform(scrollYProgress, [0.08, 0.22], [10, 0]);
  const headingFilter  = useTransform(headingBlur, (v) => `blur(${v}px)`);
  const headingTrack   = useTransform(scrollYProgress, [0.08, 0.22], ['0.04em', '0em']);

  // ── DIVIDER (scaleX from center) ──
  const dividerScale = useTransform(scrollYProgress, [0.16, 0.26], [0, 1]);

  // ── SUBTITLE ──
  const subtitleOpacity = useTransform(scrollYProgress, [0.20, 0.32], [0, 1]);
  const subtitleY       = useTransform(scrollYProgress, [0.20, 0.32], [20, 0]);
  const subtitleTrack   = useTransform(scrollYProgress, [0.20, 0.32], ['0.02em', '0em']);

  // ── TRIAL CARDS group wrapper ──
  const cardsOpacity = useTransform(scrollYProgress, [0.32, 0.46], [0, 1]);

  // ── CTA ──
  const ctaOpacity = useTransform(scrollYProgress, [0.46, 0.60], [0, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.46, 0.60], [20, 0]);
  const ctaScaleX  = useTransform(scrollYProgress, [0.46, 0.60], [0.85, 1]);

  // ── BOTTOM STRIP ──
  const bottomOpacity = useTransform(scrollYProgress, [0.56, 0.68], [0, 1]);
  const bottomY       = useTransform(scrollYProgress, [0.56, 0.68], [15, 0]);

  // ── CINEMATIC EXIT ──
  const exitOpacity = useTransform(scrollYProgress, [0.78, 0.94], [1, 0]);
  const exitScale   = useTransform(scrollYProgress, [0.78, 0.94], [1, 1.04]);
  const exitY       = useTransform(scrollYProgress, [0.78, 0.94], [0, -48]);

  // ── Section-wide cursor glow ──
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
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <h4 className="type-eyebrow text-[#C9A227]">Final Booking</h4>
              <div className="h-[1px] w-12 bg-[#C9A227]/40" />
            </div>
            <h2 className="type-page-title mb-6">
              <span className="text-white">Rising Beyond</span>
              <br />
              <span className="text-[#C9A227]">Every Jump</span>
            </h2>
            <div className="mb-6 h-[2px] w-16 bg-[#C9A227]/40" />
            <p className="type-lead mb-10 text-white/90">
              Begin Your Journey at <span className="text-[#C9A227]">Nakshath.</span>
            </p>
            <TrialCards prefersReduced={prefersReduced} />
            <button
              type="button"
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button mb-8 w-full rounded-full bg-[#C9A227] py-4 text-[#0C0922] transition-colors hover:bg-white"
            >
              → Book Your Trial Ride
            </button>
            <p className="text-center text-sm tracking-wider text-white/60">
              Kids <span className="mx-2 text-[#C9A227]">•</span> Teens <span className="mx-2 text-[#C9A227]">•</span> Adults
            </p>
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
            src="/rising-beyond-bg.webp"
            alt="Rider on White Horse"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[76%_center] brightness-[.55] contrast-[1.08] saturate-[1.08] sm:object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/70 to-[#0C0922]/30" />

          {/* Lighthouse beam sweep */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-[60%] -skew-x-12"
            style={{
              x: beamX,
              opacity: beamOpacity,
              background:
                'linear-gradient(105deg, transparent 30%, rgba(201,162,39,0.25) 50%, transparent 70%)',
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

        {/* Content — cinematic exit group */}
        <motion.div
          className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6"
          style={{
            opacity: exitOpacity,
            scale: exitScale,
            y: exitY,
          }}
        >
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.div
              className="group/eyebrow mb-4 inline-flex cursor-default items-center gap-3"
              style={{ opacity: eyebrowOpacity, x: eyebrowX }}
            >
              <h4 className="type-eyebrow text-[#C9A227] transition-all duration-500 group-hover/eyebrow:tracking-[0.25em] group-hover/eyebrow:text-[#F5E6A8]">
                Final Booking
              </h4>
              <motion.div
                className="h-[1px] w-12 origin-left bg-[#C9A227]/40 transition-all duration-500 group-hover/eyebrow:w-20 group-hover/eyebrow:bg-[#C9A227]"
                style={{ scaleX: eyebrowLine }}
              />
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
                Rising Beyond
              </span>
              <br />
              <span className="text-[#C9A227] transition-all duration-500 group-hover/heading:tracking-wide group-hover/heading:drop-shadow-[0_0_18px_rgba(201,162,39,0.6)]">
                Every Jump
              </span>
            </motion.h2>

            {/* Divider — scaleX from center + shimmer */}
            <motion.div
              className="group/div relative mb-6 h-[2px] w-16 origin-center bg-[#C9A227]/40 transition-all duration-500 hover:w-24 hover:bg-[#C9A227]"
              style={{ scaleX: dividerScale }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-1000 group-hover/div:translate-x-full"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="type-lead mb-10 cursor-default text-white/90 transition-colors duration-500 hover:text-white"
              style={{ opacity: subtitleOpacity, y: subtitleY, letterSpacing: subtitleTrack }}
            >
              Begin Your Journey at <span className="text-[#C9A227]">Nakshath.</span>
            </motion.p>

            {/* Trial Cards */}
            <motion.div style={{ opacity: cardsOpacity }}>
              <TrialCards prefersReduced={prefersReduced} />
            </motion.div>

            {/* CTA — slide up + width draw */}
            <motion.div
              style={{
                opacity: ctaOpacity,
                y: ctaY,
                scaleX: prefersReduced ? 1 : ctaScaleX,
                transformOrigin: 'left center',
              }}
              className="mb-8"
            >
              <MagneticCTA
                onClick={() => openEnquiry('Trial Ride')}
                prefersReduced={prefersReduced}
              />
            </motion.div>

            {/* Bottom strip — Kids • Teens • Adults */}
            <motion.p
              className="text-center text-sm tracking-wider text-white/60"
              style={{ opacity: bottomOpacity, y: bottomY }}
            >
              <BottomStrip prefersReduced={prefersReduced} />
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Trial Cards — Card 1 rises from below, Card 2 descends from above
// ═══════════════════════════════════════════════════════════════

const TrialCards = ({ prefersReduced }) => (
  <div className="mb-10 flex items-start gap-4">
    <InteractiveTrialCard
      icon={GiHorseshoe}
      eyebrow="Free Trial Ride"
      big="10"
      caption="Minutes"
      delayY={0.0}
      direction="up"
      prefersReduced={prefersReduced}
    />

    <OrConnector prefersReduced={prefersReduced} />

    <InteractiveTrialCard
      icon={GiHorseHead}
      eyebrow="Trial Ride"
      big="45"
      caption="Minutes · ₹1,999"
      delayY={0.1}
      direction="down"
      prefersReduced={prefersReduced}
    />
  </div>
);

// ═══════════════════════════════════════════════════════════════
// Bottom strip — Kids • Teens • Adults with staggered dot pulse
// ═══════════════════════════════════════════════════════════════

const BottomStrip = ({ prefersReduced }) => (
  <span className="inline-flex items-center justify-center gap-2">
    <span className="transition-colors duration-500 hover:text-white">Kids</span>
    <motion.span
      className="inline-block text-[#C9A227] transition-transform duration-500 hover:scale-150"
      animate={prefersReduced ? undefined : { scale: [1, 1.4, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
    >
      •
    </motion.span>
    <span className="transition-colors duration-500 hover:text-white">Teens</span>
    <motion.span
      className="inline-block text-[#C9A227] transition-transform duration-500 hover:scale-150"
      animate={prefersReduced ? undefined : { scale: [1, 1.4, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
    >
      •
    </motion.span>
    <span className="transition-colors duration-500 hover:text-white">Adults</span>
  </span>
);

export default RisingBeyond;