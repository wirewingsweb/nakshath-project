// src/components/AnimatedLocationMap.jsx
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { BUSINESS_MAP_EMBED_URL, BUSINESS_MAP_URL } from '../constants/location';

const CENTER = { x: 50, y: 50, label: 'NAKSHATH', sub: 'Sarjapura · Bengaluru' };

const TOP_ROW = [
  { id: 'sarjapur',   name: 'SARJAPUR',   minutes: 12, x: 18, y: 10 },
  { id: 'hsr',        name: 'HSR LAYOUT', minutes: 22, x: 50, y: 10 },
  { id: 'whitefield', name: 'WHITEFIELD', minutes: 28, x: 82, y: 10 },
];

const BOTTOM_ROW = [
  { id: 'ecity',     name: 'ELECTRONIC CITY', minutes: 20, x: 25, y: 90 },
  { id: 'bellandur', name: 'BELLANDUR',       minutes: 24, x: 75, y: 90 },
];

const ALL_DESTINATIONS = [...TOP_ROW, ...BOTTOM_ROW];
const TOP_HUB = { x: 50, y: 28 };
const BOTTOM_HUB = { x: 50, y: 72 };

// Curved bezier between two points
const curve = (from, to, bend = 0.38) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const offset = bend * len;
  const cx = mx + nx * offset;
  const cy = my + ny * offset;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
};

