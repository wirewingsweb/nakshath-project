import React from 'react';

const ArenaFeatures = () => {
  const features = [
    { img: '/arena-indoor.png', title: 'Indoor Arena', desc: 'Training in a safe, controlled, covered environment.' },
    { img: '/arena-weather.png', title: 'All-Weather Training', desc: 'Sessions run through monsoon and peak summer heat.' },
    { img: '/arena-footing.png', title: 'International Footing', desc: 'Geotextile surface built for grip, cushioning and safety.' },
    { img: '/arena-batches.png', title: 'Small Batches', desc: 'Limited riders per session so every rider gets attention.' },
    { img: '/arena-horses.png', title: 'Schooled Horses', desc: 'Calm, well-trained horses matched to rider level.' },
    { img: '/arena-progression.png', title: 'Structured Progression', desc: 'Walk, trot, canter, and on to national and international competition.' }
  ];

  return (
    <section className="bg-[#0C0922] px-6 py-16 text-white md:px-[8vw] md:py-24">
      <div className="mx-auto w-full max-w-[96rem]">
        <h4 className="text-[#C9A227] type-eyebrow mb-5">The Arena</h4>
        <h2 className="type-page-title mb-14 md:mb-16">Built so the training<br/>never stops.</h2>
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-14 xl:grid-cols-3 xl:gap-x-[4vw]">
          {features.map((item, index) => (
            <div key={index} className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-start gap-4 min-[360px]:grid-cols-[5.7rem_minmax(0,1fr)] min-[360px]:gap-5 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-6">
              <div className="mt-1 flex aspect-square w-full items-center justify-center overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-semibold uppercase leading-[1.35] tracking-[0.08em] text-white md:min-h-[2.7em]">{item.title}</h3>
                <p className="type-small mt-3 max-w-[14rem] text-white/75">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArenaFeatures;
