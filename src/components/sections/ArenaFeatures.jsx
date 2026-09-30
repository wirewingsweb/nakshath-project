// src/components/sections/ArenaFeatures.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText } from '../motion';

// ─── Variants ────────────────────────────────────────────────

const headerContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08 } },
});

const headerItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY } },
});

const gridContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.12, delayChildren: prefersReduced ? 0 : 0.15 } },
});

const featureCardVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 40 : 60), scale: prefersReduced ? 1 : 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: prefersReduced ? 0 : 0.8, ease: EASE_PRIMARY },
  },
});

const iconVariants = (prefersReduced) => ({
  hidden: { opacity: 0, scale: prefersReduced ? 1 : 0.7, rotate: prefersReduced ? 0 : -8 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: prefersReduced ? 0 : 0.6, ease: EASE_PRIMARY, delay: prefersReduced ? 0 : 0.25 },
  },
});

const dividerVariants = (prefersReduced) => ({
  hidden: { scaleX: prefersReduced ? 1 : 0 },
  visible: {
    scaleX: 1,
    transition: { duration: prefersReduced ? 0 : 0.5, ease: EASE_PRIMARY, delay: prefersReduced ? 0 : 0.4 },
  },
});

// ─── Feature Card Component ─────────────────────────────────

const FeatureCard = ({ item, index, prefersReduced }) => {
  const cardRef = useRef(null);

  // Cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 25, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  // Magnetic tilt (subtle — cards are small)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);

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

  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative grid grid-cols-[4.5rem_minmax(0,1fr)] items-start gap-4 rounded-lg p-4 min-[360px]:grid-cols-[5.7rem_minmax(0,1fr)] min-[360px]:gap-5 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-6"
      variants={featureCardVariants(prefersReduced, false)}
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
              y: -6,
              transition: { duration: 0.4, ease: EASE_PRIMARY },
            }
      }
    >
      {/* Gold spotlight behind content */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.03) 45%, transparent 75%)',
          }}
        />
      )}

      {/* Cursor-tracked bright spotlight */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            left: spotlightLeft,
            top: spotlightTop,
            background:
              'radial-gradient(circle, rgba(245,230,168,0.22) 0%, rgba(201,162,39,0.06) 45%, transparent 75%)',
            filter: 'blur(30px)',
            mixBlendMode: 'screen',
            zIndex: 0,
          }}
        />
      )}

      {/* Left accent bar — grows on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-2 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-[calc(100%-1rem)]"
        style={{ zIndex: 5 }}
      />

      {/* Number badge — top-right of card */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-2 text-[10px] font-bold tracking-[0.15em] text-white/25 transition-colors duration-500 group-hover:text-[#C9A227]"
        style={{ zIndex: 5 }}
      >
        {number}
      </span>

      {/* Icon with hover animation */}
      <motion.div
        className="relative mt-1 flex aspect-square w-full items-center justify-center overflow-hidden"
        variants={iconVariants(prefersReduced)}
        whileHover={prefersReduced ? undefined : { scale: 1.08, rotate: 2 }}
        transition={{ duration: 0.3, ease: EASE_PRIMARY }}
        style={{ zIndex: 2 }}
      >
        {/* Pulsing gold glow behind icon */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(201,162,39,0.25) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="relative h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gold ring on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-full ring-0 ring-[#C9A227]/0 transition-all duration-500 group-hover:ring-2 group-hover:ring-[#C9A227]/40"
        />
      </motion.div>

      {/* Content */}
      <div className="relative flex flex-col" style={{ zIndex: 2 }}>
        <h3 className="text-base font-semibold uppercase leading-[1.35] tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-[#C9A227] md:min-h-[2.7em]">
          {item.title}
        </h3>

        {/* Divider — grows on hover */}
        <motion.span
          aria-hidden="true"
          className="my-3 block h-px w-8 origin-left bg-[#C9A227]/60 transition-all duration-500 group-hover:w-16 group-hover:bg-[#C9A227]"
          variants={dividerVariants(prefersReduced)}
        />

        <p className="type-small mt-3 max-w-[14rem] text-white/75 transition-colors duration-300 group-hover:text-white/95">
          {item.desc}
        </p>

        {/* "Learn more" link — appears on hover */}
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

      {/* Outer gold ring on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-[#C9A227]/0 transition-all duration-500 group-hover:ring-1 group-hover:ring-[#C9A227]/30"
        style={{ zIndex: 1 }}
      />
    </motion.div>
  );
};

// ─── Main Section ────────────────────────────────────────────

const ArenaFeatures = () => {
  const features = [
    { img: '/arena-indoor.webp', title: 'Indoor Arena', desc: 'Training in a safe, controlled, covered environment.' },
    { img: '/arena-weather.webp', title: 'All-Weather Training', desc: 'Sessions run through monsoon and peak summer heat.' },
    { img: '/arena-footing.webp', title: 'International Footing', desc: 'Geotextile surface built for grip, cushioning and safety.' },
    { img: '/arena-batches.webp', title: 'Small Batches', desc: 'Limited riders per session so every rider gets attention.' },
    { img: '/arena-horses.webp', title: 'Schooled Horses', desc: 'Calm, well-trained horses matched to rider level.' },
    { img: '/arena-progression.webp', title: 'Structured Progression', desc: 'Walk, trot, canter, and on to national and international competition.' },
  ];

  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [headerRef, headerInView] = useInViewOnce({ amount: 0.3 });
  const [gridRef, gridInView] = useInViewOnce({ amount: 0.15 });

  const sectionRef = useRef(null);

  // Section-wide cursor glow
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
      className="relative overflow-hidden bg-[#0C0922] px-6 py-16 text-white md:px-[8vw] md:py-24"
    >
      {/* Base radial glow — breathing */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,39,0.10), transparent 70%)' }}
        animate={prefersReduced ? { opacity: 0.5 } : { opacity: [0.4, 0.7, 0.4] }}
        transition={prefersReduced ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Section-wide cursor-following glow */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: sectionGlowLeft,
            top: sectionGlowTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.15) 0%, rgba(201,162,39,0.04) 45%, transparent 70%)',
            filter: 'blur(60px)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Top edge — animated gold line */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-px z-10"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, transparent 20%, #C9A227 50%, transparent 80%, transparent 100%)',
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Bottom edge — animated gold line */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px z-10"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, transparent 20%, #C9A227 50%, transparent 80%, transparent 100%)',
          }}
          animate={{ opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-[96rem]">
        <motion.div
          ref={headerRef}
          variants={headerContainerVariants(prefersReduced)}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          {/* Eyebrow with pulsing dot */}
          <motion.h4
            className="group type-eyebrow mb-5 flex cursor-default items-center gap-3 text-[#C9A227]"
            variants={headerItemVariants(prefersReduced, isMobile, 8)}
          >
            <motion.span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
              animate={
                prefersReduced
                  ? { scale: 1, opacity: 1 }
                  : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
              }
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="transition-colors duration-300 group-hover:text-[#FFF8DC]">
              The Arena
            </span>
          </motion.h4>

          {/* Heading with word-hover */}
          <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
            <SplitText
              as="h2"
              className="type-page-title mb-14 md:mb-16"
              wordDelay={0.05}
              startDelay={0.15}
              amount={0.3}
            >
              Built so the training<br />never stops.
            </SplitText>
          </div>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-14 xl:grid-cols-3 xl:gap-x-[4vw]"
          variants={gridContainerVariants(prefersReduced)}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {features.map((item, index) => (
            <FeatureCard
              key={index}
              item={item}
              index={index}
              prefersReduced={prefersReduced}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ArenaFeatures;