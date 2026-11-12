import React from 'react';
import { CoursesSection } from './CoursesSection';
import { useCMS } from '../context/CMSContext';
import { Sparkles, HelpCircle, ArrowRight, ShieldCheck, Video, Calendar, BookOpen } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { setActiveView } = useCMS();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('contact');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const FAQS = [
    {
      q: 'How are online classes conducted?',
      a: 'All lessons take place live via Google Meet. You receive your personal class link upon enrollment and can join comfortably from any computer, tablet, or phone with no software installation required.',
    },
    {
      q: 'What materials are included with the courses?',
      a: 'All weekly slides, street-dialogue audio transcripts, practice cheat sheets, and homework assignments are fully included at no extra cost. Materials are shared in your private Google Drive folder after every lesson.',
    },
    {
      q: 'What time zone are classes scheduled in?',
      a: 'Classes are coordinated from Toronto, Ontario, Canada. Teacher Meli offers flexible morning, afternoon, and evening slots to comfortably fit students across Canada, the United States, Europe, and Latin America.',
    },
    {
      q: 'How does the free 30-minute 1-on-1 trial class work?',
      a: 'The trial lesson is a relaxed, zero-pressure 30-minute session where Meli assesses your speaking goals, answers your questions, and designs a personalized learning plan tailored to your level before you commit to a monthly package.',
    },
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Dedicated Page Hero Banner */}
      <div className="bg-[#FAF0E6] py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#EAE5D9]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#C73E29]/10 text-[#C73E29] text-xs font-bold rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum & Pricing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E1B18] tracking-tight">
            Live Spanish Courses & Private Lessons
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#57514A] leading-relaxed max-w-2xl mx-auto">
            Practical Spanish taught for real life. Choose between our collaborative small-group cohort or tailored 1-on-1 private lesson packages.
          </p>

          {/* Key Program Highlights */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3 bg-white/80 rounded-xl border border-[#EAE5D9] flex items-center gap-2.5">
              <Video className="w-4 h-4 text-[#C73E29] shrink-0" />
              <span className="text-xs font-semibold text-[#1E1B18]">Live on Google Meet</span>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-[#EAE5D9] flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#2A9D8F] shrink-0" />
              <span className="text-xs font-semibold text-[#1E1B18]">Flexible Schedules</span>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-[#EAE5D9] flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#E76F51] shrink-0" />
              <span className="text-xs font-semibold text-[#1E1B18]">All Materials Free</span>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-[#EAE5D9] flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#2A9D8F] shrink-0" />
              <span className="text-xs font-semibold text-[#1E1B18]">Free 30-min Trial</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Course Cards with Flyers, Lightbox, and Packages */}
      <CoursesSection />

      {/* Program Frequently Asked Questions */}
      <section className="py-16 md:py-20 bg-white border-b border-[#EAE5D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF0E6] text-[#C73E29] text-xs font-bold rounded-full mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18]">
              Frequently Asked Questions About Joining
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#FAF9F5] border border-[#EAE5D9]"
              >
                <h3 className="text-base font-bold text-[#1E1B18] mb-2">{faq.q}</h3>
                <p className="text-sm text-[#57514A] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-[#FAF0E6] border border-[#EAE5D9] text-center">
            <h3 className="text-lg sm:text-xl font-bold text-[#1E1B18]">
              Have a question before enrolling?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#57514A] max-w-md mx-auto">
              Send Meli a quick message about class times, group levels, or private package options.
            </p>
            <div className="mt-5">
              <a
                href="/contact"
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C73E29] hover:bg-[#AB3220] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                <span>Send Meli a Message</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
