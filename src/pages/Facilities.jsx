import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { viewportOnce } from '../utils/animations';

// ============================================================
// FLOATING PARTICLES — Ambient background
// ============================================================
const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 6,
  size: 1 + Math.random() * 2,
}));

// ============================================================
// TEXT REVEAL — Letter by letter
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
// ARENA SECTION — Full parallax + spotlight
// ============================================================
const ArenaSection = ({ arena, index }) => {
  const sectionRef = useRef(null);
  const isReversed = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  // Spotlight following cursor
  const [mouseX, mouseY] = [useMotionValue(0), useMotionValue(0)];
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div ref={sectionRef} className="relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex flex-col items-center gap-10 lg:gap-20 ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

          {/* ============================================================ */}
          {/* IMAGE with parallax + 3D tilt + spotlight */}
          {/* ============================================================ */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: isReversed ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
          >
            <motion.div
              className="group relative overflow-hidden rounded-3xl shadow-2xl"
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            >
              {/* Parallax image wrapper */}
              <motion.div style={{ y: imageY, scale: imageScale }} className="relative">
                <img
                  src={arena.img}
                  alt={arena.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />

                {/* Grain texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Dark gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0922]/40 via-transparent to-transparent" />
              </motion.div>

              {/* Floating number badge */}
              <motion.div
                className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#0C0922]/80 backdrop-blur-md"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 200 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full border border-[#C9A227]"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                />
                <span className="relative z-10 font-serif text-base font-bold text-[#C9A227]">
                  {arena.num}
                </span>
              </motion.div>

              {/* Hover golden border */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-500 group-hover:border-[#C9A227]/70" />

              {/* Bottom-left label */}
              <motion.div
                className="absolute bottom-5 left-5 rounded-full border border-[#C9A227]/50 bg-[#0C0922]/80 px-4 py-1.5 backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-[#C9A227]">
                  {arena.label}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ============================================================ */}
          {/* CONTENT with staggered reveal */}
          {/* ============================================================ */}
          <motion.div
            className="w-full lg:w-1/2"
            style={{ y: contentY }}
          >
            {/* Eyebrow with animated line */}
            <motion.div
              className="mb-5 flex items-center gap-4"
              initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="h-px w-12 bg-[#876B18]" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#876B18]">
                Chapter {arena.num}
              </span>
            </motion.div>

            {/* Title with letter reveal */}
            <h3 className="type-card-title mb-6 text-[#1A1A1A]">
              <TextReveal text={arena.title} delay={0.3} />
            </h3>

            {/* Animated divider */}
            <motion.div
              className="mb-6 h-[2px] w-0 origin-left bg-gradient-to-r from-[#876B18] to-[#C9A227]"
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={viewportOnce}
              transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Description with fade */}
            <motion.p
              className="text-[#5A5A66] font-normal leading-relaxed text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 1.2, duration: 0.9 }}
            >
              {arena.desc}
            </motion.p>

            {/* Decorative corner lines */}
            <motion.div
              className="mt-8 flex gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1 rounded-full bg-[#876B18]"
                  initial={{ width: 0 }}
                  whileInView={{ width: i === 0 ? '40px' : '12px' }}
                  viewport={viewportOnce}
                  transition={{ delay: 1.6 + i * 0.1, duration: 0.6 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const Facilities = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const arenas = [
    { title: 'Indoor Arena', label: 'All-Weather', num: '01', desc: 'A covered arena built so training does not stop for monsoon or for summer heat. International-standard geotextile footing, consistent underfoot, and lower injury risk for horse and rider.', img: '/indoor-arena.webp' },
    { title: 'Outdoor Arena', label: 'Sand Surface', num: '02', desc: 'An open sand arena for jumping and flatwork in good weather, with the space to ride a full course and the light to shoot in early morning or late evening.', img: '/outdoor-arena.webp' },
    { title: 'Dressage Arena', label: 'Standard Dimensions', num: '03', desc: 'Built to competition dimensions, so riders practice on the same geometry they will be marked on. The riding area is larger than most people expect.', img: '/dressage-arena.webp' },
    { title: 'Lunging Pen', label: 'Groundwork', num: '04', desc: "A circular pen for working horses on the lunge — warming up, schooling young horses, and teaching riders to read a horse's movement from the ground.", img: '/lunging-pen.webp' },
  ];

  const stables = [
    { title: 'Stables', desc: 'Individual stalls with feeding and grooming areas.', num: '01' },
    { title: 'Saddle Room', desc: 'Tack stored, cleaned and checked in one place.', num: '02' },
    { title: 'Medical Room', desc: 'A dedicated space for treatment and recovery.', num: '03' },
    { title: 'Tack Shop', desc: 'Riding gear and equipment on site.', num: '04' },
  ];

  const beyond = [
    { title: 'Café', desc: 'Warm stone, arches, open through the day.', img: '/cafe.webp', num: '01' },
    { title: 'Common Pavilion', desc: 'Shade and seating for spectators and families.', img: '/common-pavillion.webp', num: '02' },
    { title: 'Lounge Space', desc: 'Open landscaped areas across the campus.', img: '/lounge.webp', num: '03' },
    { title: 'Cottages', desc: 'For visiting riders, trainers and guests.', img: '/cottages.webp', num: '04' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">

      {/* ============================================================ */}
      {/* HERO HEADER — Full parallax with particles */}
      {/* ============================================================ */}
      <div
        ref={heroRef}
        className="nav-dark-hero relative overflow-hidden bg-[#0C0922] pb-24 pt-32 md:pb-32 md:pt-48"
      >
        {/* Gradient mesh */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,162,39,0.12),transparent_60%)]" />
        </motion.div>

        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-[#C9A227]"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-5 flex items-center gap-4"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="h-px w-12 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#C9A227]">
              The Property
            </span>
          </motion.div>

          <h1 className="type-page-title leading-tight text-white mb-6">
            <TextReveal text="Built to be trained on," delay={0.3} />
            <br />
            <span className="text-[#C9A227]">
              <TextReveal text="not looked at." delay={0.9} />
            </span>
          </h1>

          <motion.p
            className="type-lead max-w-2xl text-white/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            Indoor arena, lunging pen, stables and a café, on one campus in Sarjapura.
          </motion.p>

          {/* Corner brackets */}
          <motion.div
            className="absolute right-6 top-32 h-20 w-20 border-r-2 border-t-2 border-[#C9A227]/40 md:right-12 md:top-48"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          />
          <motion.div
            className="absolute right-6 top-36 h-20 w-20 border-b-2 border-l-2 border-[#C9A227]/20 md:right-12 md:top-56"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* ARENAS — Parallax sections */}
      {/* ============================================================ */}
      <div className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="mb-24 text-center">
          <motion.div
            className="mx-auto mb-4 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <span className="h-px w-12 bg-[#876B18]/40" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#876B18]">
              The Arenas
            </span>
            <span className="h-px w-12 bg-[#876B18]/40" />
          </motion.div>

          <h2 className="type-section-title text-[#1A1A1A]">
            Four surfaces.
            <br />
            <span className="text-[#876B18]">One purpose.</span>
          </h2>
        </div>

        <div className="space-y-40">
          {arenas.map((arena, index) => (
            <ArenaSection key={arena.title} arena={arena} index={index} />
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* STABLES */}
      {/* ============================================================ */}
      <div className="w-full bg-[#0C0922] py-0 lg:pb-12 lg:pt-32">
        <div className="flex w-full flex-col items-center lg:flex-row">

          <motion.div
            className="relative w-full bg-[#0C0922] lg:w-[45%]"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pb-8 pr-4 lg:py-12">
              <motion.img
                src="/horse-live.webp"
                alt="Stables interior"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-r-[3rem] shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>

          <div className="flex w-full flex-col justify-center pt-12 pb-16 pl-6 pr-6 lg:w-[55%] lg:py-12 lg:pl-16 lg:pr-24">
            <motion.div
              className="mb-4 flex items-center gap-3"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8 }}
            >
              <span className="h-px w-8 bg-[#C9A227]" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                Equestrian Core
              </span>
            </motion.div>

            <h2 className="type-section-title mb-12 text-white">
              <TextReveal text="Where the horses live." delay={0.3} />
            </h2>

            <motion.div
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
              }}
            >
              {stables.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="group flex items-start gap-5 border-b border-white/10 pb-6 transition-colors hover:border-[#C9A227]/40"
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <span className="font-mono text-[0.7rem] text-[#C9A227]/60 transition-colors group-hover:text-[#C9A227]">
                    {item.num}
                  </span>
                  <div>
                    <h5 className="mb-2 text-sm font-bold uppercase tracking-wider text-[#C9A227]">
                      {item.title}
                    </h5>
                    <p className="text-base font-normal leading-relaxed text-white/60 transition-colors group-hover:text-white/90">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BEYOND THE ARENA — Interactive grid */}
      {/* ============================================================ */}
      <div className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <span className="h-px w-12 bg-[#876B18]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#876B18]">
              Beyond the Arena
            </span>
          </motion.div>

          <h2 className="type-section-title mb-20 text-[#1A1A1A]">
            <TextReveal text="Somewhere to wait," delay={0.2} />
            <br />
            <TextReveal text="and somewhere to stay." delay={0.7} />
          </h2>

          <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
            {beyond.map((item, idx) => (
              <motion.div
                key={idx}
                className="group"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: idx * 0.12,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Dark gradient on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0922]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Number badge */}
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#FDFCFA]/90 backdrop-blur-md">
                    <span className="font-serif text-xs font-bold text-[#876B18]">
                      {item.num}
                    </span>
                  </div>

                  {/* Golden border on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-500 group-hover:border-[#C9A227]/70" />
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.6rem] text-[#C9A227]">
                    {item.num}
                  </span>
                  <h4 className="text-xl font-bold uppercase tracking-wider text-[#1A1A1A] transition-colors group-hover:text-[#876B18] md:text-2xl">
                    {item.title}
                  </h4>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#5A5A66] md:text-base">
                  {item.desc}
                </p>

                {/* Bottom scan line */}
                <motion.div
                  className="mt-4 h-[2px] w-0 bg-gradient-to-r from-[#C9A227] to-transparent transition-all duration-700 group-hover:w-24"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Facilities;