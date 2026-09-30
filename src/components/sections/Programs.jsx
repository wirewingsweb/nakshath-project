// src/components/sections/Programs.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';

const programs = [
  { number: '01', title: 'Kids Special', description: 'Pony riding, confidence and coordination for children.', image: '/page 4 3 gpt.webp', offset: 'xl:mt-0', imageClass: 'object-contain' },
  { number: '02', title: 'Beginner', description: 'First-time riders. Balance, posture, safety and horse handling.', image: '/page 4 gpt.webp', offset: 'xl:mt-[5.5vw]', imageClass: 'object-contain' },
  { number: '03', title: 'Intermediate', description: 'Riding technique, communication, trotting and cantering.', image: '/page 4 2 gpt.webp', offset: 'xl:mt-[0.8vw]', imageClass: 'object-contain' },
  { number: '04', title: 'Professional Competition', description: 'Show jumping preparation and performance assessment.', image: '/page 4 4 gpt.webp', offset: 'xl:mt-[5vw]', imageClass: 'object-cover object-top' },
];

// ─── Variants ────────────────────────────────────────────────

const headerContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08 } },
});

const headerItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY },
  },
});

const cardsContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReduced ? 0 : 0.12,
      delayChildren: prefersReduced ? 0 : 0.15,
    },
  },
});

// ─── Left-to-right stack reveal ──────────────────────────────
// Cards start off-screen left, slightly rotated, scaled down.
// They slide into place with a spring-like ease, staggered.
const cardVariants = (prefersReduced, isMobile) => ({
  hidden: {
    opacity: 0,
    x: prefersReduced ? 0 : -140,
    y: prefersReduced ? 0 : (isMobile ? 30 : 60),
    rotate: prefersReduced ? 0 : -8,
    scale: prefersReduced ? 1 : 0.92,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: prefersReduced ? 0 : 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const ctaVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 6 : 10) },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: prefersReduced ? 0 : 0.5, ease: EASE_PRIMARY, delay: prefersReduced ? 0 : 0.15 },
  },
});

// ─── Program Card Component ──────────────────────────────────

