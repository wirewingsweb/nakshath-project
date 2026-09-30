// src/components/sections/OurHorses.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText, KenBurnsImage } from '../motion';

// ─── Variants ────────────────────────────────────────────────

const textContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1, delayChildren: prefersReduced ? 0 : 0.1 } },
});

const textItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY } },
});

const OurHorses = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [textRef, textInView] = useInViewOnce({ amount: 0.3 });

  const sectionRef = useRef(null);
  const imageAreaRef = useRef(null);

  // ── Image cursor tracking ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 30, stiffness: 150, mass: 0.6 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  // Parallax
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  // Spotlight position
  const spotlightLeft = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightTop = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleImageMouseMove = (e) => {
    const rect = imageAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleImageMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // ── Section-wide cursor glow ──
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

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative w-full bg-[#FDFCFA] px-[1.8vw] py-8 md:py-[2.3vw]"
    >
      {/* Section-wide cursor glow */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
          style={{
            left: sectionGlowLeft,
            top: sectionGlowTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)',
            filter: 'blur(60px)',
            mixBlendMode: 'multiply',
          }}
        />
      )}

      <div
        ref={imageAreaRef}
        onMouseMove={handleImageMouseMove}
        onMouseLeave={handleImageMouseLeave}
        className="group relative z-10 h-[32rem] w-full overflow-hidden rounded-[1.5rem] md:h-auto"
      >
        {/* Background image with cursor parallax */}
        <motion.div
          className="h-full w-full"
          style={
            prefersReduced
              ? undefined
              : { x: parallaxX, y: parallaxY }
          }
        >
          <KenBurnsImage
            src="/page 8 gpt.webp"
            alt="Horse at sunset"
            cinematic={false}
            targetOpacity={1}
            className="h-full w-full md:h-auto"
            imgClassName="block h-full w-full object-cover object-[58%_center] md:h-auto md:object-center"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/55 to-transparent md:from-[#0C0922]/80 md:via-[#0C0922]/25" />

        {/* Vignette — breathing */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(12,9,34,0.35) 100%)',
            }}
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Cursor spotlight */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              left: spotlightLeft,
              top: spotlightTop,
              background:
                'radial-gradient(circle, rgba(245,230,168,0.28) 0%, rgba(201,162,39,0.10) 45%, transparent 75%)',
              filter: 'blur(50px)',
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Corner brackets */}
        {!prefersReduced && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-6 top-6 z-20 h-10 w-10 opacity-0 transition-all duration-500 group-hover:left-8 group-hover:top-8 group-hover:opacity-100"
            >
              <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
              <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 right-6 z-20 h-10 w-10 opacity-0 transition-all duration-500 group-hover:bottom-8 group-hover:right-8 group-hover:opacity-100"
            >
              <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
              <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
            </div>
          </>
        )}

        {/* Gold ring on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[1.5rem] ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-2 group-hover:ring-inset"
        />

        {/* TEXT CONTENT */}
        <div className="absolute left-7 top-1/2 z-30 max-w-[15.5rem] -translate-y-1/2 text-white md:left-[6.8%] md:max-w-[22rem]">
          <motion.div
            ref={textRef}
            variants={textContainerVariants(prefersReduced)}
            initial="hidden"
            animate={textInView ? 'visible' : 'hidden'}
          >
            {/* Eyebrow with pulsing dot */}
            <motion.h4
              className="group/eyebrow type-eyebrow mb-4 flex cursor-default items-center gap-3 text-[#C9A227]"
              variants={textItemVariants(prefersReduced, isMobile, 8)}
            >
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
              <span className="transition-colors duration-300 group-hover/eyebrow:text-[#FFF8DC]">
                Our Horses
              </span>
            </motion.h4>

            {/* Heading with word-hover */}
            <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
              <SplitText
                as="h2"
                className="type-page-title"
                wordDelay={0.05}
                startDelay={0.15}
                amount={0.3}
              >
                Calm, schooled, and matched to the rider.
              </SplitText>
            </div>

            {/* Paragraph with slide + accent bar on hover */}
            <motion.div
              className="group/para relative mt-4 pl-0 transition-all duration-500 hover:pl-4"
              variants={textItemVariants(prefersReduced, isMobile, 12)}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/para:h-full"
              />
              <p className="max-w-[16rem] text-sm leading-[1.55] text-white/85 transition-colors duration-500 group-hover/para:text-white md:max-w-[25vw] md:text-base">
                Every horse selected for temperament first, then trained for the level it teaches.
              </p>
            </motion.div>

            {/* CTA link with animated underline + arrow */}
            <motion.div
              className="mt-6 inline-block"
              variants={textItemVariants(prefersReduced, isMobile, 10)}
            >
              <Link
                to="/horses"
                className="group/link relative inline-flex items-center gap-2 text-xs font-medium text-white transition-colors duration-300 hover:text-[#C9A227]"
              >
                <span className="relative">
                  Meet the horses
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full bg-white/60"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100"
                  />
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.4"
                  stroke="currentColor"
                  className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurHorses;