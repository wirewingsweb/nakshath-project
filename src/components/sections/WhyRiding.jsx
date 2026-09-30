// src/components/sections/WhyRiding.jsx
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText, DriftImage } from '../motion';

const benefits = [
  { number: '01', image: '/page 9 physical.webp', title: 'Physical', items: ['Balance and coordination', 'Flexibility and posture', 'Core strength'] },
  { number: '02', image: '/page 9 mentals.webp', title: 'Mental', items: ['Confidence', 'Focus and discipline', 'Calm under pressure'] },
  { number: '03', image: '/page 9 lifestyle.webp', title: 'Lifestyle', items: ['Responsibility', 'Leadership', 'Sportsmanship'] },
];

// ─── Variants ────────────────────────────────────────────────

const headerContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08 } },
});

const headerItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY } },
});

const benefitsContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.12, delayChildren: prefersReduced ? 0 : 0.15 } },
});

const benefitGroupVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 8 : 20) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.6, ease: EASE_PRIMARY } },
});

// ─── Editorial Benefit Card ──────────────────────────────────

const Benefit = ({ benefit, index, compact = false, prefersReduced }) => {
  // Rotation per card — fanned out magazine feel
  const baseRotation = index === 0 ? -1.5 : index === 2 ? 1.5 : 0;

  return (
    <motion.article
      className={`group relative ${
        compact
          ? 'grid grid-cols-[6.5rem_1fr] items-center gap-5'
          : 'grid grid-cols-[13.8vw_1fr] items-start gap-[1.8vw]'
      }`}
      initial={false}
      whileHover={
        prefersReduced
          ? undefined
          : {
              rotate: 0,
              y: -6,
              scale: 1.02,
              transition: { duration: 0.5, ease: EASE_PRIMARY },
            }
      }
      style={{
        rotate: prefersReduced ? 0 : baseRotation,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    >
      {/* Giant outlined number behind content */}
      {!prefersReduced && (
        <motion.span
          aria-hidden="true"
          className={`pointer-events-none absolute ${
            compact ? '-left-2 -top-4' : '-left-[1.5vw] -top-[2vw]'
          } select-none font-serif leading-none tracking-tighter text-transparent transition-all duration-500`}
          style={{
            fontSize: compact ? '4.5rem' : '7vw',
            WebkitTextStroke: '1px rgba(135, 107, 24, 0.18)',
          }}
        >
          <span className="group-hover:[WebkitTextStroke:1px_rgba(201,162,39,0.55)] transition-all duration-500">
            {benefit.number}
          </span>
        </motion.span>
      )}

      {/* Image icon */}
      <div className="relative z-10 overflow-hidden">
        <img
          src={benefit.image}
          alt=""
          loading="lazy"
          decoding="async"
          className={`block w-full mix-blend-multiply ${
            compact ? 'opacity-70' : 'opacity-75'
          } transition-all duration-700 group-hover:opacity-100`}
        />
      </div>

      {/* Content */}
      <div className={`relative z-10 ${compact ? 'py-4' : 'pt-[3.2vw]'}`}>
        {/* Editorial marker — "01 / PHYSICAL" style */}
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#876B18]/60 transition-colors duration-500 group-hover:text-[#C9A227]">
            {benefit.number}
          </span>
          <span className="h-px w-4 bg-[#876B18]/30 transition-all duration-500 group-hover:w-8 group-hover:bg-[#C9A227]" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#876B18]/60 transition-colors duration-500 group-hover:text-[#C9A227]">
            {benefit.title}
          </span>
        </div>

        {/* Divider — wipes in from left */}
        <div className="relative mb-[1.5vw] h-px w-full overflow-hidden">
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 h-px bg-[#876B18] transition-all duration-500 group-hover:bg-[#C9A227]"
            style={{ width: '100%', transformOrigin: 'left' }}
          />
          {/* Gold overlay that wipes across on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 h-px w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
          />
        </div>

        {/* List items — wipe in from left on hover */}
        <ul
          className={`${
            compact
              ? 'space-y-4 text-sm leading-[1.45] text-[#1A1A1A]'
              : 'space-y-[1.5vw] text-sm leading-[1.45] text-[#1A1A1A]'
          }`}
        >
          {benefit.items.map((item, i) => (
            <li
              key={item}
              className="group/item relative flex items-start gap-3 overflow-hidden pl-0 transition-all duration-500 group-hover:pl-3"
              style={{
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {/* Left wipe bar */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-[#C9A227] transition-all duration-500 group-hover/item:h-full"
              />

              {/* Dash marker instead of dot */}
              <span
                aria-hidden="true"
                className="mt-[0.55em] h-px w-3 shrink-0 bg-[#876B18]/40 transition-all duration-500 group-hover/item:w-5 group-hover/item:bg-[#C9A227]"
              />

              <span className="transition-colors duration-500 group-hover/item:text-[#1A1A1A]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

// ─── Main Section ────────────────────────────────────────────

const WhyRiding = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [desktopHeaderRef, desktopHeaderInView] = useInViewOnce({ amount: 0.3 });
  const [desktopBenefitsRef, desktopBenefitsInView] = useInViewOnce({ amount: 0.15 });
  const [mobileHeaderRef, mobileHeaderInView] = useInViewOnce({ amount: 0.3 });
  const [mobileBenefitsRef, mobileBenefitsInView] = useInViewOnce({ amount: 0.15 });

  return (
    <section className="relative w-full overflow-hidden bg-[#FDFCFA]">

      {/* Dotted grid texture — subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(135,107,24,0.10) 0.8px, transparent 0.8px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ═══════════════════════════════════════════════
          DESKTOP
      ═══════════════════════════════════════════════ */}
      <div className="relative hidden aspect-[1672/941] w-full lg:block">
        {/* Image panel with soft frame */}
        <div className="absolute right-[3.5%] top-[6%] h-[56%] w-[58%] overflow-hidden rounded-2xl">
          <DriftImage
            src="/page 9 gpt.webp"
            alt="A child riding a white horse at sunset"
            drift="subtle"
            duration={30}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover object-[63%_48%]"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-[#FDFCFA]/85 to-transparent" />
        </div>

        {/* Section marker — vertical editorial label */}
        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 -rotate-90">
          <span className="whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#876B18]/50">
            Why Riding · Section 03
          </span>
        </div>

        <motion.header
          ref={desktopHeaderRef}
          className="absolute left-[6.8%] top-[12%] z-10 w-[44%]"
          variants={headerContainerVariants(prefersReduced)}
          initial="hidden"
          animate={desktopHeaderInView ? 'visible' : 'hidden'}
        >
          <motion.h4
            className="group type-eyebrow mb-[2.1vw] flex cursor-default items-center gap-3 text-[#876B18]"
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
              Why Riding
            </span>
          </motion.h4>

          <SplitText
            as="h2"
            className="type-display text-[#1A1A1A]"
            wordDelay={0.05}
            startDelay={0.15}
            amount={0.3}
          >
            What a child takes<br />home from the arena.
          </SplitText>

          <motion.p
            className="mt-[1.6vw] text-base text-[#5A5A66]"
            variants={headerItemVariants(prefersReduced, isMobile, 12)}
          >
            Riding builds more than riding.
          </motion.p>
        </motion.header>

        <motion.div
          ref={desktopBenefitsRef}
          className="absolute inset-x-[3.5%] bottom-[7.2%] z-10 grid grid-cols-3 gap-[3vw]"
          variants={benefitsContainerVariants(prefersReduced)}
          initial="hidden"
          animate={desktopBenefitsInView ? 'visible' : 'hidden'}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={benefit.title} variants={benefitGroupVariants(prefersReduced, isMobile)}>
              <Benefit benefit={benefit} index={index} prefersReduced={prefersReduced} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════
          MOBILE
      ═══════════════════════════════════════════════ */}
      <div className="relative z-10 lg:hidden">
        <motion.header
          ref={mobileHeaderRef}
          className="px-6 pb-7 pt-14 sm:px-10"
          variants={headerContainerVariants(prefersReduced)}
          initial="hidden"
          animate={mobileHeaderInView ? 'visible' : 'hidden'}
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
            <span>Why Riding</span>
          </motion.h4>

          <SplitText
            as="h2"
            className="type-page-title text-[#1A1A1A]"
            wordDelay={0.05}
            startDelay={0.15}
            amount={0.3}
          >
            What a child takes<br />home from the arena.
          </SplitText>

          <motion.p
            className="mt-4 text-base leading-relaxed text-[#5A5A66]"
            variants={headerItemVariants(prefersReduced, isMobile, 12)}
          >
            Riding builds more than riding.
          </motion.p>
        </motion.header>

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <DriftImage
            src="/page 9 gpt.webp"
            alt="A child riding a white horse at sunset"
            drift="subtle"
            duration={30}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover object-[72%_center]"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#FDFCFA]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#FDFCFA] to-transparent" />
        </div>

        <motion.div
          ref={mobileBenefitsRef}
          className="space-y-8 px-6 pb-16 sm:px-10"
          variants={benefitsContainerVariants(prefersReduced)}
          initial="hidden"
          animate={mobileBenefitsInView ? 'visible' : 'hidden'}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={benefit.title} variants={benefitGroupVariants(prefersReduced, isMobile)}>
              <Benefit benefit={benefit} index={index} compact prefersReduced={prefersReduced} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyRiding;