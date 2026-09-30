// src/pages/About.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionDots from '../components/SectionDots';
import ShinyText from '../components/ShinyText';
import { EASE_PRIMARY } from '../utils/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useInViewOnce } from '../hooks/useInViewOnce';
import {
  Reveal,
  FadeUp,
  ImageReveal,
  Stagger,
  StaggerItem,
  SplitText,
  DriftImage,
  InteractiveCard,
} from '../components/motion';

const CHAPTERS = [
  { id: 'chapter-about-intro', label: 'Who We Are' },
  { id: 'chapter-practice',    label: 'Practice' },
  { id: 'chapter-vision',      label: 'Vision' },
  { id: 'chapter-campus',      label: 'Campus' },
];

// ═══════════════════════════════════════════════════════════════
// Section wrapper with cursor-following ambient glow
// ═══════════════════════════════════════════════════════════════

const SectionWithGlow = ({ children, className = '', tone = 'dark' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 60, stiffness: 60, mass: 0.8 });
  const smoothY = useSpring(mouseY, { damping: 60, stiffness: 60, mass: 0.8 });
  const glowLeft = useTransform(smoothX, (v) => `${v * 100}%`);
  const glowTop = useTransform(smoothY, (v) => `${v * 100}%`);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      className={`relative ${className}`}
    >
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: glowLeft,
            top: glowTop,
            background:
              tone === 'dark'
                ? 'radial-gradient(circle, rgba(201,162,39,0.14) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)'
                : 'radial-gradient(circle, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.02) 45%, transparent 70%)',
            filter: 'blur(60px)',
            mixBlendMode: tone === 'dark' ? 'screen' : 'multiply',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Practice Row
// ═══════════════════════════════════════════════════════════════

