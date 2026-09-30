import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';
import {
  fadeInUp,
  staggerContainer,
  slideFromLeft,
  slideFromRight,
} from '../utils/animations';

const EASE = [0.22, 1, 0.36, 1];

/* ============================================================
   LOCAL MOTION PRIMITIVES
   ============================================================ */

// Letters drop in with a slight rotation + blur → sharp
const LetterDrop = ({ text, delay = 0, className = '' }) => {
  const chars = text.split('');
  return (
    <span className={className}>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ opacity: 0, y: '-0.7em', rotate: -6, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.035,
            ease: EASE,
          }}
          style={{ display: 'inline-block', willChange: 'transform' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  );
};

// Portrait — soft settle-in reveal
const PortraitReveal = ({ src, alt, delay = 0.3, aspect = 'aspect-[4/5]' }) => (
  <div className="group relative w-full">
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.2, delay: delay + 0.9, ease: EASE }}
      className="pointer-events-none absolute -inset-3 z-20 rounded-[1.75rem] border border-dashed border-[#C9A227]/30"
    />

    <div className="relative w-full overflow-hidden rounded-2xl bg-[#0C0922] shadow-[0_30px_70px_-30px_rgba(12,9,34,0.55)]">
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className="absolute left-0 top-0 z-20 h-[2px] w-full origin-left bg-gradient-to-r from-[#C9A227] via-[#E0BF4C] to-[#C9A227]/30"
      />

      <div className={`relative ${aspect} w-full overflow-hidden`}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          initial={{
            opacity: 0,
            y: 24,
            scale: 1.05,
            filter: 'blur(12px) brightness(0.7) grayscale(30%)',
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px) brightness(1) grayscale(18%)',
          }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.5, delay: delay + 0.15, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
        />

        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/50" />

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: delay + 1.1, ease: EASE }}
          className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full border border-[#C9A227]/50 bg-[#0C0922]/75 px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-[#C9A227] backdrop-blur-md"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block h-1 w-1 rounded-full bg-[#C9A227]"
          />
          On the Yard
        </motion.div>
      </div>
    </div>
  </div>
);

// Role tab — slide-in from left, with a growing gold bar + shine sweep
const RoleTab = ({ role, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0 }}
    transition={{ duration: 0.85, delay, ease: EASE }}
    className="group/role mb-8 flex items-center gap-4"
  >
    <motion.span
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.9, delay: delay + 0.25, ease: EASE }}
      className="block h-7 w-[2px] origin-center bg-[#C9A227] transition-[height] duration-500 group-hover/role:h-9"
    />
    <span className="text-[#C9A227] text-sm font-bold uppercase tracking-[0.22em] transition-[letter-spacing] duration-500 group-hover/role:tracking-[0.28em]">
      {role}
    </span>
  </motion.div>
);

