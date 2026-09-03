import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

const About = () => {
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
    }, 5000); // Auto-slides every 5 seconds
    return () => clearInterval(timer);
  }, []);

  // Exact Practice Items from the screenshot
  const practiceItems = [
    { title: "Coaching from inside the competitive system", desc: "Technique taught the way it's judged, not the way it's improvised." },
    { title: "A covered arena, so the calendar doesn't break", desc: "Bengaluru loses riding days to monsoon and to summer afternoons. Ours don't stop." },
    { title: "International-standard geotextile footing", desc: "The surface used at competition venues — consistent grip, cushioning, and lower injury risk." },
    { title: "Limited riders per batch", desc: "Progress comes from corrected repetitions, which needs a coach watching one rider at a time." },
    { title: "A dressage arena built to standard dimensions", desc: "Riders practice on the same geometry they'll be marked on." },
  ];

  const achievements = [
    { title: "Silver, CSIO* international show jumping", desc: "CSIO competitions are run under Fédération Equestre Internationale rules — the sport's world governing body. Competing at this level requires FEI registration and a qualifying record." },
    { title: "Bronze, Junior National Championship 2025", desc: "A national podium finish in the most recent championship year." },
    { title: "Long-listed, Team India Show Jumping, 2026 Asian Games", desc: "The selection pool from which India's continental squad is chosen." },
  ];

  const siteMapCategories = [
    { label: "Equestrian Core", items: ["1. Indoor Arena", "2. Outdoor Arena", "3. Lunging Pen", "4. Dressage Arena", "5. Stables & Storage Rooms", "6. Tack Shop"] },
    { label: "Service", items: ["Office & Admin", "Buggy Point", "Security Cabin", "Staff Accommodation"] },
    { label: "Public", items: ["Café", "Gallery"] },
    { label: "Hospitality", items: ["Cottages", "Common Pavilion"] },
  ];

  return (
    <div className="min-h-screen bg-[#0C0922]">
      
      {/* ====== MAIN DARK SECTION ====== */}
      <div className="overflow-hidden bg-[#0C0922] pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Who We Are */}
          <div className="nav-dark-hero pb-24 pt-32 md:pb-28 md:pt-44">
            <h4 className="text-[#C9A227] type-eyebrow mb-6">Who We Are</h4>
            <h2 className="type-page-title text-white leading-tight mb-6">
              Built by a Rider. Designed for Riders.
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-2xl">
              Nakshath Equestrian Club is led by an active competitive rider with international show-jumping experience.
            </p>
          </div>

          {/* ============================================================ */}
          {/* WHO LEADS THE ACADEMY - FLOATING CARD CAROUSEL */}
          {/* ============================================================ */}
          <div id="founder" className="relative left-1/2 z-10 -mt-12 w-screen -translate-x-1/2 overflow-hidden rounded-t-[3rem] bg-[#FDFCFA]">
            <div className="mx-auto max-w-7xl px-6 py-24">
              <div className="flex flex-col lg:flex-row">
              
              {/* LEFT DIV: Image Carousel */}
              <div className="w-full lg:w-1/2 relative min-h-[400px] md:min-h-[500px] lg:min-h-[700px] overflow-hidden flex items-center justify-center p-4 md:p-8">
                
                {/* Inner Floating Card - 9:16 ratio on mobile only */}
                <div className="w-full lg:h-[85%] relative rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-black/5 aspect-[9/16] md:aspect-auto lg:aspect-auto md:h-[450px] bg-[#F2F0EB]">
                  {/* Opaque slide track prevents images blending into a false gradient. */}
                  <div
                    className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
                  >
                  {/* Slide 1 */}
                  <div className="relative h-full w-full shrink-0">
                    <img 
                      src="/founder 1.png" 
                      alt="Nakshath Venkatesh" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Slide 2 */}
                  <div className="relative h-full w-full shrink-0">
                    <img 
                      src="/page 2 gpt.png" 
                      alt="Nakshath with Horse" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  </div>

                  {/* Carousel Dots (Centered at bottom of card) */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                    <button 
                      onClick={() => setCurrentSlide(0)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === 0 ? 'bg-[#C9A227] scale-110' : 'bg-[#5A5A66]/25'}`}
                      aria-label="Slide 1"
                    />
                    <button 
                      onClick={() => setCurrentSlide(1)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === 1 ? 'bg-[#C9A227] scale-110' : 'bg-[#5A5A66]/25'}`}
                      aria-label="Slide 2"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT DIV: Details */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h4 className="text-[#C9A227] type-eyebrow mb-4">Who Leads The Academy</h4>
                <h2 className="text-[1.5rem] md:text-[2.25rem] font-serif text-[#1A1A1A] leading-[1.15] mb-2">Nakshath Venkatesh</h2>
                <p className="text-[#C9A227] text-sm uppercase tracking-widest mb-8 border-b border-[#C9A227]/30 pb-4">Founder</p>
                
                {/* Achievements */}
                <div className="space-y-6 mb-10">
                  {achievements.map((item, idx) => (
                    <div key={idx}>
                      <h4 className="text-[#1A1A1A] font-bold mb-1 text-base md:text-lg">{item.title}</h4>
                      <p className="text-[#5A5A66] text-sm font-normal leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div className="space-y-4 text-sm md:text-base text-[#5A5A66] font-normal leading-relaxed">
                  <p>Nakshath competes at both national and international level, and built this academy while still riding. The technique taught here is the technique he is judged on.</p>
                  <p>The club takes riders from a first session on a lead rein through to competition entry, in show jumping and dressage, on a campus built for training rather than display.</p>
                  
                  {/* "To create the world class environment" Quote */}
                  <div className="border-l-2 border-[#C9A227] pl-6 py-2 mt-6">
                    <p className="text-[#1A1A1A]">To create a world-class environment and a gateway to the Olympics, where riders of all levels can develop confidence, skill, and the mindset required to succeed in competitive equestrianism.</p>
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>
          {/* ============================================================ */}
          {/* END WHO LEADS THE ACADEMY */}
          {/* ============================================================ */}

          {/* ============================================================ */}
          {/* THE PRACTICE (IN PRACTICE) - WHITE BACKGROUND DIV */}
          {/* ============================================================ */}
          <div className="relative left-1/2 -mt-px mb-16 w-screen -translate-x-1/2 bg-[#FDFCFA] py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6 md:px-24">
              <h4 className="text-[#C9A227] type-eyebrow mb-4">In Practice</h4>
              <h2 className="type-section-title text-[#1A1A1A] mb-12">What that means for a rider here.</h2>
              
              <div className="space-y-6">
                {practiceItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center border-b border-[#5A5A66]/20 pb-8">
                    <h4 className="w-full md:w-1/2 text-lg md:text-xl font-serif text-[#1A1A1A]">{item.title}</h4>
                    <p className="w-full md:w-1/2 text-sm md:text-base text-[#5A5A66] font-normal md:pl-8 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* ============================================================ */}
          {/* END THE PRACTICE */}
          {/* ============================================================ */}

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-[#C9A227] mb-4">Vision</h3>
              <p className="text-white/80 font-normal leading-relaxed text-base">To create a world-class environment and a gateway to the Olympics, where riders of all levels can develop confidence, skill, and the mindset required to succeed in competitive equestrianism.</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-[#C9A227] mb-4">Mission</h3>
              <p className="text-white/80 font-normal leading-relaxed text-base">To inspire discipline, strength, and excellence through world-class equestrian sports training and experiences in a professional, top-tier environment.</p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* THE CAMPUS - UPDATED EXACTLY AS SCREENSHOT (CLICKABLE MAP) */}
          {/* ============================================================ */}
          <div className="mb-16 rounded-[3rem] bg-[#0C0922] px-6 py-16 md:px-5 md:py-20">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10">
              
              {/* Left Side: Text */}
              <div className="space-y-8 text-base text-white/80 font-normal leading-relaxed ">
                <h4 className="text-[#C9A227] type-eyebrow mb-4">The Campus</h4>
                <h2 className="type-section-title text-white mb-12">One property, laid out for training.</h2>
                
                <p>Three riding arenas sit at the centre of the site — a covered indoor arena, an outdoor arena, and a dressage arena built to standard competition dimensions. Stables, a lunging pen and the tack room sit alongside them.</p>
                
                <p>The café, pavilion and cottages are set apart from the working areas, so visitors and riders are never crossing the same ground.</p>
                
                <p>The campus is in its final phase of construction. Images shown are architectural drawings.</p>
              </div>

              {/* Right Side: Map & Legend Card */}
              <div className="w-full rounded-3xl bg-[#FDFCFA] p-4 shadow-2xl md:p-6">
                
                {/* Map & Categories */}
                <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-[minmax(0,1.5fr)_minmax(13rem,0.9fr)]">
                  
                  {/* Campus map shown at its natural portrait ratio for legibility. */}
                  <div className="min-h-[24rem] w-full overflow-hidden rounded-2xl bg-[#F5F1E8] md:min-h-[30rem]">
                    <img 
                      src="/page 3 gpt.png" 
                      alt="Campus Map" 
                      className="block h-full w-full object-contain"
                    />
                  </div>

                  {/* Categories */}
                  <div className="grid w-full grid-cols-1 gap-3 rounded-2xl bg-[#0C0922] px-5 py-5 shadow-lg sm:grid-cols-2 md:grid-cols-1 md:px-5 md:py-5">
                    {siteMapCategories.map((cat, idx) => (
                      <div key={idx} className="border-b border-[#C9A227]/20 pb-3 last:border-b-0 last:pb-0 sm:last:border-b md:last:border-b-0">
                        <h5 className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#C9A227]">{cat.label}</h5>
                        <ul className="space-y-1 text-[0.75rem] font-normal leading-[1.45] text-white/85">
                          {cat.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
          {/* ============================================================ */}
          {/* END THE CAMPUS */}
          {/* ============================================================ */}

        </div>
      </div>


    </div>
  );
};

export default About;


