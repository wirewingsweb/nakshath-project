import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import ShinyText from '../../components/ShinyText';
import { EASE, EASE_SNAP } from '../../utils/landing-motion';

/* ============================================================
   ANIMATED COUNTER
   ============================================================ */
const AnimatedCounter = ({ value, prefix = '', suffix = '', duration = 1600 }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const target = value;
    let raf;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.floor(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};

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
   LEVEL CARD
   ============================================================ */
const LevelCard = ({ item, idx }) => {
  const [hovered, setHovered] = useState(false);
  const isDark = item.tone === 'dark';

  const numericPrice = parseInt(item.price.replace(/[^\d]/g, ''), 10);
  const numericLessons = parseInt(item.lessons, 10);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -32, x: -40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, rotateY: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.15, delay: 0.2 + idx * 0.18, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
      className="group relative"
    >
      <motion.div
        animate={{
          rotateX: hovered ? -4 : 0,
          rotateY: hovered ? 6 : 0,
          y: hovered ? -10 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.7 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative aspect-[1324/1188] overflow-hidden rounded-2xl bg-[#F2F0EB] shadow-[0_25px_60px_-25px_rgba(12,9,34,0.35)] transition-shadow duration-700 group-hover:shadow-[0_40px_90px_-30px_rgba(12,9,34,0.5)]"
      >
        <motion.img
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.6, delay: 0.4 + idx * 0.18, ease: EASE }}
          src={item.img}
          alt={item.level}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.06] ${
            idx === 0 ? 'scale-[1.02]' : ''
          }`}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0922]/35 via-transparent to-[#0C0922]/10" />

        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/60" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            initial={false}
            animate={{ x: hovered ? '150%' : '-150%' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          />
        </div>

        <div
          className={`relative z-10 flex h-full flex-col items-center justify-center p-6 text-center ${
            isDark
              ? '[text-shadow:0_2px_14px_rgba(0,0,0,.9)]'
              : '[text-shadow:0_1px_8px_rgba(255,255,255,.6)]'
          }`}
        >
          <div className="mb-3 flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.9, delay: 0.7 + idx * 0.18, ease: EASE }}
              className="h-px w-6 origin-right bg-[#C9A227]"
            />
            <p className={`type-eyebrow ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
              {item.level}
            </p>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.9, delay: 0.7 + idx * 0.18, ease: EASE }}
              className="h-px w-6 origin-left bg-[#C9A227]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 0.85 + idx * 0.18, ease: EASE }}
            className={`type-page-title mb-1 ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}
          >
            <AnimatedCounter value={numericLessons} duration={1400} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 1 + idx * 0.18, ease: EASE }}
            className={`type-small mb-5 uppercase tracking-wider ${
              isDark ? 'text-white/80' : 'text-[#1A1A1A]/75'
            }`}
          >
            Lessons
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 1.1 + idx * 0.18, ease: EASE }}
            className="type-section-title text-[#C9A227]"
          >
            <AnimatedCounter value={numericPrice} prefix="₹" duration={1600} />
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, delay: 1.3 + idx * 0.18, ease: EASE }}
            className="mt-6 h-[2px] w-12 origin-center bg-[#C9A227]/60 transition-[width] duration-700 group-hover:w-24"
          />
        </div>

        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 1.5 + idx * 0.18, ease: [0.34, 1.56, 0.64, 1] }}
          className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-[#C9A227]/60"
        />
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   TRIAL CARD
   ============================================================ */
const TrialCard = ({ trial, side = 'left' }) => {
  const [hovered, setHovered] = useState(false);
  const fromX = side === 'left' ? -60 : 60;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1, delay: side === 'left' ? 0.2 : 0.35, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="group relative flex flex-1 overflow-hidden rounded-2xl bg-[#F2F0EB]/90 shadow-[0_18px_50px_-20px_rgba(12,9,34,0.25)] transition-shadow duration-700 hover:shadow-[0_30px_70px_-25px_rgba(12,9,34,0.4)]"
    >
      <div className="relative w-[35%] min-h-[180px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.4, delay: side === 'left' ? 0.35 : 0.5, ease: EASE }}
          src={trial.img}
          alt={trial.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.08]"
        />
        <div className="pointer-events-none absolute inset-0 border-r border-[#C9A227]/25" />
      </div>

      <div className="relative flex w-[65%] flex-col justify-center p-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: side === 'left' ? 0.5 : 0.65, ease: EASE }}
          className="type-eyebrow mb-1 text-[#C9A227]"
        >
          {trial.eyebrow}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: side === 'left' ? 0.6 : 0.75, ease: EASE }}
          className="type-card-title mb-1 text-[#1A1A1A]"
        >
          {trial.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: side === 'left' ? 0.7 : 0.85, ease: EASE }}
          className="type-section-title mb-2 text-[#C9A227]"
        >
          {trial.price}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: side === 'left' ? 0.8 : 0.95, ease: EASE }}
          className="type-caption text-[#1A1A1A]/70"
        >
          {trial.desc}
        </motion.p>

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            initial={false}
            animate={{ x: hovered ? '150%' : '-150%' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#C9A227]/20 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   MAIN
   ============================================================ */
const InvestmentSection = () => {
  const { openEnquiry } = useEnquiry();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.01, 1.06]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

  const levels = [
    { level: 'LEVEL 01', lessons: '10', price: '₹11,999', img: '/level 1.png', tone: 'light' },
    { level: 'LEVEL 02', lessons: '20', price: '₹29,999', img: '/level 2.png', tone: 'light' },
    { level: 'LEVEL 03', lessons: '20', price: '₹32,999', img: '/level 3.png', tone: 'dark' },
  ];

  const trials = [
    {
      img: '/free ride.png',
      alt: 'Free Trial Ride',
      eyebrow: 'Free Trial Ride',
      title: '10 Minutes',
      price: 'Free',
      desc: 'An introductory riding experience for new registrations.',
    },
    {
      img: '/paid ride.png',
      alt: 'Paid Trial Ride',
      eyebrow: 'Paid Trial Ride',
      title: '45 Minutes',
      price: '₹1,999',
      desc: 'An extended trial riding session.',
    },
  ];

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden bg-[#F2F0EB]">

      {/* ==================================================
          BACKGROUND IMAGE — full section coverage
          ================================================== */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Clip-path reveal — wrapper animates, image is untouched */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.6, ease: EASE_SNAP }}
          className="absolute inset-0"
        >
          {/* Parallax — only the image moves inside the wrapper */}
          <motion.img
            style={{ scale: bgScale, y: bgY }}
            src="/trial-ride.png"
            alt="Rider on Horse"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-left brightness-[.94] contrast-[1.08] saturate-[1.1] sm:object-center sm:brightness-[.88] sm:contrast-[1.12] sm:saturate-[1.14]"
          />
        </motion.div>

        {/* Left-side gradient overlay — strengthens the image on the left,
            fades it out toward the right where the content sits */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F0EB]/20 via-[#F2F0EB]/55 to-[#F2F0EB] sm:bg-gradient-to-r sm:from-[#F2F0EB]/15 sm:via-[#F2F0EB]/40 sm:to-[#F2F0EB]/85" />
      </div>

      {/* ==================================================
          CONTENT
          ================================================== */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="lg:ml-[40%]">
          {/* Header */}
          <div className="mb-9 text-left md:mb-12 md:text-center">
            <motion.h4
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="type-eyebrow mb-4 text-[#1A1A1A]"
            >
              The Investment
            </motion.h4>

            <h2 className="type-section-title mb-6 leading-[1.1]">
              <span className="block text-[#1A1A1A]">
                <CascadeText text="Your Training," delay={0.2} />
              </span>
              <span className="block">
                <ShinyText
                  text="Your Progression"
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
              className="mx-auto h-[2px] w-16 origin-center bg-[#C9A227]/50"
            />
          </div>

          {/* Level cards */}
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {levels.map((item, idx) => (
              <LevelCard key={idx} item={item} idx={idx} />
            ))}
          </div>

          {/* Trial subsection */}
          <div className="mt-12">
            <div className="mb-8 text-left md:mb-10 md:text-center">
              <motion.h4
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="type-eyebrow mb-4 text-[#1A1A1A]"
              >
                Not Sure Where to Begin?
              </motion.h4>

              <h2 className="type-section-title leading-[1.1]">
                <span className="block text-[#1A1A1A]">
                  <CascadeText text="Begin with a" delay={0.2} />
                </span>
                <span className="block">
                  <ShinyText
                    text="Trial Ride."
                    speed={3}
                    className="text-[#C9A227]"
                    disabled={false}
                  />
                </span>
              </h2>
            </div>

            <div className="mb-10 flex flex-col items-stretch gap-4 md:flex-row md:items-stretch">
              <TrialCard trial={trials[0]} side="left" />

              <div className="flex flex-row items-center justify-center gap-3 py-4 md:flex-col md:py-0 md:px-2">
                <motion.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
                  className="hidden h-10 w-px origin-top bg-[#C9A227]/40 md:block"
                />
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
                  className="h-px w-16 origin-right bg-[#C9A227]/40 md:hidden"
                />

                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.6, delay: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
                  className="font-serif text-lg italic text-[#C9A227]"
                >
                  or
                </motion.span>

                <motion.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
                  className="hidden h-10 w-px origin-bottom bg-[#C9A227]/40 md:block"
                />
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
                  className="h-px w-16 origin-left bg-[#C9A227]/40 md:hidden"
                />
              </div>

              <TrialCard trial={trials[1]} side="right" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => openEnquiry('Trial Ride')}
                className="type-button group inline-flex items-center gap-3 rounded-full bg-[#0C0922] px-10 py-4 text-white transition-colors duration-500 hover:bg-[#C9A227] hover:text-[#0C0922]"
              >
                <span>Book Your Trial Ride</span>
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSection;