import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

const progression = [
  { title: 'Walk', lines: ['First', 'Sessions'], tone: 'text-white' },
  { title: 'Trot', lines: ['Building', 'Balance'], tone: 'text-white' },
  { title: 'Canter', lines: ['Control', 'and Pace'], tone: 'text-white' },
  { title: 'Competition', lines: ['National and', 'International'], tone: 'text-[#C9A227]' },
];

/* ============================================================
   STAGE LABEL — strict sequential reveal + scroll-driven float
   Each stage sits at a different depth (parallax rate).
   ============================================================ */
const StageLabel = ({
  title,
  lines,
  tone,
  position,
  delay = 0,
  isCompetition = false,
  isInView,
  sectionProgress,
  depth = 0,
}) => {
  const [pulse, setPulse] = useState(false);
  const shouldReduce = useReducedMotion();

  // Fire a single gold pulse right after the label lands
  useEffect(() => {
    if (!isInView) return undefined;
    const t = setTimeout(() => setPulse(true), (delay + 0.55) * 1000);
    const t2 = setTimeout(() => setPulse(false), (delay + 1.7) * 1000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [isInView, delay]);

  // Scroll-driven float: higher depth = more movement (closer to camera)
  const floatRange = 3 + depth * 4; // 3, 5, 7, 9 %
  const yDrift = useTransform(
    sectionProgress,
    [0, 0.5, 1],
    [`${floatRange}%`, '0%', `${-floatRange}%`]
  );
  const y_s = useSpring(yDrift, { stiffness: 90, damping: 26, mass: 0.6 });

  return (
    <motion.div
      style={{
        y: shouldReduce ? 0 : y_s,
        willChange: 'transform',
      }}
      className={`absolute -translate-x-1/2 text-center ${position}`}
    >
      {/* ==================================================
          Land-in animation (once, on enter)
          ================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 70, filter: 'blur(14px)' }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 70, filter: 'blur(14px)' }
        }
        transition={{ duration: 1.1, delay, ease: EASE }}
        className="relative"
      >
        {/* Soft gold pulse behind the label */}
        <motion.span
          aria-hidden="true"
          animate={
            pulse
              ? { opacity: [0, 0.75, 0], scale: [0.5, 1.6, 2.2] }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(201,162,39,0.55),_rgba(201,162,39,0.15)_40%,_transparent_70%)]"
        />

        {/* Title */}
        <motion.h3
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay + 1.1,
          }}
          className={`font-serif leading-none ${
            isCompetition
              ? 'text-sm text-[#C9A227] md:text-[clamp(1.35rem,2.7vw,2.5rem)]'
              : 'text-base md:text-[clamp(1.25rem,2.4vw,2.25rem)]'
          } ${tone}`}
          style={{
            textShadow: isCompetition
              ? '0 2px 12px rgba(0,0,0,0.75), 0 0 20px rgba(201,162,39,0.4)'
              : '0 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          {title}
        </motion.h3>

        {/* Gold hairline under title */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: delay + 0.35, ease: EASE }}
          className={`mx-auto mt-3 block h-px origin-center bg-[#C9A227]/70 ${
            isCompetition ? 'w-20' : 'w-12'
          }`}
        />

        {/* Sub-lines */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.6, delay: delay + 0.5, ease: EASE }}
          className="type-caption mt-3 font-medium uppercase tracking-[0.04em] text-white/90 md:tracking-[0.1em]"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.55)' }}
        >
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   HOW IT PROGRESSES
   Camera-driven scene: background image drifts and scales,
   stages float at different depths, whole scene tilts.
   ============================================================ */
