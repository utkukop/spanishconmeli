import React from 'react';
import { AboutSection } from './AboutSection';
import { TestimonialsSection } from './TestimonialsSection';
import { useCMS } from '../context/CMSContext';
import { Sparkles, ArrowRight, Mail } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveView } = useCMS();

  const handleNav = (view: 'quiz' | 'contact', e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView(view);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Dedicated Page Hero */}
      <div className="bg-[#FAF0E6] py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#EAE5D9]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#C73E29]/10 text-[#C73E29] text-xs font-bold rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Teacher Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E1B18] tracking-tight">
            Meet Your Teacher: Meli
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#57514A] leading-relaxed max-w-2xl mx-auto">
            Passionate native Spanish educator helping students worldwide break through speaking hesitation with warmth, humor, and natural colloquial phrases.
          </p>
        </div>
      </div>

      {/* Main Bio & Story */}
      <AboutSection />

      {/* Student Stories & Testimonials */}
      <TestimonialsSection />

      {/* Bottom CTA */}
      <div className="py-16 bg-[#FAF0E6] border-t border-[#EAE5D9] text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18]">
            Ready to Speak Spanish with Ease?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57514A]">
            Take the free 3-minute conversational level quiz or send Meli a message to book your trial.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="/quiz"
              onClick={(e) => handleNav('quiz', e)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take Free Level Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              onClick={(e) => handleNav('contact', e)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#1E1B18] bg-white hover:bg-[#F4EFE6] border border-[#D5CFC4] rounded-xl transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#C73E29]" />
              <span>Contact Teacher Meli</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
