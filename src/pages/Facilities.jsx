import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Facilities = () => {
  const arenas = [
    { title: 'Indoor Arena', label: 'All-Weather', desc: 'A covered arena built so training does not stop for monsoon or for summer heat. International-standard geotextile footing, consistent underfoot, and lower injury risk for horse and rider.', img: '/indoor arena.png' },
    { title: 'Outdoor Arena', label: 'Sand Surface', desc: 'An open sand arena for jumping and flatwork in good weather, with the space to ride a full course and the light to shoot in early morning or late evening.', img: '/outdoor arena.png' },
    { title: 'Dressage Arena', label: 'Standard Dimensions', desc: 'Built to competition dimensions, so riders practice on the same geometry they will be marked on. The riding area is larger than most people expect.', img: '/dressage arena.png' },
    { title: 'Lunging Pen', label: 'Groundwork', desc: 'A circular pen for working horses on the lunge — warming up, schooling young horses, and teaching riders to read a horse\'s movement from the ground.', img: '/lunging pen.png' },
  ];

  // Exact descriptions from screenshot
  const stables = [
    { title: 'Stables', desc: 'Individual stalls with feeding and grooming areas.' },
    { title: 'Saddle Room', desc: 'Tack stored, cleaned and checked in one place.' },
    { title: 'Medical Room', desc: 'A dedicated space for treatment and recovery.' },
    { title: 'Tack Shop', desc: 'Riding gear and equipment on site.' },
  ];

  // UPDATED to match screenshot exactly (2x2 grid)
  const beyond = [
    { title: 'Café', desc: 'Warm stone, arches, open through the day.', img: '/cafe.png' },
    { title: 'Common Pavilion', desc: 'Shade and seating for spectators and families.', img: '/common pavillion.png' },
    { title: 'Lounge Space', desc: 'Open landscaped areas across the campus.', img: '/lounge.png' },
    { title: 'Cottages', desc: 'For visiting riders, trainers and guests.', img: '/cottages.png' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      
      {/* ====== SECTION 1: HEADER (DARK NAVY) ====== */}
      <div className="nav-dark-hero bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <div className="max-w-7xl mx-auto px-6">
          <h4 className="text-[#C9A227] type-eyebrow mb-4">The Property</h4>
          <h2 className="type-page-title text-white leading-tight mb-4">
            Built to be trained on,<br/>not looked at.
          </h2>
          <p className="type-lead text-white/70">
            Indoor arena, lunging pen, stables and a café, on one campus in Sarjapura.
          </p>
        </div>
      </div>

      {/* ====== SECTION 2: ARENAS ====== */}
      <div className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="space-y-20">
          
          {/* Sub Div: Indoor Arena - Full Width */}
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-1/2">
                  <img src={arenas[0].img} alt={arenas[0].title} className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]" />
                </div>
                <div className="w-full lg:w-1/2">
                  <h4 className="text-[#876B18] type-eyebrow mb-2">{arenas[0].label}</h4>
                  <h3 className="type-card-title text-[#1A1A1A] mb-4">{arenas[0].title}</h3>
                  <p className="text-[#5A5A66] font-normal leading-relaxed">{arenas[0].desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sub Div: Outdoor Arena - Full Width */}
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row-reverse gap-10 items-center">
                <div className="w-full lg:w-1/2">
                  <img src={arenas[1].img} alt={arenas[1].title} className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]" />
                </div>
                <div className="w-full lg:w-1/2">
                  <h4 className="text-[#876B18] type-eyebrow mb-2">{arenas[1].label}</h4>
                  <h3 className="type-card-title text-[#1A1A1A] mb-4">{arenas[1].title}</h3>
                  <p className="text-[#5A5A66] font-normal leading-relaxed">{arenas[1].desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sub Div: Dressage Arena - Full Width */}
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-1/2">
                  <img src={arenas[2].img} alt={arenas[2].title} className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]" />
                </div>
                <div className="w-full lg:w-1/2">
                  <h4 className="text-[#876B18] type-eyebrow mb-2">{arenas[2].label}</h4>
                  <h3 className="type-card-title text-[#1A1A1A] mb-4">{arenas[2].title}</h3>
                  <p className="text-[#5A5A66] font-normal leading-relaxed">{arenas[2].desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sub Div: Lunging Pen - Full Width with Background */}
          <div className="w-screen ">
            <div className="w-screen mx-auto ">
              <div className="flex flex-col lg:flex-row-reverse gap-10 items-center bg-[#F2F0EB]  p-8 md:p-12 lg:p-16">
                <div className="w-full lg:w-[60%]">
                  <img src={arenas[3].img} alt={arenas[3].title} className="w-full rounded-[2rem] shadow-xl object-cover aspect-[16/10]" />
                </div>
                <div className="w-full lg:w-[40%]">
                  <h4 className="text-[#876B18] type-eyebrow mb-2">{arenas[3].label}</h4>
                  <h3 className="type-section-title text-[#1A1A1A] mb-4">{arenas[3].title}</h3>
                  <p className="text-[#5A5A66] font-normal leading-relaxed">{arenas[3].desc}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ====== SECTION 3: WHERE THE HORSES LIVE ====== */}
      <div className="w-full bg-[#0C0922] py-0 lg:pt-24 lg:pb-12">
        <div className="w-full flex flex-col lg:flex-row items-center">
          
          <div className="w-full lg:w-[45%] relative bg-[#0C0922]">
            <div className="pb-8 pr-4 lg:py-12">
              <img 
                src="/horse live.png" 
                alt="Stables interior" 
                className="w-full h-full object-cover rounded-r-[3rem] shadow-2xl" 
              />
            </div>
          </div>

          <div className="flex w-full flex-col justify-center pt-12 pb-16 pr-6 pl-6 lg:w-[55%] lg:py-12 lg:pr-24 lg:pl-16">
            <h4 className="text-[#C9A227] type-eyebrow mb-4">Equestrian Core</h4>
            <h2 className="type-section-title text-white mb-10">Where the horses live.</h2>
            
            <div className="space-y-8">
              {stables.map((item, idx) => (
                <div key={idx} className="border-b border-white/10 pb-6">
                  <h5 className="text-[#C9A227] font-bold text-sm uppercase tracking-wider mb-2">{item.title}</h5>
                  <p className="text-white/60 text-base font-normal leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ====== SECTION 4: BEYOND THE ARENA (UPDATED EXACTLY AS SCREENSHOT) ====== */}
      <div className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h4 className="text-[#876B18] type-eyebrow mb-4">Beyond the Arena</h4>
          <h2 className="type-section-title text-[#1A1A1A] mb-12">Somewhere to wait, and somewhere to stay.</h2>
          
          {/* 2x2 Grid for Beyond Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-14">
            {beyond.map((item, idx) => (
              <div key={idx} className="group">
                <div className="rounded-2xl overflow-hidden mb-5">
                  <img src={item.img} alt={item.title} className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="font-bold text-[#1A1A1A] text-xl uppercase tracking-wider">{item.title}</h4>
                <p className="text-sm text-[#5A5A66] mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Facilities;



