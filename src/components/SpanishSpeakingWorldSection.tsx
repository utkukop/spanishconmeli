import React, { useState } from 'react';
import spanishWorldMapImg from '../assets/images/spanish_speaking_world_map_1794842066873.jpg';
import { Globe } from 'lucide-react';

export const SpanishSpeakingWorldSection: React.FC = () => {
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
      </div>
    </section>
  );
};
