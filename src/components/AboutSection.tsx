import React, { useEffect, useRef, useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Globe,
  GraduationCap,
  MessageSquare,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const PERU_SLIDES = [
  {
    src: '/assets/aistudio/banner-machupicchu_efc3da11.webp',
    alt: 'Machu Picchu in the Peruvian Andes',
    caption: 'Machu Picchu · Cusco Region, Peru',
  },
  {
    src: '/assets/aistudio/peru-and-mountains_a2c896fa.webp',
    alt: 'Rainbow Mountain (Vinicunca) in the Peruvian Andes',
    caption: 'Vinicunca (Rainbow Mountain) · Peruvian Andes',
  },
  {
    src: '/assets/aistudio/peru-machu-picchu-2_878a392e.webp',
    alt: 'Overlook of Machu Picchu and surrounding Andean peaks',
    caption: 'Andean Highlands & Sacred Valley, Peru',
  },
];

export const AboutSection: React.FC = () => {
  const { siteConfig } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/melissa-anchelia-54kwyd/30min';

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % PERU_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + PERU_SLIDES.length) % PERU_SLIDES.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % PERU_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) {
      setIsPaused(false);
      return;
    }
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = touchStartX.current - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section className="py-10 sm:py-16 bg-[#FFF6EC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 2-Column Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Same Portrait as Home Banner */}
          <div className="md:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#E9DCCB] shadow-xs bg-[#F4E3D3]/60 aspect-[4/5] max-w-sm mx-auto">
              <img
                src="/assets/aistudio/banner-img_bb360ebf.jpeg"
                alt="Meli — Native Spanish teacher from Peru"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right Column: Greeting + Story & Teaching Philosophy */}
          <div className="md:col-span-7">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#C8553D] tracking-tight flex items-center gap-2.5">
              <span>Hola, I’m Meli</span>
              <span aria-hidden="true">👋</span>
            </h1>

            <div className="mt-5 space-y-4 text-base sm:text-[17px] text-[#22334A]/90 leading-relaxed">
              <p>
                ¡Hola! I’m a Spanish teacher from Peru. Growing up in the heart of the Andes—with the majestic Machu Picchu as part of our heritage—taught me how valuable it is to share our culture and stories with the world.
              </p>
              <p>
                Now, I help English speakers feel completely confident speaking Spanish in real life: for travel, work, family, or just for fun.
              </p>
              <p>
                I believe you learn a language by speaking and living it. That’s why my classes are conversation-first, welcoming, and tailored to your needs. In our lessons, you won&apos;t just study grammar; you&apos;ll immerse yourself in real-world conversations and the vibrant cultural stories of Latin America.
              </p>
              <p>
                With 3+ years of experience teaching students from all over the globe, I combine practical grammar, engaging activities, and everyday idioms so you can speak naturally and feel like a local from your very first lesson. Are you ready to explore the Spanish-speaking world with me?
              </p>
            </div>
          </div>
        </div>

        {/* Panoramic Peru Heritage Slider */}
        <div
          className="mt-10 sm:mt-12 relative rounded-2xl overflow-hidden border border-[#E9DCCB] shadow-xs bg-[#22334A]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Landscapes of Peru and the Andes"
        >
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {PERU_SLIDES.map((slide) => (
              <div key={slide.src} className="w-full shrink-0 relative">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/8] sm:aspect-[16/5] object-cover object-center block"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#22334A]/80 via-[#22334A]/35 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <p className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 text-xs sm:text-sm font-medium text-[#FFF6EC] tracking-wide pointer-events-none">
                  {slide.caption}
                </p>
              </div>
            ))}
          </div>

          {/* Prev / Next Navigation Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Peru photo"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-[#22334A]/65 hover:bg-[#C8553D] text-[#FFF6EC] border border-[#FFF6EC]/25 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B134]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Peru photo"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-[#22334A]/65 hover:bg-[#C8553D] text-[#FFF6EC] border border-[#FFF6EC]/25 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B134]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 flex items-center gap-2 z-10">
            {PERU_SLIDES.map((slide, idx) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Show slide ${idx + 1} of ${PERU_SLIDES.length}`}
                aria-current={activeSlide === idx ? 'true' : undefined}
                className={`h-2 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B134] ${
                  activeSlide === idx
                    ? 'w-6 bg-[#F2B134]'
                    : 'w-2 bg-[#FFF6EC]/60 hover:bg-[#FFF6EC]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3 Warm Sand Badges Row */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <div className="bg-[#F4E3D3]/75 border border-[#E9DCCB] rounded-2xl py-5 px-5 flex items-center justify-center gap-3 text-center">
            <Globe className="w-5 h-5 text-[#22334A] shrink-0" />
            <span className="text-sm sm:text-base font-semibold text-[#22334A]">
              From Peru
            </span>
          </div>

          <div className="bg-[#F4E3D3]/75 border border-[#E9DCCB] rounded-2xl py-5 px-5 flex items-center justify-center gap-3 text-center">
            <GraduationCap className="w-5 h-5 text-[#22334A] shrink-0" />
            <span className="text-sm sm:text-base font-semibold text-[#22334A]">
              3+ years teaching
            </span>
          </div>

          <div className="bg-[#F4E3D3]/75 border border-[#E9DCCB] rounded-2xl py-5 px-5 flex items-center justify-center gap-3 text-center">
            <MessageSquare className="w-5 h-5 text-[#22334A] shrink-0" />
            <span className="text-sm sm:text-base font-semibold text-[#22334A]">
              Conversation-first
            </span>
          </div>
        </div>

        {/* Closing Line + Trial CTA Button */}
        <div className="mt-12 pt-8 border-t border-[#E9DCCB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#22334A]">
            Ready to start? Let’s meet in a trial lesson.
          </p>
          <a
            href={calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm sm:text-base font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-xs transition-colors cursor-pointer shrink-0 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>Book your trial lesson · $5</span>
          </a>
        </div>
      </div>
    </section>
  );
};
