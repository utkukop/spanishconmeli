import React from 'react';
import { AboutSection } from './AboutSection';
import { TestimonialsSection } from './TestimonialsSection';
import { useCMS } from '../context/CMSContext';
import { Calendar, Mail } from 'lucide-react';

export const AboutPage: React.FC = () => {
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
    <div className="bg-[#FFF6EC] min-h-screen">
      {/* Page Hero */}
      <div className="bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E9DCCB]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#C8553D] tracking-wide mb-3">
            About me
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#22334A] tracking-tight text-balance">
            Hi, I’m Meli — let’s speak Spanish together
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#22334A]/75 leading-relaxed">
            Helping students feel confident, relaxed, and genuinely happy while speaking Spanish in everyday life.
          </p>
        </div>
      </div>

      {/* Story & Photo */}
      <AboutSection />

      {/* Student Stories */}
      <TestimonialsSection />

      {/* Bottom CTA */}
      <div className="py-16 sm:py-20 bg-[#FFF6EC] text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22334A]">
            Ready to start speaking? <span className="italic text-[#C8553D]">¡Vamos!</span>
          </h2>
          <p className="mt-3 text-base text-[#22334A]/75">
            Book your $5 trial lesson or send me a quick note with any questions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book your trial lesson · $5</span>
            </a>
            <a
              href="/contact"
              onClick={handleContact}
              className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#22334A] bg-white hover:bg-[#E9DCCB]/40 border border-[#E9DCCB] rounded-full transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#C8553D]" />
              <span>Send a message</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
