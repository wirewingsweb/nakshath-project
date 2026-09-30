// src/pages/Trainers.jsx
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionDots from '../components/SectionDots';
import ShinyText from '../components/ShinyText';
import { EASE_PRIMARY } from '../utils/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useInViewOnce } from '../hooks/useInViewOnce';
import {
  Reveal,
  FadeUp,
  Stagger,
  StaggerItem,
  SplitText,
} from '../components/motion';

const CHAPTERS = [
  { id: 'chapter-trainers-intro', label: 'Team' },
  { id: 'chapter-founder',        label: 'Founder' },
  { id: 'chapter-coordinator',    label: 'Coordinator' },
  { id: 'chapter-trainer',        label: 'Trainer' },
  { id: 'chapter-how-we-teach',   label: 'How We Teach' },
];

// ═══════════════════════════════════════════════════════════════
// Section wrapper with cursor ambient glow
// ═══════════════════════════════════════════════════════════════

const SectionGlow = ({ children, className = '', tone = 'light' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const ref = useRef(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { damping: 60, stiffness: 60, mass: 0.8 });
  const sy = useSpring(my, { damping: 60, stiffness: 60, mass: 0.8 });
  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section ref={ref} onMouseMove={handleMove} className={`relative ${className}`}>
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left,
            top,
            background:
              tone === 'dark'
                ? 'radial-gradient(circle, rgba(201,162,39,0.14) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)'
                : 'radial-gradient(circle, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.02) 45%, transparent 70%)',
            filter: 'blur(60px)',
            mixBlendMode: tone === 'dark' ? 'screen' : 'multiply',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// Trainer Image with reveal + interactive hover
// ═══════════════════════════════════════════════════════════════

const TrainerImage = ({ src, alt, direction = 'left', prefersReduced, aspect = 'auto', rounded = 'rounded-3xl' }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 25, stiffness: 180, mass: 0.6 });
  const sy = useSpring(my, { damping: 25, stiffness: 180, mass: 0.6 });
  const rX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const spotLeft = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const spotTop = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  const startClip =
    direction === 'right'
      ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
      : 'polygon(0 0, 0 0, 0 100%, 0 100%)';

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group/img relative w-full overflow-hidden ${rounded} shadow-2xl`}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX: rX,
              rotateY: rY,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d',
            }
      }
      initial={
        prefersReduced
          ? false
          : {
              clipPath: startClip,
              scale: 1.08,
              opacity: 0,
            }
      }
      whileInView={
        prefersReduced
          ? {}
          : {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              scale: 1,
              opacity: 1,
            }
      }
      viewport={{ once: true, amount: 0.3 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : {
              clipPath: { duration: 1.3, ease: [0.76, 0, 0.24, 1] },
              scale: { duration: 1.6, delay: 0.2, ease: EASE_PRIMARY },
              opacity: { duration: 0.6, ease: EASE_PRIMARY },
            }
      }
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`block w-full object-cover transition-transform duration-700 group-hover/img:scale-105 ${
          aspect === 'auto' ? 'h-auto' : `aspect-[${aspect}]`
        }`}
      />

      {/* Cursor spotlight */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/img:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(245,230,168,0.35) 0%, rgba(201,162,39,0.12) 45%, transparent 75%)',
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Gold ring */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${rounded} ring-0 ring-[#C9A227] transition-all duration-500 group-hover/img:ring-2 group-hover/img:ring-inset`}
      />

      {/* Corner brackets */}
      {!prefersReduced && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-4 h-7 w-7 opacity-0 transition-all duration-500 group-hover/img:left-6 group-hover/img:top-6 group-hover/img:opacity-100"
          >
            <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
            <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 opacity-0 transition-all duration-500 group-hover/img:bottom-6 group-hover/img:right-6 group-hover/img:opacity-100"
          >
            <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
            <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
          </div>
        </>
      )}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Rule Card (How We Teach)
// ═══════════════════════════════════════════════════════════════

