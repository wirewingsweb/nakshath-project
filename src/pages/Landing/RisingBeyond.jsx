import { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { GiHorseHead, GiHorseshoe } from 'react-icons/gi';
import { useEnquiry } from '../../context/EnquiryContext';
import ShinyText from '../../components/ShinyText';
import { EASE, EASE_SNAP } from '../../utils/landing-motion';

/* ============================================================
   LETTER CASCADE
   ============================================================ */
const CascadeText = ({ text, delay = 0, className = '' }) => {
  const chars = text.split('');
  return (
    <span className={className}>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: delay + i * 0.03, ease: EASE }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  );
};

/* ============================================================
   ROTATING MEDALLION
   ============================================================ */
const RotatingMedallion = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, rotate: -40 }}
    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
    viewport={{ once: true, amount: 0 }}
    transition={{ duration: 1.2, delay, ease: [0.34, 1.56, 0.64, 1] }}
    className="relative flex h-16 w-16 items-center justify-center"
  >
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 rounded-full border border-dashed border-[#C9A227]/60"
    />
    <span className="absolute inset-1.5 rounded-full border border-[#C9A227]/30" />
    <GiHorseHead className="relative h-7 w-7 text-[#C9A227]" aria-hidden="true" />
  </motion.div>
);

/* ============================================================
   MARQUEE
   ============================================================ */
