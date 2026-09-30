// src/components/AnimatedLocationMap.jsx
import { BUSINESS_MAP_EMBED_URL, BUSINESS_MAP_URL } from '../constants/location';

const CENTER = { x: 50, y: 50, label: 'NAKSHATH', sub: 'Sarjapura · Bengaluru' };

const PILL_HEIGHT_NORMAL = 5.5;
const PILL_HEIGHT_PRIMARY = 7;

const TOP_ROW = [
  { id: 'sarjapur',   name: 'SARJAPUR',   minutes: 12, x: 18, y: 12, color: '#C9A227', accent: '#F5E6A8' },
  { id: 'hsr',        name: 'HSR LAYOUT', minutes: 22, x: 50, y: 12, color: '#D4AF37', accent: '#FFF8DC' },
  { id: 'whitefield', name: 'WHITEFIELD', minutes: 28, x: 82, y: 12, color: '#B8860B', accent: '#E6A817' },
];

const BOTTOM_ROW = [
  { id: 'ecity',     name: 'ELECTRONIC CITY', minutes: 20, x: 25, y: 88, color: '#A67817', accent: '#D4AF37' },
  { id: 'bellandur', name: 'BELLANDUR',       minutes: 24, x: 75, y: 88, color: '#8B6914', accent: '#C9A227' },
];

const ALL_DESTINATIONS = [...TOP_ROW, ...BOTTOM_ROW];
const TOP_HUB = { x: 50, y: 30 };
const BOTTOM_HUB = { x: 50, y: 70 };

const pillWidthFor = (label, isPrimary = false) => {
  const charWidth = isPrimary ? 1.35 : 1.15;
  const padding = isPrimary ? 6 : 5;
  return Math.max(label.length * charWidth + padding, isPrimary ? 26 : 18);
};

const startPointFor = (node, hub) => {
  const pillH = PILL_HEIGHT_NORMAL;
  if (node.y < hub.y) {
    return { x: node.x, y: node.y + pillH / 2 };
  }
  return { x: node.x, y: node.y - pillH / 2 };
};

const buildFullPath = (satellite, hub) => {
  const start = startPointFor(satellite, hub);
  const dx = hub.x - start.x;
  const dy = hub.y - start.y;
  const len = Math.hypot(dx, dy) || 1;

  const side = satellite.x < hub.x ? 1 : -1;
  const bendAmount = 1.0;

  const mx = (start.x + hub.x) / 2;
  const my = (start.y + hub.y) / 2;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * side * bendAmount * len;
  const cy = my + ny * side * bendAmount * len;

  return `M ${start.x} ${start.y} Q ${cx} ${cy} ${hub.x} ${hub.y} L ${CENTER.x} ${CENTER.y}`;
};

const AnimatedLocationMap = () => {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[680px] overflow-hidden rounded-3xl border border-[#C9A227]/50 bg-white"
      style={{
        boxShadow:
          '0 20px 60px -20px rgba(201,162,39,0.25), 0 8px 24px -8px rgba(12,9,34,0.08)',
      }}
    >
      <style>{`
        /* Continuous conveyor-belt flow: multiple dashes move along the path */
        @keyframes alm-full-flow {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -180; }
        }
        @keyframes alm-center-pulse {
          0%   { r: 3; opacity: 0; }
          30%  { r: 5; opacity: 0.9; }
          100% { r: 16; opacity: 0; }
        }
        @keyframes alm-primary-glow {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        @keyframes alm-bg-shimmer {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.65; }
        }
        .alm-pulse-path {
          stroke-dasharray: 0.2 8;
          stroke-dashoffset: 0;
          animation: alm-full-flow 15s linear infinite;
        }
        .alm-center-ring {
          animation: alm-center-pulse 1.4s ease-out infinite;
          animation-delay: 3.3s;
        }
        .alm-primary-rect {
          animation: alm-primary-glow 2.5s ease-in-out infinite;
        }
        .alm-radial-glow {
          animation: alm-bg-shimmer 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .alm-pulse-path,
          .alm-center-ring,
          .alm-primary-rect,
          .alm-radial-glow {
            animation: none;
          }
          .alm-pulse-path { opacity: 0.5; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="alm-radial-glow pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(201,162,39,0.14) 0%, rgba(201,162,39,0.04) 40%, rgba(0,0,0,0) 70%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
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
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {ALL_DESTINATIONS.map((node) => (
            <linearGradient
              key={`grad-${node.id}`}
              id={`grad-${node.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%"   stopColor={node.color} stopOpacity="0.4" />
              <stop offset="30%"  stopColor={node.color} stopOpacity="0.9" />
              <stop offset="70%"  stopColor={node.accent} stopOpacity="1" />
              <stop offset="100%" stopColor={node.accent} stopOpacity="1" />
            </linearGradient>
          ))}
        </defs>

        {/* Static base lines */}
        {ALL_DESTINATIONS.map((node) => {
          const isTop = TOP_ROW.some((n) => n.id === node.id);
          const hub = isTop ? TOP_HUB : BOTTOM_HUB;
          return (
            <path
              key={`base-${node.id}`}
              d={buildFullPath(node, hub)}
              stroke="#C9A227"
              strokeOpacity="0.35"
              strokeWidth="0.22"
              fill="none"
            />
          );
        })}

        {/* Continuous flowing pulses — multiple dashes, slow, seamless */}
        {ALL_DESTINATIONS.map((node) => {
          const isTop = TOP_ROW.some((n) => n.id === node.id);
          const hub = isTop ? TOP_HUB : BOTTOM_HUB;
          const fullPath = buildFullPath(node, hub);

          return (
            <path
              key={`pulse-${node.id}`}
              className="alm-pulse-path"
              d={fullPath}
              fill="none"
              stroke={`url(#grad-${node.id})`}
              strokeWidth="1.1"
              strokeLinecap="round"
              filter="url(#alm-glow-strong)"
            />
          );
        })}

        {/* Junction dots */}
        <circle cx={TOP_HUB.x} cy={TOP_HUB.y} r="0.55" fill="#C9A227" />
        <circle cx={BOTTOM_HUB.x} cy={BOTTOM_HUB.y} r="0.55" fill="#C9A227" />

        {/* Center arrival rings */}
        {ALL_DESTINATIONS.map((node) => (
          <circle
            key={`ring-${node.id}`}
            className="alm-center-ring"
            cx={CENTER.x}
            cy={CENTER.y}
            r="3"
            fill="none"
            stroke="#C9A227"
            strokeWidth="0.5"
          />
        ))}

        {/* Nodes */}
        {TOP_ROW.map((node) => (
          <NodePill key={node.id} node={node} />
        ))}
        {BOTTOM_ROW.map((node) => (
          <NodePill key={node.id} node={node} />
        ))}
        <NodePill node={CENTER} variant="primary" sub={CENTER.sub} />
      </svg>

      {/* Reference map */}
      <div className="absolute bottom-3 right-3 z-10 flex w-[26%] max-w-[100px] flex-col gap-1.5">
        <div
          className="overflow-hidden rounded-lg"
          style={{
            padding: '2px',
            background: 'linear-gradient(135deg, #C9A227 0%, #F5E6A8 50%, #C9A227 100%)',
            boxShadow: '0 4px 16px -4px rgba(201,162,39,0.5)',
          }}
        >
          <div className="overflow-hidden rounded-md bg-white">
            <iframe
              src={BUSINESS_MAP_EMBED_URL}
              width="100%"
              height="95"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nakshath Equestrian Club — reference map"
            />
          </div>
        </div>
        <a
          href={BUSINESS_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-md transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #C9A227 0%, #8B6914 100%)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.4"
            stroke="currentColor"
            className="h-2.5 w-2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
          Open Map
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
  const label = node.name || node.label;
  const pillWidth = pillWidthFor(label, isPrimary);
  const pillHeight = isPrimary ? PILL_HEIGHT_PRIMARY : PILL_HEIGHT_NORMAL;
  const pillRadius = pillHeight / 2;

  const pillX = node.x - pillWidth / 2;
  const pillY = node.y - pillHeight / 2;

  const dotRadius = isPrimary ? 0.85 : 0.7;
  const dotPaddingLeft = 1.2;
  const dotToTextGap = 1.5;

  const dotCx = pillX + dotPaddingLeft + dotRadius;
  const textLeft = dotCx + dotRadius + dotToTextGap;
  const textRight = pillX + pillWidth - dotPaddingLeft;
  const textCenter = (textLeft + textRight) / 2;

  const dotColor = isPrimary ? '#F5E1A4' : node.accent || '#F5E6A8';

  return (
    <g>
      {isPrimary && (
        <rect
          className="alm-primary-rect"
          x={pillX - 0.8}
          y={pillY - 0.8}
          width={pillWidth + 1.6}
          height={pillHeight + 1.6}
          rx={pillRadius + 0.8}
          fill="none"
          stroke="#C9A227"
          strokeWidth="0.4"
          filter="url(#alm-glow-strong)"
        />
      )}

      <rect
        x={pillX}
        y={pillY}
        width={pillWidth}
        height={pillHeight}
        rx={pillRadius}
        fill={isPrimary ? '#0C0922' : '#1A1A1A'}
        stroke="#C9A227"
        strokeWidth={isPrimary ? 0.4 : 0.25}
      />

      <circle
        cx={dotCx}
        cy={node.y}
        r={dotRadius}
        fill={dotColor}
        filter="url(#alm-glow-strong)"
      />

      {isPrimary ? (
        <>
          <text
            x={textCenter}
            y={node.y - 0.9}
            textAnchor="middle"
            fill="#F5E1A4"
            fontSize="2.2"
            fontWeight="700"
            letterSpacing="0.16em"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {label}
          </text>
          {sub && (
            <text
              x={textCenter}
              y={node.y + 2}
              textAnchor="middle"
              fill="#C9A227"
              fontSize="1.2"
              fontWeight="400"
              letterSpacing="0.05em"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {sub}
            </text>
          )}
        </>
      ) : (
        <text
          x={textCenter}
          y={node.y + 0.55}
          textAnchor="middle"
          fill="#F5E1A4"
          fontSize="1.75"
          fontWeight="700"
          letterSpacing="0.12em"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {label}
        </text>
      )}

      {!isPrimary && node.minutes && (
        <text
          x={node.x}
          y={pillY + pillHeight + 2.4}
          textAnchor="middle"
          fill="#8B6914"
          fontSize="1.5"
          fontWeight="700"
          letterSpacing="0.18em"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {node.minutes} MIN
        </text>
      )}
    </g>
  );
};

export default AnimatedLocationMap;