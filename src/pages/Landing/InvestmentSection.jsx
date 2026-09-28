// src/pages/Landing/InvestmentSection.jsx
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const levels = [
  { level: 'LEVEL 01', lessons: '10', price: '₹11,999', img: '/level 1.webp', tone: 'light' },
  { level: 'LEVEL 02', lessons: '20', price: '₹29,999', img: '/level 2.webp', tone: 'light' },
  { level: 'LEVEL 03', lessons: '20', price: '₹32,999', img: '/level 3.webp', tone: 'dark' },
];

const InvestmentSection = () => {
  const { openEnquiry } = useEnquiry();
  const prefersReduced = usePrefersReducedMotion();

  const sceneARef = useRef(null);
  const progressA = useMotionValue(0);

  const sceneBRef = useRef(null);
  const progressB = useMotionValue(0);

  const makeUpdater = (ref, motionValue) => () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const totalScroll = el.offsetHeight - window.innerHeight;
    const currentScroll = Math.max(0, -rect.top);
    const progress = totalScroll > 0 ? Math.min(1, currentScroll / totalScroll) : 0;
    motionValue.set(progress);
  };

  useEffect(() => {
    const updateA = makeUpdater(sceneARef, progressA);
    const updateB = makeUpdater(sceneBRef, progressB);
    const updateAll = () => {
      updateA();
      updateB();
    };

    updateAll();
    window.addEventListener('scroll', updateAll, { passive: true });
    window.addEventListener('resize', updateAll);
    return () => {
      window.removeEventListener('scroll', updateAll);
      window.removeEventListener('resize', updateAll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ═══ SCENE A ═══
  const bgOpacity    = useTransform(progressA, [0, 0.12], [0, 1]);
  const bgScale      = useTransform(progressA, [0, 0.72, 1], [1.05, 1, 1.15]);
  const bgBrightness = useTransform(progressA, [0, 0.72, 1], [1, 0.95, 0.82]);

  const h1Opacity = useTransform(progressA, [0.06, 0.20], [0, 1]);
  const h1Y       = useTransform(progressA, [0.06, 0.20], [30, 0]);
  const h1Blur    = useTransform(progressA, [0.06, 0.20], [10, 0]);
  const h1Filter  = useTransform(h1Blur, (v) => `blur(${v}px)`);

  const card1Opacity = useTransform(progressA, [0.22, 0.38], [0, 1]);
  const card1Scale   = useTransform(progressA, [0.22, 0.38], [0.9, 1]);
  const card1Y       = useTransform(progressA, [0.22, 0.38], [40, 0]);

  const card2Opacity = useTransform(progressA, [0.28, 0.44], [0, 1]);
  const card2Scale   = useTransform(progressA, [0.28, 0.44], [0.9, 1]);
  const card2Y       = useTransform(progressA, [0.28, 0.44], [40, 0]);

  const card3Opacity = useTransform(progressA, [0.34, 0.50], [0, 1]);
  const card3Scale   = useTransform(progressA, [0.34, 0.50], [0.9, 1]);
  const card3Y       = useTransform(progressA, [0.34, 0.50], [40, 0]);

  const exitAOpacity = useTransform(progressA, [0.78, 0.94], [1, 0]);
  const exitAScale   = useTransform(progressA, [0.78, 0.94], [1, 1.04]);
  const exitAY       = useTransform(progressA, [0.78, 0.94], [0, -48]);

  // ═══ SCENE B ═══
  const h2Opacity = useTransform(progressB, [0.06, 0.20], [0, 1]);
  const h2Y       = useTransform(progressB, [0.06, 0.20], [30, 0]);
  const h2Blur    = useTransform(progressB, [0.06, 0.20], [10, 0]);
  const h2Filter  = useTransform(h2Blur, (v) => `blur(${v}px)`);

  const trial1Opacity = useTransform(progressB, [0.22, 0.38], [0, 1]);
  const trial1Scale   = useTransform(progressB, [0.22, 0.38], [0.92, 1]);
  const trial1Y       = useTransform(progressB, [0.22, 0.38], [30, 0]);

  const trial2Opacity = useTransform(progressB, [0.28, 0.44], [0, 1]);
  const trial2Scale   = useTransform(progressB, [0.28, 0.44], [0.92, 1]);
  const trial2Y       = useTransform(progressB, [0.28, 0.44], [30, 0]);

  const ctaOpacity = useTransform(progressB, [0.48, 0.62], [0, 1]);
  const ctaY       = useTransform(progressB, [0.48, 0.62], [20, 0]);

  const exitBOpacity = useTransform(progressB, [0.78, 0.94], [1, 0]);
  const exitBScale   = useTransform(progressB, [0.78, 0.94], [1, 1.04]);
  const exitBY       = useTransform(progressB, [0.78, 0.94], [0, -48]);

  // ── Reduced motion fallback ──
  if (prefersReduced) {
    return (
      <section className="relative w-full py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <h4 className="type-eyebrow text-[#C9A227] mb-4">The Investment</h4>
            <h2 className="type-section-title mb-6">
              <span className="text-white">Your Training,</span>{' '}
              <span className="text-[#C9A227]">Your Progression</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
            {levels.map((item, idx) => (
              <LevelCard key={idx} item={item} idx={idx} />
            ))}
          </div>

          <div className="text-center mb-10">
            <h4 className="type-eyebrow text-white/70 mb-4">Not Sure Where to Begin?</h4>
            <h2 className="type-section-title">
              <span className="text-white">Begin with a</span>{' '}
              <span className="text-[#C9A227]">Trial Ride.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <TrialCard
              eyebrow="Free Trial Ride"
              title="10 Minutes"
              price="Free"
              desc="An introductory riding experience for new registrations."
              img="/free ride.webp"
            />
            <TrialCard
              eyebrow="Paid Trial Ride"
              title="45 Minutes"
              price="₹1,999"
              desc="An extended trial riding session."
              img="/paid ride.webp"
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button bg-[#C9A227] text-[#0C0922] px-10 py-4 rounded-full hover:bg-white transition-colors"
            >
              Book Your Trial Ride →
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ═══ SCENE A — The Investment ═══ */}
      <div ref={sceneARef} className="relative w-full" style={{ height: '200vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

          {/* Background image */}
          <motion.div
            className="absolute inset-0 -z-10"
            style={{
              opacity: bgOpacity,
              scale: bgScale,
              filter: useTransform(bgBrightness, (b) => `brightness(${b})`),
            }}
          >
            <img
              src="/trial-ride.webp"
              alt="Rider on Horse"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-left brightness-[1.5] contrast-[1.05] saturate-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/85 via-[#0C0922]/85 to-[#0C0922]/95" />
          </motion.div>

          {/* Content — cinematic exit group */}
          <motion.div
            className="w-full max-w-7xl mx-auto px-5 sm:px-6"
            style={{
              opacity: exitAOpacity,
              scale: exitAScale,
              y: exitAY,
            }}
          >
            <div className="text-center mb-8 lg:mb-12">
              <motion.h4
                className="type-eyebrow text-[#C9A227] mb-4"
                style={{ opacity: h1Opacity }}
              >
                The Investment
              </motion.h4>
              <motion.h2
                className="type-section-title"
                style={{ opacity: h1Opacity, y: h1Y, filter: h1Filter }}
              >
                <span className="text-white">Your Training,</span>{' '}
                <span className="text-[#C9A227]">Your Progression</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div style={{ opacity: card1Opacity, scale: card1Scale, y: card1Y }}>
                <LevelCard item={levels[0]} idx={0} />
              </motion.div>
              <motion.div style={{ opacity: card2Opacity, scale: card2Scale, y: card2Y }}>
                <LevelCard item={levels[1]} idx={1} />
              </motion.div>
              <motion.div style={{ opacity: card3Opacity, scale: card3Scale, y: card3Y }}>
                <LevelCard item={levels[2]} idx={2} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ SCENE B — Begin with a Trial Ride ═══ */}
      <div ref={sceneBRef} className="relative w-full" style={{ height: '200vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

          <motion.div
            className="w-full max-w-7xl mx-auto px-5 sm:px-6"
            style={{
              opacity: exitBOpacity,
              scale: exitBScale,
              y: exitBY,
            }}
          >
            <div className="text-center mb-8 lg:mb-12">
              <motion.h4
                className="type-eyebrow text-white/70 mb-4"
                style={{ opacity: h2Opacity }}
              >
                Not Sure Where to Begin?
              </motion.h4>
              <motion.h2
                className="type-section-title"
                style={{ opacity: h2Opacity, y: h2Y, filter: h2Filter }}
              >
                <span className="text-white">Begin with a</span>{' '}
                <span className="text-[#C9A227]">Trial Ride.</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <motion.div style={{ opacity: trial1Opacity, scale: trial1Scale, y: trial1Y }}>
                <TrialCard
                  eyebrow="Free Trial Ride"
                  title="10 Minutes"
                  price="Free"
                  desc="An introductory riding experience for new registrations."
                  img="/free ride.webp"
                />
              </motion.div>
              <motion.div style={{ opacity: trial2Opacity, scale: trial2Scale, y: trial2Y }}>
                <TrialCard
                  eyebrow="Paid Trial Ride"
                  title="45 Minutes"
                  price="₹1,999"
                  desc="An extended trial riding session."
                  img="/paid ride.webp"
                />
              </motion.div>
            </div>

            <motion.div
              className="text-center"
              style={{ opacity: ctaOpacity, y: ctaY }}
            >
              <button
                type="button"
                onClick={() => openEnquiry('Trial Ride')}
                className="type-button bg-[#C9A227] text-[#0C0922] px-8 sm:px-10 py-4 rounded-full hover:bg-white transition-colors shadow-lg"
              >
                Book Your Trial Ride →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

// ─── Level Card ──
const LevelCard = ({ item, idx }) => {
  const isDark = item.tone === 'dark';

  return (
    <div className="relative aspect-[1324/1188] overflow-hidden rounded-2xl border border-[#C9A227]/20 shadow-lg bg-[#0C0922]">
      <div className="absolute inset-0">
        <img
          src={item.img}
          alt={item.level}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-contain ${idx === 0 ? 'scale-[1.06]' : ''}`}
        />
      </div>
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-b from-black/30 via-black/20 to-black/40'
            : 'bg-gradient-to-b from-black/40 via-black/30 to-black/50'
        }`}
      />
      <div className="relative z-10 p-6 text-center flex flex-col items-center justify-center h-full [text-shadow:0_2px_12px_rgba(0,0,0,.85),0_1px_3px_rgba(0,0,0,.6)]">
        <p className="type-eyebrow mb-3 text-white/95">{item.level}</p>
        <p className="type-page-title mb-2 text-white">{item.lessons}</p>
        <p className="type-small uppercase tracking-wider mb-5 text-white/85">Lessons</p>
        <p className="type-section-title text-[#C9A227]">{item.price}</p>
      </div>
    </div>
  );
};

// ─── Trial Card ──
const TrialCard = ({ eyebrow, title, price, desc, img }) => (
  <div className="flex rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg h-full">
    <div className="w-[35%] min-h-[180px]">
      <img
        src={img}
        alt={eyebrow}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="w-[65%] p-6 flex flex-col justify-center">
      <p className="type-eyebrow text-[#C9A227] mb-1">{eyebrow}</p>
      <p className="type-card-title text-white mb-1">{title}</p>
      <p className="type-section-title text-[#C9A227] mb-2">{price}</p>
      <p className="type-caption text-white/75">{desc}</p>
    </div>
  </div>
);

export default InvestmentSection;