const HowItProgresses = () => {
  const desktopRef = useRef(null);
  const desktopInView = useInView(desktopRef, { once: true, amount: 0.3 });

  const mobileRef = useRef(null);
  const mobileInView = useInView(mobileRef, { once: true, amount: 0.3 });

  const shouldReduce = useReducedMotion();

  // Desktop scroll progress
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ['start end', 'end start'],
  });

  // Background image: drifts down and scales up as you scroll past
  const bgY = useTransform(desktopProgress, [0, 1], ['-6%', '6%']);
  const bgScale = useTransform(desktopProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const bgY_s = useSpring(bgY, { stiffness: 80, damping: 28, mass: 0.7 });
  const bgScale_s = useSpring(bgScale, {
    stiffness: 80,
    damping: 28,
    mass: 0.7,
  });

  // Whole scene tilt
  const sceneRotateX = useTransform(desktopProgress, [0, 0.5, 1], [2, 0, -2]);
  const sceneRotateX_s = useSpring(sceneRotateX, {
    stiffness: 80,
    damping: 28,
    mass: 0.6,
  });

  // Mobile: background drift
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ['start end', 'end start'],
  });
  const mobileBgY = useTransform(mobileProgress, [0, 1], ['-4%', '4%']);
  const mobileBgY_s = useSpring(mobileBgY, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  return (
    <section
      id="progression-story"
      className="mobile-cta-exclusion floating-action-exclusion w-full overflow-hidden bg-[#FDFCFA] px-3 py-8 min-[360px]:px-5 min-[500px]:px-6 md:bg-[#0C0922] md:p-0"
    >
      {/* ==================================================
          MOBILE — background drift only
          ================================================== */}
      <motion.figure
        ref={mobileRef}
        initial={{ opacity: 0, x: -40 }}
        animate={mobileInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative overflow-hidden rounded-xl bg-[#0C0922] shadow-[0_18px_45px_rgba(12,9,34,0.16)] md:hidden"
      >
        <motion.div
          style={{
            y: shouldReduce ? 0 : mobileBgY_s,
            willChange: 'transform',
          }}
          className="absolute inset-0"
        >
          <motion.img
            src="/page 5 gpt.webp"
            alt="Four riders demonstrating the progression from walk through competition"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }}
            animate={
              mobileInView
                ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                : { opacity: 0, scale: 1.15, filter: 'blur(12px)' }
            }
            transition={{ duration: 1.6, ease: EASE }}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/45 via-transparent to-[#0C0922]/95" />

        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          animate={mobileInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
          className="type-eyebrow absolute left-4 top-4 text-[#C9A227] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
        >
          How It Progresses
        </motion.h4>

        <div className="relative aspect-[3/4] w-full">
          {/* Grid of stages over the image */}
          <div className="absolute inset-x-2 bottom-3 grid grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr] gap-1 text-center">
            {progression.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={
                  mobileInView
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 24, filter: 'blur(8px)' }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.35 + idx * 0.45,
                  ease: EASE,
                }}
                className="min-w-0 px-0.5"
              >
                <h3
                  className={`font-serif text-[clamp(0.625rem,2.5vw,0.875rem)] leading-tight ${step.tone}`}
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.65)' }}
                >
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[0.625rem] font-medium uppercase leading-[1.3] tracking-[0.02em] text-white/80">
                  {step.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.figure>

      {/* ==================================================
          DESKTOP — scroll camera + depth field
          ================================================== */}
      <motion.figure
        ref={desktopRef}
        className="relative hidden w-full md:block"
        style={{ perspective: '1600px' }}
      >
        {/* ==================================================
            Background image with camera drift
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
            src="/page 5 gpt.webp"
            alt="Four riders demonstrating the progression from walk through competition"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, filter: 'blur(14px)' }}
            animate={
              desktopInView
                ? { opacity: 1, filter: 'blur(0px)' }
                : { opacity: 0, filter: 'blur(14px)' }
            }
            transition={{ duration: 2, ease: EASE }}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/20 via-transparent to-black/10" />

        {/* ==================================================
            Content — tilt + stage labels
            ================================================== */}
        <motion.div
          style={{
            rotateX: shouldReduce ? 0 : sceneRotateX_s,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className="relative w-full"
        >
          {/* Layout keeper for the image height */}
          <img
            src="/page 5 gpt.webp"
            alt=""
            aria-hidden="true"
            className="invisible block h-auto w-full"
          />

          {/* Title top-left */}
          <motion.h4
            initial={{ opacity: 0, x: -30 }}
            animate={
              desktopInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
            }
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            className="type-eyebrow absolute left-[4.8%] top-[9.5%] text-[#C9A227] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
          >
            How It Progresses
          </motion.h4>

          {/* ==================================================
              STRICT ORDER with depth-based float
              Each stage sits at a different depth:
                Walk = 0 (furthest)
                Trot = 0.33
                Canter = 0.66
                Competition = 1 (closest)
              Closer stages move more — creates 3D field.
              ================================================== */}
          <StageLabel
            isInView={desktopInView}
            sectionProgress={desktopProgress}
            depth={0}
            title="Walk"
            lines={['First', 'Sessions']}
            tone="text-white"
            position="left-[12.3%] top-[34%] w-[clamp(7rem,15vw,13rem)]"
            delay={0.3}
          />
          <StageLabel
            isInView={desktopInView}
            sectionProgress={desktopProgress}
            depth={0.33}
            title="Trot"
            lines={['Building', 'Balance']}
            tone="text-white"
            position="left-[33.6%] top-[25%] w-[clamp(7rem,15vw,13rem)]"
            delay={1.0}
          />
          <StageLabel
            isInView={desktopInView}
            sectionProgress={desktopProgress}
            depth={0.66}
            title="Canter"
            lines={['Control', 'and Pace']}
            tone="text-white"
            position="left-[56%] top-[17%] w-[clamp(7rem,15vw,13rem)]"
            delay={1.7}
          />
          <StageLabel
            isInView={desktopInView}
            sectionProgress={desktopProgress}
            depth={1}
            title="Competition"
            lines={['National and', 'International']}
            tone="text-[#C9A227]"
            position="left-[83.5%] top-[9%] w-[clamp(11rem,24vw,20rem)]"
            delay={2.4}
            isCompetition
          />
        </motion.div>
      </motion.figure>
    </section>
  );
};

export default HowItProgresses;