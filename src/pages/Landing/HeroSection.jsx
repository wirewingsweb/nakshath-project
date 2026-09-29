import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import { viewportOnce } from '../../utils/animations';

// ============================================================
// MAGNETIC BUTTON — Cursor attracts button
// ============================================================
const MagneticButton = ({ children, onClick, className = '' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.25;
    const distY = (e.clientY - centerY) * 0.25;
    x.set(distX);
    y.set(distY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
};

const HeroSection = () => {
  const [selectedTrial, setSelectedTrial] = useState('free');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { openEnquiry } = useEnquiry();

  // Form card 3D tilt
  const formRef = useRef(null);
  const formMouseX = useMotionValue(0.5);
  const formMouseY = useMotionValue(0.5);
  const formRotateX = useSpring(useTransform(formMouseY, [0, 1], [5, -5]), { stiffness: 150, damping: 20 });
  const formRotateY = useSpring(useTransform(formMouseX, [0, 1], [-5, 5]), { stiffness: 150, damping: 20 });

  const handleFormMouseMove = (e) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    formMouseX.set((e.clientX - rect.left) / rect.width);
    formMouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleFormMouseLeave = () => {
    formMouseX.set(0.5);
    formMouseY.set(0.5);
  };

  // ============================================================
  // ANIMATION VARIANTS
  // ============================================================
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0C0922] overflow-hidden">

      {/* ============================================================ */}
      {/* BACKGROUND with Ken Burns */}
      {/* ============================================================ */}
      <div className="absolute inset-x-0 top-0 h-[100svh] min-h-[680px] lg:inset-0 lg:h-auto lg:min-h-0">
        <motion.img
          src="/landingHero.webp"
          alt="Rider training at Nakshath Equestrian Club"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[18%_center] brightness-[1.08] contrast-[1.08] saturate-[1.12] lg:object-center lg:brightness-100"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1.05, 1.1, 1.05],
            x: ['0%', '-1.5%', '0%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/28 via-[#0C0922]/44 to-[#0C0922] lg:bg-gradient-to-r lg:from-[#0C0922]/18 lg:via-[#0C0922]/35 lg:to-[#0C0922]/62"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Golden light sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(120deg, transparent 25%, rgba(201,162,39,0.15) 50%, transparent 75%)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['-150% 0%', '250% 0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        />

        {/* Kids • Beginners • Professionals */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 hidden lg:block lg:left-[14%] lg:right-auto z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <motion.svg
              className="w-16 h-4 text-[#C9A227]/40"
              viewBox="0 0 64 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <path d="M0 8 H56"/>
            </motion.svg>
            <p className="type-card-title text-[#C9A227] tracking-wider">
              Kids <span className="mx-3">•</span> Beginners <span className="mx-3">•</span> Professionals
            </p>
            <motion.svg
              className="w-16 h-4 text-[#C9A227]/40"
              viewBox="0 0 64 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <path d="M8 8 H64"/>
            </motion.svg>
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* FLOATING PARTICLES */}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[2]">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#C9A227]"
            style={{
              width: `${1.5 + Math.random() * 2}px`,
              height: `${1.5 + Math.random() * 2}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ============================================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-10 sm:pt-20 pb-12 min-h-screen flex flex-col justify-center">

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-10 lg:gap-8">

          {/* ============================================================ */}
          {/* LEFT COLUMN */}
          {/* ============================================================ */}
          <motion.div
            className="flex-1 text-left lg:text-center flex flex-col items-start lg:items-center [text-shadow:0_2px_16px_rgba(0,0,0,.72)]"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >

            {/* Logo — FLOATING ANIMATION */}
            <motion.div
              className="mb-7 flex w-full justify-center lg:mb-2"
              variants={fadeScale}
            >
              <motion.img
                src="/nakshath-logo-head.webp"
                alt="Nakshath Equestrian Club"
                decoding="async"
                className="h-auto w-[min(72vw,290px)] object-contain lg:h-30 lg:w-auto"
                animate={{
                  y: [0, -8, 0],
                  filter: [
                    'drop-shadow(0 0 0px rgba(201,162,39,0))',
                    'drop-shadow(0 0 25px rgba(201,162,39,0.5))',
                    'drop-shadow(0 0 0px rgba(201,162,39,0))',
                  ],
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  filter: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
              />
            </motion.div>

            {/* Heading — with SHIMMER */}
            <motion.h1
              className="type-page-title text-white leading-tight mb-4 text-left lg:text-center relative"
              variants={fadeUp}
            >
              Begin Your<br />
              Equestrian Journey
              {/* Shimmer overlay */}
              <motion.span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent bg-clip-text"
                style={{ backgroundSize: '200% 100%' }}
                animate={{
                  backgroundPosition: ['-100% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
              />
            </motion.h1>

            {/* Divider */}
            <motion.svg
              className="w-48 h-8 text-[#C9A227] mb-6"
              viewBox="0 0 200 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              variants={fadeScale}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M0 16 H80" strokeOpacity="0.5"/>
              <path d="M120 16 H200" strokeOpacity="0.5"/>
              <path d="M100 8 L104 12 L108 16 L104 20 L100 24 L96 20 L92 16 L96 12 Z" fill="currentColor" stroke="none"/>
              <circle cx="85" cy="16" r="2" fill="currentColor" stroke="none"/>
              <circle cx="115" cy="16" r="2" fill="currentColor" stroke="none"/>
              <circle cx="78" cy="16" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="122" cy="16" r="1.5" fill="currentColor" stroke="none"/>
            </motion.svg>

            {/* Subtitle */}
            <motion.p
              className="type-lead text-white/95 max-w-md mx-0 lg:mx-auto mb-10 lg:mb-16 text-left lg:text-center"
              variants={fadeUp}
            >
              Step into the world of equestrian sport at Nakshath.
              Equestrian Club — where passion meets prestige.
            </motion.p>

            {/* 3 Features — Multi-Layer Pulse */}
            <motion.div
              className="flex w-full flex-col sm:flex-row sm:flex-wrap sm:justify-start lg:justify-center gap-5 sm:gap-10"
              variants={staggerContainer}
            >
              {[
                { icon: 'M13 10V3L4 14h7v7l9-11h-7z', line1: 'Premium Horse', line2: 'Riding Experience', delay: 0 },
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', line1: 'Professional', line2: 'Coaching', delay: 0.5 },
                { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', line1: 'Well-Trained', line2: 'Horses', delay: 1 },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4 text-left sm:flex-col sm:text-center"
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative w-14 h-14 mb-3">
                    {/* Ring 1 */}
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-[#C9A227]/60"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: feature.delay,
                        ease: 'easeOut',
                      }}
                    />
                    {/* Ring 2 */}
                    <motion.span
                      className="absolute inset-0 rounded-full border border-[#C9A227]/40"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: feature.delay + 0.3,
                        ease: 'easeOut',
                      }}
                    />
                    {/* Ring 3 */}
                    <motion.span
                      className="absolute inset-0 rounded-full border border-[#C9A227]/20"
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: feature.delay + 0.6,
                        ease: 'easeOut',
                      }}
                    />
                    {/* Icon circle */}
                    <div className="absolute inset-0 bg-[#C9A227]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider">{feature.line1}</p>
                    <p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider">{feature.line2}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ============================================================ */}
          {/* BOOKING FORM — with 3D Tilt */}
          {/* ============================================================ */}
          <motion.div
            ref={formRef}
            className="w-full max-w-md lg:max-w-md"
            style={{ perspective: 1200 }}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleFormMouseMove}
            onMouseLeave={handleFormMouseLeave}
          >
            <motion.div
              className="bg-[#0C0922]/90 backdrop-blur-md border border-[#C9A227]/30 rounded-2xl p-5 sm:p-8 shadow-2xl"
              style={{
                rotateX: formRotateX,
                rotateY: formRotateY,
                transformStyle: 'preserve-3d',
              }}
              whileHover={{
                boxShadow: '0 30px 80px rgba(201,162,39,0.25), 0 0 0 1px rgba(201,162,39,0.5)',
              }}
            >
              {/* Form Header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7 }}
              >
                <h2 className="type-section-title text-[#C9A227] mb-2">Book your trial ride</h2>
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    className="h-[1px] w-12 bg-[#C9A227]/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  />
                  <motion.svg
                    className="w-4 h-4 text-[#C9A227]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                  </motion.svg>
                  <motion.div
                    className="h-[1px] w-12 bg-[#C9A227]/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  />
                </div>
              </motion.div>

              {/* Trial Options */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delayChildren: 1.3, staggerChildren: 0.15 } },
                }}
              >
                <motion.button
                  onClick={() => setSelectedTrial('free')}
                  className={`bg-[#0C0922] border rounded-2xl p-4 text-center transition-colors ${
                    selectedTrial === 'free' ? 'border-[#C9A227]' : 'border-[#C9A227]/30'
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-center mb-2">
                    <svg className="w-6 h-6 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p className="text-white font-bold text-xs mb-1 uppercase">10 Minutes</p>
                  <p className="type-card-title text-white mb-2">Free trial ride</p>
                  <p className="type-card-title text-[#C9A227]">Free</p>
                  <div className="mt-3 flex justify-center">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedTrial === 'free' ? 'border-[#C9A227]' : 'border-white/30'
                    }`}>
                      {selectedTrial === 'free' && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-[#C9A227]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => setSelectedTrial('premium')}
                  className={`bg-[#0C0922] border rounded-2xl p-4 text-center transition-colors ${
                    selectedTrial === 'premium' ? 'border-[#C9A227]' : 'border-[#C9A227]/30'
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-center mb-2">
                    <svg className="w-6 h-6 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p className="text-white font-bold text-xs mb-1 uppercase">45 Minutes</p>
                  <p className="type-card-title text-white mb-2">Trial ride</p>
                  <p className="type-card-title text-[#C9A227]">₹1,999</p>
                  <div className="mt-3 flex justify-center">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedTrial === 'premium' ? 'border-[#C9A227]' : 'border-white/30'
                    }`}>
                      {selectedTrial === 'premium' && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-[#C9A227]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </div>
                </motion.button>
              </motion.div>

              {/* Form Fields */}
              <motion.div
                className="space-y-5"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delayChildren: 1.6, staggerChildren: 0.15 } },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                  }}
                >
                  <label className="block text-[#C9A227] type-eyebrow mb-2">Select Date</label>
                  <DatePicker value={selectedDate} onChange={setSelectedDate} theme="dark" ariaLabel="Select trial ride date" />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                  }}
                >
                  <label className="block text-[#C9A227] type-eyebrow mb-2">Select Time</label>
                  <TimePicker value={selectedTime} onChange={setSelectedTime} theme="dark" ariaLabel="Select trial ride time" />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                  }}
                >
                  <label className="block text-[#C9A227] type-eyebrow mb-2">Your Details</label>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227] transition-colors"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <input
                          type="text"
                          name="age"
                          className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227] transition-colors"
                          placeholder="Age"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227] transition-colors"
                          placeholder="Phone / WhatsApp"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button — MAGNETIC + GLOW */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                >
                  <MagneticButton
                    onClick={() => openEnquiry('Trial Ride')}
                    className="type-button relative w-full bg-[#C9A227] text-[#0C0922] py-4 rounded-lg hover:bg-white transition-colors"
                  >
                    <span className="relative z-10">BOOK YOUR TRIAL RIDE</span>

                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-lg"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(201,162,39,0)',
                          '0 0 25px 4px rgba(201,162,39,0.55)',
                          '0 0 0 0 rgba(201,162,39,0)',
                        ],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </MagneticButton>
                </motion.div>

                <motion.div
                  className="text-center"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.6 } },
                  }}
                >
                  <p className="text-white/60 text-xs flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    Booking confirmation via WhatsApp
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;