import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import spanishWorldMapImg from '../assets/images/spanish_speaking_world_map_1794842066873.jpg';
import { Globe, Calendar } from 'lucide-react';

export const SpanishSpeakingWorldSection: React.FC = () => {
  const { siteConfig } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/melissa-anchelia-54kwyd/30min';
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="py-12 sm:py-16 bg-[#FFF6EC] border-b border-[#E9DCCB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7 sm:mb-9">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#22334A] leading-tight text-balance">
              Spanish around the world
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#22334A]/80 leading-relaxed">
              One language opens the door to 21 countries and over 500 million speakers across Spain, Latin America, the Caribbean, and beyond.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#22334A]/80 shrink-0">
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-[#C8553D] border border-[#22334A]/20" aria-hidden="true" />
              <span>Spanish-speaking countries</span>
            </span>
            <span className="text-[#22334A]/40" aria-hidden="true">·</span>
            <span className="tabular-nums font-semibold text-[#22334A]">21 countries</span>
          </div>
        </div>

        {/* Map Visual Card */}
        <div className="bg-white rounded-2xl border border-[#E9DCCB] shadow-xs overflow-hidden p-3 sm:p-5">
          {!imgFailed ? (
            <div className="w-full rounded-xl overflow-hidden bg-[#FFF6EC]">
              <img
                src={spanishWorldMapImg}
                alt="World map highlighting all Spanish-speaking countries across Spain, Latin America, the Caribbean, and Equatorial Guinea"
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-auto aspect-[16/9] object-contain block"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full aspect-[16/9] rounded-xl bg-gradient-to-br from-[#FFF6EC] to-[#F4E3D3] border border-[#E9DCCB] flex flex-col items-center justify-center p-6 text-center">
              <Globe className="w-10 h-10 text-[#C8553D] mb-3" />
              <p className="font-serif text-xl font-bold text-[#22334A]">
                21 Spanish-speaking countries worldwide
              </p>
              <p className="text-sm text-[#22334A]/70 mt-1">
                From Madrid and Mexico City to Bogotá, Lima, and Buenos Aires
              </p>
            </div>
          )}
        </div>

        {/* Option 1: Inspiration + First Lesson Conversion Bridge */}
        <div className="mt-8 sm:mt-10 bg-[#F4E3D3]/60 border border-[#E9DCCB] rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Headline + Real-Life Story */}
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-semibold text-[#C8553D] tracking-wide mb-2">
                ¡Hablemos!
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#22334A] leading-tight text-balance">
                One language. 21 countries waiting for you.
              </h3>
              <p className="mt-3.5 text-sm sm:text-base text-[#22334A]/85 leading-relaxed max-w-2xl">
                Learning Spanish isn’t about memorizing grammar tables—it’s about ordering empanadas in Buenos Aires, bargaining in Cusco, making new friends in Madrid, and truly feeling at home anywhere you travel. Your very first conversation starts right here.
              </p>
            </div>

            {/* Right Column: Clean Editorial Stats + Primary Trial CTA */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between gap-6">
              <div className="w-full grid grid-cols-3 divide-x divide-[#E9DCCB] border-b border-[#E9DCCB] pb-5">
                <div className="pr-3">
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#C8553D] tabular-nums">
                    500M+
                  </p>
                  <p className="text-xs text-[#22334A]/75 mt-0.5">
                    Native speakers
                  </p>
                </div>
                <div className="px-3">
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#22334A] tabular-nums">
                    21
                  </p>
                  <p className="text-xs text-[#22334A]/75 mt-0.5">
                    Countries
                  </p>
                </div>
                <div className="pl-3">
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#22334A] tabular-nums">
                    1
                  </p>
                  <p className="text-xs text-[#22334A]/75 mt-0.5">
                    Friendly trial
                  </p>
                </div>
              </div>

              <a
                href={calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Book your trial lesson · $5</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
