// src/pages/Landing/MoreThanFirstRide.jsx
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { FilmGrain } from '../../components/scrollytelling';

const MoreThanFirstRide = () => {
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

  // ── CARD (image + container as one unit) ──
  const cardOpacity = useTransform(scrollYProgress, [0, 0.14], [0, 1]);
  const cardScale   = useTransform(scrollYProgress, [0, 0.14], [0.96, 1]);
  const cardY       = useTransform(scrollYProgress, [0, 0.14], [32, 0]);

  // ── EYEBROW ──
  const eyebrowOpacity = useTransform(scrollYProgress, [0.14, 0.24], [0, 1]);
  const eyebrowX       = useTransform(scrollYProgress, [0.14, 0.24], [-20, 0]);

  // ── HEADING ──
  const headingOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0.18, 0.32], [30, 0]);
  const headingBlur    = useTransform(scrollYProgress, [0.18, 0.32], [10, 0]);
  const headingFilter  = useTransform(headingBlur, (v) => `blur(${v}px)`);

  // ── DIVIDER ──
  const dividerScale = useTransform(scrollYProgress, [0.28, 0.38], [0, 1]);

  // ── DESCRIPTION ──
  const descOpacity = useTransform(scrollYProgress, [0.32, 0.46], [0, 1]);
  const descY       = useTransform(scrollYProgress, [0.32, 0.46], [20, 0]);

  // ── FEATURES ──
  const featuresOpacity = useTransform(scrollYProgress, [0.44, 0.60], [0, 1]);
  const featuresY       = useTransform(scrollYProgress, [0.44, 0.60], [30, 0]);

  // ── CINEMATIC EXIT ──
  const exitOpacity = useTransform(scrollYProgress, [0.74, 0.94], [1, 0]);
  const exitScale   = useTransform(scrollYProgress, [0.74, 0.94], [1, 1.05]);
  const exitY       = useTransform(scrollYProgress, [0.74, 0.94], [0, -48]);

  // ── Reduced motion fallback ──
  if (prefersReduced) {
    return (
      <section className="relative w-full py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-0 items-stretch overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-full lg:w-1/2">
              <img
                src="/page 2 gpt.png"
                alt="Rider with horse"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="type-eyebrow text-[#C9A227]">More Than</span>
                <div className="h-[1px] flex-1 bg-[#C9A227]/30 max-w-[100px]" />
              </div>
              <h2 className="type-page-title mb-8">
                <span className="text-white">A</span> <span className="text-[#C9A227]">First Ride</span>
              </h2>
              <div className="w-16 h-[2px] bg-[#C9A227]/40 mb-8" />
              <p className="type-lead text-white/85 mb-8 sm:mb-12 text-left max-w-xl mx-0">
                Equestrian sports bring together athletic skill, partnership
                with horses, discipline and training. At Nakshath,
                your first ride is an introduction to that world.
              </p>
              <FeatureRow />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: '150vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Film grain overlay — subtle during hold, prominent on exit */}
        <FilmGrain
          progress={scrollYProgress}
          baseOpacity={0.06}
          exitOpacity={0.18}
          range={[0.7, 1]}
        />

        {/* ═══ CINEMATIC EXIT GROUP ═══ */}
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6"
          style={{
            opacity: exitOpacity,
            scale: exitScale,
            y: exitY,
          }}
        >
          {/* Card as one unit */}
          <motion.div
            className="flex flex-col lg:flex-row gap-0 items-stretch overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
            style={{
              opacity: cardOpacity,
              scale: cardScale,
              y: cardY,
            }}
          >
            {/* Left: Image */}
            <div className="w-full lg:w-1/2 overflow-hidden">
              <img
                src="/page 2 gpt.png"
                alt="Rider with horse"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12">

              {/* Eyebrow */}
              <motion.div
                className="flex items-center gap-4 mb-6"
                style={{ opacity: eyebrowOpacity, x: eyebrowX }}
              >
                <span className="type-eyebrow text-[#C9A227]">More Than</span>
                <div className="h-[1px] flex-1 bg-[#C9A227]/30 max-w-[100px]" />
              </motion.div>

              {/* Heading */}
              <motion.h2
                className="type-page-title mb-8"
                style={{
                  opacity: headingOpacity,
                  y: headingY,
                  filter: headingFilter,
                }}
              >
                <span className="text-white">A</span> <span className="text-[#C9A227]">First Ride</span>
              </motion.h2>

              {/* Divider */}
              <motion.div
                className="w-16 h-[2px] bg-[#C9A227]/40 mb-8 origin-left"
                style={{ scaleX: dividerScale }}
              />

              {/* Description */}
              <motion.p
                className="type-lead text-white/85 mb-8 sm:mb-12 text-left max-w-xl mx-0"
                style={{ opacity: descOpacity, y: descY }}
              >
                Equestrian sports bring together athletic skill, partnership
                with horses, discipline and training. At Nakshath,
                your first ride is an introduction to that world.
              </motion.p>

              {/* Features */}
              <motion.div style={{ opacity: featuresOpacity, y: featuresY }}>
                <FeatureRow />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Feature row ──────────────────────────────────────────────
const FeatureRow = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#C9A227]/20 md:border-t-0">
    <div className="flex items-start gap-4 px-0 py-6 text-left border-b border-[#C9A227]/20 md:block md:px-6 md:py-0 md:text-center md:border-b-0 md:border-r md:border-[#C9A227]/20">
      <div className="flex shrink-0 justify-start md:justify-center mb-0 md:mb-4">
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </div>
      <div>
        <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-2 md:mb-3">Professional Coaching</h4>
        <p className="type-small text-white/70">Guidance within a structured riding environment.</p>
      </div>
    </div>

    <div className="flex items-start gap-4 px-0 py-6 text-left border-b border-[#C9A227]/20 md:block md:px-6 md:py-0 md:text-center md:border-b-0 md:border-r md:border-[#C9A227]/20">
      <div className="flex shrink-0 justify-start md:justify-center mb-0 md:mb-4">
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <div>
        <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-2 md:mb-3">Well-Trained Horses</h4>
        <p className="type-small text-white/70">Well-schooled, safe and reliable horses for riders of different levels.</p>
      </div>
    </div>

    <div className="flex items-start gap-4 px-0 py-6 text-left md:block md:px-6 md:py-0 md:text-center">
      <div className="flex shrink-0 justify-start md:justify-center mb-0 md:mb-4">
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      </div>
      <div>
        <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-2 md:mb-3">Structured Progression</h4>
        <p className="type-small text-white/70">Walk → Trot → Canter → National &amp; International Competitions.</p>
      </div>
    </div>
  </div>
);

export default MoreThanFirstRide;