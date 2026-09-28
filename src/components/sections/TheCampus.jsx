import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { EASE } from '../../utils/landing-motion';

const facilities = [
  { image: '/page 7 1 gpt.webp', title: 'Indoor Arena', detail: 'All-weather', position: '50% 58%' },
  { image: '/page 7 2 gpt.webp', title: 'Outdoor Arena', detail: 'Sand surface', position: '50% 48%' },
  { image: '/page 7 3 gpt.webp', title: 'Stables', detail: 'Individual stalls', position: '50% 55%' },
  { image: '/page 7 4 gpt.webp', title: 'Café', detail: 'Open to visitors', position: '50% 52%' },
  { image: '/page 7 5 gpt.webp', title: 'Cottages', detail: 'On-site stay', position: '50% 55%' },
];

const CARD_WIDTH = 400;
const CARD_HEIGHT = 540;
const AUTOPLAY_MS = 5500;
const SWIPE_THRESHOLD = 80;
const WHEEL_COOLDOWN_MS = 900;

/* ============================================================
   LETTER CASCADE — slower, more deliberate
   ============================================================ */
const CascadeText = ({ text, delay = 0 }) => {
  const chars = text.split('');
  return (
    <>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ opacity: 0, y: 50, rotateX: -90, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, delay: delay + i * 0.05, ease: EASE }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </>
  );
};

