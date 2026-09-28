import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const offers = [
  { img: '/page 11 2 gpt.webp', num: '01', title: 'Free trial ride', desc: 'Ten minutes on a schooled horse. No charge, no obligation.' },
  { img: '/page 11 3 gpt.webp', num: '02', title: '10% off the first month', desc: 'Applied to any programme at enrolment.' },
  { img: '/page 11 4 gpt.webp', num: '03', title: 'Weekend batches', desc: 'Saturday and Sunday sessions for working schedules.' },
  { img: '/page 11 5 gpt.webp', num: '04', title: 'Kids summer camp', desc: 'A structured holiday programme for children.' },
  { img: '/page 11 6 gpt.webp', num: '05', title: 'Early registration', desc: 'Priority slots for riders who enrol before opening.' },
];

/* ============================================================
   WORD-CASCADE REVEAL
   ============================================================ */
const WordCascade = ({ text, delay = 0, className = '' }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* ============================================================
   OFFER ITEM
   ============================================================ */
const OfferItem = ({ item, index }) => {
  const baseDelay = 0.4 + index * 0.1;
  const skew = index % 2 === 0 ? -4 : 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: skew }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1,
        delay: baseDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex min-w-0 flex-row items-start gap-3"
    >
      {/* Vertical gold bar */}
      <span className="pointer-events-none absolute -left-3 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#C9A227] transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />

      {/* ===== IMAGE ===== */}
      <div className="relative aspect-[0.72] w-28 flex-shrink-0 overflow-hidden rounded-lg xl:w-[clamp(4.75rem,9vw,11rem)]">
        <motion.div
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: baseDelay + 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <motion.img
            src={item.img}
            alt={item.title}
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.8,
              delay: baseDelay + 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </motion.div>

        {/* Number badge — shadcn Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: -10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: baseDelay + 0.7,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="pointer-events-none absolute left-2 top-2 z-10"
        >
          <Badge
            variant="outline"
            className="flex h-7 w-7 items-center justify-center rounded-full border-[#C9A227]/60 bg-[#FDFCFA]/90 p-0 font-serif text-[0.7rem] font-semibold text-[#876B18] backdrop-blur-sm transition-all duration-500 group-hover:bg-[#C9A227] group-hover:text-[#FDFCFA] hover:bg-[#C9A227]"
          >
            {item.num}
          </Badge>
        </motion.div>

        {/* Gold rim on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-lg border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/40" />
      </div>

      {/* ===== TEXT ===== */}
      <div className="flex min-w-0 flex-1 flex-col pt-1">
        <h4 className="mb-2 text-sm font-semibold leading-tight text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#876B18] md:mb-1 md:text-sm">
          <WordCascade text={item.title} delay={baseDelay + 0.4} />
        </h4>

        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: baseDelay + 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-2 block h-px w-8 origin-left bg-[#C9A227]/60"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: baseDelay + 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[9rem] text-xs font-normal leading-[1.5] text-[#5A5A66] md:max-w-[9rem] md:text-xs"
        >
          {item.desc}
        </motion.p>
      </div>
    </motion.div>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const OpeningSeason = () => {
  return (
    <section className="overflow-hidden bg-[#FDFCFA] px-6 py-12 md:px-10 md:py-20 xl:aspect-[1920/852] xl:p-0">
      <div className="mx-auto flex h-full w-full flex-col items-start gap-12 bg-[#FDFCFA] xl:flex-row xl:gap-0">

        {/* ===== LEFT: Offers Grid ===== */}
        <div className="flex w-full flex-col xl:w-[71%] xl:pl-[5.9vw] xl:pr-[4.8vw] xl:pt-[4.7vw]">
          {/* Header */}
          <div className="mb-8 pl-0">
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.05em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3"
            >
              <Badge
                variant="outline"
                className="rounded-full border-transparent bg-transparent px-0 text-[#C9A227] type-eyebrow hover:bg-transparent"
              >
                Opening Season
              </Badge>
            </motion.div>

            <h2 className="type-section-title text-[#1A1A1A]">
              <WordCascade text="Available until" delay={0.25} />
              <br />
              <WordCascade text="we open." delay={0.6} />
            </h2>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 gap-8 pl-0 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[2.5vw]">
            {offers.map((item, index) => (
              <OfferItem key={item.num} item={item} index={index} />
            ))}

            {/* CTA Button — shadcn Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-end justify-start pb-6 sm:justify-center"
            >
              <Button
                asChild
                variant="ghost"
                className="group/btn h-auto rounded-none bg-transparent p-0 text-xs font-medium text-[#1A1A1A] transition-colors duration-300 hover:bg-transparent hover:text-[#C9A227]"
              >
                <motion.a
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  href="#"
                  className="inline-flex items-center gap-2"
                >
                  <span className="border-b-2 border-[#C9A227] pb-1 transition-colors duration-300 group-hover/btn:border-[#1A1A1A]">
                    Book your trial ride
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* ===== RIGHT IMAGE ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] xl:aspect-auto xl:h-full xl:w-[29%]"
        >
          <img
            src="/page 11 1 gpt.webp"
            alt="Equestrian Facility"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default OpeningSeason;