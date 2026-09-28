import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '../../utils/animations';

// ============================================================
// CAMPUS KEY
// ============================================================
const campusKey = [
  ['1', 'Indoor arena'],
  ['4', 'Dressage arena'],
  ['2', 'Outdoor arena'],
  ['5', 'Stables'],
  ['3', 'Lunging pen'],
  ['6', 'Tack shop'],
];

// ============================================================
// MAP HOTSPOTS — Aapke custom coordinates ✅
// ============================================================
const mapHotspots = {
  '1': { top: '58%', left: '40%' },
  '2': { top: '36%', left: '42%' },
  '3': { top: '58%', left: '55%' },
  '4': { top: '40%', left: '64%' },
  '5': { top: '74%', left: '61%' },
  '6': { top: '80%', left: '25%' },
};

// ============================================================
// FLOATING PARTICLES
// ============================================================
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 6,
  size: 1 + Math.random() * 2,
}));

const WhoWeAre = () => {
  const [activeItem, setActiveItem] = useState(null);

  // Handle both hover (desktop) and tap (mobile)
  const handleEnter = (number) => setActiveItem(number);
  const handleLeave = () => setActiveItem(null);
  const handleTap = (number) =>
    setActiveItem(activeItem === number ? null : number);

  return (
    <section className="mobile-cta-exclusion w-full bg-[#FDFCFA] py-14 md:py-16">
      <div className="grid min-h-[31.75rem] w-full grid-cols-1 items-center overflow-hidden rounded-r-[2.25rem] bg-[#0C0922] md:min-h-[42rem] md:w-[93.2%] md:grid-cols-[48%_52%]">

        {/* ============================================================ */}
        {/* LEFT SIDE: CAMPUS MAP CARD */}
        {/* ============================================================ */}
        <motion.div
          className="flex justify-center px-5 pt-12 md:justify-end md:py-11 md:pl-10 md:pr-[4.5vw]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeLeft}
        >
          <motion.div
            className="relative flex h-auto w-full max-w-[22rem] flex-col overflow-hidden rounded-xl bg-[#FDFCFA] px-5 pb-6 pt-5 md:w-[min(31vw,27rem)] md:max-w-none"
            whileHover={{
              y: -6,
              boxShadow: '0 24px 60px rgba(12,9,34,0.25)',
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Blueprint grid background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(#0C0922 1px, transparent 1px), linear-gradient(90deg, #0C0922 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Corner brackets */}
            <motion.div
              className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-[#C9A227]/60"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.div
              className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-[#C9A227]/60"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.55, duration: 0.5 }}
            />
            <motion.div
              className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#C9A227]/60"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
            <motion.div
              className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-[#C9A227]/60"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.65, duration: 0.5 }}
            />

            {/* ============================================================ */}
            {/* MAP WITH HOTSPOTS */}
            {/* ============================================================ */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src="/page 3 gpt.png"
                alt="Campus Map of Nakshath Equestrian Club"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-contain"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.2, duration: 0.7 }}
              />

              {/* Hotspots */}
              {Object.entries(mapHotspots).map(([number, pos]) => {
                const isActive = activeItem === number;
                const itemLabel = campusKey.find(([n]) => n === number)?.[1];

                return (
                  <motion.button
                    key={`hotspot-${number}`}
                    type="button"
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                    style={{ top: pos.top, left: pos.left }}
                    onMouseEnter={() => handleEnter(number)}
                    onMouseLeave={handleLeave}
                    onClick={() => handleTap(number)}
                    aria-label={`View ${itemLabel}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Outer pulse ring */}
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-[#C9A227]/60"
                      animate={{
                        scale: [1, 1.9, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />

                    {/* Second ring */}
                    <motion.span
                      className="absolute inset-0 rounded-full border border-[#C9A227]/40"
                      animate={{
                        scale: [1, 2.4, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: 0.8,
                        ease: 'easeOut',
                      }}
                    />

                    {/* Number badge */}
                    <span
                      className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 md:h-8 md:w-8 md:text-sm ${
                        isActive
                          ? 'bg-[#0C0922] text-[#C9A227] ring-2 ring-[#C9A227]'
                          : 'bg-[#C9A227] text-[#0C0922]'
                      }`}
                    >
                      {number}
                    </span>

                    {/* Tooltip — shows on both hover & tap */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0C0922] px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-[#C9A227] shadow-lg ring-1 ring-[#C9A227]/40"
                        >
                          {itemLabel}
                          <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-transparent border-t-[#0C0922]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}

              {/* Floating golden particles */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {particles.map((p) => (
                  <motion.span
                    key={p.id}
                    className="absolute rounded-full bg-[#C9A227]"
                    style={{
                      left: p.left,
                      top: p.top,
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 0.6, 0],
                      scale: [0.5, 1, 0.5],
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
            </motion.div>

            {/* Animated divider */}
            <motion.div
              className="my-4 flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.div
                className="h-[1px] flex-1 bg-[#C9A227]/30"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#C9A227]/60">
                Campus Key
              </span>
              <motion.div
                className="h-[1px] flex-1 bg-[#C9A227]/30"
                initial={{ scaleX: 0, originX: 1 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {/* ============================================================ */}
            {/* CAMPUS KEY LIST — Hover + tap support */}
            {/* ============================================================ */}
            <motion.div
              className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[0.625rem] font-semibold uppercase leading-[1.25] tracking-[0.04em] text-[#1A1A1A] md:gap-y-[0.8vw] md:text-xs"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
            >
              {campusKey.map(([number, label], index) => {
                const isActive = activeItem === number;

                return (
                  <motion.button
                    key={number}
                    type="button"
                    variants={staggerItem}
                    className="relative grid min-w-0 grid-cols-[0.75rem_minmax(0,1fr)] items-start gap-1.5 rounded-md p-1 text-left transition-colors duration-300 focus:outline-none"
                    onMouseEnter={() => handleEnter(number)}
                    onMouseLeave={handleLeave}
                    onClick={() => handleTap(number)}
                    aria-pressed={isActive}
                    style={{
                      backgroundColor: isActive
                        ? 'rgba(201, 162, 39, 0.12)'
                        : 'transparent',
                    }}
                  >
                    {/* Sequential Highlight */}
                    <motion.div
                      className="pointer-events-none absolute -inset-x-1 -inset-y-0.5 rounded-md bg-[#C9A227]/10"
                      animate={{
                        opacity: isActive ? 0 : [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isActive ? 0 : Infinity,
                        repeatDelay: 3.5,
                        delay: isActive ? 0 : index * 0.5,
                        times: [0, 0.1, 0.85, 1],
                      }}
                    />

                    {/* Number */}
                    <div className="relative z-10 flex h-4 w-4 items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full border border-[#C9A227]"
                        animate={{
                          scale: isActive ? [1, 2, 1] : [1, 1.8, 1],
                          opacity: isActive ? [0.9, 0, 0.9] : [0.6, 0, 0.6],
                        }}
                        transition={{
                          duration: isActive ? 1.2 : 2.4,
                          repeat: Infinity,
                          delay: isActive ? 0 : index * 0.4,
                          ease: 'easeOut',
                        }}
                      />
                      <motion.span
                        className="relative z-10 text-xs font-bold md:text-sm"
                        animate={{
                          color: isActive
                            ? '#876B18'
                            : ['#C9A227', '#876B18', '#876B18', '#C9A227'],
                          scale: isActive ? 1.2 : [1, 1.12, 1.12, 1],
                        }}
                        transition={{
                          duration: isActive ? 0.3 : 1.5,
                          repeat: isActive ? 0 : Infinity,
                          repeatDelay: isActive ? 0 : 3.5,
                          delay: isActive ? 0 : index * 0.5,
                          times: [0, 0.1, 0.85, 1],
                        }}
                      >
                        {number}
                      </motion.span>
                    </div>

                    {/* Label */}
                    <motion.span
                      className="relative z-10 min-w-0 transition-colors duration-300"
                      style={{ color: isActive ? '#876B18' : '#1A1A1A' }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportOnce}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    >
                      {label}
                    </motion.span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ============================================================ */}
        {/* RIGHT SIDE: TEXT */}
        {/* ============================================================ */}
        <motion.div
          className="px-8 py-14 text-white sm:px-12 md:py-12 md:pl-[4.25vw] md:pr-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRight}
        >
          <motion.div
            className="max-w-[20rem]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="mb-6 flex items-center gap-3 md:mb-[2.4vw]">
              <motion.span
                variants={staggerItem}
                className="type-eyebrow text-[#876B18]"
              >
                Who We Are
              </motion.span>
              <motion.div
                className="h-[1px] flex-1 bg-[#C9A227]/30"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
            </div>

            <div className="space-y-9 text-base font-normal leading-[1.55] tracking-[0.01em] text-white/90 md:space-y-[4.2vw] md:text-lg">
              <motion.p variants={staggerItem}>
                A working equestrian academy
                <br />
                on the edge of Bengaluru.
              </motion.p>

              <motion.p variants={staggerItem}>
                Show jumping and dressage,
                <br />
                taught from <span className="text-[#876B18]">first sit</span>
                <br />
                <span className="text-[#876B18]">to competition entry.</span>
              </motion.p>

              <motion.p variants={staggerItem}>
                Four arenas, stables and cottages
                <br />
                across a single campus.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhoWeAre;