import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Globe, GraduationCap, MessageSquare, Calendar } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { siteConfig } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/melissa-anchelia-54kwyd/30min';

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

        {/* Panoramic Machu Picchu Heritage Visual */}
        <div className="mt-10 sm:mt-12 rounded-2xl overflow-hidden border border-[#E9DCCB] shadow-xs bg-white">
          <img
            src="/assets/aistudio/banner-machupicchu_efc3da11.webp"
            alt="Machu Picchu in the Peruvian Andes"
            referrerPolicy="no-referrer"
            className="w-full aspect-[16/7] sm:aspect-[16/5] object-cover object-center block"
            loading="lazy"
          />
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
