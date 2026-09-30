import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

const coaches = [
  { name: 'Nakshath Venkatesh', role: 'Founder', image: '/founder.webp', offset: '' },
  { name: 'Bharath Venna', role: 'Coordinator', image: '/page 10 2 gpt.webp', offset: 'xl:mt-5' },
  { name: 'Vani', role: 'Trainer', image: '/trainer.webp', offset: 'xl:mt-10' },
];

/* ============================================================
   COACH CARD — with scroll-driven column depth
   Each card floats at a different rate based on its index.
   ============================================================ */
const CoachCard = ({ coach, index, sectionProgress }) => {
  const baseDelay = 0.4 + index * 0.2;
  const shouldReduce = useReducedMotion();

  // Each column floats at a different rate — creates 3D field
  const floatRange = 4 + index * 2; // 4, 6, 8 %
  const yDrift = useTransform(
    sectionProgress,
    [0, 0.5, 1],
    [`${floatRange}%`, '0%', `${-floatRange}%`]
  );
  const y_s = useSpring(yDrift, { stiffness: 90, damping: 26, mass: 0.6 });

  return (
    <motion.article
      style={{
        y: shouldReduce ? 0 : y_s,
        willChange: 'transform',
      }}
      className={`${coach.offset} group relative flex flex-col`}
    >
      {/* ===== Number — flips in from above ===== */}
      <div className="mb-5 flex items-center gap-4">
        <motion.span
          initial={{ opacity: 0, rotateX: -80, y: -12 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: baseDelay + 0.15,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{ transformOrigin: 'center bottom', display: 'inline-block' }}
          className="font-serif text-[1.75rem] leading-none tracking-tight text-[#C9A227]"
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: baseDelay + 0.35, ease: EASE }}
          className="h-px flex-1 origin-left bg-[#C9A227]/25"
        />
      </div>

      {/* ===== Name + Role ===== */}
      <div className="mb-5">
        <h3 className="type-card-title text-white transition-colors duration-500 group-hover:text-[#C9A227]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.95,
                delay: baseDelay + 0.25,
                ease: EASE,
              }}
              className="block"
            >
              {coach.name}
            </motion.span>
          </span>
        </h3>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: baseDelay + 0.5, ease: EASE }}
          className="mt-2 flex items-center gap-2"
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.25, 1] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: baseDelay + 0.6,
            }}
            className="inline-block h-1 w-1 rounded-full bg-[#C9A227]/70"
          />
          <motion.p
            initial={{ letterSpacing: '0.08em' }}
            whileInView={{ letterSpacing: '0.22em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: baseDelay + 0.5, ease: EASE }}
            className="text-[0.68rem] font-medium uppercase text-white/50 transition-colors duration-500 group-hover:text-[#C9A227]/80"
          >
            {coach.role}
          </motion.p>
        </motion.div>
      </div>

      {/* ===== Portrait — scale + blur reveal ===== */}
      <div className="relative w-full aspect-[3/5] overflow-hidden rounded-3xl bg-[#0C0922]">
        <motion.img
          src={coach.image}
          alt={coach.name}
          loading="lazy"
          decoding="async"
          initial={{
            opacity: 0,
            scale: 0.88,
            filter: 'blur(12px) brightness(0.6)',
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px) brightness(1)',
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.6,
            delay: baseDelay + 0.3,
            ease: EASE,
          }}
          className="block h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />

        {/* Warm inner rim on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ boxShadow: 'inset 0 0 60px rgba(201,162,39,0.15)' }}
        />

        {/* Gold rim on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/40" />

        {/* Corner bracket — appears on hover */}
        <div className="pointer-events-none absolute inset-3">
          <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[#C9A227]/0 transition-all duration-700 group-hover:border-[#C9A227]/80" />
        </div>
      </div>
    </motion.article>
  );
};

/* ============================================================
   MAIN
   ============================================================ */
const WhoTeaches = () => {
  const sectionRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Background image drifts and scales
  const bgY = useTransform(scrollYProgress, [0, 0.5, 1], ['-5%', '0%', '5%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const bgY_s = useSpring(bgY, { stiffness: 80, damping: 28, mass: 0.7 });
  const bgScale_s = useSpring(bgScale, {
    stiffness: 80,
    damping: 28,
    mass: 0.7,
  });

  // Header counter-drifts
  const headerY = useTransform(scrollYProgress, [0, 0.5, 1], ['3%', '0%', '-3%']);
  const headerY_s = useSpring(headerY, {
    stiffness: 100,
    damping: 28,
    mass: 0.5,
  });

  // Whole section tilt
  const sceneRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 0, -1.5]);
  const sceneRotateX_s = useSpring(sceneRotateX, {
    stiffness: 80,
    damping: 28,
    mass: 0.6,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0C0922] px-6 pb-20 pt-20 md:px-10 md:py-28 xl:px-[5.4vw] xl:pb-24 xl:pt-[7vw]"
      style={{ perspective: '1600px' }}
    >
      {/* ==================================================
          Background image — camera drift
          ================================================== */}
      <motion.div
        style={{
          y: shouldReduce ? 0 : bgY_s,
          scale: shouldReduce ? 1 : bgScale_s,
          willChange: 'transform',
        }}
        className="absolute inset-0"
      >
        <motion.img
          src="/blue house.webp"
          alt=""
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, filter: 'blur(14px)' }}
          whileInView={{ opacity: 0.55, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 2.4, ease: EASE }}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#0C0922]/70" />

      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227]/[0.05] blur-[140px]" />
      </div>

      {/* ==================================================
          Content — scroll tilt
          ================================================== */}
      <motion.div
        style={{
          rotateX: shouldReduce ? 0 : sceneRotateX_s,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="relative z-10"
      >
        {/* Header */}
        <motion.div
          style={{
            y: shouldReduce ? 0 : headerY_s,
            willChange: 'transform',
          }}
          className="mb-16 max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="mb-5 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[#C9A227]"
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
            Who Teaches
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, wordSpacing: '-0.2em', filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, wordSpacing: '0em', filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            className="type-page-title text-white"
          >
            Small batches,
            <br />
            named coaches.
          </motion.h2>

          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, delay: 1.1, ease: EASE }}
            className="mt-6 block h-[2px] w-16 origin-left bg-[#C9A227]/60"
          />
        </motion.div>

        {/* Coaches grid with per-card scroll depth */}
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_0.55fr] xl:gap-x-[3vw]">
          {coaches.map((coach, index) => (
            <CoachCard
              key={coach.name}
              coach={coach}
              index={index}
              sectionProgress={scrollYProgress}
            />
          ))}

          {/* CTA Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 1.15, ease: EASE }}
            className="self-end pb-2 text-white/85 xl:mt-[14vw] xl:self-auto xl:pb-0"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.3, ease: EASE }}
              className="mb-6 h-px w-10 origin-left bg-[#C9A227]/60"
            />

            <p className="text-sm leading-relaxed text-white/65">
              Limited riders
              <br />
              per session.
            </p>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-8 inline-block"
            >
              <Link
                to="/trainers"
                className="group/btn inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] transition-colors duration-300 hover:text-white"
              >
                <span className="border-b border-[#C9A227]/60 pb-1 transition-colors duration-300 group-hover/btn:border-white/60">
                  Meet the team
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default WhoTeaches;