const Hero = () => {
  return (
    <section className="nav-dark-hero relative h-screen w-full bg-[#0C0922] overflow-hidden">
      <h1 className="sr-only">Horse Riding Academy in Bengaluru</h1>

      <img
        src="/heroImg.webp"
        alt="Horse riding at Nakshath Equestrian Club"
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover object-[68%_center] md:object-center"
      />
    </section>
  );
};

export default Hero;