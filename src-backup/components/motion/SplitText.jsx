// src/components/motion/SplitText.jsx
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';

/**
 * SplitText — reveals text word-by-word as it enters the viewport.
 * Preserves inline elements (spans) for styled words.
 *
 * Usage:
 *   <SplitText as="h2" className="type-display">
 *     Bengaluru's equestrian training moves <span className="text-[#876B18]">indoors.</span>
 *   </SplitText>
 */
const SplitText = ({
  children,
  as = 'h2',
  className = '',
  wordDelay = 0.04,
  startDelay = 0,
  duration = DURATION.normal,
  amount = 0.3,
  once = true,
  ...rest
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [ref, inView] = useInViewOnce({ amount, once });

  // Extract text, preserving inline JSX elements (spans, br, etc.)
  const renderWords = () => {
    const elements = [];
    let wordIndex = 0;

    const processNode = (node, parentKey = 'root') => {
      if (typeof node === 'string') {
        // Split into words, preserve spacing
        const words = node.split(/(\s+)/);
        return words.map((word, i) => {
          if (word === '') return null;
          if (/^\s+$/.test(word)) {
            return <span key={`${parentKey}-space-${i}`}> </span>;
          }
          wordIndex += 1;
          const currentIndex = wordIndex - 1;
          return (
            <motion.span
              key={`${parentKey}-word-${i}-${currentIndex}`}
              className="inline-block"
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={
                inView || prefersReduced
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: prefersReduced ? 0 : duration,
                delay: prefersReduced ? 0 : startDelay + currentIndex * wordDelay,
                ease: EASE_PRIMARY,
              }}
            >
              {word}
            </motion.span>
          );
        });
      }
      if (typeof node === 'object' && node !== null) {
        // JSX element (span with classes, br, etc.)
        if (node.type === 'br') {
          return <br key={`${parentKey}-br`} />;
        }
        // Recurse into children, wrap in the original element
        const childContent = Array.isArray(node.props.children)
          ? node.props.children.map((child, idx) => processNode(child, `${parentKey}-${idx}`))
          : processNode(node.props.children, `${parentKey}-child`);
        return (
          <node.type key={`${parentKey}-el`} {...node.props}>
            {childContent}
          </node.type>
        );
      }
      return null;
    };

    if (Array.isArray(children)) {
      children.forEach((child, idx) => {
        const processed = processNode(child, `root-${idx}`);
        if (processed) elements.push(processed);
      });
    } else {
      const processed = processNode(children);
      if (processed) elements.push(processed);
    }

    return elements;
  };

  const MotionTag = motion[as] || motion.h2;

  if (prefersReduced) {
    const Tag = as;
    return <Tag className={className} {...rest}>{children}</Tag>;
  }

  return (
    <MotionTag ref={ref} className={className} {...rest}>
      {renderWords()}
    </MotionTag>
  );
};

export default SplitText;