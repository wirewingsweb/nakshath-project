// src/pages/Horses.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionDots from '../components/SectionDots';
import ShinyText from '../components/ShinyText';
import { EASE_PRIMARY } from '../utils/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useInViewOnce } from '../hooks/useInViewOnce';
import {
  Reveal,
  FadeUp,
  ImageReveal,
  Stagger,
  StaggerItem,
  SplitText,
  DriftImage,
  InteractiveCard,
} from '../components/motion';

const CHAPTERS = [
  { id: 'chapter-horses-intro', label: 'Horses' },
  { id: 'chapter-matching',     label: 'Matching' },
  { id: 'chapter-day',          label: 'Stables' },
  { id: 'chapter-meet',         label: 'Meet' },
  { id: 'chapter-care',         label: 'Care' },
  { id: 'chapter-safety',       label: 'Safety' },
];

// ═══════════════════════════════════════════════════════════════
// Section wrapper — cursor ambient glow
// ═══════════════════════════════════════════════════════════════

const SectionGlow = ({ children, className = '', tone = 'dark' }) => {
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
// REVEAL 1 — Ink Drop
// ═══════════════════════════════════════════════════════════════

const InkDropReveal = ({ children, delay = 0, className = '', prefersReduced }) => (
  <motion.div
    className={className}
    initial={
      prefersReduced
        ? false
        : { clipPath: 'circle(0% at 0% 0%)', opacity: 0 }
    }
    whileInView={
      prefersReduced
        ? {}
        : { clipPath: 'circle(150% at 0% 0%)', opacity: 1 }
    }
    viewport={{ once: true, amount: 0.3 }}
    transition={
      prefersReduced
        ? { duration: 0 }
        : {
            opacity: { duration: 0.2, delay },
            clipPath: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
          }
    }
  >
    {children}
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
// REVEAL 2 — Letterbox
// ═══════════════════════════════════════════════════════════════

const LetterboxReveal = ({ children, delay = 0, className = '', prefersReduced }) => (
  <motion.div className={`relative overflow-hidden ${className}`}>
    {children}
    {!prefersReduced && (
      <>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2 bg-[#FDFCFA]"
          initial={{ y: 0 }}
          whileInView={{ y: '-100%' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-[#FDFCFA]"
          initial={{ y: 0 }}
          whileInView={{ y: '100%' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: delay + 0.08, ease: [0.76, 0, 0.24, 1] }}
        />
      </>
    )}
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
// REVEAL 3 — Bottom-Up Rise
// ═══════════════════════════════════════════════════════════════

const RiseReveal = ({ children, delay = 0, className = '', prefersReduced }) => (
  <motion.div
    className={className}
    initial={
      prefersReduced ? false : { opacity: 0, y: 60, scale: 0.94 }
    }
    whileInView={
      prefersReduced ? {} : { opacity: 1, y: 0, scale: 1 }
    }
    viewport={{ once: true, amount: 0.3 }}
    transition={
      prefersReduced
        ? { duration: 0 }
        : { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
    }
  >
    {children}
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
// Interactive Match Item
// ═══════════════════════════════════════════════════════════════

const MatchItem = ({ item, prefersReduced }) => {
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 25, stiffness: 180, mass: 0.6 });
  const sy = useSpring(my, { damping: 25, stiffness: 180, mass: 0.6 });
  const rX = useTransform(sy, [-0.5, 0.5], [3, -3]);
  const rY = useTransform(sx, [-0.5, 0.5], [-3, 3]);
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative flex gap-6 rounded-lg p-3 transition-all duration-500 hover:bg-[#F5F1E8]/40"
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
    >
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle at center, rgba(201,162,39,0.10) 0%, transparent 70%)',
            filter: 'blur(25px)',
          }}
        />
      )}

      <motion.span
        className="flex-shrink-0 font-serif text-5xl text-[#C9A227] transition-all duration-500 group-hover:scale-110 group-hover:text-[#876B18]"
        whileHover={prefersReduced ? undefined : { rotate: -3 }}
      >
        {item.num}
      </motion.span>

      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-3 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-full"
        />
        <h4 className="mb-3 font-serif text-xl text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#876B18]">
          {item.title}
        </h4>
        <p className="font-normal leading-relaxed text-[#5A5A66] transition-colors duration-500 group-hover:text-[#1A1A1A]">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Horse Card
// ═══════════════════════════════════════════════════════════════

const HorseCard = ({ horse, index, prefersReduced }) => {
  const ref = useRef(null);
  const [imageInViewRef, imageInView] = useInViewOnce({ amount: 0.2 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 25, stiffness: 180, mass: 0.6 });
  const sy = useSpring(my, { damping: 25, stiffness: 180, mass: 0.6 });
  const rX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
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

  const revealDelay = index * 0.08;

  return (
    <LetterboxReveal delay={revealDelay} prefersReduced={prefersReduced}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group flex flex-col"
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
      >
        <motion.div
          ref={imageInViewRef}
          className="relative w-full overflow-hidden rounded-xl bg-[#F2F0EB]"
          initial={
            prefersReduced
              ? false
              : { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }
          }
          animate={
            imageInView && !prefersReduced
              ? {
                  clipPath: [
                    'polygon(0 0, 0 0, 0 100%, 0 100%)',
                    'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  ],
                }
              : {}
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : {
                  duration: 1.2,
                  delay: revealDelay + 0.3,
                  ease: [0.76, 0, 0.24, 1],
                }
          }
        >
          <img
            src={horse.img}
            alt={horse.name}
            loading="lazy"
            decoding="async"
            className="aspect-[9/16] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                left: spotLeft,
                top: spotTop,
                background:
                  'radial-gradient(circle, rgba(245,230,168,0.35) 0%, rgba(201,162,39,0.12) 45%, transparent 75%)',
                filter: 'blur(30px)',
                mixBlendMode: 'screen',
              }}
            />
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A227]">
                {horse.level} · {horse.discipline}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.4"
                stroke="currentColor"
                className="h-3 w-3 text-[#C9A227]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-2 group-hover:ring-inset"
          />

          {!prefersReduced && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-3 h-6 w-6 opacity-0 transition-all duration-500 group-hover:left-4 group-hover:top-4 group-hover:opacity-100"
              >
                <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
                <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 opacity-0 transition-all duration-500 group-hover:bottom-4 group-hover:right-4 group-hover:opacity-100"
              >
                <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
                <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
              </div>
            </>
          )}
        </motion.div>

        <div className="mt-6">
          <h3 className="mb-1 font-serif text-xl text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#876B18] md:text-2xl">
            {horse.name}
          </h3>
          <p className="mb-4 text-sm font-normal leading-relaxed text-[#5A5A66]">
            {horse.breed} · {horse.age} · {horse.gender} · {horse.colour}
          </p>
          <p className="mb-4 font-normal leading-relaxed text-[#5A5A66] transition-colors duration-300 group-hover:text-[#1A1A1A]">
            {horse.temperament}
          </p>
          <div className="flex gap-3 text-xs font-semibold uppercase tracking-wider text-[#C9A227]">
            <span className="transition-all duration-500 group-hover:tracking-widest">{horse.level}</span>
            <span className="transition-all duration-500 group-hover:tracking-widest">{horse.discipline}</span>
          </div>
        </div>
      </motion.div>
    </LetterboxReveal>
  );
};

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

const Horses = () => {
  const prefersReduced = usePrefersReducedMotion();

  const horses = [
    { name: 'Vibrato', breed: 'Warmblood', age: '17 Yrs.', gender: 'Gelding', colour: 'Chestnut', temperament: 'Steady and unflurried. The horse most first-time riders start on.', level: 'Advanced', discipline: 'General Riding', img: '/Vibrato.webp' },
    { name: 'Simbha', breed: 'Thoroughbred', age: '9 Yrs.', gender: 'Gelding', colour: 'Dark Bay', temperament: 'Responsive and forward-going. Suits riders building confidence at trot and canter.', level: 'Intermediate', discipline: 'Show Jumping', img: '/Simbha.webp' },
    { name: 'Phebe', breed: 'Thoroughbred', age: '8 Yrs.', gender: 'Mare', colour: 'Bay', temperament: 'Patient and consistent. Trained for flatwork and figures.', level: 'Intermediate', discipline: 'Dressage', img: '/Phebe.webp' },
    { name: 'Rani', breed: 'Thoroughbred', age: '11 Yrs.', gender: 'Gelding', colour: 'Chestnut', temperament: 'Bold over fences and honest to the jump. Ridden by competing riders.', level: 'Advanced', discipline: 'Show Jumping', img: '/Rani.webp' },
  ];

  const matchItems = [
    { num: '01', title: 'Temperament first, ability second', desc: 'A horse can be well schooled and still be wrong for a nervous beginner. Every horse is assessed for calmness and consistency before it is assessed for what it can do.' },
    { num: '02', title: 'Matched to the rider, not to availability', desc: "Horses are allocated on the rider's experience, confidence and goals. Nobody is put on whatever happens to be free that morning." },
    { num: '03', title: 'Ponies for the youngest riders', desc: 'Children from five years begin on ponies sized and schooled for them, not on a grown-up-sized horse.' },
    { num: '04', title: 'The same pairing, session after session', desc: 'Progress compounds when horse and rider know each other. Pairings are kept consistent rather than switching week to week.' },
  ];

  const careItems = [
    { title: 'Individual stalls', desc: 'Individual stables with fresh water, clean, dry bedding, and private bathrooms, with maximum 4 hours of access to the stalls.' },
    { title: 'Fixed feeding routine', desc: 'Horses are fed three times a day, plus free access to a hay feeder. They are not fed during exercise.' },
    { title: 'Daily exercise', desc: 'Every horse is exercised every day, including days when no riding is scheduled. Horses are rested only as advised.' },
    { title: 'Exercise on non-riding days', desc: 'Horses are turned out for at least 6 hours a day in cold months and 4 hours in hotter months. Horses go out in quiet, consistent groups.' },
    { title: 'Health team', desc: 'Vaccination, deworming, and hoof care are managed by a team that includes a veterinarian and a farrier.' },
    { title: 'Saddlery team', desc: "Every horse's saddle, bridle and bit are checked and adjusted to ensure the horse's comfort throughout the day." },
    { title: 'Medical room', desc: 'A dedicated room on site for treatments and recovery.' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <SectionDots chapters={CHAPTERS} />

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Horses Intro (dark)
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-horses-intro" className="nav-dark-hero bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <SectionGlow tone="dark">
          <div className="mx-auto max-w-7xl px-6">
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
                <ShinyText
                  text="Our Horses"
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </h4>
            </Reveal>

            <Reveal as="div" y={30} duration={0.7} delay={0.15} amount={0.3}>
              <h1 className="type-page-title-long mb-6 text-white [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
                The horse is chosen for the rider,{' '}
                <ShinyText
                  text="not the other way around."
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </h1>
            </Reveal>

            <FadeUp
              as="p"
              size="text"
              delay={0.35}
              className="type-lead text-white/70"
            >
              Every horse is matched by the rider's experience, ability, confidence and goals.
            </FadeUp>
          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: How Matching Works (light) — INK DROP
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-matching" className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <SectionGlow tone="light">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp size="text" className="mb-4">
              <h4 className="type-eyebrow text-[#C9A227]">How Matching Works</h4>
            </FadeUp>

            <div className="mb-16 [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
              <SplitText
                as="h2"
                className="type-section-title text-[#1A1A1A]"
                wordDelay={0.04}
                startDelay={0.1}
                amount={0.3}
              >
                Safety is a matching problem before it is a training problem.
              </SplitText>
            </div>

            <Stagger gap={0.12} amount={0.15} className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {matchItems.map((item, idx) => (
                <StaggerItem key={idx}>
                  <InkDropReveal
                    delay={idx * 0.08}
                    prefersReduced={prefersReduced}
                    className="rounded-xl"
                  >
                    <MatchItem item={item} prefersReduced={prefersReduced} />
                  </InkDropReveal>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: A Day in the Stables (dark)
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-day" className="bg-[#0C0922] py-24">
        <SectionGlow tone="dark">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row">
            <Stagger gap={0.12} amount={0.15} className="w-full lg:w-1/2">
              <StaggerItem>
                <h4 className="type-eyebrow mb-4">
                  <ShinyText
                    text="A Day in the Stables"
                    color="#C9A227"
                    shineColor="#F5F1E8"
                    speed={2.5}
                    spread={120}
                  />
                </h4>
              </StaggerItem>

              <StaggerItem>
                <SplitText
                  as="h2"
                  className="type-section-title mb-8 text-white"
                  wordDelay={0.04}
                  startDelay={0}
                  amount={0.4}
                >
                  Handled every day, by the same hands.
                </SplitText>
              </StaggerItem>

              {[
                'Every horse is groomed, checked and exercised as part of a fixed daily routine, not only on the days it is ridden.',
                'Calm handling on the ground is what produces calm horses under saddle. Horses that are used to being groomed, leading and picked up are the ones that are not surprised under a rider.',
                'Feed, exercise and rest are managed by staff who work with the same horses every day, and who know the signs that a horse is not quite right.',
              ].map((text, i) => (
                <StaggerItem key={i}>
                  <p className="group relative mb-6 pl-0 font-normal leading-relaxed text-white/70 transition-all duration-500 hover:pl-4 hover:text-white">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-full"
                    />
                    {text}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="w-full lg:w-1/2">
              <motion.div
                className="w-full"
                initial={
                  prefersReduced
                    ? false
                    : {
                        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
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
                <DriftImage
                  src="/day in stable.webp"
                  alt="Handler with horse"
                  drift="subtle"
                  duration={40}
                  targetOpacity={1}
                  className="w-full overflow-hidden rounded-3xl shadow-2xl"
                  imgClassName="w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Meet the Horses (white) — LETTERBOX + CARD REVEAL
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-meet" className="bg-white py-24">
        <SectionGlow tone="light">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp size="text" className="mb-4">
              <h4 className="type-eyebrow text-[#C9A227]">The Horses</h4>
            </FadeUp>

            <div className="mb-16 [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
              <SplitText
                as="h2"
                className="type-page-title text-[#1A1A1A]"
                wordDelay={0.04}
                startDelay={0.1}
                amount={0.3}
              >
                Meet the horses.
              </SplitText>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
              {horses.map((horse, idx) => (
                <HorseCard
                  key={idx}
                  horse={horse}
                  index={idx}
                  prefersReduced={prefersReduced}
                />
              ))}
            </div>
          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Care and Welfare (white)
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-care" className="bg-white py-24">
        <SectionGlow tone="light">
          <div className="flex w-full flex-col items-stretch gap-0 lg:flex-row">
            <div className="relative w-full bg-white lg:w-[45%]">
              <div className="h-full py-12 pr-4">
                <motion.div
                  className="h-full w-full"
                  initial={
                    prefersReduced
                      ? false
                      : {
                          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
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
                  <DriftImage
                    src="/care and welfare.webp"
                    alt="Stables interior"
                    drift="subtle"
                    duration={40}
                    targetOpacity={1}
                    className="h-full w-full overflow-hidden rounded-r-[3rem] shadow-2xl"
                    imgClassName="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            <Stagger
              gap={0.08}
              amount={0.1}
              className="flex w-full flex-col justify-center py-12 pl-6 pr-6 lg:w-[55%] lg:pl-16 lg:pr-24"
            >
              <StaggerItem>
                <h4 className="type-eyebrow mb-4">
                  <ShinyText
                    text="Care and Welfare"
                    color="#C9A227"
                    shineColor="#F5F1E8"
                    speed={2.5}
                    spread={120}
                  />
                </h4>
              </StaggerItem>

              <StaggerItem>
                <h2 className="type-section-title mb-10 text-[#1A1A1A]">
                  Looked after<br />before they are ridden.
                </h2>
              </StaggerItem>

              {careItems.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="group relative border-b border-[#5A5A66]/20 py-3 pl-0 transition-all duration-500 hover:border-[#C9A227]/40 hover:pl-4">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-3 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-[calc(100%-1.5rem)]"
                    />
                    <h5 className="mb-1 text-sm font-bold text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#876B18]">
                      {item.title}
                    </h5>
                    <p className="text-sm font-normal leading-relaxed text-[#5A5A66] transition-colors duration-500 group-hover:text-[#1A1A1A]">
                      {item.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Safety (dark) — BOTTOM-UP RISE
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-safety" className="border-t border-white/10 bg-[#0C0922] py-24">
        <SectionGlow tone="dark">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp size="text" className="mb-4">
              <h4 className="type-eyebrow mb-4">
                <ShinyText
                  text="Safety"
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </h4>
            </FadeUp>

            <div className="mb-16 [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
              <SplitText
                as="h2"
                className="type-page-title text-white"
                wordDelay={0.04}
                startDelay={0.1}
                amount={0.3}
              >
                The rules we don't move on.
              </SplitText>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Rider weight limit', desc: 'Under 75 kg, for the wellbeing of both horse and rider.' },
                { title: 'Helmets, always', desc: 'No rider goes into an arena without one.' },
                { title: 'Supervised handling', desc: 'Riders are never alone with a horse until they are ready to be.' },
                { title: 'Schooled horses only', desc: 'Beginners ride horses proven calm and consistent. No exceptions.' },
              ].map((item, idx) => (
                <RiseReveal key={idx} delay={idx * 0.1} prefersReduced={prefersReduced}>
                  <div className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:border-[#C9A227]/40 hover:bg-white/[0.05]">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-[#C9A227]/0 transition-all duration-500 group-hover:ring-1 group-hover:ring-[#C9A227]/40"
                    />

                    <h4 className="mb-3 text-xl font-bold text-white transition-colors duration-500 group-hover:text-[#C9A227]">
                      {item.title}
                    </h4>
                    <p className="text-base font-normal leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-white/85">
                      {item.desc}
                    </p>
                  </div>
                </RiseReveal>
              ))}
            </div>
          </div>
        </SectionGlow>
      </div>

    </div>
  );
};

export default Horses;