import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { viewportOnce } from '../utils/animations';

// ============================================================
// TIMELINE SECTION
// ============================================================
const TimelineSection = ({ number, title, eyebrow, children, isLeft = true }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 1]);

  return (
    <div ref={ref} className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
      {/* DOT + LINE SIDE (Mobile: top, Desktop: alternating) */}
      <div className={`flex ${isLeft ? 'md:order-1' : 'md:order-2'} md:justify-${isLeft ? 'end' : 'start'} items-start md:items-center`}>
        <motion.div
          className="flex items-center gap-4"
          style={{ opacity, y }}
        >
          <div className={`flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'} gap-2`}>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
              {eyebrow}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white">
              {title}
            </h3>
          </div>
        </motion.div>
      </div>

      {/* NUMBER DOT (CENTER) */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
        style={{ scale: dotScale }}
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#0C0922]">
          <span className="font-serif text-sm font-bold text-[#C9A227]">{number}</span>
          <motion.span
            className="absolute inset-0 rounded-full border border-[#C9A227]"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* CONTENT SIDE */}
      <motion.div
        className={`${isLeft ? 'md:order-2' : 'md:order-1'} md:pt-4`}
        style={{ opacity, y }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const practiceItems = [
    { title: 'Coaching from inside the competitive system', desc: "Technique taught the way it's judged, not the way it's improvised." },
    { title: "A covered arena, so the calendar doesn't break", desc: 'Bengaluru loses riding days to monsoon and summer afternoons. Ours don\'t stop.' },
    { title: 'International-standard geotextile footing', desc: 'The surface used at competition venues — consistent grip, cushioning, and lower injury risk.' },
    { title: 'Limited riders per batch', desc: 'Progress comes from corrected repetitions, which needs a coach watching one rider at a time.' },
    { title: 'A dressage arena built to standard dimensions', desc: "Riders practice on the same geometry they'll be marked on." },
  ];

  const achievements = [
    { num: '01', title: 'Silver, CSIO International', desc: 'Show jumping under FEI rules — the sport\'s world governing body.' },
    { num: '02', title: 'Bronze, Junior National 2025', desc: 'A national podium finish in the most recent championship.' },
    { num: '03', title: 'Long-listed, Team India', desc: '2026 Asian Games — the pool from which India\'s squad is chosen.' },
  ];

  const siteMapCategories = [
    { label: 'Equestrian Core', items: ['Indoor Arena', 'Outdoor Arena', 'Lunging Pen', 'Dressage Arena', 'Stables', 'Tack Shop'] },
    { label: 'Service', items: ['Office & Admin', 'Buggy Point', 'Security Cabin', 'Staff Accommodation'] },
    { label: 'Public', items: ['Café', 'Gallery'] },
    { label: 'Hospitality', items: ['Cottages', 'Common Pavilion'] },
  ];

  return (
    <div className="min-h-screen bg-[#0C0922] overflow-hidden">

      {/* ============================================================ */}
      {/* CINEMATIC HERO */}
      {/* ============================================================ */}
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden nav-dark-hero">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <img
            src="/page 2 gpt.png"
            alt="Rider with horse"
            className="h-full w-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/70 via-[#0C0922]/50 to-[#0C0922]" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <motion.div
            className="max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="mb-6 font-mono text-[0.65rem] uppercase tracking-[0.4em] text-[#C9A227]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              The Story
            </motion.p>

            <motion.h1
              className="type-display text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Built by a Rider.
              <br />
              <span className="text-[#C9A227]">Designed for Riders.</span>
            </motion.h1>

            <motion.p
              className="mx-auto max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              Nakshath Equestrian Club is led by an active competitive rider with international show-jumping experience.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              className="mt-16 flex flex-col items-center gap-3 text-[#C9A227]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em]">
                Scroll the story
              </span>
              <motion.svg
                width="20"
                height="30"
                viewBox="0 0 20 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path d="M10 4V26M10 26L4 20M10 26L16 20" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TIMELINE CONTAINER */}
      {/* ============================================================ */}
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">

        {/* Vertical center line */}
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C9A227]/30 to-transparent md:block" />

        {/* ============================================================ */}
        {/* SECTION 01 — WHO LEADS */}
        {/* ============================================================ */}
        <TimelineSection
          number="01"
          eyebrow="Chapter 01"
          title="Who Leads The Academy"
          isLeft={true}
        >
          <div className="rounded-3xl border border-[#C9A227]/20 bg-[#FDFCFA]/[0.02] p-6 backdrop-blur-sm md:p-8">
            {/* Image Carousel */}
            <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#F2F0EB]">
              <div
                className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
              >
                <img src="/founder 1.png" alt="Nakshath Venkatesh" className="h-full w-full shrink-0 object-cover" />
                <img src="/page 2 gpt.png" alt="Nakshath with Horse" className="h-full w-full shrink-0 object-cover" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {[0, 1].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-6 bg-[#C9A227]' : 'w-2 bg-white/40'}`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <h3 className="mb-1 font-serif text-xl text-white md:text-2xl">Nakshath Venkatesh</h3>
            <p className="mb-6 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
              Founder
            </p>

            <div className="space-y-3">
              {achievements.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-4 border-l-2 border-[#C9A227]/40 pl-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: idx * 0.1, duration: 0.7 }}
                >
                  <span className="font-mono text-[0.6rem] text-[#C9A227]">{item.num}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#C9A227]/20 pt-6">
              <p className="text-sm italic leading-relaxed text-white/70">
                "To create a world-class environment and a gateway to the Olympics, where riders of all levels can develop confidence, skill, and the mindset required to succeed in competitive equestrianism."
              </p>
            </div>
          </div>
        </TimelineSection>

        {/* ============================================================ */}
        {/* SECTION 02 — IN PRACTICE */}
        {/* ============================================================ */}
        <div className="mt-32 md:mt-48">
          <TimelineSection
            number="02"
            eyebrow="Chapter 02"
            title="In Practice"
            isLeft={false}
          >
            <div className="space-y-4">
              {practiceItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="rounded-xl border border-[#C9A227]/15 bg-[#FDFCFA]/[0.02] p-4 backdrop-blur-sm md:p-5"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: idx * 0.08, duration: 0.6 }}
                  whileHover={{ x: 6, borderColor: 'rgba(201,162,39,0.5)' }}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[0.6rem] text-[#C9A227]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="font-serif text-sm text-white md:text-base">{item.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-white/50 md:text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TimelineSection>
        </div>

        {/* ============================================================ */}
        {/* SECTION 03 — VISION & MISSION */}
        {/* ============================================================ */}
        <div className="mt-32 md:mt-48">
          <TimelineSection
            number="03"
            eyebrow="Chapter 03"
            title="Vision & Mission"
            isLeft={true}
          >
            <div className="space-y-6">
              <motion.div
                className="rounded-2xl border border-[#C9A227]/20 bg-gradient-to-br from-[#C9A227]/[0.08] to-transparent p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7 }}
              >
                <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                  Vision
                </p>
                <p className="text-sm leading-relaxed text-white/85 md:text-base">
                  To create a world-class environment and a gateway to the Olympics, where riders of all levels can develop confidence, skill, and the mindset required to succeed in competitive equestrianism.
                </p>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-[#C9A227]/20 bg-gradient-to-br from-[#C9A227]/[0.08] to-transparent p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                  Mission
                </p>
                <p className="text-sm leading-relaxed text-white/85 md:text-base">
                  To inspire discipline, strength, and excellence through world-class equestrian sports training and experiences in a professional, top-tier environment.
                </p>
              </motion.div>
            </div>
          </TimelineSection>
        </div>

        {/* ============================================================ */}
        {/* SECTION 04 — THE CAMPUS */}
        {/* ============================================================ */}
        <div className="mt-32 md:mt-48">
          <TimelineSection
            number="04"
            eyebrow="Chapter 04"
            title="The Campus"
            isLeft={false}
          >
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                Three riding arenas sit at the centre of the site — a covered indoor arena, an outdoor arena, and a dressage arena built to standard competition dimensions. Stables, a lunging pen and the tack room sit alongside them.
              </p>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                The café, pavilion and cottages are set apart from the working areas, so visitors and riders are never crossing the same ground.
              </p>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                The campus is in its final phase of construction. Images shown are architectural drawings.
              </p>

              {/* Map */}
              <motion.div
                className="overflow-hidden rounded-2xl border border-[#C9A227]/20 bg-[#FDFCFA]/[0.02] p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1 }}
              >
                <div className="mb-4 overflow-hidden rounded-xl bg-[#F5F1E8]">
                  <img
                    src="/page 3 gpt.png"
                    alt="Campus Map"
                    className="h-auto w-full object-contain"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {siteMapCategories.map((cat, idx) => (
                    <motion.div
                      key={idx}
                      className="border-b border-[#C9A227]/15 pb-3 last:border-b-0"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportOnce}
                      transition={{ delay: idx * 0.08, duration: 0.5 }}
                    >
                      <h5 className="mb-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#C9A227]">
                        {cat.label}
                      </h5>
                      <ul className="space-y-0.5 text-[0.7rem] text-white/70">
                        {cat.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </TimelineSection>
        </div>

        {/* ============================================================ */}
        {/* END MARKER */}
        {/* ============================================================ */}
        <motion.div
          className="mt-32 flex flex-col items-center gap-4 md:mt-48"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
        >
          <div className="h-16 w-px bg-gradient-to-b from-[#C9A227]/60 to-transparent" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#C9A227]/60">
            End of Chapter
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default About;