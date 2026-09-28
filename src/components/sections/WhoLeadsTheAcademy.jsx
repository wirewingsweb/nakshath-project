import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

/* ============================================================
   LETTER CASCADE
   ============================================================ */
const CascadeName = ({ text, delay = 0, className = '' }) => {
  const chars = text.split('');
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ opacity: 0, y: 60, rotateX: -90, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: delay + i * 0.045, ease: EASE }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  );
};

/* ============================================================
   LINE MASK
   ============================================================ */
const LineMask = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : { y: '110%' }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
};

/* ============================================================
   ACHIEVEMENT
   ============================================================ */
const Achievement = ({ value, label, delay = 0 }) => (
  <div className="flex flex-col pb-5 sm:pb-0">
    <motion.span
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className="text-[clamp(1.1rem,2.2vw,1.45rem)] leading-none font-serif text-[#1A1A1A] whitespace-nowrap"
    >
      {value}
    </motion.span>

    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: delay + 0.25, ease: EASE }}
      className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]"
    >
      {label}
    </motion.span>
  </div>
);

/* ============================================================
   FLOATING GOLD PARTICLES
   ============================================================ */
const GoldParticles = () => {
  const particles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: 20 + Math.random() * 70,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 5,
    duration: 7 + Math.random() * 6,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [-10, -100],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          className="absolute rounded-full bg-[#C9A227]"
        />
      ))}
    </div>
  );
};

/* ============================================================
   WHO LEADS THE ACADEMY
   ============================================================ */
const WhoLeadsTheAcademy = () => {
  const slides = ['/founder-nakshath-rounded.webp', '/founder-nakshath-rounded.webp'];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative z-10 w-full overflow-hidden bg-[#F2F0EB] md:py-16 xl:h-[58.9vw] xl:overflow-visible xl:py-0">

      {/* ==================================================
          IMAGE — slide in from left + subtle Ken Burns + particles
          ================================================== */}
      <motion.div
        initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative z-[1] mx-5 aspect-[9/16] overflow-hidden rounded-sm sm:mx-auto sm:w-[28rem] md:w-[min(42vw,22rem)] xl:absolute xl:left-[6.2%] xl:top-[-6.6%] xl:mx-0 xl:w-[31.5%]"
        role="region"
        aria-label="Founder image carousel"
        aria-roledescription="carousel"
      >
        {/* Soft gold halo behind the card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, delay: 0.5, ease: EASE }}
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,162,39,0.12),_transparent_70%)]"
        />

        {/* Ken Burns breathing */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 h-full w-full"
        >
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
        </motion.div>

        {/* Floating gold particles */}
        <GoldParticles />

        {/* Bottom-left caption */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
          className="pointer-events-none absolute bottom-4 left-4 z-30"
        >
          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-white/70">
            Show jumping
          </p>
          <p className="font-serif text-base italic text-white">
            In competition
          </p>
        </motion.div>
      </motion.div>

      {/* ==================================================
          TEXT CONTENT
          ================================================== */}
      <div className="relative z-10 px-6 pb-16 pt-10 sm:px-10 md:mx-auto md:max-w-[64rem] md:px-10 md:pb-20 md:pt-14 xl:absolute xl:left-[46.4%] xl:top-[11.5%] xl:mx-0 xl:w-[50.5%] xl:max-w-none xl:p-0">
        <div className="w-full xl:max-w-none">
          <motion.h4
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mb-4 text-[#876B18] type-eyebrow"
          >
            Who Leads The Academy
          </motion.h4>

          <h2 className="type-page-title mb-2 text-[#1A1A1A] xl:whitespace-nowrap">
            <CascadeName text="Nakshath Venkatesh" delay={0.4} />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 1.6, ease: EASE }}
            className="type-caption text-[#1A1A1A]"
          >
            Founder
          </motion.p>

          <div className="mt-10 mb-12 grid max-w-[44rem] grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-6 xl:mb-[5vw] xl:mt-[6.8vw] xl:max-w-[47vw]">
            <Achievement
              value="Silver"
              label={<>CSIO INTERNATIONAL<br />SHOW JUMPING</>}
              delay={0.4}
            />
            <Achievement
              value="Bronze"
              label={<>JUNIOR NATIONAL<br />CHAMPIONSHIP 2025</>}
              delay={0.6}
            />
            <Achievement
              value="Long-listed"
              label={<>TEAM INDIA SHOW JUMPING,<br />2026 ASIAN GAMES</>}
              delay={0.8}
            />
          </div>

          <p className="type-lead mb-8 max-w-[39rem] font-serif text-[#1A1A1A]">
            <LineMask delay={0.3}>
              To build a world-class environment and a
            </LineMask>
            <LineMask delay={0.45}>
              gateway to the Olympics, where riders at every level
            </LineMask>
            <LineMask delay={0.6}>
              develop the confidence, skill and mindset to compete.
            </LineMask>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          >
            <Link
              to="/about"
              className="group/cta inline-flex w-max items-center gap-2 text-[#1A1A1A] transition-colors hover:text-[#876B18]"
            >
              <span className="relative pb-1 text-[0.78rem] font-serif">
                Read his story
                <span className="absolute bottom-0 left-0 h-px w-full bg-[#876B18]/40" />
                <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:scale-x-100" />
              </span>
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoLeadsTheAcademy;