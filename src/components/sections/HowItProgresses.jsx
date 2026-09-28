import { motion } from 'framer-motion';
import { viewportOnce } from '../../utils/animations';

// ============================================================
// PROGRESSION STEPS DATA
// ============================================================
const progression = [
  { num: '01', title: 'Walk', lines: ['First', 'Sessions'], tone: 'white' },
  { num: '02', title: 'Trot', lines: ['Building', 'Balance'], tone: 'white' },
  { num: '03', title: 'Canter', lines: ['Control', 'and Pace'], tone: 'white' },
  { num: '04', title: 'Competition', lines: ['National and', 'International'], tone: 'gold' },
];

const HowItProgresses = () => {
  return (
    <section
      id="progression-story"
      className="mobile-cta-exclusion floating-action-exclusion relative w-full overflow-hidden bg-[#FDFCFA] px-3 py-8 min-[360px]:px-5 min-[500px]:px-6 md:bg-[#0C0922] md:p-0"
    >
      {/* ============================================================ */}
      {/* MOBILE VERSION — Image with overlay */}
      {/* ============================================================ */}
      <motion.figure
        className="relative overflow-hidden rounded-xl bg-[#0C0922] shadow-[0_18px_45px_rgba(12,9,34,0.16)] md:hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/page 5 gpt.png"
          alt="Four riders demonstrating the progression from walk through competition"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/45 via-transparent to-[#0C0922]/95" />

        {/* Eyebrow */}
        <h4 className="type-eyebrow absolute left-4 top-4 text-[#C9A227] [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
          How It Progresses
        </h4>

        {/* Bottom labels — stagger */}
        <motion.div
          className="absolute inset-x-2 bottom-3 grid grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr] gap-1 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          {progression.map((step) => (
            <motion.div
              key={step.title}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="min-w-0 px-0.5"
            >
              <h3
                className={`font-serif text-[clamp(0.625rem,2.5vw,0.875rem)] leading-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] ${
                  step.tone === 'gold' ? 'text-[#C9A227]' : 'text-white'
                }`}
              >
                {step.title}
              </h3>
              <p className="mt-1.5 text-[0.625rem] font-medium uppercase leading-[1.3] tracking-[0.02em] text-white/80 [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
                {step.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.figure>

      {/* ============================================================ */}
      {/* DESKTOP VERSION — Full-width image with absolute labels */}
      {/* ============================================================ */}
      <motion.figure
        className="relative hidden w-full md:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/page 5 gpt.png"
          alt="Four riders demonstrating the progression from walk through competition"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0C0922]/20 via-transparent to-black/10" />

        {/* Eyebrow with line */}
        <motion.div
          className="absolute left-[4.8%] top-[9.5%] flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="type-eyebrow text-[#C9A227]">How It Progresses</span>
          <span className="block h-px w-24 bg-[#C9A227]/60" />
        </motion.div>

        {/* ============================================================ */}
        {/* STEP 01 — WALK */}
        {/* ============================================================ */}
        <motion.div
          className="absolute left-[12.3%] top-[44%] w-[clamp(7rem,15vw,13rem)] -translate-x-1/2 text-center text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{
            delay: 0.5,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h3 className="font-serif text-base leading-none md:text-[clamp(1.25rem,2.4vw,2.25rem)]">
            Walk
          </h3>
          <p className="type-caption mt-1.5 font-medium uppercase tracking-[0.04em] text-white/90 md:mt-3 md:tracking-[0.1em]">
            <span className="block">First</span>
            <span className="block">Sessions</span>
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* STEP 02 — TROT */}
        {/* ============================================================ */}
        <motion.div
          className="absolute left-[33.6%] top-[35%] w-[clamp(7rem,15vw,13rem)] -translate-x-1/2 text-center text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{
            delay: 0.65,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h3 className="font-serif text-base leading-none md:text-[clamp(1.25rem,2.4vw,2.25rem)]">
            Trot
          </h3>
          <p className="type-caption mt-1.5 font-medium uppercase tracking-[0.04em] text-white/90 md:mt-3 md:tracking-[0.1em]">
            <span className="block">Building</span>
            <span className="block">Balance</span>
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* STEP 03 — CANTER */}
        {/* ============================================================ */}
        <motion.div
          className="absolute left-[56%] top-[27%] w-[clamp(7rem,15vw,13rem)] -translate-x-1/2 text-center text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{
            delay: 0.8,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h3 className="font-serif text-base leading-none md:text-[clamp(1.25rem,2.4vw,2.25rem)]">
            Canter
          </h3>
          <p className="type-caption mt-1.5 font-medium uppercase tracking-[0.04em] text-white/90 md:mt-3 md:tracking-[0.1em]">
            <span className="block">Control</span>
            <span className="block">and Pace</span>
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* STEP 04 — COMPETITION */}
        {/* ============================================================ */}
        <motion.div
          className="absolute left-[83.5%] top-[18%] w-[clamp(11rem,24vw,20rem)] -translate-x-1/2 text-center [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{
            delay: 0.95,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h3 className="font-serif text-sm leading-none text-[#C9A227] md:text-[clamp(1.35rem,2.7vw,2.5rem)]">
            Competition
          </h3>
          <p className="type-caption mt-1.5 font-medium uppercase tracking-normal text-white/90 md:mt-3 md:tracking-[0.08em]">
            <span className="block">National and</span>
            <span className="block">International</span>
          </p>
        </motion.div>
      </motion.figure>
    </section>
  );
};

export default HowItProgresses;