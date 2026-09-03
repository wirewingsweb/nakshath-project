import React from 'react';
import { Link } from 'react-router-dom';

const coaches = [
  { name: 'Nakshath Venkatesh', role: 'Founder', image: '/founder.png', offset: '' },
  { name: 'Bharath Venna', role: 'Coordinator', image: '/page 10 2 gpt.png', offset: 'xl:mt-5' },
  { name: 'Vani', role: 'Trainer', image: '/trainer.png', offset: 'xl:mt-10' },
];

const WhoTeaches = () => {
  return (
    <section className="relative w-full min-h-[42rem] overflow-hidden bg-[#0C0922] px-6 pb-14 pt-14 md:px-10 md:py-20 xl:min-h-0 xl:aspect-[1920/1327] xl:px-[5.4vw] xl:pb-0 xl:pt-[6.4vw]">
      <img src="/blue house.png" alt="" className="absolute inset-0 block h-full w-full object-cover opacity-75" />
      <div className="absolute inset-0 bg-[#0C0922]/35"></div>

      <div className="relative z-10">
        <h4 className="text-[#C9A227] type-eyebrow mb-4">Who Teaches</h4>
        <h2 className="type-page-title text-white">
          Small batches,<br />named coaches.
        </h2>

        <div className="mt-14 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 xl:grid-cols-[1.05fr_1fr_0.95fr_0.55fr] xl:gap-[2.8vw]">
          {coaches.map((coach) => (
            <article key={coach.name} className={coach.offset}>
              <h3 className="type-card-title text-white">{coach.name}</h3>
              <p className="type-caption mt-1 mb-3 font-semibold uppercase tracking-[0.14em] text-white/75">{coach.role}</p>
              <div className="w-full aspect-[3/5] overflow-hidden rounded-t-[1.6rem]">
                <img src={coach.image} alt={coach.name} className="block w-full h-full object-cover" />
              </div>
            </article>
          ))}

          <div className="self-end pb-2 text-white/85 xl:mt-[15vw] xl:self-auto xl:pb-0">
            <p className="type-small">Limited riders<br />per session.</p>
            <Link
              to="/trainers"
              className="mt-7 inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border border-[#C9A227] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A227] transition-colors duration-300 hover:bg-[#C9A227] hover:text-[#0C0922] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0922]"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoTeaches;
