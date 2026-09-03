import React from 'react';
import { Link } from 'react-router-dom';

const programs = [
  {
    title: 'Kids Special',
    description: 'Pony riding, confidence and coordination for children.',
    image: '/page 4 3 gpt.png',
    offset: 'xl:mt-0',
    imageClass: 'object-contain',
  },
  {
    title: 'Beginner',
    description: 'First-time riders. Balance, posture, safety and horse handling.',
    image: '/page 4 gpt.png',
    offset: 'xl:mt-[5.5vw]',
    imageClass: 'object-contain',
  },
  {
    title: 'Intermediate',
    description: 'Riding technique, communication, trotting and cantering.',
    image: '/page 4 2 gpt.png',
    offset: 'xl:mt-[0.8vw]',
    imageClass: 'object-contain',
  },
  {
    title: 'Professional Competition',
    description: 'Show jumping preparation and performance assessment.',
    image: '/page 4 4 gpt.png',
    offset: 'xl:mt-[5vw]',
    imageClass: 'object-cover object-top',
  },
];

const Programs = () => {
  const renderProgramGroup = () => (
    <div className="flex w-max items-start gap-6 pr-6 md:gap-[1.5vw] md:pr-[4vw]">
      {programs.map((program) => (
        <article
          key={program.title}
          className={`${program.offset} flex w-[84vw] max-w-[21rem] shrink-0 snap-start snap-always flex-col overflow-hidden rounded-xl bg-[#0C0922] sm:w-[42vw] sm:max-w-none lg:w-[30vw] xl:w-[20vw]`}
        >
          <div className="aspect-[3/4] w-full overflow-hidden bg-[#0C0922]">
            <img
              src={program.image}
              alt={program.title}
              className={`block h-full w-full ${program.imageClass}`}
            />
          </div>
          <div className="flex min-h-[8rem] flex-1 flex-col px-5 py-5 text-white md:min-h-[9rem] md:px-6 md:py-6">
            <h3 className="mb-2 text-base font-semibold leading-snug md:mb-[0.7vw]">{program.title}</h3>
            <p className="type-small max-w-[17rem] text-white/80">{program.description}</p>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <section className="mobile-cta-exclusion floating-action-exclusion w-full overflow-hidden border-t-[0.45rem] border-[#0C0922] bg-[#FDFCFA] py-16 md:py-24">
      <div className="pl-6 sm:pl-10 md:pl-[6.4vw] pr-6">
        <h4 className="text-[#876B18] type-eyebrow mb-4">Programs</h4>
        <h2 className="type-page-title text-[#1A1A1A]">
          Four ways in,<br />one path forward.
        </h2>
      </div>

      <div
        className="programs-carousel mt-8 snap-x snap-mandatory scroll-pl-6 overflow-x-auto overscroll-x-contain pl-6 sm:scroll-pl-10 sm:pl-10 md:mt-14 md:scroll-pl-[5.9vw] md:pl-[5.9vw]"
        aria-label="Programs carousel"
        tabIndex="0"
      >
        {renderProgramGroup()}
      </div>

      <div className="mt-12 md:mt-[3vw] pl-6 sm:pl-10 md:pl-[5.9vw]">
        <Link
          to="/courses"
          className="inline-block border-b border-[#876B18] pb-1 text-xs font-semibold text-[#1A1A1A] transition-colors hover:text-[#876B18]"
        >
          See all programs
        </Link>
      </div>
    </section>
  );
};

export default Programs;
