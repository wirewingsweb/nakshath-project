// src/pages/Facilities.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionDots from '../components/SectionDots';
import ShinyText from '../components/ShinyText';
import { EASE_PRIMARY } from '../utils/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
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
  { id: 'chapter-facility-intro', label: 'Property' },
  { id: 'chapter-arenas',         label: 'Arenas' },
  { id: 'chapter-stables',        label: 'Stables' },
  { id: 'chapter-beyond',         label: 'Beyond' },
];

// ═══════════════════════════════════════════════════════════════
// Section wrapper with cursor ambient glow
// ═══════════════════════════════════════════════════════════════

const SectionGlow = ({ children, className = '', tone = 'light' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { damping: 60, stiffness: 60, mass: 0.8 });
  const sy = useSpring(my, { damping: 60, stiffness: 60, mass: 0.8 });
  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section ref={ref} onMouseMove={handleMove} className={`relative ${className}`}>
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left,
            top,
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
// Interactive Arena Image with curtain reveal + hover effects
// ═══════════════════════════════════════════════════════════════

const ArenaImage = ({ src, alt, direction = 'left', aspect = '4/3', prefersReduced, rounded = 'rounded-3xl' }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 25, stiffness: 180, mass: 0.6 });
  const sy = useSpring(my, { damping: 25, stiffness: 180, mass: 0.6 });
  const rX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rY = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const spotLeft = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const spotTop = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  const startClip =
    direction === 'right'
      ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
      : 'polygon(0 0, 0 0, 0 100%, 0 100%)';

  const handleMove = (e) => {
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
      className={`group/img relative w-full overflow-hidden ${rounded} shadow-xl`}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX: rX,
              rotateY: rY,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d',
            }
      }
      initial={
        prefersReduced
          ? false
          : { clipPath: startClip, scale: 1.08, opacity: 0 }
      }
      whileInView={
        prefersReduced
          ? {}
          : { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1, opacity: 1 }
      }
      viewport={{ once: true, amount: 0.3 }}
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
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full object-cover transition-transform duration-700 group-hover/img:scale-110 aspect-[${aspect}]`}
      />

      {/* Cursor spotlight */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/img:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(245,230,168,0.35) 0%, rgba(201,162,39,0.12) 45%, transparent 75%)',
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Gold ring */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${rounded} ring-0 ring-[#C9A227] transition-all duration-500 group-hover/img:ring-2 group-hover/img:ring-inset`}
      />

      {/* Corner brackets */}
      {!prefersReduced && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-4 h-7 w-7 opacity-0 transition-all duration-500 group-hover/img:left-6 group-hover/img:top-6 group-hover/img:opacity-100"
          >
            <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
            <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 opacity-0 transition-all duration-500 group-hover/img:bottom-6 group-hover/img:right-6 group-hover/img:opacity-100"
          >
            <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
            <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
          </div>
        </>
      )}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Beyond Card with letterbox reveal
// ═══════════════════════════════════════════════════════════════

