// src/components/GoldMotes.jsx
import { useEffect, useRef } from 'react';

/**
 * GoldMotes — ambient gold dust drifting through the frame.
 *
 * Pure gold palette. No cream highlights, no white cores.
 * Uses canvas additive blending for a soft, luminous effect.
 *
 * Props:
 *   count      — number of motes (default 35)
 *   color      — RGB triple for the mote color (default [201, 162, 39] = #C9A227)
 *   minSize    — smallest mote radius in px (default 0.8)
 *   maxSize    — largest mote radius in px (default 2.4)
 *   speed      — vertical drift multiplier (default 1)
 *   paused     — freeze animation (default false)
 */
const GoldMotes = ({
  count = 35,
  color = [201, 162, 39], // #C9A227 as RGB
  minSize = 0.8,
  maxSize = 2.4,
  speed = 1,
  paused = false,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const motesRef = useRef([]);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const [r, g, b] = color;

    const makeMote = (spawnAtBottom = false) => {
      const depth = Math.random(); // 0 = far, 1 = near
      const size = minSize + depth * (maxSize - minSize);
      return {
        x: Math.random() * width,
        y: spawnAtBottom ? height + Math.random() * 40 : Math.random() * height,
        size,
        vy: -(0.08 + depth * 0.22) * speed,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.0004 + Math.random() * 0.0008,
        swayAmp: 6 + depth * 14,
        depth,
        opacity: 0.15 + depth * 0.55,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      motesRef.current = Array.from({ length: count }, () => makeMote(false));
    };

    resize();
    seed();

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener('resize', onResize);

    const draw = (t) => {
      if (!paused) {
        const dt = lastTimeRef.current ? Math.min(t - lastTimeRef.current, 40) : 16;
        lastTimeRef.current = t;

        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'lighter';

        const motes = motesRef.current;
        for (let i = 0; i < motes.length; i++) {
          const m = motes[i];

          m.y += m.vy * (dt / 16);
          m.swayPhase += m.swaySpeed * dt;
          const swayX = Math.sin(m.swayPhase) * m.swayAmp * 0.02;

          if (m.y < -10) {
            motes[i] = makeMote(true);
            continue;
          }

          const drawX = m.x + swayX;
          const drawY = m.y;

          // Soft radial falloff — pure gold throughout, no cream
          const grd = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            m.size * 4
          );
          grd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${m.opacity})`);
          grd.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${m.opacity * 0.35})`);
          grd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(drawX, drawY, m.size * 4, 0, Math.PI * 2);
          ctx.fill();

          // Bright core — still gold, just more saturated
          if (m.depth > 0.6) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${m.opacity * 1.2})`;
            ctx.beginPath();
            ctx.arc(drawX, drawY, m.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [count, color, minSize, maxSize, speed, paused]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default GoldMotes;