// src/components/sections/HowItProgresses.jsx
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useInViewOnce } from '../../hooks/useInViewOnce';

const progression = [
  { number: '01', title: 'Walk',        lines: ['First', 'Sessions'],              tone: 'text-white', isDestination: false },
  { number: '02', title: 'Trot',        lines: ['Building', 'Balance'],            tone: 'text-white', isDestination: false },
  { number: '03', title: 'Canter',      lines: ['Control', 'and Pace'],            tone: 'text-white', isDestination: false },
  { number: '04', title: 'Competition', lines: ['National and', 'International'],  tone: 'text-[#C9A227]', isDestination: true },
];

// ─── Variants ────────────────────────────────────────────────

const imageContainerVariants = (prefersReduced) => ({
  hidden: { opacity: 0, scale: prefersReduced ? 1 : 1.03 },
  visible: { opacity: 1, scale: 1, transition: { duration: prefersReduced ? 0 : DURATION.image, ease: EASE_PRIMARY } },
});

const imageInnerVariants = (prefersReduced) => ({
  hidden: { scale: 1 },
  visible: {
    scale: prefersReduced ? 1 : [1, 1.03, 1],
    transition: {
      duration: prefersReduced ? 0 : 30,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
      delay: prefersReduced ? 0 : DURATION.image,
    },
  },
});

// ─── Sequential stagger with bigger movement ───
// Each label slides up from 40px below, completes fully before next starts.
const sequenceContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReduced ? 0 : 0.7,   // gap between labels
      delayChildren: prefersReduced ? 0 : 0.3,     // initial pause
    },
  },
});

