import React from 'react';

const offers = [
  { img: '/page 11 2 gpt.png', num: '01', title: 'Free trial ride', desc: 'Ten minutes on a schooled horse. No charge, no obligation.' },
  { img: '/page 11 3 gpt.png', num: '02', title: '10% off the first month', desc: 'Applied to any programme at enrolment.' },
  { img: '/page 11 4 gpt.png', num: '03', title: 'Weekend batches', desc: 'Saturday and Sunday sessions for working schedules.' },
  { img: '/page 11 5 gpt.png', num: '04', title: 'Kids summer camp', desc: 'A structured holiday programme for children.' },
  { img: '/page 11 6 gpt.png', num: '05', title: 'Early registration', desc: 'Priority slots for riders who enrol before opening.' },
];

const OpeningSeason = () => {
  return (
    <section className="overflow-hidden bg-[#FDFCFA] px-6 py-12 md:px-10 md:py-20 xl:aspect-[1920/852] xl:p-0">
      <div className="mx-auto flex h-full w-full flex-col items-start gap-12 bg-[#FDFCFA] xl:flex-row xl:gap-0">
        <div className="flex w-full flex-col xl:w-[71%] xl:pl-[5.9vw] xl:pr-[4.8vw] xl:pt-[4.7vw]">
          <div className="mb-8 pl-0">
            <h4 className="text-[#C9A227] type-eyebrow mb-3">Opening Season</h4>
            <h2 className="type-section-title text-[#1A1A1A]">Available until we open.</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 pl-0 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[2.5vw]">
            {offers.map((item) => (
              <div key={item.num} className="flex min-w-0 flex-row items-start gap-3">
                <div className="aspect-[0.72] w-28 flex-shrink-0 overflow-hidden xl:w-[clamp(4.75rem,9vw,11rem)]">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-[#C9A227] text-base font-serif mb-1">{item.num}</span>
                  <h4 className="mb-2 text-sm font-semibold leading-tight text-[#1A1A1A] md:mb-1 md:text-sm">{item.title}</h4>
                  <p className="max-w-[9rem] text-xs font-normal leading-[1.5] text-[#5A5A66] md:max-w-[9rem] md:text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
            <div className="flex items-end justify-start pb-6 sm:justify-center">
              <a href="#" className="text-[#1A1A1A] border-b-2 border-[#C9A227] pb-1 text-xs font-medium hover:text-[#C9A227] hover:border-[#C9A227] transition-colors w-max">Book your trial ride</a>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] xl:h-full xl:w-[29%] xl:aspect-auto">
          <img src="/page 11 1 gpt.png" alt="Equestrian Facility" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default OpeningSeason;
