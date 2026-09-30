import { useRef } from 'react';
import { Link } from 'react-router-dom';

const programs = [
  {
    title: 'Kids Special',
    description: 'Pony riding, confidence and coordination for children.',
    image: '/page-4-3-gpt.webp',
    imageClass: 'object-contain',
  },
  {
    title: 'Beginner',
    description: 'First-time riders. Balance, posture, safety and horse handling.',
    image: '/page-4-gpt.webp',
    imageClass: 'object-contain',
  },
  {
    title: 'Intermediate',
    description: 'Riding technique, communication, trotting and cantering.',
    image: '/page-4-2-gpt.webp',
    imageClass: 'object-contain',
  },
  {
    title: 'Professional Competition',
    description: 'Show jumping preparation and performance assessment.',
    image: '/page-4-4-gpt.webp',
    imageClass: 'object-cover object-top',
  },
];

const Programs = () => {
  const trackRef = useRef(null);

  // Desktop pe mouse-wheel ko horizontal scroll karo
  const handleWheel = (e) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const canScrollLeft = track.scrollLeft > 0;
    const canScrollRight = track.scrollLeft < track.scrollWidth - track.clientWidth - 1;

    if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="mobile-cta-exclusion floating-action-exclusion w-full overflow-hidden border-t-[0.45rem] border-[#0C0922] bg-[#FDFCFA] py-16 md:py-24">
      {/* Heading */}
      <div className="px-6 sm:px-10 md:px-[6.4vw]">
        <h4 className="text-[#876B18] type-eyebrow mb-4">Programs</h4>
        <h2 className="type-page-title text-[#1A1A1A]">
          Four ways in,<br />one path forward.
        </h2>
      </div>

      {/* Native horizontal scroll track */}
      <div
        ref={trackRef}
        onWheel={handleWheel}
        className="programs-track mt-8 flex gap-6 overflow-x-auto overflow-y-visible scroll-smooth snap-x snap-mandatory pl-6 pr-6 sm:pl-10 sm:pr-10 md:mt-14 md:gap-[2vw] md:pl-[6.4vw] md:pr-[6.4vw]"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {programs.map((program) => (
          <article
            key={program.title}
            className="flex w-[84vw] max-w-[21rem] shrink-0 snap-center flex-col overflow-hidden rounded-xl bg-[#0C0922] sm:w-[42vw] sm:max-w-none lg:w-[30vw] xl:w-[24vw]"
          >
            <div className="aspect-[3/4] w-full overflow-hidden bg-[#0C0922]">
              <img
                src={program.image}
                alt={program.title}
                loading="lazy"
                decoding="async"
                className={`block h-full w-full ${program.imageClass}`}
              />
            </div>
            <div className="flex min-h-[8rem] flex-1 flex-col px-5 py-5 text-white md:min-h-[9rem] md:px-6 md:py-6">
              <h3 className="mb-2 text-base font-semibold leading-snug md:mb-[0.7vw]">
                {program.title}
              </h3>
              <p className="type-small max-w-[17rem] text-white/80">
                {program.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Footer link */}
      <div className="mt-12 pl-6 sm:pl-10 md:mt-[3vw] md:pl-[5.9vw]">
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