// src/pages/Landing/FindYourPath.jsx
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const FindYourPath = () => {
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

  const programs = [
    { num: '01', title: 'KIDS SPECIAL RIDING PROGRAM', subtitle: 'A fun-filled learning experience for children.', img: '/kid path.webp', features: ['Pony riding', 'Confidence building', 'Physical coordination', 'Interactive horse sessions'] },
    { num: '02', title: 'BEGINNER PROGRAM', subtitle: 'Perfect for first-time riders.', img: '/begin path.webp', features: ['Introduction to horses', 'Riding basics', 'Balance & posture', 'Safety training', 'Horse handling'] },
    { num: '03', title: 'INTERMEDIATE TRAINING', subtitle: 'For riders seeking skill advancement.', img: '/inter path.webp', features: ['Riding techniques', 'Trotting & Cantering', 'Horse Communication & Handling'] },
    { num: '04', title: 'PROFESSIONAL COMPETITION TRAINING', subtitle: 'Designed for competitive riders.', img: '/advance path.webp', features: ['Show Jumping preparation', 'Techniques', 'Performance assessment', 'Advanced Training'] },
  ];

  // ── HEADER ──
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const eyebrowX       = useTransform(scrollYProgress, [0, 0.06], [-20, 0]);

  const headingOpacity = useTransform(scrollYProgress, [0.04, 0.14], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0.04, 0.14], [30, 0]);
  const headingBlur    = useTransform(scrollYProgress, [0.04, 0.14], [10, 0]);
  const headingFilter  = useTransform(headingBlur, (v) => `blur(${v}px)`);

  const descOpacity = useTransform(scrollYProgress, [0.10, 0.20], [0, 1]);
  const descY       = useTransform(scrollYProgress, [0.10, 0.20], [20, 0]);

  // ── CARDS ──
  const card1Opacity = useTransform(scrollYProgress, [0.20, 0.32], [0, 1]);
  const card1Scale   = useTransform(scrollYProgress, [0.20, 0.32], [0.9, 1]);
  const card1Y       = useTransform(scrollYProgress, [0.20, 0.32], [40, 0]);

  const card2Opacity = useTransform(scrollYProgress, [0.26, 0.38], [0, 1]);
  const card2Scale   = useTransform(scrollYProgress, [0.26, 0.38], [0.9, 1]);
  const card2Y       = useTransform(scrollYProgress, [0.26, 0.38], [40, 0]);

  const card3Opacity = useTransform(scrollYProgress, [0.32, 0.44], [0, 1]);
  const card3Scale   = useTransform(scrollYProgress, [0.32, 0.44], [0.9, 1]);
  const card3Y       = useTransform(scrollYProgress, [0.32, 0.44], [40, 0]);

  const card4Opacity = useTransform(scrollYProgress, [0.38, 0.50], [0, 1]);
  const card4Scale   = useTransform(scrollYProgress, [0.38, 0.50], [0.9, 1]);
  const card4Y       = useTransform(scrollYProgress, [0.38, 0.50], [40, 0]);

  // ── CTA ──
  const ctaOpacity = useTransform(scrollYProgress, [0.54, 0.66], [0, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.54, 0.66], [20, 0]);

  // ── CINEMATIC EXIT ──
  const exitOpacity = useTransform(scrollYProgress, [0.78, 0.94], [1, 0]);
  const exitScale   = useTransform(scrollYProgress, [0.78, 0.94], [1, 1.04]);
  const exitY       = useTransform(scrollYProgress, [0.78, 0.94], [0, -48]);

  // ── Reduced motion fallback ──
  if (prefersReduced) {
    return (
      <section className="relative w-full py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-16">
            <h4 className="type-eyebrow text-[#C9A227] mb-4">Our Programs</h4>
            <h2 className="type-page-title mb-6">
              <span className="text-white">Find</span> <span className="text-[#C9A227]">Your Path</span>
            </h2>
            <p className="type-lead text-white/85 max-w-2xl mx-auto">
              Programs designed for every rider. From the very first step in the saddle
              to competitive excellence, we guide you every step of the way.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.num} program={program} />
            ))}
          </div>
          <div className="text-center mt-16">
            <button
              type="button"
              onClick={() => openEnquiry('Riding Classes')}
              className="type-button border border-[#C9A227] text-[#C9A227] px-10 py-4 hover:bg-[#C9A227] hover:text-[#0C0922] transition-colors"
            >
              Explore All Courses →
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          className="w-full max-w-7xl mx-auto px-5 sm:px-6"
          style={{
            opacity: exitOpacity,
            scale: exitScale,
            y: exitY,
          }}
        >
          {/* Header */}
          <div className="text-center mb-10 lg:mb-14">
            <motion.h4
              className="type-eyebrow text-[#C9A227] mb-4"
              style={{ opacity: eyebrowOpacity, x: eyebrowX }}
            >
              Our Programs
            </motion.h4>
            <motion.h2
              className="type-page-title mb-6"
              style={{
                opacity: headingOpacity,
                y: headingY,
                filter: headingFilter,
              }}
            >
              <span className="text-white">Find</span> <span className="text-[#C9A227]">Your Path</span>
            </motion.h2>
            <motion.p
              className="type-lead text-white/85 max-w-2xl mx-auto"
              style={{ opacity: descOpacity, y: descY }}
            >
              Programs designed for every rider. From the very first step in the saddle
              to competitive excellence, we guide you every step of the way.
            </motion.p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            <motion.div style={{ opacity: card1Opacity, scale: card1Scale, y: card1Y }}>
              <ProgramCard program={programs[0]} />
            </motion.div>
            <motion.div style={{ opacity: card2Opacity, scale: card2Scale, y: card2Y }}>
              <ProgramCard program={programs[1]} />
            </motion.div>
            <motion.div style={{ opacity: card3Opacity, scale: card3Scale, y: card3Y }}>
              <ProgramCard program={programs[2]} />
            </motion.div>
            <motion.div style={{ opacity: card4Opacity, scale: card4Scale, y: card4Y }}>
              <ProgramCard program={programs[3]} />
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-10 lg:mt-12"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <button
              type="button"
              onClick={() => openEnquiry('Riding Classes')}
              className="type-button border border-[#C9A227] text-[#C9A227] px-6 sm:px-10 py-4 hover:bg-[#C9A227] hover:text-[#0C0922] transition-colors"
            >
              Explore All Courses →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Program card ─────────────────────────────────────────────
const ProgramCard = ({ program }) => (
  <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#C9A227]/15 bg-white/[0.03] backdrop-blur-md p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] h-full sm:p-5">
    <div className="flex items-start gap-3 mb-4">
      <span className="type-page-title text-[#C9A227] leading-none shrink-0">{program.num}</span>
      <h3 className="min-w-0 break-words font-bold text-white text-sm uppercase tracking-wide leading-snug mt-2 sm:mt-3">
        {program.title}
      </h3>
    </div>

    <div className="mb-4 overflow-hidden rounded-xl">
      <img
        src={program.img}
        alt={program.title}
        loading="lazy"
        decoding="async"
        className="w-full aspect-[4/3] object-cover"
      />
    </div>

    <p className="type-small text-white/75 mb-4">
      {program.subtitle}
    </p>

    <div className="h-[1px] bg-[#C9A227]/20 mb-4" />

    <ul className="type-caption space-y-2 text-white/70">
      {program.features.map((feature, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1 w-1 h-1 rounded-full bg-[#C9A227] flex-shrink-0" />
          <span className="font-normal">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default FindYourPath;