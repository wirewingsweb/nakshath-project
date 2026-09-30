// src/components/sections/WhoWeAre.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { DriftImage } from '../motion';

const campusKey = [
  ['1', 'Indoor arena'],
  ['4', 'Dressage arena'],
  ['2', 'Outdoor arena'],
  ['5', 'Stables'],
  ['3', 'Lunging pen'],
  ['6', 'Tack shop'],
];

const cardVariants = (prefersReduced) => ({
  hidden: { opacity: 0, scale: prefersReduced ? 1 : 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: prefersReduced ? 0 : 0.9, ease: EASE_PRIMARY } },
});

const campusKeyContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.06, delayChildren: prefersReduced ? 0 : 0.2 } },
});

const campusKeyItemVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 5 : 8) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.4, ease: EASE_PRIMARY } },
});

const textContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1, delayChildren: prefersReduced ? 0 : 0.1 } },
});

const textItemVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 8 : 12) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.5, ease: EASE_PRIMARY } },
});

const WhoWeAre = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [cardRef, cardInView] = useInViewOnce({ amount: 0.25 });
  const [textRef, textInView] = useInViewOnce({ amount: 0.25 });

  const sectionRef = useRef(null);
  const cardContainerRef = useRef(null);

  // ── Cursor tracking for whole section ambient glow ──
  const sectionMouseX = useMotionValue(0.5);
  const sectionMouseY = useMotionValue(0.5);
  const sectionSmoothX = useSpring(sectionMouseX, { damping: 60, stiffness: 60, mass: 0.8 });
  const sectionSmoothY = useSpring(sectionMouseY, { damping: 60, stiffness: 60, mass: 0.8 });
  const sectionGlowLeft = useTransform(sectionSmoothX, (v) => `${v * 100}%`);
  const sectionGlowTop = useTransform(sectionSmoothY, (v) => `${v * 100}%`);

  const handleSectionMouseMove = (e) => {
    if (prefersReduced) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    sectionMouseX.set((e.clientX - rect.left) / rect.width);
    sectionMouseY.set((e.clientY - rect.top) / rect.height);
  };

  // ── Cursor tracking for card (tilt + spotlight) ──
  const cardMouseX = useMotionValue(0);
  const cardMouseY = useMotionValue(0);
  const cardSpring = { damping: 30, stiffness: 180, mass: 0.6 };
  const cardSmoothX = useSpring(cardMouseX, cardSpring);
  const cardSmoothY = useSpring(cardMouseY, cardSpring);

  // 3D tilt
  const cardRotateX = useTransform(cardSmoothY, [-0.5, 0.5], [4, -4]);
  const cardRotateY = useTransform(cardSmoothX, [-0.5, 0.5], [-4, 4]);

  // Spotlight position on card
  const cardSpotlightLeft = useTransform(cardSmoothX, [-0.5, 0.5], ['0%', '100%']);
  const cardSpotlightTop = useTransform(cardSmoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleCardMouseMove = (e) => {
    const rect = cardContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    cardMouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    cardMouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleCardMouseLeave = () => {
    cardMouseX.set(0);
    cardMouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="mobile-cta-exclusion relative w-full overflow-hidden bg-[#FDFCFA] py-14 md:py-16"
    >
      {/* ═══ Section-wide cursor-following ambient glow ═══ */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: sectionGlowLeft,
            top: sectionGlowTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)',
            filter: 'blur(60px)',
            mixBlendMode: 'multiply',
          }}
        />
      )}

      <div className="relative z-10 grid min-h-[31.75rem] w-full grid-cols-1 items-center overflow-hidden rounded-r-[2.25rem] bg-[#0C0922] md:min-h-[42rem] md:w-[93.2%] md:grid-cols-[48%_52%]">

        {/* ═══════════════════════════════════════════
            LEFT — Card with tilt + spotlight
        ═══════════════════════════════════════════ */}
        <div className="flex justify-center px-5 pt-12 md:justify-end md:py-11 md:pl-10 md:pr-[4.5vw]">
          <div
            ref={cardContainerRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="group relative w-full max-w-[22rem] md:w-[min(31vw,27rem)] md:max-w-none"
            style={prefersReduced ? undefined : { perspective: 1200 }}
          >
            {/* Pulsing gold glow behind the card — offset for depth */}
            {!prefersReduced && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(201,162,39,0.28) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
                animate={{
                  opacity: [0.5, 0.85, 0.5],
                  scale: [1, 1.03, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            <motion.div
              ref={cardRef}
              className="relative flex h-auto w-full flex-col rounded-xl bg-[#FDFCFA] px-5 pb-6 pt-5"
              variants={cardVariants(prefersReduced)}
              initial="hidden"
              animate={cardInView ? 'visible' : 'hidden'}
              style={
                prefersReduced
                  ? undefined
                  : {
                      rotateX: cardRotateX,
                      rotateY: cardRotateY,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                    }
              }
              whileHover={prefersReduced ? undefined : { y: -6, transition: { duration: 0.4, ease: EASE_PRIMARY } }}
            >
              {/* Cursor-tracked gold spotlight on the card */}
              {!prefersReduced && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-8 z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    left: cardSpotlightLeft,
                    top: cardSpotlightTop,
                    width: '240px',
                    height: '240px',
                    transform: 'translate(-50%, -50%)',
                    background:
                      'radial-gradient(circle, rgba(201,162,39,0.28) 0%, rgba(201,162,39,0.08) 45%, transparent 75%)',
                    filter: 'blur(30px)',
                    mixBlendMode: 'multiply',
                  }}
                />
              )}

              {/* Map image */}
              <div className="relative z-10 aspect-[4/5] w-full overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  whileHover={prefersReduced ? undefined : { scale: 1.03 }}
                  transition={{ duration: 0.6, ease: EASE_PRIMARY }}
                >
                  <DriftImage
                    src="/page 3 gpt.webp"
                    alt="Campus Map"
                    drift="subtle"
                    duration={40}
                    className="h-full w-full"
                    imgClassName="h-full w-full object-contain"
                  />
                </motion.div>

                {/* Corner brackets — slide in on hover */}
                {!prefersReduced && (
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-2 top-2 h-6 w-6 opacity-0 transition-all duration-500 group-hover:left-3 group-hover:top-3 group-hover:opacity-100"
                    >
                      <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
                      <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 opacity-0 transition-all duration-500 group-hover:bottom-3 group-hover:right-3 group-hover:opacity-100"
                    >
                      <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
                      <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
                    </div>
                  </>
                )}
              </div>

              {/* Campus key — interactive list */}
              <motion.div
                className="relative z-10 mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[0.625rem] font-semibold uppercase leading-[1.25] tracking-[0.04em] text-[#1A1A1A] md:mt-[1vw] md:gap-y-[0.8vw] md:text-xs"
                variants={campusKeyContainerVariants(prefersReduced)}
                initial="hidden"
                animate={cardInView ? 'visible' : 'hidden'}
              >
                {campusKey.map(([number, label]) => (
                  <motion.div
                    key={number}
                    className="group/item relative grid min-w-0 cursor-pointer grid-cols-[0.75rem_minmax(0,1fr)] items-start gap-1.5 pl-0 transition-all duration-300 hover:pl-2"
                    variants={campusKeyItemVariants(prefersReduced, isMobile)}
                  >
                    {/* Left accent bar on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-0 w-[2px] bg-[#C9A227] transition-all duration-300 group-hover/item:h-full"
                    />
                    <span className="text-xs font-bold text-[#1A1A1A] transition-colors duration-300 group-hover/item:text-[#C9A227] md:text-sm">
                      {number}
                    </span>
                    <span className="min-w-0 transition-colors duration-300 group-hover/item:text-[#C9A227]">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Outer gold ring on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-offset-[#0C0922]"
              />
            </motion.div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            RIGHT — Text with interactive words
        ═══════════════════════════════════════════ */}
        <div className="px-8 py-14 text-white sm:px-12 md:py-12 md:pl-[4.25vw] md:pr-12">
          <div className="max-w-[20rem]">
            <motion.div
              ref={textRef}
              variants={textContainerVariants(prefersReduced)}
              initial="hidden"
              animate={textInView ? 'visible' : 'hidden'}
            >
              {/* Eyebrow with pulsing dot */}
              <motion.h4
                className="group type-eyebrow mb-6 flex cursor-default items-center gap-3 text-[#876B18] md:mb-[2.4vw]"
                variants={textItemVariants(prefersReduced, isMobile)}
              >
                <motion.span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
                  animate={
                    prefersReduced
                      ? { scale: 1, opacity: 1 }
                      : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
                  }
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="transition-colors duration-300 group-hover:text-[#C9A227]">
                  Who We Are
                </span>
              </motion.h4>

              <div className="space-y-9 text-base font-normal leading-[1.55] tracking-[0.01em] text-white/90 md:space-y-[4.2vw] md:text-lg">
                {/* Paragraph 1 */}
                <motion.div
                  className="group/para relative pl-0 transition-all duration-500 hover:pl-4"
                  variants={textItemVariants(prefersReduced, isMobile)}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/para:h-full"
                  />
                  <p className="transition-colors duration-500 group-hover/para:text-white">
                    A working equestrian academy<br />on the edge of Bengaluru.
                  </p>
                </motion.div>

                {/* Paragraph 2 — with gold highlighted words */}
                <motion.div
                  className="group/para relative pl-0 transition-all duration-500 hover:pl-4"
                  variants={textItemVariants(prefersReduced, isMobile)}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/para:h-full"
                  />
                  <p className="transition-colors duration-500 group-hover/para:text-white">
                    Show jumping and dressage,<br />
                    taught from <span className="text-[#876B18] transition-colors duration-500 hover:text-[#C9A227] cursor-default">first sit</span><br />
                    <span className="text-[#876B18] transition-colors duration-500 hover:text-[#C9A227] cursor-default">to competition entry.</span>
                  </p>
                </motion.div>

                {/* Paragraph 3 */}
                <motion.div
                  className="group/para relative pl-0 transition-all duration-500 hover:pl-4"
                  variants={textItemVariants(prefersReduced, isMobile)}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/para:h-full"
                  />
                  <p className="transition-colors duration-500 group-hover/para:text-white">
                    Four arenas, stables and cottages<br />across a single campus.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;