const RuleCard = ({ rule, index, prefersReduced }) => {
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 25, stiffness: 180, mass: 0.6 });
  const sy = useSpring(my, { damping: 25, stiffness: 180, mass: 0.6 });
  const rX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rY = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const spotLeft = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const spotTop = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const number = String(index + 1).padStart(2, '0');
  const delay = index * 0.1;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:border-[#C9A227]/40 hover:bg-white/[0.05]"
      style={
        prefersReduced
          ? undefined
          : {
              rotateX: rX,
              rotateY: rY,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d',
            }
      }
      initial={
        prefersReduced ? false : { opacity: 0, y: 40 }
      }
      whileInView={
        prefersReduced ? {} : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.3 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {/* Cursor spotlight */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle at center, rgba(201,162,39,0.15) 0%, transparent 70%)',
            filter: 'blur(25px)',
          }}
        />
      )}

      {/* Gold ring on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-[#C9A227]/0 transition-all duration-500 group-hover:ring-1 group-hover:ring-[#C9A227]/40"
      />

      {/* Number badge */}
      <span className="mb-3 inline-block font-mono text-[10px] font-bold tracking-[0.2em] text-[#C9A227]/60 transition-colors duration-500 group-hover:text-[#C9A227]">
        {number}
      </span>

      <h4 className="mb-3 text-xl font-bold text-white transition-colors duration-500 group-hover:text-[#C9A227]">
        {rule.title}
      </h4>
      <p className="text-base font-normal leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-white/90">
        {rule.desc}
      </p>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Trainer Bio Paragraph
// ═══════════════════════════════════════════════════════════════

const BioParagraph = ({ children, className = '' }) => (
  <p className={`group/para relative pl-0 text-[#5A5A66] transition-all duration-500 hover:pl-5 hover:text-[#1A1A1A] ${className}`}>
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/para:h-full"
    />
    {children}
  </p>
);

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

