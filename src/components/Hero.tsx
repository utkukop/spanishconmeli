import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const { siteConfig } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/melissa-anchelia-54kwyd/30min';

  return (
    <section className="bg-[#F4E3D3]/75 border-b border-[#E9DCCB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Exact Headline, Subtitle, Terracotta $5 Button & Trust Line */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.35rem] font-bold text-[#22334A] leading-[1.1] tracking-tight text-balance">
              Speak real Spanish with confidence
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#22334A]/85 leading-relaxed max-w-lg">
              Native Spanish teacher for English speakers. Start with a trial lesson and speak from day one.
            </p>

            {/* Primary CTA + Trust Line */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
              <a
                href={calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-xs transition-all hover:translate-y-[-1px] cursor-pointer whitespace-nowrap"
              >
                Book your trial lesson · $5
              </a>

              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#C8553D]">
                <div className="flex items-center text-[#C8553D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">Loved by students</span>
              </div>
            </div>
          </div>

          {/* Right Column: Meli Real Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[370px] rounded-2xl overflow-hidden border border-[#E9DCCB] shadow-sm bg-[#FFF6EC] aspect-[4/5]">
              <img
                src="/assets/aistudio/banner-img_bb360ebf.jpeg"
                alt="Meli smiling at her desk during an online Spanish class"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
