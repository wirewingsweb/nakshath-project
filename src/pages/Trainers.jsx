// src/pages/Trainers.jsx
import { Link } from 'react-router-dom';
import SectionDots from '../components/SectionDots';
import ShinyText from '../components/ShinyText';
import {
  Reveal,
  FadeUp,
  ImageReveal,
  Stagger,
  StaggerItem,
  SplitText,
} from '../components/motion';

const CHAPTERS = [
  { id: 'chapter-trainers-intro', label: 'Team' },
  { id: 'chapter-founder',        label: 'Founder' },
  { id: 'chapter-coordinator',    label: 'Coordinator' },
  { id: 'chapter-trainer',        label: 'Trainer' },
  { id: 'chapter-how-we-teach',   label: 'How We Teach' },
];

const Trainers = () => {
  const trainers = [
    {
      role: 'Founder - Competition Coaching',
      name: 'Nakshath Venkatesh',
      img: '/founder.webp',
      text: 'Nakshath competes internationally in show jumping under Federation Equestre Internationale rules, and is long-listed for Team India for the 2026 Asian Games. He coaches the competition track himself, training against the same standards he is judged on. Course technique, round planning, and the discipline of riding a plan rather than riding a feeling.'
    },
    {
      role: 'Coordinator',
      name: 'Bharath Venna',
      img: '/coordinator.webp',
      text: 'Bharath runs the day to day of the academy: who rides which horse, how a rider’s programme is paced, and when someone is ready to move up a level. He works on the principle that every rider has more in them than they think, and that consistent guidance is what gets it out.'
    },
    {
      role: 'Trainer',
      name: 'Vani',
      img: '/trainer.webp',
      text: 'Vani teaches riders from their first session on a lead rein through to independent work at canter. Her sessions start on the ground. Riders learn to approach, handle and tack up a horse before they learn to sit on one. She works often with children and with adults returning to riding after a long gap.'
    },
  ];

  const rules = [
    { title: 'Small batches', desc: 'Enough riders to learn from each other. Few enough to be corrected individually.' },
    { title: 'A coach on the ground', desc: 'Nobody rides unsupervised, at any level.' },
    { title: 'Groundwork first', desc: 'Grooming and tacking up are part of the lesson, not done for the rider.' },
    { title: 'A female trainer available', desc: 'For riders and families who would prefer one.' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <SectionDots chapters={CHAPTERS} />

      {/* CHAPTER: Trainers Intro */}
      <div id="chapter-trainers-intro" className="nav-dark-hero bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal as="div" y={8} duration={0.5}>
            <h4 className="type-eyebrow mb-4">
              <ShinyText
                text="Who Teaches"
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h4>
          </Reveal>

          <Reveal as="div" y={30} duration={0.7} delay={0.15} amount={0.3}>
            <h1 className="type-page-title text-white leading-tight mb-4">
              Someone is watching every rider,<br />
              <ShinyText
                text="every session."
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h1>
          </Reveal>

          <FadeUp as="p" size="text" delay={0.35} className="type-lead text-white/70">
            Batches are kept small so corrections happen during the lesson, not after it.
          </FadeUp>
        </div>
      </div>

      {/* CHAPTER: Founder */}
      <div id="chapter-founder" className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-start">

          <div className="w-full lg:w-1/2">
            <ImageReveal amount={0.15} className="w-full">
              <img
                src={trainers[0].img}
                alt={trainers[0].name}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-t-[3rem] rounded-b-2xl shadow-2xl"
              />
            </ImageReveal>
          </div>

          <Stagger gap={0.1} amount={0.15} className="w-full lg:w-1/2 pt-4">
            <StaggerItem>
              <h4 className="text-[#C9A227] type-eyebrow mb-2">Meet Our {trainers[0].role.split(' ')[0]}</h4>
            </StaggerItem>
            <StaggerItem>
              <SplitText
                as="h3"
                className="type-section-title text-[#1A1A1A] mb-6"
                wordDelay={0.05}
                startDelay={0}
                amount={0.4}
              >
                {trainers[0].name}
              </SplitText>
            </StaggerItem>
            <StaggerItem>
              <p className="text-[#C9A227] text-sm font-bold uppercase tracking-widest mb-8">{trainers[0].role}</p>
            </StaggerItem>
            <StaggerItem>
              <p className="type-body text-[#5A5A66] mb-6">Nakshath competes internationally in show jumping under Federation Equestre Internationale rules, and is long-listed for Team India for the 2026 Asian Games.</p>
            </StaggerItem>
            <StaggerItem>
              <p className="type-body text-[#5A5A66] mb-6">He coaches the competition track himself - riders working toward show jumping and dressage competition, training against the same standards he is judged on. Course technique, round planning, and the discipline of riding a plan rather than riding a feeling.</p>
            </StaggerItem>
            <StaggerItem>
              <p className="type-body text-[#5A5A66] mb-8">He set the training structure the rest of the academy runs on, and selected the horses on the yard.</p>
            </StaggerItem>
            <StaggerItem>
              <Link
                to="/about"
                className="inline-block border-b-2 border-[#C9A227] pb-1 text-sm font-medium text-[#C9A227] transition-colors hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
              >
                His full competitive record
              </Link>
            </StaggerItem>
          </Stagger>

        </div>
      </div>

      {/* CHAPTER: Coordinator */}
      <div id="chapter-coordinator" className="bg-[#FDFCFA] pb-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row-reverse gap-12 items-start">
          <div className="w-full lg:w-1/2">
            <ImageReveal amount={0.15} className="w-full">
              <img
                src={trainers[1].img}
                alt={trainers[1].name}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/5]"
              />
            </ImageReveal>
          </div>
          <Stagger gap={0.1} amount={0.15} className="w-full lg:w-1/2 pt-4">
            <StaggerItem>
              <h4 className="text-[#C9A227] type-eyebrow mb-2">Meet Our Coordinator</h4>
            </StaggerItem>
            <StaggerItem>
              <SplitText
                as="h3"
                className="type-section-title text-[#1A1A1A] mb-6"
                wordDelay={0.05}
                startDelay={0}
                amount={0.4}
              >
                {trainers[1].name}
              </SplitText>
            </StaggerItem>
            <StaggerItem>
              <p className="text-[#5A5A66] font-bold uppercase tracking-widest mb-8">{trainers[1].role}</p>
            </StaggerItem>
            <StaggerItem>
              <p className="type-body text-[#5A5A66] mb-6">Bharath runs the day to day of the academy: who rides which horse, how a rider’s programme is paced, and when someone is ready to move up a level.</p>
            </StaggerItem>
            <StaggerItem>
              <p className="type-body text-[#5A5A66] mb-6">He works on the principle that every rider has more in them than they think, and that consistent guidance is what gets it out. Much of his job is noticing what someone is capable of before they have noticed it themselves.</p>
            </StaggerItem>
            <StaggerItem>
              <p className="type-body text-[#5A5A66]">He is on the yard most days, and knows where every rider is in their progression.</p>
            </StaggerItem>
          </Stagger>
        </div>
      </div>

      {/* CHAPTER: Trainer */}
      <div id="chapter-trainer" className="bg-[#FDFCFA] pb-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2">
            <ImageReveal amount={0.15} className="w-full">
              <img
                src={trainers[2].img}
                alt={trainers[2].name}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/5]"
              />
            </ImageReveal>
          </div>
          <Stagger gap={0.1} amount={0.15} className="w-full lg:w-1/2 pt-4">
            <StaggerItem>
              <h4 className="text-[#C9A227] type-eyebrow mb-2">Meet Our Trainer</h4>
            </StaggerItem>
            <StaggerItem>
              <SplitText
                as="h3"
                className="type-section-title text-[#1A1A1A] mb-6"
                wordDelay={0.05}
                startDelay={0}
                amount={0.4}
              >
                {trainers[2].name}
              </SplitText>
            </StaggerItem>
            <StaggerItem>
              <p className="text-[#5A5A66] font-bold uppercase tracking-widest mb-8">{trainers[2].role}</p>
            </StaggerItem>
            <StaggerItem>
              <p className="type-body text-[#5A5A66] mb-6">Vani teaches riders from their first session on a lead rein through to independent work at canter, across general riding and horsemanship.</p>
            </StaggerItem>
            <StaggerItem>
              <p className="type-body text-[#5A5A66] mb-6">Her sessions start on the ground. Riders learn to approach, handle and tack up a horse before they learn to sit on one, because confidence in the saddle comes from confidence beside the horse first.</p>
            </StaggerItem>
            <StaggerItem>
              <p className="type-body text-[#5A5A66]">She works often with children and with adults returning to riding after a long gap - the two groups who most need to be told they are doing better than they think.</p>
            </StaggerItem>
          </Stagger>
        </div>
      </div>

      {/* CHAPTER: How We Teach */}
      <div id="chapter-how-we-teach" className="bg-[#0C0922] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp size="text" className="mb-4">
            <h4 className="type-eyebrow">
              <ShinyText
                text="How We Teach"
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h4>
          </FadeUp>

          <SplitText
            as="h2"
            className="type-section-title text-white mb-14"
            wordDelay={0.04}
            startDelay={0.1}
            amount={0.3}
          >
            The things that don't change.
          </SplitText>

          <Stagger gap={0.12} amount={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {rules.map((rule, idx) => (
              <StaggerItem key={idx}>
                <h4 className="text-white font-bold text-xl mb-3">{rule.title}</h4>
                <p className="text-white/60 text-base font-normal leading-relaxed">{rule.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

    </div>
  );
};

export default Trainers;