import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const facilities = [
  { image: '/page 7 1 gpt.png', title: 'Indoor Arena', detail: 'All-weather', ratio: '0.91', position: '50% 58%', offset: '' },
  { image: '/page 7 2 gpt.png', title: 'Outdoor Arena', detail: 'Sand surface', ratio: '0.86', position: '50% 48%', offset: 'md:mt-1' },
  { image: '/page 7 3 gpt.png', title: 'Stables', detail: 'Individual stalls', ratio: '0.79', position: '50% 55%', offset: 'md:mt-1' },
  { image: '/page 7 4 gpt.png', title: 'Café', detail: 'Open to visitors', ratio: '0.78', position: '50% 52%', offset: 'md:mt-4' },
  { image: '/page 7 5 gpt.png', title: 'Cottages', detail: 'On-site stay', ratio: '0.93', position: '50% 55%', offset: 'md:mt-7' },
];

const carouselFacilities = [...facilities, ...facilities, ...facilities];

const TheCampus = () => {
  const carouselRef = useRef(null);
  const autoplayResumeTimerRef = useRef(null);
  const scrollEndTimerRef = useRef(null);
  const autoScrollTimerRef = useRef(null);
  const autoScrollingRef = useRef(false);
  const autoplayPausedRef = useRef(false);
  const activeIndexRef = useRef(facilities.length);
  const [activeIndex, setActiveIndex] = useState(facilities.length);

  const moveToCard = (index, behavior = 'smooth') => {
    const carousel = carouselRef.current;
    const card = carousel?.children[index];

    if (!carousel || !card) return;

    carousel.scrollTo({
      left: card.offsetLeft - (carousel.clientWidth - card.clientWidth) / 2,
      behavior,
    });
  };

  const pauseAutoplay = () => {
    autoplayPausedRef.current = true;
    autoScrollingRef.current = false;
    window.clearTimeout(autoplayResumeTimerRef.current);
    autoplayResumeTimerRef.current = window.setTimeout(() => {
      autoplayPausedRef.current = false;
    }, 4500);
  };

  const rebaseToMiddleSet = (index) => {
    const normalizedIndex = facilities.length + (((index % facilities.length) + facilities.length) % facilities.length);
    const carousel = carouselRef.current;

    if (!carousel || normalizedIndex === index) return;

    carousel.classList.add('campus-carousel--rebasing');
    autoScrollingRef.current = true;
    activeIndexRef.current = normalizedIndex;
    moveToCard(normalizedIndex, 'auto');
    setActiveIndex(normalizedIndex);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        carousel.classList.remove('campus-carousel--rebasing');
      });
    });
  };

  const handleScroll = () => {
    if (autoScrollingRef.current) return;

    pauseAutoplay();

    window.clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = window.setTimeout(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
      const nearestIndex = Array.from(carousel.children).reduce((nearest, card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const nearestCard = carousel.children[nearest];
        const nearestCenter = nearestCard.offsetLeft + nearestCard.clientWidth / 2;
        return Math.abs(cardCenter - carouselCenter) < Math.abs(nearestCenter - carouselCenter) ? index : nearest;
      }, 0);

      activeIndexRef.current = nearestIndex;
      setActiveIndex(nearestIndex);
    }, 120);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const alignCarousel = () => moveToCard(activeIndexRef.current, 'auto');
    const resizeObserver = new ResizeObserver(alignCarousel);
    resizeObserver.observe(carousel);
    alignCarousel();

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    autoScrollingRef.current = true;
    moveToCard(activeIndex);
    window.clearTimeout(autoScrollTimerRef.current);
    autoScrollTimerRef.current = window.setTimeout(() => {
      autoScrollingRef.current = false;
    }, 900);

    return () => {
      window.clearTimeout(autoScrollTimerRef.current);
    };
  }, [activeIndex]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (autoplayPausedRef.current) return;

      const current = activeIndexRef.current;
      if (current < facilities.length || current >= facilities.length * 2) {
        rebaseToMiddleSet(current);
        return;
      }

      setActiveIndex(current + 1);
    }, 3200);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(autoplayResumeTimerRef.current);
      window.clearTimeout(scrollEndTimerRef.current);
    };
  }, []);

  return (
    <section className="w-full bg-[#FDFCFA] py-14 md:pt-[4.2vw] md:pb-[4vw] overflow-hidden">
      <div className="px-6 sm:px-10 md:px-[5.4vw]">
        <h4 className="text-[#876B18] type-eyebrow mb-3">The Campus</h4>
        <h2 className="type-page-title text-[#1A1A1A]">
          Everything on<br />one property.
        </h2>
      </div>

      <div
        ref={carouselRef}
        className="campus-carousel mt-8 md:mt-[3vw]"
        aria-label="Campus facilities carousel"
        onScroll={handleScroll}
        onPointerDown={pauseAutoplay}
        onTouchStart={pauseAutoplay}
        onWheel={pauseAutoplay}
      >
        {carouselFacilities.map((facility, index) => {
          const distance = Math.min(Math.abs(index - activeIndex), 3);

          return (
          <article
            key={`${facility.title}-${index}`}
            className="campus-carousel-card"
            data-distance={distance}
            aria-hidden={distance > 2}
          >
            <div className="facility-image w-full overflow-hidden rounded-lg" style={{ '--facility-ratio': facility.ratio }}>
              <img src={facility.image} alt={facility.title} className="block h-full w-full object-cover" style={{ objectPosition: facility.position }} />
            </div>
            <div className="px-2 pt-3">
              <h3 className="text-base font-serif font-semibold text-[#1A1A1A]">{facility.title}</h3>
              <p className="type-caption mt-1 uppercase tracking-[0.12em] text-[#5A5A66]">{facility.detail}</p>
            </div>
          </article>
          );
        })}
      </div>

      <div className="mt-8 md:mt-[3.2vw] pl-6 sm:pl-10 md:pl-[5.4vw]">
        <Link to="/facilities" className="inline-block text-xs font-semibold text-[#1A1A1A] border-b border-[#876B18] pb-1">See all facilities</Link>
      </div>
    </section>
  );
};

export default TheCampus;
