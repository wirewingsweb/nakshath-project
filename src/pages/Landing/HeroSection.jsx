// src/pages/Landing/HeroSection.jsx
import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { EASE_PRIMARY } from '../../utils/motion';
import ShinyText from '../../components/ShinyText';

const HeroSection = () => {
  const [selectedTrial, setSelectedTrial] = useState('free');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { openEnquiry } = useEnquiry();
  const prefersReduced = usePrefersReducedMotion();

  const sectionRef = useRef(null);

  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const currentScroll = Math.max(0, -rect.top);
      const progress = totalScroll > 0 ? Math.min(1, currentScroll / totalScroll) : 0;
      scrollYProgress.set(progress);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [scrollYProgress]);

  // ══════════════════════════════════════════════════════════
  // REVEAL CHOREOGRAPHY (unchanged)
  // ══════════════════════════════════════════════════════════

  const headingOpacity = useTransform(scrollYProgress, [0, 0.08], [0.35, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.08], [24, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 0.08], [0.96, 1]);

  const dividerScale = useTransform(scrollYProgress, [0.08, 0.16], [0, 1]);

  const subtitleOpacity = useTransform(scrollYProgress, [0.14, 0.24], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.14, 0.24], [20, 0]);

  const featuresOpacity = useTransform(scrollYProgress, [0.24, 0.42], [0, 1]);
  const featuresY = useTransform(scrollYProgress, [0.24, 0.42], [24, 0]);

  const formOpacity = useTransform(scrollYProgress, [0.38, 0.56], [0, 1]);
  const formX = useTransform(scrollYProgress, [0.38, 0.56], [48, 0]);
  const formScale = useTransform(scrollYProgress, [0.38, 0.56], [0.98, 1]);

  const contentOpacity = useTransform(scrollYProgress, [0.72, 0.92], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0.72, 0.92], [1, 1.06]);
  const contentY = useTransform(scrollYProgress, [0.72, 0.92], [0, -48]);

  const imageScale = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1.05, 1.18]);
  const imageBrightness = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [1, 0.95, 0.82]
  );

  // ── Cursor-follow parallax + 3D tilt ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 45, stiffness: 110, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [6, -6]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  const tiltX = useTransform(smoothY, [-0.5, 0.5], [2.5, -2.5]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-2.5, 2.5]);

  // Spotlight for cursor in hero
  const spotLeft = useTransform(smoothX, [-0.5, 0.5], ['30%', '70%']);
  const spotTop  = useTransform(smoothY, [-0.5, 0.5], ['30%', '70%']);

  useEffect(() => {
    if (prefersReduced) return undefined;

    const section = sectionRef.current;
    if (!section) return undefined;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return undefined;

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    section.addEventListener('mousemove', handleMove);
    section.addEventListener('mouseleave', handleLeave);
    return () => {
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseleave', handleLeave);
    };
  }, [prefersReduced, mouseX, mouseY]);

  // ── Reduced motion fallback ──
  if (prefersReduced) {
    return (
      <div className="relative w-full min-h-screen bg-[#0C0922] overflow-hidden">
        <img
          src="/landingHero.webp"
          alt="Rider training at Nakshath Equestrian Club"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[18%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/40 via-[#0C0922]/55 to-[#0C0922] lg:bg-gradient-to-r lg:from-[#0C0922]/30 lg:via-[#0C0922]/50 lg:to-[#0C0922]/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-10 sm:pt-20 pb-12 min-h-screen flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-10 lg:gap-8">
            <div className="flex-1 text-left lg:text-center flex flex-col items-start lg:items-center [text-shadow:0_2px_16px_rgba(0,0,0,.72)]">
              <div className="mb-7 flex w-full justify-center lg:mb-2">
                <img
                  src="/nakshath logo head.webp"
                  alt="Nakshath Equestrian Club"
                  decoding="async"
                  className="h-auto w-[min(72vw,290px)] object-contain lg:h-30 lg:w-auto"
                />
              </div>
              <h1 className="type-page-title text-white leading-tight mb-4 text-left lg:text-center">
                Begin Your<br />
                <ShinyText
                  text="Equestrian Journey"
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </h1>
              <p className="type-lead text-white/95 max-w-md mx-0 lg:mx-auto mb-10 lg:mb-16 text-left lg:text-center">
                Step into the world of equestrian sport at Nakshath.
                Equestrian Club — where passion meets prestige.
              </p>
            </div>
            <div className="w-full max-w-md lg:max-w-md bg-[#0C0922]/90 backdrop-blur-md border border-[#C9A227]/30 rounded-2xl p-5 sm:p-8 shadow-2xl">
              <BookingForm
                selectedTrial={selectedTrial}
                setSelectedTrial={setSelectedTrial}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                openEnquiry={openEnquiry}
                prefersReduced={prefersReduced}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: '150vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0C0922]">

        {/* ═══════ BACKGROUND — drift + parallax + cinematic push + hover zoom ═══════ */}
        <motion.div
          className="group/hero-img absolute inset-0"
          style={{
            scale: imageScale,
            x: parallaxX,
            y: parallaxY,
            filter: useTransform(imageBrightness, (b) => `brightness(${b})`),
          }}
        >
          <img
            src="/landingHero.webp"
            alt="Rider training at Nakshath Equestrian Club"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[18%_center] lg:object-center transition-transform duration-[2s] ease-out group-hover/hero-img:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/28 via-[#0C0922]/44 to-[#0C0922] lg:bg-gradient-to-r lg:from-[#0C0922]/18 lg:via-[#0C0922]/35 lg:to-[#0C0922]/62" />
        </motion.div>

        {/* ═══════ HERO CURSOR SPOTLIGHT — gold radial follows mouse ═══════ */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-[5] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: spotLeft,
              top: spotTop,
              background:
                'radial-gradient(circle, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.03) 45%, transparent 75%)',
              filter: 'blur(60px)',
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Kids • Beginners • Professionals strip */}
        <div className="absolute bottom-10 left-0 right-0 hidden lg:block lg:left-[14%] lg:right-auto z-10">
          <motion.div
            className="group/strip flex items-center justify-center lg:justify-start gap-4"
            style={{ opacity: featuresOpacity }}
          >
            <svg className="w-16 h-4 text-[#C9A227]/40 transition-all duration-500 group-hover/strip:w-20 group-hover/strip:text-[#C9A227]/80" viewBox="0 0 64 16" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 8 H56" />
            </svg>
            <p className="type-card-title text-[#C9A227] tracking-wider transition-all duration-500 group-hover/strip:tracking-[0.18em] group-hover/strip:text-[#F5E6A8]">
              Kids <span className="mx-3 transition-colors duration-500 group-hover/strip:text-white">•</span> Beginners <span className="mx-3 transition-colors duration-500 group-hover/strip:text-white">•</span> Professionals
            </p>
            <svg className="w-16 h-4 text-[#C9A227]/40 transition-all duration-500 group-hover/strip:w-20 group-hover/strip:text-[#C9A227]/80" viewBox="0 0 64 16" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M8 8 H64" />
            </svg>
          </motion.div>
        </div>

        {/* ═══ CINEMATIC CONTENT GROUP ═══ */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 h-full flex flex-col justify-center"
          style={{
            opacity: contentOpacity,
            scale: contentScale,
            y: contentY,
            perspective: 1200,
          }}
        >
          <motion.div
            className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-10 lg:gap-8"
            style={{
              rotateX: tiltX,
              rotateY: tiltY,
              transformStyle: 'preserve-3d',
            }}
          >

            <div className="flex-1 text-left lg:text-center flex flex-col items-start lg:items-center [text-shadow:0_2px_16px_rgba(0,0,0,.72)]">
              {/* ═══ LOGO — hover scale + gold glow ═══ */}
              <div className="mb-7 flex w-full justify-center lg:mb-2">
                <motion.img
                  src="/nakshath logo head.webp"
                  alt="Nakshath Equestrian Club"
                  decoding="async"
                  className="h-auto w-[min(72vw,290px)] cursor-pointer object-contain transition-all duration-500 hover:drop-shadow-[0_0_30px_rgba(201,162,39,0.7)] lg:h-30 lg:w-auto"
                  style={{
                    opacity: headingOpacity,
                    y: headingY,
                    scale: headingScale,
                  }}
                  whileHover={prefersReduced ? undefined : { scale: 1.06, y: -4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                />
              </div>

              {/* ═══ HEADING — hover letter-spacing + gold ═══ */}
              <motion.h1
                className="group/heading type-page-title text-white leading-tight mb-4 text-left lg:text-center"
                style={{
                  opacity: headingOpacity,
                  y: headingY,
                  scale: headingScale,
                }}
              >
                <span className="inline-block cursor-default transition-all duration-500 group-hover/heading:tracking-wider group-hover/heading:text-[#F5E6A8]">
                  Begin Your
                </span>
                <br />
                <ShinyText
                  text="Equestrian Journey"
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </motion.h1>

              {/* ═══ DIVIDER — hover glow + scale ═══ */}
              <motion.svg
                className="group/divider w-48 h-8 text-[#C9A227] mb-6 origin-center transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(201,162,39,0.8)]"
                viewBox="0 0 200 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                style={{ scaleX: dividerScale, opacity: dividerScale }}
              >
                <path d="M0 16 H80" strokeOpacity="0.5" className="transition-opacity duration-500 group-hover/divider:stroke-opacity-100" />
                <path d="M120 16 H200" strokeOpacity="0.5" className="transition-opacity duration-500 group-hover/divider:stroke-opacity-100" />
                <path d="M100 8 L104 12 L108 16 L104 20 L100 24 L96 20 L92 16 L96 12 Z" fill="currentColor" stroke="none" className="transition-transform duration-500 group-hover/divider:scale-125" style={{ transformOrigin: '100px 16px' }} />
                <circle cx="85" cy="16" r="2" fill="currentColor" stroke="none" className="transition-all duration-500 group-hover/divider:r-3" />
                <circle cx="115" cy="16" r="2" fill="currentColor" stroke="none" className="transition-all duration-500 group-hover/divider:r-3" />
                <circle cx="78" cy="16" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="122" cy="16" r="1.5" fill="currentColor" stroke="none" />
              </motion.svg>

              {/* ═══ SUBTITLE — hover brighten ═══ */}
              <motion.p
                className="type-lead text-white/95 max-w-md mx-0 lg:mx-auto mb-10 lg:mb-16 text-left lg:text-center cursor-default transition-colors duration-500 hover:text-white"
                style={{ opacity: subtitleOpacity, y: subtitleY }}
              >
                Step into the world of equestrian sport at Nakshath.
                Equestrian Club — where passion meets prestige.
              </motion.p>

              {/* ═══ FEATURES — icon rotate + scale + label tracking ═══ */}
              <motion.div
                className="flex w-full flex-col sm:flex-row sm:flex-wrap sm:justify-start lg:justify-center gap-5 sm:gap-10"
                style={{ opacity: featuresOpacity, y: featuresY }}
              >
                <FeatureItem
                  label={['Premium Horse', 'Riding Experience']}
                  prefersReduced={prefersReduced}
                  icon={
                    <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                />
                <FeatureItem
                  label={['Professional', 'Coaching']}
                  prefersReduced={prefersReduced}
                  icon={
                    <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                />
                <FeatureItem
                  label={['Well-Trained', 'Horses']}
                  prefersReduced={prefersReduced}
                  icon={
                    <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  }
                />
              </motion.div>
            </div>

            {/* ═══ BOOKING FORM CARD — hover border brighten + glow ═══ */}
            <motion.div
              className="group/formcard w-full max-w-md lg:max-w-md bg-[#0C0922]/90 backdrop-blur-md border border-[#C9A227]/30 rounded-2xl p-5 sm:p-8 shadow-2xl transition-all duration-500 hover:border-[#C9A227]/60 hover:shadow-[0_20px_60px_-20px_rgba(201,162,39,0.5)]"
              style={{
                opacity: formOpacity,
                x: formX,
                scale: formScale,
              }}
            >
              <BookingForm
                selectedTrial={selectedTrial}
                setSelectedTrial={setSelectedTrial}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                openEnquiry={openEnquiry}
                prefersReduced={prefersReduced}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// FeatureItem — icon rotate + scale + label tracking on hover
// ═══════════════════════════════════════════════════════════════

const FeatureItem = ({ label, icon, prefersReduced }) => (
  <motion.div
    className="group/feature flex items-center gap-4 text-left sm:flex-col sm:text-center cursor-default"
    whileHover={prefersReduced ? undefined : { y: -4, scale: 1.03 }}
    transition={{ duration: 0.3, ease: EASE_PRIMARY }}
  >
    <div className="relative w-14 h-14 bg-[#C9A227]/20 rounded-full flex items-center justify-center mb-3 transition-all duration-500 group-hover/feature:bg-[#C9A227]/30 group-hover/feature:shadow-[0_0_24px_rgba(201,162,39,0.5)]">
      {/* Ring pulse on hover */}
      {!prefersReduced && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#C9A227]/0 transition-all duration-500 group-hover/feature:ring-[#C9A227]/40 group-hover/feature:scale-110"
        />
      )}
      <motion.span
        className="inline-flex"
        whileHover={prefersReduced ? undefined : { rotate: 12, scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        {icon}
      </motion.span>
    </div>
    <div>
      <p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider transition-all duration-500 group-hover/feature:tracking-[0.14em] group-hover/feature:text-[#F5E6A8]">
        {label[0]}
      </p>
      <p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider transition-all duration-500 group-hover/feature:tracking-[0.14em] group-hover/feature:text-[#F5E6A8]">
        {label[1]}
      </p>
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
// BookingForm
// ═══════════════════════════════════════════════════════════════

const BookingForm = ({
  selectedTrial,
  setSelectedTrial,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  openEnquiry,
  prefersReduced,
}) => (
  <>
    <div className="text-center mb-8">
      <h2 className="type-section-title text-[#C9A227] mb-2 transition-all duration-500 hover:tracking-wide hover:text-[#F5E6A8]">
        Book your trial ride
      </h2>
      <div className="group/divider-sm flex items-center justify-center gap-2">
        <div className="h-[1px] w-12 bg-[#C9A227]/40 transition-all duration-500 group-hover/divider-sm:w-16 group-hover/divider-sm:bg-[#C9A227]" />
        <svg className="w-4 h-4 text-[#C9A227] transition-transform duration-500 group-hover/divider-sm:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <div className="h-[1px] w-12 bg-[#C9A227]/40 transition-all duration-500 group-hover/divider-sm:w-16 group-hover/divider-sm:bg-[#C9A227]" />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <TrialOption
        selected={selectedTrial === 'free'}
        onClick={() => setSelectedTrial('free')}
        minutes="10 Minutes"
        title="Free trial ride"
        price="Free"
        prefersReduced={prefersReduced}
      />
      <TrialOption
        selected={selectedTrial === 'premium'}
        onClick={() => setSelectedTrial('premium')}
        minutes="45 Minutes"
        title="Trial ride"
        price="₹1,999"
        prefersReduced={prefersReduced}
      />
    </div>

    <div className="space-y-5">
      <div className="group/field">
        <label className="block text-[#C9A227] type-eyebrow mb-2 transition-all duration-500 group-focus-within/field:tracking-[0.25em]">
          Select Date
        </label>
        <DatePicker value={selectedDate} onChange={setSelectedDate} theme="dark" ariaLabel="Select trial ride date" />
      </div>

      <div className="group/field">
        <label className="block text-[#C9A227] type-eyebrow mb-2 transition-all duration-500 group-focus-within/field:tracking-[0.25em]">
          Select Time
        </label>
        <TimePicker value={selectedTime} onChange={setSelectedTime} theme="dark" ariaLabel="Select trial ride time" />
      </div>

      <div>
        <label className="block text-[#C9A227] type-eyebrow mb-2">Your Details</label>
        <div className="space-y-3">
          <InteractiveInput type="text" placeholder="Full Name" prefersReduced={prefersReduced} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InteractiveInput type="text" placeholder="Age" prefersReduced={prefersReduced} />
            <InteractiveInput type="tel" placeholder="Phone / WhatsApp" prefersReduced={prefersReduced} />
          </div>
        </div>
      </div>

      <SubmitButton onClick={() => openEnquiry('Trial Ride')} prefersReduced={prefersReduced} />

      <div className="text-center">
        <p className="group/wa text-white/60 text-xs flex items-center justify-center gap-2 transition-colors duration-500 hover:text-white/90">
          <svg className="w-4 h-4 text-[#C9A227] transition-transform duration-500 group-hover/wa:scale-125 group-hover/wa:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Booking confirmation via WhatsApp
        </p>
      </div>
    </div>
  </>
);

// ═══════════════════════════════════════════════════════════════
// InteractiveInput — focus underline + hover bg tint + icon glow
// ═══════════════════════════════════════════════════════════════

const InteractiveInput = ({ type, placeholder, prefersReduced }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="group/input relative">
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 transition-all duration-300 hover:border-[#C9A227]/40 hover:bg-[#0C0922]/80 focus:outline-none focus:border-[#C9A227]"
      />
      {/* Focus underline */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-3 right-3 h-[1px] bg-[#C9A227] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE_PRIMARY }}
      />
      {/* Hover spotlight */}
      {!prefersReduced && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg bg-[#C9A227]/0 transition-colors duration-500 group-hover/input:bg-[#C9A227]/[0.04]"
        />
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SubmitButton — magnetic + shine sweep + spotlight + arrow slide
// ═══════════════════════════════════════════════════════════════

const SubmitButton = ({ onClick, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 15, stiffness: 220, mass: 0.4 });
  const sy = useSpring(my, { damping: 15, stiffness: 220, mass: 0.4 });
  const x = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const y = useTransform(sy, [-0.5, 0.5], [-4, 4]);

  const spotLeft = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const spotTop  = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={prefersReduced ? undefined : { x, y }}
      whileHover={prefersReduced ? undefined : { scale: 1.02 }}
      whileTap={prefersReduced ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: EASE_PRIMARY }}
      className="relative"
    >
      <button
        type="button"
        onClick={onClick}
        className="group/btn type-button relative w-full overflow-hidden rounded-lg bg-[#C9A227] py-4 text-[#0C0922] transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_-8px_rgba(201,162,39,0.7)]"
      >
        {/* Cursor spotlight inside button */}
        {!prefersReduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-400 group-hover/btn:opacity-100"
            style={{
              left: spotLeft,
              top: spotTop,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 45%, transparent 78%)',
              filter: 'blur(20px)',
            }}
          />
        )}

        {/* Shine sweep */}
        {!prefersReduced && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
          />
        )}

        <span className="relative inline-flex items-center justify-center gap-2">
          BOOK YOUR TRIAL RIDE
          <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5">
            →
          </span>
        </span>
      </button>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TrialOption — hover border glow + checkmark scale
// ═══════════════════════════════════════════════════════════════

const TrialOption = ({ selected, onClick, minutes, title, price, prefersReduced }) => (
  <motion.button
    onClick={onClick}
    whileHover={prefersReduced ? undefined : { y: -3, scale: 1.02 }}
    whileTap={prefersReduced ? undefined : { scale: 0.98 }}
    transition={{ duration: 0.25, ease: EASE_PRIMARY }}
    className={`group/trial relative rounded-2xl border bg-[#0C0922] p-4 text-center transition-all duration-500 ${
      selected
        ? 'border-[#C9A227] shadow-[0_0_30px_-8px_rgba(201,162,39,0.5)]'
        : 'border-[#C9A227]/30 hover:border-[#C9A227]/70 hover:shadow-[0_0_20px_-8px_rgba(201,162,39,0.4)]'
    }`}
  >
    {/* Selected pulse glow */}
    {selected && (
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: '0 0 24px rgba(201,162,39,0.28)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    )}

    {/* Hover spotlight */}
    {!prefersReduced && (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[#C9A227]/0 transition-colors duration-500 group-hover/trial:bg-[#C9A227]/[0.05]"
      />
    )}

    <div className="flex justify-center mb-2">
      <svg className="w-6 h-6 text-[#C9A227] transition-transform duration-500 group-hover/trial:scale-110 group-hover/trial:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <p className="text-white font-bold text-xs mb-1 uppercase transition-all duration-500 group-hover/trial:tracking-wider">{minutes}</p>
    <p className="type-card-title text-white mb-2 transition-colors duration-500 group-hover/trial:text-[#F5E6A8]">{title}</p>
    <p className="type-card-title text-[#C9A227] transition-all duration-500 group-hover/trial:tracking-wide">{price}</p>
    <div className="mt-3 flex justify-center">
      <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-500 ${
        selected ? 'border-[#C9A227] scale-110' : 'border-white/30 group-hover/trial:border-[#C9A227]/60 group-hover/trial:scale-110'
      }`}>
        {selected && (
          <motion.div
            initial={prefersReduced ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="h-2 w-2 rounded-full bg-[#C9A227]"
          />
        )}
      </div>
    </div>
  </motion.button>
);

export default HeroSection;