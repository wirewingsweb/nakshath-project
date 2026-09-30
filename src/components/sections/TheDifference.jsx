// src/components/sections/TheDifference.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText } from '../motion';

const editorialItem = (prefersReduced, isMobile, { y = 12, duration = 0.5, delay = 0 } = {}) => ({
  hidden: {
    opacity: 0,
    y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y),
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReduced ? 0 : duration,
      delay: prefersReduced ? 0 : delay,
      ease: EASE_PRIMARY,
    },
  },
});

const TheDifference = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [leftRef, leftInView] = useInViewOnce({ amount: 0.3 });

  const sectionRef = useRef(null);

  // ── Cursor tracking for image spotlight ──
  const imageAreaRef = useRef(null);
  const imageMouseX = useMotionValue(0.5);
  const imageMouseY = useMotionValue(0.5);
  const imageSmoothX = useSpring(imageMouseX, { damping: 40, stiffness: 120, mass: 0.5 });
  const imageSmoothY = useSpring(imageMouseY, { damping: 40, stiffness: 120, mass: 0.5 });

  const spotlightLeft = useTransform(imageSmoothX, (v) => `${v * 100}%`);
  const spotlightTop = useTransform(imageSmoothY, (v) => `${v * 100}%`);

  const imageParallaxX = useTransform(imageSmoothX, [0, 1], [8, -8]);
  const imageParallaxY = useTransform(imageSmoothY, [0, 1], [6, -6]);

  const handleImageMouseMove = (e) => {
    const rect = imageAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    imageMouseX.set(x);
    imageMouseY.set(y);
  };

  const handleImageMouseLeave = () => {
    imageMouseX.set(0.5);
    imageMouseY.set(0.5);
  };

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

  // Curtain animation variants (driven by whileInView — reliable on first paint)
  const curtainVariants = {
    hidden: { x: '0%' },
    visible: {
      x: '-100%',
      transition: {
        duration: 1.2,
        delay: 0.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const goldLineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 1.2,
        delay: 0.2,
        times: [0, 0.15, 0.85, 1],
        ease: 'easeInOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.4,
        delay: 0.3,
        ease: EASE_PRIMARY,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative grid grid-cols-1 items-center overflow-hidden bg-[#FDFCFA] md:aspect-[1920/1365] md:grid-cols-[54%_46%]"
    >
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
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

      {/* LEFT COLUMN */}
      <div className="relative z-10 px-6 py-16 sm:px-10 md:py-0 md:pl-[clamp(3rem,7.1vw,10rem)] md:pr-[3vw]">
        <div className="max-w-[38rem]">
          <motion.div
            ref={leftRef}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
          >
            <motion.h4
              className="group type-eyebrow mb-8 flex cursor-default items-center gap-3 text-[#876B18] md:mb-[3vw]"
              variants={editorialItem(prefersReduced, isMobile, { y: 8, duration: 0.45 })}
            >
              <motion.span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
                animate={
                  prefersReduced
                    ? { scale: 1, opacity: 1 }
                    : { scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }
                }
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="transition-colors duration-300 group-hover:text-[#C9A227]">
                The Difference
              </span>
            </motion.h4>

            <div className="mb-10">
              <SplitText
                as="h2"
                className="type-display text-[#1A1A1A] [&>*]:transition-colors [&>*]:duration-500 hover:[&>*]:text-[#876B18]"
                wordDelay={0.04}
                startDelay={0.1}
                amount={0.3}
              >
                Bengaluru's equestrian training moves <span className="text-[#876B18] transition-colors duration-500 hover:text-[#C9A227]">indoors.</span>
              </SplitText>
            </div>

            <motion.div
              className="group mb-9 flex cursor-default items-center md:mb-[3.2vw]"
              variants={editorialItem(prefersReduced, isMobile, { y: 0, duration: 0.5, delay: 0.3 })}
            >
              <div className="relative h-px w-[6.75rem] overflow-hidden bg-[#876B18] md:w-[10vw]">
                <motion.div
                  className="absolute inset-y-0 left-0 w-full origin-left bg-[#C9A227]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: EASE_PRIMARY }}
                  style={{ originX: 0 }}
                />
              </div>
              <span className="ml-3 inline-block h-1.5 w-1.5 rounded-full bg-[#876B18] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>

            <motion.div
              className="group relative pl-0 transition-all duration-500 hover:pl-5"
              variants={editorialItem(prefersReduced, isMobile, { y: 12, duration: 0.55, delay: 0.4 })}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 h-0 w-[2px] bg-[#876B18] transition-all duration-500 group-hover:h-full"
              />
              <p className="type-lead max-w-[27rem] text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#5A5A66] md:max-w-[31rem]">
                An all-weather covered arena on international-standard footing. Lessons do not stop for monsoon or summer heat.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT COLUMN — Image */}
      <div className="relative z-10 px-6 pb-10 md:px-0 md:pb-0">
        <div
          ref={imageAreaRef}
          onMouseMove={handleImageMouseMove}
          onMouseLeave={handleImageMouseLeave}
          className="group relative h-[28rem] w-full overflow-hidden rounded-[2rem] md:h-[57.5vw] md:rounded-l-[2.25rem] md:rounded-r-none"
        >
          {/* Image — fades in, then Ken Burns drifts */}
          <motion.div
            className="h-full w-full"
            style={
              prefersReduced
                ? undefined
                : { x: imageParallaxX, y: imageParallaxY }
            }
            variants={prefersReduced ? undefined : imageVariants}
            initial={prefersReduced ? undefined : 'hidden'}
            whileInView={prefersReduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="h-full w-full"
              animate={
                prefersReduced
                  ? { scale: 1 }
                  : {
                      scale: [1, 1, 1.04, 1.02, 1],
                      x: ['0%', '0%', '-1.2%', '-0.6%', '0%'],
                      y: ['0%', '0%', '-0.6%', '-0.3%', '0%'],
                    }
              }
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      duration: 30,
                      times: [0, 0.15, 0.45, 0.7, 1],
                      ease: EASE_PRIMARY,
                      repeat: Infinity,
                      repeatType: 'loop',
                      repeatDelay: 0,
                    }
              }
            >
              <img
                src="/page 2 gpt.webp"
                alt="Indoor Arena"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </motion.div>
          </motion.div>

          {/* ═══ CURTAIN REVEAL — right to left ═══
              Only render on the very first view. Slides off to reveal image. */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 bg-[#0C0922]"
              variants={curtainVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Gold accent line on the leading edge of the curtain */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-[#C9A227] to-transparent"
                variants={goldLineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              />
            </motion.div>
          )}

          {/* Spotlight */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                left: spotlightLeft,
                top: spotlightTop,
                background:
                  'radial-gradient(circle, rgba(245,230,168,0.35) 0%, rgba(201,162,39,0.15) 40%, transparent 70%)',
                filter: 'blur(40px)',
                mixBlendMode: 'screen',
              }}
            />
          )}

          {/* Ring glow */}
          <div className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-2 group-hover:ring-offset-4 group-hover:ring-offset-[#FDFCFA] md:rounded-l-[2.25rem] md:rounded-r-none" />

          {/* Corner brackets */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-4 z-30 h-8 w-8 opacity-0 transition-all duration-500 group-hover:left-6 group-hover:top-6 group-hover:opacity-100"
          >
            <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
            <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-4 z-30 h-8 w-8 opacity-0 transition-all duration-500 group-hover:bottom-6 group-hover:right-6 group-hover:opacity-100"
          >
            <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
            <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TheDifference;