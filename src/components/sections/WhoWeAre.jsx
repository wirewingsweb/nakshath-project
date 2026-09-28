import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer, slideFromLeft } from '../../utils/animations';
import { FiX } from 'react-icons/fi';
import { EASE } from '../../utils/landing-motion';

/* ============================================================
   LINE LIFT (right column)
   ============================================================ */
const LineLift = ({ children, delay = 0, duration = 1.3 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : { y: '110%' }}
        transition={{ duration, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
};

/* ============================================================
   GOLD BLOOM (right column)
   ============================================================ */
const GoldBloom = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.span
      ref={ref}
      animate={
        inView
          ? { opacity: 1, textShadow: '0 0 22px rgba(201,162,39,0.65)' }
          : { opacity: 0.85, textShadow: '0 0 0px rgba(201,162,39,0)' }
      }
      transition={{ duration: 1.2, delay, ease: EASE }}
      className="text-[#876B18]"
    >
      {children}
    </motion.span>
  );
};

/* ============================================================
   SCAN LINE — sweeps down over the map once
   ============================================================ */
const ScanLine = ({ delay = 0 }) => (
  <motion.span
    initial={{ top: '-8%', opacity: 0 }}
    whileInView={{ top: '108%', opacity: [0, 1, 1, 0] }}
    viewport={{ once: true, amount: 0 }}
    transition={{
      duration: 2,
      delay,
      ease: EASE,
      times: [0, 0.1, 0.9, 1],
    }}
    className="pointer-events-none absolute inset-x-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
  />
);

/* ============================================================
   LEGEND ITEM — simple, no interactivity
   ============================================================ */
const LegendItem = ({ number, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0 }}
    transition={{ duration: 0.5, delay, ease: EASE }}
    className="grid min-w-0 grid-cols-[auto_1fr] items-center gap-2"
  >
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-bold text-[#876B18] md:text-sm">
        {number}
      </span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: EASE }}
        className="block h-px w-3 origin-left bg-[#876B18]/50"
      />
    </div>
    <span className="min-w-0 text-[0.625rem] font-semibold uppercase leading-[1.25] tracking-[0.04em] text-[#1A1A1A] md:text-xs">
      {label}
    </span>
  </motion.div>
);

/* ============================================================
   CAMPUS KEY
   ============================================================ */
const campusKey = [
  ['1', 'Indoor arena'],
  ['4', 'Dressage arena'],
  ['2', 'Outdoor arena'],
  ['5', 'Stables'],
  ['3', 'Lunging pen'],
  ['6', 'Tack shop'],
];

/* ============================================================
   WHO WE ARE
   ============================================================ */
const WhoWeAre = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    if (!isMapOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsMapOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isMapOpen]);

  return (
    <>
      <section className="mobile-cta-exclusion w-full bg-[#FDFCFA] py-14 md:py-16">
        <div className="grid min-h-[31.75rem] w-full grid-cols-1 items-center overflow-hidden rounded-r-[2.25rem] bg-[#0C0922] md:min-h-[42rem] md:w-[93.2%] md:grid-cols-[48%_52%]">

          {/* ==================================================
              LEFT: Campus Map Card
              ================================================== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromLeft}
            className="flex justify-center md:justify-end px-5 pt-12 md:py-11 md:pl-10 md:pr-[4.5vw]"
          >
            <motion.button
              type="button"
              onClick={() => setIsMapOpen(true)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Open campus map in fullscreen"
              className="group relative flex h-auto w-full max-w-[22rem] cursor-pointer flex-col rounded-xl bg-[#FDFCFA] px-5 pb-6 pt-5 md:w-[min(31vw,27rem)] md:max-w-none md:px-5 md:pb-6 md:pt-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-15px_rgba(201,162,39,0.35)] text-left"
            >
              {/* Map image with blur-to-sharp reveal + scan sweep */}
              <div className="relative">
                <motion.img
                  initial={{ opacity: 0, filter: 'blur(12px) brightness(1.15)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
                  src="/page 3 gpt.webp"
                  alt="Campus Map"
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <ScanLine delay={1.2} />

                {/* Expand hint pill */}
                <div className="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-[#0C0922]/85 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                  Expand
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 md:mt-[1vw] md:gap-y-[0.8vw]">
                {campusKey.map(([number, label], i) => (
                  <LegendItem
                    key={number}
                    number={number}
                    label={label}
                    delay={1.5 + i * 0.08}
                  />
                ))}
              </div>
            </motion.button>
          </motion.div>

          {/* ==================================================
              RIGHT: Text Content
              ================================================== */}
          <div className="px-8 py-14 sm:px-12 md:py-12 md:pl-[4.25vw] md:pr-12 text-white">
            <div className="max-w-[20rem]">
              <motion.h4
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="mb-6 flex items-center gap-3 text-[#876B18] type-eyebrow md:mb-[2.4vw]"
              >
                <motion.span
                  animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
                />
                Who We Are
              </motion.h4>

              <div className="space-y-9 md:space-y-[4.2vw] text-base md:text-lg leading-[1.55] font-normal tracking-[0.01em] text-white/90">
                <div>
                  <LineLift delay={0.3}>A working equestrian academy</LineLift>
                  <LineLift delay={0.5}>on the edge of Bengaluru.</LineLift>
                </div>

                <div>
                  <LineLift delay={0.9}>Show jumping and dressage,</LineLift>
                  <LineLift delay={1.1}>
                    taught from <GoldBloom delay={2.4}>first sit</GoldBloom>
                  </LineLift>
                  <LineLift delay={1.3}>
                    <GoldBloom delay={2.6}>to competition entry.</GoldBloom>
                  </LineLift>
                </div>

                <div>
                  <LineLift delay={1.7}>Four arenas, stables and cottages</LineLift>
                  <LineLift delay={1.9}>across a single campus.</LineLift>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          FLOATING 3D MAP LIGHTBOX
          ================================================== */}
      <AnimatePresence>
        {isMapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsMapOpen(false)}
            style={{ perspective: 1500 }}
          >
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-[#0C0922]/75"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="h-[80vh] w-[80vh] max-h-[700px] max-w-[700px] rounded-full bg-[#C9A227]/15 blur-[120px]" />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsMapOpen(false);
              }}
              aria-label="Close map"
              className="absolute top-5 right-5 md:top-8 md:right-8 z-[20] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-[#C9A227] hover:text-[#0C0922] transition-colors"
            >
              <FiX size={22} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 60, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 60, rotateX: 20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -10,
                scale: 1.03,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex max-h-[90vh] max-w-[90vw] items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.img
                src="/page 3 gpt.webp"
                alt="Campus Map — Fullscreen"
                initial={{ filter: 'brightness(1) drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
                whileHover={{ filter: 'brightness(1.05) drop-shadow(0 40px 60px rgba(201,162,35,0.35))' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[85vh] w-auto max-w-full object-contain"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.55)) drop-shadow(0 0 40px rgba(201,162,39,0.15))',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhoWeAre;