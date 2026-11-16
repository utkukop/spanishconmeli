import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Calendar, MessageCircle, Sparkles, HeartHandshake } from 'lucide-react';
import conversationImg from '../assets/images/spanish_conversation_vibe_1794828173052.jpg';

export const MethodologySection: React.FC = () => {
  const { siteConfig } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/spanishconmeli';

  const comparisons = siteConfig.methodologyComparisons || [];
  const pillars = siteConfig.methodologyPillars || [];
  const icons = [
    <MessageCircle key="0" className="w-5 h-5" />,
    <Sparkles key="1" className="w-5 h-5" />,
    <HeartHandshake key="2" className="w-5 h-5" />,
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E9DCCB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Split: Photo + Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden border border-[#E9DCCB] bg-[#FFF6EC] aspect-[4/3] shadow-sm">
              <img
                src={conversationImg}
                alt="Two friends laughing and talking warmly over coffee"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <p className="text-xs sm:text-sm font-semibold text-[#C8553D] tracking-wide mb-3 flex items-center gap-2">
              <span className="inline-block w-6 h-0.5 bg-[#F2B134] rounded-full" />
              <span>{siteConfig.methodologyKicker || '¡Hablemos!'}</span>
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22334A] leading-tight text-balance">
              {siteConfig.methodologyTitle || 'Why do so many students freeze when trying to speak?'}
            </h2>
            <p className="mt-5 text-base text-[#22334A]/80 leading-relaxed">
              {siteConfig.methodologySubtitle}
            </p>

            <div className="mt-8 space-y-5">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF6EC] border border-[#E9DCCB] text-[#C8553D] flex items-center justify-center shrink-0">
                    {icons[idx % icons.length]}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#22334A]">{pillar.title}</h3>
                    <p className="mt-1 text-sm text-[#22334A]/75 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a trial lesson</span>
              </a>
            </div>
          </div>
        </div>

        {/* Everyday Spanish Comparisons */}
        {comparisons.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-14 border-t border-[#E9DCCB]">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#22334A]">
                Textbook vs. Real Spanish <span className="italic text-[#C8553D]">de verdad</span>
              </h3>
              <p className="mt-2 text-sm text-[#22334A]/75">
                What you actually hear in cafés and with friends, instead of stiff classroom phrases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparisons.map((c, i) => (
                <div
                  key={i}
                  className="bg-[#FFF6EC] border border-[#E9DCCB] rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#C8553D] mb-2">{c.situation}</p>
                    <p className="text-xs text-[#22334A]/55 line-through mb-3">{c.textbook}</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-[#E9DCCB] text-sm font-semibold text-[#22334A]">
                    {c.meliMethod}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