const ProgramCard = ({ program, prefersReduced, isMobile }) => {
  const cardRef = useRef(null);

  // Cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 25, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  // 3D magnetic tilt
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  // Spotlight position
  const spotlightLeft = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightTop = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${program.offset} group relative flex w-[84vw] max-w-[21rem] shrink-0 snap-start snap-always flex-col overflow-hidden rounded-xl bg-[#0C0922] sm:w-[42vw] sm:max-w-none lg:w-[30vw] xl:w-[20vw]`}
      variants={cardVariants(prefersReduced, isMobile)}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }
      }
      whileHover={
        prefersReduced
          ? undefined
          : {
              y: -8,
              transition: { duration: 0.4, ease: EASE_PRIMARY },
            }
      }
    >
      {/* Image wrapper */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0C0922]">
        <motion.img
          src={program.image}
          alt={program.title}
          loading="lazy"
          decoding="async"
          className={`block h-full w-full ${program.imageClass}`}
          whileHover={prefersReduced ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.6, ease: EASE_PRIMARY }}
        />

        {/* Cursor-tracked gold spotlight */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              left: spotlightLeft,
              top: spotlightTop,
              background:
                'radial-gradient(circle, rgba(245,230,168,0.35) 0%, rgba(201,162,39,0.12) 45%, transparent 75%)',
              filter: 'blur(30px)',
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Number badge */}
        <motion.div
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A227]/50 bg-[#0C0922]/80 text-[10px] font-bold tracking-wider text-[#C9A227] backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-[#0C0922] md:h-9 md:w-9"
          whileHover={prefersReduced ? undefined : { rotate: 360 }}
          transition={{ duration: 0.6, ease: EASE_PRIMARY }}
        >
          {program.number}
        </motion.div>

        {/* Bottom fade for depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0C0922] to-transparent"
        />

        {/* Top edge gold accent */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_PRIMARY, delay: 0.3 }}
          />
        )}

        {/* Corner brackets */}
        {!prefersReduced && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-3 h-6 w-6 opacity-0 transition-all duration-500 group-hover:left-4 group-hover:top-4 group-hover:opacity-100"
            >
              <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
              <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 opacity-0 transition-all duration-500 group-hover:bottom-4 group-hover:right-4 group-hover:opacity-100"
            >
              <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
              <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
            </div>
          </>
        )}
      </div>

      {/* Card body */}
      <div className="relative flex min-h-[8rem] flex-1 flex-col px-5 py-5 text-white md:min-h-[9rem] md:px-6 md:py-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-6 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-[calc(100%-3rem)]"
        />

        <h3 className="mb-2 text-base font-semibold leading-snug transition-colors duration-300 group-hover:text-[#C9A227] md:mb-[0.7vw]">
          {program.title}
        </h3>
        <p className="type-small max-w-[17rem] text-white/80 transition-colors duration-300 group-hover:text-white/95">
          {program.description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A227] opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span>Explore</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.4"
            stroke="currentColor"
            className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>

      {/* Outer gold ring glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-offset-[#FDFCFA]"
      />
    </motion.article>
  );
};

// ─── Main Section ────────────────────────────────────────────

const Programs = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const [headerRef, headerInView] = useInViewOnce({ amount: 0.3 });
  const [cardsRef, cardsInView] = useInViewOnce({ amount: 0.15 });
  const [ctaRef, ctaInView] = useInViewOnce({ amount: 0.3 });

  const sectionRef = useRef(null);

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

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="mobile-cta-exclusion floating-action-exclusion relative w-full overflow-hidden border-t-[0.45rem] border-[#0C0922] bg-[#FDFCFA] py-16 md:py-24"
    >
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: sectionGlowLeft,
            top: sectionGlowTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)',
            filter: 'blur(50px)',
            mixBlendMode: 'multiply',
          }}
        />
      )}

      {/* Header */}
      <motion.div
        ref={headerRef}
        className="relative z-10 pl-6 pr-6 sm:pl-10 md:pl-[6.4vw]"
        variants={headerContainerVariants(prefersReduced)}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
      >
        <motion.h4
          className="group type-eyebrow mb-4 flex cursor-default items-center gap-3 text-[#876B18]"
          variants={headerItemVariants(prefersReduced, isMobile, 8)}
        >
          <motion.span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
            animate={
              prefersReduced
                ? { scale: 1, opacity: 1 }
                : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="transition-colors duration-300 group-hover:text-[#C9A227]">
            Programs
          </span>
        </motion.h4>

        <motion.h2
          className="type-page-title cursor-default text-[#1A1A1A] transition-colors duration-500 hover:text-[#876B18]"
          variants={headerItemVariants(prefersReduced, isMobile, 16)}
        >
          Four ways in,<br />one path forward.
        </motion.h2>
      </motion.div>

      {/* Carousel */}
      <div
        className="programs-carousel relative z-10 mt-8 snap-x snap-mandatory scroll-pl-6 overflow-x-auto overscroll-x-contain pl-6 sm:scroll-pl-10 sm:pl-10 md:mt-14 md:scroll-pl-[5.9vw] md:pl-[5.9vw]"
        aria-label="Programs carousel"
        tabIndex="0"
      >
        <motion.div
          ref={cardsRef}
          className="flex w-max items-start gap-6 pr-6 md:gap-[1.5vw] md:pr-[4vw]"
          variants={cardsContainerVariants(prefersReduced)}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
        >
          {programs.map((program) => (
            <ProgramCard
              key={program.title}
              program={program}
              prefersReduced={prefersReduced}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        ref={ctaRef}
        className="relative z-10 mt-12 pl-6 sm:pl-10 md:mt-[3vw] md:pl-[5.9vw]"
        variants={ctaVariants(prefersReduced, isMobile)}
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
      >
        <Link
          to="/courses"
          className="group/link relative inline-flex items-center gap-2 text-xs font-semibold text-[#1A1A1A] transition-colors duration-300 hover:text-[#876B18]"
        >
          <span className="relative pb-1">
            See all programs
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full bg-[#876B18]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100"
            />
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.4"
            stroke="currentColor"
            className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default Programs;