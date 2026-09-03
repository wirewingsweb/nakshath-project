import React from 'react';

const benefits = [
  { image: '/page 9 physical.png', title: 'Physical', items: ['Balance and coordination', 'Flexibility and posture', 'Core strength'] },
  { image: '/page 9 mentals.png', title: 'Mental', items: ['Confidence', 'Focus and discipline', 'Calm under pressure'] },
  { image: '/page 9 lifestyle.png', title: 'Lifestyle', items: ['Responsibility', 'Leadership', 'Sportsmanship'] },
];

const Benefit = ({ benefit, compact = false }) => (
  <article className={compact ? 'grid grid-cols-[6.5rem_1fr] items-center gap-5' : 'grid grid-cols-[13.8vw_1fr] items-start gap-[1.8vw]'}>
    <img
      src={benefit.image}
      alt=""
      className={`block w-full mix-blend-multiply ${compact ? 'opacity-70' : 'opacity-75'}`}
    />
    <div className={compact ? 'py-4' : 'pt-[3.2vw]'}>
      <h3 className="type-eyebrow text-[#876B18]">
        {benefit.title}
      </h3>
      <span className={`block border-t border-[#876B18] ${compact ? 'mb-5 mt-3 w-8' : 'mb-[2vw] mt-[1.15vw] w-[2vw]'}`} />
      <ul className={compact ? 'space-y-4 text-sm leading-[1.45] text-[#1A1A1A]' : 'space-y-[2vw] text-sm leading-[1.45] text-[#1A1A1A]'}>
        {benefit.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  </article>
);

const WhyRiding = () => {
  return (
    <section className="w-full overflow-hidden bg-[#FDFCFA]">
      <div className="relative hidden aspect-[1672/941] w-full lg:block">
        <div className="absolute right-0 top-0 h-[62%] w-[70%] overflow-hidden">
          <img
            src="/page 9 gpt.png"
            alt="A child riding a white horse at sunset"
            className="h-full w-full object-cover object-[63%_48%]"
          />
          <div className="absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#FDFCFA] via-[#FDFCFA]/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#FDFCFA] via-[#FDFCFA]/65 to-transparent" />
        </div>

        <header className="absolute left-[6.8%] top-[15.5%] z-10 w-[48%]">
          <h4 className="mb-[2.1vw] type-eyebrow text-[#876B18]">Why Riding</h4>
          <h2 className="type-display text-[#1A1A1A]">
            What a child takes<br />home from the arena.
          </h2>
          <p className="mt-[1.6vw] text-base text-[#5A5A66]">Riding builds more than riding.</p>
        </header>

        <div className="absolute inset-x-[3.5%] bottom-[7.2%] z-10 grid grid-cols-3 gap-[2.2vw]">
          {benefits.map((benefit) => <Benefit key={benefit.title} benefit={benefit} />)}
        </div>
      </div>

      <div className="lg:hidden">
        <header className="px-6 pb-7 pt-14 sm:px-10">
          <h4 className="type-eyebrow mb-4 text-[#876B18]">Why Riding</h4>
          <h2 className="type-page-title text-[#1A1A1A]">
            What a child takes<br />home from the arena.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5A5A66]">Riding builds more than riding.</p>
        </header>

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img src="/page 9 gpt.png" alt="A child riding a white horse at sunset" className="h-full w-full object-cover object-[72%_center]" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#FDFCFA]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#FDFCFA] to-transparent" />
        </div>

        <div className="space-y-3 px-6 pb-16 sm:px-10">
          {benefits.map((benefit) => <Benefit key={benefit.title} benefit={benefit} compact />)}
        </div>
      </div>
    </section>
  );
};

export default WhyRiding;
