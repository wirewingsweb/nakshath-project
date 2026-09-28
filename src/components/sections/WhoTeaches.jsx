import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { viewportOnce } from '../../utils/animations';

// ============================================================
// COACHES DATA
// ============================================================
const coaches = [
  {
    num: '01',
    name: 'Nakshath Venkatesh',
    role: 'Founder',
    specialization: 'Competition Coaching',
    image: '/founder.png',
    bio: 'International show jumper. Long-listed for Team India, 2026 Asian Games.',
  },
  {
    num: '02',
    name: 'Bharath Venna',
    role: 'Coordinator',
    specialization: 'Program Direction',
    image: '/page 10 2 gpt.png',
    bio: "Runs the day-to-day of the academy. Paces every rider's programme.",
  },
  {
    num: '03',
    name: 'Vani',
    role: 'Trainer',
    specialization: 'Groundwork & Basics',
    image: '/trainer.png',
    bio: 'Teaches from first session on a lead rein through to independent canter work.',
  },
];

// ============================================================
// COACH CARD — Kinetic + Spotlight
// ============================================================
const CoachCard = ({ coach, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for tilt + spotlight
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // 3D tilt
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  // Spotlight position
  const spotlightX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80, scale: 0.9, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={viewportOnce}
      transition={{
        delay: 0.3 + index * 0.2,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="relative"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* ============================================================ */}
        {/* NUMBER WATERMARK — Big, animated */}
        {/* ============================================================ */}
        <motion.div
          className="pointer-events-none absolute -left-6 -top-12 z-0 select-none font-serif text-[8rem] font-bold leading-none md:-left-8 md:-top-16 md:text-[10rem]"
          style={{
            color: 'transparent',
            WebkitTextStroke: isHovered
              ? '2px rgba(201,162,39,0.4)'
              : '1px rgba(201,162,39,0.12)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0.6,
            x: isHovered ? -8 : 0,
          }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          {coach.num}
        </motion.div>

        {/* ============================================================ */}
        {/* IMAGE WITH SPOTLIGHT */}
        {/* ============================================================ */}
        <div className="relative overflow-hidden rounded-xl">
          {/* Spotlight overlay — follows cursor */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle 300px at ${spotlightX} ${spotlightY}, rgba(201,162,39,0.25) 0%, transparent 70%)`,
              opacity: isHovered ? 1 : 0,
            }}
            aria-hidden="true"
          />

          {/* Image */}
          <motion.img
            src={coach.image}
            alt={coach.name}
            loading="lazy"
            decoding="async"
            className="relative aspect-[3/4] h-auto w-full object-cover"
            initial={{ filter: 'grayscale(100%) contrast(1.1)' }}
            animate={{
              filter: isHovered
                ? 'grayscale(0%) contrast(1)'
                : 'grayscale(100%) contrast(1.1)',
              scale: isHovered ? 1.06 : 1,
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0922] via-[#0C0922]/30 to-transparent" />

          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ============================================================ */}
          {/* VERTICAL NAME — Side of image */}
          {/* ============================================================ */}
          <motion.div
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 md:right-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{
              delay: 0.6 + index * 0.2,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#C9A227]/80 [writing-mode:vertical-rl]"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
            >
              {coach.role}
            </span>
          </motion.div>

          {/* ============================================================ */}
          {/* BOTTOM NAME */}
          {/* ============================================================ */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
            <motion.h3
              className="font-serif text-2xl font-semibold leading-tight text-white md:text-[1.75rem]"
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {coach.name}
            </motion.h3>

            {/* Golden underline — grows on hover */}
            <motion.div
              className="mt-3 h-[2px] origin-left bg-[#C9A227]"
              initial={{ scaleX: 0.2 }}
              animate={{ scaleX: isHovered ? 1 : 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', maxWidth: '4rem' }}
            />

            <motion.p
              className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              {coach.specialization}
            </motion.p>
          </div>

          {/* ============================================================ */}
          {/* CORNER BRACKETS */}
          {/* ============================================================ */}
          <motion.div
            className="pointer-events-none absolute left-4 top-4 z-10 h-6 w-6 border-l-2 border-t-2"
            animate={{
              borderColor: isHovered ? '#C9A227' : 'rgba(201,162,39,0.3)',
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="pointer-events-none absolute right-4 top-4 z-10 h-6 w-6 border-r-2 border-t-2"
            animate={{
              borderColor: isHovered ? '#C9A227' : 'rgba(201,162,39,0.3)',
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-4 left-4 z-10 h-6 w-6 border-b-2 border-l-2"
            animate={{
              borderColor: isHovered ? '#C9A227' : 'rgba(201,162,39,0.3)',
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-4 right-4 z-10 h-6 w-6 border-b-2 border-r-2"
            animate={{
              borderColor: isHovered ? '#C9A227' : 'rgba(201,162,39,0.3)',
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Hover glow border */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 rounded-xl border"
            animate={{
              borderColor: isHovered
                ? 'rgba(201,162,39,0.6)'
                : 'rgba(255,255,255,0)',
              boxShadow: isHovered
                ? '0 0 40px rgba(201,162,39,0.3), inset 0 0 30px rgba(201,162,39,0.1)'
                : 'none',
            }}
            transition={{ duration: 0.4 }}
          />

          {/* ============================================================ */}
          {/* FLOATING PARTICLES — On hover */}
          {/* ============================================================ */}
          {isHovered &&
            Array.from({ length: 6 }).map((_, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute rounded-full bg-[#C9A227]"
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-10, -60],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
        </div>

        {/* ============================================================ */}
        {/* BIO BELOW */}
        {/* ============================================================ */}
        <motion.p
          className="mt-5 max-w-md text-sm leading-relaxed"
          animate={{
            color: isHovered
              ? 'rgba(255,255,255,0.85)'
              : 'rgba(255,255,255,0.5)',
          }}
          transition={{ duration: 0.3 }}
        >
          {coach.bio}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// ============================================================
// MARQUEE — Bottom scrolling text
// ============================================================
const Marquee = () => {
  const text =
    'SMALL BATCHES · NAMED COACHES · EVERY RIDER WATCHED · NAKSHATH EQUESTRIAN CLUB · ';

  return (
    <div className="relative mt-20 w-full overflow-hidden border-y border-[#C9A227]/20 py-6 md:mt-24">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span className="font-serif text-2xl italic text-[#C9A227]/60 md:text-3xl">
          {text}
        </span>
        <span className="font-serif text-2xl italic text-[#C9A227]/60 md:text-3xl">
          {text}
        </span>
      </motion.div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const WhoTeaches = () => {
  return (
    <section className="relative overflow-hidden bg-[#0C0922] px-6 py-16 text-white md:px-[8vw] md:py-24">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#C9A227]/6 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* ============================================================ */}
        {/* HEADER */}
        {/* ============================================================ */}
        <motion.div
          className="mb-14 flex flex-col items-start gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <motion.div
              className="mb-4 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="type-eyebrow text-[#C9A227]">Who Teaches</span>
              <motion.span
                className="block h-px w-16 origin-left bg-[#C9A227]/60"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.5, duration: 0.9 }}
              />
            </motion.div>

            <motion.h2
              className="type-page-title max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Small batches,
              <br />
              <span className="text-[#C9A227]">named coaches.</span>
            </motion.h2>
          </div>

          <motion.p
            className="max-w-sm text-sm leading-relaxed text-white/55 md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Every rider is watched by a named coach, every session. No exceptions.
          </motion.p>
        </motion.div>

        {/* ============================================================ */}
        {/* COACHES GRID — 3 columns */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
          {coaches.map((coach, index) => (
            <CoachCard key={coach.num} coach={coach} index={index} />
          ))}
        </div>

        {/* ============================================================ */}
        {/* MARQUEE */}
        {/* ============================================================ */}
        <Marquee />

        {/* ============================================================ */}
        {/* FOOTER — CTA */}
        {/* ============================================================ */}
        <motion.div
          className="mt-14 flex flex-col items-start justify-between gap-8 pt-4 md:flex-row md:items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap gap-10">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/40">
                Batch Size
              </p>
              <p className="mt-2 font-serif text-3xl text-[#C9A227]">4 – 6</p>
            </div>
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/40">
                Coaches
              </p>
              <p className="mt-2 font-serif text-3xl text-[#C9A227]">3</p>
            </div>
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/40">
                Supervision
              </p>
              <p className="mt-2 font-serif text-3xl text-[#C9A227]">100%</p>
            </div>
          </div>

          <Link
            to="/trainers"
            className="group inline-flex items-center gap-3 border-b border-[#C9A227] pb-1 text-sm font-semibold text-[#C9A227] transition-colors hover:text-white"
          >
            Meet the team
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

export default WhoTeaches;