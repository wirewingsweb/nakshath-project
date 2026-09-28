import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import ShinyText from '../../components/ShinyText';
import { EASE, EASE_SNAP } from '../../utils/landing-motion';

/* ============================================================
   LETTER CASCADE
   ============================================================ */
const CascadeText = ({ text, delay = 0, className = '' }) => {
  const chars = text.split('');
  return (
    <span className={className}>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: delay + i * 0.03, ease: EASE }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  );
};

/* ============================================================
   DRAWN ICON — SVG path draws in when in view
   Every path in the SVG gets animated with pathLength
   ============================================================ */
const DrawnIcon = ({ children, delay = 0, size = 56 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      style={{ width: size, height: size }}
      className="relative"
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className="text-[#C9A227]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
      {/* Soft halo behind the icon */}
      <motion.span
        initial={{ opacity: 0, scale: 0.3 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: delay + 0.3, ease: EASE }}
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#C9A227]/10 blur-2xl"
      />
    </motion.div>
  );
};

/* ============================================================
   FEATURE CARD — with cursor spotlight, drawn icon, numbered corner
   ============================================================ */
const FeatureCard = ({ feature, idx }) => {
  const [spot, setSpot] = useState({ x: '50%', y: '50%', visible: false });
  const cardRef = useRef(null);

  const onMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setSpot({
      x: `${e.clientX - r.left}px`,
      y: `${e.clientY - r.top}px`,
      visible: true,
    });
  };
  const onLeave = () => setSpot((s) => ({ ...s, visible: false }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: 'blur(10px)', scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.95,
        delay: 0.25 + idx * 0.14,
        ease: EASE,
      }}
      onMouseEnter={onMove}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#0C0922]/50 p-6 backdrop-blur-[3px] transition-colors duration-500 hover:border-[#C9A227]/60 md:min-h-[220px]"
    >
      {/* ==================================================
          Cursor spotlight — gold halo follows the mouse
          ================================================== */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(280px circle at ${spot.x} ${spot.y}, rgba(201,162,39,0.22), transparent 60%)`,
        }}
      />

      {/* Grid texture — barely visible */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,162,39,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ==================================================
          Numbered corner — top right
          ================================================== */}
      <motion.span
        initial={{ opacity: 0, x: 12, y: -12 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.7 + idx * 0.14,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="absolute right-4 top-4 z-10 font-serif text-xs italic tabular-nums text-[#C9A227]/60"
      >
        {String(idx + 1).padStart(2, '0')}
      </motion.span>

      {/* ==================================================
          Icon drawn in with SVG stroke animation
          ================================================== */}
      <div className="relative z-10 mb-5 flex justify-start md:justify-center">
        <DrawnIcon delay={0.55 + idx * 0.14}>
          {feature.icon}
        </DrawnIcon>
      </div>

      {/* ==================================================
          Title with word-by-word mask
          ================================================== */}
      <motion.h4
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.9 + idx * 0.14,
          ease: EASE,
        }}
        className="relative z-10 text-left text-sm font-semibold uppercase tracking-[0.14em] text-[#C9A227] md:text-center"
      >
        {feature.title}
      </motion.h4>

      {/* ==================================================
          Underline draws across
          ================================================== */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.05 + idx * 0.14,
          ease: EASE,
        }}
        className="relative z-10 mt-4 h-px origin-left bg-gradient-to-r from-[#C9A227]/70 via-[#C9A227]/30 to-transparent md:mx-auto"
      />

      {/* Bottom-right corner bracket — draws on hover */}
      <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#C9A227]/0 transition-all duration-700 group-hover:border-[#C9A227]/60" />
    </motion.div>
  );
};

/* ============================================================
   MAIN
   ============================================================ */
const NakshathDifference = () => {
  const sectionRef = useRef(null);

  // Background parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.02, 1.1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  const features = [
    {
      title: 'International-Standard Indoor Arena',
      icon: (
        <>
          <motion.path
            d="M6 42h36"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          />
          <motion.path
            d="M10 42V14l14-8 14 8v28"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.1, delay: 0.8, ease: EASE }}
          />
          <motion.path
            d="M14 18h4M22 18h4M30 18h4M14 24h4M22 24h4M30 24h4M14 30h4M22 30h4M30 30h4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.3, delay: 1.1, ease: EASE }}
          />
          <motion.path
            d="M24 42v-8h4v8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 1.6, ease: EASE }}
          />
          <motion.path
            d="M24 34c0-2 1-4 3-5s5-2 7-1 3 2 3 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.1, delay: 1.9, ease: EASE }}
          />
          <motion.path
            d="M37 31c1 0 2-1 2-2s-1-2-2-2-2 1-2 2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 2.4, ease: EASE }}
          />
        </>
      ),
    },
    {
      title: 'Professional Coaching',
      icon: (
        <>
          <motion.circle
            cx="24"
            cy="14"
            r="6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          />
          <motion.path
            d="M24 20v8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.4, delay: 1.1, ease: EASE }}
          />
          <motion.path
            d="M24 28c-6 0-10 4-10 10v4h20v-4c0-6-4-10-10-10z"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease: EASE }}
          />
          <motion.path
            d="M16 32h16M14 36h20"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 2, ease: EASE }}
          />
        </>
      ),
    },
    {
      title: 'Well-Trained Horses',
      icon: (
        <>
          <motion.path
            d="M16 40c0-4 2-8 6-10s10-4 14-2 6 5 4 8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
          />
          <motion.path
            d="M40 36c2 0 4-2 4-4s-2-4-4-4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: EASE }}
          />
          <motion.path
            d="M36 32c-2-4-4-8-8-10"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 1.7, ease: EASE }}
          />
          <motion.path
            d="M28 22c1-2 3-3 5-2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 2.2, ease: EASE }}
          />
          <motion.path
            d="M22 28c-2-2-2-5 0-7"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 2.5, ease: EASE }}
          />
          <motion.path
            d="M16 40v4M20 40v4M24 40v4M30 40v4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 2.8, ease: EASE }}
          />
        </>
      ),
    },
    {
      title: 'Limited Riders Per Batch',
      icon: (
        <>
          <motion.circle
            cx="18"
            cy="16"
            r="4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          />
          <motion.circle
            cx="30"
            cy="16"
            r="4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
          />
          <motion.circle
            cx="24"
            cy="12"
            r="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: EASE }}
          />
          <motion.path
            d="M12 32c0-4 3-7 6-7s6 3 6 7"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 1.5, ease: EASE }}
          />
          <motion.path
            d="M24 32c0-4 3-7 6-7s6 3 6 7"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 1.8, ease: EASE }}
          />
          <motion.path
            d="M18 32c0-4 2-6 6-6s6 2 6 6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 2.1, ease: EASE }}
          />
        </>
      ),
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0C0922] py-16 sm:py-24"
    >
      {/* ==================================================
          BACKGROUND — parallax + clip reveal
          ================================================== */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.7, ease: EASE_SNAP }}
          className="absolute inset-0"
        >
          <motion.img
            style={{ scale: bgScale, y: bgY }}
            src="/find difference.webp"
            alt="Indoor Arena Background"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.02] contrast-[1.08] saturate-[1.1]"
          />
        </motion.div>

        {/* Left-heavy dark gradient so text on the left is readable,
            image shows through on the right */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/60 via-[#0C0922]/72 to-[#0C0922] lg:bg-gradient-to-r lg:from-[#0C0922]/85 lg:via-[#0C0922]/55 lg:to-[#0C0922]/35" />

        {/* Extra vignette on the far right to soften the edge */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0C0922]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* ==================================================
            HEADER — left aligned
            ================================================== */}
        <div className="mb-14 max-w-2xl [text-shadow:0_2px_16px_rgba(0,0,0,.72)] md:mb-20">
          <motion.h4
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mb-4 flex items-center gap-3 type-eyebrow text-[#C9A227]"
          >
            <span className="inline-block h-px w-8 bg-[#C9A227]/60" />
            The Nakshath Difference
          </motion.h4>

          <h2 className="type-page-title mb-6 leading-[1.05]">
            <span className="block text-white">
              <CascadeText text="Where Passion" delay={0.2} />
            </span>
            <span className="block">
              <ShinyText
                text="Meets Prestige"
                speed={3}
                className="text-[#C9A227]"
                disabled={false}
              />
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="mb-6 h-[2px] w-16 origin-left bg-[#C9A227]/60"
          />

          <motion.p
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="type-lead max-w-xl text-white/85"
          >
            Nakshath Equestrian Club is a premium equestrian sports destination
            designed to inspire discipline, strength and excellence through
            world-class equestrian training and sporting experiences.
          </motion.p>
        </div>

        {/* ==================================================
            FEATURE CARDS — 4 across on desktop
            ================================================== */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:mr-[15%] lg:grid-cols-4">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NakshathDifference;