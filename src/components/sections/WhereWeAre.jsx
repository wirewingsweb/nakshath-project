import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS_MAP_URL } from '../../constants/location';
import { viewportOnce } from '../../utils/animations';

// ============================================================
// LOCATIONS DATA
// ============================================================
const locations = [
  { name: 'Sarjapur', time: '12', route: 'via Sarjapur Road', angle: -30, traffic: 'green', distance: '5.2', landmarks: ['Wipro Corporate Office', 'Sarjapur Signal'] },
  { name: 'Electronic City', time: '20', route: 'via Hosur Road', angle: 45, traffic: 'yellow', distance: '9.8', landmarks: ['Infosys Gate', 'Bommasandra'] },
  { name: 'HSR Layout', time: '22', route: 'via Sarjapur Road', angle: 120, traffic: 'green', distance: '10.5', landmarks: ['Agara Lake', '27th Main'] },
  { name: 'Bellandur', time: '24', route: 'via Outer Ring Road', angle: 200, traffic: 'yellow', distance: '12.3', landmarks: ['Ecospace', 'Kariyammana Agrahara'] },
  { name: 'Whitefield', time: '28', route: 'via Outer Ring Road', angle: 300, traffic: 'red', distance: '15.7', landmarks: ['ITPL', 'Phoenix Marketcity'] },
];

const trafficColors = { green: '#22c55e', yellow: '#eab308', red: '#ef4444' };
const trafficLabels = { green: 'Smooth', yellow: 'Moderate', red: 'Heavy' };

// ============================================================
// TRAIL
// ============================================================
const HorseTrail = ({ from, to, isActive, delay, landmarks }) => {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const curveOffset = 30;
  const pathD = `M ${from.x} ${from.y} Q ${midX + curveOffset} ${midY - curveOffset} ${to.x} ${to.y}`;

  return (
    <g>
      <path d={pathD} stroke="rgba(201,162,39,0.08)" strokeWidth="6" fill="none" strokeLinecap="round" />

      <motion.path
        d={pathD}
        stroke={isActive ? '#C9A227' : 'rgba(201,162,39,0.25)'}
        strokeWidth={isActive ? 2.5 : 1.2}
        strokeDasharray="6 8"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: delay, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {isActive && (
        <motion.path
          d={pathD}
          stroke="#C9A227"
          strokeWidth="2"
          strokeDasharray="4 8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -24 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(201,162,39,0.8))' }}
        />
      )}

      {landmarks.slice(0, 2).map((lm, i) => {
        const t = (i + 1) / 3;
        const x = (1 - t) ** 2 * from.x + 2 * (1 - t) * t * (midX + curveOffset) + t ** 2 * to.x;
        const y = (1 - t) ** 2 * from.y + 2 * (1 - t) * t * (midY - curveOffset) + t ** 2 * to.y;
        return (
          <motion.circle
            key={lm}
            cx={x}
            cy={y}
            r="2"
            fill="rgba(201,162,39,0.6)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: delay + 0.8 + i * 0.2, duration: 0.4 }}
          />
        );
      })}
    </g>
  );
};

