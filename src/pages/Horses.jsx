import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Horses = () => {
  // Updated exact horse data from screenshot
  const horses = [
    { name: 'Vibrato', breed: 'Warmblood', age: '17 Yrs.', gender: 'Gelding', colour: 'Chestnut', temperament: 'Steady and unflurried. The horse most first-time riders start on.', level: 'Advanced', discipline: 'General Riding', img: '/Vibrato.png' },
    { name: 'Simbha', breed: 'Thoroughbred', age: '9 Yrs.', gender: 'Gelding', colour: 'Dark Bay', temperament: 'Responsive and forward-going. Suits riders building confidence at trot and canter.', level: 'Intermediate', discipline: 'Show Jumping', img: '/Simbha.png' },
    { name: 'Phebe', breed: 'Thoroughbred', age: '8 Yrs.', gender: 'Mare', colour: 'Bay', temperament: 'Patient and consistent. Trained for flatwork and figures.', level: 'Intermediate', discipline: 'Dressage', img: '/Phebe.png' },
    { name: 'Rani', breed: 'Thoroughbred', age: '11 Yrs.', gender: 'Gelding', colour: 'Chestnut', temperament: 'Bold over fences and honest to the jump. Ridden by competing riders.', level: 'Advanced', discipline: 'Show Jumping', img: '/Rani.png' },
  ];

  const matchItems = [
    { num: '01', title: 'Temperament first, ability second', desc: 'A horse can be well schooled and still be wrong for a nervous beginner. Every horse is assessed for calmness and consistency before it is assessed for what it can do.' },
    { num: '02', title: 'Matched to the rider, not to availability', desc: 'Horses are allocated on the rider’s experience, confidence and goals. Nobody is put on whatever happens to be free that morning.' },
    { num: '03', title: 'Ponies for the youngest riders', desc: 'Children from five years begin on ponies sized and schooled for them, not on a grown-up-sized horse.' },
    { num: '04', title: 'The same pairing, session after session', desc: 'Progress compounds when horse and rider know each other. Pairings are kept consistent rather than switching week to week.' },
  ];

  const careItems = [
    { title: 'Individual stalls', desc: 'Individual stables with fresh water, clean, dry bedding, and private bathrooms, with maximum 4 hours of access to the stalls.' },
    { title: 'Fixed feeding routine', desc: 'Horses are fed three times a day, plus free access to a hay feeder. They are not fed during exercise.' },
    { title: 'Daily exercise', desc: 'Every horse is exercised every day, including days when no riding is scheduled. Horses are rested only as advised.' },
    { title: 'Exercise on non-riding days', desc: 'Horses are turned out for at least 6 hours a day in cold months and 4 hours in hotter months. Horses go out in quiet, consistent groups.' },
    { title: 'Health team', desc: 'Vaccination, deworming, and hoof care are managed by a team that includes a veterinarian and a farrier.' },
    { title: 'Saddlery team', desc: 'Every horse’s saddle, bridle and bit are checked and adjusted to ensure the horse’s comfort throughout the day.' },
    { title: 'Medical room', desc: 'A dedicated room on site for treatments and recovery.' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      
      {/* ====== DARK HEADER ====== */}
      <div className="nav-dark-hero bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <div className="max-w-7xl mx-auto px-6">
          <h4 className="text-[#C9A227] type-eyebrow mb-4">Our Horses</h4>
          <h2 className="type-page-title-long mb-6 text-white">
            The horse is chosen for the rider, not the other way around.
          </h2>
          <p className="type-lead text-white/70">
            Every horse is matched by the rider's experience, ability, confidence and goals.
          </p>
        </div>
      </div>

      {/* ====== HOW MATCHING WORKS ====== */}
      <div className="relative z-10 -mt-12 rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h4 className="text-[#C9A227] type-eyebrow mb-4">How Matching Works</h4>
          <h2 className="type-section-title text-[#1A1A1A] mb-16">Safety is a matching problem<br/>before it is a training problem.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {matchItems.map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <span className="text-5xl font-serif text-[#C9A227] flex-shrink-0">{item.num}</span>
                <div>
                  <h4 className="text-xl font-serif text-[#1A1A1A] mb-3">{item.title}</h4>
                  <p className="text-[#5A5A66] font-normal leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== A DAY IN THE STABLES ====== */}
      <div className="bg-[#0C0922] py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <h4 className="text-[#C9A227] type-eyebrow mb-4">A Day in the Stables</h4>
            <h2 className="type-section-title text-white mb-8">Handled every day,<br/>by the same hands.</h2>
            <p className="text-white/70 font-normal leading-relaxed mb-6">Every horse is groomed, checked and exercised as part of a fixed daily routine, not only on the days it is ridden.</p>
            <p className="text-white/70 font-normal leading-relaxed mb-6">Calm handling on the ground is what produces calm horses under saddle. Horses that are used to being groomed, leading and picked up are the ones that are not surprised under a rider.</p>
            <p className="text-white/70 font-normal leading-relaxed">Feed, exercise and rest are managed by staff who work with the same horses every day, and who know the signs that a horse is not quite right.</p>
          </div>
          <div className="w-full lg:w-1/2">
            <img src="/day in stable.png" alt="Handler with horse" className="w-full rounded-3xl shadow-2xl object-cover" />
          </div>
        </div>
      </div>

      {/* ====== MEET THE HORSES ====== */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h4 className="text-[#C9A227] type-eyebrow mb-4">The Horses</h4>
          <h2 className="type-page-title text-[#1A1A1A] mb-16">Meet the horses.</h2>

          {/* Grid: 4 Columns, 1 Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {horses.map((horse, idx) => (
              <div key={idx} className="flex flex-col">
                
                {/* Upper Div: Image */}
                <div className="w-full">
                  <img 
                    src={horse.img} 
                    alt={horse.name} 
                    className="aspect-[9/16] w-full rounded-xl object-cover" 
                  />
                </div>

                {/* Lower Div: Text */}
                <div className="mt-6">
                  <h3 className="text-xl md:text-2xl font-serif text-[#1A1A1A] mb-1">{horse.name}</h3>
                  
                  <p className="text-sm text-[#5A5A66] font-normal leading-relaxed mb-4">
                    {horse.breed} · {horse.age} · {horse.gender} · {horse.colour}
                  </p>
                  
                  <p className="text-[#5A5A66] font-normal leading-relaxed mb-4">
                    {horse.temperament}
                  </p>

                  {/* Level and Discipline (Gold Text) */}
                  <div className="text-[#C9A227] text-xs font-semibold uppercase tracking-wider flex gap-3">
                    <span>{horse.level}</span>
                    <span>{horse.discipline}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== CARE AND WELFARE ====== */}
      <div className="bg-white py-24">
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-0">
          
          {/* LEFT DIV: Image (Attached Left, Rounded Right, Less Width) */}
          <div className="w-full lg:w-[45%] relative bg-white">
            <div className="h-full pr-4 py-12">
              <img 
                src="/care and welfare.png" 
                alt="Stables interior" 
                className="w-full h-full object-cover rounded-r-[3rem] shadow-2xl" 
              />
            </div>
          </div>

          {/* RIGHT DIV: Text (Wider) */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center py-12 pl-6 lg:pl-16 pr-6 lg:pr-24">
            <h4 className="text-[#C9A227] type-eyebrow mb-4">Care and Welfare</h4>
            <h2 className="type-section-title text-[#1A1A1A] mb-10">Looked after<br/>before they are ridden.</h2>
            
            <div className="space-y-4">
              {careItems.map((item, idx) => (
                <div key={idx} className="border-b border-[#5A5A66]/20 pb-4">
                  <h5 className="text-[#1A1A1A] font-bold text-sm mb-1">{item.title}</h5>
                  <p className="text-[#5A5A66] text-sm font-normal leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ====== SAFETY ====== */}
      <div className="bg-[#0C0922] py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h4 className="text-[#C9A227] type-eyebrow mb-4">Safety</h4>
          <h2 className="type-page-title text-white mb-16">The rules we don't move on.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h4 className="text-white font-bold text-xl mb-3">Rider weight limit</h4>
              <p className="text-white/60 text-base font-normal leading-relaxed">Under 75 kg, for the wellbeing of both horse and rider.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-xl mb-3">Helmets, always</h4>
              <p className="text-white/60 text-base font-normal leading-relaxed">No rider goes into an arena without one.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-xl mb-3">Supervised handling</h4>
              <p className="text-white/60 text-base font-normal leading-relaxed">Riders are never alone with a horse until they are ready to be.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-xl mb-3">Schooled horses only</h4>
              <p className="text-white/60 text-base font-normal leading-relaxed">Beginners ride horses proven calm and consistent. No exceptions.</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Horses;


