// src/pages/Facilities.jsx
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
  { id: 'chapter-facility-intro', label: 'Property' },
  { id: 'chapter-arenas',         label: 'Arenas' },
  { id: 'chapter-stables',        label: 'Stables' },
  { id: 'chapter-beyond',         label: 'Beyond' },
];

const Facilities = () => {
  const arenas = [
    { title: 'Indoor Arena', label: 'All-Weather', desc: 'A covered arena built so training does not stop for monsoon or for summer heat. International-standard geotextile footing, consistent underfoot, and lower injury risk for horse and rider.', img: '/indoor arena.png' },
    { title: 'Outdoor Arena', label: 'Sand Surface', desc: 'An open sand arena for jumping and flatwork in good weather, with the space to ride a full course and the light to shoot in early morning or late evening.', img: '/outdoor arena.png' },
    { title: 'Dressage Arena', label: 'Standard Dimensions', desc: 'Built to competition dimensions, so riders practice on the same geometry they will be marked on. The riding area is larger than most people expect.', img: '/dressage arena.png' },
    { title: 'Lunging Pen', label: 'Groundwork', desc: 'A circular pen for working horses on the lunge — warming up, schooling young horses, and teaching riders to read a horse\'s movement from the ground.', img: '/lunging pen.png' },
  ];

  const stables = [
    { title: 'Stables', desc: 'Individual stalls with feeding and grooming areas.' },
    { title: 'Saddle Room', desc: 'Tack stored, cleaned and checked in one place.' },
    { title: 'Medical Room', desc: 'A dedicated space for treatment and recovery.' },
    { title: 'Tack Shop', desc: 'Riding gear and equipment on site.' },
  ];

  const beyond = [
    { title: 'Café', desc: 'Warm stone, arches, open through the day.', img: '/cafe.png' },
    { title: 'Common Pavilion', desc: 'Shade and seating for spectators and families.', img: '/common pavillion.png' },
    { title: 'Lounge Space', desc: 'Open landscaped areas across the campus.', img: '/lounge.png' },
    { title: 'Cottages', desc: 'For visiting riders, trainers and guests.', img: '/cottages.png' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <SectionDots chapters={CHAPTERS} />

      {/* CHAPTER: Property Intro */}
      <div id="chapter-facility-intro" className="nav-dark-hero bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal as="div" y={8} duration={0.5}>
            <h4 className="type-eyebrow mb-4">
              <ShinyText
                text="The Property"
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h4>
          </Reveal>

          <Reveal as="div" y={30} duration={0.7} delay={0.15} amount={0.3}>
            <h1 className="type-page-title text-white leading-tight mb-4">
              Built to be trained on,<br />
              <ShinyText
                text="not looked at."
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
            Indoor arena, lunging pen, stables and a café, on one campus in Sarjapura.
          </FadeUp>
        </div>
      </div>

      {/* CHAPTER: Arenas */}
      <div id="chapter-arenas" className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="space-y-20">

          {/* Indoor Arena — image left, text right */}
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-1/2">
                  <ImageReveal amount={0.2} className="w-full">
                    <img
                      src={arenas[0].img}
                      alt={arenas[0].title}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]"
                    />
                  </ImageReveal>
                </div>
                <Stagger gap={0.1} amount={0.2} className="w-full lg:w-1/2">
                  <StaggerItem>
                    <h4 className="text-[#876B18] type-eyebrow mb-2">{arenas[0].label}</h4>
                  </StaggerItem>
                  <StaggerItem>
                    <h3 className="type-card-title text-[#1A1A1A] mb-4">{arenas[0].title}</h3>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="text-[#5A5A66] font-normal leading-relaxed">{arenas[0].desc}</p>
                  </StaggerItem>
                </Stagger>
              </div>
            </div>
          </div>

          {/* Outdoor Arena — image right, text left */}
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row-reverse gap-10 items-center">
                <div className="w-full lg:w-1/2">
                  <ImageReveal amount={0.2} className="w-full">
                    <img
                      src={arenas[1].img}
                      alt={arenas[1].title}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]"
                    />
                  </ImageReveal>
                </div>
                <Stagger gap={0.1} amount={0.2} className="w-full lg:w-1/2">
                  <StaggerItem>
                    <h4 className="text-[#876B18] type-eyebrow mb-2">{arenas[1].label}</h4>
                  </StaggerItem>
                  <StaggerItem>
                    <h3 className="type-card-title text-[#1A1A1A] mb-4">{arenas[1].title}</h3>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="text-[#5A5A66] font-normal leading-relaxed">{arenas[1].desc}</p>
                  </StaggerItem>
                </Stagger>
              </div>
            </div>
          </div>

          {/* Dressage Arena — image left, text right */}
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-1/2">
                  <ImageReveal amount={0.2} className="w-full">
                    <img
                      src={arenas[2].img}
                      alt={arenas[2].title}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]"
                    />
                  </ImageReveal>
                </div>
                <Stagger gap={0.1} amount={0.2} className="w-full lg:w-1/2">
                  <StaggerItem>
                    <h4 className="text-[#876B18] type-eyebrow mb-2">{arenas[2].label}</h4>
                  </StaggerItem>
                  <StaggerItem>
                    <h3 className="type-card-title text-[#1A1A1A] mb-4">{arenas[2].title}</h3>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="text-[#5A5A66] font-normal leading-relaxed">{arenas[2].desc}</p>
                  </StaggerItem>
                </Stagger>
              </div>
            </div>
          </div>

          {/* Lunging Pen — full width with background */}
          <div className="w-screen">
            <div className="w-screen mx-auto">
              <div className="flex flex-col lg:flex-row-reverse gap-10 items-center bg-[#F2F0EB] p-8 md:p-12 lg:p-16">
                <div className="w-full lg:w-[60%]">
                  <ImageReveal amount={0.2} className="w-full">
                    <img
                      src={arenas[3].img}
                      alt={arenas[3].title}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-[2rem] shadow-xl object-cover aspect-[16/10]"
                    />
                  </ImageReveal>
                </div>
                <Stagger gap={0.1} amount={0.2} className="w-full lg:w-[40%]">
                  <StaggerItem>
                    <h4 className="text-[#876B18] type-eyebrow mb-2">{arenas[3].label}</h4>
                  </StaggerItem>
                  <StaggerItem>
                    <h3 className="type-section-title text-[#1A1A1A] mb-4">{arenas[3].title}</h3>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="text-[#5A5A66] font-normal leading-relaxed">{arenas[3].desc}</p>
                  </StaggerItem>
                </Stagger>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CHAPTER: Stables */}
      <div id="chapter-stables" className="w-full bg-[#0C0922] py-0 lg:pt-24 lg:pb-12">
        <div className="w-full flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-[45%] relative bg-[#0C0922]">
            <div className="pb-8 pr-4 lg:py-12">
              <ImageReveal amount={0.15} className="w-full h-full">
                <DriftImage
                  src="/horse live.png"
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

          <div className="flex w-full flex-col justify-center pt-12 pb-16 pr-6 pl-6 lg:w-[55%] lg:py-12 lg:pr-24 lg:pl-16">
            <FadeUp size="text" delay={0}>
              <h4 className="type-eyebrow mb-4">
                <ShinyText
                  text="Equestrian Core"
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </h4>
            </FadeUp>

            <SplitText
              as="h2"
              className="type-section-title text-white mb-10"
              wordDelay={0.04}
              startDelay={0.1}
              amount={0.3}
            >
              Where the horses live.
            </SplitText>

            <Stagger gap={0.1} amount={0.15} className="space-y-8">
              {stables.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="border-b border-white/10 pb-6 transition-colors duration-300 hover:border-[#C9A227]/40">
                    <h5 className="text-[#C9A227] font-bold text-sm uppercase tracking-wider mb-2">{item.title}</h5>
                    <p className="text-white/60 text-base font-normal leading-relaxed">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>

      {/* CHAPTER: Beyond */}
      <div id="chapter-beyond" className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp size="text" className="mb-4">
            <h4 className="type-eyebrow text-[#876B18]">Beyond the Arena</h4>
          </FadeUp>

          <SplitText
            as="h2"
            className="type-section-title text-[#1A1A1A] mb-12"
            wordDelay={0.04}
            startDelay={0.1}
            amount={0.3}
          >
            Somewhere to wait, and somewhere to stay.
          </SplitText>

          <Stagger gap={0.12} amount={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-14">
            {beyond.map((item, idx) => (
              <StaggerItem key={idx}>
                <InteractiveCard as="div" className="group">
                  <div className="rounded-2xl overflow-hidden mb-5">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-bold text-[#1A1A1A] text-xl uppercase tracking-wider">{item.title}</h4>
                  <p className="text-sm text-[#5A5A66] mt-2 leading-relaxed">{item.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

    </div>
  );
};

export default Facilities;