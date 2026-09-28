import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

const benefits = [
  {
    image: '/page 9 physical.png',
    title: 'Physical',
    items: ['Balance and coordination', 'Flexibility and posture', 'Core strength'],
  },
  {
    image: '/page 9 mentals.png',
    title: 'Mental',
    items: ['Confidence', 'Focus and discipline', 'Calm under pressure'],
  },
  {
    image: '/page 9 lifestyle.png',
    title: 'Lifestyle',
    items: ['Responsibility', 'Leadership', 'Sportsmanship'],
  },
];

/* ============================================================
   WORD MASK — reliable reveal via useInView on the outer span
   ============================================================ */
const WordMask = ({ text, delay = 0, stagger = 0.09 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const words = text.split(' ');

  return (
    <span ref={ref}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: '0.28em' }}
        >
          <motion.span
            initial={{ y: '115%' }}
            animate={inView ? { y: '0%' } : { y: '115%' }}
            transition={{
              duration: 1.1,
              delay: delay + i * stagger,
              ease: EASE,
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ============================================================
   SKETCH-IN ILLUSTRATION
   ============================================================ */
const SketchInIllustration = ({ src, alt, delay = 0, size = 'lg' }) => {
  const isCompact = size === 'compact';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className={`relative ${isCompact ? 'shrink-0' : ''}`}>
      <motion.span
        aria-hidden="true"
        animate={inView ? { opacity: 0.55, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1.6, delay: delay + 0.6, ease: EASE }}
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,_rgba(201,162,39,0.28),_transparent_70%)] blur-2xl"
      />

      <motion.div
        animate={
          inView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 40, filter: 'blur(12px)' }
        }
        transition={{ duration: 1.3, delay, ease: EASE }}
        className={isCompact ? '' : 'flex justify-center'}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay + 0.8,
          }}
          whileHover={{ scale: 1.08, y: -8 }}
          className={`block w-full mix-blend-multiply ${
            isCompact ? 'w-24 opacity-85' : 'opacity-90'
          }`}
        />
      </motion.div>
    </div>
  );
};

/* ============================================================
   ANIMATED BULLETS
   ============================================================ */
