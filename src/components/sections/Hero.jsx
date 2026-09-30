import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/* ============================================================
   WORD MASK — with descender room
   ============================================================ */
const WordMask = ({ text, delay = 0, stagger = 0.09, className = '' }) => {
  const words = text.split(' ');

  return (
    <span>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{
            marginRight: '0.28em',
            paddingBottom: '0.15em',
            marginBottom: '-0.15em',
          }}
        >
          <motion.span
            initial={{ y: '115%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 1.1,
              delay: delay + i * stagger,
              ease: EASE,
            }}
            className={`inline-block ${className}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ============================================================
   HERO
   ============================================================ */
const Hero = () => {
  const sectionRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY_s = useSpring(imageY, { stiffness: 90, damping: 26, mass: 0.6 });
  const imageScale_s = useSpring(imageScale, { stiffness: 90, damping: 26, mass: 0.6 });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-70%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY_s = useSpring(textY, { stiffness: 100, damping: 24, mass: 0.55 });

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  if (shouldReduce) {
    return (
      <section className="nav-dark-hero relative h-screen w-full overflow-hidden bg-[#0C0922]">
        <h1 className="sr-only">Horse Riding Academy in Bengaluru</h1>
        <img
          src="/heroImg.webp"
          alt="Horse riding at Nakshath Equestrian Club"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0C0922]/85 via-[#0C0922]/30 to-transparent" />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="nav-dark-hero relative h-screen min-h-[680px] w-full overflow-hidden bg-[#0C0922]"
      style={{ perspective: '1600px' }}
    >
      <h1 className="sr-only">Horse Riding Academy in Bengaluru</h1>

      {/* ==================================================
          BACKGROUND IMAGE
          ================================================== */}
      <motion.div
        style={{ y: imageY_s, scale: imageScale_s, willChange: 'transform' }}
        className="absolute inset-0"
      >
        <motion.img
          src="/heroImg.webp"
          alt="Horse riding at Nakshath Equestrian Club"
          fetchPriority="high"
          decoding="async"
          initial={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.2, ease: EASE }}
          className="h-full w-full object-cover object-[68%_center] md:object-center"
        />
      </motion.div>

      {/* ==================================================
          DARK SCRIM — Localized to the left side only.
          Fades from 92% opacity on the left to fully transparent
          at 58% width, so the horse on the right stays bright.
          ================================================== */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(12,9,34,0.92) 0%, rgba(12,9,34,0.72) 22%, rgba(12,9,34,0.35) 42%, rgba(12,9,34,0.05) 58%, transparent 72%)',
        }}
      />

      {/* Bottom blend — smooth transition into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#0C0922] via-[#0C0922]/60 to-transparent" />

      {/* Overlay that darkens on scroll */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 bg-[#0C0922]"
      />

      {/* ==================================================
          CONTENT
          ================================================== */}
      <motion.div
        style={{ y: textY_s, opacity: textOpacity, willChange: 'transform' }}
        className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-7xl px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="mb-6 flex items-center gap-3"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
            className="inline-block h-px w-10 origin-left bg-[#C9A227]"
          />
          <span className="text-[#C9A227] type-eyebrow">
            Premium Equestrian Club
          </span>
        </motion.div>

        {/* Title — clean two-tone, no shadows needed thanks to the scrim */}
        <h2
          className="type-page-title mb-7 max-w-2xl"
          style={{ lineHeight: 1.15 }}
        >
          <span className="block text-[#FDFCFA]">
            <WordMask text="Where Passion" delay={0.85} />
          </span>
          <span className="block text-[#C9A227]">
            <WordMask text="Meets Prestige" delay={1.25} />
          </span>
        </h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease: EASE }}
          className="type-lead mb-11 max-w-md text-white/85"
        >
          A premium equestrian sports destination — world-class training,
          structured progression, and a setting made for the sport.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: EASE }}
          className="flex flex-wrap items-center gap-5"
        >
          <motion.a
            href="#difference"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="group/cta inline-flex items-center gap-2 border-b-2 border-[#C9A227] pb-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#C9A227] transition-colors duration-500 hover:border-white hover:text-white"
          >
            Explore The Club
            <span className="inline-block transition-transform duration-500 group-hover/cta:translate-y-1">
              ↓
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* SCROLL HINT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4, ease: EASE }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[0.5rem] font-semibold uppercase tracking-[0.4em] text-white/45">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block h-4 w-px bg-gradient-to-b from-[#C9A227] to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;