import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Calendar } from 'lucide-react';

const ONE_ON_ONE_CAL_LINK = 'https://cal.com/melissa-anchelia-54kwyd/1-1-class';
const CONVERSATION_CAL_LINK = 'https://cal.com/melissa-anchelia-54kwyd/conversation-class-40-min';

export const CoursesPage: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();
  const trialCalLink = siteConfig.calLink || 'https://cal.com/melissa-anchelia-54kwyd/30min';

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('group-lessons');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleSpanishGuideClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView(
      'contact',
      `subject=${encodeURIComponent('Spanish Guides (PDF)')}&course=${encodeURIComponent(
        'Spanish Guide (Pocket-sized PDF downloads)'
      )}`
    );
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <div className="bg-[#FFF6EC] min-h-screen">
      {/* Main Courses Grid matching 02 Courses (layout) */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#22334A] tracking-tight mb-8 sm:mb-10">
            Choose how you want to learn
          </h1>

          {/* 2x2 Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Top-Left Card: 1:1 Class */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9DCCB] shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-2xl sm:text-[1.65rem] font-bold text-[#C8553D]">
                  1:1 Class
                </h2>
                <p className="text-sm font-medium text-[#22334A]/65 mt-1">
                  50 min · Google meet
                </p>
                <p className="mt-4 text-sm sm:text-[15px] text-[#22334A]/85 leading-relaxed">
                  Your goals, your pace. A personalized plan to help you learn, practice and finally speak Spanish with confidence.
                </p>
              </div>

              <div className="mt-8 pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-base sm:text-lg font-bold text-[#22334A] tabular-nums">
                  $25 USD / class
                </span>
                <a
                  href={ONE_ON_ONE_CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] inline-flex items-center justify-center px-7 py-2.5 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full transition-colors cursor-pointer whitespace-nowrap"
                >
                  Book your class
                </a>
              </div>
            </div>

            {/* Top-Right Card: Group Lessons */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9DCCB] shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-2xl sm:text-[1.65rem] font-bold text-[#C8553D]">
                  Group Lessons
                </h2>
                <p className="text-sm font-medium text-[#22334A]/65 mt-1">
                  Coming soon · Small groups
                </p>
                <p className="mt-4 text-sm sm:text-[15px] text-[#22334A]/85 leading-relaxed">
                  Learn with other students in small, friendly groups. Practice grammar, vocabulary, speaking, and make progress together.
                </p>
              </div>

              <div className="mt-8 pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-base sm:text-lg font-bold text-[#22334A]">
                  Limited spots
                </span>
                <a
                  href="/group-lessons"
                  onClick={handleWaitlistClick}
                  className="min-h-[46px] inline-flex items-center justify-center px-7 py-2.5 text-sm font-semibold text-white bg-[#F2B134] hover:bg-[#de9f23] rounded-full transition-colors cursor-pointer whitespace-nowrap"
                >
                  Join the waitlist
                </a>
              </div>
            </div>

            {/* Bottom-Left Card: Conversation Class */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9DCCB] shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-2xl sm:text-[1.65rem] font-bold text-[#C8553D]">
                  Conversation Class
                </h2>
                <p className="text-sm font-medium text-[#22334A]/65 mt-1">
                  40 min · Google meet
                </p>
                <p className="mt-4 text-sm sm:text-[15px] text-[#22334A]/85 leading-relaxed">
                  Fun, relaxed chats on a new topic every class. Build fluency, grow your vocabulary and stop translating in your head.
                </p>
              </div>

              <div className="mt-8 pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-base sm:text-lg font-bold text-[#22334A] tabular-nums">
                  $15 USD / class
                </span>
                <a
                  href={CONVERSATION_CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] inline-flex items-center justify-center px-7 py-2.5 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full transition-colors cursor-pointer whitespace-nowrap"
                >
                  Book your class
                </a>
              </div>
            </div>

            {/* Bottom-Right Card: Spanish Guide */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9DCCB] shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-2xl sm:text-[1.65rem] font-bold text-[#C8553D]">
                  Spanish Guide
                </h2>
                <p className="mt-4 text-sm sm:text-[15px] text-[#22334A]/85 leading-relaxed">
                  Pocket-sized phrase guides for real life: travel through Latin America, order at a restaurant and more. Download and take them anywhere.
                </p>
              </div>

              <div className="mt-8 pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-base sm:text-lg font-bold text-[#22334A] tabular-nums">
                  From 4.99 USD
                </span>
                <a
                  href="/contact?course=Spanish%20Guide%20(Pocket-sized%20PDF%20downloads)&subject=Spanish%20Guides%20(PDF)"
                  onClick={handleSpanishGuideClick}
                  className="min-h-[46px] inline-flex items-center justify-center px-7 py-2.5 text-sm font-semibold text-white bg-[#22334A] hover:bg-[#192638] rounded-full transition-colors cursor-pointer whitespace-nowrap"
                >
                  Buy &amp; download
                </a>
              </div>
            </div>
          </div>

          {/* Subtle Trial Lesson CTA Strip */}
          <div className="mt-10 bg-[#F4E3D3]/65 border border-[#E9DCCB] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-serif text-xl font-bold text-[#22334A]">
                New to spanishconmeli?
              </p>
              <p className="text-sm text-[#22334A]/75 mt-1">
                Start with a trial lesson and speak Spanish from day one.
              </p>
            </div>
            <a
              href={trialCalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book your trial lesson · $5</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