const TheCampus = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const autoplayRef = useRef(null);
  const wheelLockRef = useRef(false);
  const sectionRef = useRef(null);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % facilities.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
  }, []);

  useEffect(() => {
    if (isDragging) return undefined;
    autoplayRef.current = window.setInterval(goNext, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [isDragging, goNext]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 4) return;
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      if (delta > 0) goNext();
      else goPrev();
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, WHEEL_COOLDOWN_MS);
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, [goNext, goPrev]);

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -SWIPE_THRESHOLD || velocity < -500) goNext();
    else if (offset > SWIPE_THRESHOLD || velocity > 500) goPrev();
    animate(x, 0, { duration: 0.4, ease: EASE });
  };

  const handleCardClick = (idx) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const getOffset = (idx) => {
    const total = facilities.length;
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FDFCFA] py-24 md:pt-[6vw] md:pb-[6vw]"
    >
      {/* ==================================================
          Ambient glows — slow drift
          ================================================== */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227]/[0.06] blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[#876B18]/[0.04] blur-[120px]"
        />
      </div>

      {/* ==================================================
          HEADER
          ================================================== */}
      <div className="relative z-10 flex flex-col gap-6 px-6 sm:px-10 md:flex-row md:items-end md:justify-between md:px-[5.4vw]">
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="mb-5 flex items-center gap-3"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
            />
            <span className="text-[#876B18] type-eyebrow">The Campus</span>
          </motion.div>

          {/* Title with letter cascade — slower */}
          <h2 className="type-page-title text-[#1A1A1A]">
            <CascadeText text="Everything on" delay={0.4} />
            <br />
            <CascadeText text="one property." delay={1.1} />
          </h2>

          {/* Drawing gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, delay: 2, ease: EASE }}
            className="mt-7 h-[2px] w-20 origin-left bg-[#C9A227]/60"
          />
        </div>

        {/* Editorial right-side counter — replaces the "Scroll · Drag · Auto" line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="flex items-center gap-4"
        >
          {/* Divider */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 1.2, ease: EASE }}
            className="hidden h-px w-14 origin-right bg-[#876B18]/40 md:block"
          />
          <span className="font-serif text-sm italic tabular-nums text-[#1A1A1A]/50">
            <span className="text-[#876B18]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="mx-2 text-[#1A1A1A]/25">/</span>
            {String(facilities.length).padStart(2, '0')}
          </span>
        </motion.div>
      </div>

      {/* ==================================================
          3D COVER FLOW
          ================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
        className="relative z-10 mt-20 md:mt-28"
      >
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{
            width: '100%',
            height: CARD_HEIGHT + 100,
            perspective: 1600,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
          >
            {facilities.map((facility, idx) => {
              const offset = getOffset(idx);
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;

              const translateX = offset * (CARD_WIDTH * 0.52);
              const rotateY = offset * -32;
              const scale = isActive ? 1 : Math.max(0.55, 1 - absOffset * 0.16);
              const opacity = absOffset > 2 ? 0 : isActive ? 1 : Math.max(0.4, 0.75 - absOffset * 0.2);
              const zIndex = 100 - absOffset;
              const translateZ = isActive ? 60 : -Math.abs(offset) * 140;

              return (
                <motion.div
                  key={facility.title}
                  onClick={() => handleCardClick(idx)}
                  animate={{ x: translateX, rotateY, scale, opacity, zIndex }}
                  transition={{
                    duration: isDragging ? 0 : 1.4,
                    ease: EASE,
                  }}
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    transformStyle: 'preserve-3d',
                    zIndex,
                    position: 'absolute',
                    translateZ,
                  }}
                  whileHover={
                    !isActive
                      ? { scale: scale + 0.05, opacity: opacity + 0.15, transition: { duration: 0.5 } }
                      : {}
                  }
                  className={`group relative overflow-hidden rounded-3xl bg-[#0C0922] transition-shadow duration-1000 ${
                    isActive
                      ? 'cursor-default shadow-[0_40px_100px_-30px_rgba(201,162,39,0.5),0_30px_80px_-30px_rgba(12,9,34,0.4)]'
                      : 'cursor-pointer shadow-[0_20px_50px_-25px_rgba(12,9,34,0.25)]'
                  }`}
                >
                  {/* Image */}
                  <motion.img
                    src={facility.image}
                    alt={facility.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    animate={{
                      scale: isActive ? 1 : 1.06,
                      filter: isActive
                        ? 'brightness(1.05) contrast(1.05) saturate(1.1)'
                        : 'brightness(0.72) saturate(0.85)',
                    }}
                    transition={{ duration: 1.6, ease: EASE }}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: facility.position }}
                  />

                  {/* Overlay */}
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0.55 }}
                    transition={{ duration: 1.2, ease: EASE }}
                    className={`pointer-events-none absolute inset-0 ${
                      isActive
                        ? 'bg-gradient-to-t from-[#0C0922]/85 via-transparent to-transparent [mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_60%)]'
                        : 'bg-[#0C0922]/35'
                    }`}
                  />

                  {/* Gold sheen on active */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(201,162,39,0.06) 0%, transparent 40%, transparent 60%, rgba(201,162,39,0.04) 100%)',
                      }}
                    />
                  )}

                  {/* Border ring */}
                  <motion.div
                    animate={{
                      borderColor: isActive
                        ? 'rgba(201,162,39,0.6)'
                        : 'rgba(255,255,255,0.12)',
                    }}
                    transition={{ duration: 1, ease: EASE }}
                    className="pointer-events-none absolute inset-0 rounded-3xl border"
                  />

                  {/* Active gold hairline top */}
                  {isActive && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
                      className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[#C9A227] via-[#C9A227]/70 to-transparent"
                    />
                  )}

                  {/* Active corner brackets — draw in */}
                  {isActive && (
                    <div className="pointer-events-none absolute inset-5">
                      <motion.div
                        initial={{ opacity: 0, x: -10, y: -10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: EASE }}
                        className="absolute left-0 top-0 h-5 w-5 border-l border-t border-[#C9A227]/70"
                      />
                      <motion.div
                        initial={{ opacity: 0, x: 10, y: 10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, delay: 0.65, ease: EASE }}
                        className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-[#C9A227]/70"
                      />
                    </div>
                  )}

                  {/* Editorial number */}
                  <motion.span
                    animate={{
                      color: isActive ? '#C9A227' : 'rgba(255,255,255,0.55)',
                    }}
                    transition={{ duration: 1, ease: EASE }}
                    className="pointer-events-none absolute left-6 top-5 font-mono text-[10px] font-medium uppercase tracking-[0.24em]"
                  >
                    {String(idx + 1).padStart(2, '0')} / {String(facilities.length).padStart(2, '0')}
                  </motion.span>

                  {/* Content */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-7 text-white">
                    <motion.div
                      animate={{
                        width: isActive ? 48 : 32,
                        backgroundColor: isActive
                          ? 'rgba(201,162,39,0.8)'
                          : 'rgba(201,162,39,0.5)',
                      }}
                      transition={{ duration: 0.9, ease: EASE }}
                      className="mb-4 h-px"
                    />
                    <motion.h3
                      animate={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.8)' }}
                      transition={{ duration: 0.9, ease: EASE }}
                      className="font-serif text-2xl leading-tight tracking-tight"
                    >
                      {facility.title}
                    </motion.h3>
                    <motion.p
                      animate={{
                        color: isActive ? '#C9A227' : 'rgba(201,162,39,0.7)',
                      }}
                      transition={{ duration: 0.9, ease: EASE }}
                      className="mt-2 text-[10px] font-semibold uppercase tracking-[0.28em]"
                    >
                      {facility.detail}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Floor glow — slow pulse */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute bottom-4 left-1/2 h-40 w-[75%] max-w-[900px] -translate-x-1/2"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0) 65%)',
          }}
        />

        {/* Side edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#FDFCFA] to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#FDFCFA] to-transparent md:w-40" />
      </motion.div>

      {/* ==================================================
          SEE ALL
          ================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.8, ease: EASE }}
        className="relative z-10 mt-20 flex justify-center pl-6 pr-6 md:mt-24 md:justify-start md:pl-[5.4vw]"
      >
        <Button
          asChild
          variant="ghost"
          className="h-auto rounded-none border-b border-[#876B18] px-0 pb-1 text-xs font-semibold text-[#1A1A1A] transition-colors hover:bg-transparent hover:text-[#876B18]"
        >
          <Link to="/facilities">See all facilities</Link>
        </Button>
      </motion.div>
    </section>
  );
};

export default TheCampus;