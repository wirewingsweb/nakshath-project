import React from 'react';

const Hero = () => {
  return (
    <section className="nav-dark-hero relative h-screen w-full bg-[#0C0922]">
      <img src="/heroImg.png" alt="Hero" className="h-full w-full object-cover object-[68%_center] opacity-80 md:object-center" />
      <div className="absolute inset-0 bg-gradient-to-t to-transparent"></div>
    </section>
  );
};

export default Hero;