const Marquee = ({ items, speed = 32 }) => {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="relative flex w-full overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0C0922] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0C0922] to-transparent" />
      <motion.div
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="flex shrink-0 items-center gap-10 whitespace-nowrap"
      >
        {tripled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-serif text-lg italic text-white/70 md:text-2xl"
          >
            {item}
            <span className="text-[#C9A227]">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ============================================================
   FULL-BLEED TRIAL CARD — with scroll depth field
   ============================================================ */
const TrialCard = ({ trial, idx, icon, onBook, progress }) => {
  const [hovered, setHovered] = useState(false);
  const fromY = 60 + idx * 20;
  const shouldReduce = useReducedMotion();

  // Alternate depth: card 0 drifts +3%, card 1 drifts -3%
  const range = idx === 0 ? 3 : -3;
  const driftY = useTransform(
    progress,
    [0, 0.5, 1],
    [`${range}%`, '0%', `${-range}%`]
  );
  const driftY_s = useSpring(driftY, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  return (
    <motion.div
      style={{
        y: shouldReduce ? 0 : driftY_s,
        willChange: 'transform',
      }}
    >
      <motion.button
        type="button"
        onClick={onBook}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: fromY, rotate: idx === 0 ? -3 : 3, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.1, delay: 0.3 + idx * 0.18, ease: EASE }}
        className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-3xl bg-[#0C0922] text-left shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]"
      >
        <motion.img
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          src={trial.img}
          alt={trial.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0C0922] via-[#0C0922]/60 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -16, y: -16 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 1.1 + idx * 0.18, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute left-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/70 bg-[#0C0922]/70 backdrop-blur-md transition-all duration-500 group-hover:bg-[#C9A227] group-hover:border-[#C9A227]"
        >
          <span className="text-[#C9A227] transition-colors duration-500 group-hover:text-[#0C0922]">
            {icon}
          </span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: 1.3 + idx * 0.18, ease: EASE }}
          className="absolute right-5 top-5 z-10 font-serif text-xs italic tabular-nums text-white/60"
        >
          {String(idx + 1).padStart(2, '0')} / 02
        </motion.span>

        <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 1.4 + idx * 0.18, ease: EASE }}
            className="mb-3 flex items-center gap-3"
          >
            <span className="inline-block h-px w-6 bg-[#C9A227]" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#C9A227]">
              {trial.eyebrow}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 1.5 + idx * 0.18, ease: EASE }}
            className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1"
          >
            <span className="font-serif text-3xl leading-none text-white md:text-4xl">
              {trial.title}
            </span>
            <span className="font-serif text-xl text-[#C9A227] md:text-2xl">
              · {trial.price}
            </span>
          </motion.div>

          <motion.p
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              height: hovered ? 'auto' : 0,
              marginBottom: hovered ? 16 : 0,
            }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden text-sm leading-relaxed text-white/75"
          >
            {trial.desc}
          </motion.p>

          <div className="flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white/60">
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-block"
            >
              {hovered ? 'Tap to book' : 'Hover to explore'}
            </motion.span>
            <motion.span
              animate={{ x: hovered ? [0, 6, 0] : 0 }}
              transition={{ duration: 1.6, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
              className="text-[#C9A227]"
            >
              →
            </motion.span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/60" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <motion.div
            initial={false}
            animate={{ x: hovered ? '250%' : '-150%' }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
        </div>
      </motion.button>
    </motion.div>
  );
};

/* ============================================================
   MAIN
   ============================================================ */
const RisingBeyond = () => {
  const { openEnquiry } = useEnquiry();
  const sectionRef = useRef(null);
  const shouldReduce = useReducedMotion();

  /* ============================================================
     Scroll cameras — section, header, glows, cards
     ============================================================ */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Background — existing parallax, converted to spring
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const bgY_s = useSpring(bgY, { stiffness: 85, damping: 28, mass: 0.65 });

  // Header — counter-drift up
  const headerY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['2.5%', '0%', '-2.5%']
  );
  const headerY_s = useSpring(headerY, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  // Left glow — one direction, right glow — the other
  const glowLeftY = useTransform(scrollYProgress, [0, 0.5, 1], ['4%', '0%', '-4%']);
  const glowLeftY_s = useSpring(glowLeftY, {
    stiffness: 80,
    damping: 28,
    mass: 0.7,
  });
  const glowRightY = useTransform(scrollYProgress, [0, 0.5, 1], ['-4%', '0%', '4%']);
  const glowRightY_s = useSpring(glowRightY, {
    stiffness: 80,
    damping: 28,
    mass: 0.7,
  });

  const trials = [
    {
      img: '/free ride.webp',
      alt: 'Free Trial Ride',
      eyebrow: 'Free Trial Ride',
      title: '10 Minutes',
      price: 'Free',
      desc: 'An introductory riding experience for new registrations.',
    },
    {
      img: '/paid ride.webp',
      alt: 'Paid Trial Ride',
      eyebrow: 'Paid Trial Ride',
      title: '45 Minutes',
      price: '₹1,999',
      desc: 'An extended trial riding session.',
    },
  ];

  const marqueeItems = [
    'Kids',
    'Teens',
    'Adults',
    'Beginners',
    'Competitors',
    'Riders of every age',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0C0922] py-20 sm:py-24"
    >
      {/* ==================================================
          BACKGROUND IMAGE
          ================================================== */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.6, ease: EASE_SNAP }}
          className="absolute inset-0"
        >
          <motion.img
            style={{
              y: shouldReduce ? 0 : bgY_s,
              willChange: 'transform',
            }}
            src="/rising-beyond-bg.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-[112%] w-full object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[#0C0922]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/45 via-transparent to-[#0C0922]/65" />
      </div>

      {/* ==================================================
          AMBIENT GLOWS — counter-drift
          ================================================== */}
      <motion.div
        style={{
          y: shouldReduce ? 0 : glowLeftY_s,
          willChange: 'transform',
        }}
        className="pointer-events-none absolute -left-40 top-20 z-[1] h-[500px] w-[500px]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, ease: EASE }}
          className="h-full w-full rounded-full bg-[#C9A227]/10 blur-[160px]"
        />
      </motion.div>

      <motion.div
        style={{
          y: shouldReduce ? 0 : glowRightY_s,
          willChange: 'transform',
        }}
        className="pointer-events-none absolute -right-40 bottom-20 z-[1] h-[500px] w-[500px]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, delay: 0.4, ease: EASE }}
          className="h-full w-full rounded-full bg-[#C9A227]/8 blur-[160px]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* ==================================================
            HEADER — counter-drift up
            ================================================== */}
        <motion.div
          style={{
            y: shouldReduce ? 0 : headerY_s,
            willChange: 'transform',
          }}
          className="mb-14 flex flex-col items-center text-center sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="inline-block h-px w-8 bg-[#C9A227]/50" />
            <span className="text-[#C9A227] type-eyebrow">Final Booking</span>
            <span className="inline-block h-px w-8 bg-[#C9A227]/50" />
          </motion.div>

          <h2 className="type-page-title mb-6 leading-[1.05] [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
            <span className="block text-white">
              <CascadeText text="Rising Beyond" delay={0.2} />
            </span>
            <span className="block">
              <ShinyText
                text="Every Jump"
                speed={3}
                className="text-[#C9A227]"
                disabled={false}
              />
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="mb-6 h-[2px] w-20 origin-center bg-[#C9A227]/50"
          />

          <motion.p
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="type-lead max-w-xl text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]"
          >
            Begin Your Journey at{' '}
            <span className="text-[#C9A227] font-semibold">Nakshath.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
            className="mt-10 flex items-center gap-4"
          >
            <RotatingMedallion delay={1.1} />
            <p className="max-w-xs text-left text-sm leading-relaxed text-white/70">
              Structured training from first walk to competitive rounds —
              coached by riders who compete.
            </p>
          </motion.div>
        </motion.div>

        {/* ==================================================
            TRIAL CARDS — differential depth
            ================================================== */}
        <div className="mx-auto mb-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <TrialCard
            trial={trials[0]}
            idx={0}
            icon={<GiHorseshoe className="h-6 w-6" aria-hidden="true" />}
            onBook={() => openEnquiry('Trial Ride')}
            progress={scrollYProgress}
          />
          <TrialCard
            trial={trials[1]}
            idx={1}
            icon={<GiHorseHead className="h-6 w-6" aria-hidden="true" />}
            onBook={() => openEnquiry('Trial Ride')}
            progress={scrollYProgress}
          />
        </div>

        {/* ==================================================
            CTA
            ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => openEnquiry('Trial Ride')}
            className="group/btn relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-[#C9A227]/40 bg-[#0C0922]/70 px-12 py-5 text-white backdrop-blur-md transition-colors duration-500 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#0C0922]"
          >
            <motion.span
              initial={{ x: '-150%' }}
              animate={{ x: '250%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 2,
              }}
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />

            <span className="type-button relative">Book Your Trial Ride</span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative inline-block"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* ==================================================
          MARQUEE
          ================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: EASE }}
        className="relative z-10 mt-16 border-y border-white/10 bg-[#0C0922]/50 backdrop-blur-sm"
      >
        <Marquee items={marqueeItems} speed={32} />
      </motion.div>
    </section>
  );
};

export default RisingBeyond;