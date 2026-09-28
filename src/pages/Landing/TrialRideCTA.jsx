// src/pages/Landing/TrialRideCTA.jsx
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import ShinyText from '../../components/ShinyText';

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

  // ── BACKGROUND — cinematic arrival, no exit ──
  const bgOpacity = useTransform(scrollYProgress, [0, 0.14], [0, 1]);
  const bgScale   = useTransform(scrollYProgress, [0, 0.72], [1.1, 1.02]);

  // ── HEADING ──
  const headingOpacity = useTransform(scrollYProgress, [0.10, 0.28], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0.10, 0.28], [40, 0]);
  const headingBlur    = useTransform(scrollYProgress, [0.10, 0.28], [14, 0]);
  const headingFilter  = useTransform(headingBlur, (v) => `blur(${v}px)`);

  // ── SUBTITLE ──
  const subtitleOpacity = useTransform(scrollYProgress, [0.22, 0.36], [0, 1]);
  const subtitleY       = useTransform(scrollYProgress, [0.22, 0.36], [25, 0]);

  // ── CTA BUTTON ──
  const ctaOpacity = useTransform(scrollYProgress, [0.34, 0.50], [0, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.34, 0.50], [20, 0]);
  const ctaScale   = useTransform(scrollYProgress, [0.34, 0.50], [0.96, 1]);

  // ── Reduced motion fallback ──
  if (prefersReduced) {
    return (
      <section className="relative w-full py-24 md:py-32 px-5 sm:px-6 md:px-20 overflow-hidden">
        <img
          src="/come and ride.webp"
          alt="Trial Background"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[72%_center] md:object-right brightness-[1.08] contrast-[1.08] saturate-[1.12] md:brightness-100 md:contrast-[1.1] md:saturate-[1.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/76 via-[#0C0922]/46 to-[#0C0922]/14 md:from-[#0C0922]/55 md:via-[#0C0922]/32 md:to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start justify-center min-h-[400px] md:min-h-[500px]">
          <div className="flex flex-col max-w-2xl [text-shadow:0_2px_16px_rgba(0,0,0,.76)]">
            <h2 className="type-page-title text-white mb-4 leading-tight">
              Come and sit<br />
              <ShinyText
                text="on a horse."
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h2>
            <p className="type-lead text-white/95 mb-10">
              Ten minutes, no charge, no obligation.
            </p>
            <button
              type="button"
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button bg-[#C9A227] text-[#0C0922] px-10 py-4 rounded-full hover:bg-white transition-colors shadow-lg w-max"
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
          style={{ opacity: bgOpacity, scale: bgScale }}
        >
          <img
            src="/come and ride.webp"
            alt="Trial Background"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-[72%_center] md:object-right brightness-[1.08] contrast-[1.08] saturate-[1.12] md:brightness-100 md:contrast-[1.1] md:saturate-[1.14]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/76 via-[#0C0922]/46 to-[#0C0922]/14 md:from-[#0C0922]/55 md:via-[#0C0922]/32 md:to-transparent" />
        </motion.div>

        {/* Content — no exit group because this is the final section */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-6 md:px-20 flex flex-col items-start justify-center">
          <div className="flex flex-col max-w-2xl [text-shadow:0_2px_16px_rgba(0,0,0,.76)]">
            <motion.h2
              className="type-page-title text-white mb-4 leading-tight"
              style={{
                opacity: headingOpacity,
                y: headingY,
                filter: headingFilter,
              }}
            >
              Come and sit<br />
              <ShinyText
                text="on a horse."
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </motion.h2>

            <motion.p
              className="type-lead text-white/95 mb-10"
              style={{ opacity: subtitleOpacity, y: subtitleY }}
            >
              Ten minutes, no charge, no obligation.
            </motion.p>

            <motion.button
              type="button"
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button bg-[#C9A227] text-[#0C0922] px-10 py-4 rounded-full hover:bg-white transition-colors shadow-lg w-max"
              style={{
                opacity: ctaOpacity,
                y: ctaY,
                scale: ctaScale,
              }}
            >
              Book Your Trial Ride
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialRideCTA;