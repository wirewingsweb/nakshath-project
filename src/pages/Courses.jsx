import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useEnquiry } from '../context/EnquiryContext';

/* ============================================================
   REUSABLE ANIMATION PRIMITIVES
   ============================================================ */
const RevealLine = ({ children, delay = 0, className = '' }) => (
  <span className="block overflow-hidden">
    <motion.span
      initial={{ y: '110%', opacity: 0 }}
      whileInView={{ y: '0%', opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`block ${className}`}
    >
      {children}
    </motion.span>
  </span>
);

const Eyebrow = ({ children, delay = 0, className = '' }) => (
  <motion.h4
    initial={{ opacity: 0, letterSpacing: '0.05em' }}
    whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
    viewport={{ once: true, amount: 0 }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.h4>
);

const LetterReveal = ({ text, delay = 0, className = '' }) => {
  const letters = text.split('');
  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          initial={{ opacity: 0, y: '0.4em', filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

/* ============================================================
   PROGRAM BLOCK — Editorial split with focus-pull image
   ============================================================ */
const ProgramBlock = ({ image, imageAlt, eyebrow, title, paragraphs, reverse = false, index = 0 }) => {
  const baseDelay = 0.2;

  return (
    <div
      className={`flex flex-col gap-10 items-center lg:gap-16 ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.1, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
        className="group relative w-full lg:w-1/2"
      >
        <div className="relative overflow-hidden rounded-3xl bg-[#0C0922] shadow-[0_20px_50px_-20px_rgba(12,9,34,0.35)] transition-shadow duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_40px_80px_-30px_rgba(12,9,34,0.5)]">
          <motion.div
            initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.4, delay: baseDelay + 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              initial={{ scale: 1.15, filter: 'blur(20px) brightness(0.6)' }}
              whileInView={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 2, delay: baseDelay + 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <img src={image} alt="" aria-hidden="true" className="invisible block w-full object-cover aspect-[4/3]" />

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(201,162,39,0.18),_transparent_60%)]"
          />

          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/40" />

          <motion.span
            initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{
              duration: 0.9,
              delay: baseDelay + 0.7,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="pointer-events-none absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A227]/50 bg-[#0C0922]/75 font-serif text-[0.75rem] font-semibold text-[#C9A227] backdrop-blur-md transition-all duration-500 group-hover:rotate-[-10deg] group-hover:scale-110 group-hover:bg-[#C9A227] group-hover:text-[#0C0922]"
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
        </div>
      </motion.div>

      <div className="w-full lg:w-1/2">
        <Eyebrow delay={baseDelay + 0.3} className="text-[#C9A227] type-eyebrow mb-3">
          {eyebrow}
        </Eyebrow>

        <h3 className="type-card-title text-[#1A1A1A] mb-6">
          <RevealLine delay={baseDelay + 0.4}>{title}</RevealLine>
        </h3>

        {paragraphs.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{
              duration: 0.8,
              delay: baseDelay + 0.7 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[#5A5A66] font-normal mb-4 leading-relaxed"
          >
            {para}
          </motion.p>
        ))}

        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 1.1,
            delay: baseDelay + 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-4 block h-px w-16 origin-left bg-[#C9A227]/60"
        />
      </div>
    </div>
  );
};

/* ============================================================
   PRO COMPETITION CARD — Cinematic dark feature block
   (No numbers, no bars, no corner brackets)
   ============================================================ */
const ProCompetitionCard = ({ onEnquire }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -3, y: px * 4 });
  };
  const handleLeave = () => setTilt({ x: 0, y: 0 });

  const capabilities = [
    'Show jumping preparation',
    'Course technique & riding style',
    'Round planning',
    'Performance assessment',
    'Advanced training sessions',
  ];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl bg-[#0C0922]"
    >
      {/* Ambient pulsing glow — top right */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#C9A227]/12 blur-[140px]"
      />
      {/* Ambient pulsing glow — bottom left */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#C9A227]/8 blur-[140px]"
      />

      {/* Parallax dot grid */}
      <motion.div
        animate={{ x: tilt.y * 20, y: tilt.x * 20 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        className="pointer-events-none absolute inset-[-5%] opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,162,39,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ghost PRO watermark */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 select-none lg:block">
        <motion.span
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="block font-serif text-[12rem] leading-none text-white/[0.025]"
          style={{ letterSpacing: '-0.04em' }}
        >
          PRO
        </motion.span>
      </div>

      {/* ===== SEQUENTIAL GOLD BORDER TRACE ===== */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-0 top-0 z-20 h-px w-full origin-left bg-gradient-to-r from-[#C9A227]/70 via-[#C9A227]/30 to-[#C9A227]/70"
      />
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-0 top-0 z-20 h-full w-px origin-top bg-gradient-to-b from-[#C9A227]/70 via-[#C9A227]/30 to-[#C9A227]/70"
      />
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.4, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-0 right-0 z-20 h-px w-full origin-right bg-gradient-to-l from-[#C9A227]/70 via-[#C9A227]/30 to-[#C9A227]/70"
      />
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.4, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-0 left-0 z-20 h-full w-px origin-bottom bg-gradient-to-t from-[#C9A227]/70 via-[#C9A227]/30 to-[#C9A227]/70"
      />

      {/* Periodic shine sweep across whole card */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden rounded-3xl">
        <motion.div
          animate={{ x: ['-150%', '250%'] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 6,
            delay: 3,
          }}
          className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#C9A227]/[0.07] to-transparent"
        />
      </div>

      {/* Vertical "PRO · 2024" label on right edge */}
      <div className="pointer-events-none absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="h-10 w-px bg-[#C9A227]/40" />
        <span
          className="text-[0.5rem] font-semibold uppercase tracking-[0.3em] text-[#C9A227]/70"
          style={{ writingMode: 'vertical-rl' }}
        >
          PRO · 2024
        </span>
        <span className="h-10 w-px bg-[#C9A227]/40" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative flex flex-col items-center gap-10 p-8 md:p-12 lg:flex-row lg:gap-16 lg:p-16">

        {/* LEFT: TEXT */}
        <div className="relative z-10 w-full lg:w-[55%]">
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-[#C9A227]/70 via-[#C9A227]/30 to-transparent md:block"
          />

          {/* Eyebrow with pulsing live dot */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <motion.span
                animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-[#C9A227]"
              />
              <span className="relative h-2 w-2 rounded-full bg-[#C9A227]" />
            </span>
            <span className="text-[#C9A227] type-eyebrow">
              For Competing Riders
            </span>
          </motion.div>

          {/* Title */}
          <h3 className="type-section-title text-white mb-6 leading-tight">
            <RevealLine delay={0.35}>Professional</RevealLine>
            <RevealLine delay={0.5}>Competition Training</RevealLine>
          </h3>

          {/* Lead paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/75 font-normal leading-relaxed mb-10 max-w-lg"
          >
            Show jumping and dressage preparation for riders entering competition, coached by a rider currently long-listed for Team India. Course technique, round planning, and performance assessed against the standards you will be judged on.
          </motion.p>

          {/* Capability list — elegant, no numbers */}
          <div className="mb-10 space-y-0 max-w-lg">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.1 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group/cap relative flex items-center gap-4 py-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1"
              >
                {/* Gold diamond marker */}
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 45 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.15 + i * 0.12,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="inline-block h-1.5 w-1.5 shrink-0 bg-[#C9A227] transition-all duration-500 group-hover/cap:scale-125 group-hover/cap:bg-[#E0BF4C]"
                />

                {/* Label */}
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors duration-500 group-hover/cap:text-white">
                  {cap}
                </span>

                {/* Hairline that draws in on hover */}
                <span className="pointer-events-none absolute bottom-0 left-5 right-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#C9A227]/60 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cap:scale-x-100" />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6"
          >
            <motion.button
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={onEnquire}
              className="group/btn inline-flex items-center gap-2 border-b-2 border-[#C9A227] pb-1 text-sm font-bold text-[#C9A227] transition-colors hover:border-white hover:text-white"
            >
              Enquire about competition training
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.button>

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              className="hidden items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-white/40 md:inline-flex"
            >
              <span className="h-px w-6 bg-[#C9A227]/60" />
              Long-listed · Team India
            </motion.span>
          </motion.div>
        </div>

        {/* RIGHT: IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group/img relative w-full lg:w-[45%]"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            animate={{ rotateX: tilt.x * 1.5, rotateY: tilt.y * 1.5 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.7 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative mx-auto w-full max-w-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -inset-3 rounded-[1.75rem] border border-[#C9A227]/20"
            />

            <div className="relative overflow-hidden rounded-3xl bg-[#0C0922] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)]">
              <motion.div
                initial={{ clipPath: 'inset(0 0 0 100%)' }}
                whileInView={{ clipPath: 'inset(0 0 0 0%)' }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <motion.img
                  src="/pro training.png"
                  alt="Professional Competition Training"
                  loading="lazy"
                  decoding="async"
                  initial={{ scale: 1.2, filter: 'blur(15px) brightness(0.6)' }}
                  whileInView={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 2.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-auto w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/img:scale-[1.06]"
                />
              </motion.div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0C0922]/85 via-[#0C0922]/20 to-transparent" />

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(201,162,39,0.25),_transparent_60%)] opacity-0 transition-opacity duration-700 group-hover/img:opacity-100" />

              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-700 group-hover/img:border-[#C9A227]/60" />

              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute inset-x-0 top-0 h-[2px] -translate-y-full bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent transition-transform duration-[2200ms] ease-linear group-hover/img:translate-y-[600px]" />
              </div>

              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-[#C9A227]/50 bg-[#0C0922]/80 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-[#C9A227] backdrop-blur-md"
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block h-1 w-1 rounded-full bg-[#C9A227]"
                />
                Live Coaching
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-4 right-4 z-10 flex items-baseline gap-2"
              >
                <span className="font-serif text-2xl leading-none text-[#C9A227]">
                  01
                </span>
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-white/60">
                  Competing
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   STACK CARD — 3D tilt + layered ghost stack + shine sweep
   ============================================================ */
const StackCard = ({ item, idx, onClick }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.8, delay: 0.3 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col text-left md:basis-[46%] md:shrink-0 md:snap-start lg:basis-auto"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 18, mass: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative mb-6">
          <div className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl border border-[#C9A227]/25 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-hover:translate-y-3" />
          <div className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-[#C9A227]/10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-6 group-hover:translate-y-6" />

          <div className="relative overflow-hidden rounded-xl bg-[#0C0922] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] transition-shadow duration-700 group-hover:shadow-[0_30px_70px_-25px_rgba(201,162,39,0.35)]">
            <motion.img
              src={item.img}
              alt={item.title}
              loading="lazy"
              decoding="async"
              initial={{ scale: 1.15, filter: 'blur(15px) brightness(0.6)' }}
              whileInView={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1.8, delay: 0.4 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block w-full aspect-[2/3] object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />

            <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/50" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(201,162,39,0.22),_transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
              <div className="absolute inset-y-0 left-0 w-full -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[150%]" />
            </div>

            <span className="pointer-events-none absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#C9A227]/50 bg-[#0C0922]/75 font-serif text-[0.6rem] font-semibold text-[#C9A227] backdrop-blur-md transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-[#C9A227] group-hover:text-[#0C0922]">
              {String(idx + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div style={{ transform: 'translateZ(24px)' }}>
          <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-white transition-colors group-hover:text-[#C9A227]">
            {item.title}
          </h4>
          <p className="text-sm font-normal leading-relaxed text-white/60">
            {item.desc}
          </p>
          <span className="mt-3 block h-px w-8 origin-left scale-x-0 bg-[#C9A227] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
        </div>
      </motion.div>
    </motion.button>
  );
};

/* ============================================================
   STRUCTURE TABLE — Cursor spotlight + animated progress + ghost numbers
   ============================================================ */
const StructureTable = ({ levels }) => {
  const wrapRef = useRef(null);
  const [spot, setSpot] = useState({ x: -400, y: -400, visible: false });

  const onMove = (e) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true });
  };
  const onLeave = () => setSpot((s) => ({ ...s, visible: false }));

  const maxSessions = Math.max(...levels.map((l) => parseInt(l.sessions)));

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave} className="relative">
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(420px circle at ${spot.x}px ${spot.y}px, rgba(201,162,39,0.09), transparent 65%)`,
        }}
      />

      <div className="relative z-10 space-y-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-2 md:grid-cols-4 gap-4 py-4 text-xs font-medium uppercase tracking-widest font-bold text-[#C9A227]"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-[#C9A227]/40"
          />
          <div>Level</div>
          <div>Sessions</div>
          <div>Price</div>
          <div>What It Covers</div>
        </motion.div>

        {levels.map((level, idx) => {
          const sessionsNum = parseInt(level.sessions);
          const progressPct = (sessionsNum / maxSessions) * 100;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.9, delay: 0.5 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative grid grid-cols-2 md:grid-cols-4 gap-4 py-6 pl-4 pr-4 transition-colors duration-500 hover:bg-[#C9A227]/[0.04]"
            >
              <span className="pointer-events-none absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-[#C9A227] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-3/4" />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[6rem] leading-none text-[#C9A227]/0 transition-colors duration-700 md:block md:group-hover:text-[#C9A227]/[0.08]"
                style={{ letterSpacing: '-0.05em' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-[#5A5A66]/20" />
              <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

              <div className="relative z-10 font-serif text-lg text-[#C9A227] transition-transform duration-500 group-hover:translate-x-1">
                {level.level}
              </div>

              <div className="relative z-10">
                <div className="text-[#5A5A66] font-normal">{level.sessions}</div>
                <div className="mt-2 h-[2px] w-full max-w-[90px] overflow-hidden bg-[#5A5A66]/15">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: progressPct / 100 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 1.3, delay: 0.9 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="block h-full origin-left bg-[#C9A227]"
                  />
                </div>
              </div>

              <div className="relative z-10 font-serif text-xl text-[#1A1A1A]">
                {level.price}
              </div>

              <div className="relative z-10 text-[#5A5A66] font-normal">
                {level.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================
   MAIN PAGE
   ============================================================ */
const Courses = () => {
  const { openEnquiry } = useEnquiry();

  const levels = [
    { level: 'Level 1', sessions: '10 lessons', price: '₹11,999', label: 'Getting started' },
    { level: 'Level 2', sessions: '20 lessons', price: '₹29,999', label: 'Building the seat' },
    { level: 'Level 3', sessions: '20 lessons', price: '₹32,999', label: 'Trot to canter' },
  ];

  const disciplines = [
    { title: 'Show Jumping', status: 'Taught Here', desc: 'Riders guide horses over obstacle courses with speed and accuracy.', img: '/show jumping.png' },
    { title: 'Dressage', status: 'Taught Here', desc: 'Harmony, control, and precise movements ridden to a set pattern.', img: '/dressage.png' },
    { title: 'Eventing', status: 'Coming Soon', desc: 'Combines dressage, cross-country and show jumping.', img: '/eventing.png' },
  ];

  const groupServices = [
    { title: 'Guest Rides', desc: 'A one-off horse experience, no enrolment.', img: '/beyond ride 1.png' },
    { title: 'Summer Camps', desc: 'Holiday programmes for children.', img: '/beyond ride 2.png' },
    { title: 'School Visits', desc: 'Group sessions for schools.', img: '/beyond ride 3.png' },
    { title: 'Corporate Days', desc: 'Team days on the property.', img: '/beyond ride 4.png' },
    { title: 'Photoshoots', desc: 'The arenas and grounds, by arrangement.', img: '/beyond ride 5.png' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">

      {/* ============================================================
         DARK HEADER
         ============================================================ */}
      <div className="nav-dark-hero relative overflow-hidden bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#C9A227]/10 blur-[140px]"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <Eyebrow delay={0.1} className="text-[#C9A227] type-eyebrow mb-4">
            Programs
          </Eyebrow>
          <h1 className="type-page-title text-white leading-tight mb-4">
            <RevealLine delay={0.25}>Four ways in,</RevealLine>
            <RevealLine delay={0.4}>one path forward.</RevealLine>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="type-lead text-white/70"
          >
            Whether you have never sat on a horse, or are preparing for a competition, the route through is the same one.
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 block h-px w-32 origin-left bg-[#C9A227]/70"
          />
        </div>
      </div>

      {/* ============================================================
         PROGRAM BLOCKS
         ============================================================ */}
      <div className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-24">
            <ProgramBlock
              index={0}
              image="/kids special.png"
              imageAlt="Kids Program"
              eyebrow="From Five Years Old"
              title="Kids Special Riding Program"
              paragraphs={[
                'Children start on ponies, on the ground, learning to approach, handle, and tack up before they learn to sit on one.',
                'Pony riding, confidence building, physical coordination, and horsemanship.',
              ]}
            />

            <ProgramBlock
              index={1}
              reverse
              image="/beginner program.png"
              imageAlt="Beginner Program"
              eyebrow="No Experience Needed"
              title="Beginner Program"
              paragraphs={[
                'For first-time riders of any age. You will learn how a horse thinks and moves before you learn to sit on one. The skills you build here apply at every level.',
              ]}
            />

            <ProgramBlock
              index={2}
              image="/intermediate program.png"
              imageAlt="Intermediate Training"
              eyebrow="For Riders Building Independence"
              title="Intermediate Training"
              paragraphs={[
                'Once you are steady on a flat, the work becomes about communication — asking nicely and getting a considered answer. The pace slows, the detail gets finer, and the riding changes.',
              ]}
            />

            <ProCompetitionCard onEnquire={() => openEnquiry('Competition Training')} />
          </div>
        </div>
      </div>

      {/* ============================================================
         STRUCTURE
         ============================================================ */}
      <div className="bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div>
            <Eyebrow delay={0.15} className="text-[#C9A227] type-eyebrow mb-4">
              Structure
            </Eyebrow>
            <h2 className="type-section-title text-[#1A1A1A] mb-6">
              <RevealLine delay={0.3}>Fifty lessons to a canter.</RevealLine>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="type-lead mb-16 text-[#5A5A66] max-w-3xl"
            >
              Riders progress in blocks. Level 1 is ten lessons — enough to know whether riding is for you. Levels 2 and 3 are twenty each. Most riders reach a confident, independent canter by the end of the third.
            </motion.p>
          </div>

          <StructureTable levels={levels} />
        </div>
      </div>

      {/* ============================================================
         START WITH TEN MINUTES
         ============================================================ */}
      <div className="relative w-full overflow-hidden bg-[#0C0922] py-32">
        <motion.img
          initial={{ scale: 1.15, opacity: 0, filter: 'blur(20px)' }}
          whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src="/start 10 min.png"
          alt="Horse Face"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 z-0 h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0C0922] via-[#0C0922]/85 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-12 md:flex-row md:gap-24">
            <div className="w-full md:w-[55%]">
              <h2 className="type-page-title text-white mb-12">
                <RevealLine delay={0.3}>Start with ten minutes.</RevealLine>
              </h2>

              <div className="flex flex-col gap-12 md:flex-row md:gap-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1"
                >
                  <motion.h4
                    initial={{ opacity: 0, letterSpacing: '0.05em' }}
                    whileInView={{ opacity: 1, letterSpacing: '0.12em' }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mb-3 text-sm font-bold uppercase text-[#C9A227]"
                  >
                    Free
                  </motion.h4>
                  <p className="mb-3 text-xl font-bold text-white">
                    <LetterReveal text="10 minutes · No charge" delay={0.7} />
                  </p>
                  <p className="type-body text-white/70">
                    Meet the horses, sit on one, see the arena.
                  </p>
                  <div className="mt-8">
                    <motion.button
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => openEnquiry('Trial Ride')}
                      className="group/btn inline-flex items-center gap-2 border-b-2 border-[#C9A227] pb-1 text-sm font-bold text-[#C9A227] transition-colors hover:border-white hover:text-white"
                    >
                      Book a trial ride
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="hidden h-auto w-px origin-top bg-[#C9A227]/30 md:block"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1"
                >
                  <motion.h4
                    initial={{ opacity: 0, letterSpacing: '0.05em' }}
                    whileInView={{ opacity: 1, letterSpacing: '0.12em' }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 1, delay: 0.65 }}
                    className="mb-3 text-sm font-bold uppercase text-[#C9A227]"
                  >
                    Paid
                  </motion.h4>
                  <p className="mb-3 text-xl font-bold text-white">
                    <LetterReveal text="45 minutes · ₹1,999" delay={0.85} />
                  </p>
                  <p className="type-body text-white/70">
                    A full first lesson, with groundwork and time in the saddle.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
         DISCIPLINES
         ============================================================ */}
      <div className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div>
            <Eyebrow delay={0.15} className="text-[#876B18] type-eyebrow mb-4">
              Disciplines
            </Eyebrow>
            <h2 className="type-section-title text-[#1A1A1A] mb-16">
              <RevealLine delay={0.3}>What the sport is made of.</RevealLine>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3">
            {disciplines.map((disc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1, delay: 0.3 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col pt-24"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1, delay: 0.4 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute left-0 top-0 z-20 select-none"
                >
                  <span
                    className="block font-serif text-[5.5rem] leading-none text-[#0C0922]/15 transition-colors duration-700 group-hover:text-[#C9A227]"
                    style={{ letterSpacing: '-0.04em' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, letterSpacing: '0.05em' }}
                  whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1, delay: 0.5 + idx * 0.15 }}
                  className="relative z-10 mb-3 flex items-center gap-3 text-[#876B18] type-eyebrow"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
                  {disc.status}
                </motion.p>

                <h3 className="relative z-10 mb-6 font-serif text-2xl leading-tight text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#876B18]">
                  <RevealLine delay={0.6 + idx * 0.15}>{disc.title}</RevealLine>
                </h3>

                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1.1, delay: 0.5 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mb-6 w-full"
                >
                  <div className="relative w-full overflow-hidden rounded-2xl bg-[#0C0922] shadow-[0_20px_50px_-20px_rgba(12,9,34,0.3)] transition-shadow duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_40px_80px_-30px_rgba(12,9,34,0.5)]">
                    <motion.img
                      src={disc.img}
                      alt={disc.title}
                      loading="lazy"
                      decoding="async"
                      initial={{ scale: 1.15, filter: 'blur(15px) brightness(0.7)' }}
                      whileInView={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{ duration: 2, delay: 0.5 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="block aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0C0922]/70 via-transparent to-transparent" />

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,_rgba(201,162,39,0.22),_transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/50" />

                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{ duration: 0.7, delay: 0.9 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#0C0922]/75 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-[#C9A227] backdrop-blur-md"
                    >
                      <span className="inline-block h-1 w-1 rounded-full bg-[#C9A227]" />
                      {disc.status}
                    </motion.span>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 font-normal leading-relaxed text-[#5A5A66]"
                >
                  {disc.desc}
                </motion.p>

                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1, delay: 1.1 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 block h-px w-full max-w-[3rem] origin-left bg-[#C9A227]/60 transition-[max-width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
         BEYOND RIDING
         ============================================================ */}
      <div className="relative overflow-hidden bg-[#0C0922] py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-[#C9A227]/8 blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div>
            <Eyebrow delay={0.15} className="text-[#C9A227] type-eyebrow mb-4">
              Beyond Riding
            </Eyebrow>
            <h2 className="type-section-title text-white mb-12">
              <RevealLine delay={0.3}>Not everyone comes to learn.</RevealLine>
            </h2>
          </div>

          <div
            className="tablet-carousel grid grid-cols-1 gap-6 md:flex md:snap-x md:snap-mandatory md:overflow-x-auto md:overscroll-x-contain md:pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
            role="region"
            aria-label="Beyond riding services"
            tabIndex={0}
          >
            {groupServices.map((item, idx) => (
              <StackCard
                key={idx}
                item={item}
                idx={idx}
                onClick={() => openEnquiry('Group Booking')}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14"
          >
            <motion.button
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openEnquiry('Group Booking')}
              className="group/btn inline-flex items-center gap-3 text-lg font-medium text-white transition-colors hover:text-[#C9A227]"
            >
              <span className="border-b border-[#C9A227] pb-1 transition-colors duration-300 group-hover/btn:border-[#C9A227]">
                Enquire about group bookings
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Courses;