const AnimatedBullets = ({ items, startDelay = 0, compact = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <ul
      ref={ref}
      className={
        compact
          ? 'space-y-4 text-sm leading-[1.45] text-[#1A1A1A]'
          : 'space-y-[2vw] text-sm leading-[1.45] text-[#1A1A1A]'
      }
    >
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
          transition={{
            duration: 0.75,
            delay: startDelay + i * 0.12,
            ease: EASE,
          }}
          className="relative"
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
};

/* ============================================================
   BENEFIT
   ============================================================ */
const Benefit = ({ benefit, compact = false, index = 0 }) => {
  const baseDelay = 0.4 + index * 0.55;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <article
      ref={ref}
      className={
        compact
          ? 'grid grid-cols-[6.5rem_1fr] items-center gap-5'
          : 'grid grid-cols-[13.8vw_1fr] items-start gap-[1.8vw]'
      }
    >
      <SketchInIllustration
        src={benefit.image}
        alt=""
        delay={baseDelay}
        size={compact ? 'compact' : 'lg'}
      />

      <div className={compact ? 'py-4' : 'pt-[3.2vw]'}>
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.8, delay: baseDelay + 0.3, ease: EASE }}
            className={`font-serif italic tabular-nums text-[#C9A227] ${
              compact ? 'text-xs' : 'text-sm'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>

          <motion.h3
            initial={{ opacity: 0, letterSpacing: '0.05em' }}
            animate={
              inView
                ? { opacity: 1, letterSpacing: '0.2em' }
                : { opacity: 0, letterSpacing: '0.05em' }
            }
            transition={{ duration: 1.1, delay: baseDelay + 0.35, ease: EASE }}
            className="type-eyebrow text-[#876B18]"
          >
            {benefit.title}
          </motion.h3>
        </div>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: baseDelay + 0.55, ease: EASE }}
          className={`block origin-left border-t border-[#876B18] ${
            compact ? 'mb-5 mt-3 w-8' : 'mb-[2vw] mt-[1.15vw] w-[2vw]'
          }`}
        />

        <AnimatedBullets
          items={benefit.items}
          startDelay={baseDelay + 0.75}
          compact={compact}
        />
      </div>
    </article>
  );
};

/* ============================================================
   MAIN
   ============================================================ */
const WhyRiding = () => {
  const desktopHeaderRef = useRef(null);
  const desktopHeaderInView = useInView(desktopHeaderRef, { once: true, amount: 0.2 });

  const desktopImgRef = useRef(null);
  const desktopImgInView = useInView(desktopImgRef, { once: true, amount: 0.15 });

  const railRef = useRef(null);
  const railInView = useInView(railRef, { once: true, amount: 0.15 });

  const mobileHeaderRef = useRef(null);
  const mobileHeaderInView = useInView(mobileHeaderRef, { once: true, amount: 0.2 });

  const mobileImgRef = useRef(null);
  const mobileImgInView = useInView(mobileImgRef, { once: true, amount: 0.15 });

  return (
    <section className="w-full overflow-hidden bg-[#FDFCFA]">
      {/* ===== DESKTOP ===== */}
      <div className="relative hidden aspect-[1672/941] w-full lg:block">
        {/* Background image */}
        <motion.div
          ref={desktopImgRef}
          animate={
            desktopImgInView
              ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, scale: 1.08, filter: 'blur(12px)' }
          }
          transition={{ duration: 2.2, ease: EASE }}
          className="absolute right-0 top-0 h-[62%] w-[70%] overflow-hidden"
        >
          <img
            src="/page 9 gpt.png"
            alt="A child riding a white horse at sunset"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[63%_48%]"
          />
          <div className="absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#FDFCFA] via-[#FDFCFA]/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#FDFCFA] via-[#FDFCFA]/65 to-transparent" />
        </motion.div>

        {/* HEADER */}
        <header
          ref={desktopHeaderRef}
          className="absolute left-[6.8%] top-[15.5%] z-10 w-[48%]"
        >
          <motion.h4
            initial={{ opacity: 0, x: -20 }}
            animate={desktopHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mb-[2.1vw] flex items-center gap-3 type-eyebrow text-[#876B18]"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
            />
            Why Riding
          </motion.h4>

          <h2 className="type-display text-[#1A1A1A]">
            <span className="block">
              <WordMask text="What a child takes" delay={0.35} />
            </span>
            <span className="block">
              <WordMask text="home from the arena." delay={0.75} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={desktopHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
            className="mt-[1.6vw] text-base text-[#5A5A66]"
          >
            Riding builds more than riding.
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            animate={desktopHeaderInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.3, delay: 1.7, ease: EASE }}
            className="mt-5 block h-[2px] w-20 origin-left bg-[#C9A227]/60"
          />
        </header>

        {/* GOLD RAIL */}
        <motion.div
          ref={railRef}
          animate={railInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 2.4, delay: 0.3, ease: EASE }}
          className="absolute left-[3.5%] right-[3.5%] top-[56%] z-10 h-px origin-left bg-gradient-to-r from-[#C9A227]/80 via-[#C9A227]/40 to-[#C9A227]/80"
        >
          <motion.span
            animate={railInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
            className="absolute left-[16%] top-1/2 h-2 w-[2px] -translate-y-1/2 bg-[#C9A227]"
          />
          <motion.span
            animate={railInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 1.65, ease: EASE }}
            className="absolute left-[50%] top-1/2 h-2 w-[2px] -translate-y-1/2 bg-[#C9A227]"
          />
          <motion.span
            animate={railInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 2.2, ease: EASE }}
            className="absolute left-[84%] top-1/2 h-2 w-[2px] -translate-y-1/2 bg-[#C9A227]"
          />
        </motion.div>

        {/* BENEFIT COLUMNS */}
        <div className="absolute inset-x-[3.5%] bottom-[7.2%] z-10 grid grid-cols-3 gap-[2.2vw]">
          {benefits.map((benefit, index) => (
            <Benefit key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="lg:hidden">
        <header ref={mobileHeaderRef} className="px-6 pb-7 pt-14 sm:px-10">
          <motion.h4
            initial={{ opacity: 0, x: -16 }}
            animate={mobileHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="type-eyebrow mb-4 flex items-center gap-3 text-[#876B18]"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
            />
            Why Riding
          </motion.h4>

          <h2 className="type-page-title text-[#1A1A1A]">
            <span className="block">
              <WordMask text="What a child takes" delay={0.3} />
            </span>
            <span className="block">
              <WordMask text="home from the arena." delay={0.65} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={mobileHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
            className="mt-4 text-base leading-relaxed text-[#5A5A66]"
          >
            Riding builds more than riding.
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            animate={mobileHeaderInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 1.6, ease: EASE }}
            className="mt-5 block h-[2px] w-16 origin-left bg-[#C9A227]/60"
          />
        </header>

        <motion.div
          ref={mobileImgRef}
          animate={
            mobileImgInView
              ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, scale: 1.05, filter: 'blur(10px)' }
          }
          transition={{ duration: 1.6, ease: EASE }}
          className="relative aspect-[16/10] w-full overflow-hidden"
        >
          <img
            src="/page 9 gpt.png"
            alt="A child riding a white horse at sunset"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[72%_center]"
          />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#FDFCFA]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#FDFCFA] to-transparent" />
        </motion.div>

        <div className="space-y-3 px-6 pb-16 sm:px-10">
          {benefits.map((benefit, index) => (
            <Benefit key={benefit.title} benefit={benefit} index={index} compact />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRiding;