import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

const progression = [
  { title: 'Walk', lines: ['First', 'Sessions'], tone: 'text-white' },
  { title: 'Trot', lines: ['Building', 'Balance'], tone: 'text-white' },
  { title: 'Canter', lines: ['Control', 'and Pace'], tone: 'text-white' },
  { title: 'Competition', lines: ['National and', 'International'], tone: 'text-[#C9A227]' },
];

/* ============================================================
   STAGE LABEL — driven by parent isInView + its own delay
   Guarantees strict sequential order regardless of position
   ============================================================ */
const StageLabel = ({
  title,
  lines,
  tone,
  position,
  delay = 0,
  isCompetition = false,
  isInView,
}) => {
  const [pulse, setPulse] = useState(false);

  // Pulse fires once after this stage's animation lands
  useEffect(() => {
    if (!isInView) return undefined;
    const t = setTimeout(() => setPulse(true), (delay + 0.55) * 1000);
    const t2 = setTimeout(() => setPulse(false), (delay + 1.7) * 1000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [isInView, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, filter: 'blur(14px)' }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 70, filter: 'blur(14px)' }
      }
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={`absolute -translate-x-1/2 text-center ${position}`}
    >
      {/* Soft gold pulse */}
      <motion.span
        aria-hidden="true"
        animate={
          pulse
            ? { opacity: [0, 0.75, 0], scale: [0.5, 1.6, 2.2] }
            : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 1.2, ease: 'easeOut' }}
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
        transition={{ duration: 0.7, delay: delay + 0.4, ease: EASE }}
        className={`mx-auto mt-3 block h-px origin-center bg-[#C9A227]/70 ${
          isCompetition ? 'w-20' : 'w-12'
        }`}
      />

      {/* Sub-lines */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
  );
};

/* ============================================================
   HOW IT PROGRESSES
   Single useInView on the section drives every stage in order
   ============================================================ */
const HowItProgresses = () => {
  const desktopRef = useRef(null);
  const desktopInView = useInView(desktopRef, { once: true, amount: 0.3 });

  const mobileRef = useRef(null);
  const mobileInView = useInView(mobileRef, { once: true, amount: 0.3 });

  return (
    <section
      id="progression-story"
      className="mobile-cta-exclusion floating-action-exclusion w-full overflow-hidden bg-[#FDFCFA] px-3 py-8 min-[360px]:px-5 min-[500px]:px-6 md:bg-[#0C0922] md:p-0"
    >
      {/* ==================================================
          MOBILE
          ================================================== */}
      <motion.figure
        ref={mobileRef}
        initial={{ opacity: 0, x: -40 }}
        animate={mobileInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative overflow-hidden rounded-xl bg-[#0C0922] shadow-[0_18px_45px_rgba(12,9,34,0.16)] md:hidden"
      >
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={mobileInView ? { scale: 1, opacity: 1 } : { scale: 1.15, opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE }}
          src="/page 5 gpt.webp"
          alt="Four riders demonstrating the progression from walk through competition"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/45 via-transparent to-[#0C0922]/95" />

        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          animate={mobileInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
          className="type-eyebrow absolute left-4 top-4 text-[#C9A227] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
        >
          How It Progresses
        </motion.h4>

        <div className="absolute inset-x-2 bottom-3 grid grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr] gap-1 text-center">
          {progression.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={
                mobileInView
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 30, filter: 'blur(8px)' }
              }
              transition={{
                duration: 0.8,
                delay: 0.35 + idx * 0.55,
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
      </motion.figure>

      {/* ==================================================
          DESKTOP
          ================================================== */}
      <motion.figure
        ref={desktopRef}
        initial={{ opacity: 0 }}
        animate={desktopInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative hidden w-full md:block"
      >
        <motion.img
          initial={{ scale: 1.08 }}
          animate={desktopInView ? { scale: 1 } : { scale: 1.08 }}
          transition={{ duration: 2, ease: EASE }}
          src="/page 5 gpt.webp"
          alt="Four riders demonstrating the progression from walk through competition"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/20 via-transparent to-black/10" />

        <motion.h4
          initial={{ opacity: 0, x: -30 }}
          animate={desktopInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          className="type-eyebrow absolute left-[4.8%] top-[9.5%] text-[#C9A227] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
        >
          How It Progresses
        </motion.h4>

        {/* ==================================================
            STRICT ORDER — every label driven by the same
            parent isInView + its own staggered delay.

            Walk       lands 0.3s → 1.4s
            Trot       lands 1.0s → 2.1s
            Canter     lands 1.7s → 2.8s
            Competition lands 2.4s → 3.5s
            Total: ~3.5s

            Each "y: 70" start makes them rise smoothly from
            below like they're floating up into place.
            ================================================== */}
        <StageLabel
          isInView={desktopInView}
          title="Walk"
          lines={['First', 'Sessions']}
          tone="text-white"
          position="left-[12.3%] top-[34%] w-[clamp(7rem,15vw,13rem)]"
          delay={0.3}
        />
        <StageLabel
          isInView={desktopInView}
          title="Trot"
          lines={['Building', 'Balance']}
          tone="text-white"
          position="left-[33.6%] top-[25%] w-[clamp(7rem,15vw,13rem)]"
          delay={1.0}
        />
        <StageLabel
          isInView={desktopInView}
          title="Canter"
          lines={['Control', 'and Pace']}
          tone="text-white"
          position="left-[56%] top-[17%] w-[clamp(7rem,15vw,13rem)]"
          delay={1.7}
        />
        <StageLabel
          isInView={desktopInView}
          title="Competition"
          lines={['National and', 'International']}
          tone="text-[#C9A227]"
          position="left-[83.5%] top-[9%] w-[clamp(11rem,24vw,20rem)]"
          delay={2.4}
          isCompetition
        />
      </motion.figure>
    </section>
  );
};

export default HowItProgresses;