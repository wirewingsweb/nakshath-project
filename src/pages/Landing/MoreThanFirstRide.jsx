import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import ShinyText from '../../components/ShinyText';
import { EASE, EASE_SNAP } from '../../utils/landing-motion';

/* ============================================================
   LETTER CASCADE — each char rotates in on X-axis
   ============================================================ */
const CascadeText = ({ text, delay = 0, className = '' }) => {
  const chars = text.split('');
  return (
    <span className={className}>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 0.75,
            delay: delay + i * 0.03,
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
   CURSOR SPOTLIGHT — gold halo follows the mouse over the image
   ============================================================ */
const CursorSpotlight = ({ containerRef }) => {
  const [pos, setPos] = useState({ x: '50%', y: '50%', visible: false });

  const onMove = (e) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setPos({
      x: `${e.clientX - r.left}px`,
      y: `${e.clientY - r.top}px`,
      visible: true,
    });
  };
  const onLeave = () => setPos((p) => ({ ...p, visible: false }));

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
      style={{
        opacity: pos.visible ? 1 : 0,
        background: `radial-gradient(320px circle at ${pos.x} ${pos.y}, rgba(201,162,39,0.28), transparent 60%)`,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    />
  );
};

/* ============================================================
   FEATURE ROW — differential scroll drift per row
   ============================================================ */
const FeatureRow = ({ feature, idx, progress }) => {
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  // Differential drift: 1.5 / 2.4 / 3.3 %
  const range = 1.5 + idx * 0.9;
  const driftY = useTransform(
    progress,
    [0, 0.5, 1],
    [`${range}%`, '0%', `${-range}%`]
  );
  const driftY_s = useSpring(driftY, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  return (
    <motion.div
      style={{
        y: shouldReduce ? 0 : driftY_s,
        willChange: 'transform',
      }}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.8, delay: 0.3 + idx * 0.15, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border-t border-[#1A1A1A]/10 py-7 last:border-b"
    >
      {/* Gold sweep on hover */}
      <motion.span
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="pointer-events-none absolute left-0 top-0 h-full w-full origin-left bg-[#C9A227]/[0.05]"
      />

      <div className="relative flex items-start gap-5 md:gap-8">
        <motion.span
          animate={{
            x: hovered ? 4 : 0,
            color: hovered ? '#C9A227' : 'rgba(201,162,39,0.35)',
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-1 shrink-0 font-serif text-2xl italic tabular-nums md:text-3xl"
        >
          {String(idx + 1).padStart(2, '0')}
        </motion.span>

        <motion.div
          animate={{
            rotate: hovered ? 12 : 0,
            scale: hovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-1 shrink-0"
        >
          {feature.icon}
        </motion.div>

        <div className="min-w-0 flex-1">
          <motion.h4
            animate={{ letterSpacing: hovered ? '0.02em' : '0em' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mb-2 text-base font-bold uppercase tracking-wider text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#876B18] md:text-lg"
          >
            {feature.title}
          </motion.h4>

          <p className="type-small max-w-md text-[#1A1A1A]/70 transition-colors duration-500 group-hover:text-[#1A1A1A]/90">
            {feature.desc}
          </p>

          <motion.div
            initial={false}
            animate={{
              height: hovered ? 'auto' : 0,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="mt-3 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
              <span className="inline-block h-px w-6 bg-[#C9A227]" />
              Part of every session
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   MAIN
   ============================================================ */
const MoreThanFirstRide = () => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const shouldReduce = useReducedMotion();

  /* ============================================================
     Scroll cameras — section-level, plus one tracker for the
     feature-row depth field.
     ============================================================ */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Existing image parallax (kept, but converted to spring)
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);
  const imageY_s = useSpring(imageY, { stiffness: 85, damping: 28, mass: 0.65 });
  const imageScale_s = useSpring(imageScale, {
    stiffness: 85,
    damping: 28,
    mass: 0.65,
  });

  // Gold thread (kept as-is)
  const threadProgress = useTransform(scrollYProgress, [0.25, 0.9], [0, 1]);

  // Left image column counter-drift — one direction
  const leftColumnY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['2.5%', '0%', '-2.5%']
  );
  const leftColumnY_s = useSpring(leftColumnY, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  // Right content column counter-drifts the opposite way
  const rightColumnY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['-1.5%', '0%', '1.5%']
  );
  const rightColumnY_s = useSpring(rightColumnY, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  const features = [
    {
      title: 'Professional Coaching',
      desc: 'Guidance within a structured riding environment — not corrections after the fact.',
      icon: (
        <svg className="h-9 w-9 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      title: 'Well-Trained Horses',
      desc: 'Well-schooled, safe and reliable horses matched to riders of different levels.',
      icon: (
        <svg className="h-9 w-9 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Structured Progression',
      desc: 'Walk → Trot → Canter → National & International Competitions.',
      icon: (
        <svg className="h-9 w-9 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F2F0EB] py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">

          {/* ==================================================
              LEFT — Sticky image + counter-drift
              ================================================== */}
          <motion.div
            style={{
              y: shouldReduce ? 0 : leftColumnY_s,
              willChange: 'transform',
            }}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-32">
              <div ref={imageWrapRef} className="group relative">
                <motion.div
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1.3, ease: EASE_SNAP, delay: 0.1 }}
                  className="pointer-events-none absolute inset-0 z-30 origin-left bg-[#F2F0EB]"
                />
                <motion.div
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1.3, ease: EASE_SNAP, delay: 0.1 }}
                  className="pointer-events-none absolute inset-0 z-30 origin-right bg-[#F2F0EB]"
                />

                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1, delay: 1.4, ease: EASE }}
                  className="pointer-events-none absolute left-0 top-0 h-[2px] w-full origin-left bg-[#C9A227] z-20"
                />
                <motion.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1, delay: 1.6, ease: EASE }}
                  className="pointer-events-none absolute right-0 top-0 h-full w-[2px] origin-top bg-[#C9A227] z-20"
                />
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1, delay: 1.8, ease: EASE }}
                  className="pointer-events-none absolute bottom-0 right-0 h-[2px] w-full origin-right bg-[#C9A227] z-20"
                />

                <div className="relative overflow-hidden rounded-sm">
                  <motion.img
                    style={{
                      y: shouldReduce ? 0 : imageY_s,
                      scale: shouldReduce ? 1 : imageScale_s,
                      willChange: 'transform',
                    }}
                    src="/page 2 gpt.webp"
                    alt="Rider with horse"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0922]/45 via-transparent to-transparent" />
                  <CursorSpotlight containerRef={imageWrapRef} />
                </div>

                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.6, delay: 2, ease: [0.34, 1.56, 0.64, 1] }}
                  className="pointer-events-none absolute -left-3 -top-3 h-5 w-5 border-l-2 border-t-2 border-[#C9A227]"
                />
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.6, delay: 2.1, ease: [0.34, 1.56, 0.64, 1] }}
                  className="pointer-events-none absolute -bottom-3 -right-3 h-5 w-5 border-b-2 border-r-2 border-[#C9A227]"
                />

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.8, delay: 2.2, ease: EASE }}
                  className="absolute bottom-5 left-5 z-20 flex items-center gap-3"
                >
                  <span className="inline-block h-px w-8 bg-[#C9A227]" />
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white/90">
                    Sarjapura · Bengaluru
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ==================================================
              RIGHT — Editorial content + counter-drift + row depth field
              ================================================== */}
          <motion.div
            style={{
              y: shouldReduce ? 0 : rightColumnY_s,
              willChange: 'transform',
            }}
            className="lg:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mb-6 flex items-center gap-4"
            >
              <span className="type-eyebrow text-[#C9A227]">More Than</span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 100 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: EASE }}
                className="h-[1px] bg-[#C9A227]/40"
              />
            </motion.div>

            <h2 className="type-page-title mb-5 leading-[1.05]">
              <span className="block text-[#1A1A1A]">
                <CascadeText text="A" delay={0.3} />
              </span>
              <span className="block">
                <ShinyText
                  text="First Ride"
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
              className="mb-8 h-[2px] w-20 origin-left bg-[#C9A227]/50"
            />

            <motion.p
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
              className="type-lead mb-10 max-w-xl text-[#1A1A1A]/85"
            >
              Equestrian sports bring together athletic skill, partnership with
              horses, discipline and training. At Nakshath, your first ride is an
              introduction to that world.
            </motion.p>

            <div className="relative">
              <span className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-[#1A1A1A]/10 md:block" />
              <motion.span
                style={{ scaleY: threadProgress }}
                className="pointer-events-none absolute left-0 top-0 hidden h-full w-px origin-top bg-[#C9A227] md:block"
              />

              <div className="md:pl-0">
                {features.map((feature, idx) => (
                  <FeatureRow
                    key={idx}
                    feature={feature}
                    idx={idx}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: EASE }}
              className="mt-8 flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/40"
            >
              <span className="h-px w-6 bg-[#C9A227]/60" />
              Hover a line to preview
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MoreThanFirstRide;