const PracticeRow = ({ item, index, prefersReduced }) => {
  const rowRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 180, mass: 0.6 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 180, mass: 0.6 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);
  const spotlightLeft = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightTop = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMove = (e) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={rowRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative flex flex-col md:flex-row md:items-center border-b border-[#5A5A66]/20 py-6 md:py-8 transition-all duration-500 hover:border-[#C9A227]/60 hover:pl-4"
      style={
        prefersReduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }
      }
    >
      {/* Cursor spotlight */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            left: spotlightLeft,
            top: spotlightTop,
            background:
              'radial-gradient(circle at center, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.02) 45%, transparent 75%)',
            filter: 'blur(25px)',
          }}
        />
      )}

      {/* Left accent bar */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-[#C9A227] transition-all duration-500 group-hover:h-[70%]"
      />

      {/* Number badge */}
      <span className="mb-3 inline-block font-mono text-[11px] font-bold tracking-[0.2em] text-[#876B18]/60 transition-colors duration-500 group-hover:text-[#C9A227] md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:mb-0 md:-ml-8">
        {number}
      </span>

      <h4 className="w-full text-lg font-serif text-[#1A1A1A] transition-all duration-500 group-hover:text-[#876B18] md:w-1/2 md:text-xl">
        {item.title}
      </h4>
      <p className="mt-2 w-full text-sm font-normal leading-relaxed text-[#5A5A66] transition-colors duration-500 group-hover:text-[#1A1A1A] md:mt-0 md:w-1/2 md:pl-8 md:text-base">
        {item.desc}
      </p>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Achievement Item
// ═══════════════════════════════════════════════════════════════

const AchievementItem = ({ item, prefersReduced }) => {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className="group relative pl-0 transition-all duration-500 hover:pl-5"
      whileHover={prefersReduced ? undefined : { y: -2 }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-[calc(100%-0.5rem)]"
      />
      <h4 className="text-base font-bold text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#876B18] md:text-lg">
        {item.title}
      </h4>
      <p className="mt-1 text-sm font-normal leading-relaxed text-[#5A5A66] transition-colors duration-500 group-hover:text-[#1A1A1A]">
        {item.desc}
      </p>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

const About = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);

  const [carouselRef, carouselInView] = useInViewOnce({ amount: 0.3 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const practiceItems = [
    { title: "Coaching from inside the competitive system", desc: "Technique taught the way it's judged, not the way it's improvised." },
    { title: "A covered arena, so the calendar doesn't break", desc: "Bengaluru loses riding days to monsoon and to summer afternoons. Ours don't stop." },
    { title: "International-standard geotextile footing", desc: "The surface used at competition venues — consistent grip, cushioning, and lower injury risk." },
    { title: "Limited riders per batch", desc: "Progress comes from corrected repetitions, which needs a coach watching one rider at a time." },
    { title: "A dressage arena built to standard dimensions", desc: "Riders practice on the same geometry they'll be marked on." },
  ];

  const achievements = [
    { title: "Silver, CSIO* international show jumping", desc: "CSIO competitions are run under Fédération Equestre Internationale rules — the sport's world governing body. Competing at this level requires FEI registration and a qualifying record." },
    { title: "Bronze, Junior National Championship 2025", desc: "A national podium finish in the most recent championship year." },
    { title: "Long-listed, Team India Show Jumping, 2026 Asian Games", desc: "The selection pool from which India's continental squad is chosen." },
  ];

  const siteMapCategories = [
    { label: "Equestrian Core", items: ["1. Indoor Arena", "2. Outdoor Arena", "3. Lunging Pen", "4. Dressage Arena", "5. Stables & Storage Rooms", "6. Tack Shop"] },
    { label: "Service", items: ["Office & Admin", "Buggy Point", "Security Cabin", "Staff Accommodation"] },
    { label: "Public", items: ["Café", "Gallery"] },
    { label: "Hospitality", items: ["Cottages", "Common Pavilion"] },
  ];

  return (
    <div className="min-h-screen bg-[#0C0922]">
      <SectionDots chapters={CHAPTERS} />

      {/* ====== MAIN DARK SECTION ====== */}
      <div className="overflow-hidden bg-[#0C0922] pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* ═══════════════════════════════════════════════════════
              CHAPTER: About Intro
          ═══════════════════════════════════════════════════════ */}
          <SectionWithGlow tone="dark">
            <div id="chapter-about-intro">
              <div className="nav-dark-hero relative pb-24 pt-32 md:pb-28 md:pt-44">
                {/* Top edge gold line */}
                {!prefersReduced && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 right-0 top-20 h-px md:top-32"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.6, delay: 0.3, ease: EASE_PRIMARY }}
                    style={{ originX: 0 }}
                  >
                    <div className="mx-auto h-px w-[min(88%,900px)] bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent" />
                  </motion.div>
                )}

                {/* Eyebrow */}
                <Reveal as="div" y={8} duration={0.5}>
                  <h4 className="group type-eyebrow mb-6 flex cursor-default items-center gap-3">
                    <motion.span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
                      animate={
                        prefersReduced
                          ? { scale: 1, opacity: 1 }
                          : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
                      }
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <ShinyText
                      text="Who We Are"
                      color="#C9A227"
                      shineColor="#F5F1E8"
                      speed={2.5}
                      spread={120}
                    />
                  </h4>
                </Reveal>

                {/* Heading with hover-gold words */}
                <Reveal as="div" y={30} duration={0.7} delay={0.15} amount={0.3}>
                  <h1 className="type-page-title mb-6 text-white leading-tight [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
                    Built by a Rider.{' '}
                    <ShinyText
                      text="Designed for Riders."
                      color="#C9A227"
                      shineColor="#F5F1E8"
                      speed={2.5}
                      spread={120}
                    />
                  </h1>
                </Reveal>

                <FadeUp
                  as="p"
                  size="text"
                  delay={0.35}
                  className="max-w-2xl text-base text-white/70 md:text-lg"
                >
                  Nakshath Equestrian Club is led by an active competitive rider with international show-jumping experience.
                </FadeUp>
              </div>

              {/* Founder Card Carousel */}
              <div
                id="founder"
                className="relative left-1/2 z-10 -mt-12 w-screen -translate-x-1/2 overflow-hidden rounded-t-[3rem] bg-[#FDFCFA]"
              >
                <div className="mx-auto max-w-7xl px-6 py-24">
                  <div className="flex flex-col lg:flex-row">

                    {/* LEFT: Image Carousel with curtain reveal */}
                    <div className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden p-4 md:min-h-[500px] md:p-8 lg:min-h-[700px] lg:w-1/2">
                      <motion.div
                        ref={carouselRef}
                        className="relative flex h-full w-full items-center justify-center"
                        initial={
                          prefersReduced
                            ? false
                            : {
                                clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                                scale: 1.08,
                                opacity: 0,
                              }
                        }
                        animate={
                          carouselInView && !prefersReduced
                            ? {
                                clipPath: [
                                  'polygon(0 0, 0 0, 0 100%, 0 100%)',
                                  'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                ],
                                scale: 1,
                                opacity: 1,
                              }
                            : {}
                        }
                        transition={
                          prefersReduced
                            ? { duration: 0 }
                            : {
                                clipPath: { duration: 1.3, ease: [0.76, 0, 0.24, 1] },
                                scale: { duration: 1.6, delay: 0.2, ease: EASE_PRIMARY },
                                opacity: { duration: 0.6, ease: EASE_PRIMARY },
                              }
                        }
                      >
                        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] bg-[#F2F0EB] shadow-xl ring-1 ring-black/5 md:aspect-auto md:h-[450px] lg:h-[85%]">
                          <div
                            className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
                          >
                            <div className="relative h-full w-full shrink-0">
                              <img
                                src="/founder 1.webp"
                                alt="Nakshath Venkatesh"
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="relative h-full w-full shrink-0">
                              <img
                                src="/page 2 gpt.webp"
                                alt="Nakshath with Horse"
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Bottom gradient for dots visibility */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent"
                          />

                          {/* Carousel Dots with progress indicator */}
                          <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-3">
                            {[0, 1].map((i) => (
                              <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                aria-label={`Slide ${i + 1}`}
                                className="group relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-500 hover:h-2.5"
                                style={{ width: currentSlide === i ? '3rem' : '1.5rem' }}
                              >
                                {currentSlide === i && !prefersReduced && (
                                  <motion.span
                                    key={`progress-${i}`}
                                    className="absolute inset-0 origin-left bg-[#C9A227]"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 5, ease: 'linear' }}
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* RIGHT: Details */}
                    <div className="flex w-full flex-col justify-center p-8 md:p-12 lg:w-1/2 lg:p-16">
                      <FadeUp size="text" delay={0} className="mb-4">
                        <h4 className="type-eyebrow text-[#C9A227]">Who Leads The Academy</h4>
                      </FadeUp>

                      <SplitText
                        as="h2"
                        className="mb-2 font-serif text-[1.5rem] leading-[1.15] text-[#1A1A1A] md:text-[2.25rem]"
                        wordDelay={0.05}
                        startDelay={0.1}
                        amount={0.3}
                      >
                        Nakshath Venkatesh
                      </SplitText>

                      <FadeUp size="text" delay={0.2} className="mb-8">
                        <p className="border-b border-[#C9A227]/30 pb-4 text-sm uppercase tracking-widest text-[#C9A227]">
                          Founder
                        </p>
                      </FadeUp>

                      {/* Achievements */}
                      <Stagger gap={0.12} amount={0.2} className="mb-10 space-y-6">
                        {achievements.map((item, idx) => (
                          <StaggerItem key={idx}>
                            <AchievementItem item={item} prefersReduced={prefersReduced} />
                          </StaggerItem>
                        ))}
                      </Stagger>

                      {/* Bio */}
                      <Stagger gap={0.1} amount={0.2} className="space-y-4 text-sm font-normal leading-relaxed text-[#5A5A66] md:text-base">
                        <StaggerItem>
                          <p className="group relative pl-0 transition-all duration-500 hover:pl-4">
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-full"
                            />
                            Nakshath competes at both national and international level, and built this academy while still riding. The technique taught here is the technique he is judged on.
                          </p>
                        </StaggerItem>
                        <StaggerItem>
                          <p className="group relative pl-0 transition-all duration-500 hover:pl-4">
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-full"
                            />
                            The club takes riders from a first session on a lead rein through to competition entry, in show jumping and dressage, on a campus built for training rather than display.
                          </p>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="mt-6 border-l-2 border-[#C9A227] pl-6 py-2 transition-all duration-500 hover:border-l-4">
                            <p className="text-[#1A1A1A]">
                              To create a world-class environment and a gateway to the Olympics, where riders of all levels can develop confidence, skill, and the mindset required to succeed in competitive equestrianism.
                            </p>
                          </div>
                        </StaggerItem>
                      </Stagger>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </SectionWithGlow>

          {/* ═══════════════════════════════════════════════════════
              CHAPTER: In Practice
          ═══════════════════════════════════════════════════════ */}
          <div id="chapter-practice">
            <div className="relative left-1/2 -mt-px mb-16 w-screen -translate-x-1/2 bg-[#FDFCFA] py-16 md:py-24">
              <SectionWithGlow tone="light">
                <div className="mx-auto max-w-7xl px-6 md:px-24">
                  <FadeUp size="text" className="mb-4">
                    <h4 className="type-eyebrow text-[#C9A227]">In Practice</h4>
                  </FadeUp>

                  <div className="mb-12 [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
                    <SplitText
                      as="h2"
                      className="type-section-title text-[#1A1A1A]"
                      wordDelay={0.04}
                      startDelay={0.1}
                      amount={0.3}
                    >
                      What that means for a rider here.
                    </SplitText>
                  </div>

                  <Stagger gap={0.1} amount={0.15} className="space-y-0">
                    {practiceItems.map((item, idx) => (
                      <StaggerItem key={idx}>
                        <PracticeRow item={item} index={idx} prefersReduced={prefersReduced} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </SectionWithGlow>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              CHAPTER: Vision & Mission
          ═══════════════════════════════════════════════════════ */}
          <SectionWithGlow tone="dark">
            <div id="chapter-vision" className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
              <FadeUp size="text" delay={0}>
                <div className="group relative pl-0 transition-all duration-500 hover:pl-5">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-2 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-[calc(100%-1rem)]"
                  />
                  <h3 className="mb-4 font-serif text-xl text-[#C9A227] md:text-2xl">
                    Vision
                  </h3>
                  <p className="text-base font-normal leading-relaxed text-white/80 transition-colors duration-500 group-hover:text-white">
                    To create a world-class environment and a gateway to the Olympics, where riders of all levels can develop confidence, skill, and the mindset required to succeed in competitive equestrianism.
                  </p>
                </div>
              </FadeUp>

              <FadeUp size="text" delay={0.15}>
                <div className="group relative pl-0 transition-all duration-500 hover:pl-5">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-2 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-[calc(100%-1rem)]"
                  />
                  <h3 className="mb-4 font-serif text-xl text-[#C9A227] md:text-2xl">
                    Mission
                  </h3>
                  <p className="text-base font-normal leading-relaxed text-white/80 transition-colors duration-500 group-hover:text-white">
                    To inspire discipline, strength, and excellence through world-class equestrian sports training and experiences in a professional, top-tier environment.
                  </p>
                </div>
              </FadeUp>
            </div>
          </SectionWithGlow>

          {/* ═══════════════════════════════════════════════════════
              CHAPTER: Campus
          ═══════════════════════════════════════════════════════ */}
          <div id="chapter-campus" className="mb-16 rounded-[3rem] bg-[#0C0922] px-6 py-16 md:px-5 md:py-20">
            <SectionWithGlow tone="dark">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10">

                {/* Left: Text */}
                <Stagger gap={0.12} amount={0.2} className="space-y-8 text-base font-normal leading-relaxed text-white/80">
                  <StaggerItem>
                    <h4 className="type-eyebrow mb-4 text-[#C9A227]">The Campus</h4>
                  </StaggerItem>

                  <StaggerItem>
                    <h2 className="type-section-title mb-12 text-white">
                      One property, laid out for training.
                    </h2>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="group relative pl-0 transition-all duration-500 hover:pl-4 hover:text-white">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-full"
                      />
                      Three riding arenas sit at the centre of the site — a covered indoor arena, an outdoor arena, and a dressage arena built to standard competition dimensions. Stables, a lunging pen and the tack room sit alongside them.
                    </p>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="group relative pl-0 transition-all duration-500 hover:pl-4 hover:text-white">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-full"
                      />
                      The café, pavilion and cottages are set apart from the working areas, so visitors and riders are never crossing the same ground.
                    </p>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="group relative pl-0 transition-all duration-500 hover:pl-4 hover:text-white">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-full"
                      />
                      The campus is in its final phase of construction. Images shown are architectural drawings.
                    </p>
                  </StaggerItem>
                </Stagger>

                {/* Right: Map & Legend Card */}
                <Reveal as="div" y={20} duration={0.8} delay={0.15} amount={0.15}>
                  <InteractiveCard
                    as="div"
                    className="w-full rounded-3xl bg-[#FDFCFA] p-4 shadow-2xl transition-all duration-500 hover:shadow-[0_30px_80px_-20px_rgba(201,162,39,0.3)] md:p-6"
                  >
                    <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-[minmax(0,1.5fr)_minmax(13rem,0.9fr)]">

                      {/* Map with hover effects */}
                      <div className="group/map relative min-h-[24rem] w-full overflow-hidden rounded-2xl bg-[#F5F1E8] md:min-h-[30rem]">
                        <DriftImage
                          src="/page 3 gpt.webp"
                          alt="Campus Map"
                          drift="subtle"
                          duration={40}
                          targetOpacity={1}
                          className="h-full w-full"
                          imgClassName="block h-full w-full object-contain transition-transform duration-700 group-hover/map:scale-[1.03]"
                        />

                        {/* Gold ring on hover */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover/map:ring-2 group-hover/map:ring-inset"
                        />

                        {/* Corner brackets */}
                        {!prefersReduced && (
                          <>
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute left-4 top-4 h-6 w-6 opacity-0 transition-all duration-500 group-hover/map:left-6 group-hover/map:top-6 group-hover/map:opacity-100"
                            >
                              <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
                              <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
                            </div>
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 opacity-0 transition-all duration-500 group-hover/map:bottom-6 group-hover/map:right-6 group-hover/map:opacity-100"
                            >
                              <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
                              <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Categories */}
                      <div className="grid w-full grid-cols-1 gap-3 rounded-2xl bg-[#0C0922] px-5 py-5 shadow-lg sm:grid-cols-2 md:grid-cols-1 md:px-5 md:py-5">
                        {siteMapCategories.map((cat, idx) => (
                          <div
                            key={idx}
                            className="group/cat border-b border-[#C9A227]/20 pb-3 transition-colors duration-300 last:border-b-0 last:pb-0 hover:border-[#C9A227]/60 sm:last:border-b md:last:border-b-0"
                          >
                            <h5 className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#C9A227] transition-all duration-300 group-hover/cat:tracking-[0.2em]">
                              {cat.label}
                            </h5>
                            <ul className="space-y-1 text-[0.75rem] font-normal leading-[1.45] text-white/85">
                              {cat.items.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 pl-0 transition-all duration-300 hover:pl-2 hover:text-[#C9A227]"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="h-1 w-1 rounded-full bg-[#C9A227]/40 transition-colors duration-300"
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </InteractiveCard>
                </Reveal>

              </div>
            </SectionWithGlow>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;