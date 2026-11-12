import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Users, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const HomeFeaturedPrograms: React.FC = () => {
  const { setActiveView } = useCMS();

  const handleGoToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('courses');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF9F5] border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C73E29]/10 text-[#C73E29] text-xs font-bold rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Learning Formats</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
            How Would You Like to Learn Spanish?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57514A]">
            Two tailored paths designed around speaking fluency, native colloquial ease, and real-life conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Format 1: Small Group Cohort */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE5D9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FDF2F0] text-[#C73E29] flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#C73E29] uppercase tracking-wider">
                Small Groups (4–6 Students)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B18] mt-1">
                A0–A1 Group Cohort
              </h3>
              <p className="text-sm text-[#57514A] mt-2.5 leading-relaxed">
                From zero to basic practical Spanish in a lively, encouraging group setting with weekly 75-minute live classes.
              </p>
              <ul className="mt-5 space-y-2 text-xs sm:text-sm text-[#443E38]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                  <span>10 weeks · 1 live interactive class per week</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                  <span>Early Bird: $115 USD (Save $35 USD)</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F0ECE2]">
              <a
                href="/courses"
                onClick={handleGoToCourses}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-[#1E1B18] bg-[#F4EFE6] hover:bg-[#EAE2D5] rounded-xl transition-colors cursor-pointer"
              >
                <span>View Group Course Details</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Format 2: 1-on-1 Private Lessons */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#C73E29]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#2A9D8F]/10 text-[#2A9D8F] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              Free 30-Min Trial
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2A9D8F]/10 text-[#2A9D8F] flex items-center justify-center mb-4">
                <User className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#2A9D8F] uppercase tracking-wider">
                1-on-1 Personalized
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B18] mt-1">
                Online Private Lessons
              </h3>
              <p className="text-sm text-[#57514A] mt-2.5 leading-relaxed">
                Tailored 1-hour classes completely focused on your specific conversation goals, travel needs, or career.
              </p>
              <ul className="mt-5 space-y-2 text-xs sm:text-sm text-[#443E38]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                  <span>Flexible monthly packages (4, 8, or 12 lessons)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                  <span>From $16/lesson · Flexible scheduling</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F0ECE2]">
              <a
                href="/courses"
                onClick={handleGoToCourses}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl transition-colors cursor-pointer"
              >
                <span>View Private Lessons & Pricing</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/courses"
            onClick={handleGoToCourses}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#1E1B18] hover:bg-[#332E29] rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <span>Explore All Programs, Flyers & Packages</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
