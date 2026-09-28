import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ============================================================
// PROGRAMS DATA — Minimal
// ============================================================
const programs = [
  {
    num: '01',
    title: 'Kids Special',
    image: '/page 4 3 gpt.png',
  },
  {
    num: '02',
    title: 'Beginner',
    image: '/page 4 gpt.png',
  },
  {
    num: '03',
    title: 'Intermediate',
    image: '/page 4 2 gpt.png',
  },
  {
    num: '04',
    title: 'Professional Competition',
    image: '/page 4 4 gpt.png',
  },
];

// ============================================================
// PROGRAM CARD — Minimal Gallery
// ============================================================
const ProgramCard = ({ program, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-[#C9A227]/20 bg-[#0C0922]"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          borderColor: isHovered
            ? 'rgba(201,162,39,0.7)'
            : 'rgba(201,162,39,0.2)',
        }}
        transition={{ duration: 0.4 }}
      >
        {/* ============================================================ */}
        {/* IMAGE — Full card, 3:4 aspect ratio */}
        {/* ============================================================ */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <motion.img
            src={program.image}
            alt={program.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Grain texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Bottom gradient — only 40% for text readability */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0C0922] via-[#0C0922]/70 to-transparent" />

          {/* Radial golden glow on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              background: isHovered
                ? 'radial-gradient(circle at 50% 40%, rgba(201,162,39,0.2) 0%, transparent 65%)'
                : 'none',
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Number badge — top-left, transparent */}
          <motion.div
            className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#0C0922]/40 backdrop-blur-md"
            animate={{
              scale: isHovered ? 1.1 : 1,
              borderColor: isHovered ? '#C9A227' : 'rgba(201,162,39,0.6)',
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-[#C9A227]/40"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: index * 0.3,
              }}
            />
            <span className="relative z-10 font-serif text-xs font-bold text-[#C9A227] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {program.num}
            </span>
          </motion.div>

          {/* ============================================================ */}
          {/* TITLE — Bottom of image, minimal */}
          {/* ============================================================ */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
            <motion.p
              className="mb-1.5 font-mono text-[0.5rem] uppercase tracking-[0.3em] text-[#C9A227]/80"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Program
            </motion.p>

            <motion.h3
              className="font-serif text-xl font-semibold leading-tight text-white md:text-[1.4rem]"
              animate={{ color: isHovered ? '#C9A227' : '#FFFFFF' }}
              transition={{ duration: 0.3 }}
            >
              {program.title}
            </motion.h3>

            {/* Hover pe chhoti golden line */}
            <motion.div
              className="mt-3 h-[2px] origin-left bg-[#C9A227]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0.15 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '3rem' }}
            />
          </div>

          {/* Bottom scan line */}
          <motion.div
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
            animate={{ width: isHovered ? '100%' : '0%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Corner accent dots */}
          <motion.span
            className="pointer-events-none absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-[#C9A227]"
            animate={{
              opacity: isHovered ? 1 : 0.4,
              scale: isHovered ? 1.6 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="pointer-events-none absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full bg-[#C9A227]"
            animate={{
              opacity: isHovered ? 1 : 0.4,
              scale: isHovered ? 1.6 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const Programs = () => {
  return (
    <section className="relative overflow-hidden border-t-[0.45rem] border-[#0C0922] bg-[#FDFCFA] py-16 md:py-24">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#0C0922 1px, transparent 1px), linear-gradient(90deg, #0C0922 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-[6vw]">
        {/* HEADER */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mb-5 flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="type-eyebrow text-[#876B18]">Programs</span>
            <motion.div
              className="h-px max-w-[180px] flex-1 origin-left bg-gradient-to-r from-[#876B18]/60 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <motion.h2
            className="type-page-title text-[#1A1A1A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Four ways in,
            <br />
            <span className="text-[#876B18]">one path forward.</span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-[#5A5A66]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Whether you're starting your first lesson or preparing for
            competition, every rider has a clear route through.
          </motion.p>
        </motion.div>

        {/* PROGRAMS GRID — 4 columns */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-4">
          {programs.map((program, index) => (
            <ProgramCard key={program.num} program={program} index={index} />
          ))}
        </div>

        {/* FOOTER — See all link */}
        <motion.div
          className="mt-12 flex justify-center md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <Link
            to="/courses"
            className="group inline-flex items-center gap-3 border-b border-[#876B18] pb-1 text-sm font-semibold text-[#1A1A1A] transition-colors hover:text-[#876B18]"
          >
            See all programs
            <motion.svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M0 5H16M16 5L12 1M16 5L12 9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;