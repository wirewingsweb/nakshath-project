import React from 'react';

const TrialRideCTA = () => {
  return (
    <div className="relative w-full bg-[#0C0922] overflow-hidden py-24 md:py-32 px-6 md:px-20">
      <img 
        src="/come and ride.png" 
        alt="Trial Background" 
        className="absolute inset-0 w-full h-full object-cover object-right z-0 opacity-90" 
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start md:items-start justify-center min-h-[400px] md:min-h-[500px]">
        <div className="flex flex-col max-w-2xl">
          <h2 className="type-page-title text-white mb-4 leading-tight">
            Come and sit<br/>
            on a horse.
          </h2>
          <p className="text-lg text-white/80 mb-10 font-normal">
            Ten minutes, no charge, no obligation.
          </p>
          <button className="bg-[#C9A227] text-[#0C0922] font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors shadow-lg w-max">
            Book Your Trial Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialRideCTA;