// Straight line as a path string
const line = (from, to) => `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

const pillWidthFor = (label, isPrimary = false) => {
  const charWidth = isPrimary ? 1.35 : 1.15;
  const padding = isPrimary ? 6 : 5;
  return Math.max(label.length * charWidth + padding, isPrimary ? 26 : 18);
};

// Pulse timing
const STAGE_DURATION = 1.2;
const HOLD_AFTER = 1.0;
const CYCLE = STAGE_DURATION * 2 + HOLD_AFTER;
const STAGGER = 0.55;

const AnimatedLocationMap = () => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[680px] overflow-hidden rounded-2xl border border-[#C9A227]/25 bg-[#0C0922] shadow-2xl">
      {/* Soft radial lighting from center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(201,162,39,0.08) 0%, rgba(201,162,39,0.02) 35%, rgba(0,0,0,0) 65%)',
        }}
      />

      {/* Fine dotted texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(201,162,39,0.9) 0.8px, transparent 0.8px)',
          backgroundSize: '24px 24px',
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="alm-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="alm-glow-strong" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="alm-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#C9A227" stopOpacity="0" />
            <stop offset="35%"  stopColor="#C9A227" stopOpacity="0.5" />
            <stop offset="75%"  stopColor="#F5E6A8" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFF8DC" stopOpacity="1" />
          </linearGradient>
        </defs>

        <motion.circle
  cx="50"
  cy="50"
  r="3"
  fill="red"
  animate={{ r: [3, 8, 3] }}
  transition={{ duration: 2, repeat: Infinity }}
/>

        {/* ═══ Static connector lines ═══ */}
        <path
          d={line(CENTER, TOP_HUB)}
          stroke="#9CA3AF" strokeOpacity="0.25" strokeWidth="0.18" fill="none"
        />
        <path
          d={line(CENTER, BOTTOM_HUB)}
          stroke="#9CA3AF" strokeOpacity="0.25" strokeWidth="0.18" fill="none"
        />
        {TOP_ROW.map((node) => (
          <path
            key={`lt-${node.id}`}
            d={curve(TOP_HUB, node, 0.38)}
            stroke="#9CA3AF" strokeOpacity="0.25" strokeWidth="0.18" fill="none"
          />
        ))}
        {BOTTOM_ROW.map((node) => (
          <path
            key={`lb-${node.id}`}
            d={curve(BOTTOM_HUB, node, 0.38)}
            stroke="#9CA3AF" strokeOpacity="0.25" strokeWidth="0.18" fill="none"
          />
        ))}

        {/* ═══ Flowing pulses — REVERSED: satellite → hub → center ═══ */}
        {!prefersReduced &&
          ALL_DESTINATIONS.map((node, i) => {
            const isTop = TOP_ROW.some((n) => n.id === node.id);
            const hub = isTop ? TOP_HUB : BOTTOM_HUB;

            // REVERSED PATH DIRECTION: draw from satellite inward
            // Stage 1: satellite → hub (curved)
            // Stage 2: hub → center (straight)
            const d1Reversed = curve(node, hub, 0.38);
            const d2Reversed = line(hub, CENTER);

            const pulseLen = 6;
            const gap = 100;

            return (
              <g key={`flow-${node.id}`}>
                {/* Stage 1: satellite → hub */}
                <motion.path
                  d={d1Reversed}
                  fill="none"
                  stroke="url(#alm-flow)"
                  strokeWidth="0.42"
                  strokeLinecap="round"
                  style={{ strokeDasharray: `${pulseLen} ${gap}` }}
                  initial={{ strokeDashoffset: pulseLen }}
                  animate={{ strokeDashoffset: -gap }}
                  transition={{
                    duration: STAGE_DURATION,
                    delay: i * STAGGER,
                    repeat: Infinity,
                    repeatDelay: CYCLE - STAGE_DURATION,
                    ease: 'easeInOut',
                  }}
                />
                {/* Stage 2: hub → center */}
                <motion.path
                  d={d2Reversed}
                  fill="none"
                  stroke="url(#alm-flow)"
                  strokeWidth="0.42"
                  strokeLinecap="round"
                  style={{ strokeDasharray: `${pulseLen} ${gap}` }}
                  initial={{ strokeDashoffset: pulseLen }}
                  animate={{ strokeDashoffset: -gap }}
                  transition={{
                    duration: STAGE_DURATION,
                    delay: i * STAGGER + STAGE_DURATION,
                    repeat: Infinity,
                    repeatDelay: CYCLE - STAGE_DURATION,
                    ease: 'easeInOut',
                  }}
                />
              </g>
            );
          })}

        {/* ═══ Junction dots ═══ */}
        <circle cx={TOP_HUB.x} cy={TOP_HUB.y} r="0.45" fill="#D1D5DB" />
        <circle cx={BOTTOM_HUB.x} cy={BOTTOM_HUB.y} r="0.45" fill="#D1D5DB" />

        {/* ═══ NAKSHATH pulse — fires when a pulse arrives at center ═══ */}
        {!prefersReduced && (
          <>
            {ALL_DESTINATIONS.map((node, i) => {
              // Arrival at center happens after stage1 + stage2 complete.
              // Stage2 starts at (i * STAGGER + STAGE_DURATION) and lasts STAGE_DURATION.
              // So arrival is at (i * STAGGER + STAGE_DURATION * 2).
              const arrivalDelay = i * STAGGER + STAGE_DURATION * 2;
              return (
                <motion.circle
                  key={`center-pulse-${node.id}`}
                  cx={CENTER.x}
                  cy={CENTER.y}
                  r="3"
                  fill="none"
                  stroke="#C9A227"
                  strokeWidth="0.3"
                  initial={{ r: 3, opacity: 0 }}
                  animate={{ r: [3, 9], opacity: [0, 0.7, 0] }}
                  transition={{
                    duration: 1.1,
                    delay: arrivalDelay,
                    repeat: Infinity,
                    repeatDelay: CYCLE - 1.1,
                    ease: 'easeOut',
                  }}
                />
              );
            })}

            {ALL_DESTINATIONS.map((node, i) => {
              const arrivalDelay = i * STAGGER + STAGE_DURATION * 2;
              return (
                <motion.circle
                  key={`center-flash-${node.id}`}
                  cx={CENTER.x}
                  cy={CENTER.y}
                  r="2"
                  fill="#FFF8DC"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0] }}
                  transition={{
                    duration: 0.5,
                    delay: arrivalDelay,
                    repeat: Infinity,
                    repeatDelay: CYCLE - 0.5,
                    ease: 'easeOut',
                  }}
                  filter="url(#alm-glow-strong)"
                />
              );
            })}
          </>
        )}

        {/* ═══ Nodes ═══ */}
        {TOP_ROW.map((node) => (
          <NodePill key={node.id} node={node} />
        ))}
        {BOTTOM_ROW.map((node) => (
          <NodePill key={node.id} node={node} />
        ))}
        <NodePill node={CENTER} variant="primary" sub={CENTER.sub} />
      </svg>

      {/* ═══ Reference map ═══ */}
      <div className="absolute bottom-2.5 right-2.5 z-10 flex w-[24%] max-w-[90px] flex-col gap-1">
        <div className="overflow-hidden rounded-md border border-white/15 bg-black/30 shadow-lg">
          <iframe
            src={BUSINESS_MAP_EMBED_URL}
            width="100%"
            height="90"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nakshath Equestrian Club — reference map"
          />
        </div>
        <a
          href={BUSINESS_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 rounded-full bg-[#C9A227] px-2.5 py-1 text-[9px] font-semibold text-[#0C0922] shadow transition-colors hover:bg-[#FFF8DC]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.4" stroke="currentColor" className="h-2.5 w-2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Open in Maps
        </a>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// NodePill
// ─────────────────────────────────────────────────────────────
const NodePill = ({ node, variant = 'default', sub }) => {
  const isPrimary = variant === 'primary';
  const prefersReduced = usePrefersReducedMotion();

  const label = node.name || node.label;
  const pillWidth = pillWidthFor(label, isPrimary);
  const pillHeight = isPrimary ? 6.5 : 5.2;
  const pillRadius = pillHeight / 2;

  const pillX = node.x - pillWidth / 2;
  const pillY = node.y - pillHeight / 2;

  return (
    <g>
      {isPrimary && !prefersReduced && (
        <motion.rect
          x={pillX - 0.8}
          y={pillY - 0.8}
          width={pillWidth + 1.6}
          height={pillHeight + 1.6}
          rx={pillRadius + 0.8}
          fill="none"
          stroke="#C9A227"
          strokeWidth="0.35"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.75, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#alm-glow-strong)"
        />
      )}

      <rect
        x={pillX}
        y={pillY}
        width={pillWidth}
        height={pillHeight}
        rx={pillRadius}
        fill={isPrimary ? '#151102' : '#0F0F12'}
        stroke={isPrimary ? '#C9A227' : '#4B5563'}
        strokeWidth={isPrimary ? 0.3 : 0.18}
      />

      <circle
        cx={pillX + pillRadius + 0.4}
        cy={node.y}
        r={isPrimary ? 0.8 : 0.65}
        fill={isPrimary ? '#FFF8DC' : '#E5E7EB'}
        filter={isPrimary ? 'url(#alm-glow-strong)' : 'url(#alm-glow)'}
      />

      {isPrimary ? (
        <>
          <text
            x={node.x + 1.2} y={node.y - 0.4}
            textAnchor="middle" fill="#F5E6A8"
            fontSize="2.4" fontWeight="700" letterSpacing="0.18em"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {label}
          </text>
          {sub && (
            <text
              x={node.x + 1.2} y={node.y + 2}
              textAnchor="middle" fill="#B8B0A0"
              fontSize="1.3" fontWeight="400" letterSpacing="0.06em"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {sub}
            </text>
          )}
        </>
      ) : (
        <>
          <text
            x={node.x + 0.7} y={node.y - 0.3}
            textAnchor="middle" fill="#E5E7EB"
            fontSize="1.85" fontWeight="700" letterSpacing="0.14em"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {label}
          </text>
          {node.minutes && (
            <text
              x={node.x + 0.7} y={node.y + 1.9}
              textAnchor="middle" fill="#C9A227"
              fontSize="1.15" fontWeight="600" letterSpacing="0.16em"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {node.minutes} MIN
            </text>
          )}
        </>
      )}
    </g>
  );
};

export default AnimatedLocationMap;