// src/pages/Landing/MoreThanFirstRide.jsx
import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { FilmGrain } from '../../components/scrollytelling';
import { EASE_PRIMARY } from '../../utils/motion';

// ═══════════════════════════════════════════════════════════════
// Interactive Feature Card — 3D flip-in + hover lift + spotlight
// ═══════════════════════════════════════════════════════════════

const FeatureCard = ({ icon, title, desc, index, progress, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 22, stiffness: 200, mass: 0.5 });
  const sy = useSpring(my, { damping: 22, stiffness: 200, mass: 0.5 });

  // 3D tilt on cursor
  const rX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rY = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  // Spotlight follow
  const spotLeft = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const spotTop  = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  // Scroll-driven 3D flip-in reveal (rotateY from -20° → 0)
  const start = 0.44 + index * 0.045;
  const end = start + 0.14;
  const cardOpacity = useTransform(progress, [start, end], [0, 1]);
  const cardY = useTransform(progress, [start, end], [30, 0]);
  const cardRotateY = useTransform(progress, [start, end], [-20, 0]);
  const cardScale = useTransform(progress, [start, end], [0.94, 1]);

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
      className="group/feature relative overflow-hidden px-0 py-6 text-left transition-all duration-500 border-b border-[#C9A227]/20 md:block md:px-6 md:py-0 md:text-center md:border-b-0 md:border-r md:border-[#C9A227]/20 last:md:border-r-0"
      style={{
        opacity: cardOpacity,
        y: cardY,
        rotateY: cardRotateY,
        scale: cardScale,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      whileHover={prefersReduced ? undefined : { y: -4 }}
      transition={{ duration: 0.4, ease: EASE_PRIMARY }}
    >
      {/* Cursor spotlight */}
      {!prefersReduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/feature:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.18) 0%, rgba(201,162,39,0.04) 50%, transparent 78%)',
            filter: 'blur(28px)',
          }}
        />
      )}

      {/* Hover background tint */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[#C9A227]/0 transition-colors duration-500 group-hover/feature:bg-[#C9A227]/[0.04]"
      />

      {/* Top gold line — draws on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[2px] w-0 bg-[#C9A227] transition-all duration-500 group-hover/feature:w-full"
      />

      {/* Icon */}
      <div className="relative z-10 mb-0 flex shrink-0 justify-start md:mb-4 md:justify-center">
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227]/10 transition-all duration-500 group-hover/feature:bg-[#C9A227]/20 group-hover/feature:shadow-[0_0_24px_rgba(201,162,39,0.5)]"
          whileHover={prefersReduced ? undefined : { scale: 1.1 }}
        >
          <motion.span
            className="inline-flex"
            style={
              prefersReduced
                ? undefined
                : { rotateX: rX, rotateY: rY }
            }
          >
            {icon}
          </motion.span>
        </motion.div>
      </div>

      {/* Text */}
      <div className="relative z-10">
        <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-white transition-all duration-500 group-hover/feature:tracking-[0.15em] group-hover/feature:text-[#F5E6A8] md:mb-3">
          {title}
        </h4>
        <p className="type-small text-white/70 transition-colors duration-500 group-hover/feature:text-white/95">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Image — Ken Burns + hover parallax + cursor spotlight
// ═══════════════════════════════════════════════════════════════

const InteractiveImage = ({ src, alt, progress, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { damping: 30, stiffness: 100, mass: 0.8 });
  const sy = useSpring(my, { damping: 30, stiffness: 100, mass: 0.8 });

  // Parallax shift
  const imgX = useTransform(sx, [0, 1], ['-3%', '3%']);
  const imgY = useTransform(sy, [0, 1], ['-3%', '3%']);

  // Spotlight
  const spotLeft = useTransform(sx, (v) => `${v * 100}%`);
  const spotTop  = useTransform(sy, (v) => `${v * 100}%`);

  // Ken Burns slow zoom on scroll
  const imgScale = useTransform(progress, [0, 0.5, 1], [1.02, 1.08, 1.12]);
  const imgBrightness = useTransform(progress, [0, 0.5, 1], [0.9, 1, 0.92]);
  const imgFilter = useTransform(imgBrightness, (b) => `brightness(${b})`);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group/img relative h-full w-full overflow-hidden"
    >
      {/* Ken Burns image with parallax */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[2s] ease-out group-hover/img:scale-[1.06]"
        style={
          prefersReduced
            ? undefined
            : {
                x: imgX,
                y: imgY,
                scale: imgScale,
                filter: imgFilter,
              }
        }
      />

      {/* Cursor spotlight */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-[5] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/img:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(245,230,168,0.28) 0%, rgba(201,162,39,0.10) 45%, transparent 78%)',
            filter: 'blur(45px)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Gold ring on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[6] ring-0 ring-[#C9A227] transition-all duration-500 group-hover/img:ring-2 group-hover/img:ring-inset"
      />

      {/* Corner brackets */}
      {!prefersReduced && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-4 z-[6] h-7 w-7 opacity-0 transition-all duration-500 group-hover/img:left-6 group-hover/img:top-6 group-hover/img:opacity-100"
          >
            <span className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
            <span className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-4 z-[6] h-7 w-7 opacity-0 transition-all duration-500 group-hover/img:bottom-6 group-hover/img:right-6 group-hover/img:opacity-100"
          >
            <span className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
            <span className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
          </span>
        </>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

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

  // ── CARD — iris zoom + blur focus pull ──
  const cardOpacity = useTransform(scrollYProgress, [0, 0.14], [0, 1]);
  const cardScale   = useTransform(scrollYProgress, [0, 0.14], [0.92, 1]);
  const cardY       = useTransform(scrollYProgress, [0, 0.14], [32, 0]);
  const cardBlur    = useTransform(scrollYProgress, [0, 0.14], [12, 0]);
  const cardFilter  = useTransform(cardBlur, (b) => `blur(${b}px)`);

  // ── EYEBROW — slide in + line draws ──
  const eyebrowOpacity = useTransform(scrollYProgress, [0.14, 0.24], [0, 1]);
  const eyebrowX       = useTransform(scrollYProgress, [0.14, 0.24], [-20, 0]);
  const eyebrowLine    = useTransform(scrollYProgress, [0.14, 0.26], [0, 1]);

  // ── HEADING — blur → sharp focus ──
  const headingOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0.18, 0.32], [30, 0]);
  const headingBlur    = useTransform(scrollYProgress, [0.18, 0.32], [10, 0]);
  const headingFilter  = useTransform(headingBlur, (v) => `blur(${v}px)`);
  const headingTrack   = useTransform(scrollYProgress, [0.18, 0.32], ['0.06em', '0em']);

  // ── DIVIDER — scaleX from left + shimmer ──
  const dividerScale = useTransform(scrollYProgress, [0.28, 0.38], [0, 1]);

  // ── DESCRIPTION — fade-up + letter-spacing settle ──
  const descOpacity = useTransform(scrollYProgress, [0.32, 0.46], [0, 1]);
  const descY       = useTransform(scrollYProgress, [0.32, 0.46], [20, 0]);
  const descTrack   = useTransform(scrollYProgress, [0.32, 0.46], ['0.02em', '0em']);

  // ── FEATURES group wrapper ──
  const featuresOpacity = useTransform(scrollYProgress, [0.44, 0.60], [0, 1]);
  const featuresY       = useTransform(scrollYProgress, [0.44, 0.60], [30, 0]);

  // ── CINEMATIC EXIT ──
  const exitOpacity = useTransform(scrollYProgress, [0.74, 0.94], [1, 0]);
  const exitScale   = useTransform(scrollYProgress, [0.74, 0.94], [1, 1.05]);
  const exitY       = useTransform(scrollYProgress, [0.74, 0.94], [0, -48]);

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
      <section className="relative w-full py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-0 items-stretch overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-full lg:w-1/2">
              <img
                src="/page 2 gpt.webp"
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
              <FeatureRow prefersReduced={prefersReduced} progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: '150vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Film grain overlay */}
        <FilmGrain
          progress={scrollYProgress}
          baseOpacity={0.06}
          exitOpacity={0.18}
          range={[0.7, 1]}
        />

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

        {/* ═══ CINEMATIC EXIT GROUP ═══ */}
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6"
          style={{
            opacity: exitOpacity,
            scale: exitScale,
            y: exitY,
          }}
        >
          {/* Card — iris zoom + blur focus pull */}
          <motion.div
            className="flex flex-col lg:flex-row gap-0 items-stretch overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
            style={{
              opacity: cardOpacity,
              scale: cardScale,
              y: cardY,
              filter: cardFilter,
            }}
          >
            {/* Left: Image */}
            <div className="w-full lg:w-1/2">
              <InteractiveImage
                src="/page 2 gpt.webp"
                alt="Rider with horse"
                progress={scrollYProgress}
                prefersReduced={prefersReduced}
              />
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12">

              {/* Eyebrow — slide in + line draws */}
              <motion.div
                className="group/eyebrow flex items-center gap-4 mb-6 cursor-default"
                style={{ opacity: eyebrowOpacity, x: eyebrowX }}
              >
                <span className="type-eyebrow text-[#C9A227] transition-all duration-500 group-hover/eyebrow:tracking-[0.25em]">
                  More Than
                </span>
                <motion.div
                  className="h-[1px] flex-1 origin-left bg-[#C9A227]/30 transition-all duration-500 group-hover/eyebrow:bg-[#C9A227]/60 max-w-[100px]"
                  style={{ scaleX: eyebrowLine }}
                />
              </motion.div>

              {/* Heading — blur focus pull + hover tracking */}
              <motion.h2
                className="group/heading type-page-title mb-8 cursor-default"
                style={{
                  opacity: headingOpacity,
                  y: headingY,
                  filter: headingFilter,
                  letterSpacing: headingTrack,
                }}
              >
                <span className="text-white transition-colors duration-500 group-hover/heading:text-[#F5E6A8]">
                  A
                </span>{' '}
                <span className="text-[#C9A227] transition-all duration-500 group-hover/heading:tracking-wide group-hover/heading:drop-shadow-[0_0_18px_rgba(201,162,39,0.5)]">
                  First Ride
                </span>
              </motion.h2>

              {/* Divider — scaleX + shimmer sweep on hover */}
              <motion.div
                className="group/div relative w-16 h-[2px] bg-[#C9A227]/40 mb-8 origin-left transition-all duration-500 hover:w-24 hover:bg-[#C9A227]"
                style={{ scaleX: dividerScale }}
              >
                {/* Shimmer sweep */}
                {!prefersReduced && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 group-hover/div:translate-x-full"
                  />
                )}
              </motion.div>

              {/* Description — fade-up + hover color lift */}
              <motion.p
                className="type-lead text-white/85 mb-8 sm:mb-12 text-left max-w-xl mx-0 cursor-default transition-colors duration-500 hover:text-white"
                style={{ opacity: descOpacity, y: descY, letterSpacing: descTrack }}
              >
                Equestrian sports bring together athletic skill, partnership
                with horses, discipline and training. At Nakshath,
                your first ride is an introduction to that world.
              </motion.p>

              {/* Features — 3D flip-in each */}
              <motion.div style={{ opacity: featuresOpacity, y: featuresY }}>
                <FeatureRow
                  prefersReduced={prefersReduced}
                  progress={scrollYProgress}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// FeatureRow — three interactive FeatureCards with 3D flip-in
// ═══════════════════════════════════════════════════════════════

const FeatureRow = ({ prefersReduced, progress }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#C9A227]/20 md:border-t-0">
    <FeatureCard
      index={0}
      progress={progress}
      prefersReduced={prefersReduced}
      title="Professional Coaching"
      desc="Guidance within a structured riding environment."
      icon={
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      }
    />
    <FeatureCard
      index={1}
      progress={progress}
      prefersReduced={prefersReduced}
      title="Well-Trained Horses"
      desc="Well-schooled, safe and reliable horses for riders of different levels."
      icon={
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      }
    />
    <FeatureCard
      index={2}
      progress={progress}
      prefersReduced={prefersReduced}
      title="Structured Progression"
      desc="Walk → Trot → Canter → National & International Competitions."
      icon={
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      }
    />
  </div>
);

export default MoreThanFirstRide;