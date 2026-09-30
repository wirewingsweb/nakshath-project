import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

/* ============================================================
   LETTER CASCADE
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
          transition={{ duration: 1.1, delay: delay + i * 0.05, ease: EASE }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </>
  );
};

/* ============================================================
   LINE MASK — reliable via useInView on outer container
   ============================================================ */
const LineMask = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : { y: '110%' }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
};

/* ============================================================
   OUR HORSES
   Scroll-driven camera: background drifts, text counter-drifts,
   whole frame tilts softly.
   ============================================================ */
const OurHorses = () => {
  const sectionRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Background image: drifts up and scales as you scroll past
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], ['-8%', '0%', '8%']);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.06, 1, 1.06]
  );
  const imageY_s = useSpring(imageY, {
    stiffness: 80,
    damping: 28,
    mass: 0.7,
  });
  const imageScale_s = useSpring(imageScale, {
    stiffness: 80,
    damping: 28,
    mass: 0.7,
  });

  // Text counter-drifts the opposite direction
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], ['6%', '0%', '-6%']);
  const textY_s = useSpring(textY, {
    stiffness: 100,
    damping: 28,
    mass: 0.5,
  });

  // Whole frame tilts on scroll
  const frameRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 0, -1.5]);
  const frameRotateX_s = useSpring(frameRotateX, {
    stiffness: 80,
    damping: 28,
    mass: 0.6,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#FDFCFA] px-[1.8vw] py-8 md:py-[2.3vw]"
      style={{ perspective: '1800px' }}
    >
      <motion.div
        style={{
          rotateX: shouldReduce ? 0 : frameRotateX_s,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="relative h-[32rem] w-full overflow-hidden rounded-[1.5rem] md:h-auto"
      >
        {/* ==================================================
            BACKGROUND IMAGE — scroll-driven parallax
            ================================================== */}
        <motion.div
          style={{
            y: shouldReduce ? 0 : imageY_s,
            scale: shouldReduce ? 1 : imageScale_s,
            willChange: 'transform',
          }}
          className="absolute inset-0"
        >
          <motion.img
            src="/page 8 gpt.webp"
            alt="Horse at sunset"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.12, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2.2, ease: EASE }}
            className="block h-full w-full object-cover object-[58%_center] md:h-auto md:object-center"
          />
        </motion.div>

        {/* Gradient scrim — darkens the left side for text */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/55 to-transparent md:from-[#0C0922]/85 md:via-[#0C0922]/25" />

        {/* ==================================================
            CONTENT — counter-drifts against the background
            ================================================== */}
        <motion.div
          style={{
            y: shouldReduce ? 0 : textY_s,
            willChange: 'transform',
          }}
          className="absolute left-7 top-1/2 max-w-[15.5rem] -translate-y-1/2 text-white md:left-[6.8%] md:max-w-[22rem]"
        >
          {/* Eyebrow */}
          <motion.h4
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="mb-4 flex items-center gap-3 text-[#C9A227] type-eyebrow"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
            />
            Our Horses
          </motion.h4>

          {/* Title with letter cascade */}
          <h2 className="type-page-title">
            <CascadeText text="Calm, schooled," delay={0.7} />
            <br />
            <CascadeText text="and matched to the rider." delay={1.4} />
          </h2>

          {/* Subtitle with line mask */}
          <p className="mt-4 max-w-[16rem] text-sm leading-[1.55] text-white/85 md:max-w-[25vw] md:text-base">
            <LineMask delay={2.1}>
              Every horse selected for temperament first,
            </LineMask>
            <LineMask delay={2.25}>
              then trained for the level it teaches.
            </LineMask>
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 2.5, ease: EASE }}
            className="mt-6"
          >
            <Link
              to="/horses"
              className="group/cta inline-flex items-center gap-2 border-b border-[#C9A227] pb-1 text-xs font-medium text-white transition-colors duration-500 hover:text-[#C9A227]"
            >
              <span className="relative">
                Meet the horses
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:scale-x-100" />
              </span>
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ==================================================
            Ambient gold glow — bottom right, subtle
            ================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2.4, delay: 0.6, ease: EASE }}
          className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-[#C9A227]/[0.08] blur-[140px]"
        />
      </motion.div>
    </section>
  );
};

export default OurHorses;