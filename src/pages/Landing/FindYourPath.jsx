import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import ShinyText from '../../components/ShinyText';
import { EASE, EASE_SNAP } from '../../utils/landing-motion';

/* ============================================================
   LETTER CASCADE
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
   EXPANDING CARD — desktop expands on hover, mobile stacks
   ============================================================ */
const ProgramCard = ({ program, idx, expandedIdx, setExpandedIdx }) => {
  const isExpanded = expandedIdx === idx;
  const isCollapsed = expandedIdx !== null && !isExpanded;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.15 + idx * 0.12,
        ease: EASE,
        layout: { duration: 0.7, ease: EASE },
      }}
      onMouseEnter={() => setExpandedIdx(idx)}
      onMouseLeave={() => setExpandedIdx(null)}
      style={{
        flexGrow: isExpanded ? 2.2 : 1,
        flexBasis: 0,
      }}
      className="group relative hidden overflow-hidden rounded-2xl border border-[#C9A227]/20 bg-[#0C0922] shadow-[0_20px_60px_-30px_rgba(12,9,34,0.5)] transition-[flex-grow] duration-700 lg:flex lg:flex-col lg:min-h-[540px]"
    >
      {/* Background image — full bleed */}
      <motion.img
        src={program.img}
        alt={program.title}
        loading="lazy"
        decoding="async"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.8, delay: 0.3 + idx * 0.12, ease: EASE }}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
          isExpanded
            ? 'scale-[1.06] opacity-100 grayscale-0'
            : isCollapsed
            ? 'scale-100 opacity-60 grayscale-[40%]'
            : 'scale-100 opacity-80 grayscale-0'
        }`}
      />

      {/* Dark gradient overlay — deeper when collapsed */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          isExpanded
            ? 'bg-gradient-to-t from-[#0C0922] via-[#0C0922]/40 to-transparent opacity-100'
            : 'bg-gradient-to-t from-[#0C0922] via-[#0C0922]/60 to-[#0C0922]/30 opacity-100'
        }`}
      />

      {/* Gold vertical rule on the top-right corner */}
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: isExpanded ? 1 : 0 }}
        animate={{ scaleY: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="pointer-events-none absolute right-4 top-4 h-12 w-[2px] origin-top bg-[#C9A227]"
      />

      {/* Content — top block (number + title) always visible */}
      <div className="relative z-10 flex flex-1 flex-col justify-between p-6 lg:p-7">
        <div>
          {/* Number — big italic serif, rotates on hover */}
          <motion.span
            animate={{
              rotate: isExpanded ? -6 : 0,
              scale: isExpanded ? 1.1 : 1,
              color: isExpanded ? '#C9A227' : 'rgba(201,162,39,0.7)',
            }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-block font-serif text-5xl italic leading-none tabular-nums lg:text-6xl"
            style={{ transformOrigin: 'left center' }}
          >
            {program.num}
          </motion.span>
        </div>

        <div>
          {/* Title */}
          <motion.h3
            className="mb-3 text-base font-bold uppercase tracking-wider text-white lg:text-lg"
            animate={{
              letterSpacing: isExpanded ? '0.08em' : '0.04em',
            }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {program.title}
          </motion.h3>

          {/* Subtitle — smaller gold line */}
          <p className="mb-4 max-w-xs text-xs leading-relaxed text-white/70 lg:text-sm">
            {program.subtitle}
          </p>

          {/* Expand: features list */}
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 border-t border-[#C9A227]/30 pt-4">
              {program.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={false}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    x: isExpanded ? 0 : -8,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: isExpanded ? 0.1 + i * 0.06 : 0,
                    ease: EASE,
                  }}
                  className="flex items-start gap-2.5 text-[0.7rem] text-white/80"
                >
                  <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#C9A227]" />
                  <span className="font-medium leading-snug">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Expand indicator */}
          <motion.div
            animate={{
              opacity: isExpanded ? 0 : 1,
              y: isExpanded ? 8 : 0,
            }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-4 flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#C9A227]"
          >
            <span className="inline-block h-px w-6 bg-[#C9A227]" />
            Hover to explore
          </motion.div>
        </div>
      </div>

      {/* Gold rim on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/50" />
    </motion.div>
  );
};

/* ============================================================
   MOBILE CARD — always fully expanded, stacked vertically
   ============================================================ */
const ProgramCardMobile = ({ program, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, amount: 0 }}
    transition={{ duration: 0.8, delay: 0.15 + idx * 0.12, ease: EASE }}
    className="flex flex-col overflow-hidden rounded-2xl border border-[#C9A227]/15 bg-white/55 shadow-[0_14px_40px_rgba(12,9,34,0.06)] lg:hidden"
  >
    {/* Image */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <motion.img
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        src={program.img}
        alt={program.title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      {/* Number badge over image */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
        className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#0C0922]/85 font-serif text-2xl italic text-[#C9A227] backdrop-blur-md"
      >
        {program.num}
      </motion.span>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-[#1A1A1A]">
        {program.title}
      </h3>
      <p className="mb-4 text-xs leading-relaxed text-[#1A1A1A]/70">
        {program.subtitle}
      </p>
      <div className="mb-4 h-px bg-[#C9A227]/20" />
      <ul className="space-y-2">
        {program.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-[#1A1A1A]/80">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#C9A227]" />
            <span className="font-normal">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

/* ============================================================
   MAIN
   ============================================================ */
const FindYourPath = () => {
  const { openEnquiry } = useEnquiry();
  const [expandedIdx, setExpandedIdx] = useState(null);

  const programs = [
    {
      num: '01',
      title: 'Kids Special Riding Program',
      subtitle: 'A fun-filled learning experience for children.',
      img: '/kid path.png',
      features: ['Pony riding', 'Confidence building', 'Physical coordination', 'Interactive horse sessions'],
    },
    {
      num: '02',
      title: 'Beginner Program',
      subtitle: 'Perfect for first-time riders.',
      img: '/begin path.png',
      features: ['Introduction to horses', 'Riding basics', 'Balance & posture', 'Safety training', 'Horse handling'],
    },
    {
      num: '03',
      title: 'Intermediate Training',
      subtitle: 'For riders seeking skill advancement.',
      img: '/inter path.png',
      features: ['Riding techniques', 'Trotting & Cantering', 'Horse Communication & Handling'],
    },
    {
      num: '04',
      title: 'Professional Competition Training',
      subtitle: 'Designed for competitive riders.',
      img: '/advance path.png',
      features: ['Show Jumping preparation', 'Techniques', 'Performance assessment', 'Advanced Training'],
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#F2F0EB] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* ==================================================
            Header — cascade + shimmer
            ================================================== */}
        <div className="mb-12 text-left md:mb-16 md:text-center">
          <motion.h4
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mb-4 flex items-center gap-3 type-eyebrow text-[#C9A227] md:justify-center"
          >
            <span className="hidden h-px w-8 bg-[#C9A227]/50 md:inline-block" />
            Our Programs
            <span className="hidden h-px w-8 bg-[#C9A227]/50 md:inline-block" />
          </motion.h4>

          <h2 className="type-page-title mb-6 leading-[1.05]">
            <span className="block text-[#1A1A1A]">
              <CascadeText text="Find" delay={0.2} />
            </span>
            <span className="block">
              <ShinyText
                text="Your Path"
                speed={3}
                className="text-[#C9A227]"
                disabled={false}
              />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="type-lead mx-auto max-w-2xl text-[#1A1A1A]/85"
          >
            Programs designed for every rider. From the very first step in the
            saddle to competitive excellence, we guide you every step of the
            way.
          </motion.p>
        </div>

        {/* ==================================================
            DESKTOP — Expanding horizontal deck
            ================================================== */}
        <div className="hidden items-stretch gap-4 lg:flex">
          {programs.map((program, idx) => (
            <ProgramCard
              key={idx}
              program={program}
              idx={idx}
              expandedIdx={expandedIdx}
              setExpandedIdx={setExpandedIdx}
            />
          ))}
        </div>

        {/* ==================================================
            MOBILE — Stacked cards
            ================================================== */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:hidden">
          {programs.map((program, idx) => (
            <ProgramCardMobile key={idx} program={program} idx={idx} />
          ))}
        </div>

        {/* ==================================================
            CTA — magnetic gold button
            ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="mt-12 text-left md:text-center sm:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => openEnquiry('Riding Classes')}
            className="type-button group inline-flex max-w-full items-center gap-3 border border-[#C9A227] bg-transparent px-6 py-4 text-[#C9A227] transition-colors duration-500 hover:bg-[#C9A227] hover:text-[#0C0922] sm:px-10"
          >
            <span>Explore All Courses</span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FindYourPath;