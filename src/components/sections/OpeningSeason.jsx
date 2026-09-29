import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { viewportOnce } from '../../utils/animations';

// ============================================================
// OFFERS DATA
// ============================================================
const offers = [
  {
    num: '01',
    img: '/page-11-2-gpt.webp',
    title: 'Free Trial Ride',
    desc: 'Ten minutes on a schooled horse.',
  },
  {
    num: '02',
    img: '/page-11-3-gpt.webp',
    title: '10% Off First Month',
    desc: 'Applied at enrolment.',
  },
  {
    num: '03',
    img: '/page-11-4-gpt.webp',
    title: 'Weekend Batches',
    desc: 'Saturday & Sunday sessions.',
  },
  {
    num: '04',
    img: '/page-11-5-gpt.webp',
    title: 'Kids Summer Camp',
    desc: 'Structured holiday programme.',
  },
  {
    num: '05',
    img: '/page-11-6-gpt.webp',
    title: 'Early Registration',
    desc: 'Priority slots before opening.',
  },
];

// ============================================================
// OFFER CARD
// ============================================================
const OfferCard = ({ offer, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="relative h-[360px] overflow-hidden rounded-2xl border border-[#C9A227]/20 bg-[#0C0922] md:h-[440px]">
        {/* ============================================================ */}
        {/* IMAGE with zoom */}
        {/* ============================================================ */}
        <motion.img
          src={offer.img}
          alt={offer.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          animate={{
            scale: isHovered ? 1.12 : 1,
            filter: isHovered
              ? 'saturate(1.2) brightness(1.05)'
              : 'saturate(0.9) brightness(0.95)',
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* ============================================================ */}
        {/* CURSOR SPOTLIGHT — follows mouse */}
        {/* ============================================================ */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle 250px at ${mousePos.x}% ${mousePos.y}%, rgba(201,162,39,0.25) 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s',
          }}
        />

        {/* ============================================================ */}
        {/* DARK GRADIENT */}
        {/* ============================================================ */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0922] via-[#0C0922]/30 to-transparent" />

        {/* ============================================================ */}
        {/* GRAIN TEXTURE */}
        {/* ============================================================ */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ============================================================ */}
        {/* GOLDEN LIGHT SWEEP — on hover */}
        {/* ============================================================ */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, transparent 30%, rgba(201,162,39,0.25) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: isHovered ? '200% 0%' : '-100% 0%',
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        {/* ============================================================ */}
        {/* NUMBER BADGE — top-left */}
        {/* ============================================================ */}
        <motion.div
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A227] bg-[#0C0922]/70 backdrop-blur-md"
          animate={{
            scale: isHovered ? 1.15 : 1,
            boxShadow: isHovered
              ? '0 0 24px rgba(201,162,39,0.6)'
              : '0 0 0 rgba(201,162,39,0)',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-[#C9A227]"
            animate={{
              scale: isHovered ? [1, 1.8, 1] : 1,
              opacity: isHovered ? [0.8, 0, 0.8] : 0,
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeOut',
            }}
          />
          <span className="relative z-10 font-serif text-xs font-bold text-[#C9A227]">
            {offer.num}
          </span>
        </motion.div>

        {/* ============================================================ */}
        {/* TEXT — bottom */}
        {/* ============================================================ */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.h3
            className="mb-2 font-serif text-xl font-semibold leading-tight md:text-2xl"
            animate={{ color: isHovered ? '#C9A227' : '#FFFFFF' }}
            transition={{ duration: 0.3 }}
          >
            {offer.title}
          </motion.h3>

          <motion.div
            className="mb-4 h-px origin-left bg-[#C9A227]"
            animate={{ scaleX: isHovered ? 1 : 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '3rem' }}
          />

          <motion.p
            className="text-sm leading-relaxed"
            animate={{
              color: isHovered
                ? 'rgba(255,255,255,0.9)'
                : 'rgba(255,255,255,0.65)',
            }}
            transition={{ duration: 0.3 }}
          >
            {offer.desc}
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* CORNER BRACKETS */}
        {/* ============================================================ */}
        <motion.div
          className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2"
          animate={{
            borderColor: isHovered ? '#C9A227' : 'rgba(201,162,39,0.3)',
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2"
          animate={{
            borderColor: isHovered ? '#C9A227' : 'rgba(201,162,39,0.3)',
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ============================================================ */}
        {/* BORDER GLOW on hover */}
        {/* ============================================================ */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl border-2"
          animate={{
            borderColor: isHovered
              ? 'rgba(201,162,39,0.7)'
              : 'rgba(255,255,255,0)',
            boxShadow: isHovered
              ? '0 0 40px rgba(201,162,39,0.3), inset 0 0 30px rgba(201,162,39,0.1)'
              : '0 0 0 rgba(201,162,39,0)',
          }}
          transition={{ duration: 0.4 }}
        />

        {/* ============================================================ */}
        {/* BOTTOM SCAN LINE */}
        {/* ============================================================ */}
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const OpeningSeason = () => {
  return (
    <section className="relative overflow-hidden bg-[#0C0922] py-20 md:py-28">
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
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#C9A227]/6 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* ============================================================ */}
        {/* HEADER */}
        {/* ============================================================ */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="type-eyebrow text-[#C9A227]">Opening Season</span>
            <motion.span
              className="block h-px w-20 origin-left bg-[#C9A227]/60"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <h2 className="type-page-title max-w-2xl text-white">
            Available until
            <br />
            <span className="text-[#C9A227]">we open.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            Five offers available right now. Hover to explore.
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* OFFERS GRID */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-5">
          {offers.map((offer, index) => (
            <OfferCard key={offer.num} offer={offer} index={index} />
          ))}
        </div>

        {/* ============================================================ */}
        {/* FOOTER — CTA */}
        {/* ============================================================ */}
        <motion.div
          className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:mt-16 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/40">
            Limited Time · Opening Season
          </p>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-3 rounded-full border border-[#C9A227] bg-[#C9A227]/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] transition-colors hover:bg-[#C9A227] hover:text-[#0C0922]"
          >
            Book your trial ride
            <svg
              width="16"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M0 5H16M16 5L12 1M16 5L12 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OpeningSeason;