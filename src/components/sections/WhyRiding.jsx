import { motion } from 'framer-motion';
import { viewportOnce } from '../../utils/animations';

// ============================================================
// BENEFITS DATA
// ============================================================
const benefits = [
  {
    image: '/page 9 physical.png',
    title: 'Physical',
    items: ['Balance and coordination', 'Flexibility and posture', 'Core strength'],
  },
  {
    image: '/page 9 mentals.png',
    title: 'Mental',
    items: ['Confidence', 'Focus and discipline', 'Calm under pressure'],
  },
  {
    image: '/page 9 lifestyle.png',
    title: 'Lifestyle',
    items: ['Responsibility', 'Leadership', 'Sportsmanship'],
  },
];

// ============================================================
// BENEFIT CARD — Desktop & Mobile versions
// ============================================================
const Benefit = ({ benefit, compact = false, index = 0 }) => {
  const isCompact = compact;

  return (
    <motion.article
      className={
        isCompact
          ? 'grid grid-cols-[6.5rem_1fr] items-center gap-5'
          : 'grid grid-cols-[13.8vw_1fr] items-start gap-[1.8vw]'
      }
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Icon Image */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Golden glow behind icon (on hover) */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[#C9A227]/0 blur-2xl transition-all duration-500 group-hover:bg-[#C9A227]/30" />

        <img
          src={benefit.image}
          alt=""
          loading="lazy"
          decoding="async"
          className={`block w-full mix-blend-multiply ${
            isCompact ? 'opacity-70' : 'opacity-75'
          }`}
        />
      </motion.div>

      {/* Text Content */}
      <div className={isCompact ? 'py-4' : 'pt-[3.2vw]'}>
        {/* Title */}
        <motion.h3
          className="type-eyebrow text-[#876B18]"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{
            delay: index * 0.15 + 0.3,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {benefit.title}
        </motion.h3>

        {/* Golden divider line — animated draw */}
        <motion.span
          className={`block border-t border-[#876B18] ${
            isCompact ? 'mb-5 mt-3 w-8' : 'mb-[2vw] mt-[1.15vw] w-[2vw]'
          }`}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{
            delay: index * 0.15 + 0.5,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Items list — stagger */}
        <motion.ul
          className={
            isCompact
              ? 'space-y-4 text-sm leading-[1.45] text-[#1A1A1A]'
              : 'space-y-[2vw] text-sm leading-[1.45] text-[#1A1A1A]'
          }
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: index * 0.15 + 0.6,
              },
            },
          }}
        >
          {benefit.items.map((item) => (
            <motion.li
              key={item}
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="flex items-start gap-2"
            >
              {/* Golden dot bullet */}
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#876B18]" />
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.article>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const WhyRiding = () => {
  return (
    <section className="w-full overflow-hidden bg-[#FDFCFA]">
      {/* ============================================================ */}
      {/* DESKTOP VERSION — Full layout with image */}
      {/* ============================================================ */}
      <div className="relative hidden aspect-[1672/941] w-full lg:block">
        {/* Image with subtle zoom on scroll */}
        <motion.div
          className="absolute right-0 top-0 h-[62%] w-[70%] overflow-hidden"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/page 9 gpt.png"
            alt="A child riding a white horse at sunset"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[63%_48%]"
          />

          {/* Left fade gradient */}
          <div className="absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#FDFCFA] via-[#FDFCFA]/75 to-transparent" />

          {/* Bottom fade gradient */}
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#FDFCFA] via-[#FDFCFA]/65 to-transparent" />

          {/* Grain texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Header — top left */}
        <motion.header
          className="absolute left-[6.8%] top-[15.5%] z-10 w-[48%]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h4
            className="mb-[2.1vw] type-eyebrow text-[#876B18]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Why Riding
          </motion.h4>

          <motion.h2
            className="type-display text-[#1A1A1A]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            What a child takes
            <br />
            home from the arena.
          </motion.h2>

          <motion.p
            className="mt-[1.6vw] text-base text-[#5A5A66]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Riding builds more than riding.
          </motion.p>

          {/* Animated golden line */}
          <motion.div
            className="mt-6 h-px w-20 origin-left bg-[#876B18]/40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.header>

        {/* Benefits grid — bottom */}
        <div className="absolute inset-x-[3.5%] bottom-[7.2%] z-10 grid grid-cols-3 gap-[2.2vw]">
          {benefits.map((benefit, index) => (
            <Benefit key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE VERSION */}
      {/* ============================================================ */}
      <div className="lg:hidden">
        {/* Header */}
        <motion.header
          className="px-6 pb-7 pt-14 sm:px-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="type-eyebrow text-[#876B18]">Why Riding</span>
            <motion.span
              className="block h-px w-12 origin-left bg-[#876B18]/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </div>

          <h2 className="type-page-title text-[#1A1A1A]">
            What a child takes
            <br />
            home from the arena.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#5A5A66]">
            Riding builds more than riding.
          </p>
        </motion.header>

        {/* Image with subtle parallax */}
        <motion.div
          className="relative aspect-[16/10] w-full overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/page 9 gpt.png"
            alt="A child riding a white horse at sunset"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[72%_center]"
          />

          {/* Left gradient */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#FDFCFA]/80 to-transparent" />

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#FDFCFA] to-transparent" />

          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Benefits list */}
        <div className="space-y-3 px-6 pb-16 sm:px-10">
          {benefits.map((benefit, index) => (
            <Benefit
              key={benefit.title}
              benefit={benefit}
              compact
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRiding;