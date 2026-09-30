// src/pages/Landing/FindYourPath.jsx
import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { EASE_PRIMARY } from '../../utils/motion';

// ═══════════════════════════════════════════════════════════════
// Interactive Program Card
// — Deal-from-deck reveal + 3D tilt + spotlight + ring + brackets
// ═══════════════════════════════════════════════════════════════

const ProgramCard = ({
  program,
  index,
  progress,
  prefersReduced,
  delayFactor = 0,
}) => {
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

  // Deal-from-deck reveal ranges
  const start = 0.20 + index * 0.06;
  const end = start + 0.13;

  const cardOpacity = useTransform(progress, [start, end], [0, 1]);
  const cardY       = useTransform(progress, [start, end], [60, 0]);
  const cardScale   = useTransform(progress, [start, end], [0.85, 1]);
  const cardRotateZ = useTransform(
    progress,
    [start, end],
    [8 - index * 4, 0]
  );

  // Image curtain reveal (top → bottom)
  const imgClip = useTransform(
    progress,
    [start + 0.03, end + 0.03],
    ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']
  );

  // Feature list cascade
  const featureBase = start + 0.06;

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
      className="group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#C9A227]/15 bg-white/[0.03] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 hover:border-[#C9A227]/50 hover:shadow-[0_20px_60px_-15px_rgba(201,162,39,0.4)] sm:p-5"
      style={{
        opacity: cardOpacity,
        y: cardY,
        scale: cardScale,
        rotateZ: cardRotateZ,
        rotateX: prefersReduced ? 0 : rX,
        rotateY: prefersReduced ? 0 : rY,
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
          className="pointer-events-none absolute z-0 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.22) 0%, rgba(201,162,39,0.05) 50%, transparent 78%)',
            filter: 'blur(35px)',
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

      {/* Header row: num + title */}
      <div className="relative z-10 mb-4 flex items-start gap-3">
        <span className="type-page-title shrink-0 leading-none text-[#C9A227] transition-all duration-500 group-hover/card:tracking-wider group-hover/card:text-[#F5E6A8]">
          {program.num}
        </span>
        <h3 className="mt-2 min-w-0 break-words text-sm font-bold uppercase leading-snug tracking-wide text-white transition-all duration-500 group-hover/card:tracking-[0.1em] group-hover/card:text-[#F5E6A8] sm:mt-3">
          {program.title}
        </h3>
      </div>

      {/* Image with curtain reveal + hover zoom + spotlight */}
      <motion.div
        className="group/cardimg relative z-10 mb-4 overflow-hidden rounded-xl"
        style={
          prefersReduced
            ? undefined
            : { clipPath: imgClip }
        }
      >
        <img
          src={program.img}
          alt={program.title}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover/card:scale-110 group-hover/cardimg:scale-110"
        />

        {/* Cursor spotlight inside image */}
        {!prefersReduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
            style={{
              left: spotLeft,
              top: spotTop,
              background:
                'radial-gradient(circle, rgba(245,230,168,0.35) 0%, rgba(201,162,39,0.10) 45%, transparent 78%)',
              filter: 'blur(30px)',
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Gold ring on image */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover/card:ring-2 group-hover/card:ring-inset"
        />
      </motion.div>

      {/* Subtitle */}
      <p className="type-small relative z-10 mb-4 text-white/75 transition-colors duration-500 group-hover/card:text-white/95">
        {program.subtitle}
      </p>

      {/* Divider — grows on hover */}
      <div className="relative z-10 mb-4 h-[1px] w-full overflow-hidden bg-[#C9A227]/20">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-0 bg-[#C9A227] transition-all duration-500 group-hover/card:w-full"
        />
      </div>

      {/* Feature list — each item slides in from left on reveal */}
      <ul className="type-caption relative z-10 space-y-2 text-white/70">
        {program.features.map((feature, i) => (
          <FeatureItem
            key={i}
            feature={feature}
            index={i}
            progress={progress}
            featureBase={featureBase}
            prefersReduced={prefersReduced}
          />
        ))}
      </ul>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Feature item — slide from left + hover highlight
// ═══════════════════════════════════════════════════════════════

const FeatureItem = ({ feature, index, progress, featureBase, prefersReduced }) => {
  const start = featureBase + index * 0.02;
  const end = start + 0.06;
  const x = useTransform(progress, [start, end], [-12, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.li
      className="group/feat flex items-start gap-2 transition-all duration-300 hover:translate-x-1"
      style={prefersReduced ? undefined : { x, opacity }}
    >
      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#C9A227] transition-all duration-300 group-hover/feat:scale-150 group-hover/feat:shadow-[0_0_8px_rgba(201,162,39,0.8)]" />
      <span className="font-normal transition-colors duration-300 group-hover/feat:text-[#F5E6A8]">
        {feature}
      </span>
    </motion.li>
  );
};

// ═══════════════════════════════════════════════════════════════
// Magnetic CTA button — pull + shine sweep + arrow slide
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
      className="relative inline-block"
    >
      <button
        type="button"
        onClick={onClick}
        className="group/cta type-button relative overflow-hidden border border-[#C9A227] px-6 py-4 text-[#C9A227] transition-all duration-500 hover:bg-[#C9A227] hover:text-[#0C0922] hover:shadow-[0_8px_30px_-8px_rgba(201,162,39,0.7)] sm:px-10"
      >
        {/* Cursor spotlight */}
        {!prefersReduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-400 group-hover/cta:opacity-100"
            style={{
              left: spotLeft,
              top: spotTop,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 45%, transparent 78%)',
              filter: 'blur(20px)',
            }}
          />
        )}

        {/* Shine sweep */}
        {!prefersReduced && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
          />
        )}

        <span className="relative inline-flex items-center gap-2">
          Explore All Courses
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
  const eyebrowLine    = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  const headingOpacity = useTransform(scrollYProgress, [0.04, 0.14], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0.04, 0.14], [30, 0]);
  const headingBlur    = useTransform(scrollYProgress, [0.04, 0.14], [10, 0]);
  const headingFilter  = useTransform(headingBlur, (v) => `blur(${v}px)`);
  const headingTrack   = useTransform(scrollYProgress, [0.04, 0.14], ['0.06em', '0em']);

  const descOpacity = useTransform(scrollYProgress, [0.10, 0.20], [0, 1]);
  const descY       = useTransform(scrollYProgress, [0.10, 0.20], [20, 0]);
  const descTrack   = useTransform(scrollYProgress, [0.10, 0.20], ['0.02em', '0em']);

  // ── CTA ──
  const ctaOpacity = useTransform(scrollYProgress, [0.54, 0.66], [0, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.54, 0.66], [20, 0]);

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
          <div className="mb-16 text-center">
            <h4 className="type-eyebrow mb-4 text-[#C9A227]">Our Programs</h4>
            <h2 className="type-page-title mb-6">
              <span className="text-white">Find</span>{' '}
              <span className="text-[#C9A227]">Your Path</span>
            </h2>
            <p className="type-lead mx-auto max-w-2xl text-white/85">
              Programs designed for every rider. From the very first step in the saddle
              to competitive excellence, we guide you every step of the way.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, i) => (
              <ProgramCard
                key={program.num}
                program={program}
                index={i}
                progress={scrollYProgress}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>
          <div className="mt-16 text-center">
            <button
              type="button"
              onClick={() => openEnquiry('Riding Classes')}
              className="type-button border border-[#C9A227] px-10 py-4 text-[#C9A227] transition-colors hover:bg-[#C9A227] hover:text-[#0C0922]"
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
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

        {/* Section-wide cursor ambient glow */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-[5] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: sectionLeft,
              top: sectionTop,
              background:
                'radial-gradient(circle, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.03) 45%, transparent 75%)',
              filter: 'blur(60px)',
              mixBlendMode: 'screen',
            }}
          />
        )}

        <motion.div
          className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6"
          style={{
            opacity: exitOpacity,
            scale: exitScale,
            y: exitY,
          }}
        >
          {/* Header */}
          <div className="mb-10 text-center lg:mb-14">
            <motion.div
              className="group/eyebrow mb-4 inline-flex cursor-default items-center gap-3"
              style={{ opacity: eyebrowOpacity, x: eyebrowX }}
            >
              <span className="type-eyebrow text-[#C9A227] transition-all duration-500 group-hover/eyebrow:tracking-[0.25em] group-hover/eyebrow:text-[#F5E6A8]">
                Our Programs
              </span>
              <motion.span
                className="h-[1px] w-16 origin-left bg-[#C9A227]/40 transition-all duration-500 group-hover/eyebrow:w-24 group-hover/eyebrow:bg-[#C9A227]"
                style={{ scaleX: eyebrowLine }}
              />
            </motion.div>

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
                Find
              </span>{' '}
              <span className="text-[#C9A227] transition-all duration-500 group-hover/heading:tracking-wide group-hover/heading:drop-shadow-[0_0_18px_rgba(201,162,39,0.5)]">
                Your Path
              </span>
            </motion.h2>

            <motion.p
              className="type-lead mx-auto max-w-2xl cursor-default text-white/85 transition-colors duration-500 hover:text-white"
              style={{ opacity: descOpacity, y: descY, letterSpacing: descTrack }}
            >
              Programs designed for every rider. From the very first step in the saddle
              to competitive excellence, we guide you every step of the way.
            </motion.p>
          </div>

          {/* Cards grid — Deal-from-deck reveal */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {programs.map((program, i) => (
              <ProgramCard
                key={program.num}
                program={program}
                index={i}
                progress={scrollYProgress}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-10 text-center lg:mt-12"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <MagneticCTA
              onClick={() => openEnquiry('Riding Classes')}
              prefersReduced={prefersReduced}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FindYourPath;