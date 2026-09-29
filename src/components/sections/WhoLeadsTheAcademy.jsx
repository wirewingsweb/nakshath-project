import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import { viewportOnce } from '../../utils/animations';

// ============================================================
// TYPING TEXT — Gaming style name reveal
// ============================================================
const TypingText = ({ text, delay = 0, speed = 70 }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className="relative inline-block">
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          className="ml-1 inline-block h-[0.85em] w-[3px] bg-[#876B18] align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      )}
    </span>
  );
};

// ============================================================
// ACHIEVEMENT CARD — Original content + gaming animation
// ============================================================
const AchievementCard = ({ rank, title, index, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLegendary = rank.toLowerCase().includes('long');

  return (
    <motion.div
      className={`relative flex flex-col ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        delay: 0.6 + index * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Floating rank diamond (gaming badge) */}
      <motion.div
        className="pointer-events-none absolute -right-2 -top-3 z-20"
        animate={{
          y: [0, -4, 0],
          rotate: isHovered ? [0, -12, 12, 0] : 0,
        }}
        transition={{
          y: {
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.4,
          },
          rotate: { duration: 0.5 },
        }}
      >
        <svg width="16" height="18" viewBox="0 0 10 12" fill="none">
          <path
            d="M5 0L10 3V9L5 12L0 9V3L5 0Z"
            fill={isLegendary ? 'rgba(201,162,39,0.25)' : 'rgba(135,107,24,0.15)'}
            stroke={isLegendary ? '#C9A227' : '#876B18'}
            strokeWidth="0.6"
          />
        </svg>
      </motion.div>

      {/* Rank — original text */}
      <motion.span
        className="text-[clamp(1.1rem,2.2vw,1.45rem)] font-serif leading-none text-[#1A1A1A]"
        animate={{ color: isHovered ? '#876B18' : '#1A1A1A' }}
        transition={{ duration: 0.3 }}
      >
        {rank}
      </motion.span>

      {/* Title — original text */}
      <motion.span
        className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]"
        animate={{ opacity: isHovered ? 1 : 0.75 }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.span>

      {/* XP Bar */}
      <div className="mt-3 h-[2px] w-full max-w-[5rem] overflow-hidden rounded-full bg-[#5A5A66]/15">
        <motion.div
          className="h-full bg-gradient-to-r from-[#876B18] to-[#C9A227]"
          initial={{ width: 0 }}
          whileInView={{ width: `${65 + index * 15}%` }}
          viewport={viewportOnce}
          transition={{
            delay: 0.9 + index * 0.15,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      {/* Hover scan line */}
      <motion.div
        className="pointer-events-none absolute -bottom-3 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

// ============================================================
// MAIN COMPONENT — Original content + gaming animations
// ============================================================
const WhoLeadsTheAcademy = () => {
  const slides = [
    '/founder-nakshath-rounded.webp',
    '/founder-nakshath-rounded.webp',
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative z-10 w-full overflow-hidden bg-[#F2F0EB] md:py-16 xl:h-[58.9vw] xl:overflow-visible xl:py-0">
      {/* ============================================================ */}
      {/* BACKGROUND — Gaming grid + scanline */}
      {/* ============================================================ */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#876B18 1px, transparent 1px), linear-gradient(90deg, #876B18 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-b from-transparent via-[#876B18]/35 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* IMAGE CAROUSEL — Clean frame with glitch effect */}
      {/* ============================================================ */}
      <motion.div
        className="relative z-[1] mx-5 aspect-[9/16] overflow-hidden sm:mx-auto sm:w-[28rem] md:w-[min(42vw,22rem)] xl:absolute xl:left-[6.2%] xl:top-[-6.6%] xl:mx-0 xl:w-[31.5%]"
        role="region"
        aria-label="Founder image carousel"
        aria-roledescription="carousel"
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={viewportOnce}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        {/* Image track — original */}
        <div
          className={`founder-carousel-track flex h-full transition-transform duration-1000 ease-in-out ${
            activeSlide === 1 ? 'founder-carousel-track--shifted' : ''
          }`}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              loading="lazy"
              decoding="async"
              alt={index === 0 ? 'Nakshath Venkatesh show jumping' : ''}
              aria-hidden={index !== activeSlide}
              data-active={index === activeSlide ? 'true' : 'false'}
              className="founder-carousel-slide block h-full shrink-0 object-contain"
            />
          ))}
        </div>

        {/* Glitch effect on hover */}
        <AnimatePresence>
          {isImageHovered && (
            <>
              <motion.div
                className="pointer-events-none absolute inset-0 z-20"
                style={{ background: '#C9A227', mixBlendMode: 'overlay' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.15, 0], x: [0, 3, -3, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="pointer-events-none absolute inset-0 z-20"
                style={{ background: '#876B18', mixBlendMode: 'overlay' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0], x: [0, -2, 2, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Retro CRT scanlines */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, rgba(135,107,24,0.4) 0px, transparent 2px, transparent 4px)`,
          }}
          aria-hidden="true"
        />

        {/* Floating golden particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full bg-[#876B18]"
            style={{
              width: `${2 + Math.random() * 2}px`,
              height: `${2 + Math.random() * 2}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{ y: [0, -25, 0], opacity: [0, 0.7, 0] }}
            transition={{
              duration: 5 + Math.random() * 3,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* ============================================================ */}
      {/* TEXT CONTENT — Original layout + gaming reveal */}
      {/* ============================================================ */}
      <div className="relative z-10 px-6 pb-16 pt-10 sm:px-10 md:mx-auto md:max-w-[64rem] md:px-10 md:pb-20 md:pt-14 xl:absolute xl:left-[46.4%] xl:top-[11.5%] xl:mx-0 xl:w-[50.5%] xl:max-w-none xl:p-0">
        <div className="w-full xl:max-w-none">
          {/* Eyebrow — slide-in from left */}
          <motion.h4
            className="text-[#876B18] type-eyebrow mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Who Leads The Academy
          </motion.h4>

          {/* Name — Typing effect (text original) */}
          <motion.h2
            className="type-page-title mb-2 text-[#1A1A1A] xl:whitespace-nowrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <TypingText text="Nakshath Venkatesh" delay={500} speed={70} />
          </motion.h2>

          {/* Founder caption */}
          <motion.p
            className="type-caption text-[#1A1A1A]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Founder
          </motion.p>

          {/* ============================================================ */}
          {/* ACHIEVEMENTS — Original 3-column grid */}
          {/* ============================================================ */}
          <div className="mt-10 mb-12 grid max-w-[44rem] grid-cols-1 sm:grid-cols-3 xl:mb-[5vw] xl:mt-[6.8vw] xl:max-w-[47vw]">
            <AchievementCard
              rank="Silver"
              title={
                <>
                  CSIO INTERNATIONAL
                  <br />
                  SHOW JUMPING
                </>
              }
              index={0}
              className="pb-5 sm:pb-0 sm:pr-5"
            />
            <AchievementCard
              rank="Bronze"
              title={
                <>
                  JUNIOR NATIONAL
                  <br />
                  CHAMPIONSHIP 2025
                </>
              }
              index={1}
              className="border-t border-[#5A5A66]/20 pt-5 sm:border-l sm:border-t-0 sm:px-5 sm:pt-0"
            />
            <AchievementCard
              rank="Long-listed"
              title={
                <>
                  TEAM INDIA SHOW JUMPING,
                  <br />
                  2026 ASIAN GAMES
                </>
              }
              index={2}
              className="mt-5 border-t border-[#5A5A66]/20 pt-5 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0"
            />
          </div>

          {/* Quote — fade up */}
          <motion.p
            className="type-lead mb-8 max-w-[39rem] font-serif text-[#1A1A1A]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            To build a world-class environment and a gateway to the Olympics,
            where riders at every level develop the confidence, skill and
            mindset to compete.
          </motion.p>

          {/* CTA Link — shine sweep */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <Link
              to="/about"
              className="group relative inline-flex w-max items-center gap-2 overflow-hidden border-b border-[#876B18] pb-1 font-serif text-[0.78rem] text-[#1A1A1A] transition-colors hover:text-[#876B18]"
            >
              <span className="relative z-10">Read his story</span>
              <motion.span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#876B18]/25 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: 'easeInOut',
                }}
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoLeadsTheAcademy;