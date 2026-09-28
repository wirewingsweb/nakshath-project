// src/pages/Horses.jsx
import SectionDots from '../components/SectionDots';
import ShinyText from '../components/ShinyText';
import {
  Reveal,
  FadeUp,
  ImageReveal,
  Stagger,
  StaggerItem,
  SplitText,
  DriftImage,
  InteractiveCard,
} from '../components/motion';

const CHAPTERS = [
  { id: 'chapter-horses-intro', label: 'Horses' },
  { id: 'chapter-matching',     label: 'Matching' },
  { id: 'chapter-day',          label: 'Stables' },
  { id: 'chapter-meet',         label: 'Meet' },
  { id: 'chapter-care',         label: 'Care' },
  { id: 'chapter-safety',       label: 'Safety' },
];

const Horses = () => {
  const horses = [
    { name: 'Vibrato', breed: 'Warmblood', age: '17 Yrs.', gender: 'Gelding', colour: 'Chestnut', temperament: 'Steady and unflurried. The horse most first-time riders start on.', level: 'Advanced', discipline: 'General Riding', img: '/Vibrato.webp' },
    { name: 'Simbha', breed: 'Thoroughbred', age: '9 Yrs.', gender: 'Gelding', colour: 'Dark Bay', temperament: 'Responsive and forward-going. Suits riders building confidence at trot and canter.', level: 'Intermediate', discipline: 'Show Jumping', img: '/Simbha.webp' },
    { name: 'Phebe', breed: 'Thoroughbred', age: '8 Yrs.', gender: 'Mare', colour: 'Bay', temperament: 'Patient and consistent. Trained for flatwork and figures.', level: 'Intermediate', discipline: 'Dressage', img: '/Phebe.webp' },
    { name: 'Rani', breed: 'Thoroughbred', age: '11 Yrs.', gender: 'Gelding', colour: 'Chestnut', temperament: 'Bold over fences and honest to the jump. Ridden by competing riders.', level: 'Advanced', discipline: 'Show Jumping', img: '/Rani.webp' },
  ];

  const matchItems = [
    { num: '01', title: 'Temperament first, ability second', desc: 'A horse can be well schooled and still be wrong for a nervous beginner. Every horse is assessed for calmness and consistency before it is assessed for what it can do.' },
    { num: '02', title: 'Matched to the rider, not to availability', desc: 'Horses are allocated on the rider’s experience, confidence and goals. Nobody is put on whatever happens to be free that morning.' },
    { num: '03', title: 'Ponies for the youngest riders', desc: 'Children from five years begin on ponies sized and schooled for them, not on a grown-up-sized horse.' },
    { num: '04', title: 'The same pairing, session after session', desc: 'Progress compounds when horse and rider know each other. Pairings are kept consistent rather than switching week to week.' },
  ];

  const careItems = [
    { title: 'Individual stalls', desc: 'Individual stables with fresh water, clean, dry bedding, and private bathrooms, with maximum 4 hours of access to the stalls.' },
    { title: 'Fixed feeding routine', desc: 'Horses are fed three times a day, plus free access to a hay feeder. They are not fed during exercise.' },
    { title: 'Daily exercise', desc: 'Every horse is exercised every day, including days when no riding is scheduled. Horses are rested only as advised.' },
    { title: 'Exercise on non-riding days', desc: 'Horses are turned out for at least 6 hours a day in cold months and 4 hours in hotter months. Horses go out in quiet, consistent groups.' },
    { title: 'Health team', desc: 'Vaccination, deworming, and hoof care are managed by a team that includes a veterinarian and a farrier.' },
    { title: 'Saddlery team', desc: 'Every horse’s saddle, bridle and bit are checked and adjusted to ensure the horse’s comfort throughout the day.' },
    { title: 'Medical room', desc: 'A dedicated room on site for treatments and recovery.' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <SectionDots chapters={CHAPTERS} />

      {/* CHAPTER: Horses Intro */}
      <div id="chapter-horses-intro" className="nav-dark-hero bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal as="div" y={8} duration={0.5}>
            <h4 className="type-eyebrow mb-4">
              <ShinyText
                text="Our Horses"
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h4>
          </Reveal>

          <Reveal as="div" y={30} duration={0.7} delay={0.15} amount={0.3}>
            <h1 className="type-page-title-long mb-6 text-white">
              The horse is chosen for the rider,{' '}
              <ShinyText
                text="not the other way around."
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h1>
          </Reveal>

          <FadeUp
            as="p"
            size="text"
            delay={0.35}
            className="type-lead text-white/70"
          >
            Every horse is matched by the rider's experience, ability, confidence and goals.
          </FadeUp>
        </div>
      </div>

      {/* CHAPTER: How Matching Works */}
      <div id="chapter-matching" className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp size="text" className="mb-4">
            <h4 className="type-eyebrow text-[#C9A227]">How Matching Works</h4>
          </FadeUp>

          <SplitText
            as="h2"
            className="type-section-title text-[#1A1A1A] mb-16"
            wordDelay={0.04}
            startDelay={0.1}
            amount={0.3}
          >
            Safety is a matching problem before it is a training problem.
          </SplitText>

          <Stagger gap={0.12} amount={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {matchItems.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="group flex gap-6">
                  <span className="text-5xl font-serif text-[#C9A227] flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="text-xl font-serif text-[#1A1A1A] mb-3">{item.title}</h4>
                    <p className="text-[#5A5A66] font-normal leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* CHAPTER: A Day in the Stables */}
      <div id="chapter-day" className="bg-[#0C0922] py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <Stagger gap={0.12} amount={0.15} className="w-full lg:w-1/2">
            <StaggerItem>
              <h4 className="type-eyebrow mb-4">
                <ShinyText
                  text="A Day in the Stables"
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </h4>
            </StaggerItem>

            <StaggerItem>
              <SplitText
                as="h2"
                className="type-section-title text-white mb-8"
                wordDelay={0.04}
                startDelay={0}
                amount={0.4}
              >
                Handled every day, by the same hands.
              </SplitText>
            </StaggerItem>

            <StaggerItem>
              <p className="text-white/70 font-normal leading-relaxed mb-6">Every horse is groomed, checked and exercised as part of a fixed daily routine, not only on the days it is ridden.</p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-white/70 font-normal leading-relaxed mb-6">Calm handling on the ground is what produces calm horses under saddle. Horses that are used to being groomed, leading and picked up are the ones that are not surprised under a rider.</p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-white/70 font-normal leading-relaxed">Feed, exercise and rest are managed by staff who work with the same horses every day, and who know the signs that a horse is not quite right.</p>
            </StaggerItem>
          </Stagger>

          <div className="w-full lg:w-1/2">
            <ImageReveal amount={0.15} className="w-full">
              <DriftImage
                src="/day in stable.webp"
                alt="Handler with horse"
                drift="subtle"
                duration={40}
                targetOpacity={1}
                className="w-full rounded-3xl shadow-2xl overflow-hidden"
                imgClassName="w-full object-cover"
              />
            </ImageReveal>
          </div>
        </div>
      </div>

      {/* CHAPTER: Meet the Horses */}
      <div id="chapter-meet" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp size="text" className="mb-4">
            <h4 className="type-eyebrow text-[#C9A227]">The Horses</h4>
          </FadeUp>

          <SplitText
            as="h2"
            className="type-page-title text-[#1A1A1A] mb-16"
            wordDelay={0.04}
            startDelay={0.1}
            amount={0.3}
          >
            Meet the horses.
          </SplitText>

          <Stagger gap={0.15} amount={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {horses.map((horse, idx) => (
              <StaggerItem key={idx}>
                <InteractiveCard as="div" className="flex flex-col group">
                  <div className="w-full overflow-hidden rounded-xl">
                    <img
                      src={horse.img}
                      alt={horse.name}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl md:text-2xl font-serif text-[#1A1A1A] mb-1">{horse.name}</h3>
                    <p className="text-sm text-[#5A5A66] font-normal leading-relaxed mb-4">
                      {horse.breed} · {horse.age} · {horse.gender} · {horse.colour}
                    </p>
                    <p className="text-[#5A5A66] font-normal leading-relaxed mb-4">
                      {horse.temperament}
                    </p>
                    <div className="text-[#C9A227] text-xs font-semibold uppercase tracking-wider flex gap-3">
                      <span>{horse.level}</span>
                      <span>{horse.discipline}</span>
                    </div>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* CHAPTER: Care and Welfare */}
      <div id="chapter-care" className="bg-white py-24">
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-0">
          <div className="w-full lg:w-[45%] relative bg-white">
            <div className="h-full pr-4 py-12">
              <ImageReveal amount={0.15} className="w-full h-full">
                <DriftImage
                  src="/care and welfare.webp"
                  alt="Stables interior"
                  drift="subtle"
                  duration={40}
                  targetOpacity={1}
                  className="w-full h-full rounded-r-[3rem] shadow-2xl overflow-hidden"
                  imgClassName="w-full h-full object-cover"
                />
              </ImageReveal>
            </div>
          </div>

          <Stagger gap={0.08} amount={0.1} className="w-full lg:w-[55%] flex flex-col justify-center py-12 pl-6 lg:pl-16 pr-6 lg:pr-24">
            <StaggerItem>
              <h4 className="type-eyebrow mb-4">
                <ShinyText
                  text="Care and Welfare"
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </h4>
            </StaggerItem>

            <StaggerItem>
              <h2 className="type-section-title text-[#1A1A1A] mb-10">Looked after<br />before they are ridden.</h2>
            </StaggerItem>

            {careItems.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="border-b border-[#5A5A66]/20 pb-4 transition-colors duration-300 hover:border-[#C9A227]/40">
                  <h5 className="text-[#1A1A1A] font-bold text-sm mb-1">{item.title}</h5>
                  <p className="text-[#5A5A66] text-sm font-normal leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* CHAPTER: Safety */}
      <div id="chapter-safety" className="bg-[#0C0922] py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp size="text" className="mb-4">
            <h4 className="type-eyebrow mb-4">
              <ShinyText
                text="Safety"
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h4>
          </FadeUp>

          <SplitText
            as="h2"
            className="type-page-title text-white mb-16"
            wordDelay={0.04}
            startDelay={0.1}
            amount={0.3}
          >
            The rules we don't move on.
          </SplitText>

          <Stagger gap={0.12} amount={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <StaggerItem>
              <h4 className="text-white font-bold text-xl mb-3">Rider weight limit</h4>
              <p className="text-white/60 text-base font-normal leading-relaxed">Under 75 kg, for the wellbeing of both horse and rider.</p>
            </StaggerItem>
            <StaggerItem>
              <h4 className="text-white font-bold text-xl mb-3">Helmets, always</h4>
              <p className="text-white/60 text-base font-normal leading-relaxed">No rider goes into an arena without one.</p>
            </StaggerItem>
            <StaggerItem>
              <h4 className="text-white font-bold text-xl mb-3">Supervised handling</h4>
              <p className="text-white/60 text-base font-normal leading-relaxed">Riders are never alone with a horse until they are ready to be.</p>
            </StaggerItem>
            <StaggerItem>
              <h4 className="text-white font-bold text-xl mb-3">Schooled horses only</h4>
              <p className="text-white/60 text-base font-normal leading-relaxed">Beginners ride horses proven calm and consistent. No exceptions.</p>
            </StaggerItem>
          </Stagger>
        </div>
      </div>

    </div>
  );
};

export default Horses;