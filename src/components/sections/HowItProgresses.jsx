import React from 'react';

const progression = [
  { title: 'Walk', lines: ['First', 'Sessions'], tone: 'text-white' },
  { title: 'Trot', lines: ['Building', 'Balance'], tone: 'text-white' },
  { title: 'Canter', lines: ['Control', 'and Pace'], tone: 'text-white' },
  { title: 'Competition', lines: ['National and', 'International'], tone: 'text-[#C9A227]' },
];

const HowItProgresses = () => {
  return (
    <section id="progression-story" className="mobile-cta-exclusion floating-action-exclusion w-full overflow-hidden bg-[#FDFCFA] px-3 py-8 min-[360px]:px-5 min-[500px]:px-6 md:bg-[#0C0922] md:p-0">
      {/* On compact screens the captions remain inside the photograph and
          align with the four horses, while the full image stays visible. */}
      <figure className="relative overflow-hidden rounded-xl bg-[#0C0922] shadow-[0_18px_45px_rgba(12,9,34,0.16)] md:hidden">
        <img
          src="/page 5 gpt.png"
          alt="Four riders demonstrating the progression from walk through competition"
          className="block h-auto w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/45 via-transparent to-[#0C0922]/95" />
        <h4 className="type-eyebrow absolute left-4 top-4 text-[#C9A227] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">How It Progresses</h4>
        <div className="absolute inset-x-2 bottom-3 grid grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr] gap-1 text-center">
          {progression.map((step) => (
            <div key={step.title} className="min-w-0 px-0.5">
              <h3 className={`font-serif text-[clamp(0.625rem,2.5vw,0.875rem)] leading-tight [text-shadow:0_1px_8px_rgba(0,0,0,0.65)] ${step.tone}`}>{step.title}</h3>
              <p className="mt-1.5 text-[0.625rem] font-medium uppercase leading-[1.3] tracking-[0.02em] text-white/80">
                {step.lines.map((line) => <span key={line} className="block">{line}</span>)}
              </p>
            </div>
          ))}
        </div>
      </figure>

      <figure className="relative hidden w-full md:block">
        <img src="/page 5 gpt.png" alt="Four riders demonstrating the progression from walk through competition" className="block h-auto w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/20 via-transparent to-black/10"></div>
        <h4 className="type-eyebrow absolute left-[4.8%] top-[9.5%] text-[#C9A227]">How It Progresses</h4>
        <div className="absolute left-[12.3%] top-[44%] w-[clamp(7rem,15vw,13rem)] -translate-x-1/2 text-center text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
          <h3 className="font-serif text-base leading-none md:text-[clamp(1.25rem,2.4vw,2.25rem)]">Walk</h3>
          <p className="type-caption mt-1.5 font-medium uppercase tracking-[0.04em] text-white/90 md:mt-3 md:tracking-[0.1em]"><span className="block">First</span><span className="block">Sessions</span></p>
        </div>
        <div className="absolute left-[33.6%] top-[35%] w-[clamp(7rem,15vw,13rem)] -translate-x-1/2 text-center text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
          <h3 className="font-serif text-base leading-none md:text-[clamp(1.25rem,2.4vw,2.25rem)]">Trot</h3>
          <p className="type-caption mt-1.5 font-medium uppercase tracking-[0.04em] text-white/90 md:mt-3 md:tracking-[0.1em]"><span className="block">Building</span><span className="block">Balance</span></p>
        </div>
        <div className="absolute left-[56%] top-[27%] w-[clamp(7rem,15vw,13rem)] -translate-x-1/2 text-center text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
          <h3 className="font-serif text-base leading-none md:text-[clamp(1.25rem,2.4vw,2.25rem)]">Canter</h3>
          <p className="type-caption mt-1.5 font-medium uppercase tracking-[0.04em] text-white/90 md:mt-3 md:tracking-[0.1em]"><span className="block">Control</span><span className="block">and Pace</span></p>
        </div>
        <div className="absolute left-[83.5%] top-[18%] w-[clamp(11rem,24vw,20rem)] -translate-x-1/2 text-center [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
          <h3 className="font-serif text-sm leading-none text-[#C9A227] md:text-[clamp(1.35rem,2.7vw,2.5rem)]">Competition</h3>
          <p className="type-caption mt-1.5 font-medium uppercase tracking-normal text-white/90 md:mt-3 md:tracking-[0.08em]"><span className="block">National and</span><span className="block">International</span></p>
        </div>
      </figure>
    </section>
  );
};

export default HowItProgresses;
