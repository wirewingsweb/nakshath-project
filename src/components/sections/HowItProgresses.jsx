// src/components/sections/HowItProgresses.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useInViewOnce } from '../../hooks/useInViewOnce';

const progression = [
  { title: 'Walk', lines: ['First', 'Sessions'], tone: 'text-white', isDestination: false },
  { title: 'Trot', lines: ['Building', 'Balance'], tone: 'text-white', isDestination: false },
  { title: 'Canter', lines: ['Control', 'and Pace'], tone: 'text-white', isDestination: false },
  { title: 'Competition', lines: ['National and', 'International'], tone: 'text-[#C9A227]', isDestination: true },
];

const imageContainerVariants = (prefersReduced) => ({
  hidden: { opacity: 0, scale: prefersReduced ? 1 : 1.03 },
  visible: { opacity: 1, scale: 1, transition: { duration: prefersReduced ? 0 : DURATION.image, ease: EASE_PRIMARY } },
});

const imageInnerVariants = (prefersReduced) => ({
  hidden: { scale: 1 },
  visible: {
    scale: prefersReduced ? 1 : [1, 1.03, 1],
    transition: { duration: prefersReduced ? 0 : 30, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', delay: prefersReduced ? 0 : DURATION.image },
  },
});

// Sequential stagger — each label fully completes before the next begins.
// labelVariants duration is 0.7s, destinationVariants is 0.9s.
// staggerChildren: 0.8s ensures no overlap.
const sequenceContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReduced ? 0 : 0.8,
      delayChildren: prefersReduced ? 0 : 0.3,
    },
  },
});

const labelVariants = (prefersReduced) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : 8 },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.7, ease: EASE_PRIMARY } },
});

const destinationVariants = (prefersReduced) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : 8 },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.9, ease: EASE_PRIMARY } },
});

const eyebrowVariants = (prefersReduced) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: prefersReduced ? 0 : 0.4, ease: EASE_PRIMARY, delay: prefersReduced ? 0 : 0.15 } },
});

const HowItProgresses = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileRef, mobileInView] = useInViewOnce({ amount: 0.3 });
  const [desktopRef, desktopInView] = useInViewOnce({ amount: 0.3 });

  return (
    <section id="progression-story" className="mobile-cta-exclusion floating-action-exclusion w-full overflow-hidden bg-[#FDFCFA] px-3 py-8 min-[360px]:px-5 min-[500px]:px-6 md:bg-[#0C0922] md:p-0">

      {/* MOBILE FIGURE */}
      <motion.figure
        ref={mobileRef}
        className="relative overflow-hidden rounded-xl bg-[#0C0922] shadow-[0_18px_45px_rgba(12,9,34,0.16)] md:hidden"
        variants={imageContainerVariants(prefersReduced)}
        initial="hidden"
        animate={mobileInView ? 'visible' : 'hidden'}
      >
        <motion.div className="h-full w-full will-change-transform" variants={imageInnerVariants(prefersReduced)}>
          <img src="/page 5 gpt.png" alt="Progression" loading="lazy" decoding="async" className="block h-auto w-full" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/45 via-transparent to-[#0C0922]/95" />
        <motion.h4 className="type-eyebrow absolute left-4 top-4 text-[#C9A227] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]" variants={eyebrowVariants(prefersReduced)}>
          How It Progresses
        </motion.h4>
        <motion.div className="absolute inset-x-2 bottom-3 grid grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr] gap-1 text-center" variants={sequenceContainerVariants(prefersReduced)}>
          {progression.map((step, index) => {
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
            return (
              <motion.div
                key={step.title}
                className="min-w-0 px-0.5 cursor-pointer"
                variants={step.isDestination ? destinationVariants(prefersReduced) : labelVariants(prefersReduced)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{ scale: isHovered ? 1.06 : 1, opacity: isDimmed ? 0.45 : 1 }}
                transition={{ duration: 0.3, ease: EASE_PRIMARY }}
              >
                <h3 className={`font-serif text-[clamp(0.625rem,2.5vw,0.875rem)] leading-tight [text-shadow:0_1px_8px_rgba(0,0,0,0.65)] ${step.tone}`}>{step.title}</h3>
                <p className="mt-1.5 text-[0.625rem] font-medium uppercase leading-[1.3] tracking-[0.02em] text-white/80">
                  {step.lines.map((line) => <span key={line} className="block">{line}</span>)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.figure>

      {/* DESKTOP FIGURE */}
      <motion.figure
        ref={desktopRef}
        className="relative hidden w-full md:block"
        variants={imageContainerVariants(prefersReduced)}
        initial="hidden"
        animate={desktopInView ? 'visible' : 'hidden'}
      >
        <motion.div className="h-full w-full will-change-transform" variants={imageInnerVariants(prefersReduced)}>
          <img src="/page 5 gpt.png" alt="Progression" loading="lazy" decoding="async" className="block h-auto w-full" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/20 via-transparent to-black/10" />
        <motion.h4 className="type-eyebrow absolute left-[4.8%] top-[9.5%] text-[#C9A227]" variants={eyebrowVariants(prefersReduced)}>
          How It Progresses
        </motion.h4>
        <motion.div className="absolute inset-0" variants={sequenceContainerVariants(prefersReduced)}>
          {progression.map((step, index) => {
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
            // Canter lowered from 27% to 32%, Competition from 18% to 24%
            const positions = [
              { left: '12.3%', top: '44%', width: 'clamp(7rem,15vw,13rem)' },
              { left: '33.6%', top: '35%', width: 'clamp(7rem,15vw,13rem)' },
              { left: '56%',   top: '32%', width: 'clamp(7rem,15vw,13rem)' },
              { left: '83.5%', top: '24%', width: 'clamp(11rem,24vw,20rem)' },
            ];
            const pos = positions[index];
            return (
              <motion.div
                key={step.title}
                className={`absolute -translate-x-1/2 cursor-pointer text-center [text-shadow:0_1px_8px_rgba(0,0,0,0.55)] ${step.isDestination ? '' : 'text-white'}`}
                style={{ left: pos.left, top: pos.top, width: pos.width }}
                variants={step.isDestination ? destinationVariants(prefersReduced) : labelVariants(prefersReduced)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{ scale: isHovered ? 1.06 : 1, opacity: isDimmed ? 0.45 : 1 }}
                transition={{ duration: 0.3, ease: EASE_PRIMARY }}
              >
                <h3 className={`font-serif leading-none ${step.isDestination ? 'text-sm text-[#C9A227] md:text-[clamp(1.35rem,2.7vw,2.5rem)]' : 'text-base md:text-[clamp(1.25rem,2.4vw,2.25rem)]'}`}>
                  {step.title}
                </h3>
                <p className={`type-caption mt-1.5 font-medium uppercase text-white/90 md:mt-3 ${step.isDestination ? 'tracking-normal md:tracking-[0.08em]' : 'tracking-[0.04em] md:tracking-[0.1em]'}`}>
                  {step.lines.map((line) => <span key={line} className="block">{line}</span>)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.figure>
    </section>
  );
};

export default HowItProgresses;