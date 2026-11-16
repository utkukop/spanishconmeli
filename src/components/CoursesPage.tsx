import React from 'react';
import { CoursesSection } from './CoursesSection';
import { useCMS } from '../context/CMSContext';
import { Calendar, ArrowRight, Video, Clock, BookOpen, Heart } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/spanishconmeli';

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('contact');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const FAQS = [
    {
      q: 'How do online classes work?',
      a: 'All classes are live via Google Meet. Once you join, you get your personal class link and can attend from your laptop, tablet, or phone.',
    },
    {
      q: 'Are study materials included?',
      a: 'Yes! Weekly slides, vocabulary notes, and practice activities are shared after each lesson at no extra cost.',
    },
    {
      q: 'What time zone are classes taught in?',
      a: 'Meli teaches from Toronto, Ontario, Canada with flexible slots that fit students across North America, Europe, and Latin America.',
    },
    {
      q: 'What happens during the free trial lesson?',
      a: 'It is a friendly 30-minute chat on Google Meet where we talk about your goals, practice a little Spanish together, and pick the best class format for you.',
    },
  ];

  return (
    <div className="bg-[#FFF6EC] min-h-screen">
      {/* Courses Hero */}
      <div className="bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E9DCCB]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#C8553D] tracking-wide mb-3">
            ¡Hablemos! Courses &amp; Pricing
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#22334A] tracking-tight text-balance">
            Friendly Spanish classes built for real conversation
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#22334A]/75 leading-relaxed max-w-2xl mx-auto">
            Join an intimate beginner small group or learn 1-on-1 at your own rhythm with Teacher Meli.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book your trial lesson · $5</span>
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 bg-[#FFF6EC] rounded-2xl border border-[#E9DCCB] flex items-center gap-2.5">
              <Video className="w-4 h-4 text-[#C8553D] shrink-0" />
              <span className="text-xs font-semibold text-[#22334A]">Live on Google Meet</span>
            </div>
            <div className="p-3.5 bg-[#FFF6EC] rounded-2xl border border-[#E9DCCB] flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#F2B134] shrink-0" />
              <span className="text-xs font-semibold text-[#22334A]">Flexible times</span>
            </div>
            <div className="p-3.5 bg-[#FFF6EC] rounded-2xl border border-[#E9DCCB] flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#C8553D] shrink-0" />
              <span className="text-xs font-semibold text-[#22334A]">Materials included</span>
            </div>
            <div className="p-3.5 bg-[#FFF6EC] rounded-2xl border border-[#E9DCCB] flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#F2B134] shrink-0" />
              <span className="text-xs font-semibold text-[#22334A]">Warm support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Course Cards */}
      <CoursesSection />

      {/* Spanish Guides · Instant PDF Downloads */}
      <section className="py-12 sm:py-16 bg-[#F4E3D3]/65 border-b border-[#E9DCCB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#F2B134] p-7 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <p className="text-xs font-semibold text-[#C8553D] tracking-wide mb-2">
                Self-Paced Study
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#22334A]">
                Spanish Guides · Instant PDF Downloads
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-[#22334A]/75 leading-relaxed">
                Practical conversation cheat sheets, everyday phrases, and clear grammar guides designed for English speakers—ready to download right away.
              </p>
            </div>
            <a
              href="/contact?course=Spanish%20Guides%20(Instant%20PDF%20Downloads)&subject=Course%20enrollment"
              onClick={(e) => {
                e.preventDefault();
                setActiveView(
                  'contact',
                  `subject=${encodeURIComponent('Spanish Guides (PDF)')}&course=${encodeURIComponent('Spanish Guides (Instant PDF Downloads)')}`
                );
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
              className="min-h-[48px] w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#22334A] bg-[#F2B134] hover:bg-[#e0a024] rounded-full shadow-xs transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span>Get PDF Guides</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Simple FAQs */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-[#C8553D] tracking-wide mb-2">
              Questions?
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#22334A]">
              Common questions before you start
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FFF6EC] border border-[#E9DCCB]"
              >
                <h3 className="font-serif text-lg font-bold text-[#22334A] mb-2">{faq.q}</h3>
                <p className="text-sm text-[#22334A]/80 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-[#FFF6EC] border border-[#E9DCCB] text-center">
            <h3 className="font-serif text-2xl font-bold text-[#22334A]">
              Still have a question for Meli?
            </h3>
            <p className="mt-2 text-sm text-[#22334A]/75 max-w-md mx-auto">
              Send a quick note about class times, group spots, or your Spanish goals.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C8553D] hover:bg-[#B14630] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book your trial lesson · $5</span>
              </a>
              <a
                href="/contact"
                onClick={handleContactClick}
                className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#E9DCCB]/40 text-[#22334A] border border-[#E9DCCB] text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Send a message</span>
                <ArrowRight className="w-4 h-4 text-[#C8553D]" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
