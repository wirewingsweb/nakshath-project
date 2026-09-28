// src/components/sections/TheDifference.jsx
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText } from '../motion';

const editorialItem = (prefersReduced, isMobile, { y = 12, duration = 0.5, delay = 0 } = {}) => ({
  hidden: {
    opacity: 0,
    y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y),
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReduced ? 0 : duration,
      delay: prefersReduced ? 0 : delay,
      ease: EASE_PRIMARY,
    },
  },
});

const TheDifference = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [leftRef, leftInView] = useInViewOnce({ amount: 0.3 });
  const [imageRef, imageInView] = useInViewOnce({ amount: 0.15 });

  return (
    <section className="grid grid-cols-1 items-center overflow-hidden bg-[#FDFCFA] md:aspect-[1920/1365] md:grid-cols-[54%_46%]">
      <div className="px-6 py-16 sm:px-10 md:py-0 md:pl-[clamp(3rem,7.1vw,10rem)] md:pr-[3vw]">
        <div className="max-w-[38rem]">
          <motion.div
            ref={leftRef}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
          >
            {/* Eyebrow */}
            <motion.h4
              className="type-eyebrow mb-8 text-[#876B18] md:mb-[3vw]"
              variants={editorialItem(prefersReduced, isMobile, { y: 8, duration: 0.45 })}
            >
              ●&nbsp; The Difference
            </motion.h4>

            {/* Heading — word-by-word */}
            <SplitText
              as="h2"
              className="type-display mb-10 text-[#1A1A1A]"
              wordDelay={0.04}
              startDelay={0.1}
              amount={0.3}
            >
              Bengaluru’s equestrian training moves <span className="text-[#876B18]">indoors.</span>
            </SplitText>

            {/* Divider */}
            <motion.div
              className="mb-9 h-px w-[6.75rem] bg-[#876B18] md:mb-[3.2vw] md:w-[10vw]"
              variants={editorialItem(prefersReduced, isMobile, { y: 0, duration: 0.5, delay: 0.3 })}
            />

            {/* Paragraph */}
            <motion.p
              className="type-lead max-w-[27rem] text-[#1A1A1A] md:max-w-[31rem]"
              variants={editorialItem(prefersReduced, isMobile, { y: 12, duration: 0.55, delay: 0.4 })}
            >
              An all-weather covered arena on international-standard footing. Lessons do not stop for monsoon or summer heat.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Image with reveal + Ken Burns drift */}
      <div className="px-6 pb-10 md:px-0 md:pb-0">
        <div className="h-[28rem] w-full overflow-hidden rounded-[2rem] md:h-[57.5vw] md:rounded-l-[2.25rem] md:rounded-r-none">
          <motion.div
            ref={imageRef}
            className="h-full w-full"
            initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
            animate={
              prefersReduced
                ? { opacity: 1, scale: 1 }
                : imageInView
                  ? {
                      // Reveal to 1, then continuous Ken Burns drift forever
                      opacity: [0, 1, 1, 1, 1, 1],
                      scale: [1.05, 1, 1, 1.04, 1.02, 1.05],
                      x: ['0%', '0%', '0%', '-1.2%', '-0.6%', '0%'],
                      y: ['0%', '0%', '0%', '-0.6%', '-0.3%', '0%'],
                    }
                  : { opacity: 0, scale: 1.05 }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : {
                    duration: 30,
                    times: [0, 0.05, 0.15, 0.45, 0.7, 1],
                    ease: EASE_PRIMARY,
                    repeat: Infinity,
                    repeatType: 'loop',
                    repeatDelay: 0,
                  }
            }
          >
            <img
              src="/page 2 gpt.webp"
              alt="Indoor Arena"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TheDifference;