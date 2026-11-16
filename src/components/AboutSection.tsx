import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Calendar, Instagram, ArrowRight } from 'lucide-react';
import heroLessonImg from '../assets/images/hero_spanish_lesson_1794828171392.jpg';

export const AboutSection: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/spanishconmeli';

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('contact');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FFF6EC] border-b border-[#E9DCCB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Warm Portrait Photo */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-[#E9DCCB] shadow-md bg-white aspect-[4/5]">
              <img
                src={heroLessonImg}
                alt="Meli smiling in her sunlit teaching space"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Meli's Story */}
          <div className="lg:col-span-7">
            <p className="text-xs sm:text-sm font-semibold text-[#C8553D] tracking-wide mb-3 flex items-center gap-2">
              <span className="inline-block w-6 h-0.5 bg-[#F2B134] rounded-full" />
              <span>¡Hola! Meet Meli</span>
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22334A] leading-tight text-balance">
              {siteConfig.teacherQuote ||
                '«You don’t learn Spanish to pass a test—you learn it to connect with real people.»'}
            </h2>

            <div className="mt-6 space-y-4 text-base text-[#22334A]/80 leading-relaxed">
              <p>{siteConfig.teacherBio}</p>
              {siteConfig.teacherBioParagraph2 && <p>{siteConfig.teacherBioParagraph2}</p>}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E9DCCB] flex flex-wrap items-center gap-4">
              <a
                href="https://instagram.com/spanishconmeli"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E9DCCB] text-xs font-semibold text-[#22334A] hover:border-[#C8553D] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#C8553D]" />
                <span>@spanishconmeli</span>
              </a>
              <span className="text-xs text-[#22334A]/65">
                Based in Toronto, Ontario, Canada · Teaching worldwide
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book your trial lesson · $5</span>
              </a>

              <a
                href="/contact"
                onClick={handleContact}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#22334A] bg-white hover:bg-[#E9DCCB]/40 border border-[#E9DCCB] rounded-full transition-colors cursor-pointer"
              >
                <span>Say ¡Hola! via message</span>
                <ArrowRight className="w-4 h-4 text-[#C8553D]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
