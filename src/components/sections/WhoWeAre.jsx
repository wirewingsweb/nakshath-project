import React from 'react';

const campusKey = [
  ['1', 'Indoor arena'],
  ['4', 'Dressage arena'],
  ['2', 'Outdoor arena'],
  ['5', 'Stables'],
  ['3', 'Lunging pen'],
  ['6', 'Tack shop'],
];

const WhoWeAre = () => {
  return (
    <section className="mobile-cta-exclusion w-full bg-[#FDFCFA] py-14 md:py-16">
      <div className="grid min-h-[31.75rem] w-full grid-cols-1 items-center overflow-hidden rounded-r-[2.25rem] bg-[#0C0922] md:min-h-[42rem] md:w-[93.2%] md:grid-cols-[48%_52%]">
        <div className="flex justify-center md:justify-end px-5 pt-12 md:py-11 md:pl-10 md:pr-[4.5vw]">
          <div className="flex h-auto w-full max-w-[22rem] flex-col rounded-xl bg-[#FDFCFA] px-5 pb-6 pt-5 md:w-[min(31vw,27rem)] md:max-w-none md:px-5 md:pb-6 md:pt-5">
            <img
              src="/page 3 gpt.png"
              alt="Campus Map"
              className="aspect-[4/5] w-full object-contain"
            />

            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[0.625rem] font-semibold uppercase leading-[1.25] tracking-[0.04em] text-[#1A1A1A] md:mt-[1vw] md:gap-y-[0.8vw] md:text-xs">
              {campusKey.map(([number, label]) => (
                <div key={number} className="grid min-w-0 grid-cols-[0.75rem_minmax(0,1fr)] items-start gap-1.5">
                  <span className="text-xs font-bold md:text-sm">{number}</span>
                  <span className="min-w-0">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 py-14 sm:px-12 md:py-12 md:pl-[4.25vw] md:pr-12 text-white">
          <div className="max-w-[20rem]">
            <h4 className="text-[#876B18] type-eyebrow mb-6 md:mb-[2.4vw]">
              Who We Are
            </h4>

            <div className="space-y-9 md:space-y-[4.2vw] text-base md:text-lg leading-[1.55] font-normal tracking-[0.01em] text-white/90">
              <p>
                A working equestrian academy<br />on the edge of Bengaluru.
              </p>
              <p>
                Show jumping and dressage,<br />
                taught from <span className="text-[#876B18]">first sit</span><br />
                <span className="text-[#876B18]">to competition entry.</span>
              </p>
              <p>
                Four arenas, stables and cottages<br />across a single campus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
