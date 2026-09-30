import { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import ShinyText from '../../components/ShinyText';
import MagneticButton from '../../components/landing/MagneticButton';
import LineReveal from '../../components/landing/LineReveal';
import {
  fadeInUp,
  staggerContainer,
  slideFromRight,
  staggerItem,
} from '../../utils/animations';
import { EASE, EASE_SNAP } from '../../utils/landing-motion';

/* ============================================================
   LETTER CASCADE — each character rotates in on its X-axis
   ============================================================ */
const CascadeText = ({ text, delay = 0, className = '' }) => {
  const chars = text.split('');
  return (
    <span className={className}>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.04,
            ease: EASE,
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  );
};

/* ============================================================
   FLOATING PARTICLES — differential depth per particle
   Bigger particles = closer to camera = drift further.
   ============================================================ */
const FloatingParticles = () => {
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const size = 1 + Math.random() * 2;
    // Bigger = closer = travels further on both axes
    const travel = 60 + size * 20;
    return {
      id: i,
      left: Math.random() * 100,
      top: 20 + Math.random() * 70,
      size,
      delay: Math.random() * 4,
      duration: 5 + Math.random() * 5,
      xDrift: (Math.random() - 0.5) * travel * 0.4,
      yDrift: travel,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [-8, -p.yDrift],
            x: [0, p.xDrift],
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
   HERO
   ============================================================ */
const HeroSection = () => {
  const [selectedTrial, setSelectedTrial] = useState('free');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { openEnquiry } = useEnquiry();

  const sectionRef = useRef(null);
  const shouldReduce = useReducedMotion();

  /* ============================================================
     Scroll camera — this section is at the TOP of the page, so we
     use `start start → end start`. Progress is 0 on page load, 1
     when the section scrolls out of view. That means every drift
     begins at rest at load time and grows as you scroll — no
     "already half-finished" surprise on refresh.
     ============================================================ */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Background image drifts up and scales slightly as you scroll past
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgY_s = useSpring(bgY, { stiffness: 80, damping: 28, mass: 0.7 });
  const bgScale_s = useSpring(bgScale, {
    stiffness: 80,
    damping: 28,
    mass: 0.7,
  });

  // Left column (text) counter-drifts — floats up as you scroll
  const leftY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const leftY_s = useSpring(leftY, { stiffness: 90, damping: 28, mass: 0.6 });

  // Right column (form) counter-drifts the opposite way — floats down
  const rightY = useTransform(scrollYProgress, [0, 1], ['0%', '4%']);
  const rightY_s = useSpring(rightY, { stiffness: 90, damping: 28, mass: 0.6 });

  // Whole content plane tilt — subtle rotateX as you scroll past
  const contentRotateX = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const contentRotateX_s = useSpring(contentRotateX, {
    stiffness: 80,
    damping: 28,
    mass: 0.6,
  });

  const features = [
    {
      title: ['Premium Horse', 'Riding Experience'],
      icon: (
        <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: ['Professional', 'Coaching'],
      icon: (
        <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: ['Well-Trained', 'Horses'],
      icon: (
        <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0C0922] overflow-hidden"
      style={{ perspective: '1600px' }}
    >
      {/* ==================================================
          BACKGROUND — clip curtain reveal + scroll drift
          ================================================== */}
      <div className="absolute inset-x-0 top-0 h-[100svh] min-h-[680px] lg:inset-0 lg:h-auto lg:min-h-0">
        {/* Scroll drift wrapper around the image */}
        <motion.div
          style={{
            y: shouldReduce ? 0 : bgY_s,
            scale: shouldReduce ? 1 : bgScale_s,
            willChange: 'transform',
          }}
          className="absolute inset-0"
        >
          <motion.img
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.6, ease: EASE_SNAP }}
            src="/landingHero.webp"
            alt="Rider training at Nakshath Equestrian Club"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[18%_center] brightness-[1.08] contrast-[1.08] saturate-[1.12] lg:object-center lg:brightness-100"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
          className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/28 via-[#0C0922]/44 to-[#0C0922] lg:bg-gradient-to-r lg:from-[#0C0922]/18 lg:via-[#0C0922]/35 lg:to-[#0C0922]/62"
        />

        {/* Kids / Beginners / Professionals tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9, ease: EASE }}
          className="absolute bottom-10 left-0 right-0 hidden lg:block lg:left-[14%] lg:right-auto z-10"
        >
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <motion.svg
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.8, ease: EASE }}
              className="w-16 h-4 text-[#C9A227]/40 origin-left"
              viewBox="0 0 64 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M0 8 H56" />
            </motion.svg>
            <p className="type-card-title text-[#C9A227] tracking-wider">
              Kids <span className="mx-3">•</span> Beginners <span className="mx-3">•</span> Professionals
            </p>
            <motion.svg
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.8, ease: EASE }}
              className="w-16 h-4 text-[#C9A227]/40 origin-right"
              viewBox="0 0 64 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M8 8 H64" />
            </motion.svg>
          </div>
        </motion.div>
      </div>

      {/* ==================================================
          MAIN CONTENT — wrapped in the tilt camera
          ================================================== */}
      <motion.div
        style={{
          rotateX: shouldReduce ? 0 : contentRotateX_s,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-10 sm:pt-20 pb-12 min-h-screen flex flex-col justify-center"
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-10 lg:gap-8">
          {/* LEFT COLUMN — counter-drift up */}
          <motion.div
            style={{
              y: shouldReduce ? 0 : leftY_s,
              willChange: 'transform',
            }}
            className="flex-1 text-left lg:text-center flex flex-col items-start lg:items-center [text-shadow:0_2px_16px_rgba(0,0,0,.72)]"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
              className="mb-7 flex w-full justify-center lg:mb-2"
            >
              <img
                src="/nakshath logo head.webp"
                alt="Nakshath Equestrian Club"
                decoding="async"
                className="h-auto w-[min(72vw,290px)] object-contain lg:h-30 lg:w-auto"
              />
            </motion.div>

            {/* Heading — letter cascade + ShinyText on "Equestrian" */}
            <h1 className="type-page-title text-white leading-tight mb-4 text-left lg:text-center">
              <span className="block">
                <CascadeText text="Begin Your" delay={0.6} />
              </span>
              <span className="block">
                <ShinyText
                  text="Equestrian"
                  speed={3}
                  className="text-[#C9A227]"
                  disabled={false}
                />
                <span className="text-white">
                  <CascadeText text=" Journey" delay={1.4} />
                </span>
              </span>
            </h1>

            {/* Decorative divider */}
            <motion.svg
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 1.9, ease: EASE }}
              className="w-48 h-8 text-[#C9A227] mb-6 origin-center"
              viewBox="0 0 200 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M0 16 H80" strokeOpacity="0.5" />
              <path d="M120 16 H200" strokeOpacity="0.5" />
              <path d="M100 8 L104 12 L108 16 L104 20 L100 24 L96 20 L92 16 L96 12 Z" fill="currentColor" stroke="none" />
              <circle cx="85" cy="16" r="2" fill="currentColor" stroke="none" />
              <circle cx="115" cy="16" r="2" fill="currentColor" stroke="none" />
              <circle cx="78" cy="16" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="122" cy="16" r="1.5" fill="currentColor" stroke="none" />
            </motion.svg>

            {/* Subtitle */}
            <p className="type-lead text-white/95 max-w-md mx-0 lg:mx-auto mb-10 lg:mb-16 text-left lg:text-center">
              <LineReveal delay={2.05}>Step into the world of equestrian sport at Nakshath.</LineReveal>
              <LineReveal delay={2.2}>Equestrian Club — where passion meets prestige.</LineReveal>
            </p>

            {/* Features row */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15, delayChildren: 2.3 } },
              }}
              className="flex w-full flex-col sm:flex-row sm:flex-wrap sm:justify-start lg:justify-center gap-5 sm:gap-10"
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.7, ease: EASE },
                    },
                  }}
                  className="flex items-center gap-4 text-left sm:flex-col sm:text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 bg-[#C9A227]/20 rounded-full flex items-center justify-center mb-3"
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider">
                      {feature.title[0]}
                    </p>
                    <p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider">
                      {feature.title[1]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN — counter-drift down */}
          <motion.div
            style={{
              y: shouldReduce ? 0 : rightY_s,
              willChange: 'transform',
            }}
            className="w-full max-w-md lg:max-w-md"
          >
            <motion.div
              initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.8, ease: EASE }}
              className="relative w-full bg-[#0C0922]/90 backdrop-blur-md border border-[#C9A227]/30 rounded-2xl p-5 sm:p-8 shadow-2xl"
            >
              <FloatingParticles />

              {/* Form header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
                className="relative text-center mb-8"
              >
                <h2 className="type-section-title text-[#C9A227] mb-2">Book your trial ride</h2>
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
                    className="h-[1px] w-12 bg-[#C9A227]/40 origin-right"
                  />
                  <svg className="w-4 h-4 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
                    className="h-[1px] w-12 bg-[#C9A227]/40 origin-left"
                  />
                </div>
              </motion.div>

              {/* Trial options */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 1.5 } },
                }}
                className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              >
                {[
                  { id: 'free', time: '10 Minutes', title: 'Free trial ride', price: 'Free' },
                  { id: 'premium', time: '45 Minutes', title: 'Trial ride', price: '₹1,999' },
                ].map((option) => (
                  <motion.button
                    key={option.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTrial(option.id)}
                    className={`bg-[#0C0922] border rounded-2xl p-4 text-center transition-colors ${
                      selectedTrial === option.id ? 'border-[#C9A227]' : 'border-[#C9A227]/30'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      <svg className="w-6 h-6 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-white font-bold text-xs mb-1 uppercase">{option.time}</p>
                    <p className="type-card-title text-white mb-2">{option.title}</p>
                    <p className="type-card-title text-[#C9A227]">{option.price}</p>
                    <div className="mt-3 flex justify-center">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedTrial === option.id ? 'border-[#C9A227]' : 'border-white/30'
                      }`}>
                        {selectedTrial === option.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-[#C9A227]"
                          />
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>

              {/* Fields */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 1.8 } },
                }}
                className="relative space-y-5"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <label className="block text-[#C9A227] type-eyebrow mb-2">Select Date</label>
                  <DatePicker value={selectedDate} onChange={setSelectedDate} theme="dark" ariaLabel="Select trial ride date" />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <label className="block text-[#C9A227] type-eyebrow mb-2">Select Time</label>
                  <TimePicker value={selectedTime} onChange={setSelectedTime} theme="dark" ariaLabel="Select trial ride time" />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <label className="block text-[#C9A227] type-eyebrow mb-2">Your Details</label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227] transition-colors"
                      placeholder="Full Name"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227] transition-colors"
                        placeholder="Age"
                      />
                      <input
                        type="tel"
                        className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227] transition-colors"
                        placeholder="Phone / WhatsApp"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Magnetic CTA */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                  className="pt-1"
                >
                  <MagneticButton strength={0.25} radius={100} className="block w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => openEnquiry('Trial Ride')}
                      className="type-button w-full bg-[#C9A227] text-[#0C0922] py-4 rounded-lg hover:bg-white transition-colors"
                    >
                      BOOK YOUR TRIAL RIDE
                    </motion.button>
                  </MagneticButton>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
                  }}
                  className="text-center"
                >
                  <p className="text-white/60 text-xs flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Booking confirmation via WhatsApp
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;