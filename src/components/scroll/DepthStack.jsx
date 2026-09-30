import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

/**
 * DepthStack
 * Multiple layers stacked in a fixed-height container. Each layer moves at a
 * different rate depending on its depth. Foreground (depth 0) moves fastest,
 * background (depth 1) is nearly still. Classic 2.5D depth.
 *
 * <DepthStack height="h-[80vh]" layers={[
 *   { depth: 1, content: <img src="bg.png" /> },
 *   { depth: 0.6, content: <img src="mid.png" /> },
 *   { depth: 0.3, content: <img src="fg.png" /> },
 * ]} />
 */
const DepthStack = ({ layers = [], height = 'h-[80vh]', className = '' }) => {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  if (shouldReduce) {
    return (
      <div ref={ref} className={`relative ${height} overflow-hidden ${className}`}>
        {layers.map((layer, i) => (
          <div key={i} className={`absolute inset-0 ${layer.className || ''}`}>
            {layer.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${height} overflow-hidden ${className}`}>
      {layers.map((layer, i) => (
        <DepthLayer
          key={i}
          progress={scrollYProgress}
          depth={layer.depth ?? i / Math.max(1, layers.length - 1)}
          className={layer.className}
        >
          {layer.content}
        </DepthLayer>
      ))}
    </div>
  );
};

const DepthLayer = ({ progress, depth, children, className = '' }) => {
  // Foreground (depth 0) moves ±40%, background (depth 1) moves ±10%
  const movement = 40 - depth * 30;
  const y = useTransform(progress, [0, 1], [`${movement}%`, `${-movement}%`]);
  const scaleFrom = 1 + depth * 0.06;
  const scale = useTransform(progress, [0, 0.5, 1], [scaleFrom, 1, scaleFrom]);

  const springConfig = { stiffness: 100, damping: 28, mass: 0.5 };
  const smoothedY = useSpring(y, springConfig);
  const smoothedScale = useSpring(scale, springConfig);

  return (
    <motion.div
      style={{
        y: smoothedY,
        scale: smoothedScale,
        zIndex: Math.round((1 - depth) * 100),
        willChange: 'transform',
      }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default DepthStack;