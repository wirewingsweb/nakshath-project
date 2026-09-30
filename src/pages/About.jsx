import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import Footer from '../components/Footer';

const EASE = [0.22, 1, 0.36, 1];

/* ============================================================
   SPLIT-LINE REVEAL
   ============================================================ */
const RevealLine = ({ children, delay = 0, className = '' }) => (
  <span className="block overflow-hidden">
    <motion.span
      initial={{ y: '110%', opacity: 0 }}
      whileInView={{ y: '0%', opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={`block ${className}`}
    >
      {children}
    </motion.span>
  </span>
);

/* ============================================================
   WORD CASCADE
   ============================================================ */
const WordCascade = ({ text, delay = 0, className = '' }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.06,
            ease: EASE,
          }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* ============================================================
   EYEBROW
   ============================================================ */
const Eyebrow = ({ children, delay = 0, className = '' }) => (
  <motion.h4
    initial={{ opacity: 0, letterSpacing: '0.05em' }}
    whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
    viewport={{ once: true, amount: 0 }}
    transition={{ duration: 1.2, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.h4>
);

/* ============================================================
   SIDEBAR CATEGORY BLOCK
   ============================================================ */
const SidebarCategory = ({ index, cat, baseDelay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.8,
        delay: baseDelay,
        ease: EASE,
      }}
      className="group/cat relative pb-4 last:pb-0"
    >
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-serif text-[0.8rem] leading-none text-[#C9A227]/60 transition-colors duration-500 group-hover/cat:text-[#C9A227]">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#C9A227] transition-all duration-500 group-hover/cat:tracking-[0.28em]">
          {cat.label}
        </span>
      </div>

      <div className="relative mb-3 h-px w-full overflow-hidden bg-[#C9A227]/20">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 0.9,
            delay: baseDelay + 0.4,
            ease: EASE,
          }}
          className="block h-full w-full origin-left bg-[#C9A227]/40"
        />
        <span className="absolute inset-0 origin-left scale-x-0 bg-[#C9A227] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cat:scale-x-100" />
      </div>

      <ul className="space-y-1.5">
        {cat.items.map((item, i) => {
          const match = item.match(/^(\d+)\.\s*(.+)$/);
          const num = match ? match[1] : null;
          const name = match ? match[2] : item;

          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{
                duration: 0.5,
                delay: baseDelay + 0.5 + i * 0.06,
                ease: EASE,
              }}
              whileHover={{ x: 4 }}
              className="group/item flex items-center gap-2.5 text-[0.75rem] leading-[1.45] text-white/70 transition-colors duration-300 hover:text-[#C9A227]"
            >
              {num ? (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/30 font-serif text-[0.55rem] font-semibold text-[#C9A227]/70 transition-all duration-300 group-hover/item:border-[#C9A227] group-hover/item:bg-[#C9A227] group-hover/item:text-[#0C0922]">
                  {num}
                </span>
              ) : (
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#C9A227]/40 transition-all duration-300 group-hover/item:w-3 group-hover/item:bg-[#C9A227]" />
              )}
              <span className="font-normal">{name}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

/* ============================================================
   CAMPUS MAP — Magnetic hover + hover-to-expand
   ============================================================ */
const CampusMap = () => {
  const siteMapCategories = [
    { label: 'Equestrian Core', items: ['1. Indoor Arena', '2. Outdoor Arena', '3. Lunging Pen', '4. Dressage Arena', '5. Stables & Storage Rooms', '6. Tack Shop'] },
    { label: 'Service', items: ['Office & Admin', 'Buggy Point', 'Security Cabin', 'Staff Accommodation'] },
    { label: 'Public', items: ['Café', 'Gallery'] },
    { label: 'Hospitality', items: ['Cottages', 'Common Pavilion'] },
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const cardRef = useRef(null);
  const lockTimerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 18, mass: 0.5 };
  const translateX = useSpring(mouseX, springConfig);
  const translateY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(translateY, [-30, 30], [4, -4]);
  const rotateY = useTransform(translateX, [-30, 30], [-4, 4]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 60;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeaveInline = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isExpanded) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsExpanded(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isExpanded]);

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current);
    };
  }, []);

  const expand = () => {
    if (isLocked) return;
    setIsExpanded(true);
  };

  const collapse = () => {
    setIsExpanded(false);
    setIsLocked(true);
    if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current);
    lockTimerRef.current = window.setTimeout(() => setIsLocked(false), 500);
  };

  return (
    <>
      {/* ===== ELEVATED CARD ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
        className="relative w-full overflow-hidden rounded-3xl bg-[#FDFCFA] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)]"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
          className="absolute left-0 top-0 z-20 h-[2px] w-full origin-left bg-gradient-to-r from-[#C9A227] via-[#C9A227]/70 to-transparent"
        />

        <div className="grid grid-cols-1 items-stretch gap-0 md:grid-cols-[minmax(0,1.6fr)_minmax(15rem,1fr)]">
          {/* ====== MAGNETIC MAP (left) ====== */}
          <motion.div
            ref={cardRef}
            onMouseEnter={expand}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeaveInline}
            style={{ transformPerspective: 1200, rotateX, rotateY }}
            className="group relative min-h-[24rem] cursor-zoom-in overflow-hidden bg-[#F5F1E8] p-6 md:min-h-[32rem] md:p-10"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(12,9,34,1) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <motion.div
              style={{ x: translateX, y: translateY }}
              className="absolute inset-0 flex items-center justify-center p-6 md:p-10"
            >
              <motion.img
                src="/page 3 gpt.webp"
                alt="Campus Map"
                loading="lazy"
                decoding="async"
                initial={{ scale: 1.12, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
                className="block h-full w-full object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(201,162,39,0.12),_transparent_65%)]"
            />

            <motion.div
              style={{ x: translateX, y: translateY }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              <div className="h-24 w-24 rounded-full border border-[#C9A227]/30" />
            </motion.div>
          </motion.div>

          {/* ====== SIDEBAR (right) ====== */}
          <div className="relative flex flex-col justify-center gap-8 border-t border-[#1A1A1A]/10 bg-[#0C0922] px-6 py-8 sm:grid-cols-2 md:border-l md:border-t-0 md:px-8 md:py-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#C9A227]/10 blur-[60px]" />

            {siteMapCategories.map((cat, catIdx) => (
              <SidebarCategory
                key={catIdx}
                index={catIdx}
                cat={cat}
                baseDelay={0.6 + catIdx * 0.15}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ============================================================
         FULLSCREEN — map only
         ============================================================ */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onMouseLeave={collapse}
            onClick={collapse}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(24px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.5 }}
              className="pointer-events-none absolute inset-0 bg-[#0C0922]/75"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="h-[70vh] w-[70vh] max-w-[700px] rounded-full bg-[#C9A227]/12 blur-[120px]" />
            </motion.div>

            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-[1300px] items-center justify-center"
              style={{
                filter:
                  'drop-shadow(0 40px 100px rgba(0,0,0,0.6)) drop-shadow(0 0 80px rgba(201,162,39,0.15))',
              }}
            >
              <img
                src="/page 3 gpt.webp"
                alt="Campus Map — Fullscreen"
                className="block max-h-[85vh] w-auto max-w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ============================================================
   PRACTICE ROW — differential scroll drift per row
   ============================================================ */
const PracticeRow = ({ item, idx, progress }) => {
  const shouldReduce = useReducedMotion();
  const range = 1.2 + (idx % 3) * 0.8; // 1.2 / 2 / 2.8 %
  const y = useTransform(
    progress,
    [0, 0.5, 1],
    [`${range}%`, '0%', `${-range}%`]
  );
  const y_s = useSpring(y, { stiffness: 90, damping: 26, mass: 0.6 });

  return (
    <motion.div
      style={{
        y: shouldReduce ? 0 : y_s,
        willChange: 'transform',
      }}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.4 + idx * 0.08,
        ease: EASE,
      }}
      className="group relative flex flex-col md:flex-row md:items-center border-b border-[#5A5A66]/20 pb-8"
    >
      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
      <h4 className="w-full md:w-1/2 text-lg md:text-xl font-serif text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#876B18]">
        {item.title}
      </h4>
      <p className="w-full md:w-1/2 text-sm md:text-base text-[#5A5A66] font-normal md:pl-8 leading-relaxed">
        {item.desc}
      </p>
    </motion.div>
  );
};

/* ============================================================
   MAIN ABOUT PAGE
   ============================================================ */
const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /* ============================================================
     Scroll cameras — one per section
     ============================================================ */

  // 1. Header — ambient gold orbs drift as you scroll past the hero
  const headerRef = useRef(null);
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(headerProgress, [0, 1], ['0%', '42%']);
  const orbY_s = useSpring(orbY, { stiffness: 80, damping: 28, mass: 0.7 });

  // 2. Founder — portrait peels away from text (opposite Y drift)
  const founderRef = useRef(null);
  const { scrollYProgress: founderProgress } = useScroll({
    target: founderRef,
    offset: ['start end', 'end start'],
  });
  const portraitY = useTransform(founderProgress, [0, 0.5, 1], ['4%', '0%', '-4%']);
  const portraitY_s = useSpring(portraitY, {
    stiffness: 85,
    damping: 28,
    mass: 0.65,
  });
  const textY = useTransform(founderProgress, [0, 0.5, 1], ['-1.8%', '0%', '1.8%']);
  const textY_s = useSpring(textY, { stiffness: 90, damping: 28, mass: 0.6 });

  // 3. Practice — differential float per row
  const practiceRef = useRef(null);
  const { scrollYProgress: practiceProgress } = useScroll({
    target: practiceRef,
    offset: ['start end', 'end start'],
  });

  // 4. Vision / Mission — opposite drift on two columns
  const visionRef = useRef(null);
  const { scrollYProgress: visionProgress } = useScroll({
    target: visionRef,
    offset: ['start end', 'end start'],
  });
  const visionY = useTransform(visionProgress, [0, 0.5, 1], ['2.5%', '0%', '-2.5%']);
  const visionY_s = useSpring(visionY, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });
  const missionY = useTransform(visionProgress, [0, 0.5, 1], ['-2.5%', '0%', '2.5%']);
  const missionY_s = useSpring(missionY, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  // 5. Campus — outer section counter-drift, map gets its own float
  const campusRef = useRef(null);
  const { scrollYProgress: campusProgress } = useScroll({
    target: campusRef,
    offset: ['start end', 'end start'],
  });
  const campusY = useTransform(campusProgress, [0, 0.5, 1], ['1.2%', '0%', '-1.2%']);
  const campusY_s = useSpring(campusY, {
    stiffness: 95,
    damping: 28,
    mass: 0.55,
  });
  const mapY = useTransform(campusProgress, [0, 0.5, 1], ['-3.5%', '0%', '3.5%']);
  const mapY_s = useSpring(mapY, { stiffness: 85, damping: 28, mass: 0.65 });

  const practiceItems = [
    { title: 'Coaching from inside the competitive system', desc: "Technique taught the way it's judged, not the way it's improvised." },
    { title: 'A covered arena, so the calendar doesn\'t break', desc: 'Bengaluru loses riding days to monsoon and to summer afternoons. Ours don\'t stop.' },
    { title: 'International-standard geotextile footing', desc: 'The surface used at competition venues — consistent grip, cushioning, and lower injury risk.' },
    { title: 'Limited riders per batch', desc: 'Progress comes from corrected repetitions, which needs a coach watching one rider at a time.' },
    { title: 'A dressage arena built to standard dimensions', desc: "Riders practice on the same geometry they'll be marked on." },
  ];

  const achievements = [
    { title: 'Silver, CSIO* international show jumping', desc: "CSIO competitions are run under Fédération Equestre Internationale rules — the sport's world governing body. Competing at this level requires FEI registration and a qualifying record." },
    { title: 'Bronze, Junior National Championship 2025', desc: 'A national podium finish in the most recent championship year.' },
    { title: 'Long-listed, Team India Show Jumping, 2026 Asian Games', desc: "The selection pool from which India's continental squad is chosen." },
  ];

  return (
    <div className="min-h-screen bg-[#0C0922]">
      <div className="overflow-hidden bg-[#0C0922] pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* ============================================================
             WHO WE ARE — orbs drift on scroll
             ============================================================ */}
          <div
            ref={headerRef}
            className="nav-dark-hero relative pb-24 pt-32 md:pb-28 md:pt-44"
          >
            {/* Ambient gold orbs — parallax drift */}
            <motion.div
              style={{
                y: shouldReduce ? 0 : orbY_s,
                willChange: 'transform',
              }}
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#C9A227]/[0.07] blur-[140px]" />
            </motion.div>

            <Eyebrow delay={0.1} className="text-[#C9A227] type-eyebrow mb-6">
              Who We Are
            </Eyebrow>
            <h1 className="type-page-title text-white leading-tight mb-6">
              <RevealLine delay={0.25}>Built by a Rider.</RevealLine>
              <RevealLine delay={0.4}>Designed for Riders.</RevealLine>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="text-white/70 text-base md:text-lg max-w-2xl"
            >
              Nakshath Equestrian Club is led by an active competitive rider with international show-jumping experience.
            </motion.p>
          </div>

          {/* ============================================================
             WHO LEADS THE ACADEMY — portrait peels away from text
             ============================================================ */}
          <div
            ref={founderRef}
            id="founder"
            className="relative left-1/2 z-10 -mt-12 w-screen -translate-x-1/2 overflow-hidden rounded-t-[3rem] bg-[#FDFCFA]"
          >
            <div className="mx-auto max-w-7xl px-6 py-24">
              <div className="flex flex-col lg:flex-row">
                {/* Portrait — drifts one direction */}
                <motion.div
                  style={{
                    y: shouldReduce ? 0 : portraitY_s,
                    willChange: 'transform',
                  }}
                  initial={{ opacity: 0, x: -40, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
                  className="w-full lg:w-1/2 relative min-h-[400px] md:min-h-[500px] lg:min-h-[700px] overflow-hidden flex items-center justify-center p-4 md:p-8"
                >
                  <div className="w-full lg:h-[85%] relative rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-black/5 aspect-[9/16] md:aspect-auto lg:aspect-auto md:h-[450px] bg-[#F2F0EB]">
                    <div
                      className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
                    >
                      <div className="relative h-full w-full shrink-0">
                        <img src="/founder 1.webp" alt="Nakshath Venkatesh" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      </div>
                      <div className="relative h-full w-full shrink-0">
                        <img src="/page 2 gpt.webp" alt="Nakshath with Horse" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                      <button
                        onClick={() => setCurrentSlide(0)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === 0 ? 'bg-[#C9A227] scale-110' : 'bg-[#5A5A66]/25'}`}
                        aria-label="Slide 1"
                      />
                      <button
                        onClick={() => setCurrentSlide(1)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === 1 ? 'bg-[#C9A227] scale-110' : 'bg-[#5A5A66]/25'}`}
                        aria-label="Slide 2"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Text — drifts the opposite direction (peel-away) */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <motion.div
                    style={{
                      y: shouldReduce ? 0 : textY_s,
                      willChange: 'transform',
                    }}
                  >
                    <Eyebrow delay={0.3} className="text-[#C9A227] type-eyebrow mb-4">
                      Who Leads The Academy
                    </Eyebrow>
                    <h2 className="text-[1.5rem] md:text-[2.25rem] font-serif text-[#1A1A1A] leading-[1.15] mb-2">
                      <WordCascade text="Nakshath Venkatesh" delay={0.45} />
                    </h2>
                    <motion.p
                      initial={{ opacity: 0, letterSpacing: '0.08em' }}
                      whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{ duration: 1.1, delay: 0.75, ease: EASE }}
                      className="text-[#C9A227] text-sm uppercase mb-8 border-b border-[#C9A227]/30 pb-4"
                    >
                      Founder
                    </motion.p>

                    <div className="space-y-6 mb-10">
                      {achievements.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0 }}
                          transition={{ duration: 0.8, delay: 0.85 + idx * 0.12, ease: EASE }}
                          className="relative pl-4"
                        >
                          <motion.span
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, amount: 0 }}
                            transition={{ duration: 0.9, delay: 0.9 + idx * 0.12, ease: EASE }}
                            className="absolute left-0 top-0 h-full w-[2px] origin-top bg-[#C9A227]/60"
                          />
                          <h4 className="text-[#1A1A1A] font-bold mb-1 text-base md:text-lg">{item.title}</h4>
                          <p className="text-[#5A5A66] text-sm font-normal leading-relaxed">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-4 text-sm md:text-base text-[#5A5A66] font-normal leading-relaxed">
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
                      >
                        Nakshath competes at both national and international level, and built this academy while still riding. The technique taught here is the technique he is judged on.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.8, delay: 1.42, ease: EASE }}
                      >
                        The club takes riders from a first session on a lead rein through to competition entry, in show jumping and dressage, on a campus built for training rather than display.
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.6, delay: 1.55 }}
                        className="relative pl-6 py-2 mt-6"
                      >
                        <motion.span
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, amount: 0 }}
                          transition={{ duration: 1.1, delay: 1.6, ease: EASE }}
                          className="absolute left-0 top-0 h-full w-[2px] origin-top bg-[#C9A227]"
                        />
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0 }}
                          transition={{ duration: 0.9, delay: 1.75, ease: EASE }}
                          className="text-[#1A1A1A]"
                        >
                          To create a world-class environment and a gateway to the Olympics, where riders of all levels can develop confidence, skill, and the mindset required to succeed in competitive equestrianism.
                        </motion.p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
             IN PRACTICE — differential float per row
             ============================================================ */}
          <div className="relative left-1/2 -mt-px mb-16 w-screen -translate-x-1/2 bg-[#FDFCFA] py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6 md:px-24">
              <div>
                <Eyebrow delay={0.15} className="text-[#C9A227] type-eyebrow mb-4">
                  In Practice
                </Eyebrow>
                <h2 className="type-section-title text-[#1A1A1A] mb-12">
                  <RevealLine delay={0.3}>What that means for a rider here.</RevealLine>
                </h2>
              </div>

              <div ref={practiceRef} className="space-y-6">
                {practiceItems.map((item, idx) => (
                  <PracticeRow
                    key={idx}
                    item={item}
                    idx={idx}
                    progress={practiceProgress}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================
             VISION & MISSION — opposite column drift
             ============================================================ */}
          <div
            ref={visionRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
          >
            <motion.div
              style={{
                y: shouldReduce ? 0 : visionY_s,
                willChange: 'transform',
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
                className="mb-6 block h-px w-16 origin-left bg-[#C9A227]/70"
              />
              <h3 className="text-xl md:text-2xl font-serif text-[#C9A227] mb-4">Vision</h3>
              <p className="text-white/80 font-normal leading-relaxed text-base">
                To create a world-class environment and a gateway to the Olympics, where riders of all levels can develop confidence, skill, and the mindset required to succeed in competitive equestrianism.
              </p>
            </motion.div>

            <motion.div
              style={{
                y: shouldReduce ? 0 : missionY_s,
                willChange: 'transform',
              }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: EASE }}
                className="mb-6 block h-px w-16 origin-left bg-[#C9A227]/70"
              />
              <h3 className="text-xl md:text-2xl font-serif text-[#C9A227] mb-4">Mission</h3>
              <p className="text-white/80 font-normal leading-relaxed text-base">
                To inspire discipline, strength, and excellence through world-class equestrian sports training and experiences in a professional, top-tier environment.
              </p>
            </motion.div>
          </div>

          {/* ============================================================
             THE CAMPUS — outer counter-drift, map gets its own float
             ============================================================ */}
          <motion.div
            ref={campusRef}
            style={{
              y: shouldReduce ? 0 : campusY_s,
              willChange: 'transform',
            }}
            className="relative mb-16"
          >
            <div className="relative rounded-[3rem] bg-[#0C0922] px-6 py-16 md:px-12 md:py-20">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10">
                <div className="space-y-8 text-base text-white/80 font-normal leading-relaxed">
                  <Eyebrow delay={0.15} className="text-[#C9A227] type-eyebrow mb-4">
                    The Campus
                  </Eyebrow>
                  <h2 className="type-section-title text-white mb-12">
                    <RevealLine delay={0.3}>One property,</RevealLine>
                    <RevealLine delay={0.45}>laid out for training.</RevealLine>
                  </h2>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
                  >
                    Three riding arenas sit at the centre of the site — a covered indoor arena, an outdoor arena, and a dressage arena built to standard competition dimensions. Stables, a lunging pen and the tack room sit alongside them.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
                  >
                    The café, pavilion and cottages are set apart from the working areas, so visitors and riders are never crossing the same ground.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
                  >
                    The campus is in its final phase of construction. Images shown are architectural drawings.
                  </motion.p>
                </div>

                {/* CampusMap gets its own deeper drift — flies slightly more than the section around it */}
                <motion.div
                  style={{
                    y: shouldReduce ? 0 : mapY_s,
                    willChange: 'transform',
                  }}
                >
                  <CampusMap />
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;