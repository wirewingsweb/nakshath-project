// src/pages/Courses.jsx
import { useEnquiry } from '../context/EnquiryContext';
import SectionDots from '../components/SectionDots';
import ShinyText from '../components/ShinyText';
import {
  Reveal,
  FadeUp,
  ImageReveal,
  Stagger,
  StaggerItem,
  SplitText,
  InteractiveCard,
} from '../components/motion';

const CHAPTERS = [
  { id: 'chapter-courses-intro', label: 'Programs' },
  { id: 'chapter-pathways',      label: 'Pathways' },
  { id: 'chapter-structure',     label: 'Structure' },
  { id: 'chapter-trial',         label: 'Trial' },
  { id: 'chapter-disciplines',   label: 'Disciplines' },
  { id: 'chapter-beyond-riding', label: 'Beyond' },
];

const Courses = () => {
  const { openEnquiry } = useEnquiry();

  const levels = [
    { level: 'Level 1', sessions: '10 lessons', price: '₹11,999', label: 'Getting started' },
    { level: 'Level 2', sessions: '20 lessons', price: '₹29,999', label: 'Building the seat' },
    { level: 'Level 3', sessions: '20 lessons', price: '₹32,999', label: 'Trot to canter' },
  ];

  const disciplines = [
    { title: 'Show Jumping', status: 'Taught Here', desc: 'Riders guide horses over obstacle courses with speed and accuracy.', img: '/show jumping.webp' },
    { title: 'Dressage', status: 'Taught Here', desc: 'Harmony, control, and precise movements ridden to a set pattern.', img: '/dressage.webp' },
    { title: 'Eventing', status: 'Coming Soon', desc: 'Combines dressage, cross-country and show jumping.', img: '/eventing.webp' },
  ];

  const groupServices = [
    { title: 'Guest Rides', desc: 'A one-off horse experience, no enrolment.', img: '/beyond ride 1.webp' },
    { title: 'Summer Camps', desc: 'Holiday programmes for children.', img: '/beyond ride 2.webp' },
    { title: 'School Visits', desc: 'Group sessions for schools.', img: '/beyond ride 3.webp' },
    { title: 'Corporate Days', desc: 'Team days on the property.', img: '/beyond ride 4.webp' },
    { title: 'Photoshoots', desc: 'The arenas and grounds, by arrangement.', img: '/beyond ride 5.webp' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <SectionDots chapters={CHAPTERS} />

      {/* CHAPTER: Courses Intro */}
      <div id="chapter-courses-intro" className="nav-dark-hero bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal as="div" y={8} duration={0.5}>
            <h4 className="type-eyebrow mb-4">
              <ShinyText
                text="Programs"
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h4>
          </Reveal>

          <Reveal as="div" y={30} duration={0.7} delay={0.15} amount={0.3}>
            <h1 className="type-page-title text-white leading-tight mb-4">
              Four ways in,<br />
              <ShinyText
                text="one path forward."
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h1>
          </Reveal>

          <FadeUp as="p" size="text" delay={0.35} className="type-lead text-white/70">
            Whether you have never sat on a horse, or are preparing for a competition, the route through is the same one.
          </FadeUp>
        </div>
      </div>

      {/* CHAPTER: Pathways */}
      <div id="chapter-pathways" className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-20">

            {/* Kids Special */}
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="w-full lg:w-1/2">
                <ImageReveal amount={0.2} className="w-full">
                  <img src="/kids special.webp" alt="Kids Program" loading="lazy" decoding="async" className="w-full rounded-3xl shadow-lg object-cover aspect-[4/3]" />
                </ImageReveal>
              </div>
              <Stagger gap={0.1} amount={0.2} className="w-full lg:w-1/2">
                <StaggerItem>
                  <h4 className="text-[#C9A227] type-eyebrow mb-2">From Five Years Old</h4>
                </StaggerItem>
                <StaggerItem>
                  <h3 className="type-card-title text-[#1A1A1A] mb-4">Kids Special Riding Program</h3>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-[#5A5A66] font-normal mb-4">Children start on ponies, on the ground, learning to approach, handle, and tack up before they learn to sit on one.</p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-[#5A5A66] font-normal">Pony riding, confidence building, physical coordination, and horsemanship.</p>
                </StaggerItem>
              </Stagger>
            </div>

            {/* Beginner Program */}
            <div className="flex flex-col lg:flex-row-reverse gap-10 items-center">
              <div className="w-full lg:w-1/2">
                <ImageReveal amount={0.2} className="w-full">
                  <img src="/beginner program.webp" alt="Beginner Program" loading="lazy" decoding="async" className="w-full rounded-3xl shadow-lg object-cover aspect-[4/3]" />
                </ImageReveal>
              </div>
              <Stagger gap={0.1} amount={0.2} className="w-full lg:w-1/2">
                <StaggerItem>
                  <h4 className="text-[#C9A227] type-eyebrow mb-2">No Experience Needed</h4>
                </StaggerItem>
                <StaggerItem>
                  <h3 className="type-card-title text-[#1A1A1A] mb-4">Beginner Program</h3>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-[#5A5A66] font-normal">For first-time riders of any age. You will learn how a horse thinks and moves before you learn to sit on one. The skills you build here apply at every level.</p>
                </StaggerItem>
              </Stagger>
            </div>

            {/* Intermediate Training */}
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="w-full lg:w-1/2">
                <ImageReveal amount={0.2} className="w-full">
                  <img src="/intermediate program.webp" alt="Intermediate Training" loading="lazy" decoding="async" className="w-full rounded-3xl shadow-lg object-cover aspect-[4/3]" />
                </ImageReveal>
              </div>
              <Stagger gap={0.1} amount={0.2} className="w-full lg:w-1/2">
                <StaggerItem>
                  <h4 className="text-[#C9A227] type-eyebrow mb-2">For Riders Building Independence</h4>
                </StaggerItem>
                <StaggerItem>
                  <h3 className="type-card-title text-[#1A1A1A] mb-4">Intermediate Training</h3>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-[#5A5A66] font-normal">Once you are steady on a flat, the work becomes about communication — asking nicely and getting a considered answer. The pace slows, the detail gets finer, and the riding changes.</p>
                </StaggerItem>
              </Stagger>
            </div>

            {/* Professional Competition Training */}
            <Reveal as="div" y={20} duration={0.8} amount={0.15}>
              <div className="bg-[#0C0922] rounded-3xl overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center gap-8 p-8 md:p-12 lg:p-16">
                  <Stagger gap={0.1} amount={0.2} className="w-full lg:w-[55%] z-10">
                    <StaggerItem>
                      <h4 className="text-[#C9A227] type-eyebrow mb-4">For Competing Riders</h4>
                    </StaggerItem>
                    <StaggerItem>
                      <h3 className="type-section-title text-white mb-6 leading-tight">Professional<br />Competition Training</h3>
                    </StaggerItem>
                    <StaggerItem>
                      <p className="text-white/80 font-normal leading-relaxed mb-6 max-w-md">Show jumping and dressage preparation for riders entering competition, coached by a rider currently long-listed for Team India. Course technique, round planning, and performance assessed against the standards you will be judged on.</p>
                    </StaggerItem>
                    <StaggerItem>
                      <p className="text-white/80 font-normal leading-relaxed">Show jumping preparation · Technique · Performance assessment · Advanced training sessions</p>
                    </StaggerItem>
                  </Stagger>

                  <div className="w-full lg:w-[45%] flex justify-center">
                    <div className="w-full max-w-md">
                      <ImageReveal amount={0.2} className="w-full">
                        <img src="/pro training.webp" alt="Professional Competition Training" loading="lazy" decoding="async" className="w-full h-auto object-cover rounded-3xl shadow-2xl" />
                      </ImageReveal>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>

      {/* CHAPTER: Structure */}
      <div id="chapter-structure" className="bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp size="text" className="mb-4">
            <h4 className="type-eyebrow text-[#C9A227]">Structure</h4>
          </FadeUp>

          <SplitText
            as="h2"
            className="type-section-title text-[#1A1A1A] mb-6"
            wordDelay={0.04}
            startDelay={0.1}
            amount={0.3}
          >
            Fifty lessons to a canter.
          </SplitText>

          <FadeUp as="p" size="text" delay={0.25} className="type-lead mb-16 text-[#5A5A66]">
            Riders progress in blocks. Level 1 is ten lessons — enough to know whether riding is for you. Levels 2 and 3 are twenty each. Most riders reach a confident, independent canter by the end of the third.
          </FadeUp>

          <Reveal as="div" y={20} duration={0.7} amount={0.15}>
            <div className="w-full">
              <div className="space-y-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-b border-[#5A5A66]/20 text-xs font-medium uppercase tracking-widest font-bold text-[#C9A227]">
                  <div>Level</div>
                  <div>Sessions</div>
                  <div>Price</div>
                  <div>What It Covers</div>
                </div>
                {levels.map((level, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-[#5A5A66]/20 transition-colors duration-300 hover:bg-[#C9A227]/[0.04]"
                  >
                    <div className="font-serif text-lg text-[#C9A227]">{level.level}</div>
                    <div className="text-[#5A5A66] font-normal">{level.sessions}</div>
                    <div className="font-serif text-xl text-[#1A1A1A]">{level.price}</div>
                    <div className="text-[#5A5A66] font-normal">{level.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* CHAPTER: Trial */}
      <div id="chapter-trial" className="relative w-full bg-[#0C0922] py-32 overflow-hidden">
        <img src="/start 10 min.webp" alt="Horse Face" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-right z-0" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0C0922] via-[#0C0922]/85 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="w-full md:w-[55%]">
              <SplitText
                as="h2"
                className="type-page-title text-white mb-12"
                wordDelay={0.04}
                startDelay={0.1}
                amount={0.3}
              >
                Start with ten minutes.
              </SplitText>

              <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                <FadeUp size="text" delay={0.2} className="flex-1">
                  <h4 className="mb-3 text-sm font-bold text-[#C9A227]">Free</h4>
                  <p className="mb-3 text-xl font-bold text-white">10 minutes · No charge</p>
                  <p className="type-body text-white/70">Meet the horses, sit on one, see the arena.</p>
                  <div className="mt-8">
                    <button
                      onClick={() => openEnquiry('Trial Ride')}
                      className="inline-block border-b-2 border-[#C9A227] pb-1 text-sm font-bold text-[#C9A227] transition-colors hover:border-white hover:text-white"
                    >
                      Book a trial ride
                    </button>
                  </div>
                </FadeUp>

                <FadeUp size="text" delay={0.35} className="flex-1">
                  <h4 className="mb-3 text-sm font-bold text-[#C9A227]">Paid</h4>
                  <p className="mb-3 text-xl font-bold text-white">45 minutes · ₹1,999</p>
                  <p className="type-body text-white/70">A full first lesson, with groundwork and time in the saddle.</p>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHAPTER: Disciplines */}
      <div id="chapter-disciplines" className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp size="text" className="mb-4">
            <h4 className="type-eyebrow text-[#876B18]">Disciplines</h4>
          </FadeUp>

          <SplitText
            as="h2"
            className="type-section-title text-[#1A1A1A] mb-16"
            wordDelay={0.04}
            startDelay={0.1}
            amount={0.3}
          >
            What the sport is made of.
          </SplitText>

          <Stagger gap={0.15} amount={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {disciplines.map((disc, idx) => (
              <StaggerItem key={idx}>
                <InteractiveCard as="div" className="flex flex-col group">
                  <p className="text-[#876B18] type-eyebrow mb-2">{disc.status}</p>
                  <h3 className="text-xl md:text-2xl font-serif text-[#1A1A1A] mb-6">{disc.title}</h3>
                  <div className="overflow-hidden rounded-xl mb-6">
                    <img
                      src={disc.img}
                      alt={disc.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/3] object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[#5A5A66] font-normal leading-relaxed">{disc.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* CHAPTER: Beyond Riding */}
      <div id="chapter-beyond-riding" className="bg-[#0C0922] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp size="text" className="mb-4">
            <h4 className="type-eyebrow">
              <ShinyText
                text="Beyond Riding"
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h4>
          </FadeUp>

          <SplitText
            as="h2"
            className="type-section-title text-white mb-12"
            wordDelay={0.04}
            startDelay={0.1}
            amount={0.3}
          >
            Not everyone comes to learn.
          </SplitText>

          <Stagger gap={0.08} amount={0.1} className="grid grid-cols-1 gap-6 md:flex md:snap-x md:snap-mandatory md:overflow-x-auto md:overscroll-x-contain md:pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
            {groupServices.map((item, idx) => (
              <StaggerItem key={idx}>
                <button
                  onClick={() => openEnquiry('Group Booking')}
                  className="group flex flex-col text-left md:basis-[46%] md:shrink-0 md:snap-start lg:basis-auto"
                >
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[2/3] object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wider group-hover:text-[#C9A227] transition-colors">{item.title}</h4>
                  <p className="text-white/60 text-sm font-normal leading-relaxed">{item.desc}</p>
                </button>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp size="text" delay={0.2} className="mt-12">
            <button
              onClick={() => openEnquiry('Group Booking')}
              className="text-white font-medium text-lg border-b border-[#C9A227] pb-1 hover:text-[#C9A227] transition-colors"
            >
              Enquire about group bookings
            </button>
          </FadeUp>
        </div>
      </div>

    </div>
  );
};

export default Courses;