// Paragraph — blur → sharp
const BlurPara = ({ children, delay = 0, className = '' }) => (
  <motion.p
    initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, amount: 0 }}
    transition={{ duration: 0.95, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.p>
);

// Roman numeral rail — parallax on scroll
const RomanRail = ({ numeral, align = 'left' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.span
      ref={ref}
      style={{ y, letterSpacing: '-0.05em' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.6, ease: EASE }}
      className={`pointer-events-none absolute top-2 z-0 select-none font-serif text-[7rem] leading-none text-[#0C0922]/[0.05] md:text-[11rem] ${
        align === 'right' ? 'right-0 md:right-4' : 'left-0 md:left-4'
      }`}
    >
      {numeral}
    </motion.span>
  );
};

// Rotating ring + numeral for the "How We Teach" rules
const RuleNumber = ({ index, delay = 0 }) => (
  <div className="relative mb-5 flex h-14 w-14 items-center justify-center">
    <motion.span
      initial={{ opacity: 0, scale: 0.6, rotate: -60 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className="absolute inset-0 rounded-full border border-dashed border-[#C9A227]/45 transition-transform duration-700 group-hover:rotate-45"
    />
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.7, delay: delay + 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className="absolute inset-[6px] rounded-full border border-[#C9A227]/80 transition-colors duration-500 group-hover:bg-[#C9A227]/10"
    />
    <span className="relative font-serif text-lg italic text-[#C9A227]">
      {index}
    </span>
  </div>
);

/* ============================================================
   TRAINER PROFILE — portrait peels away from text as you scroll
   Each profile gets its own tracker so the drift is coherent
   per section (I, II, III) rather than overlapping.
   ============================================================ */
const TrainerProfile = ({
  trainer,
  index,
  reverse = false,
  headerLabel,
  showLink = false,
  paragraphs = [],
}) => {
  const sectionRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Portrait drifts up, text drifts down (or reverse) — the peel
  const portraitY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['3.5%', '0%', '-3.5%']
  );
  const portraitY_s = useSpring(portraitY, {
    stiffness: 85,
    damping: 28,
    mass: 0.65,
  });

  const textY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['-1.8%', '0%', '1.8%']
  );
  const textY_s = useSpring(textY, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  return (
    <div ref={sectionRef} className="relative mb-32">
      <RomanRail numeral={String(index + 1) === '1' ? 'I' : String(index + 1) === '2' ? 'II' : 'III'} align={reverse ? 'right' : 'left'} />

      <div
        className={`relative z-10 flex flex-col items-start gap-12 ${
          reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* Portrait — drifts one direction */}
        <motion.div
          style={{
            y: shouldReduce ? 0 : portraitY_s,
            willChange: 'transform',
          }}
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="w-full lg:w-1/2"
        >
          <PortraitReveal
            src={trainer.img}
            alt={trainer.name}
            delay={0.35}
            aspect="aspect-[4/5]"
          />
        </motion.div>

        {/* Text — drifts the opposite direction */}
        <motion.div
          style={{
            y: shouldReduce ? 0 : textY_s,
            willChange: 'transform',
          }}
          className="w-full lg:w-1/2 lg:pt-6"
        >
          <motion.h4
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mb-2 text-[#C9A227] type-eyebrow"
          >
            {headerLabel}
          </motion.h4>

          <h3 className="type-section-title text-[#1A1A1A] mb-6 transition-colors duration-500 hover:text-[#C9A227]">
            <LetterDrop text={trainer.name} delay={0.35} />
          </h3>

          <RoleTab role={trainer.role} delay={0.9} />

          {paragraphs.map((para, i) => (
            <BlurPara
              key={i}
              delay={1.05 + i * 0.15}
              className={`type-body text-[#5A5A66] ${
                i === paragraphs.length - 1 && !showLink ? '' : 'mb-6'
              }`}
            >
              {para}
            </BlurPara>
          ))}

          {showLink && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
              className="mt-2"
            >
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                <Link
                  to="/about"
                  className="inline-block border-b-2 border-[#C9A227] pb-1 text-sm font-medium text-[#C9A227] transition-colors hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                >
                  His full competitive record
                </Link>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

/* ============================================================
   RULE CARD — differential scroll drift per card
   ============================================================ */
const RuleCard = ({ rule, idx, progress }) => {
  const shouldReduce = useReducedMotion();
  const range = 2 + (idx % 4) * 1.3; // 2 / 3.3 / 4.6 / 5.9 %

  const driftY = useTransform(
    progress,
    [0, 0.5, 1],
    [`${range}%`, '0%', `${-range}%`]
  );
  const driftY_s = useSpring(driftY, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  return (
    <motion.div
      style={{
        y: shouldReduce ? 0 : driftY_s,
        willChange: 'transform',
      }}
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.3 + idx * 0.15,
        ease: EASE,
      }}
      className="group relative"
    >
      <RuleNumber
        index={String(idx + 1).padStart(2, '0')}
        delay={0.5 + idx * 0.15}
      />

      <h4 className="mb-3 text-xl font-bold text-white transition-colors duration-500 group-hover:text-[#C9A227]">
        {rule.title}
      </h4>
      <p className="text-base font-normal leading-relaxed text-white/60">
        {rule.desc}
      </p>

      <span className="mt-4 block h-px w-full max-w-[3rem] origin-left bg-[#C9A227]/60 transition-[max-width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-full" />
    </motion.div>
  );
};

/* ============================================================
   MAIN PAGE
   ============================================================ */
const Trainers = () => {
  const shouldReduce = useReducedMotion();

  // Header orb drift
  const headerRef = useRef(null);
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(headerProgress, [0, 1], ['0%', '42%']);
  const orbY_s = useSpring(orbY, { stiffness: 80, damping: 28, mass: 0.7 });

  // "How We Teach" cards
  const rulesRef = useRef(null);
  const { scrollYProgress: rulesProgress } = useScroll({
    target: rulesRef,
    offset: ['start end', 'end start'],
  });

  const trainers = [
    {
      role: 'Founder - Competition Coaching',
      name: 'Nakshath Venkatesh',
      img: '/founder.webp',
      text: 'Nakshath competes internationally in show jumping under Federation Equestre Internationale rules, and is long-listed for Team India for the 2026 Asian Games. He coaches the competition track himself, training against the same standards he is judged on. Course technique, round planning, and the discipline of riding a plan rather than riding a feeling.',
    },
    {
      role: 'Coordinator',
      name: 'Bharath Venna',
      img: '/coordinator.webp',
      text: "Bharath runs the day to day of the academy: who rides which horse, how a rider's programme is paced, and when someone is ready to move up a level. He works on the principle that every rider has more in them than they think, and that consistent guidance is what gets it out.",
    },
    {
      role: 'Trainer',
      name: 'Vani',
      img: '/trainer.webp',
      text: 'Vani teaches riders from their first session on a lead rein through to independent work at canter. Her sessions start on the ground. Riders learn to approach, handle and tack up a horse before they learn to sit on one. She works often with children and with adults returning to riding after a long gap.',
    },
  ];

  // Per-trainer expanded paragraphs — matches the original file exactly
  const founderParagraphs = [
    'Nakshath competes internationally in show jumping under Federation Equestre Internationale rules, and is long-listed for Team India for the 2026 Asian Games.',
    'He coaches the competition track himself — riders working toward show jumping and dressage competition, training against the same standards he is judged on. Course technique, round planning, and the discipline of riding a plan rather than riding a feeling.',
    'He set the training structure the rest of the academy runs on, and selected the horses on the yard.',
  ];

  const coordinatorParagraphs = [
    "Bharath runs the day to day of the academy: who rides which horse, how a rider's programme is paced, and when someone is ready to move up a level.",
    'He works on the principle that every rider has more in them than they think, and that consistent guidance is what gets it out. Much of his job is noticing what someone is capable of before they have noticed it themselves.',
    'He is on the yard most days, and knows where every rider is in their progression.',
  ];

  const trainerParagraphs = [
    'Vani teaches riders from their first session on a lead rein through to independent work at canter, across general riding and horsemanship.',
    'Her sessions start on the ground. Riders learn to approach, handle and tack up a horse before they learn to sit on one, because confidence in the saddle comes from confidence beside the horse first.',
    'She works often with children and with adults returning to riding after a long gap — the two groups who most need to be told they are doing better than they think.',
  ];

  const rules = [
    { title: 'Small batches', desc: 'Enough riders to learn from each other. Few enough to be corrected individually.' },
    { title: 'A coach on the ground', desc: 'Nobody rides unsupervised, at any level.' },
    { title: 'Groundwork first', desc: 'Grooming and tacking up are part of the lesson, not done for the rider.' },
    { title: 'A female trainer available', desc: 'For riders and families who would prefer one.' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">

      {/* ============================================================
         HEADER — orb drift on scroll
         ============================================================ */}
      <div
        ref={headerRef}
        className="nav-dark-hero relative overflow-hidden bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44"
      >
        <motion.div
          style={{
            y: shouldReduce ? 0 : orbY_s,
            willChange: 'transform',
          }}
          className="pointer-events-none absolute inset-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2, ease: EASE }}
            className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#C9A227]/10 blur-[140px]"
          />
        </motion.div>

        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-[-10%] opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(201,162,39,1) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative max-w-7xl mx-auto px-6"
        >
          <motion.h4 variants={fadeInUp} className="text-[#C9A227] type-eyebrow mb-4">
            Who Teaches
          </motion.h4>
          <motion.h1
            variants={fadeInUp}
            className="type-page-title text-white leading-tight mb-4"
          >
            Someone is watching every rider,
            <br />
            every session.
          </motion.h1>
          <motion.p variants={fadeInUp} className="type-lead text-white/70">
            Batches are kept small so corrections happen during the lesson, not after it.
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
            className="mt-10 block h-px w-32 origin-left bg-[#C9A227]/70"
          />
        </motion.div>
      </div>

      {/* ============================================================
         TRAINER PROFILES — portrait + text peel apart on scroll
         ============================================================ */}
      <div className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] pt-24 pb-8">
        <div className="relative max-w-7xl mx-auto px-6">

          {/* I — Founder (portrait left, text right) */}
          <TrainerProfile
            trainer={trainers[0]}
            index={0}
            reverse={false}
            headerLabel={`Meet Our ${trainers[0].role.split(' ')[0]}`}
            showLink
            paragraphs={founderParagraphs}
          />

          {/* II — Coordinator (portrait right, text left) */}
          <TrainerProfile
            trainer={trainers[1]}
            index={1}
            reverse
            headerLabel="Meet Our Coordinator"
            paragraphs={coordinatorParagraphs}
          />

          {/* III — Trainer (portrait left, text right) */}
          <TrainerProfile
            trainer={trainers[2]}
            index={2}
            reverse={false}
            headerLabel="Meet Our Trainer"
            paragraphs={trainerParagraphs}
          />
        </div>
      </div>

      {/* ============================================================
         HOW WE TEACH — rule cards depth field
         ============================================================ */}
      <div className="relative overflow-hidden bg-[#0C0922] py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, ease: EASE }}
          className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#C9A227]/8 blur-[140px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, delay: 0.4, ease: EASE }}
          className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#C9A227]/6 blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={staggerContainer}
          >
            <motion.h4 variants={fadeInUp} className="text-[#C9A227] type-eyebrow mb-4">
              How We Teach
            </motion.h4>
            <motion.h2
              variants={fadeInUp}
              className="type-section-title text-white mb-14"
            >
              The things that don&rsquo;t change.
            </motion.h2>
          </motion.div>

          <div
            ref={rulesRef}
            className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
          >
            {rules.map((rule, idx) => (
              <RuleCard
                key={idx}
                rule={rule}
                idx={idx}
                progress={rulesProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainers;