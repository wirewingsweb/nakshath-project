import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

const features = [
  {
    img: '/arena-indoor.webp',
    title: 'Indoor Arena',
    desc: 'Training in a safe, controlled, covered environment.',
    variant: 'breathing',
  },
  {
    img: '/arena-weather.webp',
    title: 'All-Weather Training',
    desc: 'Sessions run through monsoon and peak summer heat.',
    variant: 'weather',
  },
  {
    img: '/arena-footing.webp',
    title: 'International Footing',
    desc: 'Geotextile surface built for grip, cushioning and safety.',
    variant: 'stacking',
  },
  {
    img: '/arena-batches.webp',
    title: 'Small Batches',
    desc: 'Limited riders per session so every rider gets attention.',
    variant: 'popping',
  },
  {
    img: '/arena-horses.webp',
    title: 'Schooled Horses',
    desc: 'Calm, well-trained horses matched to rider level.',
    variant: 'trotting',
  },
  {
    img: '/arena-progression.webp',
    title: 'Structured Progression',
    desc: 'Walk, trot, canter, and on to national and international competition.',
    variant: 'growing',
  },
];

/* ============================================================
   IDLE ANIMATIONS — kept from original
   ============================================================ */
const idleAnimations = {
  breathing: {
    animate: {
      scale: [1, 1.05, 1],
      filter: [
        'brightness(1) drop-shadow(0 0 0px rgba(201,162,39,0))',
        'brightness(1.15) drop-shadow(0 0 12px rgba(201,162,39,0.4))',
        'brightness(1) drop-shadow(0 0 0px rgba(201,162,39,0))',
      ],
    },
    transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
  },
  weather: {
    animate: {
      rotate: [0, -4, 4, -4, 0],
      y: [0, -2, 0, -2, 0],
    },
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
  stacking: {
    animate: {
      y: [0, -5, 0],
      filter: [
        'drop-shadow(0 0 0px rgba(201,162,39,0))',
        'drop-shadow(0 4px 10px rgba(201,162,39,0.35))',
        'drop-shadow(0 0 0px rgba(201,162,39,0))',
      ],
    },
    transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
  },
  popping: {
    animate: { scale: [1, 1.06, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  trotting: {
    animate: {
      y: [0, -4, 0, -3, 0],
      rotate: [0, -2, 0, 2, 0],
    },
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
  },
  growing: {
    animate: {
      scaleY: [0.92, 1.05, 0.92],
      y: [3, -2, 3],
      filter: [
        'drop-shadow(0 0 0px rgba(201,162,39,0))',
        'drop-shadow(0 0 15px rgba(201,162,39,0.5))',
        'drop-shadow(0 0 0px rgba(201,162,39,0))',
      ],
    },
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

const hoverEffects = {
  breathing: { scale: 1.12, filter: 'brightness(1.25)' },
  weather: { rotate: 12, scale: 1.1 },
  stacking: { y: -10, scale: 1.1 },
  popping: { scale: 1.15 },
  trotting: { y: -8, rotate: -6, scale: 1.1 },
  growing: { scaleY: 1.15, scaleX: 1.08, y: -4 },
};

/* ============================================================
   LETTER CASCADE — per-character rotation reveal
   ============================================================ */
const CascadeText = ({ text, delay = 0 }) => {
  const chars = text.split('');
  return (
    <>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ opacity: 0, y: 50, rotateX: -90, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: delay + i * 0.035, ease: EASE }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </>
  );
};

/* ============================================================
   FEATURE CARD — tracks hover to drive both the icon animation
   and the text/underline transitions together
   ============================================================ */
const FeatureCard = ({ item, index, isInView }) => {
  const [hovered, setHovered] = useState(false);
  const idle = idleAnimations[item.variant];
  const hover = hoverEffects[item.variant];
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay: 0.3 + index * 0.09, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer"
    >
      {/* ==================================================
          Number + drawing gold rule
          ================================================== */}
      <div className="mb-6 flex items-center gap-3">
        <motion.span
          animate={{
            color: hovered ? '#C9A227' : 'rgba(201,162,39,0.7)',
            scale: hovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="font-serif text-xs italic tabular-nums"
        >
          {num}
        </motion.span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.95, delay: 0.5 + index * 0.09, ease: EASE }}
          className={`h-px flex-1 origin-left transition-colors duration-500 ${
            hovered ? 'bg-[#C9A227]/70' : 'bg-[#C9A227]/25'
          }`}
        />
      </div>

      {/* ==================================================
          Icon + text
          ================================================== */}
      <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-start gap-4 min-[360px]:grid-cols-[5.7rem_minmax(0,1fr)] min-[360px]:gap-5 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-6">
        {/* Animated icon */}
        <motion.div
          animate={
            isInView
              ? hovered
                ? { ...hover, transition: { duration: 0.4, ease: EASE } }
                : idle.animate
              : {}
          }
          transition={hovered ? { duration: 0.4, ease: EASE } : idle.transition}
          className="mt-1 flex aspect-square w-full items-center justify-center overflow-visible"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain transition-[filter] duration-300 group-hover:drop-shadow-[0_0_18px_rgba(201,162,39,0.55)]"
          />
        </motion.div>

        {/* Text */}
        <div className="flex flex-col">
          <motion.h3
            animate={{
              color: hovered ? '#C9A227' : '#FFFFFF',
              x: hovered ? 2 : 0,
            }}
            transition={{ duration: 0.35, ease: EASE }}
            className="text-base font-semibold uppercase leading-[1.35] tracking-[0.08em] md:min-h-[2.7em]"
          >
            {item.title}
          </motion.h3>
          <p className="type-small mt-3 max-w-[14rem] text-white/75 transition-colors duration-500 group-hover:text-white/95">
            {item.desc}
          </p>
        </div>
      </div>

      {/* ==================================================
          Bottom gold hairline — grows on hover
          ================================================== */}
      <span className="mt-6 block h-px w-10 origin-left bg-[#C9A227]/50 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full group-hover:bg-[#C9A227]" />
    </motion.div>
  );
};

/* ============================================================
   ARENA FEATURES
   ============================================================ */
const ArenaFeatures = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0C0922] px-6 py-16 text-white md:px-[8vw] md:py-24"
    >
      {/* ==================================================
          Ambient gold glow — top right
          ================================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#C9A227]/10 blur-[160px]"
      />

      {/* Ambient glow — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 2.4, delay: 0.6, ease: EASE }}
        className="pointer-events-none absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full bg-[#C9A227]/6 blur-[160px]"
      />

      {/* Drifting dot grid */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 18, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-[-10%] opacity-[0.045]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(201,162,39,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto w-full max-w-[96rem]">

        {/* ==================================================
            HEADER — cascading title + drawing rule
            ================================================== */}
        <div className="mb-14 md:mb-20">
          {/* Eyebrow with pulsing dot */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mb-5 flex items-center gap-3"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
            />
            <span className="text-[#C9A227] type-eyebrow">The Arena</span>
          </motion.div>

          {/* Title with letter cascade */}
          <h2 className="type-page-title max-w-3xl leading-[1.08]">
            <CascadeText text="Built so the training" delay={0.3} />
            <br />
            <CascadeText text="never stops." delay={1.2} />
          </h2>

          {/* Drawing gold rule under the title */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, delay: 2, ease: EASE }}
            className="mt-8 h-[2px] w-24 origin-left bg-[#C9A227]/60"
          />
        </div>

        {/* ==================================================
            FEATURES GRID — each with number, icon, hover reveals
            ================================================== */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2 md:gap-y-16 xl:grid-cols-3 xl:gap-x-[4vw]">
          {features.map((item, index) => (
            <FeatureCard
              key={index}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArenaFeatures;