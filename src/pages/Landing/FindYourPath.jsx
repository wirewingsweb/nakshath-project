import { motion } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import { viewportOnce } from '../../utils/animations';

const FindYourPath = () => {
  const { openEnquiry } = useEnquiry();

  const programs = [
    {
      num: '01',
      title: 'KIDS SPECIAL RIDING PROGRAM',
      subtitle: 'A fun-filled learning experience for children.',
      img: '/kid path.png',
      features: ['Pony riding', 'Confidence building', 'Physical coordination', 'Interactive horse sessions']
    },
    {
      num: '02',
      title: 'BEGINNER PROGRAM',
      subtitle: 'Perfect for first-time riders.',
      img: '/begin path.png',
      features: ['Introduction to horses', 'Riding basics', 'Balance & posture', 'Safety training', 'Horse handling']
    },
    {
      num: '03',
      title: 'INTERMEDIATE TRAINING',
      subtitle: 'For riders seeking skill advancement.',
      img: '/inter path.png',
      features: ['Riding techniques', 'Trotting & Cantering', 'Horse Communication & Handling']
    },
    {
      num: '04',
      title: 'PROFESSIONAL COMPETITION TRAINING',
      subtitle: 'Designed for competitive riders.',
      img: '/advance path.png',
      features: ['Show Jumping preparation', 'Techniques', 'Performance assessment', 'Advanced Training']
    }
  ];

  return (
    <div className="bg-[#F2F0EB] py-14 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* ============================================================ */}
        {/* Header Section */}
        {/* ============================================================ */}
        <motion.div
          className="text-left md:text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h4
            className="type-eyebrow text-[#C9A227] mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Programs
          </motion.h4>

          <motion.h2
            className="type-page-title mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#1A1A1A]">Find</span> <span className="text-[#C9A227]">Your Path</span>
          </motion.h2>

          <motion.p
            className="type-lead text-[#1A1A1A]/85 max-w-2xl mx-0 md:mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Programs designed for every rider. From the very first step in the saddle
            to competitive excellence, we guide you every step of the way.
          </motion.p>
        </motion.div>

        {/* ============================================================ */}
        {/* Programs Grid */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, idx) => (
            <motion.div
              key={idx}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#C9A227]/15 bg-white/55 p-4 shadow-[0_14px_40px_rgba(12,9,34,0.06)] sm:p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227]/60 hover:shadow-[0_24px_60px_rgba(12,9,34,0.15)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                delay: idx * 0.12,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Program Number + Title */}
              <div className="flex items-start gap-3 mb-4">
                <motion.span
                  className="type-page-title text-[#C9A227] leading-none shrink-0"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: idx * 0.12 + 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
                >
                  {program.num}
                </motion.span>
                <h3 className="min-w-0 break-words font-bold text-[#1A1A1A] text-sm uppercase tracking-wide leading-snug mt-2 sm:mt-3 group-hover:text-[#876B18] transition-colors duration-300">
                  {program.title}
                </h3>
              </div>

              {/* Image */}
              <div className="mb-4 overflow-hidden rounded-xl">
                <motion.img
                  src={program.img}
                  alt={program.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Description */}
              <p className="type-small text-[#1A1A1A]/80 mb-4">
                {program.subtitle}
              </p>

              {/* Divider Line */}
              <motion.div
                className="h-[1px] bg-[#C9A227]/20 mb-4"
                initial={{ scaleX: 0.3, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.12 + 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Features List */}
              <motion.ul
                className="type-caption space-y-2 text-[#1A1A1A]/80"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delayChildren: idx * 0.12 + 0.6, staggerChildren: 0.08 } },
                }}
              >
                {program.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#C9A227] flex-shrink-0"></span>
                    <span className="font-normal">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Bottom scan line on hover */}
              <motion.div
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
                initial={{ width: '0%' }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* Explore All Courses Button */}
        {/* ============================================================ */}
        <motion.div
          className="text-left md:text-center mt-10 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            type="button"
            onClick={() => openEnquiry('Riding Classes')}
            className="type-button relative max-w-full border border-[#C9A227] text-[#C9A227] px-6 sm:px-10 py-4 hover:bg-[#C9A227] hover:text-white transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore All Courses →

            {/* Luxury Golden Glow Pulse */}
            <motion.span
              className="pointer-events-none absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(201,162,39,0)',
                  '0 0 20px 3px rgba(201,162,39,0.4)',
                  '0 0 0 0 rgba(201,162,39,0)',
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FindYourPath;