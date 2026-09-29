import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEnquiry } from '../context/EnquiryContext';
import { viewportOnce } from '../utils/animations';

// ============================================================
// FLOATING PARTICLES
// ============================================================
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 6,
  size: 1 + Math.random() * 2,
}));

// ============================================================
// TEXT REVEAL
// ============================================================
const TextReveal = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.5,
                delay: delay + (wordIndex * word.length + letterIndex) * 0.02,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

// ============================================================
// PROGRAM BLOCK
// ============================================================
const ProgramBlock = ({ program, index }) => {
  const ref = useRef(null);
  const isReversed = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);

  const cardRef = useRef(null);
  const [mouseX, mouseY] = [useMotionValue(0), useMotionValue(0)];
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div ref={ref} className="relative">
      <div className={`flex flex-col items-center gap-10 lg:gap-16 ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

        {/* IMAGE */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: isReversed ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="group relative overflow-hidden rounded-3xl shadow-2xl"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          >
            <motion.div style={{ y: imageY, scale: imageScale }}>
              <img
                src={program.img}
                alt={program.title}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
            </motion.div>

            {/* Number badge */}
            <motion.div
              className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#0C0922]/80 backdrop-blur-md"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-[#C9A227]"
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <span className="relative z-10 font-serif text-base font-bold text-[#C9A227]">
                {program.num}
              </span>
            </motion.div>

            {/* Hover golden border */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-500 group-hover:border-[#C9A227]/70" />
          </motion.div>
        </motion.div>

        {/* CONTENT */}
        <div className="w-full lg:w-1/2">
          <motion.div
            className="mb-5 flex items-center gap-4"
            initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="h-px w-12 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
              {program.eyebrow}
            </span>
          </motion.div>

          <h3 className="type-card-title mb-6 text-[#1A1A1A]">
            <TextReveal text={program.title} delay={0.3} />
          </h3>

          <motion.div
            className="mb-6 h-[2px] bg-gradient-to-r from-[#876B18] to-[#C9A227]"
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={viewportOnce}
            transition={{ delay: 0.9, duration: 1 }}
          />

          {program.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="mb-4 text-[#5A5A66] font-normal leading-relaxed text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 1 + i * 0.15, duration: 0.8 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const Courses = () => {
  const { openEnquiry } = useEnquiry();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const programs = [
    {
      num: '01',
      eyebrow: 'From Five Years Old',
      title: 'Kids Special Riding Program',
      img: '/kids-special.webp',
      paragraphs: [
        'Children start on ponies, on the ground, learning to approach, handle, and tack up before they learn to sit on one.',
        'Pony riding, confidence building, physical coordination, and horsemanship.',
      ],
    },
    {
      num: '02',
      eyebrow: 'No Experience Needed',
      title: 'Beginner Program',
      img: '/beginner-program.webp',
      paragraphs: [
        'For first-time riders of any age. You will learn how a horse thinks and moves before you learn to sit on one.',
        'The skills you build here apply at every level.',
      ],
    },
    {
      num: '03',
      eyebrow: 'For Riders Building Independence',
      title: 'Intermediate Training',
      img: '/intermediate-program.webp',
      paragraphs: [
        'Once you are steady on a flat, the work becomes about communication — asking nicely and getting a considered answer.',
        'The pace slows, the detail gets finer, and the riding changes.',
      ],
    },
  ];

  const levels = [
    { level: 'Level 1', sessions: '10 lessons', price: '₹11,999', label: 'Getting started' },
    { level: 'Level 2', sessions: '20 lessons', price: '₹29,999', label: 'Building the seat' },
    { level: 'Level 3', sessions: '20 lessons', price: '₹32,999', label: 'Trot to canter' },
  ];

  const disciplines = [
    { title: 'Show Jumping', status: 'Taught Here', desc: 'Riders guide horses over obstacle courses with speed and accuracy.', img: '/show-jumping.webp' },
    { title: 'Dressage', status: 'Taught Here', desc: 'Harmony, control, and precise movements ridden to a set pattern.', img: '/dressage.webp' },
    { title: 'Eventing', status: 'Coming Soon', desc: 'Combines dressage, cross-country and show jumping.', img: '/eventing.webp' },
  ];

  const groupServices = [
    { title: 'Guest Rides', desc: 'A one-off horse experience, no enrolment.', img: '/beyond-ride-1.webp' },
    { title: 'Summer Camps', desc: 'Holiday programmes for children.', img: '/beyond-ride-2.webp' },
    { title: 'School Visits', desc: 'Group sessions for schools.', img: '/beyond-ride-3.webp' },
    { title: 'Corporate Days', desc: 'Team days on the property.', img: '/beyond-ride-4.webp' },
    { title: 'Photoshoots', desc: 'The arenas and grounds, by arrangement.', img: '/beyond-ride-5.webp' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">

      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <div
        ref={heroRef}
        className="nav-dark-hero relative overflow-hidden bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44"
      >
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity, scale: heroScale }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,162,39,0.10),transparent_60%)]" />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-[#C9A227]"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}px`, height: `${p.size}px` }}
              animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-5 flex items-center gap-4"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="h-px w-12 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#C9A227]">
              Programs
            </span>
          </motion.div>

          <h1 className="type-page-title leading-tight text-white mb-6">
            <TextReveal text="Four ways in," delay={0.3} />
            <br />
            <span className="text-[#C9A227]">
              <TextReveal text="one path forward." delay={1} />
            </span>
          </h1>

          <motion.p
            className="type-lead max-w-2xl text-white/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Whether you have never sat on a horse, or are preparing for a competition, the route through is the same one.
          </motion.p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PROGRAM BLOCKS */}
      {/* ============================================================ */}
      <div className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="mx-auto max-w-7xl space-y-32 px-6">
          {programs.map((program, index) => (
            <ProgramBlock key={program.num} program={program} index={index} />
          ))}

          {/* ============================================================ */}
          {/* PROFESSIONAL COMPETITION — DARK CARD */}
          {/* ============================================================ */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-[#0C0922]"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center gap-8 p-8 md:p-12 lg:flex-row lg:p-16">
              <div className="w-full lg:w-[55%]">
                <motion.div
                  className="mb-4 flex items-center gap-3"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7 }}
                >
                  <span className="h-px w-8 bg-[#C9A227]" />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                    For Competing Riders
                  </span>
                </motion.div>

                <h3 className="type-section-title mb-6 leading-tight text-white">
                  <TextReveal text="Professional" delay={0.2} />
                  <br />
                  <TextReveal text="Competition Training" delay={0.7} />
                </h3>

                <motion.p
                  className="mb-6 max-w-md font-normal leading-relaxed text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  Show jumping and dressage preparation for riders entering competition, coached by a rider currently long-listed for Team India. Course technique, round planning, and performance assessed against the standards you will be judged on.
                </motion.p>

                <motion.p
                  className="font-normal leading-relaxed text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  Show jumping preparation · Technique · Performance assessment · Advanced training sessions
                </motion.p>
              </div>

              <div className="flex w-full justify-center lg:w-[45%]">
                <motion.div
                  className="w-full max-w-md overflow-hidden rounded-3xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.5, duration: 1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <motion.img
                    src="/pro-training.webp"
                    alt="Professional Competition Training"
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1 }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* STRUCTURE TABLE */}
      {/* ============================================================ */}
      <div className="bg-[#FDFCFA] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-5 flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <span className="h-px w-12 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
              Structure
            </span>
          </motion.div>

          <h2 className="type-section-title mb-6 text-[#1A1A1A]">
            <TextReveal text="Fifty lessons to a canter." delay={0.2} />
          </h2>

          <motion.p
            className="type-lead mb-16 max-w-3xl text-[#5A5A66]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Riders progress in blocks. Level 1 is ten lessons — enough to know whether riding is for you. Levels 2 and 3 are twenty each. Most riders reach a confident, independent canter by the end of the third.
          </motion.p>

          <div className="overflow-hidden rounded-2xl border border-[#5A5A66]/15">
            {/* Header Row */}
            <motion.div
              className="grid grid-cols-2 gap-4 border-b border-[#5A5A66]/15 bg-[#0C0922]/[0.02] px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#C9A227] md:grid-cols-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div>Level</div>
              <div>Sessions</div>
              <div>Price</div>
              <div>What It Covers</div>
            </motion.div>

            {/* Rows */}
            {levels.map((level, idx) => (
              <motion.div
                key={idx}
                className="group grid grid-cols-2 gap-4 border-b border-[#5A5A66]/15 px-6 py-6 transition-colors last:border-b-0 hover:bg-[#0C0922]/[0.02] md:grid-cols-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.4 + idx * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.6rem] text-[#C9A227]/60">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-lg text-[#C9A227] transition-colors group-hover:text-[#876B18]">
                    {level.level}
                  </span>
                </div>
                <div className="text-[#5A5A66] font-normal">{level.sessions}</div>
                <div className="font-serif text-xl text-[#1A1A1A] transition-transform group-hover:scale-105">
                  {level.price}
                </div>
                <div className="text-[#5A5A66] font-normal">{level.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* START WITH TEN MINUTES */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden bg-[#0C0922] py-32">
        <motion.img
          src="/start-10-min.webp"
          alt="Horse Face"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-right"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922] via-[#0C0922]/85 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <h2 className="type-page-title mb-12 text-white">
            <TextReveal text="Start with ten minutes." delay={0.3} />
          </h2>

          <div className="flex flex-col gap-12 md:flex-row md:gap-24">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <h4 className="mb-3 text-sm font-bold text-[#C9A227]">Free</h4>
              <p className="mb-3 text-xl font-bold text-white">10 minutes · No charge</p>
              <p className="type-body text-white/70">Meet the horses, sit on one, see the arena.</p>
              <div className="mt-8">
                <motion.button
                  onClick={() => openEnquiry('Trial Ride')}
                  className="group inline-flex items-center gap-2 border-b-2 border-[#C9A227] pb-1 text-sm font-bold text-[#C9A227] transition-colors hover:border-white hover:text-white"
                  whileHover={{ x: 4 }}
                >
                  Book a trial ride
                  <svg width="14" height="9" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
                    <path d="M0 5H16M16 5L12 1M16 5L12 9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <h4 className="mb-3 text-sm font-bold text-[#C9A227]">Paid</h4>
              <p className="mb-3 text-xl font-bold text-white">45 minutes · ₹1,999</p>
              <p className="type-body text-white/70">A full first lesson, with groundwork and time in the saddle.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DISCIPLINES */}
      {/* ============================================================ */}
      <div className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-4 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <span className="h-px w-8 bg-[#876B18]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#876B18]">
              Disciplines
            </span>
          </motion.div>

          <h2 className="type-section-title mb-16 text-[#1A1A1A]">
            <TextReveal text="What the sport is made of." delay={0.2} />
          </h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {disciplines.map((disc, idx) => (
              <motion.div
                key={idx}
                className="group flex flex-col"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#876B18]">
                  {disc.status}
                </p>

                <h3 className="mb-6 font-serif text-xl text-[#1A1A1A] transition-colors group-hover:text-[#876B18] md:text-2xl">
                  {disc.title}
                </h3>

                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <motion.img
                    src={disc.img}
                    alt={disc.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1 }}
                  />

                  {/* Golden border on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-500 group-hover:border-[#C9A227]/70" />
                </div>

                <p className="text-[#5A5A66] font-normal leading-relaxed">{disc.desc}</p>

                {/* Bottom scan */}
                <motion.div
                  className="mt-4 h-[2px] w-0 bg-[#876B18] transition-all duration-500 group-hover:w-16"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BEYOND RIDING */}
      {/* ============================================================ */}
      <div className="bg-[#0C0922] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-4 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <span className="h-px w-8 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
              Beyond Riding
            </span>
          </motion.div>

          <h2 className="type-section-title mb-12 text-white">
            <TextReveal text="Not everyone comes to learn." delay={0.2} />
          </h2>

          <div className="grid grid-cols-2 gap-6 md:flex md:snap-x md:snap-mandatory md:overflow-x-auto md:overscroll-x-contain md:pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
            {groupServices.map((item, idx) => (
              <motion.button
                key={idx}
                onClick={() => openEnquiry('Group Booking')}
                className="group flex flex-col text-left md:basis-[46%] md:shrink-0 md:snap-start lg:basis-auto"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[2/3] w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1 }}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-500 group-hover:border-[#C9A227]/70" />
                </div>

                <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-white transition-colors group-hover:text-[#C9A227]">
                  {item.title}
                </h4>
                <p className="text-sm font-normal leading-relaxed text-white/60 transition-colors group-hover:text-white/85">
                  {item.desc}
                </p>
              </motion.button>
            ))}
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              onClick={() => openEnquiry('Group Booking')}
              className="group inline-flex items-center gap-2 border-b border-[#C9A227] pb-1 text-base font-medium text-white transition-colors hover:text-[#C9A227]"
              whileHover={{ x: 4 }}
            >
              Enquire about group bookings
              <svg width="16" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
                <path d="M0 5H16M16 5L12 1M16 5L12 9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Courses;