const labelVariants = (prefersReduced) => ({
  hidden: {
    opacity: 0,
    y: prefersReduced ? 0 : 40,
    scale: prefersReduced ? 1 : 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: prefersReduced ? 0 : 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const destinationVariants = (prefersReduced) => ({
  hidden: {
    opacity: 0,
    y: prefersReduced ? 0 : 40,
    scale: prefersReduced ? 1 : 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: prefersReduced ? 0 : 1.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const eyebrowVariants = (prefersReduced) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: prefersReduced ? 0 : 0.4, ease: EASE_PRIMARY, delay: prefersReduced ? 0 : 0.15 } },
});

// ─── Progression Label ───────────────────────────────────────

const ProgressionLabel = ({
  step,
  index,
  hoveredIndex,
  setHoveredIndex,
  prefersReduced,
  isDesktop,
  position,
}) => {
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      className={`group/label ${
        isDesktop
          ? `absolute -translate-x-1/2 cursor-pointer text-center [text-shadow:0_1px_8px_rgba(0,0,0,0.55)] ${step.isDestination ? '' : 'text-white'}`
          : 'min-w-0 px-0.5 cursor-pointer'
      }`}
      style={isDesktop && position ? { left: position.left, top: position.top, width: position.width } : undefined}
      variants={step.isDestination ? destinationVariants(prefersReduced) : labelVariants(prefersReduced)}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      animate={{
        scale: isHovered ? 1.06 : 1,
        opacity: isDimmed ? 0.45 : 1,
      }}
      transition={{ duration: 0.3, ease: EASE_PRIMARY }}
    >
      {/* Number badge */}
      <motion.span
        className={`mb-2 inline-flex items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#0C0922]/60 text-[10px] font-bold tracking-wider text-[#C9A227] backdrop-blur-sm transition-all duration-500 ${
          isDesktop ? 'h-7 w-7' : 'h-5 w-5 text-[8px]'
        } ${isHovered ? 'border-[#C9A227] bg-[#C9A227] text-[#0C0922]' : ''}`}
        whileHover={prefersReduced ? undefined : { rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6, ease: EASE_PRIMARY }}
      >
        {step.number}
      </motion.span>

      {/* Title with underline */}
      <div className="relative inline-block">
        <h3
          className={`font-serif ${
            isDesktop
              ? `leading-none ${step.isDestination ? 'text-sm text-[#C9A227] md:text-[clamp(1.35rem,2.7vw,2.5rem)]' : 'text-base md:text-[clamp(1.25rem,2.4vw,2.25rem)]'}`
              : `text-[clamp(0.625rem,2.5vw,0.875rem)] leading-tight [text-shadow:0_1px_8px_rgba(0,0,0,0.65)] ${step.tone}`
          } transition-colors duration-300 ${isHovered && !step.isDestination ? 'text-[#C9A227]' : ''}`}
        >
          {step.title}
        </h3>

        {!prefersReduced && (
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/label:scale-x-100"
          />
        )}
      </div>

      {/* Subtitle with left accent bar */}
      <div className="relative mt-1.5 flex items-start justify-center gap-2">
        <span
          aria-hidden="true"
          className="mt-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/label:h-full"
        />
        <p
          className={`${
            isDesktop
              ? `type-caption font-medium uppercase text-white/90 md:mt-3 ${
                  step.isDestination ? 'tracking-normal md:tracking-[0.08em]' : 'tracking-[0.04em] md:tracking-[0.1em]'
                }`
              : 'text-[0.625rem] font-medium uppercase leading-[1.3] tracking-[0.02em] text-white/80'
          } transition-colors duration-300 ${isHovered ? 'text-white' : ''}`}
        >
          {step.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      {/* Destination ring pulse */}
      {step.isDestination && !prefersReduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-full border border-[#C9A227]/40"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
};

// ─── Main Section ────────────────────────────────────────────

const HowItProgresses = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileRef, mobileInView] = useInViewOnce({ amount: 0.3 });
  const [desktopRef, desktopInView] = useInViewOnce({ amount: 0.3 });

  const sectionRef = useRef(null);

  const imageAreaRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 25, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  const spotlightLeft = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightTop = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleImageMouseMove = (e) => {
    const rect = imageAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleImageMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const sectionMouseX = useMotionValue(0.5);
  const sectionMouseY = useMotionValue(0.5);
  const sectionSmoothX = useSpring(sectionMouseX, { damping: 60, stiffness: 60, mass: 0.8 });
  const sectionSmoothY = useSpring(sectionMouseY, { damping: 60, stiffness: 60, mass: 0.8 });
  const sectionGlowLeft = useTransform(sectionSmoothX, (v) => `${v * 100}%`);
  const sectionGlowTop = useTransform(sectionSmoothY, (v) => `${v * 100}%`);

  const handleSectionMouseMove = (e) => {
    if (prefersReduced) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    sectionMouseX.set((e.clientX - rect.left) / rect.width);
    sectionMouseY.set((e.clientY - rect.top) / rect.height);
  };

  const positions = [
    { left: '12.3%', top: '44%', width: 'clamp(7rem,15vw,13rem)' },
    { left: '33.6%', top: '35%', width: 'clamp(7rem,15vw,13rem)' },
    { left: '56%',   top: '32%', width: 'clamp(7rem,15vw,13rem)' },
    { left: '83.5%', top: '24%', width: 'clamp(11rem,24vw,20rem)' },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      id="progression-story"
      className="mobile-cta-exclusion floating-action-exclusion relative w-full overflow-hidden bg-[#FDFCFA] px-3 py-8 min-[360px]:px-5 min-[500px]:px-6 md:bg-[#0C0922] md:p-0"
    >
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
          style={{
            left: sectionGlowLeft,
            top: sectionGlowTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)',
            filter: 'blur(50px)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 z-10 hidden h-px md:block"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, transparent 20%, #C9A227 50%, transparent 80%, transparent 100%)',
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 hidden h-px md:block"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, transparent 20%, #C9A227 50%, transparent 80%, transparent 100%)',
          }}
          animate={{ opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* MOBILE FIGURE */}
      <motion.figure
        ref={mobileRef}
        className="relative z-10 overflow-hidden rounded-xl bg-[#0C0922] shadow-[0_18px_45px_rgba(12,9,34,0.16)] md:hidden"
        variants={imageContainerVariants(prefersReduced)}
        initial="hidden"
        animate={mobileInView ? 'visible' : 'hidden'}
      >
        <motion.div className="h-full w-full will-change-transform" variants={imageInnerVariants(prefersReduced)}>
          <img src="/page 5 gpt.webp" alt="Progression" loading="lazy" decoding="async" className="block h-auto w-full" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/45 via-transparent to-[#0C0922]/95" />

        <motion.h4
          className="group absolute left-4 top-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A227] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
          variants={eyebrowVariants(prefersReduced)}
        >
          <motion.span
            aria-hidden="true"
            className="inline-block h-1 w-1 rounded-full bg-[#C9A227]"
            animate={
              prefersReduced
                ? { scale: 1, opacity: 1 }
                : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          How It Progresses
        </motion.h4>

        <motion.div
          className="absolute inset-x-2 bottom-3 grid grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr] gap-1 text-center"
          variants={sequenceContainerVariants(prefersReduced)}
        >
          {progression.map((step, index) => (
            <ProgressionLabel
              key={step.title}
              step={step}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              prefersReduced={prefersReduced}
              isDesktop={false}
            />
          ))}
        </motion.div>
      </motion.figure>

      {/* DESKTOP FIGURE */}
      <motion.figure
        ref={desktopRef}
        className="relative z-10 hidden w-full md:block"
        variants={imageContainerVariants(prefersReduced)}
        initial="hidden"
        animate={desktopInView ? 'visible' : 'hidden'}
      >
        <div
          ref={imageAreaRef}
          onMouseMove={handleImageMouseMove}
          onMouseLeave={handleImageMouseLeave}
          className="group relative h-full w-full"
        >
          <motion.div
            className="h-full w-full will-change-transform"
            variants={imageInnerVariants(prefersReduced)}
            style={
              prefersReduced
                ? undefined
                : {
                    rotateX,
                    rotateY,
                    x: parallaxX,
                    y: parallaxY,
                    transformPerspective: 1400,
                    transformStyle: 'preserve-3d',
                  }
            }
          >
            <img
              src="/page 5 gpt.webp"
              alt="Progression"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0C0922]/20 via-transparent to-black/10" />

          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                left: spotlightLeft,
                top: spotlightTop,
                background:
                  'radial-gradient(circle, rgba(245,230,168,0.22) 0%, rgba(201,162,39,0.08) 45%, transparent 75%)',
                filter: 'blur(50px)',
                mixBlendMode: 'screen',
              }}
            />
          )}

          {!prefersReduced && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-6 top-6 z-20 h-8 w-8 opacity-0 transition-all duration-500 group-hover:left-8 group-hover:top-8 group-hover:opacity-100"
              >
                <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
                <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 right-6 z-20 h-8 w-8 opacity-0 transition-all duration-500 group-hover:bottom-8 group-hover:right-8 group-hover:opacity-100"
              >
                <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
                <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
              </div>
            </>
          )}

          <div className="pointer-events-none absolute inset-0 z-20 ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-1 group-hover:ring-inset" />
        </div>

        <motion.h4
          className="group absolute left-[4.8%] top-[9.5%] z-20 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A227]"
          variants={eyebrowVariants(prefersReduced)}
        >
          <motion.span
            aria-hidden="true"
            className="inline-block h-1 w-1 rounded-full bg-[#C9A227]"
            animate={
              prefersReduced
                ? { scale: 1, opacity: 1 }
                : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="transition-colors duration-300 group-hover:text-[#FFF8DC]">
            How It Progresses
          </span>
        </motion.h4>

        <motion.div className="absolute inset-0" variants={sequenceContainerVariants(prefersReduced)}>
          {progression.map((step, index) => (
            <ProgressionLabel
              key={step.title}
              step={step}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              prefersReduced={prefersReduced}
              isDesktop={true}
              position={positions[index]}
            />
          ))}
        </motion.div>
      </motion.figure>
    </section>
  );
};

export default HowItProgresses;