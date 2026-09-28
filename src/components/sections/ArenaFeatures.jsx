import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ============================================================
// FEATURES DATA
// ============================================================
const features = [
  {
    num: '01',
    img: '/arena-indoor.png',
    title: 'Indoor Arena',
    desc: 'Safe, controlled, covered environment.',
    stat: 'All-Season',
  },
  {
    num: '02',
    img: '/arena-weather.png',
    title: 'All-Weather',
    desc: 'Sessions run through monsoon and summer.',
    stat: 'Year-Round',
  },
  {
    num: '03',
    img: '/arena-footing.png',
    title: 'International Footing',
    desc: 'Geotextile surface for grip and safety.',
    stat: 'Certified',
  },
  {
    num: '04',
    img: '/arena-batches.png',
    title: 'Small Batches',
    desc: 'Limited riders for individual attention.',
    stat: '4-6 Riders',
  },
  {
    num: '05',
    img: '/arena-horses.png',
    title: 'Schooled Horses',
    desc: 'Calm, trained horses for all levels.',
    stat: 'Well-Trained',
  },
  {
    num: '06',
    img: '/arena-progression.png',
    title: 'Structured Progression',
    desc: 'Walk, trot, canter — to competition.',
    stat: 'Elite Path',
  },
];

// ============================================================
// CARD COMPONENT
// ============================================================
const Card = ({ item, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full w-full"
      style={{ perspective: 1200 }}
      whileHover={{ y: -8, zIndex: 50 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-2xl border border-[#C9A227]/20 bg-gradient-to-br from-[#0C0922] via-[#0F0B28] to-[#0C0922] shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          borderColor: isHovered ? 'rgba(201,162,39,0.6)' : 'rgba(201,162,39,0.2)',
        }}
      >
        {/* Grain texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial glow on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            background: isHovered
              ? 'radial-gradient(circle at 50% 30%, rgba(201,162,39,0.15) 0%, transparent 60%)'
              : 'none',
          }}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col p-5 md:p-6">
          {/* Top: Number + label */}
          <div className="flex items-center justify-between">
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A227]/40"
              animate={{
                scale: isHovered ? 1.1 : 1,
                borderColor: isHovered ? '#C9A227' : 'rgba(201,162,39,0.4)',
              }}
            >
              <span className="font-serif text-[0.7rem] font-bold text-[#C9A227]">
                {item.num}
              </span>
            </motion.div>
            <span className="font-serif text-[0.6rem] italic tracking-wider text-white/30">
              Arena
            </span>
          </div>

          {/* Icon */}
          <div className="flex flex-1 items-center justify-center">
            <motion.img
              src={item.img}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="h-14 w-14 object-contain md:h-16 md:w-16"
              animate={{
                scale: isHovered ? 1.15 : 1,
                y: isHovered ? -4 : 0,
                filter: isHovered
                  ? 'drop-shadow(0 0 12px rgba(201,162,39,0.6))'
                  : 'drop-shadow(0 0 0 rgba(201,162,39,0))',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Title + Desc */}
          <div className="text-center">
            <motion.h3
              className="font-serif text-base font-semibold leading-tight md:text-lg"
              animate={{ color: isHovered ? '#C9A227' : '#FFFFFF' }}
            >
              {item.title}
            </motion.h3>
            <p className="mt-1.5 text-xs leading-relaxed text-white/55">
              {item.desc}
            </p>
          </div>

          {/* Bottom stat */}
          <motion.div
            className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3"
            animate={{
              borderColor: isHovered ? 'rgba(201,162,39,0.3)' : 'rgba(255,255,255,0.06)',
            }}
          >
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white/30">
              Status
            </span>
            <motion.span
              className="font-serif text-xs italic text-[#C9A227]"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.stat}
            </motion.span>
          </motion.div>
        </div>

        {/* Bottom scan line on hover */}
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const ArenaFeatures = () => {
  return (
    <section className="relative overflow-hidden bg-[#0C0922] py-16 text-white md:py-24">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#C9A227]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-[8vw]">
        {/* ============================================================ */}
        {/* HEADER */}
        {/* ============================================================ */}
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#C9A227]/40" />
            <span className="type-eyebrow text-[#C9A227]">The Arena</span>
            <span className="h-px w-12 bg-[#C9A227]/40" />
          </div>
          <h2 className="type-page-title">
            Built so the training
            <br />
            <span className="text-[#C9A227]">never stops.</span>
          </h2>
        </motion.div>

        {/* ============================================================ */}
        {/* DESKTOP: STACKED → SPREAD GRID */}
        {/* ============================================================ */}
        <div className="relative hidden h-[560px] w-full md:block">
          {features.map((item, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);

            // Target grid positions (3 columns × 2 rows)
            const targetLeft = col * 34; // 0%, 34%, 68%
            const targetTop = row * 52;   // 0%, 52%

            return (
              <motion.div
                key={item.num}
                className="absolute h-[48%] w-[32%]"
                initial={{
                  left: '34%',
                  top: '26%',
                  rotate: (index - 2.5) * 7,
                  scale: 0.75,
                  opacity: 0,
                }}
                whileInView={{
                  left: `${targetLeft}%`,
                  top: `${targetTop}%`,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.09,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ zIndex: index }}
              >
                <Card item={item} index={index} />
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* MOBILE: VERTICAL STACK WITH STAGGER */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {features.map((item, index) => (
            <motion.div
              key={item.num}
              className="h-[280px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card item={item} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArenaFeatures;