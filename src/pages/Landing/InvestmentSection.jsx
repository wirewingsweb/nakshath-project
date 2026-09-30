// src/pages/Landing/InvestmentSection.jsx
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

const levels = [
  { level: 'LEVEL 01', lessons: '10', price: '₹11,999', img: '/level 1.webp', tone: 'light' },
  { level: 'LEVEL 02', lessons: '20', price: '₹29,999', img: '/level 2.webp', tone: 'light' },
  { level: 'LEVEL 03', lessons: '20', price: '₹32,999', img: '/level 3.webp', tone: 'dark' },
];

// ═══════════════════════════════════════════════════════════════
// Interactive Level Card — Spotlight Stack reveal + 3D tilt
// ═══════════════════════════════════════════════════════════════

const LevelCard = ({ item, idx, progress, prefersReduced }) => {
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

  // Image parallax
  const imgX = useTransform(sx, [-0.5, 0.5], ['-4%', '4%']);
  const imgY = useTransform(sy, [-0.5, 0.5], ['-4%', '4%']);

  // Spotlight Stack reveal
  const start = 0.22 + idx * 0.06;
  const end = start + 0.16;

  const cardOpacity = useTransform(progress, [start, end], [0, 1]);
  const cardScale   = useTransform(progress, [start, end], [0.85, 1]);
  const cardY       = useTransform(progress, [start, end], [50, 0]);
  const cardRotateX = useTransform(progress, [start, end], [15, 0]);

  // Image center-out iris reveal
  const imgClip = useTransform(
    progress,
    [start + 0.03, end + 0.02],
    ['inset(50% 50% 50% 50%)', 'inset(0% 0% 0% 0%)']
  );

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

  const isDark = item.tone === 'dark';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group/lvl relative aspect-[1324/1188] overflow-hidden rounded-2xl border border-[#C9A227]/20 bg-[#0C0922] shadow-lg transition-all duration-500 hover:border-[#C9A227]/50 hover:shadow-[0_24px_60px_-15px_rgba(201,162,39,0.5)]"
      style={{
        opacity: cardOpacity,
        scale: cardScale,
        y: cardY,
        rotateX: prefersReduced ? 0 : cardRotateX,
        rotateY: prefersReduced ? 0 : rY,
        transformPerspective: 1400,
        transformStyle: 'preserve-3d',
      }}
      whileHover={prefersReduced ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: EASE_PRIMARY }}
    >
      {/* Image with parallax + iris reveal */}
      <motion.div
        className="absolute inset-0"
        style={
          prefersReduced
            ? undefined
            : { clipPath: imgClip }
        }
      >
        <motion.img
          src={item.img}
          alt={item.level}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-contain transition-transform duration-700 group-hover/lvl:scale-[1.08] ${
            idx === 0 ? 'scale-[1.06]' : ''
          }`}
          style={
            prefersReduced
              ? undefined
              : { x: imgX, y: imgY }
          }
        />
      </motion.div>

      {/* Base gradient overlay */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-b from-black/30 via-black/20 to-black/40'
            : 'bg-gradient-to-b from-black/40 via-black/30 to-black/50'
        }`}
      />

      {/* Cursor spotlight */}
      {!prefersReduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute z-[3] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/lvl:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(245,230,168,0.28) 0%, rgba(201,162,39,0.10) 45%, transparent 78%)',
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Gold ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[4] rounded-2xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover/lvl:ring-2 group-hover/lvl:ring-inset"
      />

      {/* Corner brackets */}
      {!prefersReduced && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-4 z-[5] h-6 w-6 opacity-0 transition-all duration-500 group-hover/lvl:left-6 group-hover/lvl:top-6 group-hover/lvl:opacity-100"
          >
            <span className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
            <span className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-4 z-[5] h-6 w-6 opacity-0 transition-all duration-500 group-hover/lvl:bottom-6 group-hover/lvl:right-6 group-hover/lvl:opacity-100"
          >
            <span className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
            <span className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
          </span>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center [text-shadow:0_2px_12px_rgba(0,0,0,.85),0_1px_3px_rgba(0,0,0,.6)]">
        <p className="type-eyebrow mb-3 text-white/95 transition-all duration-500 group-hover/lvl:tracking-[0.25em] group-hover/lvl:text-[#F5E6A8]">
          {item.level}
        </p>
        <p className="type-page-title mb-2 text-white transition-all duration-500 group-hover/lvl:scale-105">
          {item.lessons}
        </p>
        <p className="type-small mb-5 uppercase tracking-wider text-white/85 transition-all duration-500 group-hover/lvl:tracking-[0.2em] group-hover/lvl:text-white">
          Lessons
        </p>
        <p className="type-section-title text-[#C9A227] transition-all duration-500 group-hover/lvl:tracking-wide group-hover/lvl:drop-shadow-[0_0_18px_rgba(201,162,39,0.7)]">
          {item.price}
        </p>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Trial Card — slide in from side + 3D tilt + spotlight
// ═══════════════════════════════════════════════════════════════

const TrialCard = ({
  eyebrow,
  title,
  price,
  desc,
  img,
  side,
  progress,
  start,
  prefersReduced,
}) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 22, stiffness: 180, mass: 0.6 });
  const sy = useSpring(my, { damping: 22, stiffness: 180, mass: 0.6 });

  const rX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rY = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  const spotLeft = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const spotTop  = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  // Slide-in from opposite sides
  const end = start + 0.16;
  const slideIn = useTransform(
    progress,
    [start, end],
    [side === 'left' ? -60 : 60, 0]
  );
  const cardOpacity = useTransform(progress, [start, end], [0, 1]);
  const cardScale   = useTransform(progress, [start, end], [0.92, 1]);

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
      className="group/trial relative flex h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg backdrop-blur-md transition-all duration-500 hover:border-[#C9A227]/50 hover:shadow-[0_20px_60px_-15px_rgba(201,162,39,0.5)]"
      style={{
        opacity: cardOpacity,
        x: prefersReduced ? 0 : slideIn,
        scale: cardScale,
        rotateX: prefersReduced ? 0 : rX,
        rotateY: prefersReduced ? 0 : rY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      whileHover={prefersReduced ? undefined : { y: -4 }}
      transition={{ duration: 0.35, ease: EASE_PRIMARY }}
    >
      {/* Cursor spotlight */}
      {!prefersReduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/trial:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.22) 0%, rgba(201,162,39,0.05) 50%, transparent 78%)',
            filter: 'blur(32px)',
          }}
        />
      )}

      {/* Gold ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[4] rounded-2xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover/trial:ring-2 group-hover/trial:ring-inset"
      />

      {/* Corner brackets */}
      {!prefersReduced && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-3 z-[5] h-4 w-4 opacity-0 transition-all duration-500 group-hover/trial:left-5 group-hover/trial:top-5 group-hover/trial:opacity-100"
          >
            <span className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
            <span className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3 z-[5] h-4 w-4 opacity-0 transition-all duration-500 group-hover/trial:bottom-5 group-hover/trial:right-5 group-hover/trial:opacity-100"
          >
            <span className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
            <span className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
          </span>
        </>
      )}

      {/* Image side */}
      <div className="group/img relative w-[35%] min-h-[180px] overflow-hidden">
        <img
          src={img}
          alt={eyebrow}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover/trial:scale-110"
        />

        {/* Gradient sweep overlay */}
        {!prefersReduced && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover/trial:translate-x-full"
          />
        )}
      </div>

      {/* Text side */}
      <div className="relative z-10 flex w-[65%] flex-col justify-center p-6">
        <p className="type-eyebrow mb-1 text-[#C9A227] transition-all duration-500 group-hover/trial:tracking-[0.25em]">
          {eyebrow}
        </p>
        <p className="type-card-title mb-1 text-white transition-colors duration-500 group-hover/trial:text-[#F5E6A8]">
          {title}
        </p>
        <p className="type-section-title mb-2 text-[#C9A227] transition-all duration-500 group-hover/trial:tracking-wide group-hover/trial:drop-shadow-[0_0_14px_rgba(201,162,39,0.6)]">
          {price}
        </p>
        <p className="type-caption text-white/75 transition-colors duration-500 group-hover/trial:text-white/95">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Magnetic CTA button
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
        className="group/cta type-button relative overflow-hidden rounded-full bg-[#C9A227] px-8 py-4 text-[#0C0922] shadow-lg transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_-8px_rgba(201,162,39,0.7)] sm:px-10"
      >
        {!prefersReduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-400 group-hover/cta:opacity-100"
            style={{
              left: spotLeft,
              top: spotTop,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 45%, transparent 78%)',
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

const InvestmentSection = () => {
  const { openEnquiry } = useEnquiry();
  const prefersReduced = usePrefersReducedMotion();

  const sceneARef = useRef(null);
  const progressA = useMotionValue(0);

  const sceneBRef = useRef(null);
  const progressB = useMotionValue(0);

  const makeUpdater = (ref, motionValue) => () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const totalScroll = el.offsetHeight - window.innerHeight;
    const currentScroll = Math.max(0, -rect.top);
    const progress = totalScroll > 0 ? Math.min(1, currentScroll / totalScroll) : 0;
    motionValue.set(progress);
  };

  useEffect(() => {
    const updateA = makeUpdater(sceneARef, progressA);
    const updateB = makeUpdater(sceneBRef, progressB);
    const updateAll = () => {
      updateA();
      updateB();
    };

    updateAll();
    window.addEventListener('scroll', updateAll, { passive: true });
    window.addEventListener('resize', updateAll);
    return () => {
      window.removeEventListener('scroll', updateAll);
      window.removeEventListener('resize', updateAll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ═══ SCENE A ═══
  const bgOpacity    = useTransform(progressA, [0, 0.12], [0, 1]);
  const bgScale      = useTransform(progressA, [0, 0.72, 1], [1.05, 1, 1.15]);
  const bgBrightness = useTransform(progressA, [0, 0.72, 1], [1, 0.95, 0.82]);
  const bgFilter     = useTransform(bgBrightness, (b) => `brightness(${b})`);

  // Scene A cursor glow
  const sceneAMx = useMotionValue(0.5);
  const sceneAMy = useMotionValue(0.5);
  const sceneASx = useSpring(sceneAMx, { damping: 60, stiffness: 60, mass: 0.8 });
  const sceneASy = useSpring(sceneAMy, { damping: 60, stiffness: 60, mass: 0.8 });
  const sceneALeft = useTransform(sceneASx, (v) => `${v * 100}%`);
  const sceneATop  = useTransform(sceneASy, (v) => `${v * 100}%`);

  const h1Opacity = useTransform(progressA, [0.06, 0.20], [0, 1]);
  const h1Y       = useTransform(progressA, [0.06, 0.20], [30, 0]);
  const h1Blur    = useTransform(progressA, [0.06, 0.20], [10, 0]);
  const h1Filter  = useTransform(h1Blur, (v) => `blur(${v}px)`);
  const h1Track   = useTransform(progressA, [0.06, 0.20], ['0.04em', '0em']);

  const exitAOpacity = useTransform(progressA, [0.78, 0.94], [1, 0]);
  const exitAScale   = useTransform(progressA, [0.78, 0.94], [1, 1.04]);
  const exitAY       = useTransform(progressA, [0.78, 0.94], [0, -48]);

  // ═══ SCENE B ═══
  const h2Opacity = useTransform(progressB, [0.06, 0.20], [0, 1]);
  const h2Y       = useTransform(progressB, [0.06, 0.20], [30, 0]);
  const h2Blur    = useTransform(progressB, [0.06, 0.20], [10, 0]);
  const h2Filter  = useTransform(h2Blur, (v) => `blur(${v}px)`);
  const h2Track   = useTransform(progressB, [0.06, 0.20], ['0.04em', '0em']);

  const ctaOpacity = useTransform(progressB, [0.48, 0.62], [0, 1]);
  const ctaY       = useTransform(progressB, [0.48, 0.62], [20, 0]);

  const exitBOpacity = useTransform(progressB, [0.78, 0.94], [1, 0]);
  const exitBScale   = useTransform(progressB, [0.78, 0.94], [1, 1.04]);
  const exitBY       = useTransform(progressB, [0.78, 0.94], [0, -48]);

  // Scene B cursor glow
  const sceneBMx = useMotionValue(0.5);
  const sceneBMy = useMotionValue(0.5);
  const sceneBSx = useSpring(sceneBMx, { damping: 60, stiffness: 60, mass: 0.8 });
  const sceneBSy = useSpring(sceneBMy, { damping: 60, stiffness: 60, mass: 0.8 });
  const sceneBLeft = useTransform(sceneBSx, (v) => `${v * 100}%`);
  const sceneBTop  = useTransform(sceneBSy, (v) => `${v * 100}%`);

  // ── Cursor handlers ──
  useEffect(() => {
    if (prefersReduced) return undefined;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return undefined;

    const handleA = (e) => {
      const el = sceneARef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      sceneAMx.set((e.clientX - rect.left) / rect.width);
      sceneAMy.set((e.clientY - rect.top) / rect.height);
    };
    const handleB = (e) => {
      const el = sceneBRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      sceneBMx.set((e.clientX - rect.left) / rect.width);
      sceneBMy.set((e.clientY - rect.top) / rect.height);
    };

    const elA = sceneARef.current;
    const elB = sceneBRef.current;
    if (elA) elA.addEventListener('mousemove', handleA);
    if (elB) elB.addEventListener('mousemove', handleB);

    return () => {
      if (elA) elA.removeEventListener('mousemove', handleA);
      if (elB) elB.removeEventListener('mousemove', handleB);
    };
  }, [prefersReduced, sceneAMx, sceneAMy, sceneBMx, sceneBMy]);

  // ── Reduced motion fallback ──
  if (prefersReduced) {
    return (
      <section className="relative w-full overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-12 text-center">
            <h4 className="type-eyebrow mb-4 text-[#C9A227]">The Investment</h4>
            <h2 className="type-section-title mb-6">
              <span className="text-white">Your Training,</span>{' '}
              <span className="text-[#C9A227]">Your Progression</span>
            </h2>
          </div>
          <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
            {levels.map((item, idx) => (
              <LevelCard
                key={idx}
                item={item}
                idx={idx}
                progress={progressA}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>

          <div className="mb-10 text-center">
            <h4 className="type-eyebrow mb-4 text-white/70">Not Sure Where to Begin?</h4>
            <h2 className="type-section-title">
              <span className="text-white">Begin with a</span>{' '}
              <span className="text-[#C9A227]">Trial Ride.</span>
            </h2>
          </div>
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <TrialCard
              eyebrow="Free Trial Ride"
              title="10 Minutes"
              price="Free"
              desc="An introductory riding experience for new registrations."
              img="/free ride.webp"
              side="left"
              progress={progressB}
              start={0.22}
              prefersReduced={prefersReduced}
            />
            <TrialCard
              eyebrow="Paid Trial Ride"
              title="45 Minutes"
              price="₹1,999"
              desc="An extended trial riding session."
              img="/paid ride.webp"
              side="right"
              progress={progressB}
              start={0.28}
              prefersReduced={prefersReduced}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button rounded-full bg-[#C9A227] px-10 py-4 text-[#0C0922] transition-colors hover:bg-white"
            >
              Book Your Trial Ride →
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ═══ SCENE A — The Investment ═══ */}
      <div ref={sceneARef} className="relative w-full" style={{ height: '200vh' }}>
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
              src="/trial-ride.webp"
              alt="Rider on Horse"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-left brightness-[1.5] contrast-[1.05] saturate-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/85 via-[#0C0922]/85 to-[#0C0922]/95" />
          </motion.div>

          {/* Scene A cursor ambient glow */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute z-[5] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: sceneALeft,
                top: sceneATop,
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
              opacity: exitAOpacity,
              scale: exitAScale,
              y: exitAY,
            }}
          >
            <div className="mb-8 text-center lg:mb-12">
              <motion.div
                className="group/eyebrow mb-4 inline-flex cursor-default items-center gap-3"
                style={{ opacity: h1Opacity }}
              >
                <span className="h-1 w-1 rounded-full bg-[#C9A227] transition-all duration-500 group-hover/eyebrow:w-5" />
                <span className="type-eyebrow text-[#C9A227] transition-all duration-500 group-hover/eyebrow:tracking-[0.25em] group-hover/eyebrow:text-[#F5E6A8]">
                  The Investment
                </span>
              </motion.div>
              <motion.h2
                className="group/heading type-section-title cursor-default"
                style={{
                  opacity: h1Opacity,
                  y: h1Y,
                  filter: h1Filter,
                  letterSpacing: h1Track,
                }}
              >
                <span className="text-white transition-colors duration-500 group-hover/heading:text-[#F5E6A8]">
                  Your Training,
                </span>{' '}
                <span className="text-[#C9A227] transition-all duration-500 group-hover/heading:tracking-wide group-hover/heading:drop-shadow-[0_0_18px_rgba(201,162,39,0.5)]">
                  Your Progression
                </span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {levels.map((item, idx) => (
                <LevelCard
                  key={idx}
                  item={item}
                  idx={idx}
                  progress={progressA}
                  prefersReduced={prefersReduced}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ SCENE B — Begin with a Trial Ride ═══ */}
      <div ref={sceneBRef} className="relative w-full" style={{ height: '200vh' }}>
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

          {/* Scene B cursor ambient glow */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute z-[5] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: sceneBLeft,
                top: sceneBTop,
                background:
                  'radial-gradient(circle, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.03) 45%, transparent 75%)',
                filter: 'blur(60px)',
                mixBlendMode: 'screen',
              }}
            />
          )}

          <motion.div
            className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6"
            style={{
              opacity: exitBOpacity,
              scale: exitBScale,
              y: exitBY,
            }}
          >
            <div className="mb-8 text-center lg:mb-12">
              <motion.div
                className="group/eyebrow mb-4 inline-flex cursor-default items-center gap-3"
                style={{ opacity: h2Opacity }}
              >
                <span className="h-1 w-1 rounded-full bg-[#C9A227] transition-all duration-500 group-hover/eyebrow:w-5" />
                <span className="type-eyebrow text-white/70 transition-all duration-500 group-hover/eyebrow:tracking-[0.25em] group-hover/eyebrow:text-[#F5E6A8]">
                  Not Sure Where to Begin?
                </span>
              </motion.div>
              <motion.h2
                className="group/heading type-section-title cursor-default"
                style={{
                  opacity: h2Opacity,
                  y: h2Y,
                  filter: h2Filter,
                  letterSpacing: h2Track,
                }}
              >
                <span className="text-white transition-colors duration-500 group-hover/heading:text-[#F5E6A8]">
                  Begin with a
                </span>{' '}
                <span className="text-[#C9A227] transition-all duration-500 group-hover/heading:tracking-wide group-hover/heading:drop-shadow-[0_0_18px_rgba(201,162,39,0.5)]">
                  Trial Ride.
                </span>
              </motion.h2>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              <TrialCard
                eyebrow="Free Trial Ride"
                title="10 Minutes"
                price="Free"
                desc="An introductory riding experience for new registrations."
                img="/free ride.webp"
                side="left"
                progress={progressB}
                start={0.22}
                prefersReduced={prefersReduced}
              />
              <TrialCard
                eyebrow="Paid Trial Ride"
                title="45 Minutes"
                price="₹1,999"
                desc="An extended trial riding session."
                img="/paid ride.webp"
                side="right"
                progress={progressB}
                start={0.28}
                prefersReduced={prefersReduced}
              />
            </div>

            <motion.div
              className="text-center"
              style={{ opacity: ctaOpacity, y: ctaY }}
            >
              <MagneticCTA
                onClick={() => openEnquiry('Trial Ride')}
                prefersReduced={prefersReduced}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default InvestmentSection;