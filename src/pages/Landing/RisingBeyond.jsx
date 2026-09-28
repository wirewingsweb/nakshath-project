// src/pages/Landing/RisingBeyond.jsx
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { GiHorseHead, GiHorseshoe } from 'react-icons/gi';
import { useEnquiry } from '../../context/EnquiryContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

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

  // ── EYEBROW ──
  const eyebrowOpacity = useTransform(scrollYProgress, [0.06, 0.16], [0, 1]);
  const eyebrowX       = useTransform(scrollYProgress, [0.06, 0.16], [-20, 0]);

  // ── HEADING ──
  const headingOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0.08, 0.22], [30, 0]);
  const headingBlur    = useTransform(scrollYProgress, [0.08, 0.22], [10, 0]);
  const headingFilter  = useTransform(headingBlur, (v) => `blur(${v}px)`);

  // ── DIVIDER ──
  const dividerScale = useTransform(scrollYProgress, [0.16, 0.26], [0, 1]);

  // ── SUBTITLE ──
  const subtitleOpacity = useTransform(scrollYProgress, [0.20, 0.32], [0, 1]);
  const subtitleY       = useTransform(scrollYProgress, [0.20, 0.32], [20, 0]);

  // ── TRIAL CARDS ──
  const trialCardsOpacity = useTransform(scrollYProgress, [0.32, 0.46], [0, 1]);
  const trialCardsY       = useTransform(scrollYProgress, [0.32, 0.46], [30, 0]);
  const trialCardsScale   = useTransform(scrollYProgress, [0.32, 0.46], [0.95, 1]);

  // ── CTA ──
  const ctaOpacity = useTransform(scrollYProgress, [0.46, 0.60], [0, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.46, 0.60], [20, 0]);

  // ── BOTTOM LINE ──
  const bottomOpacity = useTransform(scrollYProgress, [0.56, 0.68], [0, 1]);
  const bottomY       = useTransform(scrollYProgress, [0.56, 0.68], [15, 0]);

  // ── CINEMATIC EXIT ──
  const exitOpacity = useTransform(scrollYProgress, [0.78, 0.94], [1, 0]);
  const exitScale   = useTransform(scrollYProgress, [0.78, 0.94], [1, 1.04]);
  const exitY       = useTransform(scrollYProgress, [0.78, 0.94], [0, -48]);

  // ── Reduced motion fallback ──
  if (prefersReduced) {
    return (
      <section className="relative w-full py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <h4 className="type-eyebrow text-[#C9A227]">Final Booking</h4>
              <div className="h-[1px] w-12 bg-[#C9A227]/40" />
            </div>
            <h2 className="type-page-title mb-6">
              <span className="text-white">Rising Beyond</span>
              <br />
              <span className="text-[#C9A227]">Every Jump</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#C9A227]/40 mb-6" />
            <p className="type-lead text-white/90 mb-10">
              Begin Your Journey at <span className="text-[#C9A227]">Nakshath.</span>
            </p>
            <TrialCards />
            <button
              type="button"
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button w-full bg-[#C9A227] text-[#0C0922] py-4 rounded-full hover:bg-white transition-colors mb-8"
            >
              → Book Your Trial Ride
            </button>
            <p className="text-center text-white/60 text-sm tracking-wider">
              Kids <span className="mx-2 text-[#C9A227]">•</span> Teens <span className="mx-2 text-[#C9A227]">•</span> Adults
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Background image */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            opacity: bgOpacity,
            scale: bgScale,
            filter: useTransform(bgBrightness, (b) => `brightness(${b})`),
          }}
        >
          <img
            src="/rising-beyond-bg.webp"
            alt="Rider on White Horse"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-[76%_center] sm:object-right brightness-[.55] contrast-[1.08] saturate-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/70 to-[#0C0922]/30" />
        </motion.div>

        {/* Content — cinematic exit group */}
        <motion.div
          className="w-full max-w-7xl mx-auto px-5 sm:px-6"
          style={{
            opacity: exitOpacity,
            scale: exitScale,
            y: exitY,
          }}
        >
          <div className="max-w-xl">
            <motion.div
              className="flex items-center gap-3 mb-4"
              style={{ opacity: eyebrowOpacity, x: eyebrowX }}
            >
              <h4 className="type-eyebrow text-[#C9A227]">Final Booking</h4>
              <div className="h-[1px] w-12 bg-[#C9A227]/40" />
            </motion.div>

            <motion.h2
              className="type-page-title mb-6"
              style={{ opacity: headingOpacity, y: headingY, filter: headingFilter }}
            >
              <span className="text-white">Rising Beyond</span>
              <br />
              <span className="text-[#C9A227]">Every Jump</span>
            </motion.h2>

            <motion.div
              className="w-16 h-[2px] bg-[#C9A227]/40 mb-6 origin-left"
              style={{ scaleX: dividerScale }}
            />

            <motion.p
              className="type-lead text-white/90 mb-10"
              style={{ opacity: subtitleOpacity, y: subtitleY }}
            >
              Begin Your Journey at <span className="text-[#C9A227]">Nakshath.</span>
            </motion.p>

            <motion.div
              style={{
                opacity: trialCardsOpacity,
                y: trialCardsY,
                scale: trialCardsScale,
              }}
            >
              <TrialCards />
            </motion.div>

            <motion.button
              type="button"
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button w-full bg-[#C9A227] text-[#0C0922] py-4 rounded-full hover:bg-white transition-colors mb-8"
              style={{ opacity: ctaOpacity, y: ctaY }}
            >
              → Book Your Trial Ride
            </motion.button>

            <motion.p
              className="text-center text-white/60 text-sm tracking-wider"
              style={{ opacity: bottomOpacity, y: bottomY }}
            >
              Kids <span className="mx-2 text-[#C9A227]">•</span> Teens <span className="mx-2 text-[#C9A227]">•</span> Adults
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TrialCards = () => (
  <div className="flex items-start gap-4 mb-10">
    <div className="bg-white rounded-2xl p-6 shadow-lg flex-1 text-center">
      <div className="flex justify-center mb-3">
        <GiHorseshoe aria-hidden="true" className="h-11 w-11 text-[#C9A227]" />
      </div>
      <p className="type-eyebrow text-[#1A1A1A] mb-2">Free Trial Ride</p>
      <div className="type-page-title text-[#1A1A1A] mb-1">10</div>
      <p className="type-caption text-[#1A1A1A]/70 uppercase tracking-wider mb-4">Minutes</p>
    </div>

    <div className="flex flex-col items-center justify-center pt-8">
      <span className="text-[#C9A227] text-sm font-medium">or</span>
      <div className="h-8 w-[1px] bg-[#C9A227]/30 mt-2" />
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-lg flex-1 text-center">
      <div className="flex justify-center mb-3">
        <GiHorseHead aria-hidden="true" className="h-11 w-11 text-[#C9A227]" />
      </div>
      <p className="type-eyebrow text-[#1A1A1A] mb-2">Trial Ride</p>
      <div className="type-page-title text-[#1A1A1A] mb-1">45</div>
      <p className="type-caption text-[#1A1A1A]/70 uppercase tracking-wider mb-4">Minutes · ₹1,999</p>
    </div>
  </div>
);

export default RisingBeyond;