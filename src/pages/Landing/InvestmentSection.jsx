import { motion } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import { viewportOnce } from '../../utils/animations';

const InvestmentSection = () => {
  const { openEnquiry } = useEnquiry();

  const levels = [
    { level: 'LEVEL 01', lessons: '10', price: '₹11,999', img: '/level 1.png', tone: 'light' },
    { level: 'LEVEL 02', lessons: '20', price: '₹29,999', img: '/level 2.png', tone: 'light' },
    { level: 'LEVEL 03', lessons: '20', price: '₹32,999', img: '/level 3.png', tone: 'dark' }
  ];

  return (
    <div className="relative w-full bg-[#F2F0EB] overflow-hidden">

      {/* Main Background Image — with Ken Burns */}
      <div className="absolute inset-x-0 top-0 h-[640px] sm:inset-0 sm:h-auto overflow-hidden">
        <motion.img
          src="/trial-ride.png"
          alt="Rider on Horse"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-left brightness-[.94] contrast-[1.08] saturate-[1.1] sm:brightness-[.88] sm:contrast-[1.12] sm:saturate-[1.14]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Continuous Ken Burns */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F0EB]/18 via-[#F2F0EB]/52 to-[#F2F0EB] sm:bg-gradient-to-r sm:from-transparent sm:via-[#F2F0EB]/25 sm:to-[#F2F0EB]/75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-20 lg:py-24">

        {/* Content is on the RIGHT side */}
        <div className="lg:ml-[40%]">

          {/* ============================================================ */}
          {/* Header Section */}
          {/* ============================================================ */}
          <motion.div
            className="text-left md:text-center mb-9 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h4
              className="type-eyebrow text-[#1A1A1A] mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              The Investment
            </motion.h4>

            <motion.h2
              className="type-section-title mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[#1A1A1A]">Your Training,</span> <span className="text-[#C9A227]">Your Progression</span>
            </motion.h2>
          </motion.div>

          {/* ============================================================ */}
          {/* Level Cards — 3 Cards */}
          {/* ============================================================ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {levels.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative aspect-[1324/1188] overflow-hidden rounded-2xl bg-[#F2F0EB] shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={viewportOnce}
                transition={{
                  delay: idx * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <motion.img
                    src={item.img}
                    alt={item.level}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-contain ${idx === 0 ? 'scale-[1.06]' : ''}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                {/* Content */}
                <div className={`relative z-10 p-6 text-center flex flex-col items-center justify-center h-full ${item.tone === 'dark' ? '[text-shadow:0_2px_14px_rgba(0,0,0,.9)]' : ''}`}>
                  <motion.p
                    className={`type-eyebrow mb-3 ${item.tone === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: idx * 0.15 + 0.3, duration: 0.6 }}
                  >
                    {item.level}
                  </motion.p>

                  <motion.p
                    className={`type-page-title mb-2 ${item.tone === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ delay: idx * 0.15 + 0.4, duration: 0.7, type: 'spring', stiffness: 200 }}
                  >
                    {item.lessons}
                  </motion.p>

                  <motion.p
                    className={`type-small uppercase tracking-wider mb-5 ${item.tone === 'dark' ? 'text-white/80' : 'text-[#1A1A1A]/65'}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewportOnce}
                    transition={{ delay: idx * 0.15 + 0.5, duration: 0.6 }}
                  >
                    Lessons
                  </motion.p>

                  <motion.p
                    className="type-section-title text-[#C9A227]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: idx * 0.15 + 0.6, duration: 0.6 }}
                  >
                    {item.price}
                  </motion.p>
                </div>

                {/* Golden border on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-500 hover:border-[#C9A227]/70" />
              </motion.div>
            ))}
          </div>

          {/* ============================================================ */}
          {/* Trial Ride Subsection */}
          {/* ============================================================ */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-left md:text-center mb-8 sm:mb-10">
              <motion.h4
                className="type-eyebrow text-[#1A1A1A] mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Not Sure Where to Begin?
              </motion.h4>

              <motion.h2
                className="type-section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[#1A1A1A]">Begin with a</span> <span className="text-[#C9A227]">Trial Ride.</span>
              </motion.h2>
            </div>

            {/* Two Trial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">

              {/* Free Trial Ride */}
              <motion.div
                className="group flex rounded-2xl overflow-hidden shadow-lg bg-[#F2F0EB]/90 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#C9A227]/60 border-2 border-transparent"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Left: Image */}
                <div className="w-[35%] min-h-[180px] overflow-hidden">
                  <motion.img
                    src="/free ride.png"
                    alt="Free Trial Ride"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                {/* Right: Text */}
                <div className="w-[65%] p-6 flex flex-col justify-center">
                  <p className="type-eyebrow text-[#C9A227] mb-1">Free Trial Ride</p>
                  <p className="type-card-title text-[#1A1A1A] mb-1 group-hover:text-[#876B18] transition-colors">10 Minutes</p>
                  <p className="type-section-title text-[#C9A227] mb-2">Free</p>
                  <p className="type-caption text-[#1A1A1A]/75">An introductory riding experience for new registrations.</p>
                </div>
              </motion.div>

              {/* Paid Trial Ride */}
              <motion.div
                className="group flex rounded-2xl overflow-hidden shadow-lg bg-[#F2F0EB]/90 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#C9A227]/60 border-2 border-transparent"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Left: Image */}
                <div className="w-[35%] min-h-[180px] overflow-hidden">
                  <motion.img
                    src="/paid ride.png"
                    alt="Paid Trial Ride"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                {/* Right: Text */}
                <div className="w-[65%] p-6 flex flex-col justify-center">
                  <p className="type-eyebrow text-[#C9A227] mb-1">Paid Trial Ride</p>
                  <p className="type-card-title text-[#1A1A1A] mb-1 group-hover:text-[#876B18] transition-colors">45 Minutes</p>
                  <p className="type-section-title text-[#C9A227] mb-2">₹1,999</p>
                  <p className="type-caption text-[#1A1A1A]/75">An extended trial riding session.</p>
                </div>
              </motion.div>
            </div>

            {/* Book Button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                type="button"
                onClick={() => openEnquiry('Trial Ride')}
                className="type-button relative bg-[#0C0922] text-white px-10 py-4 rounded-full hover:bg-[#C9A227] hover:text-[#0C0922] transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Book Your Trial Ride →

                {/* Luxury Golden Glow Pulse */}
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(201,162,39,0)',
                      '0 0 22px 3px rgba(201,162,39,0.5)',
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSection;