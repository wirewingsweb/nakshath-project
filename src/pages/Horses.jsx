import { motion } from 'framer-motion';

/* ============================================================
   SPLIT-LINE REVEAL
   ============================================================ */
const RevealLine = ({ children, delay = 0, className = '' }) => (
  <span className="block overflow-hidden">
    <motion.span
      initial={{ y: '110%', opacity: 0 }}
      whileInView={{ y: '0%', opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`block ${className}`}
    >
      {children}
    </motion.span>
  </span>
);

/* ============================================================
   EYEBROW
   ============================================================ */
const Eyebrow = ({ children, delay = 0, className = '' }) => (
  <motion.h4
    initial={{ opacity: 0, letterSpacing: '0.05em' }}
    whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
    viewport={{ once: true, amount: 0 }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.h4>
);

/* ============================================================
   LETTER-BY-LETTER NAME REVEAL
   ============================================================ */
const LetterReveal = ({ text, delay = 0, className = '' }) => {
  const letters = text.split('');
  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          initial={{ opacity: 0, y: '0.4em', filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

/* ============================================================
   HORSE CARD — Editorial Stack + Floating Number (kept as-is)
   ============================================================ */
const HorseCard = ({ horse, index }) => {
  const baseDelay = 0.2 + index * 0.14;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.9,
        delay: baseDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col pt-16"
    >
      {/* GIANT FLOATING NUMBER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{
          duration: 1,
          delay: baseDelay + 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute left-0 top-0 z-20 select-none"
      >
        <motion.span
          className="block font-serif text-[5.5rem] leading-none text-[#0C0922]/15 transition-colors duration-700 group-hover:text-[#C9A227]"
          style={{ letterSpacing: '-0.04em' }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </motion.div>

      {/* IMAGE */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{
          duration: 1.2,
          delay: baseDelay + 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full"
      >
        <div className="relative w-full overflow-hidden rounded-2xl bg-[#0C0922] shadow-[0_20px_50px_-20px_rgba(12,9,34,0.35)] transition-shadow duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_40px_80px_-30px_rgba(12,9,34,0.5)]">
          <motion.img
            src={horse.img}
            alt={horse.name}
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.15, filter: 'blur(20px) brightness(0.6)' }}
            whileInView={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
            viewport={{ once: true, amount: 0 }}
            transition={{
              duration: 2,
              delay: baseDelay + 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="block aspect-[9/16] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0C0922]/70 via-transparent to-transparent" />

          {/* Warm backlit glow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,_rgba(201,162,39,0.22),_transparent_60%)]"
          />

          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/50" />

          {/* Metadata band */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{
                duration: 0.7,
                delay: baseDelay + 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#C9A227]/90"
            >
              <span>{horse.breed}</span>
              <span className="text-[#C9A227]/40">·</span>
              <span>{horse.age}</span>
              <span className="text-[#C9A227]/40">·</span>
              <span>{horse.gender}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* TEXT */}
      <div className="relative z-20 mt-5">
        <h3 className="font-serif text-2xl leading-none tracking-tight text-[#1A1A1A] md:text-[1.65rem]">
          <LetterReveal text={horse.name} delay={baseDelay + 1.1} />
        </h3>

        <span className="pointer-events-none mt-3 mb-3 block h-px w-full origin-left scale-x-0 bg-[#C9A227]/60 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: baseDelay + 1.35 }}
          className="mb-4 text-sm font-normal leading-relaxed text-[#5A5A66]"
        >
          {horse.temperament}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: baseDelay + 1.5 }}
          className="flex gap-3 text-xs font-semibold uppercase tracking-wider text-[#C9A227]"
        >
          <span className="transition-all duration-500 group-hover:tracking-[0.2em]">
            {horse.level}
          </span>
          <span className="opacity-50">·</span>
          <span className="transition-all duration-500 group-hover:tracking-[0.2em]">
            {horse.discipline}
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
};

/* ============================================================
   MAIN PAGE
   ============================================================ */
const Horses = () => {
  const horses = [
    { name: 'Vibrato', breed: 'Warmblood', age: '17 Yrs.', gender: 'Gelding', colour: 'Chestnut', temperament: 'Steady and unflurried. The horse most first-time riders start on.', level: 'Advanced', discipline: 'General Riding', img: '/Vibrato.png' },
    { name: 'Simbha', breed: 'Thoroughbred', age: '9 Yrs.', gender: 'Gelding', colour: 'Dark Bay', temperament: 'Responsive and forward-going. Suits riders building confidence at trot and canter.', level: 'Intermediate', discipline: 'Show Jumping', img: '/Simbha.png' },
    { name: 'Phebe', breed: 'Thoroughbred', age: '8 Yrs.', gender: 'Mare', colour: 'Bay', temperament: 'Patient and consistent. Trained for flatwork and figures.', level: 'Intermediate', discipline: 'Dressage', img: '/Phebe.png' },
    { name: 'Rani', breed: 'Thoroughbred', age: '11 Yrs.', gender: 'Gelding', colour: 'Chestnut', temperament: 'Bold over fences and honest to the jump. Ridden by competing riders.', level: 'Advanced', discipline: 'Show Jumping', img: '/Rani.png' },
  ];

  const matchItems = [
    { num: '01', title: 'Temperament first, ability second', desc: 'A horse can be well schooled and still be wrong for a nervous beginner. Every horse is assessed for calmness and consistency before it is assessed for what it can do.' },
    { num: '02', title: 'Matched to the rider, not to availability', desc: 'Horses are allocated on the rider\'s experience, confidence and goals. Nobody is put on whatever happens to be free that morning.' },
    { num: '03', title: 'Ponies for the youngest riders', desc: 'Children from five years begin on ponies sized and schooled for them, not on a grown-up-sized horse.' },
    { num: '04', title: 'The same pairing, session after session', desc: 'Progress compounds when horse and rider know each other. Pairings are kept consistent rather than switching week to week.' },
  ];

  const careItems = [
    { title: 'Individual stalls', desc: 'Individual stables with fresh water, clean, dry bedding, and private bathrooms, with maximum 4 hours of access to the stalls.' },
    { title: 'Fixed feeding routine', desc: 'Horses are fed three times a day, plus free access to a hay feeder. They are not fed during exercise.' },
    { title: 'Daily exercise', desc: 'Every horse is exercised every day, including days when no riding is scheduled. Horses are rested only as advised.' },
    { title: 'Exercise on non-riding days', desc: 'Horses are turned out for at least 6 hours a day in cold months and 4 hours in hotter months. Horses go out in quiet, consistent groups.' },
    { title: 'Health team', desc: 'Vaccination, deworming, and hoof care are managed by a team that includes a veterinarian and a farrier.' },
    { title: 'Saddlery team', desc: 'Every horse\'s saddle, bridle and bit are checked and adjusted to ensure the horse\'s comfort throughout the day.' },
    { title: 'Medical room', desc: 'A dedicated room on site for treatments and recovery.' },
  ];

  const safetyRules = [
    { title: 'Rider weight limit', desc: 'Under 75 kg, for the wellbeing of both horse and rider.' },
    { title: 'Helmets, always', desc: 'No rider goes into an arena without one.' },
    { title: 'Supervised handling', desc: 'Riders are never alone with a horse until they are ready to be.' },
    { title: 'Schooled horses only', desc: 'Beginners ride horses proven calm and consistent. No exceptions.' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">

      {/* ============================================================
         DARK HEADER — Cinematic
         ============================================================ */}
      <div className="nav-dark-hero relative overflow-hidden bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        {/* Ambient gold glow behind the header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#C9A227]/10 blur-[140px]"
        />
        {/* Faint dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(201,162,39,1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <Eyebrow delay={0.1} className="text-[#C9A227] type-eyebrow mb-4">
            Our Horses
          </Eyebrow>
          <h1 className="type-page-title-long mb-6 text-white">
            <RevealLine delay={0.25}>The horse is chosen for the rider,</RevealLine>
            <RevealLine delay={0.4}>not the other way around.</RevealLine>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="type-lead text-white/70"
          >
            Every horse is matched by the rider's experience, ability, confidence and goals.
          </motion.p>

          {/* Animated gold hairline under the header */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 block h-px w-32 origin-left bg-[#C9A227]/70"
          />
        </div>
      </div>

      {/* ============================================================
         HOW MATCHING WORKS — Editorial numbered list with hairline draw
         ============================================================ */}
      <div className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div>
            <Eyebrow delay={0.15} className="text-[#C9A227] type-eyebrow mb-4">
              How Matching Works
            </Eyebrow>
            <h2 className="type-section-title text-[#1A1A1A] mb-16">
              <RevealLine delay={0.3}>Safety is a matching problem</RevealLine>
              <RevealLine delay={0.45}>before it is a training problem.</RevealLine>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {matchItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + idx * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex gap-6 pb-8"
              >
                {/* Gold underline hairline under each row (draws on view, brightens on hover) */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.5 + idx * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-[#5A5A66]/20"
                />
                <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

                {/* Big number with letter-reveal-like entrance */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, rotate: -20, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    delay: 0.5 + idx * 0.15,
                    duration: 0.9,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="flex-shrink-0 font-serif text-5xl leading-none text-[#C9A227] transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-110"
                >
                  {item.num}
                </motion.span>

                <div className="min-w-0">
                  <h4 className="relative mb-3 w-max font-serif text-xl text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#876B18]">
                    {item.title}
                    <span className="pointer-events-none absolute -bottom-1 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#C9A227]/70 transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  </h4>
                  <p className="font-normal leading-relaxed text-[#5A5A66]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
         A DAY IN THE STABLES — Cinematic focus-pull + glow
         ============================================================ */}
      <div className="relative overflow-hidden bg-[#0C0922] py-24">
        {/* Ambient warm glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#C9A227]/8 blur-[140px]"
        />

        <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <Eyebrow delay={0.15} className="text-[#C9A227] type-eyebrow mb-4">
              A Day in the Stables
            </Eyebrow>
            <h2 className="type-section-title text-white mb-8">
              <RevealLine delay={0.3}>Handled every day,</RevealLine>
              <RevealLine delay={0.45}>by the same hands.</RevealLine>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 font-normal leading-relaxed mb-6"
            >
              Every horse is groomed, checked and exercised as part of a fixed daily routine, not only on the days it is ridden.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 font-normal leading-relaxed mb-6"
            >
              Calm handling on the ground is what produces calm horses under saddle. Horses that are used to being groomed, leading and picked up are the ones that are not surprised under a rider.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 font-normal leading-relaxed"
            >
              Feed, exercise and rest are managed by staff who work with the same horses every day, and who know the signs that a horse is not quite right.
            </motion.p>

            {/* Animated gold hairline */}
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 block h-px w-24 origin-left bg-[#C9A227]/70"
            />
          </div>

          {/* Image: focus-pull + clip-path wipe + gold rim */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="group relative w-full overflow-hidden rounded-3xl bg-[#0C0922] lg:w-1/2"
          >
            {/* Clip-path wipe in */}
            <motion.div
              initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <motion.img
                src="/day in stable.png"
                alt="Handler with horse"
                loading="lazy"
                decoding="async"
                initial={{
                  scale: 1.15,
                  filter: 'blur(20px) brightness(0.6)',
                }}
                whileInView={{
                  scale: 1,
                  filter: 'blur(0px) brightness(1)',
                }}
                viewport={{ once: true, amount: 0 }}
                transition={{
                  duration: 2.2,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Layout keeper */}
            <img
              src="/day in stable.png"
              alt=""
              aria-hidden="true"
              className="invisible block w-full object-cover"
            />

            {/* Gold rim on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-700 group-hover:border-[#C9A227]/40" />

            {/* Warm backlit glow on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(201,162,39,0.18),_transparent_60%)]"
            />
          </motion.div>
        </div>
      </div>

      {/* ============================================================
         MEET THE HORSES — Editorial Stack (kept as-is)
         ============================================================ */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div>
            <Eyebrow delay={0.15} className="text-[#C9A227] type-eyebrow mb-4">
              The Horses
            </Eyebrow>
            <h2 className="type-page-title text-[#1A1A1A] mb-16">
              <RevealLine delay={0.3}>Meet the horses.</RevealLine>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
            {horses.map((horse, idx) => (
              <HorseCard key={horse.name} horse={horse} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
         CARE AND WELFARE — Bloom + cascade from right
         ============================================================ */}
      <div className="bg-white py-24">
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-0">
          {/* LEFT: Image bloom */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group w-full lg:w-[45%] relative bg-white"
          >
            <div className="h-full pr-4 py-12">
              <div className="relative h-full overflow-hidden rounded-r-[3rem] shadow-2xl">
                <motion.img
                  initial={{ scale: 1.15, filter: 'blur(6px)' }}
                  whileInView={{ scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  src="/care and welfare.png"
                  alt="Stables interior"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />

                {/* Warm backlit glow on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(201,162,74,0.12),_transparent_65%)]"
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Text */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center py-12 pl-6 lg:pl-16 pr-6 lg:pr-24">
            <Eyebrow delay={0.15} className="text-[#C9A227] type-eyebrow mb-4">
              Care and Welfare
            </Eyebrow>
            <h2 className="type-section-title text-[#1A1A1A] mb-10">
              <RevealLine delay={0.3}>Looked after</RevealLine>
              <RevealLine delay={0.45}>before they are ridden.</RevealLine>
            </h2>

            <div className="space-y-4">
              {careItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.6 + idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative border-b border-[#5A5A66]/20 pb-4"
                >
                  <span className="pointer-events-none absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  <h5 className="text-sm font-bold text-[#1A1A1A] mb-1 transition-colors duration-500 group-hover:text-[#876B18]">
                    {item.title}
                  </h5>
                  <p className="text-sm font-normal leading-relaxed text-[#5A5A66]">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
         SAFETY — Dark editorial with gold hairlines
         ============================================================ */}
      <div className="relative overflow-hidden bg-[#0C0922] py-24 border-t border-white/10">
        {/* Ambient glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-[#C9A227]/8 blur-[140px]"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div>
            <Eyebrow delay={0.15} className="text-[#C9A227] type-eyebrow mb-4">
              Safety
            </Eyebrow>
            <h2 className="type-page-title text-white mb-16">
              <RevealLine delay={0.3}>The rules we don't move on.</RevealLine>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {safetyRules.map((rule, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative pt-6"
              >
                {/* Gold hairline that draws on view, brightens on hover */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.5 + idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pointer-events-none absolute top-0 left-0 h-px w-full origin-left bg-[#C9A227]/30"
                />
                <span className="pointer-events-none absolute top-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

                {/* Number / counter (optional editorial kicker) */}
                <span className="mb-3 block font-mono text-[0.6rem] uppercase tracking-[0.24em] text-[#C9A227]/60 transition-colors duration-500 group-hover:text-[#C9A227]">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <h4 className="mb-3 text-xl font-bold text-white transition-colors duration-500 group-hover:text-[#C9A227]">
                  {rule.title}
                </h4>
                <p className="text-base font-normal leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-white/85">
                  {rule.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Horses;