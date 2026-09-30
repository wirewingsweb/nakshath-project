import { useRef, useState, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';
import SplitText from '@/components/SplitText';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const EASE = [0.22, 1, 0.36, 1];

/* ============================================================
   3D TILT HOOK — mouse-following rotateX/rotateY with spring
   ============================================================ */
const useTilt = ({ max = 8, scale = 1.02 } = {}) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovered: false });

  const onMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x: py * -max, y: px * max, hovered: true });
    },
    [max]
  );

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, hovered: false });
  }, []);

  return { ref, tilt, onMove, onLeave, scale };
};

/* ============================================================
   TILT WRAPPER — 3D perspective container
   ============================================================ */
const TiltCard = ({
  children,
  className = '',
  max = 8,
  scale = 1.02,
  style = {},
}) => {
  const { ref, tilt, onMove, onLeave } = useTilt({ max, scale });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: '1400px', ...style }}
      className={className}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: tilt.hovered ? scale : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 18, mass: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ============================================================
   HELPERS
   ============================================================ */
const BlurPara = ({ children, delay = 0, className = '' }) => (
  <motion.p
    initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, amount: 0 }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.p>
);

/* ============================================================
   ARENA IMAGE — 3D with layered Z-depth
   ============================================================ */
const ArenaImage3D = ({ src, alt, index, delay = 0, aspect = 'aspect-[4/3]' }) => (
  <TiltCard max={9} scale={1.03}>
    <div className="group relative w-full">
      <div className="relative w-full overflow-hidden rounded-3xl bg-[#0C0922] shadow-[0_30px_70px_-25px_rgba(12,9,34,0.55)]">
        <div className={`relative ${aspect} w-full overflow-hidden`}>
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.18, filter: 'blur(14px) brightness(0.7)' }}
            whileInView={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.6, delay: delay + 0.1, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,_rgba(201,162,39,0.22),_transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ transform: 'translateZ(15px)' }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/60"
          style={{ transform: 'translateZ(20px)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -8 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="pointer-events-none absolute -right-5 -top-5 z-20 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A227]/50 bg-[#0C0922] shadow-[0_20px_40px_-15px_rgba(201,162,39,0.4)] backdrop-blur-md"
        style={{ transform: 'translateZ(70px)' }}
      >
        <span className="font-serif text-2xl italic leading-none text-[#C9A227] tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>
    </div>
  </TiltCard>
);

/* ============================================================
   ARENA TEXT — 3D lifted text block
   ============================================================ */
const ArenaText3D = ({ item, delay = 0, titleClass = 'type-card-title' }) => (
  <TiltCard max={5} scale={1.01}>
    <div className="relative">
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.2, ease: EASE }}
        className="pointer-events-none absolute -left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-[#C9A227] via-[#C9A227]/40 to-transparent md:block"
        style={{ transform: 'translateZ(30px)' }}
      />

      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.2, ease: EASE }}
        className="mb-5"
        style={{ transform: 'translateZ(40px)' }}
      >
        <Badge
          variant="outline"
          className="rounded-full border-[#C9A227]/50 bg-transparent px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#876B18] hover:bg-transparent"
        >
          {item.label}
        </Badge>
      </motion.div>

      <h3 className={`${titleClass} mb-4 text-[#1A1A1A]`} style={{ transform: 'translateZ(50px)' }}>
        <SplitText
          text={item.title}
          className="inline-block"
          delay={delay + 0.35}
          duration={0.7}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.15}
          rootMargin="0px"
          textAlign="left"
        />
      </h3>

      <BlurPara
        delay={delay + 0.75}
        className="text-[#5A5A66] font-normal leading-relaxed"
      >
        {item.desc}
      </BlurPara>
    </div>
  </TiltCard>
);

/* ============================================================
   ARENA BLOCK — 50/50 layout, image + text peel in opposite
   directions as the section scrolls.
   ============================================================ */
const ArenaBlock3D = ({ item, index, reverse = false, progress }) => {
  const shouldReduce = useReducedMotion();
  const range = 3.5 + (index % 2) * 1.5; // 3.5 / 5 / 3.5 %

  const imageY = useTransform(
    progress,
    [0, 0.5, 1],
    [`${range}%`, '0%', `${-range}%`]
  );
  const imageY_s = useSpring(imageY, {
    stiffness: 85,
    damping: 28,
    mass: 0.65,
  });

  const textY = useTransform(
    progress,
    [0, 0.5, 1],
    [`${-range * 0.55}%`, '0%', `${range * 0.55}%`]
  );
  const textY_s = useSpring(textY, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  return (
    <div
      className={`flex flex-col items-center gap-10 lg:gap-16 ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      <motion.div
        style={{
          y: shouldReduce ? 0 : imageY_s,
          willChange: 'transform',
        }}
        className="w-full lg:w-1/2"
      >
        <ArenaImage3D
          src={item.img}
          alt={item.title}
          index={index}
          delay={0.2}
          aspect="aspect-[4/3]"
        />
      </motion.div>
      <motion.div
        style={{
          y: shouldReduce ? 0 : textY_s,
          willChange: 'transform',
        }}
        className="w-full lg:w-1/2"
      >
        <ArenaText3D item={item} delay={0.2} />
      </motion.div>
    </div>
  );
};

/* ============================================================
   WIDE ARENA BLOCK — 58/42 layout for the fourth block.
   Extracted into its own component so hooks stay at top level
   (fixes the IIFE-hook violation from the previous version).
   ============================================================ */
const WideArenaBlock3D = ({ item, index, reverse = false, progress }) => {
  const shouldReduce = useReducedMotion();

  const imageY = useTransform(progress, [0, 0.5, 1], ['5%', '0%', '-5%']);
  const imageY_s = useSpring(imageY, {
    stiffness: 85,
    damping: 28,
    mass: 0.65,
  });

  const textY = useTransform(progress, [0, 0.5, 1], ['-2.8%', '0%', '2.8%']);
  const textY_s = useSpring(textY, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  return (
    <div
      className={`flex flex-col items-center gap-10 lg:gap-16 ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      <motion.div
        style={{
          y: shouldReduce ? 0 : imageY_s,
          willChange: 'transform',
        }}
        className="w-full lg:w-[58%]"
      >
        <ArenaImage3D
          src={item.img}
          alt={item.title}
          index={index}
          delay={0.25}
          aspect="aspect-[16/10]"
        />
      </motion.div>
      <motion.div
        style={{
          y: shouldReduce ? 0 : textY_s,
          willChange: 'transform',
        }}
        className="w-full lg:w-[42%]"
      >
        <ArenaText3D
          item={item}
          delay={0.25}
          titleClass="type-section-title"
        />
      </motion.div>
    </div>
  );
};

/* ============================================================
   HORSES LIVE — interactive hover index + scroll camera
   ============================================================ */
const HorsesLiveSection = ({ stables }) => {
  const [active, setActive] = useState(0);
  const shouldReduce = useReducedMotion();

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], ['3.5%', '0%', '-3.5%']);
  const imageY_s = useSpring(imageY, {
    stiffness: 85,
    damping: 28,
    mass: 0.65,
  });

  const textY = useTransform(scrollYProgress, [0, 0.5, 1], ['-1.8%', '0%', '1.8%']);
  const textY_s = useSpring(textY, { stiffness: 90, damping: 28, mass: 0.6 });

  const orbY = useTransform(scrollYProgress, [0, 0.5, 1], ['4%', '0%', '-4%']);
  const orbY_s = useSpring(orbY, { stiffness: 80, damping: 28, mass: 0.7 });

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0C0922] py-24"
    >
      {/* Ambient gold orb — drifts with scroll */}
      <motion.div
        style={{
          y: shouldReduce ? 0 : orbY_s,
          willChange: 'transform',
        }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, ease: EASE }}
          className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#C9A227]/8 blur-[140px]"
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Image column — drifts one direction */}
          <motion.div
            style={{
              y: shouldReduce ? 0 : imageY_s,
              willChange: 'transform',
            }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="lg:col-span-5"
          >
            <TiltCard max={6} scale={1.01}>
              <div className="group relative overflow-hidden rounded-2xl bg-[#0C0922] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)]">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <motion.img
                    src="/horse live.webp"
                    alt="Stables interior"
                    loading="lazy"
                    decoding="async"
                    initial={{ scale: 1.12, filter: 'brightness(0.7) blur(8px)' }}
                    whileInView={{ scale: 1, filter: 'brightness(1) blur(0px)' }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0922] via-[#0C0922]/30 to-transparent" />

                  <div className="pointer-events-none absolute bottom-6 left-6 z-10 flex items-end gap-4">
                    <div className="relative h-[5.5rem] w-[7rem] overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={active}
                          initial={{ y: '60%', opacity: 0, filter: 'blur(8px)' }}
                          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                          exit={{ y: '-60%', opacity: 0, filter: 'blur(8px)' }}
                          transition={{ duration: 0.65, ease: EASE }}
                          className="absolute inset-0 flex items-end font-serif text-[5rem] italic leading-none text-[#C9A227] tabular-nums"
                        >
                          {String(active + 1).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <div className="pb-3">
                      <p className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-white/50">
                        Now viewing
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={active}
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -8, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="font-serif text-base text-white"
                        >
                          {stables[active].title}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/40" />

                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,_rgba(201,162,39,0.20),_transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ transform: 'translateZ(15px)' }}
                  />
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Text column — drifts the opposite direction */}
          <motion.div
            style={{
              y: shouldReduce ? 0 : textY_s,
              willChange: 'transform',
            }}
            className="lg:col-span-7"
          >
            <motion.h4
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-4 text-[#C9A227] type-eyebrow"
            >
              Equestrian Core
            </motion.h4>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="type-section-title mb-10 text-white"
            >
              Where the horses live.
            </motion.h2>

            <div className="relative">
              <span className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-white/10 md:block" />
              <motion.span
                animate={{ scaleY: (active + 1) / stables.length }}
                transition={{ duration: 0.6, ease: EASE }}
                className="pointer-events-none absolute left-0 top-0 hidden h-full w-px origin-top bg-[#C9A227] md:block"
              />

              <div className="md:pl-8">
                {stables.map((item, idx) => {
                  const isActive = active === idx;
                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      onMouseEnter={() => setActive(idx)}
                      onFocus={() => setActive(idx)}
                      onClick={() => setActive(idx)}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.15 + idx * 0.1,
                        ease: EASE,
                      }}
                      className="group block w-full cursor-pointer border-b border-white/10 py-6 text-left last:border-b-0"
                    >
                      <div className="flex items-baseline gap-5">
                        <span
                          className={`font-serif text-xs italic tabular-nums transition-colors duration-500 ${
                            isActive ? 'text-[#C9A227]' : 'text-white/30'
                          }`}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`text-lg font-semibold uppercase tracking-[0.14em] transition-all duration-500 md:text-xl ${
                            isActive
                              ? 'text-[#C9A227]'
                              : 'text-white/70 group-hover:text-white'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="desc"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.55, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-lg pl-10 pt-4 text-sm font-normal leading-relaxed text-white/60">
                              {item.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: EASE }}
              className="mt-10 flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/40 md:pl-8"
            >
              <span className="h-px w-6 bg-[#C9A227]/60" />
              Hover a room to preview
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   BEYOND CARD — editorial magazine + scroll drift
   ============================================================ */
const BeyondCardEditorial = ({ item, idx, progress }) => {
  const shouldReduce = useReducedMotion();
  const tiltDirection = idx % 2 === 0 ? -1 : 1;
  const isOffset = idx % 2 === 1;

  const range = 3 + (idx % 2) * 2; // 3 / 5 %
  const driftY = useTransform(
    progress,
    [0, 0.5, 1],
    [`${range}%`, '0%', `${-range}%`]
  );
  const driftY_s = useSpring(driftY, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* OUTER — scroll drift */}
        <motion.div
          style={{
            y: shouldReduce ? 0 : driftY_s,
            willChange: 'transform',
          }}
        >
          {/* INNER — entrance tilt/rise */}
          <motion.div
            initial={{
              opacity: 0,
              rotate: tiltDirection * 5,
              y: 60,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              rotate: 0,
              y: 0,
              scale: 1,
            }}
            viewport={{ once: true, amount: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.15 + idx * 0.12,
              ease: EASE,
            }}
            style={{ transformOrigin: isOffset ? 'top left' : 'top right' }}
            className={`group relative cursor-pointer ${isOffset ? 'lg:mt-24' : ''}`}
          >
            <button type="button" className="block w-full cursor-pointer text-left">
              {/* Paper-drop shadow */}
              <motion.div
                initial={{ opacity: 0.5, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1.4, delay: 0.15 + idx * 0.12, ease: EASE }}
                className="pointer-events-none absolute -inset-x-2 bottom-0 h-12 translate-y-6 rounded-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(12,9,34,0.22),_transparent_70%)] blur-2xl"
              />

              {/* Image frame */}
              <div className="relative mb-6 overflow-hidden rounded-2xl bg-[#0C0922] shadow-[0_30px_60px_-30px_rgba(12,9,34,0.55)] transition-shadow duration-700 group-hover:shadow-[0_40px_80px_-30px_rgba(12,9,34,0.7)]">
                <motion.img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  initial={{ scale: 1.08, filter: 'brightness(0.85)' }}
                  whileInView={{ scale: 1, filter: 'brightness(1)' }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1.5, delay: 0.3 + idx * 0.12, ease: EASE }}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />

                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/50" />

                <motion.div
                  initial={{ opacity: 0, x: 12, y: -12 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.85 + idx * 0.12,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="pointer-events-none absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#0C0922]/80 font-serif text-sm italic text-[#C9A227] backdrop-blur-md"
                >
                  {String(idx + 1).padStart(2, '0')}
                </motion.div>

                <div className="pointer-events-none absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full border border-[#C9A227]/50 bg-[#0C0922]/85 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#C9A227] opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                  View
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>

              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.95 + idx * 0.12,
                  ease: EASE,
                }}
                className="mb-5 block h-px w-16 origin-left bg-[#C9A227] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-24"
              />

              <h4 className="mb-2 text-xl font-bold uppercase tracking-wider text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#876B18] md:text-2xl">
                <SplitText
                  text={item.title}
                  className="inline-block"
                  delay={1.05 + idx * 0.12}
                  duration={0.65}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: 26 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.15}
                  rootMargin="0px"
                  textAlign="left"
                />
              </h4>

              <motion.p
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.3 + idx * 0.12,
                  ease: EASE,
                }}
                className="text-sm leading-relaxed text-[#5A5A66]"
              >
                {item.desc}
              </motion.p>
            </button>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent
        className="max-w-4xl border-[#C9A227]/30 bg-[#0C0922] p-0 sm:rounded-2xl [&>button]:text-white [&>button]:opacity-70 [&>button:hover]:opacity-100 [&>button:hover]:text-[#C9A227]"
        showCloseButton
      >
        <div className="overflow-hidden rounded-2xl">
          <img
            src={item.img}
            alt={item.title}
            className="h-auto max-h-[65vh] w-full object-cover"
          />
          <div className="flex items-center justify-between gap-6 border-t border-white/10 px-6 py-5">
            <div>
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-[#C9A227]">
                Beyond the Arena · {String(idx + 1).padStart(2, '0')}
              </p>
              <p className="mt-1 font-serif text-xl text-white">{item.title}</p>
            </div>
            <p className="max-w-xs text-right text-sm leading-relaxed text-white/60">
              {item.desc}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ============================================================
   MAIN PAGE
   ============================================================ */
const Facilities = () => {
  const shouldReduce = useReducedMotion();

  /* -------- Scroll cameras -------- */

  // 1. Header orb drift
  const headerRef = useRef(null);
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(headerProgress, [0, 1], ['0%', '45%']);
  const orbY_s = useSpring(orbY, { stiffness: 80, damping: 28, mass: 0.7 });

  // 2. Arenas section — one tracker, feeds all four blocks
  const arenasRef = useRef(null);
  const { scrollYProgress: arenasProgress } = useScroll({
    target: arenasRef,
    offset: ['start end', 'end start'],
  });

  // 3. Beyond cards — one tracker, feeds all four cards
  const beyondRef = useRef(null);
  const { scrollYProgress: beyondProgress } = useScroll({
    target: beyondRef,
    offset: ['start end', 'end start'],
  });

  /* -------- Data -------- */
  const arenas = [
    {
      title: 'Indoor Arena',
      label: 'All-Weather',
      desc: 'A covered arena built so training does not stop for monsoon or for summer heat. International-standard geotextile footing, consistent underfoot, and lower injury risk for horse and rider.',
      img: '/indoor arena.webp',
    },
    {
      title: 'Outdoor Arena',
      label: 'Sand Surface',
      desc: 'An open sand arena for jumping and flatwork in good weather, with the space to ride a full course and the light to shoot in early morning or late evening.',
      img: '/outdoor arena.webp',
    },
    {
      title: 'Dressage Arena',
      label: 'Standard Dimensions',
      desc: 'Built to competition dimensions, so riders practice on the same geometry they will be marked on. The riding area is larger than most people expect.',
      img: '/dressage arena.webp',
    },
    {
      title: 'Lunging Pen',
      label: 'Groundwork',
      desc: "A circular pen for working horses on the lunge — warming up, schooling young horses, and teaching riders to read a horse's movement from the ground.",
      img: '/lunging pen.webp',
    },
  ];

  const stables = [
    {
      title: 'Stables',
      desc: 'Individual stalls with feeding and grooming areas. Each horse has its own routine, its own space, and the same handlers every day.',
    },
    {
      title: 'Saddle Room',
      desc: 'Tack stored, cleaned and checked in one place. Every saddle is inspected after every ride.',
    },
    {
      title: 'Medical Room',
      desc: 'A dedicated space for treatment and recovery — for horses and for riders, staffed and equipped for both.',
    },
    {
      title: 'Tack Shop',
      desc: 'Riding gear and equipment on site. Helmets, boots, gloves, and anything else you may need before your first ride.',
    },
  ];

  const beyond = [
    { title: 'Café', desc: 'Warm stone, arches, open through the day.', img: '/cafe.webp' },
    { title: 'Common Pavilion', desc: 'Shade and seating for spectators and families.', img: '/common pavillion.webp' },
    { title: 'Lounge Space', desc: 'Open landscaped areas across the campus.', img: '/lounge.webp' },
    { title: 'Cottages', desc: 'For visiting riders, trainers and guests.', img: '/cottages.webp' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">

      {/* ====== HEADER — floating 3D text layers ====== */}
      <div
        ref={headerRef}
        className="nav-dark-hero relative overflow-hidden bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44"
        style={{ perspective: '1400px' }}
      >
        {/* Gold orb — scroll drift wrapper */}
        <motion.div
          style={{
            y: shouldReduce ? 0 : orbY_s,
            willChange: 'transform',
          }}
          className="pointer-events-none absolute inset-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2, ease: EASE }}
            className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#C9A227]/10 blur-[140px]"
            style={{ transform: 'translateZ(-100px)' }}
          />
        </motion.div>

        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 18, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-[-10%] opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(201,162,39,1) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.h4
            variants={fadeInUp}
            className="mb-4 text-[#C9A227] type-eyebrow"
            style={{ transform: 'translateZ(20px)' }}
          >
            The Property
          </motion.h4>
          <motion.h1
            variants={fadeInUp}
            className="type-page-title mb-4 leading-tight text-white"
            style={{ transform: 'translateZ(50px)' }}
          >
            Built to be trained on,
            <br />
            not looked at.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="type-lead text-white/70"
            style={{ transform: 'translateZ(30px)' }}
          >
            Indoor arena, lunging pen, stables and a café, on one campus in
            Sarjapura.
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
            className="mt-10 block h-px w-32 origin-left bg-[#C9A227]/70"
            style={{ transform: 'translateZ(40px)' }}
          />
        </motion.div>
      </div>

      {/* ====== ARENAS — 3D tilt cards + scroll peel ====== */}
      <div
        ref={arenasRef}
        className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-24"
        style={{ perspective: '1600px' }}
      >
        <div className="space-y-20 lg:space-y-28">
          <div className="mx-auto max-w-7xl px-6">
            <ArenaBlock3D
              item={arenas[0]}
              index={0}
              progress={arenasProgress}
            />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <ArenaBlock3D
              item={arenas[1]}
              index={1}
              reverse
              progress={arenasProgress}
            />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <ArenaBlock3D
              item={arenas[2]}
              index={2}
              progress={arenasProgress}
            />
          </div>

          {/* Fourth block — wide layout, uses WideArenaBlock3D */}
          <div className="w-full bg-[#F2F0EB] py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <WideArenaBlock3D
                item={arenas[3]}
                index={3}
                reverse
                progress={arenasProgress}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====== WHERE THE HORSES LIVE ====== */}
      <HorsesLiveSection stables={stables} />

      {/* ====== BEYOND THE ARENA — editorial + scroll drift ====== */}
      <div
        ref={beyondRef}
        className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24"
        style={{ perspective: '1600px' }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={staggerContainer}
          >
            <motion.h4 variants={fadeInUp} className="mb-4 text-[#876B18] type-eyebrow">
              Beyond the Arena
            </motion.h4>
            <motion.h2
              variants={fadeInUp}
              className="type-section-title mb-12 text-[#1A1A1A]"
            >
              Somewhere to wait, and somewhere to stay.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-20 lg:grid-cols-2 lg:gap-y-8">
            {beyond.map((item, idx) => (
              <BeyondCardEditorial
                key={idx}
                item={item}
                idx={idx}
                progress={beyondProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;