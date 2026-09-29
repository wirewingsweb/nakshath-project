import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { viewportOnce } from '../utils/animations';

// ============================================================
// FLOATING PARTICLES
// ============================================================
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 6,
  size: 1 + Math.random() * 2,
}));

// ============================================================
// TEXT REVEAL
// ============================================================
const TextReveal = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.5,
                delay: delay + (wordIndex * word.length + letterIndex) * 0.02,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

// ============================================================
// TRAINER CARD — 3D tilt + spotlight
// ============================================================
const TrainerCard = ({ trainer, index }) => {
  const cardRef = useRef(null);
  const isReversed = trainer.reversed;

  const [mouseX, mouseY] = [useMotionValue(0), useMotionValue(0)];
  const [spotX, spotY] = [useMotionValue(50), useMotionValue(50)];

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
    spotX.set(x * 100);
    spotY.set(y * 100);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    spotX.set(50);
    spotY.set(50);
  };

  return (
    <div className={`flex flex-col items-center gap-10 lg:gap-16 ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
      {/* ============================================================ */}
      {/* IMAGE with 3D tilt + spotlight */}
      {/* ============================================================ */}
      <motion.div
        ref={cardRef}
        className="w-full lg:w-1/2"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1200 }}
        initial={{ opacity: 0, x: isReversed ? 80 : -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="group relative overflow-hidden rounded-3xl"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          {/* Cursor spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: useTransform(
                [spotX, spotY],
                ([x, y]) =>
                  `radial-gradient(circle 300px at ${x}% ${y}%, rgba(201,162,39,0.2) 0%, transparent 70%)`
              ),
            }}
          />

          <motion.img
            src={trainer.img}
            alt={trainer.name}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover md:aspect-auto md:h-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Dark gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0922]/40 via-transparent to-transparent" />

          {/* Number badge */}
          <motion.div
            className="absolute left-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#C9A227]/80 bg-[#0C0922]/70 backdrop-blur-md"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-[#C9A227]"
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="relative z-10 font-serif text-sm font-bold text-[#C9A227]">
              {String(index + 1).padStart(2, '0')}
            </span>
          </motion.div>

          {/* Hover golden border */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-500 group-hover:border-[#C9A227]/70" />
        </motion.div>
      </motion.div>

      {/* ============================================================ */}
      {/* CONTENT */}
      {/* ============================================================ */}
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mb-4 flex items-center gap-3"
          initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
        >
          <span className="h-px w-8 bg-[#C9A227]" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
            {trainer.eyebrow}
          </span>
        </motion.div>

        <h3 className="type-section-title mb-6 text-[#1A1A1A]">
          <TextReveal text={trainer.name} delay={0.3} />
        </h3>

        <motion.p
          className="mb-8 text-sm font-bold uppercase tracking-widest text-[#876B18]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          {trainer.role}
        </motion.p>

        <motion.div
          className="mb-6 h-[2px] bg-gradient-to-r from-[#876B18] to-[#C9A227]"
          initial={{ width: 0 }}
          whileInView={{ width: '80px' }}
          viewport={viewportOnce}
          transition={{ delay: 1.1, duration: 1 }}
        />

        <div className="space-y-5">
          {trainer.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="type-body text-[#5A5A66]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 1.3 + i * 0.15, duration: 0.8 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Founder CTA only */}
        {trainer.cta && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <Link
              to={trainer.cta.link}
              className="group inline-flex items-center gap-2 border-b-2 border-[#C9A227] pb-1 text-sm font-medium text-[#C9A227] transition-colors hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
            >
              {trainer.cta.text}
              <motion.svg
                width="14"
                height="9"
                viewBox="0 0 18 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M0 5H16M16 5L12 1M16 5L12 9" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const Trainers = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const trainers = [
    {
      name: 'Nakshath Venkatesh',
      eyebrow: 'Meet Our Founder',
      role: 'Founder - Competition Coaching',
      img: '/founder.webp',
      reversed: false,
      paragraphs: [
        'Nakshath competes internationally in show jumping under Federation Equestre Internationale rules, and is long-listed for Team India for the 2026 Asian Games.',
        'He coaches the competition track himself - riders working toward show jumping and dressage competition, training against the same standards he is judged on. Course technique, round planning, and the discipline of riding a plan rather than riding a feeling.',
        'He set the training structure the rest of the academy runs on, and selected the horses on the yard.',
      ],
      cta: { text: 'His full competitive record', link: '/about' },
    },
    {
      name: 'Bharath Venna',
      eyebrow: 'Meet Our Coordinator',
      role: 'Coordinator',
      img: '/coordinator.webp',
      reversed: true,
      paragraphs: [
        'Bharath runs the day to day of the academy: who rides which horse, how a rider\'s programme is paced, and when someone is ready to move up a level.',
        'He works on the principle that every rider has more in them than they think, and that consistent guidance is what gets it out. Much of his job is noticing what someone is capable of before they have noticed it themselves.',
        'He is on the yard most days, and knows where every rider is in their progression.',
      ],
    },
    {
      name: 'Vani',
      eyebrow: 'Meet Our Trainer',
      role: 'Trainer',
      img: '/trainer.webp',
      reversed: false,
      paragraphs: [
        'Vani teaches riders from their first session on a lead rein through to independent work at canter, across general riding and horsemanship.',
        'Her sessions start on the ground. Riders learn to approach, handle and tack up a horse before they learn to sit on one, because confidence in the saddle comes from confidence beside the horse first.',
        'She works often with children and with adults returning to riding after a long gap - the two groups who most need to be told they are doing better than they think.',
      ],
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

      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <div
        ref={heroRef}
        className="nav-dark-hero relative overflow-hidden bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44"
      >
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity, scale: heroScale }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,162,39,0.10),transparent_60%)]" />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-[#C9A227]"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}px`, height: `${p.size}px` }}
              animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-5 flex items-center gap-4"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="h-px w-12 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#C9A227]">
              Who Teaches
            </span>
          </motion.div>

          <h1 className="type-page-title leading-tight text-white mb-6">
            <TextReveal text="Someone is watching every rider," delay={0.3} />
            <br />
            <span className="text-[#C9A227]">
              <TextReveal text="every session." delay={1.5} />
            </span>
          </h1>

          <motion.p
            className="type-lead max-w-2xl text-white/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1 }}
          >
            Batches are kept small so corrections happen during the lesson, not after it.
          </motion.p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3 TRAINERS */}
      {/* ============================================================ */}
      <div className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="mx-auto max-w-7xl space-y-32 px-6">
          {trainers.map((trainer, index) => (
            <TrainerCard key={trainer.name} trainer={trainer} index={index} />
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* HOW WE TEACH */}
      {/* ============================================================ */}
      <div className="bg-[#0C0922] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-4 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <span className="h-px w-8 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
              How We Teach
            </span>
          </motion.div>

          <h2 className="type-section-title mb-16 text-white">
            <TextReveal text="The things that don't change." delay={0.2} />
          </h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {rules.map((rule, idx) => (
              <motion.div
                key={idx}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  delay: idx * 0.12,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.span
                  className="mb-3 block font-mono text-[0.6rem] text-[#C9A227]/60 transition-colors group-hover:text-[#C9A227]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.4 + idx * 0.12, duration: 0.5 }}
                >
                  RULE {String(idx + 1).padStart(2, '0')}
                </motion.span>

                <h4 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#C9A227]">
                  {rule.title}
                </h4>

                <p className="text-base font-normal leading-relaxed text-white/60 transition-colors group-hover:text-white/85">
                  {rule.desc}
                </p>

                <motion.div className="mt-6 h-[2px] w-0 bg-[#C9A227] transition-all duration-500 group-hover:w-12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Trainers;