const BeyondCard = ({ item, index, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 25, stiffness: 180, mass: 0.6 });
  const sy = useSpring(my, { damping: 25, stiffness: 180, mass: 0.6 });
  const rX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const spotLeft = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const spotTop = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const delay = index * 0.12;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group flex flex-col"
      style={
        prefersReduced
          ? undefined
          : {
              rotateX: rX,
              rotateY: rY,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d',
            }
      }
    >
      {/* Image wrapper with letterbox reveal */}
      <motion.div
        className="relative mb-5 overflow-hidden rounded-2xl"
        initial={
          prefersReduced
            ? false
            : { opacity: 0, scale: 0.9 }
        }
        whileInView={
          prefersReduced
            ? {}
            : { opacity: 1, scale: 1 }
        }
        viewport={{ once: true, amount: 0.3 }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Ink drop overlay on mount */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#FDFCFA]"
            initial={{ clipPath: 'circle(0% at 0% 0%)' }}
            whileInView={{ clipPath: 'circle(0% at 0% 0%)' }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            style={{ opacity: 0 }}
          />
        )}

        {/* Cursor spotlight */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              left: spotLeft,
              top: spotTop,
              background:
                'radial-gradient(circle, rgba(245,230,168,0.35) 0%, rgba(201,162,39,0.12) 45%, transparent 75%)',
              filter: 'blur(40px)',
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Gold ring */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-2 group-hover:ring-inset"
        />

        {/* Corner brackets */}
        {!prefersReduced && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-3 h-6 w-6 opacity-0 transition-all duration-500 group-hover:left-5 group-hover:top-5 group-hover:opacity-100"
            >
              <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
              <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 opacity-0 transition-all duration-500 group-hover:bottom-5 group-hover:right-5 group-hover:opacity-100"
            >
              <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
              <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
            </div>
          </>
        )}
      </motion.div>

      {/* Text with reveal */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { duration: 0.7, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <h4 className="mb-2 text-xl font-bold uppercase tracking-wider text-[#1A1A1A] transition-all duration-500 group-hover:tracking-[0.15em] group-hover:text-[#876B18]">
          {item.title}
        </h4>
        <p className="text-sm leading-relaxed text-[#5A5A66] transition-colors duration-500 group-hover:text-[#1A1A1A]">
          {item.desc}
        </p>

        {/* Small underline that grows on hover */}
        <span
          aria-hidden="true"
          className="mt-3 block h-px w-0 bg-[#C9A227] transition-all duration-500 group-hover:w-16"
        />
      </motion.div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

const Facilities = () => {
  const prefersReduced = usePrefersReducedMotion();

  const arenas = [
    { title: 'Indoor Arena', label: 'All-Weather', desc: 'A covered arena built so training does not stop for monsoon or for summer heat. International-standard geotextile footing, consistent underfoot, and lower injury risk for horse and rider.', img: '/indoor arena.webp' },
    { title: 'Outdoor Arena', label: 'Sand Surface', desc: 'An open sand arena for jumping and flatwork in good weather, with the space to ride a full course and the light to shoot in early morning or late evening.', img: '/outdoor arena.webp' },
    { title: 'Dressage Arena', label: 'Standard Dimensions', desc: 'Built to competition dimensions, so riders practice on the same geometry they will be marked on. The riding area is larger than most people expect.', img: '/dressage arena.webp' },
    { title: 'Lunging Pen', label: 'Groundwork', desc: 'A circular pen for working horses on the lunge — warming up, schooling young horses, and teaching riders to read a horse\'s movement from the ground.', img: '/lunging pen.webp' },
  ];

  const stables = [
    { title: 'Stables', desc: 'Individual stalls with feeding and grooming areas.' },
    { title: 'Saddle Room', desc: 'Tack stored, cleaned and checked in one place.' },
    { title: 'Medical Room', desc: 'A dedicated space for treatment and recovery.' },
    { title: 'Tack Shop', desc: 'Riding gear and equipment on site.' },
  ];

  const beyond = [
    { title: 'Café', desc: 'Warm stone, arches, open through the day.', img: '/cafe.webp' },
    { title: 'Common Pavilion', desc: 'Shade and seating for spectators and families.', img: '/common pavillion.webp' },
    { title: 'Lounge Space', desc: 'Open landscaped areas across the campus.', img: '/lounge.webp' },
    { title: 'Cottages', desc: 'For visiting riders, trainers and guests.', img: '/cottages.webp' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <SectionDots chapters={CHAPTERS} />

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Property Intro (dark)
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-facility-intro" className="nav-dark-hero bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <SectionGlow tone="dark">
          <div className="mx-auto max-w-7xl px-6">
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

            <Reveal as="div" y={8} duration={0.5}>
              <h4 className="group type-eyebrow mb-4 flex cursor-default items-center gap-3">
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
                <span className="transition-all duration-500 group-hover:tracking-[0.3em]">
                  <ShinyText
                    text="The Property"
                    color="#C9A227"
                    shineColor="#F5F1E8"
                    speed={2.5}
                    spread={120}
                  />
                </span>
              </h4>
            </Reveal>

            <Reveal as="div" y={30} duration={0.7} delay={0.15} amount={0.3}>
              <h1 className="type-page-title mb-4 text-white leading-tight [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
                Built to be trained on,<br />
                <ShinyText
                  text="not looked at."
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
              className="type-lead text-white/70"
            >
              Indoor arena, lunging pen, stables and a café, on one campus in Sarjapura.
            </FadeUp>
          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Arenas (light) — ALTERNATING DIRECTIONAL CURTAINS
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-arenas" className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <SectionGlow tone="light">
          <div className="space-y-20">

            {/* Indoor Arena — image left (L→R curtain) */}
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="flex flex-col items-center gap-10 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <ArenaImage src={arenas[0].img} alt={arenas[0].title} direction="left" prefersReduced={prefersReduced} />
                </div>
                <Stagger gap={0.1} amount={0.2} className="w-full lg:w-1/2">
                  <StaggerItem>
                    <h4 className="group/eb type-eyebrow mb-2 inline-flex items-center gap-2 text-[#876B18]">
                      <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                      <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">{arenas[0].label}</span>
                    </h4>
                  </StaggerItem>
                  <StaggerItem>
                    <h3 className="type-card-title mb-4 text-[#1A1A1A] transition-all duration-500 hover:tracking-wide hover:text-[#876B18]">
                      {arenas[0].title}
                    </h3>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="group/para relative pl-0 font-normal leading-relaxed text-[#5A5A66] transition-all duration-500 hover:pl-5 hover:text-[#1A1A1A]">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/para:h-full"
                      />
                      {arenas[0].desc}
                    </p>
                  </StaggerItem>
                </Stagger>
              </div>
            </div>

            {/* Outdoor Arena — image right (R→L curtain) */}
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="flex flex-col items-center gap-10 lg:flex-row-reverse">
                <div className="w-full lg:w-1/2">
                  <ArenaImage src={arenas[1].img} alt={arenas[1].title} direction="right" prefersReduced={prefersReduced} />
                </div>
                <Stagger gap={0.1} amount={0.2} className="w-full lg:w-1/2">
                  <StaggerItem>
                    <h4 className="group/eb type-eyebrow mb-2 inline-flex items-center gap-2 text-[#876B18]">
                      <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                      <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">{arenas[1].label}</span>
                    </h4>
                  </StaggerItem>
                  <StaggerItem>
                    <h3 className="type-card-title mb-4 text-[#1A1A1A] transition-all duration-500 hover:tracking-wide hover:text-[#876B18]">
                      {arenas[1].title}
                    </h3>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="group/para relative pl-0 font-normal leading-relaxed text-[#5A5A66] transition-all duration-500 hover:pl-5 hover:text-[#1A1A1A]">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/para:h-full"
                      />
                      {arenas[1].desc}
                    </p>
                  </StaggerItem>
                </Stagger>
              </div>
            </div>

            {/* Dressage Arena — image left (L→R curtain) */}
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="flex flex-col items-center gap-10 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <ArenaImage src={arenas[2].img} alt={arenas[2].title} direction="left" prefersReduced={prefersReduced} />
                </div>
                <Stagger gap={0.1} amount={0.2} className="w-full lg:w-1/2">
                  <StaggerItem>
                    <h4 className="group/eb type-eyebrow mb-2 inline-flex items-center gap-2 text-[#876B18]">
                      <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                      <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">{arenas[2].label}</span>
                    </h4>
                  </StaggerItem>
                  <StaggerItem>
                    <h3 className="type-card-title mb-4 text-[#1A1A1A] transition-all duration-500 hover:tracking-wide hover:text-[#876B18]">
                      {arenas[2].title}
                    </h3>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="group/para relative pl-0 font-normal leading-relaxed text-[#5A5A66] transition-all duration-500 hover:pl-5 hover:text-[#1A1A1A]">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/para:h-full"
                      />
                      {arenas[2].desc}
                    </p>
                  </StaggerItem>
                </Stagger>
              </div>
            </div>

            {/* Lunging Pen — full width with background */}
            <div className="w-full bg-[#F2F0EB]">
              <div className="mx-auto w-full max-w-7xl">
                <div className="flex flex-col items-center gap-10 p-8 md:p-12 lg:flex-row-reverse lg:p-16">
                  <div className="w-full lg:w-[60%]">
                    <ArenaImage
                      src={arenas[3].img}
                      alt={arenas[3].title}
                      direction="right"
                      aspect="16/10"
                      rounded="rounded-[2rem]"
                      prefersReduced={prefersReduced}
                    />
                  </div>
                  <Stagger gap={0.1} amount={0.2} className="w-full lg:w-[40%]">
                    <StaggerItem>
                      <h4 className="group/eb type-eyebrow mb-2 inline-flex items-center gap-2 text-[#876B18]">
                        <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                        <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">{arenas[3].label}</span>
                      </h4>
                    </StaggerItem>
                    <StaggerItem>
                      <h3 className="type-section-title mb-4 text-[#1A1A1A] transition-all duration-500 hover:tracking-wide hover:text-[#876B18]">
                        {arenas[3].title}
                      </h3>
                    </StaggerItem>
                    <StaggerItem>
                      <p className="group/para relative pl-0 font-normal leading-relaxed text-[#5A5A66] transition-all duration-500 hover:pl-5 hover:text-[#1A1A1A]">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-0 top-1 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/para:h-full"
                        />
                        {arenas[3].desc}
                      </p>
                    </StaggerItem>
                  </Stagger>
                </div>
              </div>
            </div>

          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Stables (dark) — CURTAIN + CASCADE LIST
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-stables" className="w-full bg-[#0C0922] py-0 lg:pb-12 lg:pt-24">
        <SectionGlow tone="dark">
          <div className="flex w-full flex-col items-center lg:flex-row">
            <div className="relative w-full bg-[#0C0922] lg:w-[45%]">
              <div className="pb-8 pr-4 lg:py-12">
                <motion.div
                  className="h-full w-full"
                  initial={
                    prefersReduced
                      ? false
                      : { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.08, opacity: 0 }
                  }
                  whileInView={
                    prefersReduced
                      ? {}
                      : { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1, opacity: 1 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
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
                  <DriftImage
                    src="/horse live.webp"
                    alt="Stables interior"
                    drift="subtle"
                    duration={40}
                    targetOpacity={1}
                    className="h-full w-full overflow-hidden rounded-r-[3rem] shadow-2xl"
                    imgClassName="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-center pb-16 pl-6 pr-6 pt-12 lg:w-[55%] lg:py-12 lg:pl-16 lg:pr-24">
              <FadeUp size="text" delay={0}>
                <h4 className="group/eyebrow type-eyebrow mb-4 inline-flex cursor-default items-center gap-3">
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
                  <span className="transition-all duration-500 group-hover/eyebrow:tracking-[0.3em]">
                    <ShinyText
                      text="Equestrian Core"
                      color="#C9A227"
                      shineColor="#F5F1E8"
                      speed={2.5}
                      spread={120}
                    />
                  </span>
                </h4>
              </FadeUp>

              <div className="mb-10 [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
                <SplitText
                  as="h2"
                  className="type-section-title text-white"
                  wordDelay={0.04}
                  startDelay={0.1}
                  amount={0.3}
                >
                  Where the horses live.
                </SplitText>
              </div>

              <Stagger gap={0.1} amount={0.15} className="space-y-8">
                {stables.map((item, idx) => (
                  <StaggerItem key={idx}>
                    <div className="group/row relative border-b border-white/10 pb-6 pl-0 transition-all duration-500 hover:border-[#C9A227]/40 hover:pl-4">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-2 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover/row:h-[calc(100%-2rem)]"
                      />
                      <h5 className="mb-2 text-sm font-bold uppercase tracking-wider text-[#C9A227] transition-all duration-500 group-hover/row:tracking-[0.15em]">
                        {item.title}
                      </h5>
                      <p className="text-base font-normal leading-relaxed text-white/60 transition-colors duration-500 group-hover/row:text-white/90">
                        {item.desc}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </SectionGlow>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Beyond (light) — INK DROP + LETTERBOX CARDS
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-beyond" className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <SectionGlow tone="light">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp size="text" className="mb-4">
              <h4 className="group/eb type-eyebrow inline-flex items-center gap-2 text-[#876B18]">
                <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">
                  Beyond the Arena
                </span>
              </h4>
            </FadeUp>

            <div className="mb-12 [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
              <SplitText
                as="h2"
                className="type-section-title text-[#1A1A1A]"
                wordDelay={0.04}
                startDelay={0.1}
                amount={0.3}
              >
                Somewhere to wait, and somewhere to stay.
              </SplitText>
            </div>

            <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-2">
              {beyond.map((item, idx) => (
                <BeyondCard key={idx} item={item} index={idx} prefersReduced={prefersReduced} />
              ))}
            </div>
          </div>
        </SectionGlow>
      </div>

    </div>
  );
};

export default Facilities;