// src/pages/Landing/NakshathDifference.jsx
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

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
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
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
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
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
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
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
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
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

  // ── HEADER ──
  const eyebrowOpacity = useTransform(scrollYProgress, [0.06, 0.16], [0, 1]);

  const headingOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0.08, 0.22], [30, 0]);
  const headingBlur    = useTransform(scrollYProgress, [0.08, 0.22], [10, 0]);
  const headingFilter  = useTransform(headingBlur, (v) => `blur(${v}px)`);

  const dividerScale = useTransform(scrollYProgress, [0.16, 0.26], [0, 1]);

  const descOpacity = useTransform(scrollYProgress, [0.20, 0.32], [0, 1]);
  const descY       = useTransform(scrollYProgress, [0.20, 0.32], [20, 0]);

  // ── CARDS (staggered) ──
  const card1Opacity = useTransform(scrollYProgress, [0.32, 0.44], [0, 1]);
  const card1Y       = useTransform(scrollYProgress, [0.32, 0.44], [30, 0]);

  const card2Opacity = useTransform(scrollYProgress, [0.36, 0.48], [0, 1]);
  const card2Y       = useTransform(scrollYProgress, [0.36, 0.48], [30, 0]);

  const card3Opacity = useTransform(scrollYProgress, [0.40, 0.52], [0, 1]);
  const card3Y       = useTransform(scrollYProgress, [0.40, 0.52], [30, 0]);

  const card4Opacity = useTransform(scrollYProgress, [0.44, 0.56], [0, 1]);
  const card4Y       = useTransform(scrollYProgress, [0.44, 0.56], [30, 0]);

  // ── CINEMATIC EXIT ──
  const exitOpacity = useTransform(scrollYProgress, [0.78, 0.94], [1, 0]);
  const exitScale   = useTransform(scrollYProgress, [0.78, 0.94], [1, 1.04]);
  const exitY       = useTransform(scrollYProgress, [0.78, 0.94], [0, -48]);

  // ── Reduced motion fallback ──
  if (prefersReduced) {
    return (
      <section className="relative w-full py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-2xl mb-16">
            <h4 className="type-eyebrow text-[#C9A227] mb-4">The Nakshath Difference</h4>
            <h2 className="type-page-title mb-6">
              <span className="text-white">Where Passion</span>
              <br />
              <span className="text-[#C9A227]">Meets Prestige</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#C9A227]/60 mb-8" />
            <p className="type-lead text-white/90 max-w-xl">
              Nakshath Equestrian Club is a premium equestrian sports
              destination designed to inspire discipline, strength and
              excellence through world-class equestrian training and
              sporting experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:mr-[20%]">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} />
            ))}
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
            src="/find difference.png"
            alt="Indoor Arena"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center brightness-[.55] contrast-[1.08] saturate-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/70 via-[#0C0922]/80 to-[#0C0922]/95" />
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
          <div className="max-w-2xl mb-10 lg:mb-14">
            <motion.h4
              className="type-eyebrow text-[#C9A227] mb-4"
              style={{ opacity: eyebrowOpacity }}
            >
              The Nakshath Difference
            </motion.h4>

            <motion.h2
              className="type-page-title mb-6"
              style={{ opacity: headingOpacity, y: headingY, filter: headingFilter }}
            >
              <span className="text-white">Where Passion</span>
              <br />
              <span className="text-[#C9A227]">Meets Prestige</span>
            </motion.h2>

            <motion.div
              className="w-16 h-[2px] bg-[#C9A227]/60 mb-6 origin-left"
              style={{ scaleX: dividerScale }}
            />

            <motion.p
              className="type-lead text-white/90 max-w-xl"
              style={{ opacity: descOpacity, y: descY }}
            >
              Nakshath Equestrian Club is a premium equestrian sports
              destination designed to inspire discipline, strength and
              excellence through world-class equestrian training and
              sporting experiences.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:mr-[20%]">
            <motion.div style={{ opacity: card1Opacity, y: card1Y }}>
              <FeatureCard feature={features[0]} />
            </motion.div>
            <motion.div style={{ opacity: card2Opacity, y: card2Y }}>
              <FeatureCard feature={features[1]} />
            </motion.div>
            <motion.div style={{ opacity: card3Opacity, y: card3Y }}>
              <FeatureCard feature={features[2]} />
            </motion.div>
            <motion.div style={{ opacity: card4Opacity, y: card4Y }}>
              <FeatureCard feature={features[3]} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ feature }) => (
  <div className="bg-white/[0.03] backdrop-blur-md border border-white/15 rounded-2xl p-6 text-left md:text-center flex flex-col items-start md:items-center justify-center hover:border-[#C9A227]/60 transition-colors duration-300 min-h-[200px] h-full">
    <div className="mb-4">{feature.icon}</div>
    <h4 className="type-card-title text-[#C9A227] text-left md:text-center">
      {feature.title}
    </h4>
    <div className="w-8 h-[1px] bg-[#C9A227]/40 mt-4" />
  </div>
);

export default NakshathDifference;