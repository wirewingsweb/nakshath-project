import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

/* ============================================================
   REVEAL FILL — left-to-right clip wipe
   ============================================================ */
const RevealFill = ({ children, delay = 0, className = '', duration = 2.4 }) => (
  <span className={`relative inline-block ${className}`}>
    <span className="opacity-[0.18]">{children}</span>

    <motion.span
      aria-hidden="true"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
      className="pointer-events-none absolute inset-0"
    >
      {children}
    </motion.span>

    <motion.span
      aria-hidden="true"
      initial={{ left: '0%', opacity: 0 }}
      whileInView={{ left: '100%', opacity: [0, 0.9, 0.9, 0] }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration,
        delay,
        ease: EASE,
        times: [0, 0.1, 0.9, 1],
      }}
      className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C9A227] to-transparent"
    />
  </span>
);

/* ============================================================
   THE DIFFERENCE
   Scroll-driven camera: as the section enters, the text panel
   and image panel move at different rates with a subtle 3D tilt.
   ============================================================ */
const TheDifference = () => {
  const sectionRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Image panel: comes in from the right (translateX) and rises slightly
  const imageX = useTransform(scrollYProgress, [0, 0.5, 1], ['8%', '0%', '-8%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);
  const imageRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-6, 0, 6]);

  // Text panel: drifts slower than the image — depth via differential
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], ['-4%', '0%', '4%']);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0.4]
  );

  const imageX_s = useSpring(imageX, { stiffness: 90, damping: 26, mass: 0.6 });
  const imageScale_s = useSpring(imageScale, { stiffness: 90, damping: 26, mass: 0.6 });
  const imageRotateY_s = useSpring(imageRotateY, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });
  const textX_s = useSpring(textX, { stiffness: 100, damping: 28, mass: 0.5 });
  const textOpacity_s = useSpring(textOpacity, {
    stiffness: 100,
    damping: 28,
    mass: 0.5,
  });

  if (shouldReduce) {
    return (
      <section className="grid grid-cols-1 items-center overflow-hidden bg-[#FDFCFA] md:aspect-[1920/1365] md:grid-cols-[54%_46%]">
        <div className="px-6 py-16 sm:px-10 md:py-0 md:pl-[clamp(3rem,7.1vw,10rem)] md:pr-[3vw]">
          <div className="max-w-[38rem]">
            <h4 className="mb-8 text-[#876B18] type-eyebrow md:mb-[3vw]">
              ●&nbsp; The Difference
            </h4>
            <h2 className="type-display mb-10 text-[#1A1A1A]">
              Bengaluru's equestrian training moves{' '}
              <span className="text-[#876B18]">indoors.</span>
            </h2>
            <div className="mb-9 h-px w-[6.75rem] bg-[#876B18] md:mb-[3.2vw] md:w-[10vw]" />
            <p className="type-lead max-w-[27rem] text-[#1A1A1A] md:max-w-[31rem]">
              An all-weather covered arena on international-standard footing.
              Lessons do not stop for monsoon or summer heat.
            </p>
          </div>
        </div>
        <div className="px-6 pb-10 md:px-0 md:pb-0">
          <div className="overflow-hidden rounded-[2rem] md:rounded-l-[2.25rem] md:rounded-r-none">
            <img
              src="/page 2 gpt.webp"
              alt="Indoor Arena"
              loading="lazy"
              decoding="async"
              className="h-[28rem] w-full object-cover md:h-[57.5vw]"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative grid grid-cols-1 items-center overflow-hidden bg-[#FDFCFA] md:aspect-[1920/1365] md:grid-cols-[54%_46%]"
      style={{ perspective: '1600px' }}
    >
      {/* ==================================================
          LEFT — Text panel
          Slides slower, fades at the edges of the scroll
          ================================================== */}
      <motion.div
        style={{
          x: textX_s,
          opacity: textOpacity_s,
          willChange: 'transform, opacity',
        }}
        className="px-6 py-16 sm:px-10 md:py-0 md:pl-[clamp(3rem,7.1vw,10rem)] md:pr-[3vw]"
      >
        <div className="max-w-[38rem]">
          {/* Eyebrow */}
          <motion.h4
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="mb-8 flex items-center gap-3 text-[#876B18] type-eyebrow md:mb-[3vw]"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
            />
            The Difference
          </motion.h4>

          {/* Title with fill reveal */}
          <h2 className="type-display mb-10 text-[#1A1A1A]">
            <span className="block">
              <RevealFill delay={0.3} duration={2}>
                Bengaluru's equestrian
              </RevealFill>
            </span>
            <span className="block">
              <RevealFill delay={1.4} duration={2.4}>
                training moves{' '}
                <span className="text-[#876B18]">indoors.</span>
              </RevealFill>
            </span>
          </h2>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.4, delay: 3.2, ease: EASE }}
            className="mb-9 h-px w-[6.75rem] origin-left bg-[#876B18] md:mb-[3.2vw] md:w-[10vw]"
          />

          {/* Paragraph */}
          <p className="type-lead max-w-[27rem] text-[#1A1A1A] md:max-w-[31rem]">
            <RevealFill delay={3.4} duration={2.6}>
              An all-weather covered arena on international-standard footing.
              Lessons do not stop for monsoon or summer heat.
            </RevealFill>
          </p>
        </div>
      </motion.div>

      {/* ==================================================
          RIGHT — Image panel
          Slides in from the right with subtle 3D tilt
          ================================================== */}
      <motion.div
        style={{
          x: imageX_s,
          scale: imageScale_s,
          rotateY: imageRotateY_s,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="px-6 pb-10 md:px-0 md:pb-0"
      >
        <div className="group relative overflow-hidden rounded-[2rem] md:rounded-l-[2.25rem] md:rounded-r-none">
          <motion.img
            src="/page 2 gpt.webp"
            alt="Indoor Arena"
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.8, ease: EASE }}
            className="block h-[28rem] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] md:h-[57.5vw]"
          />

          {/* Warm gold rim that lights up as the image settles */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.6, delay: 1.2, ease: EASE }}
            className="pointer-events-none absolute inset-0 rounded-[2rem] border border-[#C9A227]/0 md:rounded-l-[2.25rem] md:rounded-r-none"
          />

          {/* Corner bracket — draws top-left */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: EASE }}
            className="pointer-events-none absolute left-6 top-6 h-[2px] w-14 origin-left bg-[#C9A227]/70"
          />
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: EASE }}
            className="pointer-events-none absolute left-6 top-6 h-14 w-[2px] origin-top bg-[#C9A227]/70"
          />

          {/* Corner bracket — draws bottom-right */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, delay: 2, ease: EASE }}
            className="pointer-events-none absolute bottom-6 right-6 h-[2px] w-14 origin-right bg-[#C9A227]/70"
          />
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, delay: 2.2, ease: EASE }}
            className="pointer-events-none absolute bottom-6 right-6 h-14 w-[2px] origin-bottom bg-[#C9A227]/70"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default TheDifference;