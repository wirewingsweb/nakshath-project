import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

const programs = [
  {
    title: 'Kids Special',
    description: 'Pony riding, confidence and coordination for children.',
    image: '/page 4 3 gpt.webp',
    offset: 'xl:mt-0',
    imageClass: 'object-contain',
    link: '/courses',
  },
  {
    title: 'Beginner',
    description: 'First-time riders. Balance, posture, safety and horse handling.',
    image: '/page 4 gpt.webp',
    offset: 'xl:mt-[5.5vw]',
    imageClass: 'object-contain',
    link: '/courses',
  },
  {
    title: 'Intermediate',
    description: 'Riding technique, communication, trotting and cantering.',
    image: '/page 4 2 gpt.webp',
    offset: 'xl:mt-[0.8vw]',
    imageClass: 'object-contain',
    link: '/courses',
  },
  {
    title: 'Professional Competition',
    description: 'Show jumping preparation and performance assessment.',
    image: '/page 4 4 gpt.webp',
    offset: 'xl:mt-[5vw]',
    imageClass: 'object-cover object-top',
    link: '/courses',
  },
];

/* ============================================================
   LETTER CASCADE — per-character X-axis rotation
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
          transition={{ duration: 0.8, delay: delay + i * 0.035, ease: EASE }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </>
  );
};

/* ============================================================
   PROGRAM CARD — deals in from below, gold trim traces the top
   ============================================================ */
const ProgramCard = ({ program, index, total }) => {
  const num = String(index + 1).padStart(2, '0');
  const totalStr = String(total).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.1,
        delay: 0.2 + index * 0.15,
        ease: EASE,
      }}
      className={`${program.offset} group/card shrink-0 snap-start snap-always`}
    >
      <Link
        to={program.link}
        aria-label={`Explore ${program.title}`}
        className="relative flex w-[84vw] max-w-[21rem] cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#0C0922] shadow-[0_15px_40px_-20px_rgba(12,9,34,0.4)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(12,9,34,0.6)] sm:w-[42vw] sm:max-w-none lg:w-[30vw] xl:w-[20vw]"
      >
        {/* ==================================================
            GOLD TRIM LINE — draws across the top as card lands
            ================================================== */}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.2,
            delay: 1.05 + index * 0.15,
            ease: EASE,
          }}
          className="absolute left-0 top-0 z-30 h-[2px] w-full origin-left bg-gradient-to-r from-[#C9A227] via-[#C9A227]/70 to-transparent"
        />

        {/* ==================================================
            LEFT VERTICAL GOLD RULE — grows up on hover
            ================================================== */}
        <span className="pointer-events-none absolute left-0 top-0 z-30 h-0 w-[2px] bg-gradient-to-b from-[#C9A227] to-[#C9A227]/40 transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:h-full" />

        {/* ==================================================
            IMAGE FRAME
            ================================================== */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0C0922]">
          <motion.img
            src={program.image}
            alt={program.title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 block h-full w-full object-cover scale-[1.12] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-100 ${program.imageClass}`}
          />

          {/* Gradient for text legibility */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0C0922]/85 via-[#0C0922]/30 to-transparent" />

          {/* Warm gold glow on hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] group-hover/card:opacity-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(201,162,39,0.18),_transparent_55%)]" />
          </div>

          {/* ==================================================
              NUMBER BADGE — springs in at top-left
              ================================================== */}
          <motion.span
            initial={{ opacity: 0, scale: 0.4, rotate: -25, y: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              delay: 1.3 + index * 0.15,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="absolute left-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#0C0922]/75 font-serif text-sm italic text-[#C9A227] backdrop-blur-md transition-all duration-500 group-hover/card:bg-[#C9A227] group-hover/card:text-[#0C0922] group-hover/card:scale-110"
          >
            {num}
          </motion.span>

          {/* Counter top-right */}
          <motion.span
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 1.5 + index * 0.15,
              ease: EASE,
            }}
            className="absolute right-5 top-5 z-20 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-white/55 transition-colors duration-500 group-hover/card:text-[#C9A227]"
          >
            {num} / {totalStr}
          </motion.span>

          {/* ==================================================
              TEXT — anchored bottom
              ================================================== */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
            <h3 className="mb-2 font-serif text-xl leading-tight tracking-tight text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:tracking-[0.02em] group-hover/card:text-[#C9A227]">
              {program.title}
            </h3>

            <div className="mb-3 h-px w-full overflow-hidden">
              <div className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#C9A227] via-[#C9A227]/70 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-x-100" />
            </div>

            <div className="overflow-hidden">
              <p className="mb-4 text-[0.8125rem] leading-relaxed text-white/75 translate-y-4 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-y-0 group-hover/card:opacity-100">
                {program.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[#C9A227]">
              <span className="inline-block opacity-0 -translate-x-2 transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-0 group-hover/card:opacity-100">
                Explore
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 -translate-x-2 transition-all duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-0 group-hover/card:opacity-100"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ============================================================
   PROGRAMS
   ============================================================ */
const Programs = () => {
  const renderProgramGroup = () => (
    <div className="mx-auto flex w-max items-start gap-6 px-6 md:gap-[1.5vw] md:px-[5.9vw]">
      {programs.map((program, index) => (
        <ProgramCard
          key={program.title}
          program={program}
          index={index}
          total={programs.length}
        />
      ))}
    </div>
  );

  return (
    <section className="mobile-cta-exclusion floating-action-exclusion relative w-full overflow-hidden border-t-[0.45rem] border-[#0C0922] bg-[#FDFCFA] py-16 md:py-24">

      {/* Ambient gold glow — subtle, top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#C9A227]/[0.06] blur-[140px]"
      />

      {/* ==================================================
          HEADER — letter cascade
          ================================================== */}
      <div className="relative pl-6 pr-6 sm:pl-10 md:pl-[6.4vw]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mb-4 flex items-center gap-3"
        >
          <motion.span
            animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
          />
          <span className="text-[#876B18] type-eyebrow">Programs</span>
        </motion.div>

        <h2 className="type-page-title text-[#1A1A1A]">
          <CascadeText text="Four ways in," delay={0.35} />
          <br />
          <CascadeText text="one path forward." delay={0.9} />
        </h2>
      </div>

      {/* ==================================================
          CAROUSEL — cards deal in sequentially
          ================================================== */}
      <div
        className="programs-carousel mt-8 snap-x snap-mandatory overflow-x-auto overscroll-x-contain md:mt-14"
        aria-label="Programs carousel"
        tabIndex="0"
      >
        {renderProgramGroup()}
      </div>

      {/* ==================================================
          CTA — See all programs
          ================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
        className="relative mt-12 pl-6 pr-6 sm:pl-10 md:mt-[3vw] md:pl-[5.9vw]"
      >
        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
          <Link
            to="/courses"
            className="group/all relative inline-flex items-center gap-2 pb-1 text-xs font-semibold text-[#1A1A1A] transition-colors hover:text-[#876B18]"
          >
            <span className="relative">
              See all programs
              {/* Base underline */}
              <span className="absolute bottom-0 left-0 h-px w-full bg-[#876B18]/40" />
              {/* Gold underline that draws on hover */}
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/all:scale-x-100" />
            </span>
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/all:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Programs;