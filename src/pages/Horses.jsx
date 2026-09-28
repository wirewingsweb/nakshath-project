const Horses = () => {
  const horses = [
    { name: 'Vibrato', breed: 'Warmblood', age: '17 Yrs.', gender: 'Gelding', colour: 'Chestnut', temperament: 'Steady and unflurried. The horse most first-time riders start on.', level: 'Advanced', discipline: 'General Riding', img: '/Vibrato.png' },
    { name: 'Simbha', breed: 'Thoroughbred', age: '9 Yrs.', gender: 'Gelding', colour: 'Dark Bay', temperament: 'Responsive and forward-going. Suits riders building confidence at trot and canter.', level: 'Intermediate', discipline: 'Show Jumping', img: '/Simbha.png' },
    { name: 'Phebe', breed: 'Thoroughbred', age: '8 Yrs.', gender: 'Mare', colour: 'Bay', temperament: 'Patient and consistent. Trained for flatwork and figures.', level: 'Intermediate', discipline: 'Dressage', img: '/Phebe.png' },
    { name: 'Rani', breed: 'Thoroughbred', age: '11 Yrs.', gender: 'Gelding', colour: 'Chestnut', temperament: 'Bold over fences and honest to the jump. Ridden by competing riders.', level: 'Advanced', discipline: 'Show Jumping', img: '/Rani.png' },
  ];

  const matchItems = [
    { num: '01', title: 'Temperament first, ability second', desc: 'A horse can be well schooled and still be wrong for a nervous beginner. Every horse is assessed for calmness and consistency before it is assessed for what it can do.' },
    { num: '02', title: 'Matched to the rider, not to availability', desc: 'Horses are allocated on the rider\'s experience, confidence and goals. Nobody is put on whatever happens to be free that morning.' },
    { num: '03', title: 'Ponies for the youngest riders', desc: 'Children from five years begin on ponies sized and schooled for them, not on a grown-up-sized horse.' },
    { num: '04', title: 'The same pairing, session after session', desc: 'Progress compounds when horse and rider know each other. Pairings are kept consistent rather than switching week to week.' },
  ];

  const careItems = [
    { title: 'Individual stalls', desc: 'Individual stables with fresh water, clean, dry bedding, and private bathrooms, with maximum 4 hours of access to the stalls.' },
    { title: 'Fixed feeding routine', desc: 'Horses are fed three times a day, plus free access to a hay feeder. They are not fed during exercise.' },
    { title: 'Daily exercise', desc: 'Every horse is exercised every day, including days when no riding is scheduled. Horses are rested only as advised.' },
    { title: 'Exercise on non-riding days', desc: 'Horses are turned out for at least 6 hours a day in cold months and 4 hours in hotter months. Horses go out in quiet, consistent groups.' },
    { title: 'Health team', desc: 'Vaccination, deworming, and hoof care are managed by a team that includes a veterinarian and a farrier.' },
    { title: 'Saddlery team', desc: 'Every horse\'s saddle, bridle and bit are checked and adjusted to ensure the horse\'s comfort throughout the day.' },
    { title: 'Medical room', desc: 'A dedicated room on site for treatments and recovery.' },
  ];

  const safetyItems = [
    { title: 'Rider weight limit', desc: 'Under 75 kg, for the wellbeing of both horse and rider.' },
    { title: 'Helmets, always', desc: 'No rider goes into an arena without one.' },
    { title: 'Supervised handling', desc: 'Riders are never alone with a horse until they are ready to be.' },
    { title: 'Schooled horses only', desc: 'Beginners ride horses proven calm and consistent. No exceptions.' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">

      {/* HERO HEADER */}
      <div className="nav-dark-hero relative overflow-hidden bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-12 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#C9A227]">
              Our Horses
            </span>
          </div>

          <h1 className="type-page-title-long mb-6 text-white">
            The horse is chosen for the rider,
            <br />
            not the other way around.
          </h1>

          <p className="type-lead max-w-2xl text-white/70">
            Every horse is matched by the rider's experience, ability, confidence and goals.
          </p>
        </div>
      </div>

      {/* HOW MATCHING WORKS */}
      <div className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-4 flex items-center gap-4">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
              How Matching Works
            </span>
          </div>

          <h2 className="type-section-title mb-16 text-[#1A1A1A]">
            Safety is a matching problem
            <br />
            before it is a training problem.
          </h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {matchItems.map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <span className="flex-shrink-0 font-serif text-5xl text-[#C9A227]">
                  {item.num}
                </span>
                <div>
                  <h4 className="mb-3 font-serif text-xl text-[#1A1A1A]">
                    {item.title}
                  </h4>
                  <p className="text-[#5A5A66] font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* A DAY IN THE STABLES */}
      <div className="bg-[#0C0922] py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A227]" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                A Day in the Stables
              </span>
            </div>

            <h2 className="type-section-title mb-8 text-white">
              Handled every day,
              <br />
              by the same hands.
            </h2>

            <div className="space-y-6">
              <p className="text-white/70 font-normal leading-relaxed">
                Every horse is groomed, checked and exercised as part of a fixed daily routine, not only on the days it is ridden.
              </p>
              <p className="text-white/70 font-normal leading-relaxed">
                Calm handling on the ground is what produces calm horses under saddle. Horses that are used to being groomed, leading and picked up are the ones that are not surprised under a rider.
              </p>
              <p className="text-white/70 font-normal leading-relaxed">
                Feed, exercise and rest are managed by staff who work with the same horses every day, and who know the signs that a horse is not quite right.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="/day in stable.png"
                alt="Handler with horse"
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MEET THE HORSES — Image card ko fill kare, koi beige space nahi */}
      {/* ============================================================ */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
              The Horses
            </span>
          </div>

          <h2 className="type-page-title mb-16 text-[#1A1A1A]">
            Meet the horses.
          </h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-4 lg:gap-x-8">
            {horses.map((horse) => (
              <div key={horse.name}>
                {/* ✅ IMAGE — No beige, fills card, natural height */}
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={horse.img}
                    alt={horse.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Naam */}
                <h3 className="mt-5 font-serif text-xl font-bold uppercase tracking-wide text-[#1A1A1A] md:text-2xl">
                  {horse.name}
                </h3>

                {/* Details */}
                <p className="mt-2 text-sm text-[#5A5A66]">
                  {horse.breed} · {horse.age} · {horse.gender} · {horse.colour}
                </p>

                {/* Temperament */}
                <p className="mt-4 text-sm leading-relaxed text-[#5A5A66]">
                  {horse.temperament}
                </p>

                {/* Bottom tags */}
                <div className="mt-4 flex items-center gap-4">
                  <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-[#876B18]">
                    {horse.level}
                  </span>
                  <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-[#876B18]">
                    {horse.discipline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CARE AND WELFARE */}
      <div className="bg-white py-24">
        <div className="flex w-full flex-col items-stretch gap-0 lg:flex-row">
          <div className="relative w-full bg-white lg:w-[45%]">
            <div className="h-full py-12 pr-4">
              <img
                src="/care and welfare.png"
                alt="Stables interior"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-r-[3rem] shadow-2xl"
              />
            </div>
          </div>

          <div className="flex w-full flex-col justify-center py-12 pr-6 pl-6 lg:w-[55%] lg:pr-24 lg:pl-16">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A227]" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                Care and Welfare
              </span>
            </div>

            <h2 className="type-section-title mb-10 text-[#1A1A1A]">
              Looked after
              <br />
              before they are ridden.
            </h2>

            <div className="space-y-5">
              {careItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group border-b border-[#5A5A66]/15 pb-4 transition-colors hover:border-[#876B18]/40"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.6rem] text-[#C9A227]/60">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h5 className="mb-1 text-sm font-bold text-[#1A1A1A]">
                        {item.title}
                      </h5>
                      <p className="text-sm font-normal leading-relaxed text-[#5A5A66]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SAFETY */}
      <div className="border-t border-white/10 bg-[#0C0922] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
              Safety
            </span>
          </div>

          <h2 className="type-page-title mb-16 text-white">
            The rules we don't move on.
          </h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {safetyItems.map((item, idx) => (
              <div key={idx} className="group relative">
                <span className="mb-3 block font-mono text-[0.6rem] text-[#C9A227]/60">
                  RULE {String(idx + 1).padStart(2, '0')}
                </span>

                <h4 className="mb-3 text-xl font-bold text-white">
                  {item.title}
                </h4>

                <p className="text-base font-normal leading-relaxed text-white/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Horses;