const Trainers = () => {
  const prefersReduced = usePrefersReducedMotion();

  const trainers = [
    {
      role: 'Founder - Competition Coaching',
      name: 'Nakshath Venkatesh',
      img: '/founder.webp',
      text: 'Nakshath competes internationally in show jumping under Federation Equestre Internationale rules, and is long-listed for Team India for the 2026 Asian Games. He coaches the competition track himself, training against the same standards he is judged on. Course technique, round planning, and the discipline of riding a plan rather than riding a feeling.'
    },
    {
      role: 'Coordinator',
      name: 'Bharath Venna',
      img: '/coordinator.webp',
      text: 'Bharath runs the day to day of the academy: who rides which horse, how a rider\'s programme is paced, and when someone is ready to move up a level. He works on the principle that every rider has more in them than they think, and that consistent guidance is what gets it out.'
    },
    {
      role: 'Trainer',
      name: 'Vani',
      img: '/trainer.webp',
      text: 'Vani teaches riders from their first session on a lead rein through to independent work at canter. Her sessions start on the ground. Riders learn to approach, handle and tack up a horse before they learn to sit on one. She works often with children and with adults returning to riding after a long gap.'
    },
  ];

  const rules = [
    { title: 'Small batches', desc: 'Enough riders to learn from each other. Few enough to be corrected individually.' },
    { title: 'A coach on the ground', desc: 'Nobody rides unsupervised, at any level.' },
    { title: 'Groundwork first', desc: 'Grooming and tacking up are part of the lesson, not done for the rider.' },
    { title: 'A female trainer available', desc: 'For riders and families who would prefer one.' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <SectionDots chapters={CHAPTERS} />

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Trainers Intro (dark)
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-trainers-intro" className="nav-dark-hero bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <SectionGlow tone="dark">
          <div className="mx-auto max-w-7xl px-6">
            {/* Top edge gold line */}
            {!prefersReduced && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 top-20 h-px md:top-32"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, delay: 0.3, ease: EASE_PRIMARY }}
                style={{ originX: 0 }}
              >
                <div className="mx-auto h-px w-[min(88%,900px)] bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent" />
              </motion.div>
            )}

            {/* Eyebrow with pulsing dot */}
            <Reveal as="div" y={8} duration={0.5}>
              <h4 className="group type-eyebrow mb-4 flex cursor-default items-center gap-3">
                <motion.span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
                  animate={
                    prefersReduced
                      ? { scale: 1, opacity: 1 }
                      : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
                  }
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="transition-all duration-500 group-hover:tracking-[0.3em]">
                  <ShinyText
                    text="Who Teaches"
                    color="#C9A227"
                    shineColor="#F5F1E8"
                    speed={2.5}
                    spread={120}
                  />
                </span>
              </h4>
            </Reveal>

            {/* Heading with word-hover */}
            <Reveal as="div" y={30} duration={0.7} delay={0.15} amount={0.3}>
              <h1 className="type-page-title mb-4 text-white leading-tight [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
                Someone is watching every rider,<br />
                <ShinyText
                  text="every session."
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </h1>
            </Reveal>

            <FadeUp as="p" size="text" delay={0.35} className="type-lead text-white/70">
              Batches are kept small so corrections happen during the lesson, not after it.
            </FadeUp>
          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Founder (light) — CURTAIN REVEAL L→R
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-founder" className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <SectionGlow tone="light">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-12 px-6 lg:flex-row">

            <div className="w-full lg:w-1/2">
              <TrainerImage
                src={trainers[0].img}
                alt={trainers[0].name}
                direction="left"
                rounded="rounded-t-[3rem] rounded-b-2xl"
                prefersReduced={prefersReduced}
              />
            </div>

            <Stagger gap={0.1} amount={0.15} className="w-full pt-4 lg:w-1/2">
              <StaggerItem>
                <h4 className="group/eb type-eyebrow mb-2 inline-flex items-center gap-2 text-[#C9A227]">
                  <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                  <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">
                    Meet Our {trainers[0].role.split(' ')[0]}
                  </span>
                </h4>
              </StaggerItem>

              <StaggerItem>
                <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
                  <SplitText
                    as="h3"
                    className="type-section-title mb-6 text-[#1A1A1A]"
                    wordDelay={0.05}
                    startDelay={0}
                    amount={0.4}
                  >
                    {trainers[0].name}
                  </SplitText>
                </div>
              </StaggerItem>

              <StaggerItem>
                <p className="group/role mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#C9A227]">
                  <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/role:w-4 group-hover/role:opacity-100" />
                  <span className="transition-all duration-500 group-hover/role:tracking-[0.25em]">
                    {trainers[0].role}
                  </span>
                </p>
              </StaggerItem>

              <StaggerItem>
                <BioParagraph className="type-body mb-6">
                  Nakshath competes internationally in show jumping under Federation Equestre Internationale rules, and is long-listed for Team India for the 2026 Asian Games.
                </BioParagraph>
              </StaggerItem>

              <StaggerItem>
                <BioParagraph className="type-body mb-6">
                  He coaches the competition track himself - riders working toward show jumping and dressage competition, training against the same standards he is judged on. Course technique, round planning, and the discipline of riding a plan rather than riding a feeling.
                </BioParagraph>
              </StaggerItem>

              <StaggerItem>
                <BioParagraph className="type-body mb-8">
                  He set the training structure the rest of the academy runs on, and selected the horses on the yard.
                </BioParagraph>
              </StaggerItem>

              <StaggerItem>
                <Link
                  to="/about"
                  className="group/link relative inline-flex items-center gap-2 border-b-2 border-[#C9A227] pb-1 text-sm font-medium text-[#C9A227] transition-all duration-500 hover:border-[#1A1A1A] hover:tracking-wider hover:text-[#1A1A1A]"
                >
                  His full competitive record
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.4"
                    stroke="currentColor"
                    className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </StaggerItem>
            </Stagger>

          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Coordinator (light) — CURTAIN REVEAL R→L
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-coordinator" className="bg-[#FDFCFA] pb-24">
        <SectionGlow tone="light">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-12 px-6 lg:flex-row-reverse">

            <div className="w-full lg:w-1/2">
              <TrainerImage
                src={trainers[1].img}
                alt={trainers[1].name}
                direction="right"
                aspect="4/5"
                rounded="rounded-2xl"
                prefersReduced={prefersReduced}
              />
            </div>

            <Stagger gap={0.1} amount={0.15} className="w-full pt-4 lg:w-1/2">
              <StaggerItem>
                <h4 className="group/eb type-eyebrow mb-2 inline-flex items-center gap-2 text-[#C9A227]">
                  <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                  <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">
                    Meet Our Coordinator
                  </span>
                </h4>
              </StaggerItem>

              <StaggerItem>
                <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
                  <SplitText
                    as="h3"
                    className="type-section-title mb-6 text-[#1A1A1A]"
                    wordDelay={0.05}
                    startDelay={0}
                    amount={0.4}
                  >
                    {trainers[1].name}
                  </SplitText>
                </div>
              </StaggerItem>

              <StaggerItem>
                <p className="group/role mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#5A5A66]">
                  <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/role:w-4 group-hover/role:opacity-100" />
                  <span className="transition-all duration-500 group-hover/role:tracking-[0.25em] group-hover/role:text-[#C9A227]">
                    {trainers[1].role}
                  </span>
                </p>
              </StaggerItem>

              <StaggerItem>
                <BioParagraph className="type-body mb-6">
                  Bharath runs the day to day of the academy: who rides which horse, how a rider's programme is paced, and when someone is ready to move up a level.
                </BioParagraph>
              </StaggerItem>

              <StaggerItem>
                <BioParagraph className="type-body mb-6">
                  He works on the principle that every rider has more in them than they think, and that consistent guidance is what gets it out. Much of his job is noticing what someone is capable of before they have noticed it themselves.
                </BioParagraph>
              </StaggerItem>

              <StaggerItem>
                <BioParagraph className="type-body">
                  He is on the yard most days, and knows where every rider is in their progression.
                </BioParagraph>
              </StaggerItem>
            </Stagger>

          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Trainer (light) — CURTAIN REVEAL L→R
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-trainer" className="bg-[#FDFCFA] pb-24">
        <SectionGlow tone="light">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-12 px-6 lg:flex-row">

            <div className="w-full lg:w-1/2">
              <TrainerImage
                src={trainers[2].img}
                alt={trainers[2].name}
                direction="left"
                aspect="4/5"
                rounded="rounded-2xl"
                prefersReduced={prefersReduced}
              />
            </div>

            <Stagger gap={0.1} amount={0.15} className="w-full pt-4 lg:w-1/2">
              <StaggerItem>
                <h4 className="group/eb type-eyebrow mb-2 inline-flex items-center gap-2 text-[#C9A227]">
                  <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                  <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">
                    Meet Our Trainer
                  </span>
                </h4>
              </StaggerItem>

              <StaggerItem>
                <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
                  <SplitText
                    as="h3"
                    className="type-section-title mb-6 text-[#1A1A1A]"
                    wordDelay={0.05}
                    startDelay={0}
                    amount={0.4}
                  >
                    {trainers[2].name}
                  </SplitText>
                </div>
              </StaggerItem>

              <StaggerItem>
                <p className="group/role mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#5A5A66]">
                  <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/role:w-4 group-hover/role:opacity-100" />
                  <span className="transition-all duration-500 group-hover/role:tracking-[0.25em] group-hover/role:text-[#C9A227]">
                    {trainers[2].role}
                  </span>
                </p>
              </StaggerItem>

              <StaggerItem>
                <BioParagraph className="type-body mb-6">
                  Vani teaches riders from their first session on a lead rein through to independent work at canter, across general riding and horsemanship.
                </BioParagraph>
              </StaggerItem>

              <StaggerItem>
                <BioParagraph className="type-body mb-6">
                  Her sessions start on the ground. Riders learn to approach, handle and tack up a horse before they learn to sit on one, because confidence in the saddle comes from confidence beside the horse first.
                </BioParagraph>
              </StaggerItem>

              <StaggerItem>
                <BioParagraph className="type-body">
                  She works often with children and with adults returning to riding after a long gap - the two groups who most need to be told they are doing better than they think.
                </BioParagraph>
              </StaggerItem>
            </Stagger>

          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: How We Teach (dark) — CASCADE WAVE CARDS
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-how-we-teach" className="bg-[#0C0922] py-24">
        <SectionGlow tone="dark">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp size="text" className="mb-4">
              <h4 className="group/eyebrow type-eyebrow inline-flex cursor-default items-center gap-3">
                <motion.span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
                  animate={
                    prefersReduced
                      ? { scale: 1, opacity: 1 }
                      : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
                  }
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="transition-all duration-500 group-hover/eyebrow:tracking-[0.3em]">
                  <ShinyText
                    text="How We Teach"
                    color="#C9A227"
                    shineColor="#F5F1E8"
                    speed={2.5}
                    spread={120}
                  />
                </span>
              </h4>
            </FadeUp>

            <div className="mb-14 [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
              <SplitText
                as="h2"
                className="type-section-title text-white"
                wordDelay={0.04}
                startDelay={0.1}
                amount={0.3}
              >
                The things that don't change.
              </SplitText>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {rules.map((rule, idx) => (
                <RuleCard key={idx} rule={rule} index={idx} prefersReduced={prefersReduced} />
              ))}
            </div>
          </div>
        </SectionGlow>
      </div>

    </div>
  );
};

export default Trainers;