// ============================================================
// JOURNEY MAP
// ============================================================
const JourneyMap = ({ hoveredIndex, setHoveredIndex }) => {
  const centerX = 250;
  const centerY = 250;
  const radius = 180;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Satellite background */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full opacity-40"
        style={{
          backgroundImage: 'url(/page 11 1 gpt.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0.6) brightness(0.4) contrast(1.2)',
        }}
      />

      {/* Grid + Crosshair */}
      <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" style={{ overflow: 'visible' }}>
        {Array.from({ length: 11 }).map((_, i) => (
          <g key={`grid-${i}`}>
            <line x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="rgba(201,162,39,0.08)" strokeWidth="1" />
            <line x1="0" y1={i * 50} x2="500" y2={i * 50} stroke="rgba(201,162,39,0.08)" strokeWidth="1" />
          </g>
        ))}
        <line x1={centerX} y1="0" x2={centerX} y2="500" stroke="rgba(201,162,39,0.18)" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="0" y1={centerY} x2="500" y2={centerY} stroke="rgba(201,162,39,0.18)" strokeWidth="1" strokeDasharray="4 8" />
      </svg>

      {/* ============================================================ */}
      {/* RADAR SWEEP — Fixed center using marginTop */}
      {/* ============================================================ */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px]"
        style={{
        marginTop: '-250px',
        marginLeft: '-125px',
        transformOrigin: 'bottom right',
        background:
        'conic-gradient(from 0deg, rgba(201,162,39,0.20) 0deg, rgba(201,162,39,0.08) 25deg, transparent 50deg, transparent 360deg)',
        clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Rotating rings */}
      <motion.div
        className="absolute inset-[8%] rounded-full border border-dashed border-[#C9A227]/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#C9A227] shadow-[0_0_15px_rgba(201,162,39,0.9)]" />
      </motion.div>

      <motion.div
        className="absolute inset-[22%] rounded-full border border-[#C9A227]/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#C9A227]/60" />
      </motion.div>

      {/* Trails */}
      <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" style={{ overflow: 'visible' }}>
        {locations.map((loc, index) => {
          const rad = (loc.angle * Math.PI) / 180;
          const toX = centerX + radius * Math.cos(rad);
          const toY = centerY + radius * Math.sin(rad);
          const isActive = hoveredIndex === index;
          return (
            <HorseTrail
              key={loc.name}
              from={{ x: centerX, y: centerY }}
              to={{ x: toX, y: toY }}
              isActive={isActive}
              delay={0.5 + index * 0.15}
              landmarks={loc.landmarks}
            />
          );
        })}
      </svg>

      {/* Center — Nakshath */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#C9A227]"
            animate={{ scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span
            className="absolute inset-0 rounded-full border border-[#C9A227]"
            animate={{ scale: [1, 3.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8, ease: 'easeOut' }}
          />
          <motion.span
            className="absolute inset-0 rounded-full border border-[#C9A227]"
            animate={{ scale: [1, 4.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1.6, ease: 'easeOut' }}
          />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A227] to-[#876B18] shadow-[0_0_40px_rgba(201,162,39,0.7)]">
            <svg width="26" height="30" viewBox="0 0 100 120" fill="none">
              <path
                d="M50 10 C 20 10, 10 40, 15 70 C 18 90, 25 105, 30 110 C 33 112, 38 110, 38 105 L 38 85 C 40 80, 45 78, 50 78 C 55 78, 60 80, 62 85 L 62 105 C 62 110, 67 112, 70 110 C 75 105, 82 90, 85 70 C 90 40, 80 10, 50 10 Z"
                fill="#0C0922"
              />
            </svg>
          </div>
        </div>

        <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-center">
          <p className="font-serif text-sm font-bold tracking-wider text-[#C9A227]">NAKSHATH</p>
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white/50">Sarjapura · Bengaluru</p>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* CITY MARKERS — Traffic dot NOT affecting centering */}
      {/* ============================================================ */}
      {locations.map((loc, index) => {
        const rad = (loc.angle * Math.PI) / 180;
        const x = 50 + (radius / 250) * 50 * Math.cos(rad);
        const y = 50 + (radius / 250) * 50 * Math.sin(rad);
        const isHovered = hoveredIndex === index;

        return (
          <motion.div
            key={loc.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${x}%`, top: `${y}%` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.7 + index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.2 }}
          >
            {/* Hover pulse rings — centered on city dot */}
            <AnimatePresence>
              {isHovered && (
                <>
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-[#C9A227]"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.span
                    className="absolute inset-0 rounded-full border border-[#C9A227]"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 3.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* City dot — centered on trail line */}
            <div
              className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isHovered
                  ? 'scale-110 border-[#C9A227] bg-[#C9A227] shadow-[0_0_25px_rgba(201,162,39,1)]'
                  : 'border-[#C9A227]/60 bg-[#0C0922]'
              }`}
            >
              <span className={`h-2 w-2 rounded-full transition-all ${isHovered ? 'bg-[#0C0922]' : 'bg-[#C9A227]'}`} />
            </div>

            {/* Traffic dot — FLOATS to the right, doesn't affect centering */}
            <motion.span
             className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0C0922]"
              style={{
                backgroundColor: trafficColors[loc.traffic],
                boxShadow: `0 0 8px ${trafficColors[loc.traffic]}99`,
              }}
              animate={{ scale: isHovered ? 1.3 : 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Label */}
            <motion.div
              className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-center"
              animate={{ opacity: isHovered ? 1 : 0.75, y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className={`font-serif text-[0.7rem] font-semibold tracking-wider transition-colors ${isHovered ? 'text-[#C9A227]' : 'text-white/65'}`}>
                {loc.name}
              </p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#C9A227]/80">{loc.time} min</p>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Compass */}
      <motion.div
        className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/30 bg-[#0C0922]/60 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <svg viewBox="0 0 40 40" className="h-7 w-7">
          <polygon points="20,4 23,20 20,18 17,20" fill="#C9A227" />
          <polygon points="20,36 17,20 20,22 23,20" fill="rgba(201,162,39,0.4)" />
          <polygon points="36,20 20,17 22,20 20,23" fill="rgba(201,162,39,0.4)" />
          <polygon points="4,20 20,23 18,20 20,17" fill="rgba(201,162,39,0.4)" />
        </svg>
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 font-mono text-[0.5rem] font-bold text-[#C9A227]">N</span>
      </motion.div>

      {/* Coordinates */}
      <motion.div
        className="absolute left-4 top-4 rounded-md border border-[#C9A227]/20 bg-[#0C0922]/70 px-3 py-1.5 backdrop-blur-md"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#C9A227]">12.8208° N</p>
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-white/50">77.7824° E</p>
      </motion.div>

      {/* Scale bar */}
      <motion.div
        className="absolute bottom-4 left-4 flex flex-col items-start gap-1"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <div className="flex items-center gap-1">
          <span className="h-px w-12 bg-[#C9A227]/60" />
          <span className="h-2 w-px bg-[#C9A227]/60" />
          <span className="h-px w-12 bg-[#C9A227]/60" />
          <span className="h-2 w-px bg-[#C9A227]/60" />
        </div>
        <p className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-white/50">0 — 5 km</p>
      </motion.div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const WhereWeAre = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setLastUpdate((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0C0922] py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#C9A227]/6 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#C9A227]/8 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#C9A227]/40" />
            <span className="type-eyebrow text-[#C9A227]">Where We Are</span>
            <span className="h-px w-12 bg-[#C9A227]/40" />
          </div>
          <h2 className="type-page-title text-white">
            Twelve minutes from
            <br />
            <span className="text-[#C9A227]">Sarjapur.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            Live journey map. Hover a location to see the route.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <JourneyMap hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
          </motion.div>

          <div className="flex flex-col gap-3">
            <motion.div
              className="mb-2 flex items-center justify-between"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-green-400">
                  Live Traffic
                </span>
              </div>
              <span className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-white/40">
                Updated {lastUpdate % 60}s ago
              </span>
            </motion.div>

            {locations.map((loc, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <motion.div
                  key={loc.name}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#C9A227]/15 bg-white/[0.02] p-4 backdrop-blur-sm transition-colors md:p-5"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  animate={{
                    borderColor: isHovered ? 'rgba(201,162,39,0.6)' : 'rgba(201,162,39,0.15)',
                    x: isHovered ? 8 : 0,
                  }}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 origin-top bg-gradient-to-b from-[#C9A227] to-[#876B18]"
                    animate={{ scaleY: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'top' }}
                  />

                  <div className="flex items-center justify-between gap-4 pl-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <motion.p
                          className="font-serif text-base font-semibold md:text-lg"
                          animate={{ color: isHovered ? '#C9A227' : '#FFFFFF' }}
                        >
                          {loc.name}
                        </motion.p>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: trafficColors[loc.traffic] }} />
                        <span className="font-mono text-[0.5rem] uppercase tracking-wider" style={{ color: trafficColors[loc.traffic] }}>
                          {trafficLabels[loc.traffic]}
                        </span>
                      </div>
                      <motion.p
                        className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/40"
                        animate={{ color: isHovered ? 'rgba(201,162,39,0.8)' : 'rgba(255,255,255,0.4)' }}
                      >
                        {loc.route}
                      </motion.p>
                    </div>

                    <div className="flex shrink-0 items-baseline gap-1">
                      <motion.span
                        className="font-serif text-2xl md:text-3xl"
                        animate={{ color: isHovered ? '#C9A227' : '#FFFFFF', scale: isHovered ? 1.05 : 1 }}
                      >
                        {loc.time}
                      </motion.span>
                      <span className="font-mono text-[0.55rem] uppercase tracking-wider text-white/40">min</span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 pl-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-mono text-[0.5rem] uppercase tracking-wider text-white/40">Distance</p>
                            <p className="font-serif text-sm text-[#C9A227]">{loc.distance} km</p>
                          </div>
                          <div>
                            <p className="font-mono text-[0.5rem] uppercase tracking-wider text-white/40">Landmark</p>
                            <p className="font-serif text-xs text-white/70">{loc.landmarks[0]}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
                    animate={{ width: isHovered ? '100%' : '0%' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
              );
            })}

            <motion.div
              className="mt-3 flex items-center justify-between rounded-xl border border-[#C9A227]/20 bg-gradient-to-br from-[#C9A227]/10 to-transparent p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#C9A227]">Riding Conditions</p>
                <p className="mt-1 text-sm text-white/70">22°C · Clear · Ideal for riding</p>
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="text-3xl"
              >
                ☀️
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-3 flex flex-col items-start gap-4 rounded-xl border border-[#C9A227]/20 bg-white/[0.02] p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <p className="text-sm leading-relaxed text-white/70">
                Inside BEML Cooperative Society, S. Medahalli, Sarjapura, Bengaluru 562107
              </p>
              <motion.a
                href={BUSINESS_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-[#C9A227] bg-[#C9A227] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#0C0922] transition-colors hover:bg-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Open in Google Maps
                <svg width="14" height="9" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
                  <path d="M0 5H16M16 5L12 1M16 5L12 9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereWeAre;